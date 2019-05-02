import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.scss"]
})
export class LandingComponent implements OnInit {
  focus: any;
  focus1: any;

  constructor(private router: Router) {}

  ngOnInit() {}

  goToPage(type) {
    switch (type) {
      case "cafe":
        this.router.navigate(["cafe-detail"]);
        break;
      case "user":
        this.router.navigate(["user-detail"]);
        break;
      case "message":
        this.router.navigate(["my-inbox"]);
        break;
    }
  }
}
