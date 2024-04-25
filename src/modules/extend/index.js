import WaterMark from './water-mark/water-mark';
import ScrollBar from './scroll-bar/scroll-bar';
import FixTheadTable from './fixed-thead-table/fixed-thead-table';
import Pagination from './pagination/pagination.js';
import FileUpload from './file-upload/file-upload.js';
import ScrollTop from './scroll-top/scroll-top.js';
import FilePreview from './file-preview/file-preview.js';
import Popup from './popup/popup.js';

/**
 * 扩展功能
 * @exports Extend
 */
const Extend = {};

/**
 * 滚动条
 * @see ScrollBar
 */
Extend.ScrollBar = ScrollBar;

/**
 * 固定表头
 * @see FixTheadTable
 */
Extend.FixTheadTable = FixTheadTable;

/**
 * @member {class} Pagination 页码
 * @memberof Extend
 * @static
 * @see Pagination
 */
Extend.Pagination = Pagination;

/**
 * @member {class} FileUpload 文件上传
 * @memberof Extend
 * @static
 * @see FileUpload
 */
Extend.FileUpload = FileUpload;

/**
 * @member {class} ScrollTop 文件上传
 * @memberof Extend
 * @static
 * @see ScrollTop
 */
Extend.ScrollTop = ScrollTop;

/**
 * @member {class} FilePreview 文件预览
 * @memberof Extend
 * @static
 * @see FilePreview
 */
Extend.FilePreview = FilePreview;

/**
 * @member {class} Popup 弹窗
 * @memberof Extend
 * @static
 * @see Popup
 */
Extend.Popup = Popup;

/**
 * 水印
 * @see WaterMark
 */
Extend.WaterMark = WaterMark;

export default Extend;
