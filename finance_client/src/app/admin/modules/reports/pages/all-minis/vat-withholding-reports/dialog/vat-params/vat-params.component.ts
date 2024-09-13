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
import { VatWithholdingReportsComponent } from "../../vat-withholding-reports.component";
import { ActiveBillsService } from "src/app/admin/data/services/activebills.service";
import { AccrualReportsService } from "src/app/admin/data/services/accrualreports.service";

@Component({
  selector: "app-vat-params",
  templateUrl: "./vat-params.component.html",
  styleUrls: ["./vat-params.component.sass"],
})
export class VatParamsComponent implements OnInit {
  action: string;
  dialogTitle: string;

  generalForm: FormGroup;
  general: boolean = false;

  vatPaidForm: FormGroup;
  vatPaid: boolean = false;

  bankForm: FormGroup;
  bank: boolean = false;

  vatRecievedForm: FormGroup;
  vatRecieved: boolean = false;

  vatForAccrualsForm: FormGroup;
  vatForAccruals: boolean = false;

  vatForAccrualsPerSupForm: FormGroup;
  vatForAccrualsPerSup: boolean = false;

  classes = [
    { name: "Vat WH paid" },
    // { name: "Vat WH recieved" },
    { name: "Vat WH on local deliverables" },
    { name: "Vat WH on imported deliverables" },
  ];
  types = [{ name: "PDF" }, { name: "EXCEL" }];

  vatTypes = [{ name: "VAT withholding" }, { name: "Income withholding" }];

  statuses = [{ name: "Pending" }, { name: "Approved" }, { name: "Rejected" }];

  accrualClasses = [
    { name: "Vat WH on local deliverables (Accrual)" },
    { name: "Vat WH on imported deliverables (Accrual)" },
  ];

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

  constructor(
    private customerService: CustomerService,
    public dialogRef: MatDialogRef<VatWithholdingReportsComponent>,
    private datepipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private reportsService: ReportsService,
    private snackbar: SnackbarService,
    private supplierService: SupplierService,
    private payBill: ActiveBillsService,
    private accrualReportsService: AccrualReportsService
  ) { }

  ngOnInit(): void {
    if (this.data.test == "general") {
      this.title = this.data.test;
      this.general = true;
      this.generalForm = this.createGeneralForm();
    } else if (this.data.test == "vat paid") {
      this.getSuppliers();
      this.title = this.data.test;
      this.vatPaid = true;
      this.vatPaidForm = this.createvatPaidForm();
    } else if (this.data.test == "vat recieved") {
      this.getCustomers();
      this.title = this.data.test;
      this.vatRecieved = true;
      this.vatRecievedForm = this.createvatRecievedForm();
    }

    else if (this.data.test == "vat wh for accruals") {
      this.title = this.data.test;
      this.vatForAccruals = true;
      this.vatForAccrualsForm = this.createvatForAccrualsForm();
    } else if (this.data.test == "accrual per supplier (vwh)") {
      this.getAccrualSuppliers();
      this.title = this.data.test;
      this.vatForAccrualsPerSup = true;
      this.vatForAccrualsPerSupForm = this.createvatForAccrualsPerSupForm();
    }

    console.log("params = ", this.data.test);
  }

  createGeneralForm(): FormGroup {
    return this.fb.group({
      type: ["PDF"],
      class: ["", Validators.required],
      fromDate: ["", Validators.required],
      toDate: ["", Validators.required],
      transactionMode: ["%", Validators.required],
    });
  }

  createvatPaidForm(): FormGroup {
    return this.fb.group({
      supplier: ["", Validators.required],
      type: ["PDF"],
      fromDate: ["", Validators.required],
      toDate: ["", Validators.required],
      transactionMode: ["%", Validators.required],
    });
  }

  createvatRecievedForm(): FormGroup {
    return this.fb.group({
      customer: ["", Validators.required],
      fromDate: ["", Validators.required],
      toDate: ["", Validators.required],
      type: ["PDF"],
    });
  }
  createvatForAccrualsForm(): FormGroup {
    return this.fb.group({
      fromDate: ["", Validators.required],
      toDate: ["", Validators.required],
      type: ["PDF"],
      class: ["", Validators.required],
    });
  }

  createvatForAccrualsPerSupForm(): FormGroup {
    return this.fb.group({
      supplier: ["", Validators.required],
      fromDate: ["", Validators.required],
      toDate: ["", Validators.required],
      type: ["PDF"],
      //status: ["Pending"],
    });
  }

  generatevatPaidReport() {
    this.loading = true;
    let type = this.vatPaidForm.value.type;
    let supplier = this.vatPaidForm.value.supplier;
    let fromDate = this.datepipe.transform(
      this.vatPaidForm.value.fromDate,
      "YYYY-MM-dd"
    );
    let toDate = this.datepipe.transform(
      this.vatPaidForm.value.toDate,
      "YYYY-MM-dd"
    );
    let transactiontype = this.vatPaidForm.value.transactionMode;

    const params = new HttpParams()
    .set("transactiontype", transactiontype)
      .set("supplier_id", supplier)
      .set("fromDate", fromDate)
      .set("toDate", toDate);

    if (type == "PDF") {
      this.subscription = this.reportsService
        .generateVatPaidPdfReport(params)
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
            a.download = "VatWHPaidPdfReport.pdf";
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
        .generateVatPaidExcelReport(params)
        .subscribe(
          (response) => {
            const a = document.createElement('a');
            document.body.appendChild(a);
            const blob: any = new Blob([response.data], { type: 'octet/stream' });
            const url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = "VatWHPaidExcelReport.xlsx"
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

  generatevatRecievedReport() {
    this.loading = true;
    let type = this.vatRecievedForm.value.type;
    let customer = this.vatRecievedForm.value.customer;
    let fromDate = this.datepipe.transform(
      this.vatRecievedForm.value.fromDate,
      "YYYY-MM-dd"
    );
    let toDate = this.datepipe.transform(
      this.vatRecievedForm.value.toDate,
      "YYYY-MM-dd"
    );

    const params = new HttpParams()
      // .set("format", type)
      .set("customer", customer)
      .set("fromDate", fromDate)
      .set("toDate", toDate);

    if (type == "PDF") {
      this.subscription = this.reportsService
        .generateVatRecievedPdfReport(params)
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
            a.download = "VatWHRecievedPdfReport.pdf";
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
        .generateVatRecievedExcelReport(params)
        .subscribe(
          (buffer) => {
            const data: Blob = new Blob([buffer], {
              type: "text/EXCEL;charset=utf-8",
            });
            // you may improve this code to customize the name
            // of the export based on date or some other factors
            saveAs(data, "VatWHRecievedExcelReport.EXCEL");
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

  onNoClick(): void {
    this.dialogRef.close();
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

  generateGeneralVatReport() {
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
    let transactiontype = this.generalForm.value.transactionMode;

    const params = new HttpParams()
      .set("transactiontype", transactiontype)
      .set("fromDate", fromDate)
      .set("toDate", toDate);

    if (this.generalForm.value.class == "Vat WH paid") {
      if (type == "PDF") {
        this.subscription = this.reportsService
          .generateGeneralVatPaidPdfReport(params)
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
              a.download = "GeneralVatWHPaidPdfReport.pdf";
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
          .generateGeneralVatPaidExcelReport(params)
          .subscribe(
            (response) => {

              const a = document.createElement('a');
              document.body.appendChild(a);
              const blob: any = new Blob([response.data], { type: 'octet/stream' });
              const url = window.URL.createObjectURL(blob);
              a.href = url;
              a.download = "GeneralVatWHPaidExcelReport.xlsx"
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
    } else if (this.generalForm.value.class == "Vat WH on local deliverables") {
      const params = new HttpParams()
        .set("transactiontype", transactiontype)
        .set("product_Type", "Local")
        .set("fromDate", fromDate)
        .set("toDate", toDate);

      if (type == "PDF") {
        this.subscription = this.reportsService
          .generateGeneralVatLocalPdfReport(params)
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
              a.download = "GeneralVatWHLocalPdfReport.pdf";
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
          .generateGeneralVatLocalExcelReport(params)
          .subscribe(
            (response) => {
              const a = document.createElement('a');
              document.body.appendChild(a);
              const blob: any = new Blob([response.data], { type: 'octet/stream' });
              const url = window.URL.createObjectURL(blob);
              a.href = url;
              a.download = "GeneralVatWHLocalExcelReport.xlsx"
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
    } else if (
      this.generalForm.value.class == "Vat WH on imported deliverables"
    ) {
      const params = new HttpParams()
        .set("transactiontype", transactiontype)
        .set("product_Type", "Import")
        .set("fromDate", fromDate)
        .set("toDate", toDate);
      console.log("params = ", params.toString());
      if (type == "PDF") {
        this.subscription = this.reportsService
          .generateGeneralVatImportsPdfReport(params)
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
              a.download = "GeneralVatWHImportsPdfReport.pdf";
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
          .generateGeneralVatImportsExcelReport(params)
          .subscribe(
            (response) => {
              const a = document.createElement('a');
              document.body.appendChild(a);
              const blob: any = new Blob([response.data], { type: 'octet/stream' });
              const url = window.URL.createObjectURL(blob);
              a.href = url;
              a.download = "GeneralVatWHImportsExcelReport.xlsx"
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
