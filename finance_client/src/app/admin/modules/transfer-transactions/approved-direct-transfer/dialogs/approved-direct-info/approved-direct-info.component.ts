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
import { ApprovedDirectTransferComponent } from "../../approved-direct-transfer.component";
import { TokenCookieService } from "src/app/core/service/token-storage-cookies.service";

@Component({
  selector: 'app-approved-direct-info',
  templateUrl: './approved-direct-info.component.html',
  styleUrls: ['./approved-direct-info.component.scss']
})
export class ApprovedDirectInfoComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = "end";
  verticalPosition: MatSnackBarVerticalPosition = "top";
  loading: boolean = false;
  resData: any;

  displayedColumns: string[] = [
    "id",
    "accountNo",
    "accountName",
    "amount",
    "parttranstype",
    "exchangeRate",
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



  invoicelist: any[] = [];

  invoiceAvailable: boolean = false;

  subscription!: Subscription;
  error: any;
  isloading: boolean;


  constructor(
    public dialogRef: MatDialogRef<ApprovedDirectTransferComponent>,
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
  ) { }
  ngOnInit(): void {
    this.currentUser = this.tokenCookieService.getUser().username;
    this.Data = this.data.data;

    this.billInfoDetails = this.data.data.partrans;

    console.log("this.billDet: ", this.data);

    this.refreshDatasource();


    this.getInvoices(this.Data.id);


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

  getInvoices(id) {
    this.payBill.getInvoiceByRefId(id).subscribe(
      (response: any) => {

        if (response.length === 0) {
          this.invoiceAvailable = false;
        } else {
          this.invoiceAvailable = true;
          this.invoicelist = response;
        }
        console.log("invoicelist = ", this.invoicelist);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  onClickDownloadPdf(item: any) {
    let base64String = item.file;
    this.downloadPdf(base64String, item.filename);
  }

  downloadPdf(base64String, fileName) {
    // Download PDF in Chrome etc.
    const source = `${base64String}`;
    const link = document.createElement("a");
    link.href = source;
    link.download = `${fileName}.pdf`;
    link.click();
  }


  retryTransaction(transData) {
    console.log("transData.id: ", transData.id);
    transData.isDisabled = true;
    this.activeBillsService
      .retryDirectTransaction(transData.id)
      .pipe()
      .subscribe(
        (res) => {
          this.resData = res;
          let message = "FINACLE RESPONSE";
          //   {
          //     "tran_id": null,
          //     "tran_date": "28-06-2023",
          //     "status": "FAILURE",
          //     "type": "-",
          //     "description": "String index out of range: -1228",
          //     "errorCode": "-"
          // }

        //   {
        //     "tran_id": "S599254",
        //     "tran_date": "16-06-2023",
        //     "status": "Success",
        //     "type": "-",
        //     "description": "-",
        //     "errorCode": null
        // }

          // if (this.resData.status === "SUCCESS" || this.resData.status === "Success") {
          //   this._snackBar.open(
          //     "TRANSACTION RESPONSE" + "\n STATUS: " + this.resData,
          //     "X",
          //     {
          //       horizontalPosition: this.horizontalPosition,
          //       verticalPosition: this.verticalPosition,
          //       duration: 2000000,
          //       panelClass: ["snackbar-success", "snackbar-danger"],
          //     }
          //   );
          // } else if (this.resData.status === "FAILURE") {
          //   this._snackBar.open(
          //     message +
          //     "\n STATUS: " +
          //     this.resData.status +
          //     "\n TRANSACTION ID| " +
          //     this.resData.tran_id +
          //     "\n TRANSACTION DATE| " +
          //     this.resData.tran_date,
          //     "X",
          //     {
          //       horizontalPosition: this.horizontalPosition,
          //       verticalPosition: this.verticalPosition,
          //       duration: 2000000,
          //       panelClass: ["snackbar-danger", "snackbar-success"],
          //     }
          //   );
          //   if (transData.retriesCount > 3) {
          //     this.snackbar.showNotification("snackbar-danger", res.message);
          //   }

          // }

          if (this.resData.status == "Success") {
            this._snackBar.open(
              message +
              "\n" +
              "STATUS: " +
              this.resData.status +
              "\n" +
              "TRANSACTION ID: " +
              this.resData.tran_id +
              "\n" +
              "TRANSACTION DATE: " +
              this.resData.tran_date,
              "X",
              {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 2000000,
                panelClass: ["snackbar-success", "snackbar-success"],
              }
            );
          } 
          
          else if (this.resData.status != "Success") {
            this._snackBar.open(
              message +
              "\n" +
              "status: " +
              this.resData.status +
              "\n" +
              "ERROR DESCRIPTION: " +
              this.resData.description +
              "\n" +
              "ERROR CODE: " +
              this.resData.errorCode,
              "X",
              {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 2000000,
                panelClass: ["snackbar-danger", "snackbar-success"],
              }
            );
          }

          console.log("Response = ", res);
          transData.isDisabled = false;
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
