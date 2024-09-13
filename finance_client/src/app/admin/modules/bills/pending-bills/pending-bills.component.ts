import { SelectionModel } from "@angular/cdk/collections";
import { HttpParams } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
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
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { Category } from "src/app/user/data/types/category";
import { BillInfoComponent } from "./dialogs/bill-info/bill-info.component";

@Component({
  selector: 'app-pending-bills',
  templateUrl: './pending-bills.component.html',
  styleUrls: ['./pending-bills.component.sass']
})
export class PendingBillsComponent implements OnInit {

  paidBills: any;
  displayedColumns: string[] = [
    "id",
    "transactionCode",
    "supplierName",
    "supplierAccount",
    "poNumber",
    "grossAmount",
    "amountExcTax",
    "postedBy",
    "finacleStatus",
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
  pendingTransactions: any;

  defaultSelect: string = 'Bills without PO';
  categories = [{ name: "Bills without PO" }, { name: "Bills with PO" }];
  fetchedData: any;
  currentSelectedCategory: 'Bills without PO';

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private activeBillsService: ActiveBillsService,
    private localStorageService: LocalStorageService,
    private tokenService: TokenStorageService,
    private snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser().username;
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


  getPendingTransactions() {
    const params = new HttpParams()
      .set("transactionType", 'pay_without_po')
      .set("status", 'Pending');
    this.activeBillsService.getTransactionsByStatus(params).subscribe(
      (res) => {
        console.log("Transactions: ", res);

        this.pendingTransactions = res;

        if (this.pendingTransactions) {
          this.isLoading = false;

          this.dataSource = new MatTableDataSource<Category>(this.pendingTransactions.reverse());
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
    const params = new HttpParams()
      .set("transactionType", 'pay_po')
      .set("status", 'Pending');
    this.activeBillsService.getTransactionsByStatus(params).subscribe(
      (res) => {
        console.log("Transactions: ", res);

        this.pendingTransactions = res;

        if (this.pendingTransactions) {
          this.isLoading = false;

          this.dataSource = new MatTableDataSource<Category>(this.pendingTransactions.reverse());
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }


  viewPendingBillCall(data) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "1000px";
    dialogConfig.data = {
      action: "view bill details",
      data: data
    };
    ;
    const dialogRef = this.dialog.open(BillInfoComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (this.currentSelectedCategory == 'Bills without PO') {
        this.getPendingTransactions();
      } else if (this.currentSelectedCategory == 'Bills with PO') {
        this.getPendingTransactionsWithPO()
      }

    });
  }

 



  getSelectedCategory(event: any) {
    this.currentSelectedCategory = event.value
    console.log("event.log", event.value)
    this.fetchedData = null;
    this.dataSource = null;
    this.isLoading = true;

    if (event.value == 'Bills without PO') {
      this.getPendingTransactions();
    } else {
      this.getPendingTransactionsWithPO();
    }

  }
}
