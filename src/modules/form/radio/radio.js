import './radio.css';
import Form from '../form/form.js';

/**
 * @description 单选框
 * @author wang.xin
 * @extends {Form}
 * @example
 * new Radio({
 *     elem: '',
 *     list: [],
 *     change: (value, prev, target) => {}
 * });
 */
class Radio extends Form {
    /**
     * @description Creates an instance of Radio.
     * @param {object} [option={}] 配置参数
     * @param {string | Node | MyNode} option.elem CSS选择器、Node节点、MyNode
     * @param {string} option.label 标签
     * @param {array} option.list 数据列表
     * @param {number | string | object} option.check 选中项
     * @param {function} option.change 切换选中项后触发的事件
     * @param {boolean} option.required 是否必选
     * @param {string} option.relation 组件放置关系
     */
    constructor(option = {}) {
        super({
            elem: option.elem,
            relation: option.relation,
            template: Radio._template
        });

        // 若在缓存中则直接返回缓存中的实例
        if (Radio._cache.get(this.node[0])) {
            return Radio._cache.get(this.node[0]);
        }
        Radio._cache.set(this.node[0], this);

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
     * @description 设置监听属性
     */
    monitor() {
        /**
         * @member {string} label 标签
         * @memberof Radio
         * @inner
         */
        this._observe('label', (value) => {
            this.setLabel(value);
        });

        /**
         * @member {array} list 数据列表
         * @memberof Radio
         * @inner
         */
        this._observe('list', (value) => {
            this.standardList = this.formatList(value);
        });

        /**
         * @member {array} standardList 格式化的数据列表
         * @memberof Radio
         * @inner
         */
        this._observe('standardList', () => {
            this.setList();
        });

        /**
         * @member {*} value 值
         * @memberof Radio
         * @inner
         */
        this._observe('value', (value, prev) => {
            this.updateCheckItem();
            this.change(value, prev, this);
        });

        /**
         * @member {number} pos 在列表中的位置
         * @memberof Radio
         * @inner
         */
        this._observe('pos', (value) => {
            this.value = value !== -1 ? this.list[value] : null;
        });

        /**
         * @member {*} check 选中项
         * @memberof Radio
         * @inner
         */
        this._observe('check', (value) => {
            this.pos = this.findItem(value, this.standardList);
        });

        /**
         * @member {boolean} required 是否必选
         * @memberof Radio
         * @inner
         */
        this._observe('required', false);

        /**
         * @member {function} change 值发生变化时的回调方法
         * @memberof Radio
         * @inner
         */
        this.change = () => {};
    }

    /**
     * @description 事件
     */
    on() {
        this.node.on('click', '.ly-radio_item', (e, target) => {
            if (this.required === false && target.hasClass('ly-radio_item-active')) {
                this.check = null;
            } else {
                this.check = target.posOfSiblings();
            }
        });
    }

    /**
     * @description 加载
     * @param {object} [option={}] 入参
     * @param {string} option.label 标签
     * @param {array} option.list 数据列表
     * @param {number | string | object} option.check 选中项
     * @param {function} option.change 切换选中项后触发的事件
     */
    load(option = {}) {
        this.label = option.label;
        this.list = option.list || [];
        this.check = option.check;
        this.required = option.required || this.required;
        if (this.required) {
            if (this.value == null && this.list.length !== 0) {
                this.check = 0;
            }
        }
        if (typeof option.change === 'function') {
            this.change = option.change;
        }
    }

    /**
     * @description 更新数据列表
     */
    setList() {
        let htmlStr = '';

        this.standardList.forEach((item) => {
            htmlStr += `<li class="ly-radio_item" title="${item.value}">
                            <i class="ly-radio_item-icon"></i>
                            <span>${item.value}</span>
                        </li>`;
        });

        this.node.find('.ly-radio_list').html(htmlStr);
    }

    /**
     * @description 更新选中样式
     */
    updateCheckItem() {
        this.node.find('.ly-radio_item-active').removeClass('ly-radio_item-active');

        if (this.pos !== -1) {
            this.node.find('.ly-radio_item').eq(this.pos).addClass('ly-radio_item-active');
        }
    }
}

/**
 * @member {Map} _cache 缓存
 * @memberof Radio
 * @static
 */
Radio._cache = new Map();

/**
 * @member {string} _template 模版
 * @memberof Radio
 * @static
 * @example
 * <div class="ly-form ly-radio">
 *   <label class="ly-form_label"></label>
 *   <div class="ly-form_content">
 *      <ul class="ly-radio_list"></ul>
 *   </div>
 * </div>
 */
Radio._template = `<div class="ly-form ly-radio">
    <label class="ly-form_label"></label>
    <div class="ly-form_content">
        <ul class="ly-radio_list"></ul>
    </div>
</div>`;

export default Radio;
