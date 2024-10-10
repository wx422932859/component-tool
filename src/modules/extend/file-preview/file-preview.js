import './file-preview.css';
import Component from '../../base/component.js';

/**
 * 文件预览
 * @extends {Component}
 */
class FilePreview extends Component {
    constructor(selector) {
        super(selector);
        this.init();
    }

    /**
     * 初始化
     */
    init() {
        this.monitor();
        this.on();
    }

    /**
     * 监听属性
     */
    monitor() {
        /**
         * @member {DOM[]} fileList 文件列表
         * @memberof FilePreview
         * @inner
         * @default []
         */
        this._observe('fileList', [], () => {}, false);

        /**
         * @member {boolean} round 是否循环查看
         * @memberof FilePreview
         * @inner
         * @default true
         */
        this._observe('round', true, () => {});

        /**
         * @member {number} index 序号
         * @memberof FilePreview
         * @inner
         * @default 0
         */
        this._observe('index', 0, (value) => {
            this.preview(this.fileList[value] || '');
            this.node
                .find('.ly-file-preview_tip')
                .text(`${value + 1} / ${this.fileList.length}`);
        });
    }

    /**
     * 事件
     */
    on() {
        // 关闭
        this.node.on('click', '[data-action="close"]', () => {
            this.unload();
        });

        // 非功能区域
        this.node.on('click', (e) => {
            let classList = e.target.classList;

            if (
                classList.contains('ly-file-preview') ||
                classList.contains('ly-file-preview_content')
            ) {
                this.unload();
            }
        });

        // 上一张
        this.node.on('click', '[data-action="prev"]', () => {
            if (this.round) {
                this.index =
                    (this.index + this.fileList.length - 1) %
                    this.fileList.length;
            } else {
                this.index = Math.max(this.index - 1, 0);
            }
        });

        // 下一张
        this.node.on('click', '[data-action="next"]', () => {
            if (this.round) {
                this.index = (this.index + 1) % this.fileList.length;
            } else {
                this.index = Math.min(this.index + 1, this.fileList.length - 1);
            }
        });
    }

    /**
     * 重置
     */
    reset() {
        this.fileList = [];
        this.index = 0;
    }

    /**
     * 加载
     * @param {DOM} file 文件
     * @param {DOM[]} fileList 文件列表
     * @param {boolean} round 是否循环查看
     */
    load(file, fileList, round = this.round) {
        this.fileList = fileList;
        this.round = round;
        this.index = this.find(file);
        this.node.show();
    }

    /**
     * 卸载
     */
    unload() {
        this.reset();
        this.node.hide();
    }

    /**
     * 查找当前文件序号
     */
    find(file) {
        let fileList = this.fileList,
            result = 0;

        if (Object.prototype.toString.call(file) === '[object Number]') {
            result = Math.max(0, file - 1);
        } else {
            for (let i = 0; i < fileList.length; i++) {
                if (file === fileList[i]) {
                    result = i;
                    break;
                }
            }
        }

        return result;
    }

    /**
     * 预览
     */
    preview(file) {
        let htmlStr = '';

        if (file.nodeName === 'IMG') {
            htmlStr = `<img class="ly-file-preview_item" src="${file.src}" />`;
        } else if (file.nodeName === 'VIDEO') {
            htmlStr = `<video class="ly-file-preview_item" src="${file.src}" controls></video>`;
        } else if (file.nodeName === 'AUDIO') {
            htmlStr = `<audio class="ly-file-preview_item" src="${file.src}" controls></audio>`;
        }

        this.node.find('.ly-file-preview_content').html(htmlStr);
    }
}

/**
 * 模板
 * @member {string} _template
 * @memberof DropList
 * @static
 */
FilePreview._template = `<div class="ly-form ly-file-preview">
    <i data-action="prev"></i>
    <i data-action="next"></i>
    <i data-action="close"></i>
    <div class="ly-file-preview_content"></div>
    <div class="ly-file-preview_tip">0 / 0</div>
</div>`;

export default FilePreview;
