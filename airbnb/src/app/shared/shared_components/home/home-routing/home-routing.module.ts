import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelInnerComponent } from '../hotel_inner/hotel-inner/hotel-inner.component';
import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';


const routes: Routes = [
  {path:'', component:HomeComponent}
  {path:'hotel_inner', component:HotelInnerComponent}
  ];


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class HomeRoutingModule { }
