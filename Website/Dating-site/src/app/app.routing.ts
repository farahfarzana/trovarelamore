import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";

import { SignupComponent } from "./signup/signup.component";
import { LandingComponent } from "./landing/landing.component";
import { ContactComponent } from "./contact/contact.component";
import { LoginComponent } from "./login/login.component";
import { MessageComponent } from "./shared/message/message.component";
import { CafeDetailComponent } from "./shared/cafe-detail/cafe-detail.component";
import { UserDetailComponent } from "./shared/user-detail/user-detail.component";
import { MyInboxComponent } from "./shared/my-inbox/my-inbox.component";
import { MyBookingComponent } from "./shared/my-booking/my-booking.component";

const routes: Routes = [
  { path: "home", component: HomeComponent },

  { path: "signup", component: SignupComponent },
  { path: "landing", component: LandingComponent },
  { path: "contact", component: ContactComponent },
  { path: "login", component: LoginComponent },
  { path: "message/:id", component: MessageComponent },
  { path: "cafe-detail", component: CafeDetailComponent },
  { path: "user-detail", component: UserDetailComponent },
  { path: "my-inbox", component: MyInboxComponent },
  { path: "my-booking", component: MyBookingComponent },
  { path: "", redirectTo: "home", pathMatch: "full" }
];

@NgModule({
  imports: [CommonModule, BrowserModule, RouterModule.forRoot(routes)],
  exports: []
})
export class AppRoutingModule {}
