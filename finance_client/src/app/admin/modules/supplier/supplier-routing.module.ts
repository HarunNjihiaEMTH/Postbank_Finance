import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RoutePrivilegeGuard } from "../../data/services/_AccessControlAuthGuard.service";
import { AllCategoriesComponent } from "./pages/categories-management/all-categories/all-categories.component";
import { AddCostCenterComponent } from "./pages/cost-centers-management/add-cost-center/add-cost-center.component";
import { AllCostCentersComponent } from "./pages/cost-centers-management/all-cost-centers/all-cost-centers.component";
import { UpdateCostCenterComponent } from "./pages/cost-centers-management/update-cost-center/update-cost-center.component";
import { AddExpenseComponent } from "./pages/expenses-management/add-expense/add-expense.component";
import { AllExpensesComponent } from "./pages/expenses-management/all-expenses/all-expenses.component";
import { UpdateExpenseComponent } from "./pages/expenses-management/update-expense/update-expense.component";
import { AllPurchaseOrdersComponent } from "./pages/purchase-orders-management/all-purchase-orders/all-purchase-orders.component";
import { CreatePurchaseOrderComponent } from "./pages/purchase-orders-management/create-purchase-order/create-purchase-order.component";
import { RejectedPurchaseOrdersComponent } from "./pages/purchase-orders-management/rejected-purchase-orders/rejected-purchase-orders.component";
import { UpdatePurchaseOrderComponent } from "./pages/purchase-orders-management/update-purchase-order/update-purchase-order.component";
import { ViewPurchaseOrderDetailsComponent } from "./pages/purchase-orders-management/view-purchase-order-details/view-purchase-order-details.component";
import { AllSubCategoriesComponent } from "./pages/sub-categories-management/all-sub-categories/all-sub-categories.component";
import { AddSupplierComponent } from "./pages/suppliers-management/add-supplier/add-supplier.component";
import { AllSuppliersComponent } from "./pages/suppliers-management/all-suppliers/all-suppliers.component";

const routes: Routes = [
  {
    path: "categories-management",
    component: AllCategoriesComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["Add Expense Categories"] },
  },
  {
    path: "cost-centers-management/all",
    component: AllCostCentersComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["View Cost Centers"] },
  },
  {
    path: "cost-centers-management/add-cost-center",
    component: AddCostCenterComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["Add Cost Centers"] },
  },
  {
    path: "cost-centers-management/update-cost-center",
    component: UpdateCostCenterComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["Update Cost Centers"] },
  },
  {
    path: "expenses-management/all",
    component: AllExpensesComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["View Expenses"] },
  },
  {
    path: "expenses-management/add-expense",
    component: AddExpenseComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["Add Expenses"] },
  },
  {
    path: "expenses-management/update-expense",
    component: UpdateExpenseComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["Update Expenses"] },
  },
  {
    path: "purchase-orders-management/all",
    component: AllPurchaseOrdersComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["View Cost Centers"] },
  },
  {
    path: "purchase-orders-management/create-purchase-order",
    component: CreatePurchaseOrderComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["View Cost Centers"] },
  },
  {
    path: "purchase-orders-management/purchase-order-details",
    component: ViewPurchaseOrderDetailsComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["View PurchaseOrders"] },
  },
  {
    path: "purchase-orders-management/update-purchase-order",
    component: UpdatePurchaseOrderComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["Update PurchaseOrders"] },
  },
  {
    path: "sub-categories-management",
    component: AllSubCategoriesComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["View Expense SubCategories"] },
  },
  {
    path: "suppliers-management/all",
    component: AllSuppliersComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["View Suppliers"] },
  },
  {
    path: "suppliers-management/add-supplier",
    component: AddSupplierComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["Add Suppliers"] },
  },

  {
    path: "purchase-orders-management/rejected-purchase-orders",
    component: RejectedPurchaseOrdersComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["View PurchaseOrders"] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupplierRoutingModule { }
