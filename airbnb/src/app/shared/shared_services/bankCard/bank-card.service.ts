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
    console.log(bankCard);
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
  updateBankCard(updatedBankCard: any, updatedBankCardId:any) {
    return this.angularFirestore.collection('card').doc(updatedBankCardId).update({
      holder: updatedBankCard.updatedHolder,
      number: updatedBankCard.updatedNumber,
      expMonth: updatedBankCard.updatedExpMonth,
      expYear:updatedBankCard.updatedExpYear,
      cvv:updatedBankCard.updatedCvv
    });
  }

}
