import Util from './util.js';
import EventBus from './event-bus.js';

/**
 * 监听器
 * @author wang.xin
 */
class Observe {
    /**
     * Creates an instance of Observe.
     * @param {object} params
     * @param {object | array | function} params.target 监听对象
     * @param {string} params.property 属性
     * @param {function | object} params.callback 回调函数或回调函数集合
     * @param {*} params.value 值
     * @param {boolean} params.immediate 是否在初始化的时候，执行回调函数，默认不执行
     * @param {number} params.delay 延迟时间，单位毫秒，防抖操作，-1代表不进行防抖操作
     * @param {boolean} params.isModifiable 是否可以改变数据类型
     * @param {boolean} params.deep 是否进行深度监听
     */
    constructor(params = {}) {
        Object.defineProperty(this, '_data', {
            enumerable: false,
            value: {},
        }); // 数据仓库
        this.eventBus = new EventBus(false); // 事件总线
        this.watcher = null; // 监听器
        this.immediate = params.immediate == true;
        this.delay = params.delay || -1;
        this.isModifiable = params.isModifiable != false;
        this.deep = params.deep != false;
        this.create(params);
    }

    /**
     * 构建watcher
     */
    create(params) {
        let { target, callback } = params;

        switch (Util.type(target)) {
            case 'array': // 数组
                this.watcher = this.proxyArray(target, callback);
                break;

            case 'object': // 对象
            case 'function': // 函数
                this.watcher = this.defineObject(params);
                break;

            default:
                break;
        }
    }

    /**
     * 采用 Object.defineProperty 监听对象
     * @param {object} params
     * @param {object | function} params.target 监听对象
     * @param {function} params.callback 回调函数
     * @param {*} params.value 初始值
     * @param {boolean} [params.deep=true] 是否深度监听
     */
    defineObject(params) {
        let self = this,
            { target, property, callback = {}, value, deep = true } = params;

        if (property == undefined) {
            // 针对 target 进行监听，此时 callback 是个 map
            for (let prop in target) {
                this.defineObject({
                    target,
                    property: prop,
                    callback: callback[prop],
                    value: target[prop],
                    deep,
                });
            }
        } else if (Util.type(property) == 'object') {
            // 针对 target 进行监听，此时 property 是个 map
            for (let prop in property) {
                this.defineObject({
                    target,
                    property: prop,
                    callback: callback[prop],
                    value: property[prop],
                    deep,
                });
            }
        } else {
            // 针对 target[property] 进行监听
            value = value !== undefined ? value : target[property];
            self._data[property] = value; // 缓存初始值
            let type = Util.type(value);

            Object.defineProperty(target, property, {
                configurable: true,
                enumerable: true,
                get() {
                    return self._data[property];
                },
                set(value) {
                    if (Util.type(value) === type || self.isModifiable) {
                        let oldValue = self._data[property];
                        self._data[property] = value;
                        self.eventBus.emit(property, value, oldValue);

                        // 判断是否需要进行深度监听
                        if (self.deep && deep) {
                            // 当赋值为 Array | Object | Function 时，需要进一步注册事件
                            if (Util.type(value) === 'array') {
                                self._data[property] = self.proxyArray(
                                    value,
                                    callback[property],
                                    property
                                );
                            } else if (
                                ['object', 'function'].includes(
                                    Util.type(value)
                                )
                            ) {
                                self._data[property] = self.proxyObject(
                                    value,
                                    callback[property],
                                    property
                                );
                            }
                        }
                    } else {
                        console.log(
                            `属性【${property}】：初始类型【${type}】，赋值类型【${Util.type(
                                value
                            )}，修改无效！`
                        );
                    }
                },
            });
            target[property] = value; // 执行一次 set()

            this.addCallback(property, callback, target);
        }
        return target;
    }

    /**
     * 采用 Proxy 监听数组
     * @param {array} target 监听对象
     * @param {function} callback 数据发生改变后的回调函数
     * @param {string} eventName 事件名称
     * @return {Proxy}
     */
    proxyArray(target, callback, eventName) {
        let self = this,
            proxy = null,
            name = eventName || 'change',
            methods = [
                'push',
                'pop',
                'shift',
                'unshift',
                'splice',
                'sort',
                'reverse',
            ];

        proxy = new Proxy(target, {
            set(t, p, v, r) {
                // 当修改的是方法，直接赋值返回，不触发响应
                if (methods.includes(p)) return Reflect.set(t, p, v, r);

                // 当监听对象是对象 A 的属性时，返回的对象 A 改变前后的值，否则返回自身改变前后的值
                let value = self._data[name] || t,
                    value1 = Util.proxyToJSON(value),
                    res = Reflect.set(t, p, v, r),
                    value2 = Util.proxyToJSON(value);

                self.eventBus.emit(name, value2, value1);
                return res;
            },
        });
        this.monitorMethodsOfArray(methods, proxy, name);

        // 添加监听事件
        if (!eventName) {
            this.addCallback(name, callback, proxy);
            this.immediate && this.eventBus.emit(name, target);
        }

        return proxy;
    }

    /**
     * 采用 Proxy 监听对象
     * @param {object | function} target 监听对象
     * @param {function} callback 数据发生改变后的回调函数
     * @param {string} eventName 事件名称
     * @return {Proxy}
     */
    proxyObject(target, callback, eventName) {
        let self = this,
            proxy = null,
            name = eventName || 'change';

        proxy = new Proxy(target, {
            set(t, p, v, r) {
                // 当监听对象是对象 A 的属性时，返回的对象 A 改变前后的值，否则返回自身改变前后的值
                let value = self._data[name] || t,
                    type1 = Util.type(t[p]),
                    type2 = Util.type(v),
                    proxyValue = v;

                if (type1 === type2 || self.isModifiable) {
                    // 当赋值为 Array | Object | Function 时，需要进一步注册事件
                    if (Util.type(proxyValue) === 'array') {
                        proxyValue = self.proxyArray(
                            proxyValue,
                            callback,
                            name
                        );
                    } else if (
                        ['object', 'function'].includes(Util.type(proxyValue))
                    ) {
                        proxyValue = self.proxyObject(
                            proxyValue,
                            callback,
                            name
                        );
                    }

                    let value1 = Util.proxyToJSON(value),
                        res = Reflect.set(t, p, proxyValue, r),
                        value2 = Util.proxyToJSON(value);

                    self.eventBus.emit(name, value2, value1);
                    return res;
                }

                console.log(
                    `属性【${p}】：初始类型【${type1}】，赋值类型【${type2}】，修改无效！`
                );
                return false;
            },
        });

        for (let prop in target) {
            if (Util.type(target[prop]) === 'array') {
                target[prop] = this.proxyArray(target[prop], callback, name);
            } else if (
                ['object', 'function'].includes(Util.type(target[prop]))
            ) {
                target[prop] = this.proxyObject(target[prop], callback, name);
            }
        }

        // 添加监听事件
        if (!eventName) {
            this.addCallback(name, callback, proxy);
            this.immediate && this.eventBus.emit(name, target);
        }

        return proxy;
    }

    /**
     * 往事件总线中注册事件，且在 delay 毫秒内，回调函数只会执行一次。
     * @param {string} eventName 事件名称
     * @param {function} callback 回调函数
     * @param {object | array | function} target 回调函数绑定对象
     */
    addCallback(eventName, callback, target) {
        if (Util.type(callback) === 'function') {
            if (this.delay !== -1) {
                this.eventBus.on(
                    eventName,
                    Util.debounce(callback, this.delay).bind(target)
                );
            } else {
                this.eventBus.on(eventName, callback.bind(target));
            }
        }
    }

    /**
     * 监听数组的方法
     * @param {string[]} methods 需要监听的方法列表
     * @param {Proxy} proxy 代理对象
     * @param {string} name 属性名称
     */
    monitorMethodsOfArray(methods, proxy, name) {
        let self = this;

        methods.forEach((method) => {
            if (proxy.hasOwnProperty(method)) return;
            Object.defineProperty(proxy, method, {
                configurable: false,
                enumerable: false,
                value: new Proxy(proxy.__proto__[method], {
                    apply(target, thisArg, arrArray) {
                        if (self.watcher[name] == null) {
                            // 当属性值为null的时候不需要重写
                            return Reflect.apply(...arguments);
                        }

                        let result = Util.proxyToJSON(self.watcher[name]);
                        if (typeof result[method] !== 'function') return;
                        result[method](...arrArray);
                        self.watcher[name] = result;
                    },
                }),
            });
        });
    }
}

export default Observe;
