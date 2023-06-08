import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { takeUntil } from "rxjs";
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { InvoiceService } from 'src/app/user/data/services/customer/invoice.service';
import { Invoice } from 'src/app/user/data/types/customer-types/invoice';
import { AllInvoicesComponent } from '../all-invoices/all-invoices.component';
import { TokenCookieService } from 'src/app/core/service/token-storage-cookies.service';

@Component({
  selector: 'app-delete-invoice',
  templateUrl: './delete-invoice.component.html',
  styleUrls: ['./delete-invoice.component.sass']
})
export class DeleteInvoiceComponent extends BaseComponent implements OnInit {
  invoice: any;
  invoiceId: number;

  currentUser: any;

  constructor(public dialogRef: MatDialogRef<AllInvoicesComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private invoiceService: InvoiceService,
    private tokenCookieService: TokenCookieService,) {
    super();
  }

  ngOnInit(): void {
    this.currentUser = this.tokenCookieService.getUser().username;
    this.invoice = this.data.data;

    console.log("Invoice Details ", this.invoice)

    this.invoiceId = this.invoice.id
  }

  confirmDelete() {
    this.invoiceService
      .deleteInvoice(this.currentUser, this.invoice.localInvoiceNo)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.snackbar.showNotification(
            "snackbar-success",
            "Invoice deleted successfully !"
          );

          this.dialogRef.close();
        },
        (err) => {
          console.log(err);
          this.snackbar.showNotification("snackbar-danger", "Error deleting invoice, please try again later !")
        }
      );
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
