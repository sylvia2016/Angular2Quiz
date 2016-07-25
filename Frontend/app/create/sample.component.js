"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var common_service_1 = require('../common.service');
var SampleComponent = (function () {
    function SampleComponent(common) {
        this.common = common;
        this.numId = 862501;
        this.aryId = [];
        this.foodId = 1;
        this.urlE = 'http://172.16.3.213/kenHW/api/kenAPI';
        this.urlS = 'http://172.16.3.12/Angular2QuizAPI/api/FoodPrices';
        this.apiName = 'Ken\'s API';
    }
    SampleComponent.prototype.ngOnInit = function () {
        console.log(this.foodId);
        this.clearInputFoodAndPrice();
        this.getAllFood();
        this.doChange();
    };
    SampleComponent.prototype.getAllFood = function () {
        var _this = this;
        this.common.getFood()
            .subscribe(function (value) {
            _this.aryFood = value;
            _this.aryFoodById = value;
            for (var _i = 0, _a = _this.aryFood; _i < _a.length; _i++) {
                var item = _a[_i];
                _this.aryId.push(item['Id']);
            }
        });
    };
    SampleComponent.prototype.doChange = function () {
        var _this = this;
        if (this.foodId == -99999999999999999999999999999999999999) {
            this.getAllFood();
        }
        else {
            this.common.getFoodById(this.foodId)
                .subscribe(function (value) {
                _this.aryFoodById = [value];
                //this.aryFoodById.push(value);  --> ?
            });
        }
    };
    SampleComponent.prototype.postData = function () {
        var _this = this;
        for (var _i = 0, _a = this.aryId; _i < _a.length; _i++) {
            var v = _a[_i];
            if (v == this.numId) {
                this.numId += 1;
            }
        }
        //var json = JSON.stringify({ Id: this.numId, Name: this.inputName, Price: this.inputPrice });  ---> 轉Json的方式
        var obj = { Id: this.numId, Name: this.inputName, Price: this.inputPrice };
        this.common.postFood(obj)
            .subscribe(function (data) { }, function (err) { alert(err._body); }, function () {
            alert('add successfully!');
            //this.foodId = -99999999999999999999999999999999999999;
            _this.foodId = _this.numId;
            _this.getAllFood();
            _this.doChange();
            _this.clearInputFoodAndPrice();
        });
    };
    SampleComponent.prototype.clearInputFoodAndPrice = function () {
        this.inputName = '';
        this.inputPrice = '';
    };
    SampleComponent.prototype.updateFood = function (updateId, updateName, updatePrice) {
        var _this = this;
        var obj = { Id: updateId, Name: updateName, Price: updatePrice };
        this.common.updateFood(updateId, obj)
            .subscribe(function (data) { }, function (err) { alert(err._body); }, function () {
            alert('update successfully!');
            _this.getAllFood();
            _this.doChange();
        });
    };
    SampleComponent.prototype.deleteFood = function (updateId, updateName) {
        var _this = this;
        if (confirm('確定要將「' + updateName + '」刪除？') == true) {
            this.common.deleteFood(updateId)
                .subscribe(function (data) { }, function (err) { alert(err._body); }, function () {
                alert('delete successfully!');
                _this.getAllFood();
                _this.doChange();
            });
        }
    };
    SampleComponent.prototype.changeAPI = function () {
        if (this.common.apiUrl == this.urlE) {
            this.common.apiUrl = this.urlS;
            this.apiName = 'Sylvia\'s API';
            console.log(this.apiName);
        }
        else {
            this.common.apiUrl = this.urlE;
            this.apiName = 'Ken\'s API';
            console.log(this.apiName);
        }
        this.foodId = 1;
        this.ngOnInit();
    };
    SampleComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-sample',
            templateUrl: 'sample.component.html',
            styleUrls: ['sample.component.css']
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonService])
    ], SampleComponent);
    return SampleComponent;
}());
exports.SampleComponent = SampleComponent;
//# sourceMappingURL=sample.component.js.map