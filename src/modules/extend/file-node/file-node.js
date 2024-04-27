import './file-node.css';
import Component from '../../base/component.js';

/**
 * 文件节点
 * @extends {Component}
 */
class FileNode extends Component {
    /**
     * Creates an instance of FileNode.
     * @param {object} option 入参
     * @param {string | File} option.file 文件地址 | 文件
     * @param {object} option.id 唯一标识
     * @param {object} option.info 附带信息
     * @param {function} option.removeCallback 删除触发的回调事件
     */
    constructor(option) {
        super();
        this.init();
        this.load(option);
    }

    /**
     * 监听属性
     */
    monitor() {
        /**
         * @member {object} file 文件
         * @memberof FileNode
         * @inner
         */
        this.file = null;

        /**
         * @member {object} id 唯一标识
         * @memberof FileNode
         * @inner
         */
        this.id = null;

        /**
         * @member {string | File} type 文件类型
         * @memberof FileNode
         * @inner
         */
        this.type = '';

        /**
         * @member {object} info 附带信息
         * @memberof FileNode
         * @inner
         */
        this.info = {};

        /**
         * @member {boolean} remove 移除标记
         * @memberof FileNode
         * @inner
         */
        this._observe('remove', false, (value) => {
            value == true && this.node.remove();
        });

        /**
         * @member {function} removeCallback 删除触发的回调事件
         * @memberof FileNode
         * @inner
         */
        this.removeCallback = () => {};
    }

    // 初始化
    init() {
        this.monitor();
        this.on();
    }

    // 事件
    on() {
        // 删除
        this.node.on('click', '[data-action="remove"]', (e, target) => {
            target.parent().find('.fn_file-content').addClass('fn_wait-delete');
            this.removeCallback(this); // 点击删除时触发
        });
    }

    /**
     * 加载
     * @param {object} option 入参
     * @param {string | File} option.file 文件地址 | 文件
     * @param {object} option.id 唯一标识
     * @param {object} option.info 附带信息
     * @param {function} option.removeCallback 删除触发的回调事件
     */
    load(option) {
        this.file = option.file;
        this.id = option.id || option.file;
        this.info = option.info;
        if (typeof option.removeCallback == 'function') {
            this.removeCallback = option.removeCallback;
        }
        this.setNode();
    }

    // 卸载
    unload() {
        // 卸载子组件

        // 重置
        this.reset();
    }

    // 设置节点
    setNode() {
        let fileType = Object.prototype.toString.call(this.file),
            reader = new FileReader();

        if (fileType === '[object String]') {
            // 图片地址
            let htmlStr = '';
            switch (this.type) {
                case 'image':
                    htmlStr = this.renderImage(this.file);
                    break;

                case 'video':
                    htmlStr = this.renderVideo(this.file);
                    break;

                case 'audio':
                    htmlStr = this.renderAudio(this.file);
                    break;

                default:
                    break;
            }
            this.node.html(
                `<div class="fn_file-content">${htmlStr}</div>
                <i data-action="remove"></i>`
            );
        } else if (fileType === '[object File]') {
            // 本地文件
            reader.readAsDataURL(this.file); // 文件转 URL
            reader.onload = () => {
                let htmlStr = '';
                if (/image/.test(this.file.type)) {
                    htmlStr = this.renderImage(reader.result);
                } else if (/video/.test(this.file.type)) {
                    htmlStr = this.renderVideo(reader.result);
                } else if (/audio/.test(this.file.type)) {
                    htmlStr = this.renderAudio(reader.result);
                }
                this.node.html(
                    `<div class="fn_file-content">${htmlStr}</div>
                    <i data-action="remove"></i>`
                );
                if (/video/.test(this.file.type) || /audio/.test(this.file.type)) {
                    let file = new Audio(reader.result);
                    file.addEventListener('loadedmetadata', () => {
                        this.file.duration = Math.floor(file.duration);
                    });
                }
            };
        }
    }

    /**
     * 渲染图片
     * @param {string} src 图片地址
     */
    renderImage(src) {
        return `<img class="fn_file-item" src="${src}"/>`;
    }

    /**
     * 渲染视频
     * @param {string} src 视频地址
     */
    renderVideo(src) {
        return `<video class="fn_file-item" src="${src}"></video>
                <svg class="ly-icon_svg fn_video-icon" aria-hidden="true">
                    <use xlink:href="#ly-play"></use>
                </svg>`;
    }

    /**
     * 渲染音频
     */
    renderAudio(src) {
        return `<audio class="fn_file-item" src="${src}"></audio>
                <svg class="ly-icon_svg fn_audio-icon" aria-hidden="true">
                    <use xlink:href="#ly-file-audio-o"></use>
                </svg>`;
    }
}

FileNode._template = `<div class="ly-file-node"></div>`;

export default FileNode;
