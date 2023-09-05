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
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");

var Officer = /** @class */ (function () {
    function Officer(id, name, subs) {
        this.id = id;
        this.name = name;
        this.subordinates = subs;
        this.rank = 1;
        this.isSelected = false;
    }
    Officer.prototype.addSub = function (officer) {
        var _a;
        officer.rank = this.rank + 1;
        (_a = this.subordinates) === null || _a === void 0 ? void 0 : _a.push(officer);
    };
    Officer.prototype.removeSub = function (officer) {
        var targetSubIndex = this.subordinates.indexOf(officer);
        if (targetSubIndex > -1) {
            this.subordinates.splice(targetSubIndex, 1);
        }
    };
    return Officer;
}());

var ArmyRankingApp = /** @class */ (function () {
    function ArmyRankingApp() {
        var general = new Officer(100, "MMP", []);
        this.general = general;
        this.selectedOfficers = [];
        var sub2 = new Officer(200, "John Weak", []);
        var sub3 = new Officer(300, "John Cena", []);
        var sub4 = new Officer(400, "Ben", []);
        var sub5 = new Officer(500, "Cooper", []);
        var sub6 = new Officer(600, "A", []);
        var sub7 = new Officer(700, "B", []);
        var sub8 = new Officer(800, "C", []);
        var sub9 = new Officer(900, "D", []);
        general.addSub(sub2);
        general.addSub(sub3);
        sub2.addSub(sub6);
        sub3.addSub(sub4);
        sub3.addSub(sub5);
        sub4.addSub(sub7);
        sub4.addSub(sub8);
        sub8.addSub(sub9);
    }
    ArmyRankingApp.prototype.getSubById = function (id, subArray, curManager) {
        var res = { sub: undefined, manager: curManager };
        subArray = subArray !== null && subArray !== void 0 ? subArray : this.general.subordinates;
        curManager = curManager !== null && curManager !== void 0 ? curManager : this.general;
        for (var _i = 0, subArray_1 = subArray; _i < subArray_1.length; _i++) {
            var el = subArray_1[_i];
            if (el.id === id) {
                res.sub = el;
                res.manager = curManager;
                break;
            }
            else if (!res.sub && el.subordinates.length > 0) {
                res = this.getSubById(id, el.subordinates, el);
            }
        }
        return res;
    };
    ArmyRankingApp.prototype.moveOfficer = function () {
        var _a = this.selectedOfficers, subId = _a[0], newManagerId = _a[1];
        if (this.selectedOfficers.length < 2) {
            alert("Something wrong, not enough data");
            return;
        }
        var _b = this.getSubById(subId), sub = _b.sub, curManager = _b.manager;
        var newManager = this.getSubById(newManagerId).sub;
        // 1. move sub's subordinates array up to 1 rank
        sub === null || sub === void 0 ? void 0 : sub.subordinates.forEach(function (sub) { return curManager === null || curManager === void 0 ? void 0 : curManager.addSub(sub); });
        sub.subordinates = [];
        // 2. remove current sub position
        curManager === null || curManager === void 0 ? void 0 : curManager.removeSub(sub);
        // 3. add sub to new position
        newManager === null || newManager === void 0 ? void 0 : newManager.addSub(sub);
        // re-render
        var list = document.getElementById("list");
        list === null || list === void 0 ? void 0 : list.replaceChildren();
        (0,_utils__WEBPACK_IMPORTED_MODULE_0__.renderSubs)(this.general.subordinates, list);
        this.selectedOfficers = [];
    };
    ArmyRankingApp.prototype.undo = function () { };
    ArmyRankingApp.prototype.redo = function () { };
    return ArmyRankingApp;
}());



/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   App: () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var _class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./class */ "./src/class.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");


var App = new _class__WEBPACK_IMPORTED_MODULE_0__.ArmyRankingApp();
var general = App.general;
var appWrapper = document.querySelector("#app");
appWrapper.innerHTML = /* html */ "\n    <h1>Army Rank</h1>\n        <button id=\"".concat(general.id, "\" class=\"officer\"\n            style=\"margin-left: ").concat(general.rank * 4, "rem; background-color: ").concat(_utils__WEBPACK_IMPORTED_MODULE_1__.colorTable[general.rank - 1], "\"\n        >\n            ").concat(general.name, "\n        </button>\n    <div id=\"list\"></div>\n    ");
/* function button */
var moveOfficerBtn = document.createElement("button");
moveOfficerBtn.innerText = "Move Officer";
moveOfficerBtn.onclick = function () { return App.moveOfficer(); };
var undoBtn = document.createElement("button");
undoBtn.innerText = "Undo";
undoBtn.onclick = function () { return App.undo(); };
var redoBtn = document.createElement("button");
redoBtn.innerText = "Redo";
redoBtn.onclick = function () { return App.redo(); };
var btnWrapper = document.createElement("div");
btnWrapper.className = "btn-wrapper";
// btnWrapper.setAttribute("style", "display: flex; flex-direction: flex-row; gap: 7px;");
btnWrapper.appendChild(moveOfficerBtn);
btnWrapper.appendChild(undoBtn);
btnWrapper.appendChild(redoBtn);
appWrapper.appendChild(btnWrapper);
/* end function button */
var list = document.getElementById("list");
(0,_utils__WEBPACK_IMPORTED_MODULE_1__.renderSubs)(general.subordinates, list);


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
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/index.ts");

var colorTable = ["#1a1a1a", "#a15ef2", "#3700b3", "#cf6679"];
var renderSubs = function (subs, list) {
    subs.forEach(function (subEl) {
        var officerBtn = document.createElement("button");
        officerBtn.className = "officer";
        officerBtn.id = subEl.id.toString();
        officerBtn.setAttribute("style", "margin-left: ".concat(subEl.rank * 4, "rem; background-color: ").concat(colorTable[subEl.rank - 1]));
        officerBtn.innerText = subEl.name;
        officerBtn.onclick = function () { return setOfficerForMove(subEl.id, officerBtn); };
        list === null || list === void 0 ? void 0 : list.appendChild(officerBtn);
        if (subEl.subordinates.length > 0)
            renderSubs(subEl.subordinates, list);
        else
            return;
    });
};
function setOfficerForMove(subElId, officerBtn) {
    var selectedOfficers = _index__WEBPACK_IMPORTED_MODULE_0__.App.selectedOfficers;
    if (selectedOfficers.some(function (el) { return el === subElId; })) {
        // remove selectedOfficer
        var targetSubIndex = selectedOfficers.indexOf(subElId);
        if (targetSubIndex > -1) {
            selectedOfficers.splice(targetSubIndex, 1);
            officerBtn.style.outline = "";
        }
    }
    else if (selectedOfficers.length < 2) {
        selectedOfficers.push(subElId);
        officerBtn.style.outline = "5px auto white";
    }
}


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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNrQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQSxnREFBZ0Qsd0JBQXdCO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRGQUE0Rix3RkFBd0Y7QUFDcEw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsa0RBQVU7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDeUI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkZlO0FBQ1E7QUFDMUMsY0FBYyxrREFBYztBQUNuQztBQUNBO0FBQ0EsaU1BQWlNLDRCQUE0Qiw4Q0FBVTtBQUN2TztBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBLGdDQUFnQztBQUNoQztBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQSxvREFBb0QsMEJBQTBCLFNBQVM7QUFDdkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekJvQjtBQUN2QjtBQUNBO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzRkFBc0Y7QUFDdEY7QUFDQSwyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsMkJBQTJCLHVDQUFHO0FBQzlCLDhDQUE4Qyx3QkFBd0I7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDL0JBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzLnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly8vd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlbmRlclN1YnMgfSBmcm9tIFwiLi91dGlsc1wiO1xudmFyIE9mZmljZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT2ZmaWNlcihpZCwgbmFtZSwgc3Vicykge1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuc3Vib3JkaW5hdGVzID0gc3VicztcbiAgICAgICAgdGhpcy5yYW5rID0gMTtcbiAgICAgICAgdGhpcy5pc1NlbGVjdGVkID0gZmFsc2U7XG4gICAgfVxuICAgIE9mZmljZXIucHJvdG90eXBlLmFkZFN1YiA9IGZ1bmN0aW9uIChvZmZpY2VyKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgb2ZmaWNlci5yYW5rID0gdGhpcy5yYW5rICsgMTtcbiAgICAgICAgKF9hID0gdGhpcy5zdWJvcmRpbmF0ZXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5wdXNoKG9mZmljZXIpO1xuICAgIH07XG4gICAgT2ZmaWNlci5wcm90b3R5cGUucmVtb3ZlU3ViID0gZnVuY3Rpb24gKG9mZmljZXIpIHtcbiAgICAgICAgdmFyIHRhcmdldFN1YkluZGV4ID0gdGhpcy5zdWJvcmRpbmF0ZXMuaW5kZXhPZihvZmZpY2VyKTtcbiAgICAgICAgaWYgKHRhcmdldFN1YkluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuc3Vib3JkaW5hdGVzLnNwbGljZSh0YXJnZXRTdWJJbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBPZmZpY2VyO1xufSgpKTtcbmV4cG9ydCB7IE9mZmljZXIgfTtcbnZhciBBcm15UmFua2luZ0FwcCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBcm15UmFua2luZ0FwcCgpIHtcbiAgICAgICAgdmFyIGdlbmVyYWwgPSBuZXcgT2ZmaWNlcigxMDAsIFwiTU1QXCIsIFtdKTtcbiAgICAgICAgdGhpcy5nZW5lcmFsID0gZ2VuZXJhbDtcbiAgICAgICAgdGhpcy5zZWxlY3RlZE9mZmljZXJzID0gW107XG4gICAgICAgIHZhciBzdWIyID0gbmV3IE9mZmljZXIoMjAwLCBcIkpvaG4gV2Vha1wiLCBbXSk7XG4gICAgICAgIHZhciBzdWIzID0gbmV3IE9mZmljZXIoMzAwLCBcIkpvaG4gQ2VuYVwiLCBbXSk7XG4gICAgICAgIHZhciBzdWI0ID0gbmV3IE9mZmljZXIoNDAwLCBcIkJlblwiLCBbXSk7XG4gICAgICAgIHZhciBzdWI1ID0gbmV3IE9mZmljZXIoNTAwLCBcIkNvb3BlclwiLCBbXSk7XG4gICAgICAgIHZhciBzdWI2ID0gbmV3IE9mZmljZXIoNjAwLCBcIkFcIiwgW10pO1xuICAgICAgICB2YXIgc3ViNyA9IG5ldyBPZmZpY2VyKDcwMCwgXCJCXCIsIFtdKTtcbiAgICAgICAgdmFyIHN1YjggPSBuZXcgT2ZmaWNlcig4MDAsIFwiQ1wiLCBbXSk7XG4gICAgICAgIHZhciBzdWI5ID0gbmV3IE9mZmljZXIoOTAwLCBcIkRcIiwgW10pO1xuICAgICAgICBnZW5lcmFsLmFkZFN1YihzdWIyKTtcbiAgICAgICAgZ2VuZXJhbC5hZGRTdWIoc3ViMyk7XG4gICAgICAgIHN1YjIuYWRkU3ViKHN1YjYpO1xuICAgICAgICBzdWIzLmFkZFN1YihzdWI0KTtcbiAgICAgICAgc3ViMy5hZGRTdWIoc3ViNSk7XG4gICAgICAgIHN1YjQuYWRkU3ViKHN1YjcpO1xuICAgICAgICBzdWI0LmFkZFN1YihzdWI4KTtcbiAgICAgICAgc3ViOC5hZGRTdWIoc3ViOSk7XG4gICAgfVxuICAgIEFybXlSYW5raW5nQXBwLnByb3RvdHlwZS5nZXRTdWJCeUlkID0gZnVuY3Rpb24gKGlkLCBzdWJBcnJheSwgY3VyTWFuYWdlcikge1xuICAgICAgICB2YXIgcmVzID0geyBzdWI6IHVuZGVmaW5lZCwgbWFuYWdlcjogY3VyTWFuYWdlciB9O1xuICAgICAgICBzdWJBcnJheSA9IHN1YkFycmF5ICE9PSBudWxsICYmIHN1YkFycmF5ICE9PSB2b2lkIDAgPyBzdWJBcnJheSA6IHRoaXMuZ2VuZXJhbC5zdWJvcmRpbmF0ZXM7XG4gICAgICAgIGN1ck1hbmFnZXIgPSBjdXJNYW5hZ2VyICE9PSBudWxsICYmIGN1ck1hbmFnZXIgIT09IHZvaWQgMCA/IGN1ck1hbmFnZXIgOiB0aGlzLmdlbmVyYWw7XG4gICAgICAgIGZvciAodmFyIF9pID0gMCwgc3ViQXJyYXlfMSA9IHN1YkFycmF5OyBfaSA8IHN1YkFycmF5XzEubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICB2YXIgZWwgPSBzdWJBcnJheV8xW19pXTtcbiAgICAgICAgICAgIGlmIChlbC5pZCA9PT0gaWQpIHtcbiAgICAgICAgICAgICAgICByZXMuc3ViID0gZWw7XG4gICAgICAgICAgICAgICAgcmVzLm1hbmFnZXIgPSBjdXJNYW5hZ2VyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIXJlcy5zdWIgJiYgZWwuc3Vib3JkaW5hdGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICByZXMgPSB0aGlzLmdldFN1YkJ5SWQoaWQsIGVsLnN1Ym9yZGluYXRlcywgZWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfTtcbiAgICBBcm15UmFua2luZ0FwcC5wcm90b3R5cGUubW92ZU9mZmljZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfYSA9IHRoaXMuc2VsZWN0ZWRPZmZpY2Vycywgc3ViSWQgPSBfYVswXSwgbmV3TWFuYWdlcklkID0gX2FbMV07XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkT2ZmaWNlcnMubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgYWxlcnQoXCJTb21ldGhpbmcgd3JvbmcsIG5vdCBlbm91Z2ggZGF0YVwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgX2IgPSB0aGlzLmdldFN1YkJ5SWQoc3ViSWQpLCBzdWIgPSBfYi5zdWIsIGN1ck1hbmFnZXIgPSBfYi5tYW5hZ2VyO1xuICAgICAgICB2YXIgbmV3TWFuYWdlciA9IHRoaXMuZ2V0U3ViQnlJZChuZXdNYW5hZ2VySWQpLnN1YjtcbiAgICAgICAgLy8gMS4gbW92ZSBzdWIncyBzdWJvcmRpbmF0ZXMgYXJyYXkgdXAgdG8gMSByYW5rXG4gICAgICAgIHN1YiA9PT0gbnVsbCB8fCBzdWIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHN1Yi5zdWJvcmRpbmF0ZXMuZm9yRWFjaChmdW5jdGlvbiAoc3ViKSB7IHJldHVybiBjdXJNYW5hZ2VyID09PSBudWxsIHx8IGN1ck1hbmFnZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGN1ck1hbmFnZXIuYWRkU3ViKHN1Yik7IH0pO1xuICAgICAgICBzdWIuc3Vib3JkaW5hdGVzID0gW107XG4gICAgICAgIC8vIDIuIHJlbW92ZSBjdXJyZW50IHN1YiBwb3NpdGlvblxuICAgICAgICBjdXJNYW5hZ2VyID09PSBudWxsIHx8IGN1ck1hbmFnZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGN1ck1hbmFnZXIucmVtb3ZlU3ViKHN1Yik7XG4gICAgICAgIC8vIDMuIGFkZCBzdWIgdG8gbmV3IHBvc2l0aW9uXG4gICAgICAgIG5ld01hbmFnZXIgPT09IG51bGwgfHwgbmV3TWFuYWdlciA9PT0gdm9pZCAwID8gdm9pZCAwIDogbmV3TWFuYWdlci5hZGRTdWIoc3ViKTtcbiAgICAgICAgLy8gcmUtcmVuZGVyXG4gICAgICAgIHZhciBsaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsaXN0XCIpO1xuICAgICAgICBsaXN0ID09PSBudWxsIHx8IGxpc3QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGxpc3QucmVwbGFjZUNoaWxkcmVuKCk7XG4gICAgICAgIHJlbmRlclN1YnModGhpcy5nZW5lcmFsLnN1Ym9yZGluYXRlcywgbGlzdCk7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRPZmZpY2VycyA9IFtdO1xuICAgIH07XG4gICAgQXJteVJhbmtpbmdBcHAucHJvdG90eXBlLnVuZG8gPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgQXJteVJhbmtpbmdBcHAucHJvdG90eXBlLnJlZG8gPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgcmV0dXJuIEFybXlSYW5raW5nQXBwO1xufSgpKTtcbmV4cG9ydCB7IEFybXlSYW5raW5nQXBwIH07XG4iLCJpbXBvcnQgeyBBcm15UmFua2luZ0FwcCB9IGZyb20gXCIuL2NsYXNzXCI7XG5pbXBvcnQgeyBjb2xvclRhYmxlLCByZW5kZXJTdWJzIH0gZnJvbSBcIi4vdXRpbHNcIjtcbmV4cG9ydCB2YXIgQXBwID0gbmV3IEFybXlSYW5raW5nQXBwKCk7XG52YXIgZ2VuZXJhbCA9IEFwcC5nZW5lcmFsO1xudmFyIGFwcFdyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FwcFwiKTtcbmFwcFdyYXBwZXIuaW5uZXJIVE1MID0gLyogaHRtbCAqLyBcIlxcbiAgICA8aDE+QXJteSBSYW5rPC9oMT5cXG4gICAgICAgIDxidXR0b24gaWQ9XFxcIlwiLmNvbmNhdChnZW5lcmFsLmlkLCBcIlxcXCIgY2xhc3M9XFxcIm9mZmljZXJcXFwiXFxuICAgICAgICAgICAgc3R5bGU9XFxcIm1hcmdpbi1sZWZ0OiBcIikuY29uY2F0KGdlbmVyYWwucmFuayAqIDQsIFwicmVtOyBiYWNrZ3JvdW5kLWNvbG9yOiBcIikuY29uY2F0KGNvbG9yVGFibGVbZ2VuZXJhbC5yYW5rIC0gMV0sIFwiXFxcIlxcbiAgICAgICAgPlxcbiAgICAgICAgICAgIFwiKS5jb25jYXQoZ2VuZXJhbC5uYW1lLCBcIlxcbiAgICAgICAgPC9idXR0b24+XFxuICAgIDxkaXYgaWQ9XFxcImxpc3RcXFwiPjwvZGl2PlxcbiAgICBcIik7XG4vKiBmdW5jdGlvbiBidXR0b24gKi9cbnZhciBtb3ZlT2ZmaWNlckJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5tb3ZlT2ZmaWNlckJ0bi5pbm5lclRleHQgPSBcIk1vdmUgT2ZmaWNlclwiO1xubW92ZU9mZmljZXJCdG4ub25jbGljayA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIEFwcC5tb3ZlT2ZmaWNlcigpOyB9O1xudmFyIHVuZG9CdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xudW5kb0J0bi5pbm5lclRleHQgPSBcIlVuZG9cIjtcbnVuZG9CdG4ub25jbGljayA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIEFwcC51bmRvKCk7IH07XG52YXIgcmVkb0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5yZWRvQnRuLmlubmVyVGV4dCA9IFwiUmVkb1wiO1xucmVkb0J0bi5vbmNsaWNrID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gQXBwLnJlZG8oKTsgfTtcbnZhciBidG5XcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbmJ0bldyYXBwZXIuY2xhc3NOYW1lID0gXCJidG4td3JhcHBlclwiO1xuLy8gYnRuV3JhcHBlci5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcImRpc3BsYXk6IGZsZXg7IGZsZXgtZGlyZWN0aW9uOiBmbGV4LXJvdzsgZ2FwOiA3cHg7XCIpO1xuYnRuV3JhcHBlci5hcHBlbmRDaGlsZChtb3ZlT2ZmaWNlckJ0bik7XG5idG5XcmFwcGVyLmFwcGVuZENoaWxkKHVuZG9CdG4pO1xuYnRuV3JhcHBlci5hcHBlbmRDaGlsZChyZWRvQnRuKTtcbmFwcFdyYXBwZXIuYXBwZW5kQ2hpbGQoYnRuV3JhcHBlcik7XG4vKiBlbmQgZnVuY3Rpb24gYnV0dG9uICovXG52YXIgbGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGlzdFwiKTtcbnJlbmRlclN1YnMoZ2VuZXJhbC5zdWJvcmRpbmF0ZXMsIGxpc3QpO1xuIiwiaW1wb3J0IHsgQXBwIH0gZnJvbSBcIi4vaW5kZXhcIjtcbmV4cG9ydCB2YXIgY29sb3JUYWJsZSA9IFtcIiMxYTFhMWFcIiwgXCIjYTE1ZWYyXCIsIFwiIzM3MDBiM1wiLCBcIiNjZjY2NzlcIl07XG5leHBvcnQgdmFyIHJlbmRlclN1YnMgPSBmdW5jdGlvbiAoc3VicywgbGlzdCkge1xuICAgIHN1YnMuZm9yRWFjaChmdW5jdGlvbiAoc3ViRWwpIHtcbiAgICAgICAgdmFyIG9mZmljZXJCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICBvZmZpY2VyQnRuLmNsYXNzTmFtZSA9IFwib2ZmaWNlclwiO1xuICAgICAgICBvZmZpY2VyQnRuLmlkID0gc3ViRWwuaWQudG9TdHJpbmcoKTtcbiAgICAgICAgb2ZmaWNlckJ0bi5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcIm1hcmdpbi1sZWZ0OiBcIi5jb25jYXQoc3ViRWwucmFuayAqIDQsIFwicmVtOyBiYWNrZ3JvdW5kLWNvbG9yOiBcIikuY29uY2F0KGNvbG9yVGFibGVbc3ViRWwucmFuayAtIDFdKSk7XG4gICAgICAgIG9mZmljZXJCdG4uaW5uZXJUZXh0ID0gc3ViRWwubmFtZTtcbiAgICAgICAgb2ZmaWNlckJ0bi5vbmNsaWNrID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gc2V0T2ZmaWNlckZvck1vdmUoc3ViRWwuaWQsIG9mZmljZXJCdG4pOyB9O1xuICAgICAgICBsaXN0ID09PSBudWxsIHx8IGxpc3QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGxpc3QuYXBwZW5kQ2hpbGQob2ZmaWNlckJ0bik7XG4gICAgICAgIGlmIChzdWJFbC5zdWJvcmRpbmF0ZXMubGVuZ3RoID4gMClcbiAgICAgICAgICAgIHJlbmRlclN1YnMoc3ViRWwuc3Vib3JkaW5hdGVzLCBsaXN0KTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgIH0pO1xufTtcbmZ1bmN0aW9uIHNldE9mZmljZXJGb3JNb3ZlKHN1YkVsSWQsIG9mZmljZXJCdG4pIHtcbiAgICB2YXIgc2VsZWN0ZWRPZmZpY2VycyA9IEFwcC5zZWxlY3RlZE9mZmljZXJzO1xuICAgIGlmIChzZWxlY3RlZE9mZmljZXJzLnNvbWUoZnVuY3Rpb24gKGVsKSB7IHJldHVybiBlbCA9PT0gc3ViRWxJZDsgfSkpIHtcbiAgICAgICAgLy8gcmVtb3ZlIHNlbGVjdGVkT2ZmaWNlclxuICAgICAgICB2YXIgdGFyZ2V0U3ViSW5kZXggPSBzZWxlY3RlZE9mZmljZXJzLmluZGV4T2Yoc3ViRWxJZCk7XG4gICAgICAgIGlmICh0YXJnZXRTdWJJbmRleCA+IC0xKSB7XG4gICAgICAgICAgICBzZWxlY3RlZE9mZmljZXJzLnNwbGljZSh0YXJnZXRTdWJJbmRleCwgMSk7XG4gICAgICAgICAgICBvZmZpY2VyQnRuLnN0eWxlLm91dGxpbmUgPSBcIlwiO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHNlbGVjdGVkT2ZmaWNlcnMubGVuZ3RoIDwgMikge1xuICAgICAgICBzZWxlY3RlZE9mZmljZXJzLnB1c2goc3ViRWxJZCk7XG4gICAgICAgIG9mZmljZXJCdG4uc3R5bGUub3V0bGluZSA9IFwiNXB4IGF1dG8gd2hpdGVcIjtcbiAgICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9