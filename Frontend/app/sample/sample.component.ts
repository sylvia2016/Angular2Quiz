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

    constructor(private common: CommonService) { }
    
    ngOnInit() {
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
                    alert('add successfully!');
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
                    alert('update successfully!');
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

}
