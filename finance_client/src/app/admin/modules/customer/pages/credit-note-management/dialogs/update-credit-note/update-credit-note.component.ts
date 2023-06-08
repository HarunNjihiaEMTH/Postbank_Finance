import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from "@angular/material/dialog";
import { Subscription, takeUntil } from "rxjs";
import { AllCostCentersComponent } from "src/app/admin/modules/supplier/pages/cost-centers-management/all-cost-centers/all-cost-centers.component";
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { AccountService } from "src/app/user/data/services/account.service";
import { CreditNoteService } from "src/app/user/data/services/credit-note.service";
import { InvoiceService } from "src/app/user/data/services/customer/invoice.service";
import { ReasonCode } from "../issue-credit-note/issue-credit-note.component";

@Component({
  selector: "app-update-credit-note",
  templateUrl: "./update-credit-note.component.html",
  styleUrls: ["./update-credit-note.component.sass"],
})
export class UpdateCreditNoteComponent extends BaseComponent implements OnInit {
  creditNoteForm: FormGroup;

  subscription!: Subscription;
  otherReasonSelected: boolean = false;
  creditNote: any;
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
    private tokenService: TokenStorageService,
    private creditNoteService: CreditNoteService,
    private snackbar: SnackbarService
  ) {
    super();

    console.log("Invoice ", data);

    this.creditNote = data.data;
  }

  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser();

    this.userId = this.currentUser.id;

    this.username = this.currentUser.username;

    this.creditNoteForm = this.createCreditNoteForm();

    if (this.creditNote) {

      if(this.creditNote.reasonCode == '105'){
        this.otherReasonSelected = true;
      }

      this.creditNoteForm.patchValue({
        id: this.creditNote.id,
        oriInvoiceId: this.creditNote.oriInvoiceId,
        oriInvoiceNo: this.creditNote.oriInvoiceNo,
        reasonCode: this.creditNote.reasonCode,
        reason: this.creditNote.reason,
        applicationTime: this.creditNote.applicationTime,
        invoiceApplyCategoryCode: this.creditNote.invoiceApplyCategoryCode,
        currency:this.creditNote.currency,
        contactName: this.creditNote.contactName,
        contactMobileNum: this.creditNote.contactMobileNum,
        contactEmail: this.creditNote.contactEmail,
        source: this.creditNote.source,
        remarks: this.creditNote.remarks,
        sellersReferenceNo: this.creditNote.sellersReferenceNo,
        postedBy: this.creditNote.postedBy,
      });
    }
  }

  createCreditNoteForm(): FormGroup {
    return this.fb.group({
      id: [""],
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
    }
  }

  updateCreditNote() {
    console.log("Credit Note: ", this.creditNoteForm.value);
    this.creditNoteService
      .updateCreditNote(this.creditNoteForm.value)
      .subscribe(
        (res) => {
          this.snackbar.showNotification(
            "snackbar-success",
            "Credit note details updated succcessfully !"
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
