import { HttpParams } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { takeUntil } from "rxjs";

import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { CustomerService } from "src/app/user/data/services/customer/customer.service";
import { InvoiceService } from "src/app/user/data/services/customer/invoice.service";
import { Invoice } from "src/app/user/data/types/customer-types/invoice";
import { ApprovedInvoicesComponent } from "../approved-invoices.component";

@Component({
  selector: "app-recieve-payment",
  templateUrl: "./recieve-payment.component.html",
  styleUrls: ["./recieve-payment.component.sass"],
})
export class RecievePaymentComponent extends BaseComponent implements OnInit {
  modesOfPayment: string[] = ["Unpaid", "Partially Paid", "Fully Paid"];
  displayAmountRecievedInput: boolean = false;
  invoice: Invoice;
  customerName: string;
  invoiceno: number;
  buyertin: number;
  payableAmount: any;
  invoiceAmount: any;

  Data: any;

  recievePaymentform: FormGroup;
  statusTypes: string[] = ["Approved", "Pending", "Rejected"];
  rejected: boolean = false;
  currentUser: any;

  constructor(
    public dialogRef: MatDialogRef<ApprovedInvoicesComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private tokenService: TokenStorageService,
    private customerService: CustomerService,
    private invoiceService: InvoiceService
  ) {
    super();

    this.invoiceno = data.data.invoiceno;

    this.buyertin = data.data.customerid;
  }
  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser().username;

    this.Data = this.data.data;

    this.fetchNetAmount();

    // this.recievePaymentform.patchValue({
    //   buyertin: this.payableAmount.buyertin,
    //   invoiceamount: this.payableAmount.invoiceamount,
    //   invoiceno: this.payableAmount.invoiceno
    // });

    this.recievePaymentform = this.createRecievePaymentForm();

    console.log("Data: ", this.Data);
  }

  createRecievePaymentForm(): FormGroup {
    return this.fb.group({
      buyertin: [""],
      invoiceamount: [""],
      invoiceno: [""],
      receivedamount: ["", [Validators.required]],
      receivedby: [this.currentUser],
      receivedstatus: [""],
      receivedtime: [Date.now()],
    });
  }

  fetchNetAmount() {
    this.invoiceService
      .fetchNetAmount(this.invoiceno, this.buyertin)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (result) => {
          this.payableAmount = result[0];

          if (this.payableAmount) {
            this.recievePaymentform.patchValue({
              buyertin: this.payableAmount.buyertin,
              invoiceamount: this.payableAmount.invoiceamount,
              invoiceno: this.payableAmount.invoiceno
            });
          }
          console.log(this.payableAmount);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  recievePayment() {
    console.log("Recieve Payment ", this.recievePaymentform.value);

    if(this.recievePaymentform.controls.receivedamount.value <= 0 || this.recievePaymentform.controls.receivedamount.value > parseFloat(this.payableAmount.invoiceamount)){
      this.snackbar.showNotification("snackbar-danger", "Please provide a valid payment amount !");
    }else {

      if(this.recievePaymentform.controls.receivedamount.value == parseFloat(this.payableAmount.invoiceamount)){
        this.recievePaymentform.controls.receivedstatus.setValue("Fully Paid")
      }else if(this.recievePaymentform.controls.receivedamount.value < parseFloat(this.payableAmount.invoiceamount)){
        this.recievePaymentform.controls.receivedstatus.setValue("Partially Paid")
      }

      console.log("Recieve Payment ", this.recievePaymentform.value);

      this.invoiceService.recievePayment(this.recievePaymentform.value).subscribe(
        (res) => {
          this.dialogRef.close();
          this.snackbar.showNotification(
            "snackbar-success",
            "Payment recieved successfuly! !"
          );
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
