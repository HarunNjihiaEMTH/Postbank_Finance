import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { CategoryService } from 'src/app/user/data/services/category.service';
import { Category } from 'src/app/user/data/types/category';
import { AllSuppliersComponent } from '../../suppliers-management/all-suppliers/all-suppliers.component';
import { AllCategoriesComponent } from '../all-categories/all-categories.component';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.sass']
})
export class DeleteCategoryComponent extends BaseComponent implements OnInit {
  categoryId: string;
  category: Category

  constructor( public dialogRef: MatDialogRef<AllCategoriesComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private snackbar: SnackbarService) {
      super()
     }

  ngOnInit(): void {
    this.category = this.data.data
    this.categoryId = this.data.data.id;

    console.log(this.categoryId)
  }

  confirmDelete() {
    this.categoryService
      .deleteCategory(this.categoryId)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.snackbar.showNotification(
            "snackbar-success",
            "Supplier deleted successfully !"
          );

          this.dialogRef.close();
        },
        (err) => {
          console.log(err);
        }
      );
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
