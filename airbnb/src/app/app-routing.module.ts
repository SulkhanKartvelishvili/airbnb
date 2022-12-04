import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< Updated upstream
import { HotelInnerComponent } from './shared/shared_components/hotel_inner/hotel-inner/hotel-inner.component';
import { HomeComponent } from './view/home/home/home.component';

const routes: Routes = [
  {path:"home", component:HomeComponent},
  {path:"innerHotel", component:HotelInnerComponent},
  
=======
import { AppComponent } from './app.component';
import { HotelInnerComponent } from './shared/shared_components/hotel_inner/hotel-inner/hotel-inner.component';

const routes: Routes = [

{path:'hotel_inner', component:HotelInnerComponent}
>>>>>>> Stashed changes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
