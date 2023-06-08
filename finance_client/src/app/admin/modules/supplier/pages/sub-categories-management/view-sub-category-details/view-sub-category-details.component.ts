import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { SubCategoryService } from 'src/app/user/data/services/sub-category.service';
import { SubCategory } from 'src/app/user/data/types/sub-category';
import { AllSubCategoriesComponent } from '../all-sub-categories/all-sub-categories.component';

@Component({
  selector: 'app-view-sub-category-details',
  templateUrl: './view-sub-category-details.component.html',
  styleUrls: ['./view-sub-category-details.component.sass']
})
export class ViewSubCategoryDetailsComponent extends BaseComponent implements OnInit {
  subcategory: SubCategory;

  constructor( public dialogRef: MatDialogRef<AllSubCategoriesComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private subCategoryService: SubCategoryService,
    private snackbar: SnackbarService) {
      super();
     }

  ngOnInit(): void {
    this.subcategory = this.data.data
  }

}
