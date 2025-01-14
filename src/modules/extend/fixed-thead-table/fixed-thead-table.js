import './fixed-thead-table.css';
import Component from '../../base/component';

/**
 * 固定表头
 * @deprecated
 */
class FixedTheadTable extends Component {
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
         * @member {string} thead 表头
         */
        this._observe('thead', (value) => {
            this.node.find('thead').html(value);
            this.node.find('.ftt_thead-container tr:first-child>th').forEach((item, index, list) => {
                this.thCount += parseInt(list.eq(index).attr('colspan')) || 1;
            });
        });

        /**
         * @member {number} thCount 列数
         */
        this._observe('thCount', 0, (value) => {});

        /**
         * @member {string} tbody 表格内容
         */
        this._observe('tbody', (value) => {
            if (value !== '') {
                this.node.find('tbody').html(value);
            } else {
                this.reset();
            }
            this.resize();
        });

        /**
         * @member {number} width 宽度
         */
        this._observe('width', (value, prev) => {
            if (value !== 0 && value !== prev) {
                this.node.find('.ftt_thead-container').css('width', `${value}px`);
            }
        });
    }

    /**
     * 事件
     */
    on() {
        // 窗口发生变化
        window.addEventListener('resize', () => {
            this.resize();
        });
    }

    /**
     * 重置
     */
    reset() {
        this.node
            .find('tbody')
            .html(`<tr><td class="tc_empty" colspan="${this.thCount}">没有查询到符合条件的记录!</td></tr>`);
    }

    /**
     * 滚动条置顶
     */
    scrollTop() {
        this.node.find('.ftt_tbody-container')[0].scrollTop = 0;
    }

    /**
     * 重置表格样式
     */
    resize(tableContainer = this.node) {
        // 先设置高度，让滚动条自适应
        let height = tableContainer.find('.ftt_tbody-container>.ftt_table').height();
        if (height === 0) {
            return;
        }
        tableContainer.css('height', `${height}px`);

        // 不能使用 height: 100%，会造成页面无故出现滚动条
        tableContainer.find('.ftt_tbody-container').css('height', tableContainer.height() + 'px');

        // 根据表格实际宽度设置表头
        this.width = tableContainer.find('.ftt_tbody-container>.ftt_table').width();
        // 防止刷新延迟，50ms后重新计算
        setTimeout(() => {
            this.width = tableContainer.find('.ftt_tbody-container>.ftt_table').width();
        }, 50);
    }
}

/**
 * @member {string} _template 模板
 */
FixedTheadTable._template = `
<div class="fixed-thead-table">
    <div class="ftt_thead-container">
        <table class="ftt_table">
            <thead></thead>
        </table>
    </div>
    <div class="ftt_tbody-container">
        <table class="ftt_table">
            <thead></thead>
            <tbody></tbody>
        </table>
    </div>
</div>`;

export default FixedTheadTable;
