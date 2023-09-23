import Observe from './observe.js';
import MyNode from './my-node.js';
import EventBus from './event-bus.js';
import Util from './util.js';
import VC from './vc.js';
import TaskQueue from './task-queue.js';

/**
 * 组件基类
 * @author wang.xin
 */
class Component {
    /**
     * Creates an instance of Component.
     * @param {string | DOM | MyNode} selector 选择器
     */
    constructor(selector) {
        let self = this;

        selector = selector || this.__proto__.constructor._template;

        /**
         * @member {MyNode} node 组件根节点
         * @memberof Component
         * @inner
         */
        this.node = new MyNode(selector);

        /**
         * @member {EventBus} _bus 事件总线
         * @memberof Component
         * @inner
         */
        this._bus = new EventBus();

        /**
         * @member {Component} _parent 指向父组件
         * @memberof Component
         * @inner
         */
        this._parent = null;

        /**
         * @member {Component} _root 指向根组件
         * @memberof Component
         * @inner
         */
        this._root = this;

        /**
         * @member {Proxy} _children 存放子组件的代理对象
         * @memberof Component
         * @inner
         */
        this._children = new Proxy(
            {},
            {
                get: Reflect.get,
                set(target, prop, value) {
                    if (value instanceof Component) {
                        value._parent = self;
                        self._reset_root(value);
                    }
                    return Reflect.set(target, prop, value);
                },
            }
        );

        /**
         * @member {function} _destroyed 销毁
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
                },
            }),
        });

        /**
         * @member {function} _send_msg 发送消息
         * @memberof Component
         * @inner
         */
        Object.defineProperty(this, '_send_msg', {
            writable: false,
            enumerable: false,
            value: new Proxy(this._send_msg, {
                apply(target, thisArg, params) {
                    let parent = self._parent;

                    if (params[1] === true) {
                        while (parent instanceof Component) {
                            parent._listen_msg(self, ...params);
                            parent = parent._parent;
                        }
                    } else {
                        parent instanceof Component &&
                            parent._listen_msg(self, ...params);
                    }

                    return Reflect.apply(...arguments);
                },
            }),
        });

        /**
         * @member {function} _o 监听器
         * @memberof Component
         * @inner
         */
        Object.defineProperty(this, '_o', {
            value: new Observe({
                target: this,
                property: {},
                callback: {},
            }),
        });

        this._watch_data();
        this._watch_props();
        this._mount_component();
    }

    /**
     * 子组件内加载完成后执行的函数
     */
    _mounted() {}

    /**
     * 注册事件
     */
    _event() {}

    /**
     * 设置属性
     */
    _data() {}

    /**
     * 设置监听
     */
    _watch() {}

    /**
     * 计算属性
     */
    _computed() {}

    /**
     * 设置传参
     */
    _props() {
        return {};
    }

    /**
     * 设置监听属性
     */
    _watch_data() {
        let res = this._data(),
            methods = this._watch();

        if (res != null) {
            for (let key in res) {
                let callback = () => {};

                if (methods && methods[key]) {
                    callback = methods[key];
                }
                this._observe(key, res[key], callback);
            }
        }
    }

    /**
     * 监听入参
     */
    _watch_props() {
        let props = this._props();

        if (props != null) {
            for (let key in props) {
                this._observe(key, props[key]);
            }
        }
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
                this._parent._children[key] === this &&
                    delete this._parent._children[key];
            }
        }
    }

    /**
     * 发送消息，仅限用于子组件给父组件传递消息
     * @param {object} 消息
     * @example
     * this._send_msg({
     *     action: '动作'
     *     info: '消息'
     * })
     */
    _send_msg(msg) {}

    /**
     * 监听消息，仅限用于父组件监听子组件，使用时重写该方法
     * @param {Component} component 消息来源组件
     * @param {object} msg 消息
     */
    _listen_msg(component, msg) {}

    /**
     * 监听属性
     * @param {string} property 属性
     * @param {*} value 值
     * @param {*} callback 响应方法
     * @param {boolean} [deep=true] 是否深度监听
     */
    _observe(property, value, callback = () => {}, deep = true) {
        if (arguments.length == 1) {
            this._observe(property, undefined, callback);
        } else if (Util.type(value) === 'function') {
            this._observe(property, undefined, value);
        } else {
            if (property in this) {
                if (value != undefined) {
                    this[property] = value;
                }
                this._o.addCallback(property, callback, this);
            } else {
                this._o.defineObject({
                    target: this,
                    property,
                    value,
                    callback: callback.bind(this),
                    deep,
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
                componentName = slot.attr('data-component'), // 组件类名
                name = slot.attr('data-name'), // 实例化名称
                prop = slot.attr('data-prop'), // 关联属性
                src = slot.attr('data-src'); // 组件地址

            if (componentName == null || componentName == '') {
                // 当没有定义 data-component 时，根据 data-src 解析地址
                if (src == null || src == '') {
                    return;
                }
                let path = Util.eval(src);
                componentName = path.match(/\/([a-zA-Z0-9]*?)\.vc/);
                if (componentName && componentName[1]) {
                    componentName = componentName[1];
                } else {
                    console.log('组件文件后缀应该为".vc"！');
                    return;
                }
            }

            // 定义实例化名称
            name =
                name ||
                componentName.replace(
                    componentName[0],
                    componentName[0].toLowerCase()
                );

            if (eval(`typeof ${componentName} == 'undefined'`) && src != null) {
                taskQueue.add(VC.imports, [
                    {
                        filePath: src,
                        handle: () => {
                            this._instantiate_component({
                                name,
                                componentName,
                                slot,
                                prop,
                            });
                        },
                    },
                ]);
            } else {
                // 已存在指定的组件变量
                this._instantiate_component({
                    name,
                    componentName,
                    slot,
                    prop,
                });
            }
        });
        taskQueue.add(() => {
            try {
                this._mounted();
            } catch (err) {
                console.log(err);
            }
        });
        taskQueue.add(() => this._event());
        taskQueue.free = true;
    }

    /**
     * 实例化子组件
     * @param {object} params 入参
     * @param {string} params.name 组件实例化变量名
     * @param {string} params.componentName 组件类名
     * @param {string} params.prop 关联属性
     * @param {MyNode} params.slot 插槽
     */
    _instantiate_component(params) {
        let { name, componentName, slot, prop } = params;

        if (
            eval(`typeof ${componentName} == 'undefined'`) ||
            !eval(`${componentName}.prototype instanceof Component`)
        ) {
            console.log(`${componentName}未定义！`);
            return;
        }

        this._children[name] = eval(`new ${componentName}()`);
        this._children[name].node.addClass(slot.attr('class'));
        slot.replaceWith(this._children[name].node);

        // 处理关联参数
        if (prop != undefined && prop != '') {
            let self = this,
                proxyProperty = '__' + prop;
            Object.defineProperty(this, proxyProperty, {
                value: new Proxy(
                    {},
                    {
                        set(target, p, newValue, receiver) {
                            let res = Reflect.set(...arguments);
                            if (p in self._children[name]) {
                                self._children[name][p] = newValue;
                            }
                            return res;
                        },
                    }
                ),
            });
            this._observe(prop, (value) => {
                if (Util.type(value) == 'object') {
                    for (let key in value) {
                        this[proxyProperty][key] = value[key];
                    }
                }
            });
            if (Util.type(this[prop]) == 'object') {
                for (let key in this[prop]) {
                    this[proxyProperty][key] = this[prop][key];
                }
            }
        }
    }

    /**
     * 重置根组件
     */
    _reset_root(component) {
        component._root = this._root;
        for (let key in component._children) {
            if (
                component instanceof Component &&
                component._children[key] instanceof Component
            ) {
                component._reset_root(component._children[key]);
            }
        }
    }
}

export default Component;
