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
        if (this.selectedOfficers.length == 0)
            return;
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
var moveOfficerBtn = document.createElement("button");
moveOfficerBtn.innerText = "Move Officer";
moveOfficerBtn.onclick = function () { return App.moveOfficer(); };
appWrapper.appendChild(moveOfficerBtn);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNrQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQSxnREFBZ0Qsd0JBQXdCO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0RkFBNEYsd0ZBQXdGO0FBQ3BMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLGtEQUFVO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ3lCOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3pGZTtBQUNRO0FBQzFDLGNBQWMsa0RBQWM7QUFDbkM7QUFDQTtBQUNBLGlNQUFpTSw0QkFBNEIsOENBQVU7QUFDdk87QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0Esa0RBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWG9CO0FBQ3ZCO0FBQ0E7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNGQUFzRjtBQUN0RjtBQUNBLDJDQUEyQztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSwyQkFBMkIsdUNBQUc7QUFDOUIsOENBQThDLHdCQUF3QjtBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUMvQkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3MudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy91dGlscy50cyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly8vd2VicGFjay9zdGFydHVwIiwid2VicGFjazovLy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVuZGVyU3VicyB9IGZyb20gXCIuL3V0aWxzXCI7XG52YXIgT2ZmaWNlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPZmZpY2VyKGlkLCBuYW1lLCBzdWJzKSB7XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5zdWJvcmRpbmF0ZXMgPSBzdWJzO1xuICAgICAgICB0aGlzLnJhbmsgPSAxO1xuICAgICAgICB0aGlzLmlzU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgT2ZmaWNlci5wcm90b3R5cGUuYWRkU3ViID0gZnVuY3Rpb24gKG9mZmljZXIpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBvZmZpY2VyLnJhbmsgPSB0aGlzLnJhbmsgKyAxO1xuICAgICAgICAoX2EgPSB0aGlzLnN1Ym9yZGluYXRlcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnB1c2gob2ZmaWNlcik7XG4gICAgfTtcbiAgICBPZmZpY2VyLnByb3RvdHlwZS5yZW1vdmVTdWIgPSBmdW5jdGlvbiAob2ZmaWNlcikge1xuICAgICAgICB2YXIgdGFyZ2V0U3ViSW5kZXggPSB0aGlzLnN1Ym9yZGluYXRlcy5pbmRleE9mKG9mZmljZXIpO1xuICAgICAgICBpZiAodGFyZ2V0U3ViSW5kZXggPiAtMSkge1xuICAgICAgICAgICAgdGhpcy5zdWJvcmRpbmF0ZXMuc3BsaWNlKHRhcmdldFN1YkluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIE9mZmljZXI7XG59KCkpO1xuZXhwb3J0IHsgT2ZmaWNlciB9O1xudmFyIEFybXlSYW5raW5nQXBwID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEFybXlSYW5raW5nQXBwKCkge1xuICAgICAgICB2YXIgZ2VuZXJhbCA9IG5ldyBPZmZpY2VyKDEwMCwgXCJNTVBcIiwgW10pO1xuICAgICAgICB0aGlzLmdlbmVyYWwgPSBnZW5lcmFsO1xuICAgICAgICB0aGlzLnNlbGVjdGVkT2ZmaWNlcnMgPSBbXTtcbiAgICAgICAgdmFyIHN1YjIgPSBuZXcgT2ZmaWNlcigyMDAsIFwiSm9obiBXZWFrXCIsIFtdKTtcbiAgICAgICAgdmFyIHN1YjMgPSBuZXcgT2ZmaWNlcigzMDAsIFwiSm9obiBDZW5hXCIsIFtdKTtcbiAgICAgICAgdmFyIHN1YjQgPSBuZXcgT2ZmaWNlcig0MDAsIFwiQmVuXCIsIFtdKTtcbiAgICAgICAgdmFyIHN1YjUgPSBuZXcgT2ZmaWNlcig1MDAsIFwiQ29vcGVyXCIsIFtdKTtcbiAgICAgICAgdmFyIHN1YjYgPSBuZXcgT2ZmaWNlcig2MDAsIFwiQVwiLCBbXSk7XG4gICAgICAgIHZhciBzdWI3ID0gbmV3IE9mZmljZXIoNzAwLCBcIkJcIiwgW10pO1xuICAgICAgICB2YXIgc3ViOCA9IG5ldyBPZmZpY2VyKDgwMCwgXCJDXCIsIFtdKTtcbiAgICAgICAgdmFyIHN1YjkgPSBuZXcgT2ZmaWNlcig5MDAsIFwiRFwiLCBbXSk7XG4gICAgICAgIGdlbmVyYWwuYWRkU3ViKHN1YjIpO1xuICAgICAgICBnZW5lcmFsLmFkZFN1YihzdWIzKTtcbiAgICAgICAgc3ViMi5hZGRTdWIoc3ViNik7XG4gICAgICAgIHN1YjMuYWRkU3ViKHN1YjQpO1xuICAgICAgICBzdWIzLmFkZFN1YihzdWI1KTtcbiAgICAgICAgc3ViNC5hZGRTdWIoc3ViNyk7XG4gICAgICAgIHN1YjQuYWRkU3ViKHN1YjgpO1xuICAgICAgICBzdWI4LmFkZFN1YihzdWI5KTtcbiAgICB9XG4gICAgQXJteVJhbmtpbmdBcHAucHJvdG90eXBlLmdldFN1YkJ5SWQgPSBmdW5jdGlvbiAoaWQsIHN1YkFycmF5LCBjdXJNYW5hZ2VyKSB7XG4gICAgICAgIHZhciByZXMgPSB7IHN1YjogdW5kZWZpbmVkLCBtYW5hZ2VyOiBjdXJNYW5hZ2VyIH07XG4gICAgICAgIHN1YkFycmF5ID0gc3ViQXJyYXkgIT09IG51bGwgJiYgc3ViQXJyYXkgIT09IHZvaWQgMCA/IHN1YkFycmF5IDogdGhpcy5nZW5lcmFsLnN1Ym9yZGluYXRlcztcbiAgICAgICAgY3VyTWFuYWdlciA9IGN1ck1hbmFnZXIgIT09IG51bGwgJiYgY3VyTWFuYWdlciAhPT0gdm9pZCAwID8gY3VyTWFuYWdlciA6IHRoaXMuZ2VuZXJhbDtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBzdWJBcnJheV8xID0gc3ViQXJyYXk7IF9pIDwgc3ViQXJyYXlfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhciBlbCA9IHN1YkFycmF5XzFbX2ldO1xuICAgICAgICAgICAgaWYgKGVsLmlkID09PSBpZCkge1xuICAgICAgICAgICAgICAgIHJlcy5zdWIgPSBlbDtcbiAgICAgICAgICAgICAgICByZXMubWFuYWdlciA9IGN1ck1hbmFnZXI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghcmVzLnN1YiAmJiBlbC5zdWJvcmRpbmF0ZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHJlcyA9IHRoaXMuZ2V0U3ViQnlJZChpZCwgZWwuc3Vib3JkaW5hdGVzLCBlbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9O1xuICAgIEFybXlSYW5raW5nQXBwLnByb3RvdHlwZS5tb3ZlT2ZmaWNlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF9hID0gdGhpcy5zZWxlY3RlZE9mZmljZXJzLCBzdWJJZCA9IF9hWzBdLCBuZXdNYW5hZ2VySWQgPSBfYVsxXTtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRPZmZpY2Vycy5sZW5ndGggPT0gMClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRPZmZpY2Vycy5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICBhbGVydChcIlNvbWV0aGluZyB3cm9uZywgbm90IGVub3VnaCBkYXRhXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBfYiA9IHRoaXMuZ2V0U3ViQnlJZChzdWJJZCksIHN1YiA9IF9iLnN1YiwgY3VyTWFuYWdlciA9IF9iLm1hbmFnZXI7XG4gICAgICAgIHZhciBuZXdNYW5hZ2VyID0gdGhpcy5nZXRTdWJCeUlkKG5ld01hbmFnZXJJZCkuc3ViO1xuICAgICAgICAvLyAxLiBtb3ZlIHN1YidzIHN1Ym9yZGluYXRlcyBhcnJheSB1cCB0byAxIHJhbmtcbiAgICAgICAgc3ViID09PSBudWxsIHx8IHN1YiA9PT0gdm9pZCAwID8gdm9pZCAwIDogc3ViLnN1Ym9yZGluYXRlcy5mb3JFYWNoKGZ1bmN0aW9uIChzdWIpIHsgcmV0dXJuIGN1ck1hbmFnZXIgPT09IG51bGwgfHwgY3VyTWFuYWdlciA9PT0gdm9pZCAwID8gdm9pZCAwIDogY3VyTWFuYWdlci5hZGRTdWIoc3ViKTsgfSk7XG4gICAgICAgIHN1Yi5zdWJvcmRpbmF0ZXMgPSBbXTtcbiAgICAgICAgLy8gMi4gcmVtb3ZlIGN1cnJlbnQgc3ViIHBvc2l0aW9uXG4gICAgICAgIGN1ck1hbmFnZXIgPT09IG51bGwgfHwgY3VyTWFuYWdlciA9PT0gdm9pZCAwID8gdm9pZCAwIDogY3VyTWFuYWdlci5yZW1vdmVTdWIoc3ViKTtcbiAgICAgICAgLy8gMy4gYWRkIHN1YiB0byBuZXcgcG9zaXRpb25cbiAgICAgICAgbmV3TWFuYWdlciA9PT0gbnVsbCB8fCBuZXdNYW5hZ2VyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBuZXdNYW5hZ2VyLmFkZFN1YihzdWIpO1xuICAgICAgICAvLyByZS1yZW5kZXJcbiAgICAgICAgdmFyIGxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxpc3RcIik7XG4gICAgICAgIGxpc3QgPT09IG51bGwgfHwgbGlzdCA9PT0gdm9pZCAwID8gdm9pZCAwIDogbGlzdC5yZXBsYWNlQ2hpbGRyZW4oKTtcbiAgICAgICAgcmVuZGVyU3Vicyh0aGlzLmdlbmVyYWwuc3Vib3JkaW5hdGVzLCBsaXN0KTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZE9mZmljZXJzID0gW107XG4gICAgfTtcbiAgICBBcm15UmFua2luZ0FwcC5wcm90b3R5cGUudW5kbyA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICBBcm15UmFua2luZ0FwcC5wcm90b3R5cGUucmVkbyA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICByZXR1cm4gQXJteVJhbmtpbmdBcHA7XG59KCkpO1xuZXhwb3J0IHsgQXJteVJhbmtpbmdBcHAgfTtcbiIsImltcG9ydCB7IEFybXlSYW5raW5nQXBwIH0gZnJvbSBcIi4vY2xhc3NcIjtcbmltcG9ydCB7IGNvbG9yVGFibGUsIHJlbmRlclN1YnMgfSBmcm9tIFwiLi91dGlsc1wiO1xuZXhwb3J0IHZhciBBcHAgPSBuZXcgQXJteVJhbmtpbmdBcHAoKTtcbnZhciBnZW5lcmFsID0gQXBwLmdlbmVyYWw7XG52YXIgYXBwV3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXBwXCIpO1xuYXBwV3JhcHBlci5pbm5lckhUTUwgPSAvKiBodG1sICovIFwiXFxuICAgIDxoMT5Bcm15IFJhbms8L2gxPlxcbiAgICAgICAgPGJ1dHRvbiBpZD1cXFwiXCIuY29uY2F0KGdlbmVyYWwuaWQsIFwiXFxcIiBjbGFzcz1cXFwib2ZmaWNlclxcXCJcXG4gICAgICAgICAgICBzdHlsZT1cXFwibWFyZ2luLWxlZnQ6IFwiKS5jb25jYXQoZ2VuZXJhbC5yYW5rICogNCwgXCJyZW07IGJhY2tncm91bmQtY29sb3I6IFwiKS5jb25jYXQoY29sb3JUYWJsZVtnZW5lcmFsLnJhbmsgLSAxXSwgXCJcXFwiXFxuICAgICAgICA+XFxuICAgICAgICAgICAgXCIpLmNvbmNhdChnZW5lcmFsLm5hbWUsIFwiXFxuICAgICAgICA8L2J1dHRvbj5cXG4gICAgPGRpdiBpZD1cXFwibGlzdFxcXCI+PC9kaXY+XFxuICAgIFwiKTtcbnZhciBtb3ZlT2ZmaWNlckJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5tb3ZlT2ZmaWNlckJ0bi5pbm5lclRleHQgPSBcIk1vdmUgT2ZmaWNlclwiO1xubW92ZU9mZmljZXJCdG4ub25jbGljayA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIEFwcC5tb3ZlT2ZmaWNlcigpOyB9O1xuYXBwV3JhcHBlci5hcHBlbmRDaGlsZChtb3ZlT2ZmaWNlckJ0bik7XG52YXIgbGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGlzdFwiKTtcbnJlbmRlclN1YnMoZ2VuZXJhbC5zdWJvcmRpbmF0ZXMsIGxpc3QpO1xuIiwiaW1wb3J0IHsgQXBwIH0gZnJvbSBcIi4vaW5kZXhcIjtcbmV4cG9ydCB2YXIgY29sb3JUYWJsZSA9IFtcIiMxYTFhMWFcIiwgXCIjYTE1ZWYyXCIsIFwiIzM3MDBiM1wiLCBcIiNjZjY2NzlcIl07XG5leHBvcnQgdmFyIHJlbmRlclN1YnMgPSBmdW5jdGlvbiAoc3VicywgbGlzdCkge1xuICAgIHN1YnMuZm9yRWFjaChmdW5jdGlvbiAoc3ViRWwpIHtcbiAgICAgICAgdmFyIG9mZmljZXJCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICBvZmZpY2VyQnRuLmNsYXNzTmFtZSA9IFwib2ZmaWNlclwiO1xuICAgICAgICBvZmZpY2VyQnRuLmlkID0gc3ViRWwuaWQudG9TdHJpbmcoKTtcbiAgICAgICAgb2ZmaWNlckJ0bi5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcIm1hcmdpbi1sZWZ0OiBcIi5jb25jYXQoc3ViRWwucmFuayAqIDQsIFwicmVtOyBiYWNrZ3JvdW5kLWNvbG9yOiBcIikuY29uY2F0KGNvbG9yVGFibGVbc3ViRWwucmFuayAtIDFdKSk7XG4gICAgICAgIG9mZmljZXJCdG4uaW5uZXJUZXh0ID0gc3ViRWwubmFtZTtcbiAgICAgICAgb2ZmaWNlckJ0bi5vbmNsaWNrID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gc2V0T2ZmaWNlckZvck1vdmUoc3ViRWwuaWQsIG9mZmljZXJCdG4pOyB9O1xuICAgICAgICBsaXN0ID09PSBudWxsIHx8IGxpc3QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGxpc3QuYXBwZW5kQ2hpbGQob2ZmaWNlckJ0bik7XG4gICAgICAgIGlmIChzdWJFbC5zdWJvcmRpbmF0ZXMubGVuZ3RoID4gMClcbiAgICAgICAgICAgIHJlbmRlclN1YnMoc3ViRWwuc3Vib3JkaW5hdGVzLCBsaXN0KTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgIH0pO1xufTtcbmZ1bmN0aW9uIHNldE9mZmljZXJGb3JNb3ZlKHN1YkVsSWQsIG9mZmljZXJCdG4pIHtcbiAgICB2YXIgc2VsZWN0ZWRPZmZpY2VycyA9IEFwcC5zZWxlY3RlZE9mZmljZXJzO1xuICAgIGlmIChzZWxlY3RlZE9mZmljZXJzLnNvbWUoZnVuY3Rpb24gKGVsKSB7IHJldHVybiBlbCA9PT0gc3ViRWxJZDsgfSkpIHtcbiAgICAgICAgLy8gcmVtb3ZlIHNlbGVjdGVkT2ZmaWNlclxuICAgICAgICB2YXIgdGFyZ2V0U3ViSW5kZXggPSBzZWxlY3RlZE9mZmljZXJzLmluZGV4T2Yoc3ViRWxJZCk7XG4gICAgICAgIGlmICh0YXJnZXRTdWJJbmRleCA+IC0xKSB7XG4gICAgICAgICAgICBzZWxlY3RlZE9mZmljZXJzLnNwbGljZSh0YXJnZXRTdWJJbmRleCwgMSk7XG4gICAgICAgICAgICBvZmZpY2VyQnRuLnN0eWxlLm91dGxpbmUgPSBcIlwiO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHNlbGVjdGVkT2ZmaWNlcnMubGVuZ3RoIDwgMikge1xuICAgICAgICBzZWxlY3RlZE9mZmljZXJzLnB1c2goc3ViRWxJZCk7XG4gICAgICAgIG9mZmljZXJCdG4uc3R5bGUub3V0bGluZSA9IFwiNXB4IGF1dG8gd2hpdGVcIjtcbiAgICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9