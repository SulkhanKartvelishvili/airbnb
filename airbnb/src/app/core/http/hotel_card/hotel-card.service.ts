import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { filter, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class HotelCardService {
  private getAllHotelCardApi: string =
    'http://airbnb-dev.us-east-1.elasticbeanstalk.com/api/Hotel';
  private getAllFilterCardApi: string =
    'http://airbnb-dev.us-east-1.elasticbeanstalk.com/api/Hotel/filter-by-category';
  private getHotelCardById: string =
    'http://airbnb-dev.us-east-1.elasticbeanstalk.com/api/Hotel';

  constructor(private httpClient: HttpClient) {}

  readAllHotelCard(): Observable<any> {
    return this.httpClient.get(this.getAllHotelCardApi);
  }
  readAllfilteredHotelCard(queryParams: any): Observable<any> {
    return this.httpClient.get(this.getAllFilterCardApi, {
      params: queryParams,
    });
  }
  readHotelCardById(hotelId: any): Observable<any> {
    return this.httpClient.get(`${this.getHotelCardById}/${hotelId}`);
  }

  getFilteredHotelsBy(filterData:any):Observable<any> {
    var fullApi = `${this.getAllFilterCardApi}?Id=${filterData.categoryId}`;
    return this.httpClient.get(fullApi);
  }
}
