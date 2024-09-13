import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ActiveBillsService } from 'src/app/admin/data/services/activebills.service';
import { LocalStorageService } from 'src/app/admin/data/services/localstorage.service';
import { TokenCookieService } from 'src/app/core/service/token-storage-cookies.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { Category } from 'src/app/user/data/types/category';
import { PendingDirectInfoComponent } from '../pending-direct-transfer/dialogs/pending-direct-info/pending-direct-info.component';

@Component({
  selector: 'app-deleted-direct-transfer',
  templateUrl: './deleted-direct-transfer.component.html',
  styleUrls: ['./deleted-direct-transfer.component.sass']
})
export class DeletedDirectTransferComponent implements OnInit {

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
    //"verify",
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
  deletedTransactions: any;

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
      status: ["Deleted"],
    });

    this.getDeletedTransactions();
  }

  refresh() {
    this.getDeletedTransactions();
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
    dialogConfig.width = "1000px";
    dialogConfig.data = {
      action: "deletedOrRejected",
      data: data,
    };
    const dialogRef = this.dialog.open(
      PendingDirectInfoComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (this.Form.value.transactionType == "direct_transfer") {
        this.getDeletedTransactions();
      } else {
        this.getDeletedTransactionsWithPO();
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
      this.getDeletedTransactions();
    } else {
      this.getDeletedTransactionsWithPO();
    }
  }
  getDeletedTransactions() {
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
    this.activeBillsService.getDeletedTransactionsByStatus(params).subscribe(
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

  getDeletedTransactionsWithPO() {
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
    this.activeBillsService.getDeletedTransactionsByStatus(params).subscribe(
      (res) => {
        console.log("Deleted Transactions: ", res);

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
      this.getDeletedTransactions();
    } else {
      this.getDeletedTransactionsWithPO();
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
}
