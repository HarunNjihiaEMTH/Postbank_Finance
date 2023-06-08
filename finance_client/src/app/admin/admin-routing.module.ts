import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "dashboard",
    loadChildren: () =>
      import("./modules/dashboard/dashboard.module").then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: "parameters",
    loadChildren: () =>
      import("./modules/parameters/parameters.module").then(
        (m) => m.ParametersModule
      ),
  },
  {
    path: "supplier",
    loadChildren: () =>
      import("./modules/supplier/supplier.module").then(
        (m) => m.SupplierModule
      ),
  },
  {
    path: "acknowledgement",
    loadChildren: () =>
      import("./modules/acknowledgement/acknowledgement.module").then(
        (m) => m.AcknowledgementModule
      ),
  },
  {
    path: "bills",
    loadChildren: () =>
      import("./modules/bills/bills.module").then(
        (m) => m.BillsModule
      ),
  },
  {
    path: "transactions",
    loadChildren: () =>
      import("./modules/transactions/transactions.module").then(
        (m) => m.TransactionsModule
      ),
  },
  {
    path: "transfer-transactions",
    loadChildren: () =>
      import("./modules/transfer-transactions/transfer-transactions.module").then(
        (m) => m.TransferTransactionsModule
      ),
  },
  {
    path: "customer",
    loadChildren: () =>
      import("./modules/customer/customer.module").then(
        (m) => m.CustomerModule
      ),
  },
  {
    path: "user-accounts",
    loadChildren: () =>
      import("./modules/users/users.module").then((m) => m.UsersModule),
  },
  {
    path: "roles",
    loadChildren: () =>
      import("./modules/roles/roles.module").then((m) => m.RolesModule),
  },
  {
    path: "reports",
    loadChildren: () =>
      import("./modules/reports/reports.module").then((m) => m.ReportsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
