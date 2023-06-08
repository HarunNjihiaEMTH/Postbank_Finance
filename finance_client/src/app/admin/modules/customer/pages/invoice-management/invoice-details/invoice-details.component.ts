import { SelectionModel } from "@angular/cdk/collections";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { takeUntil } from "rxjs";
import { Location } from '@angular/common';
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { OrganisationService } from "src/app/user/data/services/organisation.service";
import { Invoice } from "src/app/user/data/types/customer-types/invoice";
import { InvoiceItem } from "src/app/user/data/types/customer-types/invoice-item";
import { Organisation } from "src/app/user/data/types/organisation";
import { CustomerService } from "src/app/user/data/services/customer/customer.service";
import { Customer } from "src/app/user/data/types/customer-types/customer";
import { PurchaseOrderSessionService } from "src/app/user/data/services/purchase-order-session.service";
import { HttpParams } from "@angular/common/http";
import { InvoiceService } from "src/app/user/data/services/customer/invoice.service";
import { SnackbarService } from "src/app/shared/services/snackbar.service";

@Component({
  selector: "app-invoice-details",
  templateUrl: "./invoice-details.component.html",
  styleUrls: ["./invoice-details.component.sass"],
})
export class InvoiceDetailsComponent extends BaseComponent implements OnInit {
  invoice: Invoice;
  invoiceItems: any[] = [];
  routeState: any;
  purchaseOrderDate: Date;
  totalPrice: number;
  discount: number = 0;
  taxAmount: number[] = [];
  totalTaxAmount: number = 0;
  organisationDetails: Organisation;
  customer:Customer;

  displayedColumns: string[] = [
    "id",
    "itemName",
    "itemQuantity",
    "itemUnitPrice",
    "itemTotalValue",
    "tax",
    "vatAmount",
    "whtRate",
    "whtAmount",
    "incomeTax",
    "amountTobepaid",
    "actions",
  ];

  dataSource!: MatTableDataSource<InvoiceItem>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };
  election = new SelectionModel<InvoiceItem>(true, []);
  data: any;
  error: any;
  isLoading: boolean = false;
  orderItemArray: any[] = [];
  orderItemDataSource: any;
  navigationFromAllInvoices: boolean = false;
  navigationFromPendingInvoices: boolean = false;

  constructor(
    private router: Router,
    private location: Location,
    private purchaseOrderSession: PurchaseOrderSessionService,
    private customerService: CustomerService,
    private invoiceService: InvoiceService,
    private snackbar: SnackbarService,
    private organisationService: OrganisationService
  ) {
    super();

    if (this.router.getCurrentNavigation().extras.state) {
      this.routeState = this.router.getCurrentNavigation().extras.state;

      if (this.routeState) {
        this.invoice = this.routeState.invoice
          ? JSON.parse(this.routeState.invoice)
          : "";

        this.invoiceItems = this.invoice.invoiceParticulars;

        this.orderItemDataSource = new MatTableDataSource(this.invoiceItems);
        this.orderItemDataSource.paginator = this.paginator;

        purchaseOrderSession.saveInvoiceDetails(this.invoice);

        console.log("Invoice ", this.invoice);
      }

      if(this.routeState.action == "Navigation From All Invoices"){
        this.navigationFromAllInvoices = true
      }else if (this.routeState.action == "Navigation From Approved Invoices"){
        this.navigationFromPendingInvoices = true;
        this.navigationFromAllInvoices = false;
      }else {
        this.navigationFromPendingInvoices = true;
        this.navigationFromAllInvoices = false;
      }
    }
  }

  ngOnInit(): void {
    this.recoverInvoiceDetailsOnReload();

    this.recoverOrganisationDetailsOnReload();

    this.recoverCustomerDetailsOnReload();
    
    this.purchaseOrderDate = new Date();

    console.log("Invoice ", this.invoice);
    console.log("Invoice items", this.invoiceItems);

    this.getOrganisationDetails();

    console.log("Organisation Details",  this.getOrganisationDetails())

    this.getCustomerDetails(parseInt(this.invoice.customerId));
  }

  recoverInvoiceDetailsOnReload() {
    const recoveredInvoiceDetails = JSON.parse(
      this.purchaseOrderSession.getInvoiceDetails()
    );

    if (recoveredInvoiceDetails) {
      this.invoice = recoveredInvoiceDetails;
      this.invoiceItems = this.invoice.invoiceParticulars;
    }
  }

  recoverOrganisationDetailsOnReload(){
    const recoveredOrganisationDetails = JSON.parse(
      this.purchaseOrderSession.getOrganisationDetails()
    );

    if (recoveredOrganisationDetails) {
      this.organisationDetails = recoveredOrganisationDetails;
    }
  }

  recoverCustomerDetailsOnReload(){
    const recoveredCustomerDetails = JSON.parse(
      this.purchaseOrderSession.getCustomerDetails()
    );

    if (recoveredCustomerDetails) {
      this.customer = recoveredCustomerDetails;
    }
  }

  getOrganisationDetails() {
    this.organisationService
      .getOrganisationDetails()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (results) => {
          this.organisationDetails = results[0];

          console.log(this.organisationDetails);

          this.purchaseOrderSession.saveOrganisationDetails(this.organisationDetails)
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getCustomerDetails(customerId) {
    this.customerService
      .getCustomersById(customerId)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (result) => {
          this.customer = result;
          console.log(result);

          this.purchaseOrderSession.saveCustomerDetails(this.customer)
        },
        (err) => {
          console.log(err);
        }
      );
  }

  downloadInvoice(invoice_no){
    if(!this.invoice.id){
      this.snackbar.showNotification("snackbar-danger", "Invoice can only be printed after it has been submitted ! ")
    }else {
      const params = new HttpParams().set("invoice_no", invoice_no);

      this.invoiceService.downloadGenaratedInvoice(params).pipe(takeUntil(this.subject)).subscribe(result => {
        let url = window.URL.createObjectURL(result.data);
  
        // if you want to open PDF in new tab
        window.open(url);
  
        let a = document.createElement("a");
        document.body.appendChild(a);
        a.setAttribute("style", "display: none");
        a.setAttribute("target", "blank");
        a.href = url;
        a.download = result.filename;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
  
        this.snackbar.showNotification(
          "snackbar-success",
          "Invoice generated successfully"
        );
      })
    }
  }

  navigateBackToGenerateInvoiceForm() {
    this.router.navigate(
      ["/admin/customer/invoices-management/generate-invoice"],
      {
        state: {
          invoice: JSON.stringify(this.invoice),
          action: "Navigation Back From Preview"
        },
      }
    );
  }

  navigateBackToAllInvoices(){
    this.location.back()
  }
}
