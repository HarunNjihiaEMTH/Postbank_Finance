import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParametersRoutingModule } from './parameters-routing.module';
import { GeneralComponent } from './general/general.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSliderModule } from "@angular/material/slider";
import { MatSortModule } from "@angular/material/sort";
import { MatStepperModule } from "@angular/material/stepper";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { NgxMaskModule } from "ngx-mask";
import { ColorPickerModule } from "ngx-color-picker";
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { TaxComponent } from './tax/tax.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTableExporterModule } from 'mat-table-exporter';
import { AddParameterComponent } from './tax/dialogs/add-parameter/add-parameter.component';
import { DeleteParameterComponent } from './tax/dialogs/delete-parameter/delete-parameter.component';
import { EditParameterComponent } from './tax/dialogs/edit-parameter/edit-parameter.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrganisationBasicInformationComponent } from './organisation-basic-information/organisation-basic-information.component';
import { InvoiceProfileComponent } from './invoice-profile/invoice-profile.component';
import { InvoiceTaxesComponent } from './invoice-taxes/invoice-taxes.component';
import { AddInvoiceTaxComponent } from './invoice-taxes/dialogs/add-invoice-tax/add-invoice-tax.component';
import { UpdateInvoiceTaxComponent } from './invoice-taxes/dialogs/update-invoice-tax/update-invoice-tax.component';
import { InvoiceTaxDetailsComponent } from './invoice-taxes/dialogs/invoice-tax-details/invoice-tax-details.component';
import { DeleteInvoiceTaxComponent } from './invoice-taxes/dialogs/delete-invoice-tax/delete-invoice-tax.component';

@NgModule({
  declarations: [
    GeneralComponent,
    TaxComponent,
    AddParameterComponent,
    DeleteParameterComponent,
    EditParameterComponent,
    OrganisationBasicInformationComponent,
    InvoiceProfileComponent,
    InvoiceTaxesComponent,
    AddInvoiceTaxComponent,
    UpdateInvoiceTaxComponent,
    InvoiceTaxDetailsComponent,
    DeleteInvoiceTaxComponent,
  ],
  imports: [
    DashboardModule,
    CommonModule,
    ParametersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSortModule,
    MatStepperModule,
    MatToolbarModule,
    MatTooltipModule,
    NgxMaskModule,
    ColorPickerModule,
    ComponentsModule,
    MatTableModule,
    MatPaginatorModule,
    MatTableExporterModule,

    PerfectScrollbarModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    SharedModule,
  ]
})
export class ParametersModule { }
