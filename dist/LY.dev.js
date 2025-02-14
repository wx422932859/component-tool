/*!
 * name: component-tool
 * package: 2025-01-21 00:01:05
 * version: 1.1.7
 * exports: LY
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["LY"] = factory();
	else
		root["LY"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_icon_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_icon_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_icon_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_icon_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_icon_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 2 */
/***/ ((module) => {

"use strict";


var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),
/* 4 */
/***/ ((module) => {

"use strict";


var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),
/* 5 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),
/* 6 */
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),
/* 7 */
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),
/* 8 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.ly-icon_svg {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}

.ly-icon_arrow-down {
    position: relative;
    display: inline-block;
    width: 14px;
    height: 14px;
}

.ly-icon_arrow-down::after {
    content: '';
    position: absolute;
    transform: translate(50%, 25%) rotate(-135deg);
    width: 50%;
    height: 50%;
    border-left: 1px solid var(--ly-form_color_icon);
    border-top: 1px solid var(--ly-form_color_icon);
    box-sizing: border-box;
}

.ly-icon_triangle-down {
    display: inline-block;
    border-top: 6px solid;
    border-top-color: var(--ly-form_color_icon);
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
}

.ly-icon_check {
    position: relative;
    display: inline-block;
    width: 14px;
    height: 14px;
}

.ly-icon_check::after {
    content: '';
    position: absolute;
    transform: translate(10%, 50%) rotate(135deg);
    width: 80%;
    height: 40%;
    border-right: 1px solid var(--ly-form_color_icon);
    border-top: 1px solid var(--ly-form_color_icon);
    box-sizing: border-box;
}

.ly-icon_close {
    position: relative;
    display: inline-block;
    width: 14px;
    height: 14px;
}

.ly-icon_close::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    width: 2px;
    height: 100%;
    background-color: var(--ly-form_color_icon);
}

.ly-icon_close::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(135deg);
    width: 2px;
    height: 100%;
    background-color: var(--ly-form_color_icon);
}

.ly-icon_remove {
    --color: #fff;
    --background-color: var(--ly-form_color_icon);

    position: relative;
    display: inline-block;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: var(--background-color);
}

.ly-icon_remove::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    width: 1px;
    height: 50%;
    background-color: var(--color);
}

.ly-icon_remove::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 2;
    transform: translate(-50%, -50%) rotate(135deg);
    width: 1px;
    height: 50%;
    background-color: var(--color);
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 9 */
/***/ ((module) => {

"use strict";


module.exports = function (i) {
  return i[1];
};

/***/ }),
/* 10 */
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),
/* 11 */
/***/ (() => {

window._iconfont_svg_string_3997256='<svg><symbol id="ly-pdf" viewBox="0 0 1026 1024"><path d="M630 0l287 287v699c0 20.987-17.013 38-38 38H145c-20.987 0-38-17.013-38-38V38c0-20.987 17.013-38 38-38h485z" fill="#FFFFFF" ></path><path d="M145 16c-12.15 0-22 9.85-22 22v948c0 12.15 9.85 22 22 22h734c12.15 0 22-9.85 22-22V293.627L623.373 16H145zM630 0l287 287v699c0 20.987-17.013 38-38 38H145c-20.987 0-38-17.013-38-38V38c0-20.987 17.013-38 38-38h485z" fill="#E63F39" ></path><path d="M291.74 847.984c30.662-21.276 50.999-52.563 70.397-83.538-27.846 23.778-54.127 50.373-70.397 83.538z m363.563-155.5c28.784 13.767 60.385 28.472 92.924 19.711-22.527-27.22-61.95-19.711-92.924-19.711zM429.719 713.76c41.612-15.331 84.164-27.22 127.34-36.294-27.845-24.717-51.31-53.502-70.083-85.728-15.331 42.238-35.668 82.6-57.257 122.022z m62.262-223.082c13.454-34.416 17.521-76.342-5.319-107.63-6.57 35.668-3.754 72.588 5.32 107.63z m-41.612-96.366c3.754-22.84 32.852-27.22 50.999-20.337 11.263 7.196 16.895 20.962 17.208 34.103 1.251 40.361-5.945 80.097-11.577 119.832-3.128 18.46 8.135 35.043 16.27 50.686 20.024 36.92 47.87 70.085 84.477 91.36 44.115-5.318 90.42-11.889 133.598 2.19 32.226 10.951 24.717 70.71-10.325 71.336-49.122 2.503-93.55-21.9-137.666-39.735-60.698 4.38-119.832 22.84-178.028 40.361-26.281 42.864-50.06 90.735-92.611 119.832-21.276 16.583-70.085 2.816-59.134-29.41 18.46-45.054 64.453-69.772 104.814-92.298 11.576-5.945 18.147-17.209 24.092-28.472 27.533-52.876 55.066-105.753 77.28-161.132-11.576-51.937-28.472-105.127-19.398-158.316zM630 0l287 287H651c-11.598 0-21-9.402-21-21V0zM120.5 98h259C446.05 98 500 151.95 500 218.5S446.05 339 379.5 339h-259C53.95 339 0 285.05 0 218.5S53.95 98 120.5 98z" fill="#E63F39" ></path><path d="M121.01 167.898h42.328c24.31 0 36.465 10.344 36.465 31.031 0 20.878-12.25 31.317-36.751 31.317h-26.455V270H121.01V167.898z m15.587 13.299v35.75h25.454c7.722 0 13.347-1.43 16.874-4.29 3.527-2.955 5.291-7.531 5.291-13.728 0-6.387-1.811-10.868-5.434-13.442-3.527-2.86-9.104-4.29-16.731-4.29h-25.454z m77.649-13.299h37.18c16.397 0 28.886 4.624 37.466 13.871 8.008 8.58 12.012 20.973 12.012 37.18 0 15.92-4.1 28.362-12.298 37.323-8.58 9.152-21.069 13.728-37.466 13.728h-36.894V167.898z m15.587 13.299v75.504h18.447c12.965 0 22.451-3.098 28.457-9.295 5.91-6.197 8.866-15.682 8.866-28.457 0-12.965-2.908-22.499-8.723-28.6-6.006-6.101-15.444-9.152-28.314-9.152h-18.733z m86.944-13.299h69.355v13.299h-53.768v29.744h50.765v13.299h-50.765V270h-15.587V167.898z" fill="#FFFFFF" ></path></symbol><symbol id="ly-xlsx" viewBox="0 0 1024 1024"><path d="M288 938.666667h618.666667a10.666667 10.666667 0 0 0 10.666666-10.666667V298.666667H736c-17.642667 0-32-14.357333-32-32V85.333333H288a10.666667 10.666667 0 0 0-10.666667 10.666667v832a10.666667 10.666667 0 0 0 10.666667 10.666667z" fill="#FFFFFF" ></path><path d="M912.917333 277.333333L725.333333 89.749333V266.666667a10.666667 10.666667 0 0 0 10.666667 10.666666h176.917333z" fill="#FFFFFF" ></path><path d="M929.290667 263.541333L739.125333 73.376A31.765333 31.765333 0 0 0 716.501333 64H288c-17.642667 0-32 14.357333-32 32v832c0 17.642667 14.357333 32 32 32h618.666667c17.642667 0 32-14.357333 32-32V286.165333c0-8.533333-3.338667-16.576-9.376-22.624zM725.333333 89.749333L912.917333 277.333333H736a10.666667 10.666667 0 0 1-10.666667-10.666666V89.749333zM906.666667 938.666667H288a10.666667 10.666667 0 0 1-10.666667-10.666667V96a10.666667 10.666667 0 0 1 10.666667-10.666667h416v181.333334c0 17.642667 14.357333 32 32 32h181.333333v629.333333a10.666667 10.666667 0 0 1-10.666666 10.666667z" fill="#605E5C" opacity=".64" ></path><path d="M842.666667 682.666667H725.333333a10.666667 10.666667 0 0 1-10.666666-10.666667v-21.333333a10.666667 10.666667 0 0 1 10.666666-10.666667h117.333334a10.666667 10.666667 0 0 1 10.666666 10.666667v21.333333a10.666667 10.666667 0 0 1-10.666666 10.666667z" fill="#134A2C" ></path><path d="M672 682.666667H554.666667a10.666667 10.666667 0 0 1-10.666667-10.666667v-21.333333a10.666667 10.666667 0 0 1 10.666667-10.666667h117.333333a10.666667 10.666667 0 0 1 10.666667 10.666667v21.333333a10.666667 10.666667 0 0 1-10.666667 10.666667z" fill="#185C37" ></path><path d="M842.666667 597.333333H725.333333a10.666667 10.666667 0 0 1-10.666666-10.666666v-21.333334a10.666667 10.666667 0 0 1 10.666666-10.666666h117.333334a10.666667 10.666667 0 0 1 10.666666 10.666666v21.333334a10.666667 10.666667 0 0 1-10.666666 10.666666z" fill="#21A366" ></path><path d="M672 597.333333H554.666667a10.666667 10.666667 0 0 1-10.666667-10.666666v-21.333334a10.666667 10.666667 0 0 1 10.666667-10.666666h117.333333a10.666667 10.666667 0 0 1 10.666667 10.666666v21.333334a10.666667 10.666667 0 0 1-10.666667 10.666666z" fill="#107C41" ></path><path d="M842.666667 512H725.333333a10.666667 10.666667 0 0 1-10.666666-10.666667v-21.333333a10.666667 10.666667 0 0 1 10.666666-10.666667h117.333334a10.666667 10.666667 0 0 1 10.666666 10.666667v21.333333a10.666667 10.666667 0 0 1-10.666666 10.666667z" fill="#33C481" ></path><path d="M672 512H554.666667a10.666667 10.666667 0 0 1-10.666667-10.666667v-21.333333a10.666667 10.666667 0 0 1 10.666667-10.666667h117.333333a10.666667 10.666667 0 0 1 10.666667 10.666667v21.333333a10.666667 10.666667 0 0 1-10.666667 10.666667z" fill="#21A366" ></path><path d="M128 789.333333h341.333333a42.666667 42.666667 0 0 0 42.666667-42.666666V405.333333a42.666667 42.666667 0 0 0-42.666667-42.666666H128a42.666667 42.666667 0 0 0-42.666667 42.666666v341.333334a42.666667 42.666667 0 0 0 42.666667 42.666666z" fill="#107C41" ></path><path d="M180.8 704l84.096-128.362667L187.861333 448h61.994667l42.048 81.589333c3.861333 7.733333 6.517333 13.504 7.968 17.312h0.544c2.794667-6.186667 5.685333-12.192 8.704-18.026666L354.069333 448h56.906667l-79.018667 126.933333L412.981333 704H352.426667l-48.576-89.621333a74.122667 74.122667 0 0 1-5.802667-11.957334h-0.714667c-0.853333 2.858667-2.72 6.72-5.610666 11.605334L241.706667 704h-60.906667z" fill="#F9F7F7" ></path></symbol><symbol id="ly-pptx" viewBox="0 0 1024 1024"><path d="M288 938.666667h618.666667a10.666667 10.666667 0 0 0 10.666666-10.666667V298.666667H736c-17.642667 0-32-14.357333-32-32V85.333333H288a10.666667 10.666667 0 0 0-10.666667 10.666667v832a10.666667 10.666667 0 0 0 10.666667 10.666667z" fill="#FFFFFF" ></path><path d="M912.917333 277.333333L725.333333 89.749333V266.666667a10.666667 10.666667 0 0 0 10.666667 10.666666h176.917333z" fill="#FFFFFF" ></path><path d="M929.290667 263.541333L739.125333 73.376A31.765333 31.765333 0 0 0 716.501333 64H288c-17.642667 0-32 14.357333-32 32v832c0 17.642667 14.357333 32 32 32h618.666667c17.642667 0 32-14.357333 32-32V286.165333c0-8.533333-3.338667-16.576-9.376-22.624zM725.333333 89.749333L912.917333 277.333333H736a10.666667 10.666667 0 0 1-10.666667-10.666666V89.749333zM906.666667 938.666667H288a10.666667 10.666667 0 0 1-10.666667-10.666667V96a10.666667 10.666667 0 0 1 10.666667-10.666667h416v181.333334c0 17.642667 14.357333 32 32 32h181.333333v629.333333a10.666667 10.666667 0 0 1-10.666666 10.666667z" fill="#605E5C" opacity=".64" ></path><path d="M650.666667 576l-10.666667-10.666667h-85.333333l-10.666667 10.666667v119.018667C572.32 720.416 609.632 736 650.666667 736c88.362667 0 160-71.637333 160-160H650.666667z" fill="#ED6C47" ></path><path d="M544 456.981333V576h106.666667V416c-41.034667 0-78.346667 15.573333-106.666667 40.981333z" fill="#FF8F6B" ></path><path d="M682.666667 384v160h160c0-88.362667-71.637333-160-160-160z" fill="#FFC7B5" ></path><path d="M128 789.333333h341.333333a42.666667 42.666667 0 0 0 42.666667-42.666666V405.333333a42.666667 42.666667 0 0 0-42.666667-42.666666H128a42.666667 42.666667 0 0 0-42.666667 42.666666v341.333334a42.666667 42.666667 0 0 0 42.666667 42.666666z" fill="#C43E1C" ></path><path d="M318.442667 448c31.52 0 55.68 7.072 72.426666 21.173333 16.746667 14.112 25.130667 34.56 25.130667 61.312 0 17.184-4.149333 32.458667-12.426667 45.834667-8.288 13.386667-20.074667 23.786667-35.349333 31.210667C352.96 614.954667 335.253333 618.666667 315.125333 618.666667h-48.469333v96H213.333333V448h105.109334zM266.666667 576h42.314666c16.490667 0 28.949333-3.733333 37.386667-11.146667 8.426667-7.434667 12.629333-18.293333 12.629333-32.576 0-27.733333-16.138667-41.610667-48.448-41.610666H266.666667v85.333333z" fill="#F9F7F7" ></path></symbol><symbol id="ly-docx" viewBox="0 0 1024 1024"><path d="M288 938.666667h618.666667a10.666667 10.666667 0 0 0 10.666666-10.666667V298.666667H736c-17.642667 0-32-14.357333-32-32V85.333333H288a10.666667 10.666667 0 0 0-10.666667 10.666667v832a10.666667 10.666667 0 0 0 10.666667 10.666667z" fill="#FFFFFF" ></path><path d="M912.917333 277.333333L725.333333 89.749333V266.666667a10.666667 10.666667 0 0 0 10.666667 10.666666h176.917333z" fill="#FFFFFF" ></path><path d="M929.290667 263.541333L739.125333 73.376A31.765333 31.765333 0 0 0 716.501333 64H288c-17.642667 0-32 14.357333-32 32v832c0 17.642667 14.357333 32 32 32h618.666667c17.642667 0 32-14.357333 32-32V286.165333c0-8.533333-3.338667-16.576-9.376-22.624zM725.333333 89.749333L912.917333 277.333333H736a10.666667 10.666667 0 0 1-10.666667-10.666666V89.749333zM906.666667 938.666667H288a10.666667 10.666667 0 0 1-10.666667-10.666667V96a10.666667 10.666667 0 0 1 10.666667-10.666667h416v181.333334c0 17.642667 14.357333 32 32 32h181.333333v629.333333a10.666667 10.666667 0 0 1-10.666666 10.666667z" fill="#605E5C" opacity=".64" ></path><path d="M842.666667 661.333333H544v21.333334h298.666667a10.666667 10.666667 0 0 0 0-21.333334z" fill="#103F91" ></path><path d="M842.666667 597.333333H544v21.333334h298.666667a10.666667 10.666667 0 0 0 0-21.333334z" fill="#185ABD" ></path><path d="M544 554.666667h298.666667a10.666667 10.666667 0 1 0 0-21.333334H544v21.333334z" fill="#2B7CD3" ></path><path d="M842.666667 469.333333H544v21.333334h298.666667a10.666667 10.666667 0 0 0 0-21.333334z" fill="#41A5EE" ></path><path d="M128 789.333333h341.333333a42.666667 42.666667 0 0 0 42.666667-42.666666V405.333333a42.666667 42.666667 0 0 0-42.666667-42.666666H128a42.666667 42.666667 0 0 0-42.666667 42.666666v341.333334a42.666667 42.666667 0 0 0 42.666667 42.666666z" fill="#185ABD" ></path><path d="M230.666667 646.88c0.704 5.568 1.162667 10.421333 1.386666 14.570667h0.8a251.456 251.456 0 0 1 4.554667-28.309334L275.104 469.333333h48.746667l38.997333 161.354667c1.952 7.968 3.584 18.101333 4.874667 30.432h0.650666c0.544-8.501333 1.898667-18.325333 4.064-29.450667L403.637333 469.333333H448l-54.592 234.666667h-51.84l-37.216-155.456c-1.077333-4.48-2.304-10.314667-3.658667-17.514667a204.437333 204.437333 0 0 1-2.517333-15.701333h-0.64c-0.437333 3.818667-1.28 9.493333-2.528 17.013333a434.656 434.656 0 0 1-3.008 16.693334L257.066667 704h-52.650667L149.333333 469.333333h45.173334l33.962666 164.138667c0.757333 3.381333 1.493333 7.850667 2.197334 13.418667z" fill="#F9F7F7" ></path></symbol><symbol id="ly-zip" viewBox="0 0 1024 1024"><path d="M219.424 18.304h530.272l201.152 219.424v768H219.424V18.304z" fill="#FFFFFF" ></path><path d="M733.696 253.728V50.304H251.424v923.424h667.424v-720h-185.152z m217.152-16v768H219.424V18.304h530.272l201.152 219.424z m-58.08-16l-127.04-138.624v138.624h127.04z" fill="#465F78" ></path><path d="M64 288a32 32 0 0 1 32-32h448a32 32 0 0 1 32 32v448a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V288zM640 416h224v37.344h-224V416zM640 509.344h224v37.312h-224v-37.312zM640 602.656h224V640h-224v-37.344z" fill="#EDC314" ></path><path d="M224.288 663.264v-35.04l139.36-195.52H224V384h213.824v35.04l-139.52 195.552h139.776v48.672H224.32z" fill="#FFFFFF" ></path></symbol><symbol id="ly-arrow-down" viewBox="0 0 1024 1024"><path d="M512 716.288c-13.312 0-26.112-5.12-36.352-14.848l-307.2-307.2c-19.968-20.48-19.968-52.736 0-72.704s52.224-19.968 72.192 0l270.848 270.848 270.848-270.848c19.968-19.968 52.224-19.968 72.192 0s19.968 52.224 0 72.192l-307.2 307.2c-9.216 10.24-22.016 15.36-35.328 15.36z"  ></path></symbol><symbol id="ly-close" viewBox="0 0 1024 1024"><path d="M613.316 509.58l224.879-224.871c28.213-28.221 28.213-73.963 0-102.176-28.221-28.214-73.956-28.214-102.184 0l-224.87 224.863-224.872-224.863c-28.22-28.214-73.955-28.214-102.183 0-28.214 28.213-28.214 73.962 0 102.176l224.871 224.87-224.871 224.879c-28.214 28.22-28.214 73.962 0 102.183a72.048 72.048 0 0 0 51.088 21.162 72.048 72.048 0 0 0 51.088-21.162l224.871-224.878L736.011 836.64a72.048 72.048 0 0 0 51.088 21.162 72.033 72.033 0 0 0 51.088-21.162c28.214-28.22 28.214-73.962 0-102.183L613.317 509.58z"  ></path></symbol><symbol id="ly-file-audio-o" viewBox="0 0 1024 1024"><path d="M912 217.142857q16 16 27.428571 43.428572t11.428572 50.285714v658.285714q0 22.857143-16 38.857143t-38.857143 16H128q-22.857143 0-38.857143-16t-16-38.857143V54.857143q0-22.857143 16-38.857143t38.857143-16h512q22.857143 0 50.285714 11.428571t43.428572 27.428572z m-253.714286-139.428571v214.857143h214.857143q-5.714286-16.571429-12.571428-23.428572l-178.857143-178.857143q-6.857143-6.857143-23.428572-12.571428z m219.428572 873.142857V365.714286h-237.714286q-22.857143 0-38.857143-16t-16-38.857143V73.142857H146.285714v877.714286h731.428572zM427.428571 485.714286q11.428571 4.571429 11.428572 17.142857v310.857143q0 12.571429-11.428572 17.142857-4.571429 1.142857-6.857142 1.142857-6.857143 0-13.142858-5.142857l-94.857142-95.428572H237.714286q-8 0-13.142857-5.142857t-5.142858-13.142857v-109.714286q0-8 5.142858-13.142857t13.142857-5.142857h74.857143l94.857142-95.428571q9.142857-8.571429 20-4z m238.285715 393.714285q17.714286 0 28.571428-13.714285 73.714286-90.857143 73.714286-207.428572t-73.714286-207.428571q-9.142857-12-24.571428-13.714286t-26.857143 8q-12 9.714286-13.428572 24.857143T637.714286 497.142857q57.142857 70.285714 57.142857 161.142857t-57.142857 161.142857q-9.714286 12-8.285715 27.142858t13.428572 24.285714q10.285714 8.571429 22.857143 8.571428z m-120.571429-84.571428q15.428571 0 26.857143-11.428572 49.714286-53.142857 49.714286-125.142857t-49.714286-125.142857q-10.285714-10.857143-25.714286-11.428571t-26.285714 9.714285-11.428571 25.428572 10.285714 26.571428q29.714286 32.571429 29.714286 74.857143t-29.714286 74.857143q-10.857143 11.428571-10.285714 26.571429t11.428571 25.428571q11.428571 9.714286 25.142857 9.714286z"  ></path></symbol><symbol id="ly-audio" viewBox="0 0 1024 1024"><path d="M634.5 60.7h-419c-19.8 0-38.7 7.8-52.7 21.8C149.3 96 141 114.6 141 135.2v745.2c0 19.8 7.8 38.7 21.8 52.7s32.9 21.9 52.7 21.8h596.1c19.8 0 38.7-7.8 52.7-21.8 13.5-13.5 21.8-32.1 21.8-52.7l0.1-581.6L634.5 60.7z m-9.1 94.1l137 129.4h-137V154.8z m186.3 725.6H215.5V135.2h335.3v186.3c0 9.9 3.9 19.4 10.9 26.4s16.5 10.9 26.4 10.9h223.6v521.6z"  ></path><path d="M452 551v149.9s-10.2-7-33.2-3.7c-34 4.9-61 30.7-61 57.8 0 27 27.4 43.8 61 38.9 33.6-4.9 58.6-29.9 58.6-56.9V592.3c0-11.9 14.3-17.2 14.3-17.2l125.7-39.3s13.9-4.5 13.9 8.2v119.6s-12.7-7.4-35.6-4.5c-33.6 4.1-61 29.5-61 56.5s27.4 44.2 61 40.1c33.6-4.1 61-29.5 61-56.5V489.5c-0.4-17.2-14.3-27-31.5-22.1l-142.1 43.4c-17.2 5-31.1 23-31.1 40.2z"  ></path></symbol><symbol id="ly-play" viewBox="0 0 1024 1024"><path d="M512 853.333333c-187.733333 0-341.333333-153.6-341.333333-341.333333s153.6-341.333333 341.333333-341.333333 341.333333 153.6 341.333333 341.333333-153.6 341.333333-341.333333 341.333333z m0-85.333333c140.8 0 256-115.2 256-256s-115.2-256-256-256-256 115.2-256 256 115.2 256 256 256z m128-256l-213.333333 128V384l213.333333 128z"  ></path></symbol><symbol id="ly-caret-down" viewBox="0 0 1024 1024"><path d="M804.56 402.272q0 14.848-10.848 25.728l-256 256q-10.848 10.848-25.728 10.848t-25.728-10.848l-256-256q-10.848-10.848-10.848-25.728t10.848-25.728 25.728-10.848l512 0q14.848 0 25.728 10.848t10.848 25.728z"  ></path></symbol><symbol id="ly-radio-check" viewBox="0 0 1024 1024"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m193.5 301.7l-210.6 292c-12.7 17.7-39 17.7-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"  ></path></symbol><symbol id="ly-multiple-full" viewBox="0 0 1024 1024"><path d="M790.754133 93.866667C867.733333 93.866667 930.133333 156.266667 930.133333 233.245867v557.508266C930.133333 867.733333 867.733333 930.133333 790.754133 930.133333H233.245867C156.266667 930.133333 93.866667 867.733333 93.866667 790.754133V233.245867C93.866667 156.266667 156.266667 93.866667 233.245867 93.866667h557.508266zM473.6 595.477333L296.2176 418.094933a40.533333 40.533333 0 1 0-57.322667 57.322667l205.154134 205.154133a40.695467 40.695467 0 0 0 6.656 5.3888c15.799467 10.961067 37.653333 9.403733 51.733333-4.676266l304.712533-304.712534a40.533333 40.533333 0 1 0-57.322666-57.322666L473.6 595.477333z"  ></path></symbol><symbol id="ly-multiple-empty" viewBox="0 0 1024 1024"><path d="M857.6 960.2H168.4c-57 0-103.4-46.4-103.4-103.4V167.6c0-57 46.4-103.4 103.4-103.4h689.2c57 0 103.4 46.4 103.4 103.4v689.2c0 57-46.4 103.4-103.4 103.4zM168.4 133.1c-19 0-34.5 15.5-34.5 34.5v689.2c0 19 15.5 34.5 34.5 34.5h689.2c19 0 34.5-15.4 34.5-34.5V167.6c0-19-15.4-34.5-34.5-34.5H168.4z"  ></path></symbol><symbol id="ly-calendar" viewBox="0 0 1024 1024"><path d="M874.7 847.06c0 30.74-25.15 55.89-55.89 55.89H204.49c-31.24 0-55.89-25.15-55.89-55.89V360.19h726.1V304.3h-726v-71.66c0-30.74 24.55-55.89 55.89-55.89h111.68v27.95c0 15.67 12.28 27.94 27.95 27.94 15.07 0 27.95-12.28 27.95-27.94v-27.95h279.26v27.95c0 15.67 12.28 27.94 27.94 27.94 15.07 0 27.95-12.28 27.95-27.94v-27.95H819c30.74 0 55.89 25.15 55.89 55.89v614.42h-0.19z m-55.79-726.11H707.23V93c0-15.07-12.88-27.94-27.95-27.94-15.67 0-27.94 12.88-27.94 27.94v27.95H372.07V93c0-15.07-12.88-27.94-27.95-27.94-15.67 0-27.95 12.88-27.95 27.94v27.95H204.49c-61.98 0-111.69 50.3-111.69 111.68v614.32c0 61.98 49.7 111.68 111.69 111.68h614.32c61.48 0 111.68-49.7 111.68-111.68V232.64c0.11-61.38-50.2-111.69-111.58-111.69z"  ></path><path d="M672.69 664.61h94.52v92.62h-94.52v-92.62z m-208.2 0h94.52v92.62h-94.52v-92.62z m-208.2 0h94.52v92.62h-94.52v-92.62z m416.4-196.53h94.52v92.62h-94.52v-92.62z m-208.2 0h94.52v92.62h-94.52v-92.62z m-208.2 0h94.52v92.62h-94.52v-92.62z"  ></path></symbol><symbol id="ly-radio-empty" viewBox="0 0 1024 1024"><path d="M512 938.7C276.7 938.7 85.3 747.2 85.3 512S276.7 85.3 512 85.3 938.7 276.7 938.7 512 747.3 938.7 512 938.7z m0-768c-188.2 0-341.3 153.1-341.3 341.3S323.8 853.3 512 853.3 853.3 700.2 853.3 512 700.2 170.7 512 170.7z"  ></path></symbol><symbol id="ly-radio-full" viewBox="0 0 1024 1024"><path d="M512 938.7C276.7 938.7 85.3 747.2 85.3 512S276.7 85.3 512 85.3 938.7 276.7 938.7 512 747.3 938.7 512 938.7z m0-768c-188.2 0-341.3 153.1-341.3 341.3S323.8 853.3 512 853.3 853.3 700.2 853.3 512 700.2 170.7 512 170.7z"  ></path><path d="M512 512m-170.7 0a170.7 170.7 0 1 0 341.4 0 170.7 170.7 0 1 0-341.4 0Z"  ></path></symbol></svg>',(h=>{var t=(a=(a=document.getElementsByTagName("script"))[a.length-1]).getAttribute("data-injectcss"),a=a.getAttribute("data-disable-injectsvg");if(!a){var l,c,i,e,v,d=function(t,a){a.parentNode.insertBefore(t,a)};if(t&&!h.__iconfont__svg__cssinject__){h.__iconfont__svg__cssinject__=!0;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(t){console&&console.log(t)}}l=function(){var t,a=document.createElement("div");a.innerHTML=h._iconfont_svg_string_3997256,(a=a.getElementsByTagName("svg")[0])&&(a.setAttribute("aria-hidden","true"),a.style.position="absolute",a.style.width=0,a.style.height=0,a.style.overflow="hidden",a=a,(t=document.body).firstChild?d(a,t.firstChild):t.appendChild(a))},document.addEventListener?~["complete","loaded","interactive"].indexOf(document.readyState)?setTimeout(l,0):(c=function(){document.removeEventListener("DOMContentLoaded",c,!1),l()},document.addEventListener("DOMContentLoaded",c,!1)):document.attachEvent&&(i=l,e=h.document,v=!1,p(),e.onreadystatechange=function(){"complete"==e.readyState&&(e.onreadystatechange=null,o())})}function o(){v||(v=!0,i())}function p(){try{e.documentElement.doScroll("left")}catch(t){return void setTimeout(p,50)}o()}})(window);

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);


/**
 * 接口请求相关方法
 *
 * @author wang.xin
 * @exports Ajax
 */
const Ajax = {};

/**
 * 设置 XSS 过滤
 * @param {string | object | array} object 过滤对象
 * @param {object} rule 过滤规则
 */
Ajax.filterHTML = function (object, rule) {
    rule = rule || {
        whiteList: {
            a: ['href', 'target']
        },
        stripIgnoreTag: true, // 过滤所有非白名单中的 HTML，false 只对标签进行转义
        stripIgnoreBody: ['script'] // 过滤标签和内容
    };

    switch (Object.prototype.toString.call(object)) {
        case '[object String]':
            if (typeof filterCSS !== 'undefined') {
                // eslint-disable-next-line
                object = filterXSS(object, rule);
            }
            break;

        case '[object Object]':
            for (let key in object) {
                object[key] = this.filterHTML(object[key]);
            }
            break;

        case '[object Array]':
            for (let i = 0; i < object.length; i++) {
                object[i] = this.filterHTML(object[i]);
            }
            break;

        default:
            break;
    }

    return object;
};

/**
 * @description 原生封装请求
 * @param {object} opts 入参
 */
Ajax.req = function (opts) {
    if (opts) {
        // 参数设置
        let xhr = new XMLHttpRequest(),
            type = opts.type || 'post', // 请求方式
            url = opts.url || '', // 请求地址
            contentType = opts.contentType || 'application/x-www-form-urlencoded', // 请求参数的数据格式
            defer = opts.defer === undefined ? true : opts.defer, // 是否异步请求
            data = opts.data || {}, // 请求数据
            beforeSend = opts.beforeSend || (() => {}), // 请求之前的操作
            complete = opts.complete || (() => {}), // 请求结束的操作
            success = opts.success || (() => {}), // 请求成功的操作
            error = opts.error || (() => {}), // 请求失败的操作
            header = opts.header || {}; // 请求头

        // 设置超时
        if (_util__WEBPACK_IMPORTED_MODULE_0__["default"].type(opts.timeout) === 'number') {
            xhr.timeout = opts.timeout;
        }

        // 启动请求
        if (type.toUpperCase() === 'GET' && JSON.stringify(data) !== '{}') {
            xhr.open(type, `${url}?${new URLSearchParams(data).toString()}`, defer);
        } else {
            xhr.open(type, url, defer);
        }

        // 设置请求头
        if (contentType !== 'multipart/form-data') {
            xhr.setRequestHeader('content-Type', contentType);
        }

        // 添加请求头
        for (let key in header) {
            xhr.setRequestHeader(key, header[key]);
        }

        // 监听请求过程
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                let responseData = null;

                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                    try {
                        responseData = JSON.parse(xhr.responseText);
                    } catch (err) {
                        responseData = xhr.responseText;
                    }
                    success(responseData, xhr);
                } else {
                    error(responseData, xhr);
                }
                complete(responseData, xhr);
            }
        };

        // 发送请求
        let requestData = this.formatData(data, contentType); // 数据处理
        switch (requestData) {
            case '-1':
                console.log('data 格式不支持！');
                break;

            case '-2':
                console.log('contentType 格式不支持！');
                break;

            default: // 请求前操作
                beforeSend(xhr);
                xhr.send(requestData);
                break;
        }
    }
};

/**
 * @description 数据格式化
 * @param {object} data 数据
 * @param {object} contentType 数据格式
 */
Ajax.formatData = function (data, contentType) {
    let res = null,
        requestData = null;

    switch (contentType) {
        case 'application/x-www-form-urlencoded': // 表单请求
            requestData = [];
            if (Object.prototype.toString.call(data) === '[object Object]') {
                // 遍历数据，key 作为 name，data[key] 作为 value
                for (let key in data) {
                    switch (Object.prototype.toString.call(data[key])) {
                        case '[object Array]':
                            data[key].forEach((item) => {
                                requestData.push(encodeURIComponent(key) + '=' + encodeURIComponent(item));
                            });
                            break;

                        default:
                            requestData.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
                            break;
                    }
                }
                res = requestData.join('&'); // 用&拼接成字符串
            } else {
                res = -1;
            }
            break;

        case 'application/json': // json请求
            res = JSON.stringify(data);
            break;

        case 'multipart/form-data':
            requestData = new FormData();
            if (Object.prototype.toString.call(data) === '[object Object]') {
                for (let key in data) {
                    switch (Object.prototype.toString.call(data[key])) {
                        case '[object Array]':
                            data[key].forEach((item) => {
                                requestData.append(key, item);
                            });
                            break;

                        default:
                            requestData.append(key, data[key]);
                            break;
                    }
                }
            }
            res = requestData;
            break;

        default: // 其它请求
            res = -2;
            break;
    }

    return res;
};

/**
 * @description 参数格式化
 * @param {object} obj 参数
 * @return {object} res 指定对象
 */
Ajax.formatParam = function (obj) {
    let paramList = [
            'url',
            'data',
            'contentType',
            'defer',
            'type',
            'beforeSend',
            'complete',
            'success',
            'error',
            'timeout'
        ],
        res = null;

    if (obj.length !== 0) {
        switch (Object.prototype.toString.call(obj[0])) {
            case '[object String]': // 字符串
                res = {};
                for (let i = 0; i < obj.length; i++) {
                    res[paramList[i]] = obj[i];
                }
                break;

            case '[object Array]': // 数组
                res = {};
                for (let i = 0; i < obj[0].length; i++) {
                    res[paramList[i]] = obj[0][i];
                }
                break;

            case '[object Object]': // 对象
                res = obj[0];
                break;

            default:
                break;
        }
    }

    return res;
};

/**
 * @description 用Promise封装请求
 * 接受 string、object、array 形式的入参，最后统一根据 arguments 属性对入参进行处理
 */
Ajax.request = function () {
    let res = null,
        opts = this.formatParam(arguments),
        success = opts.success || (() => {}),
        error = opts.error || (() => {});

    if (Ajax.intercept != null) {
        if (typeof Ajax.intercept === 'function') {
            let response = Ajax.intercept(opts);
            if (response != null) {
                return new Promise((resolve) => {
                    resolve(response);
                });
            }
        } else if (opts.url in Ajax.intercept) {
            return new Promise((resolve) => {
                resolve(Ajax.intercept[opts.url](opts));
            });
        }
    }

    if (Object.prototype.toString.call(opts) === '[object Object]') {
        res = new Promise((resolve, reject) => {
            opts.success = function (data, xhr) {
                data = success(data, xhr) || data;
                resolve(data);
            };
            opts.error = function (data, xhr) {
                data = error(data, xhr) || data;
                reject(data);
            };
            this.req(opts);
        });
    }

    return res;
};

/**
 * @description 文件下载
 * 接受 string、object、array 形式的入参，最后统一根据 arguments 属性对入参进行处理
 */
Ajax.load = function () {
    let formNode = document.createElement('form'),
        opts = this.formatParam(arguments) || {},
        data = opts.data || {},
        htmlStr = '';

    for (let key in data) {
        switch (Object.prototype.toString.call(data[key])) {
            case '[object Array]':
                data[key].forEach((item) => {
                    if (typeof item === 'string' && item.includes("'")) {
                        htmlStr += `<input name='${key}' value="${item}"/>`;
                    } else {
                        htmlStr += `<input name='${key}' value='${item}'/>`;
                    }
                });
                break;

            default:
                if (typeof data[key] === 'string' && data[key].includes("'")) {
                    htmlStr += `<input name='${key}' value="${data[key]}"/>`;
                } else {
                    htmlStr += `<input name='${key}' value='${data[key]}'/>`;
                }
                break;
        }
    }
    formNode.innerHTML = htmlStr;
    formNode.setAttribute('action', opts.url);
    formNode.setAttribute('method', opts.type || 'post');
    document.body.appendChild(formNode);
    if (document.querySelector('iframe[name="loadError"]') == null) {
        let iframeNode = document.createElement('iframe');

        iframeNode.setAttribute('name', 'loadError');
        iframeNode.style.display = 'none';
        document.body.appendChild(iframeNode);
    }
    formNode.submit();
    formNode.remove();
};

/**
 * @description 文件上传
 * 接受 string、object、array 形式的入参，最后统一根据 arguments 属性对入参进行处理
 */
Ajax.upload = function () {
    let opts = this.formatParam(arguments) || {}; // 参数处理

    opts.contentType = 'multipart/form-data';
    return this.request(opts);
};

/**
 * 拦截请求，默认为 null，不拦截请求
 * 键 => 接口地址
 * 值 => 处理方法，参数是请求属性
 */
Ajax.intercept = null;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ajax);


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ajax_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _observe_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(14);
/* harmony import */ var _assets_img_loading_gif__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(16);
/* harmony import */ var _assets_img_loading_gif__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_assets_img_loading_gif__WEBPACK_IMPORTED_MODULE_2__);




/**
 * 常用工具方法
 * @author wang.xin
 * @exports Util
 */
let Util = {};

/**
 * 动画
 */
Util.animation = {
    node: (function () {
        if (typeof document !== 'undefined') {
            let container = document.createElement('div');

            container.style =
                'position: absolute; top: 0px; left: 0px; z-index: 99999; display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.03);';
            container.innerHTML = `<img src="${(_assets_img_loading_gif__WEBPACK_IMPORTED_MODULE_2___default())}" /></div>`;

            return container;
        }

        return null;
    })(),

    show() {
        document.body.appendChild(this.node);
    },

    hide() {
        this.node.remove();
    }
};

/**
 * 将 str-str-str 转换为strStrStr
 *
 * @param {String} str 字符串
 * @returns {String}
 */
Util.toLowerUpper = function (str) {
    return str.replace(/(^-*)|(-*$)/g, '').replace(/-([a-z0-9])/g, (item, elem) => elem.toUpperCase());
};

/**
 * 将目标对象转换为数组
 *
 * @param {Object} obj 目标对象
 * @returns {Array}
 */
Util.toArray = function (obj) {
    let res = [];

    if (Util.isArrayLike(obj)) {
        let i = 0,
            len = obj.length;

        for (; i < len; i++) {
            res.push(obj[i]);
        }
    }

    return res;
};

/**
 * @description 比较两个对象内容是否相等
 * @param {Object} obj1 对象1
 * @param {Object} obj2 对象2
 * @param {String[]} exclusion 不需要匹配的字段
 * @returns {Boolean}
 */
Util.compare = function (obj1, obj2, exclusion = []) {
    let res = true;

    if (Object.prototype.toString.call(obj1) === Object.prototype.toString.call(obj2)) {
        switch (Object.prototype.toString.call(obj1)) {
            case '[object Object]':
                if (Object.keys(obj1).length !== Object.keys(obj2).length) {
                    res = false;
                } else {
                    for (let key in obj1) {
                        if (exclusion.includes(key)) {
                            continue;
                        }

                        if (!Util.compare(obj1[key], obj2[key])) {
                            res = false;
                            break;
                        }
                    }
                }
                break;

            case '[object Array]':
                if (obj1.length !== obj2.length) {
                    res = false;
                } else {
                    for (let i = 0; i < obj1.length; i++) {
                        if (!Util.compare(obj1[i], obj2[i])) {
                            res = false;
                            break;
                        }
                    }
                }
                break;

            default:
                res = obj1 === obj2;
                break;
        }
    } else {
        res = false;
    }

    return res;
};

/**
 * @description 获取简易类型名称
 * @param {String} name 类名
 * @returns {String}
 */
Util.class2type = function (name) {
    return {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regexp',
        '[object Object]': 'object',
        '[object Error]': 'error',
        '[object Symbol]': 'symbol'
    }[name];
};

/**
 * @description 获取数据类型
 * @param {*} obj 对象
 * @returns {String}
 */
Util.type = function (obj) {
    if (obj == null) {
        return obj + '';
    }

    return typeof obj === 'object' || typeof obj === 'function'
        ? Util.class2type(toString.call(obj)) || 'object'
        : typeof obj;
};

/**
 * @description 判断是否是函数
 * @param {*} obj 对象
 * @returns {Boolean}
 */
Util.isFunction = function (obj) {
    return typeof obj === 'function' && typeof obj.nodeType !== 'number' && typeof obj.item !== 'function';
};

/**
 * @description 判断是否是window
 * @param {*} obj 对象
 * @returns {Boolean}
 */
Util.isWindow = function (obj) {
    return obj != null && obj === obj.window;
};

/**
 * @description 判断是否是类数组
 * @param {*} obj 对象
 * @returns {Boolean}
 */
Util.isArrayLike = function (obj) {
    if (typeof obj !== 'object') {
        return false;
    }

    let length = !!obj && 'length' in obj && obj.length,
        type = Util.class2type(toString.call(obj));

    if (Util.isFunction(obj) || Util.isWindow(obj)) {
        return false;
    }

    return type === 'array' || length === 0 || (typeof length === 'number' && length > 0 && length - 1 in obj);
};

/**
 * @description 重新封装请求
 * 接受 String、Object、Array 形式的入参，最后统一根据 arguments 属性对入参进行处理
 */
Util.request = (function () {
    let requestCount = 0;

    return function () {
        let opts = _ajax_js__WEBPACK_IMPORTED_MODULE_0__["default"].formatParam(arguments) || {}, // 参数处理
            complete = opts.complete || (() => {}), // 缓存用户自定的 complete 属性
            filter = opts.filter === undefined ? true : opts.filter, // 是否进行 XSS 过滤【true 过滤，false 不过滤，默认为过滤】
            filterRule = opts.filterRule || null, // XSS 过滤规则
            icon = opts.icon === undefined ? true : opts.icon; // 是否显示加载图标【true 显示，false 不显示，默认为显示】

        // XSS 过滤
        if (filter === true) {
            opts.data = _ajax_js__WEBPACK_IMPORTED_MODULE_0__["default"].filterHTML(opts.data, filterRule);
        }

        // 显示请求动画
        if (icon === true) {
            Util.animation.show();
        }

        // 请求结束
        opts.complete = function (data, xhr) {
            complete(data, xhr); // 用户自定操作

            // 数据过滤
            if (filter === true) {
                _ajax_js__WEBPACK_IMPORTED_MODULE_0__["default"].filterHTML(data, filterRule);
            }

            // 关闭请求动画
            if (--requestCount === 0) {
                Util.animation.hide();
            }
        };

        requestCount++; // 请求加1

        return _ajax_js__WEBPACK_IMPORTED_MODULE_0__["default"].request(opts);
    };
})();

/**
 * @description 创建监听器
 * @param {Object | Array | Function} target 监听对象
 * @param {String} property 属性名
 * @param {Function | Object} callback 回调函数
 * @param {*} value 值
 * @param {Boolean} immediate 是否在初始化的时候，执行回调函数，默认不执行
 * @param {Number} delay 延迟时间，单位毫秒，防抖操作，-1代表不进行防抖操作
 * @param {Boolean} isModifiable 是否可以改变数据类型
 * @param {Boolean} deep 是否进行深度监听
 * @return {Proxy}
 */
Util.monitor = function (target, property, callback, value, immediate, delay, isModifiable, deep) {
    if (arguments.length === 1) {
        return new _observe_js__WEBPACK_IMPORTED_MODULE_1__["default"](...arguments).watcher;
    } else {
        return new _observe_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
            target,
            property,
            callback,
            value,
            immediate,
            delay,
            isModifiable,
            deep
        }).watcher;
    }
};

/**
 * @description 全屏
 * @param {DOM} element DOM元素
 */
Util.toFullScreen = function (element) {
    element = element || document.body;

    let fullScreen =
        element.requestFullscreen ||
        element.mozRequestFullScreen ||
        element.msRequestFullscreen ||
        element.webkitRequestFullscreen;

    fullScreen.call(element);
};

/**
 * @description 退出全屏
 */
Util.exitFullScreen = function () {
    let exitFullScreen =
        document.exitFullscreen ||
        document.mozCancelFullScreen ||
        document.msExitFullscreen ||
        document.webkitExitFullscreen;

    exitFullScreen.call(document);
};

/**
 * @description 防抖，该函数会从上一次被调用后，延迟 wait 毫秒后调用 callback
 * @param {Function} callback 回调函数
 * @param {Number} time 时间间隔
 */
Util.debounce = function (callback, time) {
    let timeId = null;

    return function () {
        timeId !== null && clearTimeout(timeId);
        timeId = setTimeout(() => {
            callback.apply(this, arguments);
            timeId = null;
        }, time);
    };
};

/**
 * @description
 * 节流，在 wait 毫秒内最多执行 callback 一次<br/>
 * 1. 在函数需要频繁触发时，函数执行一次后，只有大于设定的执行周期后才会执行第二次。<br/>
 * 2. 适合多次事件按时间做平均分配。<br/>
 * 场景：<br/>
 * 1. 窗口调整；<br/>
 * 2. 页面滚动；<br/>
 * 3. DOM元素的拖拽功能实现；<br/>
 * 4. 抢购疯狂点击<br/>
 * @param {Function} callback 回调函数
 * @param {Number} wait 时间间隔
 */
Util.throttle = function (callback, wait) {
    let start = 0;

    return function (e) {
        let now = Date.now();

        if (now - start >= wait) {
            callback.call(this, e);
            start = now;
        }
    };
};

/**
 * @description 深拷贝
 * @param {*} target 拷贝对象
 * @param {Map} [map=new Map()] 缓存
 * @return {*} 拷贝结果
 */
Util.deepClone = function (target, map = new Map()) {
    // 检测数据类型
    if (typeof target === 'object' && target != null) {
        // 设置缓存，避免出现循环嵌套
        let cache = map.get(target);
        if (cache) {
            return cache;
        }

        const result = Array.isArray(target) ? [] : {};
        map.set(target, result);
        if (Array.isArray(target)) {
            target.forEach((item, index) => {
                result[index] = Util.deepClone(item, map);
            });
        } else {
            Object.keys(target).forEach((key) => {
                result[key] = Util.deepClone(target[key], map);
            });
        }

        return result;
    } else {
        return target;
    }
};

/**
 * @description 将 Proxy 转为 JSON
 * @param {Proxy} proxy 代理对象
 * @return {JSON}
 */
Util.proxyToJSON = function (proxy) {
    return JSON.parse(JSON.stringify(proxy));
};

/**
 * @description 在 condition 为 true 的情况下，执行定时任务，否则进入下一次等待
 * @param {Function} callback 回调函数
 * @param {Number} timeout 时间间隔
 * @param {Function} condition 条件
 * @return {Number} 定时器ID
 */
Util.setTimeout = function (callback, timeout, condition) {
    condition = condition || (() => true);
    let fn = () => setTimeout(() => (condition() ? callback() : fn()), timeout);
    return fn();
};

/**
 * @description 计算表达式的值，对原生eval()进行扩展
 * @param {string} code 表达式
 */
Util.eval = function (code) {
    try {
        code = eval(code);
    } catch (err) {
        code = code;
    }
    return code;
};

/**
 * 计算字符串长度
 */
Util.calStringLength = function (str) {
    str = String(str);
    let length = 0;

    for (let i = 0; i < str.length; i++) {
        let code = str.charCodeAt(i);
        if ((code >= 0 && code <= 255) || (code >= 0xff61 && code <= 0xff9f)) {
            // 非中文字符
            length++;
        } else {
            length += 2;
        }
    }

    return length;
};

/**
 * 图片转base64
 * @param {File | string} file 文件
 */
function convertImageToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        if (typeof file === 'string') {
            // 字符串
            const image = new Image();
            image.onload = function () {
                reader.onloadend = function () {
                    resolve(reader.result);
                };
                reader.onerror = reject;
                reader.readAsDataURL(image);
            };
            image.src = file; // 替换为图片的URL或者base64字符串
        } else {
            reader.onloadend = function () {
                resolve(reader.result);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        }
    });
}
Util.convertImageToBase64 = convertImageToBase64;

/**
 * 加密
 * @param {Object|String} code 明文
 * @returns {String}
 */
Util.encode = function (code) {
    try {
        code = JSON.stringify(code);
    } catch (err) {
        console.log(err);
    }

    return btoa(encodeURIComponent(code));
};

/**
 * 解密
 * @param {String} code 密文
 * @returns {String}
 */
Util.decode = function (code) {
    let result = decodeURIComponent(atob(code));

    try {
        result = JSON.parse(result);
    } catch (err) {
        console.log(err);
    }

    return result;
};

/**
 * 更新 URL 的查询参数
 * @param {String} [key='params'] 键
 * @param {Object|String} value 值
 * @param {Function} [encode] 加密方式
 * @returns {Object}
 */
Util.updateURLSearchParams = function (key = 'params', value, encode) {
    if (arguments.length < 2 || typeof key !== 'string') {
        console.warn('updateURLSearchParams 入参不符合规则！');
        return;
    }

    let url = new URL(window.location);
    if (typeof encode === 'function') {
        value = encode(value);
    } else {
        try {
            value = JSON.stringify(value);
        } catch (err) {
            console.log(err);
        }
    }
    url.searchParams.set(key, value);
    window.history.pushState({}, '', url);

    return { key, value };
};

/**
 * 获取 URL 的查询参数值
 * @param {String} [key='params'] 键
 * @param {Function} [decode] 解密方式
 * @returns {object|String}
 */
Util.getURLSearchParams = function (key = 'params', decode) {
    let value = new URL(window.location).searchParams.get(key);

    if (value == null) {
        return;
    }

    if (typeof decode === 'function') {
        return decode(value);
    } else {
        try {
            value = JSON.parse(value);
        } catch (err) {
            console.log(err);
        }
    }

    return value;
};

/**
 * 获取浏览器信息
 */
Util.getBrowserInfo = function () {
    let browserList = ['Edg', 'Chrome', 'Firefox'],
        browserInfo = null;

    for (let i = 0; i < browserList.length; i++) {
        let reg = new RegExp(`${browserList[i]}/([\\d]*)`, 'gi'),
            result = reg.exec(window.navigator.userAgent);

        if (result) {
            browserInfo = {
                name: browserList[i],
                version: result[i]
            };
            break;
        }
    }
    return browserInfo;
};

/**
 * 转换数值
 */
Util.transformNumber = (number) => {
    let result = null;
    try {
        // eslint-disable-next-line
        result = number < Number.MAX_SAFE_INTEGER ? Number(number) : BigInt(number);
    } catch (err) {
        // 转换失败
    }
    return result;
};

/**
 * 获取最大值
 */
Util.max = function (...numbers) {
    if (numbers.length === 0) {
        return null;
    }

    if (typeof BigInt === 'undefined') {
        return Math.max(...numbers);
    }

    return numbers.reduce((res, elem) => {
        let next = Util.transformNumber(elem);
        if (res === null || next === null) {
            return res || next;
        }
        return res > next ? res : next;
    }, Util.transformNumber(numbers[0]));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Util);


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* harmony import */ var _event_bus_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15);



/**
 * 监听器
 *
 * @author wang.xin
 */
class Observe {
    /**
     * Creates an instance of Observe.
     * @param {object} params
     * @param {object | array | function} params.target 监听对象
     * @param {string} params.property 属性
     * @param {function | object} params.callback 回调函数或回调函数集合
     * @param {*} params.value 值
     * @param {boolean} params.immediate 是否在初始化的时候，执行回调函数，默认不执行
     * @param {number} params.delay 延迟时间，单位毫秒，防抖操作，-1代表不进行防抖操作
     * @param {boolean} params.isModifiable 是否可以改变数据类型
     * @param {boolean} params.deep 是否进行深度监听
     */
    constructor(params = {}) {
        Object.defineProperty(this, '_data', {
            enumerable: false,
            value: {}
        }); // 数据仓库
        this.eventBus = new _event_bus_js__WEBPACK_IMPORTED_MODULE_1__["default"](false); // 事件总线
        this.watcher = null; // 监听器
        this.immediate = params.immediate === true;
        this.delay = params.delay || -1;
        this.isModifiable = params.isModifiable !== false;
        this.deep = params.deep === true;
        this.create(params);
    }

    /**
     * 构建watcher
     */
    create(params) {
        let { target, callback } = params;

        switch (_util_js__WEBPACK_IMPORTED_MODULE_0__["default"].type(target)) {
            case 'array': // 数组
                this.watcher = this.proxyArray(target, callback);
                break;

            case 'object': // 对象
            case 'function': // 函数
                this.watcher = this.defineObject(params);
                break;

            default:
                break;
        }
    }

    /**
     * 采用 Object.defineProperty 监听对象
     * @param {object} params
     * @param {object | function} params.target 监听对象
     * @param {function} params.callback 回调函数
     * @param {*} params.value 初始值
     * @param {boolean} [params.deep=false] 是否深度监听
     */
    defineObject(params) {
        let self = this,
            { target, property, callback = {}, value, deep = false } = params;

        if (property === undefined) {
            // 针对 target 进行监听，此时 callback 是个 map
            for (let prop in target) {
                this.defineObject({
                    target,
                    property: prop,
                    callback: callback[prop],
                    value: target[prop],
                    deep
                });
            }
        } else if (_util_js__WEBPACK_IMPORTED_MODULE_0__["default"].type(property) === 'object') {
            // 针对 target 进行监听，此时 property 是个 map
            for (let prop in property) {
                this.defineObject({
                    target,
                    property: prop,
                    callback: callback[prop],
                    value: property[prop],
                    deep
                });
            }
        } else {
            // 针对 target[property] 进行监听
            value = value !== undefined ? value : target[property];
            self._data[property] = value; // 缓存初始值
            let type = _util_js__WEBPACK_IMPORTED_MODULE_0__["default"].type(value);

            Object.defineProperty(target, property, {
                configurable: true,
                enumerable: true,
                get() {
                    return self._data[property];
                },
                set(value) {
                    if (_util_js__WEBPACK_IMPORTED_MODULE_0__["default"].type(value) === type || self.isModifiable) {
                        let oldValue = self._data[property];
                        self._data[property] = value;
                        self.eventBus.emit(property, value, oldValue);

                        // 判断是否需要进行深度监听
                        if (self.deep && deep) {
                            // 当赋值为 Array | Object | Function 时，需要进一步注册事件
                            if (_util_js__WEBPACK_IMPORTED_MODULE_0__["default"].type(value) === 'array') {
                                self._data[property] = self.proxyArray(value, callback[property], property);
                            } else if (['object', 'function'].includes(_util_js__WEBPACK_IMPORTED_MODULE_0__["default"].type(value))) {
                                self._data[property] = self.proxyObject(value, callback[property], property);
                            }
                        }
                    } else {
                        console.log(
                            `属性【${property}】：初始类型【${type}】，赋值类型【${_util_js__WEBPACK_IMPORTED_MODULE_0__["default"].type(value)}，修改无效！`
                        );
                    }
                }
            });
            target[property] = value; // 执行一次 set()

            this.addCallback(property, callback, target);
        }
        return target;
    }

    /**
     * 采用 Proxy 监听数组
     * @param {array} target 监听对象
     * @param {function} callback 数据发生改变后的回调函数
     * @param {string} eventName 事件名称
     * @return {Proxy}
     */
    proxyArray(target, callback, eventName) {
        let self = this,
            proxy = null,
            name = eventName || 'change',
            methods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];

        proxy = new Proxy(target, {
            set(t, p, v, r) {
                // 当修改的是方法，直接赋值返回，不触发响应
                if (methods.includes(p)) {
                    return Reflect.set(t, p, v, r);
                }

                // 当监听对象是对象 A 的属性时，返回的对象 A 改变前后的值，否则返回自身改变前后的值
                let value = self._data[name] || t,
                    value1 = _util_js__WEBPACK_IMPORTED_MODULE_0__["default"].proxyToJSON(value),
                    res = Reflect.set(t, p, v, r),
                    value2 = _util_js__WEBPACK_IMPORTED_MODULE_0__["default"].proxyToJSON(value);

                self.eventBus.emit(name, value2, value1);
                return res;
            }
        });
        this.monitorMethodsOfArray(methods, proxy, name);

        // 添加监听事件
        if (!eventName) {
            this.addCallback(name, callback, proxy);
            this.immediate && this.eventBus.emit(name, target);
        }

        return proxy;
    }

    /**
     * 采用 Proxy 监听对象
     * @param {object | function} target 监听对象
     * @param {function} callback 数据发生改变后的回调函数
     * @param {string} eventName 事件名称
     * @return {Proxy}
     */
    proxyObject(target, callback, eventName) {
        let self = this,
            proxy = null,
            name = eventName || 'change';

        proxy = new Proxy(target, {
            set(t, p, v, r) {
                // 当监听对象是对象 A 的属性时，返回的对象 A 改变前后的值，否则返回自身改变前后的值
                let value = self._data[name] || t,
                    type1 = _util_js__WEBPACK_IMPORTED_MODULE_0__["default"].type(t[p]),
                    type2 = _util_js__WEBPACK_IMPORTED_MODULE_0__["default"].type(v),
                    proxyValue = v;

                if (type1 === type2 || self.isModifiable) {
                    // 当赋值为 Array | Object | Function 时，需要进一步注册事件
                    if (_util_js__WEBPACK_IMPORTED_MODULE_0__["default"].type(proxyValue) === 'array') {
                        proxyValue = self.proxyArray(proxyValue, callback, name);
                    } else if (['object', 'function'].includes(_util_js__WEBPACK_IMPORTED_MODULE_0__["default"].type(proxyValue))) {
                        proxyValue = self.proxyObject(proxyValue, callback, name);
                    }

                    let value1 = _util_js__WEBPACK_IMPORTED_MODULE_0__["default"].proxyToJSON(value),
                        res = Reflect.set(t, p, proxyValue, r),
                        value2 = _util_js__WEBPACK_IMPORTED_MODULE_0__["default"].proxyToJSON(value);

                    self.eventBus.emit(name, value2, value1);
                    return res;
                }

                console.log(`属性【${p}】：初始类型【${type1}】，赋值类型【${type2}】，修改无效！`);
                return false;
            }
        });

        for (let prop in target) {
            if (_util_js__WEBPACK_IMPORTED_MODULE_0__["default"].type(target[prop]) === 'array') {
                target[prop] = this.proxyArray(target[prop], callback, name);
            } else if (['object', 'function'].includes(_util_js__WEBPACK_IMPORTED_MODULE_0__["default"].type(target[prop]))) {
                target[prop] = this.proxyObject(target[prop], callback, name);
            }
        }

        // 添加监听事件
        if (!eventName) {
            this.addCallback(name, callback, proxy);
            this.immediate && this.eventBus.emit(name, target);
        }

        return proxy;
    }

    /**
     * 往事件总线中注册事件，且在 delay 毫秒内，回调函数只会执行一次。
     * @param {string} eventName 事件名称
     * @param {function} callback 回调函数
     * @param {object | array | function} target 回调函数绑定对象
     */
    addCallback(eventName, callback, target) {
        if (_util_js__WEBPACK_IMPORTED_MODULE_0__["default"].type(callback) === 'function') {
            if (this.delay !== -1) {
                this.eventBus.on(eventName, _util_js__WEBPACK_IMPORTED_MODULE_0__["default"].debounce(callback, this.delay).bind(target));
            } else {
                this.eventBus.on(eventName, callback.bind(target));
            }
        }
    }

    /**
     * 监听数组的方法
     * @param {string[]} methods 需要监听的方法列表
     * @param {Proxy} proxy 代理对象
     * @param {string} name 属性名称
     */
    monitorMethodsOfArray(methods, proxy, name) {
        let self = this;

        methods.forEach((method) => {
            if (proxy.hasOwnProperty(method)) {
                return;
            }

            Object.defineProperty(proxy, method, {
                configurable: false,
                enumerable: false,
                value: new Proxy(proxy.__proto__[method], {
                    apply(target, thisArg, arrArray) {
                        if (self.watcher[name] == null) {
                            // 当属性值为null的时候不需要重写
                            return Reflect.apply(...arguments);
                        }

                        let result = _util_js__WEBPACK_IMPORTED_MODULE_0__["default"].proxyToJSON(self.watcher[name]);
                        if (typeof result[method] !== 'function') {
                            return;
                        }

                        result[method](...arrArray);
                        self.watcher[name] = result;
                    }
                })
            });
        });
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Observe);


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * 事件总线
 * @author wang.xin
 */
class EventBus {
    /**
     * Creates an instance of EventBus.
     * @param {Boolean} [single=true] 是否创建新的时间事件总线，true为否，false为创建新的
     */
    constructor(single = true) {
        if (single) {
            if (EventBus.instance != null) {
                return EventBus.instance;
            }
            EventBus.instance = this;
        }
        this.map = new Map();
    }

    /**
     * @description 订阅事件
     * @param {*} fn
     * @param {*} handle
     */
    on(fn, handle) {
        if (!this.map.has(fn)) {
            this.map.set(fn, []);
        }
        typeof handle === 'function' && this.map.get(fn).push(handle);
    }

    /**
     * @description 取消订阅
     * @param {*} fn
     * @param {*} handle
     */
    off(fn, handle) {
        if (Array.isArray(fn)) {
            fn.forEach((fnItem) => this.off(fnItem));
            return;
        }

        if (this.map.has(fn)) {
            if (handle) {
                let list = this.map.get(fn);
                list.splice(list.indexOf(handle), 1);
            } else {
                this.map.delete(fn);
            }
        }
    }

    /**
     * @description 触发事件
     * @param {*} fn
     * @param  {...any} arg
     */
    emit(fn, ...arg) {
        if (Array.isArray(fn)) {
            fn.forEach((fnItem) => this.emit(fnItem, ...arg));
            return;
        }

        if (this.map.has(fn)) {
            this.map.get(fn).forEach((elem) => {
                elem(...arg);
            });
        }
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EventBus);


/***/ }),
/* 16 */
/***/ ((module) => {

module.exports = "data:image/gif;base64,R0lGODlhIAAgALMAAP///7Ozs/v7+9bW1uHh4fLy8rq6uoGBgTQ0NAEBARsbG8TExJeXl/39/VRUVAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFBQAAACwAAAAAIAAgAAAE5xDISSlLrOrNp0pKNRCdFhxVolJLEJQUoSgOpSYT4RowNSsvyW1icA16k8MMMRkCBjskBTFDAZyuAEkqCfxIQ2hgQRFvAQEEIjNxVDW6XNE4YagRjuBCwe60smQUDnd4Rz1ZAQZnFAGDd0hihh12CEE9kjAEVlycXIg7BAsMB6SlnJ87paqbSKiKoqusnbMdmDC2tXQlkUhziYtyWTxIfy6BE8WJt5YEvpJivxNaGmLHT0VnOgGYf0dZXS7APdpB309RnHOG5gDqXGLDaC457D1zZ/V/nmOM82XiHQjYKhKP1oZmADdEAAAh+QQFBQAAACwAAAAAGAAXAAAEchDISasKNeuJFKoHs4mUYlJIkmjIV54Soypsa0wmLSnqoTEtBw52mG0AjhYpBxioEqRNy8V0qFzNw+GGwlJki4lBqx1IBgjMkRIghwjrzcDti2/Gh7D9qN774wQGAYOEfwCChIV/gYmDho+QkZKTR3p7EQAh+QQFBQAAACwBAAAAHQAOAAAEchDISWdANesNHHJZwE2DUSEo5SjKKB2HOKGYFLD1CB/DnEoIlkti2PlyuKGEATMBaAACSyGbEDYD4zN1YIEmh0SCQQgYehNmTNNaKsQJXmBuuEYPi9ECAU/UFnNzeUp9VBQEBoFOLmFxWHNoQw6RWEocEQAh+QQFBQAAACwHAAAAGQARAAAEaRDICdZZNOvNDsvfBhBDdpwZgohBgE3nQaki0AYEjEqOGmqDlkEnAzBUjhrA0CoBYhLVSkm4SaAAWkahCFAWTU0A4RxzFWJnzXFWJJWb9pTihRu5dvghl+/7NQmBggo/fYKHCX8AiAmEEQAh+QQFBQAAACwOAAAAEgAYAAAEZXCwAaq9ODAMDOUAI17McYDhWA3mCYpb1RooXBktmsbt944BU6zCQCBQiwPB4jAihiCK86irTB20qvWp7Xq/FYV4TNWNz4oqWoEIgL0HX/eQSLi69boCikTkE2VVDAp5d1p0CW4RACH5BAUFAAAALA4AAAASAB4AAASAkBgCqr3YBIMXvkEIMsxXhcFFpiZqBaTXisBClibgAnd+ijYGq2I4HAamwXBgNHJ8BEbzgPNNjz7LwpnFDLvgLGJMdnw/5DRCrHaE3xbKm6FQwOt1xDnpwCvcJgcJMgEIeCYOCQlrF4YmBIoJVV2CCXZvCooHbwGRcAiKcmFUJhEAIfkEBQUAAAAsDwABABEAHwAABHsQyAkGoRivELInnOFlBjeM1BCiFBdcbMUtKQdTN0CUJru5NJQrYMh5VIFTTKJcOj2HqJQRhEqvqGuU+uw6AwgEwxkOO55lxIihoDjKY8pBoThPxmpAYi+hKzoeewkTdHkZghMIdCOIhIuHfBMOjxiNLR4KCW1ODAlxSxEAIfkEBQUAAAAsCAAOABgAEgAABGwQyEkrCDgbYvvMoOF5ILaNaIoGKroch9hacD3MFMHUBzMHiBtgwJMBFolDB4GoGGBCACKRcAAUWAmzOWJQExysQsJgWj0KqvKalTiYPhp1LBFTtp10Is6mT5gdVFx1bRN8FTsVCAqDOB9+KhEAIfkEBQUAAAAsAgASAB0ADgAABHgQyEmrBePS4bQdQZBdR5IcHmWEgUFQgWKaKbWwwSIhc4LonsXhBSCsQoOSScGQDJiWwOHQnAxWBIYJNXEoFCiEWDI9jCzESey7GwMM5doEwW4jJoypQQ743u1WcTV0CgFzbhJ5XClfHYd/EwZnHoYVDgiOfHKQNREAIfkEBQUAAAAsAAAPABkAEQAABGeQqUQruDjrW3vaYCZ5X2ie6EkcKaooTAsi7ytnTq046BBsNcTvItz4AotMwKZBIC6H6CVAJaCcT0CUBTgaTg5nTCu9GKiDEMPJg5YBBOpwlnVzLwtqyKnZagZWahoMB2M3GgsHSRsRACH5BAUFAAAALAEACAARABgAAARcMKR0gL34npkUyyCAcAmyhBijkGi2UW02VHFt33iu7yiDIDaD4/erEYGDlu/nuBAOJ9Dvc2EcDgFAYIuaXS3bbOh6MIC5IAP5Eh5fk2exC4tpgwZyiyFgvhEMBBEAIfkEBQUAAAAsAAACAA4AHQAABHMQyAnYoViSlFDGXBJ808Ep5KRwV8qEg+pRCOeoioKMwJK0Ekcu54h9AoghKgXIMZgAApQZcCCu2Ax2O6NUud2pmJcyHA4L0uDM/ljYDCnGfGakJQE5YH0wUBYBAUYfBIFkHwaBgxkDgX5lgXpHAXcpBIsRADs="

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* harmony import */ var _my_node_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18);
/* harmony import */ var _task_queue_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(19);
/* harmony import */ var _time_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);





/**
 * View Component
 *
 * @author wang.xin
 * @exports VC
 */
const VC = {
    /**
     * @property {object} config 配置项
     * @property {string} [config.basicPath=''] 基地址
     */
    config: {
        basicPath: ''
    },

    /**
     * 缓存已经引入的组件地址，避免重复引入
     * @property {string[]} cache 地址缓存
     */
    cache: [],

    /**
     * 格式化文件地址
     * @param {string} filePath
     * @return {string}
     */
    formatPath(filePath) {
        let arr = filePath.split('/').filter((item, index) => item !== '.' && (index === 0 || item !== '')),
            pos = arr.indexOf('..');

        while (pos > 0) {
            arr = arr.slice(0, pos - 1).concat(arr.slice(pos + 1));
            pos = arr.indexOf('..');
        }

        return arr.join('/').replace(':/', '://');
    },

    /**
     * 引入文件
     * @param {object} option 配置项
     * @param {string} option.basicPath 基地址
     * @param {string} option.filePath 文件路径
     * @param {function} option.handle 引入后执行的方法
     * @param {string} option.alias 别名，当组件名称重复时，可使用别名
     * @returns {Promise}
     */
    imports(option) {
        let { basicPath = VC.config.basicPath, filePath = '', handle = () => {}, alias } = option,
            fullPath = '', // 完整路径
            realPath = ''; // 不携带版本号的路径

        // 判断文件地址是否需要增加基地址
        fullPath = _util_js__WEBPACK_IMPORTED_MODULE_0__["default"].eval(filePath);
        if (!fullPath.startsWith('http://') && !fullPath.startsWith('https://')) {
            fullPath = `${basicPath}${fullPath}`;
        }
        fullPath = VC.formatPath(fullPath);
        realPath = fullPath.split('?ver')[0];

        if (/\.js$/.test(realPath)) {
            // 处理 script
            return VC.importScript(fullPath, realPath, handle);
        } else if (/\.css$/.test(realPath)) {
            // 处理 style
            return VC.importStyle(fullPath, realPath, handle);
        } else if (/\.vc$/.test(realPath)) {
            // 处理 ViewComponent
            return VC.importViewComponent(fullPath, realPath, handle, alias);
        }

        return fetch(fullPath).then((response) => response.text());
    },

    /**
     * 引入 js 文件
     * @param {string} fullPath 完整路径
     * @param {string} realPath 不携带版本号的路径
     * @param {function} callback 引入文件后执行的回调函数
     * @return {Promise}
     */
    importScript(fullPath, realPath, callback) {
        let target = document.createElement('script');

        target.src = fullPath.includes('?ver') ? fullPath : `${fullPath}?ver=${new Date().getTime()}`;
        return new Promise((resolve, reject) => {
            let scriptList = [...document.scripts]
                .filter((item) => typeof item.src === 'string')
                .map((item) => item.src.split('?')[0]);

            if (scriptList.includes(realPath)) {
                callback();
                resolve();
            } else {
                document.body.appendChild(target);
                target.onload = target.onreadystatechange = function () {
                    if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
                        callback();
                        resolve();
                    } else {
                        reject();
                    }
                };
                target.onerror = function () {
                    reject();
                };
            }
        });
    },

    /**
     * 引入 css 文件
     * @param {string} fullPath 完整路径
     * @param {string} realPath 不携带版本号的路径
     * @param {function} callback 引入文件后执行的回调函数
     * @return {Promise}
     */
    importStyle(fullPath, realPath, callback) {
        let target = document.createElement('link');

        target.href = fullPath.includes('?ver') ? fullPath : `${fullPath}?ver=${new Date().getTime()}`;
        target.rel = 'stylesheet';
        return new Promise((resolve, reject) => {
            let styleList = [...document.styleSheets]
                .filter((item) => typeof item.href === 'string')
                .map((item) => item.href.split('?')[0]);

            if (styleList.includes(realPath)) {
                callback();
                resolve();
            } else {
                document.head.appendChild(target);
                target.onload = target.onreadystatechange = function () {
                    if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
                        callback();
                        resolve();
                    } else {
                        reject();
                    }
                };
                target.onerror = function () {
                    reject();
                };
            }
        });
    },

    /**
     * 引入 vc 文件
     * @param {string} fullPath 完整路径
     * @param {string} realPath 不携带版本号的路径
     * @param {function} callback 引入文件后执行的回调函数
     * @param {string} alias 组件别名
     * @return {Promise}
     */
    importViewComponent(fullPath, realPath, callback, alias) {
        let componentName = VC.parseComponentName(realPath),
            globalName = '';

        // 确定组件名称
        if (componentName === '') {
            console.log(`组件${fullPath}获取失败！`);
            return;
        }
        globalName = alias || componentName;

        // 组件已引入的情况
        if (realPath == null || eval(`typeof ${globalName} !== 'undefined'`) || VC.cache.includes(realPath)) {
            return new Promise((resolve) => {
                callback.call(VC, {
                    template: eval(`typeof ${globalName} !== 'undefined'`) ? eval(globalName)._template : ''
                });
                resolve();
            });
        }

        // 仅当没有别名的时候，缓存组件地址，避免重复引入
        if (globalName === componentName) {
            VC.cache.push(realPath);
        }

        // 增加版本号
        if (!fullPath.includes('?ver')) {
            fullPath += `?ver=${Math.random()}`;
        }

        return fetch(fullPath)
            .then((response) => {
                if (response.status === 200) {
                    return response.text();
                }
                return new Promise((resolve, reject) => {
                    reject();
                });
            })
            .then((res) => VC.parseViewComponent(res, componentName, globalName, callback));
    },

    /**
     * 根据文件路径解析组件名称
     * @param {string} src 文件路径
     */
    parseComponentName(src) {
        let path = _util_js__WEBPACK_IMPORTED_MODULE_0__["default"].eval(src);

        if (path != null) {
            let componentName = path.match(/([a-zA-Z0-9]*?)\.((vc)|(js))/);
            if (componentName != null && componentName[1] != null) {
                return componentName[1];
            }
        }

        return '';
    },

    /**
     * 解析组件文件
     * @param {string} text 文本内容
     * @param {string} componentName 组件名称
     * @param {string} globalName 组件对外暴露名称
     * @param {function} callback 解析完组件执行的回调函数
     */
    parseViewComponent(text, componentName, globalName, callback = () => {}) {
        let myNode = new _my_node_js__WEBPACK_IMPORTED_MODULE_1__["default"](`<div>${text}</div>`);

        return new Promise((resolve) => {
            let taskQueue = new _task_queue_js__WEBPACK_IMPORTED_MODULE_2__["default"]();

            taskQueue.free = false;
            try {
                VC.parseComponentPackageNode(taskQueue, myNode.children('component-package'));
                VC.parseComponentNormalNode(taskQueue, myNode, componentName, globalName);
                taskQueue.add(() => {
                    return new Promise((resolve2) => {
                        callback.call(VC, {
                            template: eval(`typeof ${globalName} != 'undefined'`) ? eval(globalName)._template : ''
                        });
                        resolve2();
                        resolve();
                    });
                });
                taskQueue.free = true;
            } catch (err) {
                console.log(err);
            }
        });
    },

    /**
     * 解析 component-package 节点
     * @param {TaskQueue} taskQueue 任务队列
     * @param {MyNode[]} componentPackage 组件包
     */
    parseComponentPackageNode(taskQueue, componentPackage) {
        componentPackage.forEach((item, index, list) => {
            let elem = list.eq(index),
                componentName = elem.attr('name') || elem.attr('data-name'),
                globalName = elem.attr('alias') || componentName;

            VC.parseComponentNormalNode(taskQueue, elem, componentName, globalName);
        });
    },

    /**
     * 解析常规组件节点
     * @param {TaskQueue} taskQueue 任务队列
     * @param {MyNode} myNode 节点
     * @param {string} componentName 组件名称
     * @param {string} globalName 组件对外暴露名称
     */
    parseComponentNormalNode(taskQueue, myNode, componentName, globalName) {
        let unique = new _time_js__WEBPACK_IMPORTED_MODULE_3__["default"]().format('HHMMSS') + Math.floor(Math.random() * 1000);

        // 解析 file 节点
        VC.parseFileNode(taskQueue, myNode.children('file'));

        // 解析 component 节点
        VC.parseComponentNode(taskQueue, myNode.children('component'));

        // 解析 script 节点
        VC.parseScriptNode(taskQueue, myNode.children('script'), componentName, globalName);

        // 解析 template 节点
        VC.parseTemplateNode(taskQueue, myNode.children('template').html(), globalName, unique);

        // 解析 style 节点
        VC.parseStyleNode(taskQueue, myNode.children('style'), unique);
    },

    /**
     * 解析 file 节点
     * @param {TaskQueue} taskQueue 任务队列
     * @param {MyNode} file file节点
     */
    parseFileNode(taskQueue, file) {
        file.forEach((item, index, list) => {
            let src = _util_js__WEBPACK_IMPORTED_MODULE_0__["default"].eval(list.eq(index).attr('src'));

            taskQueue.add(VC.imports, [{ filePath: src }]);
        });
    },

    /**
     * 解析 component 节点
     * @param {TaskQueue} taskQueue 任务队列
     * @param {MyNode} component component节点
     */
    parseComponentNode(taskQueue, component) {
        component.forEach((item, index, list) => {
            let elem = list.eq(index),
                src = _util_js__WEBPACK_IMPORTED_MODULE_0__["default"].eval(elem.attr('src')),
                alias = elem.attr('alias');

            // 是否添加随机数
            if (elem.attr('random') != null) {
                src += `?ver=${Math.random()}`;
            }

            taskQueue.add(VC.imports, [{ filePath: src, alias }]);
        });
    },

    /**
     * 解析 script 节点
     * @param {TaskQueue} taskQueue 任务队列
     * @param {MyNode} scriptNode script节点
     * @param {string} componentName 组件名称
     * @param {string} globalName 最终引入全局变量名称
     */
    parseScriptNode(taskQueue, scriptNode, componentName, globalName) {
        taskQueue.add(() => {
            return new Promise((resolve) => {
                scriptNode.forEach((elem) => {
                    let script = document.createElement('script');
                    script.innerHTML = `(function() {
                        ${elem.innerHTML.trim()};
                        if (typeof ${componentName} != 'undefined') {
                            window['${globalName}'] = window['${globalName}'] || ${componentName};
                        }
                    }());`;
                    document.querySelector('body').appendChild(script);
                });
                resolve();
            });
        });
    },

    /**
     * 解析 template 节点
     * @param {TaskQueue} taskQueue 任务队列
     * @param {string} template 模板字符串
     * @param {string} globalName 组件名称
     */
    parseTemplateNode(taskQueue, template, globalName, unique) {
        taskQueue.add(() => {
            return new Promise((resolve) => {
                let node = new _my_node_js__WEBPACK_IMPORTED_MODULE_1__["default"](template);

                if (eval(`typeof ${globalName} != 'undefined'`)) {
                    if (node.length === 0) {
                        node = new _my_node_js__WEBPACK_IMPORTED_MODULE_1__["default"](eval(`${globalName}._template`));
                    }
                    if (node.length !== 0) {
                        node.attr(`vc-${unique}`, '');
                        eval(globalName)._template = node[0].outerHTML;
                    }
                }
                resolve();
            });
        });
    },

    /**
     * 解析 style 节点
     * @param {TaskQueue} taskQueue 任务队列
     * @param {MyNode} styleNode 样式字符串
     * @param {string} unique 唯一标识
     */
    parseStyleNode(taskQueue, styleNode, unique) {
        taskQueue.add(() => {
            return new Promise((resolve) => {
                styleNode.forEach((item, index, list) => {
                    VC.handleStyleNodeItem(list.eq(index), unique);
                });
                resolve();
            });
        });
    },

    /**
     * 处理style
     * @param {MyNode} elem 元素
     * @param {string} unique 唯一标识
     */
    handleStyleNodeItem(elem, unique) {
        let node = elem[0];

        if (elem.attr('disabled') != null) {
            return;
        }
        document.querySelector('body').appendChild(node);
        if (elem.attr('scoped') != null) {
            VC.handleCSSRules(node.sheet.cssRules, unique);
        }
    },

    /**
     * @description 处理CSSRules
     * @param {string} cssRules CSS规则
     * @param {string} unique 唯一标识
     */
    handleCSSRules(cssRules, unique) {
        for (let i = 0; i < cssRules.length; i++) {
            switch (cssRules[i].__proto__) {
                case CSSStyleRule.prototype: // 规则
                    cssRules[i].selectorText = this.handleCSSStyleRule(cssRules[i].selectorText, unique);
                    break;

                case CSSMediaRule.prototype: // 媒体查询
                    this.handleCSSRules(cssRules[i].cssRules, unique);
                    break;

                default:
                    break;
            }
        }
    },

    /**
     * @description 处理CSSStyleRule
     * @param {string} selectorText 样式字符串
     * @param {string} unique 唯一标识
     */
    handleCSSStyleRule(selectorText, unique) {
        let req = /^[-a-zA-Z0-9="'\.\[\]#_\u4e00-\u9fa5]*/, // 匹配选择器
            selectorList = selectorText.split(',');

        return selectorList
            .map((selector) => {
                return selector.trim().replace(req, (item) => `${item}[vc-${unique}]`);
            })
            .join(',');
    }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (VC);


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);


/**
 * 选择器
 * @typedef {MyNode|Node|String} Selector
 * @memberof MyNode
 */

/**
 * 封装 Node 对象
 */
class MyNode {
    /**
     * Creates an instance of MyNode.
     * @param {MyNode.Selector|MyNode.Selector[]} selector 选择器
     * @param {MyNode|Node} prevObject 上一级对象
     * @author wang.xin
     */
    constructor(selector, prevObject) {
        if (selector instanceof MyNode) {
            return selector;
        }
        /**
         * @member {Number} length 元素个数
         * @memberof MyNode#
         * @default 0
         */
        this.length = 0;

        /**
         * @member {MyNode|Node} prevObject 上一级对象
         * @memberof MyNode#
         * @default document
         */
        this.prevObject = prevObject || document;
        this.$init(selector);
    }

    /**
     * 初始化
     * @param {MyNode.Selector|MyNode.Selector[]} selector 选择器
     * @memberof MyNode
     */
    $init(selector) {
        /**
         * Node
         */
        if (selector instanceof Node) {
            this.push(selector);
        }

        /**
         * ArrayLike
         */
        if (_util_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArrayLike(selector) && _util_js__WEBPACK_IMPORTED_MODULE_0__["default"].type(selector.forEach) === 'function') {
            selector.forEach((elem) => this.concat(new MyNode(elem)));
        }

        /**
         * String
         * 默认为选择器
         * 其次作为模板进行录入
         */
        if (_util_js__WEBPACK_IMPORTED_MODULE_0__["default"].type(selector) === 'string') {
            try {
                document.querySelectorAll(selector).forEach((element) => this.push(element));
            } catch (err) {
                let documentFragment = MyNode._string2fragment(selector);
                this.concat(new MyNode(documentFragment.childNodes));
            }
        }
    }

    /**
     * 添加 script 节点
     * @param {Node|String} content 内容
     * @memberof MyNode
     */
    appendScript(content) {
        /**
         * Node
         */
        if (content instanceof Node) {
            if (content.nodeType === 11) {
                content.querySelectorAll('script').forEach((elem) => {
                    this.runCode(elem.innerHTML);
                });
            } else if (content.nodeName.toLocaleLowerCase() === 'script') {
                this.runCode(content.innerHTML);
            }
        }

        /**
         * String
         */
        if (_util_js__WEBPACK_IMPORTED_MODULE_0__["default"].type(content) === 'string') {
            this.runCode(content.replace(/^<script[\s\S]*?>/gi, '').replace(/<\/script>$/gi, ''));
        }
    }

    /**
     * 执行 code <br/>
     * @param {String} code 代码
     * @memberof MyNode
     * @example
     * 执行代码的方案（本方法采用的是方案一）：
     * 1. 新增 script 节点，使用的是全局上下文。因此，即使删除了节点，产生的全局变量也不会被销毁。
     * 2. eval()，使用的是 Eval 函数执行上下文。因此，产生的变量是局部变量，执行完后会被销毁。
     */
    runCode(code) {
        if (this.length === 0) {
            return;
        }

        this.forEach((node) => {
            let ownerDocument = node.ownerDocument;

            /**
             * 只有被选节点属于当前文档时，才会执行 code
             */
            if (ownerDocument === document) {
                let scriptNode = document.createElement('script');
                scriptNode.innerHTML = code;
                ownerDocument.body.appendChild(scriptNode);
                scriptNode.remove();
            }
        });
    }

    /**
     * 插入指定内容 <br/>
     * 当被选元素有多个，则只对 this[position] 元素插入原始内容，其余皆为深拷贝的内容
     * @param {MyNode.Selector|MyNode.Selector[]} content 内容
     * @param {Number} position 位置（插入原始内容的元素位置）
     * @param {String} [insertLocation='beforeBegin'] 插入位置
     * @returns {MyNode}
     * @memberof MyNode
     * @example
     * 利用 insertBefore(node, child) 执行的插入操作
     * node：插入的新节点
     * child：指定的子节点前插入，为 null 则在末尾插入
     */
    insert(content, position = 0, insertLocation = 'beforeBegin', replaceNode = new MyNode()) {
        const INSERT_LOCATION = ['beforeBegin', 'afterEnd', 'beforeEnd', 'afterBegin', 'replaceWith'];

        if (this.length === 0 || !INSERT_LOCATION.includes(insertLocation)) {
            return this;
        }

        /**
         * Node，最终都以 Node 节点添加
         * 文档片段被插入后会清空，所以需要在插入前先进行深拷贝
         */
        if (content instanceof Node) {
            let cloneNode = content.cloneNode(true);

            this.forEach((item, index) => {
                let insertNode = index === position ? content : cloneNode.cloneNode(true);

                if (!item instanceof Node || !item.parentNode instanceof Node) {
                    return;
                }

                switch (insertLocation) {
                    case INSERT_LOCATION[0]:
                        item.parentNode.insertBefore(insertNode, item);
                        break;

                    case INSERT_LOCATION[1]:
                        item.parentNode.insertBefore(insertNode, item.nextElementSibling);
                        break;

                    case INSERT_LOCATION[2]:
                        item.insertBefore(insertNode, null);
                        break;

                    case INSERT_LOCATION[3]:
                        item.insertBefore(insertNode, item.childNodes[0]);
                        break;

                    case INSERT_LOCATION[4]:
                        if (content.nodeType === 11) {
                            insertNode.childNodes.forEach((elem) => replaceNode.push(elem));
                        } else {
                            replaceNode.push(insertNode);
                        }
                        item.parentNode.replaceChild(insertNode, item);
                        break;

                    default:
                        break;
                }
                new MyNode(item).appendScript(cloneNode);
            });
        }

        /**
         * ArrayLike
         * Node 直接添加到文档片段
         * String 先转换为文档片段，再添加到父级文档片段
         */
        if (_util_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArrayLike(content) && _util_js__WEBPACK_IMPORTED_MODULE_0__["default"].type(content.forEach) === 'function') {
            let documentFragment = document.createDocumentFragment();

            content.forEach((item) => {
                if (item instanceof Node) {
                    documentFragment.appendChild(item);
                } else if (_util_js__WEBPACK_IMPORTED_MODULE_0__["default"].type(item) === 'string') {
                    documentFragment.appendChild(MyNode._string2fragment(item));
                }
            });
            this.insert(documentFragment, position, insertLocation, replaceNode);
        }

        /**
         * String
         */
        if (_util_js__WEBPACK_IMPORTED_MODULE_0__["default"].type(content) === 'string') {
            let documentFragment = MyNode._string2fragment(content);
            this.insert(documentFragment, position, insertLocation, replaceNode);
        }

        return insertLocation !== INSERT_LOCATION[4] ? this : replaceNode;
    }

    /**
     * 在被选元素前插入指定内容
     * @param {MyNode.Selector|MyNode.Selector[]} content 内容
     * @param {Number} [position=0] 位置
     * @returns {MyNode}
     * @memberof MyNode
     */
    before(content, position = 0) {
        return this.insert(content, position, 'beforeBegin');
    }

    /**
     * 在被选元素后插入指定内容
     * @param {MyNode.Selector|MyNode.Selector[]} content 内容
     * @param {Number} [position=0] 位置
     * @returns {MyNode}
     * @memberof MyNode
     */
    after(content, position = 0) {
        return this.insert(content, position, 'afterEnd');
    }

    /**
     * 在被选元素内部末尾位置插入指定内容
     * @param {MyNode.Selector|MyNode.Selector[]} content 内容
     * @param {Number} [position=0] 位置
     * @returns {MyNode}
     * @memberof MyNode
     */
    append(content, position = 0) {
        return this.insert(content, position, 'beforeEnd');
    }

    /**
     * 在被选元素内部起始位置插入指定内容
     * @param {MyNode.Selector|MyNode.Selector[]} content 内容
     * @param {Number} [position=0] 位置
     * @returns {MyNode}
     * @memberof MyNode
     */
    prepend(content, position = 0) {
        return this.insert(content, position, 'afterBegin');
    }

    /**
     * 将被选元素替换为指定内容
     * @param {MyNode.Selector|MyNode.Selector[]} content 内容
     * @param {Number} [position=0] 位置
     * @returns {MyNode}
     * @memberof MyNode
     */
    replaceWith(content, position = 0) {
        return this.insert(content, position, 'replaceWith');
    }

    /**
     * 移除节点
     * @memberof MyNode
     */
    remove() {
        this.forEach((item) => {
            _util_js__WEBPACK_IMPORTED_MODULE_0__["default"].type(item.remove) === 'function' && item.remove();
        });
    }

    /**
     * 遍历<br/>
     * 与 Array.forEach() 有区别，当回调函数返回 false 时，会跳出循环
     * @param {Function} callback 回调函数
     * @returns {MyNode}
     * @memberof MyNode
     */
    forEach(callback) {
        for (let i = 0; i < this.length; i++) {
            if (callback.call(this[i], this[i], i, this) === false) {
                break;
            }
        }

        return this;
    }

    /**
     * 判断是否含有指定节点
     * @param {Node} elem 节点
     * @returns {Boolean}
     * @memberof MyNode
     */
    includes(elem) {
        let res = false;

        this.forEach((item) => {
            res = item === elem;
            return !res;
        });

        return res;
    }

    /**
     * 找出元素集合中符合 CSS 选择器的元素
     * @param {String|Node} selector CSS选择器
     * @returns {MyNode}
     */
    matches(selector) {
        let result = new MyNode([], this);

        this.forEach((elem) => {
            if (selector instanceof Node && elem === selector) {
                result.push(elem);
            }
            if (_util_js__WEBPACK_IMPORTED_MODULE_0__["default"].type(selector) === 'string' && elem.matches(selector)) {
                result.push(elem);
            }
        });
        return result;
    }

    /**
     * 查找节点位置
     * @param {Node} elem 节点
     * @returns {Number}
     * @memberof MyNode
     */
    indexOf(elem) {
        return _util_js__WEBPACK_IMPORTED_MODULE_0__["default"].toArray(this).indexOf(elem);
    }

    /**
     * 模拟 Array.push()
     * @param {Node} elem 节点
     * @returns {MyNode}
     * @memberof MyNode
     */
    push(elem) {
        if (elem && !this.includes(elem)) {
            this[this.length++] = elem;
        }

        return this;
    }

    /**
     * 模拟 Array.pop()
     * @returns {MyNode}
     * @memberof MyNode
     */
    pop() {
        delete this[--this.length];
        return this;
    }

    /**
     * 模拟 Array.splice()
     * @returns {MyNode}
     * @memberof MyNode
     */
    splice() {
        return new MyNode([].splice.apply(this, arguments), this);
    }

    /**
     * 模拟 Array.concat()
     * @param {MyNode[]} arr 节点数组
     * @returns {MyNode}
     * @memberof MyNode
     */
    concat(...arr) {
        arr.filter((item) => item instanceof MyNode).forEach((elem) => {
            elem.forEach((i) => this.push(i));
        });

        return this;
    }

    /**
     * 模拟 Array.reduce()
     * @param {Function} callback 回调函数
     * @param {*} value 上一次的结果
     * @returns {*}
     * @memberof MyNode
     */
    reduce(callback, value) {
        let res = value;

        if (_util_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction(callback)) {
            this.forEach((item) => {
                res = callback.call(this, res, item);
            });
        }

        return res;
    }

    // 模拟[].map()
    map(callback) {
        let res = [],
            i = 0,
            length = this.length;

        for (; i < length; i++) {
            res.push(callback.call(this[i], this[i], i, this));
        }

        return res;
    }

    // 封装第i个元素为MyNode类型
    eq(i) {
        let len = this.length,
            index = +i + (i < 0 ? len : 0);

        return new MyNode(index >= 0 && index < len ? this[index] : '', this);
    }

    // 封装偶数位的元素集合为MyNode类型
    even() {
        let res = new MyNode(),
            len = this.length,
            i = 0;

        for (; i < len; i++) {
            (i + 1) % 2 === 0 && res.push(this[i]);
        }
        res.prevObject = this;

        return res;
    }

    // 封装奇数位的元素集合为MyNode类型
    odd() {
        let res = new MyNode(),
            len = this.length,
            i = 0;

        for (; i < len; i++) {
            i % 2 === 0 && res.push(this[i]);
        }
        res.prevObject = this;

        return res;
    }

    // 封装父节点
    parent(selector) {
        let res = new MyNode();

        this.forEach((elem) => {
            let parent = elem.parentNode;

            if (parent && parent.nodeType === 1) {
                if (selector) {
                    // 存在选择器
                    if (_util_js__WEBPACK_IMPORTED_MODULE_0__["default"].type(selector) === 'string') {
                        parent.matches(selector) && res.push(parent);
                    } else if (selector.nodeType) {
                        parent === selector && res.push(parent);
                    }
                } else {
                    res.push(parent);
                }
            }
        });
        res.prevObject = this;

        return res;
    }

    // 封装祖先节点
    parents(selector, until) {
        let res = new MyNode();

        this.forEach((elem) => {
            let parent = elem.parentNode;

            while (parent && parent.nodeType === 1) {
                if (selector) {
                    // 存在选择器
                    if (_util_js__WEBPACK_IMPORTED_MODULE_0__["default"].type(selector) === 'string') {
                        parent.matches(selector) && res.push(parent);
                    } else if (selector.nodeType) {
                        parent === selector && res.push(parent);
                    }
                } else {
                    res.push(parent);
                }

                if (parent === until || parent.matches(until)) {
                    break;
                }
                parent = parent.parentNode;
            }
        });
        res.prevObject = this;

        return res;
    }

    // 兄弟节点
    siblings(selector) {
        let res = new MyNode();

        this.forEach((item) => {
            new MyNode(item)
                .parent()
                .children(selector)
                .forEach((elem) => {
                    elem !== item && res.push(elem);
                });
        });
        res.prevObject = this;

        return res;
    }

    // 判断当前节点是父元素第几个元素
    posOfSiblings() {
        let node = new MyNode(this[0]);

        return node.parent().children().indexOf(node[0]);
    }

    // 前一个兄弟节点
    prevSiblings(selector) {
        let res = new MyNode();

        this.forEach((item) => {
            if (item.previousElementSibling && selector) {
                item.previousElementSibling.matches(selector) && res.push(item.previousElementSibling);
            } else {
                res.push(item.previousElementSibling);
            }
        });
        res.prevObject = this;

        return res;
    }

    // 后一个兄弟节点
    nextSiblings(selector) {
        let res = new MyNode();

        this.forEach((item) => {
            if (item.nextElementSibling && selector) {
                item.nextElementSibling.matches(selector) && res.push(item.nextElementSibling);
            } else {
                res.push(item.nextElementSibling);
            }
        });
        res.prevObject = this;

        return res;
    }

    /**
     * 查找子节点中符合条件的元素节点（nodeType = 1）
     * @param {MyNode.Selector} selector 选择器
     * @returns {MyNode}
     * @memberof MyNode
     */
    children(selector) {
        let res = new MyNode();

        this.forEach((item) => {
            _util_js__WEBPACK_IMPORTED_MODULE_0__["default"].toArray(item.children).forEach((elem) => {
                if (selector) {
                    elem.matches(selector) && res.push(elem);
                } else {
                    res.push(elem);
                }
            });
        });
        res.prevObject = this;

        return res;
    }

    /**
     * 查找子节点中符合条件的所有节点
     * @param {MyNode.Selector} selector 选择器
     * @returns {MyNode}
     * @memberof MyNode
     */
    childNodes(selector) {
        let res = new MyNode();

        this.forEach((item) => {
            _util_js__WEBPACK_IMPORTED_MODULE_0__["default"].toArray(item.childNodes).forEach((elem) => {
                if (selector) {
                    elem.matches(selector) && res.push(elem);
                } else {
                    res.push(elem);
                }
            });
        });
        res.prevObject = this;

        return res;
    }

    /**
     * 查找符合条件的子孙节点
     * @param {MyNode.Selector} selector 选择器
     * @returns {MyNode}
     * @memberof MyNode
     */
    find(selector) {
        let result = new MyNode();

        result.prevObject = this;
        /**
         * Node
         */
        if (selector instanceof Node) {
            this.forEach((item) => {
                if (new MyNode(selector).parents(item).length > 0) {
                    result.push(selector);
                }
            });
        }

        /**
         * MyNode
         */
        if (selector instanceof MyNode) {
            selector.forEach((elem) => {
                result.concat(this.find(elem));
            });
        }

        /**
         * String
         */
        if (_util_js__WEBPACK_IMPORTED_MODULE_0__["default"].type(selector) === 'string') {
            this.forEach((item) => {
                item.nodeType === 1 &&
                    item.querySelectorAll(selector).forEach((elem) => {
                        result.push(elem);
                    });
            });
        }

        return result;
    }

    /**
     * 替换被选元素的内容，或返回被选元素的内容
     * @param {MyNode.Selector|MyNode.Selector[]} [content] 内容
     * @returns {MyNode}
     * @memberof MyNode
     */
    html(content) {
        if (content == null) {
            return this[0] ? this[0].innerHTML.trim() : '';
        }

        if (_util_js__WEBPACK_IMPORTED_MODULE_0__["default"].type(content) === 'string' && !/<script[\s\S]*?>[\s\S]*?<\/script>/gi.test(content)) {
            this.forEach((item) => (item.innerHTML = content));
        } else {
            this.forEach((item) => (item.innerHTML = ''));
            this.append(content);
        }

        return this;
    }

    /**
     * 获取或设置样式
     * @param {String|Object} style 属性
     * @param {String} [styleValue] 属性值
     * @param {String} [priority] 样式属性的优先级
     * @returns {MyNode|String}
     * @memberof MyNode
     */
    css(style, styleValue, priority = '') {
        /**
         * Object
         */
        if (_util_js__WEBPACK_IMPORTED_MODULE_0__["default"].type(style) === 'object') {
            for (let styleName in style) {
                this.css(styleName, style[styleName]);
            }
            return this;
        }

        /**
         * String
         */
        if (_util_js__WEBPACK_IMPORTED_MODULE_0__["default"].type(style) === 'string' && style.trim() !== '') {
            if (styleValue == null) {
                return this[0] ? this[0].style.getPropertyValue(style) || window.getComputedStyle(this[0])[style] : '';
            }

            this.forEach((item) => item.nodeType === 1 && item.style.setProperty(style, String(styleValue), priority));
            return this;
        }

        return '';
    }

    /**
     * 获取或设置属性值
     * @param {String|Object} attribute 属性
     * @param {String} [attributeValue] 属性值
     * @returns {MyNode|String}
     * @memberof MyNode
     */
    attr(attribute, attributeValue) {
        /**
         * Object
         */
        if (_util_js__WEBPACK_IMPORTED_MODULE_0__["default"].type(attribute) === 'object') {
            for (let attributeName in attribute) {
                this.attr(attributeName, attribute[attributeName]);
            }
            return this;
        }

        /**
         * String
         */
        if (_util_js__WEBPACK_IMPORTED_MODULE_0__["default"].type(attribute) === 'string' && attribute.trim() !== '') {
            if (attributeValue == null) {
                return this[0] && this[0].getAttribute(attribute);
            }

            if (_util_js__WEBPACK_IMPORTED_MODULE_0__["default"].type(attributeValue) === 'object') {
                attributeValue = JSON.stringify(attributeValue);
            }
            this.forEach((item) => item.setAttribute(attribute, attributeValue));
            return this;
        }

        return null;
    }

    /**
     * 删除属性
     * @param {String} attributeName 属性名
     * @returns {MyNode}
     * @memberof MyNode
     */
    removeAttr(attributeName) {
        if (attributeName != null) {
            this.forEach((item) => item.removeAttribute(attributeName));
        }
        return this;
    }

    /**
     * 判断是否包含指定的 className，多个 className 用空格隔开（或直接使用字符串数组）<br/>
     * 若对象中含有多个元素，则只要其中任意一个元素含有指定的 className，就返回 true
     * @param {String|String[]} className 类名
     * @returns {Boolean}
     * @memberof MyNode
     */
    hasClass(className) {
        let res = false,
            classList = MyNode._string2Array(className).filter((elem) => elem !== '');

        this.forEach((item) => {
            res =
                item.nodeType === 1 &&
                classList.every((elem) => {
                    return item.classList.contains(elem);
                });
            return !res;
        });

        return res;
    }

    /**
     * 添加指定的 className，多个 className 用空格隔开（或直接使用字符串数组）
     * @param {String|String[]} className 类名
     * @returns {MyNode}
     * @memberof MyNode
     */
    addClass(className) {
        let classList = MyNode._string2Array(className).filter((elem) => elem !== '');

        this.forEach((item) => {
            item.nodeType === 1 &&
                classList.forEach((elem) => {
                    item.classList.add(elem);
                });
        });

        return this;
    }

    /**
     * 移除指定的 className，多个 className 用空格隔开（或直接使用字符串数组）<br/>
     * @param {String|String[]} className 类名
     * @returns {MyNode}
     * @memberof MyNode
     */
    removeClass(className) {
        let classList = MyNode._string2Array(className).filter((elem) => elem !== '');

        this.forEach((item) => {
            item.nodeType === 1 &&
                classList.forEach((elem) => {
                    item.classList.remove(elem);
                });
        });

        return this;
    }

    /**
     * 判断是否含有指定的 className，有则移除，无则添加
     * @param {String|String[]} className 类名
     * @returns {MyNode}
     * @memberof MyNode
     */
    toggleClass(className) {
        let classList = MyNode._string2Array(className).filter((elem) => elem !== '');

        this.forEach((item) => {
            let myNode = new MyNode(item);

            classList.forEach((elem) => {
                myNode.hasClass(elem) ? myNode.removeClass(elem) : myNode.addClass(elem);
            });
        });

        return this;
    }

    /**
     * 获取或设置 text 属性，删除前后空格
     * @param {String} content 内容
     * @returns {MyNode|String}
     * @memberof MyNode
     */
    text(content) {
        if (content != null) {
            this.forEach((item) => (item.innerText = content));
            return this;
        }

        return this[0] ? this[0].innerText.trim() : '';
    }

    /**
     * 获取或设置 value 属性，删除前后空格
     * @param {String} content 内容
     * @returns {MyNode|String}
     * @memberof MyNode
     */
    val(content) {
        if (content != null) {
            this.forEach((item) => (item.value = content));
            return this;
        }

        return this[0] ? this[0].value.trim() : '';
    }

    /**
     * 设置 text 和 title 属性
     * @param {String} content 内容
     * @returns {MyNode}
     * @memberof MyNode
     */
    textAndTitle(content) {
        if (content != null) {
            this.text(content).attr('title', content);
        }
        return this;
    }

    /**
     * 监听事件
     * @param {String} type 事件类型
     * @param {String} [selector] 选择器
     * @param {Function} callback 回调函数
     * @memberof MyNode
     * @example
     * callback(event, sourceNode, listenNode, triggerNode) <br/>
     * 回调函数绑定：匹配选择器的元素或监听元素 <br/>
     * 参数：<br/>
     * e：事件 <br/>
     * sourceNode：匹配选择器的元素或监听元素 <br/>
     * listenNode：监听元素 <br/>
     * triggerNode：触发元素 <br/>
     */
    on(type, selector, callback) {
        /**
         * 两个参数时，第二个参数作为回调函数
         * 三个参数时，第二个参数作为选择器，第三个参数作为回调函数
         * 其它情况，直接退出
         */
        switch (arguments.length) {
            case 2:
                callback = selector;
                selector = null;
                break;

            case 3:
                break;

            default:
                return;
        }

        this.forEach((item) => {
            item.addEventListener(type, function (e) {
                let listenNode = new MyNode(item),
                    triggerNode = new MyNode(e.srcElement),
                    sourceNode = null;

                if (selector) {
                    /**
                     * 有选择器
                     */
                    if (listenNode.find(selector).includes(e.srcElement)) {
                        /**
                         * 当触发事件的元素符合选择器时，执行 callback，绑定匹配选择器的元素
                         */
                        sourceNode = triggerNode;
                        callback.call(e.srcElement, e, sourceNode, listenNode, triggerNode);
                    } else {
                        /**
                         * 当触发事件的元素为选择器的子元素时，执行 callback，绑定匹配选择器的元素
                         */
                        triggerNode.parents(selector).forEach((elem) => {
                            sourceNode = new MyNode(elem);
                            if (sourceNode.parents(item).length > 0) {
                                callback.call(elem, e, sourceNode, listenNode, triggerNode);
                                return false;
                            }
                        });
                    }
                } else {
                    /**
                     * 没有选择器，执行 callback，绑定监听元素
                     */
                    sourceNode = listenNode;
                    callback.call(this, e, sourceNode, listenNode, triggerNode);
                }
            });
        });
    }

    /**
     * 触发点击事件
     * @memberof MyNode
     */
    click() {
        this.forEach((item) => {
            _util_js__WEBPACK_IMPORTED_MODULE_0__["default"].type(item.click) === 'function' && item.click();
        });
    }

    /**
     * 偏移量
     * @returns {Object} result
     * @returns {Number} result.top 顶部偏移量
     * @returns {Number} result.left 左侧偏移量
     * @memberof MyNode
     */
    offset() {
        if (this.length === 0 || this[0].ownerDocument == null) {
            return;
        }

        let node = this[0],
            documentElement = node.ownerDocument.documentElement,
            res = node.getBoundingClientRect();

        return {
            top: res.top + window.scrollY - documentElement.clientTop,
            left: res.left + window.scrollY - documentElement.clientLeft
        };
    }

    /**
     * 隐藏
     * @returns {MyNode}
     * @memberof MyNode
     * @todo 隐藏前先缓存用户定义的显示样式
     */
    hide() {
        this.forEach((item) => {
            let display = window.getComputedStyle(item).display;

            if (display !== 'none') {
                let cache = MyNode._cache.get(item) || {};

                cache.display = display;
                MyNode._cache.set(item, cache);
                new MyNode(item).css('display', 'none');
            }
        });

        return this;
    }

    /**
     * 显示
     * @returns {MyNode}
     * @memberof MyNode
     * @todo
     * 1. 当节点已经在处于显示状态，则不处理
     * 2. 否则优先取缓存的显示样式
     * 3. 最后考虑 display: block
     */
    show() {
        this.forEach((item) => {
            let display = window.getComputedStyle(item).display;

            if (display === 'none' || display === '') {
                let cache = MyNode._cache.get(item) || {};

                if (cache.display == null || cache.display === '' || cache.display === 'none') {
                    cache.display = 'block';
                }
                MyNode._cache.set(item, cache);
                new MyNode(item).css('display', cache.display);
            }
        });

        return this;
    }

    /**
     * 获取 offsetWidth（该属性为只读属性）
     * @param {String|Number} [num] 宽度
     * @returns {Number|MyNode}
     * @memberof MyNode
     * @example
     * style.width：样式宽度（跟 box-sizing 有关）
     * clientWidth：样式宽度 + padding - 滚动条宽度
     * offsetWidth：样式宽度 + padding + border（当 box-sizing: border-box 时，与 style.width 一致）
     * scrollWidth：元素内容的总宽度 + 元素padding
     */
    width(num) {
        /**
         * 获取宽度
         */
        if (num == null) {
            if (this.length > 0) {
                return this[0].offsetWidth;
            } else {
                return 0;
            }
        }

        /**
         * 设置宽度
         */
        let width = _util_js__WEBPACK_IMPORTED_MODULE_0__["default"].type(num) === 'string' ? num : num + 'px';
        this.forEach((elem) => {
            elem.style.width = width;
        });
        return this;
    }

    /**
     * 获取 offsetHeight（该属性为只读属性）
     * @returns {Number}
     * @memberof MyNode
     * @example
     * style.height：样式宽度（跟 box-sizing 有关）
     * clientHeight：样式宽度 + padding - 滚动条宽度
     * offsetHeight：样式宽度 + padding + border（当 box-sizing: border-box 时，与 style.height 一致）
     * scrollHeight：元素内容的总宽度 + 元素padding
     */
    height(num) {
        /**
         * 获取高度
         */
        if (num == null) {
            if (this.length > 0) {
                return this[0].offsetHeight;
            } else {
                return 0;
            }
        }

        /**
         * 设置高度
         */
        let height = _util_js__WEBPACK_IMPORTED_MODULE_0__["default"].type(num) === 'string' ? num : num + 'px';
        this.forEach((elem) => {
            elem.style.height = height;
        });
        return this;
    }

    /**
     * 节点内z-index最大值
     * @returns {Number}
     * @memberof MyNode
     */
    maxZIndex() {
        return this.find('*').reduce((res, elem) => {
            return Math.max(res, +window.getComputedStyle(elem).zIndex || 0);
        }, 0);
    }
}

/**
 * @member {Map} _cache 缓存
 * @memberof MyNode
 * @static
 */
MyNode._cache = new Map();

/**
 * 将内容根据分隔符拆分成数组
 * @param {String|String[]} content 内容
 * @param {String} [separator=' '] 分隔符
 * @memberof MyNode
 * @static
 */
MyNode._string2Array = function (content, separator = ' ') {
    if (_util_js__WEBPACK_IMPORTED_MODULE_0__["default"].type(content) === 'array') {
        return content;
    }

    if (_util_js__WEBPACK_IMPORTED_MODULE_0__["default"].type(content) === 'string') {
        return content.split(separator);
    }
    return [];
};

/**
 * 字符串转 DocumentFragment
 * @param {String} content 字符串
 * @returns {DocumentFragment}
 * @memberof MyNode
 * @static
 */
MyNode._string2fragment = function (content) {
    let template = document.createElement('template');
    template.innerHTML = content;

    return template.content;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyNode);


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);


/**
 * 任务队列
 *
 * @author wang.xin
 */
class TaskQueue {
    /**
     * Creates an instance of TaskQueue.
     */
    constructor() {
        this.queue = [];
        _util_js__WEBPACK_IMPORTED_MODULE_0__["default"].monitor(
            this,
            'free',
            (value) => {
                value && this.execute(); // 空闲的时候执行任务
            },
            true
        );
    }

    /**
     * 添加任务
     * @param {*} fn
     * @param {*} [params=[]]
     * @return {*}
     */
    add(fn, params = []) {
        this.queue.push({
            fn,
            params
        });
        this.free = this.free;
        return this;
    }

    /**
     * 执行任务
     */
    execute() {
        let task = this.queue.shift();

        if (task) {
            this.free = false;
            try {
                task.fn(...task.params).finally(() => (this.free = true));
            } catch (err) {
                this.free = true;
            }
        }
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TaskQueue);


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * 时间对象
 *
 * @author wang.xin
 */
class Time {
    /**
     * Creates an instance of Time.
     * @param {*} time 接收和new Date()一样的参数
     */
    constructor(time) {
        if (time instanceof Time) {
            return time;
        }

        this.time = this.transform.apply(this, arguments);
        this.init();
    }

    /**
     * 初始化
     */
    init() {
        let time = this.time,
            timeArr = [
                time.getFullYear(),
                time.getMonth() + 1,
                time.getDate(),
                time.getHours(),
                time.getMinutes(),
                time.getSeconds()
            ],
            dayArr = ['日', '一', '二', '三', '四', '五', '六'];

        timeArr = timeArr.map((item) => (item > 9 ? '' : '0') + item);

        this.year = timeArr[0]; // 年
        this.month = timeArr[1]; // 月
        this.date = timeArr[2]; // 日
        this.hours = timeArr[3]; // 时
        this.minutes = timeArr[4]; // 分
        this.seconds = timeArr[5]; // 秒
        this.milliseconds = `000${time.getMilliseconds()}`; // 毫秒
        this.milliseconds = this.milliseconds.substring(this.milliseconds.length - 3);
        this.timeStamp = time.getTime(); // 时间戳
        this.week = '星期' + dayArr[time.getDay()]; // 星期
        this.formatDate = this.format('yyyy-mm-dd');
        this.formatTime = this.format('HH:MM:SS');
    }

    /**
     * 根据入参转成 Date 实例
     * @return {Date}
     */
    transform() {
        let res = new Date(...arguments);

        return res.toString() === 'Invalid Date' ? new Date() : res;
    }

    /**
     * 格式化
     * @param {string} formatStr 格式，默认为 yyyy-mm-dd HH:MM:SS
     * @return {string}
     */
    format(formatStr) {
        let reg = {
                'y+': this.year, // 年
                'm+': this.month, // 月
                'd+': this.date, // 日
                'H+': this.hours, // 时
                'M+': this.minutes, // 分
                'S+': this.seconds, // 秒
                'Z+': this.milliseconds // 毫秒
            },
            res = formatStr || 'yyyy-mm-dd HH:MM:SS';

        for (let key in reg) {
            if (new RegExp(`(${key})`).test(res)) {
                res = res.replace(RegExp.$1, reg[key].substring(reg[key].length - RegExp.$1.length));
            }
        }

        return res;
    }

    /**
     * 计算指定日期
     * @param {number} [num=0] 计量值，默认为0，负数代表以前，正数代表以后
     * @param {string} [type='day'] 类型
     * @return {Time}
     */
    forward(num = 0, type = 'day') {
        let time = this.time,
            year = time.getFullYear(), // 年
            month = time.getMonth(), // 月
            date = time.getDate(), // 日
            maxDate = 28, // 默认一个月28天
            res = null;

        num = isNaN(+num) ? 0 : +num;
        switch (type) {
            case 'year': // 年
                maxDate = new Date(year + num, month + 1, 0).getDate();
                res = new Date(year + num, month, Math.min(date, maxDate));
                break;

            case 'month': // 月
                maxDate = new Date(year, month + num + 1, 0).getDate();
                res = new Date(year, month + num, Math.min(date, maxDate));
                break;

            case 'week': // 周
                res = this.timeStamp + num * 7 * 24 * 60 * 60 * 1000;
                break;

            case 'day': // 日
                res = this.timeStamp + num * 24 * 60 * 60 * 1000;
                break;

            case 'hour': // 时
                res = this.timeStamp + num * 60 * 60 * 1000;
                break;

            case 'minute': // 分
                res = this.timeStamp + num * 60 * 1000;
                break;

            case 'second': // 秒
                res = this.timeStamp + num * 1000;
                break;

            default: // 默认
                res = this;
                break;
        }

        return new Time(res);
    }

    /**
     * 获取当月第一天
     * @return {Time}
     */
    firstDate() {
        return new Time(this.year, +this.month - 1, 1);
    }

    /**
     * 获取当月最后一天
     * @return {Time}
     */
    lastDate() {
        return new Time(this.year, +this.month, 0);
    }

    /**
     * 获取当月天数
     * @return {number}
     */
    dateCount() {
        return +this.lastDate().date;
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Time);


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _observe_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);
/* harmony import */ var _my_node_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18);
/* harmony import */ var _event_bus_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(15);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(13);
/* harmony import */ var _vc_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(17);
/* harmony import */ var _task_queue_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(19);







/**
 * 组件基类
 * 生命周期函数：统一以 __ 为前缀
 * 内置函数：统一以 _ 为前缀
 *
 * @author wang.xin
 */
class Component {
    /**
     * Creates an instance of Component.
     * @param {String|Node|MyNode} selector 选择器
     */
    constructor(selector) {
        /**
         * @member {MyNode} node 组件根节点
         * @memberof Component
         * @inner
         */
        this.node = new _my_node_js__WEBPACK_IMPORTED_MODULE_1__["default"](selector || this.constructor._template.trim());

        try {
            this._init_extends_property();
            this._mount_component();
        } catch (err) {
            console.log(err);
        }
    }

    /**
     * 执行在 new () 之后，属性初始化、模板解析之前
     */
    __before_create() {
        console.log(this.constructor.name, '__before_create');
    }

    /**
     * 执行在自身属性初始化、模板解析之后，挂载之前
     */
    __created() {
        console.log(this.constructor.name, '__created');
    }

    /**
     * 执行在组件挂载之后
     */
    __mounted() {
        console.log(this.constructor.name, '__mounted');
    }

    /**
     * 初始化继承属性和版本号
     */
    _init_extends_property() {
        let extendsClass = this.__proto__,
            extendsStack = [];

        while (extendsClass) {
            // 确保执行的是自己定义的方法，避免重复执行
            if (
                extendsClass.hasOwnProperty('_extends_property') &&
                typeof extendsClass._extends_property === 'function'
            ) {
                extendsStack.push(extendsClass._extends_property);
            }

            // _version 是类的属性
            if (extendsClass.constructor.hasOwnProperty('_version')) {
                this.node.attr(`vc-${extendsClass.constructor._version}`, '');
            }

            extendsClass = extendsClass.__proto__;
        }
        // 让方法按继承顺序执行
        for (let i = extendsStack.length - 1; i > -1; i--) {
            extendsStack[i].call(this);
        }
    }

    /**
     * 继承属性
     * @abstract
     */
    _extends_property() {
        let self = this;

        /**
         * @member {EventBus} _bus 事件总线
         * @memberof Component#
         */
        this._bus = new _event_bus_js__WEBPACK_IMPORTED_MODULE_2__["default"]();

        /**
         * @member {Component} _parent 指向父组件
         * @memberof Component#
         */
        this._parent = null;

        /**
         * @member {Component} _root 指向根组件
         * @memberof Component#
         */
        this._root = this;

        /**
         * @member {Proxy} _children 存放子组件的代理对象
         * @memberof Component#
         */
        this._children = new Proxy(
            {},
            {
                get(target, prop) {
                    if (!prop in target) {
                        try {
                            throw new ReferenceError(`Children component ${prop} does not exit.`);
                        } catch (err) {
                            console.log(err);
                        }
                    }
                    return Reflect.get(...arguments);
                },
                set(target, prop, value) {
                    if (value instanceof Component) {
                        value._parent = self;
                        self._reset_root(value);
                    }
                    return Reflect.set(target, prop, value);
                }
            }
        );

        /**
         * @member {Function} _destroyed 销毁
         * @memberof Component#
         */
        Object.defineProperty(this, '_destroyed', {
            writable: false,
            enumerable: false,
            value: new Proxy(this._destroyed, {
                apply(target, thisArg, params) {
                    let res = Reflect.apply(...arguments);
                    self._after_destroyed();
                    return res;
                }
            })
        });

        /**
         * @member {Function} _send_msg 发送消息
         * @memberof Component#
         */
        Object.defineProperty(this, '_send_msg', {
            writable: false,
            enumerable: false,
            value: new Proxy(this._send_msg, {
                apply(target, thisArg, params) {
                    let parent = self._parent,
                        { action, data } = params[0] || {};

                    if (params[1] === true) {
                        while (parent instanceof Component) {
                            parent._listen_msg(self, ...params);
                            parent = parent._parent;
                        }
                    } else {
                        if (parent instanceof Component) {
                            parent._listen_msg(self, ...params);
                            parent._listen_component(self, action, data);
                        }
                    }

                    return Reflect.apply(...arguments);
                }
            })
        });

        /**
         * @member {Function} _o 监听器
         * @memberof Component#
         */
        Object.defineProperty(this, '_o', {
            value: new _observe_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
                target: this,
                property: {},
                callback: {}
            })
        });

        /**
         * @member {Proxy} load 加载
         * @memberof Component#
         */
        Object.defineProperty(this, 'load', {
            writable: false,
            enumerable: false,
            value: new Proxy(this.load, {
                apply(target, thisArg, params) {
                    self._before_load(params);
                    let res = Reflect.apply(...arguments);
                    return res;
                }
            })
        });

        /**
         * @event 增加默认全局事件监听
         */
        this._bus.on(this.constructor.name, (msg) => {
            const { component, action, data } = msg;
            this._listen_component(component, action, data);
        });
    }

    /**
     * 加载前操作
     */
    _before_load() {}

    /**
     * 子组件实例化完成后执行的函数
     */
    _mounted() {
        this._load_children_component();
    }

    /**
     * 销毁组件
     */
    _destroyed() {}

    /**
     * 销毁后执行移除节点，并删除引用
     */
    _after_destroyed() {
        this.node.remove();

        // 有父节点
        if (this._parent instanceof Component) {
            for (let key in this._parent._children) {
                this._parent._children[key] === this && delete this._parent._children[key];
            }
        }
    }

    /**
     * 发送消息，仅限用于子组件给父组件传递消息，建议使用 _send_component
     * @param {object} msg 消息
     */
    _send_msg(msg) {}

    /**
     * 监听子组件消息，使用时重写该方法
     * @param {Component} component 消息来源组件，建议使用 _listen_component
     * @param {object} msg 消息
     */
    _listen_msg(component, msg) {}

    /**
     * 给组件传递消息
     * @param {String|String[]} componentName 组件类名
     * @param {String} action 动作
     * @param {Object} data 数据
     */
    _send_component(componentName, action, data) {
        this._bus.emit(componentName, {
            component: this,
            action,
            data
        });
    }

    /**
     * 接收组件消息，使用时重写该方法
     * @param {Component} component 消息来源组件
     * @param {String} action 动作
     * @param {Object} data 数据
     */
    _listen_component(component, action, data) {}

    /**
     * 监听属性
     * @param {string} property 属性
     * @param {*} value 值
     * @param {*} callback 响应方法
     * @param {boolean} [deep=true] 是否深度监听
     */
    _observe(property, value, callback = () => {}, deep = true) {
        if (arguments.length === 1) {
            this._observe(property, undefined, callback);
        } else if (_util_js__WEBPACK_IMPORTED_MODULE_3__["default"].type(value) === 'function') {
            this._observe(property, undefined, value);
        } else {
            if (property in this) {
                if (value != null) {
                    this[property] = value;
                }
                this._o.addCallback(property, callback, this);
            } else {
                this._o.defineObject({
                    target: this,
                    property,
                    value,
                    callback: callback.bind(this),
                    deep
                });
            }
        }
    }

    /**
     * 挂载组件
     */
    _mount_component() {
        let taskQueue = new _task_queue_js__WEBPACK_IMPORTED_MODULE_5__["default"]();

        taskQueue.free = false;
        this.node.find('slot').forEach((elem, index, list) => {
            let slot = list.eq(index), // 插槽
                src = slot.attr('data-src'), // 组件地址
                componentName = slot.attr('data-component'), // 组件类名
                authority = slot.attr('data-auth');

            if (authority && (authority === 'false' || _util_js__WEBPACK_IMPORTED_MODULE_3__["default"].eval(authority) === false)) {
                return;
            }

            if (componentName && componentName.includes('${')) {
                componentName = _util_js__WEBPACK_IMPORTED_MODULE_3__["default"].eval(componentName);
            }

            if (componentName == null || componentName === '') {
                componentName = _vc_js__WEBPACK_IMPORTED_MODULE_4__["default"].parseComponentName(src);
            }

            if (componentName === '') {
                console.log(`组件${src}获取失败！`);
                return;
            }

            if (eval(`typeof ${componentName} == 'undefined'`) && src != null) {
                taskQueue.add(_vc_js__WEBPACK_IMPORTED_MODULE_4__["default"].imports, [
                    {
                        filePath: src,
                        handle: () => {
                            this._instantiate_component(slot, componentName);
                        }
                    }
                ]);
            } else {
                // 已存在指定的组件变量
                this._instantiate_component(slot, componentName);
            }
        });
        taskQueue.add(() => {
            this._mounted();
        });
        taskQueue.free = true;
    }

    /**
     * 实例化子组件
     * @param {MyNode} slot 插槽
     * @param {string} componentName 组件类名
     */
    _instantiate_component(slot, componentName) {
        let instantiateName = slot.attr('data-name'), // 实例化名称
            className = slot.attr('class'); // 插槽绑定的类

        // 若没有定义实例化名称，则将类名首字母小写作为为、实例化名称
        if (instantiateName === null || instantiateName === '') {
            let realComponentName = /[A-Za-z]*$/.exec(componentName)[0];

            instantiateName = realComponentName.replace(realComponentName[0], realComponentName[0].toLowerCase());
        }

        if (
            eval(`typeof ${componentName} == 'undefined'`) ||
            !eval(`${componentName}.prototype instanceof Component`)
        ) {
            console.log(`${componentName}未定义！`);
            return;
        }

        this._children[instantiateName] = eval(`new ${componentName}()`);
        this._children[instantiateName].node.addClass(className);
        slot.replaceWith(this._children[instantiateName].node);
    }

    /**
     * 重置根组件
     * @param {Component} component 组件
     */
    _reset_root(component) {
        component._root = this._root;
        for (let key in component._children) {
            if (component instanceof Component && component._children[key] instanceof Component) {
                component._reset_root(component._children[key]);
            }
        }
    }

    /**
     * 判断组件的父组件中是否含有指定组件
     * @param {Component} component 组件
     */
    _has_parent(component) {
        if (this._parent === component) {
            return true;
        }

        while (this._parent instanceof Component) {
            return this._parent._has_parent(component);
        }

        return false;
    }

    /**
     * 判断组件的子组件中是否包含指定组件
     * @param {Component} component 组件
     */
    _has_child(component) {
        for (let child in this._children) {
            if (this._children[child] === component) {
                return true;
            }
            this._children[child]._has_child(component);
        }

        return false;
    }

    /**
     * 加载子组件（实例化后的加载）
     */
    _load_children_component() {
        let componentList = this.node.attr('data-mounted');

        if (componentList == null) {
            return;
        }

        componentList = componentList.split(',');
        componentList.forEach((componentName) => {
            componentName = componentName.trim();

            if (!this._children[componentName] instanceof Component) {
                console.log(componentName, '没有实例化该组件！');
                return;
            }

            if (typeof this._children[componentName].load === 'function') {
                this._children[componentName].load();
            } else {
                console.log(componentName, '没有定义load方法！');
            }
        });
    }

    /**
     * 加载
     * @abstract
     */
    load() {}

    /**
     * 卸载
     * @abstract
     */
    unload() {}
}

/**
 * @member {String} _template 模板
 * @memberof Component
 * @static
 */
Component._template = '';

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Component);


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);


/**
 * 观察者
 *
 * @author wang.xin
 * @deprecated
 */
class Watcher {
    /**
     * Creates an instance of Watcher.
     * @param {*} data
     * @param {*} watch
     */
    constructor(data, watch) {
        data = _util_js__WEBPACK_IMPORTED_MODULE_0__["default"].type(data) === 'object' ? data : {};
        watch = _util_js__WEBPACK_IMPORTED_MODULE_0__["default"].type(watch) === 'object' ? watch : {};
        this.init(data, watch);
    }

    // 初始化
    init(data, watch) {
        for (let key in data) {
            let handle = _util_js__WEBPACK_IMPORTED_MODULE_0__["default"].type(watch[key]) === 'function' ? watch[key] : () => {};

            this.monitor(key, handle, data[key]);
        }
    }

    // 添加监听器
    monitor(key, callback, value) {
        _util_js__WEBPACK_IMPORTED_MODULE_0__["default"].monitor(this, key, callback, value);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Watcher);


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _form_form_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(24);
/* harmony import */ var _drop_list_drop_list_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(27);
/* harmony import */ var _radio_radio_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(30);
/* harmony import */ var _checkbox_checkbox_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(33);
/* harmony import */ var _switch_switch_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(36);
/* harmony import */ var _slider_slider_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(39);
/* harmony import */ var _multiple_list_multiple_list_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(42);








/**
 * @member {class} DropList 下拉列表
 * @memberof Form
 * @static
 * @see DropList
 */
_form_form_js__WEBPACK_IMPORTED_MODULE_0__["default"].DropList = _drop_list_drop_list_js__WEBPACK_IMPORTED_MODULE_1__["default"];

/**
 * @member {class} Radio 单选框
 * @memberof Form
 * @static
 * @see Radio
 */
_form_form_js__WEBPACK_IMPORTED_MODULE_0__["default"].Radio = _radio_radio_js__WEBPACK_IMPORTED_MODULE_2__["default"];

/**
 * @member {class} Checkbox 复选框
 * @memberof Form
 * @static
 * @see Checkbox
 */
_form_form_js__WEBPACK_IMPORTED_MODULE_0__["default"].Checkbox = _checkbox_checkbox_js__WEBPACK_IMPORTED_MODULE_3__["default"];

/**
 * @member {class} Switch 开关按钮
 * @memberof Form
 * @static
 * @see Switch
 */
_form_form_js__WEBPACK_IMPORTED_MODULE_0__["default"].Switch = _switch_switch_js__WEBPACK_IMPORTED_MODULE_4__["default"];

/**
 * @member {class} Slider 滑块
 * @memberof Form
 * @static
 * @see Slider
 */
_form_form_js__WEBPACK_IMPORTED_MODULE_0__["default"].Slider = _slider_slider_js__WEBPACK_IMPORTED_MODULE_5__["default"];

/**
 * @member {class} MultipleList 多选下拉列表
 * @memberof Form
 * @static
 * @see MultipleList
 */
_form_form_js__WEBPACK_IMPORTED_MODULE_0__["default"].MultipleList = _multiple_list_multiple_list_js__WEBPACK_IMPORTED_MODULE_6__["default"];

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_form_form_js__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _form_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(25);
/* harmony import */ var _base_util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony import */ var _base_my_node_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18);
/* harmony import */ var _base_component_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(21);





/**
 * 表单组件基类
 * @extends { Component }
 * @param {object} option 入参
 * @param {string | Node | MyNode} option.elem Node节点、CSS选择器、MyNode
 * @param {string} option.relation 嵌入关系
 * @param {string} option.template 表单模版
 * @exports Form
 */
class Form extends _base_component_js__WEBPACK_IMPORTED_MODULE_3__["default"] {
    /**
     * Creates an instance of Form.
     * @param {*} option
     */
    constructor(option) {
        const { elem, template, relation } = option;
        const templateNode = new _base_my_node_js__WEBPACK_IMPORTED_MODULE_2__["default"](template);
        super(elem);

        if (this.node.length === 0) {
            this.node = templateNode;
        } else {
            if (_base_util_js__WEBPACK_IMPORTED_MODULE_1__["default"].isFunction(this.node[relation])) {
                this.node[relation](templateNode);
                this.node = templateNode;
            }
        }
    }

    /**
     * 设置标签
     * @param {string | boolean} label 标签，为false时，代表没有标签
     */
    setLabel(label) {
        let labelNode = this.node.find('.ly-form_label');

        if (label === false) {
            labelNode.remove();
            return;
        }

        if (labelNode.length === 0) {
            this.node.prepend('<label class="ly-form_label"></label>');
        }
        this.node.find('.ly-form_label').html(label);
    }

    /**
     * 格式化列表
     * @param {string[] | number[] | object[] } list 列表
     */
    formatList(list) {
        let res = [];

        if (_base_util_js__WEBPACK_IMPORTED_MODULE_1__["default"].type(list) === 'array') {
            switch (_base_util_js__WEBPACK_IMPORTED_MODULE_1__["default"].type(list[0])) {
                case 'object': // 元素是对象
                    list.forEach((item, index) => {
                        res.push({
                            key: item.key == null ? index + 1 : item.key, // 键
                            value: item.value, // 值
                            info: item.info || '' // 附加信息
                        });
                    });
                    break;

                case 'string': // 元素是字符串
                case 'number': // 元素是数字
                    list.forEach((item, index) => {
                        res.push({
                            key: index + 1, // 键
                            value: item, // 值
                            info: '' // 附加信息
                        });
                    });
                    break;

                default:
                    break;
            }
        }
        return res;
    }

    /**
     * 查找指定项
     * @param {number | string | object | array} item 指定项
     * @param {array} list 格式化之后的数据列表
     * @returns {number} 指定项对应的下标
     */
    findItem(item, list) {
        let res = -1; // 找不到默认为-1

        if (_base_util_js__WEBPACK_IMPORTED_MODULE_1__["default"].type(item) === 'object') {
            // 传入的是对象
            switch (item.key) {
                case 'key': // key
                    res = list.map((i) => i.key).indexOf(item.value);
                    break;

                case 'value': // 值
                    res = list.map((i) => i.value).indexOf(item.value);
                    break;

                default: // 下标
                    res = 0 <= item.value && item.value < list.length ? parseInt(item.value) : res;
                    break;
            }
        } else if (_base_util_js__WEBPACK_IMPORTED_MODULE_1__["default"].type(item) === 'number') {
            // 传入的是数字
            res = 0 <= item && item < list.length ? parseInt(item) : res;
        } else if (_base_util_js__WEBPACK_IMPORTED_MODULE_1__["default"].type(item) === 'string') {
            // 传入的是字符串
            res = list.map((i) => i.value).indexOf(item);
        } else if (_base_util_js__WEBPACK_IMPORTED_MODULE_1__["default"].type(item) === 'array') {
            res = item.reduce((prev, cur) => {
                let pos = this.findItem(cur, list);
                if (pos !== -1) {
                    prev.push(pos);
                }
                return prev;
            }, []);
        }

        return res;
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Form);


/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_form_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(26);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_form_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_form_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_form_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_form_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 26 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.ly-form {
    --ly-form_color_gray1: #333;
    --ly-form_color_gray2: #777;
    --ly-form_color_gray3: #d7d7d7;
    --ly-form_color_gray4: #e6e6e6;
    --ly-form_color_blue: #28428c;
    --ly-form_box-shadow-color: rgba(0, 0, 0, 0.12);
    --ly-form_line-height: 32px;
    --ly-form_font-size: 14px;

    --ly-form_color_icon: var(--ly-form_color_gray2);
    --ly-form_box-shadow: 0px 0px 8px var(--ly-form_box-shadow-color);

    display: inline-flex;
}

.ly-form,
.ly-form * {
    box-sizing: border-box;
}

.ly-form .ly-form_label {
    position: relative;
    display: inline-flex;
    justify-content: flex-end;
    width: 100px;
    height: var(--ly-form_line-height);
    line-height: var(--ly-form_line-height);
    padding-right: 10px;
    font-size: var(--ly-form_font-size);
}

.ly-form .ly-form_content {
    position: relative;
    display: inline-flex;
    align-items: center;
    flex-wrap: wrap;
    height: var(--ly-form_line-height);
}

.ly-form .ly-form_input-container {
    display: flex;
    align-items: center;
    width: 100%;
    height: var(--ly-form_line-height);
    padding: 0 10px;
    border: 1px solid var(--ly-form_color_gray3);
    border-radius: 5px;
    background-color: #fff;
    cursor: pointer;
}

.ly-form .ly-form_input {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0;
    border: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
    background-color: transparent;
}

.ly-form .ly-form_input:focus {
    outline: none;
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _drop_list_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(28);
/* harmony import */ var _base_my_node_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18);
/* harmony import */ var _form_form_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(24);




/**
 * 下拉列表
 * @author wang.xin
 * @extends {Form}
 * @example
 * new DropList({
 *     elem: '',
 *     list: [],
 *     change: (value, prev, target) => {}
 * });
 */
class DropList extends _form_form_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
    /**
     * Creates an instance of DropList.
     * @param {object} [option={}] 配置参数
     * @param {string | Node | MyNode} option.elem CSS选择器、Node节点、MyNode
     * @param {string} option.label 标签
     * @param {array} option.list 数据列表
     * @param {number | string | object} option.check 选中项
     * @param {function} option.change 切换选中项后触发的事件
     * @param {boolean} option.hover 是否悬浮显示
     * @param {string} option.relation 组件放置关系
     */
    constructor(option = {}) {
        super({
            elem: option.elem,
            relation: option.relation,
            template: option.template || DropList._template
        });

        // 若在缓存中则直接返回缓存中的实例
        if (DropList._cache.get(this.node[0])) {
            return DropList._cache.get(this.node[0]);
        }
        DropList._cache.set(this.node[0], this);

        this.init();
        this.load(option);
    }

    /**
     * 初始化
     */
    init() {
        this.monitor();
        this.on();
    }

    /**
     * 属性
     */
    monitor() {
        /**
         * @member {boolean} show 是否显示下拉列表
         * @memberof DropList
         * @inner
         */
        this._observe('show', (value) => {
            this.node.attr('data-status', value ? 'up' : 'down');
        });

        /**
         * @member {string} label 标签
         * @memberof DropList
         * @inner
         */
        this._observe('label', (value) => {
            this.setLabel(value);
        });

        /**
         * @member {array} list 数据列表
         * @memberof DropList
         * @inner
         */
        this._observe('list', (value) => {
            this.standardList = this.formatList(value);
        });

        /**
         * @member {array} standardList 格式化的数据列表
         * @memberof DropList
         * @inner
         */
        this._observe('standardList', () => {
            this.setList();
        });

        /**
         * @member {*} value 值
         * @memberof DropList
         * @inner
         */
        this._observe('value', (value, prev) => {
            this.updateCheckItem();
            this.change(value, prev, this);
        });

        /**
         * @member {number} pos 在列表中的位置
         * @memberof DropList
         * @inner
         */
        this._observe('pos', '-1', (value) => {
            this.value = value !== -1 ? this.list[value] : null;
        });

        /**
         * @member {*} check 选中项
         * @memberof DropList
         * @inner
         */
        this._observe('check', (value) => {
            this.pos = this.findItem(value, this.standardList);
        });

        /**
         * @member {boolean} hover 是否悬浮显示
         * @memberof DropList
         * @inner
         */
        this._observe('hover', (value) => {});

        /**
         * @member {function} change 切换点检项触发事件
         * @memberof DropList
         * @inner
         */
        this.change = (value, prev, target) => {};
    }

    /**
     * 加载
     * @param {object} [option={}] 入参
     * @param {string} option.label 标签
     * @param {array} option.list 数据列表
     * @param {number | string | object} option.check 选中项
     * @param {function} option.change 切换选中项后触发的事件
     * @param {boolean} option.hover 是否悬浮显示
     */
    load(option = {}) {
        this.show = false;
        this.label = option.label;
        this.list = option.list || [];
        this.hover = option.hover || false;
        if (option.check != null) {
            this.check = option.check;
        }
        if (typeof option.change === 'function') {
            this.change = option.change;
        }
    }

    /**
     * 事件
     */
    on() {
        // 点击输入框
        this.node.on('click', '.ly-form_content', () => {
            if (this.hover !== true) {
                let show = this.show;
                DropList._hideAll();
                this.show = !show;
            }
        });

        // 切换列表项
        this.node.on('click', '.ly-drop-list_item', (e, target) => {
            this.check = target.posOfSiblings();
        });

        // 鼠标滑入
        this.node.on('mouseover', '.ly-form_content', () => {
            if (this.hover === true) {
                this.show = true;
            }
        });

        // 鼠标滑出
        this.node.on('mouseout', '.ly-form_content', () => {
            if (this.hover === true) {
                this.show = false;
            }
        });
    }

    /**
     * 设置数据列表
     */
    setList() {
        let htmlStr = '',
            height = this.standardList.length * 32 || 32;

        this.standardList.forEach((item) => {
            htmlStr += `<li class="ly-drop-list_item" title="${item.value}">
                        <span>${item.value}</span>
                        <i class="ly-icon_check"></i>
                    </li>`;
        });

        this.node
            .css('--ly-form_height_drop-list', `${height + 40}px`)
            .find('.ly-drop-list_content')
            .html(htmlStr);
    }

    /**
     * 更新选中内容
     */
    updateCheckItem() {
        // 取消选中项
        this.node.find('.ly-drop-list_item-active').removeClass('ly-drop-list_item-active');

        // 选中当前项
        let text = '';
        if (this.pos > -1) {
            this.node.find('.ly-drop-list_item').eq(this.pos).addClass('ly-drop-list_item-active');
            text = this.standardList[this.pos].value;
        }
        this.node.find('.ly-form_input').val(text).attr('title', text);
        this.hover === false && (this.show = false);
    }

    /**
     * 获取选中项
     * @deprecated
     * @returns {*}
     */
    getCheckItem() {
        return this.value;
    }
}

// 当点击的不是下拉列表的时候，关闭下拉列表
if (typeof document !== 'undefined') {
    document.addEventListener('click', (e) => {
        let elem = new _base_my_node_js__WEBPACK_IMPORTED_MODULE_1__["default"](e.target);

        // 当点击的不是下拉列表的时候
        if (elem.parents('.ly-drop-list .ly-form_content').length === 0) {
            DropList._hideAll();
        }
    });
}

/**
 * 关闭所有下拉列表
 * @member {function} _hideAll
 * @memberof DropList
 * @static
 */
DropList._hideAll = function () {
    DropList._cache.forEach((item) => (item.show = false));
};

/**
 * 缓存
 * @member {Map} _cache
 * @memberof DropList
 * @static
 */
DropList._cache = new Map();

/**
 * 模板
 * @member {string} _template
 * @memberof DropList
 * @static
 * @example
 * <div class="ly-form ly-drop-list">
 *     <label class="ly-form_label"></label>
 *     <div class="ly-form_content">
 *         <div class="ly-form_input-container">
 *             <input class="ly-form_input" type="text" placeholder="请选择" readonly />
 *             <i class="ly-icon_arrow-down"></i>
 *         </div>
 *         <div class="ly-drop-list_container">
 *             <div class="ly-drop-list_space"></div>
 *             <ul class="ly-drop-list_content"></ul>
 *         </div>
 *     </div>
 * </div>
 */
DropList._template = `<div class="ly-form ly-drop-list">
    <label class="ly-form_label"></label>
    <div class="ly-form_content">
        <div class="ly-form_input-container">
            <input class="ly-form_input" type="text" placeholder="请选择" readonly />
            <i class="ly-icon_arrow-down"></i>
        </div>
        <div class="ly-drop-list_container">
            <div class="ly-drop-list_space"></div>
            <ul class="ly-drop-list_content"></ul>
        </div>
    </div>
</div>`;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DropList);


/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_drop_list_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(29);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_drop_list_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_drop_list_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_drop_list_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_drop_list_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 29 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.ly-drop-list {
    --ly-form_height_drop-list: 0;
}

.ly-drop-list .ly-form_input-container {
    justify-content: space-between;
    width: 200px;
}

.ly-drop-list .ly-form_input {
    width: calc(100% - 24px);
}

.ly-drop-list .ly-drop-list_container {
    position: absolute;
    top: 100%;
    left: -8px;
    width: auto;
    min-width: calc(100% + 16px);
    height: 0;
    overflow: hidden;
    transition: height 0.35s;
    z-index: 2;
}

.ly-drop-list .ly-drop-list_container > .ly-drop-list_space {
    position: relative;
    width: calc(100% - 16px);
    height: 12px;
    margin: 0 auto;
}

.ly-drop-list .ly-drop-list_container > .ly-drop-list_space::after {
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    left: 30%;
    transform: translateY(50%) rotate(45deg);
    width: 8px;
    height: 8px;
    background-color: #fff;
    border-top: 1px solid var(--ly-form_box-shadow-color);
    border-left: 1px solid var(--ly-form_box-shadow-color);
}

.ly-drop-list .ly-drop-list_container > .ly-drop-list_content {
    min-height: 52px;
    padding: 10px 0;
    margin: 0 8px;
    background-color: #fff;
    border-radius: 2px;
    border: 1px solid #e4e7ed;
    box-shadow: var(--ly-form_box-shadow);
}

.ly-drop-list .ly-drop-list_container > .ly-drop-list_content:empty::after {
    content: '暂无数据';
    display: inline-flex;
    align-items: center;
    position: absolute;
    top: 20px;
    left: 8px;
    width: calc(100% - 52px);
    height: var(--ly-form_line-height);
    padding: 0 10px;
    margin: 2px 0;
    font-size: 14px;
    color: #ccc;
}

.ly-drop-list
    .ly-drop-list_container
    > .ly-drop-list_content
    > .ly-drop-list_item {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: var(--ly-form_line-height);
    color: #333;
    white-space: nowrap;
    padding: 0 10px;
    cursor: pointer;
}

.ly-drop-list .ly-drop-list_item > .ly-icon_check {
    display: none;
}

.ly-drop-list
    .ly-drop-list_container
    > .ly-drop-list_content
    > .ly-drop-list_item:hover {
    background-color: #e1eeff;
}

.ly-drop-list
    .ly-drop-list_container
    > .ly-drop-list_content
    > .ly-drop-list_item
    > span {
    display: inline-block;
    width: 100%;
    font-size: var(--ly-form_font-size);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.ly-drop-list[data-status='up'] .ly-form_input-container {
    border-color: var(--ly-form_color_blue);
}

.ly-drop-list .ly-icon_arrow-down {
    transition: transform 0.2s;
}

.ly-drop-list[data-status='up'] .ly-icon_arrow-down {
    transform: rotate(-180deg);
}

.ly-drop-list[data-status='up'] .ly-drop-list_container {
    height: var(--ly-form_height_drop-list);
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _radio_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(31);
/* harmony import */ var _form_form_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(24);



/**
 * @description 单选框
 * @author wang.xin
 * @extends {Form}
 * @example
 * new Radio({
 *     elem: '',
 *     list: [],
 *     change: (value, prev, target) => {}
 * });
 */
class Radio extends _form_form_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
    /**
     * @description Creates an instance of Radio.
     * @param {object} [option={}] 配置参数
     * @param {string | Node | MyNode} option.elem CSS选择器、Node节点、MyNode
     * @param {string} option.label 标签
     * @param {array} option.list 数据列表
     * @param {number | string | object} option.check 选中项
     * @param {function} option.change 切换选中项后触发的事件
     * @param {boolean} option.required 是否必选
     * @param {string} option.relation 组件放置关系
     */
    constructor(option = {}) {
        super({
            elem: option.elem,
            relation: option.relation,
            template: Radio._template
        });

        // 若在缓存中则直接返回缓存中的实例
        if (Radio._cache.get(this.node[0])) {
            return Radio._cache.get(this.node[0]);
        }
        Radio._cache.set(this.node[0], this);

        this.init();
        this.load(option);
    }

    /**
     * 初始化
     */
    init() {
        this.monitor();
        this.on();
    }

    /**
     * @description 设置监听属性
     */
    monitor() {
        /**
         * @member {string} label 标签
         * @memberof Radio
         * @inner
         */
        this._observe('label', (value) => {
            this.setLabel(value);
        });

        /**
         * @member {array} list 数据列表
         * @memberof Radio
         * @inner
         */
        this._observe('list', (value) => {
            this.standardList = this.formatList(value);
        });

        /**
         * @member {array} standardList 格式化的数据列表
         * @memberof Radio
         * @inner
         */
        this._observe('standardList', () => {
            this.setList();
        });

        /**
         * @member {*} value 值
         * @memberof Radio
         * @inner
         */
        this._observe('value', (value, prev) => {
            this.updateCheckItem();
            this.change(value, prev, this);
        });

        /**
         * @member {number} pos 在列表中的位置
         * @memberof Radio
         * @inner
         */
        this._observe('pos', (value) => {
            this.value = value !== -1 ? this.list[value] : null;
        });

        /**
         * @member {*} check 选中项
         * @memberof Radio
         * @inner
         */
        this._observe('check', (value) => {
            this.pos = this.findItem(value, this.standardList);
        });

        /**
         * @member {boolean} required 是否必选
         * @memberof Radio
         * @inner
         */
        this._observe('required', false);

        /**
         * @member {function} change 值发生变化时的回调方法
         * @memberof Radio
         * @inner
         */
        this.change = () => {};
    }

    /**
     * @description 事件
     */
    on() {
        this.node.on('click', '.ly-radio_item', (e, target) => {
            if (this.required === false && target.hasClass('ly-radio_item-active')) {
                this.check = null;
            } else {
                this.check = target.posOfSiblings();
            }
        });
    }

    /**
     * @description 加载
     * @param {object} [option={}] 入参
     * @param {string} option.label 标签
     * @param {array} option.list 数据列表
     * @param {number | string | object} option.check 选中项
     * @param {function} option.change 切换选中项后触发的事件
     */
    load(option = {}) {
        this.label = option.label;
        this.list = option.list || [];
        this.check = option.check;
        this.required = option.required || this.required;
        if (this.required) {
            if (this.value == null && this.list.length !== 0) {
                this.check = 0;
            }
        }
        if (typeof option.change === 'function') {
            this.change = option.change;
        }
    }

    /**
     * @description 更新数据列表
     */
    setList() {
        let htmlStr = '';

        this.standardList.forEach((item) => {
            htmlStr += `<li class="ly-radio_item" title="${item.value}">
                            <i class="ly-radio_item-icon"></i>
                            <span>${item.value}</span>
                        </li>`;
        });

        this.node.find('.ly-radio_list').html(htmlStr);
    }

    /**
     * @description 更新选中样式
     */
    updateCheckItem() {
        this.node.find('.ly-radio_item-active').removeClass('ly-radio_item-active');

        if (this.pos !== -1) {
            this.node.find('.ly-radio_item').eq(this.pos).addClass('ly-radio_item-active');
        }
    }
}

/**
 * @member {Map} _cache 缓存
 * @memberof Radio
 * @static
 */
Radio._cache = new Map();

/**
 * @member {string} _template 模版
 * @memberof Radio
 * @static
 * @example
 * <div class="ly-form ly-radio">
 *   <label class="ly-form_label"></label>
 *   <div class="ly-form_content">
 *      <ul class="ly-radio_list"></ul>
 *   </div>
 * </div>
 */
Radio._template = `<div class="ly-form ly-radio">
    <label class="ly-form_label"></label>
    <div class="ly-form_content">
        <ul class="ly-radio_list"></ul>
    </div>
</div>`;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Radio);


/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_radio_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(32);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_radio_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_radio_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_radio_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_radio_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 32 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.ly-radio {
    --ly-radio_border-color_icon: #333;
    --ly-radio_color_active: var(--ly-form_color_blue);
    --ly-radio_height: 32px;
}

.ly-radio .ly-radio_list {
    margin: 0;
    padding: 0;
}

.ly-radio .ly-radio_list > .ly-radio_item {
    display: inline-flex;
    align-items: center;
    height: var(--ly-radio_height);
    line-height: var(--ly-radio_height);
    margin-right: 20px;
    list-style: none;
    cursor: pointer;
}

.ly-radio .ly-radio_list > .ly-radio_item-active {
    color: var(--ly-radio_color_active);
}

.ly-radio .ly-radio_list > .ly-radio_item > .ly-radio_item-icon {
    position: relative;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 1px solid var(--ly-radio_border-color_icon);
    margin-right: 4px;
}

.ly-radio .ly-radio_list > .ly-radio_item > .ly-radio_item-icon::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: #fff;
    transition: transform 0.15s ease-in;
}

.ly-radio .ly-radio_list > .ly-radio_item:hover {
    color: var(--ly-radio_color_active);
}

.ly-radio .ly-radio_list > .ly-radio_item:hover > .ly-radio_item-icon {
    border-color: var(--ly-radio_color_active);
}

.ly-radio .ly-radio_list > .ly-radio_item-active > .ly-radio_item-icon {
    border-color: var(--ly-radio_color_active);
    background-color: var(--ly-radio_color_active);
}

.ly-radio .ly-radio_list > .ly-radio_item-active > .ly-radio_item-icon::after {
    transform: translate(-50%, -50%) scale(1);
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _checkbox_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(34);
/* harmony import */ var _form_form_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(24);
/* harmony import */ var _base_util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13);




/**
 * 复选框
 * @author wang.xin
 * @extends {Form}
 * @example
 * new Checkbox({
 *     elem: '',
 *     list: [],
 *     change: (value, prev, target) => {}
 * });
 */
class Checkbox extends _form_form_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
    /**
     * Creates an instance of Checkbox.
     * @param {object} [option={}] 配置参数
     * @param {string | Node | MyNode} option.elem CSS选择器、Node节点、MyNode
     * @param {string} option.label 标签
     * @param {array} option.list 数据列表
     * @param {string} [option.all] 全选项名称（当传参的时候，代表有全选）
     * @param {boolean} [option.allCheck] 全选（true 代表选中，false 代表未选中）
     * @param {number | string | object | array} option.check 选中项
     * @param {function} option.change 切换选中项后触发的事件
     * @param {string} option.relation 组件放置关系
     * @param {number} option.maxCount 最多可选个数
     * @param {function} option.error 错误触发事件
     */
    constructor(option = {}) {
        super({
            elem: option.elem,
            relation: option.relation,
            template: Checkbox._template
        });

        // 若在缓存中则直接返回缓存中的实例
        if (Checkbox._cache.get(this.node[0])) {
            return Checkbox._cache.get(this.node[0]);
        }
        Checkbox._cache.set(this.node[0], this);

        this.init();
        this.load(option);
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
         * @member {string} label 标签
         * @memberof Checkbox
         * @inner
         */
        this._observe('label', (value) => {
            this.setLabel(value);
        });

        /**
         * @member {array} list 数据列表
         * @memberof Checkbox
         * @inner
         */
        this._observe('list', (value) => {
            this.standardList = this.formatList(value);
        });

        /**
         * @member {array} standardList 格式化的数据列表
         * @memberof Checkbox
         * @inner
         */
        this._observe('standardList', () => {
            this.setList();
        });

        /**
         * @member {array} value 选中值
         * @memberof Checkbox
         * @inner
         */
        this._observe('value', (value, prev) => {
            if (this.standardList.length === 0) {
                return;
            }

            if (value.length === this.standardList.length && this.allCheck !== true) {
                this.allCheck = true;
            } else if (value.length !== this.standardList.length && this.allCheck === true) {
                this.allCheck = false;
            }

            // 更新选中效果
            this.updateCheckItem();
            this.change(value, prev, this);
        });

        /**
         * @member {number[]} pos 在列表中的位置
         * @memberof Checkbox
         * @inner
         */
        this._observe('pos', (value) => {
            this.value = value.map((item) => this.list[item]);
        });

        /**
         * @member {*} check 选中项
         * @memberof Checkbox
         * @inner
         */
        this._observe('check', (value) => {
            let pos = this.findItem(value, this.standardList);

            this.pos = _base_util_js__WEBPACK_IMPORTED_MODULE_2__["default"].type(pos) === 'array' ? pos : [pos];
        });

        /**
         * @member {boolean | string} all 全选项
         * @memberof Checkbox
         * @inner
         */
        this._observe('all', (value) => {
            this.setAllItem();
        });

        /**
         * @member {boolean} allCheck 全选中
         * @memberof Checkbox
         * @inner
         */
        this._observe('allCheck', false, (value) => {
            if (value === true && this.check.length !== this.standardList.length) {
                this.check = this.standardList.map((item, index) => index);
            } else if (value === false && this.check.length === this.standardList.length) {
                this.check = [];
            }
        });

        /**
         * @member {function} change 值发生变化时的回调方法
         * @memberof Checkbox
         * @inner
         */
        this.change = () => {};

        /**
         * @member {number} maxCount 最多可选个数
         * @memberof Checkbox
         * @inner
         */
        this._observe('maxCount', -1);

        /**
         * @member {function} error 错误触发事件
         * @memberof Checkbox
         * @inner
         * @example
         * type = 1, 代表选中的个数已经达到最大值
         */
        this.error = (type) => {};

        /**
         * @member {*} disabled 不可更改项
         * @memberof Checkbox
         * @inner
         */
        this._observe('disabled', (value) => {
            let pos = this.findItem(value, this.standardList);

            this.disabledPos = _base_util_js__WEBPACK_IMPORTED_MODULE_2__["default"].type(pos) === 'array' ? pos : [pos];
        });

        /**
         * @member {number[]} disabledPos 不可更改项在列表中的位置
         * @memberof Checkbox
         * @inner
         */
        this._observe('disabledPos', (value) => {
            this.node.find('.ly-checkbox_item').removeClass('ly-checkbox_item-disabled');
            value.forEach((elem) => {
                let node = this.node.find('.ly-checkbox_item').eq(elem);

                if (this.all !== false) {
                    node = this.node.find('.ly-checkbox_item').eq(elem + 1);
                }
                node.addClass('ly-checkbox_item-disabled');
            });
        });
    }

    /**
     * 事件
     */
    on() {
        // 单个选项
        this.node.on('click', '.ly-checkbox_item[data-type="single"]:not(.ly-checkbox_item-disabled)', (e, target) => {
            if (
                this.maxCount !== -1 &&
                this.check.length === this.maxCount &&
                !target.hasClass('ly-checkbox_item-active')
            ) {
                this.error(0);
                return;
            }

            target.toggleClass('ly-checkbox_item-active');
            if (this.all === false) {
                // 没有全选
                this.check = this.node.find('.ly-checkbox_item-active[data-type="single"]').map((item, index, list) => {
                    return list.eq(index).posOfSiblings();
                });
            } else {
                this.check = this.node.find('.ly-checkbox_item-active[data-type="single"]').map((item, index, list) => {
                    return list.eq(index).posOfSiblings() - 1;
                });
            }
        });

        // 全选按钮
        this.node.on('click', '.ly-checkbox_item[data-type="all"]:not(.ly-checkbox_item-disabled)', () => {
            this.allCheck = !this.allCheck;
        });
    }

    /**
     * 加载
     * @param {object} [option={}] 入参
     * @param {string} option.label 标签
     * @param {array} option.list 数据列表
     * @param {string} [option.all] 全选项名称（当传参的时候，代表有全选）
     * @param {number | string | object | array} option.check 选中项
     * @param {number | string | object | array} option.disabled 不可更改项
     * @param {boolean} [option.allCheck] 全选（true 代表选中）
     * @param {function} option.change 切换选中项后触发的事件
     * @param {number} option.maxCount 最多可选个数
     * @param {function} option.error 错误触发事件
     */
    load(option = {}) {
        this.label = option.label;
        this.list = option.list || [];
        this.all = option.all || false;
        this.check = option.check != null ? option.check : [];
        this.disabled = option.disabled != null ? option.disabled : [];
        this.maxCount = option.maxCount || this.maxCount;
        if (this.all !== false && option.allCheck === true) {
            this.allCheck = true;
        }
        if (typeof option.change === 'function') {
            this.change = option.change;
        }
        if (typeof option.error === 'function') {
            this.error = option.error;
        }
    }

    /**
     * 设置数据列表
     */
    setList() {
        let htmlStr = '';

        this.standardList.forEach((item) => {
            htmlStr += `<li class="ly-checkbox_item" data-type="single" title="${item.value}">
                            <i class="ly-checkbox_item-icon"></i>
                            <span>${item.value}</span>
                        </li>`;
        });

        this.node.find('.ly-checkbox_list').html(htmlStr);
        this.setAllItem();
    }

    /**
     * 设置全选项
     */
    setAllItem() {
        this.node.find('.ly-checkbox_item[data-type="all"]').remove();
        if (this.all !== false) {
            this.node.find('.ly-checkbox_list').prepend(
                `<li class="ly-checkbox_item" data-type="all" title="${this.all}">
                    <i class="ly-checkbox_item-icon"></i>
                    <span>${this.all}</span>
                </li>`
            );
        }
    }

    /**
     * 更新选中样式
     */
    updateCheckItem() {
        // 先重置为未选中再选中指定的节点
        this.node.find('.ly-checkbox_item').removeClass('ly-checkbox_item-active');

        // 更新选中项
        let step = this.all ? 1 : 0;
        this.pos.forEach((item) =>
            this.node
                .find('.ly-checkbox_item')
                .eq(item + step)
                .addClass('ly-checkbox_item-active')
        );
        this.allCheck && this.node.find('.ly-checkbox_item[data-type="all"]').addClass('ly-checkbox_item-active');
    }
}

/**
 * @member {Map} _cache 缓存
 * @memberof Checkbox
 * @static
 */
Checkbox._cache = new Map();

/**
 * @member {string} _template 模版
 * @memberof Checkbox
 * @static
 * @example
 * <div class="ly-form ly-checkbox">
 *   <label class="ly-form_label"></label>
 *   <div class="ly-form_content">
 *      <ul class="ly-checkbox_list"></ul>
 *   </div>
 * </div>
 */
Checkbox._template = `<div class="ly-form ly-checkbox">
    <label class="ly-form_label"></label>
    <div class="ly-form_content">
        <ul class="ly-checkbox_list"></ul>
    </div>
</div>`;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Checkbox);


/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_checkbox_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(35);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_checkbox_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_checkbox_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_checkbox_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_checkbox_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 35 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.ly-checkbox {
    --ly-checkbox_border-color_icon: #333;
    --ly-checkbox_color_active: var(--ly-form_color_blue);
    --ly-checkbox_height: 32px;
}

.ly-checkbox .ly-checkbox_list {
    margin: 0;
    padding: 0;
}

.ly-checkbox .ly-checkbox_item {
    display: inline-flex;
    align-items: center;
    height: var(--ly-checkbox_height);
    line-height: var(--ly-checkbox_height);
    margin-right: 20px;
    list-style: none;
    cursor: pointer;
}

.ly-checkbox .ly-checkbox_item-active {
    color: var(--ly-checkbox_color_active);
}

.ly-checkbox .ly-checkbox_item-icon {
    position: relative;
    width: 14px;
    height: 14px;
    border-radius: 2px;
    border: 1px solid var(--ly-checkbox_border-color_icon);
    margin-right: 4px;
}

.ly-checkbox .ly-checkbox_item-icon::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -67.5%) rotate(45deg) scale(0);
    width: 25%;
    height: 50%;
    border-bottom: 2px solid #fff;
    border-right: 2px solid #fff;
    transition: transform 0.15s ease-in;
    box-sizing: content-box;
}

.ly-checkbox
    .ly-checkbox_list
    > .ly-checkbox_item:not(.ly-checkbox_item-disabled):hover {
    color: var(--ly-checkbox_color_active);
}

.ly-checkbox
    .ly-checkbox_list
    > .ly-checkbox_item:not(.ly-checkbox_item-disabled):hover
    > .ly-checkbox_item-icon {
    border-color: var(--ly-checkbox_color_active);
}

.ly-checkbox .ly-checkbox_item-active > .ly-checkbox_item-icon {
    border-color: var(--ly-checkbox_color_active);
    background-color: var(--ly-checkbox_color_active);
}

.ly-checkbox .ly-checkbox_item-active > .ly-checkbox_item-icon::after {
    transform: translate(-50%, -67.5%) rotate(45deg) scale(1);
}

.ly-checkbox .ly-checkbox_item-disabled {
    color: #ddd;
    cursor: not-allowed;
}

.ly-checkbox .ly-checkbox_item-disabled > .ly-checkbox_item-icon {
    border-color: #ddd;
}

.ly-checkbox
    .ly-checkbox_item-active.ly-checkbox_item-disabled
    > .ly-checkbox_item-icon {
    border-color: #ddd;
    background-color: #ddd;
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _switch_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(37);
/* harmony import */ var _form_form_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(24);



/**
 * @description 单选框
 * @author wang.xin
 * @extends {Form}
 * @example
 * new Switch({
 *     elem: '',
 *     change: (value, prev, target) => {}
 * });
 */
class Switch extends _form_form_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
    /**
     * @description Creates an instance of Switch.
     * @param {object} [option={}] 配置参数
     * @param {string | Node | MyNode} option.elem CSS选择器、Node节点、MyNode
     * @param {string} option.label 标签
     * @param {boolean} option.value 选中项
     * @param {function} option.change 切换选中项后触发的事件
     * @param {string} option.relation 组件放置关系
     */
    constructor(option = {}) {
        super({
            elem: option.elem,
            relation: option.relation,
            template: Switch._template
        });

        // 若在缓存中则直接返回缓存中的实例
        if (Switch._cache.get(this.node[0])) {
            return Switch._cache.get(this.node[0]);
        }
        Switch._cache.set(this.node[0], this);

        this.init();
        this.load(option);
    }

    /**
     * 初始化
     */
    init() {
        this.monitor();
        this.on();
    }

    /**
     * @description 设置监听属性
     */
    monitor() {
        /**
         * @member {string} label 标签
         * @memberof Switch
         * @inner
         */
        this._observe('label', (value) => {
            this.setLabel(value);
        });

        /**
         * @member {*} value 值
         * @memberof Switch
         * @inner
         */
        this._observe('value', (value, prev) => {
            this.node.find('.ly-switch_btn').attr('data-status', value ? 1 : 0);
            this.change(value, prev, this);
        });

        /**
         * @member {function} change 值发生变化时的回调方法
         * @memberof Switch
         * @inner
         */
        this.change = () => {};
    }

    /**
     * @description 事件
     */
    on() {
        this.node.on('click', '.ly-switch_btn', () => {
            this.value = !this.value;
        });
    }

    /**
     * @description 加载
     * @param {object} [option={}] 入参
     * @param {string} option.label 标签
     * @param {boolean} option.value 选中项
     * @param {function} option.change 切换选中项后触发的事件
     */
    load(option = {}) {
        this.label = option.label;
        this.value = option.value;
        if (typeof option.change === 'function') {
            this.change = option.change;
        }
    }
}

/**
 * @member {Map} _cache 缓存
 * @memberof Switch
 * @static
 */
Switch._cache = new Map();

/**
 * @member {string} _template 模版
 * @memberof Switch
 * @static
 * @example
 * <div class="ly-form ly-switch">
 *   <label class="ly-form_label"></label>
 *   <div class="ly-form_content">
 *      <span class="ly-switch_btn" data-status="0"></span>
 *   </div>
 * </div>
 */
Switch._template = `<div class="ly-form ly-switch">
    <label class="ly-form_label"></label>
    <div class="ly-form_content">
        <span class="ly-switch_btn" data-status="0"></span>
    </div>
</div>`;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Switch);


/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_switch_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(38);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_switch_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_switch_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_switch_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_switch_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 38 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.ly-switch_btn {
    --ly-switch_background-color: #ddd;
    --ly-switch_color_active: var(--ly-form_color_blue);

    position: relative;
    display: inline-flex;
    align-items: center;
    width: 40px;
    height: 20px;
    border-radius: 20px;
    cursor: pointer;
    background-color: var(--ly-switch_background-color);
}

.ly-switch_btn[data-status='1'] {
    background-color: var(--ly-switch_color_active);
}

.ly-switch_btn::after {
    content: '';
    display: block;
    position: absolute;
    left: 2px;
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #fff;
    transition: left 0.35s;
}

.ly-switch_btn[data-status='1']::after {
    left: calc(100% - 18px);
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 39 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _slider_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(40);
/* harmony import */ var _form_form_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(24);



/**
 * 滑块
 * @author wang.xin
 * @extends {Form}
 * @example
 * new Slider({
 *     elem: '',
 *     label: '',
 *     min: 0,
 *     max: 100,
 *     step: 1,
 *     value: 0,
 *     change: (value, prev, target) => {}
 * });
 */
class Slider extends _form_form_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
    /**
     * Creates an instance of Slider.
     * @param {object} [option={}] 配置参数
     * @param {string | Node | MyNode} option.elem CSS选择器、Node节点、MyNode
     * @param {string} option.label 标签
     * @param {number} [option.min=0] 最小值
     * @param {number} [option.max=100] 最大值
     * @param {number} [option.step=1] 步长
     * @param {number} [option.value=0] 初始值
     * @param {function} option.change 数值发生改变后触发的事件
     * @param {string} option.relation 组件放置关系
     */
    constructor(option = {}) {
        super({
            elem: option.elem,
            relation: option.relation,
            template: Slider._template
        });

        // 若在缓存中则直接返回缓存中的实例
        if (Slider._cache.get(this.node[0])) {
            return Slider._cache.get(this.node[0]);
        }
        Slider._cache.set(this.node[0], this);

        this.init();
        this.load(option);
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
         * @member {string} label 标签
         * @memberof Slider
         * @inner
         */
        this._observe('label', (value) => {
            this.setLabel(value);
        });

        /**
         * @member {number} min 最小值
         * @memberof Slider
         * @inner
         */
        this._observe('min', 0, (value) => {});

        /**
         * @member {number} max 最大值
         * @memberof Slider
         * @inner
         */
        this._observe('max', 100, (value) => {});

        /**
         * @member {number} step 步长
         * @memberof Slider
         * @inner
         */
        this._observe('step', 1, (value) => {
            let arr = (value + '').split('.');

            this.decimal = arr[1] ? arr[1].length : 0;
        });

        /**
         * @member {number} decimal 小数点后保留位数
         * @memberof Slider
         * @inner
         */
        this._observe('decimal', 0, (value) => {});

        /**
         * @member {number} value 值
         * @memberof Slider
         * @inner
         */
        this._observe('value', 0, (value, prev) => {
            this.update();
            this.change(value, prev, this);
        });

        /**
         * @member {number} valid 在设置value前校验
         * @memberof Slider
         * @inner
         */
        this._observe('valid', 0, (value) => {
            this.value = Math.min(Math.max(this.min, value), this.max);
        });

        /**
         * @member {number} pageX 鼠标位置横坐标
         * @memberof Slider
         * @inner
         */
        this._observe('pageX', 0, (value) => {
            this.dragWidth = value - this.node.find('.ly-slider_content').offset().left;
        });

        /**
         * @member {boolean} drag 拖拽状态
         * @memberof Slider
         * @inner
         */
        this._observe('drag', false, () => {});

        /**
         * @member {number} dragWidth 鼠标拖拽偏移距离
         * @memberof Slider
         * @inner
         */
        this._observe('dragWidth', 0, (value) => {
            let width = this.node.find('.ly-slider_content').width(),
                rate = (this.max - this.min) / width,
                result = this.min + value * rate;

            this.valid = parseInt(result * Math.pow(10, this.decimal)) / Math.pow(10, this.decimal);
        });

        /**
         * @member {function} change 值发生变化时的回调方法
         * @memberof Slider
         * @inner
         */
        this.change = () => {};
    }

    /**
     * 事件
     */
    on() {
        // 点击
        this.node.on('click', '.ly-slider_content', (e) => {
            this.pageX = e.pageX;
        });

        // 鼠标按下
        this.node.on('mousedown', '.ly-slider_control', () => {
            this.drag = true;
        });

        // input 改变
        this.node.find('.ly-slider_value').on('change', (e, target) => {
            this.valid = parseFloat(target.val());
        });

        // 键盘上下键
        this.node.find('.ly-slider_value').on('keydown', (e, target) => {
            switch (e.key) {
                case 'ArrowDown':
                    this.valid = this.value - parseFloat(this.step);
                    break;

                case 'ArrowUp':
                    this.valid = this.value + parseFloat(this.step);
                    break;

                case 'Enter':
                    this.valid = parseFloat(target.val());
                    break;

                default:
                    break;
            }
        });
    }

    /**
     * 加载
     * @param {object} [option={}] 配置参数
     * @param {string} option.label 标签
     * @param {number} [option.min=0] 最小值
     * @param {number} [option.max=100] 最大值
     * @param {number} [option.step=1] 步长
     * @param {number} [option.value=0] 初始值
     * @param {function} option.change 数值发生改变后触发的事件
     */
    load(option) {
        this.label = option.label;
        this.min = option.min || 0;
        this.max = option.max || 100;
        this.step = option.step || 1;
        this.valid = option.value || 0;
        if (typeof option.change === 'function') {
            this.change = option.change;
        }
    }

    /**
     * 更新
     */
    update() {
        let range = this.max - this.min,
            diff = this.value - this.min;

        this.node.find('.ly-slider_value').val(this.value);
        this.node.css('--ly-slider_width_value', (diff / range) * 100 + '%');
    }
}

if (typeof document !== 'undefined') {
    // 当滑块的拖动状态为 true，鼠标拖动
    document.addEventListener('mousemove', function (e) {
        Slider._cache.forEach((item) => {
            if (item.drag === true) {
                item.pageX = e.pageX;
                e.preventDefault();
            }
        });
    });

    // 当释放鼠标的时候，设置滑块的拖动状态为 false
    document.addEventListener('mouseup', function () {
        Slider._cache.forEach((item) => (item.drag = false));
    });
}

/**
 * 缓存
 * @member {Map} _cache
 * @memberof Slider
 * @static
 */
Slider._cache = new Map();

/**
 * 模板
 * @member {string} _template
 * @memberof Slider
 * @static
 * @example
 * <div class="ly-form ly-slider">
 *     <label class="ly-form_label"></label>
 *     <div class="ly-form_content">
 *         <div class="ly-slider_content">
 *             <span class="ly-slider_control"></span>
 *         </div>
 *         <input class="ly-slider_value" type="text" value="" />
 *     </div>
 * </div>
 */
Slider._template = `<div class="ly-form ly-slider">
    <label class="ly-form_label"></label>
    <div class="ly-form_content">
        <div class="ly-slider_content">
            <span class="ly-slider_control"></span>
        </div>
        <input class="ly-slider_value" type="text" value="" />
    </div>
</div>`;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Slider);


/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_slider_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(41);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_slider_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_slider_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_slider_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_slider_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 41 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.ly-slider {
    --ly-slider_width_value: 0%;
    --ly-slider_height: 6px;
}

.ly-slider .ly-slider_content {
    position: relative;
    width: 200px;
    height: var(--ly-slider_height);
    margin-left: var(--ly-slider_height);
    border-radius: var(--ly-slider_height);
    background-color: #eee;
    cursor: pointer;
}

.ly-slider .ly-slider_content::after {
    content: '';
    float: left;
    width: var(--ly-slider_width_value);
    min-width: 0;
    max-width: 100%;
    height: var(--ly-slider_height);
    border-radius: var(--ly-slider_height) 0 0 var(--ly-slider_height);
    background-color: var(--ly-form_color_blue);
}

.ly-slider .ly-slider_content > .ly-slider_control {
    position: absolute;
    top: 50%;
    left: var(--ly-slider_width_value);
    transform: translate(-50%, -50%);
    width: calc(3 * var(--ly-slider_height));
    height: calc(3 * var(--ly-slider_height));
    border-radius: 50%;
    border: 2px solid var(--ly-form_color_blue);
    background-color: #fff;
    cursor: grab;
}

.ly-slider .ly-slider_content > .ly-slider_control:hover {
    width: calc(3 * var(--ly-slider_height) + 2px);
    height: calc(3 * var(--ly-slider_height) + 2px);
}

.ly-slider .ly-slider_value {
    display: inline-flex;
    align-items: center;
    width: 50px;
    height: 30px;
    margin-left: 28px;
    border: 1px solid var(--ly-form_color_gray3);
    border-radius: 2px;
    outline: none;
    padding: 0 10px;
    color: #777;
    text-align: center;
}

.ly-slider .ly-slider_value:focus {
    border-color: var(--ly-form_color_blue);
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 42 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _multiple_list_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(43);
/* harmony import */ var _base_my_node_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18);
/* harmony import */ var _drop_list_drop_list_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(27);
/* harmony import */ var _base_util_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(13);





/**
 * 下拉多选列表
 * @author wang.xin
 * @extends {DropList}
 * @example
 * new MultipleList({
 *     elem: '',
 *     list: [],
 *     change: (value, prev, target) => {}
 * });
 */
class MultipleList extends _drop_list_drop_list_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
    /**
     * Creates an instance of MultipleList.
     * @param {object} [option={}] 配置参数
     * @param {string | Node | MyNode} option.elem CSS选择器、Node节点、MyNode
     * @param {string} option.label 标签
     * @param {array} option.list 数据列表
     * @param {number | string | object | array} option.check 选中项
     * @param {function} option.change 切换选中项后触发的事件
     * @param {boolean} option.hover 是否悬浮显示
     * @param {number} option.maxCount 最多可选个数
     * @param {function} option.error 错误触发事件
     * @param {string} option.relation 组件放置关系
     */
    constructor(option = {}) {
        super(
            Object.assign(option, {
                template: option.template || MultipleList._template
            })
        );
    }

    /**
     * 属性
     */
    monitor() {
        /**
         * @member {boolean} show 是否显示下拉列表
         * @memberof MultipleList
         * @inner
         */
        this._observe('show', (value) => {
            this.node.attr('data-status', value ? 'up' : 'down');
        });

        /**
         * @member {string} label 标签
         * @memberof MultipleList
         * @inner
         */
        this._observe('label', (value) => {
            this.setLabel(value);
        });

        /**
         * @member {array} list 数据列表
         * @memberof MultipleList
         * @inner
         */
        this._observe('list', (value) => {
            this.standardList = this.formatList(value);
        });

        /**
         * @member {array} standardList 格式化的数据列表
         * @memberof MultipleList
         * @inner
         */
        this._observe('standardList', () => {
            this.setList();
        });

        /**
         * @member {*} value 值
         * @memberof MultipleList
         * @inner
         */
        this._observe('value', (value, prev) => {
            this.updateCheckItem();
            this.change(value, prev, this);
        });

        /**
         * @member {number[]} pos 在列表中的位置
         * @memberof MultipleList
         * @inner
         */
        this._observe('pos', (value) => {
            this.value = value.map((item) => this.list[item]);
        });

        /**
         * @member {*} check 选中项
         * @memberof MultipleList
         * @inner
         */
        this._observe('check', [], (value) => {
            let pos = this.findItem(value, this.standardList);

            this.pos = _base_util_js__WEBPACK_IMPORTED_MODULE_3__["default"].type(pos) === 'array' ? pos : [pos];
        });

        /**
         * @member {boolean} hover 是否悬浮显示
         * @memberof MultipleList
         * @inner
         */
        this._observe('hover', (value) => {});

        /**
         * @member {number} maxCount 最多可选个数
         * @memberof MultipleList
         * @inner
         */
        this._observe('maxCount', -1);

        /**
         * @member {function} change 切换点检项触发事件
         * @memberof MultipleList
         * @inner
         */
        this.change = (value, prev, target) => {};

        /**
         * @member {function} error 错误触发事件
         * @memberof MultipleList
         * @inner
         * @example
         * type = 1, 代表选中的个数已经达到最大值
         */
        this.error = (type) => {};
    }

    /**
     * 事件
     */
    on() {
        // 点击输入框
        this.node.on('click', '.ly-form_content', (e, target, listener, source) => {
            let show = this.show;
            this.constructor._hideAll();

            if (source.hasClass('ly-drop-list_item') || source.parents('.ly-drop-list_item').length !== 0) {
                // 当触发源是下拉列表项时，不改变显示状态
                this.show = show;
            } else if (source.hasClass('ly-icon_remove')) {
                // 当触发源是删除按钮时，不改变现实状态，并删除
                this.show = show;
                let list = _base_util_js__WEBPACK_IMPORTED_MODULE_3__["default"].proxyToJSON(this.check);
                list.shift();
                this.check = list;
            } else if (this.hover !== true) {
                // 当未做悬浮触发时，隐藏下拉列表
                this.show = !show;
            }
        });

        // 切换列表项
        this.node.on('click', '.ly-drop-list_item', (e, target) => {
            if (
                this.maxCount !== -1 &&
                this.check.length === this.maxCount &&
                !target.hasClass('ly-drop-list_item-active')
            ) {
                this.error(0);
                return;
            }

            target.toggleClass('ly-drop-list_item-active');
            this.check = this.node
                .find('.ly-drop-list_item-active')
                .map((item, index, list) => list.eq(index).posOfSiblings());
        });

        // 鼠标滑入
        this.node.on('mouseover', '.ly-form_content', () => {
            if (this.hover === true) {
                this.show = true;
            }
        });

        // 鼠标滑出
        this.node.on('mouseout', '.ly-form_content', () => {
            if (this.hover === true) {
                this.show = false;
            }
        });
    }

    /**
     * 加载
     * @param {object} [option={}] 入参
     * @param {string} option.label 标签
     * @param {array} option.list 数据列表
     * @param {number | string | object | array} option.check 选中项
     * @param {function} option.change 切换选中项后触发的事件
     * @param {boolean} option.hover 是否悬浮显示
     * @param {number} option.maxCount 最多可选个数
     * @param {function} option.error 错误触发事件
     */
    load(option = {}) {
        this.show = false;
        this.label = option.label;
        this.list = option.list || [];
        this.hover = option.hover || false;
        this.maxCount = option.maxCount || this.maxCount;
        if (option.check != null) {
            this.check = option.check;
        }
        if (typeof option.error === 'function') {
            this.error = option.error;
        }
        if (typeof option.change === 'function') {
            this.change = option.change;
        }
    }

    /**
     * 更新选中内容
     */
    updateCheckItem() {
        // 先重置为未选中再选中指定的节点
        this.node.find('.ly-drop-list_item').removeClass('ly-drop-list_item-active');

        // 选中当前项
        this.pos.forEach((element) => {
            // 更新列表中选中状态
            this.node.find('.ly-drop-list_item').eq(element).addClass('ly-drop-list_item-active');
        });
        this.node.find('.ly-multiple-list_input-content').attr('data-count', this.pos.length);

        if (this.pos.length > 0) {
            let text = this.standardList[this.pos[0]].value;
            this.node.find('.ly-multiple-list_checked-text>span').text(text).attr('title', text);
            this.node.find('.ly-multiple-list_checked-num>span').eq(1).text(this.pos.length);
        }
    }
}

/**
 * 模板
 * @member {string} _template
 * @memberof MultipleList
 * @static
 * @example
 *  <div class="ly-form ly-drop-list ly-multiple-list">
 *      <label class="ly-form_label"></label>
 *      <div class="ly-form_content">
 *          <div class="ly-form_input-container">
 *              <div class="ly-multiple-list_input-content" data-count="0">
 *              <div class="ly-multiple-list_input">
 *                   <input class="ly-form_input" type="text" placeholder="请选择" readonly />
 *              </div>
 *              <div class="ly-multiple-list_checked-text">
 *                  <span></span>
 *                  <i class="ly-icon_remove"></i>
 *              </div>
 *              <div class="ly-multiple-list_checked-num">
 *                  <span>+</span>
 *                  <span></span>
 *              </div>
 *         </div>
 *         <i class="ly-icon_arrow-down"></i>
 *      </div>
 *      <div class="ly-drop-list_container">
 *          <div class="ly-drop-list_space"></div>
 *              <ul class="ly-drop-list_content"></ul>
 *          </div>
 *      </div>
 *  </div>
 */
MultipleList._template = `<div class="ly-form ly-drop-list ly-multiple-list">
    <label class="ly-form_label"></label>
    <div class="ly-form_content">
        <div class="ly-form_input-container">
            <div class="ly-multiple-list_input-content" data-count="0">
                <div class="ly-multiple-list_input">
                    <input class="ly-form_input" type="text" placeholder="请选择" readonly />
                </div>
                <div class="ly-multiple-list_checked-text">
                    <span></span>
                    <i class="ly-icon_remove"></i>
                </div>
                <div class="ly-multiple-list_checked-num">
                    <span>+</span>
                    <span></span>
                </div>
            </div>
            <i class="ly-icon_arrow-down"></i>
        </div>
        <div class="ly-drop-list_container">
            <div class="ly-drop-list_space"></div>
            <ul class="ly-drop-list_content"></ul>
        </div>
    </div>
</div>`;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MultipleList);


/***/ }),
/* 43 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_multiple_list_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(44);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_multiple_list_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_multiple_list_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_multiple_list_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_multiple_list_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 44 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.ly-multiple-list .ly-multiple-list_input-content {
    display: flex;
    width: calc(100% - 24px);
    height: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.ly-multiple-list .ly-multiple-list_input-content > .ly-multiple-list_input {
    display: none;
    align-items: center;
}

.ly-multiple-list
    .ly-multiple-list_input-content[data-count='0']
    > .ly-multiple-list_input {
    display: inline-flex;
}

.ly-multiple-list
    .ly-multiple-list_input-content
    > .ly-multiple-list_checked-text {
    display: inline-flex;
    align-items: center;
    max-width: calc(100% - 32px);
    margin: 4px 0;
    padding: 0 5px;
    background-color: #f1f1f1;
    border: 1px solid #ededed;
    border-radius: 2px;
}

.ly-multiple-list
    .ly-multiple-list_input-content[data-count='0']
    > .ly-multiple-list_checked-text {
    display: none;
}

.ly-multiple-list .ly-multiple-list_checked-text > span {
    display: inline-block;
    height: 20px;
    line-height: 20px;
    max-width: calc(100% - 22px);
    margin-right: 8px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.ly-multiple-list .ly-multiple-list_checked-text > .ly-icon_remove {
    --color: #333;
    --background-color: transparent;
}

.ly-multiple-list .ly-multiple-list_checked-text > .ly-icon_remove:hover {
    --color: #fff;
    --background-color: var(--ly-form_color_icon);
}

.ly-multiple-list
    .ly-multiple-list_input-content
    > .ly-multiple-list_checked-num {
    display: inline-flex;
    align-items: center;
    padding: 0 4px;
    margin: 4px 0 4px 4px;
    border: 1px solid #ededed;
    border-radius: 2px;
    background-color: #f1f1f1;
}

.ly-multiple-list
    .ly-multiple-list_input-content[data-count='0']
    > .ly-multiple-list_checked-num,
.ly-multiple-list
    .ly-multiple-list_input-content[data-count='1']
    > .ly-multiple-list_checked-num {
    display: none;
}

.ly-multiple-list .ly-multiple-list_checked-num > span {
    float: left;
    color: #333;
}

.ly-multiple-list .ly-multiple-list_checked-num > span:nth-child(1) {
    margin-right: 2px;
}

/* 选中效果 */
.ly-multiple-list .ly-drop-list_item.ly-drop-list_item-active > .ly-icon_check {
    display: inline-block;
    --ly-form_color_icon: var(--ly-form_color_blue);
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 45 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _file_preview_file_preview_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(46);
/* harmony import */ var _file_upload_file_upload_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(49);
/* harmony import */ var _fixed_thead_table_fixed_thead_table_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(55);
/* harmony import */ var _pagination_pagination_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(58);
/* harmony import */ var _popup_popup_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(61);
/* harmony import */ var _scroll_bar_scroll_bar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(64);
/* harmony import */ var _scroll_top_scroll_top_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(67);
/* harmony import */ var _table_base_table_base_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(70);
/* harmony import */ var _table_fixed_cell_table_fixed_cell_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(73);
/* harmony import */ var _water_mark_water_mark__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(76);











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
    FilePreview: _file_preview_file_preview_js__WEBPACK_IMPORTED_MODULE_0__["default"],

    /**
     * 文件上传
     * @see FileUpload
     */
    FileUpload: _file_upload_file_upload_js__WEBPACK_IMPORTED_MODULE_1__["default"],

    /**
     * 固定表头
     * @see FixedTheadTable
     */
    FixedTheadTable: _fixed_thead_table_fixed_thead_table_js__WEBPACK_IMPORTED_MODULE_2__["default"],

    /**
     * 页码
     * @see Pagination
     */
    Pagination: _pagination_pagination_js__WEBPACK_IMPORTED_MODULE_3__["default"],

    /**
     * 弹窗
     * @see Popup
     */
    Popup: _popup_popup_js__WEBPACK_IMPORTED_MODULE_4__["default"],

    /**
     * 滚动条
     * @see ScrollBar
     */
    ScrollBar: _scroll_bar_scroll_bar__WEBPACK_IMPORTED_MODULE_5__["default"],

    /**
     * 置顶按钮
     * @see ScrollTop
     */
    ScrollTop: _scroll_top_scroll_top_js__WEBPACK_IMPORTED_MODULE_6__["default"],

    /**
     * 表格基类
     */
    TableBase: _table_base_table_base_js__WEBPACK_IMPORTED_MODULE_7__["default"],

    /**
     * 固定单元格
     */
    TableFixedCell: _table_fixed_cell_table_fixed_cell_js__WEBPACK_IMPORTED_MODULE_8__["default"],

    /**
     * 水印
     * @see WaterMark
     */
    WaterMark: _water_mark_water_mark__WEBPACK_IMPORTED_MODULE_9__["default"]
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Extend);


/***/ }),
/* 46 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _file_preview_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(47);
/* harmony import */ var _base_component_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(21);



/**
 * 文件预览
 * @extends {Component}
 */
class FilePreview extends _base_component_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FilePreview);


/***/ }),
/* 47 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_file_preview_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(48);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_file_preview_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_file_preview_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_file_preview_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_file_preview_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 48 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.ly-file-preview {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1001;
    background-color: rgba(0, 0, 0, 0.5);
}

.ly-file-preview > .ly-file-preview_content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 88%;
    height: 80%;
    overflow: hidden;
}

.ly-file-preview > .ly-file-preview_content > .ly-file-preview_item {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 100%;
    max-height: 100%;
}

.ly-file-preview > .ly-file-preview_tip {
    position: absolute;
    bottom: 5%;
    transform: translateY(50%);
    z-index: 2;
    width: 100%;
    color: #c7c7c7;
    text-align: center;
}

.ly-file-preview [data-action='prev'] {
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 3%;
    transform: translate(-50%, -50%) scale(1.5);
    display: inline-block;
    width: 30px;
    height: 30px;
    background-color: #777;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0.5;
}

.ly-file-preview [data-action='prev']::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-70%, -50%) scale(1.2);
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-right: 9px solid #fff;
    box-sizing: border-box;
    background-color: transparent;
}

.ly-file-preview [data-action='next'] {
    position: absolute;
    z-index: 2;
    top: 50%;
    right: 3%;
    transform: translate(50%, -50%) scale(1.5);
    display: inline-block;
    width: 30px;
    height: 30px;
    background-color: #777;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0.5;
}

.ly-file-preview [data-action='next']::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-30%, -50%) scale(1.2);
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 9px solid #fff;
    box-sizing: border-box;
    background-color: transparent;
}

.ly-file-preview [data-action='close'] {
    position: absolute;
    z-index: 2;
    top: 10px;
    right: 10px;
    transform: scale(0.6);
    display: inline-block;
    width: 30px;
    height: 30px;
    background-color: rgb(255, 255, 255);
    border-radius: 50%;
    opacity: 0.5;
    cursor: pointer;
}

.ly-file-preview [data-action='close']::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 2;
    transform: translate(-50%, -50%) rotate(45deg);
    width: 2px;
    height: 50%;
    background-color: rgba(0, 0, 0, 1);
}

.ly-file-preview [data-action='close']::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 2;
    transform: translate(-50%, -50%) rotate(135deg);
    width: 2px;
    height: 50%;
    background-color: rgba(0, 0, 0, 1);
}

.ly-file-preview [data-action]:hover {
    opacity: 1 !important;
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 49 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _file_upload_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(50);
/* harmony import */ var _base_component_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(21);
/* harmony import */ var _file_node_file_node_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(52);
/* harmony import */ var _file_preview_file_preview_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(46);





const { FILE_TYPE } = _file_node_file_node_js__WEBPACK_IMPORTED_MODULE_2__["default"];

/**
 * 文件上传
 * @author wang.xin
 * @extends Component
 */
class FileUpload extends _base_component_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
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
        this._children.filePreview = new _file_preview_file_preview_js__WEBPACK_IMPORTED_MODULE_3__["default"]();
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
            if (value.length === 1 && FILE_TYPE[value[0]].type != null) {
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
            if (target.find('.fn_file-item').length === 0) {
                this.errorCallback(3);
                return;
            }

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
            if (['maxSize', 'maxCount'].includes(key) && typeof params[key] !== 'number') {
                continue;
            }
            if (['errorCallback', 'removeCallback'].includes(key) && typeof params[key] !== 'function') {
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
            let fileNode = new _file_node_file_node_js__WEBPACK_IMPORTED_MODULE_2__["default"]();

            fileNode.load(file);
            if (this.maxSize != null && file instanceof File && file.size > this.maxSize) {
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
            delFile: [] // 删除的服务器文件
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FileUpload);


/***/ }),
/* 50 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_file_upload_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(51);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_file_upload_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_file_upload_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_file_upload_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_file_upload_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 51 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.ly-file-upload {
    display: flex;
    flex-wrap: wrap;

    --ly-file-upload_height: 40px;
}

.ly-file-upload > .fu_add-file {
    position: relative;
    display: inline-flex;
    width: var(--ly-file-upload_height);
    height: var(--ly-file-upload_height);
    margin: 5px 12px 5px 0;
    border: 1px solid #999;
    border-radius: 2px;
    cursor: pointer;
}

.ly-file-upload > .fu_add-file::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1px;
    height: 60%;
    border-left: 1px dashed #999;
    box-sizing: border-box;
}

.ly-file-upload > .fu_add-file::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
    height: 1px;
    border-top: 1px dashed #999;
    box-sizing: border-box;
}

.ly-file-upload > .fu_add-file > input[type='file'] {
    display: none;
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 52 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _file_node_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(53);
/* harmony import */ var _base_component_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(21);



/**
 * 文件节点
 * @extends {Component}
 * @author wang.xin
 */
class FileNode extends _base_component_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FileNode);


/***/ }),
/* 53 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_file_node_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(54);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_file_node_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_file_node_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_file_node_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_file_node_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 54 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.ly-file-node {
    --fn_height: var(--ly-file-upload_height, 40px);

    display: inline-flex;
    position: relative;
    width: var(--fn_height);
    height: var(--fn_height);
    margin: 5px 14px 5px 0;
}

.ly-file-node > .fn_file-content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--fn_height);
    height: var(--fn_height);
    border: 1px solid #777;
    border-radius: 2px;
    cursor: pointer;
}

.ly-file-node > .fn_file-content > .fn_file-item {
    width: 100%;
    height: 100%;
}

.ly-file-node > [data-action='remove'] {
    position: absolute;
    z-index: 2;
    top: -14px;
    right: -14px;
    transform: scale(0.4);
    display: inline-block;
    width: 30px;
    height: 30px;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 50%;
    cursor: pointer;
}

.ly-file-node > [data-action='remove']:hover {
    transform: scale(0.5);
}

.ly-file-node > [data-action='remove']::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 2;
    transform: translate(-50%, -50%) rotate(45deg);
    width: 2px;
    height: 50%;
    background-color: #fff;
}

.ly-file-node > [data-action='remove']::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 2;
    transform: translate(-50%, -50%) rotate(135deg);
    width: 2px;
    height: 50%;
    background-color: #fff;
}

.ly-file-node > .fn_wait-delete::before {
    content: '待删除';
    position: absolute;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--fn_height);
    height: var(--fn_height);
    background-color: rgba(0, 0, 0, 0.5);
    color: red;
    font-size: 12px;
}

.ly-file-node .fn_normal-icon {
    position: absolute;
    width: 24px;
    height: 24px;
}

.ly-file-node .fn_video-icon {
    fill: #fff;
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 55 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _fixed_thead_table_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56);
/* harmony import */ var _base_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(21);



/**
 * 固定表头
 * @deprecated
 */
class FixedTheadTable extends _base_component__WEBPACK_IMPORTED_MODULE_1__["default"] {
    constructor() {
        super();
    }

    /**
     * 挂载成功
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
         * @member {string} thead 表头
         */
        this._observe('thead', (value) => {
            this.node.find('thead').html(value);
            this.node.find('.ftt_thead-container tr:first-child>th').forEach((item, index, list) => {
                this.thCount += parseInt(list.eq(index).attr('colspan')) || 1;
            });
        });

        /**
         * @member {number} thCount 列数
         */
        this._observe('thCount', 0, (value) => {});

        /**
         * @member {string} tbody 表格内容
         */
        this._observe('tbody', (value) => {
            if (value !== '') {
                this.node.find('tbody').html(value);
            } else {
                this.reset();
            }
            this.resize();
        });

        /**
         * @member {number} width 宽度
         */
        this._observe('width', (value, prev) => {
            if (value !== 0 && value !== prev) {
                this.node.find('.ftt_thead-container').css('width', `${value}px`);
            }
        });
    }

    /**
     * 事件
     */
    on() {
        // 窗口发生变化
        window.addEventListener('resize', () => {
            this.resize();
        });
    }

    /**
     * 重置
     */
    reset() {
        this.node
            .find('tbody')
            .html(`<tr><td class="tc_empty" colspan="${this.thCount}">没有查询到符合条件的记录!</td></tr>`);
    }

    /**
     * 滚动条置顶
     */
    scrollTop() {
        this.node.find('.ftt_tbody-container')[0].scrollTop = 0;
    }

    /**
     * 重置表格样式
     */
    resize(tableContainer = this.node) {
        // 先设置高度，让滚动条自适应
        let height = tableContainer.find('.ftt_tbody-container>.ftt_table').height();
        if (height === 0) {
            return;
        }
        tableContainer.css('height', `${height}px`);

        // 不能使用 height: 100%，会造成页面无故出现滚动条
        tableContainer.find('.ftt_tbody-container').css('height', tableContainer.height() + 'px');

        // 根据表格实际宽度设置表头
        this.width = tableContainer.find('.ftt_tbody-container>.ftt_table').width();
        // 防止刷新延迟，50ms后重新计算
        setTimeout(() => {
            this.width = tableContainer.find('.ftt_tbody-container>.ftt_table').width();
        }, 50);
    }
}

/**
 * @member {string} _template 模板
 */
FixedTheadTable._template = `
<div class="fixed-thead-table">
    <div class="ftt_thead-container">
        <table class="ftt_table">
            <thead></thead>
        </table>
    </div>
    <div class="ftt_tbody-container">
        <table class="ftt_table">
            <thead></thead>
            <tbody></tbody>
        </table>
    </div>
</div>`;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FixedTheadTable);


/***/ }),
/* 56 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_fixed_thead_table_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(57);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_fixed_thead_table_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_fixed_thead_table_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_fixed_thead_table_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_fixed_thead_table_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 57 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.fixed-thead-table {
    position: relative;
    max-height: 100%;
}

.fixed-thead-table > .ftt_thead-container {
    position: absolute;
    top: 0;
    z-index: 2;
    background-color: #fff;
}

.fixed-thead-table > .ftt_tbody-container {
    position: absolute;
    top: 0;
    overflow: auto;
}

.fixed-thead-table > .ftt_tbody-container::-webkit-scrollbar,
.fixed-thead-table > .ftt_tbody-container::-webkit-scrollbar-track {
    width: 8px;
    background-color: #eee;
}

.fixed-thead-table > .ftt_tbody-container::-webkit-scrollbar-thumb {
    background-color: #777;
    border-radius: 0;
}

.fixed-thead-table .ftt_table {
    width: 100%;
    max-width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    color: #333;
    table-layout: fixed;
}

.fixed-thead-table .ftt_table > thead {
    font-size: 14px;
    background-color: #f5f4f9;
}

.fixed-thead-table .ftt_table th {
    font-family: 'Medium';
}

.fixed-thead-table .ftt_table th,
.fixed-thead-table .ftt_table td {
    height: 36px;
    padding: 8px;
    text-align: center;
    vertical-align: middle;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: default;
    border: 1px solid #ddd;
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 58 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _pagination_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(59);
/* harmony import */ var _base_component_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(21);



/**
 * @description 页码构造器
 * @author wang.xin
 * @extends {Component}
 * @example
 * new Pagination({
 *     elem: '#pagination',
 *     pageNo: 1,
 *     pageCount: 10,
 *     change: (value) => {},
 * });
 */
class Pagination extends _base_component_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
    /**
     * Creates an instance of Pagination.
     * @param {object} [option={}] 配置参数
     * @param {string | DOM} [option.elem] CSS 选择器 | DOM 节点
     * @param {number} [option.pageNo=1] 当前页码
     * @param {number} [option.pageSize=10] 单页记录条数
     * @param {number} [option.pageCount=1] 页码数
     * @param {number} [option.recordCount=0] 记录条数
     * @param {number} [option.limitPage=6] 分段界限一
     * @param {number} [option.limitNum=3] 分段界限二
     * @param {boolean} [option.omitClickable=true] 省略号是否可点击
     * @param {boolean} [option.tipShow=true] 是否显示提示信息
     * @param {function} [option.change] 跳转页码时触发的事件
     */
    constructor(option = {}) {
        super(option.elem || document.createElement('nav'));
        this.node.addClass('ly-form ly-pagination');
        this.init();
        this.load(option);
    }

    /**
     * 初始化
     */
    init() {
        this.monitor();
        this.on();
        this.render();
    }

    /**
     * 属性
     */
    monitor() {
        /**
         * @member {function} change 修改页码触发的回调函数
         * @memberof Pagination
         * @inner
         */
        this.change = () => {};

        /**
         * @member {string} pageNo 页码
         * @memberof Pagination
         * @default 1
         * @inner
         */
        this._observe('pageNo', 1, (value) => {
            this.render();
            this.change(value, this.pageSize, this);
        });

        /**
         * @member {string} pageSize 单页记录条数
         * @memberof Pagination
         * @default 10
         * @inner
         */
        this._observe('pageSize', 10, () => this.render());

        /**
         * @member {string} pageCount 页码数
         * @memberof Pagination
         * @default 1
         * @inner
         */
        this._observe('pageCount', 1, () => this.render());

        /**
         * @member {string} pageCount 记录条数
         * @memberof Pagination
         * @default 0
         * @inner
         */
        this._observe('recordCount', 0, () => this.render());

        /**
         * @member {string} tipShow 页码信息是否提示
         * @memberof Pagination
         * @default true
         * @inner
         */
        this._observe('tipShow', true, () => this.render());

        /**
         * @member {string} tipShow 省略号是否可以点击
         * @memberof Pagination
         * @default true
         * @inner
         */
        this._observe('omitClickable', true, () => this.render());

        /**
         * @member {number} tipShow 界限一，当 pageCount < limitPage 时，页码标签全显示，否则分段显示
         * @memberof Pagination
         * @default 6
         * @inner
         */
        this._observe('limitPage', 6, () => this.render());

        /**
         * @member {number} tipShow 界限二，limitNum < pageNo < pageCount - limitNum
         * @memberof Pagination
         * @default 3
         * @inner
         */
        this._observe('limitNum', 3, () => this.render());
    }

    /**
     * 事件
     */
    on() {
        // 页码
        this.node.on('click', '[data-action="page"]:not(.ly-pagination_current-page)', (e, target) => {
            this.pageNo = parseInt(target.text());
        });

        // 上一页
        this.node.on('click', '[data-action="previousPage"]:not(.ly-pagination_disabled-page)', () => {
            this.pageNo--;
        });

        // 下一页
        this.node.on('click', '[data-action="nextPage"]:not(.ly-pagination_disabled-page)', () => {
            this.pageNo++;
        });

        // 左侧省略号
        this.node.on('click', '[data-action="leftOmit"]:not(.ly-pagination_disabled-page)', () => {
            this.pageNo = Math.floor((1 + this.pageNo) / 2);
        });

        // 中间省略号
        this.node.on('click', '[data-action="centerOmit"]:not(.ly-pagination_disabled-page)', () => {
            this.pageNo = Math.floor((1 + this.pageCount) / 2);
        });

        // 右侧省略号
        this.node.on('click', '[data-action="rightOmit"]:not(.ly-pagination_disabled-page)', () => {
            this.pageNo = Math.floor((this.pageNo + this.pageCount) / 2);
        });

        // 跳转
        this.node.on('click', '[data-action="gotoPage"]', () => {
            this.valid() && (this.pageNo = this.valid());
        });

        // 回车
        this.node.on('keydown', '[data-value="page"]', (e) => {
            if (e.key === 'Enter' || e.keyCode === 13) {
                this.valid() && (this.pageNo = this.valid());
            }
        });
    }

    /**
     * 加载
     * @param {object} [option={}] 配置参数
     * @param {string | DOM} [option.elem] CSS 选择器 | DOM 节点
     * @param {number} [option.pageNo=1] 当前页码
     * @param {number} [option.pageSize=10] 单页记录条数
     * @param {number} [option.pageCount=1] 页码数
     * @param {number} [option.recordCount=0] 记录条数
     * @param {number} [option.limitPage=6] 分段界限一
     * @param {number} [option.limitNum=3] 分段界限二
     * @param {boolean} [option.omitClickable=true] 省略号是否可点击
     * @param {boolean} [option.tipShow=true] 是否显示提示信息
     * @param {function} [option.change] 跳转页码时触发的事件
     */
    load(option = {}) {
        for (let key in option) {
            if (option[key] != null && key !== 'change') {
                this[key] = option[key];
            }
        }
        this.change = option.change || (() => {});
    }

    /**
     * 渲染
     */
    render() {
        this.node.html('<ul class="ly-pagination_list"></ul>');
        this.renderPreviousPage();
        this.renderPage();
        this.renderNextPage();
        this.tipShow && this.renderTip();
        this.renderGotoPage();
    }

    /**
     * 渲染上一页
     */
    renderPreviousPage() {
        this.node.find('ul').append(
            `<li class="ly-pagination_item">
                <a class="ly-pagination_page ${this.pageNo === 1 ? 'ly-pagination_disabled-page' : ''}"
                    data-action="previousPage">« 上一页</a>
            </li>`
        );
    }

    /**
     * 渲染页码
     */
    renderPage() {
        let elem = this.node.find('ul');

        if (this.pageCount <= this.limitPage) {
            // 当 pageCount <= limitPage，直接显示页码
            elem.append(this.createPageLabel(1, this.pageCount));
        } else {
            if (this.pageNo <= this.limitNum || this.pageCount - this.pageNo < this.limitNum) {
                // 当页码在前 limitNum 或后 limitNum 页时
                elem.append(this.createPageLabel(1, this.limitNum))
                    .append(this.createOmit('center'))
                    .append(this.createPageLabel(this.pageCount - this.limitNum + 1, this.pageCount));
            } else {
                // 当页码超过 limitPage 页，且当前页码不在前 limitNum 页或者后 limitNum 页时
                elem.append(this.createPageLabel(1, 1))
                    .append(this.createOmit('left'))
                    .append(this.createPageLabel(this.pageNo - 1, this.pageNo + 1))
                    .append(this.createOmit('right'))
                    .append(this.createPageLabel(this.pageCount, this.pageCount));
            }
        }
    }

    /**
     * 渲染下一页
     */
    renderNextPage() {
        this.node.find('ul').append(
            `<li class="ly-pagination_item">
                <a class="ly-pagination_page ${this.pageNo === this.pageCount ? 'ly-pagination_disabled-page' : ''}"
                    data-action="nextPage">下一页 »</a>
            </li>`
        );
    }

    /**
     * 渲染提示信息
     */
    renderTip() {
        this.node.find('ul').append(
            `<li class="ly-pagination_item">
                <a class="ly-pagination_page ly-pagination_disabled-page">
                    第 ${this.pageNo} / ${this.pageCount} 页 共 ${this.recordCount} 条
                </a>
            </li>`
        );
    }

    /**
     * 渲染页码跳转
     */
    renderGotoPage() {
        this.node.find('ul').append(
            `<li class="ly-pagination_item">
                <input type="text" class="ly-pagination_page-input" data-value="page" value="${this.pageNo}" />
            </li>
            <li class="ly-pagination_item">
                <a class="ly-pagination_page" data-action="gotoPage">跳转</a>
            </li>`
        );
    }

    /**
     * 创建页码标签，并将页码标签添加到页码列表中
     * @param {number} startPage 起始页码
     * @param {number} endPage 结束页码
     */
    createPageLabel(startPage = 1, endPage = 1) {
        let result = '';

        // 创建页码标签
        for (let i = startPage; i <= endPage; i++) {
            let tempClass = '';

            tempClass += i === this.pageNo ? 'ly-pagination_current-page' : '';
            tempClass += i === this.pageCount ? ' ly-pagination_last-page' : '';
            result += `<li class="ly-pagination_item"><a class="ly-pagination_page ${tempClass}" data-action="page">${i}</a></li>`;
        }
        return result;
    }

    /**
     * 创建省略号
     * @param { String } position 位置 { left | center | right }
     */
    createOmit(position) {
        let classText = this.omitClickable ? '' : 'ly-pagination_disabled-page',
            titleText = this.omitClickable ? '跳转中间页码' : ''; // 提示

        return `<li class="ly-pagination_item"><span class="ly-pagination_page ${classText}" title="${titleText}" data-action="${position}Omit">...</span></li>`;
    }

    /**
     * 验证输入值是否有效
     * @return {number} 有效则返回页码，否则返回0
     */
    valid() {
        let inputNode = this.node.find('[data-value="page"]'),
            page = parseInt(inputNode.val());

        if (!isNaN(page) && 0 < page && page <= this.pageCount) {
            inputNode.val(page).removeClass('ly-pagination_error-page');
            return page;
        }

        inputNode.addClass('ly-pagination_error-page');
        return 0;
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Pagination);


/***/ }),
/* 59 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_pagination_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(60);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_pagination_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_pagination_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_pagination_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_pagination_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 60 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.ly-pagination {
    display: flex;
    margin: 20px 12px;
}

.ly-pagination > .ly-pagination_list {
    display: flex;
    padding: 0;
    margin: 0;
    list-style: none;
}

.ly-pagination > .ly-pagination_list > .ly-pagination_item {
    display: inline-flex;
}

.ly-pagination .ly-pagination_page {
    display: inline-flex;
    align-items: center;
    padding: 8px 12px;
    margin-left: -1px;
    border: 1px solid #ddd;
    font-size: var(--ly-form_font-size);
    color: var(--ly-form_color_blue);
    text-decoration: none;
    cursor: pointer;
}

.ly-pagination .ly-pagination_page:hover {
    color: #23527c;
    background-color: #eee;
    border-color: #ddd;
    text-decoration: none;
}

.ly-pagination .ly-pagination_page-input {
    width: 46px;
    padding: 0 5px;
    font-size: var(--ly-form_font-size);
    margin-left: -1px;
    border: 1px solid #ddd !important;
    text-align: center;
    color: #666;
    background-color: unset;
    outline: none;
}

.ly-pagination .ly-pagination_error-page {
    color: red;
}

.ly-pagination .ly-pagination_current-page,
.ly-pagination .ly-pagination_current-page:hover {
    color: #fff;
    background-color: var(--ly-form_color_blue);
    border-color: var(--ly-form_color_blue);
    cursor: default;
}

.ly-pagination .ly-pagination_disabled-page,
.ly-pagination .ly-pagination_disabled-page:hover {
    color: #999;
    border-color: #ddd;
    cursor: not-allowed;
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 61 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _popup_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(62);
/* harmony import */ var _base_component_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(21);



class Popup extends _base_component_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
    /**
     * Creates an instance of Popup.
     * @param {*} selector
     */
    constructor() {
        super();

        // 若在缓存中则直接返回缓存中的实例
        if (Popup._cache.get(this.node[0])) {
            return Popup._cache.get(this.node[0]);
        }
        Popup._cache.set(this.node[0], this);

        this.superMonitor();
        this.superEvent();
    }

    /**
     * 属性
     */
    superMonitor() {
        /**
         * @member {MyNode} popupNode 容器
         */
        this.popupNode = this.node.children('.ly-popup_container');

        /**
         * @member {Object} dragPosition 鼠标拖动位置
         */
        this.dragPosition = null;

        /**
         * @member {Number} dragRule 拖拽规则
         * @example
         * 0 => 禁止拖拽
         * 1 => 只在可视区域内拖拽
         * 2 => 不限制拖拽位置
         */
        this._observe('dragRule', 0, (value) => {
            this.popupNode.attr('data-dragRule', value);
            this.calcDragRange();
            this.moveTo();
        });

        /**
         * @member {Number} resizeRule 拉伸规则
         * @example
         * 0 => 禁止拉伸
         * 1 => 可以拉伸
         */
        this._observe('resizeRule', 0, (value) => {
            this.popupNode.attr('data-resizeRule', value);
            this.popupNode.append(`
                <div class="ly-popup_resize">
                    <span class="ly_popup_resize-e" data-direction="e"></span>
                    <span class="ly_popup_resize-w" data-direction="w"></span>
                    <span class="ly_popup_resize-s" data-direction="s"></span>
                    <span class="ly_popup_resize-n" data-direction="n"></span>
                    <span class="ly_popup_resize-es" data-direction="es"></span>
                    <span class="ly_popup_resize-ws" data-direction="ws"></span>
                    <span class="ly_popup_resize-wn" data-direction="wn"></span>
                    <span class="ly_popup_resize-en" data-direction="en"></span>
                </div>`);
        });

        /**
         * @member {Object} dragRange 拖拽边界
         */
        this._observe('dragRange', null, () => {});
    }

    /**
     * 事件
     */
    superEvent() {
        this.dragEvent();
        this.resizeEvent();
        /**
         * 尺寸大小变化
         */
        window.addEventListener('resize', () => {
            this.calcDragRange();
            this.moveTo();
        });
    }

    /**
     * 拖拽事件
     */
    dragEvent() {
        /**
         * @event 鼠标按下
         */
        this.node.on('mousedown', '.ly-popup_header', (e) => {
            if (!this.dragRule) {
                return;
            }

            this.dragPosition = {
                x: e.pageX,
                y: e.pageY
            };
        });

        /**
         * @event 鼠标移动
         */
        this.node.on('mousemove', (e) => {
            if (!this.dragRule) {
                return;
            }

            if (this.dragPosition != null) {
                let { top, left } = window.getComputedStyle(this.popupNode[0]);

                this.moveTo(
                    parseInt(top) + (e.pageY - this.dragPosition.y),
                    parseInt(left) + (e.pageX - this.dragPosition.x)
                );
                this.dragPosition = {
                    x: e.pageX,
                    y: e.pageY
                };
            }
        });

        /**
         * @event 鼠标松开
         */
        this.node.on('mouseup', () => {
            this.dragPosition = null;
        });
    }

    /**
     * 伸缩事件
     */
    resizeEvent() {
        /**
         * @event 鼠标按下
         */
        this.node.on('mousedown', '.ly-popup_resize>[data-direction]', (e, target) => {
            if (!this.resizeRule) {
                return;
            }

            this.resizePosition = {
                direction: target.attr('data-direction'),
                x: e.pageX,
                y: e.pageY
            };
        });

        /**
         * @event 鼠标移动
         */
        this.node.on('mousemove', (e) => {
            if (!this.resizeRule) {
                return;
            }

            if (this.resizePosition != null) {
                let offset = {
                        x: e.pageX - this.resizePosition.x,
                        y: e.pageY - this.resizePosition.y
                    }, // 偏移量
                    result = {
                        top: this.popupNode[0].offsetTop,
                        left: this.popupNode[0].offsetLeft,
                        width: this.popupNode[0].clientWidth,
                        height: this.popupNode[0].clientHeight
                    };

                if (this.resizePosition.direction.includes('e')) {
                    // 宽
                    result.width += offset.x;
                }

                if (this.resizePosition.direction.includes('w')) {
                    // 宽、横向偏移量
                    result.width -= offset.x;
                    result.left += offset.x;
                }

                if (this.resizePosition.direction.includes('s')) {
                    // 高
                    result.height += offset.y;
                }

                if (this.resizePosition.direction.includes('n')) {
                    // 高、纵向偏移量
                    result.height -= offset.y;
                    result.top += offset.y;
                }
                this.popupNode.css({
                    'width': result.width + 'px',
                    'height': result.height + 'px'
                });
                this.calcDragRange();
                this.moveTo(result.top, result.left);
                this.resizePosition.x = e.pageX;
                this.resizePosition.y = e.pageY;
            }
        });

        /**
         * @event 鼠标松开
         */
        this.node.on('mouseup', () => {
            this.resizePosition = null;
        });
    }

    /**
     * 移动到指定位置，默认居中
     * @param {Number} top 纵向偏移量
     * @param {Number} left 横向偏移量
     */
    moveTo(
        top = (window.innerHeight - this.popupNode[0].clientHeight) / 2,
        left = (window.innerWidth - this.popupNode[0].clientWidth) / 2
    ) {
        if (this.dragRule === 1 && this.dragRange != null) {
            top = Math.max(Math.min(top, this.dragRange.topMax), this.dragRange.topMin);
            left = Math.max(Math.min(left, this.dragRange.leftMax), this.dragRange.leftMin);
        }

        this.popupNode.css({
            top: top + 'px',
            left: left + 'px'
        });
    }

    /**
     * 计算拖拽边界
     */
    calcDragRange() {
        this.dragRange = {
            topMin: 0,
            leftMin: 0,
            topMax: window.innerHeight - this.popupNode[0].clientHeight,
            leftMax: window.innerWidth - this.popupNode[0].clientWidth
        };
    }

    /**
     * 挂载
     */
    _mounted() {
        this.on();
    }

    /**
     * 事件
     */
    on() {
        this.node.on('click', '.ly-popup_header>[data-action="close"]', (e) => {
            this.unload();
        });
    }

    /**
     * 卸载
     */
    unload() {
        this.node.hide();
        this.dragPosition = null;
        this.moveTo();
    }

    /**
     * 加载
     * @param {String} title 标题
     * @param {String} content 内容
     * @param {Number} [dragRule] 拖拽规则
     */
    load(options = {}) {
        this.node.show();
        this.node.find('.ly-popup_title').html(options.title);
        this.node.find('.ly-popup_center').html(options.content);
        this.dragRule = options.dragRule || 1; // 配置是否可以拖拽
        this.resizeRule = options.resizeRule || 1;
    }
}

/**
 * 模板
 * @member {string} _template
 * @memberof DropList
 * @static
 */
Popup._template = `
<div class="ly-form ly-popup">
    <div class="ly-popup_container">
        <div class="ly-popup_header">
            <span class="ly-popup_title"></span>
            <svg class="ly-icon_svg" aria-hidden="true" data-action="close">
                <use xlink:href="#ly-close"></use>
            </svg>
        </div>
        <div class="ly-popup_footer"></div>
    </div>
</div>`;

/**
 * 缓存
 * @member {Map} _cache
 * @memberof DropList
 * @static
 */
Popup._cache = new Map();

/**
 * 隐藏所有弹窗
 */
Popup._hideAll = function () {
    Popup._cache.forEach((item) => item.node.hide());
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Popup);


/***/ }),
/* 62 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_popup_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(63);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_popup_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_popup_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_popup_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_popup_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 63 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.ly-popup {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.35);
    box-sizing: border-box;
}

.ly-popup * {
    box-sizing: border-box;
}

.ly-popup > .ly-popup_container {
    position: fixed;
    width: 300px;
    height: 150px;
    min-width: 120px;
    min-height: 40px;
    background-color: #fff;
    border-radius: 2px;
}

.ly-popup > .ly-popup_container > .ly-popup_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 40px;
    padding: 0 14px;
    color: #fff;
    border-radius: 2px 2px 0 0;
    background-color: #192f75;
    font-size: 16px;
    letter-spacing: 2px;
    cursor: move;
}

.ly-popup > .ly-popup_container[data-dragRule='0'] > .ly-popup_header {
    cursor: default;
}

.ly-popup > .ly-popup_container > .ly-popup_header > [data-action='close']:hover {
    opacity: 0.8;
    cursor: pointer;
}

.ly-popup > .ly-popup_container > .ly-popup_center {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: calc(100% - 40px);
    padding: 14px;
}

/* 拉伸 */
.ly-popup > .ly-popup_container > .ly-popup_resize {
    --ly-popup_width_resize: 4px;

    display: none;
    position: absolute;
    top: calc(-1 * var(--ly-popup_width_resize));
    left: calc(-1 * var(--ly-popup_width_resize));
    width: calc(100% + 2 * var(--ly-popup_width_resize));
    height: calc(100% + 2 * var(--ly-popup_width_resize));
    z-index: -1;
}

.ly-popup > .ly-popup_container[data-resizeRule='1'] > .ly-popup_resize {
    display: block;
}

.ly-popup > .ly-popup_container > .ly-popup_resize > .ly_popup_resize-e,
.ly-popup > .ly-popup_container > .ly-popup_resize > .ly_popup_resize-w {
    position: absolute;
    top: var(--ly-popup_width_resize);
    width: var(--ly-popup_width_resize);
    height: calc(100% - 2 * var(--ly-popup_width_resize));
    cursor: e-resize;
}

.ly-popup > .ly-popup_container > .ly-popup_resize > .ly_popup_resize-s,
.ly-popup > .ly-popup_container > .ly-popup_resize > .ly_popup_resize-n {
    position: absolute;
    left: var(--ly-popup_width_resize);
    width: calc(100% - 2 * var(--ly-popup_width_resize));
    height: var(--ly-popup_width_resize);
    cursor: n-resize;
}

.ly-popup > .ly-popup_container > .ly-popup_resize > .ly_popup_resize-e {
    right: 0;
}

.ly-popup > .ly-popup_container > .ly-popup_resize > .ly_popup_resize-w {
    left: 0;
}

.ly-popup > .ly-popup_container > .ly-popup_resize > .ly_popup_resize-s {
    bottom: 0;
}

.ly-popup > .ly-popup_container > .ly-popup_resize > .ly_popup_resize-n {
    top: 0;
}

.ly-popup > .ly-popup_container > .ly-popup_resize > .ly_popup_resize-es,
.ly-popup > .ly-popup_container > .ly-popup_resize > .ly_popup_resize-ws,
.ly-popup > .ly-popup_container > .ly-popup_resize > .ly_popup_resize-wn,
.ly-popup > .ly-popup_container > .ly-popup_resize > .ly_popup_resize-en {
    position: absolute;
    width: calc(2 * var(--ly-popup_width_resize));
    height: calc(2 * var(--ly-popup_width_resize));
}

.ly-popup > .ly-popup_container > .ly-popup_resize > .ly_popup_resize-es {
    bottom: 0;
    right: 0;
    cursor: nwse-resize;
}

.ly-popup > .ly-popup_container > .ly-popup_resize > .ly_popup_resize-ws {
    bottom: 0;
    left: 0;
    cursor: nesw-resize;
}

.ly-popup > .ly-popup_container > .ly-popup_resize > .ly_popup_resize-wn {
    top: 0;
    left: 0;
    cursor: nwse-resize;
}

.ly-popup > .ly-popup_container > .ly-popup_resize > .ly_popup_resize-en {
    top: 0;
    right: 0;
    cursor: nesw-resize;
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 64 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _scroll_bar_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(65);
/* harmony import */ var _base_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(21);
/* harmony import */ var _base_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13);
/* harmony import */ var _base_my_node__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(18);





/**
 * 滚动条
 * @extends {Component}
 */
class ScrollBar extends _base_component__WEBPACK_IMPORTED_MODULE_1__["default"] {
    /**
     * Creates an instance of ScrollBar.
     * @memberof ScrollBar
     */
    constructor() {
        super();
    }

    /**
     * 挂载成功
     * @memberof ScrollBar
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
         * @member {Boolean} mousedown 鼠标按下
         * @memberof ScrollBar#
         */
        this._observe('mousedown', false, (value) => {
            this.container.css('user-select', value ? 'none' : 'unset');
        });

        /**
         * @member {MyNode} container 容器
         * @memberof ScrollBar#
         */
        this._observe('container', this.node.parent(), (value, prev) => {
            if (prev.length === 0 || prev[0] !== value[0]) {
                this.onContainer();
            }
        });

        /**
         * @member {Number} rate 比例
         * @memberof ScrollBar#
         */
        this._observe('rate', 1, (value) => {
            if (value < 1) {
                this.showThumb();
            } else {
                this.node.find('.sb_thumb').css('height', '0px');
                this.hideThumb();
            }
        });

        /**
         * @member {Boolean} fixed 是否长显
         * @memberof ScrollBar#
         */
        this._observe('fixed', false, (value) => {
            if (value) {
                this.calcThumbRate();
                this.node.attr('data-fixed', 1);
            }
        });

        /**
         * @member {Number} smoothY 平滑滚动距离
         * @memberof ScrollBar#
         */
        this._observe('smoothY', 30, () => {});

        /**
         * @member {Number} scrollId 滚动ID，避免重复滚动
         * @memberof ScrollBar#
         */
        this._observe('scrollId', () => {});

        /**
         * @member {Function} delayCalcRate 延时计算比例
         * @memberof ScrollBar#
         */
        this.delayCalcRate = _base_util__WEBPACK_IMPORTED_MODULE_2__["default"].debounce(() => {
            let rate = this.container[0].clientHeight / this.container[0].scrollHeight;
            if (rate !== this.rate) {
                this.rate = rate;
            }
        }, 200);
    }

    /**
     * 事件
     * @memberof ScrollBar
     */
    on() {
        /**
         * @event node mousedown 鼠标按下
         * @memberof ScrollBar#
         * @todo
         * 1. 点击的是滑块，标记滑块可以进行拖拽 <br/>
         * 2. 其余情况，滚动条直接跳转到鼠标位置
         */
        this.node.on('mousedown', (e, sourceNode, listenNode, triggerNode) => {
            if (triggerNode.hasClass('sb_thumb')) {
                this.mousedown = true;
                this.pageY = e.pageY;
            } else {
                if (this.container.length > 0) {
                    this.smoothScrollTo(e.offsetY / this.rate);
                }
            }
        });

        /**
         * @event document mouseup 鼠标释放
         * @memberof ScrollBar#
         * @todo 清除拖拽标记以及偏移量
         */
        document.addEventListener('mouseup', (e) => {
            this.mousedown = false;
            this.pageY = 0;
        });

        /**
         * @event document mouseup 鼠标释放
         * @memberof ScrollBar#
         * @todo 清除拖拽标记以及偏移量
         */
        document.addEventListener('mousemove', (e) => {
            if (this.mousedown === true && this.container.length > 0) {
                let step = this.container[0].scrollTop + (e.pageY - this.pageY) / this.rate;
                this.smoothScrollTo(step);
                this.pageY = e.pageY;
            }
        });
    }

    /**
     * 监听容器的事件
     * @memberof ScrollBar
     */
    onContainer() {
        /**
         * @event container onmousewheel 鼠标滚轮
         * @memberof ScrollBar
         * @todo 模拟滚动事件
         */
        this.container.on('mousewheel', (event) => {
            let step = this.container[0].clientHeight / 2,
                scrollTop = 0;

            if (event.wheelDeltaY < 0) {
                scrollTop = this.container[0].scrollTop + step;
            } else {
                scrollTop = this.container[0].scrollTop - step;
            }
            this.smoothScrollTo(scrollTop, event.wheelDeltaY < 0);
        });

        /**
         * @event container onscroll 滚动条
         * @memberof ScrollBar
         * @todo
         * 1. 修改滚动条位置 <br/>
         * 2. 修改滑块位置
         */
        this.container.on('scroll', () => {
            let scrollTop = this.container[0].scrollTop;

            this.node.css('top', scrollTop + 'px');
            this.node.find('.sb_thumb').css('top', scrollTop * this.rate + 'px');
        });

        /**
         * @event container onmouseenter 鼠标滑入
         * @memberof ScrollBar
         * @todo 计算滑块占比
         */
        this.container.on('mouseenter', () => this.calcThumbRate());

        /**
         * @event container onmouseleave 鼠标滑出
         * @memberof ScrollBar
         * @todo 隐藏滚动条
         */
        this.container.on('mouseleave', () => this.hideThumb());

        /**
         * @event container onmousemove 鼠标移动
         * @memberof ScrollBar
         * @todo 延时计算滑块占比
         */
        this.container.on('mousemove', () => this.delayCalcRate());
    }

    /**
     * 加载
     * @param {Object} options 入参
     * @param {MyNode} options.container 容器
     * @param {Boolean} options.fixed 是否固定显示
     * @param {Number} options.smoothY 平滑滑动距离
     * @memberof ScrollBar
     */
    load(options = {}) {
        this.container = options.container || this.node.parent();
        this.setStyle();
        this.fixed = options.fixed || false;
        if (typeof options.smoothY === 'number') {
            this.smoothY = options.smoothY;
        }
    }

    /**
     * 设置样式
     * @memberof ScrollBar
     */
    setStyle() {
        if (!['relative', 'absolute', 'fixed'].includes(this.container.css('position'))) {
            this.container.css('position', 'relative');
        }
        this.container.css('overflow-y', 'hidden');
    }

    /**
     * 计算滑块占比
     * @memberof ScrollBar
     */
    calcThumbRate() {
        this.rate = this.container[0].clientHeight / this.container[0].scrollHeight;
    }

    /**
     * 显示滚动条
     * @memberof ScrollBar
     */
    showThumb() {
        const { marginTop, marginBottom } = window.getComputedStyle(this.node.find('.sb_thumb')[0]);

        this.node
            .find('.sb_thumb')
            .css(
                'height',
                this.container[0].clientHeight * this.rate - (parseInt(marginTop) + parseInt(marginBottom)) + 'px'
            );
        this.node.addClass('scroll-bar-active');
    }

    /**
     * 隐藏滚动条
     * @memberof ScrollBar
     */
    hideThumb() {
        this.node.removeClass('scroll-bar-active');
    }

    /**
     * 平滑滚动
     * @param {Number} targetY 滚动条目标位置
     * @todo
     * this.smoothY === 0 直接滚动，否则平滑滚动
     */
    smoothScrollTo(targetY) {
        if (this.smoothY === 0) {
            this.container[0].scrollTop = targetY;
            return;
        }

        const scrollId = Math.random(); // 本次滚动ID
        const startY = this.container[0].scrollTop; // 起始位置
        const diff = targetY - startY; // 间距
        const maxCount = Math.ceil(diff / this.smoothY); // 步长
        let count = 1;

        this.scrollId = scrollId;
        const smoothScroll = () => {
            let aimPosition = startY + count * this.smoothY;

            if (scrollId !== this.scrollId) {
                return;
            }

            count++;
            if (count >= maxCount) {
                this.container[0].scrollTop = targetY; // 确保最终位置正确
            } else {
                this.container[0].scrollTop = aimPosition;
                window.requestAnimationFrame(smoothScroll);
            }
        };
        smoothScroll();
    }
}

/**
 * 模板
 * @memberof ScrollBar
 * @static
 */
ScrollBar._template = `<div class="scroll-bar">
    <div class="sb_scroll">
        <div class="sb_thumb"></div>
    </div>
</div>`;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ScrollBar);


/***/ }),
/* 65 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_scroll_bar_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(66);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_scroll_bar_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_scroll_bar_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_scroll_bar_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_scroll_bar_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 66 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.scroll-bar {
    --sb_width_scroll: 4px;
    --sb_margin_scroll: 6px;

    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    box-sizing: border-box;
    opacity: 0;
}

.scroll-bar[data-fixed='1'] {
    opacity: 0.5;
}

.scroll-bar-active {
    opacity: 0.5;
}

.scroll-bar > .sb_scroll {
    position: relative;
    width: calc(var(--sb_width_scroll) + 2 * var(--sb_margin_scroll));
    height: 100%;
    box-sizing: border-box;
}

.scroll-bar > .sb_scroll > .sb_thumb {
    position: absolute;
    width: var(--sb_width_scroll);
    top: 0;
    right: 0;
    margin: var(--sb_margin_scroll);
    background-color: #000;
    border-radius: calc(var(--sb_width_scroll) / 2);
    cursor: pointer;
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 67 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _scroll_top_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(68);
/* harmony import */ var _base_component_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(21);



class ScrollTop extends _base_component_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
    constructor(selector) {
        super(selector);
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
         * @member {boolean} show 是否显示
         * @memberof ScrollTop
         * @inner
         */
        this._observe('show', (value) => {
            if (value) {
                this.updatePosition();
                this.node.css('display', 'flex');
            } else {
                this.node.css('display', 'none');
            }
        });
    }

    /**
     * 事件
     */
    on() {
        this.node.on('click', () => (this.parentNode[0].scrollTop = 0));

        window.addEventListener('resize', () => {
            this.updatePosition();
        });
    }

    /**
     * 根据父节点滚动条位置判断是否显示
     */
    hideOrShow() {
        this.show = this.parentNode[0].scrollTop !== 0;
    }

    /**
     * 更新按钮位置
     */
    updatePosition() {
        let top = this.parentNode[0].scrollTop,
            left = this.parentNode[0].scrollLeft,
            width = this.parentNode.width(),
            height = this.parentNode.height();

        this.node.css('top', top + height + 'px');
        this.node.css('left', left + width + 'px');
    }

    /**
     * 加载，当节点被插入文档后执行该方法
     */
    load() {
        this.parentNode = this.node.parent();
        this.parentNode.on('scroll', () => this.hideOrShow());
    }
}

/**
 * 模板
 * @member {string} _template
 * @memberof ScrollTop
 * @static
 * @example
 * <div class="ly-form ly-scroll-top">
 *     <i class="ly-icon_arrow-down"></i>
 * </div>
 */
ScrollTop._template = `<div class="ly-form ly-scroll-top"><i class="ly-icon_arrow-down"></i></div>`;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ScrollTop);


/***/ }),
/* 68 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_scroll_top_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(69);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_scroll_top_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_scroll_top_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_scroll_top_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_scroll_top_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 69 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.ly-scroll-top {
    display: none;
    position: absolute;
    transform: translate(-100%, -100%);
    justify-content: center;
    align-items: center;
    width: 42px;
    height: 42px;
    border-radius: 2px;
    cursor: pointer;
}

.ly-scroll-top > .ly-icon_arrow-down {
    width: 60%;
    height: 60%;
    transform: rotate(180deg);
}

.ly-scroll-top > .ly-icon_arrow-down::after {
    border-top: 4px solid #fff;
    border-left: 4px solid #fff;
}

.ly-scroll-top:hover {
    opacity: 0.9;
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 70 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _table_base_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(71);
/* harmony import */ var _base_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(21);
/* harmony import */ var _base_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13);




/**
 * 表格基类
 */
class TableBase extends _base_component__WEBPACK_IMPORTED_MODULE_1__["default"] {
    constructor() {
        super();
    }

    /**
     * 挂载成功
     */
    _mounted() {
        this.monitor();
    }

    /**
     * 属性
     */
    monitor() {
        /**
         * @member {Object} STYLE_CLASS_NAME 显示单元格类名
         */
        this.STYLE_CLASS_NAME = {
            ROW_SHOW: 'tb_show-row',
            COLUMN_SHOW: 'tb_show_column',
            BORDER_TOP: 'tb_border-top',
            BORDER_BOTTOM: 'tb_border-bottom',
            BORDER_LEFT: 'tb_border-left',
            BORDER_RIGHT: 'tb_border-right'
        };

        /**
         * 存储单元格实际位置
         */
        this.tableMap = {
            thead: [],
            tbody: []
        };
        this.tableList = [];

        /**
         * @member {Number} columnCount 列数
         */
        this._observe('columnCount', 0, () => {});

        /**
         * @member {Number} showColumnCount 显示的列数
         */
        this._observe('showColumnCount', 0, () => {});

        /**
         * @member {Number} rowCount 行数
         */
        this._observe('rowCount', 0, () => {});

        /**
         * @member {String|Object[]} thead 表头
         */
        this._observe('thead', '', (value) => {
            if (typeof value === 'string') {
                this.node.find('.tb_thead').html(value || '');
                this.setColumnCount();
            }

            if (Array.isArray(value) && value.length > 0) {
                this.setThead(value);
            }
            this.delaySetTableMap();
        });

        /**
         * @member {String} tbody 表格内容
         */
        this._observe('tbody', (value) => {
            let html = '';

            if (value !== '') {
                html = value;
            } else {
                html = `<tr><td class="tb_empty" colspan="${this.showColumnCount}">没有符合查询条件的结果！</td></tr>`;
            }
            this.node.find('.tb_tbody').html(html);
            this.rowCount = this.node.find('.tb_tr-container>tr').length;
            this.delaySetTableMap();
        });

        /**
         * 触发设置单元格位置
         */
        this.delaySetTableMap = _base_util__WEBPACK_IMPORTED_MODULE_2__["default"].debounce(() => this.setTableMap(), 50);
    }

    /**
     * 设置表头
     */
    setThead(thList) {
        let htmlStr = '';

        if (Array.isArray(thList[0])) {
            // 多行
            thList.forEach((elem) => {
                htmlStr += this.setTheadTr(elem);
            });
        } else {
            // 单行
            htmlStr = this.setTheadTr(thList);
        }

        this.thead = htmlStr;
    }

    /**
     * 渲染单行
     */
    setTheadTr(thList) {
        if (!Array.isArray(thList) || thList.length === 0) {
            return '';
        }

        let htmlStr = '';

        thList.forEach((elem) => {
            if (typeof elem === 'string') {
                htmlStr += `<th title="${elem}">${elem}</th>`;
            } else {
                let propertyStr = '';

                for (let key in elem) {
                    if (key === 'title') {
                        propertyStr += this.setDOMProperty(key, elem.title === null ? elem.content : elem.title);
                    } else {
                        propertyStr += this.setDOMProperty(key, elem[key]);
                    }
                }
                htmlStr += `<th ${propertyStr} >${elem.content}</th>`;
            }
        });

        return `<tr>${htmlStr}</tr>`;
    }

    /**
     * 给元素添加属性
     */
    setDOMProperty(key, value) {
        if (typeof value !== 'string' || (value.includes('"') && value.includes("'"))) {
            return '';
        }

        if (value.includes('"') && !value.includes("'")) {
            return ` ${key}='${value}' `;
        }

        return ` ${key}="${value}" `;
    }

    /**
     * 获取列数
     */
    setColumnCount() {
        let columnCount = 0,
            showColumnCount = 0;

        this.node.find('.tb_thead>tr:first-child>th').forEach((item, index, list) => {
            let thNode = list.eq(index),
                count = parseInt(thNode.attr('colspan')) || 1;

            if (thNode.css('display') !== 'none' && thNode.css('visibility') !== 'hidden') {
                showColumnCount += count;
            }
            columnCount += count;
        });

        this.columnCount = columnCount;
        this.showColumnCount = showColumnCount;
    }

    /**
     * 合并单元格【纵向】
     * @param {Number} column 列数
     */
    mergeRowCell(column) {
        let rowspan = 1, // rowspan
            lastTd = null, // 单元格
            lastContent = '', // 单元格内容
            trList = this.node.find('.tb_tbody>tr'),
            trCount = trList.length; // 总行数

        trList.forEach((item, index, list) => {
            let curTd = list.eq(index).children().eq(column),
                curContent = curTd.html().trim();

            if (index === 0) {
                // 遍历第一行的时候
                lastContent = curContent;
                lastTd = curTd;
                rowspan = parseInt(curTd.attr('rowspan') || 1);
            } else {
                if (curContent === lastContent) {
                    // 当前行与上一行内容相同
                    rowspan += parseInt(curTd.attr('rowspan') || 1); // 行数累加
                    curTd.remove(); // 移除单元格

                    // 最后一行的时候，设置rowspan属性
                    index + 1 === trCount && lastTd.attr('rowspan', rowspan);
                } else if (curContent !== '') {
                    // 当前行与上一行内容不同，设置上一行rowspan属性
                    lastTd.attr('rowspan', rowspan);

                    // 从新计算
                    lastContent = curContent;
                    lastTd = curTd;
                    rowspan = parseInt(curTd.attr('rowspan') || 1); // 当前行占的行数
                }
            }
        });
        this.setTableMap();
    }

    /**
     * 标记单元格在第几列
     */
    setTableMap() {
        this.tableMap = {
            thead: this.signCellColumn(this.node.find('.tb_thead>tr')),
            tbody: this.signCellColumn(this.node.find('.tb_tbody>tr'))
        };
        this.tableList = this.tableMap.thead.concat(this.tableMap.tbody);
        this.setShowRow();
    }

    /**
     * 标记单元格在第几列
     */
    signCellColumn(trList) {
        let table = [];

        for (let i = 0; i < trList.length; i++) {
            table.push([]);
        }
        trList.forEach((elem, trIndex) => {
            trList
                .eq(trIndex)
                .children()
                .forEach((item, cellIndex, cellList) => {
                    let cellNode = cellList.eq(cellIndex),
                        colspan = parseInt(cellNode.attr('colspan') || 1),
                        rowspan = Math.min(trList.length, parseInt(cellNode.attr('rowspan') || 1)),
                        column = cellIndex;

                    while (table[trIndex][column] && column < this.columnCount) {
                        // 代表该位置被占了，需要去下一位
                        column++;
                    }

                    for (let i = 0; i < rowspan; i++) {
                        for (let j = 0; j < colspan; j++) {
                            table[trIndex + i][column + j] = cellNode;
                        }
                    }
                });
        });

        return table;
    }

    /**
     * 设置显示行
     */
    setShowRow() {
        const { ROW_SHOW, BORDER_TOP, BORDER_BOTTOM } = this.STYLE_CLASS_NAME;
        let firstRow = -1,
            lastRow = -1;

        Object.values(this.STYLE_CLASS_NAME).forEach((className) => {
            this.node.find(`.${className}`).removeClass(className);
        });
        let tableList = this.tableList;

        this.node.find('.tb_tr-container>tr').forEach((item, trIndex, trList) => {
            let trNode = trList.eq(trIndex);

            if (trNode.css('display') === 'none' || trNode.css('visibility') === 'hidden') {
                return;
            }
            if (firstRow === -1) {
                firstRow = trIndex;
            }
            lastRow = trIndex;
            trNode.addClass(ROW_SHOW);
            this.setShowColumn(tableList[trIndex]);
        });

        tableList[firstRow] && tableList[firstRow].forEach((node) => node.addClass(BORDER_TOP));
        tableList[lastRow] && tableList[lastRow].forEach((node) => node.addClass(BORDER_BOTTOM));
    }

    /**
     * 设置显示列
     */
    setShowColumn(cellList) {
        const { COLUMN_SHOW, BORDER_LEFT, BORDER_RIGHT } = this.STYLE_CLASS_NAME;
        let firstColumn = -1,
            lastColumn = -1;

        cellList.forEach((cellNode, cellIndex) => {
            if (cellNode.css('display') === 'none' || cellNode.css('visibility') === 'hidden') {
                return;
            }
            if (firstColumn === -1) {
                firstColumn = cellIndex;
            }
            lastColumn = cellIndex;
            cellNode.addClass(COLUMN_SHOW);
        });
        cellList[firstColumn] && cellList[firstColumn].addClass(BORDER_LEFT);
        cellList[lastColumn] && cellList[lastColumn].addClass(BORDER_RIGHT);
    }
}

/**
 * @member {string} _template 模板
 */
TableBase._template = `
<table class="table-base">
    <thead class="tb_thead tb_tr-container"></thead>
    <tbody class="tb_tbody tb_tr-container"></tbody>
</table>`;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TableBase);


/***/ }),
/* 71 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_table_base_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(72);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_table_base_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_table_base_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_table_base_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_table_base_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 72 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.table-base {
    --tb_border: 1px solid #ddd;
    --tb_background-color_thead: #f5f4f9;
    --tb_background-color_tbody: #fff;

    position: relative;
    min-width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    color: #333;
    table-layout: fixed;
}

.table-base > .tb_thead > tr > th {
    font-size: 14px;
    background-color: var(--tb_background-color_thead);
}

.table-base > .tb_tbody > tr > td {
    background-color: var(--tb_background-color_tbody);
}

.table-base > .tb_thead > tr > th,
.table-base > .tb_tbody > tr > td {
    position: relative;
    height: 36px;
    padding: 8px;
    text-align: center;
    vertical-align: middle;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: default;
    border: none;
}

.table-base > .tb_thead > tr > th::before,
.table-base > .tb_tbody > tr > td::before {
    content: '';
    position: absolute;
    z-index: 0;
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-top: var(--tb_border);
    border-left: var(--tb_border);
    box-sizing: border-box;
}

/* 处理边框的显示 */
.table-base .tb_border-top::before {
    border-top: var(--tb_border) !important;
}

.table-base .tb_border-bottom::before {
    border-bottom: var(--tb_border) !important;
}

.table-base .tb_border-left::before {
    border-left: var(--tb_border) !important;
}

.table-base .tb_border-right::before {
    border-right: var(--tb_border) !important;
}

/* 无数据 */
.table-base .tb_empty {
    color: #bc4442 !important;
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 73 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _table_fixed_cell_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74);
/* harmony import */ var _base_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(21);
/* harmony import */ var _base_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13);




class TableFixedCell extends _base_component__WEBPACK_IMPORTED_MODULE_1__["default"] {
    constructor() {
        super();
    }

    /**
     * 挂载成功
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
         * @member {Object} STYLE_CLASS_NAME 固定单元格的类名
         */
        this.STYLE_CLASS_NAME = {
            ROW: 'tfc_fixed-row',
            ROW_LAST: 'tfc_fixed-row-last',
            ROW_NEXT: 'tfc_fixed-row-next',
            COLUMN: 'tfc_fixed-column',
            COLUMN_LAST: 'tfc_fixed-column-last',
            COLUMN_NEXT: 'tfc_fixed-column-next'
        };

        /**
         * @member {Object} fixedColumn 固定列
         */
        this._observe('fixedColumn', 0, () => {
            this.delayRenderFixedCell();
        });

        /**
         * @member {Object[]} fixedColumnList 固定列数的位置
         * @property {Number} fixedColumnList.start 起始位置
         * @property {Number} fixedColumnList.end 结束位置
         */
        this._observe('fixedColumnList', [], () => {});

        /**
         * @member {Number} fixedRow 固定行
         */
        this._observe('fixedRow', 0, () => {
            this.delayRenderFixedCell();
        });

        /**
         * @member {Object[]} fixedRowList 固定列数的位置
         * @property {Number} fixedRowList.start 起始位置
         * @property {Number} fixedRowList.end 结束位置
         */
        this._observe('fixedRowList', [], () => {});

        /**
         * 触发渲染固定单元可能会频发，采用防抖的形式处理
         */
        this.delayRenderFixedCell = _base_util__WEBPACK_IMPORTED_MODULE_2__["default"].debounce(() => this.renderFixedCell(), 50);
    }

    /**
     * 事件
     */
    on() {
        /**
         * @event 监听滚动条
         */
        this.node.on('scroll', () => {
            if (this.fixedColumnList.length === 0 && this.fixedRowList.length === 0) {
                return;
            }

            this.calcScroll();
        });
    }

    /**
     * 加载
     * @param {Object} options 入参
     * @param {String} options.thead 表头
     * @param {String} options.tbody 表格
     * @param {Number} options.fixedColumn 固定列
     * @param {Number} options.fixedRow 固定行
     */
    load(options) {
        this.fixedColumn = options.fixedColumn || 0;
        this.fixedRow = options.fixedRow || 0;
        this.renderThead(options.thead);
        this.renderTbody(options.tbody);
    }

    /**
     * 渲染标题
     */
    renderThead(thead) {
        this._children.tableBase.thead = thead || '';
        this.delayRenderFixedCell();
    }

    /**
     * 渲染内容
     * @param {Object} tbody 内容
     * @param {Number} fixedRow 固定行数
     */
    renderTbody(tbody) {
        this._children.tableBase.tbody = tbody || '';
        this.delayRenderFixedCell();
    }

    /**
     * 格式化位置列表
     * @param {String} type 类型（ROW / COLUMN）
     */
    formatFixedCellList(type) {
        let value = this.fixedColumn,
            length = this._children.tableBase.columnCount;

        if (type === 'ROW') {
            value = this.fixedRow;
            length = this._children.tableBase.rowCount;
        }

        if (value === null || value === 0 || length === 0 || Math.abs(value) === length) {
            return [];
        }

        if (typeof value === 'number') {
            return [this.formatFixedCellListByNumber(value, length)];
        }

        if (typeof value === 'string') {
            return this.formatFixedCellListBySelector(value, type);
        }

        if (Array.isArray(value)) {
            return value.map((elem) => {
                if (typeof elem === 'number') {
                    return this.formatFixedCellListByNumber(elem, length);
                }
                return elem;
            });
        }

        return [value];
    }

    /**
     * 格式化位置列表【数字】
     */
    formatFixedCellListByNumber(value, length) {
        let start = 0,
            end = value % length;

        if (value < 0) {
            start = (value + length) % length;
            end = length;
        }

        return { start, end };
    }

    /**
     * 格式化位置列表【选择器】
     * @param {String} selector 选择器
     * @param {String} type 类型
     */
    formatFixedCellListBySelector(selector, type) {
        let nodeList = this.node.find(selector),
            positionStack = [];

        if (type === 'ROW') {
            // 针对的是行
            let trList = this.node.find('tr');

            nodeList = nodeList.matches('tr');
            nodeList.forEach((elem) => {
                let position = trList.indexOf(elem);
                if (!positionStack.includes(position)) {
                    positionStack.push(position);
                }
            });
        } else {
            // 针对的是列
            nodeList = nodeList.matches('th').concat(nodeList.matches('td'));
            nodeList.forEach((elem, index) => {
                let position = nodeList.eq(index).posOfSiblings();
                if (!positionStack.includes(position)) {
                    positionStack.push(position);
                }
            });
        }

        return positionStack.map((position) => ({
            start: position,
            end: position + 1
        }));
    }

    /**
     * 计算滚动位置
     */
    calcScroll() {
        let { scrollWidth, scrollLeft, clientWidth, scrollHeight, scrollTop, clientHeight } = this.node[0];

        this.node.css('--tfc_left_scroll', scrollLeft + 'px');
        this.node.css('--tfc_right_scroll', scrollWidth - scrollLeft - clientWidth + 'px');
        this.node.css('--tfc_top_scroll', scrollTop + 'px');
        this.node.css('--tfc_bottom_scroll', scrollHeight - scrollTop - clientHeight + 'px');
    }

    /**
     * 渲染固定位置
     */
    renderFixedCell() {
        this.fixedRowList = this.formatFixedCellList('ROW');
        this.fixedColumnList = this.formatFixedCellList('COLUMN');
        if (this.fixedColumnList.length === 0 && this.fixedRowList.length === 0) {
            return;
        }

        Object.values(this.STYLE_CLASS_NAME).forEach((className) => {
            this.node.find(`.${className}`).removeClass(className);
        });

        // 渲染固定位
        let trNodeList = this.node.find('.tb_tr-container>tr');
        this._children.tableBase.tableList.forEach((cellList, rowIndex) => {
            this.renderFixedRow(trNodeList.eq(rowIndex), rowIndex);
            cellList.forEach((cellNode, cellIndex) => {
                this.renderFixedColumn(cellNode, cellIndex);
            });
            this.renderFixedColumnNext(cellList);
        });
        this.renderFixedRowNext(trNodeList);
        this.calcScroll();
    }

    /**
     * 判断该位置是否需要固定
     * @param {Number} index 在表格中的位置（第 index 行/第 index 列）
     * @param {String} type 类型（行/列）
     * @return {Number}
     * -1：非固定位
     * 0：固定位，前
     * 1：固定位，后
     */
    isFixedCell(index, type) {
        let fixedList = this.fixedRowList,
            count = this._children.tableBase.rowCount;

        if (type === 'COLUMN') {
            fixedList = this.fixedColumnList;
            count = this._children.tableBase.columnCount;
        }

        for (let i = 0; i < fixedList.length; i++) {
            if (fixedList[i].start <= index && index < fixedList[i].end) {
                return fixedList[i].end !== count ? 0 : 1;
            }
        }

        return -1;
    }

    /**
     * 渲染固定行
     */
    renderFixedRow(rowNode, rowIndex) {
        const { ROW, ROW_LAST } = this.STYLE_CLASS_NAME;
        const CLASS_LIST = [[ROW], [ROW, ROW_LAST]];
        let fixedRow = this.isFixedCell(rowIndex, 'ROW');

        if (fixedRow !== -1) {
            rowNode.addClass(CLASS_LIST[fixedRow]);
            this.setMaxRowspan(rowNode);
        }
    }

    /**
     * 设置当前行的 z-index
     */
    setMaxRowspan(trNode) {
        let zIndex = 0;

        trNode.children().forEach((elem, index, cellList) => {
            zIndex = Math.max(zIndex, parseInt(cellList.eq(index).attr('rowspan') || 0));
        });

        trNode.css('z-index', parseInt(trNode.css('zIndex') || 0) + zIndex);
    }

    /**
     * 渲染固定行的下一行（显示的下一行）
     */
    renderFixedRowNext(nodeList) {
        const { ROW_NEXT } = this.STYLE_CLASS_NAME;
        nodeList.matches('.tb_show-row').forEach((elem, index, showNodeList) => {
            // 固定行
            if (showNodeList.eq(index).hasClass('tfc_fixed-row')) {
                showNodeList.eq(index + 1).addClass(ROW_NEXT);
            }
        });
    }

    /**
     * 渲染固定列
     */
    renderFixedColumn(cellNode, cellIndex) {
        const { COLUMN, COLUMN_LAST } = this.STYLE_CLASS_NAME;
        const CLASS_LIST = [[COLUMN], [COLUMN, COLUMN_LAST]];

        let fixedColumn = this.isFixedCell(cellIndex, 'COLUMN');
        if (fixedColumn !== -1) {
            cellNode && cellNode.addClass(CLASS_LIST[fixedColumn]);
        }
    }

    /**
     * 渲染固定列的下一列（显示的下一列）
     */
    renderFixedColumnNext(cellList) {
        const { COLUMN, COLUMN_NEXT } = this.STYLE_CLASS_NAME;
        let lastCellFixed = false;

        cellList.forEach((cellNode) => {
            if (!cellNode.hasClass('tb_show_column')) {
                return;
            }
            lastCellFixed && cellNode.addClass(COLUMN_NEXT);
            lastCellFixed = cellNode.hasClass(COLUMN);
        });
    }

    /**
     * 合并单元格
     * @param {Number} column 列数
     */
    mergeRowCell(column) {
        this._children.tableBase.mergeRowCell(column);
        this.renderFixedCell();
    }
}

/**
 * @member {string} _template 模板
 */
TableFixedCell._template = `<div class="table-fixed-cell"><slot class="tfc_table-base" data-component="LY.Extend.TableBase"></slot></div>`;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TableFixedCell);


/***/ }),
/* 74 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_table_fixed_cell_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(75);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_table_fixed_cell_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_table_fixed_cell_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_table_fixed_cell_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_table_fixed_cell_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 75 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.table-fixed-cell {
    --tfc_background-color_thead: #f5f4f9;
    --tfc_background-color_tbody: #fff;
    --tfc_background-color_row: #f5f4f9;
    --tfc_background-color_column: #fff;
    --tfc_background-color_row-column: #f5f4f9;
    --tfc_border: 1px solid #ddd;
    --tfc_top_scroll: 0px;
    --tfc_bottom_scroll: 0px;
    --tfc_left_scroll: 0px;
    --tfc_right_scroll: 0px;

    position: relative;
    z-index: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
}

.table-fixed-cell .tfc_table-base {
    --tb_border: var(--tfc_border);
    --tb_background-color_thead: var(--tfc_background-color_thead);
    --tb_background-color_tbody: var(--tfc_background-color_tbody);
}

/* 固定行 */
.table-fixed-cell .tfc_table-base .tfc_fixed-row {
    position: relative;
    top: var(--tfc_top_scroll);
    z-index: 20;
}

.table-fixed-cell .tfc_table-base .tfc_fixed-row-last,
.table-fixed-cell .tfc_table-base .tfc_fixed-row-last {
    top: unset;
    bottom: var(--tfc_bottom_scroll);
}

.table-fixed-cell .tfc_table-base .tfc_fixed-row > th,
.table-fixed-cell .tfc_table-base .tfc_fixed-row > td {
    background-color: var(--tfc_background-color_row);
}

.table-fixed-cell .tfc_table-base .tfc_fixed-row > th::before,
.table-fixed-cell .tfc_table-base .tfc_fixed-row > td::before {
    border-bottom: var(--tfc_border);
}

.table-fixed-cell .tfc_table-base .tfc_fixed-row-next > th::before,
.table-fixed-cell .tfc_table-base .tfc_fixed-row-next > td::before {
    border-top: none;
}

/* 固定列 */
.table-fixed-cell .tfc_table-base .tfc_fixed-column {
    left: var(--tfc_left_scroll);
    z-index: 10;
    background-color: var(--tfc_background-color_column);
}

.table-fixed-cell .tfc_table-base .tfc_fixed-column-last {
    left: unset;
    right: var(--tfc_right_scroll);
}

.table-fixed-cell .tfc_table-base .tfc_fixed-column::before,
.table-fixed-cell .tfc_table-base .tfc_fixed-column::before {
    border-right: var(--tfc_border);
}

.table-fixed-cell .tfc_table-base .tfc_fixed-column-next::before,
.table-fixed-cell .tfc_table-base .tfc_fixed-column-next::before {
    border-left: none;
}

/* 交叉位置 */
.table-fixed-cell .tfc_table-base .tfc_fixed-row > .tfc_fixed-column {
    background-color: var(--tfc_background-color_row-column);
}

/* 无数据 */
.table-fixed-cell .tfc_table-base .tb_empty {
    top: 0 !important;
    left: 0 !important;
    background-color: var(--tfc_background-color_tbody) !important;
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 76 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _base_my_node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18);
/* harmony import */ var _base_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(21);
/* harmony import */ var _base_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13);




/**
 * 水印
 * @author wang.xin63
 * @extends Component
 * @example
 * const waterMark = new WaterMark();
 * waterMark.load({
 *     parent: dom, // 水印容器，即水印添加到哪个元素中，建议与iframe并列
 *     show: true, // 是否显示水印
 *     position: 'absolute', // 水印显示方式，['fixed', 'absolute']
 *     getMarkInfo: () => {
 *         return [];
 *     }, // 获取水印内容，函数返回字符串数组，代表每一行显示的内容
 *     interval: 1000, // 刷新频率，单位ms
 *     fillStyle: '#333' // 字体样式
 * });
 */
class WaterMark extends _base_component__WEBPACK_IMPORTED_MODULE_1__["default"] {
    constructor() {
        super(document.createElement('div'));
    }

    /**
     * 挂载成功
     */
    _mounted() {
        this.monitor();
        this.init();
    }

    /**
     * 属性
     */
    monitor() {
        /**
         * 透明度
         * @member {number} opacity
         * @memberof WaterMark#
         * @default 0.16
         */
        this.opacity = 0.16;

        /**
         * 水印实例化对象
         * @member {CanvasMark} mask
         * @memberof WaterMark#
         */
        this.mark = new CanvasMark();

        /**
         * 备份节点，当节点发生变化时，通过备份节点恢复
         * @member {Node} copyNode
         * @memberof WaterMark#
         */
        this.copyNode = null;

        /**
         * @member {number} interval 刷新频率
         * @memberof WaterMark#
         * @default 1000
         */
        this._observe('interval', 1000, (value) => {
            setInterval(() => {
                this.setZIndex();
                this.markInfo = this.options.getMarkInfo();
            }, value);
        });

        /**
         * 水印信息
         * @member {string[]} markInfo
         * @memberof WaterMark#
         */
        this._observe('markInfo', (value) => {
            if (!Array.isArray(value) || value.length === 0) {
                return;
            }
            this.mark.render(value);
        });

        /**
         * 字体样式
         * @member {string} fillStyle
         * @memberof WaterMark#
         */
        this._observe('fillStyle', (value) => {
            this.mark.fillStyle = value;
        });

        /**
         * 最大层级
         * @member {Number} maxZIndex
         * @memberof WaterMark#
         */
        this.maxZIndex = Math.pow(2, 31) - 1;
    }

    /**
     * 初始化
     * @todo 添加水印节点
     * @todo 渲染样式，不能通过外联样式，否则修改样式不会触发节点更新
     */
    init() {
        this.node
            .append(this.mark.node)
            .css('display', 'block', 'important')
            .css('visibility', 'visible', 'important')
            .css('position', 'fixed', 'important')
            .css('top', '0', 'important')
            .css('left', '0', 'important')
            .css('z-index', this.maxZIndex, 'important')
            .css('pointer-events', 'none', 'important')
            .css('width', '100%', 'important')
            .css('height', '100%', 'important')
            .css('overflow', 'hidden', 'important')
            .css('opacity', this.opacity, 'important')
            .css('transform', 'none', 'important');
    }

    /**
     * 加载
     * @param {object} options 入参
     * @param {boolean} options.show 是否显示
     * @param {object} options.parent 父节点
     * @param {string} options.position 显示范围
     * @param {number} options.interval 刷新频率
     * @param {function} options.getMarkInfo 获取水印信息，返回的是一个字符串数组
     */
    load(options) {
        this.options = options; // 缓存入参

        // 控制显示
        if (options.show) {
            options.parent && new _base_my_node__WEBPACK_IMPORTED_MODULE_0__["default"](options.parent).prepend(this.node);
            this.node.css('position', options.position, 'important');
            this.copyNode = new _base_my_node__WEBPACK_IMPORTED_MODULE_0__["default"](this.node[0].cloneNode(true));
            this.markInfo = options.getMarkInfo();

            // 设置刷新频率
            if (typeof options.interval === 'number') {
                this.interval = options.interval;
            }
            this.listenNodeChange();
        }
    }

    /**
     * 监听节点变化
     */
    listenNodeChange() {
        if (typeof MutationObserver === 'undefined') {
            return;
        }

        this.mutationObserver = new MutationObserver((mutations) => {
            mutations.forEach((elem) => {
                let targetNode = new _base_my_node__WEBPACK_IMPORTED_MODULE_0__["default"](elem.target);

                // 当移除的是该实例节点
                if (this.node[0] === elem.removedNodes[0]) {
                    targetNode.prepend(this.node);
                }

                // 当移除的是水印节点
                if (this.mark.node[0] === elem.removedNodes[0]) {
                    this.node.append(this.mark.node);
                }

                // 节点发生变化
                if (targetNode[0] === this.node[0] || targetNode[0] === this.mark.node[0]) {
                    // 修改属性值，但是改变前后值没有变化
                    if (elem.addedNodes.length === 0 && targetNode.attr(elem.attributeName) === elem.oldValue) {
                        return;
                    }

                    // 新增节点，但是新增的是节点本身，则不需要处理
                    if (elem.addedNodes[0] === this.node[0] || elem.addedNodes[0] === this.mark.node[0]) {
                        return;
                    }

                    // 先断开原先的关联，再重新建立链接
                    this.mutationObserver.disconnect();
                    this.updateMark();
                    this.addLinkedNode();
                }
            });
        });
        this.addLinkedNode();
    }

    /**
     * 添加关联节点
     */
    addLinkedNode() {
        this.mutationObserver.observe(this.node.parent()[0], {
            attributes: true,
            attributeOldValue: true,
            childList: true,
            subtree: true
        });
    }

    /**
     * 更新水印
     */
    updateMark() {
        // 备份节点替换主节点，然后重新备份节点
        this.node.replaceWith(this.copyNode);
        this.node = this.copyNode;
        this.copyNode = new _base_my_node__WEBPACK_IMPORTED_MODULE_0__["default"](this.node[0].cloneNode(true));
        // 重新创建canvas，然后替换
        this.mark = new CanvasMark();
        this.node.find('canvas').replaceWith(this.mark.node);
        // 刷新水印信息
        this.markInfo = this.options.getMarkInfo();
    }

    /**
     * 降低比自己层级高的节点
     */
    setZIndex() {
        let parentNode = this.node.parent();

        while (parentNode.length > 0) {
            parentNode.children().forEach((elem) => {
                if (+window.getComputedStyle(elem).zIndex === this.maxZIndex && elem !== this.node[0]) {
                    elem.style.zIndex = this.maxZIndex - 1;
                }
            });
            parentNode = parentNode.parent();
        }
    }
}

/**
 * 通过 canvas 绘制水印
 * @extends Component
 */
class CanvasMark extends _base_component__WEBPACK_IMPORTED_MODULE_1__["default"] {
    constructor() {
        super(document.createElement('canvas'));
    }

    /**
     * 挂载成功
     */
    _mounted() {
        this.monitor();
    }

    /**
     * 属性
     */
    monitor() {
        /**
         * 宽度
         * @member {number} width
         * @memberof CanvasMark#
         */
        this.width = 3840;

        /**
         * 高度
         * @member {number} height
         * @memberof CanvasMark#
         */
        this.height = 2560;

        /**
         * @member {Node} canvas 画布
         * @memberof CanvasMark#
         */
        this.canvas = this.node[0];

        /**
         * 绘制上下文
         * @member {CanvasRenderingContext2D} context
         * @memberof CanvasMark#
         */
        this.context = this.canvas.getContext('2d');

        /**
         * @member {string} fontSize 字体大小
         * @memberof CanvasMark#
         */
        this.fontSize = 12;

        /**
         * @member {string} fillStyle 字体样式
         * @memberof CanvasMark#
         */
        this.fillStyle = '#333';
    }

    /**
     * 渲染
     * @param {object} infoList 信息列表
     * @todo 1. 清除画布内容
     * @todo 2. 设置基础样式
     * @todo 3. 计算水印位置
     * @todo 4. 循环绘制水印
     */
    render(infoList) {
        let context = this.context,
            base = {
                x: 50,
                y: 50
            },
            padding = {
                x: 240, // 行间距
                y: 180 // 列间距
            },
            count = {
                x: this.height / padding.x,
                y: this.width / padding.y
            }; // 个数

        this.node
            .css('display', 'block', 'important')
            .css('visibility', 'visible', 'important')
            .css('position', 'absolute', 'important')
            .css('top', '0', 'important')
            .css('left', '0', 'important')
            .css('width', 'unset', 'important')
            .css('height', 'unset', 'important')
            .css('opacity', 'unset', 'important')
            .css('transform', 'none', 'important');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        context.font = `normal ${this.fontSize}px Regular`;
        context.fillStyle = this.fillStyle;
        infoList = this.calcPosition(infoList);

        for (let row = 0; row < count.x; row++) {
            for (let col = 0; col < count.y; col++) {
                this.drawFont(infoList, base.x + row * padding.x, base.y + col * padding.y);
            }
        }
    }

    /**
     * 绘制文字
     * @param {object[]} infoList 文字信息
     * @param {number} left 左侧距离
     * @param {number} top 顶部距离
     * @param {number} rotate 旋转角度
     */
    drawFont(infoList, left = 0, top = 0, rotate = (-30 * Math.PI) / 360) {
        let context = this.context;

        context.setTransform();
        context.translate(left, top);
        context.rotate(rotate);
        infoList.forEach((info) => {
            context.fillText(info.text, info.x, info.y);
        });
    }

    /**
     * 计算字符串绘制起始坐标
     * @param {string[]} infoList 信息列表
     * @return {object[]}
     * @return {string}
     * @return {number}
     * @return {number}
     */
    calcPosition(infoList) {
        let context = this.context,
            lineHeight = this.fontSize * 1.5,
            baseLength = context.measureText(infoList[0]).width;

        // 做居中对齐处理
        return infoList.map((info, index) => {
            return {
                text: info,
                x: (baseLength - context.measureText(info).width) / 2,
                y: lineHeight * index
            };
        });
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WaterMark);


/***/ }),
/* 77 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * XML 节点
 */
class XMLNode {
    constructor(data, nodeName) {
        if (typeof data === 'number') {
            this.nodeType = data;
            this.nodeName = nodeName;
            this.childNodes = []; // 所有 Node
        } else {
            return parseXML(data);
        }
    }

    /**
     * 添加子节点
     * @param {XMLNode} 节点
     */
    append(xmlNode) {
        if (!xmlNode instanceof XMLNode) {
            return;
        }
        this.childNodes.push(xmlNode);
        xmlNode.parentNode = this;
        if ((this instanceof RootNode || this instanceof ElementNode) && xmlNode instanceof ElementNode) {
            this.children.push(xmlNode);
        }
    }

    /**
     * 转为 JSON 格式
     */
    toJson(result = {}) {
        if (this.children.length === 0) {
            return this.text;
        }
        this.children.forEach((elementNode) => {
            if (result[elementNode.nodeName] == null) {
                let nodeList = this.children.filter((item) => item.nodeName === elementNode.nodeName);

                result[elementNode.nodeName] = nodeList.length > 1 ? [] : {};
            }
            if (result[elementNode.nodeName] instanceof Array) {
                result[elementNode.nodeName].push(elementNode.toJson());
            } else {
                result[elementNode.nodeName] = elementNode.toJson();
            }
        });
        return result;
    }
}

XMLNode.ROOT_NODE = 0;
XMLNode.ELEMENT_NODE = 1;
XMLNode.ATTRIBUTE_NODE = 2;
XMLNode.TEXT_NODE = 3;
XMLNode.CDATA_SECTION_NODE = 4;
XMLNode.COMMENT_NODE = 8;

/**
 * 根节点
 */
class RootNode extends XMLNode {
    constructor() {
        super(XMLNode.ROOT_NODE, '#root');
        this.children = [];
    }
}

/**
 * 元素节点
 */
class ElementNode extends XMLNode {
    constructor(nodeName, position) {
        super(XMLNode.ELEMENT_NODE, nodeName);
        this.position = position;
        this.attribute = {};
        this.children = [];
    }
}

/**
 * 注释节点
 */
class CommentNode extends XMLNode {
    constructor(text) {
        super(XMLNode.COMMENT_NODE, '#comment');
        this.nodeValue = text;
    }
}

/**
 * 文本节点
 */
class TextNode extends XMLNode {
    constructor(text) {
        super(XMLNode.TEXT_NODE, '#text');
        this.nodeValue = text;
    }
}

/**
 * CDATA节点
 */
class CdataSectionNode extends XMLNode {
    constructor(text) {
        super(XMLNode.CDATA_SECTION_NODE, '#cdata-section');
        this.nodeValue = text;
    }
}

/**
 * xml解析为json
 * @param {string} data XML文本
 * @example parseXML(data)
 */
function parseXML(data) {
    /**
     * ElementNode: /(<([\/a-z][\a-z\d\-\.]*)([\s\S]*?)(\/)?>)/
     * CommentNode: /(<!--([\s\S]*?)-->)/
     * CdataSectionNode: /(<!\[CDATA\[([\s\S]*?)\]\]>)/
     * 0 匹配到的字符串
     * 1 ElementNode节点标志位，匹配失败为 undefined
     * 2 标签或闭合标签
     * 3 属性值
     * 4 单标签节点标志位，匹配成功为 undefined
     * 5 CommentNode节点标志位，匹配失败为 undefined
     * 6 注释
     * 7 CDATA节点标志位，匹配失败为 undefined
     * 8 值
     */
    let xmlRegExp = /(<([\/a-z][\a-z\d\-\.]*)([\s\S]*?)(\/)?>)|(<!--([\s\S]*?)-->)|(<!\[CDATA\[([\s\S]*?)\]\]>)/gi; // 匹配器
    let root = new RootNode(), // 根节点
        stack = [root]; // 栈，至少含有根节点一个元素

    root.innerHTML = data;
    xml2json();
    parseInnerText();

    return root;

    /**
     * 解析XML文本
     */
    function xml2json() {
        let topNode = stack[stack.length - 1], // 栈顶节点
            lastIndex = xmlRegExp.lastIndex,
            result = xmlRegExp.exec(data);

        if (result) {
            let {
                1: elementNodeSign,
                2: elementLabel,
                3: attribute,
                4: singleLabelSign,
                5: commentNodeSign,
                6: comment,
                7: cdataSectionNodeSign,
                8: cdata,
                index
            } = result;

            if (lastIndex !== index) {
                // TextNode
                topNode.append(new TextNode(data.slice(lastIndex, index)));
            }

            if (commentNodeSign !== undefined) {
                // CommentNode
                topNode.append(new CommentNode(comment));
            } else if (cdataSectionNodeSign !== undefined) {
                // CdataSectionNode
                topNode.append(new CdataSectionNode(cdata));
            } else if (elementNodeSign !== undefined) {
                // ElementNode
                let elementNode = new ElementNode(elementLabel, {
                    0: index,
                    1: xmlRegExp.lastIndex
                });
                parseAttribute(elementNode, attribute);
                if (singleLabelSign !== undefined) {
                    topNode.append(elementNode);
                } else {
                    parseDoubleLabel(elementNode, result);
                }
            }
            xml2json();
        } else {
            if (lastIndex !== data.length) {
                // TextNode
                topNode.append(new TextNode(data.slice(lastIndex)));
            }
        }
    }

    /**
     * 解析双标签节点
     * @param {object} elem 节点
     * @param {object} res 匹配结果
     */
    function parseDoubleLabel(elementNode, res) {
        let topNode = stack[stack.length - 1]; // 栈顶节点

        if (res[2] === `/${topNode.nodeName}`) {
            // 闭合标签，先赋值，再出栈
            topNode.position[2] = res.index;
            topNode.position[3] = xmlRegExp.lastIndex;
            topNode.innerHTML = data.slice(topNode.position[1], topNode.position[2]);
            topNode.outerHTML = data.slice(topNode.position[0], topNode.position[3]);
            stack.pop();
        } else {
            // 非闭合标签，继续进栈
            topNode.append(elementNode);
            stack.push(elementNode);
        }
    }

    /**
     * 解析属性
     * @param {object} elem 节点
     * @param {string} attribute 属性字符串
     */
    function parseAttribute(elem, attribute) {
        let attributeReg = /([a-z\-:]+)(="([\s\S]*?)")?/gi;

        if (attribute != null && attribute.trim() !== '') {
            attribute.replace(attributeReg, (item, key, value1, value2) => {
                elem.attribute[key] = value1 !== undefined ? value2 : '';
                return '';
            });
        }
    }

    /**
     * 解析节点内的文本内容
     */
    function parseInnerText(node = root) {
        if (!node instanceof RootNode && !node instanceof ElementNode) {
            return;
        }

        let text = '';

        if (node.childNodes.length === 0) {
            return '';
        }
        node.childNodes.forEach((child) => {
            if (child instanceof TextNode) {
                text += child.nodeValue;
            } else if (child instanceof ElementNode) {
                text += parseInnerText(child);
            }
        });
        node.text = text.trim();
        node.innerText = text;
        return node.innerText;
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (XMLNode);


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _assets_css_icon_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _assets_iconfont_iconfont_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);
/* harmony import */ var _assets_iconfont_iconfont_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_assets_iconfont_iconfont_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _modules_base_ajax_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(12);
/* harmony import */ var _modules_base_util_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(13);
/* harmony import */ var _modules_base_vc_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(17);
/* harmony import */ var _modules_base_component_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(21);
/* harmony import */ var _modules_base_event_bus_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(15);
/* harmony import */ var _modules_base_my_node_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(18);
/* harmony import */ var _modules_base_observe_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(14);
/* harmony import */ var _modules_base_task_queue_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(19);
/* harmony import */ var _modules_base_time_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(20);
/* harmony import */ var _modules_base_watcher_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(22);
/* harmony import */ var _modules_form_index_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(23);
/* harmony import */ var _modules_extend_index_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(45);
/* harmony import */ var _modules_base_xml_node_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(77);
















/**
 * 对外暴露的全局变量
 *
 * @namespace
 */
const LY = {};

/**
 * 接口请求相关方法
 *
 * @see module:Ajax
 */
LY.Ajax = _modules_base_ajax_js__WEBPACK_IMPORTED_MODULE_2__["default"];

/**
 * 常用工具方法
 *
 * @see module:Util
 */
LY.Util = _modules_base_util_js__WEBPACK_IMPORTED_MODULE_3__["default"];

/**
 * 组件引入相关方法
 *
 * @see module:VC
 */
LY.VC = _modules_base_vc_js__WEBPACK_IMPORTED_MODULE_4__["default"];

/**
 * 扩展功能
 *
 * @see module:Extend
 */
LY.Extend = _modules_extend_index_js__WEBPACK_IMPORTED_MODULE_13__["default"];

/**
 * 组件基类
 *
 * @see Component
 */
LY.Component = _modules_base_component_js__WEBPACK_IMPORTED_MODULE_5__["default"];

/**
 * 事件总线
 *
 * @see EventBus
 */
LY.EventBus = _modules_base_event_bus_js__WEBPACK_IMPORTED_MODULE_6__["default"];

/**
 * 封装 DOM 操作
 *
 * @see MyNode
 */
LY.MyNode = _modules_base_my_node_js__WEBPACK_IMPORTED_MODULE_7__["default"];

/**
 * 监听器
 *
 * @see Observe
 */
LY.Observe = _modules_base_observe_js__WEBPACK_IMPORTED_MODULE_8__["default"];

/**
 * 任务队列
 *
 * @see TaskQueue
 */
LY.TaskQueue = _modules_base_task_queue_js__WEBPACK_IMPORTED_MODULE_9__["default"];

/**
 * 时间
 *
 * @see Time
 */
LY.Time = _modules_base_time_js__WEBPACK_IMPORTED_MODULE_10__["default"];

/**
 * 观察者
 *
 * @see Watcher
 */
LY.Watcher = _modules_base_watcher_js__WEBPACK_IMPORTED_MODULE_11__["default"];

/**
 * 表单
 *
 * @see Form
 */
LY.Form = _modules_form_index_js__WEBPACK_IMPORTED_MODULE_12__["default"];

/**
 * XML 节点
 *
 * @see XMLNode
 */
LY.XMLNode = _modules_base_xml_node_js__WEBPACK_IMPORTED_MODULE_14__["default"];

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LY);

})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});