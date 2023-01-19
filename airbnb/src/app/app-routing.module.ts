import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { BookingComponent } from './shared/shared_components/booking/booking/booking.component';
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
  {path:"category-filtered/:id/innerHotel/:id", component:HotelInnerComponent},
  {path:"filtered/innerHotel/:id", component:HotelInnerComponent},
  {path:"dashboard/innerHotel/:id", component:HotelInnerComponent, canActivate:[AuthGuard]},
  {path:"dashboard", component:DashboardComponent, canActivate:[AuthGuard]},
  {path:'dashboard/userInfo', component:UserInfoComponent, canActivate:[AuthGuard]},
  {path:'filtered', component:FilteredHotelCardComponent},
  {path:'category-filtered/:id', component:CategoryFilterHotelCardComponent},
  {path:'innerHotel/:id/booking', component:BookingComponent, canActivate:[AuthGuard]},
  {path:'dashboard/hotel_inner/:id/booking', component:BookingComponent, canActivate:[AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
