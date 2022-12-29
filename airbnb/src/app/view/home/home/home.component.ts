import { Component, OnInit } from '@angular/core';
import { HotelCardService } from 'src/app/core/http/hotel_card/hotel-card.service';
import { CategoryFilterCardComponent } from 'src/app/view/category_filter_card/category-filter-card/category-filter-card.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

hotelCardList: string[]=[];
categoryFilteredHotelCardList: string[]=[];
showAllHotelCard:boolean = true;
params!:string;
  constructor(private hotelCardServ:HotelCardService,  private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllHotelCard();

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

    
    isSpoiled(showAllHotelCard:boolean){
     
     this.showAllHotelCard=showAllHotelCard;
     
    }
   
}
 

