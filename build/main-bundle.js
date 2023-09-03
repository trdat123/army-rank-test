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
        var res = { sub: null, manager: curManager };
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
    ArmyRankingApp.prototype.moveOfficer = function (subID, newManagerID) {
        // remove current sub position
        // add sub to new position
        // move sub's subordinates array up to 1 rank
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
var a = App.getSubById(700);
console.log("a: ", a);
(0,_utils__WEBPACK_IMPORTED_MODULE_1__.renderSubs)(general.subordinates, list);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ2tCO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQSxnREFBZ0Qsd0JBQXdCO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUN5Qjs7Ozs7Ozs7Ozs7Ozs7OztBQzdEbkI7QUFDQTtBQUNQO0FBQ0E7QUFDQTtBQUNBLG9IQUFvSDtBQUNwSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7Ozs7OztVQ1hBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTnlDO0FBQ1E7QUFDakQsY0FBYyxrREFBYztBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0dBQXdHLDRCQUE0Qiw4Q0FBVTtBQUM5STtBQUNBO0FBQ0Esa0RBQVUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3MudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzLnRzIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgT2ZmaWNlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPZmZpY2VyKGlkLCBuYW1lLCBzdWJzKSB7XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5zdWJvcmRpbmF0ZXMgPSBzdWJzO1xuICAgICAgICB0aGlzLnJhbmsgPSAxO1xuICAgIH1cbiAgICBPZmZpY2VyLnByb3RvdHlwZS5hZGRTdWIgPSBmdW5jdGlvbiAob2ZmaWNlcikge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIG9mZmljZXIucmFuayA9IHRoaXMucmFuayArIDE7XG4gICAgICAgIChfYSA9IHRoaXMuc3Vib3JkaW5hdGVzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucHVzaChvZmZpY2VyKTtcbiAgICB9O1xuICAgIHJldHVybiBPZmZpY2VyO1xufSgpKTtcbmV4cG9ydCB7IE9mZmljZXIgfTtcbnZhciBBcm15UmFua2luZ0FwcCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBcm15UmFua2luZ0FwcCgpIHtcbiAgICAgICAgdmFyIGdlbmVyYWwgPSBuZXcgT2ZmaWNlcigxMDAsIFwiTU1QXCIsIFtdKTtcbiAgICAgICAgdGhpcy5nZW5lcmFsID0gZ2VuZXJhbDtcbiAgICAgICAgdmFyIHN1YjIgPSBuZXcgT2ZmaWNlcigyMDAsIFwiSm9obiBXZWFrXCIsIFtdKTtcbiAgICAgICAgdmFyIHN1YjMgPSBuZXcgT2ZmaWNlcigzMDAsIFwiSm9obiBDZW5hXCIsIFtdKTtcbiAgICAgICAgdmFyIHN1YjQgPSBuZXcgT2ZmaWNlcig0MDAsIFwiQmVuXCIsIFtdKTtcbiAgICAgICAgdmFyIHN1YjUgPSBuZXcgT2ZmaWNlcig1MDAsIFwiQ29vcGVyXCIsIFtdKTtcbiAgICAgICAgdmFyIHN1YjYgPSBuZXcgT2ZmaWNlcig2MDAsIFwiQVwiLCBbXSk7XG4gICAgICAgIHZhciBzdWI3ID0gbmV3IE9mZmljZXIoNzAwLCBcIkJcIiwgW10pO1xuICAgICAgICB2YXIgc3ViOCA9IG5ldyBPZmZpY2VyKDgwMCwgXCJDXCIsIFtdKTtcbiAgICAgICAgdmFyIHN1YjkgPSBuZXcgT2ZmaWNlcig5MDAsIFwiRFwiLCBbXSk7XG4gICAgICAgIGdlbmVyYWwuYWRkU3ViKHN1YjIpO1xuICAgICAgICBnZW5lcmFsLmFkZFN1YihzdWIzKTtcbiAgICAgICAgc3ViMi5hZGRTdWIoc3ViNik7XG4gICAgICAgIHN1YjMuYWRkU3ViKHN1YjQpO1xuICAgICAgICBzdWIzLmFkZFN1YihzdWI1KTtcbiAgICAgICAgc3ViNC5hZGRTdWIoc3ViNyk7XG4gICAgICAgIHN1YjQuYWRkU3ViKHN1YjgpO1xuICAgICAgICBzdWI4LmFkZFN1YihzdWI5KTtcbiAgICAgICAgY29uc29sZS5sb2coZ2VuZXJhbCk7XG4gICAgfVxuICAgIEFybXlSYW5raW5nQXBwLnByb3RvdHlwZS5nZXRTdWJCeUlkID0gZnVuY3Rpb24gKGlkLCBzdWJBcnJheSwgY3VyTWFuYWdlcikge1xuICAgICAgICB2YXIgcmVzID0geyBzdWI6IG51bGwsIG1hbmFnZXI6IGN1ck1hbmFnZXIgfTtcbiAgICAgICAgc3ViQXJyYXkgPSBzdWJBcnJheSAhPT0gbnVsbCAmJiBzdWJBcnJheSAhPT0gdm9pZCAwID8gc3ViQXJyYXkgOiB0aGlzLmdlbmVyYWwuc3Vib3JkaW5hdGVzO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIHN1YkFycmF5XzEgPSBzdWJBcnJheTsgX2kgPCBzdWJBcnJheV8xLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFyIGVsID0gc3ViQXJyYXlfMVtfaV07XG4gICAgICAgICAgICBpZiAoZWwuaWQgPT09IGlkKSB7XG4gICAgICAgICAgICAgICAgcmVzLnN1YiA9IGVsO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZWwuc3Vib3JkaW5hdGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICByZXMgPSB0aGlzLmdldFN1YkJ5SWQoaWQsIGVsLnN1Ym9yZGluYXRlcywgZWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfTtcbiAgICBBcm15UmFua2luZ0FwcC5wcm90b3R5cGUubW92ZU9mZmljZXIgPSBmdW5jdGlvbiAoc3ViSUQsIG5ld01hbmFnZXJJRCkge1xuICAgICAgICAvLyByZW1vdmUgY3VycmVudCBzdWIgcG9zaXRpb25cbiAgICAgICAgLy8gYWRkIHN1YiB0byBuZXcgcG9zaXRpb25cbiAgICAgICAgLy8gbW92ZSBzdWIncyBzdWJvcmRpbmF0ZXMgYXJyYXkgdXAgdG8gMSByYW5rXG4gICAgfTtcbiAgICBBcm15UmFua2luZ0FwcC5wcm90b3R5cGUudW5kbyA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICBBcm15UmFua2luZ0FwcC5wcm90b3R5cGUucmVkbyA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICByZXR1cm4gQXJteVJhbmtpbmdBcHA7XG59KCkpO1xuZXhwb3J0IHsgQXJteVJhbmtpbmdBcHAgfTtcbiIsImV4cG9ydCB2YXIgY29sb3JUYWJsZSA9IFtcIiMxYTFhMWFcIiwgXCIjYTE1ZWYyXCIsIFwiIzM3MDBiM1wiLCBcIiNjZjY2NzlcIl07XG5leHBvcnQgdmFyIHJlbmRlclN1YnMgPSBmdW5jdGlvbiAoc3VicywgbGlzdCkge1xuICAgIHN1YnMuZm9yRWFjaChmdW5jdGlvbiAoc3ViRWwpIHtcbiAgICAgICAgbGlzdC5pbm5lckhUTUwgKz1cbiAgICAgICAgICAgIC8qaHRtbCovXG4gICAgICAgICAgICBcIlxcbiAgICAgICAgICAgIDxidXR0b24gaWQ9XFxcIlwiLmNvbmNhdChzdWJFbC5pZCwgXCJcXFwiIHN0eWxlPVxcXCJtYXJnaW4tbGVmdDogXCIpLmNvbmNhdChzdWJFbC5yYW5rICogNCwgXCJyZW07IGJhY2tncm91bmQtY29sb3I6IFwiKS5jb25jYXQoY29sb3JUYWJsZVtzdWJFbC5yYW5rIC0gMV0sIFwiXFxcIj5cXG4gICAgICAgICAgICAgICAgXCIpLmNvbmNhdChzdWJFbC5uYW1lLCBcIlxcbiAgICAgICAgICAgIDwvYnV0dG9uPlxcbiAgICAgICAgICAgIFwiKTtcbiAgICAgICAgaWYgKHN1YkVsLnN1Ym9yZGluYXRlcy5sZW5ndGggPiAwKVxuICAgICAgICAgICAgcmVuZGVyU3VicyhzdWJFbC5zdWJvcmRpbmF0ZXMsIGxpc3QpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm47XG4gICAgfSk7XG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBBcm15UmFua2luZ0FwcCB9IGZyb20gXCIuL2NsYXNzXCI7XG5pbXBvcnQgeyBjb2xvclRhYmxlLCByZW5kZXJTdWJzIH0gZnJvbSBcIi4vdXRpbHNcIjtcbnZhciBBcHAgPSBuZXcgQXJteVJhbmtpbmdBcHAoKTtcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXBwXCIpLmlubmVySFRNTCA9IFwiXFxuICAgIDxoMT5WaXRlICsgVHlwZVNjcmlwdDwvaDE+XFxuICAgIDxkaXYgaWQ9XFxcImxpc3RcXFwiPlxcbiAgICA8L2Rpdj5cXG5cIjtcbnZhciBsaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsaXN0XCIpO1xudmFyIGdlbmVyYWwgPSBBcHAuZ2VuZXJhbDtcbmxpc3QuaW5uZXJIVE1MID1cbiAgICAvKmh0bWwqL1xuICAgIFwiXFxuICAgIDxidXR0b24gaWQ9XFxcIlwiLmNvbmNhdChnZW5lcmFsLmlkLCBcIlxcXCIgc3R5bGU9XFxcIm1hcmdpbi1sZWZ0OiBcIikuY29uY2F0KGdlbmVyYWwucmFuayAqIDQsIFwicmVtOyBiYWNrZ3JvdW5kLWNvbG9yOiBcIikuY29uY2F0KGNvbG9yVGFibGVbZ2VuZXJhbC5yYW5rIC0gMV0sIFwiXFxcIj5cXG4gICAgICAgIFwiKS5jb25jYXQoZ2VuZXJhbC5uYW1lLCBcIlxcbiAgICA8L2J1dHRvbj5cXG4gICAgXCIpO1xudmFyIGEgPSBBcHAuZ2V0U3ViQnlJZCg3MDApO1xuY29uc29sZS5sb2coXCJhOiBcIiwgYSk7XG5yZW5kZXJTdWJzKGdlbmVyYWwuc3Vib3JkaW5hdGVzLCBsaXN0KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==