import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormArray, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { takeUntil } from "rxjs";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { CustomerService } from "src/app/user/data/services/customer/customer.service";
import { InvoiceService } from "src/app/user/data/services/customer/invoice.service";
import { PurchaseOrderSessionService } from "src/app/user/data/services/purchase-order-session.service";

const INVOICE_DETAILS = "invoice-details";

@Component({
  selector: "app-generate-credit-note",
  templateUrl: "./generate-credit-note.component.html",
  styleUrls: ["./generate-credit-note.component.sass"],
})
export class GenerateCreditNoteComponent
  extends BaseComponent
  implements OnInit
{
  // goodsDetailsForm: FormGroup;
  // updateCommodity: boolean = false;
  // modeOfPaymentForm: FormGroup;
  // taxDetailsForm: FormGroup;
  // coreInvoiceForm: FormGroup;
  // invoiceDetailsConfigurationForm: FormGroup;
  // productsDetailsConfigurationForm: FormGroup;

  creditNoteForm: FormGroup;

  invoiceno: string;
  basicInformation: any;
  invoice: any;
  invoiceItems: any[] = [];
  routeState: any;
  purchaseOrderDate: Date;
  totalPrice: number;
  buyerDetails: any[] = [];
  goodsDetails: any[] = [];
  payWayInfo: any[] = [];
  sellerDetails: any;
  extendedDetails: any;
  taxDetails: any[] = [];
  summaryDetails: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private purchaseOrderSession: PurchaseOrderSessionService,
    private customerService: CustomerService,
    private invoiceService: InvoiceService,
    private snackbar: SnackbarService
  ) {
    super();

    if (this.router.getCurrentNavigation().extras.state) {
      this.routeState = this.router.getCurrentNavigation().extras.state;

      if (this.routeState) {
        this.invoice = this.routeState.invoice
          ? JSON.parse(this.routeState.invoice)
          : "";

        // this.saveInvoiceDetails(this.invoice);

        console.log("Invoice ", this.invoice);

        console.log("Invoice Number ", this.invoiceno);
      }
    }
  }

  ngOnInit(): void {

    this.creditNoteForm = this.createCreditNoteForm();
    // this.getInvoiceDetailsOnReload();

    // this.invoiceno = this.invoice.invoiceno;

    // this.goodsDetailsForm = this.fb.group({
    //   deemedFlag: ["2"],
    //   discountFlag: ["2"],
    //   discountTaxRate: [0],
    //   discountTotal: [0],
    //   exciseFlag: ["2"],
    //   goodsCategoryId: [""],
    //   item: ["", [Validators.required]],
    //   itemCode: ["", [Validators.required]],
    //   orderNumber: [0],
    //   qty: [1, [Validators.required]],
    //   tax: [""],
    //   taxRate: [""],
    //   total: [""],
    //   unitOfMeasure: [""],
    //   unitPrice: ["", [Validators.required]],
    //   categoryName: [""],
    //   goodsCategoryName: [""],
    //   exciseRate: [""],
    //   exciseRule: [""],
    //   exciseTax: [""],
    //   pack: [""],
    //   stick: [""],
    //   exciseUnit: [""],
    //   exciseCurrency: [""],
    //   exciseRateName: [""],
    //   vatApplicableFlag: [""],
    // });

    // this.taxDetailsForm = this.fb.group({
    //   netAmount: ["", Validators.required],
    //   taxAmount: ["", Validators.required],
    //   taxCategoryCode: ["01", Validators.required],
    //   taxRate: ["", Validators.required],
    //   taxRateName: ["VAT", Validators.required],
    //   grossAmount: [""],
    //   exciseUnit: [""],
    //   exciseCurrency: [""],
    //   itemCount: [""],
    //   modeCode: [""],
    //   qrCode: [""],
    // });

    // this.modeOfPaymentForm = this.fb.group({
    //   orderNumber: ["1", Validators.required],
    //   paymentAmount: ["", Validators.required],
    //   paymentMode: ["101", Validators.required],
    // });
  }

  createCreditNoteForm(): FormGroup{
    return this.fb.group({
      oriInvoiceId: "0123456",
      oriInvoiceNo: "1234556789",
      reasonCode: "102",
      reason: "refundreason",
      applicationTime: "2019-06-15 15:02:02",
      invoiceApplyCategoryCode: "1",
      currency: "UGX",
      contactName: "1",
      contactMobileNum: "1",
      contactEmail: "1",
      source: "101",
      remarks: "Remarks",
      sellersReferenceNo: "00000000012",
    });
  }  

  onCancel(){}

  // saveInvoiceDetails(invoice) {
  //   sessionStorage.removeItem(INVOICE_DETAILS);
  //   sessionStorage.setItem(INVOICE_DETAILS, JSON.stringify(invoice));
  // }

  // getInvoiceDetails() {
  //   return sessionStorage.getItem(INVOICE_DETAILS);
  // }

  // removeInvoiceDetails() {
  //   sessionStorage.removeItem(INVOICE_DETAILS);
  // }

  // getInvoiceDetailsOnReload() {
  //   const recoveredInvoiceDetails = JSON.parse(this.getInvoiceDetails());

  //   if (recoveredInvoiceDetails) {
  //     this.invoice = recoveredInvoiceDetails;

  //     this.invoiceno = this.invoice.invoiceno;

  //     if (this.invoiceno) {
  //       this.fetchBasicInformationByInvoiceId();

  //       this.fetchGoodsDetailsByInvoiceId();

  //       this.fetchPayWayInfoByInvoiceId();

  //       this.fetchSellerByInvoiceId();

  //       this.fetchSellerByInvoiceId();

  //       this.fetchTaxDetailsByInvoiceId();

  //       this.fetchExtendedDetailsByInvoiceId();
  //     }

  //     console.log("Invoice ", this.invoice);

  //     console.log("Invoice Number ", this.invoice.invoiceno);
  //   }
  // }

  // createGenarateInvoiceForm() {
  //   return this.fb.group({
  //     oriInvoiceId: ["1"],
  //     oriInvoiceNo: ["1"],
  //     reasonCode: ["1"],
  //     reason: ["1"],
  //     applicationTime: ["1"],
  //     invoiceApplyCategoryCode: ["1"],
  //     currency: ["1"],
  //     contactName: ["1"],
  //     contactMobileNum: ["1"],
  //     contactEmail: ["1"],
  //     source: ["1"],
  //     remarks: ["1"],
  //     sellersReferenceNo: "00000000012",
  //     basicInformation: this.fb.group({
  //       currency: ["UGX"],
  //       dataSource: ["103"],
  //       deviceNo: [""],
  //       invoiceIndustryCode: [""],
  //       invoiceKind: ["1"],
  //       invoiceType: ["1"],
  //       issuedDate: [""],
  //       operator: [""],
  //       oriInvoiceId: ["1"],
  //     }),
  //     buyerDetails: this.fb.group({
  //       buyerCitizenship: ["", Validators.required],
  //       buyerLegalName: ["", Validators.required],
  //       buyerMobilePhone: ["", Validators.required],
  //       buyerPassportNum: ["", Validators.required],
  //       buyerSector: ["", Validators.required],
  //       buyerTin: ["", Validators.required],
  //       buyerType: ["", Validators.required],
  //       buyerBusinessName: [""],
  //       buyerAddress: [""],
  //       buyerEmail: [""],
  //       buyerLinePhone: [""],
  //       buyerPlaceOfBusi: [""],
  //       buyerReferenceNo: [""],
  //     }),
  //     goodsDetails: new FormArray([]),
  //     payWay: new FormArray([]),
  //     customerid: [""],
  //     extend: {
  //       localInvoiceNo: "1234",
  //       reason: "Some reason",
  //       reasonCode: "102",
  //     },
  //     sellerDetails: this.fb.group({
  //       address: ["", Validators.required],
  //       businessName: ["", Validators.required],
  //       emailAddress: ["", Validators.required],
  //       legalName: ["", Validators.required],
  //       linePhone: ["", Validators.required],
  //       mobilePhone: ["", Validators.required],
  //       referenceNo: ["", Validators.required],
  //       tin: ["", Validators.required],
  //     }),
  //     summary: this.fb.group({
  //       grossAmount: ["", Validators.required],
  //       invoiceID: ["", Validators.required],
  //       itemCount: ["", Validators.required],
  //       modeCode: ["102", Validators.required],
  //       netAmount: ["", Validators.required],
  //       qrCode: ["", Validators.required],
  //       remarks: ["", Validators.required],
  //       taxAmount: ["", Validators.required],
  //     }),
  //     taxDetails: new FormArray([]),
  //     importServicesSeller: this.fb.group({
  //       importBusinessName: [""],
  //       importEmailAddress: [""],
  //       importContactNumber: [""],
  //       importAddress: [""],
  //       importInvoiceDate: [""],
  //       importAttachmentName: [""],
  //       importAttachmentContent: [""],
  //     }),
  //   });
  // }

 

  // fetchBasicInformationByInvoiceId() {
  //   this.invoiceService
  //     .fetchInvoiceBasicInformationById(this.invoiceno)
  //     .pipe(takeUntil(this.subject))
  //     .subscribe(
  //       (res) => {
  //         console.log("Basic Information ", res);
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
  //         console.log("Buyer Details ", res);
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
  //         console.log("Goods Details ", res);
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
  //         console.log("Pay Way Info Details ", res);
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
  //         console.log("Seller Details ", res);
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
  //         console.log("Summary Details ", res);
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
  //         console.log("Tax Details ", res);
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
  //         console.log("Extended Details ", res);
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

  //         // this.qrCode = this.summaryDetails.qr
  //       },
  //       (err) => {
  //         console.log(err);
  //       }
  //     );
  // }
}
