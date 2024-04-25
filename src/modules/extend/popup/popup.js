import './popup.css';
import Component from '../../base/component.js';

class Popup extends Component {
    /**
     * Creates an instance of Popup.
     * @param {*} selector
     */
    constructor(selector) {
        super(selector);
    }

    /**
     * 加载成功
     */
    _mounted() {
        this.on();
    }

    on() {
        this.node.on('click', '.ly-icon_close', () => {
            this.node.hide();
        });
    }

    load() {
        this.node.css('display', 'flex');
    }
}

Popup._template = `<div class="ly-form ly-popup">
    <div class="ly-popup_container">
        <div class="ly-popup_header">
            <span class="ly-popup_title"></span>
            <i class="ly-icon_close"></i>
        </div>
        <div class="ly-popup_center"></div>
        <div class="ly-popup_footer"></div>
    </div>
</div>`;

export default Popup;
