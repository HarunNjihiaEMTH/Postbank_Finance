import { SelectionModel } from "@angular/cdk/collections";
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
import { CustomerService } from "src/app/user/data/services/customer/customer.service";
import { Customer } from "src/app/user/data/types/customer-types/customer";
import { CustomerStatusComponent } from "../customer-status/customer-status.component";
import { DeleteCustomerComponent } from "../delete-customer/delete-customer.component";
import { ViewCustomerDetailsComponent } from "../view-customer-details/view-customer-details.component";

@Component({
  selector: "app-all-customers",
  templateUrl: "./all-customers.component.html",
  styleUrls: ["./all-customers.component.sass"],
})
export class AllCustomersComponent extends BaseComponent implements OnInit {
  customers: Customer[] = [];
  displayedColumns: string[] = [
    "id",
    "buyerLegalName",
    // "customerAccount",
    "buyerAddress",
    "buyerMobilePhone",
    "buyerPlaceOfBusi",
    //"postedBy",
    //"status",
    //"postedTime",
    "status",
    "createdAt",
    "assignInvoice",
    "actions",
  ];
  dataSource!: MatTableDataSource<Customer>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  selection = new SelectionModel<Customer>(true, []);
  data: any;
  error: any;
  isLoading: boolean = true;

  currentUserRole: any;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private customerService: CustomerService,
    private tokenService: TokenStorageService,
    private snackbar: SnackbarService
  ) {
    super();
  }

  ngOnInit(): void {
    this.currentUserRole = this.tokenService.getUser().roles[0];
    this.getCustomers();
  }

  refresh() {
    this.getCustomers();
  }

  getCustomers() {
    this.customerService
      .getAllCustomers()
      .pipe(takeUntil(this.subject))
      .subscribe((res) => {
        this.customers = res;

        if (this.customers) {
          this.isLoading = false;

          this.dataSource = new MatTableDataSource<Customer>(this.customers);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      }),
      (err) => {
        console.log(err);
      };
  }

  addCustomerCall() {
    this.router.navigate(["/admin/customer/customers-management/add-customer"]);
  }

  upateCustomerCall(customer) {
    this.router.navigate(
      ["/admin/customer/customers-management/update-customer"],
      {
        state: {
          customerDetails: JSON.stringify(customer),
        },
      }
    );
  }

  assignInvoice(customer) {
    if (customer.status != "Approved") {
      this.snackbar.showNotification(
        "snackbar-danger",
        "Invoice can only be assigned to a verified customer !"
      );
    } else {
      this.router.navigate(
        ["/admin/customer/invoices-management/generate-invoice"],
        {
          state: {
            customerDetails: JSON.stringify(customer),
            action: "Assign customer PO",
          },
        }
      );
    }
  }

  viewCustomerDetails(data) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      data: data,
    };
    this.dialog.open(ViewCustomerDetailsComponent, dialogConfig);
  }

  deleteCustomer(data) {
    const dialogRef = this.dialog.open(DeleteCustomerComponent, {
      width: "500px",
      data: {
        data: data,
        action: "Delete",
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getCustomers();
    });
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
      const dialogRef = this.dialog.open(CustomerStatusComponent, dialogConfig);

      dialogRef.afterClosed().subscribe((result) => {
        this.getCustomers();
      });
    } else {
      this.snackbar.showNotification("snackbar-danger", "Access denied!!");
    }
  }
}
