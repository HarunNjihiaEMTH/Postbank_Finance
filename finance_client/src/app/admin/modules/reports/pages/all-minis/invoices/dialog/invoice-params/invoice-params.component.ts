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
import { InvoicesComponent } from "../../invoices.component";
import { ReportsInvoiceService } from "src/app/admin/data/services/reportsInvoice.service";

@Component({
  selector: "app-invoice-params",
  templateUrl: "./invoice-params.component.html",
  styleUrls: ["./invoice-params.component.sass"],
})
export class InvoiceParamsComponent implements OnInit {
  action: string;
  dialogTitle: string;

  generalForm: FormGroup;
  general: boolean = false;

  supplierPaymentForm: FormGroup;
  supplierPayment: boolean = false;

  customerStatementForm: FormGroup;
  customerStatement: boolean = false;

  bankForm: FormGroup;
  bank: boolean = false;

  paymentRecievedForm: FormGroup;
  paymentRecieved: boolean = false;

  invoicesPerCustomerForm: FormGroup;
  invoicesPerCustomer: boolean = false;

  classes = [{ name: "Invoices Report" }, { name: "Credit Notes Report" }];
  types = [{ name: "PDF" }, { name: "EXCEL" }];

  statuses = [{ name: "Successful" }, { name: "Failed" }];

  invoiceTypes = [{ name: "Local" }, { name: "Import" }];

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

  constructor(
    private customerService: CustomerService,
    public dialogRef: MatDialogRef<InvoicesComponent>,
    private datepipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private reportsService: ReportsService,
    private snackbar: SnackbarService,
    private supplierService: SupplierService,
    private reportsInvoiceService: ReportsInvoiceService
  ) {}

  ngOnInit(): void {
    if (this.data.test == "general") {
      this.title = this.data.test;
      this.general = true;
      this.generalForm = this.createGeneralForm();
    } else if (this.data.test == "invoices per customer") {
      this.getCustomers();
      this.title = this.data.test;
      this.invoicesPerCustomer = true;
      this.invoicesPerCustomerForm = this.createInvoicesPerCustomerForm();
    }

    console.log("invoiceTypes = ", this.invoiceTypes);
  }

  createGeneralForm(): FormGroup {
    return this.fb.group({
      invoiceType: ["", Validators.required],
      type: ["", Validators.required],
      class: ["", Validators.required],
      fromDate: ["", Validators.required],
      toDate: ["", Validators.required],
      status: ["", Validators.required],
    });
  }

  createInvoicesPerCustomerForm(): FormGroup {
    return this.fb.group({
      customer: ["", Validators.required],
      fromDate: ["", Validators.required],
      toDate: ["", Validators.required],
      type: ["", Validators.required],
      status: ["", Validators.required],
      class: ["", Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  getClassification(event: any) {
    console.log("val: ", event.value);
    if (event.value == "Payments by status") {
      this.activateStatus = true;
    } else {
      this.activateStatus = false;
    }
  }
  getStatus(event: any) {
    console.log("val: ", event.value);
    if (event.value == "Payments by status") {
      this.activateStatus = true;
    } else {
      this.activateStatus = false;
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
      "yyyy-MM-ddTHH:mm:ss"
    );
    let toDate = this.datepipe.transform(
      this.generalForm.value.toDate,
      "yyyy-MM-ddTHH:mm:ss"
    );
    // let status = this.generalForm.value.status;

    const params = new HttpParams()
      // .set("status", status
      .set("invoiceType", this.generalForm.value.invoiceType)
      .set("fromDate", fromDate)
      .set("toDate", toDate);

      console.log("params: ", params)

    if (this.generalForm.value.class == "Invoices Report") {
      if (this.generalForm.value.status == "Successful") {
        if (type == "PDF") {
          this.subscription = this.reportsService
            .generateSuccessfulInvoicesPdfReport(params)
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
                a.download = "SuccessfulInvoicesPdfReport.pdf";
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
                const a = document.createElement("a");
                document.body.appendChild(a);
                const blob: any = new Blob([response.data], {
                  type: "octet/stream",
                });
                const url = window.URL.createObjectURL(blob);
                a.href = url;
                a.download = "SuccessfulInvoicesExcelReport.xlsx";
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
          this.snackbar.showNotification(
            "snackbar-danger",
            "Invalid file type!"
          );
        }
      } else if (this.generalForm.value.status == "Failed") {
        if (type == "PDF") {
          this.subscription = this.reportsService
            .generateFailedInvoicesPdfReport(params)
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
                a.download = "FailedInvoicesPdfReport.pdf";
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
            .generateFailedInvoicesExcelReport(params)
            .subscribe(
              (response) => {
                const a = document.createElement("a");
                document.body.appendChild(a);
                const blob: any = new Blob([response.data], {
                  type: "octet/stream",
                });
                const url = window.URL.createObjectURL(blob);
                a.href = url;
                a.download = "FailedInvoicesExcelReport.xlsx";
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
          this.snackbar.showNotification(
            "snackbar-danger",
            "Invalid file type!"
          );
        }
      }
    } else if (this.generalForm.value.class == "Credit Notes Report") {
      if (this.generalForm.value.status == "Successful") {
        if (type == "PDF") {
          this.subscription = this.reportsService
            .generateSuccessfulCreditNotesPdfReport(params)
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
                a.download = "SuccessfulCreditNotesPdfReport.pdf";
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
            .generateSuccessfulCreditNotesExcelReport(params)
            .subscribe(
              (response) => {
                const a = document.createElement("a");
                document.body.appendChild(a);
                const blob: any = new Blob([response.data], {
                  type: "octet/stream",
                });
                const url = window.URL.createObjectURL(blob);
                a.href = url;
                a.download = "SuccessfulCreditNotesExcelReport.xlsx";
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
          this.snackbar.showNotification(
            "snackbar-danger",
            "Invalid file type!"
          );
        }
      } else if (this.generalForm.value.status == "Failed") {
        if (type == "PDF") {
          this.subscription = this.reportsService
            .generateFailedCreditNotesPdfReport(params)
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
                a.download = "FailedCreditNotesPdfReport.pdf";
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
            .generateFailedCreditNotesExcelReport(params)
            .subscribe(
              (response) => {
                const a = document.createElement("a");
                document.body.appendChild(a);
                const blob: any = new Blob([response.data], {
                  type: "octet/stream",
                });
                const url = window.URL.createObjectURL(blob);
                a.href = url;
                a.download = "FailedCreditNotesExcelReport.xlsx";
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
          this.snackbar.showNotification(
            "snackbar-danger",
            "Invalid file type!"
          );
        }
      }
    } else {
      this.snackbar.showNotification("snackbar-danger", "Invalid file type!");
    }
  }

  generateInvoicePerCustomerReport() {
    this.loading = true;
    let type = this.invoicesPerCustomerForm.value.type;
    let customer = this.invoicesPerCustomerForm.value.customer.buyerTin;
    let fromDate = this.datepipe.transform(
      this.invoicesPerCustomerForm.value.fromDate,
      "yyyy-MM-ddTHH:mm:ss"
    );
    let toDate = this.datepipe.transform(
      this.invoicesPerCustomerForm.value.toDate,
      "yyyy-MM-ddTHH:mm:ss"
    );

    const params = new HttpParams()
      .set("customerid", customer)
      .set("fromDate", fromDate)
      .set("toDate", toDate);

    console.log("params: ", params);

    if (this.invoicesPerCustomerForm.value.class == "Invoices Report") {
      if (this.invoicesPerCustomerForm.value.status == "Successful") {
        if (type == "PDF") {
          this.subscription = this.reportsService
            .generateCustomerSuccessfulInvoicesPdfReport(params)
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
                a.download = "CustomerSuccessfulInvoicesPdfReport.pdf";
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
            .generateCustomerSuccessfulInvoicesExcelReport(params)
            .subscribe(
              (response) => {
                const a = document.createElement("a");
                document.body.appendChild(a);
                const blob: any = new Blob([response.data], {
                  type: "octet/stream",
                });
                const url = window.URL.createObjectURL(blob);
                a.href = url;
                a.download = "CustomerSuccessfulInvoicesExcelReport.xlsx";
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
          this.snackbar.showNotification(
            "snackbar-danger",
            "Invalid file type!"
          );
        }
      } else if (this.invoicesPerCustomerForm.value.status == "Failed") {
        if (type == "PDF") {
          this.subscription = this.reportsService
            .generateCustomerFailedInvoicesPdfReport(params)
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
                a.download = "CustomerFailedInvoicesPdfReport.pdf";
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
            .generateCustomerFailedInvoicesExcelReport(params)
            .subscribe(
              (response) => {
                const a = document.createElement("a");
                document.body.appendChild(a);
                const blob: any = new Blob([response.data], {
                  type: "octet/stream",
                });
                const url = window.URL.createObjectURL(blob);
                a.href = url;
                a.download = "CustomerFailedInvoicesExcelReport.xlsx";
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
          this.snackbar.showNotification(
            "snackbar-danger",
            "Invalid file type!"
          );
        }
      }
    } else if (
      this.invoicesPerCustomerForm.value.class == "Credit Notes Report"
    ) {
      if (this.invoicesPerCustomerForm.value.status == "Successful") {
        if (type == "PDF") {
          this.subscription = this.reportsService
            .generateCustomerSuccessfulCreditNotesPdfReport(params)
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
                a.download = "CustomerSuccessfulCreditNotesPdfReport.pdf";
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
            .generateCustomerSuccessfulCreditNotesExcelReport(params)
            .subscribe(
              (response) => {
                const a = document.createElement("a");
                document.body.appendChild(a);
                const blob: any = new Blob([response.data], {
                  type: "octet/stream",
                });
                const url = window.URL.createObjectURL(blob);
                a.href = url;
                a.download = "CustomerSuccessfulCreditNotesExcelReport.xlsx";
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
          this.snackbar.showNotification(
            "snackbar-danger",
            "Invalid file type!"
          );
        }
      } else if (this.invoicesPerCustomerForm.value.status == "Failed") {
        if (type == "PDF") {
          this.subscription = this.reportsService
            .generateCustomerFailedCreditNotesPdfReport(params)
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
                a.download = "CustomerFailedCreditNotesPdfReport.pdf";
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
            .generateCustomerFailedCreditNotesExcelReport(params)
            .subscribe(
              (response) => {
                const a = document.createElement("a");
                document.body.appendChild(a);
                const blob: any = new Blob([response.data], {
                  type: "octet/stream",
                });
                const url = window.URL.createObjectURL(blob);
                a.href = url;
                a.download = "CustomerFailedCreditNotesExcelReport.xlsx";
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
          this.snackbar.showNotification(
            "snackbar-danger",
            "Invalid file type!"
          );
        }
      }
    } else {
      this.snackbar.showNotification("snackbar-danger", "Invalid file type!");
    }
  }
}
