import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomersManagementComponent } from './pages/customers-management/customers-management.component';
import { AllCustomersComponent } from './pages/customers-management/all-customers/all-customers.component';
import { AddCustomerComponent } from './pages/customers-management/add-customer/add-customer.component';
import { UpdateCustomerComponent } from './pages/customers-management/update-customer/update-customer.component';
import { DetailCustomerComponent } from './pages/customers-management/detail-customer/detail-customer.component';
import { ViewCustomerDetailsComponent } from './pages/customers-management/view-customer-details/view-customer-details.component';
import { AllItemsComponent } from './pages/item-management/all-items/all-items.component';
import { AddItemComponent } from './pages/item-management/add-item/add-item.component';
import { UpdateItemComponent } from './pages/item-management/update-item/update-item.component';
import { DeleteItemComponent } from './pages/item-management/delete-item/delete-item.component';
import { AllInvoicesComponent } from './pages/invoice-management/all-invoices/all-invoices.component';
import { AddInvoiceComponent } from './pages/invoice-management/add-invoice/add-invoice.component';
import { UpdateInvoiceComponent } from './pages/invoice-management/update-invoice/update-invoice.component';
import { DeleteInvoiceComponent } from './pages/invoice-management/delete-invoice/delete-invoice.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableExporterModule } from 'mat-table-exporter';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { DeleteCustomerComponent } from './pages/customers-management/delete-customer/delete-customer.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AddInvoiceItemComponent } from './pages/invoice-management/add-invoice/dialog/add-invoice-item/add-invoice-item.component';
import { CdkColumnDef } from '@angular/cdk/table';
import { InvoiceDetailsComponent } from './pages/invoice-management/invoice-details/invoice-details.component';
import { AllItemCategoriesComponent } from './pages/item-categories-management/all-item-categories/all-item-categories.component';
import { DeleteItemCategoryComponent } from './pages/item-categories-management/delete-item-category/delete-item-category.component';
import { UpdateItemCategoryComponent } from './pages/item-categories-management/update-item-category/update-item-category.component';
import { AddItemCategoryComponent } from './pages/item-categories-management/add-item-category/add-item-category.component';
import { ItemCategoryDetailsComponent } from './pages/item-categories-management/item-category-details/item-category-details.component';
import { ItemDetailsComponent } from './pages/item-management/item-details/item-details.component';
import { ApprovedInvoicesComponent } from './pages/invoice-management/approved-invoices/approved-invoices.component';
import { RejectedInvoicesComponent } from './pages/invoice-management/rejected-invoices/rejected-invoices.component';
import { CustomerStatusComponent } from './pages/customers-management/customer-status/customer-status.component';
import { InvoiceStatusComponent } from './pages/invoice-management/invoice-status/invoice-status.component';
import { RecievePaymentComponent } from './pages/invoice-management/approved-invoices/recieve-payment/recieve-payment.component';
import { MatRadioModule } from '@angular/material/radio';
import { DiscountInvoiceItemsComponent } from './pages/invoice-management/add-invoice/dialog/discount-invoice-items/discount-invoice-items.component';
import { MatStepperModule } from "@angular/material/stepper";
import { InvoicesDetailsComponent } from './pages/invoice-management/invoices-details/invoices-details.component';
import { PendingInvoicesComponent } from './pages/invoice-management/pending-invoices/pending-invoices.component';
import { InvoiceInformationComponent } from './pages/invoice-management/invoice-information/invoice-information.component';
import { UploadedInvoicesComponent } from './pages/invoice-management/uploaded-invoices/uploaded-invoices.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { VerifyInvoiceComponent } from './pages/invoice-management/pending-invoices/dialogs/verify-invoice/verify-invoice.component';
import { PostedInvoiceInformationComponent } from './pages/invoice-management/posted-invoice-information/posted-invoice-information.component';
import { UraFailedUploadsComponent } from './pages/invoice-management/ura-failed-uploads/ura-failed-uploads.component';
import { FailedUploadsComponent } from './pages/item-management/failed-uploads/failed-uploads.component';
import { PreviewInvoiceComponent } from './pages/invoice-management/preview-invoice/preview-invoice.component';
import { QRCodeModule } from 'angularx-qrcode';
import { PaidInvoicesComponent } from './pages/invoice-management/paid-invoices/paid-invoices.component';
import { GenerateCreditNoteComponent } from './pages/credit-note-management/generate-credit-note/generate-credit-note.component';
import { PendingCreditNotesComponent } from './pages/credit-note-management/pending-credit-notes/pending-credit-notes.component';
import { ApprovedCreditNotesComponent } from './pages/credit-note-management/approved-credit-notes/approved-credit-notes.component';
import { RejectedCreditNotesComponent } from './pages/credit-note-management/rejected-credit-notes/rejected-credit-notes.component';
import { FailedCreditNoteUploadsComponent } from './pages/credit-note-management/failed-credit-note-uploads/failed-credit-note-uploads.component';
import { PostedCreditNotesComponent } from './pages/credit-note-management/posted-credit-notes/posted-credit-notes.component';
import { PreviewCreditNoteComponent } from './pages/credit-note-management/preview-credit-note/preview-credit-note.component';
import { PostedInvoicesComponent } from './pages/credit-note-management/posted-invoices/posted-invoices.component';
import { IssueCreditNoteComponent } from './pages/credit-note-management/dialogs/issue-credit-note/issue-credit-note.component';
import { VerifyCreditNoteComponent } from './pages/credit-note-management/dialogs/verify-credit-note/verify-credit-note.component';
import { UpdateCreditNoteComponent } from './pages/credit-note-management/dialogs/update-credit-note/update-credit-note.component';
import { DeleteCreditNoteComponent } from './pages/credit-note-management/dialogs/delete-credit-note/delete-credit-note.component';
import { CreditNoteDetailsComponent } from './pages/credit-note-management/dialogs/credit-note-details/credit-note-details.component';
import { PendingCreditNoteCancellationsComponent } from './pages/credit-note-cancellations/pending-credit-note-cancellations/pending-credit-note-cancellations.component';
import { RejectedCreditNoteCancellationsComponent } from './pages/credit-note-cancellations/rejected-credit-note-cancellations/rejected-credit-note-cancellations.component';
import { PostedCreditNoteCancellationsComponent } from './pages/credit-note-cancellations/posted-credit-note-cancellations/posted-credit-note-cancellations.component';
import { UnsuccessfulCreditNoteCancellationsComponent } from './pages/credit-note-cancellations/unsuccessful-credit-note-cancellations/unsuccessful-credit-note-cancellations.component';
import { CreditNoteCancellationDetailsComponent } from './pages/credit-note-cancellations/dialogs/credit-note-cancellation-details/credit-note-cancellation-details.component';
import { CreateCreditNoteCancellationsComponent } from './pages/credit-note-cancellations/dialogs/create-credit-note-cancellations/create-credit-note-cancellations.component';
import { VerifyCreditNoteCancellationComponent } from './pages/credit-note-cancellations/dialogs/verify-credit-note-cancellation/verify-credit-note-cancellation.component';
import { UpdateCreditNoteCancellationComponent } from './pages/credit-note-cancellations/dialogs/update-credit-note-cancellation/update-credit-note-cancellation.component';
import { DeleteCreditNoteCancellationComponent } from './pages/credit-note-cancellations/dialogs/delete-credit-note-cancellation/delete-credit-note-cancellation.component';
import { UploadedCreditNotesComponent } from './pages/credit-note-cancellations/uploaded-credit-notes/uploaded-credit-notes.component';
import { ApprovedCreditNoteCancellationsComponent } from './pages/credit-note-cancellations/approved-credit-note-cancellations/approved-credit-note-cancellations.component';
import { ItemServicesComponent } from './pages/item-management/item-services/item-services.component';
import { ItemGoodsComponent } from './pages/item-management/item-goods/item-goods.component';
import { CommonsModule } from 'src/app/user/commons/commons.module';
import { DashboardModule } from '../dashboard/dashboard.module';


@NgModule({
  declarations: [
    CustomersManagementComponent,
    AllCustomersComponent,
    AddCustomerComponent,
    UpdateCustomerComponent,
    DetailCustomerComponent,
    ViewCustomerDetailsComponent,
    AllItemsComponent,
    AddItemComponent,
    UpdateItemComponent,
    DeleteItemComponent,
    AllInvoicesComponent,
    AddInvoiceComponent,
    UpdateInvoiceComponent,
    DeleteInvoiceComponent,
    DeleteCustomerComponent,
    AddInvoiceItemComponent,
    InvoiceDetailsComponent,
    AllItemCategoriesComponent,
    DeleteItemCategoryComponent,
    UpdateItemCategoryComponent,
    AddItemCategoryComponent,
    ItemCategoryDetailsComponent,
    ItemDetailsComponent,
    ApprovedInvoicesComponent,
    RejectedInvoicesComponent,
    CustomerStatusComponent,
    InvoiceStatusComponent,
    RecievePaymentComponent,
    DiscountInvoiceItemsComponent,
    InvoicesDetailsComponent,
    PendingInvoicesComponent,
    InvoiceInformationComponent,
    UploadedInvoicesComponent,
    VerifyInvoiceComponent,
    PostedInvoiceInformationComponent,
    UraFailedUploadsComponent,
    FailedUploadsComponent,
    PreviewInvoiceComponent,
    PaidInvoicesComponent,
    GenerateCreditNoteComponent,
    PendingCreditNotesComponent,
    ApprovedCreditNotesComponent,
    RejectedCreditNotesComponent,
    DeleteCreditNoteComponent,
    CreditNoteDetailsComponent,
    FailedCreditNoteUploadsComponent,
    PostedCreditNotesComponent,
    PreviewCreditNoteComponent,
    PostedInvoicesComponent,
    IssueCreditNoteComponent,
    VerifyCreditNoteComponent,
    UpdateCreditNoteComponent,
    PendingCreditNoteCancellationsComponent,
    RejectedCreditNoteCancellationsComponent,
    PostedCreditNoteCancellationsComponent,
    UnsuccessfulCreditNoteCancellationsComponent,
    CreditNoteCancellationDetailsComponent,
    CreateCreditNoteCancellationsComponent,
    VerifyCreditNoteCancellationComponent,
    UpdateCreditNoteCancellationComponent,
    DeleteCreditNoteCancellationComponent,
    UploadedCreditNotesComponent,
    ApprovedCreditNoteCancellationsComponent,
    ItemServicesComponent,
    ItemGoodsComponent,
  ],
  imports: [
    DashboardModule,
    CommonModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatTableExporterModule,
    ComponentsModule,
    SharedModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    CustomerRoutingModule,
    CommonsModule,
    MatRadioModule,
    MatStepperModule,
    MatProgressBarModule,
    PerfectScrollbarModule,
    MatMenuModule,
    MatTooltipModule,
    QRCodeModule,
    MatProgressBarModule
  ],
  providers: [CdkColumnDef]
})
export class CustomerModule { }
