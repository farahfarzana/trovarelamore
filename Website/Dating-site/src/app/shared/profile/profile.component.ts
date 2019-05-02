import { Component, OnInit } from "@angular/core";
import { ApiOperationService } from "../services/api-operation.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { LoaderService } from "../services/loader.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  constructor(
    private apiOperation: ApiOperationService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.profileForm = this.buildForm();
  }

  buildForm() {
    return this.fb.group({
      gender: [null, [Validators.required]],
      bio: [null, [Validators.required]],
      interest: [null, [Validators.required]],
      photo: [null, [Validators.required]]
    });
  }

  onRegister() {
    if (!this.profileForm.invalid) {
      this.loaderService.status = true;
      this.apiOperation.registration(this.profileForm.getRawValue()).subscribe(
        res => {
          this.profileForm.reset();
          this.toastr.success("Successfully set up profile", "Success:");
          this.loaderService.status = false;
        },
        err => {
          this.loaderService.status = false;
          console.log(err);
          this.toastr.error(err.error.message, "Error:");
        }
      );
    }
  }
}
