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
         * @member {MyNode} container 容器
         * @memberof ScrollBar#
         */
        this._observe('container', this.node.parent(), (value, prev) => {
            if (prev.length === 0 || prev[0] != value[0]) {
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
         * @member {Function} delayCalcRate 延时计算比例
         * @memberof ScrollBar#
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
                    this.container[0].scrollTop = e.offsetY * this.rate;
                }
            }
        });

        /**
         * @event node mousemove 鼠标移动
         * @memberof ScrollBar#
         * @todo 当滑块属于拖拽情况下，滚动条进行平移，距离为鼠标移动距离
         */
        this.node.on('mousemove', (e) => {
            if (this.mousedown == true && this.container.length > 0) {
                this.container[0].scrollTop += e.pageY - this.pageY;
                this.pageY = e.pageY;
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
            if (event.wheelDeltaY < 0) {
                this.container[0].scrollTop += 40;
            } else {
                this.container[0].scrollTop -= 40;
            }
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
     * @memberof ScrollBar
     */
    load(options = {}) {
        this.container = options.container || this.node.parent();
        this.setStyle();
        this.fixed = options.fixed || false;
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
     * @memberof ScrollBar
     */
    hideThumb() {
        this.node.removeClass('scroll-bar-active');
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
