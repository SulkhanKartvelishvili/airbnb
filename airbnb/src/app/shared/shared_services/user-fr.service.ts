import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../shared_models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserFrService {
  static signUp(email: any, password: any) {
    throw new Error('Method not implemented.');
  }

  constructor( public afs: AngularFirestore,
  public afAuth: AngularFireAuth) { }


  // getUserDoc(id) {
  //   return this.angularFirestore
  //     .collection('user-collection')
  //     .doc(id)
  //     .valueChanges();
  // }

  // getUserList() {
  //   return this.angularFirestore
  //     .collection('user-collection')
  //     .snapshotChanges();
  // }

  signUp(email: string, password: string) {
      return this.afAuth
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
        
          this.SetUserData(result.user);
        })
        .catch((error) => {
          window.alert(error.message);
        });
  }
  
  SetUserData(user: any) {
    console.log(user);
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      id: user.uid,
      email: user.email,
      password: user.password,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  

}
