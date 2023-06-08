import { SelectionModel } from "@angular/cdk/collections";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { takeUntil } from "rxjs";
import { AccessControlService } from "src/app/admin/data/services/_AccessControlService.service";
import { TokenCookieService } from "src/app/core/service/token-storage-cookies.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SupplierService } from "src/app/user/data/services/supplier.service";
import { Supplier } from "src/app/user/data/types/supplier";
import { DeleteSupplierComponent } from "../delete-supplier/delete-supplier.component";
import { UpdateSupplierComponent } from "../update-supplier/update-supplier.component";
import { ViewSupplierDetailsComponent } from "../view-supplier-details/view-supplier-details.component";
import { SupplierStatusComponent } from "./dialogs/supplier-status/supplier-status.component";

@Component({
  selector: "app-all-suppliers",
  templateUrl: "./all-suppliers.component.html",
  styleUrls: ["./all-suppliers.component.sass"],
})
export class AllSuppliersComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = [
    "id",
    "supplierName",
    "supplierNumber",
    //"supplierAddress",
    // "supplierContact",
    "supplierServices",
    "supplierBank",
    //"supplierAccount",
    "status",
    "postedBy",
    "postedTime",
    "assignPO",
    "actions",
  ];
  suppliers: Supplier[] = [];

  dataSource!: MatTableDataSource<Supplier>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  selection = new SelectionModel<Supplier>(true, []);
  data: any;
  error: any;
  isLoading: boolean = true;
  currentUser: any;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private supplierService: SupplierService,
    private tokenCookieService: TokenCookieService,
    private accessControlService: AccessControlService
  ) {
    super();
  }

  ngOnInit(): void {
    this.currentUser = this.tokenCookieService.getUser().username;

    this.getSuppliers();
  }

  refresh() {
    this.getSuppliers();
  }

  addSupplier() {
    this.router.navigate(["/admin/supplier/suppliers-management/add-supplier"]);
  }

  getSuppliers() {
    this.supplierService
      .getSuppliers()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.suppliers = res;

          console.log("Suppliers", this.suppliers);

          if (this.suppliers) {
            this.isLoading = false;

            this.dataSource = new MatTableDataSource<Supplier>(this.suppliers);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  hasAccess: boolean;
  updateSupplierCall(supplier) {
    this.hasAccess = this.accessControlService.hasPrivilege([
      "Update Suppliers",
    ]);
    if (this.hasAccess) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "500px";
      dialogConfig.data = {
        data: supplier,
      };

      const dialogRef = this.dialog.open(UpdateSupplierComponent, dialogConfig);

      dialogRef.afterClosed().subscribe((result) => {
        this.getSuppliers();
      });
    }
  }

  deleteSupplierCall(supplier) {
    this.hasAccess = this.accessControlService.hasPrivilege([
      "Delete Suppliers",
    ]);
    if (this.hasAccess) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "500px";
      dialogConfig.data = {
        data: supplier,
      };

      const dialogRef = this.dialog.open(DeleteSupplierComponent, dialogConfig);

      dialogRef.afterClosed().subscribe((result) => {
        this.getSuppliers();
      });
    }
  }
  viewSupplierDetailsCall(supplier) {
    this.hasAccess = this.accessControlService.hasPrivilege([
      "View Suppliers",
    ]);
    if (this.hasAccess) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "500px";
      dialogConfig.data = {
        data: supplier,
      };
      this.dialog.open(ViewSupplierDetailsComponent, dialogConfig);
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onContextMenu(event: MouseEvent, item: Supplier) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }

  updateStatus(row) {
    this.hasAccess = this.accessControlService.hasPrivilege([
      "Validate Suppliers",
    ]);
    if (this.hasAccess) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "500px";
      dialogConfig.data = {
        data: row,
      };
      const dialogRef = this.dialog.open(SupplierStatusComponent, dialogConfig);

      dialogRef.afterClosed().subscribe((result) => {
        this.getSuppliers();
      });
    }
  }

  assignPO(supplier) {
    this.router.navigate(
      ["/admin/supplier/purchase-orders-management/create-purchase-order"],
      {
        state: {
          supplierDetails: JSON.stringify(supplier),
          action: "Assign customer PO",
        },
      }
    );
  }
  paySupplier(supplier) {
    this.router.navigate(
      ["/admin/transfer-transactions/post-direct-transaction"],
      // ["/admin/bills/payment-confirmation-no-po"],
      {
        state: {
          supplierDetails: JSON.stringify(supplier),
          action: "Pay supplier",
        },
      }
    );
  }
}
