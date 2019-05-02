import { Component, OnInit } from "@angular/core";
import { LoaderService } from "../services/loader.service";
import { ApiOperationService } from "../services/api-operation.service";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-my-booking",
  templateUrl: "./my-booking.component.html",
  styleUrls: ["./my-booking.component.css"]
})
export class MyBookingComponent implements OnInit {
  cafes: any[];
  constructor(
    private loaderService: LoaderService,
    private apiOperation: ApiOperationService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getMyBookingList();
  }

  getMyBookingList() {
    this.loaderService.status = true;
    console.log(this.authService.getAuth(), "test");
    this.apiOperation
      .getBooking(`user_id=${this.authService.getAuth().id}`)
      .subscribe(
        (res: any) => {
          this.loaderService.status = false;
          this.cafes = res.bookings;
          console.log(res);
        },
        err => {
          this.loaderService.status = false;
        }
      );
  }
}
