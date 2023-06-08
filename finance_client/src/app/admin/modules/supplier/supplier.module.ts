import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";

import { SupplierRoutingModule } from "./supplier-routing.module";
import { AllExpensesComponent } from "./pages/expenses-management/all-expenses/all-expenses.component";
import { AddExpenseComponent } from "./pages/expenses-management/add-expense/add-expense.component";
import { UpdateExpenseComponent } from "./pages/expenses-management/update-expense/update-expense.component";
import { DeleteExpenseComponent } from "./pages/expenses-management/delete-expense/delete-expense.component";
import { ViewExpenseDetailsComponent } from "./pages/expenses-management/view-expense-details/view-expense-details.component";
import { AllCostCentersComponent } from "./pages/cost-centers-management/all-cost-centers/all-cost-centers.component";
import { AddCostCenterComponent } from "./pages/cost-centers-management/add-cost-center/add-cost-center.component";
import { AllSubCategoriesComponent } from "./pages/sub-categories-management/all-sub-categories/all-sub-categories.component";
import { AllCategoriesComponent } from "./pages/categories-management/all-categories/all-categories.component";
import { CreateCategoryComponent } from "./pages/categories-management/create-category/create-category.component";
import { DeleteCategoryComponent } from "./pages/categories-management/delete-category/delete-category.component";
import { UpdateCategoryComponent } from "./pages/categories-management/update-category/update-category.component";
import { ViewCategoryDetailsComponent } from "./pages/categories-management/view-category-details/view-category-details.component";
import { UpdateCostCenterComponent } from "./pages/cost-centers-management/update-cost-center/update-cost-center.component";
import { DeleteCostCenterComponent } from "./pages/cost-centers-management/delete-cost-center/delete-cost-center.component";
import { ViewCostCenterDetailsComponent } from "./pages/cost-centers-management/view-cost-center-details/view-cost-center-details.component";
import { AddSubCategoryComponent } from "./pages/sub-categories-management/add-sub-category/add-sub-category.component";
import { DeleteSubCategoryComponent } from "./pages/sub-categories-management/delete-sub-category/delete-sub-category.component";
import { ViewSubCategoryDetailsComponent } from "./pages/sub-categories-management/view-sub-category-details/view-sub-category-details.component";
import { AddSupplierComponent } from "./pages/suppliers-management/add-supplier/add-supplier.component";
import { AllSuppliersComponent } from "./pages/suppliers-management/all-suppliers/all-suppliers.component";
import { DeleteSupplierComponent } from "./pages/suppliers-management/delete-supplier/delete-supplier.component";
import { UpdateSupplierComponent } from "./pages/suppliers-management/update-supplier/update-supplier.component";
import { ViewSupplierDetailsComponent } from "./pages/suppliers-management/view-supplier-details/view-supplier-details.component";
import { AllPurchaseOrdersComponent } from "./pages/purchase-orders-management/all-purchase-orders/all-purchase-orders.component";
import { CreatePurchaseOrderComponent } from "./pages/purchase-orders-management/create-purchase-order/create-purchase-order.component";
import { UpdatePurchaseOrderComponent } from "./pages/purchase-orders-management/update-purchase-order/update-purchase-order.component";
import { ViewPurchaseOrderDetailsComponent } from "./pages/purchase-orders-management/view-purchase-order-details/view-purchase-order-details.component";
import { DeletePurchaseOrderComponent } from "./pages/purchase-orders-management/delete-purchase-order/delete-purchase-order.component";

import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatMenuModule } from "@angular/material/menu";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { SharedModule } from "src/app/shared/shared.module";
import { MatTableExporterModule } from "mat-table-exporter";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSelectModule } from "@angular/material/select";
import { AddOrderItemComponent } from './pages/purchase-orders-management/create-purchase-order/dialog/add-order-item/add-order-item.component';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";
import { UpdateSubCategoryComponent } from "./pages/sub-categories-management/update-sub-category/update-sub-category.component";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { BranchCodeLookupComponent } from "./pages/expenses-management/branch-code-lookup/branch-code-lookup.component";
import { SendPurchaseOrderComponent } from './pages/purchase-orders-management/all-purchase-orders/dialogs/send-purchase-order/send-purchase-order.component';
import { PurchaseOrderStatusComponent } from "./pages/purchase-orders-management/all-purchase-orders/dialogs/purchase-order-status/purchase-order-status.component";
import { CategoriesStatusComponent } from './pages/categories-management/all-categories/dialogs/categories-status/categories-status.component';
import { ExpenseStatusComponent } from './pages/expenses-management/all-expenses/dialogs/expense-status/expense-status.component';
import { SubCategoryStatusComponent } from './pages/sub-categories-management/all-sub-categories/dialogs/sub-category-status/sub-category-status.component';
import { SupplierStatusComponent } from "./pages/suppliers-management/all-suppliers/dialogs/supplier-status/supplier-status.component";

import { CostCenterStatusComponent } from './pages/cost-centers-management/all-cost-centers/dialogs/cost-center-status/cost-center-status.component';
import { DashboardModule } from "../dashboard/dashboard.module";
import { RejectedPurchaseOrdersComponent } from './pages/purchase-orders-management/rejected-purchase-orders/rejected-purchase-orders.component';
import { MatRadioModule } from "@angular/material/radio";
import { MatTabsModule } from "@angular/material/tabs";



@NgModule({
  declarations: [
    AllCategoriesComponent,
    CreateCategoryComponent,
    DeleteCategoryComponent,
    UpdateCategoryComponent,
    ViewCategoryDetailsComponent,
    AddCostCenterComponent,
    AllCostCentersComponent,
    DeleteCostCenterComponent,
    UpdateCostCenterComponent,
    ViewCostCenterDetailsComponent,
    AddExpenseComponent,
    AllExpensesComponent,
    DeleteExpenseComponent,
    DeleteSubCategoryComponent,
    UpdateExpenseComponent,
    ViewExpenseDetailsComponent,
    AddSubCategoryComponent,
    AllSubCategoriesComponent,
    DeleteSubCategoryComponent,
    UpdateCategoryComponent,
    ViewSubCategoryDetailsComponent,
    AddSupplierComponent,
    AllSuppliersComponent,
    DeleteSupplierComponent,
    UpdateSupplierComponent,
    ViewSupplierDetailsComponent,
    AllExpensesComponent,
    AddExpenseComponent,
    UpdateExpenseComponent,
    DeleteExpenseComponent,
    ViewExpenseDetailsComponent,
    AllCostCentersComponent,
    AddCostCenterComponent,
    AllSubCategoriesComponent,
    UpdateCostCenterComponent,
    DeleteCostCenterComponent,
    ViewCostCenterDetailsComponent,
    AllPurchaseOrdersComponent,
    CreatePurchaseOrderComponent,
    UpdatePurchaseOrderComponent,
    ViewPurchaseOrderDetailsComponent,
    DeletePurchaseOrderComponent,
    AddOrderItemComponent,
    UpdateSubCategoryComponent,
    BranchCodeLookupComponent,
    SendPurchaseOrderComponent,
    PurchaseOrderStatusComponent,
    CategoriesStatusComponent,
    ExpenseStatusComponent,
    SubCategoryStatusComponent,
    SupplierStatusComponent,
    CostCenterStatusComponent,
    RejectedPurchaseOrdersComponent,
  ],
  imports: [
    DashboardModule,
    CommonModule,
    SupplierRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatMenuModule,
    ComponentsModule,
    SharedModule,
    MatTableExporterModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatProgressBarModule,
    MatRadioModule,
    MatTabsModule
  ],
  providers: [DatePipe]
})
export class SupplierModule {}
