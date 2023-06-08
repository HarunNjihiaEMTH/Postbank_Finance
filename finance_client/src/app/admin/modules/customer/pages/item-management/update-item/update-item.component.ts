import { Component, Inject, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { takeUntil } from "rxjs";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { ItemService } from "src/app/user/data/services/customer/item.service";
import { StockCategoryService } from "src/app/user/data/services/customer/stock-category.service";
import { AllItemsComponent } from "../all-items/all-items.component";
import { StockCategory } from "src/app/user/data/types/customer-types/stock-category";
import { Item } from "src/app/user/data/types/customer-types/item";
import { Router } from "@angular/router";

import { CurrencyCodeLookupComponent } from "src/app/user/commons/components/currency-code-lookup/currency-code-lookup.component";
import { SegmentLookupComponent } from "src/app/user/commons/components/segment-lookup/segment-lookup.component";
import { UnitsOfMeasurementComponent } from "src/app/user/commons/components/units-of-measurement/units-of-measurement.component";
import { PurchaseOrderSessionService } from "src/app/user/data/services/purchase-order-session.service";
import { TokenCookieService } from "src/app/core/service/token-storage-cookies.service";

@Component({
  selector: "app-update-item",
  templateUrl: "./update-item.component.html",
  styleUrls: ["./update-item.component.sass"],
})
export class UpdateItemComponent extends BaseComponent implements OnInit {
  categories: StockCategory[] = [];
  updateCommodityConfigurationForm: FormGroup;
  goodsOtherUnitForm: FormGroup;
  item: Item;
  includeVatTaxInformation: boolean = false;
  includeExeciseTaxInformation: boolean = false;
  includePieceMeasurementInformation: boolean = false;
  username: string;
  commodityHasOtherUnits: boolean = false;
  addCommodityUnitsSelected: boolean = false;
  haveExeciseTax: boolean = false;
  havePieceUnit: boolean = false;
  routeState: any;
  purchaseOrderDate: Date;
  itemDetails: Item;
  user: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private snackbar: SnackbarService,
    private stockCategoryService: StockCategoryService,
    private itemService: ItemService,
    private tokenCookieService: TokenCookieService,
    private purchaseOrderSession: PurchaseOrderSessionService
  ) {
    super();

    if (this.router.getCurrentNavigation().extras.state) {
      this.routeState = this.router.getCurrentNavigation().extras.state;
      if (this.routeState) {
        console.log("Router State", this.routeState);
        console.log("Parsed", JSON.parse(this.routeState.itemDetails));
        this.itemDetails = this.routeState.itemDetails
          ? JSON.parse(this.routeState.itemDetails)
          : "";

        purchaseOrderSession.saveItemDetails(this.itemDetails);
      }
    }
  }

  ngOnInit(): void {
    this.username = this.tokenCookieService.getUser().username;

    this.recoverExpenseDetailsOnReload();

    if(this.itemDetails.includePieceOfMeasurementInformation == "Yes"){
      this.includePieceMeasurementInformation = true
    }else {
      this.includePieceMeasurementInformation = false
    }

    if(this.itemDetails.includeExeciseTaxInformation == "Yes"){
      this.includeExeciseTaxInformation = true
    }else {
      this.includeExeciseTaxInformation = false
    }

    if(this.itemDetails.includeVatInformation == "Yes"){
      this.includeVatTaxInformation = true
    }else {
      this.includeVatTaxInformation = false
    }

    this.updateCommodityConfigurationForm = this.createUpdateCommodityConfigurationForm();
  }

  recoverExpenseDetailsOnReload() {
    const recoveredItemDetails = JSON.parse(
      this.purchaseOrderSession.getItemDetails()
    );

    if (recoveredItemDetails) {
      this.itemDetails = recoveredItemDetails;
    }
  }

  createUpdateCommodityConfigurationForm() {
    return this.fb.group({
      operationType: ["102", Validators.required],
      goodsName: ["", Validators.required],
      goodsCode: ["", Validators.required],
      measureUnit: "101",
      unitPrice: ["", Validators.required],
      currency: "101",
      commodityCategoryId: ["", Validators.required],
      haveExciseTax: ["", Validators.required],
      description: ["", Validators.required],
      stockPrewarning: ["", Validators.required],
      havePieceUnit: "101",
      pieceMeasureUnit: "101",
      packageScaledValue: "1",
      exciseDutyCode: [""],
      haveOtherUnit: [],
      goodsOtherUnits: new FormArray([]),
      pieceUnitPrice: [""],
      pieceScaledValue: "1",
    });
  }

  get f() {
    return this.updateCommodityConfigurationForm.controls;
  }
  get t() {
    return this.f.goodsOtherUnits as FormArray;
  }

  addOtherGoodUnit() {
    this.t.push(
      (this.goodsOtherUnitForm = this.fb.group({
        otherPrice: [""],
        otherScaled: [""],
        otherUnit: [""],
        packageScaled: [""],
      }))
    );
  }

  removeOtherGoodUnit(i) {
    if (i > 0) {
      this.t.removeAt(i);
    }
  }

  categoryLookup() {
    const dialogRef = this.dialog.open(SegmentLookupComponent, {
      width: "900px",
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.subject))
      .subscribe((result) => {
        this.updateCommodityConfigurationForm.patchValue({
          commodityCategoryId: result.data.commoditycode,
        });

        console.log(result);
      });
  }

  onSelectOtherUnits(event: any) {
    if (event.value == "101") {
      this.commodityHasOtherUnits = true;
    } else if (event.value == "102") {
      this.t.clear();
      this.commodityHasOtherUnits = false;
    } else {
      this.commodityHasOtherUnits = false;
    }
  }

  onSelectHavePieceUnit(event: any) {
    if (event.value == "101") {
      this.havePieceUnit = true;
    } else if (event.value == "102") {
      this.havePieceUnit = false;
    } else {
      this.havePieceUnit = false;
    }
  }

  onSelectHaveExeciseTax(event: any) {
    if (event.value == "101") {
      this.haveExeciseTax = true;
    } else if (event.value == "102") {
      this.haveExeciseTax = false;
    } else {
      this.haveExeciseTax = false;
    }
  }

  postCommodityToUra() {
    console.log("Commodity Form", this.updateCommodityConfigurationForm.value);
    this.itemService
      .postCommodityToUra(this.updateCommodityConfigurationForm.value)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (result) => {
          console.log(result);

          this.snackbar.showNotification(
            "snackbar-success",
            "Commodity added successfully"
          );
        },
        (err) => {
          console.log(err);
        }
      );
  }

  addCommodity() {
    console.log("Commodity Form", this.updateCommodityConfigurationForm.value);
    console.log("Commodity", this.updateCommodityConfigurationForm.value);
    this.itemService
      .addItem(this.updateCommodityConfigurationForm.value)
      .pipe(takeUntil(this.subject))
      .subscribe((result) => {
        console.log(result);
        this.snackbar.showNotification(
          "snackbar-success",
          "Item added successfully ! "
        );
      });
  }

  onCancel() {
    this.router.navigate(["/admin/customer/items-management/all-items"]);
  }
}
