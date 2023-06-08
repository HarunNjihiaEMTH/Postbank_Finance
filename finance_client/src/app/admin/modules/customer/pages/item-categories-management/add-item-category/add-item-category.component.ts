import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { takeUntil } from "rxjs";
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { StockCategoryService } from "src/app/user/data/services/customer/stock-category.service";
import { AllItemCategoriesComponent } from "../all-item-categories/all-item-categories.component";

@Component({
  selector: "app-add-item-category",
  templateUrl: "./add-item-category.component.html",
  styleUrls: ["./add-item-category.component.sass"],
})
export class AddItemCategoryComponent extends BaseComponent implements OnInit {
  categoryForm: FormGroup;
  currentUser: any;
  username: string;

  constructor(
    public dialogRef: MatDialogRef<AllItemCategoriesComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private stockCategoryService: StockCategoryService,
    private tokenStorage: TokenStorageService
  ) {
    super();
  }

  ngOnInit(): void {
    this.categoryForm = this.createCategoryForm();

    this.currentUser = this.tokenStorage.getUser();

    this.username = this.currentUser.username
  }

  createCategoryForm(): FormGroup {
    return this.fb.group({
      categoryName: ["", [Validators.required]],
      categoryDescription: ["", [Validators.required]],
      status: "pending",
      postedTime: new Date(),
      postedBy: this.username
    });
  }

  addCategory() {
    this.stockCategoryService
      .addStockCategory(this.categoryForm.value)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (result) => {
          this.snackbar.showNotification(
            "snackbar-success",
            "Category added successfully !"
          );

          console.log(result);
          
          this.dialogRef.close();
        },
        (err) => {
          console.log(err);
        }
      );
  }

  onCancel(){
    this.dialogRef.close()
  }
}
