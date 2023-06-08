import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { takeUntil } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { StockCategoryService } from 'src/app/user/data/services/customer/stock-category.service';
import { StockCategory } from 'src/app/user/data/types/customer-types/stock-category';
import { AllItemCategoriesComponent } from '../all-item-categories/all-item-categories.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-delete-item-category',
  templateUrl: './delete-item-category.component.html',
  styleUrls: ['./delete-item-category.component.sass']
})
export class DeleteItemCategoryComponent extends BaseComponent implements OnInit {
  categoryId: string;
  category: StockCategory

  constructor(
    public dialogRef: MatDialogRef<AllItemCategoriesComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private stockCategoryService: StockCategoryService,
  ) {
    super();
   }

  ngOnInit(): void {
    this.category = this.data;
    this.categoryId = this.data.id;

    console.log(this.categoryId)
  }

  confirmDelete() {
    this.stockCategoryService
      .deleteStockCategory(this.categoryId)
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
