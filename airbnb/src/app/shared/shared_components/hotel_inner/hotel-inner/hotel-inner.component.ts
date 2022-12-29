import { Component, OnInit } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup } from '@angular/forms';
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

  
  faCheck=faCheck;


  dayCount !:string;
  dayCountSumPrice!:number;
  valid:number =0;
 hotelId!:any;
 hotel!:any;
 chosenRoom:any;
 faStar=faStar;
 lat!:number;
 lng!:number;
  dateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  
  constructor(private httpClient:HttpClient, private activatedRoute:ActivatedRoute, private hotelCardServ:HotelCardService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(response =>{
      
      this.hotelId = response["id"];
     
      this.hotelCardServ.readHotelCardById(this.hotelId).subscribe((response:any) =>{
        this.hotel=response;
        this.lat = this.hotel.latitude;
        this.lng = this.hotel.longitude;
        
      })
    })
  }
 


  bookRoom(roomName:string){
    this.hotel.rooms.forEach((room:any) => {
     if(room.name == roomName){
      this.chosenRoom=room;

      let pricePerNight = document.getElementById('pricePerNight') as HTMLInputElement;
      let price = document.getElementById('price') as HTMLInputElement;
      let roomName = document.getElementById('roomName') as HTMLInputElement;
      let daysPriceSum = document.getElementById('daysPriceSum') as HTMLInputElement;

      pricePerNight.innerHTML = `${this.chosenRoom.price}$ <span style="font-size:18px;font-weight:400;">night</span>`;
     
      roomName.innerText = this.chosenRoom.name;
      if(this.valid==1){
        price.innerText = `${this.chosenRoom.price} x `;
        this.dayCountSumPrice = this.chosenRoom.price * parseInt(this.dayCount);
        daysPriceSum.innerText =`${this.dayCountSumPrice}$`;
      }
     }
     
    })
   }


  Calculate(){
    if(this.dateRange.value.start !=null && this.dateRange.value.end !=null && this.chosenRoom !=null){
    let oneDay=1000*60*60*24;
    this.valid = 1;
   
    let days = document.getElementById('days') as HTMLInputElement;
    let price = document.getElementById('price') as HTMLInputElement;
    let daysPriceSum = document.getElementById('daysPriceSum') as HTMLInputElement;
   
    this.dayCount = Math.round((this.dateRange.value.end -  this.dateRange.value.start)/oneDay).toString();
    this.dayCountSumPrice = this.chosenRoom.price * parseInt(this.dayCount);
    
    
    price.innerText = `${this.chosenRoom.price} x `
    days.innerText = ` ${this.dayCount} night`;
    daysPriceSum.innerText =`${this.dayCountSumPrice}$`;
   
  }
  }

  


}
