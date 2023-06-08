import { SelectionModel } from "@angular/cdk/collections";
import { HttpParams } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { takeUntil } from "rxjs";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { InvoiceService } from "src/app/user/data/services/customer/invoice.service";
import { Invoice } from "src/app/user/data/types/customer-types/invoice";
import { RecievePaymentComponent } from "../approved-invoices/recieve-payment/recieve-payment.component";
import { DeleteInvoiceComponent } from "../delete-invoice/delete-invoice.component";
import { VerifyInvoiceComponent } from "./dialogs/verify-invoice/verify-invoice.component";

@Component({
  selector: "app-pending-invoices",
  templateUrl: "./pending-invoices.component.html",
  styleUrls: ["./pending-invoices.component.sass"],
})
export class PendingInvoicesComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = [
    "id",
    "localInvoiceNo",
    "buyerCitizenship",
    "buyerLegalName",
    "buyerMobilePhone",
    "buyerPassportNum",
    "buyerSector",
    "buyerTin",
    "buyerType",
    "actions",
    "verify",
  ];
  invoices: any[] = [];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  selection = new SelectionModel<any>(true, []);
  data: any;
  error: any;
  isLoading: boolean = true;
  loading = false;
  retryPosting: boolean = false;
  postToUraFailed: boolean = false;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private snackbar: SnackbarService,
    private invoiceService: InvoiceService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getInvoices();
  }

  refresh() {
    this.getInvoices();
  }

  getInvoices() {
    this.invoiceService
      .fetchAllPendingInvoices()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (result) => {
          this.invoices = result.body;

          if (this.invoices.length > 0) {


            this.dataSource = new MatTableDataSource<Invoice>(this.invoices.reverse());
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
          this.isLoading = false;
          console.log(this.invoices);
        },
        (err) => {
          console.log(err);
          this.isLoading = false;
        }
      );
  }

  navigateToInvoiceDetails(invoiceno) {
    this.router.navigate(
      [`/admin/customer/invoices-management/invoice-information/${invoiceno}`],
      {
        state: {
          action: "Navigation From Pending Invoices",
        },
      }
    );
  }

  navigateToGenerateInvoice() {
    this.router.navigate([
      "/admin/customer/invoices-management/generate-invoice",
    ]);
  }

  updateInvoice(invoice) {

    console.log("invoice: ", invoice);

    this.router.navigate(
      ["/admin/customer/invoices-management/update-invoice"],
      {
        state: {
          invoice: JSON.stringify(invoice),
          action: "Update Invoice",
        },
      }
    );
  }

  deleteInvoice(invoice) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      data: invoice,
    };

    const dialogRef = this.dialog.open(DeleteInvoiceComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      this.getInvoices();
    });
  }

  verifyInvoice(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      data: row,
    };
    const dialogRef = this.dialog.open(VerifyInvoiceComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getInvoices();
    });

  }

  // updatePayStatus(row) {
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = false;
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.width = "500px";
  //   dialogConfig.data = {
  //     data: row,
  //   };
  //   const dialogRef = this.dialog.open(RecievePaymentComponent, dialogConfig);

  //   dialogRef.afterClosed().subscribe((result) => {
  //     this.getInvoices();
  //   });
  // }

  updatePayStatus(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      data: row,
    };
    const dialogRef = this.dialog.open(RecievePaymentComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getInvoices();
    });

    // dialogRef.componentInstance.dialogClosed.subscribe(() => {
    //   this.getInvoices();
    // });
  }

  downloadInvoice(invoice_no) {
    const params = new HttpParams().set("invoice_no", invoice_no);

    this.invoiceService
      .downloadGenaratedInvoice(params)
      .pipe(takeUntil(this.subject))
      .subscribe((result) => {
        let url = window.URL.createObjectURL(result.data);

        // if you want to open PDF in new tab
        window.open(url);

        let a = document.createElement("a");
        document.body.appendChild(a);
        a.setAttribute("style", "display: none");
        a.setAttribute("target", "blank");
        a.href = url;
        a.download = result.filename;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();

        this.snackbar.showNotification(
          "snackbar-success",
          "Purchase Order generated successfully"
        );
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onContextMenu(event: MouseEvent, item: Invoice) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}
