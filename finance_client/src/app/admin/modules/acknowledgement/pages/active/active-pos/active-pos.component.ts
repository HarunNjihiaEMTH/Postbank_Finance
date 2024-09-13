import { SelectionModel } from "@angular/cdk/collections";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { ActivePosService } from "src/app/admin/data/services/activepos.service";
import { PurchaseOrderStatusComponent } from "src/app/admin/modules/supplier/pages/purchase-orders-management/all-purchase-orders/dialogs/purchase-order-status/purchase-order-status.component";

import { Category } from "src/app/user/data/types/category";
import { CancelPurchaseOrderComponent } from "../../dialogs/cancel-purchase-order/cancel-purchase-order.component";

@Component({
  selector: "app-active-pos",
  templateUrl: "./active-pos.component.html",
  styleUrls: ["./active-pos.component.sass"],
})
export class ActivePosComponent implements OnInit {
 
  displayedColumns: string[] = [
    "id",
    "poName",
    "poNumber",
    "poTotalAmount",
    "supplierName",
    "postedBy",
    "postedTime",
    "poStatus",
    "verifiedBy",
    "verifiedTime",
    "actions",
  ];
  dataSource!: MatTableDataSource<Category>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  selection = new SelectionModel<any>(true, []);
  data: any;
  error: any;
  isLoading: boolean = true;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private activePoService: ActivePosService
  ) {}

  ngOnInit(): void {
    this.getPurchaseOrders();
  }

  refresh() {
    this.getPurchaseOrders();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getPurchaseOrders() {
    this.activePoService.getActivePos().subscribe(
      (res) => {
        console.log(res);
        this.data = res;

        if (this.data) {
          this.isLoading = false;

          this.dataSource = new MatTableDataSource<any>(this.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  viewPoDetails(po) {
    // console.log("JSON Stringified", JSON.stringify(po));
    // console.log("NOT stringfied", po);

    this.router.navigate(
      ["/admin/acknowledgement/active-po-details"],
      {
        state: {
          poSelectedDetails: JSON.stringify(po),
        },
        skipLocationChange: true
      }
      
    );
  }

  updateStatus(row){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      action: 'cancel PO',
      data: row
    };
    const dialogRef = this.dialog.open(CancelPurchaseOrderComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getPurchaseOrders();
    });

  }
}
