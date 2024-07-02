/**
 * 事件总线
 * @author wang.xin
 */
class EventBus {
    /**
     * Creates an instance of EventBus.
     * @param {Boolean} [single=true] 是否创建新的时间事件总线，true为否，false为创建新的
     */
    constructor(single = true) {
        if (single) {
            if (EventBus.instance != null) {
                return EventBus.instance;
            }
            EventBus.instance = this;
        }
        this.map = new Map();
    }

    /**
     * @description 订阅事件
     * @param {*} fn
     * @param {*} handle
     */
    on(fn, handle) {
        if (!this.map.has(fn)) {
            this.map.set(fn, []);
        }
        typeof handle === 'function' && this.map.get(fn).push(handle);
    }

    /**
     * @description 取消订阅
     * @param {*} fn
     * @param {*} handle
     */
    off(fn, handle) {
        if (Array.isArray(fn)) {
            fn.forEach((fnItem) => this.off(fnItem));
            return;
        }

        if (this.map.has(fn)) {
            if (handle) {
                let list = this.map.get(fn);
                list.splice(list.indexOf(handle), 1);
            } else {
                this.map.delete(fn);
            }
        }
    }

    /**
     * @description 触发事件
     * @param {*} fn
     * @param  {...any} arg
     */
    emit(fn, ...arg) {
        if (Array.isArray(fn)) {
            fn.forEach((fnItem) => this.emit(fnItem, ...arg));
            return;
        }

        if (this.map.has(fn)) {
            this.map.get(fn).forEach((elem) => {
                elem(...arg);
            });
        }
    }
}

export default EventBus;
