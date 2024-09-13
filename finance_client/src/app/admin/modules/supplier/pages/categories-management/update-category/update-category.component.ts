import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { takeUntil } from "rxjs";
import { TokenCookieService } from "src/app/core/service/token-storage-cookies.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { CategoryService } from "src/app/user/data/services/category.service";
import { Category } from "src/app/user/data/types/category";
import { AllCategoriesComponent } from "../all-categories/all-categories.component";

@Component({
  selector: "app-update-category",
  templateUrl: "./update-category.component.html",
  styleUrls: ["./update-category.component.sass"],
})
export class UpdateCategoryComponent extends BaseComponent implements OnInit {
  category: any;
  updateCategoryForm: FormGroup;

  user: any;
  username: string;

  constructor(
    public dialogRef: MatDialogRef<AllCategoriesComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private categoryService: CategoryService,
    private tokenCookieService: TokenCookieService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.user = this.tokenCookieService.getUser();

    this.username = this.user.username;

    this.category = this.data.data;

    console.log(this.data);

    this.updateCategoryForm = this.createUpdateCategoryForm();
  }

  createUpdateCategoryForm() {
    return this.fb.group({
      // id: [this.category.id],
      // categoryName: [this.category.categoryName, [Validators.required]],
      // categoryDescription: [
      //   this.category.categoryDescription,
      //   [Validators.required],
      // ],

      //glCode: [this.category.glCode, [Validators.required]],
      id: [this.category.id],
      categoryName: [this.category.categoryName, [Validators.required]],
      categoryDescription: [
        this.category.categoryDescription,
        [Validators.required],
      ],
      status: "Pending",
      postedBy: this.category.postedBy,
      postedTime: this.category.postedTime,
      modifiedBy: this.username,
      modifiedFlag: "Y",
      modifiedTime: new Date(),
    });
  }

  updateCategory() {
    this.categoryService
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
