import { EventEmitter, Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../shared_models/user.model';
import * as firebase from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class UserFrService {

   userDataEmitter:EventEmitter<any>=new EventEmitter();
  userData: any;

  constructor( public afs: AngularFirestore,
  public auth: AngularFireAuth) { 
 
  // this.auth.authState.subscribe((user) => {
  //   if (user) {
  //     this.userData = user;
  //     localStorage.setItem('user', JSON.stringify(this.userData));
  //     JSON.parse(localStorage.getItem('user')!);
  //   } else {
  //     localStorage.setItem('user', 'null');
  //     JSON.parse(localStorage.getItem('user')!);
  //   }
  // });
}



signUp(user: User, password: string) {
  
  return this.auth
    .createUserWithEmailAndPassword(user.email, password)
    .then((result) => {
      // this.sendVerificationMail();
      this.setUserDataForSignUp(result.user, user);
      // this.emailEmitter.emit(user.email);
      
      localStorage.setItem('user', JSON.stringify(user));
      this.userData =  JSON.parse(localStorage.getItem("user") || "null");
      this.userDataEmitter.emit(this.userData);
    })
    .catch((error) => {
      window.alert(error.message);
    });
}

setUserDataForSignUp(fireUser: any, user: User) {
  
  const userRef: AngularFirestoreDocument<any> = this.afs.doc(
    `users/${fireUser.uid}`
  );
  const userData: User = {
    id: fireUser.uid,
    email: fireUser.email,
    password: fireUser.displayName,
    
  } as User;
  return userRef.set(userData, {
    merge: true,
  });
}


signIn(email: string, password: string) {
  return this.auth
    .signInWithEmailAndPassword(email, password)
    .then((result) => {
      this.auth.authState.subscribe((user) => {
        if (user) {
          
          // console.log(user.email);
          
           
          localStorage.setItem('user', JSON.stringify(user));
          this.userData =  JSON.parse(localStorage.getItem("user") || "null");
          this.userDataEmitter.emit(this.userData);
        }
      });
      return this.getUserDoc(result.user?.uid ?? "");
    })
    .catch((error) => {
      window.alert(error.message);
    });
}

getUserDoc(id: string): any {
  return this.afs
    .collection('users')
    .doc(id)
    .valueChanges();
}


googleAuth() {
  return this.authLogin(new firebase.GoogleAuthProvider());
}

authLogin(provider: any) {
  return this.auth
    .signInWithPopup(provider)
    .then((result) => {
      localStorage.setItem('user', JSON.stringify(result.user));
      this.userData =  JSON.parse(localStorage.getItem("user") || "null");
      this.userDataEmitter.emit(result.user);
      return this.getUserDoc(result.user?.uid ?? "");
    })
    .catch((error) => {
      window.alert(error);
    });
}

forgotPassword(passwordResetEmail: string) {
  return this.auth
    .sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    })
    .catch((error) => {
      window.alert(error);
    });
}



}
