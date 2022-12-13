import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HotelCardService {


  private getAllHotelCardApi:string = "http://airbnb-dev.us-east-1.elasticbeanstalk.com/api/Hotel";

  constructor(private httpClient:HttpClient) { 
  }


  
    readAllHotelCard():Observable<any>{
      
      return this.httpClient.get(this.getAllHotelCardApi);
    }


 
}
