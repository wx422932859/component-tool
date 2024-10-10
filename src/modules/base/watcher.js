import Util from './util.js';

/**
 * 观察者
 *
 * @author wang.xin
 * @deprecated
 */
class Watcher {
    /**
     * Creates an instance of Watcher.
     * @param {*} data
     * @param {*} watch
     */
    constructor(data, watch) {
        data = Util.type(data) === 'object' ? data : {};
        watch = Util.type(watch) === 'object' ? watch : {};
        this.init(data, watch);
    }

    // 初始化
    init(data, watch) {
        for (let key in data) {
            let handle = Util.type(watch[key]) === 'function' ? watch[key] : () => {};

            this.monitor(key, handle, data[key]);
        }
    }

    // 添加监听器
    monitor(key, callback, value) {
        Util.monitor(this, key, callback, value);
    }
}

export default Watcher;
