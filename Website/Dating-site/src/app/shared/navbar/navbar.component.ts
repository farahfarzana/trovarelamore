import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd, NavigationStart } from "@angular/router";
import { Location, PopStateEvent } from "@angular/common";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  public isCollapsed = true;
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];
  isAuthenticated: boolean = false;
  constructor(
    public location: Location,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      this.isCollapsed = true;
      if (event instanceof NavigationStart) {
        if (event.url != this.lastPoppedUrl)
          this.yScrollStack.push(window.scrollY);
      } else if (event instanceof NavigationEnd) {
        if (event.url == this.lastPoppedUrl) {
          this.lastPoppedUrl = undefined;
          window.scrollTo(0, this.yScrollStack.pop());
        } else window.scrollTo(0, 0);
      }
    });
    this.location.subscribe((ev: PopStateEvent) => {
      this.lastPoppedUrl = ev.url;
    });

    this.isAuthenticated = this.authService.isAuthenticated();

    this.authService.login$.subscribe(() => {
      this.isAuthenticated = this.authService.isAuthenticated();
    });
  }

  isHome() {
    var titlee = this.location.prepareExternalUrl(this.location.path());

    if (titlee === "/home") {
      return true;
    } else {
      return false;
    }
  }
  isDocumentation() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee === "/documentation") {
      return true;
    } else {
      return false;
    }
  }

  loginOrLogout() {
    if (this.isAuthenticated) {
      this.authService.logout();
      this.isAuthenticated = false;
    } else {
      this.router.navigate(["login"]);
    }
  }
}
