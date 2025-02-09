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
         * @member {Object} STYLE_CLASS_NAME 固定单元格的类名
         */
        this.STYLE_CLASS_NAME = {
            ROW: 'tfc_fixed-row',
            ROW_LAST: 'tfc_fixed-row-last',
            ROW_NEXT: 'tfc_fixed-row-next',
            COLUMN: 'tfc_fixed-column',
            COLUMN_LAST: 'tfc_fixed-column-last',
            COLUMN_NEXT: 'tfc_fixed-column-next'
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
         * @member {String} fixedType 固定形式
         */
        this._observe('fixedType', 'transform', (value) => {
            this.node.attr('data-fixedType', value);
        });

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
     * @param {String} options.fixedType 固定形式
     */
    load(options) {
        this.fixedColumn = options.fixedColumn || 0;
        this.fixedRow = options.fixedRow || 0;
        this.fixedType = options.fixedType || this.fixedType;
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

        // 渲染固定位
        let trNodeList = this.node.find('.tb_tr-container>tr');
        this._children.tableBase.tableList.forEach((cellList, rowIndex) => {
            this.renderFixedRow(trNodeList.eq(rowIndex), rowIndex);
            cellList.forEach((cellNode, cellIndex) => {
                this.renderFixedColumn(cellNode, cellIndex);
            });
            this.renderFixedColumnNext(cellList);
        });
        this.renderFixedRowNext(trNodeList);
        this.calcScroll();
    }

    /**
     * 判断该位置是否需要固定
     * @param {Number} index 在表格中的位置（第 index 行/第 index 列）
     * @param {String} type 类型（行/列）
     * @return {Number}
     * -1：非固定位
     * 0：固定位，前
     * 1：固定位，后
     */
    isFixedCell(index, type) {
        let fixedList = this.fixedRowList,
            count = this._children.tableBase.rowCount;

        if (type === 'COLUMN') {
            fixedList = this.fixedColumnList;
            count = this._children.tableBase.columnCount;
        }

        for (let i = 0; i < fixedList.length; i++) {
            if (fixedList[i].start <= index && index < fixedList[i].end) {
                return fixedList[i].end !== count ? 0 : 1;
            }
        }

        return -1;
    }

    /**
     * 渲染固定行
     */
    renderFixedRow(rowNode, rowIndex) {
        const { ROW, ROW_LAST } = this.STYLE_CLASS_NAME;
        const CLASS_LIST = [[ROW], [ROW, ROW_LAST]];
        let fixedRow = this.isFixedCell(rowIndex, 'ROW');

        if (fixedRow !== -1) {
            rowNode.addClass(CLASS_LIST[fixedRow]);
            this.setMaxRowspan(rowNode);
        }
    }

    /**
     * 设置当前行的 z-index
     */
    setMaxRowspan(trNode) {
        let zIndex = 0;

        trNode.children().forEach((elem, index, cellList) => {
            zIndex = Math.max(zIndex, parseInt(cellList.eq(index).attr('rowspan') || 0));
        });

        trNode.css('z-index', parseInt(trNode.css('zIndex') || 0) + zIndex);
    }

    /**
     * 渲染固定行的下一行（显示的下一行）
     */
    renderFixedRowNext(nodeList) {
        const { ROW_NEXT } = this.STYLE_CLASS_NAME;
        nodeList.matches('.tb_show-row').forEach((elem, index, showNodeList) => {
            // 固定行
            if (showNodeList.eq(index).hasClass('tfc_fixed-row')) {
                showNodeList.eq(index + 1).addClass(ROW_NEXT);
            }
        });
    }

    /**
     * 渲染固定列
     */
    renderFixedColumn(cellNode, cellIndex) {
        const { COLUMN, COLUMN_LAST } = this.STYLE_CLASS_NAME;
        const CLASS_LIST = [[COLUMN], [COLUMN, COLUMN_LAST]];

        let fixedColumn = this.isFixedCell(cellIndex, 'COLUMN');
        if (fixedColumn !== -1) {
            cellNode && cellNode.addClass(CLASS_LIST[fixedColumn]);
        }
    }

    /**
     * 渲染固定列的下一列（显示的下一列）
     */
    renderFixedColumnNext(cellList) {
        const { COLUMN, COLUMN_NEXT } = this.STYLE_CLASS_NAME;
        let lastCellFixed = false;

        cellList.forEach((cellNode) => {
            if (!cellNode.hasClass('tb_show_column')) {
                return;
            }
            lastCellFixed && cellNode.addClass(COLUMN_NEXT);
            lastCellFixed = cellNode.hasClass(COLUMN);
        });
    }

    /**
     * 合并单元格
     * @param {Object} position 位置
     * @param {Number[]} position.row 合并行
     * @param {Number[]} position.column 合并列
     * @param {Boolean} mergeThead 表头是否进行合并
     */
    mergeCell(position, mergeThead = false) {
        this._children.tableBase.mergeCell(position, mergeThead);
        this.renderFixedCell();
    }
}

/**
 * @member {string} _template 模板
 */
TableFixedCell._template = `<div class="table-fixed-cell"><slot class="tfc_table-base" data-component="LY.Extend.TableBase"></slot></div>`;

export default TableFixedCell;
