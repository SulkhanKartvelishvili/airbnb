import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { bankCard } from '../../shared_models/bankCard.model';

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

  getBankCardList() {
    return this.angularFirestore
      .collection('card')
      .snapshotChanges();
  }

  deleteBankCard(cardId:any) {
    return this.angularFirestore
      .collection('card')
      .doc(cardId)
      .delete();
  }
  // updateBankCard(bankCard: bankCard, bankCardId:any) {
  //   return this.angularFirestore.collection('card').doc(bankCardId).update({
  //     holder: bankCard.holder,
  //     number: bankCard.number,
  //     expirationDate: bankCard.expirationDate,
  //     cvv:bankCard.cvv
  //   });
  // }

}
