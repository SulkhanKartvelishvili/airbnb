import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoryFilterService } from 'src/app/core/http/category/category-filter.service';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormArray, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute,Router } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';


import { HotelCardService } from 'src/app/core/http/hotel_card/hotel-card.service';
import { FilterService } from 'src/app/core/http/filter/filter.service';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.css'],
})
export class CategoryFilterComponent implements OnInit {
  public isCollapsed = true;

  categoryList: [] = [];
  priceFrom!: number;
  priceTo!: number;
  rooms:string[]=[];
  beds:string[]=[];
  bathrooms:string[]=[];
  chosenTypeOfPlaces:string[] =[];
  chosenAmeneties:string[] = [];
  chosenpropertyTypes:string[]=[];
  chosenLanguages:string[]=[];
  amenetiesForm!:FormGroup;
  typeOfPlaceForm!:FormGroup;
  languageForm!:FormGroup;
  priceForm!:FormGroup;

  amenetiesList:any[]=[];



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
      'private room':'',
      'shared room':''
    })

    this.languageForm = this._formBuilder.group({
      'English':'',
      'Russian':'',
      'French':'',

    })

   this.priceForm = new FormGroup({
    'priceFrom':new FormControl(null),
    'priceTo':new FormControl(null),
   }) 


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
  clear(){
  this.amenetiesForm.reset();
  this.typeOfPlaceForm.reset();
  this.languageForm.reset();
  this.roomChose("null");
  this.bedChose("null");
  this.bathChose("null");
  this.onPropertyTypeClick("null");
  this.priceForm.reset();
  }

  
  onFilterClick(){
    // this.displayStyle = 'none';
   
    console.log(this.priceForm.value);

    Object.keys(this.languageForm.controls).forEach((key:string) => {
      
     
      const abstractControl = this.languageForm.get(key);
      if(abstractControl instanceof FormGroup){
       return;
     }else{
      if(abstractControl!.value == true){
    
              this.chosenLanguages.push(key);
      }
     }
     }) 
    

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
          PriceFrom:this.priceForm.value.priceFrom,
          PriceTo: this.priceForm.value.priceTo,
          typeOfPlace:this.chosenTypeOfPlaces,
          RoomsCount:this.rooms[0]?.substring(4,5),
          BedsPerRoomCount:this.beds[0]?.substring(3,4),
          BathRoomsCount:this.bathrooms[0]?.substring(4,5),
          propertyType:this.chosenpropertyTypes,
          HostLanguages: this.chosenLanguages
        },
        }
      );
      this.chosenAmeneties = [];
      this.chosenpropertyTypes = [];
      this.rooms =[];
      this.bathrooms = [];
      this.beds = [];
      this.chosenLanguages =[];
      this.chosenTypeOfPlaces = [];
      this.priceForm.reset();
      this.amenetiesForm.reset();
      this.typeOfPlaceForm.reset();
      this.languageForm.reset();
      
  }
  
  roomChose(id:string){

if(id == "anyRoom"){
  var anyRoomBtn = document.getElementById("anyRoom");
  anyRoomBtn?.classList.remove("btn-light");
  anyRoomBtn?.classList.add("btn-dark");

  var lastBtnId= this.rooms.pop()!?.toString();
  var lastBtn = document.getElementById(lastBtnId);
  lastBtn?.classList.add("btn-light");
  lastBtn?.classList.remove("btn-dark");
}
else if(id == "null"){
  var lastBtnId= this.rooms.pop()!?.toString();
  var lastBtn = document.getElementById(lastBtnId);
  lastBtn?.classList.add("btn-light");
  lastBtn?.classList.remove("btn-dark");
  this.rooms = [];
  var anyRoomBtn = document.getElementById("anyRoom");
  anyRoomBtn?.classList.add("btn-dark");
  anyRoomBtn?.classList.remove("btn-light");
}
else if(id != "anyRoom"){
  var anyRoomBtn = document.getElementById("anyRoom");
  anyRoomBtn?.classList.remove("btn-dark");
  anyRoomBtn?.classList.add("btn-light");

  var lastBtnId= this.rooms.pop()!?.toString();
  var lastBtn = document.getElementById(lastBtnId);
  lastBtn?.classList.add("btn-light");
  lastBtn?.classList.remove("btn-dark");

  this.rooms.push(id);

  var btn = document.getElementById(id);
  btn?.classList.remove("btn-light");
  btn?.classList.add("btn-dark");
}

}

bedChose(id:string){
  if(id == "anyBed"){
    var anyBedBtn = document.getElementById("anyBed");
    anyBedBtn?.classList.remove("btn-light");
    anyBedBtn?.classList.add("btn-dark");
  
    var lastBtnId= this.beds.pop()!?.toString();
    var lastBtn = document.getElementById(lastBtnId);
    lastBtn?.classList.add("btn-light");
    lastBtn?.classList.remove("btn-dark");
  }
  else if(id == "null"){
    var lastBtnId= this.beds.pop()!?.toString();
    var lastBtn = document.getElementById(lastBtnId);
    lastBtn?.classList.add("btn-light");
    lastBtn?.classList.remove("btn-dark");
    this.beds = [];
    var anyBedBtn = document.getElementById("anyBed");
    anyBedBtn?.classList.add("btn-dark");
    anyBedBtn?.classList.remove("btn-light");
  }
  else if(id != "anyBed"){
    var anyBedBtn = document.getElementById("anyBed");
    anyBedBtn?.classList.remove("btn-dark");
    anyBedBtn?.classList.add("btn-light");
  
    var lastBtnId= this.beds.pop()!?.toString();
    var lastBtn = document.getElementById(lastBtnId);
    lastBtn?.classList.add("btn-light");
    lastBtn?.classList.remove("btn-dark");
  
    this.beds.push(id);
  
    var btn = document.getElementById(id);
    btn?.classList.remove("btn-light");
    btn?.classList.add("btn-dark");
  }
  
}
bathChose(id:string){
  if(id == "anyBath"){
    var anyBathBtn = document.getElementById("anyBath");
    anyBathBtn?.classList.remove("btn-light");
    anyBathBtn?.classList.add("btn-dark");
  
    var lastBtnId= this.bathrooms.pop()!?.toString();
    var lastBtn = document.getElementById(lastBtnId);
    lastBtn?.classList.add("btn-light");
    lastBtn?.classList.remove("btn-dark");
  }
  else if(id == "null"){
    var lastBtnId= this.bathrooms.pop()!?.toString();
    var lastBtn = document.getElementById(lastBtnId);
    lastBtn?.classList.add("btn-light");
    lastBtn?.classList.remove("btn-dark");
    this.bathrooms = [];
    var anyBathBtn = document.getElementById("anyBath");
    anyBathBtn?.classList.add("btn-dark");
    anyBathBtn?.classList.remove("btn-light");
  }
  else if(id != "anyBath"){
    var anyBathBtn = document.getElementById("anyBath");
    anyBathBtn?.classList.remove("btn-dark");
    anyBathBtn?.classList.add("btn-light");
  
    var lastBtnId= this.bathrooms.pop()!?.toString();
    var lastBtn = document.getElementById(lastBtnId);
    lastBtn?.classList.add("btn-light");
    lastBtn?.classList.remove("btn-dark");
  
    this.bathrooms.push(id);
  
    var btn = document.getElementById(id);
    btn?.classList.remove("btn-light");
    btn?.classList.add("btn-dark");
  }
  
}
onPropertyTypeClick(propertyType:string){
  if(propertyType != "null"){
  if(!this.chosenpropertyTypes.includes(propertyType)){
this.chosenpropertyTypes.push(propertyType);
var btn = document.getElementById(propertyType);
btn?.classList.remove("defaultPropertyTypeBtn");
btn?.classList.add("activePropertyTypeBtn");
}
else if(this.chosenpropertyTypes.includes(propertyType)){
  this.chosenpropertyTypes.splice(this.chosenpropertyTypes.indexOf(propertyType), 1);
  var btn = document.getElementById(propertyType);
  btn?.classList.add("defaultPropertyTypeBtn");
  btn?.classList.remove("activePropertyTypeBtn");
}
}
else{
  var homeBtn = document.getElementById(this.chosenpropertyTypes[0]);
  var villaBtn = document.getElementById(this.chosenpropertyTypes[1]);
  if(homeBtn){
    homeBtn?.classList.add("defaultPropertyTypeBtn");

    homeBtn.classList.remove("activePropertyTypeBtn")
  } 
  if(villaBtn){
    villaBtn?.classList.add("defaultPropertyTypeBtn");

    villaBtn.classList.remove("activePropertyTypeBtn");
  }
  this.chosenpropertyTypes = [];
}
}
seeMore(){
  var seeMoreBtn = document.querySelector<HTMLElement>("#seeMore");
  if(seeMoreBtn && seeMoreBtn.innerHTML != "Show less"){
    seeMoreBtn.innerHTML = "Show less";
  }
  else   
  if(seeMoreBtn && seeMoreBtn.innerHTML != "Show more"){

    seeMoreBtn.innerHTML = "Show more";

    

  }
}
  

  // filterPopUp() {
  //   this.displayStyle = 'block';
  // }


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
