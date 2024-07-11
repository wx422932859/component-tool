import './scroll-top.css';
import Component from '../../base/component.js';

class ScrollTop extends Component {
    constructor(selector) {
        super(selector);
    }

    /**
     * 挂载
     */
    _mounted() {
        this.monitor();
        this.on();
    }

    /**
     * 属性
     */
    monitor() {
        /**
         * @member {boolean} show 是否显示
         * @memberof ScrollTop
         * @inner
         */
        this._observe('show', (value) => {
            if (value) {
                this.updatePosition();
                this.node.css('display', 'flex');
            } else {
                this.node.css('display', 'none');
            }
        });
    }

    /**
     * 事件
     */
    on() {
        this.node.on('click', () => (this.parentNode[0].scrollTop = 0));

        window.addEventListener('resize', () => {
            this.updatePosition();
        });
    }

    /**
     * 根据父节点滚动条位置判断是否显示
     */
    hideOrShow() {
        this.show = this.parentNode[0].scrollTop !== 0;
    }

    /**
     * 更新按钮位置
     */
    updatePosition() {
        let top = this.parentNode[0].scrollTop,
            left = this.parentNode[0].scrollLeft,
            width = this.parentNode.width(),
            height = this.parentNode.height();

        this.node.css('top', top + height + 'px');
        this.node.css('left', left + width + 'px');
    }

    /**
     * 加载，当节点被插入文档后执行该方法
     */
    load() {
        this.parentNode = this.node.parent();
        this.parentNode.on('scroll', () => this.hideOrShow());
    }
}

/**
 * 模板
 * @member {string} _template
 * @memberof ScrollTop
 * @static
 * @example
 * <div class="ly-form ly-scroll-top">
 *     <i class="ly-icon_arrow-down"></i>
 * </div>
 */
ScrollTop._template = `<div class="ly-form ly-scroll-top"><i class="ly-icon_arrow-down"></i></div>`;

export default ScrollTop;
