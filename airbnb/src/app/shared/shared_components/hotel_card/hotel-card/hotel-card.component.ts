import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIf } from '@angular/common';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { HotelCardService } from 'src/app/core/http/hotel_card/hotel-card.service';

@Component({
  selector: 'app-hotel-card',

  templateUrl: './hotel-card.component.html',

  styleUrls: ['./hotel-card.component.css'],
})
export class HotelCardComponent implements OnInit, OnChanges {
  @Input()
  hotelCardItem: any;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.hotelCardItem);
  }

  ngOnInit(): void {}
  faStar = faStar;
}
