import { SelectionModel } from "@angular/cdk/collections";
import { DatePipe } from "@angular/common";
import { HttpParams } from "@angular/common/http";
import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActiveBillsService } from "src/app/admin/data/services/activebills.service";

import { CostCentersService } from "src/app/admin/data/services/cost-centers.service";

import { SnackbarService } from "src/app/shared/services/snackbar.service";

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";

import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { TokenCookieService } from "src/app/core/service/token-storage-cookies.service";


@Component({
  selector: 'app-transaction-history-detail',
  templateUrl: './transaction-history-detail.component.html',
  styleUrls: ['./transaction-history-detail.component.sass']
})
export class TransactionHistoryDetailComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = "end";
  verticalPosition: MatSnackBarVerticalPosition = "top";

  displayedColumns: string[] = [
    "id",
    "accountNo",
    "accountName",
    "amount",
    "parttranstype",
    "narration",
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild("paginatorBill") paginatorBill: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  selection = new SelectionModel<any>(true, []);

  costCenterDetails: any;

  billInfoDetails: any;
  Data: any;

  status!: string;

  statusForm: FormGroup;
  //statusTypes: string[] = ["Approved", "Pending", "Rejected"];
  rejected: boolean = false;
  approved: boolean = false;
  currentUser: any;

  loading: boolean = false;

  invoicelist: any[] = [];

  invoiceAvailable: boolean = false;
  invoiceDataCatured: boolean = false;

  subscription!: Subscription;
  error: any;
  isloading: boolean;
  resData: any;

  constructor(
    public dialogRef: MatDialogRef<TransactionHistoryDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private costCenterService: CostCentersService,
    private snackbar: SnackbarService,
    private tokenCookieService: TokenCookieService,
    public datepipe: DatePipe,
    private activeBillsService: ActiveBillsService,
    private _snackBar: MatSnackBar,
    private payBill: ActiveBillsService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.currentUser = this.tokenCookieService.getUser().username;
    this.Data = this.data.data;

    this.billInfoDetails = this.data.data.paymentTrans;

    console.log("this.billDet: ", this.data);

    this.refreshDatasource();

    if (this.Data.invoiceNo) {
      this.invoiceDataCatured = true;
    }

    if (this.Data.invoiceRefNo) {
      this.getInvoices(this.Data.invoiceRefNo);
      this.invoiceAvailable = true;
    } else {
      this.invoiceAvailable = false;
    }
   
  }
  refreshDatasource() {
    this.dataSource = new MatTableDataSource<any>(this.billInfoDetails);

    this.dataSource.sort = this.sort;
    console.log("Refreshed");
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginatorBill;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getInvoices(refNumber) {
    this.payBill.getInvoiceByRefId(refNumber).subscribe(
      (response: any) => {
        this.invoicelist = response;

        console.log("invoicelist = ", this.invoicelist);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  retryTransaction(transData) {
    console.log("retrycount: ", transData.retrycount);
    this.loading = true;

    this.payBill
      .retryPayBill(transData.id)
      .pipe()
      .subscribe(
        (res) => {
          // this.resData = JSON.parse(res);
          this.resData = res;
          if (this.resData.body.status == "SUCCESS") {
            this._snackBar.open(
              "TRANSACTION RESPONSE" + "\n STATUS: " + this.resData,
              //  +
              // "\n TRANSACTION ID| " +
              // this.resData.body.tran_id +
              // "\n TRANSACTION DATE| " +
              // this.resData.body.tran_date,
              "X",
              {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 2000000,
                panelClass: ["snackbar-success", "snackbar-danger"],
              }
            );
          } else if (this.resData.body.status != "SUCCESS") {
            this._snackBar.open(
              "TRANSACTION RESPONSE" + "\n STATUS: " + res,
              "X",
              {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 2000000,
                panelClass: ["snackbar-danger", "snackbar-danger"],
              }
            );
          }

          console.log("Response = ", res);
          this.loading = false;
        },
        (err) => {
          this.loading = false;
          console.log("Error ", err);
          this.snackbar.showNotification("snackbar-danger", err);
        }
      );
  }

  

  downloadInvoice(invoiceID) {
    this.isloading = true;
    console.log("ID = ", invoiceID);
    const params = new HttpParams()
      // .set("format", type)
      .set("id", invoiceID);

      this.payBill.generateInvoicePdf(invoiceID).subscribe(data => {
        let file = new Blob([data], { type: 'application/pdf' });
        var fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      });

    // this.subscription = this.payBill.generateInvoicePdf(params).subscribe(
    //   (response) => {
    //     let url = window.URL.createObjectURL(response.data);

    //     // if you want to open PDF in new tab
    //     window.open(url);

    //     let a = document.createElement("a");
    //     document.body.appendChild(a);
    //     a.setAttribute("style", "display: none");
    //     a.setAttribute("target", "blank");
    //     a.href = url;
    //     a.download = response.filename;
    //     a.click();
    //     window.URL.revokeObjectURL(url);
    //     a.remove();

    //     this.isloading = false;

    //     this.dialogRef.close();

    //     this.snackbar.showNotification(
    //       "snackbar-success",
    //       "Invoice generated successfully"
    //     );
    //   },
    //   (err) => {
    //     this.error = err;
    //     this.isloading = false;

    //     this.dialogRef.close();

    //     this.snackbar.showNotification(
    //       "snackbar-danger",
    //       "Invoice could not be generated successfully"
    //     );
    //   }
    // );
  }
}
