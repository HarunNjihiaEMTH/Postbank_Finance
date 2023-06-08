import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RoutePrivilegeGuard } from "../../data/services/_AccessControlAuthGuard.service";
import { ActivePoDetailsComponent } from "./pages/active/active-po-details/active-po-details.component";
import { ActivePosComponent } from "./pages/active/active-pos/active-pos.component";
import { CanceledPosComponent } from "./pages/canceled-pos/canceled-pos.component";
import { PaidPosComponent } from "./pages/paid-pos/paid-pos.component";
import { UnpaidPosComponent } from "./pages/unpaid-pos/unpaid-pos.component";

const routes: Routes = [
  {
    path: "active-pos",
    component: ActivePosComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["Confirm Approved PurchaseOrders"] },
  },
  {
    path: "active-po-details",
    component: ActivePoDetailsComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["Confirm Approved PurchaseOrders"] },
  },

  {
    path: "canceled-pos",
    component: CanceledPosComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["View Canceled PurchaseOrders"] },
  },
  {
    path: "unpaid-pos",
    component: UnpaidPosComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["View Unpaid PurchaseOrders"] },
  },

  {
    path: "paid-pos",
    component: PaidPosComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["View Paid PurchaseOrders"] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcknowledgementRoutingModule { }
