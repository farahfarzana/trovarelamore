import { Component, OnInit } from "@angular/core";
import { ApiOperationService } from "../services/api-operation.service";
import { AuthService } from "../services/auth.service";
import { LoaderService } from "../services/loader.service";

@Component({
  selector: "app-cafe-detail",
  templateUrl: "./cafe-detail.component.html",
  styleUrls: ["./cafe-detail.component.css"]
})
export class CafeDetailComponent implements OnInit {
  cafes: any[];
  constructor(
    private apiOperation: ApiOperationService,
    private authService: AuthService,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.getCafes();
  }

  getCafes() {
    this.loaderService.status = true;
    this.apiOperation.getCafes().subscribe(
      (res: any) => {
        console.log(res);
        this.loaderService.status = false;
        this.cafes = res.cafes;
      },
      err => {
        this.loaderService.status = false;
      }
    );
  }

  bookCafe(id) {
    this.loaderService.status = true;
    const data = {
      user_id: this.authService.getAuth().id,
      cafe_id: id,
      booking_date: "2019-08-10"
    };

    this.apiOperation.bookCafe(data).subscribe(
      res => {
        this.loaderService.status = false;
      },
      err => {
        this.loaderService.status = false;
      }
    );
  }
}
