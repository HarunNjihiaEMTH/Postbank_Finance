import { SelectionModel } from "@angular/cdk/collections";
import { HttpParams } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  MatSnackBar,
} from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { takeUntil } from "rxjs";
import { ActiveBillsService } from "src/app/admin/data/services/activebills.service";
import { ActivePosService } from "src/app/admin/data/services/activepos.service";
import { LocalStorageService } from "src/app/admin/data/services/localstorage.service";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { Category } from "src/app/user/data/types/category";
import { PaidBillInfoComponent } from "./dialogs/paid-bill-info/paid-bill-info.component";

@Component({
  selector: "app-paid-bills",
  templateUrl: "./paid-bills.component.html",
  styleUrls: ["./paid-bills.component.sass"],
})
export class PaidBillsComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = "end";
  verticalPosition: MatSnackBarVerticalPosition = "top";
  loading: boolean = false;
  resData: any;

  paidBills: any;
  displayedColumns: string[] = [
    "id",
    "supplierName",
    "supplierAccount",
    "poNumber",
    "grossAmount",
    "amountExcTax",
    "verifiedBy",
    "postedBy",
    "finacleStatus",
    "status",

  ];
  dataSource!: MatTableDataSource<Category>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  selection = new SelectionModel<Category>(true, []);
  data: any;
  error: any;
  isLoading: boolean = true;

  routeState: any;
  dataSelected: any;
  approvedTransactions: any;

 

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private activeBillsService: ActiveBillsService,
    private localStorageService: LocalStorageService,
    private snackbar: SnackbarService,
    private payBill: ActiveBillsService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getApprovedTransactions();
  }

  refresh() {
    this.getApprovedTransactions();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  defaultSelect: string = "Bills without PO";
  categories = [{ name: "Bills without PO" }, { name: "Bills with PO" }];
  fetchedData: any;
  currentSelectedCategory: any;

  getSelectedCategory(event: any) {
    this.currentSelectedCategory = event.value;
    console.log("event.log", event.value);
    this.fetchedData = null;
    this.dataSource = null;
    this.isLoading = true;

    if (event.value == "Bills without PO") {
      this.getApprovedTransactions();
    } else {
      this.getApprovedTransactionsWithPO();
    }
  }
  getApprovedTransactions() {
    const params = new HttpParams()
      .set("transactionType", "pay_without_po")
      .set("status", "Approved");
    this.activeBillsService.getTransactionsByStatus(params).subscribe(
      (res) => {
        console.log("Transactions: ", res);

        this.approvedTransactions = res;

        if (this.approvedTransactions) {
          this.isLoading = false;

          this.dataSource = new MatTableDataSource<Category>(
            this.approvedTransactions.reverse()
          );
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getApprovedTransactionsWithPO() {
    const params = new HttpParams()
      .set("transactionType", "pay_po")
      .set("status", "Approved");
    this.activeBillsService.getTransactionsByStatus(params).subscribe(
      (res) => {
        console.log("Transactions: ", res);

        this.approvedTransactions = res;

        if (this.approvedTransactions) {
          this.isLoading = false;

          this.dataSource = new MatTableDataSource<Category>(
            this.approvedTransactions.reverse()
          );
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  viewPaidBillCall(data) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "1000px";
    dialogConfig.data = {
      action: "view bill details",
      data: data,
    };
    const dialogRef = this.dialog.open(PaidBillInfoComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (this.currentSelectedCategory == "Bills without PO") {
        this.getApprovedTransactions();
      } else if (this.currentSelectedCategory == "Bills with PO") {
        this.getApprovedTransactionsWithPO();
      }
    });
  }

  retryTransaction(transData) {
    console.log("transData.id: ", transData.id);
    transData.isDisabled = true;
    this.activeBillsService
      .retryTransactionById(transData.id)
      .pipe()
      .subscribe(
        (res) => {
          this.resData = res;
          let message = "FINACLE RESPONSE";
          if (this.resData.status == "Success") {
            this._snackBar.open(
              "TRANSACTION RESPONSE" + "\n STATUS: " + this.resData,
              "X",
              {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 2000000,
                panelClass: ["snackbar-success", "snackbar-danger"],
              }
            );
          } else if (this.resData.status != "Success") {
            this._snackBar.open(
              message +
                "\n STATUS: " +
                this.resData.status +
                "\n TRANSACTION ID| " +
                this.resData.tran_id +
                "\n TRANSACTION DATE| " +
                this.resData.tran_date,
              "X",
              {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 2000000,
                panelClass: ["snackbar-danger", "snackbar-success"],
              }
            );
            if (transData.retriesCount > 3) {
              this.snackbar.showNotification("snackbar-danger", res.message);
            }
          }
          console.log("Response = ", res);
          //this.loading = false;
          transData.isDisabled = false;
          if (this.currentSelectedCategory == "Bills without PO") {
            this.getApprovedTransactions();
          } else if (this.currentSelectedCategory == "Bills with PO") {
            this.getApprovedTransactionsWithPO();
          }
        },
        (err) => {
          this.loading = false;
          console.log("Error ", err);
          this.snackbar.showNotification("snackbar-danger", err);
        }
      );
  }

  
}
