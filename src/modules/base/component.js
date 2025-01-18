import Observe from './observe.js';
import MyNode from './my-node.js';
import EventBus from './event-bus.js';
import Util from './util.js';
import VC from './vc.js';
import TaskQueue from './task-queue.js';

/**
 * 组件基类
 * 生命周期函数：统一以 __ 为前缀
 * 内置函数：统一以 _ 为前缀
 *
 * @author wang.xin
 */
class Component {
    /**
     * Creates an instance of Component.
     * @param {String|Node|MyNode} selector 选择器
     */
    constructor(selector) {
        /**
         * @member {MyNode} node 组件根节点
         * @memberof Component
         * @inner
         */
        this.node = new MyNode(selector || this.constructor._template.trim());

        try {
            this._init_extends_property();
            this._mount_component();
        } catch (err) {
            console.log(err);
        }
    }

    /**
     * 执行在 new () 之后，属性初始化、模板解析之前
     */
    __before_create() {
        console.log(this.constructor.name, '__before_create');
    }

    /**
     * 执行在自身属性初始化、模板解析之后，挂载之前
     */
    __created() {
        console.log(this.constructor.name, '__created');
    }

    /**
     * 执行在组件挂载之后
     */
    __mounted() {
        console.log(this.constructor.name, '__mounted');
    }

    /**
     * 初始化继承属性和版本号
     */
    _init_extends_property() {
        let extendsClass = this.__proto__,
            extendsStack = [];

        while (extendsClass) {
            // 确保执行的是自己定义的方法，避免重复执行
            if (
                extendsClass.hasOwnProperty('_extends_property') &&
                typeof extendsClass._extends_property === 'function'
            ) {
                extendsStack.push(extendsClass._extends_property);
            }

            // _version 是类的属性
            if (extendsClass.constructor.hasOwnProperty('_version')) {
                this.node.attr(`vc-${extendsClass.constructor._version}`, '');
            }

            extendsClass = extendsClass.__proto__;
        }
        // 让方法按继承顺序执行
        for (let i = extendsStack.length - 1; i > -1; i--) {
            extendsStack[i].call(this);
        }
    }

    /**
     * 继承属性
     * @abstract
     */
    _extends_property() {
        let self = this;

        /**
         * @member {EventBus} _bus 事件总线
         * @memberof Component#
         */
        this._bus = new EventBus();

        /**
         * @member {Component} _parent 指向父组件
         * @memberof Component#
         */
        this._parent = null;

        /**
         * @member {Component} _root 指向根组件
         * @memberof Component#
         */
        this._root = this;

        /**
         * @member {Proxy} _children 存放子组件的代理对象
         * @memberof Component#
         */
        this._children = new Proxy(
            {},
            {
                get(target, prop) {
                    if (!prop in target) {
                        try {
                            throw new ReferenceError(`Children component ${prop} does not exit.`);
                        } catch (err) {
                            console.log(err);
                        }
                    }
                    return Reflect.get(...arguments);
                },
                set(target, prop, value) {
                    if (value instanceof Component) {
                        value._parent = self;
                        self._reset_root(value);
                    }
                    return Reflect.set(target, prop, value);
                }
            }
        );

        /**
         * @member {Function} _destroyed 销毁
         * @memberof Component#
         */
        Object.defineProperty(this, '_destroyed', {
            writable: false,
            enumerable: false,
            value: new Proxy(this._destroyed, {
                apply(target, thisArg, params) {
                    let res = Reflect.apply(...arguments);
                    self._after_destroyed();
                    return res;
                }
            })
        });

        /**
         * @member {Function} _send_msg 发送消息
         * @memberof Component#
         */
        Object.defineProperty(this, '_send_msg', {
            writable: false,
            enumerable: false,
            value: new Proxy(this._send_msg, {
                apply(target, thisArg, params) {
                    let parent = self._parent,
                        { action, data } = params[0] || {};

                    if (params[1] === true) {
                        while (parent instanceof Component) {
                            parent._listen_msg(self, ...params);
                            parent = parent._parent;
                        }
                    } else {
                        if (parent instanceof Component) {
                            parent._listen_msg(self, ...params);
                            parent._listen_component(self, action, data);
                        }
                    }

                    return Reflect.apply(...arguments);
                }
            })
        });

        /**
         * @member {Function} _o 监听器
         * @memberof Component#
         */
        Object.defineProperty(this, '_o', {
            value: new Observe({
                target: this,
                property: {},
                callback: {}
            })
        });

        /**
         * @member {Proxy} load 加载
         * @memberof Component#
         */
        Object.defineProperty(this, 'load', {
            writable: false,
            enumerable: false,
            value: new Proxy(this.load, {
                apply(target, thisArg, params) {
                    self._before_load(params);
                    let res = Reflect.apply(...arguments);
                    return res;
                }
            })
        });

        /**
         * @event 增加默认全局事件监听
         */
        this._bus.on(this.constructor.name, (msg) => {
            const { component, action, data } = msg;
            this._listen_component(component, action, data);
        });
    }

    /**
     * 加载前操作
     */
    _before_load() {}

    /**
     * 子组件实例化完成后执行的函数
     */
    _mounted() {
        this._load_children_component();
    }

    /**
     * 销毁组件
     */
    _destroyed() {}

    /**
     * 销毁后执行移除节点，并删除引用
     */
    _after_destroyed() {
        this.node.remove();

        // 有父节点
        if (this._parent instanceof Component) {
            for (let key in this._parent._children) {
                this._parent._children[key] === this && delete this._parent._children[key];
            }
        }
    }

    /**
     * 发送消息，仅限用于子组件给父组件传递消息，建议使用 _send_component
     * @param {object} msg 消息
     */
    _send_msg(msg) {}

    /**
     * 监听子组件消息，使用时重写该方法
     * @param {Component} component 消息来源组件，建议使用 _listen_component
     * @param {object} msg 消息
     */
    _listen_msg(component, msg) {}

    /**
     * 给组件传递消息
     * @param {String|String[]} componentName 组件类名
     * @param {String} action 动作
     * @param {Object} data 数据
     */
    _send_component(componentName, action, data) {
        this._bus.emit(componentName, {
            component: this,
            action,
            data
        });
    }

    /**
     * 接收组件消息，使用时重写该方法
     * @param {Component} component 消息来源组件
     * @param {String} action 动作
     * @param {Object} data 数据
     */
    _listen_component(component, action, data) {}

    /**
     * 监听属性
     * @param {string} property 属性
     * @param {*} value 值
     * @param {*} callback 响应方法
     * @param {boolean} [deep=true] 是否深度监听
     */
    _observe(property, value, callback = () => {}, deep = true) {
        if (arguments.length === 1) {
            this._observe(property, undefined, callback);
        } else if (Util.type(value) === 'function') {
            this._observe(property, undefined, value);
        } else {
            if (property in this) {
                if (value != null) {
                    this[property] = value;
                }
                this._o.addCallback(property, callback, this);
            } else {
                this._o.defineObject({
                    target: this,
                    property,
                    value,
                    callback: callback.bind(this),
                    deep
                });
            }
        }
    }

    /**
     * 挂载组件
     */
    _mount_component() {
        let taskQueue = new TaskQueue();

        taskQueue.free = false;
        this.node.find('slot').forEach((elem, index, list) => {
            let slot = list.eq(index), // 插槽
                src = slot.attr('data-src'), // 组件地址
                componentName = slot.attr('data-component'), // 组件类名
                authority = slot.attr('data-auth');

            if (authority && (authority === 'false' || Util.eval(authority) === false)) {
                return;
            }

            if (componentName && componentName.includes('${')) {
                componentName = Util.eval(componentName);
            }

            if (componentName == null || componentName === '') {
                componentName = VC.parseComponentName(src);
            }

            if (componentName === '') {
                console.log(`组件${src}获取失败！`);
                return;
            }

            if (eval(`typeof ${componentName} == 'undefined'`) && src != null) {
                taskQueue.add(VC.imports, [
                    {
                        filePath: src,
                        handle: () => {
                            this._instantiate_component(slot, componentName);
                        }
                    }
                ]);
            } else {
                // 已存在指定的组件变量
                this._instantiate_component(slot, componentName);
            }
        });
        taskQueue.add(() => {
            this._mounted();
        });
        taskQueue.free = true;
    }

    /**
     * 实例化子组件
     * @param {MyNode} slot 插槽
     * @param {string} componentName 组件类名
     */
    _instantiate_component(slot, componentName) {
        let instantiateName = slot.attr('data-name'), // 实例化名称
            className = slot.attr('class'); // 插槽绑定的类

        // 若没有定义实例化名称，则将类名首字母小写作为为、实例化名称
        if (instantiateName === null || instantiateName === '') {
            let realComponentName = /[A-Za-z]*$/.exec(componentName)[0];

            instantiateName = realComponentName.replace(realComponentName[0], realComponentName[0].toLowerCase());
        }

        if (
            eval(`typeof ${componentName} == 'undefined'`) ||
            !eval(`${componentName}.prototype instanceof Component`)
        ) {
            console.log(`${componentName}未定义！`);
            return;
        }

        this._children[instantiateName] = eval(`new ${componentName}()`);
        this._children[instantiateName].node.addClass(className);
        slot.replaceWith(this._children[instantiateName].node);
    }

    /**
     * 重置根组件
     * @param {Component} component 组件
     */
    _reset_root(component) {
        component._root = this._root;
        for (let key in component._children) {
            if (component instanceof Component && component._children[key] instanceof Component) {
                component._reset_root(component._children[key]);
            }
        }
    }

    /**
     * 判断组件的父组件中是否含有指定组件
     * @param {Component} component 组件
     */
    _has_parent(component) {
        if (this._parent === component) {
            return true;
        }

        while (this._parent instanceof Component) {
            return this._parent._has_parent(component);
        }

        return false;
    }

    /**
     * 判断组件的子组件中是否包含指定组件
     * @param {Component} component 组件
     */
    _has_child(component) {
        for (let child in this._children) {
            if (this._children[child] === component) {
                return true;
            }
            this._children[child]._has_child(component);
        }

        return false;
    }

    /**
     * 加载子组件（实例化后的加载）
     */
    _load_children_component() {
        let componentList = this.node.attr('data-mounted');

        if (componentList == null) {
            return;
        }

        componentList = componentList.split(',');
        componentList.forEach((componentName) => {
            componentName = componentName.trim();

            if (!this._children[componentName] instanceof Component) {
                console.log(componentName, '没有实例化该组件！');
                return;
            }

            if (typeof this._children[componentName].load === 'function') {
                this._children[componentName].load();
            } else {
                console.log(componentName, '没有定义load方法！');
            }
        });
    }

    /**
     * 加载
     * @abstract
     */
    load() {}

    /**
     * 卸载
     * @abstract
     */
    unload() {}
}

/**
 * @member {String} _template 模板
 * @memberof Component
 * @static
 */
Component._template = '';

export default Component;
