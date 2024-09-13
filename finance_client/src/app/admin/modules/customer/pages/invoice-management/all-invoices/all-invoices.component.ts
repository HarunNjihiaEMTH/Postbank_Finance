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
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { InvoiceService } from "src/app/user/data/services/customer/invoice.service";
import { Invoice } from "src/app/user/data/types/customer-types/invoice";
import { DeleteInvoiceComponent } from "../delete-invoice/delete-invoice.component";
import { InvoiceStatusComponent } from "../invoice-status/invoice-status.component";

@Component({
  selector: "app-all-invoices",
  templateUrl: "./all-invoices.component.html",
  styleUrls: ["./all-invoices.component.sass"],
})
export class AllInvoicesComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = [
    "id",
    "invoiceNo",
    "antifakeCode",
    "invoiceKind",
    "invoiceParticulars",
    "status",
    "postedBy",
    "postedTime",
    "actions",
  ];
  invoices: Invoice[] = [];

  dataSource!: MatTableDataSource<Invoice>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  selection = new SelectionModel<Invoice>(true, []);
  data: any;
  error: any;
  isLoading: boolean = true;
  currentUserRole: any;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private snackbar: SnackbarService,
    private invoiceService: InvoiceService,
    private tokenService: TokenStorageService
  ) {
    super();
  }

  ngOnInit(): void {
    this.currentUserRole = this.tokenService.getUser().roles[0];
    console.log("role=", this.currentUserRole);
    this.getInvoices();
  }

  refresh() {
    this.getInvoices();
  }

  getInvoices() {
    this.invoiceService
      .getAllInvoices()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (result) => {
          this.invoices = result;

          if (this.invoices) {
            this.dataSource = new MatTableDataSource<Invoice>(
              this.invoices.reverse()
            );
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

  navigateToInvoiceDetails(invoice) {
    this.router.navigate(
      ["/admin/customer/invoices-management/invoice-details"],
      {
        state: {
          invoice: JSON.stringify(invoice),
          action: "Navigation From All Invoices",
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
    this.router.navigate(
      ["/admin/customer/invoices-management/update-invoice"],
      {
        state: {
          invoice: JSON.stringify(invoice),
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
  updateStatus(row) {
    if (this.currentUserRole == "ROLE_ADMIN") {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "500px";
      dialogConfig.data = {
        data: row,
      };
      const dialogRef = this.dialog.open(InvoiceStatusComponent, dialogConfig);

      dialogRef.afterClosed().subscribe((result) => {
        this.getInvoices();
      });
    } else {
      this.snackbar.showNotification("snackbar-danger", "Access denied!!");
    }
  }
}
