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

import { SnackbarService } from "src/app/shared/services/snackbar.service";

import { ReportsService } from "src/app/admin/data/services/reports.service";
import { saveAs } from "file-saver";

import { SupplierService } from "src/app/user/data/services/supplier.service";
import { CustomerService } from "src/app/user/data/services/customer/customer.service";
import { IncomeWithholdingReportsComponent } from "../../income-withholding-reports.component";
import { ActiveBillsService } from "src/app/admin/data/services/activebills.service";
import { AccrualReportsService } from "src/app/admin/data/services/accrualreports.service";

@Component({
  selector: "app-income-params",
  templateUrl: "./income-params.component.html",
  styleUrls: ["./income-params.component.sass"],
})
export class IncomeParamsComponent implements OnInit {
  action: string;
  dialogTitle: string;

  generalForm: FormGroup;
  general: boolean = false;

  incomeWHPaidForm: FormGroup;
  incomeWHPaid: boolean = false;

  bankForm: FormGroup;
  bank: boolean = false;

  incomeWHRecievedForm: FormGroup;
  incomeWHRecieved: boolean = false;

  incomeForAccrualsForm: FormGroup;
  incomeForAccruals: boolean = false;

  incomeForAccrualsPerSupForm: FormGroup;
  incomeForAccrualsPerSup: boolean = false;

  classes = [
    { name: "Income WH paid" },
    // { name: "Income WH recieved" },
    { name: "Income WH on local deliverables" },
    { name: "Income WH on imported deliverables" },
  ];
  types = [{ name: "PDF" }, { name: "EXCEL" }];

  vatTypes = [{ name: "VAT withholding" }, { name: "Income withholding" }];

  accrualClasses = [
    { name: "Income WH on local deliverables (Accrual)" },
    { name: "Income WH on imported deliverables (Accrual)" },
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
    public dialogRef: MatDialogRef<IncomeWithholdingReportsComponent>,
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
    } else if (this.data.test == "paid I.W") {
      this.getSuppliers();
      this.title = this.data.test;
      this.incomeWHPaid = true;
      this.incomeWHPaidForm = this.createincomeWHPaidForm();
    } else if (this.data.test == "recieved I.W") {
      this.getCustomers();
      this.title = this.data.test;
      this.incomeWHRecieved = true;
      this.incomeWHRecievedForm = this.createincomeWHRecievedForm();
    }
    else if (this.data.test == "income wh for accruals") {
      this.title = this.data.test;
      this.incomeForAccruals = true;
      this.incomeForAccrualsForm = this.createincomeForAccrualsForm();
    } else if (this.data.test == "accrual per supplier (iwh)") {
      this.getAccrualSuppliers();
      this.title = this.data.test;
      this.incomeForAccrualsPerSup = true;
      this.incomeForAccrualsPerSupForm = this.createincomeForAccrualsPerSupForm();
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

  createincomeWHPaidForm(): FormGroup {
    return this.fb.group({
      supplier: ["", Validators.required],
      type: ["PDF"],
      fromDate: ["", Validators.required],
      toDate: ["", Validators.required],
      transactionMode: ["%", Validators.required],
    });
  }

  createincomeWHRecievedForm(): FormGroup {
    return this.fb.group({
      customer: ["", Validators.required],
      fromDate: ["", Validators.required],
      toDate: ["", Validators.required],
      type: ["PDF"],
    });
  }
  createincomeForAccrualsForm(): FormGroup {
    return this.fb.group({
      fromDate: ["", Validators.required],
      toDate: ["", Validators.required],
      type: ["PDF"],
      class: ["", Validators.required],
    });
  }

  createincomeForAccrualsPerSupForm(): FormGroup {
    return this.fb.group({
      supplier: ["", Validators.required],
      fromDate: ["", Validators.required],
      toDate: ["", Validators.required],
      type: ["PDF"],
      //status: ["Pending"],
    });
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

  generateincomeWHPaidReport() {
    this.loading = true;
    let type = this.incomeWHPaidForm.value.type;
    let supplier = this.incomeWHPaidForm.value.supplier;
    let fromDate = this.datepipe.transform(
      this.incomeWHPaidForm.value.fromDate,
      "YYYY-MM-dd"
    );
    let toDate = this.datepipe.transform(
      this.incomeWHPaidForm.value.toDate,
      "YYYY-MM-dd"
    );
    let transactiontype = this.incomeWHPaidForm.value.transactionMode;


    const params = new HttpParams()
      .set("transactiontype", transactiontype)
      .set("supplier_id", supplier)
      .set("fromDate", fromDate)
      .set("toDate", toDate);

    if (type == "PDF") {
      this.subscription = this.reportsService
        .generateIncomeWHPaidPdfReport(params)
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
            a.download = "IncomeWHPaidPdfReport.pdf";

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
        .generateIncomeWHPaidExcelReport(params)
        .subscribe(
          (response) => {
            const a = document.createElement('a');
            document.body.appendChild(a);
            const blob: any = new Blob([response.data], { type: 'octet/stream' });
            const url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = "IncomeWHPaidExcelReport.xlsx"
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

  generateincomeWHRecievedReport() {
    this.loading = true;
    let type = this.incomeWHRecievedForm.value.type;
    let customer = this.incomeWHRecievedForm.value.customer;
    let fromDate = this.datepipe.transform(
      this.incomeWHRecievedForm.value.fromDate,
      "YYYY-MM-dd"
    );
    let toDate = this.datepipe.transform(
      this.incomeWHRecievedForm.value.toDate,
      "YYYY-MM-dd"
    );

    const params = new HttpParams()
      // .set("format", type)
      .set("customer", customer)
      .set("fromDate", fromDate)
      .set("toDate", toDate);

    if (type == "PDF") {
      this.subscription = this.reportsService
        .generateIncomeWHRecievedPdfReport(params)
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
            a.download = "IncomeWHRecievedPdfReport.pdf";
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
        .generateIncomeWHRecievedExcelReport(params)
        .subscribe(
          (buffer) => {
            const data: Blob = new Blob([buffer], {
              type: "text/EXCEL;charset=utf-8",
            });
            // you may improve this code to customize the name
            // of the export based on date or some other factors
            saveAs(data, "IncomeWHRecievedExcelReport.EXCEL");
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

  generateGeneralIncomeReport() {
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

    if (this.generalForm.value.class == "Income WH paid") {
      if (type == "PDF") {
        this.subscription = this.reportsService
          .generateGeneralIncomeVatPaidPdfReport(params)
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
              a.download = "GeneralIncomeVatPaidPdfReport.pdf";
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
          .generateGeneralIncomeVatPaidExcelReport(params)
          .subscribe(
            (response) => {
              const a = document.createElement('a');
              document.body.appendChild(a);
              const blob: any = new Blob([response.data], { type: 'octet/stream' });
              const url = window.URL.createObjectURL(blob);
              a.href = url;
              a.download = "GeneralIncomeVatPaidExcelReport.xlsx"
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
    } else if (this.generalForm.value.class == "Income WH recieved") {
      if (type == "PDF") {
        this.subscription = this.reportsService
          .generateGeneralIncomeVatRecievedPdfReport(params)
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
              a.download = "GeneralIncomeVatRecievedPdfReport.pdf";
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

      } else {
        this.snackbar.showNotification("snackbar-danger", "Invalid file type!");
      }
    }
    else if (
      this.generalForm.value.class == "Income WH on local deliverables"
    ) {
      const params = new HttpParams()
        .set("transactiontype", transactiontype)
        .set("product_Type", "Local")
        .set("fromDate", fromDate)
        .set("toDate", toDate);

      if (type == "PDF") {
        this.subscription = this.reportsService
          .generateGeneralInVatLocalPdfReport(params)
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
              a.download = "GeneralInVatLocalPdfReport.pdf";
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
          .generateGeneralInVatLocalExcelReport(params)
          .subscribe(
            (response) => {
              const a = document.createElement('a');
              document.body.appendChild(a);
              const blob: any = new Blob([response.data], { type: 'octet/stream' });
              const url = window.URL.createObjectURL(blob);
              a.href = url;
              a.download = "GeneralInVatLocalExcelReport.xlsx"
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
      this.generalForm.value.class == "Income WH on imported deliverables"
    ) {
      const params = new HttpParams()
        .set("transactiontype", transactiontype)
        .set("product_Type", "Import")
        .set("fromDate", fromDate)
        .set("toDate", toDate);
      console.log("params = ", params.toString());
      if (type == "PDF") {
        this.subscription = this.reportsService
          .generateGeneralInVatImportsPdfReport(params)
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
              a.download = "GeneralInVatImportsPdfReport.pdf";
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
          .generateGeneralInVatImportsExcelReport(params)
          .subscribe(
            (response) => {
              const a = document.createElement('a');
              document.body.appendChild(a);
              const blob: any = new Blob([response.data], { type: 'octet/stream' });
              const url = window.URL.createObjectURL(blob);
              a.href = url;
              a.download = "GeneralInVatImportsExcelReport.xlsx"
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
