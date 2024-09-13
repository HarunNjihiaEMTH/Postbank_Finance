import { SelectionModel } from "@angular/cdk/collections";
import { HttpParams } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
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
import { BillInfoComponent } from "../../bills/pending-bills/dialogs/bill-info/bill-info.component";
import { PostedTransactionDetailsComponent } from "./dialogs/posted-transaction-details/posted-transaction-details.component";

@Component({
  selector: 'app-posted-transactions',
  templateUrl: './posted-transactions.component.html',
  styleUrls: ['./posted-transactions.component.sass']
})
export class PostedTransactionsComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = "end";
  verticalPosition: MatSnackBarVerticalPosition = "top";
  resData: any;


  paidBills: any;
  displayedColumns: string[] = [
    "id",
    "supplierName",
    "accrualAccountName",
    "accrualAccount",
    "totalDebitAmt",
    "verifiedBy",
    "postedBy",
    "finacleStatus",
    "status",
   
    "actions",
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

  currentUser: any;

  loading: boolean = false;
  
  approvedTransactions: any

  constructor(
    public dialog: MatDialog,
    private activeBillsService: ActiveBillsService,
    private localStorageService: LocalStorageService,
    private tokenCookieService: TokenCookieService,
    private snackbar: SnackbarService,
    private payBill: ActiveBillsService,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.currentUser = this.tokenCookieService.getUser().username;
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

  getApprovedTransactions() {
    const params = new HttpParams()
      .set("transactionType", 'collect_accrual')
      .set("status", 'Approved');
    this.activeBillsService.getTransactionsByStatus(params).subscribe(
      (res) => {
        console.log("Transactions: ", res);

        this.approvedTransactions = res;

        if (this.approvedTransactions) {
          this.isLoading = false;

          this.dataSource = new MatTableDataSource<Category>(this.approvedTransactions.reverse());
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  // getApprovedTransactions() {
  //   this.activeBillsService.getAllApprovedPostedTrans().subscribe(
  //     (res) => {
  //       console.log("Bills: ", res);

  //       this.paidBills = res;

  //       if (this.paidBills) {
  //         this.isLoading = false;

  //         this.dataSource = new MatTableDataSource<Category>(this.paidBills);
  //         this.dataSource.paginator = this.paginator;
  //         this.dataSource.sort = this.sort;
  //       }
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }

  viewTransaction(){

    
    
  }
  viewCompletedTransactionCall(data){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "1000px";
    dialogConfig.data = {
      action: "view transaction details",
      data: data
    };
 ;
    const dialogRef = this.dialog.open(PostedTransactionDetailsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getApprovedTransactions();
    });
  }
  

  retryTransaction(transData) {
    console.log("transData.id: ", transData.id);
    transData.isDisabled = true;
    this.activeBillsService
      .retryTransaction(transData.id)
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
          this.getApprovedTransactions();
        },
        (err) => {
          this.loading = false;
          console.log("Error ", err);
          this.snackbar.showNotification("snackbar-danger", err);
        }
      );
  }
  

}
