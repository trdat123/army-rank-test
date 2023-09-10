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
        var general = new Officer(1, "MMP", []);
        this.general = general;
        this.selectedOfficers = [];
        this.actionStore = [];
        var sub2 = new Officer((0,_utils__WEBPACK_IMPORTED_MODULE_0__.generateId)(), "John Weak", []);
        var sub3 = new Officer((0,_utils__WEBPACK_IMPORTED_MODULE_0__.generateId)(), "John Cena", []);
        var sub4 = new Officer((0,_utils__WEBPACK_IMPORTED_MODULE_0__.generateId)(), "Ben", []);
        var sub5 = new Officer((0,_utils__WEBPACK_IMPORTED_MODULE_0__.generateId)(), "Cooper", []);
        var sub6 = new Officer((0,_utils__WEBPACK_IMPORTED_MODULE_0__.generateId)(), "A", []);
        var sub7 = new Officer((0,_utils__WEBPACK_IMPORTED_MODULE_0__.generateId)(), "B", []);
        var sub8 = new Officer((0,_utils__WEBPACK_IMPORTED_MODULE_0__.generateId)(), "C", []);
        var sub9 = new Officer((0,_utils__WEBPACK_IMPORTED_MODULE_0__.generateId)(), "D", []);
        var sub10 = new Officer((0,_utils__WEBPACK_IMPORTED_MODULE_0__.generateId)(), "E", []);
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
    ArmyRankingApp.prototype.removeAction = function (id) {
        return (this.actionStore = this.actionStore.filter(function (el) { return el.id !== id; }));
    };
    ArmyRankingApp.prototype.getSubById = function (id, subArray, curManager) {
        var res = { sub: undefined, manager: curManager };
        if (id === 1) {
            res.sub = this.general;
        }
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
        // move sub's subordinates array up to 1 rank
        sub === null || sub === void 0 ? void 0 : sub.subordinates.forEach(function (sub) {
            curManager === null || curManager === void 0 ? void 0 : curManager.addSub(sub, "upRank");
            subChild.push(sub);
        });
        sub.subordinates = [];
        this.actionStore.push({
            id: (0,_utils__WEBPACK_IMPORTED_MODULE_0__.generateId)(),
            action: "undo",
            sub: sub,
            oldManager: curManager,
            curManager: newManager,
            subChild: subChild,
        });
        curManager === null || curManager === void 0 ? void 0 : curManager.removeSub(sub);
        newManager === null || newManager === void 0 ? void 0 : newManager.addSub(sub);
        (0,_utils__WEBPACK_IMPORTED_MODULE_0__.reRenderList)();
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
        (0,_utils__WEBPACK_IMPORTED_MODULE_0__.reRenderList)();
        this.removeAction(id);
        this.actionStore.push({
            id: (0,_utils__WEBPACK_IMPORTED_MODULE_0__.generateId)(),
            action: "redo",
            sub: sub,
            curManager: oldManager,
            newManager: curManager,
        });
    };
    ArmyRankingApp.prototype.redo = function () {
        // get last redo action
        var action = this.actionStore.findLast(function (el) { return el.action === "redo"; });
        if (!action)
            return;
        var id = action.id, sub = action.sub, curManager = action.curManager, newManager = action.newManager;
        var subChild = [];
        sub === null || sub === void 0 ? void 0 : sub.subordinates.forEach(function (sub) {
            curManager === null || curManager === void 0 ? void 0 : curManager.addSub(sub, "upRank");
            subChild.push(sub);
        });
        sub.subordinates = [];
        this.actionStore.push({
            id: (0,_utils__WEBPACK_IMPORTED_MODULE_0__.generateId)(),
            action: "undo",
            sub: sub,
            oldManager: curManager,
            curManager: newManager,
            subChild: subChild,
        });
        curManager === null || curManager === void 0 ? void 0 : curManager.removeSub(sub);
        newManager === null || newManager === void 0 ? void 0 : newManager.addSub(sub);
        (0,_utils__WEBPACK_IMPORTED_MODULE_0__.reRenderList)();
        this.removeAction(id);
    };
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
appWrapper.innerHTML = /* html */ "\n    <h1>Army Rank</h1>\n    <div class=\"node-wrapper\">\n        <button id=\"".concat(general.id, "\" class=\"officer\"\n            style=\"margin-left: ").concat(general.rank * 4, "rem; background-color: #1a1a1a\"\n        >\n            ").concat(general.name, "\n        </button>\n        <button class=\"add-btn\" id=\"add-btn-general\">+</button>\n    </div>\n    <div id=\"list\"></div>\n    ");
var generalBtn = document.getElementById("1");
generalBtn.onclick = function () { return (0,_utils__WEBPACK_IMPORTED_MODULE_1__.setOfficerForMove)(general.id, generalBtn); };
var addBtn = document.querySelector("#add-btn-general");
addBtn.onclick = function () { return (0,_utils__WEBPACK_IMPORTED_MODULE_1__.handleInput)(addBtn, general); };
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
/* harmony export */   handleInput: () => (/* binding */ handleInput),
/* harmony export */   reRenderList: () => (/* binding */ reRenderList),
/* harmony export */   renderColor: () => (/* binding */ renderColor),
/* harmony export */   renderSubs: () => (/* binding */ renderSubs),
/* harmony export */   setOfficerForMove: () => (/* binding */ setOfficerForMove)
/* harmony export */ });
/* harmony import */ var _class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./class */ "./src/class.ts");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ "./src/index.ts");


var renderColor = function (position) { return (position % 2 == 0 ? "#1971C2" : "#FA5252"); };
var generateId = function () { return parseInt(Math.random().toString(10).slice(2)); };
var reRenderList = function () {
    var list = document.getElementById("list");
    list === null || list === void 0 ? void 0 : list.replaceChildren();
    renderSubs(_index__WEBPACK_IMPORTED_MODULE_1__.App.general.subordinates, list);
};
var renderSubs = function (subs, list) {
    subs.forEach(function (subEl) {
        var officerBtn = document.createElement("button");
        officerBtn.className = "officer";
        officerBtn.id = subEl.id.toString();
        officerBtn.setAttribute("style", "margin-left: ".concat(subEl.rank * 4, "rem; background-color: ").concat(renderColor(subEl.rank), ";"));
        officerBtn.innerText = subEl.name;
        officerBtn.onclick = function () { return setOfficerForMove(subEl.id, officerBtn); };
        var addBtn = document.createElement("button");
        addBtn.className = "add-btn";
        addBtn.id = "add-btn-".concat(subEl.id);
        addBtn.innerText = "+";
        addBtn.onclick = function () { return handleInput(addBtn, subEl); };
        var nodeWrapper = document.createElement("div");
        nodeWrapper.className = "node-wrapper";
        nodeWrapper.appendChild(officerBtn);
        nodeWrapper.appendChild(addBtn);
        list === null || list === void 0 ? void 0 : list.appendChild(nodeWrapper);
        if (subEl.subordinates.length > 0)
            renderSubs(subEl.subordinates, list);
        else
            return;
    });
};
function setOfficerForMove(subElId, officerBtn) {
    var selectedOfficers = _index__WEBPACK_IMPORTED_MODULE_1__.App.selectedOfficers;
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
function handleInput(btn, parent) {
    var _a;
    btn.style.display = "none";
    var input = document.createElement("input");
    (_a = btn === null || btn === void 0 ? void 0 : btn.parentElement) === null || _a === void 0 ? void 0 : _a.appendChild(input);
    input.focus();
    input.onblur = function () {
        input.style.display = "none";
        btn.style.display = "";
    };
    input.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            if (input.value === "")
                return;
            var sub = new _class__WEBPACK_IMPORTED_MODULE_0__.Officer(generateId(), input.value, []);
            parent.addSub(sub);
            input.value = "";
            input.style.display = "none";
            reRenderList();
        }
    });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQiwyQ0FBTztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7Ozs7O1VDckVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzLnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly8vd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdlbmVyYXRlSWQsIHJlUmVuZGVyTGlzdCB9IGZyb20gXCIuL3V0aWxzXCI7XG52YXIgT2ZmaWNlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPZmZpY2VyKGlkLCBuYW1lLCBzdWJzKSB7XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5zdWJvcmRpbmF0ZXMgPSBzdWJzO1xuICAgICAgICB0aGlzLnJhbmsgPSAxO1xuICAgICAgICB0aGlzLmlzU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgT2ZmaWNlci5wcm90b3R5cGUudXBkYXRlU3Vic1JhbmsgPSBmdW5jdGlvbiAoc3ViQXJyYXksIHZhcmlhdGlvbikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBzdWJBcnJheS5mb3JFYWNoKGZ1bmN0aW9uIChzdWJFbCkge1xuICAgICAgICAgICAgaWYgKHZhcmlhdGlvbiA9PSBcInVwUmFua1wiKVxuICAgICAgICAgICAgICAgIHN1YkVsLnJhbmstLTtcbiAgICAgICAgICAgIGlmICh2YXJpYXRpb24gPT0gXCJkb3duUmFua1wiKVxuICAgICAgICAgICAgICAgIHN1YkVsLnJhbmsrKztcbiAgICAgICAgICAgIGlmIChzdWJFbC5zdWJvcmRpbmF0ZXMubGVuZ3RoID4gMClcbiAgICAgICAgICAgICAgICBfdGhpcy51cGRhdGVTdWJzUmFuayhzdWJFbC5zdWJvcmRpbmF0ZXMsIHZhcmlhdGlvbik7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE9mZmljZXIucHJvdG90eXBlLmFkZFN1YiA9IGZ1bmN0aW9uIChvZmZpY2VyLCB1cGRhdGVDaGlsZFJhbmspIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBvZmZpY2VyLnJhbmsgPSB0aGlzLnJhbmsgKyAxO1xuICAgICAgICBpZiAob2ZmaWNlci5zdWJvcmRpbmF0ZXMubGVuZ3RoID4gMCAmJiB1cGRhdGVDaGlsZFJhbmspIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU3Vic1Jhbmsob2ZmaWNlci5zdWJvcmRpbmF0ZXMsIHVwZGF0ZUNoaWxkUmFuayk7XG4gICAgICAgIH1cbiAgICAgICAgKF9hID0gdGhpcy5zdWJvcmRpbmF0ZXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5wdXNoKG9mZmljZXIpO1xuICAgIH07XG4gICAgT2ZmaWNlci5wcm90b3R5cGUucmVtb3ZlU3ViID0gZnVuY3Rpb24gKG9mZmljZXIpIHtcbiAgICAgICAgdmFyIHRhcmdldFN1YkluZGV4ID0gdGhpcy5zdWJvcmRpbmF0ZXMuaW5kZXhPZihvZmZpY2VyKTtcbiAgICAgICAgaWYgKHRhcmdldFN1YkluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuc3Vib3JkaW5hdGVzLnNwbGljZSh0YXJnZXRTdWJJbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBPZmZpY2VyO1xufSgpKTtcbmV4cG9ydCB7IE9mZmljZXIgfTtcbnZhciBBcm15UmFua2luZ0FwcCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBcm15UmFua2luZ0FwcCgpIHtcbiAgICAgICAgdmFyIGdlbmVyYWwgPSBuZXcgT2ZmaWNlcigxLCBcIk1NUFwiLCBbXSk7XG4gICAgICAgIHRoaXMuZ2VuZXJhbCA9IGdlbmVyYWw7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRPZmZpY2VycyA9IFtdO1xuICAgICAgICB0aGlzLmFjdGlvblN0b3JlID0gW107XG4gICAgICAgIHZhciBzdWIyID0gbmV3IE9mZmljZXIoZ2VuZXJhdGVJZCgpLCBcIkpvaG4gV2Vha1wiLCBbXSk7XG4gICAgICAgIHZhciBzdWIzID0gbmV3IE9mZmljZXIoZ2VuZXJhdGVJZCgpLCBcIkpvaG4gQ2VuYVwiLCBbXSk7XG4gICAgICAgIHZhciBzdWI0ID0gbmV3IE9mZmljZXIoZ2VuZXJhdGVJZCgpLCBcIkJlblwiLCBbXSk7XG4gICAgICAgIHZhciBzdWI1ID0gbmV3IE9mZmljZXIoZ2VuZXJhdGVJZCgpLCBcIkNvb3BlclwiLCBbXSk7XG4gICAgICAgIHZhciBzdWI2ID0gbmV3IE9mZmljZXIoZ2VuZXJhdGVJZCgpLCBcIkFcIiwgW10pO1xuICAgICAgICB2YXIgc3ViNyA9IG5ldyBPZmZpY2VyKGdlbmVyYXRlSWQoKSwgXCJCXCIsIFtdKTtcbiAgICAgICAgdmFyIHN1YjggPSBuZXcgT2ZmaWNlcihnZW5lcmF0ZUlkKCksIFwiQ1wiLCBbXSk7XG4gICAgICAgIHZhciBzdWI5ID0gbmV3IE9mZmljZXIoZ2VuZXJhdGVJZCgpLCBcIkRcIiwgW10pO1xuICAgICAgICB2YXIgc3ViMTAgPSBuZXcgT2ZmaWNlcihnZW5lcmF0ZUlkKCksIFwiRVwiLCBbXSk7XG4gICAgICAgIGdlbmVyYWwuYWRkU3ViKHN1YjIpO1xuICAgICAgICBnZW5lcmFsLmFkZFN1YihzdWIzKTtcbiAgICAgICAgc3ViMi5hZGRTdWIoc3ViNik7XG4gICAgICAgIHN1YjMuYWRkU3ViKHN1YjQpO1xuICAgICAgICBzdWIzLmFkZFN1YihzdWI1KTtcbiAgICAgICAgc3ViNC5hZGRTdWIoc3ViNyk7XG4gICAgICAgIHN1YjQuYWRkU3ViKHN1YjgpO1xuICAgICAgICBzdWI4LmFkZFN1YihzdWI5KTtcbiAgICAgICAgc3ViOS5hZGRTdWIoc3ViMTApO1xuICAgIH1cbiAgICBBcm15UmFua2luZ0FwcC5wcm90b3R5cGUucmVtb3ZlQWN0aW9uID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5hY3Rpb25TdG9yZSA9IHRoaXMuYWN0aW9uU3RvcmUuZmlsdGVyKGZ1bmN0aW9uIChlbCkgeyByZXR1cm4gZWwuaWQgIT09IGlkOyB9KSk7XG4gICAgfTtcbiAgICBBcm15UmFua2luZ0FwcC5wcm90b3R5cGUuZ2V0U3ViQnlJZCA9IGZ1bmN0aW9uIChpZCwgc3ViQXJyYXksIGN1ck1hbmFnZXIpIHtcbiAgICAgICAgdmFyIHJlcyA9IHsgc3ViOiB1bmRlZmluZWQsIG1hbmFnZXI6IGN1ck1hbmFnZXIgfTtcbiAgICAgICAgaWYgKGlkID09PSAxKSB7XG4gICAgICAgICAgICByZXMuc3ViID0gdGhpcy5nZW5lcmFsO1xuICAgICAgICB9XG4gICAgICAgIHN1YkFycmF5ID0gc3ViQXJyYXkgIT09IG51bGwgJiYgc3ViQXJyYXkgIT09IHZvaWQgMCA/IHN1YkFycmF5IDogdGhpcy5nZW5lcmFsLnN1Ym9yZGluYXRlcztcbiAgICAgICAgY3VyTWFuYWdlciA9IGN1ck1hbmFnZXIgIT09IG51bGwgJiYgY3VyTWFuYWdlciAhPT0gdm9pZCAwID8gY3VyTWFuYWdlciA6IHRoaXMuZ2VuZXJhbDtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBzdWJBcnJheV8xID0gc3ViQXJyYXk7IF9pIDwgc3ViQXJyYXlfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhciBlbCA9IHN1YkFycmF5XzFbX2ldO1xuICAgICAgICAgICAgaWYgKGVsLmlkID09PSBpZCkge1xuICAgICAgICAgICAgICAgIHJlcy5zdWIgPSBlbDtcbiAgICAgICAgICAgICAgICByZXMubWFuYWdlciA9IGN1ck1hbmFnZXI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghcmVzLnN1YiAmJiBlbC5zdWJvcmRpbmF0ZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHJlcyA9IHRoaXMuZ2V0U3ViQnlJZChpZCwgZWwuc3Vib3JkaW5hdGVzLCBlbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9O1xuICAgIEFybXlSYW5raW5nQXBwLnByb3RvdHlwZS5tb3ZlT2ZmaWNlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF9hID0gdGhpcy5zZWxlY3RlZE9mZmljZXJzLCBzdWJJZCA9IF9hWzBdLCBuZXdNYW5hZ2VySWQgPSBfYVsxXTtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRPZmZpY2Vycy5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICBhbGVydChcIlNvbWV0aGluZyB3cm9uZywgbm90IGVub3VnaCBkYXRhXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBfYiA9IHRoaXMuZ2V0U3ViQnlJZChzdWJJZCksIHN1YiA9IF9iLnN1YiwgY3VyTWFuYWdlciA9IF9iLm1hbmFnZXI7XG4gICAgICAgIHZhciBuZXdNYW5hZ2VyID0gdGhpcy5nZXRTdWJCeUlkKG5ld01hbmFnZXJJZCkuc3ViO1xuICAgICAgICB2YXIgc3ViQ2hpbGQgPSBbXTtcbiAgICAgICAgLy8gbW92ZSBzdWIncyBzdWJvcmRpbmF0ZXMgYXJyYXkgdXAgdG8gMSByYW5rXG4gICAgICAgIHN1YiA9PT0gbnVsbCB8fCBzdWIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHN1Yi5zdWJvcmRpbmF0ZXMuZm9yRWFjaChmdW5jdGlvbiAoc3ViKSB7XG4gICAgICAgICAgICBjdXJNYW5hZ2VyID09PSBudWxsIHx8IGN1ck1hbmFnZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGN1ck1hbmFnZXIuYWRkU3ViKHN1YiwgXCJ1cFJhbmtcIik7XG4gICAgICAgICAgICBzdWJDaGlsZC5wdXNoKHN1Yik7XG4gICAgICAgIH0pO1xuICAgICAgICBzdWIuc3Vib3JkaW5hdGVzID0gW107XG4gICAgICAgIHRoaXMuYWN0aW9uU3RvcmUucHVzaCh7XG4gICAgICAgICAgICBpZDogZ2VuZXJhdGVJZCgpLFxuICAgICAgICAgICAgYWN0aW9uOiBcInVuZG9cIixcbiAgICAgICAgICAgIHN1Yjogc3ViLFxuICAgICAgICAgICAgb2xkTWFuYWdlcjogY3VyTWFuYWdlcixcbiAgICAgICAgICAgIGN1ck1hbmFnZXI6IG5ld01hbmFnZXIsXG4gICAgICAgICAgICBzdWJDaGlsZDogc3ViQ2hpbGQsXG4gICAgICAgIH0pO1xuICAgICAgICBjdXJNYW5hZ2VyID09PSBudWxsIHx8IGN1ck1hbmFnZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGN1ck1hbmFnZXIucmVtb3ZlU3ViKHN1Yik7XG4gICAgICAgIG5ld01hbmFnZXIgPT09IG51bGwgfHwgbmV3TWFuYWdlciA9PT0gdm9pZCAwID8gdm9pZCAwIDogbmV3TWFuYWdlci5hZGRTdWIoc3ViKTtcbiAgICAgICAgcmVSZW5kZXJMaXN0KCk7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRPZmZpY2VycyA9IFtdO1xuICAgIH07XG4gICAgQXJteVJhbmtpbmdBcHAucHJvdG90eXBlLnVuZG8gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIGdldCBsYXN0IHVuZG8gYWN0aW9uXG4gICAgICAgIHZhciBhY3Rpb24gPSB0aGlzLmFjdGlvblN0b3JlLmZpbmRMYXN0KGZ1bmN0aW9uIChlbCkgeyByZXR1cm4gZWwuYWN0aW9uID09PSBcInVuZG9cIjsgfSk7XG4gICAgICAgIGlmICghYWN0aW9uKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB2YXIgaWQgPSBhY3Rpb24uaWQsIHN1YiA9IGFjdGlvbi5zdWIsIG9sZE1hbmFnZXIgPSBhY3Rpb24ub2xkTWFuYWdlciwgY3VyTWFuYWdlciA9IGFjdGlvbi5jdXJNYW5hZ2VyLCBzdWJDaGlsZCA9IGFjdGlvbi5zdWJDaGlsZDtcbiAgICAgICAgb2xkTWFuYWdlciA9PT0gbnVsbCB8fCBvbGRNYW5hZ2VyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvbGRNYW5hZ2VyLmFkZFN1YihzdWIpO1xuICAgICAgICBjdXJNYW5hZ2VyID09PSBudWxsIHx8IGN1ck1hbmFnZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGN1ck1hbmFnZXIucmVtb3ZlU3ViKHN1Yik7XG4gICAgICAgIHN1YkNoaWxkID09PSBudWxsIHx8IHN1YkNoaWxkID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzdWJDaGlsZC5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgICAgICAgc3ViID09PSBudWxsIHx8IHN1YiA9PT0gdm9pZCAwID8gdm9pZCAwIDogc3ViLmFkZFN1YihjaGlsZCwgXCJkb3duUmFua1wiKTtcbiAgICAgICAgICAgIG9sZE1hbmFnZXIgPT09IG51bGwgfHwgb2xkTWFuYWdlciA9PT0gdm9pZCAwID8gdm9pZCAwIDogb2xkTWFuYWdlci5yZW1vdmVTdWIoY2hpbGQpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmVSZW5kZXJMaXN0KCk7XG4gICAgICAgIHRoaXMucmVtb3ZlQWN0aW9uKGlkKTtcbiAgICAgICAgdGhpcy5hY3Rpb25TdG9yZS5wdXNoKHtcbiAgICAgICAgICAgIGlkOiBnZW5lcmF0ZUlkKCksXG4gICAgICAgICAgICBhY3Rpb246IFwicmVkb1wiLFxuICAgICAgICAgICAgc3ViOiBzdWIsXG4gICAgICAgICAgICBjdXJNYW5hZ2VyOiBvbGRNYW5hZ2VyLFxuICAgICAgICAgICAgbmV3TWFuYWdlcjogY3VyTWFuYWdlcixcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBBcm15UmFua2luZ0FwcC5wcm90b3R5cGUucmVkbyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gZ2V0IGxhc3QgcmVkbyBhY3Rpb25cbiAgICAgICAgdmFyIGFjdGlvbiA9IHRoaXMuYWN0aW9uU3RvcmUuZmluZExhc3QoZnVuY3Rpb24gKGVsKSB7IHJldHVybiBlbC5hY3Rpb24gPT09IFwicmVkb1wiOyB9KTtcbiAgICAgICAgaWYgKCFhY3Rpb24pXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHZhciBpZCA9IGFjdGlvbi5pZCwgc3ViID0gYWN0aW9uLnN1YiwgY3VyTWFuYWdlciA9IGFjdGlvbi5jdXJNYW5hZ2VyLCBuZXdNYW5hZ2VyID0gYWN0aW9uLm5ld01hbmFnZXI7XG4gICAgICAgIHZhciBzdWJDaGlsZCA9IFtdO1xuICAgICAgICBzdWIgPT09IG51bGwgfHwgc3ViID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzdWIuc3Vib3JkaW5hdGVzLmZvckVhY2goZnVuY3Rpb24gKHN1Yikge1xuICAgICAgICAgICAgY3VyTWFuYWdlciA9PT0gbnVsbCB8fCBjdXJNYW5hZ2VyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjdXJNYW5hZ2VyLmFkZFN1YihzdWIsIFwidXBSYW5rXCIpO1xuICAgICAgICAgICAgc3ViQ2hpbGQucHVzaChzdWIpO1xuICAgICAgICB9KTtcbiAgICAgICAgc3ViLnN1Ym9yZGluYXRlcyA9IFtdO1xuICAgICAgICB0aGlzLmFjdGlvblN0b3JlLnB1c2goe1xuICAgICAgICAgICAgaWQ6IGdlbmVyYXRlSWQoKSxcbiAgICAgICAgICAgIGFjdGlvbjogXCJ1bmRvXCIsXG4gICAgICAgICAgICBzdWI6IHN1YixcbiAgICAgICAgICAgIG9sZE1hbmFnZXI6IGN1ck1hbmFnZXIsXG4gICAgICAgICAgICBjdXJNYW5hZ2VyOiBuZXdNYW5hZ2VyLFxuICAgICAgICAgICAgc3ViQ2hpbGQ6IHN1YkNoaWxkLFxuICAgICAgICB9KTtcbiAgICAgICAgY3VyTWFuYWdlciA9PT0gbnVsbCB8fCBjdXJNYW5hZ2VyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjdXJNYW5hZ2VyLnJlbW92ZVN1YihzdWIpO1xuICAgICAgICBuZXdNYW5hZ2VyID09PSBudWxsIHx8IG5ld01hbmFnZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG5ld01hbmFnZXIuYWRkU3ViKHN1Yik7XG4gICAgICAgIHJlUmVuZGVyTGlzdCgpO1xuICAgICAgICB0aGlzLnJlbW92ZUFjdGlvbihpZCk7XG4gICAgfTtcbiAgICByZXR1cm4gQXJteVJhbmtpbmdBcHA7XG59KCkpO1xuZXhwb3J0IHsgQXJteVJhbmtpbmdBcHAgfTtcbiIsImltcG9ydCB7IEFybXlSYW5raW5nQXBwIH0gZnJvbSBcIi4vY2xhc3NcIjtcbmltcG9ydCB7IGhhbmRsZUlucHV0LCByZW5kZXJTdWJzLCBzZXRPZmZpY2VyRm9yTW92ZSB9IGZyb20gXCIuL3V0aWxzXCI7XG5leHBvcnQgdmFyIEFwcCA9IG5ldyBBcm15UmFua2luZ0FwcCgpO1xudmFyIGdlbmVyYWwgPSBBcHAuZ2VuZXJhbDtcbnZhciBhcHBXcmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhcHBcIik7XG5hcHBXcmFwcGVyLmlubmVySFRNTCA9IC8qIGh0bWwgKi8gXCJcXG4gICAgPGgxPkFybXkgUmFuazwvaDE+XFxuICAgIDxkaXYgY2xhc3M9XFxcIm5vZGUtd3JhcHBlclxcXCI+XFxuICAgICAgICA8YnV0dG9uIGlkPVxcXCJcIi5jb25jYXQoZ2VuZXJhbC5pZCwgXCJcXFwiIGNsYXNzPVxcXCJvZmZpY2VyXFxcIlxcbiAgICAgICAgICAgIHN0eWxlPVxcXCJtYXJnaW4tbGVmdDogXCIpLmNvbmNhdChnZW5lcmFsLnJhbmsgKiA0LCBcInJlbTsgYmFja2dyb3VuZC1jb2xvcjogIzFhMWExYVxcXCJcXG4gICAgICAgID5cXG4gICAgICAgICAgICBcIikuY29uY2F0KGdlbmVyYWwubmFtZSwgXCJcXG4gICAgICAgIDwvYnV0dG9uPlxcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cXFwiYWRkLWJ0blxcXCIgaWQ9XFxcImFkZC1idG4tZ2VuZXJhbFxcXCI+KzwvYnV0dG9uPlxcbiAgICA8L2Rpdj5cXG4gICAgPGRpdiBpZD1cXFwibGlzdFxcXCI+PC9kaXY+XFxuICAgIFwiKTtcbnZhciBnZW5lcmFsQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCIxXCIpO1xuZ2VuZXJhbEJ0bi5vbmNsaWNrID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gc2V0T2ZmaWNlckZvck1vdmUoZ2VuZXJhbC5pZCwgZ2VuZXJhbEJ0bik7IH07XG52YXIgYWRkQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhZGQtYnRuLWdlbmVyYWxcIik7XG5hZGRCdG4ub25jbGljayA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGhhbmRsZUlucHV0KGFkZEJ0biwgZ2VuZXJhbCk7IH07XG4vKiBmdW5jdGlvbiBidXR0b24gYXNzaWduICovXG52YXIgbW92ZU9mZmljZXJCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xubW92ZU9mZmljZXJCdG4uaW5uZXJUZXh0ID0gXCJNb3ZlIE9mZmljZXJcIjtcbm1vdmVPZmZpY2VyQnRuLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBBcHAubW92ZU9mZmljZXIoKTsgfTtcbnZhciB1bmRvQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbnVuZG9CdG4uaW5uZXJUZXh0ID0gXCJVbmRvXCI7XG51bmRvQnRuLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBBcHAudW5kbygpOyB9O1xudmFyIHJlZG9CdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xucmVkb0J0bi5pbm5lclRleHQgPSBcIlJlZG9cIjtcbnJlZG9CdG4ub25jbGljayA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIEFwcC5yZWRvKCk7IH07XG52YXIgYnRuV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5idG5XcmFwcGVyLmNsYXNzTmFtZSA9IFwiYnRuLXdyYXBwZXJcIjtcbmJ0bldyYXBwZXIuYXBwZW5kQ2hpbGQobW92ZU9mZmljZXJCdG4pO1xuYnRuV3JhcHBlci5hcHBlbmRDaGlsZCh1bmRvQnRuKTtcbmJ0bldyYXBwZXIuYXBwZW5kQ2hpbGQocmVkb0J0bik7XG5hcHBXcmFwcGVyLmFwcGVuZENoaWxkKGJ0bldyYXBwZXIpO1xuLyogZW5kIGZ1bmN0aW9uIGJ1dHRvbiBhc3NpZ24gKi9cbnZhciBsaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsaXN0XCIpO1xucmVuZGVyU3VicyhnZW5lcmFsLnN1Ym9yZGluYXRlcywgbGlzdCk7XG4iLCJpbXBvcnQgeyBPZmZpY2VyIH0gZnJvbSBcIi4vY2xhc3NcIjtcbmltcG9ydCB7IEFwcCB9IGZyb20gXCIuL2luZGV4XCI7XG5leHBvcnQgdmFyIHJlbmRlckNvbG9yID0gZnVuY3Rpb24gKHBvc2l0aW9uKSB7IHJldHVybiAocG9zaXRpb24gJSAyID09IDAgPyBcIiMxOTcxQzJcIiA6IFwiI0ZBNTI1MlwiKTsgfTtcbmV4cG9ydCB2YXIgZ2VuZXJhdGVJZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHBhcnNlSW50KE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMTApLnNsaWNlKDIpKTsgfTtcbmV4cG9ydCB2YXIgcmVSZW5kZXJMaXN0ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBsaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsaXN0XCIpO1xuICAgIGxpc3QgPT09IG51bGwgfHwgbGlzdCA9PT0gdm9pZCAwID8gdm9pZCAwIDogbGlzdC5yZXBsYWNlQ2hpbGRyZW4oKTtcbiAgICByZW5kZXJTdWJzKEFwcC5nZW5lcmFsLnN1Ym9yZGluYXRlcywgbGlzdCk7XG59O1xuZXhwb3J0IHZhciByZW5kZXJTdWJzID0gZnVuY3Rpb24gKHN1YnMsIGxpc3QpIHtcbiAgICBzdWJzLmZvckVhY2goZnVuY3Rpb24gKHN1YkVsKSB7XG4gICAgICAgIHZhciBvZmZpY2VyQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgb2ZmaWNlckJ0bi5jbGFzc05hbWUgPSBcIm9mZmljZXJcIjtcbiAgICAgICAgb2ZmaWNlckJ0bi5pZCA9IHN1YkVsLmlkLnRvU3RyaW5nKCk7XG4gICAgICAgIG9mZmljZXJCdG4uc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJtYXJnaW4tbGVmdDogXCIuY29uY2F0KHN1YkVsLnJhbmsgKiA0LCBcInJlbTsgYmFja2dyb3VuZC1jb2xvcjogXCIpLmNvbmNhdChyZW5kZXJDb2xvcihzdWJFbC5yYW5rKSwgXCI7XCIpKTtcbiAgICAgICAgb2ZmaWNlckJ0bi5pbm5lclRleHQgPSBzdWJFbC5uYW1lO1xuICAgICAgICBvZmZpY2VyQnRuLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBzZXRPZmZpY2VyRm9yTW92ZShzdWJFbC5pZCwgb2ZmaWNlckJ0bik7IH07XG4gICAgICAgIHZhciBhZGRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICBhZGRCdG4uY2xhc3NOYW1lID0gXCJhZGQtYnRuXCI7XG4gICAgICAgIGFkZEJ0bi5pZCA9IFwiYWRkLWJ0bi1cIi5jb25jYXQoc3ViRWwuaWQpO1xuICAgICAgICBhZGRCdG4uaW5uZXJUZXh0ID0gXCIrXCI7XG4gICAgICAgIGFkZEJ0bi5vbmNsaWNrID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gaGFuZGxlSW5wdXQoYWRkQnRuLCBzdWJFbCk7IH07XG4gICAgICAgIHZhciBub2RlV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIG5vZGVXcmFwcGVyLmNsYXNzTmFtZSA9IFwibm9kZS13cmFwcGVyXCI7XG4gICAgICAgIG5vZGVXcmFwcGVyLmFwcGVuZENoaWxkKG9mZmljZXJCdG4pO1xuICAgICAgICBub2RlV3JhcHBlci5hcHBlbmRDaGlsZChhZGRCdG4pO1xuICAgICAgICBsaXN0ID09PSBudWxsIHx8IGxpc3QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGxpc3QuYXBwZW5kQ2hpbGQobm9kZVdyYXBwZXIpO1xuICAgICAgICBpZiAoc3ViRWwuc3Vib3JkaW5hdGVzLmxlbmd0aCA+IDApXG4gICAgICAgICAgICByZW5kZXJTdWJzKHN1YkVsLnN1Ym9yZGluYXRlcywgbGlzdCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybjtcbiAgICB9KTtcbn07XG5leHBvcnQgZnVuY3Rpb24gc2V0T2ZmaWNlckZvck1vdmUoc3ViRWxJZCwgb2ZmaWNlckJ0bikge1xuICAgIHZhciBzZWxlY3RlZE9mZmljZXJzID0gQXBwLnNlbGVjdGVkT2ZmaWNlcnM7XG4gICAgaWYgKHNlbGVjdGVkT2ZmaWNlcnMuc29tZShmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIGVsID09PSBzdWJFbElkOyB9KSkge1xuICAgICAgICAvLyByZW1vdmUgc2VsZWN0ZWRPZmZpY2VyXG4gICAgICAgIHZhciB0YXJnZXRTdWJJbmRleCA9IHNlbGVjdGVkT2ZmaWNlcnMuaW5kZXhPZihzdWJFbElkKTtcbiAgICAgICAgaWYgKHRhcmdldFN1YkluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgIHNlbGVjdGVkT2ZmaWNlcnMuc3BsaWNlKHRhcmdldFN1YkluZGV4LCAxKTtcbiAgICAgICAgICAgIG9mZmljZXJCdG4uc3R5bGUub3V0bGluZSA9IFwiXCI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoc2VsZWN0ZWRPZmZpY2Vycy5sZW5ndGggPCAyKSB7XG4gICAgICAgIHNlbGVjdGVkT2ZmaWNlcnMucHVzaChzdWJFbElkKTtcbiAgICAgICAgb2ZmaWNlckJ0bi5zdHlsZS5vdXRsaW5lID0gXCI1cHggYXV0byB3aGl0ZVwiO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVJbnB1dChidG4sIHBhcmVudCkge1xuICAgIHZhciBfYTtcbiAgICBidG4uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIHZhciBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAoX2EgPSBidG4gPT09IG51bGwgfHwgYnRuID09PSB2b2lkIDAgPyB2b2lkIDAgOiBidG4ucGFyZW50RWxlbWVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmFwcGVuZENoaWxkKGlucHV0KTtcbiAgICBpbnB1dC5mb2N1cygpO1xuICAgIGlucHV0Lm9uYmx1ciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaW5wdXQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBidG4uc3R5bGUuZGlzcGxheSA9IFwiXCI7XG4gICAgfTtcbiAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5rZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgICAgICAgaWYgKGlucHV0LnZhbHVlID09PSBcIlwiKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIHZhciBzdWIgPSBuZXcgT2ZmaWNlcihnZW5lcmF0ZUlkKCksIGlucHV0LnZhbHVlLCBbXSk7XG4gICAgICAgICAgICBwYXJlbnQuYWRkU3ViKHN1Yik7XG4gICAgICAgICAgICBpbnB1dC52YWx1ZSA9IFwiXCI7XG4gICAgICAgICAgICBpbnB1dC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICByZVJlbmRlckxpc3QoKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==