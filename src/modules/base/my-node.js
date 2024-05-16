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
        this._init(selector);
    }

    /**
     * 初始化
     * @param {MyNode.Selector|MyNode.Selector[]} selector 选择器
     * @memberof MyNode
     */
    _init(selector) {
        /**
         * Node
         */
        if (selector instanceof Node) {
            this.push(selector);
        }

        /**
         * Array
         */
        if (typeof selector === 'object' && Util.isArrayLike(selector) && Util.type(selector.forEach) === 'function') {
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
                this.concat(this._template2MyNode(selector));
            }
        }
    }

    /**
     * 模板字符串转MyNode
     * @param {String} content 模板字符串
     * @return {MyNode}
     * @memberof MyNode
     */
    _template2MyNode(content) {
        let template = document.createElement('template');
        template.innerHTML = content;
        return new MyNode(template.content.childNodes);
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
            if (content.nodeName.toLocaleLowerCase() === 'template') {
                template.content.querySelectorAll('script').forEach((elem) => {
                    this.appendAndRunScript(elem.innerHTML);
                    elem.remove();
                });
            } else if (content.nodeName.toLocaleLowerCase() === 'script') {
                this.appendAndRunScript(content.innerHTML);
            }
        }

        /**
         * String
         */
        if (Util.type(content) === 'string') {
            this.appendAndRunScript(content);
        }
    }

    /**
     * 添加 script 节点，并执行其中代码
     * @param {string} code 代码
     * @memberof MyNode
     */
    appendAndRunScript(code) {
        let scriptNode = document.createElement('script');
        scriptNode.innerHTML = code;
        document.body.appendChild(scriptNode);
    }

    /**
     * 在被选元素前插入指定内容
     * 当被选元素有多个，则只在 this[pos] 元素后插入指定内容，其余皆为深拷贝的内容
     * @param {MyNode.Selector|MyNode.Selector[]} content 内容
     * @param {Number} [pos=0] 位置
     * @return {MyNode}
     * @memberof MyNode
     */
    before(content, pos = 0) {
        /**
         * Node
         */
        if (content instanceof Node) {
            this.forEach((item, index) =>
                item.parentNode.insertBefore(index == pos ? content : content.cloneNode(true), item)
            );
        }

        /**
         * Array
         */
        if (content instanceof MyNode) {
            /**
             * MyNode
             */
            content.forEach((item) => this.before(item, pos));
        } else if (
            typeof content === 'object' &&
            Util.isArrayLike(content) &&
            Util.type(content.forEach) === 'function'
        ) {
            content.forEach((elem) => this.before(new MyNode(elem), pos));
        }

        /**
         * String
         */
        if (Util.type(content) === 'string') {
            this.before(this._template2MyNode(content), pos);
        }
        return this;
    }

    /**
     * 在被选元素后插入指定内容
     * 当被选元素有多个，则只在 this[pos] 元素后插入指定内容，其余皆为深拷贝的内容
     * @param {MyNode.Selector|MyNode.Selector[]} content 内容
     * @param {Number} [pos=0] 位置
     * @return {MyNode}
     * @memberof MyNode
     */
    after(content, pos = 0) {
        /**
         * Node
         */
        if (content instanceof Node) {
            this.forEach((item, index) => {
                item.parentNode.insertBefore(index == pos ? content : content.cloneNode(true), item.nextElementSibling);
            });
        }

        /**
         * Array
         */
        if (content instanceof MyNode) {
            /**
             * MyNode
             */
            content.forEach((item) => this.after(item, pos));
        } else if (
            typeof content === 'object' &&
            Util.isArrayLike(content) &&
            Util.type(content.forEach) === 'function'
        ) {
            content.forEach((elem) => this.after(new MyNode(elem), pos));
        }

        /**
         * String
         */
        if (Util.type(content) === 'string') {
            this.after(this._template2MyNode(content), pos);
        }

        return this;
    }

    /**
     * 在被选元素内部末尾位置插入指定内容<br/>
     * 当被选元素有多个，则只在 this[pos] 元素后插入指定内容，其余皆为深拷贝的内容
     * @param {MyNode.Selector|MyNode.Selector[]} content 内容
     * @param {Number} [pos=0] 位置
     * @return {MyNode}
     * @memberof MyNode
     */
    append(content, pos = 0) {
        /**
         * Node
         */
        if (content instanceof Node) {
            this.appendScript(content);
            this.forEach((item, index) => {
                item.appendChild(index == pos ? content : content.cloneNode(true));
            });
        }

        /**
         * Array
         */
        if (content instanceof MyNode) {
            /**
             * MyNode
             */
            content.forEach((item) => this.append(item, pos));
        } else if (
            typeof content === 'object' &&
            Util.isArrayLike(content) &&
            Util.type(content.forEach) === 'function'
        ) {
            content.forEach((elem) => this.append(new MyNode(elem), pos));
        }

        /**
         * String
         */
        if (Util.type(content) === 'string') {
            this.append(this._template2MyNode(content), pos);
        }

        return this;
    }

    /**
     * 在被选元素内部起始位置插入指定内容<br/>
     * 当被选元素有多个，则只在 this[pos] 元素后插入指定内容，其余皆为深拷贝的内容
     * @param {MyNode.Selector|MyNode.Selector[]} content 内容
     * @param {Number} [pos=0] 位置
     * @return {MyNode}
     * @memberof MyNode
     */
    prepend(content, pos = 0) {
        let children = this.children();

        if (children.length > 0) {
            children.eq(0).before(content, pos);
        } else {
            this.append(content, pos);
        }

        return this;
    }

    /**
     * 替换被选元素的内容，或返回被选元素的内容
     * @param {MyNode.Selector|MyNode.Selector[]} [content] 内容
     * @return {MyNode}
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
     * 遍历<br/>
     * 与 Array.forEach() 有区别，当回调函数返回 false 时，会跳出循环
     * @param {Function} callback 回调函数
     * @return {MyNode}
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
     * @return {Boolean}
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
     * @return {Number}
     * @memberof MyNode
     */
    indexOf(elem) {
        return Util.toArray(this).indexOf(elem);
    }

    /**
     * 模拟 Array.push()
     * @param {Node} elem 节点
     * @return {MyNode}
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
     * @return {MyNode}
     * @memberof MyNode
     */
    pop() {
        delete this[--this.length];
        return this;
    }

    /**
     * 模拟 Array.splice()
     * @return {MyNode}
     * @memberof MyNode
     */
    splice() {
        return new MyNode([].splice.apply(this, arguments), this);
    }

    /**
     * 模拟 Array.concat()
     * @param {MyNode[]} arr 节点数组
     * @return {MyNode}
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
     * @return {*}
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

    /**
     * 显示
     * @return {MyNode}
     * @memberof MyNode
     */
    show() {
        this.forEach((item) => {
            let cache = MyNode._cache.get(item) || {};
            if (cache.display == null) {
                cache.display = window.getComputedStyle(elem).display;
            }

            let display = cache.display !== 'none' ? cache.display : 'block';
            new MyNode(item).css('display', display);
        });

        return this;
    }

    /**
     * 获取 offsetWidth
     * @return {Number}
     * @memberof MyNode
     */
    width() {
        if (this.length > 0) {
            return this[0].offsetWidth;
        }

        return 0;
    }

    /**
     * 获取 offsetHeight
     * @return {Number}
     * @memberof MyNode
     */
    height() {
        if (this.length > 0) {
            return this[0].offsetHeight;
        }

        return 0;
    }

    /**
     * 将被选元素替换为指定内容<br/>
     * 当被选元素有多个，则只将 this[pos] 元素替换为指定内容，其余皆为深拷贝的内容
     * @param {MyNode.Selector|MyNode.Selector[]} content 内容
     * @param {Number} [pos=0] 位置
     * @return {MyNode}
     * @memberof MyNode
     */
    replaceWith(content, pos = 0) {
        let res = new MyNode(content);

        this.before(res, pos).remove();
        return res;
    }

    /**
     * 移除节点
     * @memberof MyNode
     */
    remove() {
        this.forEach((item) => item.remove());
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
MyNode._cache = new Map();

export default MyNode;
