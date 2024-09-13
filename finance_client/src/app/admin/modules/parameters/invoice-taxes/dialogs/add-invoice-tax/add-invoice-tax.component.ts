import { Component, Inject, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { InvoiceTaxesService } from "src/app/admin/data/services/invoice-taxes.service";
import { ParametersService } from "src/app/admin/data/services/parameters.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { TaxComponent } from "../../../tax/tax.component";

@Component({
  selector: "app-add-invoice-tax",
  templateUrl: "./add-invoice-tax.component.html",
  styleUrls: ["./add-invoice-tax.component.sass"],
})
export class AddInvoiceTaxComponent extends BaseComponent implements OnInit {
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
  }
  formControl = new FormControl("", [Validators.required]);

  ngOnInit(): void {
   
    this.Form = this.createForm();
    this.dialogTitle = "Add Invoice Tax";
  }



  
  submit() {
    console.log("Form contents = ", this.Form.value);
    this.invoiceTaxesService
      .addTax(this.Form.value)
      .pipe()
      .subscribe(
        (res) => {
          console.log("Response = ", res);

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
      code: ["", Validators.required],
      name: ["", Validators.required],
      rate: ["0"],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {}
}
