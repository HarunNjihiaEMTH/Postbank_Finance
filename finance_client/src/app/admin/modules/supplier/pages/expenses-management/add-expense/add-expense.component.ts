import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { takeUntil } from "rxjs";
import { TokenCookieService } from "src/app/core/service/token-storage-cookies.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { AccountService } from "src/app/user/data/services/account.service";
import { CategoryService } from "src/app/user/data/services/category.service";
import { ExpenseService } from "src/app/user/data/services/expense.service";
import { Category } from "src/app/user/data/types/category";
import { SubCategory } from "src/app/user/data/types/sub-category";



@Component({
  selector: "app-add-expense",
  templateUrl: "./add-expense.component.html",
  styleUrls: ["./add-expense.component.sass"],
})
export class AddExpenseComponent extends BaseComponent implements OnInit {
  expenseForm: FormGroup;
  types: string[] = ["Goods", "Services"];
  accountCodes: any[] = [];
  category: Category;
  categories: Category[] = [];
  categorySlected: boolean = false;
  subcategories: SubCategory[] = [];
  categorySelected: boolean = false;
  user: any;
  username: string;
  isAPointingAccount: boolean = false;

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private router: Router,
    private categoryService: CategoryService,
    private expenseService: ExpenseService,
    private tokenCookieService: TokenCookieService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.user = this.tokenCookieService.getUser();

    this.username = this.user.username;

    this.expenseForm = this.createExpenseForm();

    this.getCategories();
  }

  createExpenseForm(): FormGroup {
    return this.fb.group({
      expense_type: ["", [Validators.required]],
      // expenseAccount: ["", [Validators.required]],
      expenseDescription: ["", [Validators.required]],
      expenseCode: ["", [Validators.required]],
      expenseMajorCategory: ["", [Validators.required]],
      expenseSubCategory: ["", [Validators.required]],
      // isPointing: ["", [Validators.required]],
      status: ["pending"],
      reason: ["string"],
      postedBy: [this.username],
      postedFlag: ["Y"],
      postedTime: [new Date()],
      modifiedBy: ["string"],
      modifiedFlag: ["N"],
      modifiedTime: ["2022-06-23T12:14:51.796+00:00"],
      verifiedBy: ["string"],
      verifiedFlag: ["N"],
      verifiedTime: ["2022-06-23T12:14:51.796+00:00"],
      deletedBy: ["string"],
      deletedFlag: ["N"],
      deletedTime: ["2022-06-23T12:14:51.796+00:00"],

      // accountCurrencyCode: [""]
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

  getCategoryById(categoryId) {
    this.categoryService
      .getCategoryById(categoryId)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.category = res;

          console.log("category By ID", this.category);

          this.subcategories = this.category.subCategories;

          console.log("category By ID", this.subcategories);

          if (this.subcategories) {
            this.categorySlected = true;
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  onSelectCategory(event) {
    this.getCategoryById(event.value);
  }

  addExpense() {
    console.log("Expense form value ", this.expenseForm.value)
    if (this.category.status != "Approved") {
      this.snackbar.showNotification(
        "snackbar-danger",
        "Selected expense category has not been approved !"
      );
    } else {
      this.expenseService
        .addExpense(this.expenseForm.value)
        .pipe(takeUntil(this.subject))
        .subscribe(
          (res) => {
            console.log(res);
            this.snackbar.showNotification(
              "snackbar-success",
              "Expense added successfully !"
            );
            this.router.navigate(["/admin/supplier/expenses-management/all"]);
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }

  onCancel() {
    this.router.navigate(["/admin/supplier/expenses-management/all"]);
  }
}
