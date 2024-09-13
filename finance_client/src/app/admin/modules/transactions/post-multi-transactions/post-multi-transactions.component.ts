import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormArray,
  FormBuilder,
  FormControl,
} from "@angular/forms";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { SupplierService } from "src/app/user/data/services/supplier.service";
import { HttpParams } from "@angular/common/http";
import { MatTableDataSource } from "@angular/material/table";
import { ParametersService } from "src/app/admin/data/services/parameters.service";
import { ActiveBillsService } from "src/app/admin/data/services/activebills.service";
import { ExpenseService } from "src/app/user/data/services/expense.service";
import { takeUntil } from "rxjs";
import { CostCenterService } from "src/app/user/data/services/cost-center.service";
import { CostCenter } from "src/app/user/data/types/cost-center";
import { SelectionModel } from "@angular/cdk/collections";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { SnackbarService } from "src/app/shared/services/snackbar.service";

import { GeneralCostCentersLookupComponent } from "../../bills/pay-bill/dialog/general-cost-centers-lookup/general-cost-centers-lookup.component";
import { ExpensesLookupComponent } from "../../bills/pay-bill/dialog/expenses-lookup/expenses-lookup.component";
import { AccrualSuppliersLookupComponent } from "../post-transaction/dialogs/accrual-suppliers-lookup/accrual-suppliers-lookup.component";
import { BranchCodeLookupComponent } from "../../supplier/pages/expenses-management/branch-code-lookup/branch-code-lookup.component";
import { TokenCookieService } from "src/app/core/service/token-storage-cookies.service";


@Component({
  selector: "app-post-multi-transactions",
  templateUrl: "./post-multi-transactions.component.html",
  styleUrls: ["./post-multi-transactions.component.sass"],
})
export class PostMultiTransactionsComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = "end";
  verticalPosition: MatSnackBarVerticalPosition = "top";

  displayedColumns: string[] = [
    "id",
    "supplierName",
    "accrualAccount",
    "amount",
    "customDebitAccount",
    "costCenterName",
    "expenseName",
    "collectionDate",
    "description",
    "actions",
  ];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };
  selection = new SelectionModel<any>(true, []);
  data: any;
  accrualsArray: any[] = [];

  Form!: FormGroup;

  suppliers: any;
  accrualSuppliers: any;
  selectedSup: any[] = [];
  checklist: any[] = [];
  checkedList: any;

  selectedExp: any[] = [];
  selectedExpDetails: any[] = [];
  initialExpense: any;
  expenseNames: any[] = [];

  expenses: any;
  costCenters: any;
  selectedCenter: any;

  isLoading: boolean = false;

  customAccount: boolean = false;
  expenseAccount: boolean = true;

  editButton: boolean = false;
  addButton: boolean = true;

  index: number;

  debitAccounts: any[] = [{ name: "ExpenseAc" }, { name: "BalancesheetAc" }];
  isTransactionLoading: boolean = false;

  username: any;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private supplierService: SupplierService,
    private parameterService: ParametersService,
    private payBill: ActiveBillsService,
    private expenseService: ExpenseService,
    public costCenterService: CostCenterService,
    private _snackBar: MatSnackBar,
    private snackbar: SnackbarService,
    private router: Router,
    private tokenCookieService: TokenCookieService,
  ) { }

  ngOnInit(): void {
    this.username = this.tokenCookieService.getUser().username;
    this.initForm();
    this.getSuppliers();
    this.getExpenses();
    this.getCostCenters();
    this.getAccrualItems();

    this.Form.patchValue({
      postedBy: this.username
    })
  }

  initForm() {
    this.Form = this.fb.group({
      collectionDate: [new Date(), [Validators.required]],
      amount: ["", [Validators.required]],
      supplierId: [""],
      supplierName: ["", [Validators.required]],
      accrualAccount: ["", [Validators.required]],
      costCenterId: [""],
      costCenterName: [""],
      expenseId: [""],
      expenseName: [""],
      expenseType: new FormControl("Goods", Validators.required),
      description: ["", [Validators.required]],
      debitFrom: ["ExpenseAc", [Validators.required]],
      customDebitAccount: ["-"],
      postedBy: [""]
    });
  }

  addAccrualItem() {
    this.accrualsArray.push(this.Form.value);
    this.getAccrualItems();
    console.log(" this.accrualsArray ", this.accrualsArray);
  }
  onRemoveAccrualItem(i: any) {
    this.accrualsArray.splice(i, 1);
    this.getAccrualItems();
  }
  clearAccrualForm() {
    this.initForm();
  }
  getAccrualItems() {
    if (this.accrualsArray.length == 0) {
      this.isLoading = true;
    } else {
      this.isLoading = false;
    }
    this.dataSource = new MatTableDataSource<any>(this.accrualsArray);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onSubmit() {
    console.log("this.accrualsArray: ", this.accrualsArray);
    this.payBill
      .postMultiAccruals(this.accrualsArray)
      .pipe()
      .subscribe(
        (res) => {
          console.log("Response = ", res);

          let message = "TRANSACTION RESPONSE";
          this._snackBar.open(
            message +
            "\n STATUS: " +
            res.status +
            "\n TRANSACTION CODE| " +
            res.transactionCode +
            "\n TRANSACTION DATE| " +
            res.transactionDate,
            "X",
            {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 2000000,
              panelClass: ["snackbar-success", "snackbar-success"],
            }
          );
          this.isTransactionLoading = false;
          this.router.navigateByUrl(
            "/admin/transactions/pending-transactions"
          );
        },
        (err) => {
          this.isTransactionLoading = false;
          console.log("Error= ", err);
          this.snackbar.showNotification("snackbar-danger", err);
        }
      );
  }

  getSelectedDebitAccType(event: any) {
    if (event.value == "ExpenseAc") {
      this.customAccount = false;
      this.expenseAccount = true;

      this.Form.patchValue({
        customDebitAccount: "-",
      });
    } else if (event.value == "BalancesheetAc") {
      this.customAccount = true;
      this.expenseAccount = false;

      this.Form.patchValue({
        costCenterId: "-",
        costCenterName: "-",
        expenseId: "-",
        expenseName: "-",
      });
    }
  }

  getSelectedDebitAccTypeForEdit(event: any) {
    if (event == "ExpenseAc") {
      this.customAccount = false;
      this.expenseAccount = true;

      this.Form.patchValue({
        customDebitAccount: "-",
      });
    } else if (event == "BalancesheetAc") {
      this.customAccount = true;
      this.expenseAccount = false;

      this.Form.patchValue({
        costCenterId: "-",
        costCenterName: "-",
        expenseId: "-",
        expenseName: "-",
      });
    }
  }


  getSuppliers() {
    this.payBill.getAccrualSuppliers().subscribe(
      (res) => {
        this.suppliers = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  suppliersLookup() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "600px";
    dialogConfig.data = {
      action: "view suppliers",
      data: this.suppliers,
      selected: this.selectedSup,
    };

    const dialogRef = this.dialog.open(
      AccrualSuppliersLookupComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result.data.length != 0) {

        this.selectedSup.push(result.data[0].id);
        this.Form.patchValue({

          supplierId: result.data[0].referenceID,

          supplierName: result.data[0].supplierName,

          accrualAccount: result.data[0].accrualAccount,

        });
      }
    });
  }
  branchCodeLookup() {
    const dialogRef = this.dialog.open(BranchCodeLookupComponent, {
      width: "600px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.data.length != 0) {
        console.log(result);
        this.Form.patchValue({
          accrualAccount: result.data.accountnumber,
        });
      }
    });
  }
  customAccountLookup() {
    const dialogRef = this.dialog.open(BranchCodeLookupComponent, {
      width: "600px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.data.length != 0) {
        console.log(result);
        this.Form.patchValue({
          customDebitAccount: result.data.accountnumber,
        });
      }
    });
  }

  getExpenseType(event: any) {
    this.getExpenses();
  }

  getExpenses() {
    if (this.Form.value.expenseType == "Goods") {
      const params = new HttpParams().set("expense_type", "goods");
      this.payBill.getExpensesByType(params).subscribe(
        (res) => {
          this.expenses = res;
        },
        (err) => {
          console.log(err);
        }
      );
    } else if (this.Form.value.expenseType == "Services") {
      const params = new HttpParams().set("expense_type", "service");
      this.payBill.getExpensesByType(params).subscribe(
        (res) => {
          this.expenses = res;
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
  getSelectedExpense(event: any) {
    event.forEach((element) => {
      this.selectedExp.push(element.id);
      this.getExpenseById(element.id);
    });
    this.getBillById(this.selectedExp.toString());
  }
  getExpenseById(expId) {
    this.expenseService.getExpenseById(expId).subscribe((response: any) => {
      this.initialExpense = response;

      this.expenseNames.push(this.initialExpense.expenseDescription);

      this.selectedExpDetails.push({
        expenseId: this.initialExpense.id,
        expenseName: this.initialExpense.expenseDescription,
      });

      console.log("this.selectedExpDetails ", this.selectedExpDetails);
      this.Form.patchValue({
        expenseId: this.selectedExpDetails[0].expenseId,
        expenseName: this.selectedExpDetails[0].expenseName,
      });
    });
  }
  getBillById(expIds) {
    this.parameterService.getBillByExpenseId(expIds).subscribe(
      (response: any) => {
        //this.detail = response;

        this.checklist = [];
        this.checklist = response;
        // this.centersList = response;
        console.log("BillInfo = ", this.checklist[0]);

      },
      (err) => {
        console.log(err);
      }
    );
  }

  expensesLookup() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "800px";
    dialogConfig.data = {
      action: "expenses for multi-accrual",
      data: this.expenses,
      selected: this.selectedExp,
    };

    const dialogRef = this.dialog.open(ExpensesLookupComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.data.length != 0) {
        console.log("result: ", result.data);
        this.getSelectedExpense(result.data);
      }
    });
  }

  getCostCenters() {
    this.costCenterService.getCostCenters().subscribe(
      (res) => {
        console.log("costCenters ", res);
        this.costCenters = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  costCentersLookup() {
    console.log("this.checklist: ", this.checklist);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "800px";
    dialogConfig.data = {
      action: "cost centers for multi-accrual",
      data: this.checklist,
    };

    const dialogRef = this.dialog.open(
      GeneralCostCentersLookupComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((result) => {
      console.log("result: ", result.data);
      if (result && result.data.length != 0) {
        this.selectedCenter = result.data;

        this.Form.patchValue({
          costCenterId: this.selectedCenter[0].costCenterid,
          costCenterName: this.selectedCenter[0].costCentername,
        });
      }
    });
  }

  onEditAccrualDetails(data) {
    this.index = this.accrualsArray.indexOf(data);
    this.editButton = true;
    this.addButton = false;
    console.log("Index: ", this.index)
    this.Form.patchValue({
      collectionDate: data.collectionDate,
      supplierId: data.supplierId,
      supplierName: data.supplierName,
      accrualAccount: data.accrualAccount,
      costCenterId: data.costCenterId,
      costCenterName: data.costCenterName,
      expenseId: data.expenseId,
      expenseName: data.expenseName,
      expenseType: data.expenseType,
      description: data.description,
      debitFrom: data.debitFrom,
      customDebitAccount: data.customDebitAccount,
    });
    this.getSelectedDebitAccTypeForEdit(data.debitFrom);
  }

  updateAccrualItem() {
    this.editButton = false;
    this.addButton = true;

    this.accrualsArray[this.index] = this.Form.value;
    this.getAccrualItems();
  }
}
