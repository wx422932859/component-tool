import './checkbox.css';
import Form from '../form.js';
import Util from '../../base/util.js';

/**
 * 复选框
 * @author wang.xin
 * @extends {Form}
 * @example
 * new Checkbox({
 *     elem: '',
 *     list: [],
 *     change: (value, prev, target) => {}
 * });
 */
class Checkbox extends Form {
    /**
     * Creates an instance of Checkbox.
     * @param {object} [option={}] 配置参数
     * @param {string | Node | MyNode} option.elem CSS选择器、Node节点、MyNode
     * @param {string} option.label 标签
     * @param {array} option.list 数据列表
     * @param {string} [option.all] 全选项名称（当传参的时候，代表有全选）
     * @param {boolean} [option.allCheck] 全选（true 代表选中，false 代表未选中）
     * @param {number | string | object | array} option.check 选中项
     * @param {function} option.change 切换选中项后触发的事件
     * @param {string} option.relation 组件放置关系
     * @param {number} option.maxCount 最多可选个数
     * @param {function} option.error 错误触发事件
     */
    constructor(option = {}) {
        super({
            elem: option.elem,
            relation: option.relation,
            template: Checkbox._template,
        });

        // 若在缓存中则直接返回缓存中的实例
        if (Checkbox._cache.get(this.node[0])) {
            return Checkbox._cache.get(this.node[0]);
        }
        Checkbox._cache.set(this.node[0], this);

        this.init();
        this.load(option);
    }

    /**
     * 初始化
     */
    init() {
        this.monitor();
        this.on();
    }

    /**
     * 设置监听属性
     */
    monitor() {
        /**
         * @member {string} label 标签
         * @memberof Checkbox
         * @inner
         */
        this._observe('label', (value) => {
            this.setLabel(value);
        });

        /**
         * @member {array} list 数据列表
         * @memberof Checkbox
         * @inner
         */
        this._observe('list', (value) => {
            this.standardList = this.formatList(value);
        });

        /**
         * @member {array} standardList 格式化的数据列表
         * @memberof Checkbox
         * @inner
         */
        this._observe('standardList', () => {
            this.setList();
        });

        /**
         * @member {array} value 选中值
         * @memberof Checkbox
         * @inner
         */
        this._observe('value', (value, prev) => {
            if (this.standardList.length === 0) {
                return;
            }

            if (value.length === this.standardList.length && this.allCheck !== true) {
                this.allCheck = true;
            } else if (value.length !== this.standardList.length && this.allCheck === true) {
                this.allCheck = false;
            }

            // 更新选中效果
            this.updateCheckItem();
            this.change(value, prev, this);
        });

        /**
         * @member {number[]} pos 在列表中的位置
         * @memberof Checkbox
         * @inner
         */
        this._observe('pos', (value) => {
            this.value = value.map((item) => this.list[item]);
        });

        /**
         * @member {*} check 选中项
         * @memberof Checkbox
         * @inner
         */
        this._observe('check', (value) => {
            let pos = this.findItem(value, this.standardList);

            this.pos = Util.type(pos) === 'array' ? pos : [pos];
        });

        /**
         * @member {boolean | string} all 全选项
         * @memberof Checkbox
         * @inner
         */
        this._observe('all', (value) => {
            this.setAllItem();
        });

        /**
         * @member {boolean} allCheck 全选中
         * @memberof Checkbox
         * @inner
         */
        this._observe('allCheck', false, (value) => {
            if (value === true && this.check.length !== this.standardList.length) {
                this.check = this.standardList.map((item, index) => index);
            } else if (value === false && this.check.length === this.standardList.length) {
                this.check = [];
            }
        });

        /**
         * @member {function} change 值发生变化时的回调方法
         * @memberof Checkbox
         * @inner
         */
        this.change = () => {};

        /**
         * @member {number} maxCount 最多可选个数
         * @memberof Checkbox
         * @inner
         */
        this._observe('maxCount', -1);

        /**
         * @member {function} error 错误触发事件
         * @memberof Checkbox
         * @inner
         * @example
         * type = 1, 代表选中的个数已经达到最大值
         */
        this.error = (type) => {};

        /**
         * @member {*} disabled 不可更改项
         * @memberof Checkbox
         * @inner
         */
        this._observe('disabled', (value) => {
            let pos = this.findItem(value, this.standardList);

            this.disabledPos = Util.type(pos) === 'array' ? pos : [pos];
        });

        /**
         * @member {number[]} disabledPos 不可更改项在列表中的位置
         * @memberof Checkbox
         * @inner
         */
        this._observe('disabledPos', (value) => {
            this.node.find('.ly-checkbox_item').removeClass('ly-checkbox_item-disabled');
            value.forEach((elem) => {
                let node = this.node.find('.ly-checkbox_item').eq(elem);

                if (this.all !== false) {
                    node = this.node.find('.ly-checkbox_item').eq(elem + 1);
                }
                node.addClass('ly-checkbox_item-disabled');
            });
        });
    }

    /**
     * 事件
     */
    on() {
        // 单个选项
        this.node.on('click', '.ly-checkbox_item[data-type="single"]:not(.ly-checkbox_item-disabled)', (e, target) => {
            if (
                this.maxCount != -1 &&
                this.check.length == this.maxCount &&
                !target.hasClass('ly-checkbox_item-active')
            ) {
                this.error(0);
                return;
            }

            target.toggleClass('ly-checkbox_item-active');
            if (this.all === false) {
                // 没有全选
                this.check = this.node.find('.ly-checkbox_item-active[data-type="single"]').map((item, index, list) => {
                    return list.eq(index).posOfSiblings();
                });
            } else {
                this.check = this.node.find('.ly-checkbox_item-active[data-type="single"]').map((item, index, list) => {
                    return list.eq(index).posOfSiblings() - 1;
                });
            }
        });

        // 全选按钮
        this.node.on('click', '.ly-checkbox_item[data-type="all"]:not(.ly-checkbox_item-disabled)', () => {
            this.allCheck = !this.allCheck;
        });
    }

    /**
     * 加载
     * @param {object} [option={}] 入参
     * @param {string} option.label 标签
     * @param {array} option.list 数据列表
     * @param {string} [option.all] 全选项名称（当传参的时候，代表有全选）
     * @param {number | string | object | array} option.check 选中项
     * @param {number | string | object | array} option.disabled 不可更改项
     * @param {boolean} [option.allCheck] 全选（true 代表选中）
     * @param {function} option.change 切换选中项后触发的事件
     * @param {number} option.maxCount 最多可选个数
     * @param {function} option.error 错误触发事件
     */
    load(option = {}) {
        this.label = option.label;
        this.list = option.list || [];
        this.all = option.all || false;
        this.check = option.check != undefined ? option.check : [];
        this.disabled = option.disabled != undefined ? option.disabled : [];
        this.maxCount = option.maxCount || this.maxCount;
        if (this.all !== false && option.allCheck === true) {
            this.allCheck = true;
        }
        if (typeof option.change == 'function') {
            this.change = option.change;
        }
        if (typeof option.error == 'function') {
            this.error = option.error;
        }
    }

    /**
     * 设置数据列表
     */
    setList() {
        let htmlStr = '';

        this.standardList.forEach((item) => {
            htmlStr += `<li class="ly-checkbox_item" data-type="single" title="${item.value}">
                            <i class="ly-checkbox_item-icon"></i>
                            <span>${item.value}</span>
                        </li>`;
        });

        this.node.find('.ly-checkbox_list').html(htmlStr);
        this.setAllItem();
    }

    /**
     * 设置全选项
     */
    setAllItem() {
        this.node.find('.ly-checkbox_item[data-type="all"]').remove();
        if (this.all !== false) {
            this.node.find('.ly-checkbox_list').prepend(
                `<li class="ly-checkbox_item" data-type="all" title="${this.all}">
                    <i class="ly-checkbox_item-icon"></i>
                    <span>${this.all}</span>
                </li>`
            );
        }
    }

    /**
     * 更新选中样式
     */
    updateCheckItem() {
        // 先重置为未选中再选中指定的节点
        this.node.find('.ly-checkbox_item').removeClass('ly-checkbox_item-active');

        // 更新选中项
        let step = this.all ? 1 : 0;
        this.pos.forEach((item) =>
            this.node
                .find('.ly-checkbox_item')
                .eq(item + step)
                .addClass('ly-checkbox_item-active')
        );
        this.allCheck && this.node.find('.ly-checkbox_item[data-type="all"]').addClass('ly-checkbox_item-active');
    }
}

/**
 * @member {Map} _cache 缓存
 * @memberof Checkbox
 * @static
 */
Checkbox._cache = new Map();

/**
 * @member {string} _template 模版
 * @memberof Checkbox
 * @static
 * @example
 * <div class="ly-form ly-checkbox">
 *   <label class="ly-form_label"></label>
 *   <div class="ly-form_content">
 *      <ul class="ly-checkbox_list"></ul>
 *   </div>
 * </div>
 */
Checkbox._template = `<div class="ly-form ly-checkbox">
    <label class="ly-form_label"></label>
    <div class="ly-form_content">
        <ul class="ly-checkbox_list"></ul>
    </div>
</div>`;

export default Checkbox;
