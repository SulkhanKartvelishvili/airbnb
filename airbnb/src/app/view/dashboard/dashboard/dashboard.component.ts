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
   

 bookedHotelsList:any=[]=[];
 usersBookedHotelList:bookedHotel[]=[];
 bookedHotelImages:any=[]=[];
 userData!:any;
 isFinished!:boolean;

  constructor(private hotelBooking: HotelBookingService, private hotelCardServ:HotelCardService){}

  async ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('user') || 'null');
     this.hotelBooking.getBookedHotelList().subscribe((res) => {
      this.bookedHotelsList = res.map((e) => {

        this.isFinished = true;
        return {  
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as bookedHotel),
        };
       
      });
      console.log(this.bookedHotelsList);
     
     
        this.bookedHotelsList.forEach((item:any) => {
       

        
          if(item.userId== this.userData.uid){
            this.usersBookedHotelList.push(item);
            
  
          }
          
        })
   
      
  
    
    }); 
  }




}
