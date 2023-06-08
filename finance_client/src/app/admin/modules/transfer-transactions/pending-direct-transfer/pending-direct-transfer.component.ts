import { SelectionModel } from "@angular/cdk/collections";
import { DatePipe } from "@angular/common";
import { HttpParams } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
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
import { PendingDirectInfoComponent } from "./dialogs/pending-direct-info/pending-direct-info.component";
import Swal from "sweetalert2";

@Component({
  selector: "app-pending-direct-transfer",
  templateUrl: "./pending-direct-transfer.component.html",
  styleUrls: ["./pending-direct-transfer.component.sass"],
})
export class PendingDirectTransferComponent implements OnInit {
  paidBills: any;
  displayedColumns: string[] = [
    "id",
    "transactionCode",
    "tranAmount",
    "postedTime",
    //"verifiedBy",
    "postedBy",
    "description",
    "finacleStatus",
    "verify",
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
  pendingTransactions: any;

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
    private fb: FormBuilder,
    private datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.currentUser = this.tokenCookieService.getUser().username;

    this.Form = this.fb.group({
      transactionType: ["direct_transfer", Validators.required],
      fromDate: [this.oneWeekAgo, Validators.required],
      toDate: [this.dateTomorrow, Validators.required],
      status: ["Pending"],
    });

    this.getPendingTransactions();
  }

  refresh() {
    this.getPendingTransactions();
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
      PendingDirectInfoComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (this.Form.value.transactionType == "direct_transfer") {
        this.getPendingTransactions();
      } else {
        this.getPendingTransactionsWithPO();
      }
    });
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
      this.getPendingTransactions();
    } else {
      this.getPendingTransactionsWithPO();
    }
  }
  getPendingTransactions() {
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

  getPendingTransactionsWithPO() {
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
      this.getPendingTransactions();
    } else {
      this.getPendingTransactionsWithPO();
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


  deleteTransactionCall(row) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.activeBillsService.deleteTransaction(row.id).subscribe(
          response => {
            console.log('Transaction deleted successfully!');
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            this.getPendingTransactions();
            // Perform any additional actions as needed
          },
          error => {
            console.error('Error deleting transaction:', error);
            // Handle the error as needed
          }
        );
      }
    });
  }
  
}
