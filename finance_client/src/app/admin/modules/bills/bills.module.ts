import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { BillsRoutingModule } from './bills-routing.module';
import { ActiveBillsComponent } from './active-bills/active-bills.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableExporterModule } from 'mat-table-exporter';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardModule } from '../dashboard/dashboard.module';
// import { ConfirmPaymentComponent } from './confirm-payment/confirm-payment.component';
import { MatRadioModule } from "@angular/material/radio";

import { CdkColumnDef } from '@angular/cdk/table';
import { MatCardModule } from '@angular/material/card';
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
// import { PayedBillsComponent } from './payed-bills/payed-bills.component';
// import { PaymentConfirmationComponent } from './payment-confirmation/payment-confirmation.component';
// import { NoPoBillComponent } from './no-po-bill/no-po-bill.component';
import { PaidBillsComponent } from './paid-bills/paid-bills.component';
import { PendingBillsComponent } from './pending-bills/pending-bills.component';
import { BillInfoComponent } from './pending-bills/dialogs/bill-info/bill-info.component';
import { RejectedBillsComponent } from './rejected-bills/rejected-bills.component';
import { PaidBillInfoComponent } from './paid-bills/dialogs/paid-bill-info/paid-bill-info.component';
import { UpdateBillComponent } from './rejected-bills/dialogs/update-bill/update-bill.component';


import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { PoBillComponent } from './po-bill/po-bill.component';

import { PayBillComponent } from './pay-bill/pay-bill.component';
// import { ConfirmPaymentComponent } from 'src/app/user/modules/bills/confirm-payment/confirm-payment.component';
// import { NoPoBillComponent } from 'src/app/user/modules/bills/no-po-bill/no-po-bill.component';
// import { PayedBillsComponent } from 'src/app/user/modules/bills/payed-bills/payed-bills.component';
// import { PaymentConfirmationComponent } from 'src/app/user/modules/bills/payment-confirmation/payment-confirmation.component';
import { CostCenterLookupComponent } from './pay-bill/dialog/cost-center-lookup/cost-center-lookup.component';
import { EditPaymentBreakdownComponent } from './pay-bill/dialog/edit-payment-breakdown/edit-payment-breakdown.component';
import { ExpensesLookupComponent } from './pay-bill/dialog/expenses-lookup/expenses-lookup.component';
import { GeneralCostCentersLookupComponent } from './pay-bill/dialog/general-cost-centers-lookup/general-cost-centers-lookup.component';
import { PickingItemComponent } from './pay-bill/dialog/picking-item/picking-item.component';
import { SuppliersLookupComponent } from './pay-bill/dialog/suppliers-lookup/suppliers-lookup.component';
import { TaxesLookupComponent } from './pay-bill/dialog/taxes-lookup/taxes-lookup.component';
import { FilesService } from '../../data/fileconversion/files.service';



@NgModule({
  declarations: [
    ActiveBillsComponent,
   // ConfirmPaymentComponent,
   // PayedBillsComponent,
    //PaymentConfirmationComponent,
    //NoPoBillComponent,
    PaidBillsComponent,
    PendingBillsComponent,
    BillInfoComponent,
    RejectedBillsComponent,
    PaidBillInfoComponent,
    UpdateBillComponent,
    PickingItemComponent,
    CostCenterLookupComponent,
    PoBillComponent,
    ExpensesLookupComponent,
    SuppliersLookupComponent,
    GeneralCostCentersLookupComponent,
    EditPaymentBreakdownComponent,
    TaxesLookupComponent,
    PayBillComponent
  ],
  imports: [
    DashboardModule,
    CommonModule,
    BillsRoutingModule,
    CommonModule,
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
    MatCheckboxModule,
    MatTabsModule,
    MatCardModule,
    PerfectScrollbarModule,
    MatRadioModule,
    
    NgxMatSelectSearchModule
  ],
  providers:[CdkColumnDef, DatePipe, FilesService],
  
})
export class BillsModule { }
