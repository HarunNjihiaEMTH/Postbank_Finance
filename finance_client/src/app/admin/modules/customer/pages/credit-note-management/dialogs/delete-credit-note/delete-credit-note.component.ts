import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';
import { PendingBillsComponent } from 'src/app/admin/modules/bills/pending-bills/pending-bills.component';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { InvoiceService } from 'src/app/user/data/services/customer/invoice.service';


@Component({
  selector: 'app-delete-credit-note',
  templateUrl: './delete-credit-note.component.html',
  styleUrls: ['./delete-credit-note.component.sass']
})
export class DeleteCreditNoteComponent extends BaseComponent implements OnInit {
  creditNote: any;
  creditNoteId: number;

  constructor( public dialogRef: MatDialogRef<PendingBillsComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private invoiceService: InvoiceService) {
      super();
     }

  ngOnInit(): void {
    this.creditNote = this.data.data;

    console.log("creditNote Details ", this.creditNote)

    this.creditNoteId = this.creditNote.id
  }

  confirmDelete() {
    console.log("Credit note", this.creditNoteId)
    
    // this.invoiceService
    //   .deleteInvoice(this.creditNoteId)
    //   .pipe(takeUntil(this.subject))
    //   .subscribe(
    //     (res) => {
    //       this.snackbar.showNotification(
    //         "snackbar-success",
    //         "Credit note deleted successfully !"
    //       );

    //       this.dialogRef.close();
    //     },
    //     (err) => {
    //       console.log(err);
    //       this.snackbar.showNotification("snackbar-danger", "Error deleting credit note, please try again later !")
    //     }
    //   );
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
