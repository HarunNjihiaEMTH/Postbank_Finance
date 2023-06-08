import { Component, HostListener, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/core/service/auth.service";
import { Role } from "src/app/core/models/role";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { TokenCookieService } from "src/app/core/service/token-storage-cookies.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ResetPasswordComponent } from "src/app/admin/modules/dashboard/pages/components/reset-password/reset-password.component";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  // @HostListener("window:popstate", ["$event"])
  // onPopState(event) {
  //   // Prevent browser navigation
  //   window.history.pushState(null, null, window.location.pathname);
  // }

  authForm: FormGroup;
  submitted = false;
  loading = false;
  error = "";
  hide = true;

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = "";
  roles: string[] = [];

  passwordFlag: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private tokenCookieService: TokenCookieService,
    private dialog: MatDialog
  ) {
    super();
    this.router.onSameUrlNavigation = 'reload';
  }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  onSubmit() {
    //location.reload();
    localStorage.clear();

    this.submitted = true;
    this.loading = true;
    this.error = "";
    if (this.authForm.invalid) {
      this.error = "Username and Password not valid !";
      return;
    } else {
      console.log(this.authForm.value);
      this.authService.login(this.authForm.value).subscribe(
        (res) => {
          this.loading = false;
          //this.tokenCookieService.saveToken(res.body.token);
          this.tokenCookieService.saveUser(res.body);
          console.log("res.body:", res.body);

          if (res) {
            // Get the user identifier (e.g. user ID or username)
            //const userId = res.body.id;
            // Store the privileges with the user identifier
            // const privileges = res.body.privileges;
            // localStorage.setItem(
            //   `userPrivileges_${userId}`,
            //   JSON.stringify(privileges)
            // );

            this.router.navigate(["/authentication/OTP"]);

            this.passwordFlag =
              this.tokenCookieService.getUser().systemGenPassword;
          } else {
            this.error = "Invalid Login";
          }
        },
        (err) => {
          console.log(err);
          //this.error = "Invalid Credentials!" ;
          this.error = "Invalid Username or Password. Check your credentials!";
          //console.log(err);
          this.submitted = false;
          this.loading = false;
        }
      );
    }
  }
}

// import { Component } from '@angular/core';
// import { TokenService } from './token.service';

// @Component({
//   selector: 'app-example',
//   template: `...`
// })
// export class ExampleComponent {
//   constructor(private tokenService: TokenService) {}

//   setToken() {
//     this.tokenService.setToken('my-token');
//   }

//   getToken() {
//     const token = this.tokenService.getToken();
//     console.log(token);
//   }

//   removeToken() {
//     this.tokenService.removeToken();
//   }
// }
