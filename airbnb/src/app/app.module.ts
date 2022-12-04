import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { FooterComponent } from './shared/shared_components/footer/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from './shared/shared_components/navbar/navbar/navbar.component';
import { HotelCardComponent } from './shared/shared_components/hotel_card/hotel-card/hotel-card.component';
import { HotelInnerComponent } from './shared/shared_components/hotel_inner/hotel-inner/hotel-inner.component';
<<<<<<< Updated upstream
import { HomeComponent } from './view/home/home/home.component';
=======
import { HomeComponent } from './shared/shared_components/home/home/home.component';
>>>>>>> Stashed changes


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    HotelCardComponent,
    HotelInnerComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    CoreModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
