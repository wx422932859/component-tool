import './file-upload.css';
import Component from '../../base/component.js';
import FileNode from '../file-node/file-node.js';
import FilePreview from '../file-preview/file-preview.js';

const FileType = {
    audio: 'audio/*',
    image: 'image/*',
    video: 'video/*',
    pdf: 'application/pdf',
    zip: 'application/zip',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
};

/**
 * 文件上传
 * @author wang.xin
 * @extends Component
 */
class FileUpload extends Component {
    constructor() {
        super();
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
     * 设置监听属性
     */
    monitor() {
        /**
         * @member {FilePreview} filePreview 文件预览器
         * @memberof FileUpload#
         */
        this._children.filePreview = new FilePreview();
        document.body.appendChild(this._children.filePreview.node[0]);

        /**
         * @member {Number} id 文件ID
         * @memberof FileUpload#
         */
        this._observe('id', 1, () => {});

        /**
         * @member {object[]} list 文件列表
         * @memberof FileUpload#
         */
        this._observe('list', [], () => {}, false);

        /**
         * @member {string[] | null} suffix 允许的文件后缀
         * @memberof FileUpload
         * @inner
         */
        this._observe('suffix', null, () => {});

        /**
         * @member {number} maxSize 上传文件大小限制，单位B
         * @memberof FileUpload
         * @inner
         * @default null
         */
        this._observe('maxSize', null, () => {});

        /**
         * @member {number} maxCount 上传文件个数限制
         * @memberof FileUpload
         * @inner
         * @default 10
         */
        this._observe('maxCount', 10, () => {});

        /**
         * @member {string[]} type 可上传的文件类型
         * @memberof FileUpload
         * @inner
         * @default []
         */
        this._observe('type', [], (value) => {
            if (value.length === 1 && FileType[value[0]] != undefined) {
                // 仅有一个文件类型的时候做限制
                this.node.find('input[type="file"]').attr('accept', FileType[value[0]]);
            }
        });

        /**
         * @member {function} error 错误触发事件
         * @memberof FileUpload
         * @inner
         */
        this.error = () => {};

        /**
         * @member {function} removeCallback 删除文件触发事件
         * @memberof FileUpload
         * @inner
         */
        this.removeCallback = () => {};
    }

    /**
     * 事件
     */
    on() {
        // 添加文件
        this.node.on('click', '.fu_add-file', () => {
            this.node.find('input[type="file"]').click();
        });

        // 文件变化
        this.node.find('input[type="file"]').on('change', (e, target) => {
            let fileList = target[0].files;

            // 判断文件个数
            if (this.getFileCount() + fileList.length > this.maxCount) {
                this.error(0); // 文件个数超过限制
            }

            for (let i = 0; i < fileList.length && this.getFileCount() < this.maxCount; i++) {
                let file = fileList[i];

                if (this.allowFileTypeByName(file.name)) {
                    if (this.maxSize != null && file.size > this.maxSize) {
                        this.error(1); // 文件大小超出限制
                    } else {
                        this.addFileNode(file);
                    }
                } else {
                    this.error(2); // 文件格式不支持
                }
            }

            target.val('');
        });

        // 点击文件
        this.node.on('click', '.fn_file-content', (e, target) => {
            this._children.filePreview.load(target.find('.fn_file-item')[0], this.node.find('.fn_file-item'));
        });
    }

    /**
     * 重置
     */
    reset() {
        this.list.forEach((file) => (file.flag = 1));
        this.id = 1;
        this.list = [];
    }

    /**
     * 加载
     * @param {object} [params={}] 入参
     */
    load(params = {}) {
        // 错误提示
        if (typeof params.error == 'function') {
            this.error = params.error;
        }
        // 删除文件响应事件
        if (typeof params.removeCallback == 'function') {
            this.removeCallback = params.removeCallback;
        }
    }

    /**
     * 卸载
     */
    unload() {
        this.reset();
    }

    /**
     * @description 添加文件
     * @param {string | File} file 文件地址 | 文件
     * @param {object} [info={}] 文件相关信息
     */
    addFileNode(file, info = {}) {
        // 先校验格式是否符合
        let fileNode = new FileNode({
            file: file,
            id: this.id++,
            info,
            removeCallback: this.removeCallback,
        });

        this.node.find('.fu_add-file').before(fileNode.node);
        this.list.push(fileNode);
    }

    /**
     * 获取FileNode详情
     */
    getFileList() {
        let res = {
            webFile: [], // 文件名数组（服务器文件）
            localFile: [], // 文件数组（本地文件）
            delFile: [], // 删除的服务器文件
        };

        this.list.forEach((fileNode) => {
            let type = Object.prototype.toString.call(fileNode.file); // 判断是文件还是文件地址

            if (fileNode.remove === false) {
                if (type === '[object String]') {
                    res.webFile.push(fileNode);
                } else if (type === '[object File]') {
                    res.localFile.push(fileNode);
                }
            } else {
                if (type === '[object String]') {
                    res.delFile.push(fileNode);
                }
            }
        });

        return res;
    }

    /**
     * 获取FileNode个数
     */
    getFileCount() {
        return this.list.filter((fileNode) => fileNode.remove === false).length;
    }

    /**
     * @description 根据文件名判断是否是允许的类型
     * @param { String } fileName 文件名
     */
    allowFileTypeByName(fileName) {
        // 默认无限制
        if (this.type.length === 0) {
            return true;
        }

        let result = false;
        this.type.forEach((type) => {
            let fileSuffix = this.fileSuffixMap[type];

            result =
                result ||
                new RegExp('\\.' + fileSuffix.reduce((res, elem) => `${res}|(${elem}$)`, '').substr(1), 'gi').test(
                    fileName
                );
        });
        return result;
    }
}

FileUpload._template = `<div class="ly-form ly-file-upload">
<div class="fu_add-file">
    <input type="file" multiple="multiple">
</div>
</div>`;

export default FileUpload;
