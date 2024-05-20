import Util from './util.js';

/**
 * 选择器
 * @typedef {MyNode|Node|String} Selector
 * @memberof MyNode
 */

/**
 * 封装 Node 对象
 */
class MyNode {
    /**
     * Creates an instance of MyNode.
     * @param {MyNode.Selector|MyNode.Selector[]} selector 选择器
     * @param {MyNode|Node} prevObject 上一级对象
     * @author wang.xin
     */
    constructor(selector, prevObject) {
        if (selector instanceof MyNode) {
            return selector;
        }
        /**
         * @member {Number} length 元素个数
         * @memberof MyNode#
         * @default 0
         */
        this.length = 0;

        /**
         * @member {MyNode|Node} prevObject 上一级对象
         * @memberof MyNode#
         * @default document
         */
        this.prevObject = prevObject || document;
        this.$init(selector);
    }

    /**
     * 初始化
     * @param {MyNode.Selector|MyNode.Selector[]} selector 选择器
     * @memberof MyNode
     */
    $init(selector) {
        /**
         * Node
         */
        if (selector instanceof Node) {
            this.push(selector);
        }

        /**
         * ArrayLike
         */
        if (Util.isArrayLike(selector) && Util.type(selector.forEach) === 'function') {
            selector.forEach((elem) => this.concat(new MyNode(elem)));
        }

        /**
         * String
         * 默认为选择器
         * 其次作为模板进行录入
         */
        if (Util.type(selector) === 'string') {
            try {
                document.querySelectorAll(selector).forEach((element) => this.push(element));
            } catch (err) {
                let documentFragment = MyNode._string2fragment(selector);
                this.concat(new MyNode(documentFragment.childNodes));
            }
        }
    }

    /**
     * 添加 script 节点
     * @param {Node|String} content 内容
     * @memberof MyNode
     */
    appendScript(content) {
        /**
         * Node
         */
        if (content instanceof Node) {
            if (content.nodeType === 11) {
                content.querySelectorAll('script').forEach((elem) => {
                    this.runCode(elem.innerHTML);
                });
            } else if (content.nodeName.toLocaleLowerCase() === 'script') {
                this.runCode(content.innerHTML);
            }
        }

        /**
         * String
         */
        if (Util.type(content) === 'string') {
            this.runCode(content.replace(/^<script[\s\S]*?>/gi, '').replace(/<\/script>$/gi, ''));
        }
    }

    /**
     * 执行 code <br/>
     * @param {String} code 代码
     * @memberof MyNode
     * @example
     * 执行代码的方案（本方法采用的是方案一）：
     * 1. 新增 script 节点，使用的是全局上下文。因此，即使删除了节点，产生的全局变量也不会被销毁。
     * 2. eval()，使用的是 Eval 函数执行上下文。因此，产生的变量是局部变量，执行完后会被销毁。
     */
    runCode(code) {
        if (this.length === 0) {
            return;
        }

        this.forEach((node) => {
            let ownerDocument = node.ownerDocument;

            /**
             * 只有被选节点属于当前文档时，才会执行 code
             */
            if (ownerDocument === document) {
                let scriptNode = document.createElement('script');
                scriptNode.innerHTML = code;
                ownerDocument.body.appendChild(scriptNode);
                scriptNode.remove();
            }
        });
    }

    /**
     * 插入指定内容 <br/>
     * 当被选元素有多个，则只对 this[position] 元素插入原始内容，其余皆为深拷贝的内容
     * @param {MyNode.Selector|MyNode.Selector[]} content 内容
     * @param {Number} position 位置（插入原始内容的元素位置）
     * @param {String} [insertLocation='beforeBegin'] 插入位置
     * @returns {MyNode}
     * @memberof MyNode
     * @example
     * 利用 insertBefore(node, child) 执行的插入操作
     * node：插入的新节点
     * child：指定的子节点前插入，为 null 则在末尾插入
     */
    insert(content, position = 0, insertLocation = 'beforeBegin', replaceNode = new MyNode()) {
        const INSERT_LOCATION = ['beforeBegin', 'afterEnd', 'beforeEnd', 'afterBegin', 'replaceWith'];

        if (!INSERT_LOCATION.includes(insertLocation)) {
            return this;
        }

        /**
         * Node，最终都以 Node 节点添加
         * 文档片段被插入后会清空，所以需要在插入前先进行深拷贝
         */
        if (content instanceof Node) {
            let cloneNode = content.cloneNode(true);

            this.forEach((item, index) => {
                let insertNode = index === position ? content : cloneNode.cloneNode(true);

                if (!item instanceof Node || !item.parentNode instanceof Node) {
                    return;
                }

                switch (insertLocation) {
                    case INSERT_LOCATION[0]:
                        item.parentNode.insertBefore(insertNode, item);
                        break;

                    case INSERT_LOCATION[1]:
                        item.parentNode.insertBefore(insertNode, item.nextElementSibling);
                        break;

                    case INSERT_LOCATION[2]:
                        item.insertBefore(insertNode, null);
                        break;

                    case INSERT_LOCATION[3]:
                        item.insertBefore(insertNode, item.childNodes[0]);
                        break;

                    case INSERT_LOCATION[4]:
                        if (content.nodeType === 11) {
                            insertNode.childNodes.forEach((elem) => replaceNode.push(elem));
                        } else {
                            replaceNode.push(insertNode);
                        }
                        item.parentNode.replaceChild(insertNode, item);
                        break;

                    default:
                        break;
                }
                new MyNode(item).appendScript(cloneNode);
            });
        }

        /**
         * ArrayLike
         * Node 直接添加到文档片段
         * String 先转换为文档片段，再添加到父级文档片段
         */
        if (Util.isArrayLike(content) && Util.type(content.forEach) === 'function') {
            let documentFragment = document.createDocumentFragment();

            content.forEach((item) => {
                if (item instanceof Node) {
                    documentFragment.appendChild(item);
                } else if (Util.type(item) === 'string') {
                    documentFragment.appendChild(MyNode._string2fragment(item));
                }
            });
            this.insert(documentFragment, position, insertLocation, replaceNode);
        }

        /**
         * String
         */
        if (Util.type(content) === 'string') {
            let documentFragment = MyNode._string2fragment(content);
            this.insert(documentFragment, position, insertLocation, replaceNode);
        }

        return insertLocation != INSERT_LOCATION[4] ? this : replaceNode;
    }

    /**
     * 在被选元素前插入指定内容
     * @param {MyNode.Selector|MyNode.Selector[]} content 内容
     * @param {Number} [position=0] 位置
     * @returns {MyNode}
     * @memberof MyNode
     */
    before(content, position = 0) {
        return this.insert(content, position, 'beforeBegin');
    }

    /**
     * 在被选元素后插入指定内容
     * @param {MyNode.Selector|MyNode.Selector[]} content 内容
     * @param {Number} [position=0] 位置
     * @returns {MyNode}
     * @memberof MyNode
     */
    after(content, position = 0) {
        return this.insert(content, position, 'afterEnd');
    }

    /**
     * 在被选元素内部末尾位置插入指定内容
     * @param {MyNode.Selector|MyNode.Selector[]} content 内容
     * @param {Number} [position=0] 位置
     * @returns {MyNode}
     * @memberof MyNode
     */
    append(content, position = 0) {
        return this.insert(content, position, 'beforeEnd');
    }

    /**
     * 在被选元素内部起始位置插入指定内容
     * @param {MyNode.Selector|MyNode.Selector[]} content 内容
     * @param {Number} [position=0] 位置
     * @returns {MyNode}
     * @memberof MyNode
     */
    prepend(content, position = 0) {
        return this.insert(content, position, 'afterBegin');
    }

    /**
     * 将被选元素替换为指定内容
     * @param {MyNode.Selector|MyNode.Selector[]} content 内容
     * @param {Number} [position=0] 位置
     * @returns {MyNode}
     * @memberof MyNode
     */
    replaceWith(content, position = 0) {
        return this.insert(content, position, 'replaceWith');
    }

    /**
     * 移除节点
     * @memberof MyNode
     */
    remove() {
        this.forEach((item) => {
            Util.type(item.remove) == 'function' && item.remove();
        });
    }

    /**
     * 遍历<br/>
     * 与 Array.forEach() 有区别，当回调函数返回 false 时，会跳出循环
     * @param {Function} callback 回调函数
     * @returns {MyNode}
     * @memberof MyNode
     */
    forEach(callback) {
        for (let i = 0; i < this.length; i++) {
            if (callback.call(this[i], this[i], i, this) === false) {
                break;
            }
        }

        return this;
    }

    /**
     * 判断是否含有指定节点
     * @param {Node} elem 节点
     * @returns {Boolean}
     * @memberof MyNode
     */
    includes(elem) {
        let res = false;

        this.forEach((item) => {
            res = item === elem;
            return !res;
        });

        return res;
    }

    /**
     * 查找节点位置
     * @param {Node} elem 节点
     * @returns {Number}
     * @memberof MyNode
     */
    indexOf(elem) {
        return Util.toArray(this).indexOf(elem);
    }

    /**
     * 模拟 Array.push()
     * @param {Node} elem 节点
     * @returns {MyNode}
     * @memberof MyNode
     */
    push(elem) {
        if (elem && !this.includes(elem)) {
            this[this.length++] = elem;
        }

        return this;
    }

    /**
     * 模拟 Array.pop()
     * @returns {MyNode}
     * @memberof MyNode
     */
    pop() {
        delete this[--this.length];
        return this;
    }

    /**
     * 模拟 Array.splice()
     * @returns {MyNode}
     * @memberof MyNode
     */
    splice() {
        return new MyNode([].splice.apply(this, arguments), this);
    }

    /**
     * 模拟 Array.concat()
     * @param {MyNode[]} arr 节点数组
     * @returns {MyNode}
     * @memberof MyNode
     */
    concat(...arr) {
        arr.filter((item) => item instanceof MyNode).forEach((elem) => {
            elem.forEach((i) => this.push(i));
        });

        return this;
    }

    /**
     * 模拟 Array.reduce()
     * @param {Function} callback 回调函数
     * @param {*} value 上一次的结果
     * @returns {*}
     * @memberof MyNode
     */
    reduce(callback, value) {
        let res = value;

        if (Util.isFunction(callback)) {
            this.forEach((item) => {
                res = callback.call(this, res, item);
            });
        }

        return res;
    }

    // 模拟[].map()
    map(callback) {
        let res = [],
            i = 0,
            length = this.length;

        for (; i < length; i++) {
            res.push(callback.call(this[i], this[i], i, this));
        }

        return res;
    }

    // 封装第i个元素为MyNode类型
    eq(i) {
        let len = this.length,
            index = +i + (i < 0 ? len : 0);

        return new MyNode(index >= 0 && index < len ? this[index] : '', this);
    }

    // 封装偶数位的元素集合为MyNode类型
    even() {
        let res = new MyNode(),
            len = this.length,
            i = 0;

        for (; i < len; i++) {
            (i + 1) % 2 === 0 && res.push(this[i]);
        }
        res.prevObject = this;

        return res;
    }

    // 封装奇数位的元素集合为MyNode类型
    odd() {
        let res = new MyNode(),
            len = this.length,
            i = 0;

        for (; i < len; i++) {
            i % 2 === 0 && res.push(this[i]);
        }
        res.prevObject = this;

        return res;
    }

    // 封装父节点
    parent(selector) {
        let res = new MyNode();

        this.forEach((elem) => {
            let parent = elem.parentNode;

            if (parent && parent.nodeType === 1) {
                if (selector) {
                    // 存在选择器
                    if (Util.type(selector) === 'string') {
                        parent.matches(selector) && res.push(parent);
                    } else if (selector.nodeType) {
                        parent === selector && res.push(parent);
                    }
                } else {
                    res.push(parent);
                }
            }
        });
        res.prevObject = this;

        return res;
    }

    // 封装祖先节点
    parents(selector, until) {
        let res = new MyNode();

        this.forEach((elem) => {
            let parent = elem.parentNode;

            while (parent && parent.nodeType === 1) {
                if (selector) {
                    // 存在选择器
                    if (Util.type(selector) === 'string') {
                        parent.matches(selector) && res.push(parent);
                    } else if (selector.nodeType) {
                        parent === selector && res.push(parent);
                    }
                } else {
                    res.push(parent);
                }

                if (parent === until || parent.matches(until)) break;
                parent = parent.parentNode;
            }
        });
        res.prevObject = this;

        return res;
    }

    // 兄弟节点
    siblings(selector) {
        let res = new MyNode();

        this.forEach((item) => {
            new MyNode(item)
                .parent()
                .children(selector)
                .forEach((elem) => {
                    elem !== item && res.push(elem);
                });
        });
        res.prevObject = this;

        return res;
    }

    // 判断当前节点是父元素第几个元素
    posOfSiblings() {
        let node = new MyNode(this[0]);

        return node.parent().children().indexOf(node[0]);
    }

    // 前一个兄弟节点
    prevSiblings(selector) {
        let res = new MyNode();

        this.forEach((item) => {
            if (item.previousElementSibling && selector) {
                item.previousElementSibling.matches(selector) && res.push(item.previousElementSibling);
            } else {
                res.push(item.previousElementSibling);
            }
        });
        res.prevObject = this;

        return res;
    }

    // 后一个兄弟节点
    nextSiblings(selector) {
        let res = new MyNode();

        this.forEach((item) => {
            if (item.nextElementSibling && selector) {
                item.nextElementSibling.matches(selector) && res.push(item.nextElementSibling);
            } else {
                res.push(item.nextElementSibling);
            }
        });
        res.prevObject = this;

        return res;
    }

    /**
     * 查找子节点中符合条件的元素节点（nodeType = 1）
     * @param {MyNode.Selector} selector 选择器
     * @returns {MyNode}
     * @memberof MyNode
     */
    children(selector) {
        let res = new MyNode();

        this.forEach((item) => {
            Util.toArray(item.children).forEach((elem) => {
                if (selector) {
                    elem.matches(selector) && res.push(elem);
                } else {
                    res.push(elem);
                }
            });
        });
        res.prevObject = this;

        return res;
    }

    /**
     * 查找子节点中符合条件的所有节点
     * @param {MyNode.Selector} selector 选择器
     * @returns {MyNode}
     * @memberof MyNode
     */
    childNodes(selector) {
        let res = new MyNode();

        this.forEach((item) => {
            Util.toArray(item.childNodes).forEach((elem) => {
                if (selector) {
                    elem.matches(selector) && res.push(elem);
                } else {
                    res.push(elem);
                }
            });
        });
        res.prevObject = this;

        return res;
    }

    /**
     * 查找符合条件的子孙节点
     * @param {MyNode.Selector} selector 选择器
     * @returns {MyNode}
     * @memberof MyNode
     */
    find(selector) {
        let result = new MyNode();

        result.prevObject = this;
        /**
         * Node
         */
        if (selector instanceof Node) {
            this.forEach((item) => {
                if (new MyNode(selector).parents(item).length > 0) {
                    result.push(selector);
                }
            });
        }

        /**
         * MyNode
         */
        if (selector instanceof MyNode) {
            selector.forEach((elem) => {
                result.concat(this.find(elem));
            });
        }

        /**
         * String
         */
        if (Util.type(selector) === 'string') {
            this.forEach((item) => {
                item.nodeType === 1 &&
                    item.querySelectorAll(selector).forEach((elem) => {
                        result.push(elem);
                    });
            });
        }

        return result;
    }

    /**
     * 替换被选元素的内容，或返回被选元素的内容
     * @param {MyNode.Selector|MyNode.Selector[]} [content] 内容
     * @returns {MyNode}
     * @memberof MyNode
     */
    html(content) {
        if (content == null) {
            return this[0] ? this[0].innerHTML.trim() : '';
        }

        this.forEach((item) => (item.innerHTML = ''));
        this.append(content);
        return this;
    }

    /**
     * 获取或设置样式
     * @param {String|Object} style 属性
     * @param {String} [styleValue] 属性值
     * @returns {MyNode|String}
     * @memberof MyNode
     */
    css(style, styleValue) {
        /**
         * Object
         */
        if (Util.type(style) === 'object') {
            for (let styleName in style) {
                this.css(styleName, style[styleName]);
            }
            return this;
        }

        /**
         * String
         */
        if (Util.type(style) === 'string' && style.trim() != '') {
            if (styleValue == null) {
                return this[0] ? this[0].style.getPropertyValue(style) || window.getComputedStyle(this[0])[style] : '';
            }

            this.forEach((item) => item.nodeType === 1 && item.style.setProperty(style, String(styleValue)));
            return this;
        }

        return '';
    }

    /**
     * 获取或设置属性值
     * @param {String|Object} attribute 属性
     * @param {String} [attributeValue] 属性值
     * @returns {MyNode|String}
     * @memberof MyNode
     */
    attr(attribute, attributeValue) {
        /**
         * Object
         */
        if (Util.type(attribute) === 'object') {
            for (let attributeName in attribute) {
                this.attr(attributeName, attribute[attributeName]);
            }
            return this;
        }

        /**
         * String
         */
        if (Util.type(attribute) === 'string' && attribute.trim() != '') {
            if (attributeValue == null) {
                return this[0] && this[0].getAttribute(attribute);
            }

            if (Util.type(attributeValue) === 'object') {
                attributeValue = JSON.stringify(attributeValue);
            }
            this.forEach((item) => item.setAttribute(attribute, attributeValue));
            return this;
        }

        return null;
    }

    /**
     * 删除属性
     * @param {String} attributeName 属性名
     * @returns {MyNode}
     * @memberof MyNode
     */
    removeAttr(attributeName) {
        if (attributeName != null) {
            this.forEach((item) => item.removeAttribute(attributeName));
        }
        return this;
    }

    /**
     * 判断是否包含指定的 className，多个 className 用空格隔开（或直接使用字符串数组）<br/>
     * 若对象中含有多个元素，则只要其中任意一个元素含有指定的 className，就返回 true
     * @param {String|String[]} className 类名
     * @returns {Boolean}
     * @memberof MyNode
     */
    hasClass(className) {
        let res = false,
            classList = MyNode._string2Array(className).filter((elem) => elem != '');

        this.forEach((item) => {
            res =
                item.nodeType === 1 &&
                classList.every((elem) => {
                    return item.classList.contains(elem);
                });
            return !res;
        });

        return res;
    }
    /**
     * 添加指定的 className，多个 className 用空格隔开（或直接使用字符串数组）
     * @param {String|String[]} className 类名
     * @returns {MyNode}
     * @memberof MyNode
     */
    addClass(className) {
        let classList = MyNode._string2Array(className).filter((elem) => elem != '');

        this.forEach((item) => {
            item.nodeType === 1 &&
                classList.forEach((elem) => {
                    item.classList.add(elem);
                });
        });

        return this;
    }

    /**
     * 移除指定的 className，多个 className 用空格隔开（或直接使用字符串数组）<br/>
     * @param {String|String[]} className 类名
     * @returns {MyNode}
     * @memberof MyNode
     */
    removeClass(className) {
        let classList = MyNode._string2Array(className).filter((elem) => elem != '');

        this.forEach((item) => {
            item.nodeType === 1 &&
                classList.forEach((elem) => {
                    item.classList.remove(elem);
                });
        });

        return this;
    }

    /**
     * 判断是否含有指定的 className，有则移除，无则添加
     * @param {String|String[]} className 类名
     * @returns {MyNode}
     * @memberof MyNode
     */
    toggleClass(className) {
        let classList = MyNode._string2Array(className).filter((elem) => elem != '');

        this.forEach((item) => {
            let myNode = new MyNode(item);

            classList.forEach((elem) => {
                myNode.hasClass(elem) ? myNode.removeClass(elem) : myNode.addClass(elem);
            });
        });

        return this;
    }

    /**
     * 获取或设置 text 属性，删除前后空格
     * @param {String} content 内容
     * @returns {MyNode|String}
     * @memberof MyNode
     */
    text(content) {
        if (content != null) {
            this.forEach((item) => (item.innerText = content));
            return this;
        }

        return this[0] ? this[0].innerText.trim() : '';
    }

    /**
     * 获取或设置 value 属性，删除前后空格
     * @param {String} content 内容
     * @returns {MyNode|String}
     * @memberof MyNode
     */
    val(content) {
        if (content != null) {
            this.forEach((item) => (item.value = content));
            return this;
        }

        return this[0] ? this[0].value.trim() : '';
    }

    /**
     * 设置 text 和 title 属性
     * @param {String} content 内容
     * @returns {MyNode}
     * @memberof MyNode
     */
    textAndTitle(content) {
        if (content != null) {
            this.text(content).attr('title', content);
        }
        return this;
    }

    /**
     * 监听事件
     * @param {String} type 事件类型
     * @param {String} [selector] 选择器
     * @param {Function} callback 回调函数
     * @memberof MyNode
     * @example
     * callback(event, sourceNode, listenNode, triggerNode) <br/>
     * 回调函数绑定：匹配选择器的元素或监听元素 <br/>
     * 参数：<br/>
     * e：事件 <br/>
     * sourceNode：匹配选择器的元素或监听元素 <br/>
     * listenNode：监听元素 <br/>
     * triggerNode：触发元素 <br/>
     */
    on(type, selector, callback) {
        /**
         * 两个参数时，第二个参数作为回调函数
         * 三个参数时，第二个参数作为选择器，第三个参数作为回调函数
         * 其它情况，直接退出
         */
        switch (arguments.length) {
            case 2:
                callback = selector;
                selector = null;
                break;

            case 3:
                break;

            default:
                return;
        }

        this.forEach((item) => {
            item.addEventListener(type, function (e) {
                let listenNode = new MyNode(item),
                    triggerNode = new MyNode(e.srcElement),
                    sourceNode = null;

                if (selector) {
                    /**
                     * 有选择器
                     */
                    if (listenNode.find(selector).includes(e.srcElement)) {
                        /**
                         * 当触发事件的元素符合选择器时，执行 callback，绑定匹配选择器的元素
                         */
                        sourceNode = triggerNode;
                        callback.call(e.srcElement, e, sourceNode, listenNode, triggerNode);
                    } else {
                        /**
                         * 当触发事件的元素为选择器的子元素时，执行 callback，绑定匹配选择器的元素
                         */
                        triggerNode.parents(selector).forEach((elem) => {
                            sourceNode = new MyNode(elem);
                            if (sourceNode.parents(item).length > 0) {
                                callback.call(elem, e, sourceNode, listenNode, triggerNode);
                                return false;
                            }
                        });
                    }
                } else {
                    /**
                     * 没有选择器，执行 callback，绑定监听元素
                     */
                    sourceNode = listenNode;
                    callback.call(this, e, sourceNode, listenNode, triggerNode);
                }
            });
        });
    }

    /**
     * 触发点击事件
     * @memberof MyNode
     */
    click() {
        this.forEach((item) => {
            Util.type(item.click) === 'function' && item.click();
        });
    }

    /**
     * 偏移量
     * @returns {Object} result
     * @returns {Number} result.top 顶部偏移量
     * @returns {Number} result.left 左侧偏移量
     * @memberof MyNode
     */
    offset() {
        if (this.length == 0 || this[0].ownerDocument == null) {
            return;
        }

        let node = this[0],
            documentElement = node.ownerDocument.documentElement,
            res = node.getBoundingClientRect();

        return {
            top: res.top + window.scrollY - documentElement.clientTop,
            left: res.left + window.scrollY - documentElement.clientLeft,
        };
    }

    /**
     * 隐藏
     * @returns {MyNode}
     * @memberof MyNode
     * @todo 隐藏前先缓存用户定义的显示样式
     */
    hide() {
        this.forEach((item) => {
            let display = window.getComputedStyle(item).display;

            if (display != 'none') {
                let cache = MyNode._cache.get(item) || {};

                cache.display = display;
                MyNode._cache.set(item, cache);
                new MyNode(item).css('display', 'none');
            }
        });

        return this;
    }

    /**
     * 显示
     * @returns {MyNode}
     * @memberof MyNode
     * @todo
     * 1. 当节点已经在处于显示状态，则不处理
     * 2. 否则优先取缓存的显示样式
     * 3. 最后考虑 display: block
     */
    show() {
        this.forEach((item) => {
            let display = window.getComputedStyle(item).display;

            if (display == 'none') {
                let cache = MyNode._cache.get(item) || {};

                cache.display = cache.display || 'block';
                MyNode._cache.set(item, cache);
                new MyNode(item).css('display', cache.display);
            }
        });

        return this;
    }

    /**
     * 获取 offsetWidth（该属性为只读属性）
     * @param {String|Number} [num] 宽度
     * @returns {Number|MyNode}
     * @memberof MyNode
     * @example
     * style.width：样式宽度（跟 box-sizing 有关）
     * clientWidth：样式宽度 + padding - 滚动条宽度
     * offsetWidth：样式宽度 + padding + border（当 box-sizing: border-box 时，与 style.width 一致）
     * scrollWidth：元素内容的总宽度 + 元素padding
     */
    width(num) {
        /**
         * 获取宽度
         */
        if (num == null) {
            if (this.length > 0) {
                return this[0].offsetWidth;
            } else {
                return 0;
            }
        }

        /**
         * 设置宽度
         */
        let width = Util.type(num) == 'string' ? num : num + 'px';
        this.forEach((elem) => {
            elem.style.width = width;
        });
        return this;
    }

    /**
     * 获取 offsetHeight（该属性为只读属性）
     * @returns {Number}
     * @memberof MyNode
     * @example
     * style.height：样式宽度（跟 box-sizing 有关）
     * clientHeight：样式宽度 + padding - 滚动条宽度
     * offsetHeight：样式宽度 + padding + border（当 box-sizing: border-box 时，与 style.height 一致）
     * scrollHeight：元素内容的总宽度 + 元素padding
     */
    height(num) {
        /**
         * 获取高度
         */
        if (num == null) {
            if (this.length > 0) {
                return this[0].offsetHeight;
            } else {
                return 0;
            }
        }

        /**
         * 设置高度
         */
        let height = Util.type(num) == 'string' ? num : num + 'px';
        this.forEach((elem) => {
            elem.style.height = height;
        });
        return this;
    }

    /**
     * 节点内z-index最大值
     * @returns {Number}
     * @memberof MyNode
     */
    maxZIndex() {
        return this.find('*').reduce((res, elem) => {
            return Math.max(res, +window.getComputedStyle(elem).zIndex || 0);
        }, 0);
    }
}

/**
 * @member {Map} _cache 缓存
 * @memberof MyNode
 * @static
 */
MyNode._cache = new Map();

/**
 * 将内容根据分隔符拆分成数组
 * @param {String|String[]} content 内容
 * @param {String} [separator=' '] 分隔符
 * @memberof MyNode
 * @static
 */
MyNode._string2Array = function (content, separator = ' ') {
    if (Util.type(content) === 'array') {
        return content;
    }

    if (Util.type(content) === 'string') {
        return content.split(separator);
    }
    return [];
};

/**
 * 字符串转 DocumentFragment
 * @param {String} content 字符串
 * @returns {DocumentFragment}
 * @memberof MyNode
 * @static
 */
MyNode._string2fragment = function (content) {
    let template = document.createElement('template');
    template.innerHTML = content;

    return template.content;
};

export default MyNode;
