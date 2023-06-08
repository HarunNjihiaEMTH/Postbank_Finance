import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { takeUntil } from "rxjs";
import { Location } from '@angular/common';
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { InvoiceService } from "src/app/user/data/services/customer/invoice.service";
import { ItemService } from "src/app/user/data/services/customer/item.service";

@Component({
  selector: "app-invoice-information",
  templateUrl: "./invoice-information.component.html",
  styleUrls: ["./invoice-information.component.sass"],
})
export class InvoiceInformationComponent
  extends BaseComponent
  implements OnInit
{
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
  navigationFromPendingInvoices: boolean = false;
  navigationFromApprovedInvoices: boolean = false;
  navigationFromRejectedInvoices: boolean = false;
  navigationFromUnsuccessfulInvoiceUploads: boolean = false;
  navigationFromPaidInvoices: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private invoiceService: InvoiceService
  ) {
    super();

    activatedRoute.params.pipe(takeUntil(this.subject)).subscribe((param) => {
      this.invoiceno = param.id;

      console.log("Invoice no", param.id);
    });

    if (this.router.getCurrentNavigation().extras.state) {
      this.routeState = this.router.getCurrentNavigation().extras.state;

      console.log("ROUTE STATE", this.routeState);

      if (this.routeState) {
        if (this.routeState.action == "Navigation From Pending Invoices") {
          console.log("Route State ", this.routeState);

          this.navigationFromPendingInvoices = true;
          console.log(
            "Navigation From Pending Invoices",
            this.navigationFromPendingInvoices
          );
        } else if (
          this.routeState.action == "Navigation From Approved Invoices"
        ) {
          console.log("Route State ", this.routeState);

          this.navigationFromApprovedInvoices = true;
          console.log(
            "Navigation From Approved Invoices",
            this.navigationFromApprovedInvoices
          );
        } else if (
          this.routeState.action ==
          "Navigation From Pending Unsuccessful URA Invoice Uploads"
        ) {
          console.log("Route State ", this.routeState);

          this.navigationFromUnsuccessfulInvoiceUploads = true;
          console.log(
            "Navigation From Unsucusseful Invoices",
            this.navigationFromUnsuccessfulInvoiceUploads
          );
        } else if (
          this.routeState.action == "Navigation From Rejected Invoices"
        ) {
          console.log("Route State ", this.routeState);

          this.navigationFromRejectedInvoices = true;
          console.log(
            "Navigation From Rejected Invoices",
            this.navigationFromRejectedInvoices
          );
        } else {
          console.log("Route State ", this.routeState);

          this.navigationFromPendingInvoices = true;
          console.log(
            "Navigation From Pending Invoices",
            this.navigationFromPendingInvoices
          );
        }
      }
    }
  }

  ngOnInit(): void {
    this.fetchBasicInformationByInvoiceId();

    //this.fetchBuyerDetailsByInvoiceId();

    this.fetchGoodsDetailsByInvoiceId();

    this.fetchPayWayInfoByInvoiceId();

    this.fetchSellerByInvoiceId();

    this.fetchSellerByInvoiceId();

    //this.fetchSummaryDetailsByInvoiceId();

    this.fetchTaxDetailsByInvoiceId();

    this.fetchExtendedDetailsByInvoiceId();
  }

  fetchBasicInformationByInvoiceId() {
    this.invoiceService
      .fetchInvoiceBasicInformationByIdBeforePost(this.invoiceno)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          console.log("Basic Information ", res);
          this.basicInformation = res[0];

          console.log("Basic Information ", this.basicInformation);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  fetchBuyerDetailsByInvoiceId() {
    this.invoiceService
      .fetchBuyerDetailsByInvoiceIdBeforePosting(this.invoiceno)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          console.log("Buyer Details ", res);
          this.buyerDetails = res;

          console.log("Buyer Details ", this.buyerDetails);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  fetchGoodsDetailsByInvoiceId() {
    this.invoiceService
      .fetchGoodsDetailsByInvoiceIdBeforePosting(this.invoiceno)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          console.log("Goods Details ", res);
          this.goodsDetails = res;

          console.log("Goods Details ", this.goodsDetails);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  fetchPayWayInfoByInvoiceId() {
    this.invoiceService
      .fetchPayWayInfoByInvoiceIdBeforePosting(this.invoiceno)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          console.log("Pay Way Info Details ", res);
          this.payWayInfo = res;

          console.log("Pay Way Info Details ", this.payWayInfo);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  fetchSellerByInvoiceId() {
    this.invoiceService
      .fetchSellerDetailsByInvoiceIdBeforePosting(this.invoiceno)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          console.log("Seller Details ", res);
          this.sellerDetails = res[0];

          console.log("Seller Details ", this.sellerDetails);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  fetchSummaryDetailsByInvoiceId() {
    this.invoiceService
      .fetchSummaryDetailsByInvoiceIdBeforePosting(this.invoiceno)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          console.log("Summary Details ", res);
          this.summaryDetails = res;

          console.log("Summary Details ", this.summaryDetails);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  fetchTaxDetailsByInvoiceId() {
    this.invoiceService
      .fetchTaxDetailsByInvoiceIdBeforePosting(this.invoiceno)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          console.log("Tax Details ", res);
          this.taxDetails = res;

          console.log("Tax Details ", this.taxDetails);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  fetchExtendedDetailsByInvoiceId() {
    this.invoiceService
      .fetchExtendedDetailsByInvoiceIdBeforePosting(this.invoiceno)
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

  navigateBackToInvoices() {
    this.location.back();
   }
}
