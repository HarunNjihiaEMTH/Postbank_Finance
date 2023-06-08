import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RoutePrivilegeGuard } from "../../data/services/_AccessControlAuthGuard.service";
import { ApprovedCreditNoteCancellationsComponent } from "./pages/credit-note-cancellations/approved-credit-note-cancellations/approved-credit-note-cancellations.component";
import { PendingCreditNoteCancellationsComponent } from "./pages/credit-note-cancellations/pending-credit-note-cancellations/pending-credit-note-cancellations.component";
import { PostedCreditNoteCancellationsComponent } from "./pages/credit-note-cancellations/posted-credit-note-cancellations/posted-credit-note-cancellations.component";
import { RejectedCreditNoteCancellationsComponent } from "./pages/credit-note-cancellations/rejected-credit-note-cancellations/rejected-credit-note-cancellations.component";
import { UnsuccessfulCreditNoteCancellationsComponent } from "./pages/credit-note-cancellations/unsuccessful-credit-note-cancellations/unsuccessful-credit-note-cancellations.component";
import { UploadedCreditNotesComponent } from "./pages/credit-note-cancellations/uploaded-credit-notes/uploaded-credit-notes.component";
import { ApprovedCreditNotesComponent } from "./pages/credit-note-management/approved-credit-notes/approved-credit-notes.component";
import { FailedCreditNoteUploadsComponent } from "./pages/credit-note-management/failed-credit-note-uploads/failed-credit-note-uploads.component";
import { GenerateCreditNoteComponent } from "./pages/credit-note-management/generate-credit-note/generate-credit-note.component";
import { PendingCreditNotesComponent } from "./pages/credit-note-management/pending-credit-notes/pending-credit-notes.component";
import { PostedCreditNotesComponent } from "./pages/credit-note-management/posted-credit-notes/posted-credit-notes.component";
import { PostedInvoicesComponent } from "./pages/credit-note-management/posted-invoices/posted-invoices.component";
import { RejectedCreditNotesComponent } from "./pages/credit-note-management/rejected-credit-notes/rejected-credit-notes.component";
import { AddCustomerComponent } from "./pages/customers-management/add-customer/add-customer.component";
import { AllCustomersComponent } from "./pages/customers-management/all-customers/all-customers.component";
import { UpdateCustomerComponent } from "./pages/customers-management/update-customer/update-customer.component";
import { AddInvoiceComponent } from "./pages/invoice-management/add-invoice/add-invoice.component";
import { AllInvoicesComponent } from "./pages/invoice-management/all-invoices/all-invoices.component";
import { ApprovedInvoicesComponent } from "./pages/invoice-management/approved-invoices/approved-invoices.component";
import { InvoiceDetailsComponent } from "./pages/invoice-management/invoice-details/invoice-details.component";
import { InvoiceInformationComponent } from "./pages/invoice-management/invoice-information/invoice-information.component";
import { PaidInvoicesComponent } from "./pages/invoice-management/paid-invoices/paid-invoices.component";
import { PendingInvoicesComponent } from "./pages/invoice-management/pending-invoices/pending-invoices.component";
import { PostedInvoiceInformationComponent } from "./pages/invoice-management/posted-invoice-information/posted-invoice-information.component";
import { PreviewInvoiceComponent } from "./pages/invoice-management/preview-invoice/preview-invoice.component";
import { RejectedInvoicesComponent } from "./pages/invoice-management/rejected-invoices/rejected-invoices.component";
import { UpdateInvoiceComponent } from "./pages/invoice-management/update-invoice/update-invoice.component";
import { UploadedInvoicesComponent } from "./pages/invoice-management/uploaded-invoices/uploaded-invoices.component";
import { UraFailedUploadsComponent } from "./pages/invoice-management/ura-failed-uploads/ura-failed-uploads.component";
import { AllItemCategoriesComponent } from "./pages/item-categories-management/all-item-categories/all-item-categories.component";
import { AddItemComponent } from "./pages/item-management/add-item/add-item.component";
import { AllItemsComponent } from "./pages/item-management/all-items/all-items.component";
import { FailedUploadsComponent } from "./pages/item-management/failed-uploads/failed-uploads.component";
import { ItemGoodsComponent } from "./pages/item-management/item-goods/item-goods.component";
import { ItemServicesComponent } from "./pages/item-management/item-services/item-services.component";
import { UpdateItemComponent } from "./pages/item-management/update-item/update-item.component";

const routes: Routes = [
  {
    path: "customers-management/all-customers",
    component: AllCustomersComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["View Customers"] },
  },
  {
    path: "customers-management/add-customer",
    component: AddCustomerComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["Add Customer"] },
  },
  {
    path: "customers-management/update-customer",
    component: UpdateCustomerComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["Update Customer"] },
  },
  {
    path: "items-management/all-items",
    component: AllItemsComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["View Stock"] },
  },
  {
    path: "items-management/item-services",
    component: ItemServicesComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["View Stock"] },
  },
  {
    path: "items-management/item-goods",
    component: ItemGoodsComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["View Stock"] },
  },
  {
    path: "items-management/failed-ura-uploads",
    component: FailedUploadsComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["View Stock"] },
  },
  {
    path: "items-management/add-item",
    component: AddItemComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["Add Stock"] },
  },
  {
    path: "items-management/update-item",
    component: UpdateItemComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["Update Stock"] },
  },
  {
    path: "invoices-management/all-invoices",
    component: AllInvoicesComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["View Invoices"] },
  },
  {
    path: "invoices-management/pending-invoices",
    component: PendingInvoicesComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["View Invoices"] },
  },
  {
    path: "invoices-management/approved-invoices",
    component: ApprovedInvoicesComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["View Invoices"] },
  },
  {
    path: "invoices-management/rejected-invoices",
    component: RejectedInvoicesComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["View Invoices"] },
  },
  {
    path: "invoices-management/update-invoice",
    component: UpdateInvoiceComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["Update Invoice"] },
  },
  {
    path: "invoices-management/invoice-details",
    component: InvoiceDetailsComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["View Invoices"] },
  },
  {
    path: "invoices-management/generate-invoice",
    component: AddInvoiceComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["Add Invoice"] },
  },
  {
    path: "invoices-management/approved-invoices",
    component: ApprovedInvoicesComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["View Invoices"] },
  },
  {
    path: "invoices-management/uploaded-invoices",
    component: UploadedInvoicesComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["View Invoices"] },
  },
  {
    path: "invoices-management/rejected-invoices",
    component: RejectedInvoicesComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["View Invoices"] },
  },
  {
    path: "invoices-management/unsuccessful-ura-upload-invoices",
    component: UraFailedUploadsComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["View Invoices"] },
  },
  {
    path: "invoices-management/paid-invoices",
    component: PaidInvoicesComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["View Invoices"] },
  },
  {
    path: "invoices-management/invoice-information/:id",
    component: InvoiceInformationComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["View Invoices"] },
  },
  {
    path: "invoices-management/posted-invoice-information/:id",
    component: PostedInvoiceInformationComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["View Invoices"] },
  },
  {
    path: "invoices-management/preview-invoice/:id",
    component: PreviewInvoiceComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["View Invoices"] },
  },
  {
    path: "item-categories-management/all-item-categories",
    component: AllItemCategoriesComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["View Stock"] },
  },
  {
    path: "credit-notes-management/posted-invoices",
    component: PostedInvoicesComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["View Invoices"] },
  },
  {
    path: "credit-notes-management/generate-credit-note",
    component: GenerateCreditNoteComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["Add Credit Note"] },
  },
  {
    path: "credit-notes-management/pending-credit-notes",
    component: PendingCreditNotesComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["View Credit Notes"] },
  },
  {
    path: "credit-notes-management/approved-credit-notes",
    component: ApprovedCreditNotesComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["View Credit Notes"] },
  },
  {
    path: "credit-notes-management/rejected-credit-notes",
    component: RejectedCreditNotesComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["View Credit Notes"] },
  },
  {
    path: "credit-notes-management/ura-uploaded-credit-notes",
    component: PostedCreditNotesComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["View Credit Notes"] },
  },
  {
    path: "credit-notes-management/failed-ura-credit-note-uploads",
    component: FailedCreditNoteUploadsComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["View Credit Notes"] },
  },
  {
    path: "credit-notes-cancellation/uploaded-credit-notes",
    component: UploadedCreditNotesComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["View Credit Notes"] },
  },
  {
    path: "credit-notes-cancellation/pending-credit-note-cancellations",
    component: PendingCreditNoteCancellationsComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["View Credit Notes"] },
  },

  {
    path: "credit-notes-cancellation/approved-credit-note-cancellations",
    component: ApprovedCreditNoteCancellationsComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["View Credit Notes"] },
  },
  {
    path: "credit-notes-cancellation/approved-credit-note-cancellations",
    component: ApprovedCreditNoteCancellationsComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["View Credit Notes"] },
  },

  {
    path: "credit-notes-cancellation/posted-credit-note-cancellations",
    component: PostedCreditNoteCancellationsComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["View Credit Notes"] },
  },

  {
    path: "credit-notes-cancellation/unsuccessful-credit-note-cancellations",
    component: RejectedCreditNoteCancellationsComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["View Credit Notes"] },
  },

  {
    path: "credit-notes-cancellation/rejected-credit-note-cancellations",
    component: UnsuccessfulCreditNoteCancellationsComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["View Credit Notes"] },
  },
];

// {
//   path: "payment-with-po",
//   component: PoBillComponent,
//   canActivate: [RoutePrivilegeGuard],
//   data: { requiredPrivilege: ["Enter Transaction"] },
// },

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
