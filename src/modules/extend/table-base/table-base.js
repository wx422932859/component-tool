import './table-base.css';
import Component from '../../base/component';
import Util from '../../base/util';

/**
 * 表格基类
 */
class TableBase extends Component {
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
         * @member {Object} STYLE_CLASS_NAME 显示单元格类名
         */
        this.STYLE_CLASS_NAME = {
            ROW_SHOW: 'tb_show-row',
            COLUMN_SHOW: 'tb_show_column',
            BORDER_TOP: 'tb_border-top',
            BORDER_BOTTOM: 'tb_border-bottom',
            BORDER_LEFT: 'tb_border-left',
            BORDER_RIGHT: 'tb_border-right'
        };

        /**
         * 存储单元格实际位置
         */
        this.tableMap = {
            thead: [],
            tbody: []
        };
        this.tableList = [];

        /**
         * @member {Number} columnCount 列数
         */
        this._observe('columnCount', 0, () => {});

        /**
         * @member {Number} showColumnCount 显示的列数
         */
        this._observe('showColumnCount', 0, () => {});

        /**
         * @member {Number} rowCount 行数
         */
        this._observe('rowCount', 0, () => {});

        /**
         * @member {String|Object[]} thead 表头
         */
        this._observe('thead', '', (value) => {
            if (typeof value === 'string') {
                this.node.find('.tb_thead').html(value || '');
                this.setColumnCount();
            }

            if (Array.isArray(value) && value.length > 0) {
                this.setThead(value);
            }
            this.delaySetTableMap();
        });

        /**
         * @member {String} tbody 表格内容
         */
        this._observe('tbody', (value) => {
            let html = '';

            if (value !== '') {
                html = value;
            } else {
                html = `<tr><td class="tb_empty" colspan="${this.showColumnCount}">没有符合查询条件的结果！</td></tr>`;
            }
            this.node.find('.tb_tbody').html(html);
            this.rowCount = this.node.find('.tb_tr-container>tr').length;
            this.delaySetTableMap();
        });

        /**
         * 触发设置单元格位置
         */
        this.delaySetTableMap = Util.debounce(() => this.setTableMap(), 50);
    }

    /**
     * 设置表头
     */
    setThead(thList) {
        let htmlStr = '';

        if (Array.isArray(thList[0])) {
            // 多行
            thList.forEach((elem) => {
                htmlStr += this.setTheadTr(elem);
            });
        } else {
            // 单行
            htmlStr = this.setTheadTr(thList);
        }

        this.thead = htmlStr;
    }

    /**
     * 渲染单行
     */
    setTheadTr(thList) {
        if (!Array.isArray(thList) || thList.length === 0) {
            return '';
        }

        let htmlStr = '';

        thList.forEach((elem) => {
            if (typeof elem === 'string') {
                htmlStr += `<th title="${elem}">${elem}</th>`;
            } else {
                let propertyStr = '';

                for (let key in elem) {
                    if (key === 'title') {
                        propertyStr += this.setDOMProperty(key, elem.title === null ? elem.content : elem.title);
                    } else {
                        propertyStr += this.setDOMProperty(key, elem[key]);
                    }
                }
                htmlStr += `<th ${propertyStr} >${elem.content}</th>`;
            }
        });

        return `<tr>${htmlStr}</tr>`;
    }

    /**
     * 给元素添加属性
     */
    setDOMProperty(key, value) {
        if (typeof value !== 'string' || (value.includes('"') && value.includes("'"))) {
            return '';
        }

        if (value.includes('"') && !value.includes("'")) {
            return ` ${key}='${value}' `;
        }

        return ` ${key}="${value}" `;
    }

    /**
     * 获取列数
     */
    setColumnCount() {
        let columnCount = 0,
            showColumnCount = 0;

        this.node.find('.tb_thead>tr:first-child>th').forEach((item, index, list) => {
            let thNode = list.eq(index),
                count = parseInt(thNode.attr('colspan')) || 1;

            if (thNode.css('display') !== 'none' && thNode.css('visibility') !== 'hidden') {
                showColumnCount += count;
            }
            columnCount += count;
        });

        this.columnCount = columnCount;
        this.showColumnCount = showColumnCount;
    }

    /**
     * 合并单元格
     * @param {Object} position 位置
     * @param {Number[]} position.row 合并行
     * @param {Number[]} position.column 合并列
     * @param {Boolean} mergeThead 表头是否进行合并
     */
    mergeCell(position, mergeThead = false) {
        if (position === null) {
            return;
        }
        this.setTableMap();

        if (Array.isArray(position.row)) {
            position.row.forEach((row) => this.mergeCellByColspan(row, mergeThead));
        } else {
            this.mergeCellByColspan(position.row, mergeThead);
        }

        if (Array.isArray(position.column)) {
            position.column.forEach((column) => this.mergeCellByRowspan(column, mergeThead));
        } else if (typeof position.column === 'number') {
            this.mergeCellByRowspan(position.column, mergeThead);
        }

        this.setTableMap();
    }

    /**
     * 横向合并单元格
     * @param {Number} position 位置
     * @param {Boolean} mergeThead 表头是否进行合并
     */
    mergeCellByColspan(position, mergeThead = false) {
        if (typeof position !== 'number' || position >= this.columnCount) {
            return;
        }
        this.mergeCellList(mergeThead ? this.tableList[position] : this.tableMap.tbody[position], 'colspan');
    }

    /**
     * 纵向合并单元格
     * @param {Number} position 位置
     * @param {Boolean} mergeThead 表头是否进行合并
     */
    mergeCellByRowspan(position, mergeThead = false) {
        if (typeof position !== 'number' || position >= this.rowCount) {
            return;
        }

        this.mergeCellList(
            this.tableMap.tbody.map((nodeList) => nodeList[position]),
            'rowspan'
        );
        mergeThead &&
            this.mergeCellList(
                this.tableMap.thead.map((nodeList) => nodeList[position]),
                'rowspan'
            );
    }

    /**
     * 合并单元格
     */
    mergeCellList(cellList, property) {
        if (!Array.isArray(cellList) || cellList.length === 0) {
            return;
        }

        let length = cellList.length,
            cellNode = cellList[0],
            count = parseInt(cellNode.attr(property) || 1),
            lastCell = cellNode,
            lastContent = cellNode.html().trim();

        for (let i = 1; i < length; i++) {
            cellNode = cellList[i];
            if (cellNode === lastCell) {
                continue;
            }

            let content = cellNode.html().trim();
            if (content === lastContent) {
                /**
                 * 单元格内容相同，增加占位格数，移除单元格
                 */
                count += parseInt(cellNode.attr(property) || 1);
                cellNode.remove();
            } else if (content !== '') {
                /**
                 * 单元格内容不为空，设置上一单元格的占位格数
                 */
                lastCell.attr(property, count);
                lastCell = cellNode;
                lastContent = content;
                count = parseInt(cellNode.attr(property) || 1);
            }
        }
        lastCell.attr(property, count);
    }

    /**
     * 标记单元格在第几列
     */
    setTableMap() {
        this.tableMap = {
            thead: this.signCellColumn(this.node.find('.tb_thead>tr')),
            tbody: this.signCellColumn(this.node.find('.tb_tbody>tr'))
        };
        this.tableList = this.tableMap.thead.concat(this.tableMap.tbody);
        this.setShowRow();
    }

    /**
     * 标记单元格在第几列
     */
    signCellColumn(trList) {
        let table = [];

        for (let i = 0; i < trList.length; i++) {
            table.push([]);
        }
        trList.forEach((elem, trIndex) => {
            trList
                .eq(trIndex)
                .children()
                .forEach((item, cellIndex, cellList) => {
                    let cellNode = cellList.eq(cellIndex),
                        colspan = parseInt(cellNode.attr('colspan') || 1),
                        rowspan = Math.min(trList.length, parseInt(cellNode.attr('rowspan') || 1)),
                        column = cellIndex;

                    while (table[trIndex][column] && column < this.columnCount) {
                        // 代表该位置被占了，需要去下一位
                        column++;
                    }

                    for (let i = 0; i < rowspan; i++) {
                        for (let j = 0; j < colspan; j++) {
                            table[trIndex + i][column + j] = cellNode;
                        }
                    }
                });
        });

        return table;
    }

    /**
     * 设置显示行
     */
    setShowRow() {
        const { ROW_SHOW, BORDER_TOP, BORDER_BOTTOM } = this.STYLE_CLASS_NAME;
        let firstRow = -1,
            lastRow = -1;

        Object.values(this.STYLE_CLASS_NAME).forEach((className) => {
            this.node.find(`.${className}`).removeClass(className);
        });
        let tableList = this.tableList;

        this.node.find('.tb_tr-container>tr').forEach((item, trIndex, trList) => {
            let trNode = trList.eq(trIndex);

            if (trNode.css('display') === 'none' || trNode.css('visibility') === 'hidden') {
                return;
            }
            if (firstRow === -1) {
                firstRow = trIndex;
            }
            lastRow = trIndex;
            trNode.addClass(ROW_SHOW);
            this.setShowColumn(tableList[trIndex]);
        });

        tableList[firstRow] && tableList[firstRow].forEach((node) => node.addClass(BORDER_TOP));
        tableList[lastRow] && tableList[lastRow].forEach((node) => node.addClass(BORDER_BOTTOM));
    }

    /**
     * 设置显示列
     */
    setShowColumn(cellList) {
        const { COLUMN_SHOW, BORDER_LEFT, BORDER_RIGHT } = this.STYLE_CLASS_NAME;
        let firstColumn = -1,
            lastColumn = -1;

        cellList.forEach((cellNode, cellIndex) => {
            if (cellNode.css('display') === 'none' || cellNode.css('visibility') === 'hidden') {
                return;
            }
            if (firstColumn === -1) {
                firstColumn = cellIndex;
            }
            lastColumn = cellIndex;
            cellNode.addClass(COLUMN_SHOW);
        });
        cellList[firstColumn] && cellList[firstColumn].addClass(BORDER_LEFT);
        cellList[lastColumn] && cellList[lastColumn].addClass(BORDER_RIGHT);
    }
}

/**
 * @member {string} _template 模板
 */
TableBase._template = `
<table class="table-base">
    <thead class="tb_thead tb_tr-container"></thead>
    <tbody class="tb_tbody tb_tr-container"></tbody>
</table>`;

export default TableBase;
