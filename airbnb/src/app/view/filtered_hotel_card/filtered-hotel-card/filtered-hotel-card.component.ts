import { Component, OnInit } from '@angular/core';
import { HotelCardService } from 'src/app/core/http/hotel_card/hotel-card.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filtered-hotel-card',
  templateUrl: './filtered-hotel-card.component.html',
  styleUrls: ['./filtered-hotel-card.component.css']
})
export class FilteredHotelCardComponent implements OnInit  {
  

  hotelCardList: string[]=[];
  categoryFilteredHotelCardList: string[]=[];
  showAllHotelCard:boolean = true;

  constructor( private activatedRoute:ActivatedRoute, private hotelCardServ:HotelCardService){}

 
  ngOnInit(): void {
 
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.hotelCardServ.readAllfilteredHotelCard(queryParams).subscribe(response => {
        console.log(response);
        this.hotelCardList = response;
      })
    })
  }


  getAllHotelCard(){
    this.hotelCardServ.readAllHotelCard().subscribe(response => {
    
       this.hotelCardList = response;
      
    });

  }

  getCategoryCardItemId(id:any){
    
   
    this.showAllHotelCard=false;

    

    this.categoryFilteredHotelCardList = [];

  
    this.hotelCardList.forEach((obj:any) => {
    
      obj.categories.forEach((categoryId:any) =>{

        if(categoryId.id == id){
          
           this.categoryFilteredHotelCardList.push(obj);
        }
      } )
     
     })
    


 
    };

    
     

}


