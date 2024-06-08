import './form.css';
import Util from '../../base/util.js';
import MyNode from '../../base/my-node.js';
import Component from '../../base/component.js';

/**
 * 表单组件基类
 * @extends { Component }
 * @param {object} option 入参
 * @param {string | Node | MyNode} option.elem Node节点、CSS选择器、MyNode
 * @param {string} option.relation 嵌入关系
 * @param {string} option.template 表单模版
 * @exports Form
 */
class Form extends Component {
    /**
     * Creates an instance of Form.
     * @param {*} option
     */
    constructor(option) {
        const { elem, template, relation } = option;
        const templateNode = new MyNode(template);
        super(elem);

        if (this.node.length === 0) {
            this.node = templateNode;
        } else {
            if (Util.isFunction(this.node[relation])) {
                this.node[relation](templateNode);
                this.node = templateNode;
            }
        }
    }

    /**
     * 设置标签
     * @param {string | boolean} label 标签，为false时，代表没有标签
     */
    setLabel(label) {
        let labelNode = this.node.find('.ly-form_label');

        if (label === false) {
            labelNode.remove();
            return;
        }

        if (labelNode.length === 0) {
            this.node.prepend('<label class="ly-form_label"></label>');
        }
        this.node.find('.ly-form_label').html(label);
    }

    /**
     * 格式化列表
     * @param {string[] | number[] | object[] } list 列表
     */
    formatList(list) {
        let res = [];

        if (Util.type(list) === 'array') {
            switch (Util.type(list[0])) {
                case 'object': // 元素是对象
                    list.forEach((item, index) => {
                        res.push({
                            key: item.key == null ? index + 1 : item.key, // 键
                            value: item.value, // 值
                            info: item.info || '', // 附加信息
                        });
                    });
                    break;

                case 'string': // 元素是字符串
                case 'number': // 元素是数字
                    list.forEach((item, index) => {
                        res.push({
                            key: index + 1, // 键
                            value: item, // 值
                            info: '', // 附加信息
                        });
                    });
                    break;

                default:
                    break;
            }
        }
        return res;
    }

    /**
     * 查找指定项
     * @param {number | string | object | array} item 指定项
     * @param {array} list 格式化之后的数据列表
     * @returns {number} 指定项对应的下标
     */
    findItem(item, list) {
        let res = -1; // 找不到默认为-1

        if (Util.type(item) === 'object') {
            // 传入的是对象
            switch (item.key) {
                case 'key': // key
                    res = list.map((i) => i.key).indexOf(item.value);
                    break;

                case 'value': // 值
                    res = list.map((i) => i.value).indexOf(item.value);
                    break;

                default: // 下标
                    res = 0 <= item.value && item.value < list.length ? parseInt(item.value) : res;
                    break;
            }
        } else if (Util.type(item) === 'number') {
            // 传入的是数字
            res = 0 <= item && item < list.length ? parseInt(item) : res;
        } else if (Util.type(item) === 'string') {
            // 传入的是字符串
            res = list.map((i) => i.value).indexOf(item);
        } else if (Util.type(item) === 'array') {
            res = item.reduce((prev, cur) => {
                let pos = this.findItem(cur, list);
                if (pos != -1) {
                    prev.push(pos);
                }
                return prev;
            }, []);
        }

        return res;
    }
}

export default Form;
