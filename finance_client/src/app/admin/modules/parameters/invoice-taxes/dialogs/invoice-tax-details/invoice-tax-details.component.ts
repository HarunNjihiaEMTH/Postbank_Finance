import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { SubCategoryService } from 'src/app/admin/data/services/category-sub.service';
import { AllSubCategoriesComponent } from 'src/app/admin/modules/supplier/pages/sub-categories-management/all-sub-categories/all-sub-categories.component';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-invoice-tax-details',
  templateUrl: './invoice-tax-details.component.html',
  styleUrls: ['./invoice-tax-details.component.sass']
})
export class InvoiceTaxDetailsComponent extends BaseComponent implements OnInit {
  invoiceTax: any;

  constructor( public dialogRef: MatDialogRef<AllSubCategoriesComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private subCategoryService: SubCategoryService,
    private snackbar: SnackbarService) {
      super();
     }

  ngOnInit(): void {
    this.invoiceTax = this.data.test;

    console.log("DATA ", this.data)

    console.log("Sub Category ", this.invoiceTax)
  }
}
