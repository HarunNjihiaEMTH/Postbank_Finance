import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';
import { PurchaseOrdersService } from 'src/app/admin/data/services/purchaseorder.service';
import { AllPurchaseOrdersComponent } from 'src/app/admin/modules/supplier/pages/purchase-orders-management/all-purchase-orders/all-purchase-orders.component';
import { TokenStorageService } from 'src/app/core/service/token-storage.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { InvoiceService } from 'src/app/user/data/services/customer/invoice.service';

@Component({
  selector: 'app-verify-invoice',
  templateUrl: './verify-invoice.component.html',
  styleUrls: ['./verify-invoice.component.sass']
})
export class VerifyInvoiceComponent extends BaseComponent implements OnInit {
  Data: any;

  statusForm: FormGroup;
  actions: string[] = ["Approve", "Reject"];
  rejected: boolean = false;
  currentUser: any;

  @Output() dialogClosed = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<AllPurchaseOrdersComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private tokenService: TokenStorageService,
    private invoiceService: InvoiceService
  ) {
    super();
  }
  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser().username;
    this.Data = this.data.data;

    console.log("Data: ", this.Data);
    this.statusForm = this.createStatusForm();
  }

  createStatusForm(): FormGroup {
    return this.fb.group({
      action: ["", [Validators.required]],
      invoiceno: this.Data.localInvoiceNo,
      message: [""],
      username: [this.currentUser],
    });
  }

  statusSelected(selectedStatus: any) {
    if (selectedStatus.value == "Reject") {
      this.rejected = true;
    }else if (selectedStatus.value == "Approve") {
      this.rejected = false;
    }else {
      this.rejected = false;
    }
  }

  changeStatus() {
    console.log("Form = ", this.statusForm.value);

    this.invoiceService.verifyInvoice(this.statusForm.value).pipe(takeUntil(this.subject)).subscribe(
      (res) => {
        this.dialogRef.close();
        this.snackbar.showNotification(
          "snackbar-success",
          "Status updated succesfully!"
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onCancel(){
    this.dialogRef.close();
  }

 
}
