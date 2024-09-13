import { SelectionModel } from "@angular/cdk/collections";
import { HttpParams } from "@angular/common/http";
import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { takeUntil } from "rxjs";
import { ActiveBillsService } from "src/app/admin/data/services/activebills.service";
import { ActivePosService } from "src/app/admin/data/services/activepos.service";
import { LocalStorageService } from "src/app/admin/data/services/localstorage.service";
import { TokenCookieService } from "src/app/core/service/token-storage-cookies.service";

import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { Category } from "src/app/user/data/types/category";
import { PostedTransactionDetailsComponent } from "../../../posted-transactions/dialogs/posted-transaction-details/posted-transaction-details.component";

@Component({
  selector: "app-transaction-history",
  templateUrl: "./transaction-history.component.html",
  styleUrls: ["./transaction-history.component.sass"],
})
export class TransactionHistoryComponent implements OnInit {
  @Input() messagelist: any[];

  horizontalPosition: MatSnackBarHorizontalPosition = "end";
  verticalPosition: MatSnackBarVerticalPosition = "top";

  paidBills: any;
  displayedColumns: string[] = [
    "id",
    "supplierName",
    "supplierAccount",
    "invoiceNo",
    "grossAmount",
    "amountExcTax",
    "verifiedBy",
    "postedBy",
    "finacleStatus",
    "status"

    // "status",
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
  loading: boolean;

  routeState: any;
  dataSelected: any;

  currentUser: any;

  resData: any; 

  constructor(
    public dialog: MatDialog,
    private activeBillsService: ActiveBillsService,
    private localStorageService: LocalStorageService,
    private tokenCookieService: TokenCookieService,
    private snackbar: SnackbarService,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.currentUser = this.tokenCookieService.getUser().username;
    //this.getApprovedTransactions();

    console.log("messagelist: ", this.messagelist);
    
    if (this.messagelist) {
      console.log("messagelist: ", this.messagelist);
      this.isLoading = false;
      this.dataSource = new MatTableDataSource<any>(this.messagelist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  refresh() {
    //this.getApprovedTransactions();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  retryTransaction(transData) {
    console.log("transData.id: ", transData.id);
    transData.isDisabled = true;
    this.activeBillsService
      .retryTransactionSupplier(transData.id)
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
          //this.getPostedTransactions();
        },
        (err) => {
          this.loading = false;
          console.log("Error ", err);
          this.snackbar.showNotification("snackbar-danger", err);
        }
      );
  }
  

  
}
