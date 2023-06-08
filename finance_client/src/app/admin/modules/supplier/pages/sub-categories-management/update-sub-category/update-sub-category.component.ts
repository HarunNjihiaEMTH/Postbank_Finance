import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from "@angular/material/dialog";
import { takeUntil } from "rxjs";
import { TokenCookieService } from "src/app/core/service/token-storage-cookies.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { CategoryService } from "src/app/user/data/services/category.service";
import { SubCategoryService } from "src/app/user/data/services/sub-category.service";
import { SubCategory } from "src/app/user/data/types/sub-category";
import { AllSubCategoriesComponent } from "../all-sub-categories/all-sub-categories.component";

@Component({
  selector: "app-update-sub-category",
  templateUrl: "./update-sub-category.component.html",
  styleUrls: ["./update-sub-category.component.sass"],
})
export class UpdateSubCategoryComponent
  extends BaseComponent
  implements OnInit
{
  updateSubCategoryForm: FormGroup;
  subcategory: any;
  categories: any;
  currentUser: any;

  user: any;
  username: string;


  constructor(
    public dialogRef: MatDialogRef<AllSubCategoriesComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private subcategoryService: SubCategoryService,
    private snackbar: SnackbarService,
    private categoryService: CategoryService,
    private tokenCookieService: TokenCookieService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subcategory = this.data.data;

    this.user = this.tokenCookieService.getUser();

    this.username = this.user.username;

    this.getCategories();

    this.subcategory = this.data.data;
    
    this.updateSubCategoryForm = this.updateSubacategoryForm();

    console.log("Subcategory" ,this.subcategory);
    console.log("Data", this.data)
  }

  updateSubacategoryForm(): FormGroup {
    return this.fb.group({
      id: [this.subcategory.id],
      subcategoryDescription: [
        this.subcategory.subcategoryDescription,
        [Validators.required],
      ],
      subcategoryName: [
        this.subcategory.subcategoryName,
        [Validators.required],
      ],
      status: "Pending",
      postedBy: this.subcategory.postedBy,
      postedTime: this.subcategory.postedTime,
      modifiedBy: this.username,
      modifiedFlag: "Y",
      modifiedTime: new Date(),
      //glSubHead: [this.subcategory.glSubHead, [Validators.required]],

     
      category_id: [this.subcategory.category_id, [Validators.required]],
      
     
    });
  }

  // createUpdateSubcategoryForm() {
  //   return this.fb.group({
  //    ,
  //     subcategoryDescription: ,
  //     subcategoryName: [
  //       this.subcategory.subcategoryName,
  //       [Validators.required],
  //     ],
  //   });
  // }

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

  updateSubcategory() {
    this.updateSubCategoryForm.patchValue({
      modifiedBy: this.currentUser,
      modifiedTime: new Date(),
    });
    this.subcategoryService
      .updateSubCategory(this.updateSubCategoryForm.value)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          console.log(res);

          this.snackbar.showNotification(
            "snackbar-success",
            "Sub category added successfully !"
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
