import { Component, Inject, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Subscription, takeUntil } from "rxjs";
import { ParametersService } from "src/app/admin/data/services/parameters.service";
import { TokenCookieService } from "src/app/core/service/token-storage-cookies.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { BanksLookupComponent } from "src/app/user/commons/components/banks-lookup/banks-lookup.component";
import { BranchCodeLookupComponent } from "src/app/user/commons/components/branch-code-lookup/branch-code-lookup.component";
import { CostCenterService } from "src/app/user/data/services/cost-center.service";
import { ExpenseService } from "src/app/user/data/services/expense.service";
import { AllCostCentersComponent } from "../all-cost-centers/all-cost-centers.component";


@Component({
  selector: "app-add-cost-center",
  templateUrl: "./add-cost-center.component.html",
  styleUrls: ["./add-cost-center.component.sass"],
})
export class AddCostCenterComponent extends BaseComponent implements OnInit {
  costCenterForm: FormGroup;
  dyForm: FormGroup;

  expensesList: any;
  subscription!: Subscription;
  accounts: any;
  replicateAllExpenses: string[] = ["Yes", "No"];
  //replicateAllExpensesToCostCenterSelected: boolean = true;

  currentUser: any;

  selectedExpense: any;
  selectedExpenseId: any;
  fetchedExpense: any;
  isAPointingAccount: boolean = false;



  constructor(
    // public dialogRef: MatDialogRef<AllCostCentersComponent>,
    // @Inject(MAT_DIALOG_DATA) data,
    private fb: FormBuilder,
    private costCenterService: CostCenterService,
    private snackbar: SnackbarService,
    private expenseService: ExpenseService,
    private parameterService: ParametersService,
    public dialog: MatDialog,
    private tokenCookieService: TokenCookieService,
    private router: Router,
  ) {
    super();
  }

  ngOnInit(): void {
    this.currentUser = this.tokenCookieService.getUser().username;
    this.getExpenses();
    this.getTaxAccountNos();

    this.costCenterForm = this.createCostCenterForm();
  }

  createCostCenterForm(): FormGroup {
    return this.fb.group({
      costCenterCode: ["", [Validators.required]],
      costCenterName: ["", [Validators.required]],
      expenses: new FormArray([]),
      costCenterDescription: ["", [Validators.required]],
      postedBy: [this.currentUser],
      postedTime: [new Date()],
    });
  }
  get f() {
    return this.costCenterForm.controls;
  }
  get t() {
    return this.f.expenses as FormArray;
  }

  // replicateAllExpensesToCostCenter(event) {
  //   if (event.value == "Yes") {
  //     this.replicateAllExpensesToCostCenterSelected = true;

  //     this.costCenterForm.get('expenses').reset();

  //     this.expensesList.forEach(expense => {

  //       this.t.push(
  //         (this.dyForm = this.fb.group({
  //           expholder: [""],
  //           expense: [""],
  //           expenseId: [""],
  //           expenseAccount: [""],
  //         }))
  //       );

  //       this.dyForm.patchValue({
  //         expense: expense.expenseDescription,
  //         expenseId: expense.id,
  //         expenseAccount: expense.expenseAccount,
  //       });
  //     })

  //     console.log("Expense Form", this.dyForm)


  //   } else if (event.value == "No") {

  //     this.t.clear()

  //     this.replicateAllExpensesToCostCenterSelected = false;

     
  //   }else {
  //     this.replicateAllExpensesToCostCenterSelected = true
  //   }
  // }

  onAddField() {
    this.t.push(
      (this.dyForm = this.fb.group({
        expholder: [""],
        expense: [""],
        expenseId: [""],
        expenseAccount: [""],
        isPointing: [""],
      }))
    );
  }
  onRemoveField(i: any) {
    if (i > 0) {
      this.t.removeAt(i);
    }
  }

  getSelectedExpense(event: any) {
    console.log("expenseItem: ", event.value);
    this.selectedExpenseId = event.value;

    this.getExpenseById(this.selectedExpenseId);
  }

  getExpenseById(expenseId) {
    this.expenseService
      .getExpenseById(expenseId)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.fetchedExpense = res;
          console.log("this.fetchedExpense: ", this.fetchedExpense);

          this.dyForm.patchValue({
            expense: this.fetchedExpense.expenseDescription,
            expenseId: this.selectedExpenseId,
            expenseAccount: this.fetchedExpense.expenseAccount,
          });
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getExpenses() {
    this.expenseService
      .getExpenses()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.expensesList = res;
          console.log("Exp = ", this.expensesList);
        },
        (err) => {
          console.log(err);
        }
      );
  }
  getTaxAccountNos() {
    this.subscription = this.parameterService.getAccounts().subscribe((res) => {
      this.accounts = res;
      console.log("Accounts =", this.accounts);
    });
  }

  branchCodeLookup() {
    const dialogRef = this.dialog.open(BranchCodeLookupComponent, {
      width: "800px",
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.subject))
      .subscribe((result) => {
        console.log(result);
        this.dyForm.patchValue({
          expenseAccount: result.data.accountnumber,
          accountCurrencyCode: result.data.currencyCode,
        });

        if (
          result.data.schemeType == "OSP" ||
          result.data.schemeType == "OAP" 
        ) {
          this.isAPointingAccount = true;

          this.dyForm.patchValue({
            isPointing: "true",
          });
        } else {
          this.isAPointingAccount = false;

          this.dyForm.patchValue({
            isPointing: "false",
          });
        }
      });
  }


  addCostCenter() {
    console.log("Cost center: ", this.costCenterForm.value);
    this.costCenterService.addCostCenter(this.costCenterForm.value).subscribe(
      (res) => {
        this.snackbar.showNotification(
          "snackbar-success",
          "Cost center added successfully !"
        );

        this.router.navigate(["/admin/supplier/cost-centers-management/all"]);

       
        //this.dialogRef.close();
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onCancel(){
    this.router.navigate(["/admin/supplier/cost-centers-management/all"]);
    //this.dialogRef.close()
  }
}
