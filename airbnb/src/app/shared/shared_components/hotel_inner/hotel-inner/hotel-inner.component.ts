import { Component, OnInit } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup } from '@angular/forms';
import { faSink } from '@fortawesome/free-solid-svg-icons';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { HotelCardService } from 'src/app/core/http/hotel_card/hotel-card.service';
@Component({
  selector: 'app-hotel-inner',
  templateUrl: './hotel-inner.component.html',
  styleUrls: ['./hotel-inner.component.css']
})


export class HotelInnerComponent implements OnInit {

  faSink = faSink;
  faCheck=faCheck;


  dayCount !:string;
  dayCountSumPrice!:number;
  valid:number =0;
   hotelId!:any;
  dateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  
  constructor(private httpClient:HttpClient, private activatedRoute:ActivatedRoute, private hotelCardServ:HotelCardService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(response =>{
      
      this.hotelId = response["id"];
     
      this.hotelCardServ.readHotelCardById(this.hotelId).subscribe(response =>{
        console.log(response);
      })
    })
  }
  faStar=faStar;
  Calculate(){
    if(this.dateRange.value.start !=null && this.dateRange.value.end !=null){
    let oneDay=1000*60*60*24;
    this.valid = 1;
   
    let days = document.getElementById('days') as HTMLInputElement;
    let price = document.getElementById('price') as HTMLInputElement;
    let daysPriceSum = document.getElementById('daysPriceSum') as HTMLInputElement;
    this.dayCount = Math.round((this.dateRange.value.end -  this.dateRange.value.start)/oneDay).toString();
    this.dayCountSumPrice = 145 * parseInt(this.dayCount);
    

    price.innerText = `145$ x `
    days.innerText = ` ${this.dayCount} night`;
    daysPriceSum.innerText =`${this.dayCountSumPrice}$`;
   
  }
  }
}
