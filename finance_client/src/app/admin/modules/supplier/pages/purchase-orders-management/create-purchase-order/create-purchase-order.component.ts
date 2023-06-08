import { SelectionModel } from "@angular/cdk/collections";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
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
import { OrderItem } from "src/app/user/data/types/order-item";
import { PurchaseOrder } from "src/app/user/data/types/purchase-order";
import { Supplier } from "src/app/user/data/types/supplier";
import { AddOrderItemComponent } from "./dialog/add-order-item/add-order-item.component";

@Component({
  selector: "app-create-purchase-order",
  templateUrl: "./create-purchase-order.component.html",
  styleUrls: ["./create-purchase-order.component.sass"],
})
export class CreatePurchaseOrderComponent
extends BaseComponent
implements OnInit {
purchaseOrderForm: FormGroup;
orderItems: OrderItem[] = [];
purchaseOrderDate: Date;
totalPrice: number;
discount: number = 0;
taxAmount: number[] = [];
totalTaxAmount: number = 0;
originalCurrentVatAmount: number = 0;
originalIncomeWithholdingamount: number = 0;
originalTotalAfterTax: number = 0;
originalTotalAmount: number = 0;
originalTotalBeforeTax: number = 0;
originalVatAmount: number = 0;
originalVatWitholding: number = 0;
supplierSelected: boolean = false;

displayedColumns: string[] = [
  "id",
  "itemName",
  "itemQuantity",
  "itemUnitPrice",
  "itemTotalValue",
  "tax",
  "vatAmount",
  // "whtRate",
  // "whtAmount",
  // "incomeTax",
  "amountTobepaid",
  "actions",
];
dataSource!: MatTableDataSource<OrderItem>;
@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;
contextMenu: MatMenuTrigger;
contextMenuPosition = { x: "0px", y: "0px" };

selection = new SelectionModel<OrderItem>(true, []);
data: any;
error: any;
isLoading: boolean = false;
orderItemArray: any[] = [];
orderItemDataSource: any;
purchaseOrder: PurchaseOrder;
routeState: any;
itemsArray: OrderItem[] = [];
currentUser: any;
username: string;
supplierServices: string;
supplier: Supplier;

constructor(
  private fb: FormBuilder,
  private router: Router,
  private dialog: MatDialog,
  private purchaseOrderService: PurchaseOrderService,
  private tokenCookieService: TokenCookieService,
  private snackbar: SnackbarService,
) {
  super();

  if (this.router.getCurrentNavigation().extras.state) {
    this.routeState = this.router.getCurrentNavigation().extras.state;
    if (this.routeState.action == "Navigation From PO Details") {
      console.log("Router State", this.routeState);
      console.log("Parsed", JSON.parse(this.routeState.purchaseOrderDetails));
      this.purchaseOrder = this.routeState.purchaseOrderDetails
        ? JSON.parse(this.routeState.purchaseOrderDetails)
        : "";
    }else if(this.routeState.action == "Assign customer PO"){
      console.log("Router State", this.routeState);
      console.log("Parsed", JSON.parse(this.routeState.supplierDetails));
      this.supplier = this.routeState.supplierDetails
        ? JSON.parse(this.routeState.supplierDetails)
        : "";
    }else {
     this.routeState = "";
     this.purchaseOrder.supplierId = undefined
    }
  }
  console.log("Purchase Order", this.purchaseOrder);
}

ngOnInit(): void {

  this.currentUser = this.tokenCookieService.getUser();

  this.username = this.currentUser.username;

  this.purchaseOrderForm = this.createPurchaseOrderForm();

  if(this.supplier){

    this.supplierSelected = true;

    this.supplierServices = this.supplier.supplierServices

    this.purchaseOrderForm.patchValue({
      supplierContact: this.supplier.supplierContact,
      supplierId: this.supplier.id,
      supplierAddress: this.supplier.supplierAddress,
      supplierMobile: this.supplier.supplierNumber,
      supplierName: this.supplier.supplierName
    });

    console.log("Supplier ",this.supplier)
  }

  if(this.purchaseOrder){
   
  }

  if (this.purchaseOrder) {

    if(this.purchaseOrder.supplierId){
      this.supplierSelected = true;
    }else {
      this.supplierSelected = false;
    }

    this.purchaseOrderForm.patchValue({
      poName: this.purchaseOrder.poName,
      supplierContact: this.purchaseOrder.supplierContact,
      supplierId: this.purchaseOrder.supplierId,
      supplierAddress: this.purchaseOrder.supplierAddress,
      supplierMobile: this.purchaseOrder.supplierMobile,
      supplierName: this.purchaseOrder.supplierName,
      postedBy: this.username,
      postedFlag: "Y",
      postedTime: new Date(),
      isSent: false,
      poStatus: "pending",
    });

    this.orderItemArray = this.purchaseOrder.poParticulars;

    this.getOrderItems(this.orderItemArray);

  }   
}

createPurchaseOrderForm() {
  return this.fb.group({
    poName: ["", [Validators.required]],
    supplierContact: ["", [Validators.required]],
    supplierId: ["", [Validators.required]],
    supplierAddress: ["", [Validators.required]],
    supplierMobile: ["", [Validators.required]],
    supplierName: ["", [Validators.required]],
    originalCurrentVatAmount: [""],
    originalIncomeWithholdingamount: [""],
    currentIncomeWithholdingamount: [""],
    originalTotalAfterTax: [""],
    originalTotalAmount: [""],
    originalVatAmount: [""],
    originalTotalBeforeTax: [""],
    originalVatWitholding: [""],
    postedBy: this.username,
    postedFlag: "Y",
    postedTime: new Date(),
    isSent: false,
    poStatus: "pending",
    poParticulars: new FormArray([]),
    modifiablePoParticulars: new FormArray([])
  });
}

get orderItemFormControls() {
  return this.purchaseOrderForm.controls;
}

get pushToOrderItemsFormArray() {
  return this.orderItemFormControls.poParticulars as FormArray;
}

get modifiablePoParticularsFormControls() {
  return this.purchaseOrderForm.controls;
}

get pushToModifiablePoParticularsFormArray() {
  return this.modifiablePoParticularsFormControls.modifiablePoParticulars as FormArray;
}

addOrderItemCall() {
  const dialogRef = this.dialog.open(AddOrderItemComponent, {
    width: "600px",
    data: {
      data: '',
      action: "Add",
      supplierType: this.supplierServices
    }
  });

  dialogRef.afterClosed().subscribe((result) => {

    if(result){
      this.orderItemArray.push(result.data);
    }
   
    this.getOrderItems(this.orderItemArray);
  });
}

updateOrderItemCall(i, data) {
  const dialogRef = this.dialog.open(AddOrderItemComponent, {
    width: "600px",
    data: {
      data: data,
      action: "Update",
      supplierType: this.supplierServices
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

onRemoveOrderItem(i: any) {
  this.orderItemArray.splice(i, 1);
  this.getOrderItems(this.orderItemArray);
}

getOrderItems(orderItemsArray: any) {
  this.orderItemDataSource = new MatTableDataSource(orderItemsArray);
  this.orderItemDataSource.paginator = this.paginator;
}

previewPurchaseOrder() {
  this.orderItemArray.forEach((orderItem) => {

    this.originalVatAmount = this.originalVatAmount + orderItem.vatAmount;
   
    this.originalIncomeWithholdingamount =  this.originalIncomeWithholdingamount + orderItem.incomeWithholdingamount;

    this.originalTotalAmount = this.originalTotalAmount + orderItem.itemTotalValue;
  
    this.originalTotalBeforeTax = this.originalTotalBeforeTax + orderItem.itemTotalValue;
   
    this.originalVatWitholding = this.originalVatWitholding + orderItem.vatWitholding;
    
    this.pushToOrderItemsFormArray.push(this.fb.group(orderItem));
  });

  this.originalTotalAfterTax = this.originalTotalAmount + this.originalVatAmount;

  this.purchaseOrderForm.controls.originalVatAmount.setValue(this.originalVatAmount);

  this.purchaseOrderForm.controls.originalIncomeWithholdingamount.setValue(this.originalIncomeWithholdingamount);

  this.purchaseOrderForm.controls.originalTotalBeforeTax.setValue(this.originalTotalBeforeTax);

  this.purchaseOrderForm.controls.originalTotalAfterTax.setValue(this.originalTotalAfterTax);

  this.purchaseOrderForm.controls.originalVatWitholding.setValue(this.originalVatWitholding);

  this.router.navigate(
    ["/admin/supplier/purchase-orders-management/purchase-order-details"],
    {
      state: {
        purchaseOrderDetails: JSON.stringify(this.purchaseOrderForm.value),
      },
    }
  );
}

suppliersLookup() {
  const dialogRef = this.dialog.open(SuppliersLookupComponent, {
    width: "600px",
  });

  dialogRef
    .afterClosed()
    .pipe(takeUntil(this.subject))
    .subscribe((result) => 
    {
      if(result){
        this.supplierSelected = true;

        this.supplierServices = result.data.supplierServices

        if(result.data.status !='Approved'){
          this.snackbar.showNotification("snackbar-danger", "You can only assign a PO to a verified supplier !")
        }else {
          this.purchaseOrderForm.patchValue({
            supplierContact: result.data.supplierContact,
            supplierId: result.data.id,
            supplierAddress: result.data.supplierAddress,
            supplierMobile: result.data.supplierNumber,
            supplierName: result.data.supplierName,
          });
        }
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
      this.purchaseOrderForm.patchValue({
        expenseId: result.data.id,
        expenseAccount: result.data.expenseAccount,
        expenseDescription: result.data.expenseDescription,
      });
    });
}

createPurchaseOrder() {
  this.orderItemArray.forEach((orderItem) => {
    this.originalVatAmount = this.originalVatAmount + orderItem.vatAmount;
   
    this.originalIncomeWithholdingamount =  this.originalIncomeWithholdingamount + orderItem.incomeWithholdingamount;

    this.originalTotalAmount = this.originalTotalAmount + orderItem.itemTotalValue;
  
    this.originalTotalBeforeTax = this.originalTotalBeforeTax + orderItem.itemTotalValue;
   
    this.originalVatWitholding = this.originalVatWitholding + orderItem.vatWitholding;
   
    this.pushToOrderItemsFormArray.push(this.fb.group(orderItem));

    this.pushToModifiablePoParticularsFormArray.push(this.fb.group(orderItem))
  });

  this.originalTotalAfterTax = this.originalTotalAmount + this.originalVatAmount;

  this.purchaseOrderForm.controls.originalVatAmount.setValue(this.originalVatAmount);

  this.purchaseOrderForm.controls.originalIncomeWithholdingamount.setValue(this.originalIncomeWithholdingamount);

  this.purchaseOrderForm.controls.originalTotalBeforeTax.setValue(this.originalTotalBeforeTax);

  this.purchaseOrderForm.controls.originalTotalAfterTax.setValue(this.originalTotalAfterTax);

  this.purchaseOrderForm.controls.originalVatWitholding.setValue(this.originalVatWitholding);

  console.log("Purchase Order", this.purchaseOrderForm.value)

  this.purchaseOrderService
    .createPurchaseOrder(this.purchaseOrderForm.value)
    .pipe(takeUntil(this.subject))
    .subscribe(
      (result) => {
        console.log(result);
        this.snackbar.showNotification("snackbar-success", `Purchase order created successfully !`)

        this.router.navigate(['/admin/supplier/purchase-orders-management/all'])
      },
      (err) => {
        console.log(err);
      }
    );
}

onCancel() {
  this.router.navigate(['/admin/supplier/purchase-orders-management/all'])
}
}
