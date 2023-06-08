import { SelectionModel } from "@angular/cdk/collections";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { takeUntil } from "rxjs";
import { AccessControlService } from "src/app/admin/data/services/_AccessControlService.service";
import { TokenCookieService } from "src/app/core/service/token-storage-cookies.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { ExpenseService } from "src/app/user/data/services/expense.service";
import { Expense } from "src/app/user/data/types/expense";

import { AddExpenseComponent } from "../add-expense/add-expense.component";
import { DeleteExpenseComponent } from "../delete-expense/delete-expense.component";
import { ViewExpenseDetailsComponent } from "../view-expense-details/view-expense-details.component";
import { ExpenseStatusComponent } from "./dialogs/expense-status/expense-status.component";

@Component({
  selector: "app-all-expenses",
  templateUrl: "./all-expenses.component.html",
  styleUrls: ["./all-expenses.component.sass"],
})
export class AllExpensesComponent extends BaseComponent implements OnInit {
  expenses: Expense[] = [];
  displayedColumns: string[] = [
    "id",
    "expenseCode",

    "expenseDescription",
    // "expenseMajorCategory",
    // "expenseSubCategory",
    "status",
    "postedBy",
    "postedTime",
    "actions",
  ];
  dataSource!: MatTableDataSource<Expense>;
  selection = new SelectionModel<Expense>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };
  index: number;
  id: number;
  isLoading = true;
  canVerify: boolean = false;
  currentUser: any;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private expenseService: ExpenseService,
    private tokenCookieService: TokenCookieService,
    private accessControlService: AccessControlService
  ) {
    super();
  }

  ngOnInit(): void {
    this.currentUser = this.tokenCookieService.getUser().username;
    
    this.getExpenses();
  }

  getExpenses() {
    this.expenseService
      .getExpenses()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.expenses = res;

          console.log("expenses: ", this.expenses);

          if (this.expenses) {
            this.isLoading = false;

            this.dataSource = new MatTableDataSource<Expense>(this.expenses);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  hasAccess: boolean;
  addExpenseCall() {
    this.hasAccess = this.accessControlService.hasPrivilege(["Add Expenses"]);
    if (this.hasAccess) {
    this.router.navigate(["/admin/supplier/expenses-management/add-expense"]);
  }}

  updateExpenseCall(expense) {
    this.hasAccess = this.accessControlService.hasPrivilege(["Update Expenses"]);
    if (this.hasAccess) {
    this.router.navigate(
      ["/admin/supplier/expenses-management/update-expense"],
      {
        state: {
          expenseDetails: JSON.stringify(expense),
        },
      }
    );
  }}

  viewExpenseDetailsCall(data) {
    this.hasAccess = this.accessControlService.hasPrivilege(["View Expenses"]);
    if (this.hasAccess) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      data: data,
    };

    const dialogRef = this.dialog.open(
      ViewExpenseDetailsComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((result) => {
      this.getExpenses();
    });
  }}

  deleteExpenseCall(data) {
    this.hasAccess = this.accessControlService.hasPrivilege(["Delete Expenses"]);
    if (this.hasAccess) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      data: data,
    };

    const dialogRef = this.dialog.open(DeleteExpenseComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getExpenses();
    });
  }}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onContextMenu(event: MouseEvent, item: Expense) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }

  updateStatus(row) {
    this.hasAccess = this.accessControlService.hasPrivilege(["Validate Expenses"]);
    if (this.hasAccess) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      data: row,
    };
    const dialogRef = this.dialog.open(ExpenseStatusComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getExpenses();
    });
  }}
  detailsCall(){
    
  }
}
