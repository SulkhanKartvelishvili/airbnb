import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelInnerComponent } from './shared/shared_components/hotel_inner/hotel-inner/hotel-inner.component';
import { HomeComponent } from './view/home/home/home.component';

const routes: Routes = [
  {path:"home", component:HomeComponent},
  {path:"innerHotel", component:HotelInnerComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
