import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HotelBookingService {

  constructor(private angularFirestore: AngularFirestore,  public router: Router,private db: AngularFireDatabase) { }

  bookedHotelsList!: AngularFireList<any>;

  bookHotel(hotelData: any) {
    return new Promise<any>((resolve, reject) => {
      this.angularFirestore
        .collection('bookedHotels')
        .add(hotelData)
        .then(
          (response) => {
            // console.log(response);
            this.router.navigate(['dashboard']);
          },
          (error) => reject(error)
        );
    });
  }

  
  getBookedHotelList() {
    // return this.angularFirestore
    //   .collection('bookedHotels')
    //   .snapshotChanges();

    return this.angularFirestore.collection("bookedHotels").snapshotChanges();

  }

}
