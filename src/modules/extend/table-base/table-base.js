import './table-base.css';
import Component from '../../base/component';

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
        });
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
     * 渲染边框
     */
    renderBorder() {
        this.node.find('tr').forEach((item, trIndex, trList) => {
            let trNode = trList.eq(trIndex);

            trNode.children().forEach((elem, cellIndex, cellList) => {
                let cellNode = cellList.eq(cellIndex);
            });
        });
    }
}

/**
 * @member {string} _template 模板
 */
TableBase._template = '<table class="table-base"><thead></thead><tbody></tbody></table>';

export default TableBase;
