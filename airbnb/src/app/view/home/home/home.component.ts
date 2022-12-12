import { Component, OnInit } from '@angular/core';
import { HotelCardService } from 'src/app/core/http/hotel_card/hotel-card.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

hotelCardList:[]=[];

  constructor(private hotelCardServ:HotelCardService) { }

  ngOnInit(): void {
    this.getAllHotelCard();
  }


  getAllHotelCard(){
    this.hotelCardServ.readAllHotelCard().subscribe(response => {
    
       this.hotelCardList = response;
       console.log(this.hotelCardList);
    });
  }
}
