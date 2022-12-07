import { Component, OnInit } from '@angular/core';
import { UserFrService } from 'src/app/shared/shared_services/user-fr.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit{
  
constructor(private userServ : UserFrService){

}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  userData!:any;
  onForgotPasswordBtnClick(){
    this.userData =  JSON.parse(localStorage.getItem("user") || "null");
    console.log(this.userData.email);
    this.userServ.forgotPassword(this.userData.email).then(response => {
      console.log(response);
    });
  }

}
