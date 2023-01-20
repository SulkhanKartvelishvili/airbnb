import { Component, OnInit } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { NgForm } from '@angular/forms';
import {

  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { UserFrService } from 'src/app/shared/shared_services/user/user-fr.service';
import { User } from 'src/app/shared/shared_models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
 

  userData!: any;

  constructor(
    private modalService: NgbModal,
    private userServ: UserFrService,
    private router: Router,

  ) {}

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('user')!);
  }
  faBars = faBars;
  faFacebook = faFacebook;
  faGoogle = faGoogle;
  displayStyle = 'none';

  continuePoPup() {
    this.displayStyle = 'block';
  }


  onSignUpFormSubmit(signUpForm: NgForm) {
    var tmpUser = Object.assign(new User(), signUpForm.value);

   
    this.userServ.signUp(tmpUser, signUpForm.value.password);
    this.userServ.userDataEmitter.subscribe((response) => {
      this.userData = response;

    });

    signUpForm.reset();
 
  }
  onloginInFormSubmit(loginInForm: NgForm) {
    this.userServ.signIn(loginInForm.value.email, loginInForm.value.password);
   
    this.userServ.userDataEmitter.subscribe((response) => {
      this.userData = JSON.parse(localStorage.getItem('user') || 'null');
     
      
    });

    loginInForm.reset();
  }

  logout() {
    this.userData = localStorage.setItem('user', 'null');
    this.router.navigate(['']);
  }

  onSignInWithGoogleBtnClick() {
    this.userServ.googleAuth().then((response) => {
      this.userData = JSON.parse(localStorage.getItem('user') || 'null');
      
      
    });
  }


  public open(modal: any): void {
    this.modalService.open(modal);
  }
  
  
}
