import { EventEmitter, Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../shared_models/user.model';
import * as firebase from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class UserFrService {

  emailEmitter:EventEmitter<any>=new EventEmitter();

  constructor( public afs: AngularFirestore,
  public auth: AngularFireAuth) { }


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

  // SignUp(email: string, password: string) {
    
  //   return this.auth
  //     .createUserWithEmailAndPassword(email, password)
  //     .then((result) => {
  //       /* Call the SendVerificaitonMail() function when new user sign 
  //       up and returns promise */
        
  //       this.setUserDataForSignUp(result.user);
  //     })
  //     .catch((error) => {
  //       window.alert(error.message);
  //     });
  // }
 
  // setUserDataForSignUp(user: any) {
    
  //   const userRef: AngularFirestoreDocument<any> = this.firestore.doc(
  //     `users/${user.id}`
  //   );
  //   const userData: User = {
  //     id: user.uid,
  //     email: user.email,
  //     password: user.password,
  //   } as User;
  //   return userRef.set(userData, {
  //     merge: true,
  //   });
  // }


login(email:string, password:string){
  this.auth.signInWithEmailAndPassword(email,password).then( () => {
    console.log(email);
    this.emailEmitter.emit(email);

  }, err => {
    alert(err.message);
  })
}

register(email:string, password:string){
  this.auth.createUserWithEmailAndPassword(email, password).then( () => {
    alert('registration success');
    this.emailEmitter.emit(email);
    },
    err => {
      alert(err.message);
    })
}

// getUserDoc(id:string):any{
// return this.firestore.collection('users').doc(id).valueChanges();
// }

googleAuth() {
  return this.authLogin(new firebase.GoogleAuthProvider());
}
// Auth logic to run auth providers
authLogin(provider: any) {
  return this.auth
    .signInWithPopup(provider)
    .then((result) => {
      // this.router.navigate(['dashboard']);
      // this.SetUserData(result.user);
      console.log(result);
    })
    .catch((error) => {
      window.alert(error);
    });
}


}
