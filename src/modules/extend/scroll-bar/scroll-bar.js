import './scroll-bar.css';
import Component from '../../base/component';
import Util from '../../base/util';
import MyNode from '../../base/my-node';

/**
 * 滚动条
 * @extends {Component}
 */
class ScrollBar extends Component {
    /**
     * Creates an instance of ScrollBar.
     * @memberof ScrollBar
     */
    constructor() {
        super();
    }

    /**
     * 挂载成功
     * @memberof ScrollBar
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
         * @member {Boolean} mousedown 鼠标按下
         * @memberof ScrollBar#
         */
        this._observe('mousedown', false, (value) => {
            this.container.css('user-select', value ? 'none' : 'unset');
        });

        /**
         * @member {MyNode} container 容器
         * @memberof ScrollBar#
         */
        this._observe('container', this.node.parent(), (value, prev) => {
            if (prev.length === 0 || prev[0] !== value[0]) {
                this.onContainer();
            }
        });

        /**
         * @member {Number} rate 比例
         * @memberof ScrollBar#
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
         * @member {Boolean} fixed 是否长显
         * @memberof ScrollBar#
         */
        this._observe('fixed', false, (value) => {
            if (value) {
                this.calcThumbRate();
                this.node.attr('data-fixed', 1);
            }
        });

        /**
         * @member {Number} smoothY 平滑滚动距离
         * @memberof ScrollBar#
         */
        this._observe('smoothY', 30, () => {});

        /**
         * @member {Number} scrollId 滚动ID，避免重复滚动
         * @memberof ScrollBar#
         */
        this._observe('scrollId', () => {});

        /**
         * @member {Function} delayCalcRate 延时计算比例
         * @memberof ScrollBar#
         */
        this.delayCalcRate = Util.debounce(() => {
            let rate = this.container[0].clientHeight / this.container[0].scrollHeight;
            if (rate !== this.rate) {
                this.rate = rate;
            }
        }, 200);
    }

    /**
     * 事件
     * @memberof ScrollBar
     */
    on() {
        /**
         * @event node mousedown 鼠标按下
         * @memberof ScrollBar#
         * @todo
         * 1. 点击的是滑块，标记滑块可以进行拖拽 <br/>
         * 2. 其余情况，滚动条直接跳转到鼠标位置
         */
        this.node.on('mousedown', (e, sourceNode, listenNode, triggerNode) => {
            if (triggerNode.hasClass('sb_thumb')) {
                this.mousedown = true;
                this.pageY = e.pageY;
            } else {
                if (this.container.length > 0) {
                    this.smoothScrollTo(e.offsetY / this.rate);
                }
            }
        });

        /**
         * @event document mouseup 鼠标释放
         * @memberof ScrollBar#
         * @todo 清除拖拽标记以及偏移量
         */
        document.addEventListener('mouseup', (e) => {
            this.mousedown = false;
            this.pageY = 0;
        });

        /**
         * @event document mouseup 鼠标释放
         * @memberof ScrollBar#
         * @todo 清除拖拽标记以及偏移量
         */
        document.addEventListener('mousemove', (e) => {
            if (this.mousedown === true && this.container.length > 0) {
                let step = this.container[0].scrollTop + (e.pageY - this.pageY) / this.rate;
                this.smoothScrollTo(step);
                this.pageY = e.pageY;
            }
        });
    }

    /**
     * 监听容器的事件
     * @memberof ScrollBar
     */
    onContainer() {
        /**
         * @event container onmousewheel 鼠标滚轮
         * @memberof ScrollBar
         * @todo 模拟滚动事件
         */
        this.container.on('mousewheel', (event) => {
            let step = this.container[0].clientHeight / 2,
                scrollTop = 0;

            if (event.wheelDeltaY < 0) {
                scrollTop = this.container[0].scrollTop + step;
            } else {
                scrollTop = this.container[0].scrollTop - step;
            }
            this.smoothScrollTo(scrollTop, event.wheelDeltaY < 0);
        });

        /**
         * @event container onscroll 滚动条
         * @memberof ScrollBar
         * @todo
         * 1. 修改滚动条位置 <br/>
         * 2. 修改滑块位置
         */
        this.container.on('scroll', () => {
            let scrollTop = this.container[0].scrollTop;

            this.node.css('top', scrollTop + 'px');
            this.node.find('.sb_thumb').css('top', scrollTop * this.rate + 'px');
        });

        /**
         * @event container onmouseenter 鼠标滑入
         * @memberof ScrollBar
         * @todo 计算滑块占比
         */
        this.container.on('mouseenter', () => this.calcThumbRate());

        /**
         * @event container onmouseleave 鼠标滑出
         * @memberof ScrollBar
         * @todo 隐藏滚动条
         */
        this.container.on('mouseleave', () => this.hideThumb());

        /**
         * @event container onmousemove 鼠标移动
         * @memberof ScrollBar
         * @todo 延时计算滑块占比
         */
        this.container.on('mousemove', () => this.delayCalcRate());
    }

    /**
     * 加载
     * @param {Object} options 入参
     * @param {MyNode} options.container 容器
     * @param {Boolean} options.fixed 是否固定显示
     * @param {Number} options.smoothY 平滑滑动距离
     * @memberof ScrollBar
     */
    load(options = {}) {
        this.container = options.container || this.node.parent();
        this.setStyle();
        this.fixed = options.fixed || false;
        if (typeof options.smoothY === 'number') {
            this.smoothY = options.smoothY;
        }
    }

    /**
     * 设置样式
     * @memberof ScrollBar
     */
    setStyle() {
        if (!['relative', 'absolute', 'fixed'].includes(this.container.css('position'))) {
            this.container.css('position', 'relative');
        }
        this.container.css('overflow-y', 'hidden');
    }

    /**
     * 计算滑块占比
     * @memberof ScrollBar
     */
    calcThumbRate() {
        this.rate = this.container[0].clientHeight / this.container[0].scrollHeight;
    }

    /**
     * 显示滚动条
     * @memberof ScrollBar
     */
    showThumb() {
        const { marginTop, marginBottom } = window.getComputedStyle(this.node.find('.sb_thumb')[0]);

        this.node
            .find('.sb_thumb')
            .css(
                'height',
                this.container[0].clientHeight * this.rate - (parseInt(marginTop) + parseInt(marginBottom)) + 'px'
            );
        this.node.addClass('scroll-bar-active');
    }

    /**
     * 隐藏滚动条
     * @memberof ScrollBar
     */
    hideThumb() {
        this.node.removeClass('scroll-bar-active');
    }

    /**
     * 平滑滚动
     * @param {Number} targetY 滚动条目标位置
     * @todo
     * this.smoothY === 0 直接滚动，否则平滑滚动
     */
    smoothScrollTo(targetY) {
        if (this.smoothY === 0) {
            this.container[0].scrollTop = targetY;
            return;
        }

        const scrollId = Math.random(); // 本次滚动ID
        const startY = this.container[0].scrollTop; // 起始位置
        const diff = targetY - startY; // 间距
        const maxCount = Math.ceil(diff / this.smoothY); // 步长
        let count = 1;

        this.scrollId = scrollId;
        const smoothScroll = () => {
            let aimPosition = startY + count * this.smoothY;

            if (scrollId !== this.scrollId) {
                return;
            }

            count++;
            if (count >= maxCount) {
                this.container[0].scrollTop = targetY; // 确保最终位置正确
            } else {
                this.container[0].scrollTop = aimPosition;
                window.requestAnimationFrame(smoothScroll);
            }
        };
        smoothScroll();
    }
}

/**
 * 模板
 * @memberof ScrollBar
 * @static
 */
ScrollBar._template = `<div class="scroll-bar">
    <div class="sb_scroll">
        <div class="sb_thumb"></div>
    </div>
</div>`;

export default ScrollBar;
