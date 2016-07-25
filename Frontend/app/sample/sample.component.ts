import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';

@Component({
    moduleId: module.id,
    selector: 'app-sample',
    templateUrl: 'sample.component.html',
    styleUrls: ['sample.component.css']
})
export class SampleComponent implements OnInit {

    numId: number = 862501;    
    aryId: any[] = [];
    aryFood: any[];
    aryFoodById: any[];
    foodId: number = 1;
    inputName: string;
    inputPrice: string;
    urlE: string = 'http://172.16.3.213/kenHW/api/kenAPI';
    urlS: string = 'http://172.16.3.12/Angular2QuizAPI/api/FoodPrices';
    apiName: string = 'Ken\'s API';
    isShow: boolean = false;
    btnWord: string = '新增菜單';

    constructor(private common: CommonService) { }
    
    ngOnInit() {
        console.log(this.foodId);
        this.clearInputFoodAndPrice();
        this.getAllFood();
        this.doChange();
    }

    getAllFood() {
        this.common.getFood()
            .subscribe((value:any) => {
                this.aryFood = value;
                this.aryFoodById = value;
                
                for (let item of this.aryFood) {
                    this.aryId.push(item['Id']);
                }
            })
    }
    
    doChange() {
        if (this.foodId == -99999999999999999999999999999999999999) {
            this.getAllFood();
        }
        else {
            this.common.getFoodById(this.foodId)
                .subscribe((value: any) => {
                    this.aryFoodById = [value];
                    //this.aryFoodById.push(value);  --> ?
                })
        }
    }
      
    postData() {
        for (let v of this.aryId) {
            if (v == this.numId) {                
                this.numId += 1;
            }
        }

        //var json = JSON.stringify({ Id: this.numId, Name: this.inputName, Price: this.inputPrice });  ---> 轉Json的方式
        var obj = { Id: this.numId, Name: this.inputName, Price: this.inputPrice };

        this.common.postFood(obj)
            .subscribe(
                (data: any) => { },
                (err: any) => { alert(err._body); },
                () => {
                    alert('新增成功！');
                    //this.foodId = -99999999999999999999999999999999999999;
                    this.foodId = this.numId;
                    this.getAllFood();                            
                    this.doChange();
                    this.clearInputFoodAndPrice();
                }
        );
    }

    clearInputFoodAndPrice() {
        this.inputName = '';
        this.inputPrice = '';
    }

    updateFood(updateId: number, updateName: string, updatePrice: string) {
        var obj = { Id: updateId, Name: updateName, Price: updatePrice };
        this.common.updateFood(updateId, obj)
            .subscribe(
                (data: any) => { },
                (err: any) => { alert(err._body); },
                () => {
                    alert('修改成功！');
                    this.getAllFood();
                    this.doChange();
                }
        );
    }

    deleteFood(updateId: number, updateName: string) {
        if (confirm('確定要將「' + updateName + '」刪除？') == true) {
            this.common.deleteFood(updateId)
                .subscribe(
                (data: any) => { },
                (err: any) => { alert(err._body); },
                () => {
                    alert('delete successfully!');
                    this.getAllFood();
                    this.doChange();
                }
            );
        }
    }

    changeAPI() {
        if (this.common.apiUrl == this.urlE) {
            this.common.apiUrl = this.urlS;
            this.apiName = 'Sylvia\'s API';
        }
        else {
            this.common.apiUrl = this.urlE;
            this.apiName = 'Ken\'s API';
        }
        this.foodId = 1;
        this.ngOnInit();
    }

    switchAdd() {
        this.isShow = !this.isShow;
        if (this.isShow == true) {
            this.btnWord = '關閉新增';
        } else {
            this.btnWord = '新增菜單';
        }
        
    }
}
