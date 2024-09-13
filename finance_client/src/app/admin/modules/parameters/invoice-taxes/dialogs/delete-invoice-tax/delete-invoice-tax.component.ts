import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';
import { InvoiceTaxesService } from 'src/app/admin/data/services/invoice-taxes.service';
import { AllSubCategoriesComponent } from 'src/app/admin/modules/supplier/pages/sub-categories-management/all-sub-categories/all-sub-categories.component';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-delete-invoice-tax',
  templateUrl: './delete-invoice-tax.component.html',
  styleUrls: ['./delete-invoice-tax.component.sass']
})
export class DeleteInvoiceTaxComponent extends BaseComponent implements OnInit {
  invoiceTax: any;

  constructor(
    public dialogRef: MatDialogRef<AllSubCategoriesComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackbar: SnackbarService,
    private invoicesTaxesService: InvoiceTaxesService
  ) {
    super();
  }

  ngOnInit(): void {
    this.invoiceTax = this.data.test;

    console.log("Invoice Tax", this.invoiceTax)
  }

  confirmDelete() {
    this.invoicesTaxesService
      .deleteTaxCategory(this.invoiceTax.id)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.snackbar.showNotification(
            "snackbar-success",
            "Invoice tax deleted successfully !"
          );

          this.dialogRef.close({ event: "close", data: '' });
        },
        (err) => {
          console.log(err);

          this.snackbar.showNotification(
            "snackbar-danger",
            "Unable to delete invoice tax, please try again later !"
          );

          this.dialogRef.close({ event: "close", data: '' });
        }
      );
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
