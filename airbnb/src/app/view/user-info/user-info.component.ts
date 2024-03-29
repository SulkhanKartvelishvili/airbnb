import { Component, OnInit } from "@angular/core";
import { BankCardService } from "src/app/shared/shared_services/bankCard/bank-card.service";
import { UserFrService } from "src/app/shared/shared_services/user/user-fr.service";
import { bankCard } from "src/app/shared/shared_models/bankCard.model";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormControl, FormGroup } from "@angular/forms";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-info",
  templateUrl: "./user-info.component.html",
  styleUrls: ["./user-info.component.css"],
})
export class UserInfoComponent implements OnInit {
  bankCards: any = [];
  userBankCard: any = null;
  bankCard!: FormGroup;
  updateBankCard!: FormGroup;
  lastFourDigits!: any;

  constructor(
    private userServ: UserFrService,
    private bankCardServ: BankCardService,
    private modalService: NgbModal,
    private router: Router
  ) {
    this.bankCard = new FormGroup({
      holder: new FormControl(null),
      number: new FormControl(null),
      expMonth: new FormControl(null),
      expYear: new FormControl(null),
      cvv: new FormControl(null),
    });
    this.updateBankCard = new FormGroup({
      updatedHolder: new FormControl(null),
      updatedNumber: new FormControl(null),
      updatedExpMonth: new FormControl(null),
      updatedExpYear: new FormControl(null),
      updatedCvv: new FormControl(null),
    });
  }
  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem("user") || "null");

    this.getBankCard();
  }

  userData!: any;
  onForgotPasswordBtnClick() {
    this.userServ.forgotPassword(this.userData.email).then((response) => {
      console.log(response);
    });
  }

  onAddBankCard() {
    this.bankCard.value["userId"] = this.userData.uid;
    this.bankCardServ.createBankCard(this.bankCard.value);
    this.bankCard.reset();
    Swal.fire({
      icon: "success",
      title: "Your credit card has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  getBankCard() {
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

  deleteBankCard() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your credit card has been deleted.", "success");
        this.bankCardServ.deleteBankCard(this.userBankCard.id);

        this.userBankCard = null;
      }
    });
  }

  OnUpdateBankCard() {
    Swal.fire({
      icon: "success",
      title: "Your credit card has been updated",
      showConfirmButton: false,
      timer: 1500,
    });

    this.updateBankCard.value["userId"] = this.userData.uid;

    this.bankCardServ.updateBankCard(
      this.updateBankCard.value,
      this.userBankCard.id
    );

    this.getBankCard();
  }

  public open(modal: any): void {
    this.updateBankCard.controls["updatedHolder"].setValue(
      this.userBankCard.holder
    );
    this.updateBankCard.controls["updatedNumber"].setValue(
      this.userBankCard.number
    );
    this.updateBankCard.controls["updatedExpMonth"].setValue(
      this.userBankCard.expMonth
    );
    this.updateBankCard.controls["updatedExpYear"].setValue(
      this.userBankCard.expYear
    );
    this.updateBankCard.controls["updatedCvv"].setValue(this.userBankCard.cvv);
    this.modalService.open(modal, {
      size: "md",
    });
  }

  dashboardNavigate() {
    this.router.navigate(["dashboard"], {
      replaceUrl: true,
    });
  }
}
