import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ItemService } from "src/app/user/data/services/customer/item.service";
import { StockCategoryService } from "src/app/user/data/services/customer/stock-category.service";
import { TaxesService } from "src/app/user/data/services/taxes.service";
import { InvoiceItem } from "src/app/user/data/types/customer-types/invoice-item";
import { Item } from "src/app/user/data/types/customer-types/item";
import { AddInvoiceComponent } from "../../add-invoice.component";

@Component({
  selector: "app-discount-invoice-items",
  templateUrl: "./discount-invoice-items.component.html",
  styleUrls: ["./discount-invoice-items.component.sass"],
})
export class DiscountInvoiceItemsComponent implements OnInit {
  items: Item[] = [];
  invoiceItem: InvoiceItem;
  discountItemForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddInvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private taxesService: TaxesService,
    private itemService: ItemService,
    private stockCategoryService: StockCategoryService
  ) {}

  ngOnInit(): void {
    this.discountItemForm = this.createDiscountItemForm();

    this.invoiceItem = this.data.data;

    if (this.invoiceItem) {
      this.discountItemForm.patchValue({
        total: this.invoiceItem.total,
        item: this.invoiceItem.item,
        unitOfMeasure: this.invoiceItem.unitOfMeasure,
        qty: this.invoiceItem.qty,
      });
    }

    console.log("Invoice item", this.invoiceItem);
  }

  createDiscountItemForm() {
    return this.fb.group({
      discountFlag: ["Y"],
      discountTaxRate: [0],
      discountTotal: [0],
      total: [0],
      item: [0],
      taxRate: [0],
      tax: [0],
      discountAmount: [0],
      unitOfMeasure: [0],
      qty: [0],
    });
  }

  addInvoiceItem() {
    let discountRate = this.discountItemForm.controls.discountTaxRate.value;

    let total = this.discountItemForm.controls.total.value;

    let discountTotal = (discountRate / 100) * total;

    let newTotal = total - discountTotal;

    this.discountItemForm.controls.discountTotal.setValue(discountTotal);

    this.discountItemForm.controls.total.setValue(newTotal);

    this.discountItemForm.controls.item.setValue(this.discountItemForm.controls.item.value + " (Discounted)");

    this.dialogRef.close({ event: "close", data: this.discountItemForm.value });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
