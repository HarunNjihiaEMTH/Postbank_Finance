import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/core/service/auth.service";
import { NotificationService } from "src/app/admin/data/services/notification.service";
@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent implements OnInit {
  authForm: FormGroup;
  submitted = false;
  returnUrl: string;

  loading = false;
  error = "";
  hide = true;


  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private notificationAPI: NotificationService,
  ) {}
  ngOnInit() {
    this.authForm = this.formBuilder.group({
      emailAddress: [
        "",
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }
  get f() {
    return this.authForm.controls;
  }
  // onSubmit() {
  //   this.submitted = true;
  //   // stop here if form is invalid
  //   if (this.authForm.invalid) {
  //     return;
  //   } else {
  //     this.router.navigate(["/dashboard/main"]);
  //   }
  // }


  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.error = "";
    if (this.authForm.invalid) {
      this.error = "Email not valid !";
      return;
    } else {
      console.log(this.authForm.value);
      this.authService.forgotPassword(this.authForm.value).subscribe(res => {

        this.loading = false;
        console.log("res: ", res)
        if(res.statusCode == 404){
          //this.notificationAPI.alertWarning("No account associated with the email provided!");
          this.notificationAPI.alertWarning(res.message);
        } else {
          this.notificationAPI.alertSuccess(res.message);
        }
       
        this.router.navigate(["/authentication/signin"]);


      }, err => {
        console.log(err)

        this.error = "Invalid Email!";

        this.submitted = false;
        this.loading = false;
      })
    }
  }
}
