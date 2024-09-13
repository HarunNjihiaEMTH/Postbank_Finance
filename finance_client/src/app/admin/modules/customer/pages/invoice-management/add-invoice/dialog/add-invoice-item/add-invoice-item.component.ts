import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { takeUntil } from "rxjs";
import { AddInvoiceComponent } from "src/app/admin/modules/customer/pages/invoice-management/add-invoice/add-invoice.component";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { ItemService } from "src/app/user/data/services/customer/item.service";
import { StockCategoryService } from "src/app/user/data/services/customer/stock-category.service";
import { TaxesService } from "src/app/user/data/services/taxes.service";
import { InvoiceItem } from "src/app/user/data/types/customer-types/invoice-item";
import { Item } from "src/app/user/data/types/customer-types/item";
import { StockCategory } from "src/app/user/data/types/customer-types/stock-category";
import { Expense } from "src/app/user/data/types/expense";
import { Tax } from "src/app/user/data/types/tax";

@Component({
  selector: "app-add-invoice-item",
  templateUrl: "./add-invoice-item.component.html",
  styleUrls: ["./add-invoice-item.component.sass"],
})
export class AddInvoiceItemComponent extends BaseComponent implements OnInit {
  invoiceItemForm: FormGroup;
  taxes: Tax[] = [];
  expenses: Expense[] = [];
  orderItemTypes: string[] = ["Service", "Goods"];
  orderItemTypeSelected: boolean = false;
  orderItemIsService: boolean = false;
  orderItemIsProduct: boolean = false;
  newOrderItem: boolean = true;
  vatWitholdingRate: number;
  incomeWitholdingRate: number;
  supplierService: string;
  income_w_id: number;
  vat_w_id: number;
  vat_id: number;
  invoiceItem: InvoiceItem;
  stockCategories: StockCategory[] = [];
  stockCategory: StockCategory;
  items: Item[] = [];
  commodity: Item;

  constructor(
    public dialogRef: MatDialogRef<AddInvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private taxesService: TaxesService,
    private itemService: ItemService,
    private stockCategoryService: StockCategoryService
  ) {
    super();
  }

  ngOnInit(): void {
    this.invoiceItemForm = this.createInvoiceItemForm();

    this.getTaxes();

    this.getItems();

    this.getStockCategories();

    this.invoiceItem = this.data.data;

    console.log("Invoice Item", this.invoiceItem);

    if (this.data.action == "Update") {
      if (this.invoiceItem) {
        if (this.invoiceItem.qty) {
          this.orderItemTypeSelected = true;
          this.orderItemIsProduct = true;

          this.invoiceItemForm.patchValue({
            orderItemType: "Goods",
            goodsCategoryId: this.invoiceItem.goodsCategoryId,
            goodsCategoryName: this.invoiceItem.goodsCategoryName,
            item: this.invoiceItem.item,
            itemCode: this.invoiceItem.itemCode,
            orderNumber: this.invoiceItem.orderNumber,
            pack: this.invoiceItem.pack,
            qty: this.invoiceItem.qty,
            stick: this.invoiceItem.stick,
            tax: this.invoiceItem.tax,
            taxRate: parseFloat(this.invoiceItem.taxRate),
            total: this.invoiceItem.total,
            totalCost: this.invoiceItem.totalCost,
            unitOfMeasure: this.invoiceItem.unitOfMeasure,
            unitPrice: this.invoiceItem.unitPrice,
          });
        } else {
          this.orderItemTypeSelected = true;

          this.orderItemIsService = true;

          this.invoiceItemForm.patchValue({
            orderItemType: "Service",
            goodsCategoryId: this.invoiceItem.goodsCategoryId,
            goodsCategoryName: this.invoiceItem.goodsCategoryId,
            item: this.invoiceItem.item,
            itemCode: this.invoiceItem.itemCode,
            orderNumber: this.invoiceItem.orderNumber,
            pack: this.invoiceItem.pack,
            tax: this.invoiceItem.tax,
            taxRate: parseFloat(this.invoiceItem.taxRate),
            total: this.invoiceItem.total,
            totalCost: this.invoiceItem.totalCost,
            unitOfMeasure: this.invoiceItem.unitOfMeasure,
            unitPrice: this.invoiceItem.unitPrice,
          });
        }
      }
    }
  }

  createInvoiceItemForm() {
    return this.fb.group({
      // orderItemType: [""],
      selectedCommodity: [""],
      categoryId: [""],
      categoryName: [""],
      deemedFlag: ["N"],
      discountFlag: ["N"],
      discountTaxRate: [0],
      discountTotal: [0],
      exciseCurrency: [""],
      exciseFlag: ["N"],
      exciseRate: [0],
      exciseRateName: [""],
      exciseRule: [""],
      exciseTax: [""],
      exciseUnit: [""],
      goodsCategoryId: [""],
      goodsCategoryName: [""],
      item: [""],
      itemCode: [""],
      orderNumber: [""],
      pack: [""],
      qty: [""],
      stick: [""],
      tax: [""],
      vatAmount: [""],
      taxRate: [""],
      total: [""],
      totalCost: [""],
      unitOfMeasure: [""],
      unitPrice: [""],
      isService: [""],
      amountBeforeVat: [""],
      amountBeforeTax: [""],
      execiseDuty: [""],
      grossAmount: [""],
      vatEffectiveStartDate: [""],
      execiseTaxEffectiveStartDate: [""],
      totalPriceBeforeTax: [""],
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

          console.log("Taxes", this.taxes);

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

  getItems() {
    this.itemService
      .getAllItems()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (result) => {
          this.items = result;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  onSelectCategory(event) {
    this.getStockCategoryById(event.value);
  }

  getStockCategories() {
    this.stockCategoryService
      .getAllStockCategories()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (result) => {
          this.stockCategories = result;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getStockCategoryById(stockCategoryId) {
    this.stockCategoryService
      .getStockCategoryById(stockCategoryId)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (result) => {
          this.stockCategory = result;

          console.log(this.stockCategory);

          this.items = this.stockCategory.products;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  onProductSelection(event) {
    console.log(event.value);

    this.getItembyId(event.value);
  }

  getItembyId(itemId) {
    this.itemService
      .getItemById(itemId)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (result) => {
          this.commodity = result;

          console.log("Commodity ", this.commodity);

          if (this.commodity) {
            if (this.commodity.isService == "Yes") {
              this.invoiceItemForm.patchValue({
                qty: "-",
              });
            } else {
              this.invoiceItemForm.patchValue({
                qty: 1,
              });
            }
            this.invoiceItemForm.patchValue({
              categoryName: this.commodity.segmentName,
              exciseRate: this.commodity.execiseTaxRate,
              goodsCategoryName: this.commodity.segmentName,
              item: this.commodity.name,
              itemCode: this.commodity.commodityCode,
              //qty: 1,
              taxRate: this.commodity.vatTaxRate,
              unitOfMeasure: this.commodity.pieceMeasurementUnit,
              unitPrice: this.commodity.pricePerPieceQuantity,
              isService: this.commodity.isService,
              vatEffectiveStartDate: this.commodity.vatEffectiveStartDate,
              execiseTaxEffectiveStartDate:
                this.commodity.execiseTaxEffectiveStartDate,
            });
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  onAddCommodityQuantity() {
    if (this.invoiceItemForm.value.qty != "-") {
      const newQuantity = parseFloat(this.invoiceItemForm.value.qty) + 1;

      const totalPrice =
        parseFloat(this.invoiceItemForm.value.unitPrice) +
        this.commodity.pricePerPieceQuantity;

      this.invoiceItemForm.patchValue({
        qty: newQuantity,
        total: totalPrice,
      });

      console.log(newQuantity);
    }
  }

  onReduceCommodityQuantity() {
    if (this.invoiceItemForm.value.qty != "-") {
      if (this.invoiceItemForm.value.qty > 0) {
        const newQuantity = parseFloat(this.invoiceItemForm.value.qty) - 1;

        const totalPrice =
          parseFloat(this.invoiceItemForm.value.unitPrice) -
          this.commodity.pricePerPieceQuantity;

        this.invoiceItemForm.patchValue({
          qty: newQuantity,
          total: totalPrice,
        });
      }
    }
  }

  addInvoiceItem() {
    let quantity;

    if (this.commodity.isService == "No") {
      let unitPrice = this.invoiceItemForm.controls.unitPrice.value;

      quantity = this.invoiceItemForm.controls.qty.value;

      let totalCost = quantity * unitPrice;

      let taxRate = this.invoiceItemForm.controls.taxRate.value;

      let vatAmount;

      if (taxRate) {
        vatAmount = (taxRate / 100) * totalCost;
      } else {
        vatAmount = 0;
      }

      let total = vatAmount + totalCost;

      this.invoiceItemForm.controls.totalCost.setValue(totalCost);

      this.invoiceItemForm.controls.total.setValue(total);

      this.invoiceItemForm.controls.tax.setValue(vatAmount);
    } else if (this.commodity.isService == "Yes") {
      let unitPrice = this.invoiceItemForm.controls.unitPrice.value;

      let totalCost = this.invoiceItemForm.controls.unitPrice.value;

      let taxRate = this.invoiceItemForm.controls.taxRate.value;

      let vatAmount;

      console.log("Good Invoice Item ", this.invoiceItemForm.value);
      if (taxRate) {
        vatAmount = (taxRate / 100) * totalCost;
      } else {
        vatAmount = 0;
      }

      let total = vatAmount + totalCost;

      this.invoiceItemForm.controls.totalCost.setValue(totalCost);

      this.invoiceItemForm.controls.total.setValue(total);

      this.invoiceItemForm.controls.tax.setValue(vatAmount);

      this.invoiceItemForm.controls.unitPrice.setValue(unitPrice);
    } else {
      quantity = 0;
    }

    this.dialogRef.close({ event: "close", data: this.invoiceItemForm.value });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
