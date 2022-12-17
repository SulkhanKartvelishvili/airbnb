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
import { FormsModule }   from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import {NgForm} from '@angular/forms';
import { HomeComponent } from './view/home/home/home.component';
import { DashboardComponent } from './view/dashboard/dashboard/dashboard.component';

import { MatInputModule } from '@angular/material/input';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';

import {MatSidenavModule} from '@angular/material/sidenav';
import { UserInfoComponent } from './view/user-info/user-info.component';
import { CategoryFilterComponent } from './view/category-filter/category-filter.component';
import { CategoryFilterCardComponent } from './shared/shared_components/category_filter_card/category-filter-card/category-filter-card.component';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    HotelCardComponent,
    HotelInnerComponent,
    HomeComponent,
    DashboardComponent,
    UserInfoComponent,
    CategoryFilterComponent,
    CategoryFilterCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    CoreModule,
    FontAwesomeModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,     
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
    
    


    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
