import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { InvoiceService } from 'src/app/user/data/services/customer/invoice.service';
import { PendingCreditNotesComponent } from '../../../credit-note-management/pending-credit-notes/pending-credit-notes.component';
import { PendingCreditNoteCancellationsComponent } from '../../pending-credit-note-cancellations/pending-credit-note-cancellations.component';

@Component({
  selector: 'app-delete-credit-note-cancellation',
  templateUrl: './delete-credit-note-cancellation.component.html',
  styleUrls: ['./delete-credit-note-cancellation.component.sass']
})
export class DeleteCreditNoteCancellationComponent extends BaseComponent implements OnInit {
  creditNote: any;
  creditNoteId: number;

  constructor( public dialogRef: MatDialogRef<PendingCreditNoteCancellationsComponent>,
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
