import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { takeUntil } from "rxjs";
import { TokenCookieService } from "src/app/core/service/token-storage-cookies.service";

import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { CategoryService } from "src/app/user/data/services/category.service";
import { AllCategoriesComponent } from "../all-categories/all-categories.component";

@Component({
  selector: "app-create-category",
  templateUrl: "./create-category.component.html",
  styleUrls: ["./create-category.component.sass"],
})
export class CreateCategoryComponent extends BaseComponent implements OnInit {
  categoryForm: FormGroup;
  types: string[] = ["Service", "Product"];
  currentUser: any;

  constructor(
    public dialogRef: MatDialogRef<AllCategoriesComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private categoryService: CategoryService,
    private tokenCookieService: TokenCookieService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.currentUser = this.tokenCookieService.getUser().username;
    console.log("Current user: ",this.currentUser);
    this.categoryForm = this.createCategoryForm();
  }

  createCategoryForm(): FormGroup {
    return this.fb.group({
      categoryName: ["", [Validators.required]],
      categoryDescription: ["", [Validators.required]],
     // glCode: ["", [Validators.required]],
      postedBy: [""],
      postedTime: [""],
    });
  }

  addCategory() {
    this.categoryForm.patchValue({
      postedBy: this.currentUser,
      postedTime: new Date(),
    });
    console.log(this.categoryForm.value);
    this.categoryService
      .addCategory(this.categoryForm.value)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.dialogRef.close();
          this.snackbar.showNotification(
            "snackbar-success",
            "Category added succesfully !"
          );
          
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
