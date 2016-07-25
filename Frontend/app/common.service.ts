import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CommonService {

    apiUrl: string = 'http://172.16.3.213/kenHW/api/kenAPI';

    constructor(private http: Http) {}

    getFood() {
        console.log(this.apiUrl);
        return this.http.get(this.apiUrl)
            .map((value: any) => {
                return value.json();
            });
    }

    getFoodById(id: number) {
        return this.http.get(this.apiUrl + '/' + id)
            .map((value: any) => {
                return value.json();
            });
    }

    postFood(postData: any) {
        return this.http.post(this.apiUrl, postData);
    }

    updateFood(id: number, updateData: any) {
        return this.http.put(this.apiUrl + '/' + id, updateData);
    }

    deleteFood(id: number) {
        return this.http.delete(this.apiUrl + '/' + id);
    }
}
