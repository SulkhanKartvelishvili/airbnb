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
 currentDate = new Date();
 backToBookingHotelExpiryDate!:any;
 expirationDayCount!:number;

  constructor(private hotelBookingServ: HotelBookingService, private hotelCardServ:HotelCardService, private hotelCardserv:HotelCardService){}

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('user') || 'null');

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
     

      this.bookedHotelsList.forEach((item:any) => {
       
 if(item.userId== this.userData.uid){
          this.usersBookedHotelList.push(item);
        
        }
    
        // console.log(this.usersBookedHotelList);
      })
     


   
    
   
    }); 

    let oneDay=1000*60*60*24;
    this.backToBookingHotel = JSON.parse(localStorage.getItem('bookedHotelData') || 'null');
    if(this.backToBookingHotel !=null){
    if(this.backToBookingHotel[0].userId == this.userData.uid){
    this.backToBookingHotelExpiryDate  = new Date(this.backToBookingHotel[0].expiry)
   this.expirationDayCount= (this.currentDate.getTime() - this.backToBookingHotelExpiryDate.getTime())/oneDay;
   if(this.expirationDayCount >1){
    localStorage.removeItem("bookedHotelData");

   }
  }
}
}




}
