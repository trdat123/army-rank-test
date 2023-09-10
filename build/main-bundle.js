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
    ArmyRankingApp.prototype.removeAction = function (id) {
        return (this.actionStore = this.actionStore.filter(function (el) { return el.id !== id; }));
    };
    ArmyRankingApp.prototype.getSubById = function (id, subArray, curManager) {
        var res = { sub: undefined, manager: curManager };
        if (id === 100) {
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
appWrapper.innerHTML = /* html */ "\n    <h1>Army Rank</h1>\n        <button id=\"".concat(general.id, "\" class=\"officer\"\n            style=\"margin-left: ").concat(general.rank * 4, "rem; background-color: #1a1a1a\"\n        >\n            ").concat(general.name, "\n        </button>\n    <div id=\"list\"></div>\n    ");
var generalBtn = document.getElementById("100");
generalBtn.onclick = function () { return (0,_utils__WEBPACK_IMPORTED_MODULE_1__.setOfficerForMove)(general.id, generalBtn); };
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
/* harmony export */   reRenderList: () => (/* binding */ reRenderList),
/* harmony export */   renderColor: () => (/* binding */ renderColor),
/* harmony export */   renderSubs: () => (/* binding */ renderSubs),
/* harmony export */   setOfficerForMove: () => (/* binding */ setOfficerForMove)
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/index.ts");

var renderColor = function (position) { return (position % 2 == 0 ? "#1971C2" : "#FA5252"); };
var generateId = function () { return "id" + Math.random().toString(16).slice(2); };
var reRenderList = function () {
    var list = document.getElementById("list");
    list === null || list === void 0 ? void 0 : list.replaceChildren();
    renderSubs(_index__WEBPACK_IMPORTED_MODULE_0__.App.general.subordinates, list);
};
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzLnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly8vd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdlbmVyYXRlSWQsIHJlUmVuZGVyTGlzdCB9IGZyb20gXCIuL3V0aWxzXCI7XG52YXIgT2ZmaWNlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPZmZpY2VyKGlkLCBuYW1lLCBzdWJzKSB7XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5zdWJvcmRpbmF0ZXMgPSBzdWJzO1xuICAgICAgICB0aGlzLnJhbmsgPSAxO1xuICAgICAgICB0aGlzLmlzU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgT2ZmaWNlci5wcm90b3R5cGUudXBkYXRlU3Vic1JhbmsgPSBmdW5jdGlvbiAoc3ViQXJyYXksIHZhcmlhdGlvbikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBzdWJBcnJheS5mb3JFYWNoKGZ1bmN0aW9uIChzdWJFbCkge1xuICAgICAgICAgICAgaWYgKHZhcmlhdGlvbiA9PSBcInVwUmFua1wiKVxuICAgICAgICAgICAgICAgIHN1YkVsLnJhbmstLTtcbiAgICAgICAgICAgIGlmICh2YXJpYXRpb24gPT0gXCJkb3duUmFua1wiKVxuICAgICAgICAgICAgICAgIHN1YkVsLnJhbmsrKztcbiAgICAgICAgICAgIGlmIChzdWJFbC5zdWJvcmRpbmF0ZXMubGVuZ3RoID4gMClcbiAgICAgICAgICAgICAgICBfdGhpcy51cGRhdGVTdWJzUmFuayhzdWJFbC5zdWJvcmRpbmF0ZXMsIHZhcmlhdGlvbik7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE9mZmljZXIucHJvdG90eXBlLmFkZFN1YiA9IGZ1bmN0aW9uIChvZmZpY2VyLCB1cGRhdGVDaGlsZFJhbmspIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBvZmZpY2VyLnJhbmsgPSB0aGlzLnJhbmsgKyAxO1xuICAgICAgICBpZiAob2ZmaWNlci5zdWJvcmRpbmF0ZXMubGVuZ3RoID4gMCAmJiB1cGRhdGVDaGlsZFJhbmspIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU3Vic1Jhbmsob2ZmaWNlci5zdWJvcmRpbmF0ZXMsIHVwZGF0ZUNoaWxkUmFuayk7XG4gICAgICAgIH1cbiAgICAgICAgKF9hID0gdGhpcy5zdWJvcmRpbmF0ZXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5wdXNoKG9mZmljZXIpO1xuICAgIH07XG4gICAgT2ZmaWNlci5wcm90b3R5cGUucmVtb3ZlU3ViID0gZnVuY3Rpb24gKG9mZmljZXIpIHtcbiAgICAgICAgdmFyIHRhcmdldFN1YkluZGV4ID0gdGhpcy5zdWJvcmRpbmF0ZXMuaW5kZXhPZihvZmZpY2VyKTtcbiAgICAgICAgaWYgKHRhcmdldFN1YkluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuc3Vib3JkaW5hdGVzLnNwbGljZSh0YXJnZXRTdWJJbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBPZmZpY2VyO1xufSgpKTtcbmV4cG9ydCB7IE9mZmljZXIgfTtcbnZhciBBcm15UmFua2luZ0FwcCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBcm15UmFua2luZ0FwcCgpIHtcbiAgICAgICAgdmFyIGdlbmVyYWwgPSBuZXcgT2ZmaWNlcigxMDAsIFwiTU1QXCIsIFtdKTtcbiAgICAgICAgdGhpcy5nZW5lcmFsID0gZ2VuZXJhbDtcbiAgICAgICAgdGhpcy5zZWxlY3RlZE9mZmljZXJzID0gW107XG4gICAgICAgIHRoaXMuYWN0aW9uU3RvcmUgPSBbXTtcbiAgICAgICAgdmFyIHN1YjIgPSBuZXcgT2ZmaWNlcigyMDAsIFwiSm9obiBXZWFrXCIsIFtdKTtcbiAgICAgICAgdmFyIHN1YjMgPSBuZXcgT2ZmaWNlcigzMDAsIFwiSm9obiBDZW5hXCIsIFtdKTtcbiAgICAgICAgdmFyIHN1YjQgPSBuZXcgT2ZmaWNlcig0MDAsIFwiQmVuXCIsIFtdKTtcbiAgICAgICAgdmFyIHN1YjUgPSBuZXcgT2ZmaWNlcig1MDAsIFwiQ29vcGVyXCIsIFtdKTtcbiAgICAgICAgdmFyIHN1YjYgPSBuZXcgT2ZmaWNlcig2MDAsIFwiQVwiLCBbXSk7XG4gICAgICAgIHZhciBzdWI3ID0gbmV3IE9mZmljZXIoNzAwLCBcIkJcIiwgW10pO1xuICAgICAgICB2YXIgc3ViOCA9IG5ldyBPZmZpY2VyKDgwMCwgXCJDXCIsIFtdKTtcbiAgICAgICAgdmFyIHN1YjkgPSBuZXcgT2ZmaWNlcig5MDAsIFwiRFwiLCBbXSk7XG4gICAgICAgIHZhciBzdWIxMCA9IG5ldyBPZmZpY2VyKDEwMDAsIFwiRVwiLCBbXSk7XG4gICAgICAgIGdlbmVyYWwuYWRkU3ViKHN1YjIpO1xuICAgICAgICBnZW5lcmFsLmFkZFN1YihzdWIzKTtcbiAgICAgICAgc3ViMi5hZGRTdWIoc3ViNik7XG4gICAgICAgIHN1YjMuYWRkU3ViKHN1YjQpO1xuICAgICAgICBzdWIzLmFkZFN1YihzdWI1KTtcbiAgICAgICAgc3ViNC5hZGRTdWIoc3ViNyk7XG4gICAgICAgIHN1YjQuYWRkU3ViKHN1YjgpO1xuICAgICAgICBzdWI4LmFkZFN1YihzdWI5KTtcbiAgICAgICAgc3ViOS5hZGRTdWIoc3ViMTApO1xuICAgIH1cbiAgICBBcm15UmFua2luZ0FwcC5wcm90b3R5cGUucmVtb3ZlQWN0aW9uID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5hY3Rpb25TdG9yZSA9IHRoaXMuYWN0aW9uU3RvcmUuZmlsdGVyKGZ1bmN0aW9uIChlbCkgeyByZXR1cm4gZWwuaWQgIT09IGlkOyB9KSk7XG4gICAgfTtcbiAgICBBcm15UmFua2luZ0FwcC5wcm90b3R5cGUuZ2V0U3ViQnlJZCA9IGZ1bmN0aW9uIChpZCwgc3ViQXJyYXksIGN1ck1hbmFnZXIpIHtcbiAgICAgICAgdmFyIHJlcyA9IHsgc3ViOiB1bmRlZmluZWQsIG1hbmFnZXI6IGN1ck1hbmFnZXIgfTtcbiAgICAgICAgaWYgKGlkID09PSAxMDApIHtcbiAgICAgICAgICAgIHJlcy5zdWIgPSB0aGlzLmdlbmVyYWw7XG4gICAgICAgIH1cbiAgICAgICAgc3ViQXJyYXkgPSBzdWJBcnJheSAhPT0gbnVsbCAmJiBzdWJBcnJheSAhPT0gdm9pZCAwID8gc3ViQXJyYXkgOiB0aGlzLmdlbmVyYWwuc3Vib3JkaW5hdGVzO1xuICAgICAgICBjdXJNYW5hZ2VyID0gY3VyTWFuYWdlciAhPT0gbnVsbCAmJiBjdXJNYW5hZ2VyICE9PSB2b2lkIDAgPyBjdXJNYW5hZ2VyIDogdGhpcy5nZW5lcmFsO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIHN1YkFycmF5XzEgPSBzdWJBcnJheTsgX2kgPCBzdWJBcnJheV8xLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFyIGVsID0gc3ViQXJyYXlfMVtfaV07XG4gICAgICAgICAgICBpZiAoZWwuaWQgPT09IGlkKSB7XG4gICAgICAgICAgICAgICAgcmVzLnN1YiA9IGVsO1xuICAgICAgICAgICAgICAgIHJlcy5tYW5hZ2VyID0gY3VyTWFuYWdlcjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCFyZXMuc3ViICYmIGVsLnN1Ym9yZGluYXRlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgcmVzID0gdGhpcy5nZXRTdWJCeUlkKGlkLCBlbC5zdWJvcmRpbmF0ZXMsIGVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH07XG4gICAgQXJteVJhbmtpbmdBcHAucHJvdG90eXBlLm1vdmVPZmZpY2VyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX2EgPSB0aGlzLnNlbGVjdGVkT2ZmaWNlcnMsIHN1YklkID0gX2FbMF0sIG5ld01hbmFnZXJJZCA9IF9hWzFdO1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZE9mZmljZXJzLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgIGFsZXJ0KFwiU29tZXRoaW5nIHdyb25nLCBub3QgZW5vdWdoIGRhdGFcIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIF9iID0gdGhpcy5nZXRTdWJCeUlkKHN1YklkKSwgc3ViID0gX2Iuc3ViLCBjdXJNYW5hZ2VyID0gX2IubWFuYWdlcjtcbiAgICAgICAgdmFyIG5ld01hbmFnZXIgPSB0aGlzLmdldFN1YkJ5SWQobmV3TWFuYWdlcklkKS5zdWI7XG4gICAgICAgIHZhciBzdWJDaGlsZCA9IFtdO1xuICAgICAgICAvLyBtb3ZlIHN1YidzIHN1Ym9yZGluYXRlcyBhcnJheSB1cCB0byAxIHJhbmtcbiAgICAgICAgc3ViID09PSBudWxsIHx8IHN1YiA9PT0gdm9pZCAwID8gdm9pZCAwIDogc3ViLnN1Ym9yZGluYXRlcy5mb3JFYWNoKGZ1bmN0aW9uIChzdWIpIHtcbiAgICAgICAgICAgIGN1ck1hbmFnZXIgPT09IG51bGwgfHwgY3VyTWFuYWdlciA9PT0gdm9pZCAwID8gdm9pZCAwIDogY3VyTWFuYWdlci5hZGRTdWIoc3ViLCBcInVwUmFua1wiKTtcbiAgICAgICAgICAgIHN1YkNoaWxkLnB1c2goc3ViKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHN1Yi5zdWJvcmRpbmF0ZXMgPSBbXTtcbiAgICAgICAgdGhpcy5hY3Rpb25TdG9yZS5wdXNoKHtcbiAgICAgICAgICAgIGlkOiBnZW5lcmF0ZUlkKCksXG4gICAgICAgICAgICBhY3Rpb246IFwidW5kb1wiLFxuICAgICAgICAgICAgc3ViOiBzdWIsXG4gICAgICAgICAgICBvbGRNYW5hZ2VyOiBjdXJNYW5hZ2VyLFxuICAgICAgICAgICAgY3VyTWFuYWdlcjogbmV3TWFuYWdlcixcbiAgICAgICAgICAgIHN1YkNoaWxkOiBzdWJDaGlsZCxcbiAgICAgICAgfSk7XG4gICAgICAgIGN1ck1hbmFnZXIgPT09IG51bGwgfHwgY3VyTWFuYWdlciA9PT0gdm9pZCAwID8gdm9pZCAwIDogY3VyTWFuYWdlci5yZW1vdmVTdWIoc3ViKTtcbiAgICAgICAgbmV3TWFuYWdlciA9PT0gbnVsbCB8fCBuZXdNYW5hZ2VyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBuZXdNYW5hZ2VyLmFkZFN1YihzdWIpO1xuICAgICAgICByZVJlbmRlckxpc3QoKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZE9mZmljZXJzID0gW107XG4gICAgfTtcbiAgICBBcm15UmFua2luZ0FwcC5wcm90b3R5cGUudW5kbyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gZ2V0IGxhc3QgdW5kbyBhY3Rpb25cbiAgICAgICAgdmFyIGFjdGlvbiA9IHRoaXMuYWN0aW9uU3RvcmUuZmluZExhc3QoZnVuY3Rpb24gKGVsKSB7IHJldHVybiBlbC5hY3Rpb24gPT09IFwidW5kb1wiOyB9KTtcbiAgICAgICAgaWYgKCFhY3Rpb24pXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHZhciBpZCA9IGFjdGlvbi5pZCwgc3ViID0gYWN0aW9uLnN1Yiwgb2xkTWFuYWdlciA9IGFjdGlvbi5vbGRNYW5hZ2VyLCBjdXJNYW5hZ2VyID0gYWN0aW9uLmN1ck1hbmFnZXIsIHN1YkNoaWxkID0gYWN0aW9uLnN1YkNoaWxkO1xuICAgICAgICBvbGRNYW5hZ2VyID09PSBudWxsIHx8IG9sZE1hbmFnZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9sZE1hbmFnZXIuYWRkU3ViKHN1Yik7XG4gICAgICAgIGN1ck1hbmFnZXIgPT09IG51bGwgfHwgY3VyTWFuYWdlciA9PT0gdm9pZCAwID8gdm9pZCAwIDogY3VyTWFuYWdlci5yZW1vdmVTdWIoc3ViKTtcbiAgICAgICAgc3ViQ2hpbGQgPT09IG51bGwgfHwgc3ViQ2hpbGQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHN1YkNoaWxkLmZvckVhY2goZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgICAgICAgICBzdWIgPT09IG51bGwgfHwgc3ViID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzdWIuYWRkU3ViKGNoaWxkLCBcImRvd25SYW5rXCIpO1xuICAgICAgICAgICAgb2xkTWFuYWdlciA9PT0gbnVsbCB8fCBvbGRNYW5hZ2VyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvbGRNYW5hZ2VyLnJlbW92ZVN1YihjaGlsZCk7XG4gICAgICAgIH0pO1xuICAgICAgICByZVJlbmRlckxpc3QoKTtcbiAgICAgICAgdGhpcy5yZW1vdmVBY3Rpb24oaWQpO1xuICAgICAgICB0aGlzLmFjdGlvblN0b3JlLnB1c2goe1xuICAgICAgICAgICAgaWQ6IGdlbmVyYXRlSWQoKSxcbiAgICAgICAgICAgIGFjdGlvbjogXCJyZWRvXCIsXG4gICAgICAgICAgICBzdWI6IHN1YixcbiAgICAgICAgICAgIGN1ck1hbmFnZXI6IG9sZE1hbmFnZXIsXG4gICAgICAgICAgICBuZXdNYW5hZ2VyOiBjdXJNYW5hZ2VyLFxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEFybXlSYW5raW5nQXBwLnByb3RvdHlwZS5yZWRvID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBnZXQgbGFzdCByZWRvIGFjdGlvblxuICAgICAgICB2YXIgYWN0aW9uID0gdGhpcy5hY3Rpb25TdG9yZS5maW5kTGFzdChmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIGVsLmFjdGlvbiA9PT0gXCJyZWRvXCI7IH0pO1xuICAgICAgICBpZiAoIWFjdGlvbilcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdmFyIGlkID0gYWN0aW9uLmlkLCBzdWIgPSBhY3Rpb24uc3ViLCBjdXJNYW5hZ2VyID0gYWN0aW9uLmN1ck1hbmFnZXIsIG5ld01hbmFnZXIgPSBhY3Rpb24ubmV3TWFuYWdlcjtcbiAgICAgICAgdmFyIHN1YkNoaWxkID0gW107XG4gICAgICAgIHN1YiA9PT0gbnVsbCB8fCBzdWIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHN1Yi5zdWJvcmRpbmF0ZXMuZm9yRWFjaChmdW5jdGlvbiAoc3ViKSB7XG4gICAgICAgICAgICBjdXJNYW5hZ2VyID09PSBudWxsIHx8IGN1ck1hbmFnZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGN1ck1hbmFnZXIuYWRkU3ViKHN1YiwgXCJ1cFJhbmtcIik7XG4gICAgICAgICAgICBzdWJDaGlsZC5wdXNoKHN1Yik7XG4gICAgICAgIH0pO1xuICAgICAgICBzdWIuc3Vib3JkaW5hdGVzID0gW107XG4gICAgICAgIHRoaXMuYWN0aW9uU3RvcmUucHVzaCh7XG4gICAgICAgICAgICBpZDogZ2VuZXJhdGVJZCgpLFxuICAgICAgICAgICAgYWN0aW9uOiBcInVuZG9cIixcbiAgICAgICAgICAgIHN1Yjogc3ViLFxuICAgICAgICAgICAgb2xkTWFuYWdlcjogY3VyTWFuYWdlcixcbiAgICAgICAgICAgIGN1ck1hbmFnZXI6IG5ld01hbmFnZXIsXG4gICAgICAgICAgICBzdWJDaGlsZDogc3ViQ2hpbGQsXG4gICAgICAgIH0pO1xuICAgICAgICBjdXJNYW5hZ2VyID09PSBudWxsIHx8IGN1ck1hbmFnZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGN1ck1hbmFnZXIucmVtb3ZlU3ViKHN1Yik7XG4gICAgICAgIG5ld01hbmFnZXIgPT09IG51bGwgfHwgbmV3TWFuYWdlciA9PT0gdm9pZCAwID8gdm9pZCAwIDogbmV3TWFuYWdlci5hZGRTdWIoc3ViKTtcbiAgICAgICAgcmVSZW5kZXJMaXN0KCk7XG4gICAgICAgIHRoaXMucmVtb3ZlQWN0aW9uKGlkKTtcbiAgICB9O1xuICAgIHJldHVybiBBcm15UmFua2luZ0FwcDtcbn0oKSk7XG5leHBvcnQgeyBBcm15UmFua2luZ0FwcCB9O1xuIiwiaW1wb3J0IHsgQXJteVJhbmtpbmdBcHAgfSBmcm9tIFwiLi9jbGFzc1wiO1xuaW1wb3J0IHsgcmVuZGVyU3Vicywgc2V0T2ZmaWNlckZvck1vdmUgfSBmcm9tIFwiLi91dGlsc1wiO1xuZXhwb3J0IHZhciBBcHAgPSBuZXcgQXJteVJhbmtpbmdBcHAoKTtcbnZhciBnZW5lcmFsID0gQXBwLmdlbmVyYWw7XG52YXIgYXBwV3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXBwXCIpO1xuYXBwV3JhcHBlci5pbm5lckhUTUwgPSAvKiBodG1sICovIFwiXFxuICAgIDxoMT5Bcm15IFJhbms8L2gxPlxcbiAgICAgICAgPGJ1dHRvbiBpZD1cXFwiXCIuY29uY2F0KGdlbmVyYWwuaWQsIFwiXFxcIiBjbGFzcz1cXFwib2ZmaWNlclxcXCJcXG4gICAgICAgICAgICBzdHlsZT1cXFwibWFyZ2luLWxlZnQ6IFwiKS5jb25jYXQoZ2VuZXJhbC5yYW5rICogNCwgXCJyZW07IGJhY2tncm91bmQtY29sb3I6ICMxYTFhMWFcXFwiXFxuICAgICAgICA+XFxuICAgICAgICAgICAgXCIpLmNvbmNhdChnZW5lcmFsLm5hbWUsIFwiXFxuICAgICAgICA8L2J1dHRvbj5cXG4gICAgPGRpdiBpZD1cXFwibGlzdFxcXCI+PC9kaXY+XFxuICAgIFwiKTtcbnZhciBnZW5lcmFsQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCIxMDBcIik7XG5nZW5lcmFsQnRuLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBzZXRPZmZpY2VyRm9yTW92ZShnZW5lcmFsLmlkLCBnZW5lcmFsQnRuKTsgfTtcbi8qIGZ1bmN0aW9uIGJ1dHRvbiBhc3NpZ24gKi9cbnZhciBtb3ZlT2ZmaWNlckJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5tb3ZlT2ZmaWNlckJ0bi5pbm5lclRleHQgPSBcIk1vdmUgT2ZmaWNlclwiO1xubW92ZU9mZmljZXJCdG4ub25jbGljayA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIEFwcC5tb3ZlT2ZmaWNlcigpOyB9O1xudmFyIHVuZG9CdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xudW5kb0J0bi5pbm5lclRleHQgPSBcIlVuZG9cIjtcbnVuZG9CdG4ub25jbGljayA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIEFwcC51bmRvKCk7IH07XG52YXIgcmVkb0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5yZWRvQnRuLmlubmVyVGV4dCA9IFwiUmVkb1wiO1xucmVkb0J0bi5vbmNsaWNrID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gQXBwLnJlZG8oKTsgfTtcbnZhciBidG5XcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbmJ0bldyYXBwZXIuY2xhc3NOYW1lID0gXCJidG4td3JhcHBlclwiO1xuYnRuV3JhcHBlci5hcHBlbmRDaGlsZChtb3ZlT2ZmaWNlckJ0bik7XG5idG5XcmFwcGVyLmFwcGVuZENoaWxkKHVuZG9CdG4pO1xuYnRuV3JhcHBlci5hcHBlbmRDaGlsZChyZWRvQnRuKTtcbmFwcFdyYXBwZXIuYXBwZW5kQ2hpbGQoYnRuV3JhcHBlcik7XG4vKiBlbmQgZnVuY3Rpb24gYnV0dG9uIGFzc2lnbiAqL1xudmFyIGxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxpc3RcIik7XG5yZW5kZXJTdWJzKGdlbmVyYWwuc3Vib3JkaW5hdGVzLCBsaXN0KTtcbiIsImltcG9ydCB7IEFwcCB9IGZyb20gXCIuL2luZGV4XCI7XG5leHBvcnQgdmFyIHJlbmRlckNvbG9yID0gZnVuY3Rpb24gKHBvc2l0aW9uKSB7IHJldHVybiAocG9zaXRpb24gJSAyID09IDAgPyBcIiMxOTcxQzJcIiA6IFwiI0ZBNTI1MlwiKTsgfTtcbmV4cG9ydCB2YXIgZ2VuZXJhdGVJZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFwiaWRcIiArIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMTYpLnNsaWNlKDIpOyB9O1xuZXhwb3J0IHZhciByZVJlbmRlckxpc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxpc3RcIik7XG4gICAgbGlzdCA9PT0gbnVsbCB8fCBsaXN0ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBsaXN0LnJlcGxhY2VDaGlsZHJlbigpO1xuICAgIHJlbmRlclN1YnMoQXBwLmdlbmVyYWwuc3Vib3JkaW5hdGVzLCBsaXN0KTtcbn07XG5leHBvcnQgdmFyIHJlbmRlclN1YnMgPSBmdW5jdGlvbiAoc3VicywgbGlzdCkge1xuICAgIHN1YnMuZm9yRWFjaChmdW5jdGlvbiAoc3ViRWwpIHtcbiAgICAgICAgdmFyIG9mZmljZXJCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICBvZmZpY2VyQnRuLmNsYXNzTmFtZSA9IFwib2ZmaWNlclwiO1xuICAgICAgICBvZmZpY2VyQnRuLmlkID0gc3ViRWwuaWQudG9TdHJpbmcoKTtcbiAgICAgICAgb2ZmaWNlckJ0bi5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcIm1hcmdpbi1sZWZ0OiBcIi5jb25jYXQoc3ViRWwucmFuayAqIDQsIFwicmVtOyBiYWNrZ3JvdW5kLWNvbG9yOiBcIikuY29uY2F0KHJlbmRlckNvbG9yKHN1YkVsLnJhbmspLCBcIjtcIikpO1xuICAgICAgICBvZmZpY2VyQnRuLmlubmVyVGV4dCA9IHN1YkVsLm5hbWU7XG4gICAgICAgIG9mZmljZXJCdG4ub25jbGljayA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNldE9mZmljZXJGb3JNb3ZlKHN1YkVsLmlkLCBvZmZpY2VyQnRuKTsgfTtcbiAgICAgICAgbGlzdCA9PT0gbnVsbCB8fCBsaXN0ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBsaXN0LmFwcGVuZENoaWxkKG9mZmljZXJCdG4pO1xuICAgICAgICBpZiAoc3ViRWwuc3Vib3JkaW5hdGVzLmxlbmd0aCA+IDApXG4gICAgICAgICAgICByZW5kZXJTdWJzKHN1YkVsLnN1Ym9yZGluYXRlcywgbGlzdCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybjtcbiAgICB9KTtcbn07XG5leHBvcnQgZnVuY3Rpb24gc2V0T2ZmaWNlckZvck1vdmUoc3ViRWxJZCwgb2ZmaWNlckJ0bikge1xuICAgIHZhciBzZWxlY3RlZE9mZmljZXJzID0gQXBwLnNlbGVjdGVkT2ZmaWNlcnM7XG4gICAgaWYgKHNlbGVjdGVkT2ZmaWNlcnMuc29tZShmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIGVsID09PSBzdWJFbElkOyB9KSkge1xuICAgICAgICAvLyByZW1vdmUgc2VsZWN0ZWRPZmZpY2VyXG4gICAgICAgIHZhciB0YXJnZXRTdWJJbmRleCA9IHNlbGVjdGVkT2ZmaWNlcnMuaW5kZXhPZihzdWJFbElkKTtcbiAgICAgICAgaWYgKHRhcmdldFN1YkluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgIHNlbGVjdGVkT2ZmaWNlcnMuc3BsaWNlKHRhcmdldFN1YkluZGV4LCAxKTtcbiAgICAgICAgICAgIG9mZmljZXJCdG4uc3R5bGUub3V0bGluZSA9IFwiXCI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoc2VsZWN0ZWRPZmZpY2Vycy5sZW5ndGggPCAyKSB7XG4gICAgICAgIHNlbGVjdGVkT2ZmaWNlcnMucHVzaChzdWJFbElkKTtcbiAgICAgICAgb2ZmaWNlckJ0bi5zdHlsZS5vdXRsaW5lID0gXCI1cHggYXV0byB3aGl0ZVwiO1xuICAgIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=