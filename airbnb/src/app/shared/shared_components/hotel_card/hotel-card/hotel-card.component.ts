import { Component, Input, OnInit } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIf } from '@angular/common';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { HotelCardService } from 'src/app/core/http/hotel_card/hotel-card.service';


@Component({
  selector: 'app-hotel-card',
  
  templateUrl: './hotel-card.component.html',
  
  styleUrls: ['./hotel-card.component.css']
})
export class HotelCardComponent implements OnInit {


@Input()
hotelCardItem:any;

  constructor() { }

  ngOnInit(): void {
 
  }
  faStar=faStar;
  
  


}
