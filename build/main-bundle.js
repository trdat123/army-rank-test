/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/class.ts":
/*!**********************!*\
  !*** ./src/class.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ArmyRankingApp: () => (/* binding */ ArmyRankingApp),
/* harmony export */   Officer: () => (/* binding */ Officer)
/* harmony export */ });
var Officer = /** @class */ (function () {
    function Officer(id, name, subs) {
        this.id = id;
        this.name = name;
        this.subordinates = subs;
    }
    Officer.prototype.size = function () {
        var i = 1;
        var currSub = this;
        while ((currSub === null || currSub === void 0 ? void 0 : currSub.subordinates) !== null) {
            i++;
            currSub = currSub.subordinates;
        }
        return i;
    };
    Officer.prototype.getOfficer = function (id) {
        return this.id === id ? this : null;
    };
    Officer.prototype.getRank = function (id) {
        var rank = 1;
        var cur = this;
        while (cur) {
            if (cur.id === id) {
                return rank;
            }
            cur = cur.subordinates;
            rank++;
        }
        return -1;
    };
    return Officer;
}());

var ArmyRankingApp = /** @class */ (function () {
    function ArmyRankingApp() {
        this.general = new Officer(100, "MMP", null);
        var sub2 = new Officer(200, "John Weak", null);
        this.general.subordinates = sub2;
        var sub3 = new Officer(300, "John Cena", null);
        sub2.subordinates = sub3;
    }
    ArmyRankingApp.prototype.moveOfficer = function (officerID, managerID) { };
    ArmyRankingApp.prototype.undo = function () { };
    ArmyRankingApp.prototype.redo = function () { };
    return ArmyRankingApp;
}());



/***/ })

/******/ 	});
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
/******/ 			// no module.id needed
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./class */ "./src/class.ts");

var App = new _class__WEBPACK_IMPORTED_MODULE_0__.ArmyRankingApp();
// initiate general
document.querySelector("#app").innerHTML = "\n    <h1>Vite + TypeScript</h1>\n    <div id=\"list\">\n    </div>\n";
var list = document.getElementById("list");
var cur = App.general;
var colorTable = ["#1a1a1a", "#a15ef2", "#3700b3", "#cf6679"];
while (cur) {
    var curRank = App.general.getRank(cur.id);
    list.innerHTML +=
        /*html*/
        "\n        <button id=\"".concat(cur.id, "\" style=\"margin-left: ").concat(curRank * 6, "rem; background-color: ").concat(colorTable[curRank - 1], "\">\n            ").concat(cur.name, "\n        </button>\n        ");
    cur = cur.subordinates;
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ2tCO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDeUI7Ozs7Ozs7VUM5QzFCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOeUM7QUFDekMsY0FBYyxrREFBYztBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1R0FBdUc7QUFDdkc7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9jbGFzcy50cyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIE9mZmljZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT2ZmaWNlcihpZCwgbmFtZSwgc3Vicykge1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuc3Vib3JkaW5hdGVzID0gc3VicztcbiAgICB9XG4gICAgT2ZmaWNlci5wcm90b3R5cGUuc2l6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGkgPSAxO1xuICAgICAgICB2YXIgY3VyclN1YiA9IHRoaXM7XG4gICAgICAgIHdoaWxlICgoY3VyclN1YiA9PT0gbnVsbCB8fCBjdXJyU3ViID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjdXJyU3ViLnN1Ym9yZGluYXRlcykgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIGN1cnJTdWIgPSBjdXJyU3ViLnN1Ym9yZGluYXRlcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaTtcbiAgICB9O1xuICAgIE9mZmljZXIucHJvdG90eXBlLmdldE9mZmljZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaWQgPT09IGlkID8gdGhpcyA6IG51bGw7XG4gICAgfTtcbiAgICBPZmZpY2VyLnByb3RvdHlwZS5nZXRSYW5rID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHZhciByYW5rID0gMTtcbiAgICAgICAgdmFyIGN1ciA9IHRoaXM7XG4gICAgICAgIHdoaWxlIChjdXIpIHtcbiAgICAgICAgICAgIGlmIChjdXIuaWQgPT09IGlkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJhbms7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdXIgPSBjdXIuc3Vib3JkaW5hdGVzO1xuICAgICAgICAgICAgcmFuaysrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9O1xuICAgIHJldHVybiBPZmZpY2VyO1xufSgpKTtcbmV4cG9ydCB7IE9mZmljZXIgfTtcbnZhciBBcm15UmFua2luZ0FwcCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBcm15UmFua2luZ0FwcCgpIHtcbiAgICAgICAgdGhpcy5nZW5lcmFsID0gbmV3IE9mZmljZXIoMTAwLCBcIk1NUFwiLCBudWxsKTtcbiAgICAgICAgdmFyIHN1YjIgPSBuZXcgT2ZmaWNlcigyMDAsIFwiSm9obiBXZWFrXCIsIG51bGwpO1xuICAgICAgICB0aGlzLmdlbmVyYWwuc3Vib3JkaW5hdGVzID0gc3ViMjtcbiAgICAgICAgdmFyIHN1YjMgPSBuZXcgT2ZmaWNlcigzMDAsIFwiSm9obiBDZW5hXCIsIG51bGwpO1xuICAgICAgICBzdWIyLnN1Ym9yZGluYXRlcyA9IHN1YjM7XG4gICAgfVxuICAgIEFybXlSYW5raW5nQXBwLnByb3RvdHlwZS5tb3ZlT2ZmaWNlciA9IGZ1bmN0aW9uIChvZmZpY2VySUQsIG1hbmFnZXJJRCkgeyB9O1xuICAgIEFybXlSYW5raW5nQXBwLnByb3RvdHlwZS51bmRvID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgIEFybXlSYW5raW5nQXBwLnByb3RvdHlwZS5yZWRvID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgIHJldHVybiBBcm15UmFua2luZ0FwcDtcbn0oKSk7XG5leHBvcnQgeyBBcm15UmFua2luZ0FwcCB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBBcm15UmFua2luZ0FwcCB9IGZyb20gXCIuL2NsYXNzXCI7XG52YXIgQXBwID0gbmV3IEFybXlSYW5raW5nQXBwKCk7XG4vLyBpbml0aWF0ZSBnZW5lcmFsXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FwcFwiKS5pbm5lckhUTUwgPSBcIlxcbiAgICA8aDE+Vml0ZSArIFR5cGVTY3JpcHQ8L2gxPlxcbiAgICA8ZGl2IGlkPVxcXCJsaXN0XFxcIj5cXG4gICAgPC9kaXY+XFxuXCI7XG52YXIgbGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGlzdFwiKTtcbnZhciBjdXIgPSBBcHAuZ2VuZXJhbDtcbnZhciBjb2xvclRhYmxlID0gW1wiIzFhMWExYVwiLCBcIiNhMTVlZjJcIiwgXCIjMzcwMGIzXCIsIFwiI2NmNjY3OVwiXTtcbndoaWxlIChjdXIpIHtcbiAgICB2YXIgY3VyUmFuayA9IEFwcC5nZW5lcmFsLmdldFJhbmsoY3VyLmlkKTtcbiAgICBsaXN0LmlubmVySFRNTCArPVxuICAgICAgICAvKmh0bWwqL1xuICAgICAgICBcIlxcbiAgICAgICAgPGJ1dHRvbiBpZD1cXFwiXCIuY29uY2F0KGN1ci5pZCwgXCJcXFwiIHN0eWxlPVxcXCJtYXJnaW4tbGVmdDogXCIpLmNvbmNhdChjdXJSYW5rICogNiwgXCJyZW07IGJhY2tncm91bmQtY29sb3I6IFwiKS5jb25jYXQoY29sb3JUYWJsZVtjdXJSYW5rIC0gMV0sIFwiXFxcIj5cXG4gICAgICAgICAgICBcIikuY29uY2F0KGN1ci5uYW1lLCBcIlxcbiAgICAgICAgPC9idXR0b24+XFxuICAgICAgICBcIik7XG4gICAgY3VyID0gY3VyLnN1Ym9yZGluYXRlcztcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==