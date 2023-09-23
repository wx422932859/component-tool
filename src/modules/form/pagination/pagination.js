import './pagination.css';
import Component from '../../base/component.js';

/**
 * @description 页码构造器
 * @author wang.xin
 * @extends {Component}
 * @example
 * new Pagination({
 *     elem: '#pagination',
 *     pageNo: 1,
 *     pageCount: 10,
 *     change: (value) => {},
 * });
 */
class Pagination extends Component {
    /**
     * Creates an instance of Pagination.
     * @param {object} [option={}] 配置参数
     * @param {string | DOM} [option.elem] CSS 选择器 | DOM 节点
     * @param {number} [option.pageNo=1] 当前页码
     * @param {number} [option.pageSize=10] 单页记录条数
     * @param {number} [option.pageCount=1] 页码数
     * @param {number} [option.recordCount=0] 记录条数
     * @param {number} [option.limitPage=6] 分段界限一
     * @param {number} [option.limitNum=3] 分段界限二
     * @param {boolean} [option.omitClickable=true] 省略号是否可点击
     * @param {boolean} [option.tipShow=true] 是否显示提示信息
     * @param {function} [option.change] 跳转页码时触发的事件
     */
    constructor(option = {}) {
        super(option.elem || document.createElement('nav'));
        this.node.addClass('ly-form ly-pagination');
        this.init();
        this.load(option);
    }

    /**
     * 初始化
     */
    init() {
        this.monitor();
        this.on();
        this.render();
    }

    /**
     * 属性
     */
    monitor() {
        /**
         * @member {function} change 修改页码触发的回调函数
         * @memberof Pagination
         * @inner
         */
        this.change = () => {};

        /**
         * @member {string} pageNo 页码
         * @memberof Pagination
         * @default 1
         * @inner
         */
        this._observe('pageNo', 1, (value) => {
            this.render();
            this.change(value, this.pageSize, this);
        });

        /**
         * @member {string} pageSize 单页记录条数
         * @memberof Pagination
         * @default 10
         * @inner
         */
        this._observe('pageSize', 10, () => this.render());

        /**
         * @member {string} pageCount 页码数
         * @memberof Pagination
         * @default 1
         * @inner
         */
        this._observe('pageCount', 1, () => this.render());

        /**
         * @member {string} pageCount 记录条数
         * @memberof Pagination
         * @default 0
         * @inner
         */
        this._observe('recordCount', 0, () => this.render());

        /**
         * @member {string} tipShow 页码信息是否提示
         * @memberof Pagination
         * @default true
         * @inner
         */
        this._observe('tipShow', true, () => this.render());

        /**
         * @member {string} tipShow 省略号是否可以点击
         * @memberof Pagination
         * @default true
         * @inner
         */
        this._observe('omitClickable', true, () => this.render());

        /**
         * @member {number} tipShow 界限一，当 pageCount < limitPage 时，页码标签全显示，否则分段显示
         * @memberof Pagination
         * @default 6
         * @inner
         */
        this._observe('limitPage', 6, () => this.render());

        /**
         * @member {number} tipShow 界限二，limitNum < pageNo < pageCount - limitNum
         * @memberof Pagination
         * @default 3
         * @inner
         */
        this._observe('limitNum', 3, () => this.render());
    }

    /**
     * 事件
     */
    on() {
        // 页码
        this.node.on(
            'click',
            '[data-action="page"]:not(.ly-pagination_current-page)',
            (e, target) => {
                this.pageNo = parseInt(target.text());
            }
        );

        // 上一页
        this.node.on(
            'click',
            '[data-action="previousPage"]:not(.ly-pagination_disabled-page)',
            () => {
                this.pageNo--;
            }
        );

        // 下一页
        this.node.on(
            'click',
            '[data-action="nextPage"]:not(.ly-pagination_disabled-page)',
            () => {
                this.pageNo++;
            }
        );

        // 左侧省略号
        this.node.on(
            'click',
            '[data-action="leftOmit"]:not(.ly-pagination_disabled-page)',
            () => {
                this.pageNo = Math.floor((1 + this.pageNo) / 2);
            }
        );

        // 中间省略号
        this.node.on(
            'click',
            '[data-action="centerOmit"]:not(.ly-pagination_disabled-page)',
            () => {
                this.pageNo = Math.floor((1 + this.pageCount) / 2);
            }
        );

        // 右侧省略号
        this.node.on(
            'click',
            '[data-action="rightOmit"]:not(.ly-pagination_disabled-page)',
            () => {
                this.pageNo = Math.floor((this.pageNo + this.pageCount) / 2);
            }
        );

        // 跳转
        this.node.on('click', '[data-action="gotoPage"]', () => {
            this.valid() && (this.pageNo = this.valid());
        });

        // 回车
        this.node.on('keydown', '[data-value="page"]', (e) => {
            if (e.key == 'Enter' || e.keyCode == 13) {
                this.valid() && (this.pageNo = this.valid());
            }
        });
    }

    /**
     * 加载
     * @param {object} [option={}] 配置参数
     * @param {string | DOM} [option.elem] CSS 选择器 | DOM 节点
     * @param {number} [option.pageNo=1] 当前页码
     * @param {number} [option.pageSize=10] 单页记录条数
     * @param {number} [option.pageCount=1] 页码数
     * @param {number} [option.recordCount=0] 记录条数
     * @param {number} [option.limitPage=6] 分段界限一
     * @param {number} [option.limitNum=3] 分段界限二
     * @param {boolean} [option.omitClickable=true] 省略号是否可点击
     * @param {boolean} [option.tipShow=true] 是否显示提示信息
     * @param {function} [option.change] 跳转页码时触发的事件
     */
    load(option = {}) {
        for (let key in option) {
            if (option[key] != undefined && key != 'change') {
                this[key] = option[key];
            }
        }
        this.change = option.change || (() => {});
    }

    /**
     * 渲染
     */
    render() {
        this.node.html('<ul class="ly-pagination_list"></ul>');
        this.renderPreviousPage();
        this.renderPage();
        this.renderNextPage();
        this.tipShow && this.renderTip();
        this.renderGotoPage();
    }

    /**
     * 渲染上一页
     */
    renderPreviousPage() {
        this.node.find('ul').append(
            `<li class="ly-pagination_item">
                <a class="ly-pagination_page ${
                    this.pageNo == 1 ? 'ly-pagination_disabled-page' : ''
                }"
                    data-action="previousPage">« 上一页</a>
            </li>`
        );
    }

    /**
     * 渲染页码
     */
    renderPage() {
        let elem = this.node.find('ul');

        if (this.pageCount <= this.limitPage) {
            // 当 pageCount <= limitPage，直接显示页码
            elem.append(this.createPageLabel(1, this.pageCount));
        } else {
            if (
                this.pageNo <= this.limitNum ||
                this.pageCount - this.pageNo < this.limitNum
            ) {
                // 当页码在前 limitNum 或后 limitNum 页时
                elem.append(this.createPageLabel(1, this.limitNum))
                    .append(this.createOmit('center'))
                    .append(
                        this.createPageLabel(
                            this.pageCount - this.limitNum + 1,
                            this.pageCount
                        )
                    );
            } else {
                // 当页码超过 limitPage 页，且当前页码不在前 limitNum 页或者后 limitNum 页时
                elem.append(this.createPageLabel(1, 1))
                    .append(this.createOmit('left'))
                    .append(
                        this.createPageLabel(this.pageNo - 1, this.pageNo + 1)
                    )
                    .append(this.createOmit('right'))
                    .append(
                        this.createPageLabel(this.pageCount, this.pageCount)
                    );
            }
        }
    }

    /**
     * 渲染下一页
     */
    renderNextPage() {
        this.node.find('ul').append(
            `<li class="ly-pagination_item">
                <a class="ly-pagination_page ${
                    this.pageNo == this.pageCount
                        ? 'ly-pagination_disabled-page'
                        : ''
                }"
                    data-action="nextPage">下一页 »</a>
            </li>`
        );
    }

    /**
     * 渲染提示信息
     */
    renderTip() {
        this.node.find('ul').append(
            `<li class="ly-pagination_item">
                <a class="ly-pagination_page ly-pagination_disabled-page">
                    第 ${this.pageNo} / ${this.pageCount} 页 共 ${this.recordCount} 条
                </a>
            </li>`
        );
    }

    /**
     * 渲染页码跳转
     */
    renderGotoPage() {
        this.node.find('ul').append(
            `<li class="ly-pagination_item">
                <input type="text" class="ly-pagination_page-input" data-value="page" value="${this.pageNo}" />
            </li>
            <li class="ly-pagination_item">
                <a class="ly-pagination_page" data-action="gotoPage">跳转</a>
            </li>`
        );
    }

    /**
     * 创建页码标签，并将页码标签添加到页码列表中
     * @param {number} startPage 起始页码
     * @param {number} endPage 结束页码
     */
    createPageLabel(startPage = 1, endPage = 1) {
        let result = '';

        // 创建页码标签
        for (let i = startPage; i <= endPage; i++) {
            let tempClass = '';

            tempClass += i == this.pageNo ? 'ly-pagination_current-page' : '';
            tempClass += i == this.pageCount ? ' ly-pagination_last-page' : '';
            result += `<li class="ly-pagination_item"><a class="ly-pagination_page ${tempClass}" data-action="page">${i}</a></li>`;
        }
        return result;
    }

    /**
     * 创建省略号
     * @param { String } position 位置 { left | center | right }
     */
    createOmit(position) {
        let classText = this.omitClickable ? '' : 'ly-pagination_disabled-page',
            titleText = this.omitClickable ? '跳转中间页码' : ''; // 提示

        return `<li class="ly-pagination_item"><span class="ly-pagination_page ${classText}" title="${titleText}" data-action="${position}Omit">...</span></li>`;
    }

    /**
     * 验证输入值是否有效
     * @return {number} 有效则返回页码，否则返回0
     */
    valid() {
        let inputNode = this.node.find('[data-value="page"]'),
            page = parseInt(inputNode.val());

        if (!isNaN(page) && 0 < page && page <= this.pageCount) {
            inputNode.val(page).removeClass('ly-pagination_error-page');
            return page;
        }

        inputNode.addClass('ly-pagination_error-page');
        return 0;
    }
}

export default Pagination;
