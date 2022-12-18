import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelInnerComponent } from './shared/shared_components/hotel_inner/hotel-inner/hotel-inner.component';
import { DashboardComponent } from './view/dashboard/dashboard/dashboard.component';
import { FilteredHotelCardComponent } from './view/filtered_hotel_card/filtered-hotel-card/filtered-hotel-card.component';
import { HomeComponent } from './view/home/home/home.component';
import { UserInfoComponent } from './view/user-info/user-info.component';

const routes: Routes = [


  {path:"", component:HomeComponent},
  // {path:"/id", component:HomeComponent},
  {path:"innerHotel", component:HotelInnerComponent},
  {path:"dashboard", component:DashboardComponent},
 {path:'dashboard/userInfo', component:UserInfoComponent},
  {path:'filtered', component:FilteredHotelCardComponent},

  {path:"home/id", component:HomeComponent, }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
