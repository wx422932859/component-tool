import './table-fixed-cell.css';
import Component from '../../base/component';
import Util from '../../base/util';

class TableFixedCell extends Component {
    constructor() {
        super();
    }

    /**
     * 挂载成功
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
         * @member {String[]} FIX_CELL_CLASS_NAME 固定单元格的类名
         */
        this.STYLE_CLASS_NAME = {
            ROW: 'tfc_fixed-row',
            ROW_LAST: 'tfc_fixed-row-last',
            ROW_SPLIT: 'tfc_fixed-row-split',
            ROW_SPLIT_NEXT: 'tfc_fixed-row-split-next',
            COLUMN: 'tfc_fixed-column',
            COLUMN_LAST: 'tfc_fixed-column-last',
            COLUMN_SPLIT: 'tfc_fixed-column-split',
            COLUMN_SPLIT_NEXT: 'tfc_fixed-column-split-next'
        };

        /**
         * @member {Object} fixedColumn 固定列
         */
        this._observe('fixedColumn', 0, () => {
            this.delayRenderFixedCell();
        });

        /**
         * @member {Object[]} fixedColumnList 固定列数的位置
         * @property {Number} fixedColumnList.start 起始位置
         * @property {Number} fixedColumnList.end 结束位置
         */
        this._observe('fixedColumnList', [], () => {});

        /**
         * @member {Number} fixedRow 固定行
         */
        this._observe('fixedRow', 0, () => {
            this.delayRenderFixedCell();
        });

        /**
         * @member {Object[]} fixedRowList 固定列数的位置
         * @property {Number} fixedRowList.start 起始位置
         * @property {Number} fixedRowList.end 结束位置
         */
        this._observe('fixedRowList', [], () => {});

        /**
         * 触发渲染固定单元可能会频发，采用防抖的形式处理
         */
        this.delayRenderFixedCell = Util.debounce(() => this.renderFixedCell(), 50);
    }

    /**
     * 事件
     */
    on() {
        /**
         * @event 监听滚动条
         */
        this.node.on('scroll', () => {
            if (this.fixedColumnList.length === 0 && this.fixedRowList.length === 0) {
                return;
            }

            this.calcScroll();
        });
    }

    /**
     * 加载
     * @param {Object} options 入参
     * @param {String} options.thead 表头
     * @param {String} options.tbody 表格
     * @param {Number} options.fixedColumn 固定列
     * @param {Number} options.fixedRow 固定行
     */
    load(options) {
        this.fixedColumn = options.fixedColumn || 0;
        this.fixedRow = options.fixedRow || 0;
        this.renderThead(options.thead);
        this.renderTbody(options.tbody);
    }

    /**
     * 渲染标题
     */
    renderThead(thead) {
        this._children.tableBase.thead = thead || '';
        this.delayRenderFixedCell();
    }

    /**
     * 渲染内容
     * @param {Object} tbody 内容
     * @param {Number} fixedRow 固定行数
     */
    renderTbody(tbody) {
        this._children.tableBase.tbody = tbody || '';
        this.delayRenderFixedCell();
    }

    /**
     * 格式化位置列表
     * @param {String} type 类型（ROW / COLUMN）
     */
    formatFixedCellList(type) {
        let value = this.fixedColumn,
            length = this._children.tableBase.columnCount;

        if (type === 'ROW') {
            value = this.fixedRow;
            length = this._children.tableBase.rowCount;
        }

        if (value === null || value === 0 || length === 0 || Math.abs(value) === length) {
            return [];
        }

        if (typeof value === 'number') {
            return [this.formatFixedCellListByNumber(value, length)];
        }

        if (typeof value === 'string') {
            return this.formatFixedCellListBySelector(value, type);
        }

        if (Array.isArray(value)) {
            return value.map((elem) => {
                if (typeof elem === 'number') {
                    return this.formatFixedCellListByNumber(elem, length);
                }
                return elem;
            });
        }

        return [value];
    }

    /**
     * 格式化位置列表【数字】
     */
    formatFixedCellListByNumber(value, length) {
        let start = 0,
            end = value % length;

        if (value < 0) {
            start = (value + length) % length;
            end = length;
        }

        return { start, end };
    }

    /**
     * 格式化位置列表【选择器】
     * @param {String} selector 选择器
     * @param {String} type 类型
     */
    formatFixedCellListBySelector(selector, type) {
        let nodeList = this.node.find(selector),
            positionStack = [];

        if (type === 'ROW') {
            // 针对的是行
            let trList = this.node.find('tr');

            nodeList = nodeList.matches('tr');
            nodeList.forEach((elem) => {
                let position = trList.indexOf(elem);
                if (!positionStack.includes(position)) {
                    positionStack.push(position);
                }
            });
        } else {
            // 针对的是列
            nodeList = nodeList.matches('th').concat(nodeList.matches('td'));
            console.log(nodeList);
            nodeList.forEach((elem, index) => {
                let position = nodeList.eq(index).posOfSiblings();
                if (!positionStack.includes(position)) {
                    positionStack.push(position);
                }
            });
        }

        return positionStack.map((position) => ({
            start: position,
            end: position + 1
        }));
    }

    /**
     * 计算滚动位置
     */
    calcScroll() {
        let { scrollWidth, scrollLeft, clientWidth, scrollHeight, scrollTop, clientHeight } = this.node[0];

        this.node.css('--tfc_left_scroll', scrollLeft + 'px');
        this.node.css('--tfc_right_scroll', scrollWidth - scrollLeft - clientWidth + 'px');
        this.node.css('--tfc_top_scroll', scrollTop + 'px');
        this.node.css('--tfc_bottom_scroll', scrollHeight - scrollTop - clientHeight + 'px');
    }

    /**
     * 渲染固定位置
     */
    renderFixedCell() {
        this.fixedRowList = this.formatFixedCellList('ROW');
        this.fixedColumnList = this.formatFixedCellList('COLUMN');
        if (this.fixedColumnList.length === 0 && this.fixedRowList.length === 0) {
            return;
        }

        Object.values(this.STYLE_CLASS_NAME).forEach((className) => {
            this.node.find(`.${className}`).removeClass(className);
        });
        this.node.find('tr').forEach((trNode, index, trList) => {
            this.renderFixedColumn(trList.eq(index).children());
            this.renderFixedRow(trList);
        });
        this.calcScroll();
    }

    /**
     * 渲染固定列
     */
    renderFixedColumn(nodeList) {
        const { COLUMN, COLUMN_LAST } = this.STYLE_CLASS_NAME;

        this.fixedColumnList.forEach((elem) => {
            let direction = elem.end !== this._children.tableBase.columnCount, // 方向，true => 从左往右，false => 从右往左
                classList = direction ? [COLUMN] : [COLUMN, COLUMN_LAST];

            for (let i = elem.start; i < elem.end; i++) {
                nodeList.eq(i).addClass(classList);
            }
        });
        this.renderFixedColumnSplit(nodeList);
    }

    /**
     * 渲染分隔列
     */
    renderFixedColumnSplit(nodeList) {
        const { COLUMN_SPLIT, COLUMN_SPLIT_NEXT } = this.STYLE_CLASS_NAME;
        let pos = -1;

        nodeList.matches('.tb_display-cell').forEach((elem, index, displayNodeList) => {
            let currentNode = displayNodeList.eq(index);

            if (currentNode.hasClass('tfc_fixed-column')) {
                // 固定列
                pos = index;
            }
            if (!currentNode.hasClass('tfc_fixed-column') && pos !== -1) {
                // 非固定列，且前面有固定行，则添加分隔
                displayNodeList.eq(pos).addClass(COLUMN_SPLIT);
                currentNode.addClass(COLUMN_SPLIT_NEXT);
                pos = -1;
            }
        });
    }

    /**
     * 渲染固定行
     */
    renderFixedRow(nodeList) {
        const { ROW, ROW_LAST } = this.STYLE_CLASS_NAME;

        this.fixedRowList.forEach((elem) => {
            let direction = elem.end !== this._children.tableBase.rowCount, // 方向，true => 从上往下，false => 从下往上
                classList = direction ? [ROW] : [ROW, ROW_LAST];

            for (let i = elem.start; i < elem.end; i++) {
                nodeList.eq(i).addClass(classList);
            }
        });
        this.renderFixedRowSplit(nodeList);
    }

    /**
     * 渲染分隔行
     */
    renderFixedRowSplit(nodeList) {
        const { ROW_SPLIT, ROW_SPLIT_NEXT } = this.STYLE_CLASS_NAME;
        let pos = -1;

        nodeList.matches('.tb_display-row').forEach((elem, index, displayNodeList) => {
            let currentNode = displayNodeList.eq(index);

            if (currentNode.hasClass('tfc_fixed-row')) {
                // 固定行
                pos = index;
            }
            if (!currentNode.hasClass('tfc_fixed-row') && pos !== -1) {
                // 非固定行，且前面有固定行，则添加分隔
                displayNodeList.eq(pos).addClass(ROW_SPLIT);
                currentNode.addClass(ROW_SPLIT_NEXT);
                pos = -1;
            }
        });

        // 处理假性分隔行
        this.node.find('.tfc_fixed-row-split').forEach((elem) => {});
    }

    /**
     * 合并单元格
     * @param {Number} column 列数
     */
    mergeRowCell(column) {
        this._children.tableBase.mergeRowCell(column);
        this.renderFixedCell();
    }
}

/**
 * @member {string} _template 模板
 */
TableFixedCell._template = `<div class="table-fixed-cell"><slot class="tfc_table-base" data-component="LY.Extend.TableBase"></slot></div>`;

export default TableFixedCell;
