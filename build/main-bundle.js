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
    Officer.prototype.updateSubsRank = function (subArray, variation) {
        var _this = this;
        subArray.forEach(function (subEl) {
            if (variation == "upRank")
                subEl.rank--;
            if (variation == "downRank")
                subEl.rank++;
            if (subEl.subordinates.length > 0)
                _this.updateSubsRank(subEl.subordinates, variation);
            else
                return;
        });
    };
    Officer.prototype.addSub = function (officer, updateChildRank) {
        var _a;
        officer.rank = this.rank + 1;
        if (officer.subordinates.length > 0 && updateChildRank) {
            this.updateSubsRank(officer.subordinates, updateChildRank);
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
        var subChild = [];
        // 1. move sub's subordinates array up to 1 rank
        sub === null || sub === void 0 ? void 0 : sub.subordinates.forEach(function (sub) {
            curManager === null || curManager === void 0 ? void 0 : curManager.addSub(sub, "upRank");
            subChild.push(sub);
        });
        sub.subordinates = [];
        // save inverse actions
        this.actionStore.push({
            id: (0,_utils__WEBPACK_IMPORTED_MODULE_0__.generateId)(),
            action: "undo",
            sub: sub,
            oldManager: curManager,
            curManager: newManager,
            subChild: subChild,
        });
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
        var id = action.id, sub = action.sub, oldManager = action.oldManager, curManager = action.curManager, subChild = action.subChild;
        oldManager === null || oldManager === void 0 ? void 0 : oldManager.addSub(sub);
        curManager === null || curManager === void 0 ? void 0 : curManager.removeSub(sub);
        subChild === null || subChild === void 0 ? void 0 : subChild.forEach(function (child) {
            sub === null || sub === void 0 ? void 0 : sub.addSub(child, "downRank");
            oldManager === null || oldManager === void 0 ? void 0 : oldManager.removeSub(child);
        });
        // re-render
        var list = document.getElementById("list");
        list === null || list === void 0 ? void 0 : list.replaceChildren();
        (0,_utils__WEBPACK_IMPORTED_MODULE_0__.renderSubs)(this.general.subordinates, list);
        // remove the action from store
        this.actionStore = this.actionStore.filter(function (el) { return el.id !== id; });
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
appWrapper.innerHTML = /* html */ "\n    <h1>Army Rank</h1>\n        <button id=\"".concat(general.id, "\" class=\"officer\"\n            style=\"margin-left: ").concat(general.rank * 4, "rem; background-color: #1a1a1a\"\n        >\n            ").concat(general.name, "\n        </button>\n    <div id=\"list\"></div>\n    ");
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
/* harmony export */   generateId: () => (/* binding */ generateId),
/* harmony export */   renderColor: () => (/* binding */ renderColor),
/* harmony export */   renderSubs: () => (/* binding */ renderSubs)
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/index.ts");

var renderColor = function (position) { return (position % 2 == 0 ? "#1971C2" : "#FA5252"); };
var renderSubs = function (subs, list) {
    subs.forEach(function (subEl) {
        var officerBtn = document.createElement("button");
        officerBtn.className = "officer";
        officerBtn.id = subEl.id.toString();
        officerBtn.setAttribute("style", "margin-left: ".concat(subEl.rank * 4, "rem; background-color: ").concat(renderColor(subEl.rank), ";"));
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
var generateId = function () { return "id" + Math.random().toString(16).slice(2); };


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFpRDtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDa0I7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0EsZ0RBQWdELHdCQUF3QjtBQUN4RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0Isa0RBQVU7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsa0RBQVU7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrREFBK0QsOEJBQThCO0FBQzdGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxrREFBVTtBQUNsQjtBQUNBLG1FQUFtRSxzQkFBc0I7QUFDekY7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUN5Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6SWU7QUFDSjtBQUM5QixjQUFjLGtEQUFjO0FBQ25DO0FBQ0E7QUFDQSxpTUFBaU07QUFDak07QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBLGdDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hCb0I7QUFDdkIsd0NBQXdDO0FBQ3hDO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzRkFBc0YsdURBQXVEO0FBQzdJO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLDJCQUEyQix1Q0FBRztBQUM5Qiw4Q0FBOEMsd0JBQXdCO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPLCtCQUErQjs7Ozs7OztVQ2hDdEM7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3MudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy91dGlscy50cyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly8vd2VicGFjay9zdGFydHVwIiwid2VicGFjazovLy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2VuZXJhdGVJZCwgcmVuZGVyU3VicyB9IGZyb20gXCIuL3V0aWxzXCI7XG52YXIgT2ZmaWNlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPZmZpY2VyKGlkLCBuYW1lLCBzdWJzKSB7XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5zdWJvcmRpbmF0ZXMgPSBzdWJzO1xuICAgICAgICB0aGlzLnJhbmsgPSAxO1xuICAgICAgICB0aGlzLmlzU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgT2ZmaWNlci5wcm90b3R5cGUudXBkYXRlU3Vic1JhbmsgPSBmdW5jdGlvbiAoc3ViQXJyYXksIHZhcmlhdGlvbikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBzdWJBcnJheS5mb3JFYWNoKGZ1bmN0aW9uIChzdWJFbCkge1xuICAgICAgICAgICAgaWYgKHZhcmlhdGlvbiA9PSBcInVwUmFua1wiKVxuICAgICAgICAgICAgICAgIHN1YkVsLnJhbmstLTtcbiAgICAgICAgICAgIGlmICh2YXJpYXRpb24gPT0gXCJkb3duUmFua1wiKVxuICAgICAgICAgICAgICAgIHN1YkVsLnJhbmsrKztcbiAgICAgICAgICAgIGlmIChzdWJFbC5zdWJvcmRpbmF0ZXMubGVuZ3RoID4gMClcbiAgICAgICAgICAgICAgICBfdGhpcy51cGRhdGVTdWJzUmFuayhzdWJFbC5zdWJvcmRpbmF0ZXMsIHZhcmlhdGlvbik7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE9mZmljZXIucHJvdG90eXBlLmFkZFN1YiA9IGZ1bmN0aW9uIChvZmZpY2VyLCB1cGRhdGVDaGlsZFJhbmspIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBvZmZpY2VyLnJhbmsgPSB0aGlzLnJhbmsgKyAxO1xuICAgICAgICBpZiAob2ZmaWNlci5zdWJvcmRpbmF0ZXMubGVuZ3RoID4gMCAmJiB1cGRhdGVDaGlsZFJhbmspIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU3Vic1Jhbmsob2ZmaWNlci5zdWJvcmRpbmF0ZXMsIHVwZGF0ZUNoaWxkUmFuayk7XG4gICAgICAgIH1cbiAgICAgICAgKF9hID0gdGhpcy5zdWJvcmRpbmF0ZXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5wdXNoKG9mZmljZXIpO1xuICAgIH07XG4gICAgT2ZmaWNlci5wcm90b3R5cGUucmVtb3ZlU3ViID0gZnVuY3Rpb24gKG9mZmljZXIpIHtcbiAgICAgICAgdmFyIHRhcmdldFN1YkluZGV4ID0gdGhpcy5zdWJvcmRpbmF0ZXMuaW5kZXhPZihvZmZpY2VyKTtcbiAgICAgICAgaWYgKHRhcmdldFN1YkluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuc3Vib3JkaW5hdGVzLnNwbGljZSh0YXJnZXRTdWJJbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBPZmZpY2VyO1xufSgpKTtcbmV4cG9ydCB7IE9mZmljZXIgfTtcbnZhciBBcm15UmFua2luZ0FwcCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBcm15UmFua2luZ0FwcCgpIHtcbiAgICAgICAgdmFyIGdlbmVyYWwgPSBuZXcgT2ZmaWNlcigxMDAsIFwiTU1QXCIsIFtdKTtcbiAgICAgICAgdGhpcy5nZW5lcmFsID0gZ2VuZXJhbDtcbiAgICAgICAgdGhpcy5zZWxlY3RlZE9mZmljZXJzID0gW107XG4gICAgICAgIHRoaXMuYWN0aW9uU3RvcmUgPSBbXTtcbiAgICAgICAgdmFyIHN1YjIgPSBuZXcgT2ZmaWNlcigyMDAsIFwiSm9obiBXZWFrXCIsIFtdKTtcbiAgICAgICAgdmFyIHN1YjMgPSBuZXcgT2ZmaWNlcigzMDAsIFwiSm9obiBDZW5hXCIsIFtdKTtcbiAgICAgICAgdmFyIHN1YjQgPSBuZXcgT2ZmaWNlcig0MDAsIFwiQmVuXCIsIFtdKTtcbiAgICAgICAgdmFyIHN1YjUgPSBuZXcgT2ZmaWNlcig1MDAsIFwiQ29vcGVyXCIsIFtdKTtcbiAgICAgICAgdmFyIHN1YjYgPSBuZXcgT2ZmaWNlcig2MDAsIFwiQVwiLCBbXSk7XG4gICAgICAgIHZhciBzdWI3ID0gbmV3IE9mZmljZXIoNzAwLCBcIkJcIiwgW10pO1xuICAgICAgICB2YXIgc3ViOCA9IG5ldyBPZmZpY2VyKDgwMCwgXCJDXCIsIFtdKTtcbiAgICAgICAgdmFyIHN1YjkgPSBuZXcgT2ZmaWNlcig5MDAsIFwiRFwiLCBbXSk7XG4gICAgICAgIHZhciBzdWIxMCA9IG5ldyBPZmZpY2VyKDEwMDAsIFwiRVwiLCBbXSk7XG4gICAgICAgIGdlbmVyYWwuYWRkU3ViKHN1YjIpO1xuICAgICAgICBnZW5lcmFsLmFkZFN1YihzdWIzKTtcbiAgICAgICAgc3ViMi5hZGRTdWIoc3ViNik7XG4gICAgICAgIHN1YjMuYWRkU3ViKHN1YjQpO1xuICAgICAgICBzdWIzLmFkZFN1YihzdWI1KTtcbiAgICAgICAgc3ViNC5hZGRTdWIoc3ViNyk7XG4gICAgICAgIHN1YjQuYWRkU3ViKHN1YjgpO1xuICAgICAgICBzdWI4LmFkZFN1YihzdWI5KTtcbiAgICAgICAgc3ViOS5hZGRTdWIoc3ViMTApO1xuICAgIH1cbiAgICBBcm15UmFua2luZ0FwcC5wcm90b3R5cGUuZ2V0U3ViQnlJZCA9IGZ1bmN0aW9uIChpZCwgc3ViQXJyYXksIGN1ck1hbmFnZXIpIHtcbiAgICAgICAgdmFyIHJlcyA9IHsgc3ViOiB1bmRlZmluZWQsIG1hbmFnZXI6IGN1ck1hbmFnZXIgfTtcbiAgICAgICAgc3ViQXJyYXkgPSBzdWJBcnJheSAhPT0gbnVsbCAmJiBzdWJBcnJheSAhPT0gdm9pZCAwID8gc3ViQXJyYXkgOiB0aGlzLmdlbmVyYWwuc3Vib3JkaW5hdGVzO1xuICAgICAgICBjdXJNYW5hZ2VyID0gY3VyTWFuYWdlciAhPT0gbnVsbCAmJiBjdXJNYW5hZ2VyICE9PSB2b2lkIDAgPyBjdXJNYW5hZ2VyIDogdGhpcy5nZW5lcmFsO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIHN1YkFycmF5XzEgPSBzdWJBcnJheTsgX2kgPCBzdWJBcnJheV8xLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFyIGVsID0gc3ViQXJyYXlfMVtfaV07XG4gICAgICAgICAgICBpZiAoZWwuaWQgPT09IGlkKSB7XG4gICAgICAgICAgICAgICAgcmVzLnN1YiA9IGVsO1xuICAgICAgICAgICAgICAgIHJlcy5tYW5hZ2VyID0gY3VyTWFuYWdlcjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCFyZXMuc3ViICYmIGVsLnN1Ym9yZGluYXRlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgcmVzID0gdGhpcy5nZXRTdWJCeUlkKGlkLCBlbC5zdWJvcmRpbmF0ZXMsIGVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH07XG4gICAgQXJteVJhbmtpbmdBcHAucHJvdG90eXBlLm1vdmVPZmZpY2VyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX2EgPSB0aGlzLnNlbGVjdGVkT2ZmaWNlcnMsIHN1YklkID0gX2FbMF0sIG5ld01hbmFnZXJJZCA9IF9hWzFdO1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZE9mZmljZXJzLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgIGFsZXJ0KFwiU29tZXRoaW5nIHdyb25nLCBub3QgZW5vdWdoIGRhdGFcIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIF9iID0gdGhpcy5nZXRTdWJCeUlkKHN1YklkKSwgc3ViID0gX2Iuc3ViLCBjdXJNYW5hZ2VyID0gX2IubWFuYWdlcjtcbiAgICAgICAgdmFyIG5ld01hbmFnZXIgPSB0aGlzLmdldFN1YkJ5SWQobmV3TWFuYWdlcklkKS5zdWI7XG4gICAgICAgIHZhciBzdWJDaGlsZCA9IFtdO1xuICAgICAgICAvLyAxLiBtb3ZlIHN1YidzIHN1Ym9yZGluYXRlcyBhcnJheSB1cCB0byAxIHJhbmtcbiAgICAgICAgc3ViID09PSBudWxsIHx8IHN1YiA9PT0gdm9pZCAwID8gdm9pZCAwIDogc3ViLnN1Ym9yZGluYXRlcy5mb3JFYWNoKGZ1bmN0aW9uIChzdWIpIHtcbiAgICAgICAgICAgIGN1ck1hbmFnZXIgPT09IG51bGwgfHwgY3VyTWFuYWdlciA9PT0gdm9pZCAwID8gdm9pZCAwIDogY3VyTWFuYWdlci5hZGRTdWIoc3ViLCBcInVwUmFua1wiKTtcbiAgICAgICAgICAgIHN1YkNoaWxkLnB1c2goc3ViKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHN1Yi5zdWJvcmRpbmF0ZXMgPSBbXTtcbiAgICAgICAgLy8gc2F2ZSBpbnZlcnNlIGFjdGlvbnNcbiAgICAgICAgdGhpcy5hY3Rpb25TdG9yZS5wdXNoKHtcbiAgICAgICAgICAgIGlkOiBnZW5lcmF0ZUlkKCksXG4gICAgICAgICAgICBhY3Rpb246IFwidW5kb1wiLFxuICAgICAgICAgICAgc3ViOiBzdWIsXG4gICAgICAgICAgICBvbGRNYW5hZ2VyOiBjdXJNYW5hZ2VyLFxuICAgICAgICAgICAgY3VyTWFuYWdlcjogbmV3TWFuYWdlcixcbiAgICAgICAgICAgIHN1YkNoaWxkOiBzdWJDaGlsZCxcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIDIuIHJlbW92ZSBjdXJyZW50IHN1YiBwb3NpdGlvblxuICAgICAgICBjdXJNYW5hZ2VyID09PSBudWxsIHx8IGN1ck1hbmFnZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGN1ck1hbmFnZXIucmVtb3ZlU3ViKHN1Yik7XG4gICAgICAgIC8vIDMuIGFkZCBzdWIgdG8gbmV3IHBvc2l0aW9uXG4gICAgICAgIG5ld01hbmFnZXIgPT09IG51bGwgfHwgbmV3TWFuYWdlciA9PT0gdm9pZCAwID8gdm9pZCAwIDogbmV3TWFuYWdlci5hZGRTdWIoc3ViKTtcbiAgICAgICAgLy8gcmUtcmVuZGVyXG4gICAgICAgIHZhciBsaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsaXN0XCIpO1xuICAgICAgICBsaXN0ID09PSBudWxsIHx8IGxpc3QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGxpc3QucmVwbGFjZUNoaWxkcmVuKCk7XG4gICAgICAgIHJlbmRlclN1YnModGhpcy5nZW5lcmFsLnN1Ym9yZGluYXRlcywgbGlzdCk7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRPZmZpY2VycyA9IFtdO1xuICAgIH07XG4gICAgQXJteVJhbmtpbmdBcHAucHJvdG90eXBlLnVuZG8gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIGdldCBsYXN0IHVuZG8gYWN0aW9uXG4gICAgICAgIHZhciBhY3Rpb24gPSB0aGlzLmFjdGlvblN0b3JlLmZpbmRMYXN0KGZ1bmN0aW9uIChlbCkgeyByZXR1cm4gZWwuYWN0aW9uID09PSBcInVuZG9cIjsgfSk7XG4gICAgICAgIGlmICghYWN0aW9uKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB2YXIgaWQgPSBhY3Rpb24uaWQsIHN1YiA9IGFjdGlvbi5zdWIsIG9sZE1hbmFnZXIgPSBhY3Rpb24ub2xkTWFuYWdlciwgY3VyTWFuYWdlciA9IGFjdGlvbi5jdXJNYW5hZ2VyLCBzdWJDaGlsZCA9IGFjdGlvbi5zdWJDaGlsZDtcbiAgICAgICAgb2xkTWFuYWdlciA9PT0gbnVsbCB8fCBvbGRNYW5hZ2VyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvbGRNYW5hZ2VyLmFkZFN1YihzdWIpO1xuICAgICAgICBjdXJNYW5hZ2VyID09PSBudWxsIHx8IGN1ck1hbmFnZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGN1ck1hbmFnZXIucmVtb3ZlU3ViKHN1Yik7XG4gICAgICAgIHN1YkNoaWxkID09PSBudWxsIHx8IHN1YkNoaWxkID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzdWJDaGlsZC5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgICAgICAgc3ViID09PSBudWxsIHx8IHN1YiA9PT0gdm9pZCAwID8gdm9pZCAwIDogc3ViLmFkZFN1YihjaGlsZCwgXCJkb3duUmFua1wiKTtcbiAgICAgICAgICAgIG9sZE1hbmFnZXIgPT09IG51bGwgfHwgb2xkTWFuYWdlciA9PT0gdm9pZCAwID8gdm9pZCAwIDogb2xkTWFuYWdlci5yZW1vdmVTdWIoY2hpbGQpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gcmUtcmVuZGVyXG4gICAgICAgIHZhciBsaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsaXN0XCIpO1xuICAgICAgICBsaXN0ID09PSBudWxsIHx8IGxpc3QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGxpc3QucmVwbGFjZUNoaWxkcmVuKCk7XG4gICAgICAgIHJlbmRlclN1YnModGhpcy5nZW5lcmFsLnN1Ym9yZGluYXRlcywgbGlzdCk7XG4gICAgICAgIC8vIHJlbW92ZSB0aGUgYWN0aW9uIGZyb20gc3RvcmVcbiAgICAgICAgdGhpcy5hY3Rpb25TdG9yZSA9IHRoaXMuYWN0aW9uU3RvcmUuZmlsdGVyKGZ1bmN0aW9uIChlbCkgeyByZXR1cm4gZWwuaWQgIT09IGlkOyB9KTtcbiAgICB9O1xuICAgIEFybXlSYW5raW5nQXBwLnByb3RvdHlwZS5yZWRvID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgIHJldHVybiBBcm15UmFua2luZ0FwcDtcbn0oKSk7XG5leHBvcnQgeyBBcm15UmFua2luZ0FwcCB9O1xuIiwiaW1wb3J0IHsgQXJteVJhbmtpbmdBcHAgfSBmcm9tIFwiLi9jbGFzc1wiO1xuaW1wb3J0IHsgcmVuZGVyU3VicyB9IGZyb20gXCIuL3V0aWxzXCI7XG5leHBvcnQgdmFyIEFwcCA9IG5ldyBBcm15UmFua2luZ0FwcCgpO1xudmFyIGdlbmVyYWwgPSBBcHAuZ2VuZXJhbDtcbnZhciBhcHBXcmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhcHBcIik7XG5hcHBXcmFwcGVyLmlubmVySFRNTCA9IC8qIGh0bWwgKi8gXCJcXG4gICAgPGgxPkFybXkgUmFuazwvaDE+XFxuICAgICAgICA8YnV0dG9uIGlkPVxcXCJcIi5jb25jYXQoZ2VuZXJhbC5pZCwgXCJcXFwiIGNsYXNzPVxcXCJvZmZpY2VyXFxcIlxcbiAgICAgICAgICAgIHN0eWxlPVxcXCJtYXJnaW4tbGVmdDogXCIpLmNvbmNhdChnZW5lcmFsLnJhbmsgKiA0LCBcInJlbTsgYmFja2dyb3VuZC1jb2xvcjogIzFhMWExYVxcXCJcXG4gICAgICAgID5cXG4gICAgICAgICAgICBcIikuY29uY2F0KGdlbmVyYWwubmFtZSwgXCJcXG4gICAgICAgIDwvYnV0dG9uPlxcbiAgICA8ZGl2IGlkPVxcXCJsaXN0XFxcIj48L2Rpdj5cXG4gICAgXCIpO1xuLyogZnVuY3Rpb24gYnV0dG9uIGFzc2lnbiAqL1xudmFyIG1vdmVPZmZpY2VyQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbm1vdmVPZmZpY2VyQnRuLmlubmVyVGV4dCA9IFwiTW92ZSBPZmZpY2VyXCI7XG5tb3ZlT2ZmaWNlckJ0bi5vbmNsaWNrID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gQXBwLm1vdmVPZmZpY2VyKCk7IH07XG52YXIgdW5kb0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG51bmRvQnRuLmlubmVyVGV4dCA9IFwiVW5kb1wiO1xudW5kb0J0bi5vbmNsaWNrID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gQXBwLnVuZG8oKTsgfTtcbnZhciByZWRvQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbnJlZG9CdG4uaW5uZXJUZXh0ID0gXCJSZWRvXCI7XG5yZWRvQnRuLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBBcHAucmVkbygpOyB9O1xudmFyIGJ0bldyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuYnRuV3JhcHBlci5jbGFzc05hbWUgPSBcImJ0bi13cmFwcGVyXCI7XG5idG5XcmFwcGVyLmFwcGVuZENoaWxkKG1vdmVPZmZpY2VyQnRuKTtcbmJ0bldyYXBwZXIuYXBwZW5kQ2hpbGQodW5kb0J0bik7XG5idG5XcmFwcGVyLmFwcGVuZENoaWxkKHJlZG9CdG4pO1xuYXBwV3JhcHBlci5hcHBlbmRDaGlsZChidG5XcmFwcGVyKTtcbi8qIGVuZCBmdW5jdGlvbiBidXR0b24gYXNzaWduICovXG52YXIgbGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGlzdFwiKTtcbnJlbmRlclN1YnMoZ2VuZXJhbC5zdWJvcmRpbmF0ZXMsIGxpc3QpO1xuIiwiaW1wb3J0IHsgQXBwIH0gZnJvbSBcIi4vaW5kZXhcIjtcbmV4cG9ydCB2YXIgcmVuZGVyQ29sb3IgPSBmdW5jdGlvbiAocG9zaXRpb24pIHsgcmV0dXJuIChwb3NpdGlvbiAlIDIgPT0gMCA/IFwiIzE5NzFDMlwiIDogXCIjRkE1MjUyXCIpOyB9O1xuZXhwb3J0IHZhciByZW5kZXJTdWJzID0gZnVuY3Rpb24gKHN1YnMsIGxpc3QpIHtcbiAgICBzdWJzLmZvckVhY2goZnVuY3Rpb24gKHN1YkVsKSB7XG4gICAgICAgIHZhciBvZmZpY2VyQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgb2ZmaWNlckJ0bi5jbGFzc05hbWUgPSBcIm9mZmljZXJcIjtcbiAgICAgICAgb2ZmaWNlckJ0bi5pZCA9IHN1YkVsLmlkLnRvU3RyaW5nKCk7XG4gICAgICAgIG9mZmljZXJCdG4uc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJtYXJnaW4tbGVmdDogXCIuY29uY2F0KHN1YkVsLnJhbmsgKiA0LCBcInJlbTsgYmFja2dyb3VuZC1jb2xvcjogXCIpLmNvbmNhdChyZW5kZXJDb2xvcihzdWJFbC5yYW5rKSwgXCI7XCIpKTtcbiAgICAgICAgb2ZmaWNlckJ0bi5pbm5lclRleHQgPSBzdWJFbC5uYW1lO1xuICAgICAgICBvZmZpY2VyQnRuLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBzZXRPZmZpY2VyRm9yTW92ZShzdWJFbC5pZCwgb2ZmaWNlckJ0bik7IH07XG4gICAgICAgIGxpc3QgPT09IG51bGwgfHwgbGlzdCA9PT0gdm9pZCAwID8gdm9pZCAwIDogbGlzdC5hcHBlbmRDaGlsZChvZmZpY2VyQnRuKTtcbiAgICAgICAgaWYgKHN1YkVsLnN1Ym9yZGluYXRlcy5sZW5ndGggPiAwKVxuICAgICAgICAgICAgcmVuZGVyU3VicyhzdWJFbC5zdWJvcmRpbmF0ZXMsIGxpc3QpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm47XG4gICAgfSk7XG59O1xuZnVuY3Rpb24gc2V0T2ZmaWNlckZvck1vdmUoc3ViRWxJZCwgb2ZmaWNlckJ0bikge1xuICAgIHZhciBzZWxlY3RlZE9mZmljZXJzID0gQXBwLnNlbGVjdGVkT2ZmaWNlcnM7XG4gICAgaWYgKHNlbGVjdGVkT2ZmaWNlcnMuc29tZShmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIGVsID09PSBzdWJFbElkOyB9KSkge1xuICAgICAgICAvLyByZW1vdmUgc2VsZWN0ZWRPZmZpY2VyXG4gICAgICAgIHZhciB0YXJnZXRTdWJJbmRleCA9IHNlbGVjdGVkT2ZmaWNlcnMuaW5kZXhPZihzdWJFbElkKTtcbiAgICAgICAgaWYgKHRhcmdldFN1YkluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgIHNlbGVjdGVkT2ZmaWNlcnMuc3BsaWNlKHRhcmdldFN1YkluZGV4LCAxKTtcbiAgICAgICAgICAgIG9mZmljZXJCdG4uc3R5bGUub3V0bGluZSA9IFwiXCI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoc2VsZWN0ZWRPZmZpY2Vycy5sZW5ndGggPCAyKSB7XG4gICAgICAgIHNlbGVjdGVkT2ZmaWNlcnMucHVzaChzdWJFbElkKTtcbiAgICAgICAgb2ZmaWNlckJ0bi5zdHlsZS5vdXRsaW5lID0gXCI1cHggYXV0byB3aGl0ZVwiO1xuICAgIH1cbn1cbmV4cG9ydCB2YXIgZ2VuZXJhdGVJZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFwiaWRcIiArIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMTYpLnNsaWNlKDIpOyB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==