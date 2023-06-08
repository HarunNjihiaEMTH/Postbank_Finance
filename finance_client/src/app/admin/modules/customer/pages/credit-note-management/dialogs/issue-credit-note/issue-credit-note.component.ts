import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from "@angular/material/dialog";
import { Subscription, takeUntil } from "rxjs";
import { AccountService } from "src/app/account/data/services/account.service";
import { ParametersService } from "src/app/admin/data/services/parameters.service";
import { AllCostCentersComponent } from "src/app/admin/modules/supplier/pages/cost-centers-management/all-cost-centers/all-cost-centers.component";
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { CostCenterService } from "src/app/user/data/services/cost-center.service";
import { CreditNoteService } from "src/app/user/data/services/credit-note.service";
import { InvoiceService } from "src/app/user/data/services/customer/invoice.service";
import { ExpenseService } from "src/app/user/data/services/expense.service";

export interface ReasonCode {
  code?: any;
  reason?: any;
}

@Component({
  selector: "app-issue-credit-note",
  templateUrl: "./issue-credit-note.component.html",
  styleUrls: ["./issue-credit-note.component.sass"],
})
export class IssueCreditNoteComponent extends BaseComponent implements OnInit {
  creditNoteForm: FormGroup;

  expensesList: any;
  subscription!: Subscription;
  otherReasonSelected: boolean = false;
  invoice: any;
  invoiceno: any;
  basicInformation: any;
  summaryDetails: any[] = [];
  sellerDetails: any;
  userId: any;
  username: any;

  reasonCodes: ReasonCode[] = [
    { code: 101, reason: "Expiry or damage" },
    { code: 102, reason: "Cancellation of purchase" },
    { code: 103, reason: "Wrong invoice amount stated" },
    { code: 104, reason: "Partial or complete waive off of product" },
    { code: 105, reason: "Others" },
  ];

  currentUser: any;

  selectedExpense: any;
  selectedExpenseId: any;
  fetchedExpense: any;
  constructor(
    public dialogRef: MatDialogRef<AllCostCentersComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private invoiceService: InvoiceService,
    private tokenService: TokenStorageService,
    private accountService: AccountService,
    private creditNoteService: CreditNoteService,
    private snackbar: SnackbarService
  ) {
    super();

    console.log("Invoice ", data);

    this.invoice = data.data;

    this.invoiceno = this.invoice.invoiceno;
  }

  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser();

    this.userId = this.currentUser.id;

    this.username = this.currentUser.username;

    console.log("User ID ", this.userId);

    console.log("Current User ", this.currentUser);

    this.fetchBasicInformationByInvoiceId();

    this.fetchSummaryDetailsByInvoiceId();

    this.fetchSellerByInvoiceId();

    console.log("Invoice Number", this.invoiceno);

    this.creditNoteForm = this.createCreditNoteForm();
  }

  createCreditNoteForm(): FormGroup {
    return this.fb.group({
      oriInvoiceId: [""],
      oriInvoiceNo: [""],
      reasonCode: ["", [Validators.required]],
      reason: [""],
      applicationTime: [new Date()],
      invoiceApplyCategoryCode: ["101"],
      currency: [""],
      contactName: [this.currentUser.username],
      contactMobileNum: [""],
      contactEmail: [this.currentUser.email],
      source: ["105"],
      remarks: ["", [Validators.required]],
      sellersReferenceNo: [""],
      postedBy: [this.username],
    });
  }

  reasonCodeSelected(event: any) {
    console.log(event.value);

    if (event.value == 105) {
      this.otherReasonSelected = true;
    }else {
      this.otherReasonSelected = false;
    }
  }

  fetchBasicInformationByInvoiceId() {
    this.invoiceService
      .fetchInvoiceBasicInformationById(this.invoiceno)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          console.log("Basic Information ", res);
          this.basicInformation = res[0];

          if (this.basicInformation) {
            this.creditNoteForm.patchValue({
              oriInvoiceId: this.basicInformation.invoiceId,
              oriInvoiceNo: this.basicInformation.invoiceNo,
              currency: this.basicInformation.currency,
            });
          }

          console.log("Basic Information ", this.basicInformation);
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

          console.log("Summary Details ", this.summaryDetails);
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

          if (this.sellerDetails) {
            this.creditNoteForm.patchValue({
              sellersReferenceNo: this.sellerDetails.referenceNo,
            });
          }

          console.log("Seller Details ", this.sellerDetails);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  issueCreditNote() {
    console.log("Credit Note: ", this.creditNoteForm.value);
    this.creditNoteService.saveCreditNoteDetails(this.creditNoteForm.value).subscribe(
      (res) => {
        this.snackbar.showNotification(
          "snackbar-success",
          "Credit note details saved succcessfully !"
        );
        this.dialogRef.close();
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onCancel() {
    this.dialogRef.close();
  }
}
