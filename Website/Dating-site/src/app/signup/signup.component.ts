import { Component, OnInit } from "@angular/core";
import { ApiOperationService } from "../shared/services/api-operation.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { LoaderService } from "../shared/services/loader.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"]
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  constructor(
    private apiOperation: ApiOperationService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.signUpForm = this.buildForm();
  }

  buildForm() {
    return this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      about: [null, [Validators.required]]
    });
  }

  onRegister() {
    if (!this.signUpForm.invalid) {
      this.loaderService.status = true;
      this.apiOperation.registration(this.signUpForm.getRawValue()).subscribe(
        res => {
          this.signUpForm.reset();
          this.toastr.success("Successfully Register", "Success:");
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
