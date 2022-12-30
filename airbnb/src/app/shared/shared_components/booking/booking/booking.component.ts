import { Component, OnInit } from '@angular/core';
import { HotelCardService } from 'src/app/core/http/hotel_card/hotel-card.service';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {


  faStar=faStar;

  bookedHotelData!:any;
  fetchedHotelData!:any;
  constructor(private hotelServ:HotelCardService) { }

  ngOnInit(): void {
    this.bookedHotelData = JSON.parse(localStorage.getItem("bookedHotelData") || "null");
   
    // console.log(this.bookedHotelData[0].hotelId);
    this.hotelServ.readHotelCardById(this.bookedHotelData[0].hotelId).subscribe(response =>{
      this.fetchedHotelData = response;
      console.log(this.fetchedHotelData);
    })
    let price = document.getElementById('price') as HTMLInputElement;
    let days = document.getElementById('days') as HTMLInputElement;
    let daysPriceSum = document.getElementById('daysPriceSum') as HTMLInputElement;
    


    price.innerText = `${this.bookedHotelData[0].pricePerNight} x `;
    days.innerText = ` ${this.bookedHotelData[0].dayCount} night`;
    daysPriceSum.innerText =`${this.bookedHotelData[0].priceSum}$`;

  }


}
