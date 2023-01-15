import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoryFilterService } from 'src/app/core/http/category/category-filter.service';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
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
   counter = 0;
   amenetiesForm!:FormGroup;
   chosenAmenetiesUrl!:string;

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
      shampoo:this.amenetiesList[3]
    });
  
    

  }

  ngOnInit(): void {
    
    this.getAllCategory();
    this.getAllAmeneties();
    this.counter = 0;
    this.chosenAmeneties = [];
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


  
  saveAmeneties(amenetie:any){
    
    // Object.keys(this.amenetiesForm.controls).forEach((key:string) => {
      
     
    //   const abstractControl = this.amenetiesForm.get(key);
    //   if(abstractControl instanceof FormGroup){
    //    return;
    //  }else{
    //   if(abstractControl!.value == true){
    //     // this.chosenAmenetiesUrl += `&${key}`;
    //           this.chosenAmeneties.push(key);
    //   }
    //  }
    //  })
        // this.chosenAmenetiesUrl = `${key}`;
    //  console.log(this.chosenAmenetiesUrl);
     this.chosenAmeneties.push(amenetie);
     for(var i =0; i<this.chosenAmeneties.length; i++){
      this.chosenAmenetiesUrl += `&${this.chosenAmeneties[i]}`;
      console.log(this.chosenAmeneties[i]);
    }
  }
  close() {
    this.displayStyle = 'none';

   


  //  console.log(this.chosenAmeneties);
  //   console.log(this.chosenAmenetiesUrl);


// console.log(this.chosenAmenetiesUrl);
  }

  logKeyValuePairs(group:FormGroup):void{
    // this.chosenAmenetiesUrl = "";


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
