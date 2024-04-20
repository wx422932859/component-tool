import WaterMark from './water-mark/water-mark';
import ScrollBar from './scroll-bar/scroll-bar';
import FixTheadTable from './fixed-thead-table/fixed-thead-table';

/**
 * 扩展功能
 * @exports Extend
 */
const Extend = {};

/**
 * 水印
 * @see WaterMark
 */
Extend.WaterMark = WaterMark;

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

export default Extend;
