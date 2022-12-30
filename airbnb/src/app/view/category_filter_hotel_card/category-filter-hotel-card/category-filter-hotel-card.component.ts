import { Component, OnInit } from '@angular/core';
import { HotelCardService } from 'src/app/core/http/hotel_card/hotel-card.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-filter-hotel-card',
  templateUrl: './category-filter-hotel-card.component.html',
  styleUrls: ['./category-filter-hotel-card.component.css'],
})
export class CategoryFilterHotelCardComponent implements OnInit {
  hotelCardList: string[] = [];
  categoryFilteredHotelCardList: string[] = [];
  params!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private hotelCardServ: HotelCardService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((response) => {
      this.params = response['name'];
      var filterData = { categoryId: this.params };
      this.hotelCardServ.getFilteredHotelsBy(filterData).subscribe((response:any) => {
        this.categoryFilteredHotelCardList = response;
      });
    });
  }

  // getCategoryFilteredHotelCard() {
  //   this.hotelCardServ.readAllHotelCard().subscribe((response) => {
  //     this.hotelCardList = response;

  //     this.categoryFilteredHotelCardList = [];

  //     this.hotelCardList.forEach((obj: any) => {
  //       obj.categories.forEach((categoryId: any) => {
  //         // console.log(this.params);
  //         if ('$' + categoryId.name == this.params) {
  //           this.categoryFilteredHotelCardList.push(obj);
  //         }
  //       });
  //     });
  //   });
  // }
}
