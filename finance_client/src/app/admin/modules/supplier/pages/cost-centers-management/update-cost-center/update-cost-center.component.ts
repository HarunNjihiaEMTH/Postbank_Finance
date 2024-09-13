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
import { CostCenterService } from "src/app/user/data/services/cost-center.service";
import { ExpenseService } from "src/app/user/data/services/expense.service";
import { PurchaseOrderSessionService } from "src/app/user/data/services/purchase-order-session.service";
import { CostCenter } from "src/app/user/data/types/cost-center";
import { AllCostCentersComponent } from "../all-cost-centers/all-cost-centers.component";

export interface expInterface {
  expense?: string;
  expenseAccount?: string;
  expenseId?: number;
  id?: number;
}

@Component({
  selector: "app-update-cost-center",
  templateUrl: "./update-cost-center.component.html",
  styleUrls: ["./update-cost-center.component.sass"],
})
export class UpdateCostCenterComponent extends BaseComponent implements OnInit {
  editCostCenterForm: FormGroup;
  dyForm: FormGroup;

  expensesList: any;
  subscription!: Subscription;
  accounts: any;

  currentUser: any;
  costCenterDet: any;
  selectedExpense: any;
  selectedExpenseId: any;
  fetchedExpense: any;
  routeState: any;

  has_exp = false;

  expenses: expInterface[] = [];

  // constructor(
  //   // public dialogRef: MatDialogRef<AllCostCentersComponent>,
  //   // @Inject(MAT_DIALOG_DATA) data,
  //   private fb: FormBuilder,
  //   private costCenterService: CostCenterService,
  //   private snackbar: SnackbarService,
  //   private expenseService: ExpenseService,
  //   private parameterService: ParametersService,
  //   public dialog: MatDialog,
  //   private tokenCookieService: TokenCookieService,
  //   private router: Router,
  //   private purchaseOrderSession: PurchaseOrderSessionService,
  // ) {
  //   super();
  //   if (this.router.getCurrentNavigation().extras.state) {
  //     this.routeState = this.router.getCurrentNavigation().extras.state;
  //     if (this.routeState) {
  //       console.log("Router State", this.routeState.costCenterDetails);
  //       console.log("Parsed", JSON.parse(this.routeState.costCenterDetails));
  //       this.costCenterDet = this.routeState.costCenterDetails
  //         ? JSON.parse(this.routeState.costCenterDetails)
  //         : "";

  //       purchaseOrderSession.saveExpenseDetails(this.costCenterDet);
  //     }
  //   }
    
  //   //this.costCenterDet = data.data;
  // }
  constructor(
    private fb: FormBuilder,
    private costCenterService: CostCenterService,
    private snackbar: SnackbarService,
    private expenseService: ExpenseService,
    private parameterService: ParametersService,
    public dialog: MatDialog,
    private tokenCookieService: TokenCookieService,
    private router: Router,
    private purchaseOrderSession: PurchaseOrderSessionService,
  ) {
    super();
  
    // Check if the current navigation has state
    const navigationState = this.router.getCurrentNavigation()?.extras?.state;
  
    if (navigationState) {
      // Set the routeState property and parse the cost center details
      this.routeState = navigationState;
      this.costCenterDet = JSON.parse(this.routeState.costCenterDetails);
  
      // Save the expense details in the purchase order session
      purchaseOrderSession.saveExpenseDetails(this.costCenterDet);
    }
  
    // Check if the page is being refreshed
    // if (performance.navigation.type === 1) {
      if (!navigationState) {
      this.router.navigate(["/admin/supplier/cost-centers-management/all"]);
    }
  }
  

  //   {
  //     "id": 2,
  //     "costCenterCode": "2343",
  //     "costCenterName": "Nairobi",
  //     "costCenterDescription": "Nairobi based cost center",
  //     "vatAccount": "324234",
  //     "incomeWithholdingAccount": "342423",

  //     "expenses": [
  //         {
  //             "id": 3,
  //             "expense": "Office furniture",
  //             "expenseId": "1",
  //             "expenseAccount": "13505001EUR"
  //         },
  //         {
  //             "id": 4,
  //             "expense": "Windows",
  //             "expenseId": "2",
  //             "expenseAccount": "13505001KES"
  //         }
  //     ]
  // }

  ngOnInit(): void {
    this.currentUser = this.tokenCookieService.getUser().username;
    this.getExpenses();
    //this.getTaxAccountNos();

    console.log("this.costCenterDet: ", this.costCenterDet);
    console.log("this.costCenterDet.expenses: ", this.costCenterDet.expenses);

    this.editCostCenterForm = this.updateCostCenterForm();
    this.onInitDynamicForm();
  }

  updateCostCenterForm(): FormGroup {
    return this.fb.group({
      id: [this.costCenterDet.id],
      costCenterCode: [
        this.costCenterDet.costCenterCode,
        [Validators.required],
      ],
      costCenterName: [
        this.costCenterDet.costCenterName,
        [Validators.required],
      ],
      expenses: new FormArray([]),

      costCenterDescription: [
        this.costCenterDet.costCenterDescription,
        [Validators.required],
      ],
      postedBy: [this.costCenterDet.postedBy],
      postedTime: [this.costCenterDet.postedTime],
      postedFlag: [this.costCenterDet.postedFlag],
      modifiedBy: [this.currentUser],
      modifiedFlag: "Y",
      modifiedTime: [new Date()],
    });
  }
  get f() {
    return this.editCostCenterForm.controls;
  }
  get t() {
    return this.f.expenses as FormArray;
  }

  onAddField() {
    this.t.push(
      (this.dyForm = this.fb.group({
        expholder: [""],
        expense: [""],
        expenseId: [""],
        expenseAccount: [""],
      }))
    );
  }
  onRemoveField(i: any) {
    this.t.removeAt(i);
  }

  onInitDynamicForm() {
    this.expenses = this.costCenterDet.expenses;
    for (let i = 0; i < this.expenses.length; i++) {
      parseInt(this.costCenterDet.expenses[i].expenseId);

      this.onAddFeedField(this.expenses[i]);
    }
  }

  onAddFeedField(i: any) {
    // console.log("i.expenseId: ", parseInt(i.expenseId));
    let expId = Number(i.expenseId);
    // this.t.push(
    //   this.fb.group({
        
    //   })
    // );

    this.t.push(
      (this.dyForm = this.fb.group({
        expholder: [""],
        id: [i.id],
        expense: [i.expense],
        expenseId: expId,
        expenseAccount: [i.expenseAccount],
      }))
    );
    console.log("dyForm: ", this.dyForm.value);
  }
  getSelectedExpense(event: any) {
    console.log("expenseItem: ", event.value);
    // this.selectedExpense = event.value.expenseDescription;
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
          //console.log("this.fetchedExpense: ", this.fetchedExpense);

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
  // getTaxAccountNos() {
  //   this.subscription = this.parameterService.getAccounts().subscribe((res) => {
  //     this.accounts = res;
  //     console.log("Accounts =", this.accounts);
  //   });
  // }

  updateCostCenter() {
    console.log("Cost center: ", this.editCostCenterForm.value);
    this.costCenterService
      .addCostCenter(this.editCostCenterForm.value)
      .subscribe(
        (res) => {
          this.snackbar.showNotification(
            "snackbar-success",
            "Cost center updated successfully !"
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

  
  onCancel() {
    this.router.navigate(["/admin/supplier/cost-centers-management/all"]);
    //this.dialogRef.close();
  }
}
