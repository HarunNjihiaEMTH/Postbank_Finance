import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { takeUntil } from "rxjs";
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { CategoryService } from "src/app/user/data/services/category.service";
import { Category } from "src/app/user/data/types/category";

@Component({
  selector: "app-edit-payment-breakdown",
  templateUrl: "./edit-payment-breakdown.component.html",
  styleUrls: ["./edit-payment-breakdown.component.sass"],
})
export class EditPaymentBreakdownComponent implements OnInit {
  Data: any;
  user: any;
  username: string;
  updateForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditPaymentBreakdownComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private categoryService: CategoryService,
    private tokenStorageService: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser();

    this.username = this.user.username;

    this.Data = this.data.data;

    console.log(this.data);

    this.updateForm = this.createUpdatePaymentBreakdown();
  }


  // accountName: [""],
  //     accountNo: [""],
  //     amount: [""],
  //     narration: [""],
  //     parttranstype: [""],
  //     accountCurrencyCode: ["UGX"],
  createUpdatePaymentBreakdown() {
    return this.fb.group({
      costCenterDetails: [this.Data.costCenterDetails],
      costCenter: [this.Data.costCenter],
      accountName: [this.Data.accountName],
      accountNo: [this.Data.accountNo],
      amount: [this.Data.amount],
      narration: [this.Data.narration, Validators.required],
      parttranstype: [this.Data.parttranstype],
      accountCurrencyCode: [this.Data.accountCurrencyCode],
    });
  }

  updatePaymentBreakdown() {
    this.dialogRef.close({ event: "close", data: this.updateForm.value });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
