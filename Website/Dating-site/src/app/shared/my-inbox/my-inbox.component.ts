import { Component, OnInit } from "@angular/core";
import { LoaderService } from "../services/loader.service";
import { ApiOperationService } from "../services/api-operation.service";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-my-inbox",
  templateUrl: "./my-inbox.component.html",
  styleUrls: ["./my-inbox.component.css"]
})
export class MyInboxComponent implements OnInit {
  messages: any[];
  constructor(
    private loaderService: LoaderService,
    private apiOperation: ApiOperationService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getMyInboxList();
  }

  getMyInboxList() {
    this.loaderService.status = true;
    console.log(this.authService.getAuth(), "test");
    this.apiOperation
      .getInbox(`user_id=${this.authService.getAuth().id}`)
      .subscribe(
        (res: any) => {
          this.loaderService.status = false;
          this.messages = res.messages;
          console.log(res);
        },
        err => {
          this.loaderService.status = false;
        }
      );
  }

  reply(id) {
    this.router.navigate(["message", id]);
  }
}
