import Ajax from './modules/base/ajax.js';
import Component from './modules/base/component.js';
import EventBus from './modules/base/event-bus.js';
import MyNode from './modules/base/my-node.js';
import Observe from './modules/base/observe.js';
import TaskQueue from './modules/base/task-queue.js';
import Time from './modules/base/time.js';
import Util from './modules/base/util.js';
import VC from './modules/base/vc.js';
import Watcher from './modules/base/watcher.js';
import Form from './modules/form/index.js';
import Extend from './modules/extend/index.js';

/**
 * 全局变量
 * @namespace
 */
const LY = {};

LY.Ajax = Ajax;
LY.Util = Util;
LY.Extend = Extend;
LY.VC = VC;
LY.Component = Component;
LY.EventBus = EventBus;
LY.MyNode = MyNode;
LY.Observe = Observe;
LY.TaskQueue = TaskQueue;
LY.Time = Time;
LY.Watcher = Watcher;
LY.Form = Form;

export default LY;
