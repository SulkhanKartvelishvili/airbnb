import { Component, OnInit } from '@angular/core';
import { HotelCardService } from 'src/app/core/http/hotel_card/hotel-card.service';
import { bookedHotel } from 'src/app/shared/shared_models/bookedHotel.model';
import { HotelBookingService } from 'src/app/shared/shared_services/hotelBooking/hotel-booking.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
   

 bookedHotelsList:any=[];
 usersBookedHotelList:any=[];
 bookedHotelImages:any=[]=[];
 backToBookingHotel!:any;
 userData!:any;

  constructor(private hotelBookingServ: HotelBookingService, private hotelCardServ:HotelCardService, private hotelCardserv:HotelCardService){}

  ngOnInit() {
    this.bookedHotelsList = [];
    this.userData = JSON.parse(localStorage.getItem('user') || 'null');

     this.hotelBookingServ.getBookedHotelList().subscribe((res) => {

      this.bookedHotelsList = res.map((e) => {
        return {  
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as bookedHotel),
        };
      });
     this.usersBookedHotelList= [];
     this.hotelCardserv.readAllHotelCard().subscribe((res) => {

      this.bookedHotelsList.forEach((item:any) => {
        res.forEach((itemTwo:any) => {
 if(item.hotelId== itemTwo.id){
          this.usersBookedHotelList.push(itemTwo);
        
        }
        })
        console.log(this.usersBookedHotelList);
      })
     


     })
    
   
    }); 
     


    this.backToBookingHotel = JSON.parse(localStorage.getItem('bookedHotelData') || 'null');

  }






}
