import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RoutePrivilegeGuard } from "../../data/services/_AccessControlAuthGuard.service";
import { AccountLogsComponent } from "./pages/account-logs/account-logs.component";
import { ActiveAccountsComponent } from "./pages/active-accounts/active-accounts.component";
import { AddAccountComponent } from "./pages/add-account/add-account.component";
import { DeletedAccountsComponent } from "./pages/deleted-accounts/deleted-accounts.component";
import { InactiveAccountsComponent } from "./pages/inactive-accounts/inactive-accounts.component";
import { LockedAccountsComponent } from "./pages/locked-accounts/locked-accounts.component";
import { ModifyAccountComponent } from "./pages/modify-account/modify-account.component";
import { PendingAccountsComponent } from "./pages/pending-accounts/pending-accounts.component";
import { RejectedAccountsComponent } from "./pages/rejected-accounts/rejected-accounts.component";

const routes: Routes = [
  {
    path: "all",
    component: ActiveAccountsComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["View Users"] },
  },
  {
    path: "pending-accounts",
    component: PendingAccountsComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["View Users"] },
  },
  {
    path: "rejected-accounts",
    component: RejectedAccountsComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["View Users"] },
  },
  {
    path: "inactive-accounts",
    component: InactiveAccountsComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["View Users"] },
  },
  {
    path: "locked-accounts",
    component: LockedAccountsComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["View Users"] },
  },
  {
    path: "deleted-accounts",
    component: DeletedAccountsComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["View Users"] },
  },
  {
    path: "add-account",
    component: AddAccountComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["Add User"] },
  },
  {
    path: "modify-account/:id",
    component: ModifyAccountComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["Update User"] },
  },
  {
    path: "account-logs/:id",
    component: AccountLogsComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["Validate Users"] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
