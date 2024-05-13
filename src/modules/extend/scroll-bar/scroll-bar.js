import './scroll-bar.css';
import Component from '../../base/component';
import Util from '../../base/util';

class ScrollBar extends Component {
    constructor() {
        super();
    }

    /**
     * 挂载成功
     */
    _mounted() {
        this.monitor();
    }

    /**
     * 属性
     */
    monitor() {
        /**
         * 容器
         */
        this.container = null;

        /**
         * 比例
         */
        this._observe('rate', 1, (value) => {
            if (value < 1) {
                this.showThumb();
            } else {
                this.node.find('.sb_thumb').css('height', '0px');
                this.hideThumb();
            }
        });

        /**
         * @member {boolean} fixed 是否长显
         */
        this._observe('fixed', false, (value) => {
            if (value) {
                this.calcThumbRate();
                this.node.attr('data-fixed', 1);
            }
        });

        /**
         * @member {function} delayCalcRate 延时计算比例
         */
        this.delayCalcRate = Util.debounce(() => {
            let rate = this.container[0].clientHeight / this.container[0].scrollHeight;
            if (rate != this.rate) {
                this.rate = rate;
            }
        }, 200);
    }

    /**
     * 事件
     */
    on() {
        /**
         * 滚轮
         */
        this.container.on('mousewheel', (event) => {
            if (event.wheelDeltaY < 0) {
                this.container[0].scrollTop += 40;
            } else {
                this.container[0].scrollTop -= 40;
            }
        });

        /**
         * 发生滚动
         */
        this.container.on('scroll', () => {
            let scrollTop = this.container[0].scrollTop;

            this.node.css('top', scrollTop + 'px');
            this.node.find('.sb_thumb').css('top', scrollTop * this.rate + 'px');
        });

        /**
         * 鼠标滑入
         */
        this.container.on('mouseenter', () => this.calcThumbRate());

        /**
         * 鼠标滑出
         */
        this.container.on('mouseleave', () => this.hideThumb());

        /**
         * 鼠标移动
         */
        this.container.on('mousemove', () => this.delayCalcRate());

        this.node.on('mousedown', (e) => {
            this.mousedown = true;
            this.mouseY = e.pageY;
        });

        this.node.on('mousemove', (e) => {
            if (this.mousedown == true && this.container[0]) {
                this.container[0].scrollTop += (e.pageY - this.pageY) * this.rate;
            }
        });

        document.addEventListener('mouseup', (e) => {
            this.mousedown = false;
            this.mouseY = 0;
        });
    }

    /**
     * 加载
     * @param {object} options 入参
     * @param {boolean} options.fixed 是否固定显示
     */
    load(options = {}) {
        this.container = this.node.parent();
        this.setStyle();
        this.fixed = options.fixed || false;
        this.on();
    }

    /**
     * 设置样式
     */
    setStyle() {
        if (!['relative', 'absolute', 'fixed'].includes(this.container.css('position'))) {
            this.container.css('position', 'relative');
        }
        this.container.css('overflow', 'hidden');
    }

    /**
     * 计算滑块占比
     */
    calcThumbRate() {
        this.rate = this.container[0].clientHeight / this.container[0].scrollHeight;
    }

    /**
     * 显示滚动条
     */
    showThumb() {
        let { paddingTop, paddingBottom } = getComputedStyle(this.node[0]);

        this.node
            .find('.sb_thumb')
            .css(
                'height',
                this.container[0].clientHeight * this.rate - (parseInt(paddingTop) + parseInt(paddingBottom)) + 'px'
            );
        this.node.addClass('scroll-bar-active');
    }

    /**
     * 隐藏滚动条
     */
    hideThumb() {
        this.node.removeClass('scroll-bar-active');
    }
}

/**
 * 模板
 */
ScrollBar._template = `<div class="scroll-bar">
    <div class="sb_scroll">
        <div class="sb_thumb"></div>
    </div>
</div>`;

export default ScrollBar;
