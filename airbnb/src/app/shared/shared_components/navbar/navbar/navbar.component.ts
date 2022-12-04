import { Component, OnInit } from '@angular/core';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserFrService } from 'src/app/shared/shared_services/user-fr.service';
import { User } from 'src/app/shared/shared_models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userEmail!:null;

  constructor(private modalService: NgbModal, private userServ : UserFrService) {}

  ngOnInit(): void {
  }
  faGlobe = faGlobe;
  faUser = faUser;
  faBars=faBars;
  faFacebook = faFacebook;
  faGoogle=faGoogle;
  displayStyle = "none";
  
  continuePoPup() {
    this.displayStyle = "block";
   
  }
  close() {
    this.displayStyle = "none";
  }
  onclick(){
    
}
  onSignUpFormSubmit(signUpForm:NgForm){
     
    // var tmpUser = Object.assign(new User(),signUpForm.value);
    // this.signUpServ.SignUp(signUpForm.value.email, signUpForm.value.password);
    this.userServ.register(signUpForm.value.email, signUpForm.value.password);
    this.userServ.emailEmitter.subscribe(response => {
      this.userEmail = response;
    })
    signUpForm.reset();
    // UserFrService.signUp(signUpForm.value.email, signUpForm.value.password);
    // this.signUpServ.signUp(tmpUser,signUpForm.value.password ).then(response => {
    //   console.log(response);
    // });
  }
  onloginInFormSubmit(loginInForm:NgForm){
    this.userServ.login(loginInForm.value.email, loginInForm.value.password);
    this.userServ.emailEmitter.subscribe(response => {
      this.userEmail = response;
    })
    loginInForm.reset();
  }


  loginInWithGoogle(){
    this.userServ.googleAuth();
  }



  
}
