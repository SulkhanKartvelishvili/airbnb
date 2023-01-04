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
 usersBookedHotelList:any[]=[];
 bookedHotelImages:any=[];
 userData!:any;

  constructor(private hotelBooking: HotelBookingService, private hotelCardServ:HotelCardService){}

  ngOnInit(): void {

    this.hotelBooking.getBookedHotelList().subscribe((res) => {
      this.bookedHotelsList = res.map((e) => {

        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as bookedHotel),
        };
       
      });
     
      this.userData = JSON.parse(localStorage.getItem('user') || 'null');

      this.bookedHotelsList.forEach((item:any) => {
        console.log(item);
        if(item.userId== this.userData.uid){
           this.usersBookedHotelList.push(item);
           this.hotelCardServ.readHotelCardById(item.hotelId).subscribe((resp:any)=>{
            this.bookedHotelImages.push(resp.mainImages);
           })
        }
      })
     
     
    }); 
    // console.log(this.usersBookedHotelList);
  }
  



}
