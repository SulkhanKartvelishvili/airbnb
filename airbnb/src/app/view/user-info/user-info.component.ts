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
  lastFourDigits!:any;
  // @ViewChild('addBankCard') form!: NgForm;
constructor(private userServ : UserFrService, private bankCardServ: BankCardService,){
  this.bankCard = new FormGroup({
    "holder":new FormControl(null),
    "number":new FormControl(null),
    "expMonth":new FormControl(null),
    "expYear":new FormControl(null),
    "cvv":new FormControl(null)
    
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
  updateBankCard(){
 
    this.bankCardServ.deleteBankCard(this.userBankCard.id);
    this.bankCard.controls['holder'].setValue(this.userBankCard.holder);
    this.bankCard.controls['number'].setValue(this.userBankCard.number);
    this.bankCard.controls['expMonth'].setValue(this.userBankCard.expMonth);
    this.bankCard.controls['expYear'].setValue(this.userBankCard.expYear);
   this.bankCard.controls['cvv'].setValue(this.userBankCard.cvv);
   this.userBankCard = null;


  }


}
