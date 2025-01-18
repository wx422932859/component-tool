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
         * @member {Number} columnCount 列数
         */
        this._observe('columnCount', 0, () => {});

        /**
         * @member {Number} displayColumnCount 显示的列数
         */
        this._observe('displayColumnCount', 0, () => {});

        /**
         * @member {Number} rowCount 行数
         */
        this._observe('rowCount', 0, () => {});

        /**
         * @member {String|Object[]} thead 表头
         */
        this._observe('thead', '', (value) => {
            if (typeof value === 'string') {
                this.node.find('thead').html(value || '');
                this.setColumnCount();
            }

            if (Array.isArray(value) && value.length > 0) {
                this.setThead(value);
            }
            this.delayHandleDisplayRow();
        });

        /**
         * @member {String} tbody 表格内容
         */
        this._observe('tbody', (value) => {
            if (value !== '') {
                this.node.find('tbody').html(value);
            } else {
                this.node
                    .find('tbody')
                    .html(`<tr><td class="tb_empty" colspan="${this.displayColumnCount}"></td></tr>`);
            }
            this.rowCount = this.node.find('tr').length;
            this.delayHandleDisplayRow();
        });

        /**
         * 触发渲染边框，采用防抖的形式处理
         */
        this.delayHandleDisplayRow = Util.debounce(() => this.handleDisplayRow(), 50);
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
            displayColumnCount = 0;

        this.node.find('tr:first-child>th').forEach((item, index, list) => {
            let thNode = list.eq(index),
                count = parseInt(thNode.attr('colspan')) || 1;

            if (thNode.css('display') !== 'none') {
                displayColumnCount += count;
            }
            columnCount += count;
        });

        this.columnCount = columnCount;
        this.displayColumnCount = displayColumnCount;
    }

    /**
     * 合并单元格【纵向】
     * @param {Number} column 列数
     */
    mergeRowCell(column) {
        let rowspan = 1, // rowspan
            lastTd = null, // 单元格
            lastContent = '', // 单元格内容
            trList = this.node.find('tbody>tr'),
            trCount = trList.length; // 总行数

        trList.forEach((item, index, list) => {
            let curTd = list.eq(index).find('td').eq(column),
                curContent = curTd.html().trim();

            if (index === 0) {
                // 遍历第一行的时候
                lastContent = curContent;
                lastTd = curTd;
                rowspan = parseInt(curTd.attr('rowspan') || 1);
            } else {
                if (curContent === lastContent) {
                    // 当前行与上一行内容相同
                    rowspan += parseInt(curTd.attr('rowspan') || 1); // 行数累加
                    curTd.remove(); // 移除单元格

                    // 最后一行的时候，设置rowspan属性
                    index + 1 === trCount && lastTd.attr('rowspan', rowspan);
                } else if (curContent !== '') {
                    // 当前行与上一行内容不同，设置上一行rowspan属性
                    lastTd.attr('rowspan', rowspan);

                    // 从新计算
                    lastContent = curContent;
                    lastTd = curTd;
                    rowspan = parseInt(curTd.attr('rowspan') || 1); // 当前行占的行数
                }
            }
        });
        this.handleDisplayRow();
    }

    /**
     * 处理显示行
     */
    handleDisplayRow() {
        let displayRow = [],
            className = {
                ROW_DISPLAY: 'tb_display-row',
                ROW_FIRST: 'tb_display-row-first',
                ROW_LAST: 'tb_display-row-last',
                CELL_DISPLAY: 'tb_display-cell',
                CELL_FIRST: 'tb_display-cell-first',
                CELL_LAST: 'tb_display-cell-last'
            };

        for (let key in className) {
            this.node.find(`.${className[key]}`).removeClass(`${className[key]}`);
        }
        this.node.find('tr').forEach((item, trIndex, trList) => {
            let trNode = trList.eq(trIndex);

            if (trNode.css('display') !== 'none') {
                trNode.addClass(className.ROW_DISPLAY);
                displayRow.push(trNode);
            }
            this.handleDisplayCell(trNode, className);
        });
        if (displayRow.length > 0) {
            displayRow[0].addClass(className.ROW_FIRST);
            displayRow[displayRow.length - 1].addClass(className.ROW_LAST);
        }
    }

    /**
     * 处理显示单元格
     */
    handleDisplayCell(trNode, className) {
        let displayCell = [];

        trNode.children().forEach((elem, cellIndex, cellList) => {
            let cellNode = cellList.eq(cellIndex);

            if (cellNode.css('display') !== 'none') {
                cellNode.addClass(className.CELL_DISPLAY);
                displayCell.push(cellNode);
            }
        });
        if (displayCell.length > 0) {
            displayCell[0].addClass(className.CELL_FIRST);
            displayCell[displayCell.length - 1].addClass(className.CELL_LAST);
        }

        // 处理假性最后单元格
        this.node.find('.tb_display-cell-last[rowspan]').forEach((elem, index, lastCellList) => {
            let lastCell = lastCellList.eq(index),
                parentNode = lastCell.parents('tr'),
                rowspan = parseInt(lastCell.attr('rowspan')),
                nextSibling = parentNode.nextSiblings();

            while (rowspan > 1 && nextSibling.length > 0) {
                nextSibling.find(`.${className.CELL_LAST}`).removeClass(className.CELL_LAST);
                nextSibling = nextSibling.nextSiblings();
                rowspan--;
            }
        });
    }
}

/**
 * @member {string} _template 模板
 */
TableBase._template = '<table class="table-base"><thead></thead><tbody></tbody></table>';

export default TableBase;
