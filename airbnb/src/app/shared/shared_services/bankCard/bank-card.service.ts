import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class BankCardService {

  constructor(private angularFirestore: AngularFirestore) { }



  createBankCard(bankCard: any) {
    return new Promise<any>((resolve, reject) => {
      this.angularFirestore
        .collection('card')
        .add(bankCard)
        .then(
          (response) => {
            // console.log(response);
          },
          (error) => reject(error)
        );
    });
  }

  getUserList() {
    return this.angularFirestore
      .collection('card')
      .snapshotChanges();
  }
}
