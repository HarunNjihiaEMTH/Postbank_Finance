import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { AllCostCentersComponent } from "src/app/admin/modules/supplier/pages/cost-centers-management/all-cost-centers/all-cost-centers.component";
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { CreditNoteCancellationsService } from "src/app/user/data/services/credit-note-cancellations.service";
import { ReasonCode } from "../../../credit-note-management/dialogs/issue-credit-note/issue-credit-note.component";

@Component({
  selector: "app-create-credit-note-cancellations",
  templateUrl: "./create-credit-note-cancellations.component.html",
  styleUrls: ["./create-credit-note-cancellations.component.sass"],
})
export class CreateCreditNoteCancellationsComponent
  extends BaseComponent
  implements OnInit
{
  cancelCreditNoteForm: FormGroup;

  expensesList: any;
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
    {
      code: 101,
      reason:
        "Buyer refused to accept the invoice due to incorrect invoice/receipt",
    },
    { code: 102, reason: "Not delivered due to incorrect invoice/receipt" },
    { code: 103, reason: "Other reasons" }
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
    private snackbar: SnackbarService,
    private creditNoteCancellationService: CreditNoteCancellationsService  
  ) {
    super();

    console.log("Credit Note ", data);

    this.creditNote = data.data;

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
    return this.fb.group({
      oriInvoiceId: [this.creditNote.oriInvoiceId],
      invoiceNo: [this.creditNote.oriInvoiceNo],
      reasonCode: ["", [Validators.required]],
      reason: [""],
      invoiceApplyCategoryCode: ["104"],
      postedBy: [this.username],
    });
  }

  reasonCodeSelected(event: any) {
    console.log(event.value);

    if (event.value == 103) {
      this.otherReasonSelected = true;
    }else{
      this.otherReasonSelected = false;
    }
  }

 
  issueCreditNote() {
    console.log("Credit Note: ", this.cancelCreditNoteForm.value);
    this.creditNoteCancellationService
      .createCreditNoteCancellation(this.cancelCreditNoteForm.value)
      .subscribe(
        (res) => {
          this.snackbar.showNotification(
            "snackbar-success",
            "Credit note details cancelled succcessfully !"
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
