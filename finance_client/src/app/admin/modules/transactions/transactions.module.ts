import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { PostTransactionComponent } from './post-transaction/post-transaction.component';
import { PostedTransactionsComponent } from './posted-transactions/posted-transactions.component';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableExporterModule } from 'mat-table-exporter';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { CdkColumnDef } from '@angular/cdk/table';
import { PendingTransactionsComponent } from './pending-transactions/pending-transactions.component';
import { TransactionDetailsComponent } from './pending-transactions/dialogs/transaction-details/transaction-details.component';

import { AddTransactionSupplierComponent } from './add-transaction-supplier/add-transaction-supplier.component';
import { UploadExcelComponent } from './upload-excel/upload-excel.component';
import { TransactionInfoComponent } from './add-transaction-supplier/dialogs/transaction-info/transaction-info.component';
import { PostedTransactionDetailsComponent } from './posted-transactions/dialogs/posted-transaction-details/posted-transaction-details.component';
import { RejectedTransactionsComponent } from './rejected-transactions/rejected-transactions.component';
import { AccrualSuppliersLookupComponent } from './post-transaction/dialogs/accrual-suppliers-lookup/accrual-suppliers-lookup.component';
import { RejectedTransactionDetailsComponent } from './rejected-transactions/dialogs/rejected-transaction-details/rejected-transaction-details.component';
import { PaySuppPendingTransactionsComponent } from './pay-supp-pending-transactions/pay-supp-pending-transactions.component';
import { PaySuppPendingDetailsComponent } from './pay-supp-pending-transactions/dialogs/pay-supp-pending-details/pay-supp-pending-details.component';
import { PostedTransactionsSupplierComponent } from './posted-transactions-supplier/posted-transactions-supplier.component';
import { PostedTransSuppDetailsComponent } from './posted-transactions-supplier/dialogs/posted-trans-supp-details/posted-trans-supp-details.component';
import { RejectedTransactionsSupplierComponent } from './rejected-transactions-supplier/rejected-transactions-supplier.component';
import { RejectedTransSuppDetailsComponent } from './rejected-transactions-supplier/dialogs/rejected-trans-supp-details/rejected-trans-supp-details.component';
import { TransactionHistoryComponent } from './add-transaction-supplier/dialogs/transaction-history/transaction-history.component';
import { TransactionHistoryDetailComponent } from './add-transaction-supplier/dialogs/transaction-history-detail/transaction-history-detail.component';
import { PostMultiTransactionsComponent } from './post-multi-transactions/post-multi-transactions.component';
import { FilesService } from '../../data/fileconversion/files.service';


@NgModule({
  declarations: [
    PostTransactionComponent,
    PostedTransactionsComponent,
    PendingTransactionsComponent,
    TransactionDetailsComponent,
    TransactionInfoComponent,
    AddTransactionSupplierComponent,
    UploadExcelComponent,
    PostedTransactionDetailsComponent,
    RejectedTransactionsComponent,
    AccrualSuppliersLookupComponent,
    RejectedTransactionDetailsComponent,
    PaySuppPendingTransactionsComponent,
    PaySuppPendingDetailsComponent,
    PostedTransactionsSupplierComponent,
    PostedTransSuppDetailsComponent,
    RejectedTransactionsSupplierComponent,
    RejectedTransSuppDetailsComponent,
    TransactionHistoryComponent,
    TransactionHistoryDetailComponent,
    PostMultiTransactionsComponent,
  ],
  imports: [
    DashboardModule,
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
    TransactionsRoutingModule
  ],
  providers:[CdkColumnDef, DatePipe, FilesService],
})
export class TransactionsModule { }
