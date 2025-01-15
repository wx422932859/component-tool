import FilePreview from './file-preview/file-preview.js';
import FileUpload from './file-upload/file-upload.js';
import FixedTheadTable from './fixed-thead-table/fixed-thead-table.js';
import Pagination from './pagination/pagination.js';
import Popup from './popup/popup.js';
import ScrollBar from './scroll-bar/scroll-bar.js';
import ScrollTop from './scroll-top/scroll-top.js';
import TableBase from './table-base/table-base.js';
import TableFixedCell from './table-fixed-cell/table-fixed-cell.js';
import WaterMark from './water-mark/water-mark.js';

/**
 * 扩展功能
 *
 * @exports Extend
 */
const Extend = {
    /**
     * 文件预览
     * @see FilePreview
     */
    FilePreview,

    /**
     * 文件上传
     * @see FileUpload
     */
    FileUpload,

    /**
     * 固定表头
     * @see FixedTheadTable
     */
    FixedTheadTable,

    /**
     * 页码
     * @see Pagination
     */
    Pagination,

    /**
     * 弹窗
     * @see Popup
     */
    Popup,

    /**
     * 滚动条
     * @see ScrollBar
     */
    ScrollBar,

    /**
     * 置顶按钮
     * @see ScrollTop
     */
    ScrollTop,

    /**
     * 表格基类
     * @see FixedTableCell
     */
    TableBase,

    /**
     * 固定单元格
     * @see TableFixedCell
     */
    TableFixedCell,

    /**
     * 水印
     * @see WaterMark
     */
    WaterMark
};

export default Extend;
