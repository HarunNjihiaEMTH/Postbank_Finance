import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { takeUntil } from "rxjs";
import { AllPurchaseOrdersComponent } from "src/app/admin/modules/supplier/pages/purchase-orders-management/all-purchase-orders/all-purchase-orders.component";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { PurchaseOrderService } from "src/app/user/data/services/purchase-order.service";
import { PurchaseOrder } from "src/app/user/data/types/purchase-order";

@Component({
  selector: "app-delete-purchase-order",
  templateUrl: "./delete-purchase-order.component.html",
  styleUrls: ["./delete-purchase-order.component.sass"],
})
export class DeletePurchaseOrderComponent extends BaseComponent implements OnInit {
  purchaseOrder: PurchaseOrder;
  purchaseOrderId: number;

  constructor(
    public dialogRef: MatDialogRef<AllPurchaseOrdersComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private purchaseOrderService: PurchaseOrderService
  ) {
    super()
  }

  ngOnInit(): void {
    this.purchaseOrder = this.data.data

    this.purchaseOrderId = this.purchaseOrder.id
  }

  confirmDelete() {
    this.purchaseOrderService
      .deletePurchaseOrder(this.purchaseOrderId)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.snackbar.showNotification(
            "snackbar-success",
            "Supplier deleted successfully !"
          );

          this.dialogRef.close();
        },
        (err) => {
          console.log(err);
        }
      );
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
