import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { Customer } from 'src/app/user/data/types/customer-types/customer';
import { AllCustomersComponent } from '../all-customers/all-customers.component';

@Component({
  selector: 'app-view-customer-details',
  templateUrl: './view-customer-details.component.html',
  styleUrls: ['./view-customer-details.component.sass']
})
export class ViewCustomerDetailsComponent extends BaseComponent implements OnInit {
  customer: Customer

  constructor(public dialogRef: MatDialogRef<AllCustomersComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private snackbar: SnackbarService,) {
      super();
     }

  ngOnInit(): void {
    this.customer = this.data.data;

    console.log(this.customer)
  }

}
