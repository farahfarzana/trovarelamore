import { Component, OnInit } from "@angular/core";
import { ApiOperationService } from "../services/api-operation.service";
import { AuthService } from "../services/auth.service";
import { LoaderService } from "../services/loader.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-detail",
  templateUrl: "./user-detail.component.html",
  styleUrls: ["./user-detail.component.css"]
})
export class UserDetailComponent implements OnInit {
  users: any[];
  constructor(
    private apiOperation: ApiOperationService,
    private authService: AuthService,
    private loaderService: LoaderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.loaderService.status = true;
    this.apiOperation.getUsers(this.authService.getAuth().token).subscribe(
      (res: any) => {
        console.log(res);
        this.loaderService.status = false;
        this.users = res.users;
      },
      err => {
        this.loaderService.status = false;
      }
    );
  }

  goTo(id) {
    this.router.navigate(["message", id]);
  }
}
