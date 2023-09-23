import './switch.css';
import Form from '../form.js';

/**
 * @description 单选框
 * @author wang.xin
 * @extends {Form}
 * @example
 * new Switch({
 *     elem: '',
 *     change: (value, prev, target) => {}
 * });
 */
class Switch extends Form {
    /**
     * @description Creates an instance of Switch.
     * @param {object} [option={}] 配置参数
     * @param {string | Node | MyNode} option.elem CSS选择器、Node节点、MyNode
     * @param {string} option.label 标签
     * @param {boolean} option.value 选中项
     * @param {function} option.change 切换选中项后触发的事件
     * @param {string} option.relation 组件放置关系
     */
    constructor(option = {}) {
        super({
            elem: option.elem,
            relation: option.relation,
            template: Switch._template,
        });

        // 若在缓存中则直接返回缓存中的实例
        if (Switch._cache.get(this.node[0])) {
            return Switch._cache.get(this.node[0]);
        }
        Switch._cache.set(this.node[0], this);

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
         * @memberof Switch
         * @inner
         */
        this._observe('label', (value) => {
            this.setLabel(value);
        });

        /**
         * @member {*} value 值
         * @memberof Switch
         * @inner
         */
        this._observe('value', (value, prev) => {
            this.node.find('.ly-switch_btn').attr('data-status', value ? 1 : 0);
            this.change(value, prev, this);
        });
    }

    /**
     * @description 事件
     */
    on() {
        this.node.on('click', '.ly-switch_btn', () => {
            this.value = !this.value;
        });
    }

    /**
     * @description 加载
     * @param {object} [option={}] 入参
     * @param {string} option.label 标签
     * @param {boolean} option.value 选中项
     * @param {function} option.change 切换选中项后触发的事件
     */
    load(option = {}) {
        this.change = option.change || (() => {});
        this.label = option.label;
        this.value = option.value;
    }
}

/**
 * @member {Map} _cache 缓存
 * @memberof Switch
 * @static
 */
Switch._cache = new Map();

/**
 * @member {string} _template 模版
 * @memberof Switch
 * @static
 * @example
 * <div class="ly-form ly-switch">
 *   <label class="ly-form_label"></label>
 *   <div class="ly-form_content">
 *      <span class="ly-switch_btn" data-status="0"></span>
 *   </div>
 * </div>
 */
Switch._template = `<div class="ly-form ly-switch">
    <label class="ly-form_label"></label>
    <div class="ly-form_content">
        <span class="ly-switch_btn" data-status="0"></span>
    </div>
</div>`;

export default Switch;
