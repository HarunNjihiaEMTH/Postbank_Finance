import { DatePipe } from "@angular/common";
import { HttpParams } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { ActiveBillsService } from "src/app/admin/data/services/activebills.service";
import { ReportsService } from "src/app/admin/data/services/reports.service";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { CustomerService } from "src/app/user/data/services/customer/customer.service";
import { SupplierService } from "src/app/user/data/services/supplier.service";
import { TransactionReportComponent } from "../../../accruals/transaction-report/transaction-report.component";

@Component({
  selector: "app-direct-trans-params",
  templateUrl: "./direct-trans-params.component.html",
  styleUrls: ["./direct-trans-params.component.sass"],
})
export class DirectTransParamsComponent implements OnInit {
  action: string;
  dialogTitle: string;

  generalDirectTransForm: FormGroup;
  generalDirectTrans: boolean = false;

  accrualsPerSupplierForm: FormGroup;
  accrualsPerSupplier: boolean = false;

  types = [{ name: "PDF" }, { name: "EXCEL" }];

  statuses = [{ name: "Pending" }, { name: "Approved" }, { name: "Rejected" }];

  category: any;
  customers: any;
  params: any;
  title: any;
  subscription!: Subscription;
  error: any;
  loading: boolean;
  singleReport: boolean = false;
  supplierss: any;
  accrualSuppliers: any;

  activateFinacleStatus: boolean = false;

  constructor(
    private customerService: CustomerService,
    public dialogRef: MatDialogRef<TransactionReportComponent>,
    private datepipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private reportsService: ReportsService,
    private snackbar: SnackbarService,
    private supplierService: SupplierService,
    private payBill: ActiveBillsService
  ) {}

  ngOnInit(): void {
    this.title = this.data.test;
    this.generalDirectTrans = true;
    this.generalDirectTransForm = this.createGeneralDirectTransForm();

    console.log("params = ", this.data.test);
  }

  createGeneralDirectTransForm(): FormGroup {
    return this.fb.group({
      type: ["PDF", Validators.required],
      status: ["Pending", Validators.required],
      fromDate: ["", Validators.required],
      toDate: ["", Validators.required],
      finacleStatus: ["%"],
    });
  }

  Click(): void {
    this.dialogRef.close();
  }

  getStatus(event: any) {
    if (event.value == "Approved") {
      this.activateFinacleStatus = true;
    } else {
      this.activateFinacleStatus = false;
    }
  }

  generateDirectTransReport() {
    this.loading = true;
    let status = this.generalDirectTransForm.value.status;
    let type = this.generalDirectTransForm.value.type;
    let fromDate = this.datepipe.transform(
      this.generalDirectTransForm.value.fromDate,
      "YYYY-MM-dd"
    );
    let toDate = this.datepipe.transform(
      this.generalDirectTransForm.value.toDate,
      "YYYY-MM-dd"
    );
    let finacle_status = this.generalDirectTransForm.value.finacleStatus;

    console.log("fromDate: ", fromDate);
    console.log("toDate: ", toDate);

    console.log("fromDate: ", this.generalDirectTransForm.value.fromDate);
    console.log("toDate: ", this.generalDirectTransForm.value.toDate);

    const params = new HttpParams()
      .set("finacle_status", finacle_status)
      .set("status", status)
      .set("fromDate", fromDate)
      .set("toDate", toDate);

    if (type == "PDF") {
      this.subscription = this.reportsService
        .generateDirectTransactionPdfReport(params)
        .subscribe(
          (response) => {
            let url = window.URL.createObjectURL(response.data);

            // if you want to open PDF in new tab
            window.open(url);

            let a = document.createElement("a");
            document.body.appendChild(a);
            a.setAttribute("style", "display: none");
            a.setAttribute("target", "blank");
            a.href = url;
            a.download = "DirectTransactionPdfReport.pdf";
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();

            this.loading = false;

            this.dialogRef.close();

            this.snackbar.showNotification(
              "snackbar-success",
              "Report generated successfully"
            );
          },
          (err) => {
            this.error = err;
            this.loading = false;

            this.dialogRef.close();

            this.snackbar.showNotification(
              "snackbar-danger",
              "Report could not be generated successfully"
            );
          }
        );
    } else if (type == "EXCEL") {
      this.subscription = this.reportsService
        .generateDirectTransactionExcelReport(params)
        .subscribe(
          (response) => {
            const a = document.createElement("a");
            document.body.appendChild(a);
            const blob: any = new Blob([response.data], {
              type: "octet/stream",
            });
            const url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = "DirectTransactionExcelReport.xlsx";
            a.click();
            window.URL.revokeObjectURL(url);

            this.loading = false;

            this.dialogRef.close();

            this.snackbar.showNotification(
              "snackbar-success",
              "Report generated successfully"
            );
          },
          (err) => {
            this.error = err;
            this.loading = false;

            this.dialogRef.close();

            this.snackbar.showNotification(
              "snackbar-danger",
              "Excel File could not be generated successfully"
            );
          }
        );
    } else {
      this.snackbar.showNotification("snackbar-danger", "Invalid file type!");
    }
  }
}
