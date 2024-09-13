import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { takeUntil } from "rxjs";
import { TokenCookieService } from "src/app/core/service/token-storage-cookies.service";

import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { StockCategoryService } from "src/app/user/data/services/customer/stock-category.service";
import { StockCategory } from "src/app/user/data/types/customer-types/stock-category";
import { AllItemCategoriesComponent } from "../all-item-categories/all-item-categories.component";

@Component({
  selector: "app-update-item-category",
  templateUrl: "./update-item-category.component.html",
  styleUrls: ["./update-item-category.component.sass"],
})
export class UpdateItemCategoryComponent
  extends BaseComponent
  implements OnInit
{
  category: StockCategory;
  updateCategoryForm: FormGroup;
  currentUser: any;
  username: string;

  constructor(
    public dialogRef: MatDialogRef<AllItemCategoriesComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private stockCategoryService: StockCategoryService,
    private tokenCookieService: TokenCookieService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.category = this.data;

    this.currentUser = this.tokenCookieService.getUser();

    this.username = this.currentUser.username

    console.log(this.data);

    this.updateCategoryForm = this.createUpdateCategoryForm();
  }

  createUpdateCategoryForm() {
    return this.fb.group({
      id: [this.category.id],
      categoryName: [this.category.categoryName, [Validators.required]],
      categoryDescription: [
        this.category.categoryDescription,
        [Validators.required],
      ],
      status: [this.category.status],
      postedTime: [this.category.postedTime],
      postedBy: [this.category.postedBy]
    });
  }

  updateCategory() {
    this.stockCategoryService
      .updateCategory(this.updateCategoryForm.value)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.snackbar.showNotification(
            "snackbar-success",
            "Category updated successfully !"
          );

          this.dialogRef.close();
        },
        (err) => {
          console.log(err);
        }
      );
  }

  onCancel() {
    this.dialogRef.close();
  }
}
