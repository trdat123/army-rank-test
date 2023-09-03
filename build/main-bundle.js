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
        this.rank = 1;
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
        console.log(general);
    }
    ArmyRankingApp.prototype.getSubById = function (id, subArray, curManager) {
        var res = { sub: undefined, manager: curManager };
        subArray = subArray !== null && subArray !== void 0 ? subArray : this.general.subordinates;
        for (var _i = 0, subArray_1 = subArray; _i < subArray_1.length; _i++) {
            var el = subArray_1[_i];
            if (el.id === id) {
                res.sub = el;
                break;
            }
            else if (el.subordinates.length > 0) {
                res = this.getSubById(id, el.subordinates, el);
            }
        }
        return res;
    };
    ArmyRankingApp.prototype.moveOfficer = function (subId, newManagerId) {
        var _a = this.getSubById(subId), sub = _a.sub, curManager = _a.manager;
        var newManager = this.getSubById(newManagerId).sub;
        // 1. move sub's subordinates array up to 1 rank
        sub.subordinates.forEach(function (sub) {
            // sub.removeSub(sub);
            curManager === null || curManager === void 0 ? void 0 : curManager.addSub(sub);
        });
        sub.subordinates = [];
        // 2. remove current sub position
        curManager === null || curManager === void 0 ? void 0 : curManager.removeSub(sub);
        // 3. add sub to new position
        newManager === null || newManager === void 0 ? void 0 : newManager.addSub(sub);
    };
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
App.moveOfficer(400, 200);
(0,_utils__WEBPACK_IMPORTED_MODULE_1__.renderSubs)(general.subordinates, list);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ2tCO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQSxnREFBZ0Qsd0JBQXdCO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ3lCOzs7Ozs7Ozs7Ozs7Ozs7O0FDNUVuQjtBQUNBO0FBQ1A7QUFDQTtBQUNBO0FBQ0Esb0hBQW9IO0FBQ3BIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7Ozs7O1VDWEE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOeUM7QUFDUTtBQUNqRCxjQUFjLGtEQUFjO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3R0FBd0csNEJBQTRCLDhDQUFVO0FBQzlJO0FBQ0Esa0RBQVUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3MudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzLnRzIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgT2ZmaWNlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPZmZpY2VyKGlkLCBuYW1lLCBzdWJzKSB7XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5zdWJvcmRpbmF0ZXMgPSBzdWJzO1xuICAgICAgICB0aGlzLnJhbmsgPSAxO1xuICAgIH1cbiAgICBPZmZpY2VyLnByb3RvdHlwZS5hZGRTdWIgPSBmdW5jdGlvbiAob2ZmaWNlcikge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIG9mZmljZXIucmFuayA9IHRoaXMucmFuayArIDE7XG4gICAgICAgIChfYSA9IHRoaXMuc3Vib3JkaW5hdGVzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucHVzaChvZmZpY2VyKTtcbiAgICB9O1xuICAgIE9mZmljZXIucHJvdG90eXBlLnJlbW92ZVN1YiA9IGZ1bmN0aW9uIChvZmZpY2VyKSB7XG4gICAgICAgIHZhciB0YXJnZXRTdWJJbmRleCA9IHRoaXMuc3Vib3JkaW5hdGVzLmluZGV4T2Yob2ZmaWNlcik7XG4gICAgICAgIGlmICh0YXJnZXRTdWJJbmRleCA+IC0xKSB7XG4gICAgICAgICAgICB0aGlzLnN1Ym9yZGluYXRlcy5zcGxpY2UodGFyZ2V0U3ViSW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gT2ZmaWNlcjtcbn0oKSk7XG5leHBvcnQgeyBPZmZpY2VyIH07XG52YXIgQXJteVJhbmtpbmdBcHAgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQXJteVJhbmtpbmdBcHAoKSB7XG4gICAgICAgIHZhciBnZW5lcmFsID0gbmV3IE9mZmljZXIoMTAwLCBcIk1NUFwiLCBbXSk7XG4gICAgICAgIHRoaXMuZ2VuZXJhbCA9IGdlbmVyYWw7XG4gICAgICAgIHZhciBzdWIyID0gbmV3IE9mZmljZXIoMjAwLCBcIkpvaG4gV2Vha1wiLCBbXSk7XG4gICAgICAgIHZhciBzdWIzID0gbmV3IE9mZmljZXIoMzAwLCBcIkpvaG4gQ2VuYVwiLCBbXSk7XG4gICAgICAgIHZhciBzdWI0ID0gbmV3IE9mZmljZXIoNDAwLCBcIkJlblwiLCBbXSk7XG4gICAgICAgIHZhciBzdWI1ID0gbmV3IE9mZmljZXIoNTAwLCBcIkNvb3BlclwiLCBbXSk7XG4gICAgICAgIHZhciBzdWI2ID0gbmV3IE9mZmljZXIoNjAwLCBcIkFcIiwgW10pO1xuICAgICAgICB2YXIgc3ViNyA9IG5ldyBPZmZpY2VyKDcwMCwgXCJCXCIsIFtdKTtcbiAgICAgICAgdmFyIHN1YjggPSBuZXcgT2ZmaWNlcig4MDAsIFwiQ1wiLCBbXSk7XG4gICAgICAgIHZhciBzdWI5ID0gbmV3IE9mZmljZXIoOTAwLCBcIkRcIiwgW10pO1xuICAgICAgICBnZW5lcmFsLmFkZFN1YihzdWIyKTtcbiAgICAgICAgZ2VuZXJhbC5hZGRTdWIoc3ViMyk7XG4gICAgICAgIHN1YjIuYWRkU3ViKHN1YjYpO1xuICAgICAgICBzdWIzLmFkZFN1YihzdWI0KTtcbiAgICAgICAgc3ViMy5hZGRTdWIoc3ViNSk7XG4gICAgICAgIHN1YjQuYWRkU3ViKHN1YjcpO1xuICAgICAgICBzdWI0LmFkZFN1YihzdWI4KTtcbiAgICAgICAgc3ViOC5hZGRTdWIoc3ViOSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGdlbmVyYWwpO1xuICAgIH1cbiAgICBBcm15UmFua2luZ0FwcC5wcm90b3R5cGUuZ2V0U3ViQnlJZCA9IGZ1bmN0aW9uIChpZCwgc3ViQXJyYXksIGN1ck1hbmFnZXIpIHtcbiAgICAgICAgdmFyIHJlcyA9IHsgc3ViOiB1bmRlZmluZWQsIG1hbmFnZXI6IGN1ck1hbmFnZXIgfTtcbiAgICAgICAgc3ViQXJyYXkgPSBzdWJBcnJheSAhPT0gbnVsbCAmJiBzdWJBcnJheSAhPT0gdm9pZCAwID8gc3ViQXJyYXkgOiB0aGlzLmdlbmVyYWwuc3Vib3JkaW5hdGVzO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIHN1YkFycmF5XzEgPSBzdWJBcnJheTsgX2kgPCBzdWJBcnJheV8xLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFyIGVsID0gc3ViQXJyYXlfMVtfaV07XG4gICAgICAgICAgICBpZiAoZWwuaWQgPT09IGlkKSB7XG4gICAgICAgICAgICAgICAgcmVzLnN1YiA9IGVsO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZWwuc3Vib3JkaW5hdGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICByZXMgPSB0aGlzLmdldFN1YkJ5SWQoaWQsIGVsLnN1Ym9yZGluYXRlcywgZWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfTtcbiAgICBBcm15UmFua2luZ0FwcC5wcm90b3R5cGUubW92ZU9mZmljZXIgPSBmdW5jdGlvbiAoc3ViSWQsIG5ld01hbmFnZXJJZCkge1xuICAgICAgICB2YXIgX2EgPSB0aGlzLmdldFN1YkJ5SWQoc3ViSWQpLCBzdWIgPSBfYS5zdWIsIGN1ck1hbmFnZXIgPSBfYS5tYW5hZ2VyO1xuICAgICAgICB2YXIgbmV3TWFuYWdlciA9IHRoaXMuZ2V0U3ViQnlJZChuZXdNYW5hZ2VySWQpLnN1YjtcbiAgICAgICAgLy8gMS4gbW92ZSBzdWIncyBzdWJvcmRpbmF0ZXMgYXJyYXkgdXAgdG8gMSByYW5rXG4gICAgICAgIHN1Yi5zdWJvcmRpbmF0ZXMuZm9yRWFjaChmdW5jdGlvbiAoc3ViKSB7XG4gICAgICAgICAgICAvLyBzdWIucmVtb3ZlU3ViKHN1Yik7XG4gICAgICAgICAgICBjdXJNYW5hZ2VyID09PSBudWxsIHx8IGN1ck1hbmFnZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGN1ck1hbmFnZXIuYWRkU3ViKHN1Yik7XG4gICAgICAgIH0pO1xuICAgICAgICBzdWIuc3Vib3JkaW5hdGVzID0gW107XG4gICAgICAgIC8vIDIuIHJlbW92ZSBjdXJyZW50IHN1YiBwb3NpdGlvblxuICAgICAgICBjdXJNYW5hZ2VyID09PSBudWxsIHx8IGN1ck1hbmFnZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGN1ck1hbmFnZXIucmVtb3ZlU3ViKHN1Yik7XG4gICAgICAgIC8vIDMuIGFkZCBzdWIgdG8gbmV3IHBvc2l0aW9uXG4gICAgICAgIG5ld01hbmFnZXIgPT09IG51bGwgfHwgbmV3TWFuYWdlciA9PT0gdm9pZCAwID8gdm9pZCAwIDogbmV3TWFuYWdlci5hZGRTdWIoc3ViKTtcbiAgICB9O1xuICAgIEFybXlSYW5raW5nQXBwLnByb3RvdHlwZS51bmRvID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgIEFybXlSYW5raW5nQXBwLnByb3RvdHlwZS5yZWRvID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgIHJldHVybiBBcm15UmFua2luZ0FwcDtcbn0oKSk7XG5leHBvcnQgeyBBcm15UmFua2luZ0FwcCB9O1xuIiwiZXhwb3J0IHZhciBjb2xvclRhYmxlID0gW1wiIzFhMWExYVwiLCBcIiNhMTVlZjJcIiwgXCIjMzcwMGIzXCIsIFwiI2NmNjY3OVwiXTtcbmV4cG9ydCB2YXIgcmVuZGVyU3VicyA9IGZ1bmN0aW9uIChzdWJzLCBsaXN0KSB7XG4gICAgc3Vicy5mb3JFYWNoKGZ1bmN0aW9uIChzdWJFbCkge1xuICAgICAgICBsaXN0LmlubmVySFRNTCArPVxuICAgICAgICAgICAgLypodG1sKi9cbiAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiXCIuY29uY2F0KHN1YkVsLmlkLCBcIlxcXCIgc3R5bGU9XFxcIm1hcmdpbi1sZWZ0OiBcIikuY29uY2F0KHN1YkVsLnJhbmsgKiA0LCBcInJlbTsgYmFja2dyb3VuZC1jb2xvcjogXCIpLmNvbmNhdChjb2xvclRhYmxlW3N1YkVsLnJhbmsgLSAxXSwgXCJcXFwiPlxcbiAgICAgICAgICAgICAgICBcIikuY29uY2F0KHN1YkVsLm5hbWUsIFwiXFxuICAgICAgICAgICAgPC9idXR0b24+XFxuICAgICAgICAgICAgXCIpO1xuICAgICAgICBpZiAoc3ViRWwuc3Vib3JkaW5hdGVzLmxlbmd0aCA+IDApXG4gICAgICAgICAgICByZW5kZXJTdWJzKHN1YkVsLnN1Ym9yZGluYXRlcywgbGlzdCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybjtcbiAgICB9KTtcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IEFybXlSYW5raW5nQXBwIH0gZnJvbSBcIi4vY2xhc3NcIjtcbmltcG9ydCB7IGNvbG9yVGFibGUsIHJlbmRlclN1YnMgfSBmcm9tIFwiLi91dGlsc1wiO1xudmFyIEFwcCA9IG5ldyBBcm15UmFua2luZ0FwcCgpO1xuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhcHBcIikuaW5uZXJIVE1MID0gXCJcXG4gICAgPGgxPlZpdGUgKyBUeXBlU2NyaXB0PC9oMT5cXG4gICAgPGRpdiBpZD1cXFwibGlzdFxcXCI+XFxuICAgIDwvZGl2PlxcblwiO1xudmFyIGxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxpc3RcIik7XG52YXIgZ2VuZXJhbCA9IEFwcC5nZW5lcmFsO1xubGlzdC5pbm5lckhUTUwgPVxuICAgIC8qaHRtbCovXG4gICAgXCJcXG4gICAgPGJ1dHRvbiBpZD1cXFwiXCIuY29uY2F0KGdlbmVyYWwuaWQsIFwiXFxcIiBzdHlsZT1cXFwibWFyZ2luLWxlZnQ6IFwiKS5jb25jYXQoZ2VuZXJhbC5yYW5rICogNCwgXCJyZW07IGJhY2tncm91bmQtY29sb3I6IFwiKS5jb25jYXQoY29sb3JUYWJsZVtnZW5lcmFsLnJhbmsgLSAxXSwgXCJcXFwiPlxcbiAgICAgICAgXCIpLmNvbmNhdChnZW5lcmFsLm5hbWUsIFwiXFxuICAgIDwvYnV0dG9uPlxcbiAgICBcIik7XG5BcHAubW92ZU9mZmljZXIoNDAwLCAyMDApO1xucmVuZGVyU3VicyhnZW5lcmFsLnN1Ym9yZGluYXRlcywgbGlzdCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=