import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcknowledgementRoutingModule } from './acknowledgement-routing.module';
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
import { MatTableExporterModule } from 'mat-table-exporter';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatTabsModule } from "@angular/material/tabs";


import { CdkColumnDef } from '@angular/cdk/table';
import { DashboardModule } from '../dashboard/dashboard.module';
import { CanceledPosComponent } from './pages/canceled-pos/canceled-pos.component';
import { ActivePoDetailsNonComponent } from './pages/active/active-po-details-non/active-po-details-non.component';
import { ActivePoDetailsComponent } from './pages/active/active-po-details/active-po-details.component';
import { UpdatePoComponent } from './pages/active/active-po-details/dialogs/update-po/update-po.component';
import { ActivePosComponent } from './pages/active/active-pos/active-pos.component';
import { UnpaidPosComponent } from './pages/unpaid-pos/unpaid-pos.component';
import { CancelPurchaseOrderComponent } from './pages/dialogs/cancel-purchase-order/cancel-purchase-order.component';
import { PaidPosComponent } from './pages/paid-pos/paid-pos.component';





@NgModule({
  declarations: [
    ActivePosComponent,
    ActivePoDetailsComponent,
    ActivePoDetailsNonComponent,
    UpdatePoComponent,
    CanceledPosComponent,
    UnpaidPosComponent,
    CancelPurchaseOrderComponent,
    PaidPosComponent,
    
  ],
  imports: [
    DashboardModule,
    CommonModule,
    AcknowledgementRoutingModule,
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
    MatTabsModule
    
    
  ],
  providers:[CdkColumnDef]
})
export class AcknowledgementModule { }
