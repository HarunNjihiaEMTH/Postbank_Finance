import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { takeUntil } from "rxjs";
import { ActivePosService } from "src/app/admin/data/services/activepos.service";
import { CreatePurchaseOrderComponent } from "src/app/admin/modules/supplier/pages/purchase-orders-management/create-purchase-order/create-purchase-order.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { ExpenseService } from "src/app/user/data/services/expense.service";
import { TaxesService } from "src/app/user/data/services/taxes.service";
import { Expense } from "src/app/user/data/types/expense";
import { Tax } from "src/app/user/data/types/tax";
import { ActivePoDetailsComponent } from "../../active-po-details.component";

@Component({
  selector: "app-update-po",
  templateUrl: "./update-po.component.html",
  styleUrls: ["./update-po.component.sass"],
})
export class UpdatePoComponent implements OnInit {
  orderItemForm: FormGroup;
  taxes: Tax[] = [];
  expenses: Expense[] = [];
  statuses: string[] = ["Partial", "Complete"];
  orderItemTypes: string[] = ["Service", "Product"];
  orderItemTypeSelected: boolean = false;
  orderItemIsService: boolean = false;
  orderItemIsProduct: boolean = false;
  vatWitholdingRate: number;
  incomeWitholdingRate: number;

  constructor(
    public dialogRef: MatDialogRef<ActivePoDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private activePoService: ActivePosService,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    console.log("Item: ", this.data.item);
    console.log("Array: ", this.data.array);

    this.orderItemForm = this.createOrderItemForm();

    //this.selectorderItemType(this.data.item);
  }

  createOrderItemForm() {
    return this.fb.group({
      id: [this.data.item.id],
      deliveryStatus: ["", [Validators.required]],
      orderItemType: [this.data.item.orderItemType],
      itemName: [this.data.item.itemName],
      itemQuantity: [this.data.item.itemQuantity, [Validators.required]],
      itemUnitPrice: [this.data.item.itemUnitPrice],
      itemTotalValue: [""],
      vatAmount: [""],
      vatWitholding: [""],
      amountTobepaid: [""],
      amountBalance: [""],
      remarks: [""],
      vatRate: [this.data.item.vatRate],
      vatWitholdingRate: [this.data.item.vatWitholdingRate],
      expenseId: [this.data.item.expenseId],
      purchaseOrder_id: [this.data.item.purchaseOrder_id],
    });
  }

  onSave() {
    console.log(this.orderItemForm.value);

    let withholdingAmount = 0;

    if (this.orderItemForm.controls.orderItemType.value == "Goods") {
      let unitPrice = this.data.item.itemUnitPrice;
      console.log(unitPrice);

      let quantity = this.orderItemForm.controls.itemQuantity.value;

      let totalPrice = Math.round(quantity * unitPrice);

      let vatTaxRate = 16;

      let vatAmount = Math.round((vatTaxRate / 100) * totalPrice);

      let totalAmountToBePaid = totalPrice + vatAmount;

      withholdingAmount = (this.vatWitholdingRate / 100) * totalPrice;

      let incomeTax = vatAmount - (this.vatWitholdingRate / 100) * totalPrice;

      this.orderItemForm.patchValue({
        itemTotalValue: totalPrice,
        vatAmount: vatAmount,
        amountTobepaid: totalAmountToBePaid,
        incomeTax: incomeTax,
        vatWitholding: withholdingAmount,
      });

      this.onSubmit();
    } else {
      withholdingAmount = 0;
    }
  }

  onSubmit() {
    this.activePoService.updateModifiable(this.orderItemForm.value).subscribe(
      (res) => {
        this.dialogRef.close();
        this.snackbar.showNotification(
          "snackbar-success",
          "Item details updated successfully!"
        );
      },
      (err) => {
        console.log(err);
        this.snackbar.showNotification("snackbar-success", err);
      }
    );
  }
}
