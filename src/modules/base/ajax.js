import Util from './util';

/**
 * 接口请求相关方法
 *
 * @author wang.xin
 * @exports Ajax
 */
const Ajax = {};

/**
 * 设置 XSS 过滤
 * @param {string | object | array} object 过滤对象
 * @param {object} rule 过滤规则
 */
Ajax.filterHTML = function (object, rule) {
    rule = rule || {
        whiteList: {
            a: ['href', 'target']
        },
        stripIgnoreTag: true, // 过滤所有非白名单中的 HTML，false 只对标签进行转义
        stripIgnoreBody: ['script'] // 过滤标签和内容
    };

    switch (Object.prototype.toString.call(object)) {
        case '[object String]':
            if (typeof filterCSS !== 'undefined') {
                // eslint-disable-next-line
                object = filterXSS(object, rule);
            }
            break;

        case '[object Object]':
            for (let key in object) {
                object[key] = this.filterHTML(object[key]);
            }
            break;

        case '[object Array]':
            for (let i = 0; i < object.length; i++) {
                object[i] = this.filterHTML(object[i]);
            }
            break;

        default:
            break;
    }

    return object;
};

/**
 * @description 原生封装请求
 * @param {object} opts 入参
 */
Ajax.req = function (opts) {
    if (opts) {
        // 参数设置
        let xhr = new XMLHttpRequest(),
            type = opts.type || 'post', // 请求方式
            url = opts.url || '', // 请求地址
            contentType = opts.contentType || 'application/x-www-form-urlencoded', // 请求参数的数据格式
            defer = opts.defer === undefined ? true : opts.defer, // 是否异步请求
            data = opts.data || {}, // 请求数据
            beforeSend = opts.beforeSend || (() => {}), // 请求之前的操作
            complete = opts.complete || (() => {}), // 请求结束的操作
            success = opts.success || (() => {}), // 请求成功的操作
            error = opts.error || (() => {}), // 请求失败的操作
            header = opts.header || {}; // 请求头

        // 设置超时
        if (Util.type(opts.timeout) === 'number') {
            xhr.timeout = opts.timeout;
        }

        // 启动请求
        if (type.toUpperCase() === 'GET' && JSON.stringify(data) !== '{}') {
            xhr.open(type, `${url}?${new URLSearchParams(data).toString()}`, defer);
        } else {
            xhr.open(type, url, defer);
        }

        // 设置请求头
        if (contentType !== 'multipart/form-data') {
            xhr.setRequestHeader('content-Type', contentType);
        }

        // 添加请求头
        for (let key in header) {
            xhr.setRequestHeader(key, header[key]);
        }

        // 监听请求过程
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                let responseData = null;

                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                    try {
                        responseData = JSON.parse(xhr.responseText);
                    } catch (err) {
                        responseData = xhr.responseText;
                    }
                    success(responseData, xhr);
                } else {
                    error(responseData, xhr);
                }
                complete(responseData, xhr);
            }
        };

        // 发送请求
        let requestData = this.formatData(data, contentType); // 数据处理
        switch (requestData) {
            case '-1':
                console.log('data 格式不支持！');
                break;

            case '-2':
                console.log('contentType 格式不支持！');
                break;

            default: // 请求前操作
                beforeSend(xhr);
                xhr.send(requestData);
                break;
        }
    }
};

/**
 * @description 数据格式化
 * @param {object} data 数据
 * @param {object} contentType 数据格式
 */
Ajax.formatData = function (data, contentType) {
    let res = null,
        requestData = null;

    switch (contentType) {
        case 'application/x-www-form-urlencoded': // 表单请求
            requestData = [];
            if (Object.prototype.toString.call(data) === '[object Object]') {
                // 遍历数据，key 作为 name，data[key] 作为 value
                for (let key in data) {
                    switch (Object.prototype.toString.call(data[key])) {
                        case '[object Array]':
                            data[key].forEach((item) => {
                                requestData.push(encodeURIComponent(key) + '=' + encodeURIComponent(item));
                            });
                            break;

                        default:
                            requestData.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
                            break;
                    }
                }
                res = requestData.join('&'); // 用&拼接成字符串
            } else {
                res = -1;
            }
            break;

        case 'application/json': // json请求
            res = JSON.stringify(data);
            break;

        case 'multipart/form-data':
            requestData = new FormData();
            if (Object.prototype.toString.call(data) === '[object Object]') {
                for (let key in data) {
                    switch (Object.prototype.toString.call(data[key])) {
                        case '[object Array]':
                            data[key].forEach((item) => {
                                requestData.append(key, item);
                            });
                            break;

                        default:
                            requestData.append(key, data[key]);
                            break;
                    }
                }
            }
            res = requestData;
            break;

        default: // 其它请求
            res = -2;
            break;
    }

    return res;
};

/**
 * @description 参数格式化
 * @param {object} obj 参数
 * @return {object} res 指定对象
 */
Ajax.formatParam = function (obj) {
    let paramList = [
            'url',
            'data',
            'contentType',
            'defer',
            'type',
            'beforeSend',
            'complete',
            'success',
            'error',
            'timeout'
        ],
        res = null;

    if (obj.length !== 0) {
        switch (Object.prototype.toString.call(obj[0])) {
            case '[object String]': // 字符串
                res = {};
                for (let i = 0; i < obj.length; i++) {
                    res[paramList[i]] = obj[i];
                }
                break;

            case '[object Array]': // 数组
                res = {};
                for (let i = 0; i < obj[0].length; i++) {
                    res[paramList[i]] = obj[0][i];
                }
                break;

            case '[object Object]': // 对象
                res = obj[0];
                break;

            default:
                break;
        }
    }

    return res;
};

/**
 * @description 用Promise封装请求
 * 接受 string、object、array 形式的入参，最后统一根据 arguments 属性对入参进行处理
 */
Ajax.request = function () {
    let res = null,
        opts = this.formatParam(arguments),
        success = opts.success || (() => {}),
        error = opts.error || (() => {});

    if (Ajax.intercept != null) {
        if (typeof Ajax.intercept === 'function') {
            let response = Ajax.intercept(opts);
            if (response != null) {
                return new Promise((resolve) => {
                    resolve(response);
                });
            }
        } else if (opts.url in Ajax.intercept) {
            return new Promise((resolve) => {
                resolve(Ajax.intercept[opts.url](opts));
            });
        }
    }

    if (Object.prototype.toString.call(opts) === '[object Object]') {
        res = new Promise((resolve, reject) => {
            opts.success = function (data, xhr) {
                data = success(data, xhr) || data;
                resolve(data);
            };
            opts.error = function (data, xhr) {
                data = error(data, xhr) || data;
                reject(data);
            };
            this.req(opts);
        });
    }

    return res;
};

/**
 * @description 文件下载
 * 接受 string、object、array 形式的入参，最后统一根据 arguments 属性对入参进行处理
 */
Ajax.load = function () {
    let formNode = document.createElement('form'),
        opts = this.formatParam(arguments) || {},
        data = opts.data || {},
        htmlStr = '';

    for (let key in data) {
        switch (Object.prototype.toString.call(data[key])) {
            case '[object Array]':
                data[key].forEach((item) => {
                    htmlStr += `<input name='${key}' value='${item}'/>`;
                });
                break;

            default:
                htmlStr += `<input name='${key}' value='${data[key]}'/>`;
                break;
        }
    }
    formNode.innerHTML = htmlStr;
    formNode.setAttribute('action', opts.url);
    formNode.setAttribute('method', opts.type || 'post');
    document.body.appendChild(formNode);
    if (document.querySelector('iframe[name="loadError"]') == null) {
        let iframeNode = document.createElement('iframe');

        iframeNode.setAttribute('name', 'loadError');
        iframeNode.style.display = 'none';
        document.body.appendChild(iframeNode);
    }
    formNode.submit();
    formNode.remove();
};

/**
 * @description 文件上传
 * 接受 string、object、array 形式的入参，最后统一根据 arguments 属性对入参进行处理
 */
Ajax.upload = function () {
    let opts = this.formatParam(arguments) || {}; // 参数处理

    opts.contentType = 'multipart/form-data';
    return this.request(opts);
};

/**
 * 拦截请求，默认为 null，不拦截请求
 * 键 => 接口地址
 * 值 => 处理方法，参数是请求属性
 */
Ajax.intercept = null;

export default Ajax;
