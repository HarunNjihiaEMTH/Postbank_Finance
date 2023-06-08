import { HttpParams } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { CreditNoteCancellationsService } from "src/app/user/data/services/credit-note-cancellations.service";
import { CreditNoteService } from "src/app/user/data/services/credit-note.service";
import { PendingCreditNoteCancellationsComponent } from "../../pending-credit-note-cancellations/pending-credit-note-cancellations.component";

@Component({
  selector: "app-verify-credit-note-cancellation",
  templateUrl: "./verify-credit-note-cancellation.component.html",
  styleUrls: ["./verify-credit-note-cancellation.component.sass"],
})
export class VerifyCreditNoteCancellationComponent
  extends BaseComponent
  implements OnInit
{
  Data: any;

  statusForm: FormGroup;
  statusTypes: string[] = ["Approved", "Rejected"];
  rejected: boolean = false;
  currentUser: any;
  postedBy: any;
  canVerify: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<PendingCreditNoteCancellationsComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private tokenService: TokenStorageService,
    private creditNoteService: CreditNoteService,
    private creditNoteCancellationService: CreditNoteCancellationsService
  ) {
    super();
  }
  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser().username;
    this.Data = this.data.data;

    this.postedBy = this.Data.postedBy;

    if (this.postedBy === this.currentUser) {
      this.snackbar.showNotification(
        "snackbar-danger",
        "You cannot verify an invoice you created !"
      );

      this.canVerify = false;
    } else {
      this.canVerify = true;
    }

    console.log("Data: ", this.Data);
    this.statusForm = this.createStatusForm();
  }

  createStatusForm(): FormGroup {
    return this.fb.group({
      id: [this.Data.id, [Validators.required]],
      status: ["", [Validators.required]],
      reason: [""],
      verifiedBy: [this.currentUser, [Validators.required]],
      verifiedTime: [new Date(), [Validators.required]],
    });
  }

  statusSelected(selectedStatus: any) {
    if (selectedStatus.value == "Rejected") {
      // this.statusForm.patchValue({ reason: "-" });
      this.rejected = true;
    } else if (selectedStatus.value == "Approved") {
      this.rejected = false;
      this.statusForm.patchValue({ reason: null });
    }
  }

  changeStatus() {
    console.log("Form = ", this.statusForm.value);
    const params = new HttpParams()
      .set("id", this.statusForm.value.id)
      .set("status", this.statusForm.value.status)
      .set("verifiedBy", this.statusForm.value.verifiedBy)
      .set("reason", this.statusForm.value.reason);

    this.creditNoteCancellationService
      .verifyCreditNoteCancellation(params)
      .subscribe(
        (res) => {
          console.log("Status Form", this.statusForm.value);
          console.log(res);
          this.snackbar.showNotification(
            "snackbar-success",
            "Status updated succesfully!"
          );

          this.dialogRef.close();
        },
        (err) => {
          console.log(err);
          this.snackbar.showNotification(
            "snackbar-danger",
            "Error verify cancellation, please try again later !"
          );

          this.dialogRef.close();
        }
      );
  }

  onCancel() {
    this.dialogRef.close();
  }
}
