import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FilterService {

  private getAllFiltersApi:string = "http://airbnb-dev.us-east-1.elasticbeanstalk.com/api/Hotel/filter-by-category";

  constructor(private httpClient:HttpClient) { 
  }


  
    getAllFilters(filterName:string):Observable<any>{
      
      return this.httpClient.get(this.getAllFiltersApi);
    }
}
