import './table-fixed-cell.css';
import Component from '../../base/component';
import TableBase from '../table-base/table-base';

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
            COLUMN: 'tfc_fixed-column',
            COLUMN_LAST: 'tfc_fixed-column-last',
            COLUMN_SPLIT: 'tfc_fixed-column-split'
        };

        /**
         * @member {Object} fixedColumn 固定列
         */
        this._observe('fixedColumn', 0, (value) => {
            this.fixedColumnList = this.formatFixedCellList(value, this._children.tableBase.columnCount);
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
        this._observe('fixedRow', 0, (value) => {
            this.fixedRowList = this.formatFixedCellList(value, this._children.tableBase.rowCount);
        });

        /**
         * @member {Object[]} fixedRowList 固定列数的位置
         * @property {Number} fixedRowList.start 起始位置
         * @property {Number} fixedRowList.end 结束位置
         */
        this._observe('fixedRowList', [], () => {});
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
     * @param {Number} options.fixedColumn 固定列
     * @param {Number} options.fixedRow 固定行
     * @param {String} options.thead 表头
     * @param {String} options.tbody 表格
     */
    load(options) {
        this.storage = options;
        this.renderThead();
    }

    /**
     * 渲染标题
     */
    renderThead() {
        if (this.storage.thead !== null) {
            this._children.tableBase.thead = this.storage.thead;
        }
        if (this.storage.thList !== null) {
            this._children.tableBase.thList = this.storage.thList;
        }
        this.fixedColumn = this.storage.fixedColumn || 0;
        this.renderFixedCell();
    }

    /**
     * 渲染内容
     */
    renderTbody(tbody) {
        this._children.tableBase.tbody = tbody;
        this.fixedRow = this.storage.fixedRow || 0;
        this.renderFixedCell();
    }

    /**
     * 格式化位置列表
     */
    formatFixedCellList(value, length) {
        if (value === null) {
            return [];
        }

        if (typeof value === 'number') {
            if (value === 0 || length === 0 || Math.abs(value) === length) {
                return [];
            }
            return [this.formatFixedCellListByNumber(value, length)];
        }

        if (Array.isArray(value)) {
            return value.map((elem) => this.formatFixedCellListByNumber(elem, length));
        }

        return [value];
    }

    /**
     * 格式化位置列表【数字类型】
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
        if (this.fixedColumnList.length === 0 && this.fixedRowList.length === 0) {
            return;
        }

        this.reset();
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
        const { COLUMN, COLUMN_LAST, COLUMN_SPLIT } = this.STYLE_CLASS_NAME;

        this.fixedColumnList.forEach((elem) => {
            let direction = elem.end !== this._children.tableBase.columnCount, // 方向，true => 从左往右，false => 从右往左
                classList = direction ? [COLUMN] : [COLUMN, COLUMN_LAST];

            for (let i = elem.start; i < elem.end; i++) {
                nodeList.eq(i).addClass(classList);
            }
            nodeList.eq(direction ? elem.end - 1 : elem.start).addClass(COLUMN_SPLIT);
        });
    }

    /**
     * 渲染固定行
     */
    renderFixedRow(nodeList) {
        const { ROW, ROW_LAST, ROW_SPLIT } = this.STYLE_CLASS_NAME;

        this.fixedRowList.forEach((elem) => {
            let direction = elem.end !== this._children.tableBase.rowCount, // 方向，true => 从上往下，false => 从下往上
                classList = direction ? [ROW] : [ROW, ROW_LAST];

            for (let i = elem.start; i < elem.end; i++) {
                nodeList.eq(i).addClass(classList);
            }
            nodeList.eq(direction ? elem.end - 1 : elem.start).addClass(ROW_SPLIT);
        });

        // 当分隔行是表头最后一行时，需要将表格内容第一行的 border-top 隐藏
        if (this.node.find('thead>tr:last-child').hasClass(ROW_SPLIT)) {
            this.node.find('.tfc_table').addClass('tfc_fixed-thead');
        }
    }

    /**
     * 重置
     */
    reset() {
        Object.values(this.STYLE_CLASS_NAME).forEach((className) => {
            this.node.find(`.${className}`).removeClass(className);
        });
    }
}

/**
 * @member {string} _template 模板
 */
TableFixedCell._template = `<div class="table-fixed-cell"><slot class="tfc_table-base" data-component="TableBase"></slot></div>`;

export default TableFixedCell;
