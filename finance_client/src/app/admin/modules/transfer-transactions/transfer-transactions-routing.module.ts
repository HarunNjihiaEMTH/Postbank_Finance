import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RoutePrivilegeGuard } from "../../data/services/_AccessControlAuthGuard.service";
import { ApprovedDirectTransferComponent } from "./approved-direct-transfer/approved-direct-transfer.component";
import { DeletedDirectTransferComponent } from "./deleted-direct-transfer/deleted-direct-transfer.component";
import { PendingDirectTransferComponent } from "./pending-direct-transfer/pending-direct-transfer.component";
import { PoBillDirectTransferComponent } from "./po-bill-direct-transfer/po-bill-direct-transfer.component";
import { PostDirectTransferComponent } from "./post-direct-transfer/post-direct-transfer.component";
import { RejectedDirectTransferComponent } from "./rejected-direct-transfer/rejected-direct-transfer.component";

const routes: Routes = [
  {
    path: "post-direct-transaction",
    component: PostDirectTransferComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["Enter Transaction"] },
  },
  {
    path: "pending-direct-transactions",
    component: PendingDirectTransferComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["Enter Transaction"] },
  },
  {
    path: "approved-direct-transactions",
    component: ApprovedDirectTransferComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["Enter Transaction"] },
  },
  {
    path: "rejected-direct-transactions",
    component: RejectedDirectTransferComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["Enter Transaction"] },
  },
  {
    path: "deleted-direct-transactions",
    component: DeletedDirectTransferComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["Enter Transaction"] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransferTransactionsRoutingModule {}
