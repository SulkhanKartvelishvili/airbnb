import { Component,EventEmitter,OnInit, Output } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { CategoryFilterService } from 'src/app/core/http/category/category-filter.service';
import {faSliders} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.css']
})
export class CategoryFilterComponent implements OnInit {

   categoryList:[]=[];  
   showAllHotelCard:boolean = false;
   @Output()
   categoryCardItemIdEmitter:EventEmitter<any>=new EventEmitter();
   @Output()
   showAllHotelCardEventEmitter:EventEmitter<any>=new EventEmitter();
  constructor(private httpClient:HttpClient, private categoryFilterService:CategoryFilterService) { }

  ngOnInit(): void {

    this.getAllCategory();
  



  }
  faSliders=faSliders;

getAllCategory(){
  this.categoryFilterService.readAllCategory().subscribe(response => {
  
     this.categoryList = response;
     
  })
}
getCategoryCardItemId(id:any){

  this.categoryCardItemIdEmitter.emit(id);
}

showBackAllHotelCard(){
  this.showAllHotelCard=true;
  this.showAllHotelCardEventEmitter.emit(this.showAllHotelCard);
}


}
