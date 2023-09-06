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
    Officer.prototype.updateSubsRank = function (subArray) {
        var _this = this;
        subArray.forEach(function (subEl) {
            subEl.rank--;
            if (subEl.subordinates.length > 0)
                _this.updateSubsRank(subEl.subordinates);
            else
                return;
        });
    };
    Officer.prototype.addSub = function (officer) {
        var _a;
        officer.rank = this.rank + 1;
        if (officer.subordinates.length > 0) {
            this.updateSubsRank(officer.subordinates);
        }
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
        this.actionStore = [];
        var sub2 = new Officer(200, "John Weak", []);
        var sub3 = new Officer(300, "John Cena", []);
        var sub4 = new Officer(400, "Ben", []);
        var sub5 = new Officer(500, "Cooper", []);
        var sub6 = new Officer(600, "A", []);
        var sub7 = new Officer(700, "B", []);
        var sub8 = new Officer(800, "C", []);
        var sub9 = new Officer(900, "D", []);
        var sub10 = new Officer(1000, "E", []);
        general.addSub(sub2);
        general.addSub(sub3);
        sub2.addSub(sub6);
        sub3.addSub(sub4);
        sub3.addSub(sub5);
        sub4.addSub(sub7);
        sub4.addSub(sub8);
        sub8.addSub(sub9);
        sub9.addSub(sub10);
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
        // save inverse actions
        this.actionStore.push({ action: "undo", sub: sub, curManager: curManager, newManager: newManager });
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
    ArmyRankingApp.prototype.undo = function () {
        // get last undo action
        var action = this.actionStore.findLast(function (el) { return el.action === "undo"; });
        if (!action)
            return;
        console.log("🚀 ~ action:", action);
        var sub = action.sub, curManager = action.curManager, newManager = action.newManager;
    };
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
/* function button assign */
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
btnWrapper.appendChild(moveOfficerBtn);
btnWrapper.appendChild(undoBtn);
btnWrapper.appendChild(redoBtn);
appWrapper.appendChild(btnWrapper);
/* end function button assign */
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
        officerBtn.setAttribute("style", "margin-left: ".concat(subEl.rank * 4, "rem; background-color: ").concat(colorTable.at(subEl.rank - 1)) // todo: fix color render
        );
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDa0I7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0EsZ0RBQWdELHdCQUF3QjtBQUN4RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsMEVBQTBFO0FBQzFHO0FBQ0EsNEZBQTRGLHdGQUF3RjtBQUNwTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxrREFBVTtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtEQUErRCw4QkFBOEI7QUFDN0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ3lCOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2hIZTtBQUNRO0FBQzFDLGNBQWMsa0RBQWM7QUFDbkM7QUFDQTtBQUNBLGlNQUFpTSw0QkFBNEIsOENBQVU7QUFDdk87QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBLGdDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeEJvQjtBQUN2QjtBQUNBO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzRkFBc0Y7QUFDdEY7QUFDQTtBQUNBLDJDQUEyQztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSwyQkFBMkIsdUNBQUc7QUFDOUIsOENBQThDLHdCQUF3QjtBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUNoQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3MudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy91dGlscy50cyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly8vd2VicGFjay9zdGFydHVwIiwid2VicGFjazovLy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVuZGVyU3VicyB9IGZyb20gXCIuL3V0aWxzXCI7XG52YXIgT2ZmaWNlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPZmZpY2VyKGlkLCBuYW1lLCBzdWJzKSB7XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5zdWJvcmRpbmF0ZXMgPSBzdWJzO1xuICAgICAgICB0aGlzLnJhbmsgPSAxO1xuICAgICAgICB0aGlzLmlzU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgT2ZmaWNlci5wcm90b3R5cGUudXBkYXRlU3Vic1JhbmsgPSBmdW5jdGlvbiAoc3ViQXJyYXkpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgc3ViQXJyYXkuZm9yRWFjaChmdW5jdGlvbiAoc3ViRWwpIHtcbiAgICAgICAgICAgIHN1YkVsLnJhbmstLTtcbiAgICAgICAgICAgIGlmIChzdWJFbC5zdWJvcmRpbmF0ZXMubGVuZ3RoID4gMClcbiAgICAgICAgICAgICAgICBfdGhpcy51cGRhdGVTdWJzUmFuayhzdWJFbC5zdWJvcmRpbmF0ZXMpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBPZmZpY2VyLnByb3RvdHlwZS5hZGRTdWIgPSBmdW5jdGlvbiAob2ZmaWNlcikge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIG9mZmljZXIucmFuayA9IHRoaXMucmFuayArIDE7XG4gICAgICAgIGlmIChvZmZpY2VyLnN1Ym9yZGluYXRlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVN1YnNSYW5rKG9mZmljZXIuc3Vib3JkaW5hdGVzKTtcbiAgICAgICAgfVxuICAgICAgICAoX2EgPSB0aGlzLnN1Ym9yZGluYXRlcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnB1c2gob2ZmaWNlcik7XG4gICAgfTtcbiAgICBPZmZpY2VyLnByb3RvdHlwZS5yZW1vdmVTdWIgPSBmdW5jdGlvbiAob2ZmaWNlcikge1xuICAgICAgICB2YXIgdGFyZ2V0U3ViSW5kZXggPSB0aGlzLnN1Ym9yZGluYXRlcy5pbmRleE9mKG9mZmljZXIpO1xuICAgICAgICBpZiAodGFyZ2V0U3ViSW5kZXggPiAtMSkge1xuICAgICAgICAgICAgdGhpcy5zdWJvcmRpbmF0ZXMuc3BsaWNlKHRhcmdldFN1YkluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIE9mZmljZXI7XG59KCkpO1xuZXhwb3J0IHsgT2ZmaWNlciB9O1xudmFyIEFybXlSYW5raW5nQXBwID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEFybXlSYW5raW5nQXBwKCkge1xuICAgICAgICB2YXIgZ2VuZXJhbCA9IG5ldyBPZmZpY2VyKDEwMCwgXCJNTVBcIiwgW10pO1xuICAgICAgICB0aGlzLmdlbmVyYWwgPSBnZW5lcmFsO1xuICAgICAgICB0aGlzLnNlbGVjdGVkT2ZmaWNlcnMgPSBbXTtcbiAgICAgICAgdGhpcy5hY3Rpb25TdG9yZSA9IFtdO1xuICAgICAgICB2YXIgc3ViMiA9IG5ldyBPZmZpY2VyKDIwMCwgXCJKb2huIFdlYWtcIiwgW10pO1xuICAgICAgICB2YXIgc3ViMyA9IG5ldyBPZmZpY2VyKDMwMCwgXCJKb2huIENlbmFcIiwgW10pO1xuICAgICAgICB2YXIgc3ViNCA9IG5ldyBPZmZpY2VyKDQwMCwgXCJCZW5cIiwgW10pO1xuICAgICAgICB2YXIgc3ViNSA9IG5ldyBPZmZpY2VyKDUwMCwgXCJDb29wZXJcIiwgW10pO1xuICAgICAgICB2YXIgc3ViNiA9IG5ldyBPZmZpY2VyKDYwMCwgXCJBXCIsIFtdKTtcbiAgICAgICAgdmFyIHN1YjcgPSBuZXcgT2ZmaWNlcig3MDAsIFwiQlwiLCBbXSk7XG4gICAgICAgIHZhciBzdWI4ID0gbmV3IE9mZmljZXIoODAwLCBcIkNcIiwgW10pO1xuICAgICAgICB2YXIgc3ViOSA9IG5ldyBPZmZpY2VyKDkwMCwgXCJEXCIsIFtdKTtcbiAgICAgICAgdmFyIHN1YjEwID0gbmV3IE9mZmljZXIoMTAwMCwgXCJFXCIsIFtdKTtcbiAgICAgICAgZ2VuZXJhbC5hZGRTdWIoc3ViMik7XG4gICAgICAgIGdlbmVyYWwuYWRkU3ViKHN1YjMpO1xuICAgICAgICBzdWIyLmFkZFN1YihzdWI2KTtcbiAgICAgICAgc3ViMy5hZGRTdWIoc3ViNCk7XG4gICAgICAgIHN1YjMuYWRkU3ViKHN1YjUpO1xuICAgICAgICBzdWI0LmFkZFN1YihzdWI3KTtcbiAgICAgICAgc3ViNC5hZGRTdWIoc3ViOCk7XG4gICAgICAgIHN1YjguYWRkU3ViKHN1YjkpO1xuICAgICAgICBzdWI5LmFkZFN1YihzdWIxMCk7XG4gICAgfVxuICAgIEFybXlSYW5raW5nQXBwLnByb3RvdHlwZS5nZXRTdWJCeUlkID0gZnVuY3Rpb24gKGlkLCBzdWJBcnJheSwgY3VyTWFuYWdlcikge1xuICAgICAgICB2YXIgcmVzID0geyBzdWI6IHVuZGVmaW5lZCwgbWFuYWdlcjogY3VyTWFuYWdlciB9O1xuICAgICAgICBzdWJBcnJheSA9IHN1YkFycmF5ICE9PSBudWxsICYmIHN1YkFycmF5ICE9PSB2b2lkIDAgPyBzdWJBcnJheSA6IHRoaXMuZ2VuZXJhbC5zdWJvcmRpbmF0ZXM7XG4gICAgICAgIGN1ck1hbmFnZXIgPSBjdXJNYW5hZ2VyICE9PSBudWxsICYmIGN1ck1hbmFnZXIgIT09IHZvaWQgMCA/IGN1ck1hbmFnZXIgOiB0aGlzLmdlbmVyYWw7XG4gICAgICAgIGZvciAodmFyIF9pID0gMCwgc3ViQXJyYXlfMSA9IHN1YkFycmF5OyBfaSA8IHN1YkFycmF5XzEubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICB2YXIgZWwgPSBzdWJBcnJheV8xW19pXTtcbiAgICAgICAgICAgIGlmIChlbC5pZCA9PT0gaWQpIHtcbiAgICAgICAgICAgICAgICByZXMuc3ViID0gZWw7XG4gICAgICAgICAgICAgICAgcmVzLm1hbmFnZXIgPSBjdXJNYW5hZ2VyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIXJlcy5zdWIgJiYgZWwuc3Vib3JkaW5hdGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICByZXMgPSB0aGlzLmdldFN1YkJ5SWQoaWQsIGVsLnN1Ym9yZGluYXRlcywgZWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfTtcbiAgICBBcm15UmFua2luZ0FwcC5wcm90b3R5cGUubW92ZU9mZmljZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfYSA9IHRoaXMuc2VsZWN0ZWRPZmZpY2Vycywgc3ViSWQgPSBfYVswXSwgbmV3TWFuYWdlcklkID0gX2FbMV07XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkT2ZmaWNlcnMubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgYWxlcnQoXCJTb21ldGhpbmcgd3JvbmcsIG5vdCBlbm91Z2ggZGF0YVwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgX2IgPSB0aGlzLmdldFN1YkJ5SWQoc3ViSWQpLCBzdWIgPSBfYi5zdWIsIGN1ck1hbmFnZXIgPSBfYi5tYW5hZ2VyO1xuICAgICAgICB2YXIgbmV3TWFuYWdlciA9IHRoaXMuZ2V0U3ViQnlJZChuZXdNYW5hZ2VySWQpLnN1YjtcbiAgICAgICAgLy8gc2F2ZSBpbnZlcnNlIGFjdGlvbnNcbiAgICAgICAgdGhpcy5hY3Rpb25TdG9yZS5wdXNoKHsgYWN0aW9uOiBcInVuZG9cIiwgc3ViOiBzdWIsIGN1ck1hbmFnZXI6IGN1ck1hbmFnZXIsIG5ld01hbmFnZXI6IG5ld01hbmFnZXIgfSk7XG4gICAgICAgIC8vIDEuIG1vdmUgc3ViJ3Mgc3Vib3JkaW5hdGVzIGFycmF5IHVwIHRvIDEgcmFua1xuICAgICAgICBzdWIgPT09IG51bGwgfHwgc3ViID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzdWIuc3Vib3JkaW5hdGVzLmZvckVhY2goZnVuY3Rpb24gKHN1YikgeyByZXR1cm4gY3VyTWFuYWdlciA9PT0gbnVsbCB8fCBjdXJNYW5hZ2VyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjdXJNYW5hZ2VyLmFkZFN1YihzdWIpOyB9KTtcbiAgICAgICAgc3ViLnN1Ym9yZGluYXRlcyA9IFtdO1xuICAgICAgICAvLyAyLiByZW1vdmUgY3VycmVudCBzdWIgcG9zaXRpb25cbiAgICAgICAgY3VyTWFuYWdlciA9PT0gbnVsbCB8fCBjdXJNYW5hZ2VyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjdXJNYW5hZ2VyLnJlbW92ZVN1YihzdWIpO1xuICAgICAgICAvLyAzLiBhZGQgc3ViIHRvIG5ldyBwb3NpdGlvblxuICAgICAgICBuZXdNYW5hZ2VyID09PSBudWxsIHx8IG5ld01hbmFnZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG5ld01hbmFnZXIuYWRkU3ViKHN1Yik7XG4gICAgICAgIC8vIHJlLXJlbmRlclxuICAgICAgICB2YXIgbGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGlzdFwiKTtcbiAgICAgICAgbGlzdCA9PT0gbnVsbCB8fCBsaXN0ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBsaXN0LnJlcGxhY2VDaGlsZHJlbigpO1xuICAgICAgICByZW5kZXJTdWJzKHRoaXMuZ2VuZXJhbC5zdWJvcmRpbmF0ZXMsIGxpc3QpO1xuICAgICAgICB0aGlzLnNlbGVjdGVkT2ZmaWNlcnMgPSBbXTtcbiAgICB9O1xuICAgIEFybXlSYW5raW5nQXBwLnByb3RvdHlwZS51bmRvID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBnZXQgbGFzdCB1bmRvIGFjdGlvblxuICAgICAgICB2YXIgYWN0aW9uID0gdGhpcy5hY3Rpb25TdG9yZS5maW5kTGFzdChmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIGVsLmFjdGlvbiA9PT0gXCJ1bmRvXCI7IH0pO1xuICAgICAgICBpZiAoIWFjdGlvbilcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29uc29sZS5sb2coXCLwn5qAIH4gYWN0aW9uOlwiLCBhY3Rpb24pO1xuICAgICAgICB2YXIgc3ViID0gYWN0aW9uLnN1YiwgY3VyTWFuYWdlciA9IGFjdGlvbi5jdXJNYW5hZ2VyLCBuZXdNYW5hZ2VyID0gYWN0aW9uLm5ld01hbmFnZXI7XG4gICAgfTtcbiAgICBBcm15UmFua2luZ0FwcC5wcm90b3R5cGUucmVkbyA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICByZXR1cm4gQXJteVJhbmtpbmdBcHA7XG59KCkpO1xuZXhwb3J0IHsgQXJteVJhbmtpbmdBcHAgfTtcbiIsImltcG9ydCB7IEFybXlSYW5raW5nQXBwIH0gZnJvbSBcIi4vY2xhc3NcIjtcbmltcG9ydCB7IGNvbG9yVGFibGUsIHJlbmRlclN1YnMgfSBmcm9tIFwiLi91dGlsc1wiO1xuZXhwb3J0IHZhciBBcHAgPSBuZXcgQXJteVJhbmtpbmdBcHAoKTtcbnZhciBnZW5lcmFsID0gQXBwLmdlbmVyYWw7XG52YXIgYXBwV3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXBwXCIpO1xuYXBwV3JhcHBlci5pbm5lckhUTUwgPSAvKiBodG1sICovIFwiXFxuICAgIDxoMT5Bcm15IFJhbms8L2gxPlxcbiAgICAgICAgPGJ1dHRvbiBpZD1cXFwiXCIuY29uY2F0KGdlbmVyYWwuaWQsIFwiXFxcIiBjbGFzcz1cXFwib2ZmaWNlclxcXCJcXG4gICAgICAgICAgICBzdHlsZT1cXFwibWFyZ2luLWxlZnQ6IFwiKS5jb25jYXQoZ2VuZXJhbC5yYW5rICogNCwgXCJyZW07IGJhY2tncm91bmQtY29sb3I6IFwiKS5jb25jYXQoY29sb3JUYWJsZVtnZW5lcmFsLnJhbmsgLSAxXSwgXCJcXFwiXFxuICAgICAgICA+XFxuICAgICAgICAgICAgXCIpLmNvbmNhdChnZW5lcmFsLm5hbWUsIFwiXFxuICAgICAgICA8L2J1dHRvbj5cXG4gICAgPGRpdiBpZD1cXFwibGlzdFxcXCI+PC9kaXY+XFxuICAgIFwiKTtcbi8qIGZ1bmN0aW9uIGJ1dHRvbiBhc3NpZ24gKi9cbnZhciBtb3ZlT2ZmaWNlckJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5tb3ZlT2ZmaWNlckJ0bi5pbm5lclRleHQgPSBcIk1vdmUgT2ZmaWNlclwiO1xubW92ZU9mZmljZXJCdG4ub25jbGljayA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIEFwcC5tb3ZlT2ZmaWNlcigpOyB9O1xudmFyIHVuZG9CdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xudW5kb0J0bi5pbm5lclRleHQgPSBcIlVuZG9cIjtcbnVuZG9CdG4ub25jbGljayA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIEFwcC51bmRvKCk7IH07XG52YXIgcmVkb0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5yZWRvQnRuLmlubmVyVGV4dCA9IFwiUmVkb1wiO1xucmVkb0J0bi5vbmNsaWNrID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gQXBwLnJlZG8oKTsgfTtcbnZhciBidG5XcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbmJ0bldyYXBwZXIuY2xhc3NOYW1lID0gXCJidG4td3JhcHBlclwiO1xuYnRuV3JhcHBlci5hcHBlbmRDaGlsZChtb3ZlT2ZmaWNlckJ0bik7XG5idG5XcmFwcGVyLmFwcGVuZENoaWxkKHVuZG9CdG4pO1xuYnRuV3JhcHBlci5hcHBlbmRDaGlsZChyZWRvQnRuKTtcbmFwcFdyYXBwZXIuYXBwZW5kQ2hpbGQoYnRuV3JhcHBlcik7XG4vKiBlbmQgZnVuY3Rpb24gYnV0dG9uIGFzc2lnbiAqL1xudmFyIGxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxpc3RcIik7XG5yZW5kZXJTdWJzKGdlbmVyYWwuc3Vib3JkaW5hdGVzLCBsaXN0KTtcbiIsImltcG9ydCB7IEFwcCB9IGZyb20gXCIuL2luZGV4XCI7XG5leHBvcnQgdmFyIGNvbG9yVGFibGUgPSBbXCIjMWExYTFhXCIsIFwiI2ExNWVmMlwiLCBcIiMzNzAwYjNcIiwgXCIjY2Y2Njc5XCJdO1xuZXhwb3J0IHZhciByZW5kZXJTdWJzID0gZnVuY3Rpb24gKHN1YnMsIGxpc3QpIHtcbiAgICBzdWJzLmZvckVhY2goZnVuY3Rpb24gKHN1YkVsKSB7XG4gICAgICAgIHZhciBvZmZpY2VyQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgb2ZmaWNlckJ0bi5jbGFzc05hbWUgPSBcIm9mZmljZXJcIjtcbiAgICAgICAgb2ZmaWNlckJ0bi5pZCA9IHN1YkVsLmlkLnRvU3RyaW5nKCk7XG4gICAgICAgIG9mZmljZXJCdG4uc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJtYXJnaW4tbGVmdDogXCIuY29uY2F0KHN1YkVsLnJhbmsgKiA0LCBcInJlbTsgYmFja2dyb3VuZC1jb2xvcjogXCIpLmNvbmNhdChjb2xvclRhYmxlLmF0KHN1YkVsLnJhbmsgLSAxKSkgLy8gdG9kbzogZml4IGNvbG9yIHJlbmRlclxuICAgICAgICApO1xuICAgICAgICBvZmZpY2VyQnRuLmlubmVyVGV4dCA9IHN1YkVsLm5hbWU7XG4gICAgICAgIG9mZmljZXJCdG4ub25jbGljayA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNldE9mZmljZXJGb3JNb3ZlKHN1YkVsLmlkLCBvZmZpY2VyQnRuKTsgfTtcbiAgICAgICAgbGlzdCA9PT0gbnVsbCB8fCBsaXN0ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBsaXN0LmFwcGVuZENoaWxkKG9mZmljZXJCdG4pO1xuICAgICAgICBpZiAoc3ViRWwuc3Vib3JkaW5hdGVzLmxlbmd0aCA+IDApXG4gICAgICAgICAgICByZW5kZXJTdWJzKHN1YkVsLnN1Ym9yZGluYXRlcywgbGlzdCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybjtcbiAgICB9KTtcbn07XG5mdW5jdGlvbiBzZXRPZmZpY2VyRm9yTW92ZShzdWJFbElkLCBvZmZpY2VyQnRuKSB7XG4gICAgdmFyIHNlbGVjdGVkT2ZmaWNlcnMgPSBBcHAuc2VsZWN0ZWRPZmZpY2VycztcbiAgICBpZiAoc2VsZWN0ZWRPZmZpY2Vycy5zb21lKGZ1bmN0aW9uIChlbCkgeyByZXR1cm4gZWwgPT09IHN1YkVsSWQ7IH0pKSB7XG4gICAgICAgIC8vIHJlbW92ZSBzZWxlY3RlZE9mZmljZXJcbiAgICAgICAgdmFyIHRhcmdldFN1YkluZGV4ID0gc2VsZWN0ZWRPZmZpY2Vycy5pbmRleE9mKHN1YkVsSWQpO1xuICAgICAgICBpZiAodGFyZ2V0U3ViSW5kZXggPiAtMSkge1xuICAgICAgICAgICAgc2VsZWN0ZWRPZmZpY2Vycy5zcGxpY2UodGFyZ2V0U3ViSW5kZXgsIDEpO1xuICAgICAgICAgICAgb2ZmaWNlckJ0bi5zdHlsZS5vdXRsaW5lID0gXCJcIjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChzZWxlY3RlZE9mZmljZXJzLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgc2VsZWN0ZWRPZmZpY2Vycy5wdXNoKHN1YkVsSWQpO1xuICAgICAgICBvZmZpY2VyQnRuLnN0eWxlLm91dGxpbmUgPSBcIjVweCBhdXRvIHdoaXRlXCI7XG4gICAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==