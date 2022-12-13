import { Component,EventEmitter,OnInit, Output } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { CategoryFilterService } from 'src/app/core/http/category/category-filter.service';
import {faSliders} from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


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
   price:number = 0;
   pricetwo:number =0;

  constructor(private httpClient:HttpClient, private categoryFilterService:CategoryFilterService, private modalService: NgbModal) { }

  ngOnInit(): void {

    this.getAllCategory();
  



  }
  displayStyle = "none";
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

close() {
  this.displayStyle = "none";
}

filterPopUp() {
  this.displayStyle = "block";
 
}


}
