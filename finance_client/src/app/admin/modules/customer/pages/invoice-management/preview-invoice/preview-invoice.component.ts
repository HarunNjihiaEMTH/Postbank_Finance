import { HttpParams } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { forkJoin, takeUntil } from "rxjs";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { InvoiceService } from "src/app/user/data/services/customer/invoice.service";

@Component({
  selector: "app-preview-invoice",
  templateUrl: "./preview-invoice.component.html",
  styleUrls: ["./preview-invoice.component.sass"],
})
export class PreviewInvoiceComponent extends BaseComponent implements OnInit {
  invoiceno: string;
  basicInformation: any;
  buyerDetails: any;
  goodsDetails: any[] = [];
  payWayInfo: any[] = [];
  sellerDetails: any;
  extendedDetails: any;
  taxDetails: any[] = [];
  summaryDetails: any;
  qrCode: any;

  importSellerDetails: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private invoiceService: InvoiceService,
    private snackbar: SnackbarService
  ) {
    super();

    activatedRoute.params.pipe(takeUntil(this.subject)).subscribe((param) => {
      this.invoiceno = param.id;

      console.log("Invoice no", param.id);
    });
  }

  isLocal: boolean;

  flag = false;

  ngOnInit() {

    // this.fetchBasicInformationByInvoiceId();
    // this.fetchSellerByInvoiceId();
    // this.fetchBuyerDetailsByInvoiceId();

    forkJoin([
      this.invoiceService.fetchInvoiceBasicInformationById(this.invoiceno),
      this.invoiceService.fetchSellerDetailsByInvoiceId(this.invoiceno),
      this.invoiceService.fetchBuyerDetails(this.invoiceno),
      this.invoiceService.fetchImportSellerDetails(this.invoiceno),
      this.invoiceService.fetchGoodsDetailsByInvoiceId(this.invoiceno),
      this.invoiceService.fetchPayWayInfoByInvoiceId(this.invoiceno),
      this.invoiceService.fetchSummaryDetailsByInvoiceId(this.invoiceno),
      this.invoiceService.fetchTaxDetailsByInvoiceId(this.invoiceno),
      this.invoiceService.fetchExtendedDetailsByInvoiceId(this.invoiceno),
      

    ]).subscribe(([basicInfo, sellerDetails, buyerDetails, importSellerDetails, goodsDetails, payWayInfo, summaryDetails, taxDetails, extendedDetails]) => {
      this.basicInformation = basicInfo[0];
      this.sellerDetails = sellerDetails[0];
      this.buyerDetails = buyerDetails[0];
      this.importSellerDetails = importSellerDetails[0];
      this.goodsDetails = goodsDetails;
      this.payWayInfo = payWayInfo;
      this.summaryDetails = summaryDetails[0];
      this.taxDetails = taxDetails;
      this.extendedDetails = extendedDetails[0];

      console.log("this.basicInformation = ", this.basicInformation);
      // Now you can access these properties in your HTML
      console.log("sellerDetails = ", sellerDetails);
      console.log("this.buyerDetails = ", this.buyerDetails);
      console.log("this.importSellerDetails = ", this.importSellerDetails);
      console.log("this.goodsDetails = ", this.goodsDetails);
      console.log("this.payWayInfo = ", this.payWayInfo);
      console.log("this.summaryDetails = ", this.summaryDetails);
      console.log("this.taxDetails = ", this.taxDetails);
      console.log("this.extendedDetails = ", this.extendedDetails);
      
      if (
        this.sellerDetails.tin === this.buyerDetails.buyerTin
      ) {
        this.isLocal = false;
        console.log("this.isLocal = false");
      } else if(this.sellerDetails.tin !== this.buyerDetails.buyerTin){
        this.isLocal = true;
        console.log("this.isLocal = true");
      }
  
      // Set the flag to true after all details have been fetched
      this.flag = true;
    });

    //this.fetchGoodsDetailsByInvoiceId();
    //this.fetchPayWayInfoByInvoiceId();
   
    //this.fetchTaxDetailsByInvoiceId();
   
    // this.fetchExtendedDetailsByInvoiceId();
    // this.fetchSummaryByInvoiceId();
    //this.fetchImportSellerDetailsInvoiceId();

    
  }

  // fetchImportSellerDetailsInvoiceId() {
  //   this.invoiceService
  //     .fetchImportSellerDetails(this.invoiceno)
  //     .pipe(takeUntil(this.subject))
  //     .subscribe(
  //       (res) => {
  //         this.importSellerDetails = res;

  //         console.log("importSellerDetails ", this.importSellerDetails);
  //       },
  //       (err) => {
  //         console.log(err);
  //       }
  //     );
  // }

  // fetchBasicInformationByInvoiceId() {
  //   this.invoiceService
  //     .fetchInvoiceBasicInformationById(this.invoiceno)
  //     .pipe(takeUntil(this.subject))
  //     .subscribe(
  //       (res) => {
  //         this.basicInformation = res[0];

  //         console.log("Basic Information ", this.basicInformation);
  //       },
  //       (err) => {
  //         console.log(err);
  //       }
  //     );
  // }

  // fetchBuyerDetailsByInvoiceId() {
  //   this.invoiceService
  //     .fetchBuyerDetails(this.invoiceno)
  //     .pipe(takeUntil(this.subject))
  //     .subscribe(
  //       (res) => {
  //         this.buyerDetails = res[0];

  //         console.log("Buyer Details ", this.buyerDetails);
  //       },
  //       (err) => {
  //         console.log(err);
  //       }
  //     );
  // }

  // fetchGoodsDetailsByInvoiceId() {
  //   this.invoiceService
  //     .fetchGoodsDetailsByInvoiceId(this.invoiceno)
  //     .pipe(takeUntil(this.subject))
  //     .subscribe(
  //       (res) => {
  //         this.goodsDetails = res;

  //         console.log("Goods Details ", this.goodsDetails);
  //       },
  //       (err) => {
  //         console.log(err);
  //       }
  //     );
  // }

  // fetchPayWayInfoByInvoiceId() {
  //   this.invoiceService
  //     .fetchPayWayInfoByInvoiceId(this.invoiceno)
  //     .pipe(takeUntil(this.subject))
  //     .subscribe(
  //       (res) => {
  //         this.payWayInfo = res;

  //         console.log("Pay Way Info Details ", this.payWayInfo);
  //       },
  //       (err) => {
  //         console.log(err);
  //       }
  //     );
  // }

  // fetchSellerByInvoiceId() {
  //   this.invoiceService
  //     .fetchSellerDetailsByInvoiceId(this.invoiceno)
  //     .pipe(takeUntil(this.subject))
  //     .subscribe(
  //       (res) => {
  //         this.sellerDetails = res[0];

  //         console.log("Seller Details ", this.sellerDetails);
  //       },
  //       (err) => {
  //         console.log(err);
  //       }
  //     );
  // }

  // fetchSummaryDetailsByInvoiceId() {
  //   this.invoiceService
  //     .fetchSummaryDetailsByInvoiceId(this.invoiceno)
  //     .pipe(takeUntil(this.subject))
  //     .subscribe(
  //       (res) => {
  //         this.summaryDetails = res;

  //         console.log("Summary Details ", this.summaryDetails);
  //       },
  //       (err) => {
  //         console.log(err);
  //       }
  //     );
  // }

  // fetchTaxDetailsByInvoiceId() {
  //   this.invoiceService
  //     .fetchTaxDetailsByInvoiceId(this.invoiceno)
  //     .pipe(takeUntil(this.subject))
  //     .subscribe(
  //       (res) => {
  //         this.taxDetails = res;

  //         console.log("Tax Details ", this.taxDetails);
  //       },
  //       (err) => {
  //         console.log(err);
  //       }
  //     );
  // }

  // fetchExtendedDetailsByInvoiceId() {
  //   this.invoiceService
  //     .fetchExtendedDetailsByInvoiceId(this.invoiceno)
  //     .pipe(takeUntil(this.subject))
  //     .subscribe(
  //       (res) => {
  //         this.extendedDetails = res[0];
  //       },
  //       (err) => {
  //         console.log(err);
  //       }
  //     );
  // }

  // fetchSummaryByInvoiceId() {
  //   this.invoiceService
  //     .fetchSummaryDetailsByInvoiceId(this.invoiceno)
  //     .pipe(takeUntil(this.subject))
  //     .subscribe(
  //       (res) => {
  //         console.log("Summary Details ", res);
  //         this.summaryDetails = res[0];

  //         this.qrCode = this.summaryDetails.qr;
  //       },
  //       (err) => {
  //         console.log(err);
  //       }
  //     );
  // }

  printInvoice() {
    const params = new HttpParams().set("invoice_no", this.invoiceno);

    this.invoiceService
      .downloadGenaratedInvoice(params)
      .pipe(takeUntil(this.subject))
      .subscribe((result) => {
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
      });
  }

  backToUploadedInvoices() {
    this.router.navigate([
      "/admin/customer/invoices-management/uploaded-invoices",
    ]);
  }
}
