import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { InvoiceService } from 'src/app/user/data/services/customer/invoice.service';

@Component({
  selector: 'app-posted-invoice-information',
  templateUrl: './posted-invoice-information.component.html',
  styleUrls: ['./posted-invoice-information.component.sass']
})
export class PostedInvoiceInformationComponent extends
BaseComponent implements OnInit {
  invoiceno: string;
  basicInformation: any;
  buyerDetails: any[] = [];
  goodsDetails: any[] = [];
  payWayInfo: any[] = [];
  sellerDetails: any;
  extendedDetails: any;
  taxDetails: any[] = [];
  summaryDetails: any[] = [];
  routeState: any;
  navigationFromUploadedInvoices: boolean = false;
  navigationFromPaidInvoices: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private invoiceService: InvoiceService) {
    super();

    activatedRoute.params.pipe(takeUntil(this.subject)).subscribe(param => {
      this.invoiceno = param.id;
    })

    if (this.router.getCurrentNavigation().extras.state) {
      this.routeState = this.router.getCurrentNavigation().extras.state;

      console.log("ROUTE STATE", this.routeState);

      if (this.routeState) {
        if (this.routeState.action == "Navigation From Uploaded Invoices") {
         

          this.navigationFromUploadedInvoices = true;
         
        } else if (
          this.routeState.action == "Navigation From Paid Invoices"
        ) {
        
          this.navigationFromPaidInvoices = true;
        
        } else {
          this.navigationFromUploadedInvoices = true;
        }
      }
    }
   }

  ngOnInit(): void {
    this.fetchBasicInformationByInvoiceId();

    this.fetchGoodsDetailsByInvoiceId();

    this.fetchPayWayInfoByInvoiceId();

    this.fetchSellerByInvoiceId();

    this.fetchSellerByInvoiceId();

    this.fetchTaxDetailsByInvoiceId();

    this.fetchExtendedDetailsByInvoiceId();
  }

  fetchBasicInformationByInvoiceId() {
    this.invoiceService
      .fetchInvoiceBasicInformationById(this.invoiceno)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          console.log("Basic Information ",res);
          this.basicInformation = res[0];

          console.log("Basic Information ", this.basicInformation)
        },
        (err) => {
          console.log(err);
        }
      );
  }

  fetchBuyerDetailsByInvoiceId() {
    this.invoiceService
      .fetchBuyerDetailsByInvoiceId(this.invoiceno)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          console.log("Buyer Details ", res);
          this.buyerDetails = res;

          console.log("Buyer Details ", this.buyerDetails)
        },
        (err) => {
          console.log(err);
        }
      );
  }

  fetchGoodsDetailsByInvoiceId() {
    this.invoiceService
      .fetchGoodsDetailsByInvoiceId(this.invoiceno)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          console.log("Goods Details ", res);
          this.goodsDetails = res;

          console.log("Goods Details ", this.goodsDetails)
        },
        (err) => {
          console.log(err);
        }
      );
  }

  fetchPayWayInfoByInvoiceId() {
    this.invoiceService
      .fetchPayWayInfoByInvoiceId(this.invoiceno)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          console.log("Pay Way Info Details ", res);
          this.payWayInfo = res;

          console.log("Pay Way Info Details ", this.payWayInfo)
        },
        (err) => {
          console.log(err);
        }
      );
  }

  fetchSellerByInvoiceId() {
    this.invoiceService
      .fetchSellerDetailsByInvoiceId(this.invoiceno)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          console.log("Seller Details ", res);
          this.sellerDetails = res[0];

          console.log("Seller Details ", this.sellerDetails)
        },
        (err) => {
          console.log(err);
        }
      );
  }

  fetchSummaryDetailsByInvoiceId() {
    this.invoiceService
      .fetchSummaryDetailsByInvoiceId(this.invoiceno)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          console.log("Summary Details ", res);
          this.summaryDetails = res;

          console.log("Summary Details ", this.summaryDetails)
        },
        (err) => {
          console.log(err);
        }
      );
  }

  fetchTaxDetailsByInvoiceId() {
    this.invoiceService
      .fetchTaxDetailsByInvoiceId(this.invoiceno)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          console.log("Tax Details ", res);
          this.taxDetails = res;

          console.log("Tax Details ", this.taxDetails)
        },
        (err) => {
          console.log(err);
        }
      );
  }

  fetchExtendedDetailsByInvoiceId() {
    this.invoiceService
      .fetchExtendedDetailsByInvoiceId(this.invoiceno)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          console.log("Extended Details ", res);
          this.extendedDetails = res[0];
        },
        (err) => {
          console.log(err);
        }
      );
  }

  backToUploadedInvoices(){
    this.router.navigate(['/admin/customer/invoices-management/uploaded-invoices'])
  }

}
