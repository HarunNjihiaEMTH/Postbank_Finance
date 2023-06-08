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
import { AccessControlService } from "src/app/admin/data/services/_AccessControlService.service";
import { TokenCookieService } from "src/app/core/service/token-storage-cookies.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { PurchaseOrderService } from "src/app/user/data/services/purchase-order.service";
import { PurchaseOrder } from "src/app/user/data/types/purchase-order";
import Swal from "sweetalert2";
import { DeletePurchaseOrderComponent } from "../delete-purchase-order/delete-purchase-order.component";
import { PurchaseOrderStatusComponent } from "./dialogs/purchase-order-status/purchase-order-status.component";
import { SendPurchaseOrderComponent } from "./dialogs/send-purchase-order/send-purchase-order.component";

@Component({
  selector: "app-all-purchase-orders",
  templateUrl: "./all-purchase-orders.component.html",
  styleUrls: ["./all-purchase-orders.component.sass"],
})
export class AllPurchaseOrdersComponent
  extends BaseComponent
  implements OnInit {
  displayedColumns: string[] = [
    "id",
    "poName",
    "poNumber",
    "supplierName",
    "supplierAddress",
    "poParticulars",
    "poTotalAmount",
    "poStatus",
    "createdAt",
    //"sendPO",
    "actions",
  ];
  purchaseOrders: PurchaseOrder[] = [];

  dataSource!: MatTableDataSource<PurchaseOrder>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  selection = new SelectionModel<PurchaseOrder>(true, []);
  data: any;
  error: any;
  isLoading: boolean = true;
  currentUser: any;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private snackbar: SnackbarService,
    private purchaseOrderService: PurchaseOrderService,
    private tokenCookieService: TokenCookieService,
    private accessControlService: AccessControlService
  ) {
    super();
  }

  ngOnInit(): void {
    this.currentUser = this.tokenCookieService.getUser().username;

    this.getPurchaseOrders();
  }

  refresh() {
    this.getPurchaseOrders();
  }

  getPurchaseOrders() {
    this.purchaseOrderService
      .getAllPurchaseOrders()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.purchaseOrders = res;

          console.log(res);
          this.purchaseOrders = res;

          if (this.purchaseOrders) {
            this.isLoading = false;

            this.dataSource = new MatTableDataSource<PurchaseOrder>(
              this.purchaseOrders
            );
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }

          console.log(this.purchaseOrders);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  sendPurchaseOrder(purchaseOrder: PurchaseOrder) {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to unfollow this user?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Send PO!",
    }).then((result) => {
      if (result.isConfirmed) {
        purchaseOrder.isSent = true;

        console.log("Purchase Order", purchaseOrder);
        this.purchaseOrderService
          .updatePurchaseOrder(purchaseOrder)
          .pipe(takeUntil(this.subject))
          .subscribe(
            (res) => {
              this.snackbar.showNotification(
                "snackbar-success",
                "Purchase order sent successfully !"
              );
              console.log(res);
            },
            (err) => {
              console.log(err);
            }
          );
        // Swal.fire("Unfollowed!", "User has been unfollowed.", "success");
      }
    });
  }


  navigateToCreatePurchaseOrder() {
    this.router.navigate([
      "/admin/supplier/purchase-orders-management/create-purchase-order",
    ]);
  }

  updatePurchaseOrder(purchaseOrder) {
    this.router.navigate(
      ["/admin/supplier/purchase-orders-management/update-purchase-order"],
      {
        state: {
          purchaseOrderDetails: JSON.stringify(purchaseOrder),
        },
      }
    );
  }

  navigateToPurchaseOrderDetails(purchaseOrder) {
    this.router.navigate(
      ["/admin/supplier/purchase-orders-management/purchase-order-details"],
      {
        state: {
          purchaseOrderDetails: JSON.stringify(purchaseOrder),
        },
      }
    );
  }

  hasAccess: boolean;
  deletePurchaseOrderCall(purchaseOrder) {
    this.hasAccess = this.accessControlService.hasPrivilege(["Delete PurchaseOrders"]);
    if (this.hasAccess) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "500px";
      dialogConfig.data = {
        data: purchaseOrder,
      };

      const dialogRef = this.dialog.open(DeletePurchaseOrderComponent, dialogConfig);

      dialogRef.afterClosed().subscribe((result) => {
        this.getPurchaseOrders();
      });
    }
  }

  sendPurchaseOrderCall(purchaseOrder) {
    this.hasAccess = this.accessControlService.hasPrivilege(["Add PurchaseOrders"]);
    if (this.hasAccess) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      data: purchaseOrder,
    };


    const dialogRef = this.dialog.open(SendPurchaseOrderComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getPurchaseOrders();
    });
  }}

  downloadPurchaseOrder(po_number) {
    this.hasAccess = this.accessControlService.hasPrivilege(["View PurchaseOrders"]);
    if (this.hasAccess) {
    const params = new HttpParams().set("po_number", po_number);

    this.purchaseOrderService.downloadGenaratedPurchaseOrder(params).pipe(takeUntil(this.subject)).subscribe(result => {
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
    })
  }}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onContextMenu(event: MouseEvent, item: PurchaseOrder) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
  updateStatus(row) {
    this.hasAccess = this.accessControlService.hasPrivilege(["Validate PurchaseOrders"]);
    if (this.hasAccess) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      data: row
    };
    const dialogRef = this.dialog.open(PurchaseOrderStatusComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getPurchaseOrders();
    });

  }}
}
