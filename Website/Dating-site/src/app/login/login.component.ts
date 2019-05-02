import { Component, OnInit } from "@angular/core";
import { ApiOperationService } from "../shared/services/api-operation.service";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../shared/services/auth.service";
import { flatMap, map } from "rxjs/operators";
import { of } from "rxjs";
import { Router } from "@angular/router";
import { LoaderService } from "../shared/services/loader.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  focus;
  focus1;
  loginForm: FormGroup;
  constructor(
    private apiOperation: ApiOperationService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.loginForm = this.buildForm();
  }

  buildForm() {
    return this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  onLogin() {
    let userData = {};
    if (!this.loginForm.invalid) {
      this.loaderService.status = true;
      this.apiOperation
        .login(this.loginForm.getRawValue())
        .pipe(
          flatMap((res: any) => {
            userData["token"] = res.access_token;
            return this.apiOperation.me(res.access_token);
          }),
          map((res: any) => {
            userData = {
              ...userData,
              ...res.user_data
            };
            return res;
          })
        )
        .subscribe(
          res => {
            this.loaderService.status = false;
            this.authService.setAuth(userData);
            this.toastr.success("Successfully Register", "Login:");
            this.router.navigate(["landing"]);
          },
          err => {
            this.loaderService.status = false;
            this.toastr.error(err.error.message, "Error:");
          }
        );
    }
  }
}
