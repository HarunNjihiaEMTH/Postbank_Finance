import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { GenWidgetsComponent } from './pages/gen-widgets/gen-widgets.component';
import { GeneralPaymentsComponent } from './pages/components/general-payments/general-payments.component';
import { VatCollectedComponent } from './pages/components/vat-collected/vat-collected.component';
import { InvoicesIssuedComponent } from './pages/components/invoices-issued/invoices-issued.component';
import { PurchaseOrdersIssuedComponent } from './pages/components/purchase-orders-issued/purchase-orders-issued.component';
import { ValueAddedTaxCollectedComponent } from './pages/components/value-added-tax-collected/value-added-tax-collected.component';
import { WithholdingCollectedComponent } from './pages/components/withholding-collected/withholding-collected.component';


import { NgxEchartsModule } from "ngx-echarts";
import { ChartsModule as chartjsModule } from "ng2-charts";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { GaugeModule } from "angular-gauge";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { NgxGaugeModule } from "ngx-gauge";


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonsModule } from 'src/app/user/commons/commons.module';
import { ResetPasswordComponent } from './pages/components/reset-password/reset-password.component';
import { AnalyticsComponent } from './pages/components/analytics/analytics.component';


@NgModule({
  declarations: [
    DashboardComponent,
    GenWidgetsComponent,
    GeneralPaymentsComponent,
    VatCollectedComponent,
    WithholdingCollectedComponent,
    ValueAddedTaxCollectedComponent,
    InvoicesIssuedComponent,
    PurchaseOrdersIssuedComponent,
    ResetPasswordComponent,
    AnalyticsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ComponentsModule,
    SharedModule,

    NgxEchartsModule.forRoot({
      echarts: () => import("echarts"),
    }),
    chartjsModule,
    NgxChartsModule,
    NgApexchartsModule,
    MatMenuModule,
    MatIconModule,
    GaugeModule.forRoot(),
    NgxGaugeModule,
    ComponentsModule,
    NgApexchartsModule,

    MatFormFieldModule,
    MatSelectModule,
    CommonsModule,
 
    
  ],
  exports: [GenWidgetsComponent]
})
export class DashboardModule { }
