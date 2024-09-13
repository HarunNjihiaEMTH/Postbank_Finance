import { Component, Inject, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { takeUntil } from "rxjs";
import { TokenCookieService } from "src/app/core/service/token-storage-cookies.service";

import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { SegmentLookupComponent } from "src/app/user/commons/components/segment-lookup/segment-lookup.component";
import { ItemService } from "src/app/user/data/services/customer/item.service";
import { StockCategoryService } from "src/app/user/data/services/customer/stock-category.service";
import { UraService } from "src/app/user/data/services/customer/ura.service";
import { Item } from "src/app/user/data/types/customer-types/item";
import { StockCategory } from "src/app/user/data/types/customer-types/stock-category";

@Component({
  selector: "app-add-item",
  templateUrl: "./add-item.component.html",
  styleUrls: ["./add-item.component.sass"],
})
export class AddItemComponent extends BaseComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = "end";
  verticalPosition: MatSnackBarVerticalPosition = "top";

  categories: StockCategory[] = [];
  unitsOfMeasure: any[] = [];
  commodityConfigurationForm: FormGroup;
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
  tenderAdvertParticulars: any[] = [];
  servicesSelected: boolean = false;

  fmData: any;
  function_type: string;
  itemData: any;
  btnColor: any;
  btnText: any;
  hideBtn = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private snackbar: SnackbarService,
    private stockCategoryService: StockCategoryService,
    private itemService: ItemService,
    private uraService: UraService,
    private tokenCookieService: TokenCookieService,
    private _snackBar: MatSnackBar
  ) {
    super();

    if (this.router.getCurrentNavigation().extras.state) {
      this.fmData = this.router.getCurrentNavigation().extras.state;

      if (this.fmData.function_type == "UPDATE") {
        this.function_type = "UPDATE";
        const eData = localStorage.getItem("editStockData");
        if (eData) {
          this.itemData = JSON.parse(eData);
        }
      }
    } else {
      this.function_type = "ADD";
    }
  }

  ngOnInit(): void {
    this.username = this.tokenCookieService.getUser().username;

    this.getCurrencies();

    this.getUnitsOfMeasure();

    

    //this.getCategories();

    this.getPage();
  }
  getPage(){
    if (this.function_type == "ADD") {
      this.commodityConfigurationForm = this.createCommodityConfigurationForm();
      this.btnColor = "primary";
      this.btnText = "SUBMIT";
    } else if (this.function_type == "UPDATE") {
  
      this.commodityConfigurationForm = this.createCommodityUpdateConfigurationForm();
     
      this.btnColor = "primary";
      this.btnText = "UPDATE";
    }

  }

  createCommodityConfigurationForm() {
    return this.fb.group({
      operationType: ["101", Validators.required],
      goodsName: ["", Validators.required],
      measureUnit: "101",
      unitPrice: ["", Validators.required],
      currency: "101",
      commodityCategoryId: ["", Validators.required],
      haveExciseTax: ["", Validators.required],
      description: [""],
      stockPrewarning: ["", Validators.required],
      goodorservice: [""],
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

  createCommodityUpdateConfigurationForm() {
    return this.fb.group({
      id: [this.itemData.id],
      operationType: [this.itemData.operationType, Validators.required],
      goodsName: [this.itemData.goodsName, Validators.required],
      measureUnit: this.itemData.measureUnit,
      unitPrice: [this.itemData.unitPrice, Validators.required],
      currency: this.itemData.currency,
      commodityCategoryId: [this.itemData.commodityCategoryId, Validators.required],
      haveExciseTax: [this.itemData.haveExciseTax, Validators.required],
      description: [this.itemData.description],
      stockPrewarning: [this.itemData.stockPrewarning, Validators.required],
      goodorservice: [this.itemData.goodorservice],
      havePieceUnit: this.itemData.havePieceUnit,
      pieceMeasureUnit: this.itemData.pieceMeasureUnit,
      packageScaledValue: this.itemData.packageScaledValue,
      exciseDutyCode: [this.itemData.exciseDutyCode],
      haveOtherUnit: [this.itemData.haveOtherUnit],
      goodsOtherUnits: new FormArray(this.itemData.goodsOtherUnits),
      pieceUnitPrice: [this.itemData.pieceUnitPrice],
      pieceScaledValue: this.itemData.pieceScaledValue,
    });
  }

  get f() {
    return this.commodityConfigurationForm.controls;
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
        this.commodityConfigurationForm.patchValue({
          commodityCategoryId: result.data.commoditycode,
        });

        if (result.data.isservice == "YES") {
          this.servicesSelected = true;

          this.commodityConfigurationForm.patchValue({
            goodorservice: "Service",
            stockPrewarning: 0
          });
        } else {
          this.servicesSelected = false;

          this.commodityConfigurationForm.patchValue({
            goodorservice: "Service",
          });
        }

        console.log(result);
      });
  }

  onSelectIncludeVatInformationOption(event) {
    if (event.value == "Yes") {
      this.includeVatTaxInformation = true;
    } else {
      this.includeVatTaxInformation = false;
    }
  }

  onSelectIncludeExeciseTaxInformation(event) {
    if (event.value == "Yes") {
      this.includeExeciseTaxInformation = true;
    } else {
      this.includeExeciseTaxInformation = false;
    }
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
    console.log("Commodity Form", this.commodityConfigurationForm.value);
    this.itemService
      .postCommodityToUra(this.commodityConfigurationForm.value)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (result) => {
          console.log(result);

          // this._snackBar.open(

          //     result.body.description,
          //   {
          //     horizontalPosition: this.horizontalPosition,
          //     verticalPosition: this.verticalPosition,
          //     duration: 2000000,
          //     panelClass: ["snackbar-success", "snackbar-success"],
          //   }
          // );

          this.snackbar.showNotification(
            "snackbar-success",
            result.body.description
          );
        },
        (err) => {
          console.log(err);
        }
      );
  }

  addCommodity() {
    console.log("Commodity Form", this.commodityConfigurationForm.value);
    console.log("Commodity", this.commodityConfigurationForm.value);

    this.loading = true;
    if(this.function_type == "ADD"){
      this.itemService
      .restockNow(this.commodityConfigurationForm.value)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (result) => {
          if (result.body.code == "00") {
            let message = "SYSTEM RESPONCE: ";
            this._snackBar.open(
              message +
                "\n STATUS CODE: " +
                result.statusCode +
                "\n STATUS CODE VALUE| " +
                result.statusCodeValue +
                "\n DESCRIPTION| " +
                result.body.description,
              "X",
              {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 2000000,
                panelClass: ["snackbar-success", "snackbar-success"],
              }
            );

            this.router.navigate(["/admin/customer/items-management/all-items"]);
          } else {
            let message = "SYSTEM RESPONCE: ";
            this._snackBar.open(
              message +
                "\n STATUS CODE: " +
                result.statusCode +
                "\n STATUS CODE VALUE| " +
                result.statusCodeValue +
                "\n DESCRIPTION| " +
                result.body.description,
              "X",
              {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 2000000,
                panelClass: ["snackbar-danger", "snackbar-success"],
              }
            );
          }

          console.log(result);
        },
        (err) => {
          console.log(err);
          this.snackbar.showNotification(
            "snackbar-danger",
            "Unable to upload item at the moment, try again later ! "
          );
        }
      );
      
    }else if(this.function_type == "UPDATE"){
      this.itemService
      .updateRestockNow(this.commodityConfigurationForm.value)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (result) => {
          if (result.body.code == "00") {
            let message = "SYSTEM RESPONCE: ";
            this._snackBar.open(
              message +
                "\n STATUS CODE: " +
                result.statusCode +
                "\n STATUS CODE VALUE| " +
                result.statusCodeValue +
                "\n DESCRIPTION| " +
                result.body.description,
              "X",
              {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 2000000,
                panelClass: ["snackbar-success", "snackbar-success"],
              }
            );

            this.router.navigate(["/admin/customer/items-management/all-items"]);
          } else {
            let message = "SYSTEM RESPONCE: ";
            this._snackBar.open(
              message +
                "\n STATUS CODE: " +
                result.statusCode +
                "\n STATUS CODE VALUE| " +
                result.statusCodeValue +
                "\n DESCRIPTION| " +
                result.body.description,
              "X",
              {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 2000000,
                panelClass: ["snackbar-danger", "snackbar-success"],
              }
            );
          }

          console.log(result);
        },
        (err) => {
          console.log(err);
          this.snackbar.showNotification(
            "snackbar-danger",
            "Unable to upload item at the moment, try again later ! "
          );
        }
      );
      
    }
   
  }

  getUnitsOfMeasure() {
    this.uraService
      .listAllUnitsOfMeasure()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          console.log("Units of measure", res);
          this.unitsOfMeasure = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getCurrencies() {
    this.uraService
      .listAllCurrencies()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          console.log(res);
          this.unitsOfMeasure = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  onCancel() {
    this.router.navigate(["/admin/customer/items-management/all-items"]);
  }


  ngOnDestroy() {
    localStorage.removeItem("editStockData");
  }
}
