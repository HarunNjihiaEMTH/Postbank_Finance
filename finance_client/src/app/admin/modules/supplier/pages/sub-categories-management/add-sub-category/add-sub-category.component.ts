import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { takeUntil } from "rxjs";
import { TokenCookieService } from "src/app/core/service/token-storage-cookies.service";

import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { CategoryService } from "src/app/user/data/services/category.service";
import { SubCategoryService } from "src/app/user/data/services/sub-category.service";
import { Category } from "src/app/user/data/types/category";
import { AllSubCategoriesComponent } from "../all-sub-categories/all-sub-categories.component";

@Component({
  selector: "app-add-sub-category",
  templateUrl: "./add-sub-category.component.html",
  styleUrls: ["./add-sub-category.component.sass"],
})
export class AddSubCategoryComponent extends BaseComponent implements OnInit {
  subcategoryForm: FormGroup;
  user: any;
  username: string;
  categories: Category[] = [];
  category: Category;

  constructor(
    public dialogRef: MatDialogRef<AllSubCategoriesComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackbar: SnackbarService,
    private categoryService: CategoryService,
    private subCategoryService: SubCategoryService,
    private tokenCookieService: TokenCookieService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.user = this.tokenCookieService.getUser();

    this.username = this.user.username;
    this.subcategoryForm = this.createSubacategoryForm();
    this.getCategories();
  }

  createSubacategoryForm(): FormGroup {
    return this.fb.group({
      subcategoryDescription: ["", [Validators.required]],
      subcategoryName: ["", [Validators.required]],
      category_id: ["", [Validators.required]],
      //glSubHead: ["", [Validators.required]],
      status: "Pending",
      postedBy: this.username,
      postedTime: new Date(),
    });
  }

  getCategories() {
    this.categoryService
      .getAllCategories()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (result) => {
          this.categories = result;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  onSelectCategory(event) {
    this.getCategoryById(event.value);
  }

  getCategoryById(categoryId) {
    this.categoryService
      .getCategoryById(categoryId)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.category = res;

          console.log(this.category);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  addSubcategory() {
    if (this.category.status != "Approved") {
      this.snackbar.showNotification(
        "snackbar-danger",
        "Selected expense category has not been approved !"
      );
    } else {
      this.subCategoryService
        .addSubCategory(this.subcategoryForm.value)
        .pipe(takeUntil(this.subject))
        .subscribe(
          (res) => {
            console.log(res);

            this.snackbar.showNotification(
              "snackbar-success",
              "Sub category added successfully !"
            );

            this.dialogRef.close({ event: "close", data: "" });
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
