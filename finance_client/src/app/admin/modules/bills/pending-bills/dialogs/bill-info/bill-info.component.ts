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
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { PendingBillsComponent } from "../../pending-bills.component";

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";

@Component({
  selector: "app-bill-info",
  templateUrl: "./bill-info.component.html",
  styleUrls: ["./bill-info.component.sass"],
})
export class BillInfoComponent implements OnInit {
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

  resData: any;

  statusForm: FormGroup;
  
  rejected: boolean = false;
  approved: boolean = false;
  currentUser: any;
  postedBy: any;
  canVerify: boolean = false;

  isTransactionLoading: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<PendingBillsComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private costCenterService: CostCentersService,
    private snackbar: SnackbarService,
    private tokenService: TokenStorageService,
    public datepipe: DatePipe,
    private activeBillsService: ActiveBillsService,
    private _snackBar: MatSnackBar
  ) { }
  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser().username;
    this.Data = this.data.data;
    
    this.billInfoDetails = this.data.data.partrans;

    this.postedBy = this.Data.postedBy;

    if (this.postedBy === this.currentUser) {

      this.snackbar.showNotification("snackbar-danger", "You cannot verify a payment you created !");

      this.canVerify = false;

    } else {
      this.canVerify = true;
    }

    console.log("this.billDet: ", this.data);

    this.refreshDatasource();

    console.log("Data: ", this.Data);

    this.statusForm = this.createStatusForm();
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

  createStatusForm(): FormGroup {
    return this.fb.group({
      reason: ["", [Validators.required]],
    });
  }

  reject() {
    this.rejected = true;
    this.approved = false;

    this.status = "Rejected";
    if (!this.statusForm.value == null) {
      this.changeStatus();
    }
  }
  approve() {
    this.approved = true;
    this.rejected = false;

    this.status = "Approved";

    this.changeStatus();
  }



  changeStatus() {
    this.isTransactionLoading = true;
    const params = new HttpParams()
      .set("id", this.Data.id)
      .set("status", this.status)
      .set("verifiedBy", this.currentUser)
      //.set("payaccrualId", this.Data.id)
      .set("reason", this.statusForm.value.reason)
      .set("verifiedTime", new Date().toDateString());

    console.log("Form = ", params.toString());

    this.activeBillsService.approvePendingTransaction(params).subscribe(
      (res) => {
        

        let message = "FINACLE RESPONSE";

        // this.resData = JSON.parse(res);
        this.resData = res;
        console.log("res = ", res);
        if (this.resData.status == "Success") {
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
        } else if (this.resData.status != "Success") {
          this._snackBar.open(
            message +
            "\n STATUS: " +
            this.resData.status +
            "\n RESP DESCRIPTION| " +
            this.resData.desc +
            "\n RESP MESSAGE| " +
            this.resData.message,

            // "\n TRANSACTION ID| " +
            // this.resData.body.tran_id +
            // "\n TRANSACTION DATE| " +
            // this.resData.body.tran_date,
            "X",
            {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 2000000,
              panelClass: ["snackbar-danger", "snackbar-success"],
            }
          );
        }
        this.isTransactionLoading = false;
        this.dialogRef.close();
      },
      (err) => {
        console.log(err);
        this.snackbar.showNotification('snackbar-danger',err)
        this.isTransactionLoading = false;
      }
    );
  }
}
