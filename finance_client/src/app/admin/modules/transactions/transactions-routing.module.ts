import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RoutePrivilegeGuard } from "../../data/services/_AccessControlAuthGuard.service";
import { AddTransactionSupplierComponent } from "./add-transaction-supplier/add-transaction-supplier.component";
import { TransactionInfoComponent } from "./add-transaction-supplier/dialogs/transaction-info/transaction-info.component";
import { PendingTransactionsComponent } from "./pending-transactions/pending-transactions.component";
import { PostMultiTransactionsComponent } from "./post-multi-transactions/post-multi-transactions.component";
import { PostTransactionComponent } from "./post-transaction/post-transaction.component";

import { PostedTransactionsComponent } from "./posted-transactions/posted-transactions.component";
import { RejectedTransactionDetailsComponent } from "./rejected-transactions/dialogs/rejected-transaction-details/rejected-transaction-details.component";
import { RejectedTransactionsComponent } from "./rejected-transactions/rejected-transactions.component";
import { UploadExcelComponent } from "./upload-excel/upload-excel.component";

const routes: Routes = [
  {
    path: "add-transaction-supplier",
    component: AddTransactionSupplierComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["Enter Transaction"] },
  },
  {
    path: "post-transaction",
    component: PostTransactionComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["Enter Transaction"] },
  },
  {
    path: "post-multi-transactions",
    component: PostMultiTransactionsComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["Enter Transaction"] },
  },
  {
    path: "upload-excel",
    component: UploadExcelComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["Enter Transaction"] },
  },
  {
    path: "pending-transactions",
    component: PendingTransactionsComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["Enter Transaction"] },
  },
  {
    path: "posted-transactions",
    component: PostedTransactionsComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["Enter Transaction"] },
  },
  {
    path: "transaction-info",
    component: TransactionInfoComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["Enter Transaction"] },
  },
  {
    path: "rejected-transactions",
    component: RejectedTransactionsComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["Enter Transaction"] },
  },
  {
    path: "rejected-transaction-details",
    component: RejectedTransactionDetailsComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["Enter Transaction"] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionsRoutingModule {}
