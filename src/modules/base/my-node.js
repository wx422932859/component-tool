import Util from './util.js';

/**
 * 封装 DOM 对象
 * @author wang.xin
 */
class MyNode {
    /**
     * Creates an instance of MyNode.
     * @param { String | DOM | MyNode } selector 选择器
     * @param { MyNode } prevObject 上一级对象
     */
    constructor(selector, prevObject) {
        if (selector instanceof MyNode) {
            return selector;
        }

        this.length = 0; // 元素个数
        this.prevObject = prevObject || document; // 前任
        this.init(selector);
    }

    /**
     * @description 初始化
     * @method
     * @param { Node | String | Array } selector 节点 | 选择器 | 数组
     */
    init(selector) {
        if (selector && selector.nodeType) {
            // 节点
            this.push(selector);
        } else if (
            Util.type(selector) !== 'string' &&
            Util.isArrayLike(selector) &&
            Util.type(selector.forEach) === 'function'
        ) {
            // 可迭代对象
            selector.forEach((element) => this.push(element));
        } else if (Util.type(selector) === 'string' && selector.trim() !== '') {
            // 字符串
            selector = selector.trim();
            if (selector[0] === '<' && selector[selector.length - 1] === '>' && selector.length >= 3) {
                let template = document.createElement('template');

                template.innerHTML = selector;
                this.concat(new MyNode(template.content).children());
            } else {
                document.querySelectorAll(selector).forEach((element) => this.push(element));
            }
        }
    }

    /**
     * 判断对象中是否含有指定元素
     * @param { DOM } elem DOM 元素
     * @return { Boolean }
     */
    includes(elem) {
        let res = false;

        this.forEach((item) => {
            res = item === elem;
            return !res;
        });

        return res;
    }

    // 模拟[].indexOf()
    indexOf(elem) {
        return Util.toArray(this).indexOf(elem);
    }

    // 模拟[].push()
    push(elem) {
        if (elem && !this.includes(elem)) {
            this[this.length++] = elem;
        }

        return this;
    }

    // 模拟[].pop()
    pop() {
        delete this[--this.length];
        return this;
    }

    // 模拟[].splice()
    splice() {
        return new MyNode([].splice.apply(this, arguments), this);
    }

    // 模拟[].concat()
    concat(...arr) {
        arr.filter((item) => item instanceof MyNode).forEach((elem) => {
            elem.forEach((i) => this.push(i));
        });

        return this;
    }

    // 模拟[].forEach()
    forEach(callback) {
        let value,
            i = 0,
            length = this.length;

        for (; i < length; i++) {
            value = callback.call(this[i], this[i], i, this);
            if (value === false) {
                break;
            }
        }

        return this;
    }

    // 模拟[].reduce()
    reduce(callback, value) {
        let res = value;

        if (Util.isFunction(callback)) {
            this.forEach((item) => (res = callback.call(this, res, item)));
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

    // 判断是否包含指定的class，多个class用空格隔开
    hasClass(str = '') {
        let res = false,
            arr = str.split(' ');

        this.forEach((item) => {
            res = item.nodeType === 1 && arr.every((element) => item.classList.contains(element));
            return !res;
        });

        return res;
    }

    // 移除指定的class，多个class用空格隔开
    removeClass(str = '') {
        let arr = Util.type(str) === 'string' ? str.split(' ') : [];

        this.forEach((item) => {
            item.nodeType === 1 && arr.forEach((element) => item.classList.remove(element));
        });

        return this;
    }

    // 添加指定的class，多个class用空格隔开
    addClass(str = '') {
        let arr = Util.type(str) === 'string' ? str.split(' ') : [];

        this.forEach((item) => {
            item.nodeType === 1 && arr.forEach((element) => element && item.classList.add(element));
        });

        return this;
    }

    // 判断是否含有指定的class，有则移除，无则添加
    toggleClass(str = '') {
        let myNode = null;

        this.forEach((item) => {
            myNode = new MyNode(item);
            myNode.hasClass(str) ? myNode.removeClass(str) : myNode.addClass(str);
        });

        return this;
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

    // 子节点
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

    // 子节点
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

    // 子孙节点
    find(selector) {
        let res = new MyNode();

        this.forEach((item) => {
            item.querySelectorAll(selector).forEach((elem) => {
                res.push(elem);
            });
        });
        res.prevObject = this;

        return res;
    }

    // CSS
    css(key, value) {
        if (value != null || Util.type(key) === 'object') {
            // 设置样式
            switch (Util.type(key)) {
                case 'string':
                    this.forEach((item) => item.style.setProperty(key, value));
                    break;

                case 'object':
                    for (let k in key) {
                        this.css(k, key[k]);
                    }
                    break;

                default:
                    break;
            }
        } else {
            // 获取样式
            return this[0] ? this[0].style.getPropertyValue(key) || window.getComputedStyle(this[0])[key] : '';
        }

        return this;
    }

    // Attribute
    attr(key, value) {
        if (value != null || Util.type(key) === 'object') {
            // 设置属性
            switch (Util.type(key)) {
                case 'string':
                    this.forEach((item) => item.setAttribute(key, value));
                    break;

                case 'object':
                    for (let k in key) {
                        this.attr(k, key[k]);
                    }
                    break;

                default:
                    break;
            }
        } else {
            // 获取属性
            return this[0] ? this[0].getAttribute(key) : 'null';
        }

        return this;
    }

    // removeAttribute
    removeAttr(str) {
        if (str != null) {
            this.forEach((item) => item.removeAttribute(str));
        }
        return this;
    }

    // Text
    text(str) {
        if (str != null) {
            this.forEach((item) => (item.innerText = str));
            return this;
        }

        return this[0] ? this[0].innerText.trim() : '';
    }

    // Value
    val(value) {
        if (value != null) {
            this.forEach((item) => (item.value = value));
            return this;
        }

        return this[0] ? this[0].value : '';
    }

    // HTML
    html(str) {
        if (str != null) {
            if (Util.type(str) === 'string') {
                // 字符串
                if (str.includes('<script>')) {
                    this.forEach((item) => {
                        item.innerHTML = ''; // 清除内容
                        let myNode = new MyNode(document.createElement('div'));

                        myNode[0].innerHTML = str;
                        myNode.children().forEach((elem) => item.appendChild(elem));
                    });
                } else {
                    this.forEach((item) => (item.innerHTML = str));
                }
            } else if (str instanceof MyNode || str.nodeType === 1) {
                // MyNode | Node
                this.html('');
                this.append(str);
            } else {
                this.forEach((item) => (item.innerHTML = str));
            }
            return this;
        }

        return this[0] ? this[0].innerHTML.trim() : '';
    }

    // Text And Title
    textAndTitle(str) {
        if (str != null) {
            this.forEach((item) => new MyNode(item).text(str).attr('title', str));
        }
        return this;
    }

    // Event
    on(type, selector, callback) {
        // 两个参数时，第二个参数作为回调函数
        // 三个参数时，第二个参数作为选择器，第三个参数作为回调函数
        switch (arguments.length) {
            case 2:
                callback = selector;
                selector = '';
                break;

            case 3:
                break;

            default:
                return;
        }

        this.forEach((item) => {
            item.addEventListener(type, function (e) {
                let _item = new MyNode(item);

                if (selector) {
                    if (_item.find(selector).includes(e.srcElement)) {
                        // 点击的节点匹配
                        callback.call(e.srcElement, e, new MyNode(e.srcElement), _item, new MyNode(e.srcElement));
                    } else {
                        new MyNode(e.srcElement).parents(selector).forEach((elem) => {
                            if (new MyNode(elem).parents(item).length > 0) {
                                callback.call(elem, e, new MyNode(elem), _item, new MyNode(e.srcElement));
                                return false;
                            }
                        });
                    }
                } else {
                    callback.call(this, e, new MyNode(this), _item, new MyNode(e.srcElement));
                }
            });
        });
    }

    // 点击事件
    click() {
        this.forEach((item) => item.click());
    }

    // 偏移量
    offset() {
        let docElem,
            elem = this[0],
            res = {
                top: 0,
                left: 0,
            },
            doc = elem && elem.ownerDocument;

        if (!doc) {
            return;
        }

        docElem = doc.documentElement;
        res = elem.getBoundingClientRect();

        return {
            top: res.top + window.pageYOffset - docElem.clientTop,
            left: res.left + window.pageXOffset - docElem.clientLeft,
        };
    }

    // 隐藏
    hide() {
        let node = null,
            obj = {};

        this.forEach((item) => {
            node = new MyNode(item);
            obj = MyNode._cache.get(item) || {};

            if (node.css('display') !== 'none') {
                Object.assign(obj, {
                    display: node.css('display'),
                });
                node.css('display', 'none');
            }
            MyNode._cache.set(item, obj);
        });

        return this;
    }

    // 显示
    show() {
        let cache = null,
            display = 'block';

        this.forEach((item) => {
            cache = MyNode._cache.get(item);
            display = cache ? cache.display || 'block' : 'block';
            new MyNode(item).css('display', display);
        });

        return this;
    }

    // 宽
    width() {
        if (this.length > 0) {
            return this[0].offsetWidth;
        }

        return 0;
    }

    // 高
    height() {
        if (this.length > 0) {
            return this[0].offsetHeight;
        }

        return 0;
    }

    /**
     * @description 添加node为最后一个子节点，当集合有多个元素的时候，只在pos处添加指定节点，其余皆为深拷贝的节点
     * @param { Node } node 要插入的节点
     * @param { Number } pos 位置
     */
    append(node, pos = 0) {
        if (node && node.nodeType === 1) {
            // Node
            this.forEach((item, index) => item.appendChild(index == pos ? node : node.cloneNode(true)));
        } else if (node instanceof MyNode) {
            // MyNode
            node.forEach((item) => this.append(item, pos));
        } else if (Util.type(node) === 'string') {
            // String
            if (node[0] === '<' && node[node.length - 1] === '>' && node.length >= 3) {
                this.append(new MyNode(node), pos);
            } else {
                this.forEach((item) => item.appendChild(document.createTextNode(node)));
            }
        } else {
            this.append(new MyNode(node), pos);
        }

        return this;
    }

    /**
     * @description 添加node为第一个子节点，当集合有多个元素的时候，只在pos处添加指定节点，其余皆为深拷贝的节点
     * @param { Node } node 要插入的节点
     * @param { Number } pos 位置
     */
    prepend(node, pos = 0) {
        let children = this.children();

        if (children.length > 0) {
            children.eq(0).before(node, pos);
        } else {
            this.append(node, pos);
        }

        return this;
    }

    /**
     * @description 在节点前插入node节点，当集合有多个元素的时候，只在pos处插入指定节点，其余皆为深拷贝的节点
     * @param { Node } node 要插入的节点
     * @param { Number } pos 位置
     */
    before(node, pos = 0) {
        if (node && node.nodeType === 1) {
            // Node
            this.forEach((item, index) =>
                item.parentNode.insertBefore(index == pos ? node : node.cloneNode(true), item)
            );
        } else if (node instanceof MyNode) {
            // MyNode
            node.forEach((item) => this.before(item, pos));
        } else if (Util.type(node) === 'string') {
            // String
            if (node[0] === '<' && node[node.length - 1] === '>' && node.length >= 3) {
                this.before(new MyNode(node), pos);
            } else {
                this.forEach((item) => item.parentNode.insertBefore(document.createTextNode(node), item));
            }
        } else {
            this.before(new MyNode(node), pos);
        }

        return this;
    }

    /**
     * @description 在节点后插入node节点，当集合有多个元素的时候，只在pos处插入指定节点，其余皆为深拷贝的节点
     * @param { Node } node 要插入的节点
     * @param { Number } pos 位置
     */
    after(node, pos = 0) {
        if (node && node.nodeType === 1) {
            // Node
            this.forEach((item, index) =>
                item.parentNode.insertBefore(index == pos ? node : node.cloneNode(true), item.nextElementSibling)
            );
        } else if (node instanceof MyNode) {
            // MyNode
            node.forEach((item) => this.after(item, pos));
        } else if (Util.type(node) === 'string') {
            // String
            if (node[0] === '<' && node[node.length - 1] === '>' && node.length >= 3) {
                this.after(new MyNode(node), pos);
            } else {
                this.forEach((item) =>
                    item.parentNode.insertBefore(document.createTextNode(node), item.nextElementSibling)
                );
            }
        } else {
            this.after(new MyNode(node), pos);
        }

        return this;
    }

    /**
     * @description 替换为node节点，当集合有多个元素的时候，只在pos处插入指定节点，其余皆为深拷贝的节点
     * @param { Node } node 要替换的节点
     * @param { Number } pos 位置
     */
    replaceWith(node, pos = 0) {
        let res = new MyNode(node);

        res.length > 0 ? this.before(node, pos).remove() : '';

        return res;
    }

    // 移除
    remove() {
        this.forEach((item) => item.remove());
    }

    // 节点内z-index最大值
    maxZIndex() {
        return this.find('*').reduce((res, elem) => {
            return Math.max(res, +window.getComputedStyle(elem).zIndex || 0);
        }, 0);
    }
}
MyNode._cache = new Map();

export default MyNode;
