import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { HotelInnerComponent } from './shared/shared_components/hotel_inner/hotel-inner/hotel-inner.component';
import { CategoryFilterCardComponent } from './view/category_filter_card/category-filter-card/category-filter-card.component';
import { CategoryFilterHotelCardComponent } from './view/category_filter_hotel_card/category-filter-hotel-card/category-filter-hotel-card.component';
import { DashboardComponent } from './view/dashboard/dashboard/dashboard.component';
import { FilteredHotelCardComponent } from './view/filtered_hotel_card/filtered-hotel-card/filtered-hotel-card.component';
import { HomeComponent } from './view/home/home/home.component';
import { UserInfoComponent } from './view/user-info/user-info.component';

const routes: Routes = [


  {path:"", component:HomeComponent},
  {path:"innerHotel/:id", component:HotelInnerComponent},
  {path:"dashboard", component:DashboardComponent, canActivate:[AuthGuard]},
  {path:'dashboard/userInfo', component:UserInfoComponent},
  {path:'filtered', component:FilteredHotelCardComponent},
  {path:'category-filtered/:name', component:CategoryFilterHotelCardComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
