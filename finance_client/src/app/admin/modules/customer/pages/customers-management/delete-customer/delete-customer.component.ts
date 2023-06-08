import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { takeUntil } from "rxjs";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { CustomerService } from "src/app/user/data/services/customer/customer.service";
import { Customer } from "src/app/user/data/types/customer-types/customer";
import { AllCustomersComponent } from "../all-customers/all-customers.component";

@Component({
  selector: "app-delete-customer",
  templateUrl: "./delete-customer.component.html",
  styleUrls: ["./delete-customer.component.sass"],
})
export class DeleteCustomerComponent extends BaseComponent implements OnInit {
  customer: Customer;
  customerId: number;

  constructor(
    public dialogRef: MatDialogRef<AllCustomersComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private customerService: CustomerService
  ) {
    super();
  }

  ngOnInit(): void {
    this.customer = this.data.data;
    this.customerId = this.customer.id;
  }

  confirmDelete() {
    this.customerService
      .deleteCustomer(this.customerId)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.snackbar.showNotification(
            "snackbar-success",
            "Customer deleted successfully"
          );

          this.dialogRef.close({ event: "close", data: '' });
        },
        (err) => {
          console.log(err);
        }
      );
  }

  onCancel(){
    this.dialogRef.close()
  }
}
