import { Component,OnInit } from '@angular/core';
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


}
