import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";
import { LoaderComponent } from "./loader/loader.component";
import { CafeDetailComponent } from "./cafe-detail/cafe-detail.component";
import { CommonModule } from "@angular/common";
import { MyBookingComponent } from "./my-booking/my-booking.component";
import { UserDetailComponent } from "./user-detail/user-detail.component";
import { ProfileComponent } from './profile/profile.component';
import { MessageComponent } from './message/message.component';
import { MyInboxComponent } from './my-inbox/my-inbox.component';

@NgModule({
  declarations: [
    LoaderComponent,
    CafeDetailComponent,
    MyBookingComponent,
    UserDetailComponent,
    ProfileComponent,
    MessageComponent,
    MyInboxComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  exports: [
    LoaderComponent,
    CafeDetailComponent,
    UserDetailComponent,
    MyBookingComponent,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule
  ]
})
export class SharedModule {}
