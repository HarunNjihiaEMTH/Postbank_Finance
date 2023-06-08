import { SelectionModel } from "@angular/cdk/collections";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { takeUntil } from "rxjs";
import { PurchaseOrderService } from "src/app/user/data/services/purchase-order.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { OrganisationService } from "src/app/user/data/services/organisation.service";
import { PurchaseOrderSessionService } from "src/app/user/data/services/purchase-order-session.service";
import { OrderItem } from "src/app/user/data/types/order-item";
import { Organisation } from "src/app/user/data/types/organisation";
import { PurchaseOrder } from "src/app/user/data/types/purchase-order";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { saveAs } from "file-saver";
import { HttpParams } from "@angular/common/http";

@Component({
  selector: "app-view-purchase-order-details",
  templateUrl: "./view-purchase-order-details.component.html",
  styleUrls: ["./view-purchase-order-details.component.sass"],
})
export class ViewPurchaseOrderDetailsComponent
  extends BaseComponent
  implements OnInit
{
  purchaseOrder: PurchaseOrder;
  orderItems: any[] = [];
  routeState: any;
  totalPrice: number;
  discount: number = 0;
  taxAmount: number[] = [];
  totalTaxAmount: number = 0;
  organisationDetails: Organisation;
  displayedColumns: string[] = [
    "id",
    "itemName",
    "itemQuantity",
    "itemUnitPrice",
    "itemTotalValue",
    "tax",
    "vatAmount",
    "whtRate",
    "whtAmount",
    "incomeTax",
    "amountTobepaid",
    "actions",
  ];

  dataSource!: MatTableDataSource<OrderItem>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };
  election = new SelectionModel<OrderItem>(true, []);
  data: any;
  error: any;
  isLoading: boolean = false;
  orderItemArray: any[] = [];
  orderItemDataSource: any;
  purchaseOrderId: any;
  disablePrintPO: boolean = true;

  constructor(
    private router: Router,
    private snackbar: SnackbarService,
    private purchaseOrderSession: PurchaseOrderSessionService,
    private organisationService: OrganisationService,
    private purchaseOrderService: PurchaseOrderService,
    private snackbarService: SnackbarService
  ) {
    super();

    if (this.router.getCurrentNavigation().extras.state) {
      this.routeState = this.router.getCurrentNavigation().extras.state;
      if (this.routeState) {
        this.purchaseOrder = this.routeState.purchaseOrderDetails
          ? JSON.parse(this.routeState.purchaseOrderDetails)
          : "";

        this.orderItems = this.purchaseOrder.poParticulars;

        this.orderItemDataSource = new MatTableDataSource(this.orderItems);
        this.orderItemDataSource.paginator = this.paginator;

        purchaseOrderSession.savePurchaseOrderDetails(this.purchaseOrder);

        console.log("Purchase Order ", this.purchaseOrder);
        console.log("Order Items", this.orderItems);
      }
    }
  }

  ngOnInit(): void {
    this.recoverPurchaseOrderDetailsOnReload();

    this.purchaseOrderId = this.purchaseOrder.id;

    if (this.purchaseOrderId) {
      this.disablePrintPO = false;
    }
    this.getOrganisationDetails();
  }

  recoverPurchaseOrderDetailsOnReload() {
    const recoveredPurchaseOrdeDetails = JSON.parse(
      this.purchaseOrderSession.getPurcahseOrderDetails()
    );

    if (recoveredPurchaseOrdeDetails) {
      this.purchaseOrder = recoveredPurchaseOrdeDetails;
      this.orderItems = this.purchaseOrder.poParticulars;
    }

    let sum = 0;

    this.orderItems.forEach((orderItem) => {
      sum = sum + orderItem.itemQuantity * orderItem.itemUnitPrice;

      this.totalPrice = Math.round(sum);

      this.taxAmount.push(
        orderItem.itemQuantity * orderItem.itemUnitPrice * (16 / 100)
      );
    });

    let taxSum = 0;

    this.taxAmount.forEach((tax) => {
      taxSum = taxSum + tax;

      this.totalTaxAmount = taxSum;
    });
  }

  getOrganisationDetails() {
    this.organisationService
      .getOrganisationDetails()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (results) => {
          this.organisationDetails = results[0];

          console.log(this.organisationDetails);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  navigateBackToCreatePurchaseOrderForm() {
    this.router.navigate(
      ["/admin/supplier/purchase-orders-management/create-purchase-order"],
      {
        state: {
          purchaseOrderDetails: JSON.stringify(this.purchaseOrder),
          action: "Navigation From PO Details"
        },
      }
    );
  }

  navigateToPurchaseOrders() {
    this.router.navigate(["/admin/supplier/purchase-orders-management/all"]);
  }

  downloadPurchaseOrder(po_number) {
    if (this.disablePrintPO) {
      this.snackbar.showNotification(
        "snackbar-danger",
        "You can only print a PO after it has been submitted !"
      );
    } else {
      const params = new HttpParams().set("po_number", po_number);

      this.purchaseOrderService
        .downloadGenaratedPurchaseOrder(params)
        .pipe(takeUntil(this.subject))
        .subscribe((result) => {
          let url = window.URL.createObjectURL(result.data);

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
  }
}
