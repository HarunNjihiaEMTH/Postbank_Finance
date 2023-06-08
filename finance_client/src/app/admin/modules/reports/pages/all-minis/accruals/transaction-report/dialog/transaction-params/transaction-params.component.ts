import { DatePipe } from "@angular/common";
import { HttpParams } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Subscription, takeUntil } from "rxjs";

import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";

import { ReportsService } from "src/app/admin/data/services/reports.service";
import { saveAs } from "file-saver";

import { SupplierService } from "src/app/user/data/services/supplier.service";
import { CustomerService } from "src/app/user/data/services/customer/customer.service";
import { ActiveBillsService } from "src/app/admin/data/services/activebills.service";
import { TransactionReportComponent } from "../../transaction-report.component";
import { AccrualReportsService } from "src/app/admin/data/services/accrualreports.service";

@Component({
  selector: "app-transaction-params",
  templateUrl: "./transaction-params.component.html",
  styleUrls: ["./transaction-params.component.sass"],
})
export class TransactionParamsComponent implements OnInit {
  action: string;
  dialogTitle: string;

  generalAccrualForm: FormGroup;
  generalAccrual: boolean = false;

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
    private accrualReportsService: AccrualReportsService,
    private snackbar: SnackbarService,
    private supplierService: SupplierService,
    private payBill: ActiveBillsService
  ) {}

  ngOnInit(): void {
    if (this.data.test == "general accrual") {
      this.title = this.data.test;
      this.generalAccrual = true;
      this.generalAccrualForm = this.createGeneralAccrualForm();
    } else if (this.data.test == "accruals per supplier") {
      this.getAccrualSupplier();
      this.title = this.data.test;
      this.accrualsPerSupplier = true;
      this.accrualsPerSupplierForm = this.createAccrualsPerSupplierForm();
    }
    console.log("params = ", this.data.test);
  }

  createGeneralAccrualForm(): FormGroup {
    return this.fb.group({
      type: ["PDF"],
      status: ["Pending"],
      fromDate: ["", Validators.required],
      toDate: ["", Validators.required],
      finacleStatus: ["%"],
    });
  }

  createAccrualsPerSupplierForm(): FormGroup {
    return this.fb.group({
      supplier: ["", Validators.required],
      type: ["PDF"],
      fromDate: ["", Validators.required],
      toDate: ["", Validators.required],
      status: ["Pending"],
      finacleStatus: ["%"],
    });
  }

  Click(): void {
    this.dialogRef.close();
  }

  getStatus(event: any) {
    console.log("val: ", event.value);
    if (event.value == "Approved") {
      this.activateFinacleStatus = true;
    } else {
      this.activateFinacleStatus = false;
    }
  }

  // getSuppliers() {
  //   this.supplierService.getSuppliers().subscribe(
  //     (res) => {
  //       this.supplierss = res;
  //       //console.log(this.supplierss);
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }
  getAccrualSupplier() {
    this.payBill.getAccrualSupplier().subscribe(
      (res) => {
        this.supplierss = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getCustomers() {
    this.customerService.getAllCustomers().subscribe((res) => {
      this.customers = res;
      console.log("Cust: ", this.customers);
    }),
      (err) => {
        console.log(err);
      };
  }
  getAccrualSuppliers() {
    this.payBill.getAccrualSuppliers().subscribe(
      (res) => {
        this.accrualSuppliers = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  generateGeneralAccrualReport() {
    this.loading = true;
    let status = this.generalAccrualForm.value.status;
    let type = this.generalAccrualForm.value.type;
    let fromDate = this.datepipe.transform(
      this.generalAccrualForm.value.fromDate,
      "dd-MM-yyyy"
    );
    let toDate = this.datepipe.transform(
      this.generalAccrualForm.value.toDate,
      "dd-MM-yyyy"
    );
    let finacle_status = this.generalAccrualForm.value.finacleStatus;

    const params = new HttpParams()
      .set("finacle_status", finacle_status)
      .set("status", status)
      .set("fromDate", fromDate)
      .set("toDate", toDate);

    if (type == "PDF") {
      this.subscription = this.accrualReportsService
        .generateGeneralAccrualStatusPdfReport(params)
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
            a.download = response.filename;
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
      this.subscription = this.accrualReportsService
        .generateGeneralAccrualStatusExcelReport(params)
        .subscribe(
          (response) => {
            const a = document.createElement("a");
            document.body.appendChild(a);
            const blob: any = new Blob([response.data], {
              type: "octet/stream",
            });
            const url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = "Report.xlsx";
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

  generateSupplierAccrualRecordPdfReport() {
    this.loading = true;
    let supplier_id = this.accrualsPerSupplierForm.value.supplier;
    let type = this.accrualsPerSupplierForm.value.type;
    let fromDate = this.datepipe.transform(
      this.accrualsPerSupplierForm.value.fromDate,
      "dd-MM-yyyy"
    );
    let toDate = this.datepipe.transform(
      this.accrualsPerSupplierForm.value.toDate,
      "dd-MM-yyyy"
    );
    let status = this.accrualsPerSupplierForm.value.status;
    let finacle_status = this.accrualsPerSupplierForm.value.finacleStatus;

    const params = new HttpParams()
      .set("finacle_status", finacle_status)
      .set("status", status)
      .set("supplier_id", supplier_id)
      .set("fromDate", fromDate)
      .set("toDate", toDate);

    if (type == "PDF") {
      this.subscription = this.accrualReportsService
        .generateSupplierAccrualRecordPdfReport(params)
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
            a.download = response.filename;
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
      this.subscription = this.accrualReportsService
        .generateSupplierAccrualRecordExcelReport(params)
        .subscribe(
          (response) => {
            const a = document.createElement("a");
            document.body.appendChild(a);
            const blob: any = new Blob([response.data], {
              type: "octet/stream",
            });
            const url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = "Report.xlsx";
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
