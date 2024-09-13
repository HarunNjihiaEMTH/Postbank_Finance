import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from "@angular/material/dialog";
import { takeUntil } from "rxjs";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { SubCategoryService } from "src/app/user/data/services/sub-category.service";
import { SubCategory } from "src/app/user/data/types/sub-category";
import { AllSubCategoriesComponent } from "../all-sub-categories/all-sub-categories.component";

@Component({
  selector: "app-delete-sub-category",
  templateUrl: "./delete-sub-category.component.html",
  styleUrls: ["./delete-sub-category.component.sass"],
})
export class DeleteSubCategoryComponent
  extends BaseComponent
  implements OnInit
{
  subcategory: SubCategory;

  constructor(
    public dialogRef: MatDialogRef<AllSubCategoriesComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private subcategoryService: SubCategoryService,
    private snackbar: SnackbarService
  ) {
    super();
  }

  ngOnInit(): void {
    this.subcategory = this.data.data;

    console.log(this.subcategory);
  }

  confirmDelete() {
    this.subcategoryService
      .deleteSubCategory(this.subcategory.id)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.snackbar.showNotification(
            "snackbar-success",
            "Subcategory deleted successfully !"
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
