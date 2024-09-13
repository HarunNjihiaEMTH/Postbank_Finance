import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchCodeLookupComponent } from './components/branch-code-lookup/branch-code-lookup.component';
import { SuppliersLookupComponent } from './components/suppliers-lookup/suppliers-lookup.component';
import { ExpensesLookupComponent } from './components/expenses-lookup/expenses-lookup.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatCardModule} from '@angular/material/card';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CategoriesLookupComponent } from './components/categories-lookup/categories-lookup.component';
import { CurrencyCodeLookupComponent } from './components/currency-code-lookup/currency-code-lookup.component';
import { CustomerLookupComponent } from './components/customer-lookup/customer-lookup.component';
import { GeneralWidgetsComponent } from './components/general-widgets/general-widgets.component';
import { CountriesLookupComponent } from './components/countries-lookup/countries-lookup.component';
import { BanksLookupComponent } from './components/banks-lookup/banks-lookup.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SegmentLookupComponent } from './components/segment-lookup/segment-lookup.component';
import { MatSelectModule } from '@angular/material/select';
import { UnitsOfMeasurementComponent } from './components/units-of-measurement/units-of-measurement.component';
import { ItemsLookupComponent } from './components/items-lookup/items-lookup.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { SchemeCodesLookupComponent } from './components/scheme-codes-lookup/scheme-codes-lookup.component';
import { AccountsLookupComponent } from './components/accounts-lookup/accounts-lookup.component';
import { BuyerTypesLookupComponent } from './components/buyer-types-lookup/buyer-types-lookup.component';
import { BuyerSectorsLookupComponent } from './components/buyer-sectors-lookup/buyer-sectors-lookup.component';
import { InvoiceKindComponent } from './components/invoice-kind/invoice-kind.component';
import { InvoiceTypeComponent } from './components/invoice-type/invoice-type.component';
import { PayWayLookupComponent } from './components/pay-way-lookup/pay-way-lookup.component';
import { UnitsOfMeasureLookupComponent } from './components/units-of-measure-lookup/units-of-measure-lookup.component';
import { TaxesLookupComponent } from './components/taxes-lookup/taxes-lookup.component';
import { BankBranchCodesLookupComponent } from './components/bank-branch-codes-lookup/bank-branch-codes-lookup.component';
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { CurrencyFinacleLookupComponent } from './components/currency-finacle-lookup/currency-finacle-lookup.component';
import { RateCodesFinacleComponent } from './components/rate-codes-finacle/rate-codes-finacle.component';



@NgModule({
  declarations: [
    BranchCodeLookupComponent,
    SuppliersLookupComponent,
    ExpensesLookupComponent,
    CategoriesLookupComponent,
    CurrencyCodeLookupComponent,
    CustomerLookupComponent,
    GeneralWidgetsComponent,
    CountriesLookupComponent,
    BanksLookupComponent,
    SpinnerComponent,
    SegmentLookupComponent,
    UnitsOfMeasurementComponent,
    ItemsLookupComponent,
    SchemeCodesLookupComponent,
    AccountsLookupComponent,
    BuyerTypesLookupComponent,
    BuyerSectorsLookupComponent,
    InvoiceKindComponent,
    InvoiceTypeComponent,
    PayWayLookupComponent,
    UnitsOfMeasureLookupComponent,
    TaxesLookupComponent,
    BankBranchCodesLookupComponent,
    CurrencyFinacleLookupComponent,
    RateCodesFinacleComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatSortModule,
    MatMenuModule,
    SharedModule,
    ComponentsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTableExporterModule,
    PerfectScrollbarModule
  ],
  exports: [
    // GeneralWidgetsComponent,
    SpinnerComponent
  ]
})
export class CommonsModule { }
