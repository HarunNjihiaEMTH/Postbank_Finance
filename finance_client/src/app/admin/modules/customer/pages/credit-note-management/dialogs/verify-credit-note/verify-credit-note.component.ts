import { HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TokenStorageService } from 'src/app/core/service/token-storage.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { CreditNoteService } from 'src/app/user/data/services/credit-note.service';
import { InvoiceService } from 'src/app/user/data/services/customer/invoice.service';
import { PendingCreditNotesComponent } from '../../pending-credit-notes/pending-credit-notes.component';

@Component({
  selector: 'app-verify-credit-note',
  templateUrl: './verify-credit-note.component.html',
  styleUrls: ['./verify-credit-note.component.sass']
})
export class VerifyCreditNoteComponent extends BaseComponent implements OnInit {
  Data: any;

  statusForm: FormGroup;
  statusTypes: string[] = ["Approved", "Rejected"];
  rejected: boolean = false;
  currentUser: any;
  postedBy: any;
  canVerify: boolean = true;


  constructor(
    public dialogRef: MatDialogRef<PendingCreditNotesComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private tokenService: TokenStorageService,
    private creditNoteService: CreditNoteService
  ) {
    super();
  }
  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser().username;
    this.Data = this.data.data;

    this.postedBy = this.Data.postedBy;

    // if(this.postedBy === this.currentUser){

    //   this.snackbar.showNotification("snackbar-danger", "You cannot verify an invoice you created !");

    //   this.canVerify = false;      
    // }else {
    //   this.canVerify = true;
    // }

    console.log("Data: ", this.Data);
    this.statusForm = this.createStatusForm();
  }

  createStatusForm(): FormGroup {
    return this.fb.group({
      id: [this.Data.id, [Validators.required]],
      status: ["", [Validators.required]],
      reason: ["", [Validators.required]],
      verifiedBy: [this.currentUser, [Validators.required]],
      verifiedTime: [new Date(), [Validators.required]],
    });
  }

  statusSelected(selectedStatus: any) {
    if (selectedStatus.value == "Rejected") {
      this.statusForm.patchValue({ reason: null });
      this.rejected = true;
    }
    if (selectedStatus.value == "Pending") {
      this.statusForm.patchValue({ reason: "-" });
    }
    if (selectedStatus.value == "Approved") {
      this.statusForm.patchValue({ reason: "-" });
    }
  }

  changeStatus() {
    console.log("Form = ", this.statusForm.value);
    const params = new HttpParams()
      .set("id", this.statusForm.value.id)
      .set("Status", this.statusForm.value.status)
      .set("verifiedBy", this.statusForm.value.verifiedBy)
      .set("reason", this.statusForm.value.reason)

    this.creditNoteService.verifyCreditNote(params).subscribe(
      (res) => {
        this.dialogRef.close();
        this.snackbar.showNotification(
          "snackbar-success",
          "Status updated succesfully!"
        );
      },
      (err) => {
        console.log(err);
        this.snackbar.showNotification("snackbar-danger", "Error updating invoice, please try again later !")
      }
    );
  }

  onCancel(){
    this.dialogRef.close()
  }
}
