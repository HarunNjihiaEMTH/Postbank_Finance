import { Component, OnInit, ViewChild } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { takeUntil } from "rxjs";
import { TokenCookieService } from "src/app/core/service/token-storage-cookies.service";

import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { ExpensesLookupComponent } from "src/app/user/commons/components/expenses-lookup/expenses-lookup.component";
import { SuppliersLookupComponent } from "src/app/user/commons/components/suppliers-lookup/suppliers-lookup.component";
import { PurchaseOrderService } from "src/app/user/data/services/purchase-order.service";
import { SupplierService } from "src/app/user/data/services/supplier.service";
import { OrderItem } from "src/app/user/data/types/order-item";
import { PurchaseOrder } from "src/app/user/data/types/purchase-order";
import { Supplier } from "src/app/user/data/types/supplier";
import { AddOrderItemComponent } from "../create-purchase-order/dialog/add-order-item/add-order-item.component";

@Component({
  selector: "app-update-purchase-order",
  templateUrl: "./update-purchase-order.component.html",
  styleUrls: ["./update-purchase-order.component.sass"],
})
export class UpdatePurchaseOrderComponent
  extends BaseComponent
  implements OnInit
{
  isLoading: boolean = false;
  updatePurchaseOrderForm: FormGroup;
  orderItemArray: any[] = [];
  orderItemDataSource: any;
  purchaseOrder: any;
  routeState: any;
  itemsArray: OrderItem[] = [];
  currentUser: any;
  username: string;
  supplierServices: string;
  supplierSelected: boolean = false;
  originalCurrentVatAmount: number = 0;
  originalIncomeWithholdingamount: number = 0;
  originalTotalAfterTax: number = 0;
  originalTotalAmount: number = 0;
  originalTotalBeforeTax: number = 0;
  originalVatAmount: number = 0;
  originalVatWitholding: number = 0;
  discount: number = 0;
  taxAmount: number[] = [];
  totalTaxAmount: number = 0;
  supplier: Supplier;

  displayedColumns: string[] = [
    "id",
    "itemName",
    "itemQuantity",
    "itemUnitPrice",
    "itemTotalValue",
    "tax",
    "vatAmount",
    "amountTobepaid",
    "actions",
  ];
  dataSource!: MatTableDataSource<OrderItem>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private snackbar: SnackbarService,
    private purchaseOrderService: PurchaseOrderService,
    private tokenCookieService: TokenCookieService,
    private supplierService: SupplierService
  ) {
    super();

    if (this.router.getCurrentNavigation().extras.state) {
      this.routeState = this.router.getCurrentNavigation().extras.state;
      if (this.routeState) {
        console.log("Router State", this.routeState);
        console.log("Parsed", JSON.parse(this.routeState.purchaseOrderDetails));
        this.purchaseOrder = this.routeState.purchaseOrderDetails
          ? JSON.parse(this.routeState.purchaseOrderDetails)
          : "";
      }
    }
    console.log("Purchase Order", this.purchaseOrder.poParticulars);
    console.log("Order Items", this.purchaseOrder.poParticulars);
  }

  ngOnInit(): void {
    this.currentUser = this.tokenCookieService.getUser();

    this.username = this.currentUser.username;

    this.getSupplierById(this.purchaseOrder.supplierId);

    console.log("Supplier ID", this.purchaseOrder.supplierId);

    this.updatePurchaseOrderForm = this.createUpdatePurchaseOrderForm();

    // this.updatePurchaseOrderForm.patchValue({
    //   id: this.purchaseOrder.id,
    //   poName: this.purchaseOrder.poName,
    //   supplierContact: this.purchaseOrder.supplierContact,
    //   supplierId: this.purchaseOrder.supplierId,
    //   supplierAddress: this.purchaseOrder.supplierAddress,
    //   supplierMobile: this.purchaseOrder.supplierAddress,
    //   supplierName: this.purchaseOrder.supplierAddress,
    //   originalIncomeWithholdingamount:
    //     this.purchaseOrder.originalIncomeWithholdingamount,
    //   currentIncomeWithholdingamount:
    //     this.purchaseOrder.currentIncomeWithholdingamount,
    //   originalTotalAfterTax: this.purchaseOrder.originalTotalAfterTax,
    //   originalTotalAmount: this.purchaseOrder.originalTotalAmount,
    //   originalVatAmount: this.purchaseOrder.originalVatAmount,
    //   originalTotalBeforeTax: this.purchaseOrder.originalTotalBeforeTax,
    //   originalVatWitholding: this.purchaseOrder.originalVatWitholding,
    //   postedBy: this.purchaseOrder.postedBy,
    //   postedFlag: this.purchaseOrder.postedFlag,
    //   postedTime: this.purchaseOrder.postedTime,
    // });

    this.orderItemArray = this.purchaseOrder.poParticulars;

    this.getOrderItems(this.orderItemArray);
  }

  createUpdatePurchaseOrderForm() {
    return this.fb.group({
      id: [this.purchaseOrder.id],
      poName: [this.purchaseOrder.poName],
      supplierContact: [this.purchaseOrder.supplierContact],
      supplierId: [this.purchaseOrder.supplierId],
      supplierAddress: [this.purchaseOrder.supplierAddress],
      supplierMobile: [this.purchaseOrder.supplierMobile],
      supplierName: [this.purchaseOrder.supplierName],
      originalCurrentVatAmount: [this.purchaseOrder.originalCurrentVatAmount],
      originalIncomeWithholdingamount: [this.purchaseOrder.originalIncomeWithholdingamount],
      currentIncomeWithholdingamount: [this.purchaseOrder.currentIncomeWithholdingamount],
      originalTotalAfterTax: [this.purchaseOrder.originalTotalAfterTax],
      originalTotalAmount: [this.purchaseOrder.originalTotalAmount],
      originalVatAmount: [this.purchaseOrder.originalVatAmount],
      originalTotalBeforeTax: [this.purchaseOrder.originalTotalBeforeTax],
      originalVatWitholding: [this.purchaseOrder.originalVatWitholding],
      postedBy: [this.purchaseOrder.postedBy],
      postedFlag: [this.purchaseOrder.postedFlag],
      postedTime: [this.purchaseOrder.postedTime],
      isSent: [this.purchaseOrder.isSent],
      poStatus: "pending",
      poNumber: [this.purchaseOrder.poNumber],
      invoice_no: [this.purchaseOrder.invoice_no],
      invoice_amount: [this.purchaseOrder.invoice_amount],
      expenseId: [parseInt(this.purchaseOrder.expenseId)],
      currentPoTotalAmount: [this.purchaseOrder.currentPoTotalAmount],
      currentTotalBeforeTax: [this.purchaseOrder.currentTotalBeforeTax],
      currentVatAmount: [this.purchaseOrder.currentVatAmount],
      curentVatWitholding: [this.purchaseOrder.curentVatWitholding],
      currentTotalAfterTax: [this.purchaseOrder.currentTotalAfterTax],
      correspondedInvoiceNumber: [this.purchaseOrder.correspondedInvoiceNumber],
      paymentStatus: [this.purchaseOrder.paymentStatus],
      reason: [this.purchaseOrder.reason],
      modifiedBy: this.username,
      modifiedFlag: "Y",
      modifiedTime: new Date(),
      verifiedBy: [this.purchaseOrder.verifiedBy],
      verifiedFlag: [this.purchaseOrder.verifiedFlag],
      verifiedTime: [this.purchaseOrder.verifiedTime],
      deletedBy: [this.purchaseOrder.deletedBy],
      deletedFlag: [this.purchaseOrder.deletedFlag],
      deletedTime: [this.purchaseOrder.deletedTime],
      moveToBill:[this.purchaseOrder.moveToBill],
      isPaid:  [this.purchaseOrder.isPaid],
      month: [this.purchaseOrder.month],
      year: [this.purchaseOrder.year],
      poParticulars: new FormArray([]),
      modifiablePoParticulars: new FormArray([]),
    });
  }

  get orderItemFormControls() {
    return this.updatePurchaseOrderForm.controls;
  }

  get pushToOrderItemsFormArray() {
    return this.orderItemFormControls.poParticulars as FormArray;
  }

  get modifiablePoParticularsFormControls() {
    return this.updatePurchaseOrderForm.controls;
  }

  get pushToModifiablePoParticularsFormArray() {
    return this.modifiablePoParticularsFormControls
      .modifiablePoParticulars as FormArray;
  }

  addOrderItemCall() {
    const dialogRef = this.dialog.open(AddOrderItemComponent, {
      width: "600px",
      data: {
        data: "",
        action: "Add",
        supplierType: this.supplierServices,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.orderItemArray.push(result.data);

      this.getOrderItems(this.orderItemArray);
    });
  }

  updateOrderItemCall(i, data) {
    const dialogRef = this.dialog.open(AddOrderItemComponent, {
      width: "600px",
      data: {
        data: data,
        action: "Update",
        supplierType: this.supplierServices,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.updateOrderItem(i, result.data);
    });
  }

  updateOrderItem(i: any, orderItem: any) {
    this.orderItemArray[i] = orderItem;
    this.getOrderItems(this.orderItemArray);
  }

  getOrderItems(orderItemsArray: any) {
    this.orderItemDataSource = new MatTableDataSource(orderItemsArray);
    this.orderItemDataSource.paginator = this.paginator;
  }

  onRemoveOrderItem(i: any) {
    this.orderItemArray.splice(i, 1);
    this.getOrderItems(this.orderItemArray);
  }

  suppliersLookup() {
    const dialogRef = this.dialog.open(SuppliersLookupComponent, {
      width: "600px",
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.subject))
      .subscribe((result) => {
        if (result) {
          this.supplierSelected = true;

          this.supplierServices = result.data.supplierServices;

          this.updatePurchaseOrderForm.patchValue({
            supplierContact: result.data.supplierContact,
            supplierId: result.data.id,
            supplierAddress: result.data.supplierAddress,
            supplierMobile: result.data.supplierNumber,
            supplierName: result.data.supplierName,
          });
        }
      });
  }

  expenseLookup() {
    const dialogRef = this.dialog.open(ExpensesLookupComponent, {
      width: "600px",
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.subject))
      .subscribe((result) => {
        this.updatePurchaseOrderForm.patchValue({
          expenseId: result.data.id,
          expenseAccount: result.data.expenseAccount,
          expenseDescription: result.data.expenseDescription,
        });
      });
  }

  previewPurchaseOrder() {
    this.orderItemArray.forEach((orderItem) => {
      this.originalVatAmount = this.originalVatAmount + orderItem.vatAmount;

      this.originalIncomeWithholdingamount =
        this.originalIncomeWithholdingamount +
        orderItem.incomeWithholdingamount;

      this.originalTotalAmount =
        this.originalTotalAmount + orderItem.itemTotalValue;

      this.originalTotalBeforeTax =
        this.originalTotalBeforeTax + orderItem.itemTotalValue;

      this.originalVatWitholding =
        this.originalVatWitholding + orderItem.vatWitholding;

      this.pushToOrderItemsFormArray.push(this.fb.group(orderItem));
    });

    this.originalTotalAfterTax =
      this.originalTotalAmount + this.originalVatAmount;

    this.updatePurchaseOrderForm.controls.originalVatAmount.setValue(
      this.originalVatAmount
    );

    this.updatePurchaseOrderForm.controls.originalIncomeWithholdingamount.setValue(
      this.originalIncomeWithholdingamount
    );

    this.updatePurchaseOrderForm.controls.originalTotalBeforeTax.setValue(
      this.originalTotalBeforeTax
    );

    this.updatePurchaseOrderForm.controls.originalTotalAfterTax.setValue(
      this.originalTotalAfterTax
    );

    this.updatePurchaseOrderForm.controls.originalVatWitholding.setValue(
      this.originalVatWitholding
    );

    this.router.navigate(
      ["/admin/supplier/purchase-orders-management/purchase-order-details"],
      {
        state: {
          purchaseOrderDetails: JSON.stringify(
            this.updatePurchaseOrderForm.value
          ),
        },
      }
    );
  }

  getSupplierById(supplierId) {
    this.supplierService
      .getSupplierById(supplierId)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (result) => {
          this.supplier = result;

          if (this.supplier) {
            this.supplierServices = this.supplier.supplierServices;
          }

          console.log("Result", result);

          console.log("Supplier ", this.supplier);

          console.log("Supplier services", this.supplierServices);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  updatePurchaseOrder() {
    if (this.purchaseOrder.isSent) {
      this.snackbar.showNotification(
        "snackbar-danger",
        "PO cannot be modified because it was already sent !"
      );
    } else {
      this.orderItemArray.forEach((orderItem) => {
        this.originalVatAmount =
          this.originalVatAmount + parseInt(orderItem.vatAmount);

        this.originalIncomeWithholdingamount =
          this.originalIncomeWithholdingamount +
          parseInt(orderItem.incomeWithholdingamount);

        this.originalTotalAmount =
          this.originalTotalAmount + parseInt(orderItem.itemTotalValue);

        this.originalTotalBeforeTax =
          this.originalTotalBeforeTax + parseInt(orderItem.itemTotalValue);

        this.originalVatWitholding =
          this.originalVatWitholding + parseInt(orderItem.vatWitholding);

        this.pushToOrderItemsFormArray.push(this.fb.group(orderItem));
        this.pushToModifiablePoParticularsFormArray.push(
          this.fb.group(orderItem)
        );
      });

      this.originalTotalAfterTax =
        this.originalTotalAmount + this.originalVatAmount;

      this.updatePurchaseOrderForm.controls.originalVatAmount.setValue(
        this.originalVatAmount
      );

      this.updatePurchaseOrderForm.controls.originalIncomeWithholdingamount.setValue(
        this.originalIncomeWithholdingamount
      );

      this.updatePurchaseOrderForm.controls.originalTotalBeforeTax.setValue(
        this.originalTotalBeforeTax
      );

      this.updatePurchaseOrderForm.controls.originalTotalAfterTax.setValue(
        this.originalTotalAfterTax
      );

      this.updatePurchaseOrderForm.controls.originalVatWitholding.setValue(
        this.originalVatWitholding
      );

      console.log("Purchase Order ", this.updatePurchaseOrderForm.value);
      this.purchaseOrderService
        .updatePurchaseOrder(this.updatePurchaseOrderForm.value)
        .pipe(takeUntil(this.subject))
        .subscribe(
          (result) => {
            console.log(result);

            this.snackbar.showNotification(
              "snackbar-success",
              "Purchase order updated successfully !"
            );

            this.router.navigate([
              "/admin/supplier/purchase-orders-management/all",
            ]);
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }

  onCancel() {
    this.router.navigate(["/admin/supplier/purchase-orders-management/all"]);
  }
}
