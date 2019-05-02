import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router, ActivatedRoute } from "@angular/router";
import { LoaderService } from "../services/loader.service";
import { ApiOperationService } from "../services/api-operation.service";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-message",
  templateUrl: "./message.component.html",
  styleUrls: ["./message.component.css"]
})
export class MessageComponent implements OnInit {
  messageForm: FormGroup;
  constructor(
    private authService: AuthService,
    private router: Router,
    private loaderService: LoaderService,
    private apiOperation: ApiOperationService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.messageForm = this.buildForm();
    this.messageForm.patchValue({
      sender_id: this.authService.getAuth().id
    });
    this.route.params.subscribe(param => {
      console.log(param, "param");
      this.messageForm.patchValue({
        user_id: param.id
      });
    });
  }

  buildForm() {
    return this.fb.group({
      message: [null, [Validators.required]],
      user_id: [null],
      sender_id: [null]
    });
  }

  onSubmit() {
    if (!this.messageForm.invalid) {
      this.loaderService.status = true;

      this.apiOperation.sendMessage(this.messageForm.getRawValue()).subscribe(
        res => {
          this.loaderService.status = false;
          this.toastr.success("Success send message", "Success");
        },
        err => {
          this.loaderService.status = false;
          this.toastr.error("Error send message", "Error");
        }
      );
    }
  }
}
