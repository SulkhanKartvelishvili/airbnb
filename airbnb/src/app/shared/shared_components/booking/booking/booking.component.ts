import { Component, OnInit } from "@angular/core";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { NgForm } from "@angular/forms";
import { BankCardService } from "src/app/shared/shared_services/bankCard/bank-card.service";
import { bankCard } from "src/app/shared/shared_models/bankCard.model";
import { HotelBookingService } from "src/app/shared/shared_services/hotelBooking/hotel-booking.service";

@Component({
  selector: "app-booking",
  templateUrl: "./booking.component.html",
  styleUrls: ["./booking.component.css"],
})
export class BookingComponent implements OnInit {
  faStar = faStar;
  bookedHotelData!: any;
  fetchedHotelData!: any;
  user!: any;
  bankCards: any = [];
  userBankCard: any = null;
  bookingBtn!: any;
  constructor(
    private bankCardServ: BankCardService,
    private hotelBooking: HotelBookingService
  ) {}

  ngOnInit(): void {
    this.bookedHotelData = JSON.parse(
      localStorage.getItem("bookedHotelData") || "null"
    );
    this.user = JSON.parse(localStorage.getItem("user") || "null");

    this.bookingBtn = document.getElementById("book");
    this.bankCardServ.getBankCardList().subscribe((res) => {
      this.bankCards = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as bankCard),
        };
      });
      this.bankCards.forEach((item: any) => {
        if (item.userId == this.user.uid) {
          this.userBankCard = item;
          this.userBankCard.number = this.userBankCard.number.substring(12, 16);
        }

        if (this.bookingBtn != null && this.userBankCard != null) {
          (this.bookingBtn as HTMLInputElement).disabled = false;
        }
      });
    });
  }

  onAddBankCard(addBankCard: NgForm) {
    const bankCard: {
      userId: string;
      holder: string;
      number: number;
      expMonth: string;
      expYear: string;
      cvv: number;
    } = {
      userId: this.user.uid,
      holder: addBankCard.value.holder,
      number: addBankCard.value.number,
      expMonth: addBankCard.value.start,
      expYear: addBankCard.value.end,
      cvv: addBankCard.value.cvv,
    };
    this.bankCardServ.createBankCard(bankCard);

    if (this.bookingBtn != null && this.userBankCard != null) {
      (this.bookingBtn as HTMLInputElement).disabled = false;
    }
  }

  bookhotel() {
    const bookedHotel: {
      userId: string;
      hotelId: string;
      hotelName: string;
      bedroomName: number;
      checkInDate: Date;
      checkOutDate: Date;
      nights: number;
      guestsCount: number;
      price: number;
      imageUrl: string;
    } = {
      userId: this.user.uid,
      hotelId: this.bookedHotelData[0].hotelId,
      hotelName: this.bookedHotelData[0].hotelName,
      bedroomName: this.bookedHotelData[0].roomName,
      checkInDate: this.bookedHotelData[0].checkInDate,
      checkOutDate: this.bookedHotelData[0].checkOutDate,
      nights: this.bookedHotelData[0].dayCount,
      guestsCount: this.bookedHotelData[0].guestsCount,
      price: this.bookedHotelData[0].priceSum,
      imageUrl: this.bookedHotelData[0].imageUrl,
    };
    this.hotelBooking.bookHotel(bookedHotel);
    localStorage.removeItem("bookedHotelData");
  }
}
