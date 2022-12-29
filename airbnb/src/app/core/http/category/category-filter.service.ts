import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryFilterService  {

  private getAllCategoryApi:string = "http://airbnb-dev.us-east-1.elasticbeanstalk.com/api/Category";

  constructor(private httpClient:HttpClient) { }


  readAllCategory():Observable<any>{

    return this.httpClient.get(this.getAllCategoryApi);
  }
}
