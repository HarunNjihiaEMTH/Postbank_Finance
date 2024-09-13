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
import { Category } from "src/app/user/data/types/category";

@Component({
  selector: 'app-rejected-bills',
  templateUrl: './rejected-bills.component.html',
  styleUrls: ['./rejected-bills.component.sass']
})
export class RejectedBillsComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = "end";
  verticalPosition: MatSnackBarVerticalPosition = "top";

  paidBills: any;
  displayedColumns: string[] = [
    "id",
    "supplierName",
    "supplierAccount",
    "poNumber",
    "grossAmount",
    "amountExcTax",
    "postedBy",
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

  
  defaultSelect: string = 'Bills without PO';
  categories = [{name: "Bills without PO"}, {name: "Bills with PO"}];
  fetchedData: any;
  rejectedTransactions: any;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private activeBillsService: ActiveBillsService,
    private localStorageService: LocalStorageService,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.getRejectedTransactions();
  }

  refresh() {
    this.getRejectedTransactions();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  
  getRejectedTransactions() {
    const params = new HttpParams()
      .set("transactionType", 'pay_without_po')
      .set("status", 'Rejected');
    this.activeBillsService.getTransactionsByStatus(params).subscribe(
      (res) => {
        console.log("Transactions: ", res);

        this.rejectedTransactions = res;

        if (this.rejectedTransactions) {
          this.isLoading = false;

          this.dataSource = new MatTableDataSource<Category>(this.rejectedTransactions.reverse());
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getRejectedTransactionsWithPO() {
    const params = new HttpParams()
      .set("transactionType", 'pay_po')
      .set("status", 'Rejected');
    this.activeBillsService.getTransactionsByStatus(params).subscribe(
      (res) => {
        console.log("Transactions: ", res);

        this.rejectedTransactions = res;

        if (this.rejectedTransactions) {
          this.isLoading = false;

          this.dataSource = new MatTableDataSource<Category>(this.rejectedTransactions.reverse());
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

// updateBill(rejectedBillDet) {
  
//   this.router.navigate(
//     ["/admin/bills/update-bill"],
//     {
//       state: {
//         selectedDetails: JSON.stringify(rejectedBillDet),
//       },
//     }
//   );
// }

veiwReason(data){
  console.log("data: ", data)
  let verifier = "REJECTED BY:  ";
  let message = "  REASON FOR REJECTEON:  ";
  this._snackBar.open(
    verifier+
    data.verifiedBy
    +
    message+
    data.reason,
    "X",
    {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 200000,
      panelClass: ["snackbar-danger", "snackbar-success"],
    }
  );
}  


  
getSelectedCategory(event: any) {
  console.log("event.log", event.value)
  this.fetchedData = null;
  this.dataSource = null;
  this.isLoading = true;

  if (event.value == 'Bills without PO') {
    this.getRejectedTransactions();
  } else {
    this.getRejectedTransactionsWithPO();
  }

}
}