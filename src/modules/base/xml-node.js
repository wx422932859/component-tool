/**
 * XML 节点
 */
class XMLNode {
    static ROOT_NODE = 0;
    static ELEMENT_NODE = 1;
    static ATTRIBUTE_NODE = 2;
    static TEXT_NODE = 3;
    static CDATA_SECTION_NODE = 4;
    static COMMENT_NODE = 8;

    constructor(data, nodeName) {
        if (typeof data === 'number') {
            this.nodeType = data;
            this.nodeName = nodeName;
            this.childNodes = []; // 所有 Node
        } else {
            return parseXML(data);
        }
    }

    /**
     * 添加子节点
     * @param {XMLNode} 节点
     */
    append(xmlNode) {
        if (!xmlNode instanceof XMLNode) {
            return;
        }
        this.childNodes.push(xmlNode);
        xmlNode.parentNode = this;
        if (
            (this instanceof RootNode || this instanceof ElementNode) &&
            xmlNode instanceof ElementNode
        ) {
            this.children.push(xmlNode);
        }
    }

    /**
     * 转为 JSON 格式
     */
    toJson(result = {}) {
        if (this.children.length == 0) {
            return this.text;
        }
        this.children.forEach((elementNode) => {
            if (result[elementNode.nodeName] == null) {
                let nodeList = this.children.filter(
                    (item) => item.nodeName === elementNode.nodeName
                );

                result[elementNode.nodeName] = nodeList.length > 1 ? [] : {};
            }
            if (result[elementNode.nodeName] instanceof Array) {
                result[elementNode.nodeName].push(elementNode.toJson());
            } else {
                result[elementNode.nodeName] = elementNode.toJson();
            }
        });
        return result;
    }
}

/**
 * 根节点
 */
class RootNode extends XMLNode {
    constructor() {
        super(XMLNode.ROOT_NODE, '#root');
        this.children = [];
    }
}

/**
 * 元素节点
 */
class ElementNode extends XMLNode {
    constructor(nodeName, position) {
        super(XMLNode.ELEMENT_NODE, nodeName);
        this.position = position;
        this.attribute = {};
        this.children = [];
    }
}

/**
 * 注释节点
 */
class CommentNode extends XMLNode {
    constructor(text) {
        super(XMLNode.COMMENT_NODE, '#comment');
        this.nodeValue = text;
    }
}

/**
 * 文本节点
 */
class TextNode extends XMLNode {
    constructor(text) {
        super(XMLNode.TEXT_NODE, '#text');
        this.nodeValue = text;
    }
}

/**
 * CDATA节点
 */
class CdataSectionNode extends XMLNode {
    constructor(text) {
        super(XMLNode.CDATA_SECTION_NODE, '#cdata-section');
        this.nodeValue = text;
    }
}

/**
 * xml解析为json
 * @param {string} data XML文本
 * @example parseXML(data)
 */
function parseXML(data) {
    /**
     * ElementNode: /(<([\/a-z][\a-z\d\-\.]*)([\s\S]*?)(\/)?>)/
     * CommentNode: /(<!--([\s\S]*?)-->)/
     * CdataSectionNode: /(<!\[CDATA\[([\s\S]*?)\]\]>)/
     * 0 匹配到的字符串
     * 1 ElementNode节点标志位，匹配失败为 undefined
     * 2 标签或闭合标签
     * 3 属性值
     * 4 单标签节点标志位，匹配成功为 undefined
     * 5 CommentNode节点标志位，匹配失败为 undefined
     * 6 注释
     * 7 CDATA节点标志位，匹配失败为 undefined
     * 8 值
     */
    let xmlRegExp =
        /(<([\/a-z][\a-z\d\-\.]*)([\s\S]*?)(\/)?>)|(<!--([\s\S]*?)-->)|(<!\[CDATA\[([\s\S]*?)\]\]>)/gi; // 匹配器
    let root = new RootNode(), // 根节点
        stack = [root]; // 栈，至少含有根节点一个元素

    root.innerHTML = data;
    xml2json();
    parseInnerText();

    return root;

    /**
     * 解析XML文本
     */
    function xml2json() {
        let topNode = stack[stack.length - 1], // 栈顶节点
            lastIndex = xmlRegExp.lastIndex,
            result = xmlRegExp.exec(data);

        if (result) {
            let {
                1: elementNodeSign,
                2: elementLabel,
                3: attribute,
                4: singleLabelSign,
                5: commentNodeSign,
                6: comment,
                7: cdataSectionNodeSign,
                8: cdata,
                index,
            } = result;

            if (lastIndex !== index) {
                // TextNode
                topNode.append(new TextNode(data.slice(lastIndex, index)));
            }

            if (commentNodeSign !== undefined) {
                // CommentNode
                topNode.append(new CommentNode(comment));
            } else if (cdataSectionNodeSign !== undefined) {
                // CdataSectionNode
                topNode.append(new CdataSectionNode(cdata));
            } else if (elementNodeSign !== undefined) {
                // ElementNode
                let elementNode = new ElementNode(elementLabel, {
                    0: index,
                    1: xmlRegExp.lastIndex,
                });
                parseAttribute(elementNode, attribute);
                if (singleLabelSign !== undefined) {
                    topNode.append(elementNode);
                } else {
                    parseDoubleLabel(elementNode, result);
                }
            }
            xml2json();
        } else {
            if (lastIndex !== data.length) {
                // TextNode
                topNode.append(new TextNode(data.slice(lastIndex)));
            }
        }
    }

    /**
     * 解析双标签节点
     * @param {object} elem 节点
     * @param {object} res 匹配结果
     */
    function parseDoubleLabel(elementNode, res) {
        let topNode = stack[stack.length - 1]; // 栈顶节点

        if (res[2] === `/${topNode.nodeName}`) {
            // 闭合标签，先赋值，再出栈
            topNode.position[2] = res.index;
            topNode.position[3] = xmlRegExp.lastIndex;
            topNode.innerHTML = data.slice(topNode.position[1], topNode.position[2]);
            topNode.outerHTML = data.slice(topNode.position[0], topNode.position[3]);
            stack.pop();
        } else {
            // 非闭合标签，继续进栈
            topNode.append(elementNode);
            stack.push(elementNode);
        }
    }

    /**
     * 解析属性
     * @param {object} elem 节点
     * @param {string} attribute 属性字符串
     */
    function parseAttribute(elem, attribute) {
        let attributeReg = /([a-z\-:]+)(="([\s\S]*?)")?/gi;

        if (attribute != undefined && attribute.trim() != '') {
            attribute.replace(attributeReg, (item, key, value1, value2) => {
                elem.attribute[key] = value1 !== undefined ? value2 : '';
                return '';
            });
        }
    }

    /**
     * 解析节点内的文本内容
     */
    function parseInnerText(node = root) {
        if (!node instanceof RootNode && !node instanceof ElementNode) {
            return;
        }

        let text = '';

        if (node.childNodes.length == 0) {
            return '';
        }
        node.childNodes.forEach((child) => {
            if (child instanceof TextNode) {
                text += child.nodeValue;
            } else if (child instanceof ElementNode) {
                text += parseInnerText(child);
            }
        });
        node.text = text.trim();
        node.innerText = text;
        return node.innerText;
    }
}

export default XMLNode;
