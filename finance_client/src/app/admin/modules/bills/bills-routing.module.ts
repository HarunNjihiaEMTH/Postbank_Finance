import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RoutePrivilegeGuard } from "../../data/services/_AccessControlAuthGuard.service";
import { ActiveBillsComponent } from "./active-bills/active-bills.component";
import { PaidBillsComponent } from "./paid-bills/paid-bills.component";
import { PayBillComponent } from "./pay-bill/pay-bill.component";
// import { PaymentConfirmationComponent } from "./payment-confirmation/payment-confirmation.component";
import { PendingBillsComponent } from "./pending-bills/pending-bills.component";
import { PoBillComponent } from "./po-bill/po-bill.component";
import { UpdateBillComponent } from "./rejected-bills/dialogs/update-bill/update-bill.component";
import { RejectedBillsComponent } from "./rejected-bills/rejected-bills.component";

const routes: Routes = [

  {
    path: "active-bills",
    component: ActiveBillsComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["Enter Transaction"] },
  },
  {
    path: "paid-bills",
    component: PaidBillsComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["Enter Transaction"] },
  },{
    path: "pending-bills",
    component: PendingBillsComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["Enter Transaction"] },
  },{
    path: "pay-bill",
    component: PayBillComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["Enter Transaction"] },
  },{
    path: "rejected-bills",
    component: RejectedBillsComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["Enter Transaction"] },
  },{
    path: "update-bill",
    component: UpdateBillComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["Enter Transaction"] },
  },{
    path: "payment-with-po",
    component: PoBillComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["Enter Transaction"] },
  },

];
// {
//   path: "active-po-details",
//   component: ActivePoDetailsComponent,
//   canActivate: [RoutePrivilegeGuard],
//   data: { requiredPrivilege: ["Confirm Approved PurchaseOrders"] },
// },
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillsRoutingModule {}
