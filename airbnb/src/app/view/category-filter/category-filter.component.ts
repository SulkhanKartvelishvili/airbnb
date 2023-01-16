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
  propertyType:string[] =[];
   chosenAmeneties:string[] = [

   ];
   counter = 0;
   amenetiesForm!:FormGroup;
   chosenAmenetiesUrl!:string;
   language!:any;

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
    private _formBuilder: FormBuilder,
    private route:Router
  ) {


    this.amenetiesForm  = this._formBuilder.group({
      "Bathtub":  this.amenetiesList[0], 
      "Hair dryer": this.amenetiesList[1],
      "Cleaning products":this.amenetiesList[2],
      "Shampoo":this.amenetiesList[3],
      "Conditioner":this.amenetiesList[4],
      "Body soap":this.amenetiesList[5],
      "Bidet":this.amenetiesList[6],
      "Shower gel":this.amenetiesList[8],
      "Heating":this.amenetiesList[17],
      "Refrigerator":this.amenetiesList[20],
      "Mini fridge":this.amenetiesList[21],
      "Coffee maker":this.amenetiesList[22],
      "Fire pit":this.amenetiesList[26],
      "Free street parking":this.amenetiesList[30],
      "Dishwasher":this.amenetiesList[40],
      "Satellite television":this.amenetiesList[42],
      "Smart television":this.amenetiesList[43],
      "Integrated sound system":this.amenetiesList[44],
      "Wi-Fi":this.amenetiesList[45],
      "Air conditioning":this.amenetiesList[46],
      "Extra pillows and blankets":this.amenetiesList[51],
      "TV":this.amenetiesList[52],
      "Smoke alarm":this.amenetiesList[57],
      "Fire extinguisher":this.amenetiesList[58],
      "First aid kit":this.amenetiesList[59],
      "Kitchen":this.amenetiesList[60],
      "Cooking basics":this.amenetiesList[61],
      "Dishes and silverware":this.amenetiesList[62]
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


  
  saveAmeneties(){
    this.displayStyle = 'none';
    this.chosenAmeneties = [];
    Object.keys(this.amenetiesForm.controls).forEach((key:string) => {
      
     
      const abstractControl = this.amenetiesForm.get(key);
      if(abstractControl instanceof FormGroup){
       return;
     }else{
      if(abstractControl!.value == true){
        this.chosenAmenetiesUrl += `${key}`;
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
          typeOfPlace:this.typeOfPlace,
          RoomsCount:this.rooms,
          BedsPerRoomCount:this.bathrooms,
           propertyType:this.propertyType,
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

  //  console.log(this.chosenAmeneties);
  //   console.log(this.chosenAmenetiesUrl);


// console.log(this.chosenAmenetiesUrl);


  }


  filterPopUp() {
    this.displayStyle = 'block';
  }


  onHomePropertyTypeClick() {
    // this.propertyType.push("home");
    this.propertyType[0]="home";
    var x = document.getElementById("home");
    if(x!=null){
    x.classList.remove("btn-light");
    x.classList.add("btn-dark");
  }
  }
  onVillaProperyTypeClick() {
    // this.propertyType.push("villa");
    this.propertyType[1]="villa";
    var x = document.getElementById("villa");
    if(x!=null){
    x.classList.remove("btn-light");
    x.classList.add("btn-dark");
  }
  }

  // console.log(this.queryParams);
  // this.close();

  // this.close();
  // this.activatedRoute.queryParams.subscribe(queryParams => {
}
