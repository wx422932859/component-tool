import MyNode from '../../base/my-node';
import Component from '../../base/component';

/**
 * 水印
 * @author wang.xin63
 * @extends Component
 * @example
 * const waterMark = new WaterMark();
 * waterMark.load({
 *     parent: dom, // 水印容器，即水印添加到哪个元素中，建议与iframe并列
 *     show: true, // 是否显示水印
 *     position: 'absolute', // 水印显示方式，['fixed', 'absolute']
 *     getMarkInfo: () => {
 *         return [];
 *     }, // 获取水印内容，函数返回字符串数组，代表每一行显示的内容
 *     interval: 1000, // 刷新频率，单位ms
 *     fillStyle: '#333' // 字体样式
 * });
 */
class WaterMark extends Component {
    constructor() {
        super(document.createElement('div'));
    }

    /**
     * 挂载成功
     */
    _mounted() {
        this.monitor();
        this.init();
    }

    /**
     * 属性
     */
    monitor() {
        /**
         * 透明度
         * @member {number} opacity
         * @memberof WaterMark#
         * @default 0.16
         */
        this.opacity = 0.16;

        /**
         * 水印实例化对象
         * @member {CanvasMark} mask
         * @memberof WaterMark#
         */
        this.mark = new CanvasMark();

        /**
         * 备份节点，当节点发生变化时，通过备份节点恢复
         * @member {Node} copyNode
         * @memberof WaterMark#
         */
        this.copyNode = null;

        /**
         * @member {number} interval 刷新频率
         * @memberof WaterMark#
         * @default 1000
         */
        this._observe('interval', 1000, (value) => {
            setInterval(() => {
                this.markInfo = this.options.getMarkInfo();
            }, value);
        });

        /**
         * 水印信息
         * @member {string[]} markInfo
         * @memberof WaterMark#
         */
        this._observe('markInfo', (value) => {
            if (!Array.isArray(value) || value.length == 0) {
                return;
            }
            this.mark.render(value);
        });

        /**
         * 字体样式
         * @member {string} fillStyle
         * @memberof WaterMark#
         */
        this._observe('fillStyle', (value) => {
            this.mark.fillStyle = value;
        });
    }

    /**
     * 初始化
     * @todo 添加水印节点
     * @todo 渲染样式，不能通过外联样式，否则修改样式不会触发节点更新
     */
    init() {
        this.node.append(this.mark.node).css({
            position: 'fixed',
            top: 0,
            left: 0,
            'z-index': 999999,
            'pointer-events': 'none',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            opacity: this.opacity,
        });
    }

    /**
     * 加载
     * @param {object} options 入参
     * @param {boolean} options.show 是否显示
     * @param {object} options.parent 父节点
     * @param {string} options.position 显示范围
     * @param {number} options.interval 刷新频率
     * @param {function} options.getMarkInfo 获取水印信息，返回的是一个字符串数组
     */
    load(options) {
        this.options = options; // 缓存入参

        // 控制显示
        if (options.show) {
            options.parent && new MyNode(options.parent).prepend(this.node);
            this.node.css('position', options.position);
            this.copyNode = new MyNode(this.node[0].cloneNode(true));
            this.markInfo = options.getMarkInfo();

            // 设置刷新频率
            if (typeof options.interval === 'number') {
                this.interval = options.interval;
            }
            this.listenNodeChange();
        }
    }

    /**
     * 监听节点变化
     */
    listenNodeChange() {
        if (typeof MutationObserver == 'undefined') {
            return;
        }

        this.mutationObserver = new MutationObserver((mutations) => {
            mutations.forEach((elem) => {
                let targetNode = new MyNode(elem.target);

                // 当移除的是该实例节点
                if (this.node[0] === elem.removedNodes[0]) {
                    targetNode.prepend(this.node);
                }

                // 当移除的是水印节点
                if (this.mark.node[0] === elem.removedNodes[0]) {
                    this.node.append(this.mark.node);
                }

                // 节点发生变化
                if (targetNode[0] === this.node[0] || targetNode[0] === this.mark.node[0]) {
                    // 修改属性值，但是改变前后值没有变化
                    if (elem.addedNodes.length == 0 && targetNode.attr(elem.attributeName) == elem.oldValue) {
                        return;
                    }

                    // 新增节点，但是新增的是节点本身，则不需要处理
                    if (elem.addedNodes[0] === this.node[0] || elem.addedNodes[0] === this.mark.node[0]) {
                        return;
                    }

                    // 先断开原先的关联，再重新建立链接
                    this.mutationObserver.disconnect();
                    this.updateMark();
                    this.addLinkedNode();
                }
            });
        });
        this.addLinkedNode();
    }

    /**
     * 添加关联节点
     */
    addLinkedNode() {
        this.mutationObserver.observe(this.node.parent()[0], {
            attributes: true,
            attributeOldValue: true,
            childList: true,
            subtree: true,
        });
    }

    /**
     * 更新水印
     */
    updateMark() {
        // 备份节点替换主节点，然后重新备份节点
        this.node.replaceWith(this.copyNode);
        this.node = this.copyNode;
        this.copyNode = new MyNode(this.node[0].cloneNode(true));
        // 重新创建canvas，然后替换
        this.mark = new CanvasMark();
        this.node.find('canvas').replaceWith(this.mark.node);
        // 刷新水印信息
        this.markInfo = this.options.getMarkInfo();
    }
}

/**
 * 通过 canvas 绘制水印
 * @extends Component
 */
class CanvasMark extends Component {
    constructor() {
        super(document.createElement('canvas'));
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
         * 宽度
         * @member {number} width
         * @memberof CanvasMark#
         */
        this.width = 3840;

        /**
         * 高度
         * @member {number} height
         * @memberof CanvasMark#
         */
        this.height = 2560;

        /**
         * @member {Node} canvas 画布
         * @memberof CanvasMark#
         */
        this.canvas = this.node[0];

        /**
         * 绘制上下文
         * @member {CanvasRenderingContext2D} context
         * @memberof CanvasMark#
         */
        this.context = this.canvas.getContext('2d');

        /**
         * @member {string} fontSize 字体大小
         * @memberof CanvasMark#
         */
        this.fontSize = 12;

        /**
         * @member {string} fillStyle 字体样式
         * @memberof CanvasMark#
         */
        this.fillStyle = '#333';
    }

    /**
     * 渲染
     * @param {object} infoList 信息列表
     * @todo 1. 清除画布内容
     * @todo 2. 设置基础样式
     * @todo 3. 计算水印位置
     * @todo 4. 循环绘制水印
     */
    render(infoList) {
        let context = this.context,
            base = {
                x: 50,
                y: 50,
            },
            padding = {
                x: 240, // 行间距
                y: 180, // 列间距
            },
            count = {
                x: this.height / padding.x,
                y: this.width / padding.y,
            }; // 个数

        this.canvas.width = this.width;
        this.canvas.height = this.height;
        context.font = `normal ${this.fontSize}px Regular`;
        context.fillStyle = this.fillStyle;
        infoList = this.calcPosition(infoList);

        for (let row = 0; row < count.x; row++) {
            for (let col = 0; col < count.y; col++) {
                this.drawFont(infoList, base.x + row * padding.x, base.y + col * padding.y);
            }
        }
    }

    /**
     * 绘制文字
     * @param {object[]} infoList 文字信息
     * @param {number} left 左侧距离
     * @param {number} top 顶部距离
     * @param {number} rotate 旋转角度
     */
    drawFont(infoList, left = 0, top = 0, rotate = (-30 * Math.PI) / 360) {
        let context = this.context;

        context.setTransform();
        context.translate(left, top);
        context.rotate(rotate);
        infoList.forEach((info) => {
            context.fillText(info.text, info.x, info.y);
        });
    }

    /**
     * 计算字符串绘制起始坐标
     * @param {string[]} infoList 信息列表
     * @return {object[]}
     * @return {string}
     * @return {number}
     * @return {number}
     */
    calcPosition(infoList) {
        let context = this.context,
            lineHeight = this.fontSize * 1.5,
            baseLength = context.measureText(infoList[0]).width;

        // 做居中对齐处理
        return infoList.map((info, index) => {
            return {
                text: info,
                x: (baseLength - context.measureText(info).width) / 2,
                y: lineHeight * index,
            };
        });
    }
}

export default WaterMark;
