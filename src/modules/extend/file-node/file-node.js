import './file-node.css';
import Component from '../../base/component.js';

/**
 * 文件节点
 * @extends {Component}
 * @author wang.xin
 */
class FileNode extends Component {
    constructor() {
        super();
    }

    /**
     * 挂载成功
     * @memberof FileNode
     */
    _mounted() {
        this.monitor();
        this.on();
    }

    /**
     * 属性
     * @memberof FileNode
     */
    monitor() {
        /**
         * @member {File|String} file 文件或文件地址
         * @memberof FileNode#
         */
        this.file = null;

        /**
         * @member {String} fileType 文件类型
         * @memberof FileNode#
         */
        this.fileType = '';

        /**
         * @member {String} extension 文件扩展名
         * @memberof FileNode#
         */
        this.extension = '';

        /**
         * @member {Object} info 附带信息
         * @memberof FileNode#
         */
        this.info = {};

        /**
         * @member {Boolean} remove 移除标记
         * @memberof FileNode#
         */
        this._observe('remove', false, (value) => {
            if (value) {
                this.node.remove();
            } else {
                this.node.find('.fn_file-content').removeClass('fn_wait-delete');
            }
        });

        /**
         * @member {Function} removeCallback 删除触发的回调事件
         * @memberof FileNode#
         */
        this.removeCallback = () => {};
    }

    /**
     * 事件
     * @memberof FileNode
     */
    on() {
        /**
         * @event 删除
         */
        this.node.on('click', '.fn_btn[data-action="remove"]', (e, target) => {
            target.parent().find('.fn_file-content').addClass('fn_wait-delete');
            this.removeCallback(this);
        });
    }

    /**
     * 加载
     * @param {String|File} file 文件地址或文件
     * @memberof FileNode
     */
    load(file) {
        if (file instanceof File || typeof file === 'string') {
            this.file = file;
            this.setFileTypeAndExtension();
            this.setNode();
        } else {
            console.warn('无法创建文件节点，入参必需是文件类型或文件地址！');
        }
    }

    /**
     * 设置文件类型
     * @memberof FileNode
     */
    setFileTypeAndExtension() {
        const { FILE_TYPE } = FileNode;
        let filePath = '';

        if (this.file instanceof File) {
            filePath = this.file.name;
        } else if (typeof this.file === 'string') {
            filePath = this.file;
        }
        for (let type in FILE_TYPE) {
            let extension = FILE_TYPE[type].extension,
                result = new RegExp(
                    '\\.(' + extension.reduce((res, elem) => `${res}|(${elem}$)`, '').substr(1) + ')',
                    'gi'
                ).exec(filePath); // 形如：'\.(mp3$)|(mp4$)'

            if (result) {
                this.fileType = type;
                this.extension = result[1].toLowerCase();
                return;
            }
        }
    }

    /**
     * 设置节点
     * @memberof FileNode
     */
    setNode() {
        if (this.file instanceof File) {
            this.setNodeByFile();
        }

        if (typeof this.file === 'string') {
            this.render(this.file);
        }
    }

    /**
     * 设置节点（文件）
     * @memberof FileNode
     */
    setNodeByFile() {
        let reader = new FileReader();

        reader.readAsDataURL(this.file);
        reader.onload = () => {
            this.render(reader.result);
            if (['video', 'audio'].includes(this.fileType)) {
                let file = new Audio(reader.result);
                file.addEventListener('loadedmetadata', () => {
                    this.file.duration = Math.floor(file.duration);
                });
            }
        };
    }

    /**
     * 渲染
     * @param {String} filePath 文件地址
     * @memberof FileNode
     */
    render(filePath) {
        let htmlStr = '';

        switch (this.fileType) {
            case 'image':
                htmlStr = this.renderImage(filePath);
                break;

            case 'video':
                htmlStr = this.renderVideo(filePath);
                break;

            case 'audio':
                htmlStr = this.renderAudio(filePath);
                break;

            case 'zip':
            case '7z':
            case 'rar':
                htmlStr = this.renderZIP();
                break;

            case 'pdf':
                htmlStr = this.renderPDF();
                break;

            case 'docx':
                htmlStr = this.renderDOCX();
                break;

            case 'xlsx':
                htmlStr = this.renderXLSX();
                break;

            case 'pptx':
                htmlStr = this.renderPPTX();
                break;

            default:
                break;
        }
        this.node.html(
            `<div class="fn_file-content" title="${
                this.file instanceof File ? this.file.name : this.file
            }">${htmlStr}</div>
            <i class="fn_btn" data-action="remove"></i>`
        );
    }

    /**
     * 渲染图片
     * @param {string} filePath 图片地址
     * @memberof FileNode
     */
    renderImage(filePath) {
        return `<img class="fn_file-item" src="${filePath}"/>`;
    }

    /**
     * 渲染视频
     * @param {string} filePath 视频地址
     * @memberof FileNode
     */
    renderVideo(filePath) {
        return `<video class="fn_file-item" src="${filePath}"></video>
                <svg class="ly-icon_svg fn_normal-icon fn_video-icon" aria-hidden="true">
                    <use xlink:href="#ly-play"></use>
                </svg>`;
    }

    /**
     * 渲染音频
     * @param {string} filePath 音频地址
     * @memberof FileNode
     */
    renderAudio(filePath) {
        return `<audio class="fn_file-item" src="${filePath}"></audio>
                <svg class="ly-icon_svg fn_normal-icon fn_audio-icon" aria-hidden="true">
                    <use xlink:href="#ly-file-audio-o"></use>
                </svg>`;
    }

    /**
     * 渲染ZIP
     * @memberof FileNode
     */
    renderZIP() {
        return `<svg class="ly-icon_svg fn_normal-icon fn_zip-icon" aria-hidden="true">
                    <use xlink:href="#ly-zip"></use>
                </svg>`;
    }

    /**
     * 渲染PDF
     * @memberof FileNode
     */
    renderPDF() {
        return `<svg class="ly-icon_svg fn_normal-icon fn_pdf-icon" aria-hidden="true">
                        <use xlink:href="#ly-pdf"></use>
                    </svg>`;
    }

    /**
     * 渲染DOCX
     * @memberof FileNode
     */
    renderDOCX() {
        return `<svg class="ly-icon_svg fn_normal-icon fn_docx-icon" aria-hidden="true">
                        <use xlink:href="#ly-docx"></use>
                    </svg>`;
    }

    /**
     * 渲染PPTX
     * @memberof FileNode
     */
    renderXLSX() {
        return `<svg class="ly-icon_svg fn_normal-icon fn_xlsx-icon" aria-hidden="true">
                        <use xlink:href="#ly-xlsx"></use>
                    </svg>`;
    }

    /**
     * 渲染PPTX
     * @memberof FileNode
     */
    renderPPTX() {
        return `<svg class="ly-icon_svg fn_normal-icon fn_pptx-icon" aria-hidden="true">
                        <use xlink:href="#ly-pptx"></use>
                    </svg>`;
    }
}

/**
 * @member {String} _template 模板字符串
 * @memberof FileNode
 * @static
 */
FileNode._template = `<div class="ly-file-node"></div>`;

/**
 * @member {Object} FILE_TYPE 常见文件类型
 * @memberof FileNode
 * @static
 */
FileNode.FILE_TYPE = {
    audio: {
        extension: ['mp3', 'm4a', 'wav'],
        type: 'audio/*'
    },
    image: {
        extension: ['webp', 'jpg', 'jpeg', 'png', 'bmp', 'gif'],
        type: 'image/*'
    },
    video: {
        extension: ['mpeg', 'mpg', 'dat', 'mov', 'asf', 'wmv', 'mp4', 'avi', 'flv', 'amv', '3gp'],
        type: 'video/*'
    },
    zip: {
        extension: ['zip'],
        type: 'application/zip'
    },
    '7z': {
        extension: ['7z'],
        type: 'application/7z'
    },
    rar: {
        extension: ['rar'],
        type: 'application/rar'
    },
    pdf: {
        extension: ['pdf'],
        type: 'application/pdf'
    },
    docx: {
        extension: ['doc', 'docx'],
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    },
    xlsx: {
        extension: ['xls', 'xlsx'],
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    },
    pptx: {
        extension: ['ppt', 'pptx'],
        type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    }
};

export default FileNode;
