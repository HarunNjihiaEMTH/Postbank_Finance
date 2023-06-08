import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { InvoiceTaxesService } from 'src/app/admin/data/services/invoice-taxes.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { TaxComponent } from '../../../tax/tax.component';

@Component({
  selector: 'app-update-invoice-tax',
  templateUrl: './update-invoice-tax.component.html',
  styleUrls: ['./update-invoice-tax.component.sass']
})
export class UpdateInvoiceTaxComponent extends BaseComponent implements OnInit {
  isSuccessful = false;
  isUploadFailed = false;
  errorMessage = "";

  action: string;
  dialogTitle: string;

  Data?: any;
  message?: any;
  Form!: FormGroup;

  subscription!: Subscription;
  accounts: any;

  selectFeedback: " ";

  constructor(
    private fb: FormBuilder,
    private invoiceTaxesService: InvoiceTaxesService,
    private snackbar: SnackbarService,
    public dialogRef: MatDialogRef<TaxComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    super();
    this.Data = data.test;

    console.log("Data ", this.Data)
  }
  formControl = new FormControl("", [Validators.required]);

  ngOnInit(): void {
   
    this.Form = this.createForm();
    this.dialogTitle = "Update Invoice Tax";
  }
  
  submit() {
    this.invoiceTaxesService
      .updateTaxInfo(this.Form.value)
      .pipe()
      .subscribe(
        (res) => {
          this.dialogRef.close();
          this.snackbar.showNotification(
            "snackbar-success",
            "Invoce tax added successfully!"
          );

          this.dialogRef.close();
        },
        (err) => {
          console.log("Error ", err);
          this.snackbar.showNotification(
            "snackbar-danger",
            "Tax parameter upload failure!"
          );

          this.dialogRef.close();
        }
      );
  }

  createForm(): FormGroup {
    return this.fb.group({
      id: [this.Data.id],
      code: [this.Data.code, Validators.required],
      name: [this.Data.name, Validators.required],
      rate: [this.Data.rate],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {}
}
