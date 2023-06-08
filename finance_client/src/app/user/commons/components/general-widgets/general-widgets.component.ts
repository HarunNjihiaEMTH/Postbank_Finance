import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { CustomerService } from "src/app/user/data/services/customer/customer.service";
import { InvoiceService } from "src/app/user/data/services/customer/invoice.service";
import { PurchaseOrderService } from "src/app/user/data/services/purchase-order.service";
import { SupplierService } from "src/app/user/data/services/supplier.service";
import { takeUntil } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-general-widgets",
  templateUrl: "./general-widgets.component.html",
  styleUrls: ["./general-widgets.component.scss"],
})
export class GeneralWidgetsComponent extends BaseComponent implements OnInit {
  customersCount: number = 0;
  suppliersCount: number = 0;
  purchaseOrdersCount: number = 0;
  invoicesCount: number = 0;
  suppliers: any[] = [];
  customers: any[] = [];
  invoices: any[] = [];
  purchaseOrders: any[] =[];

  constructor(
    private router: Router,
    private customerService: CustomerService,
    private supplierService: SupplierService,
    private purchaseOrderService: PurchaseOrderService,
    private invoiceService: InvoiceService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getSuppliers();

    this.getCustomers();

    this.getAllInvoices();

    this.getPurchaseOrders();
  }

  getSuppliers(){
    this.supplierService.getSuppliers
    ()
    .pipe(takeUntil(this.subject))
    .subscribe((res) => {
      this.suppliers = res;

      if(res.length > 0){
        this.suppliersCount = res.length;

      }
    }),
    (err) => {
      console.log(err);
    };
  }

  navigateToSuppliers(){
    this.router.navigate(['/user/supplier/suppliers-management/all'])
  }

  navigateToAddSuppliers(){
    this.router.navigate(['/user/supplier/suppliers-management/add-supplier'])
  }

  getCustomers(){
    this.customerService
    .getAllCustomers()
    .pipe(takeUntil(this.subject))
    .subscribe((res) => {
      this.customers = res;

      if(this.customers.length > 0){
        this.customersCount = res.length;
      }
    

    }),
    (err) => {
      console.log(err);
    };
  }

  navigateToCustomers(){
    this.router.navigate(['/user/customer/customers-management/all-customers'])
  }

  navigateToAddCustomers(){
    this.router.navigate(['/user/customer/customers-management/add-customer'])
  }

  getAllInvoices(){
    this.invoiceService
    .getAllInvoices()
    .pipe(takeUntil(this.subject))
    .subscribe((res) => {
      this.invoices = res;

      if(this.invoices.length > 0){
        this.invoicesCount = res.length;
      }

    }),
    (err) => {
      console.log(err);
    };
  }

  navigateToInvoices(){
    this.router.navigate(['/user/customer/invoices-management/all-invoices'])
  }

  navigateToAddInvoice(){
    this.router.navigate(['/user/customer/invoices-management/generate-invoice'])
  }

  getPurchaseOrders(){
    this.purchaseOrderService
    .getAllPurchaseOrders()
    .pipe(takeUntil(this.subject))
    .subscribe((res) => {
      this.purchaseOrders = res;

      if(this.purchaseOrders){
        this.purchaseOrdersCount = res.length;
      }
      

    }),
    (err) => {
      console.log(err);
    };
  }

  navigateToPurchaseOrders(){
    this.router.navigate(['/user/supplier/purchase-orders-management/all'])
  }

  navigateToAddPurchaseOrder(){
    this.router.navigate(['/user/supplier/purchase-orders-management/create-purchase-order'])
  }
}
