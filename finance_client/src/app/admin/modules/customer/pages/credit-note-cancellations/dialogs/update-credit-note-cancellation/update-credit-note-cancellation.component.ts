import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { CreditNoteCancellationsService } from "src/app/user/data/services/credit-note-cancellations.service";
import { ReasonCode } from "../../../credit-note-management/dialogs/issue-credit-note/issue-credit-note.component";
import { PendingCreditNotesComponent } from "../../../credit-note-management/pending-credit-notes/pending-credit-notes.component";

@Component({
  selector: "app-update-credit-note-cancellation",
  templateUrl: "./update-credit-note-cancellation.component.html",
  styleUrls: ["./update-credit-note-cancellation.component.sass"],
})
export class UpdateCreditNoteCancellationComponent
  extends BaseComponent
  implements OnInit
{
  cancelCreditNoteForm: FormGroup;

  expensesList: any;
  subscription!: Subscription;
  otherReasonSelected: boolean = false;
  creditNoteCancellation: any;
  invoiceno: any;
  basicInformation: any;
  summaryDetails: any[] = [];
  sellerDetails: any;
  userId: any;
  username: any;

  reasonCodes: ReasonCode[] = [
    {
      code: 101,
      reason:
        "Buyer refused to accept the invoice due to incorrect invoice/receipt",
    },
    { code: 102, reason: "Not delivered due to incorrect invoice/receipt" },
    { code: 103, reason: "Other reasons" },
  ];

  currentUser: any;

  selectedExpense: any;
  selectedExpenseId: any;
  fetchedExpense: any;
  constructor(
    public dialogRef: MatDialogRef<PendingCreditNotesComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private tokenService: TokenStorageService,
    private snackbar: SnackbarService,
    private creditNoteCancellationService: CreditNoteCancellationsService
  ) {
    super();

    console.log("Credit Note ", data);

    this.creditNoteCancellation = data.data;

    console.log("Credit Cancellation ", this.creditNoteCancellation)
  }

  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser();

    this.userId = this.currentUser.id;

    this.username = this.currentUser.username;

    console.log("User ID ", this.userId);

    console.log("Current User ", this.currentUser);

    console.log("Invoice Number", this.invoiceno);

    this.cancelCreditNoteForm = this.createCancelCreditNoteForm();
  }

  createCancelCreditNoteForm(): FormGroup {

    if(this.creditNoteCancellation.reasonCode == "103"){
      this.otherReasonSelected = true;
    }

    return this.fb.group({
      id: [this.creditNoteCancellation.id],
      oriInvoiceId: [this.creditNoteCancellation.oriInvoiceId],
      invoiceNo: [this.creditNoteCancellation.invoiceNo],
      reasonCode: [this.creditNoteCancellation.reasonCode, [Validators.required]],
      reason: [this.creditNoteCancellation.reason],
      invoiceApplyCategoryCode: [this.creditNoteCancellation.invoiceApplyCategoryCode],
      postedBy: [this.creditNoteCancellation.postedBy],
      postedAt: [this.creditNoteCancellation.postedAt],
      postedStatus: [this.creditNoteCancellation.postedStatus],
      referenceNo: [this.creditNoteCancellation.referenceNo],
      responseCode: [this.creditNoteCancellation.responseCode],
      status: ["Pending"],
      uraStatus: [this.creditNoteCancellation.uraStatus],
      verifiedBy: [this.creditNoteCancellation.verifiedBy],
      verifiedTime: [this.creditNoteCancellation.verifiedTime],
    });
  }

  reasonCodeSelected(event: any) {
    console.log(event.value);

    if (event.value == 103) {
      this.otherReasonSelected = true;
    } else {
      this.otherReasonSelected = false;
    }
  }

  issueCreditNote() {
    console.log("Credit Note: ", this.cancelCreditNoteForm.value);
    this.creditNoteCancellationService
      .updateCreditNoteCancellation(this.cancelCreditNoteForm.value)
      .subscribe(
        (res) => {
          this.snackbar.showNotification(
            "snackbar-success",
            "Credit note cancellation updated succcessfully !"
          );
          this.dialogRef.close();
          console.log(res);
        },
        (err) => {

          this.dialogRef.close();
          console.log(err);
        }
      );
  }

  onCancel() {
    this.dialogRef.close();
  }
}
