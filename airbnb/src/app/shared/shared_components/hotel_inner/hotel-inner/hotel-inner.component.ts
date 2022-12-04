import { Component, OnInit } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-hotel-inner',
  templateUrl: './hotel-inner.component.html',
  styleUrls: ['./hotel-inner.component.css']
})
export class HotelInnerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  faStar=faStar;

}
