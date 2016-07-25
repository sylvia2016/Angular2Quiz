import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';

@Component({
    moduleId: module.id,
    selector: 'app-create',
    templateUrl: 'create.component.html',
    styleUrls: ['create.component.css']
})
export class CreateComponent implements OnInit {

   

    constructor(private common: CommonService) { }
    
    ngOnInit() {
    }

}
