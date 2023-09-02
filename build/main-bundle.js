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
/* harmony export */   Officer: () => (/* binding */ Officer),
/* harmony export */   OfficerList: () => (/* binding */ OfficerList)
/* harmony export */ });
var Officer = /** @class */ (function () {
    function Officer(id, name, subs) {
        this.id = id;
        this.name = name;
        this.subordinates = subs;
        this.rank = 1;
    }
    Officer.prototype.addSub = function (officer) {
        var _a;
        officer.rank = this.rank + 1;
        (_a = this.subordinates) === null || _a === void 0 ? void 0 : _a.push(officer);
    };
    return Officer;
}());

var OfficerList = /** @class */ (function () {
    function OfficerList(general) {
        this.general = general;
    }
    return OfficerList;
}());

var ArmyRankingApp = /** @class */ (function () {
    function ArmyRankingApp() {
        var general = new Officer(100, "MMP", []);
        this.general = general;
        var sub2 = new Officer(200, "John Weak", []);
        var sub3 = new Officer(300, "John Cena", []);
        var sub4 = new Officer(400, "Ben", []);
        var sub5 = new Officer(500, "Cooper", []);
        var sub6 = new Officer(600, "A", []);
        var sub7 = new Officer(700, "B", []);
        var sub8 = new Officer(800, "C", []);
        general.addSub(sub2);
        general.addSub(sub3);
        sub2.addSub(sub6);
        sub3.addSub(sub4);
        sub3.addSub(sub5);
        sub4.addSub(sub7);
        sub4.addSub(sub8);
        // const officerList = new OfficerList(general);
        console.log(general);
    }
    ArmyRankingApp.prototype.moveOfficer = function (officerID, managerID) { };
    ArmyRankingApp.prototype.undo = function () { };
    ArmyRankingApp.prototype.redo = function () { };
    return ArmyRankingApp;
}());



/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   colorTable: () => (/* binding */ colorTable),
/* harmony export */   renderSubs: () => (/* binding */ renderSubs)
/* harmony export */ });
var colorTable = ["#1a1a1a", "#a15ef2", "#3700b3", "#cf6679"];
var renderSubs = function (subs, list) {
    console.log("loop", subs);
    subs.forEach(function (subEl) {
        list.innerHTML +=
            /*html*/
            "\n            <button id=\"".concat(subEl.id, "\" style=\"margin-left: ").concat(subEl.rank * 4, "rem; background-color: ").concat(colorTable[subEl.rank - 1], "\">\n                ").concat(subEl.name, "\n            </button>\n            ");
        if (subEl.subordinates.length > 0)
            renderSubs(subEl.subordinates, list);
        else
            return;
    });
};


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
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");


var App = new _class__WEBPACK_IMPORTED_MODULE_0__.ArmyRankingApp();
document.querySelector("#app").innerHTML = "\n    <h1>Vite + TypeScript</h1>\n    <div id=\"list\">\n    </div>\n";
var list = document.getElementById("list");
var general = App.general;
list.innerHTML =
    /*html*/
    "\n    <button id=\"".concat(general.id, "\" style=\"margin-left: ").concat(general.rank * 4, "rem; background-color: ").concat(_utils__WEBPACK_IMPORTED_MODULE_1__.colorTable[general.rank - 1], "\">\n        ").concat(general.name, "\n    </button>\n    ");
(0,_utils__WEBPACK_IMPORTED_MODULE_1__.renderSubs)(general.subordinates, list);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNrQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNzQjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDeUI7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoRG5CO0FBQ0E7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9IQUFvSDtBQUNwSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7Ozs7OztVQ1pBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTnlDO0FBQ1E7QUFDakQsY0FBYyxrREFBYztBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0dBQXdHLDRCQUE0Qiw4Q0FBVTtBQUM5SSxrREFBVSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9jbGFzcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBPZmZpY2VyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE9mZmljZXIoaWQsIG5hbWUsIHN1YnMpIHtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnN1Ym9yZGluYXRlcyA9IHN1YnM7XG4gICAgICAgIHRoaXMucmFuayA9IDE7XG4gICAgfVxuICAgIE9mZmljZXIucHJvdG90eXBlLmFkZFN1YiA9IGZ1bmN0aW9uIChvZmZpY2VyKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgb2ZmaWNlci5yYW5rID0gdGhpcy5yYW5rICsgMTtcbiAgICAgICAgKF9hID0gdGhpcy5zdWJvcmRpbmF0ZXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5wdXNoKG9mZmljZXIpO1xuICAgIH07XG4gICAgcmV0dXJuIE9mZmljZXI7XG59KCkpO1xuZXhwb3J0IHsgT2ZmaWNlciB9O1xudmFyIE9mZmljZXJMaXN0ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE9mZmljZXJMaXN0KGdlbmVyYWwpIHtcbiAgICAgICAgdGhpcy5nZW5lcmFsID0gZ2VuZXJhbDtcbiAgICB9XG4gICAgcmV0dXJuIE9mZmljZXJMaXN0O1xufSgpKTtcbmV4cG9ydCB7IE9mZmljZXJMaXN0IH07XG52YXIgQXJteVJhbmtpbmdBcHAgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQXJteVJhbmtpbmdBcHAoKSB7XG4gICAgICAgIHZhciBnZW5lcmFsID0gbmV3IE9mZmljZXIoMTAwLCBcIk1NUFwiLCBbXSk7XG4gICAgICAgIHRoaXMuZ2VuZXJhbCA9IGdlbmVyYWw7XG4gICAgICAgIHZhciBzdWIyID0gbmV3IE9mZmljZXIoMjAwLCBcIkpvaG4gV2Vha1wiLCBbXSk7XG4gICAgICAgIHZhciBzdWIzID0gbmV3IE9mZmljZXIoMzAwLCBcIkpvaG4gQ2VuYVwiLCBbXSk7XG4gICAgICAgIHZhciBzdWI0ID0gbmV3IE9mZmljZXIoNDAwLCBcIkJlblwiLCBbXSk7XG4gICAgICAgIHZhciBzdWI1ID0gbmV3IE9mZmljZXIoNTAwLCBcIkNvb3BlclwiLCBbXSk7XG4gICAgICAgIHZhciBzdWI2ID0gbmV3IE9mZmljZXIoNjAwLCBcIkFcIiwgW10pO1xuICAgICAgICB2YXIgc3ViNyA9IG5ldyBPZmZpY2VyKDcwMCwgXCJCXCIsIFtdKTtcbiAgICAgICAgdmFyIHN1YjggPSBuZXcgT2ZmaWNlcig4MDAsIFwiQ1wiLCBbXSk7XG4gICAgICAgIGdlbmVyYWwuYWRkU3ViKHN1YjIpO1xuICAgICAgICBnZW5lcmFsLmFkZFN1YihzdWIzKTtcbiAgICAgICAgc3ViMi5hZGRTdWIoc3ViNik7XG4gICAgICAgIHN1YjMuYWRkU3ViKHN1YjQpO1xuICAgICAgICBzdWIzLmFkZFN1YihzdWI1KTtcbiAgICAgICAgc3ViNC5hZGRTdWIoc3ViNyk7XG4gICAgICAgIHN1YjQuYWRkU3ViKHN1YjgpO1xuICAgICAgICAvLyBjb25zdCBvZmZpY2VyTGlzdCA9IG5ldyBPZmZpY2VyTGlzdChnZW5lcmFsKTtcbiAgICAgICAgY29uc29sZS5sb2coZ2VuZXJhbCk7XG4gICAgfVxuICAgIEFybXlSYW5raW5nQXBwLnByb3RvdHlwZS5tb3ZlT2ZmaWNlciA9IGZ1bmN0aW9uIChvZmZpY2VySUQsIG1hbmFnZXJJRCkgeyB9O1xuICAgIEFybXlSYW5raW5nQXBwLnByb3RvdHlwZS51bmRvID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgIEFybXlSYW5raW5nQXBwLnByb3RvdHlwZS5yZWRvID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgIHJldHVybiBBcm15UmFua2luZ0FwcDtcbn0oKSk7XG5leHBvcnQgeyBBcm15UmFua2luZ0FwcCB9O1xuIiwiZXhwb3J0IHZhciBjb2xvclRhYmxlID0gW1wiIzFhMWExYVwiLCBcIiNhMTVlZjJcIiwgXCIjMzcwMGIzXCIsIFwiI2NmNjY3OVwiXTtcbmV4cG9ydCB2YXIgcmVuZGVyU3VicyA9IGZ1bmN0aW9uIChzdWJzLCBsaXN0KSB7XG4gICAgY29uc29sZS5sb2coXCJsb29wXCIsIHN1YnMpO1xuICAgIHN1YnMuZm9yRWFjaChmdW5jdGlvbiAoc3ViRWwpIHtcbiAgICAgICAgbGlzdC5pbm5lckhUTUwgKz1cbiAgICAgICAgICAgIC8qaHRtbCovXG4gICAgICAgICAgICBcIlxcbiAgICAgICAgICAgIDxidXR0b24gaWQ9XFxcIlwiLmNvbmNhdChzdWJFbC5pZCwgXCJcXFwiIHN0eWxlPVxcXCJtYXJnaW4tbGVmdDogXCIpLmNvbmNhdChzdWJFbC5yYW5rICogNCwgXCJyZW07IGJhY2tncm91bmQtY29sb3I6IFwiKS5jb25jYXQoY29sb3JUYWJsZVtzdWJFbC5yYW5rIC0gMV0sIFwiXFxcIj5cXG4gICAgICAgICAgICAgICAgXCIpLmNvbmNhdChzdWJFbC5uYW1lLCBcIlxcbiAgICAgICAgICAgIDwvYnV0dG9uPlxcbiAgICAgICAgICAgIFwiKTtcbiAgICAgICAgaWYgKHN1YkVsLnN1Ym9yZGluYXRlcy5sZW5ndGggPiAwKVxuICAgICAgICAgICAgcmVuZGVyU3VicyhzdWJFbC5zdWJvcmRpbmF0ZXMsIGxpc3QpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm47XG4gICAgfSk7XG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBBcm15UmFua2luZ0FwcCB9IGZyb20gXCIuL2NsYXNzXCI7XG5pbXBvcnQgeyBjb2xvclRhYmxlLCByZW5kZXJTdWJzIH0gZnJvbSBcIi4vdXRpbHNcIjtcbnZhciBBcHAgPSBuZXcgQXJteVJhbmtpbmdBcHAoKTtcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXBwXCIpLmlubmVySFRNTCA9IFwiXFxuICAgIDxoMT5WaXRlICsgVHlwZVNjcmlwdDwvaDE+XFxuICAgIDxkaXYgaWQ9XFxcImxpc3RcXFwiPlxcbiAgICA8L2Rpdj5cXG5cIjtcbnZhciBsaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsaXN0XCIpO1xudmFyIGdlbmVyYWwgPSBBcHAuZ2VuZXJhbDtcbmxpc3QuaW5uZXJIVE1MID1cbiAgICAvKmh0bWwqL1xuICAgIFwiXFxuICAgIDxidXR0b24gaWQ9XFxcIlwiLmNvbmNhdChnZW5lcmFsLmlkLCBcIlxcXCIgc3R5bGU9XFxcIm1hcmdpbi1sZWZ0OiBcIikuY29uY2F0KGdlbmVyYWwucmFuayAqIDQsIFwicmVtOyBiYWNrZ3JvdW5kLWNvbG9yOiBcIikuY29uY2F0KGNvbG9yVGFibGVbZ2VuZXJhbC5yYW5rIC0gMV0sIFwiXFxcIj5cXG4gICAgICAgIFwiKS5jb25jYXQoZ2VuZXJhbC5uYW1lLCBcIlxcbiAgICA8L2J1dHRvbj5cXG4gICAgXCIpO1xucmVuZGVyU3VicyhnZW5lcmFsLnN1Ym9yZGluYXRlcywgbGlzdCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=