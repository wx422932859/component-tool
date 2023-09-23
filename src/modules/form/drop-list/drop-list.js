import './drop-list.css';
import MyNode from '../../base/my-node.js';
import Form from '../form.js';

/**
 * 下拉列表
 * @author wang.xin
 * @extends {Form}
 * @example
 * new DropList({
 *     elem: '',
 *     list: [],
 *     change: (value, prev, target) => {}
 * });
 */
class DropList extends Form {
    /**
     * Creates an instance of DropList.
     * @param {object} [option={}] 配置参数
     * @param {string | Node | MyNode} option.elem CSS选择器、Node节点、MyNode
     * @param {string} option.label 标签
     * @param {array} option.list 数据列表
     * @param {number | string | object} option.check 选中项
     * @param {function} option.change 切换选中项后触发的事件
     * @param {boolean} option.hover 是否悬浮显示
     * @param {string} option.relation 组件放置关系
     */
    constructor(option = {}) {
        super({
            elem: option.elem,
            relation: option.relation,
            template: option.template || DropList._template,
        });

        // 若在缓存中则直接返回缓存中的实例
        if (DropList._cache.get(this.node[0])) {
            return DropList._cache.get(this.node[0]);
        }
        DropList._cache.set(this.node[0], this);

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
     * 属性
     */
    monitor() {
        /**
         * @member {boolean} show 是否显示下拉列表
         * @memberof DropList
         * @inner
         */
        this._observe('show', (value) => {
            this.node.attr('data-status', value ? 'up' : 'down');
        });

        /**
         * @member {string} label 标签
         * @memberof DropList
         * @inner
         */
        this._observe('label', (value) => {
            this.setLabel(value);
        });

        /**
         * @member {array} list 数据列表
         * @memberof DropList
         * @inner
         */
        this._observe('list', (value) => {
            this.standardList = this.formatList(value);
        });

        /**
         * @member {array} standardList 格式化的数据列表
         * @memberof DropList
         * @inner
         */
        this._observe('standardList', () => {
            this.setList();
        });

        /**
         * @member {*} value 值
         * @memberof DropList
         * @inner
         */
        this._observe('value', (value, prev) => {
            this.updateCheckItem();
            this.change(value, prev, this);
        });

        /**
         * @member {number} pos 在列表中的位置
         * @memberof DropList
         * @inner
         */
        this._observe('pos', '-1', (value) => {
            this.value = value != -1 ? this.list[value] : null;
        });

        /**
         * @member {*} check 选中项
         * @memberof DropList
         * @inner
         */
        this._observe('check', (value) => {
            this.pos = this.findItem(value, this.standardList);
        });

        /**
         * @member {boolean} hover 是否悬浮显示
         * @memberof DropList
         * @inner
         */
        this._observe('hover', (value) => {});

        /**
         * @member {function} change 切换点检项触发事件
         * @memberof DropList
         * @inner
         */
        this.change = (value, prev, target) => {};
    }

    /**
     * 加载
     * @param {object} [option={}] 入参
     * @param {string} option.label 标签
     * @param {array} option.list 数据列表
     * @param {number | string | object} option.check 选中项
     * @param {function} option.change 切换选中项后触发的事件
     * @param {boolean} option.hover 是否悬浮显示
     */
    load(option = {}) {
        this.show = false;
        this.label = option.label;
        this.list = option.list || [];
        this.hover = option.hover || false;
        if (typeof option.change == 'function') {
            this.change = option.change;
        }
        if (option.check != null) {
            this.check = option.check;
        }
    }

    /**
     * 事件
     */
    on() {
        // 点击输入框
        this.node.on('click', '.ly-form_content', () => {
            if (this.hover != true) {
                let show = this.show;
                DropList._hideAll();
                this.show = !show;
            }
        });

        // 切换列表项
        this.node.on('click', '.ly-drop-list_item', (e, target) => {
            this.check = target.posOfSiblings();
        });

        // 鼠标滑入
        this.node.on('mouseover', '.ly-form_content', () => {
            if (this.hover == true) {
                this.show = true;
            }
        });

        // 鼠标滑出
        this.node.on('mouseout', '.ly-form_content', () => {
            if (this.hover == true) {
                this.show = false;
            }
        });
    }

    /**
     * 设置数据列表
     */
    setList() {
        let htmlStr = '',
            height = this.standardList.length * 32 || 32;

        this.standardList.forEach((item) => {
            htmlStr += `<li class="ly-drop-list_item" title="${item.value}">
                        <span>${item.value}</span>
                        <i class="ly-icon_check"></i>
                    </li>`;
        });

        this.node
            .css('--ly-form_height_drop-list', `${height + 40}px`)
            .find('.ly-drop-list_content')
            .html(htmlStr);
    }

    /**
     * 更新选中内容
     */
    updateCheckItem() {
        // 取消选中项
        this.node
            .find('.ly-drop-list_item-active')
            .removeClass('ly-drop-list_item-active');

        // 选中当前项
        let text = '';
        if (this.pos > -1) {
            this.node
                .find('.ly-drop-list_item')
                .eq(this.pos)
                .addClass('ly-drop-list_item-active');
            text = this.standardList[this.pos].value;
        }
        this.node.find('.ly-form_input').val(text).attr('title', text);
        this.hover === false && (this.show = false);
    }

    /**
     * 获取选中项
     * @deprecated
     * @returns {*}
     */
    getCheckItem() {
        return this.value;
    }
}

// 当点击的不是下拉列表的时候，关闭下拉列表
if (typeof document != 'undefined') {
    document.addEventListener('click', (e) => {
        let elem = new MyNode(e.target);

        // 当点击的不是下拉列表的时候
        if (elem.parents('.ly-drop-list .ly-form_content').length == 0) {
            DropList._hideAll();
        }
    });
}

/**
 * 关闭所有下拉列表
 * @member {function} _hideAll
 * @memberof DropList
 * @static
 */
DropList._hideAll = function () {
    DropList._cache.forEach((item) => (item.show = false));
};

/**
 * 缓存
 * @member {Map} _cache
 * @memberof DropList
 * @static
 */
DropList._cache = new Map();

/**
 * 模板
 * @member {string} _template
 * @memberof DropList
 * @static
 * @example
 * <div class="ly-form ly-drop-list">
 *     <label class="ly-form_label"></label>
 *     <div class="ly-form_content">
 *         <div class="ly-form_input-container">
 *             <input class="ly-form_input" type="text" placeholder="请选择" readonly />
 *             <i class="ly-icon_arrow-down"></i>
 *         </div>
 *         <div class="ly-drop-list_container">
 *             <div class="ly-drop-list_space"></div>
 *             <ul class="ly-drop-list_content"></ul>
 *         </div>
 *     </div>
 * </div>
 */
DropList._template = `<div class="ly-form ly-drop-list">
    <label class="ly-form_label"></label>
    <div class="ly-form_content">
        <div class="ly-form_input-container">
            <input class="ly-form_input" type="text" placeholder="请选择" readonly />
            <i class="ly-icon_arrow-down"></i>
        </div>
        <div class="ly-drop-list_container">
            <div class="ly-drop-list_space"></div>
            <ul class="ly-drop-list_content"></ul>
        </div>
    </div>
</div>`;

export default DropList;
