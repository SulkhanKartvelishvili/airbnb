import { Component, OnInit, ViewChild } from '@angular/core';
import { BankCardService } from 'src/app/shared/shared_services/bankCard/bank-card.service';
import { UserFrService } from 'src/app/shared/shared_services/user-fr.service';
import { bankCard } from "src/app/shared/shared_models/bankCard.model";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { NgForm } from "@angular/forms";
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit{
  

  bankCards: any = [];
  userBankCard: any = null;
  faCreditCard = faCreditCard;
  bankCard!:FormGroup;
  updateBankCard!:FormGroup;
  lastFourDigits!:any;
  displayStyle = 'none';

  // @ViewChild('addBankCard') form!: NgForm;
constructor(private userServ : UserFrService, private bankCardServ: BankCardService,){
  this.bankCard = new FormGroup({
    "holder":new FormControl(null),
    "number":new FormControl(null),
    "expMonth":new FormControl(null),
    "expYear":new FormControl(null),
    "cvv":new FormControl(null)
    
  });
  this.updateBankCard = new FormGroup({
    "updatedHolder":new FormControl(null),
    "updatedNumber":new FormControl(null),
    "updatedExpMonth":new FormControl(null),
    "updatedExpYear":new FormControl(null),
    "updatedCvv":new FormControl(null)
    
  });
}
  ngOnInit(): void {
    this.userData =  JSON.parse(localStorage.getItem("user") || "null");

 this.getBankCard();
  }

  userData!:any;
  onForgotPasswordBtnClick(){
    
    this.userServ.forgotPassword(this.userData.email).then(response => {
      console.log(response);
    });
  }


  onAddBankCard() {

    this.bankCard.value["userId"]= this.userData.uid;
     this.bankCardServ.createBankCard(this.bankCard.value);
    this.bankCard.reset();
    

  
  }

  getBankCard(){
    this.bankCardServ.getBankCardList().subscribe((res) => {
      this.bankCards = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as bankCard),
        };
      });
      

      this.bankCards.forEach((item: any) => {
        if (item.userId == this.userData.uid) {
          this.userBankCard = item;
          this.lastFourDigits = this.userBankCard.number.substring(12, 16);

        }

      });
    });

  }


  deleteBankCard(){
    
   this.bankCardServ.deleteBankCard(this.userBankCard.id);

   this.userBankCard = null;
  }
  openModal(){
console.log(this.userBankCard);
  this.updateBankCard.controls['updatedHolder'].setValue(this.userBankCard.holder);
  this.updateBankCard.controls['updatedNumber'].setValue(this.userBankCard.number);
  this.updateBankCard.controls['updatedExpMonth'].setValue(this.userBankCard.expMonth);
  this.updateBankCard.controls['updatedExpYear'].setValue(this.userBankCard.expYear);
 this.updateBankCard.controls['updatedCvv'].setValue(this.userBankCard.cvv);

  this.displayStyle = 'block';
  }


  OnUpdateBankCard(){
   
    this.updateBankCard.value["userId"]= this.userData.uid;

  this.bankCardServ.updateBankCard(this.updateBankCard.value, this.userBankCard.id);

    this.close();

this.getBankCard();



  }
 
  close() {
    this.displayStyle = 'none';
  }


}
