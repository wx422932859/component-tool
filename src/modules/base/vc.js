import Util from './util.js';
import MyNode from './my-node.js';
import TaskQueue from './task-queue.js';
import Time from './time.js';

/**
 * View Component
 * @author wang.xin
 * @exports VC
 */
const VC = {
    /**
     * @property {object} config 配置项
     * @property {string} [config.basicPath=''] 基地址
     */
    config: {
        basicPath: '',
    },

    /**
     * 缓存已经引入的组件地址，避免重复引入
     * @property {string[]} cache 地址缓存
     */
    cache: [],

    /**
     * 格式化文件地址
     * @param {string} filePath
     * @return {string}
     */
    formatPath(filePath) {
        let arr = filePath
                .split('/')
                .filter((item, index) => item !== '.' && (index === 0 || item !== '')),
            pos = arr.indexOf('..');

        while (pos > 0) {
            arr = arr.slice(0, pos - 1).concat(arr.slice(pos + 1));
            pos = arr.indexOf('..');
        }

        return arr.join('/').replace(':/', '://');
    },

    /**
     * 引入文件
     * @param {object} option 配置项
     * @param {string} option.basicPath 基地址
     * @param {string} option.filePath 文件路径
     * @param {function} option.handle 引入后执行的方法
     * @param {string} option.alias 别名，当组件名称重复时，可使用别名
     * @returns {Promise}
     */
    imports(option) {
        let { basicPath = VC.config.basicPath, filePath = '', handle = () => {}, alias } = option,
            fullPath = '', // 完整路径
            realPath = ''; // 不携带版本号的路径

        // 判断文件地址是否需要增加基地址
        fullPath = Util.eval(filePath);
        if (!fullPath.startsWith('http://') && !fullPath.startsWith('https://')) {
            fullPath = `${basicPath}${fullPath}`;
        }
        fullPath = VC.formatPath(fullPath);
        realPath = fullPath.split('?ver')[0];

        if (/\.js$/.test(realPath)) {
            // 处理 script
            return VC.importScript(fullPath, realPath, handle);
        } else if (/\.css$/.test(realPath)) {
            // 处理 style
            return VC.importStyle(fullPath, realPath, handle);
        } else if (/\.vc$/.test(realPath)) {
            // 处理 ViewComponent
            return VC.importViewComponent(fullPath, realPath, handle, alias);
        }

        return fetch(fullPath).then((response) => response.text());
    },

    /**
     * 引入 js 文件
     * @param {string} fullPath 完整路径
     * @param {string} realPath 不携带版本号的路径
     * @param {function} callback 引入文件后执行的回调函数
     * @return {Promise}
     */
    importScript(fullPath, realPath, callback) {
        let target = document.createElement('script');

        target.src = fullPath;
        return new Promise((resolve, reject) => {
            let scriptList = [...document.scripts]
                .filter((item) => typeof item.src == 'string')
                .map((item) => item.src.split('?')[0]);

            if (scriptList.includes(realPath)) {
                callback();
                resolve();
            } else {
                document.body.appendChild(target);
                target.onload = target.onreadystatechange = function () {
                    if (
                        !this.readyState ||
                        this.readyState === 'loaded' ||
                        this.readyState === 'complete'
                    ) {
                        callback();
                        resolve();
                    } else {
                        reject();
                    }
                };
            }
        });
    },

    /**
     * 引入 css 文件
     * @param {string} fullPath 完整路径
     * @param {string} realPath 不携带版本号的路径
     * @param {function} callback 引入文件后执行的回调函数
     * @return {Promise}
     */
    importStyle(fullPath, realPath, callback) {
        let target = document.createElement('link');

        target.href = fullPath;
        target.rel = 'stylesheet';
        return new Promise((resolve, reject) => {
            let styleList = [...document.styleSheets]
                .filter((item) => typeof item.href == 'string')
                .map((item) => item.href.split('?')[0]);

            if (styleList.includes(realPath)) {
                callback();
                resolve();
            } else {
                document.head.appendChild(target);
                target.onload = target.onreadystatechange = function () {
                    if (
                        !this.readyState ||
                        this.readyState === 'loaded' ||
                        this.readyState === 'complete'
                    ) {
                        callback();
                        resolve();
                    } else {
                        reject();
                    }
                };
            }
        });
    },

    /**
     * 引入 vc 文件
     * @param {string} fullPath 完整路径
     * @param {string} realPath 不携带版本号的路径
     * @param {function} callback 引入文件后执行的回调函数
     * @param {string} alias 组件别名
     * @return {Promise}
     */
    importViewComponent(fullPath, realPath, callback, alias) {
        let componentName = VC.parseComponentName(realPath),
            globalName = '';

        // 确定组件名称
        if (componentName === '') {
            console.log(`组件${fullPath}获取失败！`);
            return;
        }
        globalName = alias || componentName;

        // 组件已引入的情况
        if (
            realPath == undefined ||
            eval(`typeof ${globalName} !== 'undefined'`) ||
            VC.cache.includes(realPath)
        ) {
            return new Promise((resolve) => {
                callback.call(VC, {
                    template: eval(`typeof ${globalName} !== 'undefined'`)
                        ? eval(globalName)._template
                        : '',
                });
                resolve();
            });
        }

        // 仅当没有别名的时候，缓存组件地址，避免重复引入
        if (globalName === componentName) {
            VC.cache.push(realPath);
        }

        // 增加版本号
        if (!fullPath.includes('?ver')) {
            fullPath += `?ver=${Math.random()}`;
        }

        return fetch(fullPath)
            .then((response) => response.text())
            .then((res) => VC.parseViewComponent(res, componentName, globalName, callback));
    },

    /**
     * 根据文件路径解析组件名称
     * @param {string} src 文件路径
     */
    parseComponentName(src) {
        let path = Util.eval(src);

        if (path != null) {
            let componentName = path.match(/\/([a-zA-Z0-9]*?)\.vc/);
            if (componentName != null && componentName[1] != null) {
                return componentName[1];
            }
        }

        return '';
    },

    /**
     * 解析组件文件
     * @param {string} text 文本内容
     * @param {string} componentName 组件名称
     * @param {string} globalName 组件对外暴露名称
     * @param {function} callback 解析完组件执行的回调函数
     */
    parseViewComponent(text, componentName, globalName, callback = () => {}) {
        let myNode = new MyNode(`<div>${text}</div>`);

        return new Promise((resolve) => {
            let taskQueue = new TaskQueue();

            taskQueue.free = false;
            try {
                VC.parseComponentPackageNode(taskQueue, myNode.children('component-package'));
                VC.parseComponentNormalNode(taskQueue, myNode, componentName, globalName);
                taskQueue.add(() => {
                    return new Promise((resolve2) => {
                        callback.call(VC, {
                            template: eval(`typeof ${globalName} != 'undefined'`)
                                ? eval(globalName)._template
                                : '',
                        });
                        resolve2();
                        resolve();
                    });
                });
                taskQueue.free = true;
            } catch (err) {
                console.log(err);
            }
        });
    },

    /**
     * 解析 component-package 节点
     * @param {TaskQueue} taskQueue 任务队列
     * @param {MyNode[]} componentPackage 组件包
     */
    parseComponentPackageNode(taskQueue, componentPackage) {
        componentPackage.forEach((item, index, list) => {
            let elem = list.eq(index),
                componentName = elem.attr('name'),
                globalName = elem.attr('alias') || componentName;

            VC.parseComponentNormalNode(taskQueue, elem, componentName, globalName);
        });
    },

    /**
     * 解析常规组件节点
     * @param {TaskQueue} taskQueue 任务队列
     * @param {MyNode} myNode 节点
     * @param {string} componentName 组件名称
     * @param {string} globalName 组件对外暴露名称
     */
    parseComponentNormalNode(taskQueue, myNode, componentName, globalName) {
        let unique = new Time().format('HHMMSS') + Math.floor(Math.random() * 1000);

        // 解析 file 节点
        VC.parseFileNode(taskQueue, myNode.children('file'));

        // 解析 component 节点
        VC.parseComponentNode(taskQueue, myNode.children('component'));

        // 解析 script 节点
        VC.parseScriptNode(taskQueue, myNode.children('script'), componentName, globalName);

        // 解析 template 节点
        VC.parseTemplateNode(taskQueue, myNode.children('template').html(), globalName, unique);

        //解析 style 节点
        VC.parseStyleNode(taskQueue, myNode.children('style'), unique);
    },

    /**
     * 解析 file 节点
     * @param {TaskQueue} taskQueue 任务队列
     * @param {MyNode} file file节点
     */
    parseFileNode(taskQueue, file) {
        file.forEach((item, index, list) => {
            let src = Util.eval(list.eq(index).attr('src'));

            taskQueue.add(VC.imports, [{ filePath: src }]);
        });
    },

    /**
     * 解析 component 节点
     * @param {TaskQueue} taskQueue 任务队列
     * @param {MyNode} component component节点
     */
    parseComponentNode(taskQueue, component) {
        component.forEach((item, index, list) => {
            let elem = list.eq(index),
                src = Util.eval(elem.attr('src')),
                alias = elem.attr('alias');

            // 是否添加随机数
            if (elem.attr('random') != undefined) {
                src += `?ver=${Math.random()}`;
            }

            taskQueue.add(VC.imports, [{ filePath: src, alias }]);
        });
    },

    /**
     * 解析 script 节点
     * @param {TaskQueue} taskQueue 任务队列
     * @param {MyNode} scriptNode script节点
     * @param {string} componentName 组件名称
     * @param {string} globalName 最终引入全局变量名称
     */
    parseScriptNode(taskQueue, scriptNode, componentName, globalName) {
        taskQueue.add(() => {
            return new Promise((resolve) => {
                scriptNode.forEach((elem) => {
                    let script = document.createElement('script');
                    script.innerHTML = `(function() {
                        ${elem.innerHTML.trim()};
                        if (typeof ${componentName} != 'undefined') {
                            window['${globalName}'] = window['${globalName}'] || ${componentName};
                        }
                    }());`;
                    document.querySelector('body').appendChild(script);
                });
                resolve();
            });
        });
    },

    /**
     * 解析 template 节点
     * @param {TaskQueue} taskQueue 任务队列
     * @param {string} template 模板字符串
     * @param {string} globalName 组件名称
     */
    parseTemplateNode(taskQueue, template, globalName, unique) {
        taskQueue.add(() => {
            return new Promise((resolve) => {
                let node = new MyNode(template);

                if (eval(`typeof ${globalName} != 'undefined'`)) {
                    if (node.length == 0) {
                        node = new MyNode(eval(`${globalName}._template`));
                    }
                    if (node.length != 0) {
                        node.attr(`vc-${unique}`, '');
                        eval(globalName)._template = node[0].outerHTML;
                    }
                }
                resolve();
            });
        });
    },

    /**
     * 解析 style 节点
     * @param {TaskQueue} taskQueue 任务队列
     * @param {MyNode} styleNode 样式字符串
     * @param {string} unique 唯一标识
     */
    parseStyleNode(taskQueue, styleNode, unique) {
        taskQueue.add(() => {
            return new Promise((resolve) => {
                styleNode.forEach((item, index, list) => {
                    VC.handleStyleNodeItem(list.eq(index), unique);
                });
                resolve();
            });
        });
    },

    /**
     * 处理style
     * @param {MyNode} elem 元素
     * @param {string} unique 唯一标识
     */
    handleStyleNodeItem(elem, unique) {
        let node = elem[0];

        if (elem.attr('disabled') != null) {
            return;
        }
        document.querySelector('body').appendChild(node);
        if (elem.attr('scoped') != null) {
            VC.handleCSSRules(node.sheet.cssRules, unique);
        }
    },

    /**
     * @description 处理CSSRules
     * @param {string} cssRules CSS规则
     * @param {string} unique 唯一标识
     */
    handleCSSRules(cssRules, unique) {
        for (let i = 0; i < cssRules.length; i++) {
            switch (cssRules[i].__proto__) {
                case CSSStyleRule.prototype: // 规则
                    cssRules[i].selectorText = this.handleCSSStyleRule(
                        cssRules[i].selectorText,
                        unique
                    );
                    break;

                case CSSMediaRule.prototype: // 媒体查询
                    this.handleCSSRules(cssRules[i].cssRules, unique);
                    break;

                default:
                    break;
            }
        }
    },

    /**
     * @description 处理CSSStyleRule
     * @param {string} selectorText 样式字符串
     * @param {string} unique 唯一标识
     */
    handleCSSStyleRule(selectorText, unique) {
        let req = /^[-a-zA-Z0-9="'\.\[\]#_]*/, // 匹配选择器
            selectorList = selectorText.split(',');

        return selectorList
            .map((selector) => {
                return selector.trim().replace(req, (item) => `${item}[vc-${unique}]`);
            })
            .join(',');
    },
};

export default VC;
