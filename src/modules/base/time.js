/**
 * 时间对象
 *
 * @author wang.xin
 */
class Time {
    /**
     * Creates an instance of Time.
     * @param {*} time 接收和new Date()一样的参数
     */
    constructor(time) {
        if (time instanceof Time) {
            return time;
        }

        this.time = this.transform.apply(this, arguments);
        this.init();
    }

    /**
     * 初始化
     */
    init() {
        let time = this.time,
            timeArr = [
                time.getFullYear(),
                time.getMonth() + 1,
                time.getDate(),
                time.getHours(),
                time.getMinutes(),
                time.getSeconds()
            ],
            dayArr = ['日', '一', '二', '三', '四', '五', '六'];

        timeArr = timeArr.map((item) => (item > 9 ? '' : '0') + item);

        this.year = timeArr[0]; // 年
        this.month = timeArr[1]; // 月
        this.date = timeArr[2]; // 日
        this.hours = timeArr[3]; // 时
        this.minutes = timeArr[4]; // 分
        this.seconds = timeArr[5]; // 秒
        this.milliseconds = `000${time.getMilliseconds()}`; // 毫秒
        this.milliseconds = this.milliseconds.substring(this.milliseconds.length - 3);
        this.timeStamp = time.getTime(); // 时间戳
        this.week = '星期' + dayArr[time.getDay()]; // 星期
        this.formatDate = this.format('yyyy-mm-dd');
        this.formatTime = this.format('HH:MM:SS');
    }

    /**
     * 根据入参转成 Date 实例
     * @return {Date}
     */
    transform() {
        let res = new Date(...arguments);

        return res.toString() === 'Invalid Date' ? new Date() : res;
    }

    /**
     * 格式化
     * @param {string} formatStr 格式，默认为 yyyy-mm-dd HH:MM:SS
     * @return {string}
     */
    format(formatStr) {
        let reg = {
                'y+': this.year, // 年
                'm+': this.month, // 月
                'd+': this.date, // 日
                'H+': this.hours, // 时
                'M+': this.minutes, // 分
                'S+': this.seconds, // 秒
                'Z+': this.milliseconds // 毫秒
            },
            res = formatStr || 'yyyy-mm-dd HH:MM:SS';

        for (let key in reg) {
            if (new RegExp(`(${key})`).test(res)) {
                res = res.replace(RegExp.$1, reg[key].substring(reg[key].length - RegExp.$1.length));
            }
        }

        return res;
    }

    /**
     * 计算指定日期
     * @param {number} [num=0] 计量值，默认为0，负数代表以前，正数代表以后
     * @param {string} [type='day'] 类型
     * @return {Time}
     */
    forward(num = 0, type = 'day') {
        let time = this.time,
            year = time.getFullYear(), // 年
            month = time.getMonth(), // 月
            date = time.getDate(), // 日
            maxDate = 28, // 默认一个月28天
            res = null;

        num = isNaN(+num) ? 0 : +num;
        switch (type) {
            case 'year': // 年
                maxDate = new Date(year + num, month + 1, 0).getDate();
                res = new Date(year + num, month, Math.min(date, maxDate));
                break;

            case 'month': // 月
                maxDate = new Date(year, month + num + 1, 0).getDate();
                res = new Date(year, month + num, Math.min(date, maxDate));
                break;

            case 'week': // 周
                res = this.timeStamp + num * 7 * 24 * 60 * 60 * 1000;
                break;

            case 'day': // 日
                res = this.timeStamp + num * 24 * 60 * 60 * 1000;
                break;

            case 'hour': // 时
                res = this.timeStamp + num * 60 * 60 * 1000;
                break;

            case 'minute': // 分
                res = this.timeStamp + num * 60 * 1000;
                break;

            case 'second': // 秒
                res = this.timeStamp + num * 1000;
                break;

            default: // 默认
                res = this;
                break;
        }

        return new Time(res);
    }

    /**
     * 获取当月第一天
     * @return {Time}
     */
    firstDate() {
        return new Time(this.year, +this.month - 1, 1);
    }

    /**
     * 获取当月最后一天
     * @return {Time}
     */
    lastDate() {
        return new Time(this.year, +this.month, 0);
    }

    /**
     * 获取当月天数
     * @return {number}
     */
    dateCount() {
        return +this.lastDate().date;
    }
}

export default Time;
