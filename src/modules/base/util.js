import Ajax from './ajax.js';
import Observe from './observe.js';
import loading from '../../assets/img/loading.gif';

/**
 * 常用工具方法
 * @author wang.xin
 * @exports Util
 */
let Util = {};

/**
 * @description 动画
 */
Util.animation = {
    node: (function () {
        if (typeof document != 'undefined') {
            let container = document.createElement('div');

            container.style =
                'position: absolute; top: 0px; left: 0px; z-index: 99999; display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.03);';
            container.innerHTML = `<img src="${loading}" /></div>`;

            return container;
        }

        return null;
    })(),

    show() {
        document.body.appendChild(this.node);
    },

    hide() {
        this.node.remove();
    },
};

/**
 * @description 将 str-str-str 转换为strStrStr
 * @param {String} str 字符串
 * @returns {String}
 */
Util.toLowerUpper = function (str) {
    return str
        .replace(/(^-)|(-$)/g, '')
        .replace(/-([a-z0-9])/g, (item, elem) => elem.toUpperCase());
};

/**
 * @description 将目标对象转换为数组
 * @param {Object} obj 目标对象
 * @returns {Array}
 */
Util.toArray = function (obj) {
    let res = [];

    if (Util.isArrayLike(obj)) {
        let i = 0,
            len = obj.length;

        for (; i < len; i++) {
            res.push(obj[i]);
        }
    }

    return res;
};

/**
 * @description 比较两个对象内容是否相等
 * @param {Object} obj1 对象1
 * @param {Object} obj2 对象2
 * @returns {Boolean}
 */
Util.compare = function (obj1, obj2) {
    let res = true;

    if (Object.prototype.toString.call(obj1) === Object.prototype.toString.call(obj2)) {
        switch (Object.prototype.toString.call(obj1)) {
            case '[object Object]': // 对象
                if (Object.keys(obj1).length !== Object.keys(obj2).length) {
                    res = false;
                } else {
                    for (let key in obj1) {
                        if (!Util.compare(obj1[key], obj2[key])) {
                            res = false;
                            break;
                        }
                    }
                }
                break;

            case '[object Array]': // 数组
                if (obj1.length !== obj2.length) {
                    res = false;
                } else {
                    for (let i = 0; i < obj1.length; i++) {
                        if (!Util.compare(obj1[i], obj2[i])) {
                            res = false;
                            break;
                        }
                    }
                }
                break;

            default:
                res = obj1 === obj2;
                break;
        }
    } else {
        res = false;
    }

    return res;
};

/**
 * @description 引入文件
 * @param {String} filePath 文件路径
 * @param {Boolean} sign 是否为绝对路径（true 绝对路径， false 相对路径)
 */
Util.importFile = function (filePath, sign = true) {
    let prePath = '', // 路径前缀
        node = null, // 父节点
        target = null, // 标签
        splitPath = ''; // 不包含随机数的地址

    filePath = Util.formatPath(sign ? filePath : prePath + filePath);
    splitPath = filePath.split('?')[0];
    if (/\.js$/.test(splitPath)) {
        // 导入JS文件
        node = document.body;
        target = document.createElement('script');
        target.src = filePath;
    } else if (/\.css$/.test(splitPath)) {
        // 导入CSS文件
        node = document.head;
        target = document.createElement('link');
        target.href = filePath;
        target.rel = 'stylesheet';
    }

    return new Promise((resolve, reject) => {
        if (target) {
            let scriptList = [...document.scripts],
                styleList = [...document.styleSheets],
                filePathList = [];

            scriptList = scriptList
                .filter((item) => typeof item.src == 'string')
                .map((item) => item.src.split('?')[0]);
            styleList = styleList
                .filter((item) => typeof item.href == 'string')
                .map((item) => item.href.split('?')[0]);
            filePathList = scriptList.concat(styleList);

            if (filePathList.includes(splitPath)) {
                resolve();
            } else {
                node.appendChild(target);
                target.onload = target.onreadystatechange = function () {
                    if (
                        !this.readyState ||
                        this.readyState === 'loaded' ||
                        this.readyState === 'complete'
                    ) {
                        resolve();
                    } else {
                        reject();
                    }
                };
            }
        } else {
            resolve();
        }
    });
};

/**
 * @description 格式化路径
 * @param {String} path 路径
 * @returns {String}
 */
Util.formatPath = function (path) {
    let arr = path.split('/').filter((item, index) => item !== '.' && (index === 0 || item !== '')),
        pos = arr.indexOf('..');

    while (pos > 0) {
        arr = arr.slice(0, pos - 1).concat(arr.slice(pos + 1));
        pos = arr.indexOf('..');
    }

    return arr.join('/').replace(':/', '://');
};

/**
 * @description 获取简易类型名称
 * @param {String} name 类名
 * @returns {String}
 */
Util.class2type = function (name) {
    return {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regexp',
        '[object Object]': 'object',
        '[object Error]': 'error',
        '[object Symbol]': 'symbol',
    }[name];
};

/**
 * @description 获取数据类型
 * @param {*} obj 对象
 * @returns {String}
 */
Util.type = function (obj) {
    if (obj == null) {
        return obj + '';
    }

    return typeof obj === 'object' || typeof obj === 'function'
        ? Util.class2type(toString.call(obj)) || 'object'
        : typeof obj;
};

/**
 * @description 判断是否是函数
 * @param {*} obj 对象
 * @returns {Boolean}
 */
Util.isFunction = function (obj) {
    return (
        typeof obj === 'function' &&
        typeof obj.nodeType !== 'number' &&
        typeof obj.item !== 'function'
    );
};

/**
 * @description 判断是否是window
 * @param {*} obj 对象
 * @returns {Boolean}
 */
Util.isWindow = function (obj) {
    return obj != null && obj === obj.window;
};

/**
 * @description 判断是否是类数组
 * @param {*} obj 对象
 * @returns {Boolean}
 */
Util.isArrayLike = function (obj) {
    let length = !!obj && 'length' in obj && obj.length,
        type = Util.class2type(toString.call(obj));

    if (Util.isFunction(obj) || Util.isWindow(obj)) {
        return false;
    }

    return (
        type === 'array' ||
        length === 0 ||
        (typeof length === 'number' && length > 0 && length - 1 in obj)
    );
};

/**
 * @description 重新封装请求
 * 接受 String、Object、Array 形式的入参，最后统一根据 arguments 属性对入参进行处理
 */
Util.request = (function () {
    let requestCount = 0;

    return function () {
        let opts = Ajax.formatParam(arguments) || {}, // 参数处理
            complete = opts.complete || (() => {}), // 缓存用户自定的 complete 属性
            filter = opts.filter === undefined ? true : opts.filter, // 是否进行 XSS 过滤【true 过滤，false 不过滤，默认为过滤】
            filterRule = opts.filterRule || null, // XSS 过滤规则
            icon = opts.icon === undefined ? true : opts.icon; // 是否显示加载图标【true 显示，false 不显示，默认为显示】

        // XSS 过滤
        if (filter === true) {
            opts.data = Ajax.filterHTML(opts.data, filterRule);
        }

        // 显示请求动画
        if (icon === true) {
            Util.animation.show();
        }

        // 请求结束
        opts.complete = function (data, xhr) {
            complete(data, xhr); // 用户自定操作

            // 数据过滤
            if (filter === true) {
                Ajax.filterHTML(data, filterRule);
            }

            // 关闭请求动画
            if (--requestCount === 0) {
                Util.animation.hide();
            }
        };

        requestCount++; // 请求加1

        return Ajax.request(opts);
    };
})();

/**
 * @description 创建监听器
 * @param {Object | Array | Function} target 监听对象
 * @param {String} property 属性名
 * @param {Function | Object} callback 回调函数
 * @param {*} value 值
 * @param {Boolean} immediate 是否在初始化的时候，执行回调函数，默认不执行
 * @param {Number} delay 延迟时间，单位毫秒，防抖操作，-1代表不进行防抖操作
 * @param {Boolean} isModifiable 是否可以改变数据类型
 * @param {Boolean} deep 是否进行深度监听
 * @return {Proxy}
 */
Util.monitor = function (target, property, callback, value, immediate, delay, isModifiable, deep) {
    if (arguments.length === 1) {
        return new Observe(...arguments).watcher;
    } else {
        return new Observe({
            target,
            property,
            callback,
            value,
            immediate,
            delay,
            isModifiable,
            deep,
        }).watcher;
    }
};

/**
 * @description 全屏
 * @param {DOM} element DOM元素
 */
Util.toFullScreen = function (element) {
    element = element || document.body;

    let fullScreen =
        element.requestFullscreen ||
        element.mozRequestFullScreen ||
        element.msRequestFullscreen ||
        element.webkitRequestFullscreen;

    fullScreen.call(element);
};

/**
 * @description 退出全屏
 */
Util.exitFullScreen = function () {
    let exitFullScreen =
        document.exitFullscreen ||
        document.mozCancelFullScreen ||
        document.msExitFullscreen ||
        document.webkitExitFullscreen;

    exitFullScreen.call(document);
};

/**
 * @description 防抖，该函数会从上一次被调用后，延迟 wait 毫秒后调用 callback
 * @param {Function} callback 回调函数
 * @param {Number} time 时间间隔
 */
Util.debounce = function (callback, time) {
    let timeId = null;

    return function () {
        timeId !== null && clearTimeout(timeId);
        timeId = setTimeout(() => {
            callback.apply(this, arguments);
            timeId = null;
        }, time);
    };
};

/**
 * @description
 * 节流，在 wait 毫秒内最多执行 callback 一次<br/>
 * 1. 在函数需要频繁触发时，函数执行一次后，只有大于设定的执行周期后才会执行第二次。<br/>
 * 2. 适合多次事件按时间做平均分配。<br/>
 * 场景：<br/>
 * 1. 窗口调整；<br/>
 * 2. 页面滚动；<br/>
 * 3. DOM元素的拖拽功能实现；<br/>
 * 4. 抢购疯狂点击<br/>
 * @param {Function} callback 回调函数
 * @param {Number} wait 时间间隔
 */
Util.throttle = function (callback, wait) {
    let start = 0;

    return function (e) {
        let now = Date.now();

        if (now - start >= wait) {
            callback.call(this, e);
            start = now;
        }
    };
};

/**
 * @description 深拷贝
 * @param {*} target 拷贝对象
 * @param {Map} [map=new Map()] 缓存
 * @return {*} 拷贝结果
 */
Util.deepClone = function (target, map = new Map()) {
    // 检测数据类型
    if (typeof target === 'object' && target != null) {
        // 设置缓存，避免出现循环嵌套
        let cache = map.get(target);
        if (cache) {
            return cache;
        }

        const result = Array.isArray(target) ? [] : {};
        map.set(target, result);
        if (Array.isArray(target)) {
            target.forEach((item, index) => {
                result[index] = deepClone(item, map);
            });
        } else {
            Object.keys(target).forEach((key) => {
                result[key] = deepClone(target[key], map);
            });
        }

        return result;
    } else {
        return target;
    }
};

/**
 * @description 将 Proxy 转为 JSON
 * @param {Proxy} proxy 代理对象
 * @return {JSON}
 */
Util.proxyToJSON = function (proxy) {
    return JSON.parse(JSON.stringify(proxy));
};

/**
 * @description 在 condition 为 true 的情况下，执行定时任务，否则进入下一次等待
 * @param {Function} callback 回调函数
 * @param {Number} timeout 时间间隔
 * @param {Function} condition 条件
 * @return {Number} 定时器ID
 */
Util.setTimeout = function (callback, timeout, condition) {
    condition = condition || (() => true);
    let fn = () => setTimeout(() => (condition() ? callback() : fn()), timeout);
    return fn();
};

/**
 * @description 计算表达式的值，对原生eval()进行扩展
 * @param {string} code 表达式
 */
Util.eval = function (code) {
    try {
        code = eval(code);
    } catch (err) {
        code = code;
    }
    return code;
};

/**
 * 计算字符串长度
 */
Util.calStringLength = function (str) {
    str = String(str);
    let length = 0;

    for (let i = 0; i < str.length; i++) {
        let code = str.charCodeAt(i);
        if ((code >= 0 && code <= 255) || (code >= 0xff61 && code <= 0xff9f)) {
            // 非中文字符
            length++;
        } else {
            length += 2;
        }
    }

    return length;
};

export default Util;
