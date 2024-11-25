import './multiple-list.css';
import MyNode from '../../base/my-node.js';
import DropList from '../drop-list/drop-list.js';
import Util from '../../base/util.js';

/**
 * 下拉多选列表
 * @author wang.xin
 * @extends {DropList}
 * @example
 * new MultipleList({
 *     elem: '',
 *     list: [],
 *     change: (value, prev, target) => {}
 * });
 */
class MultipleList extends DropList {
    /**
     * Creates an instance of MultipleList.
     * @param {object} [option={}] 配置参数
     * @param {string | Node | MyNode} option.elem CSS选择器、Node节点、MyNode
     * @param {string} option.label 标签
     * @param {array} option.list 数据列表
     * @param {number | string | object | array} option.check 选中项
     * @param {function} option.change 切换选中项后触发的事件
     * @param {boolean} option.hover 是否悬浮显示
     * @param {number} option.maxCount 最多可选个数
     * @param {function} option.error 错误触发事件
     * @param {string} option.relation 组件放置关系
     */
    constructor(option = {}) {
        super(
            Object.assign(option, {
                template: option.template || MultipleList._template
            })
        );
    }

    /**
     * 属性
     */
    monitor() {
        /**
         * @member {boolean} show 是否显示下拉列表
         * @memberof MultipleList
         * @inner
         */
        this._observe('show', (value) => {
            this.node.attr('data-status', value ? 'up' : 'down');
        });

        /**
         * @member {string} label 标签
         * @memberof MultipleList
         * @inner
         */
        this._observe('label', (value) => {
            this.setLabel(value);
        });

        /**
         * @member {array} list 数据列表
         * @memberof MultipleList
         * @inner
         */
        this._observe('list', (value) => {
            this.standardList = this.formatList(value);
        });

        /**
         * @member {array} standardList 格式化的数据列表
         * @memberof MultipleList
         * @inner
         */
        this._observe('standardList', () => {
            this.setList();
        });

        /**
         * @member {*} value 值
         * @memberof MultipleList
         * @inner
         */
        this._observe('value', (value, prev) => {
            this.updateCheckItem();
            this.change(value, prev, this);
        });

        /**
         * @member {number[]} pos 在列表中的位置
         * @memberof MultipleList
         * @inner
         */
        this._observe('pos', (value) => {
            this.value = value.map((item) => this.list[item]);
        });

        /**
         * @member {*} check 选中项
         * @memberof MultipleList
         * @inner
         */
        this._observe('check', [], (value) => {
            let pos = this.findItem(value, this.standardList);

            this.pos = Util.type(pos) === 'array' ? pos : [pos];
        });

        /**
         * @member {boolean} hover 是否悬浮显示
         * @memberof MultipleList
         * @inner
         */
        this._observe('hover', (value) => {});

        /**
         * @member {number} maxCount 最多可选个数
         * @memberof MultipleList
         * @inner
         */
        this._observe('maxCount', -1);

        /**
         * @member {function} change 切换点检项触发事件
         * @memberof MultipleList
         * @inner
         */
        this.change = (value, prev, target) => {};

        /**
         * @member {function} error 错误触发事件
         * @memberof MultipleList
         * @inner
         * @example
         * type = 1, 代表选中的个数已经达到最大值
         */
        this.error = (type) => {};
    }

    /**
     * 事件
     */
    on() {
        // 点击输入框
        this.node.on('click', '.ly-form_content', (e, target, listener, source) => {
            let show = this.show;
            this.constructor._hideAll();

            if (source.hasClass('ly-drop-list_item') || source.parents('.ly-drop-list_item').length !== 0) {
                // 当触发源是下拉列表项时，不改变显示状态
                this.show = show;
            } else if (source.hasClass('ly-icon_remove')) {
                // 当触发源是删除按钮时，不改变现实状态，并删除
                this.show = show;
                let list = Util.proxyToJSON(this.check);
                list.shift();
                this.check = list;
            } else if (this.hover !== true) {
                // 当未做悬浮触发时，隐藏下拉列表
                this.show = !show;
            }
        });

        // 切换列表项
        this.node.on('click', '.ly-drop-list_item', (e, target) => {
            if (
                this.maxCount !== -1 &&
                this.check.length === this.maxCount &&
                !target.hasClass('ly-drop-list_item-active')
            ) {
                this.error(0);
                return;
            }

            target.toggleClass('ly-drop-list_item-active');
            this.check = this.node
                .find('.ly-drop-list_item-active')
                .map((item, index, list) => list.eq(index).posOfSiblings());
        });

        // 鼠标滑入
        this.node.on('mouseover', '.ly-form_content', () => {
            if (this.hover === true) {
                this.show = true;
            }
        });

        // 鼠标滑出
        this.node.on('mouseout', '.ly-form_content', () => {
            if (this.hover === true) {
                this.show = false;
            }
        });
    }

    /**
     * 加载
     * @param {object} [option={}] 入参
     * @param {string} option.label 标签
     * @param {array} option.list 数据列表
     * @param {number | string | object | array} option.check 选中项
     * @param {function} option.change 切换选中项后触发的事件
     * @param {boolean} option.hover 是否悬浮显示
     * @param {number} option.maxCount 最多可选个数
     * @param {function} option.error 错误触发事件
     */
    load(option = {}) {
        this.show = false;
        this.label = option.label;
        this.list = option.list || [];
        this.hover = option.hover || false;
        this.maxCount = option.maxCount || this.maxCount;
        if (option.check != null) {
            this.check = option.check;
        }
        if (typeof option.error === 'function') {
            this.error = option.error;
        }
        if (typeof option.change === 'function') {
            this.change = option.change;
        }
    }

    /**
     * 更新选中内容
     */
    updateCheckItem() {
        // 先重置为未选中再选中指定的节点
        this.node.find('.ly-drop-list_item').removeClass('ly-drop-list_item-active');

        // 选中当前项
        this.pos.forEach((element) => {
            // 更新列表中选中状态
            this.node.find('.ly-drop-list_item').eq(element).addClass('ly-drop-list_item-active');
        });
        this.node.find('.ly-multiple-list_input-content').attr('data-count', this.pos.length);

        if (this.pos.length > 0) {
            let text = this.standardList[this.pos[0]].value;
            this.node.find('.ly-multiple-list_checked-text>span').text(text).attr('title', text);
            this.node.find('.ly-multiple-list_checked-num>span').eq(1).text(this.pos.length);
        }
    }
}

/**
 * 模板
 * @member {string} _template
 * @memberof MultipleList
 * @static
 * @example
 *  <div class="ly-form ly-drop-list ly-multiple-list">
 *      <label class="ly-form_label"></label>
 *      <div class="ly-form_content">
 *          <div class="ly-form_input-container">
 *              <div class="ly-multiple-list_input-content" data-count="0">
 *              <div class="ly-multiple-list_input">
 *                   <input class="ly-form_input" type="text" placeholder="请选择" readonly />
 *              </div>
 *              <div class="ly-multiple-list_checked-text">
 *                  <span></span>
 *                  <i class="ly-icon_remove"></i>
 *              </div>
 *              <div class="ly-multiple-list_checked-num">
 *                  <span>+</span>
 *                  <span></span>
 *              </div>
 *         </div>
 *         <i class="ly-icon_arrow-down"></i>
 *      </div>
 *      <div class="ly-drop-list_container">
 *          <div class="ly-drop-list_space"></div>
 *              <ul class="ly-drop-list_content"></ul>
 *          </div>
 *      </div>
 *  </div>
 */
MultipleList._template = `<div class="ly-form ly-drop-list ly-multiple-list">
    <label class="ly-form_label"></label>
    <div class="ly-form_content">
        <div class="ly-form_input-container">
            <div class="ly-multiple-list_input-content" data-count="0">
                <div class="ly-multiple-list_input">
                    <input class="ly-form_input" type="text" placeholder="请选择" readonly />
                </div>
                <div class="ly-multiple-list_checked-text">
                    <span></span>
                    <i class="ly-icon_remove"></i>
                </div>
                <div class="ly-multiple-list_checked-num">
                    <span>+</span>
                    <span></span>
                </div>
            </div>
            <i class="ly-icon_arrow-down"></i>
        </div>
        <div class="ly-drop-list_container">
            <div class="ly-drop-list_space"></div>
            <ul class="ly-drop-list_content"></ul>
        </div>
    </div>
</div>`;

export default MultipleList;
