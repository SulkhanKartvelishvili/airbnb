import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoryFilterService } from 'src/app/core/http/category/category-filter.service';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HotelCardService } from 'src/app/core/http/hotel_card/hotel-card.service';
import { FilterService } from 'src/app/core/http/filter/filter.service';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.css'],
})
export class CategoryFilterComponent implements OnInit {
  categoryList: [] = [];

  priceFrom!: number;
  priceTo!: number;
  typeOfPlace!: string;
  rooms!: number;
  beds!: number;
  bathrooms!: number;
  propertyType: string = '';
   chosenAmeneties:string[] = [

   ];
   amenetiesForm!:FormGroup;

  //  entirePlace:string = '';
  //  privateRoom:string = '';
  //  sharedRoom:string = '';

  roomsCounter: number[] = [];
  amenetiesList:any[]=[];
  constructor(
    private httpClient: HttpClient,
    private categoryFilterService: CategoryFilterService,
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute,
    private hotelCardServ: HotelCardService,
    private filterServ:FilterService,
    private _formBuilder: FormBuilder
  ) {


    this.amenetiesForm  = this._formBuilder.group({
      bathtub:  this.amenetiesList[0],
      hairDryer: this.amenetiesList[1],
     
    });
  
    

  }

  ngOnInit(): void {
    this.getAllCategory();
    this.getAllAmeneties();
   
  }
  displayStyle = 'none';
  faSliders = faSliders;

  getAllCategory() {
    this.categoryFilterService.readAllCategory().subscribe((response:any) => {
      this.categoryList = response;
    });
  }
  getAllAmeneties(){
    this.filterServ.getAllAmeneties().subscribe((response:any) => {
     this.amenetiesList=response;
     
    })
  }
  

  close() {
    this.displayStyle = 'none';
  

    Object.keys(this.amenetiesForm.controls).forEach(key => {
      if(key !="false"){
              this.chosenAmeneties.push(key);
      }
      
    });
   
    console.log(this.amenetiesForm.value);
    
  }

  filterPopUp() {
    this.displayStyle = 'block';
  }

  AddFilterRooms() {
    this.roomsCounter.push(1);
  }
  onHomePropertyTypeClick() {
    this.propertyType = 'home';
  }
  onVillaProperyTypeClick() {
    this.propertyType = 'villa';
  }

  // console.log(this.queryParams);
  // this.close();

  // this.close();
  // this.activatedRoute.queryParams.subscribe(queryParams => {
}