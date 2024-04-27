import './assets/css/icon.css';
import './assets/iconfont/iconfont.js';
import Ajax from './modules/base/ajax.js';
import Util from './modules/base/util.js';
import VC from './modules/base/vc.js';
import Component from './modules/base/component.js';
import EventBus from './modules/base/event-bus.js';
import MyNode from './modules/base/my-node.js';
import Observe from './modules/base/observe.js';
import TaskQueue from './modules/base/task-queue.js';
import Time from './modules/base/time.js';
import Watcher from './modules/base/watcher.js';
import Form from './modules/form/index.js';
import Extend from './modules/extend/index.js';
import XMLNode from './modules/base/xml-node.js';

/**
 * 对外暴露的全局变量
 * @namespace
 */
const LY = {};

/**
 * 接口请求相关方法
 * @see module:Ajax
 */
LY.Ajax = Ajax;

/**
 * 常用工具方法
 * @see module:Util
 */
LY.Util = Util;

/**
 * 组件引入相关方法
 * @see module:VC
 */
LY.VC = VC;

/**
 * 扩展功能
 * @see module:Extend
 */
LY.Extend = Extend;

/**
 * 组件基类
 * @see Component
 */
LY.Component = Component;

/**
 * 事件总线
 * @see EventBus
 */
LY.EventBus = EventBus;

/**
 * 封装 DOM 操作
 * @see MyNode
 */
LY.MyNode = MyNode;

/**
 * 监听器
 * @see Observe
 */
LY.Observe = Observe;

/**
 * 任务队列
 * @see TaskQueue
 */
LY.TaskQueue = TaskQueue;

/**
 * 时间
 * @see Time
 */
LY.Time = Time;

/**
 * 观察者
 * @see Watcher
 */
LY.Watcher = Watcher;

/**
 * 表单
 * @see Form
 */
LY.Form = Form;

/**
 * XML 节点
 * @see XMLNode
 */
LY.XMLNode = XMLNode;

export default LY;
