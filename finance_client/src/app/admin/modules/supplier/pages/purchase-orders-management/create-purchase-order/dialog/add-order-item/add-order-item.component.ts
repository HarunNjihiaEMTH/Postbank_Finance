import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { takeUntil } from "rxjs";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { ExpenseService } from "src/app/user/data/services/expense.service";
import { TaxesService } from "src/app/user/data/services/taxes.service";
import { Expense } from "src/app/user/data/types/expense";
import { OrderItem } from "src/app/user/data/types/order-item";
import { Tax } from "src/app/user/data/types/tax";
import { CreatePurchaseOrderComponent } from "../../create-purchase-order.component";

@Component({
  selector: "app-add-order-item",
  templateUrl: "./add-order-item.component.html",
  styleUrls: ["./add-order-item.component.sass"],
})
export class AddOrderItemComponent extends BaseComponent implements OnInit {
  orderItemForm: FormGroup;
  taxes: Tax[] = [];
  expenses: Expense[] = [];
  orderItemTypes: string[] = ["Service", "Goods"];
  orderItemTypeSelected: boolean = false;
  orderItemIsService: boolean = false;
  orderItemIsProduct: boolean = false;
  vatWitholdingRate: number;
  incomeWitholdingRate: number;
  orderItem: any;
  supplierService: string;
  newOrderItem: boolean = true;
  income_w_id: number;
  vat_w_id: number;
  vat_id: number;
  supplierForBothGoodsAndServices: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CreatePurchaseOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private taxesService: TaxesService,
    private expenseService: ExpenseService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getTaxes();

    this.getExpenses();

    this.orderItem = this.data.data;

    console.log(this.orderItem);

    this.orderItemForm = this.createOrderItemForm();

    if (this.data.action == "Add") {
      this.newOrderItem = true;
      if (this.data.supplierType == "Services") {
        this.orderItemTypeSelected = true;
        this.orderItemIsService = true;

        this.orderItemForm.patchValue({
          orderItemType: "Service",
        });
      } else if (this.data.supplierType == "Goods") {
        this.orderItemTypeSelected = true;
        this.orderItemIsProduct = true;

        this.orderItemForm.patchValue({
          orderItemType: "Goods",
        });
      } else {
        this.orderItemTypeSelected = false;
        this.supplierForBothGoodsAndServices = true;
      }
    } else if (this.data.action == "Update") {
      this.newOrderItem = false;
      if (this.data.supplierType == "Services") {
        this.orderItemTypeSelected = true;
        this.orderItemIsService = true;

        this.orderItemForm.patchValue({
          id: this.orderItem.id,
          orderItemType: this.orderItem.orderItemType,
          tax: parseInt(this.orderItem.vatRate),
          expenseId: parseInt(this.orderItem.expenseId),
          serviceName: this.orderItem.serviceName,
          servicePrice: this.orderItem.servicePrice,
        });
      } else if (this.data.supplierType == "Goods") {
        this.orderItemTypeSelected = true;
        this.orderItemIsProduct = true;

        this.orderItemForm.patchValue({
          id: this.orderItem.id,
          orderItemType: this.orderItem.orderItemType,
          tax: parseInt(this.orderItem.vatRate),
          expenseId: parseInt(this.orderItem.expenseId),
          itemQuantity: this.orderItem.itemQuantity,
          itemUnitPrice: this.orderItem.itemUnitPrice,
          itemName: this.orderItem.itemName,
        });
      } else {
        if (this.orderItem.orderItemType == "Service") {
          this.orderItemTypeSelected = true;

          this.orderItemIsService = true;

          this.orderItemForm.patchValue({
            id: this.orderItem.id,
            orderItemType: this.orderItem.orderItemType,
            tax: parseInt(this.orderItem.vatRate),
            expenseId: parseInt(this.orderItem.expenseId),
            serviceName: this.orderItem.serviceName,
            servicePrice: this.orderItem.servicePrice,
          });
        } else if (this.orderItem.orderItemType == "Goods") {
          this.orderItemTypeSelected = true;
          this.orderItemIsProduct = true;

          this.orderItemForm.patchValue({
            id: this.orderItem.id,
            orderItemType: this.orderItem.orderItemType,
            tax: parseInt(this.orderItem.vatRate),
            expenseId: parseInt(this.orderItem.expenseId),
            itemQuantity: this.orderItem.itemQuantity,
            itemUnitPrice: this.orderItem.itemUnitPrice,
            itemName: this.orderItem.itemTotalValue,
          });
        } else {
          this.orderItemTypeSelected = false;
          this.supplierForBothGoodsAndServices = true;
        }
      }
    }

    console.log("Order Item", this.orderItem);
  }

  createOrderItemForm() {
    return this.fb.group({
      orderItemType: ["", [Validators.required]],
      //id: [""],
      tax: [""],
      itemName: [""],
      itemQuantity: [""],
      itemUnitPrice: [""],
      expenseId: [""],
      serviceName: [""],
      servicePrice: [""],
      itemTotalValue: [this.orderItem.itemTotalValue],
      vatAmount: [this.orderItem.vatAmount],
      witholdingRate: [this.orderItem.witholdingRate],
      incomeTaxRate: [this.orderItem.incomeTaxRate],
      incomeTax: [this.orderItem.incomeTax],
      incomeWithholdingamount: [this.orderItem.incomeWithholdingamount],
      vatWitholding: [this.orderItem.vatWitholding],
      amountTobepaid: [this.orderItem.amountTobepaid],
      amountBalance: [this.orderItem.amountBalance],
      remarks: [this.orderItem.remarks],
      vat_id: [this.orderItem.vat_id],
      vat_w_id: [this.orderItem.vat_w_id],
      income_w_id: [this.orderItem.income_w_id],
      vatRate: [this.orderItem.vatRate],
      deliveryStatus: [this.orderItem.deliveryStatus],
      invoiceNo: [this.orderItem.invoiceNo],
      purchaseOrder_id: [""],
      isPaid: [this.orderItem.isPaid],
      deliveries: [this.orderItem.deliveries],
    });
  }

  selectorderItemType(event: any) {
    if (event.value == "Service") {
      this.orderItemTypeSelected = true;
      this.orderItemIsProduct = false;
      this.orderItemIsService = true;
    } else if (event.value == "Goods") {
      this.orderItemTypeSelected = true;
      this.orderItemIsProduct = true;
      this.orderItemIsService = false;
    } else {
      this.orderItemTypeSelected = false;
    }
  }

  getTaxes() {
    this.taxesService
      .fetchTaxParameters()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (result) => {
          this.taxes = result;

          this.taxes.forEach((tax) => {
            if (tax.taxName == "VAT") {
              this.vat_id = tax.id;
            }
            if (tax.taxName == "VAT withholding") {
              this.vatWitholdingRate = tax.taxValue;
              this.vat_w_id = tax.id;
            }

            if (tax.taxName == "Income withholding") {
              this.incomeWitholdingRate = tax.taxValue;
              this.income_w_id = tax.id;
            }
          });
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getExpenses() {
    this.expenseService
      .getExpenses()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (result) => {
          this.expenses = result;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  onSave() {
    console.log(this.orderItemForm.value);

    let withholdingAmount = 0;

    if (this.orderItemForm.controls.orderItemType.value == "Goods") {
      let unitPrice = this.orderItemForm.controls.itemUnitPrice.value;

      console.log(unitPrice);

      let quantity = this.orderItemForm.controls.itemQuantity.value;

      let totalPrice = Math.round(quantity * unitPrice);

      let vatTaxRate = this.orderItemForm.controls.tax.value;

      let vatAmount = Math.round((vatTaxRate / 100) * totalPrice);

      let totalAmountToBePaid = totalPrice + vatAmount;

      withholdingAmount = (this.vatWitholdingRate / 100) * totalPrice;

      let incomeTax = vatAmount - (this.vatWitholdingRate / 100) * totalPrice;

      this.orderItemForm.controls.witholdingRate.setValue(
        this.vatWitholdingRate
      );

      this.orderItemForm.controls.vat_w_id.setValue(this.vat_w_id);

      this.orderItemForm.controls.vatWitholding.setValue(withholdingAmount);

      this.orderItemForm.controls.vatRate.setValue(vatTaxRate);

      this.orderItemForm.controls.vatAmount.setValue(vatAmount);

      this.orderItemForm.controls.vat_id.setValue(this.vat_id);

      this.orderItemForm.controls.itemTotalValue.setValue(totalPrice);

      this.orderItemForm.controls.amountTobepaid.setValue(totalAmountToBePaid);

      this.orderItemForm.controls.incomeTax.setValue(incomeTax);
    } else if (this.orderItemForm.controls.orderItemType.value == "Service") {
      let serviceVatTaxRate = this.orderItemForm.controls.tax.value;

      let serviceTotalPrice = this.orderItemForm.controls.servicePrice.value;

      let serviceVatAmount = (serviceVatTaxRate / 100) * serviceTotalPrice;

      let serviceWitholding =
        (this.vatWitholdingRate / 100) * serviceTotalPrice;

      let serviceIncomeWitholdingAmount =
        (this.incomeWitholdingRate / 100) * serviceTotalPrice;

      let serviceTotalTaxAmount =
        serviceWitholding + serviceIncomeWitholdingAmount;

      let serviceTotalCost = serviceVatAmount + serviceTotalPrice;

      let incomeTax = serviceVatAmount - serviceTotalTaxAmount;

      let itemQuantity = 0;

      let itemName = this.orderItemForm.controls.serviceName.value;

      console.log("SERVICE VAT", serviceVatAmount);

      console.log("TOTAL TAX", serviceTotalTaxAmount);

      this.orderItemForm.controls.vatRate.setValue(parseInt(serviceVatTaxRate));

      this.orderItemForm.controls.vatAmount.setValue(serviceVatAmount);

      this.orderItemForm.controls.vat_id.setValue(this.vat_id);

      this.orderItemForm.controls.incomeTaxRate.setValue(
        this.incomeWitholdingRate
      );
      this.orderItemForm.controls.vat_w_id.setValue(this.vat_w_id);
      this.orderItemForm.controls.incomeWithholdingamount.setValue(
        serviceTotalTaxAmount
      );

      this.orderItemForm.controls.witholdingRate.setValue(
        this.vatWitholdingRate
      );

      this.orderItemForm.controls.income_w_id.setValue(this.income_w_id);

      this.orderItemForm.controls.itemTotalValue.setValue(serviceTotalPrice);

      this.orderItemForm.controls.incomeTax.setValue(incomeTax);

      this.orderItemForm.controls.amountTobepaid.setValue(serviceTotalCost);

      this.orderItemForm.controls.itemUnitPrice.setValue(serviceTotalCost);

      this.orderItemForm.controls.itemQuantity.setValue(itemQuantity);

      this.orderItemForm.controls.itemName.setValue(itemName);
    } else {
      withholdingAmount = 0;
    }

    this.dialogRef.close({ event: "close", data: this.orderItemForm.value });
  }

  updateOderItem() {
    console.log(this.orderItemForm.value);

    let withholdingAmount = 0;

    if (this.orderItemForm.controls.orderItemType.value == "Goods") {
      let unitPrice = this.orderItemForm.controls.itemUnitPrice.value;

      console.log(unitPrice);

      let quantity = this.orderItemForm.controls.itemQuantity.value;

      let totalPrice = Math.round(quantity * unitPrice);

      let vatTaxRate = this.orderItemForm.controls.tax.value;

      let vatAmount = Math.round((vatTaxRate / 100) * totalPrice);

      let totalAmountToBePaid = totalPrice + vatAmount;

      withholdingAmount = (this.vatWitholdingRate / 100) * totalPrice;

      let incomeTax = vatAmount - (this.vatWitholdingRate / 100) * totalPrice;

      //this.orderItemForm.controls.vatWitholdingRate.setValue(this.vatWitholdingRate);

      //this.orderItemForm.controls.vatWitholdingRate.setValue(this.vatWitholdingRate);

      this.orderItemForm.controls.itemTotalValue.setValue(totalPrice);

      this.orderItemForm.controls.vatAmount.setValue(vatAmount);

      this.orderItemForm.controls.amountTobepaid.setValue(totalAmountToBePaid);

      this.orderItemForm.controls.incomeTax.setValue(incomeTax);

      this.orderItemForm.controls.vatWitholding.setValue(withholdingAmount);
    } else if (this.orderItemForm.controls.orderItemType.value == "Service") {
      let serviceVatTaxRate = this.orderItemForm.controls.tax.value;

      let serviceTotalPrice = this.orderItemForm.controls.servicePrice.value;

      let serviceVatAmount = (serviceVatTaxRate / 100) * serviceTotalPrice;

      let serviceVatWitholding =
        (this.vatWitholdingRate / 100) * serviceTotalPrice;

      let serviceIncomeWitholdingAmount =
        (this.incomeWitholdingRate / 100) * serviceTotalPrice;

      let serviceTotalTaxAmount =
        serviceVatWitholding + serviceIncomeWitholdingAmount;

      let serviceTotalCost = serviceVatAmount + parseInt(serviceTotalPrice);

      let incomeTax = serviceVatAmount - serviceTotalTaxAmount;

      let itemQuantity = 0;

      let itemName = this.orderItemForm.controls.serviceName.value;

      this.orderItemForm.controls.witholdingRate.setValue(
        this.incomeWitholdingRate
      );

      this.orderItemForm.controls.vatAmount.setValue(serviceVatAmount);

      this.orderItemForm.controls.incomeWithholdingamount.setValue(
        serviceIncomeWitholdingAmount
      );

      this.orderItemForm.controls.itemTotalValue.setValue(serviceTotalPrice);

      this.orderItemForm.controls.incomeTax.setValue(incomeTax);

      this.orderItemForm.controls.amountTobepaid.setValue(serviceTotalCost);

      this.orderItemForm.controls.itemUnitPrice.setValue(serviceTotalCost);

      this.orderItemForm.controls.itemQuantity.setValue(itemQuantity);

      this.orderItemForm.controls.itemName.setValue(itemName);
    } else {
      withholdingAmount = 0;
    }

    console.log("Order Item", this.orderItemForm.value);

    this.dialogRef.close({ event: "close", data: this.orderItemForm.value });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
