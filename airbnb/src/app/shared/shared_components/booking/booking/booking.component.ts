import { Component, OnInit } from '@angular/core';
import { HotelCardService } from 'src/app/core/http/hotel_card/hotel-card.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {



  bookedHotelData!:any;
  constructor(private hotelServ:HotelCardService) { }

  ngOnInit(): void {
    this.bookedHotelData = JSON.parse(localStorage.getItem("bookedHotelData") || "null");
   
    // console.log(this.bookedHotelData[0].hotelId);
    this.hotelServ.readHotelCardById(this.bookedHotelData[0].hotelId).subscribe(response =>{
      console.log(response);
    })
  }


}
