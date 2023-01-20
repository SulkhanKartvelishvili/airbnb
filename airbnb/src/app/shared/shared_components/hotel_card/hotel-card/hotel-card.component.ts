import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Router } from "@angular/router";

@Component({
  selector: "app-hotel-card",

  templateUrl: "./hotel-card.component.html",

  styleUrls: ["./hotel-card.component.css"],
})
export class HotelCardComponent implements OnInit, OnChanges {
  @Input()
  hotelCardItem: any;

  constructor(private router: Router) {}

  ngOnChanges(): void {}

  ngOnInit(): void {}
  faStar = faStar;
  navigate() {
    this.router.navigate(["innerHotel/", this.hotelCardItem.id]);
  }
}
