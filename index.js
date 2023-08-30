"use strict";
// initiate general
document.querySelector("#app").innerHTML = "\n    <h1>Vite + TypeScript</h1>\n    <ul id=\"list\">\n    </ul>\n";
var Officer = /** @class */ (function () {
    function Officer(id, name, subs) {
        this.id = id;
        this.name = name;
        this.subordinates = subs;
    }
    Officer.prototype.size = function () {
        var i = 1;
        var currSub = this;
        while ((currSub === null || currSub === void 0 ? void 0 : currSub.subordinates) !== null) {
            i++;
            currSub = currSub.subordinates;
        }
        return i;
    };
    Officer.prototype.get = function (id) {
        return this.id === id ? this : null;
    };
    return Officer;
}());
var ArmyRankingApp = /** @class */ (function () {
    function ArmyRankingApp() {
        this.general = new Officer(1, "MMP", null);
        var sub2 = new Officer(2, "John Weak", null);
        this.general.subordinates = sub2;
        var sub3 = new Officer(3, "John Cena", null);
        sub2.subordinates = sub3;
        console.log("🚀 ~ :", this.general);
        console.log(this.general.size());
    }
    ArmyRankingApp.prototype.moveOfficer = function (officerID, managerID) { };
    ArmyRankingApp.prototype.undo = function () { };
    ArmyRankingApp.prototype.redo = function () { };
    return ArmyRankingApp;
}());
var App = new ArmyRankingApp();
var list = document.getElementById("list");
// for (let i = 0; i < App.general.size(); i++) {
//     console.log(App.general.get(i));
// }
