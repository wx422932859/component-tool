import './file-upload.css';
import Component from '../../base/component.js';
import FileNode from '../file-node/file-node.js';
import FilePreview from '../file-preview/file-preview.js';

const { FILE_TYPE } = FileNode;

/**
 * 文件上传
 * @author wang.xin
 * @extends Component
 */
class FileUpload extends Component {
    constructor() {
        super();
    }

    /**
     * 挂载
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
         * @member {FilePreview} filePreview 文件预览器
         * @memberof FileUpload#
         */
        this._children.filePreview = new FilePreview();
        document.body.appendChild(this._children.filePreview.node[0]);

        /**
         * @member {object[]} list 文件列表
         * @memberof FileUpload#
         */
        this._observe('list', [], () => {}, false);

        /**
         * @member {Number} maxSize 上传文件大小限制，单位 B
         * @memberof FileUpload#
         * @default null
         */
        this._observe('maxSize', null, () => {});

        /**
         * @member {Number} maxCount 上传文件个数限制
         * @memberof FileUpload#
         * @default 10
         */
        this._observe('maxCount', 10, () => {});

        /**
         * @member {String[]} acceptType 允许上传的文件类型
         * @memberof FileUpload#
         * @default []
         * @todo
         * 仅有一个文件类型的时候做限制
         */
        this._observe('acceptType', [], (value) => {
            if (value.length === 1 && FILE_TYPE[value[0]].type != undefined) {
                this.node.find('input[type="file"]').attr('accept', FILE_TYPE[value[0]].type);
            } else {
                this.node.find('input[type="file"]').removeAttr('accept');
            }
        });

        /**
         * @member {Object} acceptExtension 允许上传的文件扩展名
         * @memberof FileUpload#
         * @example
         * {
         *     image: ['webp', 'jpg', 'jpeg', 'png', 'bmp', 'gif'],
         *     video: ['mp4'],
         *     audio: ['mp3', 'm4a', 'wav'],
         * },
         */
        this._observe('acceptExtension', null, () => {});

        /**
         * @member {Function} errorCallback 发生错误回调函数
         * @memberof FileUpload#
         */
        this.errorCallback = () => {};

        /**
         * @member {Function} removeCallback 删除文件回调函数
         * @memberof FileUpload#
         */
        this.removeCallback = () => {};
    }

    /**
     * 事件
     */
    on() {
        /**
         * @event 添加文件
         */
        this.node.on('click', '.fu_add-file', () => {
            this.node.find('input[type="file"]').click();
        });

        /**
         * @event 文件变化
         */
        this.node.find('input[type="file"]').on('change', (e, target) => {
            let fileList = target[0].files;

            if (this.getFileCount() + fileList.length > this.maxCount) {
                this.errorCallback(0);
            }

            for (let i = 0; i < fileList.length && this.getFileCount() < this.maxCount; i++) {
                this.addFile(fileList[i]);
            }

            target.val('');
        });

        /**
         * @event 点击文件
         */
        this.node.on('click', '.fn_file-content', (e, target) => {
            this._children.filePreview.load(target.find('.fn_file-item')[0], this.node.find('.fn_file-item'));
        });
    }

    /**
     * 重置
     * @memberof FileUpload
     */
    reset() {
        this.list.forEach((file) => (file.remove = true));
        this.list = [];
    }

    /**
     * 加载
     * @param {Object} params 入参
     * @param {Number} params.maxSize 文件上传最大值，单位 B
     * @param {Number} params.maxCount 文件上传最大数量
     * @param {String[]} params.acceptType 允许上传的文件类型
     * @param {Object} params.acceptExtension 允许上传的文件扩展名
     * @param {Function} params.errorCallback 发生错误回调函数
     * @param {Function} params.removeCallback 删除文件回调函数
     * @memberof FileUpload
     */
    load(params = {}) {
        for (let key in params) {
            if (['maxSize', 'maxCount'].includes(key) && typeof params[key] != 'number') {
                continue;
            }
            if (['errorCallback', 'removeCallback'].includes(key) && typeof params[key] != 'function') {
                continue;
            }
            this[key] = params[key];
        }
    }

    /**
     * 卸载
     * @memberof FileUpload
     */
    unload() {
        this.reset();
    }

    /**
     * 校验文件类型
     * @param {FileNode} fileNode 文件节点
     * @memberof FileUpload
     */
    validFileType(fileNode) {
        if (this.acceptType.length === 0) {
            return true;
        }

        return this.acceptType.includes(fileNode.fileType);
    }

    /**
     * 校验文件后缀
     * @param {FileNode} fileNode 文件节点
     * @memberof FileUpload
     */
    validFileExtension(fileNode) {
        if (this.acceptExtension == null || this.acceptExtension[fileNode.fileType] == null) {
            return true;
        }

        return this.acceptExtension[fileNode.fileType].includes(fileNode.extension);
    }

    /**
     * 添加文件
     * @param {String|File} file 文件地址或文件
     * @param {Object} info 附带信息
     * @todo
     * 1. 校验文件大小是否超出限制
     * 2. 校验文件类型和扩展名是否符合规则
     * 3. 情况1和2都符合条件，则添加节点
     * @memberof FileUpload
     */
    addFile(file, info = {}) {
        if (file instanceof File || typeof file === 'string') {
            let fileNode = new FileNode();

            fileNode.load(file);
            if (this.maxSize != null && file instanceof File && file.size > this.size) {
                this.errorCallback(1);
                return;
            }
            if (!this.validFileType(fileNode) || !this.validFileExtension(fileNode)) {
                this.errorCallback(2);
                return;
            }
            fileNode.info = info;
            fileNode.removeCallback = this.removeCallback;
            this.node.find('.fu_add-file').before(fileNode.node);
            this.list.push(fileNode);
        }
    }

    /**
     * 获取FileNode详情
     * @memberof FileUpload
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
     * @memberof FileUpload
     */
    getFileCount() {
        return this.list.filter((fileNode) => fileNode.remove === false).length;
    }
}

/**
 * @member {String} _template 模板字符串
 * @memberof FileUpload
 * @static
 */
FileUpload._template = `<div class="ly-form ly-file-upload">
<div class="fu_add-file">
    <input type="file" multiple="multiple">
</div>
</div>`;

export default FileUpload;
