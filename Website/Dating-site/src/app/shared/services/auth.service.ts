import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  login$ = new Subject();
  constructor(private router: Router) {}

  setAuth(data) {
    localStorage.setItem("auth", JSON.stringify(data));
    this.login$.next();
  }

  getAuth() {
    return JSON.parse(localStorage.getItem("auth"));
  }

  isAuthenticated() {
    if (localStorage.getItem("auth")) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.removeItem("auth");
    this.router.navigate(["login"]);
  }
}
