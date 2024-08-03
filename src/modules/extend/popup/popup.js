import './popup.css';
import Component from '../../base/component.js';

class Popup extends Component {
    /**
     * Creates an instance of Popup.
     * @param {*} selector
     */
    constructor() {
        super();

        // 若在缓存中则直接返回缓存中的实例
        if (Popup._cache.get(this.node[0])) {
            return Popup._cache.get(this.node[0]);
        }
        Popup._cache.set(this.node[0], this);

        this.superMonitor();
        this.superEvent();
    }

    /**
     * 属性
     */
    superMonitor() {
        /**
         * @member {MyNode} popupNode 容器
         */
        this.popupNode = this.node.children('.ly-popup_container');

        /**
         * @member {Object} dragPosition 鼠标拖动位置
         */
        this.dragPosition = null;

        /**
         * @member {Number} dragRule 拖拽规则
         * @example
         * 0 => 禁止拖拽
         * 1 => 只在可视区域内拖拽
         * 2 => 不限制拖拽位置
         */
        this._observe('dragRule', 0, (value) => {
            this.popupNode.attr('data-dragRule', value);
            this.calcDragRange();
            this.moveTo();
        });

        /**
         * @member {Number} resizeRule 拉伸规则
         * @example
         * 0 => 禁止拉伸
         * 1 => 可以拉伸
         */
        this._observe('resizeRule', 0, (value) => {
            this.popupNode.attr('data-resizeRule', value);
            this.popupNode.append(`
                <div class="ly-popup_resize">
                    <span class="ly_popup_resize-e" data-direction="e"></span>
                    <span class="ly_popup_resize-w" data-direction="w"></span>
                    <span class="ly_popup_resize-s" data-direction="s"></span>
                    <span class="ly_popup_resize-n" data-direction="n"></span>
                    <span class="ly_popup_resize-es" data-direction="es"></span>
                    <span class="ly_popup_resize-ws" data-direction="ws"></span>
                    <span class="ly_popup_resize-wn" data-direction="wn"></span>
                    <span class="ly_popup_resize-en" data-direction="en"></span>
                </div>`);
        });

        /**
         * @member {Object} dragRange 拖拽边界
         */
        this._observe('dragRange', null, () => {});
    }

    /**
     * 事件
     */
    superEvent() {
        this.dragEvent();
        this.resizeEvent();
        /**
         * 尺寸大小变化
         */
        window.addEventListener('resize', () => {
            this.calcDragRange();
            this.moveTo();
        });
    }

    /**
     * 拖拽事件
     */
    dragEvent() {
        /**
         * @event 鼠标按下
         */
        this.node.on('mousedown', '.ly-popup_header', (e) => {
            if (!this.dragRule) {
                return;
            }

            this.dragPosition = {
                x: e.pageX,
                y: e.pageY
            };
        });

        /**
         * @event 鼠标移动
         */
        this.node.on('mousemove', (e) => {
            if (!this.dragRule) {
                return;
            }

            if (this.dragPosition != null) {
                let { top, left } = window.getComputedStyle(this.popupNode[0]);

                this.moveTo(
                    parseInt(top) + (e.pageY - this.dragPosition.y),
                    parseInt(left) + (e.pageX - this.dragPosition.x)
                );
                this.dragPosition = {
                    x: e.pageX,
                    y: e.pageY
                };
            }
        });

        /**
         * @event 鼠标松开
         */
        this.node.on('mouseup', () => {
            this.dragPosition = null;
        });
    }

    /**
     * 伸缩事件
     */
    resizeEvent() {
        /**
         * @event 鼠标按下
         */
        this.node.on('mousedown', '.ly-popup_resize>[data-direction]', (e, target) => {
            if (!this.resizeRule) {
                return;
            }

            this.resizePosition = {
                direction: target.attr('data-direction'),
                x: e.pageX,
                y: e.pageY
            };
        });

        /**
         * @event 鼠标移动
         */
        this.node.on('mousemove', (e) => {
            if (!this.resizeRule) {
                return;
            }

            if (this.resizePosition != null) {
                let offset = {
                        x: e.pageX - this.resizePosition.x,
                        y: e.pageY - this.resizePosition.y
                    }, // 偏移量
                    result = {
                        top: this.popupNode[0].offsetTop,
                        left: this.popupNode[0].offsetLeft,
                        width: this.popupNode[0].clientWidth,
                        height: this.popupNode[0].clientHeight
                    };

                if (this.resizePosition.direction.includes('e')) {
                    // 宽
                    result.width += offset.x;
                }

                if (this.resizePosition.direction.includes('w')) {
                    // 宽、横向偏移量
                    result.width -= offset.x;
                    result.left += offset.x;
                }

                if (this.resizePosition.direction.includes('s')) {
                    // 高
                    result.height += offset.y;
                }

                if (this.resizePosition.direction.includes('n')) {
                    // 高、纵向偏移量
                    result.height -= offset.y;
                    result.top += offset.y;
                }
                this.popupNode.css({
                    'width': result.width + 'px',
                    'height': result.height + 'px'
                });
                this.calcDragRange();
                this.moveTo(result.top, result.left);
                this.resizePosition.x = e.pageX;
                this.resizePosition.y = e.pageY;
            }
        });

        /**
         * @event 鼠标松开
         */
        this.node.on('mouseup', () => {
            this.resizePosition = null;
        });
    }

    /**
     * 移动到指定位置，默认居中
     * @param {Number} top 纵向偏移量
     * @param {Number} left 横向偏移量
     */
    moveTo(
        top = (window.innerHeight - this.popupNode[0].clientHeight) / 2,
        left = (window.innerWidth - this.popupNode[0].clientWidth) / 2
    ) {
        if (this.dragRule === 1 && this.dragRange != null) {
            top = Math.max(Math.min(top, this.dragRange.topMax), this.dragRange.topMin);
            left = Math.max(Math.min(left, this.dragRange.leftMax), this.dragRange.leftMin);
        }

        this.popupNode.css({
            top: top + 'px',
            left: left + 'px'
        });
    }

    /**
     * 计算拖拽边界
     */
    calcDragRange() {
        this.dragRange = {
            topMin: 0,
            leftMin: 0,
            topMax: window.innerHeight - this.popupNode[0].clientHeight,
            leftMax: window.innerWidth - this.popupNode[0].clientWidth
        };
    }

    /**
     * 挂载
     */
    _mounted() {
        this.on();
    }

    /**
     * 事件
     */
    on() {
        this.node.on('click', '.ly-popup_header>[data-action="close"]', (e) => {
            this.unload();
        });
    }

    /**
     * 卸载
     */
    unload() {
        this.node.hide();
        this.dragPosition = null;
        this.moveTo();
    }

    /**
     * 加载
     * @param {String} title 标题
     * @param {String} content 内容
     * @param {Number} [dragRule] 拖拽规则
     */
    load(options = {}) {
        this.node.show();
        this.node.find('.ly-popup_title').html(options.title);
        this.node.find('.ly-popup_center').html(options.content);
        this.dragRule = options.dragRule || 1; // 配置是否可以拖拽
        this.resizeRule = options.resizeRule || 1;
    }
}

/**
 * 模板
 * @member {string} _template
 * @memberof DropList
 * @static
 */
Popup._template = `
<div class="ly-form ly-popup">
    <div class="ly-popup_container">
        <div class="ly-popup_header">
            <span class="ly-popup_title"></span>
            <svg class="ly-icon_svg" aria-hidden="true" data-action="close">
                <use xlink:href="#ly-close"></use>
            </svg>
        </div>
        <div class="ly-popup_footer"></div>
    </div>
</div>`;

/**
 * 缓存
 * @member {Map} _cache
 * @memberof DropList
 * @static
 */
Popup._cache = new Map();

/**
 * 隐藏所有弹窗
 */
Popup._hideAll = function () {
    Popup._cache.forEach((item) => item.node.hide());
};

export default Popup;
