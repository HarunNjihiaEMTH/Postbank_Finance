import { DatePipe } from "@angular/common";
import { HttpParams } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from "@angular/material/dialog";
import { Subscription, takeUntil } from "rxjs";

import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";

import { ReportsService } from "src/app/admin/data/services/reports.service";
import { saveAs } from "file-saver";

import { SupplierService } from "src/app/user/data/services/supplier.service";
import { CustomerService } from "src/app/user/data/services/customer/customer.service";
import { SuppliersLookupComponent } from "src/app/admin/modules/bills/pay-bill/dialog/suppliers-lookup/suppliers-lookup.component";

@Component({
  selector: "app-payment-params",
  templateUrl: "./payment-params.component.html",
  styleUrls: ["./payment-params.component.sass"],
})
export class PaymentParamsComponent implements OnInit {
  action: string;
  dialogTitle: string;

  generalForm: FormGroup;
  general: boolean = false;

  supplierPaymentForm: FormGroup;
  supplierPayment: boolean = false;

  supplierStatementForm: FormGroup;
  supplierStatement: boolean = false;

  bankForm: FormGroup;
  bank: boolean = false;

  paymentRecievedForm: FormGroup;
  paymentRecieved: boolean = false;

  posPerSupplierForm: FormGroup;
  posPerSupplier: boolean = false;

  classes = [
    { name: "Payments to suppliers" },
    //{ name: "Payments by status" },
    { name: "Purchase orders" },


  ];
  types = [{ name: "PDF" }, { name: "EXCEL" }];

  vatTypes = [{ name: "VAT withholding" }, { name: "Income withholding" }];

  statuses = [{ name: "Pending" }, { name: "Approved" }, { name: "Rejected" }];

  //transactionModes = [{name: "All"},{name: "direct_transfer"}, {name: "pay_without_po"}, {name: "pay_po"}, {name: "pay_acrual"}, ]
  // { name: "All" },

  category: any;
  customers: any;
  params: any;
  title: any;
  subscription!: Subscription;
  error: any;
  loading: boolean;
  singleReport: boolean = false;
  supplierss: any;

  activateStatus: boolean = false;
  activateFinacleStatus: boolean = false;

  constructor(
    private customerService: CustomerService,
    public dialogRef: MatDialogRef<PaymentParamsComponent>,
    private datepipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private reportsService: ReportsService,
    private snackbar: SnackbarService,
    private supplierService: SupplierService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    if (this.data.test == "general") {
      this.title = this.data.test;
      this.general = true;
      this.generalForm = this.createGeneralForm();
    } else if (this.data.test == "supplier payment") {
      this.getSuppliers();
      this.title = this.data.test;
      this.supplierPayment = true;
      this.supplierPaymentForm = this.createSupplierPaymentForm();
    } else if (this.data.test == "supplier statement") {
      this.getSuppliers();
      this.title = this.data.test;
      this.supplierStatement = true;
      this.supplierStatementForm = this.createSupplierStatementForm();
    } else if (this.data.test == "POs per supplier") {
      this.getSuppliers();
      this.title = this.data.test;
      this.posPerSupplier = true;
      this.posPerSupplierForm = this.createPosPerSupplierForm();
    }
    console.log("params = ", this.data.test);
  }

  createGeneralForm(): FormGroup {
    return this.fb.group({
      type: ["", Validators.required],
      class: ["", Validators.required],
      fromDate: ["", Validators.required],
      toDate: ["", Validators.required],
      status: ["", Validators.required],
      transactionMode: ["%"],
      finacleStatus: ["%"]
    });
  }

  createSupplierPaymentForm(): FormGroup {
    return this.fb.group({
      supplier: ["", Validators.required],
      supplierName: [""],
      type: ["PDF"],
      fromDate: ["", Validators.required],
      toDate: ["", Validators.required],
    });
  }
  createSupplierStatementForm(): FormGroup {
    return this.fb.group({
      supplier: ["", Validators.required],
      supplierName: [""],
      type: ["", Validators.required],
      fromDate: ["", Validators.required],
      toDate: ["", Validators.required],
    });
  }


  createPosPerSupplierForm(): FormGroup {
    return this.fb.group({
      supplier: ["", Validators.required],
      supplierName: [""],
      fromDate: ["", Validators.required],
      toDate: ["", Validators.required],
      type: ["", Validators.required],
    });
  }

  // ************************************************************************************************************


  supplierIsSelected = false;

  selectedSup: any[] = [];

  suppliersLookup() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "800px";
    dialogConfig.data = {
      action: "view suppliers",
      data: this.supplierss,
      selected: this.selectedSup,
    };

    const dialogRef = this.dialog.open(SuppliersLookupComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.data.length != 0) {
        console.log("result: ", result.data[0]);



        if (this.data.test == "supplier payment") {

          this.supplierPaymentForm.patchValue({
            supplier: result.data[0].id,
            supplierName: result.data[0].supplierName,
          });
        } else if (this.data.test == "supplier statement") {

          this.supplierStatementForm.patchValue({
            supplier: result.data[0].id,
            supplierName: result.data[0].supplierName,
          });
        } else if (this.data.test == "POs per supplier") {

          this.posPerSupplierForm.patchValue({
            supplier: result.data[0].id,
            supplierName: result.data[0].supplierName,
          });
        }

      }
    });
  }


  // ************************************************************************************************************

  generateSupplierPaymentsReport() {
    this.loading = true;
    let type = this.supplierPaymentForm.value.type;
    let supplier = this.supplierPaymentForm.value.supplier;
    let fromDate = this.datepipe.transform(
      this.supplierPaymentForm.value.fromDate,
      "YYYY-MM-dd"
    );
    let toDate = this.datepipe.transform(
      this.supplierPaymentForm.value.toDate,
      "YYYY-MM-dd"
    );

    const params = new HttpParams()

      // .set("format", type)
      .set("supplier_id", supplier)
      .set("fromDate", fromDate)
      .set("toDate", toDate);

    if (type == "PDF") {
      this.subscription = this.reportsService
        .generatePaymentsDonePdfReport(params)
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
            a.download = "PaymentsDonePdfReport.pdf";
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
        .generateSuccessfulInvoicesExcelReport(params)
        .subscribe(
          (response) => {

            const a = document.createElement('a');
            document.body.appendChild(a);
            const blob: any = new Blob([response.data], { type: 'octet/stream' });
            const url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = "SuccessfulInvoicesExcelReport.xlsx"
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
              "File could not be generated successfully"
            );
          }
        );
    } else {
      this.snackbar.showNotification("snackbar-danger", "Invalid file type!");
    }
  }

  generateSupplierStatementReport() {
    this.loading = true;
    let type = this.supplierStatementForm.value.type;
    let supplier = this.supplierStatementForm.value.supplier;
    let fromDate = this.datepipe.transform(
      this.supplierStatementForm.value.fromDate,
      "YYYY-MM-dd"
    );
    let toDate = this.datepipe.transform(
      this.supplierStatementForm.value.toDate,
      "YYYY-MM-dd"
    );

    const params = new HttpParams()

      .set("supplier_id", supplier)
      .set("fromDate", fromDate)
      .set("toDate", toDate);

    if (type == "PDF") {
      this.subscription = this.reportsService
        .generateSupplierStatementPdfReport(params)
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
            a.download = "SupplierStatementPdfReport.pdf";
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
        .generateSupplierStatementExcelReport(params)
        .subscribe(
          (response) => {
            const a = document.createElement('a');
            document.body.appendChild(a);
            const blob: any = new Blob([response.data], { type: 'octet/stream' });
            const url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = "SupplierStatementExcelReport.xlsx"
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


  generatePosPerSupplierReport() {
    this.loading = true;
    let type = this.posPerSupplierForm.value.type;
    let supplier = this.posPerSupplierForm.value.supplier;
    let fromDate = this.datepipe.transform(
      this.posPerSupplierForm.value.fromDate,
      "yyyy-MM-ddTHH:mm:ss"
    );
    let toDate = this.datepipe.transform(
      this.posPerSupplierForm.value.toDate,
      "yyyy-MM-ddTHH:mm:ss"
    );

    const params = new HttpParams()
      // .set("format", type)
      .set("supplier_id", supplier)
      .set("fromDate", fromDate)
      .set("toDate", toDate);

    if (type == "PDF") {
      this.subscription = this.reportsService
        .generatePoPerSupplierPdfReport(params)
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
            a.download = "PoPerSupplierPdfReport.pdf";
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
        .generatePoPerSupplierExcelReport(params)
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
            a.download = "PoPerSupplierExcelReport.xlsx";
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
    } else {
      this.snackbar.showNotification("snackbar-danger", "Invalid file type!");
    }
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  getClassification(event: any) {
    console.log("val: ", event.value);
    if (event.value == "Payments to suppliers") {
      this.activateStatus = true;
      this.statuses = [{ name: "Pending" }, { name: "Approved" }, { name: "Rejected" }];
    } else if (event.value == "Purchase orders") {
      this.activateStatus = false;
      this.statuses = [{ name: "Pending" }, { name: "Approved" }, { name: "Rejected" }, { name: "Canceled" }, { name: "InProgress" }, { name: "Paid" }];
    }
  }
  getStatus(event: any) {
    console.log("val: ", event.value);
    if (event.value == "Approved") {
      this.activateFinacleStatus = true;
    } else {
      this.activateFinacleStatus = false;
    }
  }

  getSuppliers() {
    this.supplierService.getSuppliers().subscribe(
      (res) => {
        this.supplierss = res;
        //console.log(this.supplierss);
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

  generateGeneralReport() {
    this.loading = true;
    let type = this.generalForm.value.type;
    let fromDate = this.datepipe.transform(
      this.generalForm.value.fromDate,
      "YYYY-MM-dd"
    );
    let toDate = this.datepipe.transform(
      this.generalForm.value.toDate,
      "YYYY-MM-dd"
    );
    let status = this.generalForm.value.status;
    let transactiontype = this.generalForm.value.transactionMode;
    let finacle_status = this.generalForm.value.finacleStatus;

    const params = new HttpParams()
      // .set("format", type)
      .set("transactiontype", transactiontype)
      .set("finacle_status", finacle_status)
      .set("status", status)
      .set("fromDate", fromDate)
      .set("toDate", toDate);
    console.log("params: ", params)
    if (this.generalForm.value.class == "Payments to suppliers") {
      if (type == "PDF") {
        this.subscription = this.reportsService
          .generateGeneralPaymentsToPdfReport(params)
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
              a.download = "GeneralPaymentsToPdfReport.pdf";
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
          .generateGeneralPaymentsToExcelReport(params)
          .subscribe(
            (response) => {

              const a = document.createElement('a');
              document.body.appendChild(a);
              const blob: any = new Blob([response.data], { type: 'octet/stream' });
              const url = window.URL.createObjectURL(blob);
              a.href = url;
              a.download = "GeneralPaymentsToPdfReport.xlsx"
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
                "File could not be generated successfully"
              );
            }
          );
      } else {
        this.snackbar.showNotification("snackbar-danger", "Invalid file type!");
      }
    }
    else if (this.generalForm.value.class == "Purchase orders") {
      if (type == "PDF") {
        //
        this.subscription = this.reportsService
          .generateGeneralPOsPdfReport(params)
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
              a.download = "GeneralPOsPdfReport.pdf";
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
          .generateGeneralPOsExcelReport(params)
          .subscribe(
            (response) => {

              const a = document.createElement('a');
              document.body.appendChild(a);
              const blob: any = new Blob([response.data], { type: 'octet/stream' });
              const url = window.URL.createObjectURL(blob);
              a.href = url;
              a.download = "GeneralPOsExcelReport.xlsx"
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
                "File could not be generated successfully"
              );
            }
          );

      } else {
        this.snackbar.showNotification("snackbar-danger", "Invalid file type!");
      }
    }
  }
}
