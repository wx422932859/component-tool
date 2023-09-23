import Util from './util.js';
import MyNode from './my-node.js';
import TaskQueue from './task-queue.js';
import Time from './time.js';

/**
 * 视图组件
 * @author wang.xin
 * @namespace
 * @property {object} config 配置项
 * @property {string} [config.basicPath=''] 基地址
 */
const VC = {
    config: {
        basicPath: '',
    },
};

/**
 * @description 引入组件
 * @param {object} option 配置项
 * @param {string} option.basicPath 基地址
 * @param {string} option.filePath 文件路径
 * @param {function} option.handle 引入后执行的方法
 * @param {string} option.alias 别名，当组件名称重复时，可使用别名
 * @returns {Promise}
 */
VC.imports = function (option) {
    let {
        basicPath = VC.config.basicPath,
        filePath,
        handle = () => {},
        alias,
    } = option;

    filePath = Util.eval(filePath);

    // 当是HTTP请求时，不再增加基地址
    if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
        basicPath = '';
    }

    let path = `${basicPath}${filePath}`,
        realPath = path.split('?ver')[0],
        componentName = path.match(/\/([a-zA-Z0-9]*?)\.vc/);

    if (componentName && componentName[1]) {
        componentName = componentName[1];
    } else {
        console.log(`组件${path}获取失败：文件后缀应该为".vc"！`);
        return;
    }

    let globalName = alias || componentName; // 最终引入全局变量的名称
    if (
        filePath == undefined ||
        eval(`typeof ${globalName} !== 'undefined'`) ||
        VC.cache.includes(realPath)
    ) {
        return new Promise((resolve) => {
            handle.call(VC, {
                template: eval(`typeof ${globalName} != 'undefined'`)
                    ? eval(globalName)._template
                    : '',
            });
            resolve();
        });
    }

    if (globalName == componentName) {
        // 仅当没有别名的时候才进行缓存
        VC.cache.push(realPath);
    }

    if (!filePath.includes('?ver')) {
        path += `?ver=${Math.random()}`;
    }

    return fetch(Util.formatPath(path))
        .then((response) => response.text())
        .then((res) => {
            let myNode = new MyNode(`<div>${res}</div>`),
                unique =
                    new Time().format('HHMMSS') +
                    Math.floor(Math.random() * 1000);

            return new Promise((resolve) => {
                let taskQueue = new TaskQueue();

                taskQueue.free = false;
                try {
                    // 定义引入的名称

                    // 处理file
                    VC.handleFileNode(taskQueue, myNode.children('file'));

                    // 处理component
                    VC.handleComponentNode(
                        taskQueue,
                        myNode.children('component')
                    );

                    // 处理script
                    VC.handleScriptNode(
                        taskQueue,
                        myNode.children('script'),
                        componentName,
                        globalName
                    );

                    // 处理template
                    VC.handleTemplateNode(
                        taskQueue,
                        myNode.children('template').html(),
                        globalName,
                        unique
                    );

                    // 处理style
                    VC.handleStyleNode(
                        taskQueue,
                        myNode.children('style'),
                        unique
                    );

                    taskQueue.add(() =>
                        new Promise((resolve) => {
                            resolve();
                        }).then(() => {
                            handle.call(VC, {
                                template: eval(
                                    `typeof ${globalName} != 'undefined'`
                                )
                                    ? eval(globalName)._template
                                    : '',
                            });
                            resolve();
                        })
                    );

                    taskQueue.free = true;
                } catch (err) {
                    console.log(err);
                }
            });
        });
};

/**
 * 处理file
 * @param {TaskQueue} taskQueue 任务队列
 * @param {MyNode} file file节点
 */
VC.handleFileNode = function (taskQueue, file) {
    file.forEach((item, index, list) => {
        let elem = list.eq(index),
            src = Util.eval(elem.attr('src'));

        taskQueue.add(Util.importFile, [src]);
    });
};

/**
 * 处理component
 * @param {TaskQueue} taskQueue 任务队列
 * @param {MyNode} component component节点
 */
VC.handleComponentNode = function (taskQueue, component) {
    component.forEach((item, index, list) => {
        let elem = list.eq(index),
            src = Util.eval(elem.attr('src')),
            alias = elem.attr('data-alias');

        // 是否添加随机数
        if (elem.attr('random') != undefined) {
            src += `?ver=${Math.random()}`;
        }

        taskQueue.add(VC.imports, [{ filePath: src, alias }]);
    });
};

/**
 * 处理script
 * @param {TaskQueue} taskQueue 任务队列
 * @param {MyNode} scriptNode script节点
 * @param {string} componentName 组件名称
 * @param {string} globalName 最终引入全局变量名称
 */
VC.handleScriptNode = function (
    taskQueue,
    scriptNode,
    componentName,
    globalName
) {
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
};

/**
 * 处理template
 * @param {TaskQueue} taskQueue 任务队列
 * @param {string} template 模板字符串
 * @param {string} globalName 组件名称
 */
VC.handleTemplateNode = function (taskQueue, template, globalName, unique) {
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
};

/**
 * 处理style
 * @param {TaskQueue} taskQueue 任务队列
 * @param {MyNode} styleNode 样式字符串
 * @param {string} unique 唯一标识
 */
VC.handleStyleNode = function (taskQueue, styleNode, unique) {
    styleNode.forEach((item, index, list) => {
        let elem = list.eq(index);

        if (elem.attr('disabled') != null) return;
        taskQueue.add(() => {
            return new Promise((resolve) => {
                document.querySelector('body').appendChild(item);
                if (elem.attr('scoped') != null) {
                    VC.handleCSSRules(item.sheet.cssRules, unique);
                }
                resolve();
            });
        });
    });
};

/**
 * @description 处理CSSRules
 * @param {string} cssRules CSS规则
 * @param {string} unique 唯一标识
 */
VC.handleCSSRules = function (cssRules, unique) {
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
};

/**
 * @description 处理CSSStyleRule
 * @param {string} selectorText 样式字符串
 * @param {string} unique 唯一标识
 */
VC.handleCSSStyleRule = function (selectorText, unique) {
    let req = /^[-a-zA-Z0-9="'\.\[\]#_]*/, // 匹配选择器
        selectorList = selectorText.split(',');

    return selectorList
        .map((selector) => {
            return selector
                .trim()
                .replace(req, (item) => `${item}[vc-${unique}]`);
        })
        .join(',');
};

// 缓存已经引入的组件地址，避免重复引入
VC.cache = [];

export default VC;
