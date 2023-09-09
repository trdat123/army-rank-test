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
        // save inverse actions
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFtRDtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDa0I7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELHdCQUF3QjtBQUN4RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0Isa0RBQVU7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsUUFBUSxvREFBWTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtEQUErRCw4QkFBOEI7QUFDN0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxRQUFRLG9EQUFZO0FBQ3BCLG1FQUFtRSxzQkFBc0I7QUFDekY7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUN5Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuSWU7QUFDZTtBQUNqRCxjQUFjLGtEQUFjO0FBQ25DO0FBQ0E7QUFDQSxpTUFBaU07QUFDak07QUFDQSxtQ0FBbUMsT0FBTyx5REFBaUI7QUFDM0Q7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBLGdDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMUJvQjtBQUN2Qix3Q0FBd0M7QUFDeEMsK0JBQStCO0FBQy9CO0FBQ1A7QUFDQTtBQUNBLGVBQWUsdUNBQUc7QUFDbEI7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0ZBQXNGLHVEQUF1RDtBQUM3STtBQUNBLDJDQUEyQztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ087QUFDUCwyQkFBMkIsdUNBQUc7QUFDOUIsOENBQThDLHdCQUF3QjtBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUNyQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3MudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy91dGlscy50cyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly8vd2VicGFjay9zdGFydHVwIiwid2VicGFjazovLy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2VuZXJhdGVJZCwgcmVSZW5kZXJMaXN0IH0gZnJvbSBcIi4vdXRpbHNcIjtcbnZhciBPZmZpY2VyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE9mZmljZXIoaWQsIG5hbWUsIHN1YnMpIHtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnN1Ym9yZGluYXRlcyA9IHN1YnM7XG4gICAgICAgIHRoaXMucmFuayA9IDE7XG4gICAgICAgIHRoaXMuaXNTZWxlY3RlZCA9IGZhbHNlO1xuICAgIH1cbiAgICBPZmZpY2VyLnByb3RvdHlwZS51cGRhdGVTdWJzUmFuayA9IGZ1bmN0aW9uIChzdWJBcnJheSwgdmFyaWF0aW9uKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHN1YkFycmF5LmZvckVhY2goZnVuY3Rpb24gKHN1YkVsKSB7XG4gICAgICAgICAgICBpZiAodmFyaWF0aW9uID09IFwidXBSYW5rXCIpXG4gICAgICAgICAgICAgICAgc3ViRWwucmFuay0tO1xuICAgICAgICAgICAgaWYgKHZhcmlhdGlvbiA9PSBcImRvd25SYW5rXCIpXG4gICAgICAgICAgICAgICAgc3ViRWwucmFuaysrO1xuICAgICAgICAgICAgaWYgKHN1YkVsLnN1Ym9yZGluYXRlcy5sZW5ndGggPiAwKVxuICAgICAgICAgICAgICAgIF90aGlzLnVwZGF0ZVN1YnNSYW5rKHN1YkVsLnN1Ym9yZGluYXRlcywgdmFyaWF0aW9uKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgT2ZmaWNlci5wcm90b3R5cGUuYWRkU3ViID0gZnVuY3Rpb24gKG9mZmljZXIsIHVwZGF0ZUNoaWxkUmFuaykge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIG9mZmljZXIucmFuayA9IHRoaXMucmFuayArIDE7XG4gICAgICAgIGlmIChvZmZpY2VyLnN1Ym9yZGluYXRlcy5sZW5ndGggPiAwICYmIHVwZGF0ZUNoaWxkUmFuaykge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVTdWJzUmFuayhvZmZpY2VyLnN1Ym9yZGluYXRlcywgdXBkYXRlQ2hpbGRSYW5rKTtcbiAgICAgICAgfVxuICAgICAgICAoX2EgPSB0aGlzLnN1Ym9yZGluYXRlcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnB1c2gob2ZmaWNlcik7XG4gICAgfTtcbiAgICBPZmZpY2VyLnByb3RvdHlwZS5yZW1vdmVTdWIgPSBmdW5jdGlvbiAob2ZmaWNlcikge1xuICAgICAgICB2YXIgdGFyZ2V0U3ViSW5kZXggPSB0aGlzLnN1Ym9yZGluYXRlcy5pbmRleE9mKG9mZmljZXIpO1xuICAgICAgICBpZiAodGFyZ2V0U3ViSW5kZXggPiAtMSkge1xuICAgICAgICAgICAgdGhpcy5zdWJvcmRpbmF0ZXMuc3BsaWNlKHRhcmdldFN1YkluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIE9mZmljZXI7XG59KCkpO1xuZXhwb3J0IHsgT2ZmaWNlciB9O1xudmFyIEFybXlSYW5raW5nQXBwID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEFybXlSYW5raW5nQXBwKCkge1xuICAgICAgICB2YXIgZ2VuZXJhbCA9IG5ldyBPZmZpY2VyKDEwMCwgXCJNTVBcIiwgW10pO1xuICAgICAgICB0aGlzLmdlbmVyYWwgPSBnZW5lcmFsO1xuICAgICAgICB0aGlzLnNlbGVjdGVkT2ZmaWNlcnMgPSBbXTtcbiAgICAgICAgdGhpcy5hY3Rpb25TdG9yZSA9IFtdO1xuICAgICAgICB2YXIgc3ViMiA9IG5ldyBPZmZpY2VyKDIwMCwgXCJKb2huIFdlYWtcIiwgW10pO1xuICAgICAgICB2YXIgc3ViMyA9IG5ldyBPZmZpY2VyKDMwMCwgXCJKb2huIENlbmFcIiwgW10pO1xuICAgICAgICB2YXIgc3ViNCA9IG5ldyBPZmZpY2VyKDQwMCwgXCJCZW5cIiwgW10pO1xuICAgICAgICB2YXIgc3ViNSA9IG5ldyBPZmZpY2VyKDUwMCwgXCJDb29wZXJcIiwgW10pO1xuICAgICAgICB2YXIgc3ViNiA9IG5ldyBPZmZpY2VyKDYwMCwgXCJBXCIsIFtdKTtcbiAgICAgICAgdmFyIHN1YjcgPSBuZXcgT2ZmaWNlcig3MDAsIFwiQlwiLCBbXSk7XG4gICAgICAgIHZhciBzdWI4ID0gbmV3IE9mZmljZXIoODAwLCBcIkNcIiwgW10pO1xuICAgICAgICB2YXIgc3ViOSA9IG5ldyBPZmZpY2VyKDkwMCwgXCJEXCIsIFtdKTtcbiAgICAgICAgdmFyIHN1YjEwID0gbmV3IE9mZmljZXIoMTAwMCwgXCJFXCIsIFtdKTtcbiAgICAgICAgZ2VuZXJhbC5hZGRTdWIoc3ViMik7XG4gICAgICAgIGdlbmVyYWwuYWRkU3ViKHN1YjMpO1xuICAgICAgICBzdWIyLmFkZFN1YihzdWI2KTtcbiAgICAgICAgc3ViMy5hZGRTdWIoc3ViNCk7XG4gICAgICAgIHN1YjMuYWRkU3ViKHN1YjUpO1xuICAgICAgICBzdWI0LmFkZFN1YihzdWI3KTtcbiAgICAgICAgc3ViNC5hZGRTdWIoc3ViOCk7XG4gICAgICAgIHN1YjguYWRkU3ViKHN1YjkpO1xuICAgICAgICBzdWI5LmFkZFN1YihzdWIxMCk7XG4gICAgfVxuICAgIEFybXlSYW5raW5nQXBwLnByb3RvdHlwZS5nZXRTdWJCeUlkID0gZnVuY3Rpb24gKGlkLCBzdWJBcnJheSwgY3VyTWFuYWdlcikge1xuICAgICAgICB2YXIgcmVzID0geyBzdWI6IHVuZGVmaW5lZCwgbWFuYWdlcjogY3VyTWFuYWdlciB9O1xuICAgICAgICBpZiAoaWQgPT09IDEwMCkge1xuICAgICAgICAgICAgcmVzLnN1YiA9IHRoaXMuZ2VuZXJhbDtcbiAgICAgICAgfVxuICAgICAgICBzdWJBcnJheSA9IHN1YkFycmF5ICE9PSBudWxsICYmIHN1YkFycmF5ICE9PSB2b2lkIDAgPyBzdWJBcnJheSA6IHRoaXMuZ2VuZXJhbC5zdWJvcmRpbmF0ZXM7XG4gICAgICAgIGN1ck1hbmFnZXIgPSBjdXJNYW5hZ2VyICE9PSBudWxsICYmIGN1ck1hbmFnZXIgIT09IHZvaWQgMCA/IGN1ck1hbmFnZXIgOiB0aGlzLmdlbmVyYWw7XG4gICAgICAgIGZvciAodmFyIF9pID0gMCwgc3ViQXJyYXlfMSA9IHN1YkFycmF5OyBfaSA8IHN1YkFycmF5XzEubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICB2YXIgZWwgPSBzdWJBcnJheV8xW19pXTtcbiAgICAgICAgICAgIGlmIChlbC5pZCA9PT0gaWQpIHtcbiAgICAgICAgICAgICAgICByZXMuc3ViID0gZWw7XG4gICAgICAgICAgICAgICAgcmVzLm1hbmFnZXIgPSBjdXJNYW5hZ2VyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIXJlcy5zdWIgJiYgZWwuc3Vib3JkaW5hdGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICByZXMgPSB0aGlzLmdldFN1YkJ5SWQoaWQsIGVsLnN1Ym9yZGluYXRlcywgZWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfTtcbiAgICBBcm15UmFua2luZ0FwcC5wcm90b3R5cGUubW92ZU9mZmljZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfYSA9IHRoaXMuc2VsZWN0ZWRPZmZpY2Vycywgc3ViSWQgPSBfYVswXSwgbmV3TWFuYWdlcklkID0gX2FbMV07XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkT2ZmaWNlcnMubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgYWxlcnQoXCJTb21ldGhpbmcgd3JvbmcsIG5vdCBlbm91Z2ggZGF0YVwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgX2IgPSB0aGlzLmdldFN1YkJ5SWQoc3ViSWQpLCBzdWIgPSBfYi5zdWIsIGN1ck1hbmFnZXIgPSBfYi5tYW5hZ2VyO1xuICAgICAgICB2YXIgbmV3TWFuYWdlciA9IHRoaXMuZ2V0U3ViQnlJZChuZXdNYW5hZ2VySWQpLnN1YjtcbiAgICAgICAgdmFyIHN1YkNoaWxkID0gW107XG4gICAgICAgIC8vIG1vdmUgc3ViJ3Mgc3Vib3JkaW5hdGVzIGFycmF5IHVwIHRvIDEgcmFua1xuICAgICAgICBzdWIgPT09IG51bGwgfHwgc3ViID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzdWIuc3Vib3JkaW5hdGVzLmZvckVhY2goZnVuY3Rpb24gKHN1Yikge1xuICAgICAgICAgICAgY3VyTWFuYWdlciA9PT0gbnVsbCB8fCBjdXJNYW5hZ2VyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjdXJNYW5hZ2VyLmFkZFN1YihzdWIsIFwidXBSYW5rXCIpO1xuICAgICAgICAgICAgc3ViQ2hpbGQucHVzaChzdWIpO1xuICAgICAgICB9KTtcbiAgICAgICAgc3ViLnN1Ym9yZGluYXRlcyA9IFtdO1xuICAgICAgICAvLyBzYXZlIGludmVyc2UgYWN0aW9uc1xuICAgICAgICB0aGlzLmFjdGlvblN0b3JlLnB1c2goe1xuICAgICAgICAgICAgaWQ6IGdlbmVyYXRlSWQoKSxcbiAgICAgICAgICAgIGFjdGlvbjogXCJ1bmRvXCIsXG4gICAgICAgICAgICBzdWI6IHN1YixcbiAgICAgICAgICAgIG9sZE1hbmFnZXI6IGN1ck1hbmFnZXIsXG4gICAgICAgICAgICBjdXJNYW5hZ2VyOiBuZXdNYW5hZ2VyLFxuICAgICAgICAgICAgc3ViQ2hpbGQ6IHN1YkNoaWxkLFxuICAgICAgICB9KTtcbiAgICAgICAgY3VyTWFuYWdlciA9PT0gbnVsbCB8fCBjdXJNYW5hZ2VyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjdXJNYW5hZ2VyLnJlbW92ZVN1YihzdWIpO1xuICAgICAgICBuZXdNYW5hZ2VyID09PSBudWxsIHx8IG5ld01hbmFnZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG5ld01hbmFnZXIuYWRkU3ViKHN1Yik7XG4gICAgICAgIHJlUmVuZGVyTGlzdCgpO1xuICAgICAgICB0aGlzLnNlbGVjdGVkT2ZmaWNlcnMgPSBbXTtcbiAgICB9O1xuICAgIEFybXlSYW5raW5nQXBwLnByb3RvdHlwZS51bmRvID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBnZXQgbGFzdCB1bmRvIGFjdGlvblxuICAgICAgICB2YXIgYWN0aW9uID0gdGhpcy5hY3Rpb25TdG9yZS5maW5kTGFzdChmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIGVsLmFjdGlvbiA9PT0gXCJ1bmRvXCI7IH0pO1xuICAgICAgICBpZiAoIWFjdGlvbilcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdmFyIGlkID0gYWN0aW9uLmlkLCBzdWIgPSBhY3Rpb24uc3ViLCBvbGRNYW5hZ2VyID0gYWN0aW9uLm9sZE1hbmFnZXIsIGN1ck1hbmFnZXIgPSBhY3Rpb24uY3VyTWFuYWdlciwgc3ViQ2hpbGQgPSBhY3Rpb24uc3ViQ2hpbGQ7XG4gICAgICAgIG9sZE1hbmFnZXIgPT09IG51bGwgfHwgb2xkTWFuYWdlciA9PT0gdm9pZCAwID8gdm9pZCAwIDogb2xkTWFuYWdlci5hZGRTdWIoc3ViKTtcbiAgICAgICAgY3VyTWFuYWdlciA9PT0gbnVsbCB8fCBjdXJNYW5hZ2VyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjdXJNYW5hZ2VyLnJlbW92ZVN1YihzdWIpO1xuICAgICAgICBzdWJDaGlsZCA9PT0gbnVsbCB8fCBzdWJDaGlsZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogc3ViQ2hpbGQuZm9yRWFjaChmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICAgICAgICAgIHN1YiA9PT0gbnVsbCB8fCBzdWIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHN1Yi5hZGRTdWIoY2hpbGQsIFwiZG93blJhbmtcIik7XG4gICAgICAgICAgICBvbGRNYW5hZ2VyID09PSBudWxsIHx8IG9sZE1hbmFnZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9sZE1hbmFnZXIucmVtb3ZlU3ViKGNoaWxkKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJlUmVuZGVyTGlzdCgpO1xuICAgICAgICB0aGlzLmFjdGlvblN0b3JlID0gdGhpcy5hY3Rpb25TdG9yZS5maWx0ZXIoZnVuY3Rpb24gKGVsKSB7IHJldHVybiBlbC5pZCAhPT0gaWQ7IH0pO1xuICAgIH07XG4gICAgQXJteVJhbmtpbmdBcHAucHJvdG90eXBlLnJlZG8gPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgcmV0dXJuIEFybXlSYW5raW5nQXBwO1xufSgpKTtcbmV4cG9ydCB7IEFybXlSYW5raW5nQXBwIH07XG4iLCJpbXBvcnQgeyBBcm15UmFua2luZ0FwcCB9IGZyb20gXCIuL2NsYXNzXCI7XG5pbXBvcnQgeyByZW5kZXJTdWJzLCBzZXRPZmZpY2VyRm9yTW92ZSB9IGZyb20gXCIuL3V0aWxzXCI7XG5leHBvcnQgdmFyIEFwcCA9IG5ldyBBcm15UmFua2luZ0FwcCgpO1xudmFyIGdlbmVyYWwgPSBBcHAuZ2VuZXJhbDtcbnZhciBhcHBXcmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhcHBcIik7XG5hcHBXcmFwcGVyLmlubmVySFRNTCA9IC8qIGh0bWwgKi8gXCJcXG4gICAgPGgxPkFybXkgUmFuazwvaDE+XFxuICAgICAgICA8YnV0dG9uIGlkPVxcXCJcIi5jb25jYXQoZ2VuZXJhbC5pZCwgXCJcXFwiIGNsYXNzPVxcXCJvZmZpY2VyXFxcIlxcbiAgICAgICAgICAgIHN0eWxlPVxcXCJtYXJnaW4tbGVmdDogXCIpLmNvbmNhdChnZW5lcmFsLnJhbmsgKiA0LCBcInJlbTsgYmFja2dyb3VuZC1jb2xvcjogIzFhMWExYVxcXCJcXG4gICAgICAgID5cXG4gICAgICAgICAgICBcIikuY29uY2F0KGdlbmVyYWwubmFtZSwgXCJcXG4gICAgICAgIDwvYnV0dG9uPlxcbiAgICA8ZGl2IGlkPVxcXCJsaXN0XFxcIj48L2Rpdj5cXG4gICAgXCIpO1xudmFyIGdlbmVyYWxCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIjEwMFwiKTtcbmdlbmVyYWxCdG4ub25jbGljayA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNldE9mZmljZXJGb3JNb3ZlKGdlbmVyYWwuaWQsIGdlbmVyYWxCdG4pOyB9O1xuLyogZnVuY3Rpb24gYnV0dG9uIGFzc2lnbiAqL1xudmFyIG1vdmVPZmZpY2VyQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbm1vdmVPZmZpY2VyQnRuLmlubmVyVGV4dCA9IFwiTW92ZSBPZmZpY2VyXCI7XG5tb3ZlT2ZmaWNlckJ0bi5vbmNsaWNrID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gQXBwLm1vdmVPZmZpY2VyKCk7IH07XG52YXIgdW5kb0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG51bmRvQnRuLmlubmVyVGV4dCA9IFwiVW5kb1wiO1xudW5kb0J0bi5vbmNsaWNrID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gQXBwLnVuZG8oKTsgfTtcbnZhciByZWRvQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbnJlZG9CdG4uaW5uZXJUZXh0ID0gXCJSZWRvXCI7XG5yZWRvQnRuLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBBcHAucmVkbygpOyB9O1xudmFyIGJ0bldyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuYnRuV3JhcHBlci5jbGFzc05hbWUgPSBcImJ0bi13cmFwcGVyXCI7XG5idG5XcmFwcGVyLmFwcGVuZENoaWxkKG1vdmVPZmZpY2VyQnRuKTtcbmJ0bldyYXBwZXIuYXBwZW5kQ2hpbGQodW5kb0J0bik7XG5idG5XcmFwcGVyLmFwcGVuZENoaWxkKHJlZG9CdG4pO1xuYXBwV3JhcHBlci5hcHBlbmRDaGlsZChidG5XcmFwcGVyKTtcbi8qIGVuZCBmdW5jdGlvbiBidXR0b24gYXNzaWduICovXG52YXIgbGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGlzdFwiKTtcbnJlbmRlclN1YnMoZ2VuZXJhbC5zdWJvcmRpbmF0ZXMsIGxpc3QpO1xuIiwiaW1wb3J0IHsgQXBwIH0gZnJvbSBcIi4vaW5kZXhcIjtcbmV4cG9ydCB2YXIgcmVuZGVyQ29sb3IgPSBmdW5jdGlvbiAocG9zaXRpb24pIHsgcmV0dXJuIChwb3NpdGlvbiAlIDIgPT0gMCA/IFwiIzE5NzFDMlwiIDogXCIjRkE1MjUyXCIpOyB9O1xuZXhwb3J0IHZhciBnZW5lcmF0ZUlkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gXCJpZFwiICsgTWF0aC5yYW5kb20oKS50b1N0cmluZygxNikuc2xpY2UoMik7IH07XG5leHBvcnQgdmFyIHJlUmVuZGVyTGlzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGlzdFwiKTtcbiAgICBsaXN0ID09PSBudWxsIHx8IGxpc3QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGxpc3QucmVwbGFjZUNoaWxkcmVuKCk7XG4gICAgcmVuZGVyU3VicyhBcHAuZ2VuZXJhbC5zdWJvcmRpbmF0ZXMsIGxpc3QpO1xufTtcbmV4cG9ydCB2YXIgcmVuZGVyU3VicyA9IGZ1bmN0aW9uIChzdWJzLCBsaXN0KSB7XG4gICAgc3Vicy5mb3JFYWNoKGZ1bmN0aW9uIChzdWJFbCkge1xuICAgICAgICB2YXIgb2ZmaWNlckJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgIG9mZmljZXJCdG4uY2xhc3NOYW1lID0gXCJvZmZpY2VyXCI7XG4gICAgICAgIG9mZmljZXJCdG4uaWQgPSBzdWJFbC5pZC50b1N0cmluZygpO1xuICAgICAgICBvZmZpY2VyQnRuLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwibWFyZ2luLWxlZnQ6IFwiLmNvbmNhdChzdWJFbC5yYW5rICogNCwgXCJyZW07IGJhY2tncm91bmQtY29sb3I6IFwiKS5jb25jYXQocmVuZGVyQ29sb3Ioc3ViRWwucmFuayksIFwiO1wiKSk7XG4gICAgICAgIG9mZmljZXJCdG4uaW5uZXJUZXh0ID0gc3ViRWwubmFtZTtcbiAgICAgICAgb2ZmaWNlckJ0bi5vbmNsaWNrID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gc2V0T2ZmaWNlckZvck1vdmUoc3ViRWwuaWQsIG9mZmljZXJCdG4pOyB9O1xuICAgICAgICBsaXN0ID09PSBudWxsIHx8IGxpc3QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGxpc3QuYXBwZW5kQ2hpbGQob2ZmaWNlckJ0bik7XG4gICAgICAgIGlmIChzdWJFbC5zdWJvcmRpbmF0ZXMubGVuZ3RoID4gMClcbiAgICAgICAgICAgIHJlbmRlclN1YnMoc3ViRWwuc3Vib3JkaW5hdGVzLCBsaXN0KTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgIH0pO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBzZXRPZmZpY2VyRm9yTW92ZShzdWJFbElkLCBvZmZpY2VyQnRuKSB7XG4gICAgdmFyIHNlbGVjdGVkT2ZmaWNlcnMgPSBBcHAuc2VsZWN0ZWRPZmZpY2VycztcbiAgICBpZiAoc2VsZWN0ZWRPZmZpY2Vycy5zb21lKGZ1bmN0aW9uIChlbCkgeyByZXR1cm4gZWwgPT09IHN1YkVsSWQ7IH0pKSB7XG4gICAgICAgIC8vIHJlbW92ZSBzZWxlY3RlZE9mZmljZXJcbiAgICAgICAgdmFyIHRhcmdldFN1YkluZGV4ID0gc2VsZWN0ZWRPZmZpY2Vycy5pbmRleE9mKHN1YkVsSWQpO1xuICAgICAgICBpZiAodGFyZ2V0U3ViSW5kZXggPiAtMSkge1xuICAgICAgICAgICAgc2VsZWN0ZWRPZmZpY2Vycy5zcGxpY2UodGFyZ2V0U3ViSW5kZXgsIDEpO1xuICAgICAgICAgICAgb2ZmaWNlckJ0bi5zdHlsZS5vdXRsaW5lID0gXCJcIjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChzZWxlY3RlZE9mZmljZXJzLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgc2VsZWN0ZWRPZmZpY2Vycy5wdXNoKHN1YkVsSWQpO1xuICAgICAgICBvZmZpY2VyQnRuLnN0eWxlLm91dGxpbmUgPSBcIjVweCBhdXRvIHdoaXRlXCI7XG4gICAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==