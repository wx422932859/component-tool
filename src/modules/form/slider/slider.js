import './slider.css';
import Form from '../form/form.js';

/**
 * 滑块
 * @author wang.xin
 * @extends {Form}
 * @example
 * new Slider({
 *     elem: '',
 *     label: '',
 *     min: 0,
 *     max: 100,
 *     step: 1,
 *     value: 0,
 *     change: (value, prev, target) => {}
 * });
 */
class Slider extends Form {
    /**
     * Creates an instance of Slider.
     * @param {object} [option={}] 配置参数
     * @param {string | Node | MyNode} option.elem CSS选择器、Node节点、MyNode
     * @param {string} option.label 标签
     * @param {number} [option.min=0] 最小值
     * @param {number} [option.max=100] 最大值
     * @param {number} [option.step=1] 步长
     * @param {number} [option.value=0] 初始值
     * @param {function} option.change 数值发生改变后触发的事件
     * @param {string} option.relation 组件放置关系
     */
    constructor(option = {}) {
        super({
            elem: option.elem,
            relation: option.relation,
            template: Slider._template
        });

        // 若在缓存中则直接返回缓存中的实例
        if (Slider._cache.get(this.node[0])) {
            return Slider._cache.get(this.node[0]);
        }
        Slider._cache.set(this.node[0], this);

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
         * @memberof Slider
         * @inner
         */
        this._observe('label', (value) => {
            this.setLabel(value);
        });

        /**
         * @member {number} min 最小值
         * @memberof Slider
         * @inner
         */
        this._observe('min', 0, (value) => {});

        /**
         * @member {number} max 最大值
         * @memberof Slider
         * @inner
         */
        this._observe('max', 100, (value) => {});

        /**
         * @member {number} step 步长
         * @memberof Slider
         * @inner
         */
        this._observe('step', 1, (value) => {
            let arr = (value + '').split('.');

            this.decimal = arr[1] ? arr[1].length : 0;
        });

        /**
         * @member {number} decimal 小数点后保留位数
         * @memberof Slider
         * @inner
         */
        this._observe('decimal', 0, (value) => {});

        /**
         * @member {number} value 值
         * @memberof Slider
         * @inner
         */
        this._observe('value', 0, (value, prev) => {
            this.update();
            this.change(value, prev, this);
        });

        /**
         * @member {number} valid 在设置value前校验
         * @memberof Slider
         * @inner
         */
        this._observe('valid', 0, (value) => {
            this.value = Math.min(Math.max(this.min, value), this.max);
        });

        /**
         * @member {number} pageX 鼠标位置横坐标
         * @memberof Slider
         * @inner
         */
        this._observe('pageX', 0, (value) => {
            this.dragWidth = value - this.node.find('.ly-slider_content').offset().left;
        });

        /**
         * @member {boolean} drag 拖拽状态
         * @memberof Slider
         * @inner
         */
        this._observe('drag', false, () => {});

        /**
         * @member {number} dragWidth 鼠标拖拽偏移距离
         * @memberof Slider
         * @inner
         */
        this._observe('dragWidth', 0, (value) => {
            let width = this.node.find('.ly-slider_content').width(),
                rate = (this.max - this.min) / width,
                result = this.min + value * rate;

            this.valid = parseInt(result * Math.pow(10, this.decimal)) / Math.pow(10, this.decimal);
        });

        /**
         * @member {function} change 值发生变化时的回调方法
         * @memberof Slider
         * @inner
         */
        this.change = () => {};
    }

    /**
     * 事件
     */
    on() {
        // 点击
        this.node.on('click', '.ly-slider_content', (e) => {
            this.pageX = e.pageX;
        });

        // 鼠标按下
        this.node.on('mousedown', '.ly-slider_control', () => {
            this.drag = true;
        });

        // input 改变
        this.node.find('.ly-slider_value').on('change', (e, target) => {
            this.valid = parseFloat(target.val());
        });

        // 键盘上下键
        this.node.find('.ly-slider_value').on('keydown', (e, target) => {
            switch (e.key) {
                case 'ArrowDown':
                    this.valid = this.value - parseFloat(this.step);
                    break;

                case 'ArrowUp':
                    this.valid = this.value + parseFloat(this.step);
                    break;

                case 'Enter':
                    this.valid = parseFloat(target.val());
                    break;

                default:
                    break;
            }
        });
    }

    /**
     * 加载
     * @param {object} [option={}] 配置参数
     * @param {string} option.label 标签
     * @param {number} [option.min=0] 最小值
     * @param {number} [option.max=100] 最大值
     * @param {number} [option.step=1] 步长
     * @param {number} [option.value=0] 初始值
     * @param {function} option.change 数值发生改变后触发的事件
     */
    load(option) {
        this.label = option.label;
        this.min = option.min || 0;
        this.max = option.max || 100;
        this.step = option.step || 1;
        this.valid = option.value || 0;
        if (typeof option.change === 'function') {
            this.change = option.change;
        }
    }

    /**
     * 更新
     */
    update() {
        let range = this.max - this.min,
            diff = this.value - this.min;

        this.node.find('.ly-slider_value').val(this.value);
        this.node.css('--ly-slider_width_value', (diff / range) * 100 + '%');
    }
}

if (typeof document !== 'undefined') {
    // 当滑块的拖动状态为 true，鼠标拖动
    document.addEventListener('mousemove', function (e) {
        Slider._cache.forEach((item) => {
            if (item.drag === true) {
                item.pageX = e.pageX;
                e.preventDefault();
            }
        });
    });

    // 当释放鼠标的时候，设置滑块的拖动状态为 false
    document.addEventListener('mouseup', function () {
        Slider._cache.forEach((item) => (item.drag = false));
    });
}

/**
 * 缓存
 * @member {Map} _cache
 * @memberof Slider
 * @static
 */
Slider._cache = new Map();

/**
 * 模板
 * @member {string} _template
 * @memberof Slider
 * @static
 * @example
 * <div class="ly-form ly-slider">
 *     <label class="ly-form_label"></label>
 *     <div class="ly-form_content">
 *         <div class="ly-slider_content">
 *             <span class="ly-slider_control"></span>
 *         </div>
 *         <input class="ly-slider_value" type="text" value="" />
 *     </div>
 * </div>
 */
Slider._template = `<div class="ly-form ly-slider">
    <label class="ly-form_label"></label>
    <div class="ly-form_content">
        <div class="ly-slider_content">
            <span class="ly-slider_control"></span>
        </div>
        <input class="ly-slider_value" type="text" value="" />
    </div>
</div>`;

export default Slider;
