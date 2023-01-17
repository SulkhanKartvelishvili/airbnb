import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoryFilterService } from 'src/app/core/http/category/category-filter.service';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute,Router } from '@angular/router';
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
  chosenTypeOfPlaces:string[] =[];
   chosenAmeneties:string[] = [];
   amenetiesForm!:FormGroup;
   typeOfPlaceForm!:FormGroup;

   language!:any;

 
  amenetiesList:any[]=[];

  entirePlace = '';

  constructor(
    private httpClient: HttpClient,
    private categoryFilterService: CategoryFilterService,
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute,
    private hotelCardServ: HotelCardService,
    private filterServ:FilterService,
    private _formBuilder: FormBuilder,
    private route:Router
  ) {


    this.amenetiesForm  = this._formBuilder.group({
      "Bathtub":  '', 
      "Hair dryer": '',
      "Cleaning products":'',
      "Shampoo":'',
      "Conditioner":'',
      "Body soap":'',
      "Bidet":'',
      "Shower gel":'',
      "Heating":'',
      "Refrigerator":'',
      "Mini fridge":'',
      "Coffee maker":'',
      "Fire pit":'',
      "Free street parking":'',
      "Dishwasher":'',
      "Satellite television":'',
      "Smart television":'',
      "Integrated sound system":'',
      "Wi-Fi":'',
      "Air conditioning":'',
      "Extra pillows and blankets":'',
      "TV":'',
      "Smoke alarm":'',
      "Fire extinguisher":'',
      "First aid kit":'',
      "Kitchen":'',
      "Cooking basics":'',
      "Dishes and silverware":''
    });

    this.typeOfPlaceForm = this._formBuilder.group({
      'entire place':'',
      "private room":'',
      "shared room":''
    })
  


  }

  ngOnInit(): void {
    
    this.getAllCategory();
    this.getAllAmeneties();
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


  
  onFilterClick(){
    // this.displayStyle = 'none';
    this.chosenAmeneties = [];
    this.chosenTypeOfPlaces = [];

    Object.keys(this.typeOfPlaceForm.controls).forEach((key:string) => {
      
     
      const abstractControl = this.typeOfPlaceForm.get(key);
      if(abstractControl instanceof FormGroup){
       return;
     }else{
      if(abstractControl!.value == true){
    
              this.chosenTypeOfPlaces.push(key);
      }
     }
     })
    

    Object.keys(this.amenetiesForm.controls).forEach((key:string) => {
     
     
      const abstractControl = this.amenetiesForm.get(key);
      if(abstractControl instanceof FormGroup){
       return;
     }else{
     
      if(abstractControl!.value == true){

              this.chosenAmeneties.push(key);
      }
     }
     })
    this.route.navigate(
      ['/filtered'],
      {
        queryParams: { 
          Amenities: this.chosenAmeneties,
          PriceFrom:this.priceFrom,
          PriceTo: this.priceTo,
          typeOfPlace:this.chosenTypeOfPlaces,
          RoomsCount:this.rooms,
          BedsPerRoomCount:this.bathrooms,
          //  propertyType:this.chosenTypeOfPlaces,
           HostLanguages: this.language
        },
        }
      );
  }
  close() {
    this.displayStyle = 'none';
//      PriceFrom: priceFrom,
// PriceTo: priceTo,
// typeOfPlace: typeOfPlace,
// RoomsCount: rooms,
// BedsPerRoomCount: beds,
// BathRoomsCount: bathrooms,
// PropertyType: propertyType 




  }


  filterPopUp() {
    this.displayStyle = 'block';
  }


  // onHomePropertyTypeClick() {
   
  //   this.propertyType[0]="home";
  //   var x = document.getElementById("home");
  //   if(x!=null){
  //   x.classList.remove("btn-light");
  //   x.classList.add("btn-dark");
  // }
  // }
  // onVillaProperyTypeClick() {
    
  //   this.propertyType[1]="villa";
  //   var x = document.getElementById("villa");
  //   if(x!=null){
  //   x.classList.remove("btn-light");
  //   x.classList.add("btn-dark");
  // }
  // }
  public open(modal: any): void {
    this.modalService.open(modal, { size: 'lg',  scrollable: true  });
  }
  // console.log(this.queryParams);
  // this.close();

  // this.close();
  // this.activatedRoute.queryParams.subscribe(queryParams => {
}
