import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { takeUntil } from "rxjs";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { AccountService } from "../../data/services/account.service";
import { Account } from "../../data/types/account";

@Component({
  selector: "app-user-widgets",
  templateUrl: "./user-widgets.component.html",
  styleUrls: ["./user-widgets.component.sass"],
})
export class UserWidgetsComponent extends BaseComponent implements OnInit {
  activeAccounts: number = 0;
  inactiveAccounts: number = 0;
  deletedAccounts: number = 0;
  lockedAccounts: number = 0;
  activeAccountsArray: Account[] = [];
  inactiveAccountsArray: Account[] = [];
  deletedAccountsArray: Account[] = [];
  lockedAccountsArray: Account[] = [];

  constructor(private accountService: AccountService, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.getActiveUserAccounts();
    this.getInactiveAccounts();
    this.getLockedAccounts();
    this.getDeletedAccounts();
  }

  getActiveUserAccounts() {
    this.accountService
      .fetchApprovedAccounts()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.activeAccountsArray = res;

          this.activeAccounts = this.activeAccountsArray.length;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getInactiveAccounts() {
    this.accountService
      .getInactiveAccounts()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.inactiveAccountsArray = res;

          this.inactiveAccounts = this.inactiveAccountsArray.length;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getDeletedAccounts() {
    this.accountService
      .getDeletedAccounts()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.deletedAccountsArray = res;

          this.deletedAccounts = this.deletedAccountsArray.length;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getLockedAccounts() {
    this.accountService
      .getLockedAccounts()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.lockedAccountsArray = res;

          this.lockedAccounts = this.lockedAccountsArray.length;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  viewActivateUserAccounts(){
    this.router.navigate(['/admin/user-accounts/all'])
  }

  viewInactiveUserAccounts(){
    this.router.navigate(["/admin/user-accounts/inactive-accounts"])
  }

  viewdeletedAccounts(){
    this.router.navigate(["/admin/user-accounts/deleted-accounts"])
  }

  viewLockedAccounts(){
    this.router.navigate(["/admin/user-accounts/locked-accounts"])
  }
}
