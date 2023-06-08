import { SelectionModel } from "@angular/cdk/collections";
import { DatePipe } from "@angular/common";
import { HttpParams } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
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
import { AccessControlService } from "src/app/admin/data/services/_AccessControlService.service";
import { TokenCookieService } from "src/app/core/service/token-storage-cookies.service";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { Category } from "src/app/user/data/types/category";
import { ApprovedDirectInfoComponent } from "./dialogs/approved-direct-info/approved-direct-info.component";

@Component({
  selector: "app-approved-direct-transfer",
  templateUrl: "./approved-direct-transfer.component.html",
  styleUrls: ["./approved-direct-transfer.component.sass"],
})
export class ApprovedDirectTransferComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = "end";
  verticalPosition: MatSnackBarVerticalPosition = "top";
  loading: boolean = false;
  resData: any;
  disableBtn: boolean = true;

  directTransactions: any;
  displayedColumns: string[] = [
    "id",
    "transactionCode",
    "tranAmount",
    "postedTime",

    "verifiedBy",
    "postedBy",
    "description",
    "finacleStatus",

    "status",
    "action",
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
  postedTransactions: any;

  Form: FormGroup;
  currentDate: Date = new Date();
  dateTomorrow: Date = new Date(
    this.currentDate.getTime() + 1 * 24 * 60 * 60 * 1000
  );
  oneWeekAgo: Date = new Date(
    this.currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
  );

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private activeBillsService: ActiveBillsService,
    private localStorageService: LocalStorageService,
    private tokenCookieService: TokenCookieService,
    private snackbar: SnackbarService,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private datepipe: DatePipe,
    private accessControlService: AccessControlService
  ) {}

  hasAccess: boolean = false;
  // onSubmit() {
  //   console.log("this.formData: ", this.formData);
   

  //   console.log("this.hasAccess: ", this.hasAccess);
  //   this.hasAccess = this.accessControlService.hasThisPrivilege([
  //     "Validate Transaction",
  //   ]);
  //   if (this.hasAccess) {
  //     this._snackBar.open(
  //       "You are not authorized to enter a transaction!",
  //       "Try again!",
  //       {
  //         horizontalPosition: "end",
  //         verticalPosition: "top",
  //         duration: 80000,
  //         panelClass: ["snackbar-danger", "snackbar-success"],
  //       }
  //     );
  //   }

  //   if (!this.hasAccess) {}
  // }
  canVerify: boolean = false;

  ngOnInit(): void {
    this.currentUser = this.tokenCookieService.getUser().username;

    this.Form = this.fb.group({
      transactionType: ["direct_transfer", Validators.required],
      fromDate: [this.oneWeekAgo, Validators.required],
      toDate: [this.dateTomorrow, Validators.required],
      status: ["Approved"],
    });

    this.getApprovedTransactions();

    this.hasAccess = this.accessControlService.hasThisPrivilege([
      "Validate Transaction",
    ]);

    if (this.hasAccess) {
      this.canVerify = true;
    }
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

  viewPendingTransactionCall(data) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "1100px";
    dialogConfig.data = {
      action: "view bill details",
      data: data,
    };
    const dialogRef = this.dialog.open(
      ApprovedDirectInfoComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((result) => {
      this.getApprovedTransactions();
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
          if (this.resData.status !== "Success") {

          //   {
          //     "tran_id": "S590837",
          //     "tran_date": "17-03-2023",
          //     "status": "Success",
          //     "type": "-",
          //     "description": "-",
          //     "errorCode": null
          // }
            this._snackBar.open(
              "TRANSACTION RESPONSE" + "\n STATUS: " + this.resData,
              "X",
              {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 2000000,
                panelClass: ["snackbar-danger", "snackbar-danger"],
              }
            );
          } else if (this.resData.status === "Success") {
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
                panelClass: ["snackbar-success", "snackbar-success"],
              }
            );
            // if (transData.retriesCount > 3) {
            //   this.snackbar.showNotification("snackbar-danger", res.message);
            // }
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

  defaultSelect: string = "Bills without PO";
  categories = [
    { name: "Bills without PO", value: "direct_transfer" },
    { name: "Bills with PO", value: "pay_po" },
  ];
  fetchedData: any;
  currentSelectedCategory: any;

  approvedTransactions: any;

  getSelectedCategory(event: any) {
    this.fetchedData = null;
    this.dataSource = null;
    this.isLoading = true;

    if (this.Form.value.transactionType == "direct_transfer") {
      this.getApprovedTransactions();
    } else {
      this.getApprovedTransactionsWithPO();
    }
  }
  getApprovedTransactions() {
    let fromDate = this.datepipe.transform(
      this.Form.value.fromDate,
      "yyyy-MM-dd'T'HH:mm:ss"
    );

    let toDate = this.datepipe.transform(
      this.Form.value.toDate,
      "yyyy-MM-dd'T'HH:mm:ss"
    );

    const params = new HttpParams()
      .set("transactionType", this.Form.value.transactionType)
      .set("status", this.Form.value.status)
      .set("fromDate", fromDate)
      .set("toDate", toDate);
    console.log("params: ", params.toString());
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
    let fromDate = this.datepipe.transform(
      this.Form.value.fromDate,
      "yyyy-MM-ddTHH:mm:ss"
    );
    let toDate = this.datepipe.transform(
      this.Form.value.fromDate,
      "yyyy-MM-ddTHH:mm:ss"
    );

    const params = new HttpParams()
      .set("transactionType", this.Form.value.transactionType)
      .set("status", this.Form.value.status)
      .set("fromDate", fromDate)
      .set("toDate", toDate);
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

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    console.log("New date:", event.value);
    // Do something with the new date value

    this.fetchedData = null;
    this.dataSource = null;
    this.isLoading = true;

    if (this.Form.value.transactionType == "direct_transfer") {
      this.getApprovedTransactions();
    } else {
      this.getApprovedTransactionsWithPO();
    }
  }

  editTransaction(row: any) {
    console.log("transactionDetails: ", row);
    this.router.navigate(
      ["/admin/transfer-transactions/post-direct-transaction"],

      {
        state: {
          transactionDetails: JSON.stringify(row),
          action: "Update Transaction",
        },
      }
    );
  }


  deleteTransaction(){
    //http://localhost:9051/api/v1/transaction/delete/temporary/44
  }
}
