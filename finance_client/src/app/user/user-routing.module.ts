import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  // {
  //   path: "dashboard",
  //   loadChildren: () =>
  //     import("./modules/dashboard/dashboard.module").then(
  //       (m) => m.DashboardModule
  //     ),
  // },
  // {
  //   path: "supplier",
  //   loadChildren: () =>
  //     import("./modules/supplier/supplier.module").then(
  //       (m) => m.SupplierModule
  //     ),
  // },
  // {
  //   path: "customer",
  //   loadChildren: () =>
  //     import("./modules/customer/customer.module").then(
  //       (m) => m.CustomerModule
  //     ),
  // },
  // {
  //   path: "acknowledgement",
  //   loadChildren: () =>
  //     import("./modules/acknowledgement/acknowledgement.module").then(
  //       (m) => m.AcknowledgementModule
  //     ),
  // },
  // {
  //   path: "bills",
  //   loadChildren: () =>
  //     import("./modules/bills/bills.module").then(
  //       (m) => m.BillsModule
  //     ),
  // },
  // {
  //   path: "transactions",
  //   loadChildren: () =>
  //     import("./modules/transactions/transactions.module").then(
  //       (m) => m.TransactionsModule
  //     ),
  // },
  // {
  //   path: "transfer-transactions",
  //   loadChildren: () =>
  //     import("./modules/transfer-transactions/transfer-transactions.module").then(
  //       (m) => m.TransferTransactionsModule
  //     ),
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
