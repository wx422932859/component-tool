import Observe from './observe.js';
import MyNode from './my-node.js';
import EventBus from './event-bus.js';
import Util from './util.js';
import VC from './vc.js';
import TaskQueue from './task-queue.js';

/**
 * 组件基类
 *
 * @author wang.xin
 */
class Component {
    /**
     * Creates an instance of Component.
     * @param {String|Node|MyNode} selector 选择器
     */
    constructor(selector) {
        let self = this,
            _constructor = this.__proto__.constructor;

        selector = selector || _constructor._template.trim();

        /**
         * @member {MyNode} node 组件根节点
         * @memberof Component
         * @inner
         */
        this.node = new MyNode(selector);

        /**
         * 添加版本号
         */
        let tempConstructor = _constructor;
        while (tempConstructor !== Component) {
            if (tempConstructor._version !== undefined) {
                this.node.attr(`vc-${tempConstructor._version}`, '');
            }
            tempConstructor = tempConstructor.__proto__;
        }

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
         * @memberof Component
         * @inner
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
                        { action, data } = params[0];

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
         * @memberof Component
         * @inner
         */
        Object.defineProperty(this, '_o', {
            value: new Observe({
                target: this,
                property: {},
                callback: {}
            })
        });

        /**
         * @event 增加默认全局事件监听
         */
        this._bus.on(_constructor.name, (msg) => {
            const { component, action, data } = msg;
            this._listen_component(component, action, data);
        });

        /**
         * @member {Proxy} load 加载
         * @memberof Component
         * @inner
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

        this._mount_component();
    }

    /**
     * 加载前操作
     */
    _before_load(...parameter) {
        this._arguments = parameter;
    }

    /**
     * 加载
     */
    load() {}

    /**
     * 卸载
     */
    unload() {}

    /**
     * 子组件实例化完成后执行的函数
     */
    _mounted() {}

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
     * 发送消息，仅限用于子组件给父组件传递消息，建议使用 _listen_component
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

        // 定义实例化名称
        instantiateName = instantiateName || componentName.replace(componentName[0], componentName[0].toLowerCase());

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
            return this._parent._is_parent(component);
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
            this._children[child].$child(component);
        }

        return false;
    }
}

/**
 * @member {String} _template 模板
 * @memberof Component
 * @static
 */
Component._template = '';

export default Component;
