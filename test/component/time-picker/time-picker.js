class TimePicker extends Component {
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
         * @member {string} date 日期
         */
        this._observe('date', (value) => {
            this.time = new Time(value + ' 00:00:00');
        });

        /**
         * @member {Time} time 日期
         */
        this._observe('time', () => {
            this.resetWidget();
        });
    }

    on() {
        document.addEventListener('click', () => this.hide());

        this.onClickNode();
        this.onChange();
        this.onClickContainer();
        this.onMouseWheel();
    }

    // 点击绑定节点
    onClickNode() {
        this.node.addEventListener('click', (e) => {
            this.show();
            e.stopPropagation();
        });
    }

    // 值变事件
    onChange() {
        this.node.addEventListener('change', () => {
            this.value = this.node.value;
        });
    }

    // 点击容器
    onClickContainer() {
        this.container.addEventListener('click', (e) => {
            let elem = e.srcElement, // 被单击元素
                date = Time(
                    this.container
                        .querySelector('.vc-date-item-selected')
                        .getAttribute('data-value')
                );

            if (elem.classList.contains('vc-date-item')) {
                // 点击的是日期
                this.value = elem.getAttribute('data-value');
            }

            if (elem.classList.contains('vc-timer-btn')) {
                // 点击的是按钮
                switch (elem.getAttribute('data-action')) {
                    case 'prev-year': // 去年
                        this.value = date.forward(-1, 'year').formatDate;
                        break;

                    case 'next-year': // 明年
                        this.value = date.forward(1, 'year').formatDate;
                        break;

                    case 'prev-month': // 上个月
                        this.value = date.forward(-1, 'month').formatDate;
                        break;

                    case 'next-month': // 下个月
                        this.value = date.forward(1, 'month').formatDate;
                        break;

                    case 'clear': // 清空
                        this.value = '';
                        break;

                    case 'now': // 现在
                        this.value = Time().formatDate;
                        this.hide();
                        break;

                    case 'confirm': // 确定
                        this.value = Time(date).formatDate;
                        this.hide();
                        break;
                }
            }
            event.stopPropagation();
        });
    }

    // 容器滚动监听
    onMouseWheel() {
        this.container.addEventListener('mousewheel', (e) => {
            let date = Time(
                this.container
                    .querySelector('.vc-date-item-selected')
                    .getAttribute('data-value')
            );
            if (e.wheelDeltaY > 0) {
                // 上个月
                this.value = date.forward(-1, 'month').formatDate;
            } else {
                // 下个月
                this.value = date.forward(1, 'month').formatDate;
            }
        });
    }

    // 显示
    show() {
        let rect = this.node.getBoundingClientRect(), // 相对于左上角的属性
            width = document.body.clientWidth,
            height = document.body.clientHeight,
            x = rect.left,
            y = rect.bottom + 10;

        // 横向判断，默认是左对齐，若右侧空间不足，则设置为右对齐
        if (width - rect.left < 300) {
            x = rect.right - 272;
        }

        // 纵向判断，默认向下偏移10像素，若底部控件不足，则设置为上偏移10像素
        if (height - rect.bottom < 360 && rect.top > 360) {
            y = rect.top - 360;
        }

        this.container.style.top = y + 'px';
        this.container.style.left = x + 'px';
        this.container.style.display = 'flex';

        this.resetWidget();
    }

    // 隐藏
    hide() {
        this.container.innerHTML = '';
        this.container.style.display = 'none';
    }

    /**
     * 加载
     * @param {object} option 入参
     * @param {string} option.date 日期
     */
    load(option = {}) {
        this.date = option.date;
    }

    resetWidget() {
        let { time } = this,
            dateHtml = this.initDateList(),
            htmlStr = '';

        htmlStr = `<div class="ly-time-picker_header">
                        <ul class="ltp_header-list">
                            <li class="ltp_header-item ltp_header-icons" data-action="prev-year">
                                <i class="ly-icon_arrow-down" data-rotate="left"></i>
                                <i class="ly-icon_arrow-down" data-rotate="left"></i>
                            </li>
                            <li class="ltp_header-item ltp_header-icons" data-action="prev-month">
                                <i class="ly-icon_arrow-down" data-rotate="left"></i>
                            </li>
                            <li class="ltp_header-item" data-action="year-selector">${time.year}年</li>
                            <li class="ltp_header-item" data-action="month-selector">${time.month}月</li>
                            <li class="ltp_header-item ltp_header-icons" data-action="next-month">
                                <i class="ly-icon_arrow-down" data-rotate="right"></i>
                            </li>
                            <li class="ltp_header-item ltp_header-icons" data-action="next-year">
                                <i class="ly-icon_arrow-down" data-rotate="right"></i>
                                <i class="ly-icon_arrow-down" data-rotate="right"></i>
                            </li>
                        </ul>
                    </div>
                    <div class="ly-time-picker_center">
                        <div>
                            <ul class="ly-week-title">
                                <li>日</li>
                                <li>一</li>
                                <li>二</li>
                                <li>三</li>
                                <li>四</li>
                                <li>五</li>
                                <li>六</li>
                            </ul>
                        </div>
                        <div>
                            <ul class="ly-day-list">${dateHtml}</ul>
                        </div>
                    </div>
                    <div class="ly-time-picker_footer">
                        <div>选择时间</div>
                        <div>
                            <span data-action="clear">清空</span>
                            <span data-action="now">现在</span>
                            <span data-action="confirm">确定</span>
                        </div>
                    </div>`;

        this.node.html(htmlStr);
    }

    // 初始化日期列表
    initDateList() {
        let curTime = this.time,
            monthFirstDate = curTime.firstDate(), // 当月第一天
            showFirstDate = monthFirstDate.forward(
                -monthFirstDate.time.getDay(),
                'day'
            ), // 显示第一天
            item = null,
            classStr = '',
            htmlStr = '';

        for (let i = 0; i < 42; i++) {
            item = showFirstDate.forward(i, 'day');
            classStr = 'ly-date-item';

            if (item.month === curTime.month) {
                classStr += ' cur-month';
                classStr +=
                    item.formatDate === curTime.formatDate
                        ? ' ly-date-item-selected'
                        : '';
            }

            htmlStr += `<li class="${classStr}" data-value="${
                item.formatDate
            }">${+item.date}</li>`;
        }

        return htmlStr;
    }
}

TimePicker._template = '<div class="ly-form ly-time-picker"></div>';

export default TimePicker;
