import { SelectionModel } from "@angular/cdk/collections";
import { HttpEventType, HttpResponse } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  MatSnackBar,
} from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { Observable, Subscription, takeUntil } from "rxjs";
import { ActiveBillsService } from "src/app/admin/data/services/activebills.service";
import { LocalStorageService } from "src/app/admin/data/services/localstorage.service";
import { ParametersService } from "src/app/admin/data/services/parameters.service";
import { UploadInvoiceService } from "src/app/admin/data/services/uploadInvoice.service";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { BranchCodeLookupComponent } from "src/app/user/commons/components/branch-code-lookup/branch-code-lookup.component";
import { ExpenseService } from "src/app/user/data/services/expense.service";
import { SupplierService } from "src/app/user/data/services/supplier.service";
import { Category } from "src/app/user/data/types/category";

import { PickingItemComponent } from "../../../pay-bill/dialog/picking-item/picking-item.component";


@Component({
  selector: "app-update-bill",
  templateUrl: "./update-bill.component.html",
  styleUrls: ["./update-bill.component.sass"],
})
export class UpdateBillComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = "end";
  verticalPosition: MatSnackBarVerticalPosition = "top";

  routeState: any;
  selecBill: any;
  billData: any;
  //*********************************************************************************************************
  displayedColumns: string[] = [
    "select",
    "costCenterid",
    "costCentername",
    "expenseName",
    "expenseAccount",
  ];
  dataSource!: MatTableDataSource<Category>;
  @ViewChild("paginatorCostCenters") paginatorCCs: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };
  //selectedCenters = [];
  selection = new SelectionModel<any>(true, []);
  //*********************************************************************************************************
  displayedColumnsPointing: string[] = [
    "select",
    "tranid",
    "trandate",
    "tranparticular",
    "currency",
    "tranamount",
    "reversedamount",
    "reversingamount",
    "action",
  ];
  dataSourcePointing!: MatTableDataSource<any>;
  @ViewChild("paginatorPointingDetails") paginatorPointing: MatPaginator;
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sortPointing!: MatSort;
  selectionPointing = new SelectionModel<any>(true, []);
  //*********************************************************************************************************
  finalFormEven: FormGroup;
  finalFormCustom: FormGroup;

  evenHolderForm: FormGroup;

  costCenterForm: FormGroup;
  evenCostCenterForm: FormGroup;
  dyForm: FormGroup;

  isSuccessful = false;
  isUploadFailed = false;
  errorMessage = "";

  action: string;
  dialogTitle: string;

  Data?: any;
  message?: any;
  Form!: FormGroup;

  subscription!: Subscription;
  accounts: any;

  selectFeedback: " ";
  billInfo: any;
  isLoading: boolean = true;

  masterSelected: boolean;
  checklist: any[] = [];
  checkedList: any;
  centersList: any;
  selectedCenter: any;

  selected: boolean = false;
  selectedRows: any;

  totalForEach: number = 0;
  taxForEach: number = 0;
  grossAmt: number;

  selectedEvenly: boolean = true;
  selectedCustom: boolean = false;

  customTotal = 0;

  multimodifyloading: boolean = false;
  allFilled: boolean = false;

  costCenterArray: number[] = [];
  poData: any;
  taxes: any;

  poAvailable: boolean = true;
  invoiceAvailable: boolean = false;

  customDetails: any[] = [];
  prepForm: FormGroup;
  hide2 = true;
  labelPosition1: "Yes" | "No" = "No";
  labelPosition2: "No" | "Yes" = "Yes";
  labelPosition3: "Yes" | "No" = "No";

  labelIncomeWH: "No" | "Yes" = "Yes";
  labelVatWH: "No" | "Yes" = "Yes";

  displayedColumnss: string[] = [
    "accountNo",
    "accountName",
    "amount",
    "parttranstype",
    "narration",
    "actions",
  ];
  dataSource2!: MatTableDataSource<any>;
  @ViewChild("paginatorLegal") paginatorLegal: MatPaginator;
  //@ViewChild(MatPaginator) paginator2!: MatPaginator;
  @ViewChild(MatSort) sort2!: MatSort;

  paymentInfo: any[] = [];
  variablePymentInfo: any[] = [];

  paymentInfoEven: any[] = [];

  vatRate: number = 0;
  vatWHRate: number = 0;
  incomeWHRate: number = 0;

  supplierAmt: number = 0;
  vatAmt: number = 0;
  vatWHAmt: number = 0;
  incomeWHAmt: number = 0;

  isGoods: boolean = false;
  isService: boolean = false;

  netAmount: number;

  vatWHAccount: any;
  incomeWHAccount: any;

  toDebitTotal: number;
  debitsArray: number[] = [];

  suppliers: any;
  expenses: any;
  selectedSupp: any;
  selectedExp: any;
  debitAmt: number = 0;

  amountForEach: number;
  customValueValid: boolean = false;
  grosssAmount: number;

  ccSelected: number = 0;

  incurTax: boolean = true;
  incurVatWH: boolean = true;
  incurIncomeWH: boolean = true;

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  messageShow = "";
  fileInfos?: Observable<any>;
  invoiceloading: boolean = false;

  initialExpense: any;

  referenceNo: string = "";

  toppings = new FormControl();

  showPointingInfo: boolean = false;
  supplier: any;

  pointingDetails: any[] = [];

  selectedItems = new FormControl([]);

  selectedItemsIDs: any[] = [];

  selectedSupplier: any;

  selectedExpDetails: any[] = [];

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private payBill: ActiveBillsService,
    private parameterService: ParametersService,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private supplierService: SupplierService,
    private expenseService: ExpenseService,
    private dialog: MatDialog,
    private uploadInvoice: UploadInvoiceService,
    private _snackBar: MatSnackBar
  ) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.routeState = this.router.getCurrentNavigation().extras.state;
      if (this.routeState) {
        this.selecBill = this.routeState.selectedDetails
          ? JSON.parse(this.routeState.selectedDetails)
          : "";

        this.localStorageService.set("rejectedBill", this.selecBill);
      }
    }
  }

  ngOnInit(): void {
    this.billData = this.localStorageService.get("rejectedBill");

    this._snackBar.open("REASON FOR REJECTION:  "+ this.billData.reason+" ",
      "X",
      {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 10000,
        panelClass: ["snackbar-danger", "snackbar-success"],
      }
    );

    this.getExpenses();
    this.initprepForm();

    this.prepForm.patchValue({
      supplier: this.billData.supplierId,
    });
    this.getSupplierById(this.billData.supplierId);
    this.billData.paymentExpenses.forEach((element) => {
      this.selectedItemsIDs.push(element.id);
      this.getExpenseById(element.id);
      this.getBillById(element.id);

      this.prepForm.patchValue({
        expense: this.selectedItemsIDs,
      });
    });

    this.getTaxes();
    this.getSuppliers();

    this.getTaxAccountNos();

    this.costCenterFormCustom();

    this.grosssAmount = this.prepForm.value.grossAmount;
    this.netAmount = this.prepForm.value.amountExcTax;

    this.paymentInfoEven = this.billData.paymentTrans;
    this.paymentInfo = this.billData.paymentTrans;
  }
  ngAfterViewInit() {
    // this.billData.selectedCostCenters.forEach((element) => {
    //   this.dataSource2.data.forEach((row) => {
    //     if (
    //       // row.costCenterid == element.costCenterid &&
    //       // row.expenseName == element.expenseName
    //       row.costCenterid == '8' &&
    //       row.expenseName == 'Category * Capital loss - UK securities'
    //     ){
    //       this.selection.select(row);
    //     }
    //   });
    // });

    this.refreshEvenDatasource();
    this.refreshDatasource();

    this.dataSource2.data.forEach((row) => {
      if (
        // row.costCenterid == element.costCenterid &&
        // row.expenseName == element.expenseName
        row.costCenterid == "8" &&
        row.expenseName == "Category * Capital loss - UK securities"
      ) {
        this.selection.select(row);
      }
    });
  }

  getSuppliers() {
    this.supplierService.getSuppliers().subscribe(
      (res) => {
        this.suppliers = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getExpenses() {
    this.expenseService.getExpenses().subscribe(
      (res) => {
        this.expenses = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getTaxes() {
    this.subscription = this.parameterService
      .getParameters()
      .subscribe((res) => {
        this.taxes = res;

        (this.vatWHAccount = this.taxes[1].taxAccount),
          (this.incomeWHAccount = this.taxes[2].taxAccount),
          this.prepForm.patchValue({
            vatAccount: this.taxes[1].taxAccount,
            iwtAccount: this.taxes[2].taxAccount,
          });
        console.log("Taxes = ", this.taxes[2].taxValue);

        this.prepForm.patchValue({
          vatRate: this.taxes[0].taxValue,
          vatWHRate: this.taxes[1].taxValue,
          incomeWHRate: this.taxes[2].taxValue,
        });
      });
  }
  branchCodeLookup() {
    const dialogRef = this.dialog.open(BranchCodeLookupComponent, {
      width: "600px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      this.prepForm.patchValue({
        supplierAccount: result.data.accountnumber,
      });
    });
  }

  getNetAmt(event: Event) {
    var stringToConvert = (event.target as HTMLInputElement).value;

    if (!isNaN(Number(stringToConvert))) {
      var numberValue = Number(stringToConvert);
      this.netAmount = numberValue;
    } else {
      this.snackbar.showNotification(
        "snackbar-danger",
        "Net amount must be a number!"
      );
    }
  }
  getGrossAmt(event: Event) {
    var stringToConvert = (event.target as HTMLInputElement).value;

    if (!isNaN(Number(stringToConvert))) {
      var numberValue = Number(stringToConvert);

      this.grosssAmount = numberValue;
      this.vatRate = Number(this.prepForm.value.vatRate);
      this.netAmount = Math.round(
        (100 * this.grosssAmount) / (this.vatRate + 100)
      );

      this.prepForm.patchValue({
        amountExcTax: this.netAmount,
        invoiceAmount: this.grosssAmount,
      });

      if (this.selectedEvenly) {
        this.calculate();
        this.finalCalcs();
      }

      if (this.selectedCustom) {
        this.refreshCalculations();
      }
    } else {
      this.snackbar.showNotification(
        "snackbar-danger",
        "Net amount must be a number!"
      );
    }
  }
  getRates(event: Event) {
    var stringToConvert = (event.target as HTMLInputElement).value;

    if (!isNaN(Number(stringToConvert))) {
      var numberValue = Number(stringToConvert);
      this.vatRate = numberValue;

      if (this.selectedEvenly) {
        this.calculate();
        this.finalCalcs();
      }

      if (this.selectedCustom) {
        this.refreshCalculations();
      }
    } else {
      this.snackbar.showNotification(
        "snackbar-danger",
        "Net amount must be a number!"
      );
    }
  }

  calculateNet(event: Event) {
    var stringToConvert = (event.target as HTMLInputElement).value;

    if (!isNaN(Number(stringToConvert))) {
      var numberValue = Number(stringToConvert);

      this.vatRate = numberValue;

      this.grosssAmount = Number(this.prepForm.value.grossAmount);
      this.netAmount = Math.round(
        (100 * this.grosssAmount) / (this.vatRate + 100)
      );

      this.prepForm.patchValue({
        amountExcTax: this.netAmount,
      });
    } else {
      this.snackbar.showNotification(
        "snackbar-danger",
        "Net amount must be a number!"
      );
    }

    if (this.selectedEvenly) {
      this.calculate();
      this.finalCalcs();
    }

    if (this.selectedCustom) {
      this.refreshCalculations();
    }
  }

  //****************************************************************************************************** */
  //Picking Info

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelectedPicking() {
    const numSelected = this.selectionPointing.selected.length;
    const numRows = this.dataSourcePointing.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterTogglePicking() {
    if (this.isAllSelected()) {
      this.selectionPointing.clear();
      return;
    }

    this.selectionPointing.select(...this.dataSourcePointing.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabelPicking(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? "deselect" : "select"} all`;
    }
    return `${
      this.selectionPointing.isSelected(row) ? "deselect" : "select"
    } row ${row.position + 1}`;
  }

  getSelectedPickingInfo() {
    console.log("this.selection.selected; ", this.selectionPointing.selected);
  }

  getPointingDetailsId(expAccNo) {
    this.parameterService.getPointingDetailsByAcc(expAccNo).subscribe(
      (response: any) => {
        this.pointingDetails = [];
        this.pointingDetails = response;

        console.log("Pointing info = ", this.pointingDetails);
        if (this.pointingDetails) {
          this.isLoading = false;
        }
        this.dataSourcePointing = null;
        this.dataSourcePointing = new MatTableDataSource<any>(
          this.pointingDetails
        );
        this.dataSourcePointing.paginator = this.paginatorPointing;
        this.dataSourcePointing.sort = this.sortPointing;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updatePickingItemCall(i, data) {
    const dialogRef = this.dialog.open(PickingItemComponent, {
      width: "800px",
      data: {
        data: data,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.updatePickingItem(i, result.data);
    });
  }

  updatePickingItem(i: any, pickingItem: any) {
    this.pointingDetails[i] = pickingItem;

    this.dataSourcePointing = new MatTableDataSource<any>(this.pointingDetails);
    this.dataSourcePointing.paginator = this.paginatorPointing;
    this.dataSourcePointing.sort = this.sortPointing;
  }

  //****************************************************************************************************** */
  getHavePO(event: any) {
    //console.log("radio 1 = ", event.value);
    if (event.value == "Yes") {
      this.poAvailable = true;
    } else if (event.value == "No") {
      this.poAvailable = false;
    }
  }
  getHaveInvoice(event: any) {
    //console.log("radio 1 = ", event.value);
    if (event.value == "Yes") {
      this.invoiceAvailable = true;
    } else if (event.value == "No") {
      this.invoiceAvailable = false;
    }
  }

  getIncurTax(event: any) {
    //console.log("radio 2 = ", event.value);
    if (event.value == "Yes") {
      this.incurTax = true;
    } else if (event.value == "No") {
      this.incurTax = false;
    }

    if (this.selectedEvenly) {
      this.calculate();
      this.finalCalcs();
    }

    if (this.selectedCustom) {
      this.refreshCalculations();
    }
  }
  getIncurVatWH(event: any) {
    if (event.value == "Yes") {
      this.incurVatWH = true;
    } else if (event.value == "No") {
      this.incurVatWH = false;
    }
    if (this.selectedEvenly) {
      this.calculate();
      this.finalCalcs();
    }

    if (this.selectedCustom) {
      this.refreshCalculations();
    }
  }

  getIncurIncomeWH(event: any) {
    if (event.value == "Yes") {
      this.incurIncomeWH = true;
    } else if (event.value == "No") {
      this.incurIncomeWH = false;
    }
    if (this.selectedEvenly) {
      this.calculate();
      this.finalCalcs();
    }

    if (this.selectedCustom) {
      this.calculateAmts();
      this.validateDebitTotal();
    }
  }

  //   paymentExpenses: Array(2)
  // 0: {expenseId: 5, expenseName: 'Electricity bills'}
  // 1: {expenseId: 7, expenseName: 'Fees chrged by banks'}
  initprepForm() {
    this.prepForm = this.fb.group({
      id: [this.billData.id],
      supplier: [this.billData.supplierId],
      supplierId: [this.billData.supplierId],
      supplierName: [this.billData.supplierName],
      supplierAccount: [this.billData.supplierAccount, Validators.required],
      vatAccount: [this.billData.vatAccount],
      iwtAccount: [this.billData.iwtAccount],

      grossAmount: [this.billData.grossAmount, Validators.required],
      amountExcTax: [this.billData.amountExcTax, Validators.required],

      havePo: new FormControl(this.billData.havePo, Validators.required),

      incurTax: new FormControl(this.billData.incurTax, Validators.required),
      expense: [this.billData.expense, Validators.required],

      expenseIds: [this.billData.expenseIds],
      expenseNames: [this.billData.expenseNames],
      paymentTrans: [this.billData.paymentTrans],

      haveInvoice: [this.billData.haveInvoice],
      invoiceDate: [this.billData.invoiceDate],
      invoiceNo: [this.billData.invoiceNo],
      invoiceRefNo: [this.billData.invoiceRefNo],

      supplierAmount: [this.billData.supplierAmount],
      vatAmount: [this.billData.vatAmount],
      iwtAmount: [this.billData.iwtAmount],

      incurVatWH: new FormControl(
        this.billData.incurVatWH,
        Validators.required
      ),
      incurIncomeWH: new FormControl(
        this.billData.incurIncomeWH,
        Validators.required
      ),

      vatRate: [this.billData.vatRate],
      vatWHRate: [this.billData.vatWHRate],
      incomeWHRate: [this.billData.incomeWHRate],

      invoiceAmount: [this.billData.invoiceAmount],

      conversionRate: [this.billData.conversionRate],

      paymentExpenses: [""],

      transactionCode: [this.billData.transactionCode],
      bank: [this.billData.bank],
      tin: [this.billData.tin],
      currency: [this.billData.currency],
      country: [this.billData.country],
      paymentHistory: [this.billData.paymentHistory],
      description: [this.billData.description],
    });
  }

  getSelectedSupplier(event: any) {
    this.selectedSupp = event.value;
    this.getSupplierById(event.value);
  }
  getSupplierById(suppIds) {
    this.supplierService.getSupplierById(suppIds).subscribe((response: any) => {
      this.selectedSupplier = response;
      console.log("-", this.selectedSupplier);
      this.prepForm.patchValue({
        supplierId: this.selectedSupplier.id,
        supplierAccount: this.selectedSupplier.supplierAccount,
        supplierName: this.selectedSupplier.supplierName,
      });
    });
  }
  // getSelectedExpense(event: any) {
  //   this.selectedExp = event.value;

  //   console.log("Selected expenses: ", this.selectedExp);

  //   this.getBillById(this.selectedExp.toString());

  //   this.selectedExp.forEach((element) => {
  //     console.log("element: ", element);
  //     this.getExpenseById(element);
  //   });

  //   // this.selectedExp.forEach(function (value) {
  //   //   console.log("value: ", value);
  //   //   this.getExpenseById(value);
  //   // });
  // }
  // getExpenseById(expId) {
  //   this.expenseService.getExpenseById(expId).subscribe((response: any) => {
  //     this.initialExpense = response;
  //     console.log("initialExpense = ", this.initialExpense.isPointing);

  //     if (this.initialExpense.isPointing == true) {
  //       this.showPointingInfo = true;
  //       this.getPointingDetailsId(this.initialExpense.expenseAccount);
  //     } else if (this.initialExpense.isPointing == false) {
  //       this.showPointingInfo = false;
  //     } else {
  //       this.showPointingInfo = false;
  //     }

  //     if (this.initialExpense.expense_type == "Goods") {
  //       this.isGoods = true;
  //     } else if (this.initialExpense.expense_type == "Service") {
  //       this.isService = true;
  //     } else if (this.initialExpense.expense_type == "Good") {
  //       this.isGoods = true;
  //     } else if (this.initialExpense.expense_type == "Services") {
  //       this.isService = true;
  //     }

  //     // this.prepForm.patchValue({
  //     //   expense: this.initialExpense.expenseDescription,
  //     // });
  //   });
  // }

  getSelectedExpense(event: any) {
    this.selectedExp = event.value;
    this.selectedExpDetails = [];
    this.getBillById(this.selectedExp.toString());

    this.selectedExp.forEach((element) => {
      //console.log("element: ", element);
      this.getExpenseById(element);
    });
  }
  getExpenseById(expId) {
    this.expenseService.getExpenseById(expId).subscribe((response: any) => {
      this.initialExpense = response;

      console.log("initialExpense = ", this.initialExpense);

      if (this.initialExpense.isPointing == true) {
        this.showPointingInfo = true;
        this.getPointingDetailsId(this.initialExpense.expenseAccount);
      } else if (this.initialExpense.isPointing == false) {
        this.showPointingInfo = false;
      } else {
        this.showPointingInfo = false;
      }

      if (this.initialExpense.expense_type == "Goods") {
        this.isGoods = true;
      } else if (this.initialExpense.expense_type == "Service") {
        this.isService = true;
      } else if (this.initialExpense.expense_type == "Good") {
        this.isGoods = true;
      } else if (this.initialExpense.expense_type == "Services") {
        this.isService = true;
      }

      // expenseId": 0,
      //   "expenseName": "string",
      this.selectedExpDetails.push({
        expenseId: this.initialExpense.id,
        expenseName: this.initialExpense.expenseDescription,
      });

      console.log("this.selectedExpDetails ", this.selectedExpDetails);
      this.prepForm.patchValue({
        paymentExpenses: this.selectedExpDetails,
      });
    });
  }
  getTaxAccountNos() {
    this.subscription = this.parameterService.getAccounts().subscribe((res) => {
      this.accounts = res;
    });
  }

  getSelectedPayType(event: any) {}

  typeSelected() {
    this.selectedEvenly = false;
    this.selectedCustom = true;
  }

  getBillById(expIds) {
    this.parameterService.getBillByExpenseId(expIds).subscribe(
      (response: any) => {
        //this.detail = response;

        this.checklist = [];
        this.checklist = response;
        this.centersList = response;
        console.log("BillInfo = ", this.checklist[0]);

        if (this.checklist) {
          this.isLoading = false;
        }
        this.dataSource = null;
        this.dataSource = new MatTableDataSource<any>(this.checklist);
        //this.selectedCenters.push(this.dataSource.data[8]);
        // console.log("datasource: ", this.dataSource.data[8]);
        // this.selection = new SelectionModel<any>(true, [this.checklist[1]]);
        this.dataSource.paginator = this.paginatorCCs;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //  Upload invoice
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
  upload(): void {
    this.referenceNo = this.prepForm.value.invoiceRefNo;

    this.invoiceloading = true;
    this.progress = 0;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        this.uploadInvoice
          .upload(this.currentFile, this.referenceNo)
          .subscribe({
            next: (event: any) => {
              if (event.type === HttpEventType.UploadProgress) {
                this.progress = Math.round((100 * event.loaded) / event.total);
              } else if (event instanceof HttpResponse) {
                //this.messageShow = event.body.message;
                this.invoiceloading = false;
                this.snackbar.showNotification(
                  "snackbar-success",
                  "Invoice uploaded sucessfully!"
                );
                //this.fileInfos = this.uploadInvoice.getFiles();
              }
            },
            error: (err: any) => {
              console.log(err);
              this.progress = 0;
              if (err.error && err.error.message) {
                this.message = err.error.message;
              } else {
                this.message = "Could not upload the file!";
              }
              this.currentFile = undefined;
            },
          });
      }
      this.selectedFiles = undefined;
    }
  }
  //******************************************************************************************************
  // Even distribution calculation

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? "deselect" : "select"} all`;
    }
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${
      row.position + 1
    }`;
  }

  checkboxActive() {
    this.selectedRows = this.selection.selected;
    this.calculate();
  }

  calculate() {
    this.selectedEvenly = true;
    this.selectedCustom = false;
    this.selected = true;
    this.ccSelected = this.selection.selected.length;

    this.grosssAmount = this.prepForm.value.grossAmount;

    this.amountForEach = this.grosssAmount / this.selection.selected.length;

    this.netAmount = this.prepForm.value.amountExcTax;

    this.vatRate = this.prepForm.value.vatRate;
    this.vatWHRate = this.prepForm.value.vatWHRate;
    this.incomeWHRate = this.prepForm.value.incomeWHRate;

    this.pushToArrayEven();
  }

  pushToArrayEven() {
    this.paymentInfoEven = [];
    for (let i = 0; i < this.selection.selected.length; i++) {
      this.costCenterFormEven(this.selection.selected[i]);
    }
    this.refreshEvenDatasource();
  }

  costCenterFormEven(object: any) {
    this.evenCostCenterForm = this.fb.group({
      costCenterDetails: [object],
      costCenter: [object.costCentername],

      accountName: [object.costCentername],
      accountNo: [object.expenseAccount],
      amount: [this.amountForEach],
      narration: ["Amount debited from cost center"],
      parttranstype: ["Debit"],
      accountCurrencyCode: [""],
    });

    this.paymentInfoEven.push(this.evenCostCenterForm.value);
  }

  calcDebitTotalsEven() {
    this.debitsArray = [];
    this.paymentInfoEven.forEach((element) => {
      this.debitsArray.push(element.amount);
    });

    this.toDebitTotal = 0;
    this.debitsArray.forEach((element) => {
      this.toDebitTotal += element;
    });
  }

  finalCalcs() {
    console.log("Final clicked");
    this.calculateEvenVatWHAmt();
    this.calculateEvenIncomeWHAmt();
    this.calculateEvenSupplierAmt();
  }
  calculateEvenVatWHAmt() {
    this.evenCostCenterForm.patchValue({
      accountName: "Vat WH A/C",
      accountNo: this.taxes[1].taxAccount,
      narration: "Amount credited to Vat WH",
      parttranstype: "Credit",
      accountCurrencyCode: ""
    });
    if (!this.incurTax) {
      this.evenCostCenterForm.patchValue({
        amount: 0,
      });
    } else if (this.incurTax) {
      if (this.isGoods) {
        this.vatWHAmt = Math.round((this.vatWHRate / 100) * this.netAmount);
        this.evenCostCenterForm.patchValue({
          amount: this.vatWHAmt,
        });
      } else if (this.isService) {
        if (this.incurVatWH) {
          this.vatWHAmt = Math.round((this.vatWHRate / 100) * this.netAmount);
          this.evenCostCenterForm.patchValue({
            amount: this.vatWHAmt,
          });
        } else if (!this.incurVatWH) {
          this.vatWHAmt = 0;
          this.evenCostCenterForm.patchValue({
            amount: 0,
          });
        }
      }
    }

    this.prepForm.patchValue({
      vatAmount: this.vatWHAmt,
    });

    this.paymentInfoEven.push(this.evenCostCenterForm.value);
    this.refreshEvenDatasource();
  }
  calculateEvenIncomeWHAmt() {
    this.evenCostCenterForm.patchValue({
      accountName: "Income WH A/C",
      accountNo: this.taxes[2].taxAccount,
      narration: "Amount credited to IWH",
      parttranstype: "Credit",
      accountCurrencyCode: ""
    });
    if (!this.incurTax) {
      this.evenCostCenterForm.patchValue({
        amount: 0,
      });
    } else if (this.incurTax) {
      if (this.isGoods) {
        this.evenCostCenterForm.patchValue({
          amount: 0,
        });
      } else if (this.isService) {
        // incurIncomeWH
        if (this.incurIncomeWH) {
          this.incomeWHAmt = Math.round(
            (this.incomeWHRate / 100) * this.netAmount
          );
          this.evenCostCenterForm.patchValue({
            amount: this.incomeWHAmt,
          });
        } else if (!this.incurIncomeWH) {
          this.incomeWHAmt = 0;
          this.evenCostCenterForm.patchValue({
            amount: 0,
          });
        }
      }
    }

    this.prepForm.patchValue({
      iwtAmount: this.incomeWHAmt,
    });

    this.paymentInfoEven.push(this.evenCostCenterForm.value);
    this.refreshEvenDatasource();
  }
  calculateEvenSupplierAmt() {
    this.evenCostCenterForm.patchValue({
      accountName: this.prepForm.value.supplierName,
      accountNo: this.prepForm.value.supplierAccount,
      narration: "Amount credited to supplier",
      parttranstype: "Credit",
      accountCurrencyCode: ""
    });
    if (!this.incurTax) {
      this.evenCostCenterForm.patchValue({
        amount: this.grosssAmount,
      });
    } else if (this.incurTax) {
      if (this.isGoods) {
        this.supplierAmt = this.grosssAmount - this.vatWHAmt;
        this.evenCostCenterForm.patchValue({
          amount: this.supplierAmt,
        });
      } else if (this.isService) {
        this.supplierAmt = this.grosssAmount - this.vatWHAmt - this.incomeWHAmt;
        this.evenCostCenterForm.patchValue({
          amount: this.supplierAmt,
        });
      }
    }
    this.prepForm.patchValue({
      supplierAmount: this.supplierAmt,
    });

    this.paymentInfoEven.push(this.evenCostCenterForm.value);
    this.refreshEvenDatasource();
  }

  refreshEvenDatasource() {
    //this.finalCalcs();
    this.dataSource2 = new MatTableDataSource<any>(this.paymentInfoEven);
    this.dataSource2.paginator = this.paginatorLegal;
    this.dataSource2.sort = this.sort2;

    console.log("Refreshed");
  }

  refTable() {
    if (this.selection.selected.length < 1) {
      this.paymentInfoEven = [];

      this.refreshEvenDatasource();
    }
  }

  public confirmAdd(): void {}

  onSubmitEven() {
    if (this.isGoods) {
      this.paymentInfoEven.splice(this.paymentInfoEven.length - 2, 1);
    }
    console.log("this.paymentInfoEven: ", this.paymentInfoEven);

    this.prepForm.patchValue({
      paymentTrans: this.paymentInfoEven,
    });

    this.payBill
      .updateBill(this.prepForm.value)
      .pipe()
      .subscribe(
        (res) => {
          console.log("Response = ", res);

          this._snackBar.open(JSON.stringify(res), "X", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 100000,
            panelClass: ["snackbar-success", "xsnackbar-success"],
          });

          this.router.navigateByUrl("/admin/bills/pending-bills");
        },
        (err) => {
          console.log("Error ", err);
          this.snackbar.showNotification(
            "snackbar-danger",
            "Transaction upload failure!"
          );
        }
      );

    console.log("Even array = ", this.prepForm.value);
  }

  //****************************************************************************************************
  // Custom value

  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();
    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }

  calculateAmts() {
    this.vatRate = this.prepForm.value.vatRate;
    this.vatWHRate = this.prepForm.value.vatWHRate;
    this.incomeWHRate = this.prepForm.value.incomeWHRate;

    this.createDebitsArray();
    this.costCenterForm.patchValue({
      accountName: this.selectedCenter.costCentername,
      accountNo: this.selectedCenter.expenseAccount,
      amount: this.costCenterForm.value.costCenterAmt,
      narration: "Amount debited from cost center",
      parttranstype: "Debit",
    });
  }
  createDebitsArray() {
    this.debitsArray = [];
    this.paymentInfo.forEach((element) => {
      this.debitsArray.push(element.amount);
    });
  }
  calcDebitTotals() {
    this.toDebitTotal = 0;
    this.debitsArray.forEach((element) => {
      this.toDebitTotal += element;
    });
  }

  calculateVatWHAmt() {
    this.costCenterForm.patchValue({
      accountName: "Vat WH A/C",
      accountNo: this.taxes[1].taxAccount,
      narration: "Amount credited to Vat WH",
      parttranstype: "Credit",
    });
    if (!this.incurTax) {
      this.costCenterForm.patchValue({
        amount: 0,
      });
    } else if (this.incurTax) {
      if (this.isGoods) {
        this.vatWHAmt = Math.round((this.vatWHRate / 100) * this.netAmount);
        this.costCenterForm.patchValue({
          amount: this.vatWHAmt,
        });
      } else if (this.isService) {
        if (this.incurVatWH) {
          this.vatWHAmt = Math.round((this.vatWHRate / 100) * this.netAmount);
          this.costCenterForm.patchValue({
            amount: this.vatWHAmt,
          });
        } else if (!this.incurVatWH) {
          this.vatWHAmt = 0;
          this.evenCostCenterForm.patchValue({
            amount: 0,
          });
        }
      }
    }
    this.prepForm.patchValue({
      vatAmount: this.vatWHAmt,
    });

    this.pushToArray();
  }
  calculateIncomeWHAmt() {
    this.costCenterForm.patchValue({
      accountName: "Income WH A/C",
      accountNo: this.taxes[2].taxAccount,
      narration: "Amount credited to IWH",
      parttranstype: "Credit",
    });
    if (!this.incurTax) {
      this.costCenterForm.patchValue({
        amount: 0,
      });
    } else if (this.incurTax) {
      if (this.isGoods) {
        this.costCenterForm.patchValue({
          amount: 0,
        });
      } else if (this.isService) {
        if (this.incurIncomeWH) {
          this.incomeWHAmt = Math.round(
            (this.incomeWHRate / 100) * this.netAmount
          );
          this.costCenterForm.patchValue({
            amount: this.incomeWHAmt,
          });
        } else if (!this.incurIncomeWH) {
          this.incomeWHAmt = 0;
          this.evenCostCenterForm.patchValue({
            amount: 0,
          });
        }
      }
    }

    this.prepForm.patchValue({
      iwtAmount: this.incomeWHAmt,
    });

    this.pushToArray();
  }
  calculateSupplierAmt() {
    console.log("Supplier: ", this.prepForm.value.supplierName);

    this.costCenterForm.patchValue({
      accountName: this.prepForm.value.supplierName,
      accountNo: this.prepForm.value.supplierAccount,
      narration: "Amount credited to supplier",
      parttranstype: "Credit",
    });
    if (!this.incurTax) {
      this.costCenterForm.patchValue({
        amount: this.grosssAmount,
      });
    } else if (this.incurTax) {
      if (this.isGoods) {
        this.supplierAmt = this.grosssAmount - this.vatWHAmt;
        this.costCenterForm.patchValue({
          amount: this.supplierAmt,
        });
      } else if (this.isService) {
        this.supplierAmt = this.grosssAmount - this.vatWHAmt - this.incomeWHAmt;
        this.costCenterForm.patchValue({
          amount: this.supplierAmt,
        });
      }
    }

    this.prepForm.patchValue({
      supplierAmount: this.supplierAmt,
    });

    this.pushToArray();
  }

  pushToArray() {
    this.paymentInfo.push(this.costCenterForm.value);

    this.calcDebitTotals();

    this.refreshDatasource();
    this.costCenterForm.reset();
  }

  validateDebitTotal() {
    if (this.toDebitTotal < this.prepForm.value.grossAmount) {
      this.snackbar.showNotification(
        "snackbar-danger",
        "Total debited amount must be equal gross to amount!"
      );
    } else if (this.toDebitTotal == this.prepForm.value.grossAmount) {
      this.calculateVatWHAmt();
      this.calculateIncomeWHAmt();
      this.calculateSupplierAmt();
      //this.toDebitTotal = this.toDebitTotal / 2;
      this.customValueValid = true;
    } else if (this.toDebitTotal > this.prepForm.value.grossAmount) {
      this.snackbar.showNotification(
        "snackbar-danger",
        "Total debited amount must not exceed gross amount!"
      );
    }
  }

  getAmt(event: Event) {
    const amtValue = (event.target as HTMLInputElement).value;

    this.costCenterForm.patchValue({
      debitAmt: this.costCenterForm.value.costCenterAmt,
    });

    this.calculateAmts();
  }

  costCenterFormCustom() {
    this.costCenterForm = this.fb.group({
      costCenterDetails: ["", [Validators.required]],

      costCenterAmt: [""],
      accountName: [""],
      accountNo: [""],
      amount: [""],
      narration: [""],
      parttranstype: [""],
      accountCurrencyCode: [""],
    });
  }

  refreshDatasource() {
    this.dataSource2 = new MatTableDataSource<any>(this.paymentInfo);
    this.dataSource2.paginator = this.paginatorLegal;
    this.dataSource2.sort = this.sort2;

    console.log("Refreshed");
  }

  refreshCalculations() {
    this.vatRate = this.prepForm.value.vatRate;
    this.vatWHRate = this.prepForm.value.vatWHRate;
    this.incomeWHRate = this.prepForm.value.incomeWHRate;

    const arr = this.paymentInfo;

    const withoutLast3 = arr.slice(0, -3);

    this.paymentInfo = withoutLast3;

    console.log("Final array = ", this.paymentInfo);

    this.refreshDatasource();

    this.calculateVatWHAmt();
    this.calculateIncomeWHAmt();
    this.calculateSupplierAmt();

    this.refreshDatasource();
  }

  getSelectedCenter(event: any) {
    console.log("Center: ", event.value);
    this.selectedCenter = event.value;

    this.costCenterForm.patchValue({
      //costDetails: this.selectedCenter,
      costCenter: this.selectedCenter,
      costCenterAmt: ["", [Validators.required]],
      debitAcc: this.selectedCenter.expenseAccount,
      debitAmt: this.costCenterForm.value.costCenterAmt,

      creditSupplierAcc: this.prepForm.value.supplierAccount,
    });
  }

  onRemoveItem(i: any) {
    this.paymentInfo.splice(i, 1);
    this.refreshDatasource();

    this.calcDebitTotals();
  }

  onSubmitCustom() {
    for (var i = 0; i < this.paymentInfo.length; i++) {
      if (this.paymentInfo[i].amount <= 0) {
        this.paymentInfo.splice(i, 1);
      }
    }
    if (this.customValueValid) {
      console.log("Final prep: ", this.paymentInfo);
      this.prepForm.patchValue({
        paymentTrans: this.paymentInfo,
      });
      this.payBill
        .updateBill(this.prepForm.value)
        .pipe()
        .subscribe(
          (res) => {
            console.log("Response = ", res);

            // this.snackbar.showNotification("snackbar-success", res);

            this.snackbar.showNotification(
              "snackbar-success",
              "Transaction performed successfully!"
            );

            this.router.navigateByUrl("/admin/bills/pending-bills");
          },
          (err) => {
            console.log("Error ", err);
            this.snackbar.showNotification(
              "snackbar-danger",
              "Transaction upload failure!"
            );
          }
        );
    } else {
      this.snackbar.showNotification(
        "snackbar-danger",
        "Ensure expense amount is fully distributed!"
      );
    }
  }
}
