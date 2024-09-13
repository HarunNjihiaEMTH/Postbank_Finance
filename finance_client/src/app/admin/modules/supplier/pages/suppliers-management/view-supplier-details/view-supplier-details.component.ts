import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SupplierService } from 'src/app/user/data/services/supplier.service';
import { Supplier } from 'src/app/user/data/types/supplier';
import { AllSuppliersComponent } from '../all-suppliers/all-suppliers.component';

@Component({
  selector: 'app-view-supplier-details',
  templateUrl: './view-supplier-details.component.html',
  styleUrls: ['./view-supplier-details.component.sass']
})
export class ViewSupplierDetailsComponent implements OnInit {
  supplier: Supplier;

  constructor(public dialogRef: MatDialogRef<AllSuppliersComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private supplierService: SupplierService) { }

  ngOnInit(): void {
    this.supplier = this.data.data;

    console.log(this.supplier)
  }

}
