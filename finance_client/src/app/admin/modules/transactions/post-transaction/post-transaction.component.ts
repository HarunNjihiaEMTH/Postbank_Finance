import { SelectionModel } from "@angular/cdk/collections";
import { HttpEventType, HttpParams, HttpResponse } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
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
import { TokenCookieService } from "src/app/core/service/token-storage-cookies.service";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { ExpenseService } from "src/app/user/data/services/expense.service";
import { SupplierService } from "src/app/user/data/services/supplier.service";
import { Category } from "src/app/user/data/types/category";
import { CostCenterLookupComponent } from "../../bills/pay-bill/dialog/cost-center-lookup/cost-center-lookup.component";
import { EditPaymentBreakdownComponent } from "../../bills/pay-bill/dialog/edit-payment-breakdown/edit-payment-breakdown.component";
import { ExpensesLookupComponent } from "../../bills/pay-bill/dialog/expenses-lookup/expenses-lookup.component";
import { PickingItemComponent } from "../../bills/pay-bill/dialog/picking-item/picking-item.component";
import { TaxesLookupComponent } from "../../bills/pay-bill/dialog/taxes-lookup/taxes-lookup.component";
import { BranchCodeLookupComponent } from "../../supplier/pages/expenses-management/branch-code-lookup/branch-code-lookup.component";
import { AddDescriptionForReportComponent } from "../../transfer-transactions/dialogs/add-description-for-report/add-description-for-report.component";
import { ExpenseCostcenterAccLookupComponent } from "../../transfer-transactions/dialogs/expense-costcenter-acc-lookup/expense-costcenter-acc-lookup.component";
import { AccrualSuppliersLookupComponent } from "./dialogs/accrual-suppliers-lookup/accrual-suppliers-lookup.component";



@Component({
  selector: "app-post-transaction",
  templateUrl: "./post-transaction.component.html",
  styleUrls: ["./post-transaction.component.sass"],
})
export class PostTransactionComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = "end";
  verticalPosition: MatSnackBarVerticalPosition = "top";

  routeState: any;
  selecBill: any;
  billData: any;
  //***********************************************************************************************************
  // displayedColumns: string[] = [
  //   "select",
  //   "costCenterid",
  //   "costCentername",
  //   "expenseName",
  //   "expenseAccount",
  // ];
  // dataSource!: MatTableDataSource<Category>;
  // @ViewChild("paginatorCostCenters") paginatorCCs: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;
  // contextMenu: MatMenuTrigger;
  // contextMenuPosition = { x: "0px", y: "0px" };

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


  // displayedColumnss: string[] = [
  //   "accountNo",
  //   "accountName",
  //   "amount",
  //   "parttranstype",
  //   "narration",
  //   "actions",
  // ];
  // dataSource2!: MatTableDataSource<any>;
  // @ViewChild("paginatorLegal") paginatorLegal: MatPaginator;
  // //@ViewChild(MatPaginator) paginator2!: MatPaginator;
  // @ViewChild(MatSort) sort2!: MatSort;

  paymentInfo: any[] = [];
  variablePymentInfo: any[] = [];

  paymentInfoEven: any[] = [];
  costCentersSelectedCustom: any[] = [];
  costCentersSelectedEven: any[] = [];

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

  expenses: any;
  selectedSupp: any;
  selectedExp: any[] = [];
  debitAmt: number = 0;

  amountForEach: number;
  customValueValid: boolean = false;
  toDebitAmount: number;

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

  selectedExpDetails: any[] = [];
  expenseNames: any[] = [];
  expenseArraysSelected: any[] = [];

  suppliers: any;
  selectedSup: any[] = [];

  costCenterNarration: string;
  accrualNarration: string;
  costCenterTransType: string;
  accrualTransType: string;

  currentUser: any;



  selecTrans: any;
  minorDet: any;
  transData: any;
  difference: number;

  isTransactionLoading: boolean = false;

  supplierAccrualInfo: any;
  accrualInfo: any;

  reverseWhole: boolean = false;
  isDateReadOnly: boolean = false;

  constructor(
    
    private localStorageService: LocalStorageService,
    private payBill: ActiveBillsService,
    private parameterService: ParametersService,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private router: Router,
    private supplierService: SupplierService,
    private expenseService: ExpenseService,
    private dialog: MatDialog,
    private uploadInvoice: UploadInvoiceService,
    private _snackBar: MatSnackBar,
    private tokenCookieService: TokenCookieService,
  ) {
    this.initprepForm();

    if (this.router.getCurrentNavigation().extras.state) {
      this.routeState = this.router.getCurrentNavigation().extras.state;
      if (this.routeState.action == "Pay supplier") {
        this.supplier = this.routeState.supplierDetails
          ? JSON.parse(this.routeState.supplierDetails)
          : "";
      } else {
        this.routeState = "";
      }
    }
    if (this.router.getCurrentNavigation().extras.state) {
      this.routeState = this.router.getCurrentNavigation().extras.state;
      if (this.routeState.action == "Redo transaction") {
        this.selecTrans = this.routeState.selectedDetails
          ? JSON.parse(this.routeState.selectedDetails)
          : "";
        this.minorDet = this.routeState.minorDetails
          ? JSON.parse(this.routeState.minorDetails)
          : "";
        this.difference = this.routeState.difference
          ? JSON.parse(this.routeState.difference)
          : "";
 
        //console.log("After 1 minorDet", this.minorDet);
       this.localStorageService.set("supplierTrans", this.selecTrans);
        this.localStorageService.set("minorTrans", this.minorDet);
        this.localStorageService.set("difference", this.difference);
 
      }
    }
    if (this.router.getCurrentNavigation().extras.state) {
      this.routeState = this.router.getCurrentNavigation().extras.state;
      if (this.routeState.action == "Reverse accrual") {
        this.supplierAccrualInfo = this.routeState.supplierDetails
          ? JSON.parse(this.routeState.supplierDetails)
          : "";
          this.accrualInfo = this.routeState.selectedAccrual
          ? JSON.parse(this.routeState.selectedAccrual)
          : "";
      } else {
        this.routeState = "";
      }
    }
  }

  // action: "Reverse accrual",
  // selectedAccrual: JSON.stringify(this.selectedRows),
  // supplierDetails:  JSON.stringify(this.transData),
  ngOnInit(): void {
    this.currentUser = this.tokenCookieService.getUser().username;


    this.initTransactionForm();
    this.initTransactionArray();
    this.getTransactions();
    this.getSuppliers();
    this.getTaxes();


    this.prepForm.patchValue({
      postedBy: this.currentUser,
    });

    if (this.supplier) {
      this.prepForm.patchValue({
        supplier: this.supplier.id,
        supplierAccount: this.supplier.supplierAccount,
      });
    }

    
    if (this.minorDet) {
      this.transData = this.localStorageService.get("supplierTrans");
      this.minorDet = this.localStorageService.get("minorTrans");
      this.difference = this.localStorageService.get("difference");
   
console.log("transData: ", this.transData)
      
      this.prepForm.patchValue({
        supplierName: this.selecTrans.supplierName,
        supplierId: this.selecTrans.supplierId,
        supplier: this.selecTrans.supplierName,
        accrualAccount: this.selecTrans.accrualAccount,
        accrualAccountName: this.selecTrans.accrualAccountName,
        tranType: this.minorDet,
        expenseType: this.selecTrans.expenseType,
        totalDebitAmt: this.difference,
      });

      

      console.log("transData", this.transData);
      //console.log("After minorDet", this.minorDet);
      console.log("difference", this.difference);
    }
  //   {
  //     "id": 1,
  //     "referenceID": "1",
  //     "supplierName": "Sigourney Santana",
  //     "supplierAc": "6473565655123",
  //     "acrualDescription": "Acrual for Security Services",
  //     "acrualAmount": "22000",
  //     "acrualPeriod": "1",
  //     "accrualAccount": "999001911200",
  //     "accrualAccountName": "PARKING ACCT"
  // }
    if(this.supplierAccrualInfo && this.accrualInfo){
      console.log("accrualInfo", this.accrualInfo);
      this.reverseWhole = true;
      this.isDateReadOnly = true;
      this.prepForm.patchValue({
        tranType: 'Reverse',
        supplierId: this.supplierAccrualInfo.referenceID,
        supplierName: this.supplierAccrualInfo.supplierName,
        supplier: this.supplierAccrualInfo.supplierName,
        supplierAccount: this.supplierAccrualInfo.supplierAc,
        accrualAccountName: this.supplierAccrualInfo.accrualAccountName,
        accrualAccount: this.supplierAccrualInfo.accrualAccount,
        totalDebitAmt: this.accrualInfo[0].accrualbal,
        collectionDate: this.accrualInfo[0].collectionDate,
        collectAcrualTransId: this.accrualInfo[0].transid,
      });
    }
  }

  getSuppliers() {
    this.payBill.getAccrualSuppliers().subscribe(
      (res) => {
        this.suppliers = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getExpenses() {
    if (this.prepForm.value.expenseType == "Goods") {
      const params = new HttpParams().set("expense_type", "goods");
      this.payBill.getExpensesByType(params).subscribe(
        (res) => {
          this.expenses = res;
        },
        (err) => {
          console.log(err);
        }
      );
    } else if (this.prepForm.value.expenseType == "Services") {
      const params = new HttpParams().set("expense_type", "service");
      this.payBill.getExpensesByType(params).subscribe(
        (res) => {
          this.expenses = res;
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  getExpenseType(event: any) {
    if (event.value == "Goods") {
      this.prepForm.patchValue({
        incomeWHRate: 0,
      });
      this.getExpenses();
      this.typeOfDeliverable();
    } else if (event.value == "Services") {
      this.prepForm.patchValue({
        incomeWHRate: 18,
      });
      this.getExpenses();
      this.typeOfDeliverable();
    }
  }
  typeOfDeliverable() {
    if (this.prepForm.value.expenseType == "Goods") {
      this.isGoods = true;
    } else if (this.prepForm.value.expenseType == "Services") {
      this.isService = true;
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
    return `${this.selectionPointing.isSelected(row) ? "deselect" : "select"
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

        //console.log("Pointing info = ", this.pointingDetails);
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

  initprepForm() {
    console.log("currentUser: ", this.currentUser);
    this.prepForm = this.fb.group({
      supplier: [""],
      supplierId: ["", Validators.required],
      supplierName: ["", Validators.required],
      accrualAccountName: ["", Validators.required],
      accrualAccount: ["", Validators.required],
      expense: ["", Validators.required],
      partrans: [""],
      description: [""],
      supplierAmount: [""],

      paymentExpenses: [""],

      paymentMode: [""],
      selectedCostCenters: [""],

      totalDebitAmt: [0],

      tranType: new FormControl("Advance", Validators.required),
      expenseType: new FormControl("Goods", Validators.required),
      verifiedTime: [""],
      verifiedBy: [""],
      postedBy: [this.currentUser],
      postedTime: [new Date()],

      transactiontype: ["collect_accrual"],
      collectionDate: [new Date()],
      collectAcrualTransId: [""],
    });
  }

  

  getType(event: any) {
    
  }




  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getDebitTotalAmt(event: Event) {
    var stringToConvert = (event.target as HTMLInputElement).value;

    if (!isNaN(Number(stringToConvert))) {
      var numberValue = Number(stringToConvert);
      console.log("numberValue: ", numberValue);
      this.toDebitAmount = numberValue;
      this.vatRate = Number(this.prepForm.value.vatRate);
      this.netAmount = Math.round(
        (100 * this.toDebitAmount) / (this.vatRate + 100)
      );

      this.prepForm.patchValue({
        amountExcTax: this.netAmount,
        invoiceAmount: this.toDebitAmount,
      });

      if (this.selectedEvenly) {
        //this.calculate();
      }

      
    } else {
      this.snackbar.showNotification(
        "snackbar-danger",
        "This amount must be a number!"
      );
    }
  }
  //******************************************************************************************************

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
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${row.position + 1
      }`;
  }



  // ********************************************************************************************************************************************************************************************************************
  // Lookups


  costCentersLookup() {
    console.log("this.checklist: ", this.checklist);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "800px";
    dialogConfig.data = {
      action: "view cost center",
      data: this.checklist,
    };

    const dialogRef = this.dialog.open(CostCenterLookupComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      console.log("result: ", result.data);

      this.selectedCenter = result.data;

      this.costCenterForm.patchValue({
        costCenterIds: this.selectedCenter.costCenterid,
        costCenterDetails: this.selectedCenter.costCentername,
        costCenter: this.selectedCenter,
        costCenterAmt: ["", [Validators.required]],
        debitAcc: this.selectedCenter.expenseAccount,
        debitAmt: this.costCenterForm.value.costCenterAmt,

        creditSupplierAcc: this.prepForm.value.supplierAccount,
      });

      console.log("this.costCenterForm: ", this.costCenterForm.value);

      // this.costCenterForm.patchValue({
      //   //costDetails: this.selectedCenter,
      //   costCenter: result,
      //   costCenterAmt: ["", [Validators.required]],
      // });
    });
  }


  suppliersLookup() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "600px";
    dialogConfig.data = {
      action: "view suppliers",
      data: this.suppliers,
      selected: this.selectedSup,
    };

    const dialogRef = this.dialog.open(
      AccrualSuppliersLookupComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result.data.length != 0) {
        
        this.selectedSup.push(result.data[0].id);
        this.prepForm.patchValue({
          supplierId: result.data[0].referenceID,
          supplier: result.data[0].supplierName,
          supplierAccount: result.data[0].supplierAccount,
          supplierName: result.data[0].supplierName,
          totalDebitAmt: result.data[0].acrualAmount,

          accrualAccountName: result.data[0].accrualAccountName,
          accrualAccount: result.data[0].accrualAccount,
        });
        this.toDebitAmount = result.data[0].acrualAmount;
        

      }
    });
  }
  currencyLookup(): void {
   
  }

  //******************************************************************************************************************************************************************************************************************* */
  transactionForm!: FormGroup;
  editButton: boolean = false;
  addButton: boolean = true;
  accountTypes: any[] = [
    { name: "Office account" },
    { name: "Expense account" },
    { name: "Supplier account" },
    { name: "Tax account" },
  ];

  normalAccSelected: boolean = true;
  supAccSelected: boolean = false;
  taxAccSelected: boolean = false;
  expAccSelected: boolean = false;

  displayedColumns: string[] = [
    "index",
    "typeOfAccount",
    "accountNo",
    "parttranstype",
    "amount",
    "accountCurrencyCode",
    "narration",
    "exchangeRate",
    "actions",
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  partTranType: any;
  transactionAmount: any;
  debit_value = 0.0;
  credit_value = 0.0;
  total_value = 0.0;
  dialogData: any;
  ccy_name: any;
  selectedCurrency: any;
  Valid = false;
  index: number;
  submitted = false;
  paymentTransaction: boolean = false;
  filteredExpenseAccounts: any[] = [];
  selectedExpenseAccounts: any[] = [];
  filteredTaxes: any[] = [];
  selectedTax: any[] = [];
  partTransactionTypeArray: any = ["Debit", "Credit"];



  initTransactionForm() {
    this.transactionForm = this.fb.group({
      typeOfAccount: ["Office account", Validators.required],
      accountCurrencyCode: ["UGX"],
      amount: ["", Validators.required],
      accountNo: ["", Validators.required],
      accountName: ["AccountName"],
      narration: ["", Validators.required],
      parttranstype: ["", Validators.required],
      costCenter: ["CC"],
      exchangeRate: 1,
      supplierId: [""],
      supplier: [""],
      taxName: [""],
      taxId: [""],
      // ccExpense: [""]
    });
  }
  


  transactionArray = new Array();
  initTransactionArray() {
    this.transactionArray = new Array();
  }

  getTransactions() {
    if (this.transactionArray.length == 0) {
      this.isLoading = true;
    } else {
      this.isLoading = false;
    }
    this.dataSource = new MatTableDataSource(this.transactionArray);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  clearForm() {
    //this.resetSelectedAccType();
    this.initTransactionForm();
    
  }
  addToArray() {
    
    if (!this.transactionForm.invalid) {
      //this.p.push(this.fb.group(this.transactionForm.value));
      this.transactionArray.push(this.transactionForm.value);
      this.prepForm.patchValue({
        partrans: this.transactionArray,
      });
      console.log("this.prepForm.value.partrans", this.prepForm.value.partrans);

      this.validateData();
    }
  }
  validateData() {
    this.partTranType = this.transactionForm.controls.parttranstype.value;
    this.transactionAmount = this.transactionForm.controls.amount.value;

    this.debit_value = 0;
    this.credit_value = 0;
    this.total_value = 0;
    this.transactionArray.forEach((element) => {
      if (element.parttranstype == "Debit") {
        this.debit_value = this.debit_value + element.amount;
      } else if (element.parttranstype == "Credit") {
        this.credit_value = this.credit_value + element.amount;
      }
    });
    this.total_value = this.debit_value - this.credit_value;
    if (this.total_value != 0) {
      this.Valid = false;
      this._snackBar.open(
        "Transaction is not Valid! Balance Debit & Credit",
        "Try again!",
        {
          horizontalPosition: "end",
          verticalPosition: "top",
          duration: 8000,
          panelClass: ["snackbar-danger", "snackbar-success"],
        }
      );
    } else {
      this.Valid = true;
      this._snackBar.open("Transaction accepted!", "X", {
        horizontalPosition: "end",
        verticalPosition: "top",
        duration: 8000,
        panelClass: ["snackbar-success", "snackbar-success"],
      });
    }

    this.supAccSelected = false;
    this.normalAccSelected = true;
    this.taxAccSelected = false;
    this.expAccSelected =false;
    this.getTransactions();
    this.clearForm();
  }
  onEditTransactionDetails(data) {
    this.index = this.transactionArray.indexOf(data);
    this.editButton = true;
    this.addButton = false;
    console.log("data: ", data);

    this.transactionForm.patchValue({
      typeOfAccount: data.typeOfAccount,
      accountCurrencyCode: data.accountCurrencyCode,
      amount: data.amount,
      accountNo: data.accountNo,
      accountName: data.accountName,
      narration: data.narration,
      parttranstype: data.parttranstype,
      costCenter: data.costCenter,
      exchangeRate: data.exchangeRate,
      supplierId: data.supplierId,
      supplier: data.supplier,
      taxName: data.taxName,
      taxId: data.taxId,
      // ccExpense: data.ccExpense,
    });

  }
  updateTransactionDetails() {
    this.editButton = false;
    this.addButton = true;

    this.transactionArray[this.index] = this.transactionForm.value;
    this.prepForm.patchValue({
      partrans: this.transactionArray,
    });
    this.validateData();
  }
  onTransactionDetail(i: any) {
    this.transactionArray.splice(i, 1);
    this.validateData();
  }
  onSubmit() {
    console.log("this.prepForm: ", this.prepForm)
    if (this.prepForm.valid) {
      if (this.total_value != 0) {
        this._snackBar.open(
          "Transaction is not Valid! Balance Debit & Credit",
          "Try again!",
          {
            horizontalPosition: "end",
            verticalPosition: "top",
            duration: 80000,
            panelClass: ["snackbar-danger", "snackbar-success"],
          }
        );
      } else {
        if (!this.prepForm.value.description) {
          this._snackBar.open(
            "Transaction accepted. Please provide a description for this transaction!",
            "X",
            {
              horizontalPosition: "end",
              verticalPosition: "top",
              duration: 80000,
              panelClass: ["snackbar-success", "snackbar-success"],
            }
          );
          this.onAddTransactionDescription();
        } else if (this.prepForm.value.description) {
          this.prepForm.patchValue({
            tranAmount: this.debit_value,
          });
          console.log("Form Data", this.prepForm.value);
          console.log("this.debit_value", this.debit_value);
          this.payBill
            .postTransaction(this.prepForm.value)
            .pipe()
            .subscribe(
              (res) => {
                console.log("Response = ", res);

                let message = "TRANSACTION RESPONSE";
                this._snackBar.open(
                  message +
                  "\n STATUS: " +
                  res.status +
                  "\n TRANSACTION CODE| " +
                  res.transactionCode +
                  "\n TRANSACTION DATE| " +
                  res.transactionDate,
                  "X",
                  {
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                    duration: 2000000,
                    panelClass: ["snackbar-success", "snackbar-success"],
                  }
                );
                this.isTransactionLoading = false;
                this.router.navigateByUrl(
                  "/admin/transfer-transactions/pending-direct-transactions"
                );
              },
              (err) => {
                this.isTransactionLoading = false;
                console.log("Error= ", err);
                this._snackBar.open(err, "X", {
                  horizontalPosition: "end",
                  verticalPosition: "top",
                  duration: 80000,
                  panelClass: ["snackbar-danger", "snackbar-danger"],
                });
              }
            );
        }
      }
      this.submitted = true;
      // this.router.navigate(['system/transactions/maintenance'], {skipLocationChange:true});
    } else {
      this._snackBar.open("Invalid Form! Check your inputs", "Try again!", {
        horizontalPosition: "end",
        verticalPosition: "top",
        duration: 80000,
        panelClass: ["snackbar-danger", "snackbar-danger"],
      });
    }
  }

  getSelectedTranType(event: any) { }
  // resetSelectedAccType() {
  //   let event = { value: "Office account" };
  //   this.getSelectedAccType(event);
  // }
  getSelectedAccType(event: any) {
    if (event.value == "Office account") {
      this.supAccSelected = false;
      this.normalAccSelected = true;
      this.taxAccSelected = false;
      this.expAccSelected = false;
    } else if (event.value == "Supplier account") {
      this.paymentTransaction = true;
      this.supAccSelected = true;
      this.normalAccSelected = false;
      this.taxAccSelected = false;
      this.expAccSelected = false;
    } else if (event.value == "Tax account") {
      this.supAccSelected = false;
      this.normalAccSelected = false;
      this.taxAccSelected = true;
      this.expAccSelected = false;
    }
    else if (event.value == "Expense account") {

      this.supAccSelected = false;
      this.normalAccSelected = false;
      this.taxAccSelected = false;
      this.expAccSelected = true;
    }
  }




  branchCodeLookup() {
    if (!this.taxAccSelected) {
      const dialogRef = this.dialog.open(BranchCodeLookupComponent, {
        width: "600px",
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log(result);
        this.transactionForm.patchValue({
          accountNo: result.data.accountnumber,
        });
      });
    } else {
      this._snackBar.open(
        "\n PLEASE NOTE: " +
        "\n The tax accounts shall be modified in the Parameters module!! ",
        "X",
        {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 20000,
          panelClass: ["snackbar-danger", "snackbar-success"],
        }
      );
    }

  }
  expenseAccountLookup() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "800px";
    dialogConfig.data = {
      action: "get expense account",
      data: this.filteredExpenseAccounts,
      selected: this.selectedExpenseAccounts,
    };


    const dialogRef = this.dialog.open(ExpenseCostcenterAccLookupComponent, dialogConfig);
    //   {
    //     "costCenterId": 1,
    //     "expenseId": 1,
    //     "costCenterName": "CITY BRANCH",
    //     "expenseAccount": "9800000000037",
    //     "expenseName": "ADVERTISING"
    // }
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.data.length != 0) {
        console.log("result: ", result.data);
        this.transactionForm.patchValue({
          accountNo: result.data.expenseAccount,
          accountName: result.data.expenseName + " " + result.data.costCenterName,
          costCenter: result.data.expenseName + " " + result.data.costCenterName,
          // accountName: result.data[0].taxName,
          // accountNo: result.data[0].taxAccount,
          // taxName: result.data[0].taxName,
          // taxId: result.data[0].id,
        });


      }
    });
  }

  getTaxes() {
    this.subscription = this.parameterService
      .getParameters()
      .subscribe((res) => {
        this.taxes = res;
        this.filteredTaxes.push(this.taxes[1], this.taxes[2])
      });
  }
  taxAccountsLookup() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      action: "get tax",
      data: this.filteredTaxes,
      selected: this.selectedTax,
    };

    const dialogRef = this.dialog.open(TaxesLookupComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.data.length != 0) {
        console.log("result: ", result.data[0]);
        this.transactionForm.patchValue({
          accountName: result.data[0].taxName,
          accountNo: result.data[0].taxAccount,
          taxName: result.data[0].taxName,
          taxId: result.data[0].id,
        });

        if (result.data[0].taxName == 'VAT withholding') {
          this.prepForm.patchValue({
            vatAccount: result.data[0].taxAccount,
          })

        }
        if (result.data[0].taxName == 'Income withholding') {
          this.prepForm.patchValue({
            iwtAccount: result.data[0].taxAccount,
          })
        }

      }
    });
  }


  onAddTransactionDescription() {
    console.log();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "1000px";
    dialogConfig.data = {
      action: "edit payment breakdown",
      data: "data",
    };
    const dialogRef = this.dialog.open(
      AddDescriptionForReportComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((result) => {
      console.log("result.data; ", result.data);
      if (result && result.data.length != 0) {
        this.prepForm.patchValue({
          description: result.data.description,
        });
        this.onSubmit();
      }
    });
  }
}
