import { Component, OnInit, ViewChild } from '@angular/core';
import { BankCardService } from 'src/app/shared/shared_services/bankCard/bank-card.service';
import { UserFrService } from 'src/app/shared/shared_services/user-fr.service';
import { bankCard } from "src/app/shared/shared_models/bankCard.model";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit{
  

  bankCards: any = [];
  userBankCard: any = null;
  faCreditCard = faCreditCard;
  @ViewChild('addBankCard') form!: NgForm;
constructor(private userServ : UserFrService, private bankCardServ: BankCardService,){

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


  onAddBankCard(addBankCard: NgForm) {
    const bankCard: {
      userId: string;
      holder: string;
      number: number;
      expirationDate: string;
      cvv: number;
    } = {
      userId: this.userData.uid,
      holder: addBankCard.value.holder,
      number: addBankCard.value.number,
      expirationDate: `${addBankCard.value.start}-${addBankCard.value.end}`,
      cvv: addBankCard.value.cvv,
    };
    this.bankCardServ.createBankCard(bankCard);

 
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
          this.userBankCard.number = this.userBankCard.number.substring(12, 16);
        }
    
      });
    });
  }


  deleteBankCard(){
   this.bankCardServ.deleteBankCard(this.userBankCard.id);

   this.userBankCard = null;
  }
  updateBankCard(){
    // this.bankCardServ.deleteBankCard(this.userBankCard.id);

    // console.log(this.form.value);
    // console.log(this.userBankCard);
    // this.form.get("cvv").setValue(1);
    //  this.userBankCard = null;

  }


}
