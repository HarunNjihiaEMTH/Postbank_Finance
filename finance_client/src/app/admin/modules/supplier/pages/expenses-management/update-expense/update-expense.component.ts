import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { takeUntil } from "rxjs";
import { TokenCookieService } from "src/app/core/service/token-storage-cookies.service";

import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { CategoryService } from "src/app/user/data/services/category.service";
import { ExpenseService } from "src/app/user/data/services/expense.service";
import { PurchaseOrderSessionService } from "src/app/user/data/services/purchase-order-session.service";
import { Category } from "src/app/user/data/types/category";
import { Expense } from "src/app/user/data/types/expense";
import { SubCategory } from "src/app/user/data/types/sub-category";
import { BranchCodeLookupComponent } from "../branch-code-lookup/branch-code-lookup.component";

@Component({
  selector: "app-update-expense",
  templateUrl: "./update-expense.component.html",
  styleUrls: ["./update-expense.component.sass"],
})
export class UpdateExpenseComponent extends BaseComponent implements OnInit {
  updateExpenseForm: FormGroup;
  types: string[] = ["Service", "Goods"];
  category: Category;
  categories: Category[] = [];
  subcategories: SubCategory[] = [];
  categorySelected: boolean = false;
  routeState: any;
  purchaseOrderDate: Date;
  expenseDetails: Expense;
  user: any;
  username: string;
  notAPointingAccount: boolean = false;

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private router: Router,
    private categoryService: CategoryService,
    private expenseService: ExpenseService,
    private purchaseOrderSession: PurchaseOrderSessionService,
    private tokenCookieService: TokenCookieService,
  ) {
    super();

    if (this.router.getCurrentNavigation().extras.state) {
      this.routeState = this.router.getCurrentNavigation().extras.state;
      if (this.routeState) {
        console.log("Router State", this.routeState);
        console.log("Parsed", JSON.parse(this.routeState.expenseDetails));
        this.expenseDetails = this.routeState.expenseDetails
          ? JSON.parse(this.routeState.expenseDetails)
          : "";

        purchaseOrderSession.saveExpenseDetails(this.expenseDetails);
      }
    }
  }

  ngOnInit(): void {

    this.user = this.tokenCookieService.getUser();

    this.username = this.user.username;

    this.recoverExpenseDetailsOnReload();

    this.getCategories();

    this.updateExpenseForm = this.createUpdateExpenseForm();

    if (this.expenseDetails) {

      this.getCategoryById(parseInt(this.expenseDetails.expenseMajorCategory));
      console.log(" Expense ", this.expenseDetails.isPointing);

      if (this.expenseDetails.isPointing) {

        console.log("It is a pointing account")

        this.notAPointingAccount = true;

        this.updateExpenseForm.patchValue({
          isPointing: "true"
        })

      } else{

        this.notAPointingAccount = false;

        this.updateExpenseForm.patchValue({
          isPointing: "false"
        })

        console.log("It is not a pointing account")

      } 
    }

  }

  recoverExpenseDetailsOnReload() {
    const recoveredExpenseDetails = JSON.parse(
      this.purchaseOrderSession.getExpenseDetails()
    );

    if (recoveredExpenseDetails) {
      this.expenseDetails = recoveredExpenseDetails;
    }
  }

  createUpdateExpenseForm(): FormGroup {
    return this.fb.group({
      id: [this.expenseDetails.id],
      expense_type: [this.expenseDetails.expense_type],
      // expenseAccount: [this.expenseDetails.expenseAccount],
      expenseDescription: [this.expenseDetails.expenseDescription],
      expenseCode: [this.expenseDetails.expenseCode],
      expenseMajorCategory: [
        parseInt(this.expenseDetails.expenseMajorCategory),
      ],
      expenseSubCategory: [parseInt(this.expenseDetails.expenseSubCategory)],
      // isPointing: [""],
      status: ["Pending"],
      reason: [this.expenseDetails.reason],
      postedBy: [this.expenseDetails.postedBy],
      postedFlag: [this.expenseDetails.postedFlag],
      postedTime: [this.expenseDetails.postedTime],
      modifiedBy: [this.username],
      modifiedFlag: ["Y"],
      modifiedTime: [new Date()],
      verifiedBy: [this.expenseDetails.verifiedBy],
      verifiedFlag: ["N"],
      verifiedTime: [this.expenseDetails.verifiedTime],
      deletedBy: [this.expenseDetails.deletedBy],
      deletedFlag: [this.expenseDetails.deletedFlag],
      deletedTime: [this.expenseDetails.deletedTime],

      // accountCurrencyCode: [this.expenseDetails.accountCurrencyCode]
    });
  }

  branchCodeLookup() {
    const dialogRef = this.dialog.open(BranchCodeLookupComponent, {
      width: "600px",
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.subject))
      .subscribe((result) => {
        console.log(result);
        this.updateExpenseForm.patchValue({
          expenseAccount: result.data.accountnumber,
          accountCurrencyCode: result.data.currencyCode,
        });
      });
  }

  getCategories() {
    this.categoryService
      .getAllCategories()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (result) => {
          this.categories = result;

          console.log(this.categories);
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
            this.categorySelected = true;
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  onSelectCategory(event) {
    console.log(event.value);
    this.getCategoryById(event.value);
  }

  addExpense() {
    console.log(this.updateExpenseForm.value);
    this.expenseService
      .addExpense(this.updateExpenseForm.value)
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

  onCancel() {
    this.router.navigate(["/admin/supplier/expenses-management/all"]);
  }
}
