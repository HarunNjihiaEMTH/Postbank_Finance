import { SelectionModel } from "@angular/cdk/collections";
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { takeUntil } from "rxjs";
import { ActiveBillsService } from "src/app/admin/data/services/activebills.service";

import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { BankBranchCodesLookupComponent } from "src/app/user/commons/components/bank-branch-codes-lookup/bank-branch-codes-lookup.component";
import { SchemeCodesLookupComponent } from "src/app/user/commons/components/scheme-codes-lookup/scheme-codes-lookup.component";
import { AccountService } from "src/app/user/data/services/account.service";
import { CommonsService } from "src/app/user/data/services/commons/commons.service";
import { CostCenterService } from "src/app/user/data/services/cost-center.service";
import { ExpenseService } from "src/app/user/data/services/expense.service";
import { Account } from "src/app/user/data/types/account";
import { BranchCode } from "src/app/user/data/types/branch-code";
import { SchemeType } from "src/app/user/data/types/commons/scheme-type";
import { ExpensesLookupComponent } from "../../../bills/pay-bill/dialog/expenses-lookup/expenses-lookup.component";
import { GeneralCostcentersLookupComponent } from "../general-costcenters-lookup/general-costcenters-lookup.component";


@Component({
  selector: 'app-expense-costcenter-acc-lookup',
  templateUrl: './expense-costcenter-acc-lookup.component.html',
  styleUrls: ['./expense-costcenter-acc-lookup.component.scss']
})
export class ExpenseCostcenterAccLookupComponent implements OnInit {

  displayedColumns: string[] = [
    "expenseAccount",
    "expenseName",
    "costCenterName",
  ];

  branchCode: any;
  branchCodes: Account[] = [];
  dataSource: MatTableDataSource<Account>;
  isLoading: boolean;
  selection = new SelectionModel<Account>(true, []);
  index: number;
  id: number;
  schemeCodes: SchemeType[] = [];
  banksBranchCodes: BranchCode[] = [];
  fetchAccountsParametersForm: FormGroup;


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  onFirstLoad: boolean = true
  noData: boolean = false

  selectedExp: any[] = [];
  expenses: any;
  costcenters: any;

  constructor(
    public dialogRef: MatDialogRef<ExpenseCostcenterAccLookupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private accountService: AccountService,
    private commonService: CommonsService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private payBill: ActiveBillsService,
    private expenseService: ExpenseService,
    private costCenterService: CostCenterService,
    private snackbar: SnackbarService,
  ) {

  }

  ngOnInit(): void {

    this.fetchAccountsParametersForm = this.createFetchAccountsParametersForm();
    this.getExpenses();
    this.getCostCenters();
  }

  createFetchAccountsParametersForm() {
    return this.fb.group({
      costCenterId: ["", [Validators.required]],
      expenseId: ["", [Validators.required]],
    });
  }


  getAccounts() {
    this.onFirstLoad = false;
    this.dataSource = new MatTableDataSource<Account>([]);
    this.isLoading = true;
    this.accountService
      .fetchExpenseAccounts(this.fetchAccountsParametersForm.value.expenseId, this.fetchAccountsParametersForm.value.costCenterId)
      .subscribe((res) => {
        this.branchCode = res;
        this.branchCodes = [this.branchCode];

        console.log("Accounts = ", res);

        if (this.branchCodes.length > 0) {
          this.isLoading = false;
        }
        if (this.branchCodes.length === 0) {
          this.isLoading = false;
          this.noData = true
        }
        this.dataSource = new MatTableDataSource<Account>(this.branchCodes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      }, err => {
        console.log(err)
        this.isLoading = false;
        this.noData = true;
      });
  }

  onSelectRow(data: any) {
    this.dialogRef.close({ event: "close", data: data });

    console.log("Exp Acc:", data);
  }

  costCentersLookup() {
    if (this.costcenters != null) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "500px";
      dialogConfig.data = {
        action: "view cost centers",
        data: this.costcenters,
        selected: this.selectedExp,
      };

      const dialogRef = this.dialog.open(
        GeneralCostcentersLookupComponent,
        dialogConfig
      );

      dialogRef.afterClosed().subscribe((result) => {
        console.log("Result ", result);
        this.fetchAccountsParametersForm.patchValue({
          costCenterId: result.data[0].id
        })
      }, err => {
        console.log(err)
      });
    } else {
      this.snackbar.showNotification(
        "snackbar-danger",
        "Fetching Cost Centers!"
      );
    }

  }




  expensesLookup() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      action: "single selection expenses",
      data: this.expenses,
      selected: this.selectedExp,
    };

    const dialogRef = this.dialog.open(ExpensesLookupComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.data.length != 0) {
        console.log("selected Expense: ", result.data);
        // this.getSelectedExpense(result.data);
        this.fetchAccountsParametersForm.patchValue({
          expenseId: result.data[0].id
        })
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getExpenses() {
    this.expenseService
      .getExpenses().subscribe(
        (res) => {
          this.expenses = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }
  getCostCenters() {
    this.costCenterService
      .getCostCenters().subscribe(
        (res) => {
          this.costcenters = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }

}
