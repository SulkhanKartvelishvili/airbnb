import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../shared_models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserFrService {
  firestore: any;


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
  }, err => {
    alert(err.message);
  })
}

register(email:string, password:string){
  this.auth.createUserWithEmailAndPassword(email, password).then( () => {
    alert('registration success');
    },
    err => {
      alert(err.message);
    })
}


}
