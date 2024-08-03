import Util from './util.js';

/**
 * 任务队列
 *
 * @author wang.xin
 */
class TaskQueue {
    /**
     * Creates an instance of TaskQueue.
     */
    constructor() {
        this.queue = [];
        Util.monitor(
            this,
            'free',
            (value) => {
                value && this.execute(); // 空闲的时候执行任务
            },
            true
        );
    }

    /**
     * 添加任务
     * @param {*} fn
     * @param {*} [params=[]]
     * @return {*}
     */
    add(fn, params = []) {
        this.queue.push({
            fn,
            params
        });
        this.free = this.free;
        return this;
    }

    /**
     * 执行任务
     */
    execute() {
        let task = this.queue.shift();

        if (task) {
            this.free = false;
            try {
                task.fn(...task.params).finally(() => (this.free = true));
            } catch (err) {
                this.free = true;
            }
        }
    }
}

export default TaskQueue;
