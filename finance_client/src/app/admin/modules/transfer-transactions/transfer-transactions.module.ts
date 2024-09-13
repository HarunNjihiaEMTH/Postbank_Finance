import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { TransferTransactionsRoutingModule } from './transfer-transactions-routing.module';
import { PostDirectTransferComponent } from './post-direct-transfer/post-direct-transfer.component';
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
import { AddDescriptionForReportComponent } from './dialogs/add-description-for-report/add-description-for-report.component';
import { PendingDirectTransferComponent } from './pending-direct-transfer/pending-direct-transfer.component';
import { ApprovedDirectTransferComponent } from './approved-direct-transfer/approved-direct-transfer.component';
import { RejectedDirectTransferComponent } from './rejected-direct-transfer/rejected-direct-transfer.component';
import { PendingDirectInfoComponent } from './pending-direct-transfer/dialogs/pending-direct-info/pending-direct-info.component';
import { ApprovedDirectInfoComponent } from './approved-direct-transfer/dialogs/approved-direct-info/approved-direct-info.component';
import { RejectedDirectInfoComponent } from './rejected-direct-transfer/dialogs/rejected-direct-info/rejected-direct-info.component';
import { FilesService } from '../../data/fileconversion/files.service';
import { ExpenseCostcenterAccLookupComponent } from './dialogs/expense-costcenter-acc-lookup/expense-costcenter-acc-lookup.component';
import { GeneralCostcentersLookupComponent } from './dialogs/general-costcenters-lookup/general-costcenters-lookup.component';
import { PoBillDirectTransferComponent } from './po-bill-direct-transfer/po-bill-direct-transfer.component';
import { AddPointingPartialAmtComponent } from './dialogs/add-pointing-partial-amt/add-pointing-partial-amt.component';
import { NgxMaskModule } from "ngx-mask";
import { DeletedDirectTransferComponent } from './deleted-direct-transfer/deleted-direct-transfer.component';


@NgModule({
  declarations: [
    PostDirectTransferComponent,
    AddDescriptionForReportComponent,
    PendingDirectTransferComponent,
    ApprovedDirectTransferComponent,
    RejectedDirectTransferComponent,
    PendingDirectInfoComponent,
    ApprovedDirectInfoComponent,
    RejectedDirectInfoComponent,
    ExpenseCostcenterAccLookupComponent,
    GeneralCostcentersLookupComponent,
    PoBillDirectTransferComponent,
    AddPointingPartialAmtComponent,
    DeletedDirectTransferComponent
  ],
  imports: [
    CommonModule,
    TransferTransactionsRoutingModule,

    
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
    DashboardModule,

    NgxMaskModule,
  ],
  providers: [DatePipe, FilesService]
})
export class TransferTransactionsModule { }



