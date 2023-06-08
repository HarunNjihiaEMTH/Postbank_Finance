import { SelectionModel } from "@angular/cdk/collections";
import { HttpEventType, HttpParams, HttpResponse } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  AbstractControl,
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
import { BehaviorSubject, Observable, Subscription, takeUntil } from "rxjs";
import { FilesService, SelectedFiles } from "src/app/admin/data/fileconversion/files.service";
import { ActiveBillsService } from "src/app/admin/data/services/activebills.service";
import { LocalStorageService } from "src/app/admin/data/services/localstorage.service";
import { ParametersService } from "src/app/admin/data/services/parameters.service";
import { UploadInvoiceService } from "src/app/admin/data/services/uploadInvoice.service";
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { BranchCodeLookupComponent } from "src/app/user/commons/components/branch-code-lookup/branch-code-lookup.component";
import { CurrencyCodeLookupComponent } from "src/app/user/commons/components/currency-code-lookup/currency-code-lookup.component";
import { ExpenseService } from "src/app/user/data/services/expense.service";
import { SupplierService } from "src/app/user/data/services/supplier.service";
import { Category } from "src/app/user/data/types/category";
import { CostCenterLookupComponent } from "./dialog/cost-center-lookup/cost-center-lookup.component";
import { EditPaymentBreakdownComponent } from "./dialog/edit-payment-breakdown/edit-payment-breakdown.component";
import { ExpensesLookupComponent } from "./dialog/expenses-lookup/expenses-lookup.component";
import { PickingItemComponent } from "./dialog/picking-item/picking-item.component";
import { SuppliersLookupComponent } from "./dialog/suppliers-lookup/suppliers-lookup.component";

@Component({
  selector: "app-pay-bill",
  templateUrl: "./pay-bill.component.html",
  styleUrls: ["./pay-bill.component.scss"],
})
export class PayBillComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = "end";
  verticalPosition: MatSnackBarVerticalPosition = "top";

  routeState: any;
  selecBill: any;
  billData: any;
  //***********************************************************************************************************
  displayedColumns: string[] = [
    "select",
    //"index",
    "costCenterid",
    "costCentername",
    "expenseName",
    "expenseAccount",
  ];
  dataSource!: MatTableDataSource<Category>;
  @ViewChild("paginatorCostCenters") paginatorCCs: MatPaginator;
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

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

    // "select",
    // "costCenterid",
    // "costCentername",
    // "expenseName",
    // "expenseAccount",
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
  // selectedSupp: any;
  selectedExp: any[] = [];
  debitAmt: number = 0;

  amountForEach: number;
  customValueValid: boolean = false;
  grosssAmount: number;

  ccSelected: number = 0;

  incurTax: boolean = true;
  incurVatWH: boolean = true;
  incurIncomeWH: boolean = true;

  initialExpense: any;

  referenceNo: string = "";

  toppings = new FormControl();

  showPointingInfo: boolean = false;
  supplier: any;

  pointingDetails: any[] = [];

  selectedExpDetails: any[] = [];
  expenseNames: any[] = [];
  selectedSup: any[] = [];

  currentUser: any;
  selectedCurrency: string = "UGX";

  isTransactionLoading: boolean = false;
  debitAccounts: any[] = [
    { name: "Expense Account" },
    { name: "Balance Sheet Account" },
  ];

  customDebitAccount: boolean = false;
  expenseAccount: boolean = true;

  isCustomAccountsLoading: boolean = true;

  displayColumnsM = [
    "id",
    "accountnumber",
    "accountname",
    "debitamount",
    "action",
  ];
  dataSourceM = new BehaviorSubject<AbstractControl[]>([]);
  rowsM: FormArray = this.fb.array([]);
  formM: FormGroup = this.fb.group({ selectedAcountsDetails: this.rowsM });
  selectedCustomAccount: any;
  customAccountsForm!: FormGroup;
  customDebitAccountsArray: any[] = [];
  toCustomDebitTotal: number = 0;
  customAccountsPaymentInfo: any[] = [];
  array: any[] = [];
  currentRow: any;

  poPaymentDetails: any;

  public selectedFiles: SelectedFiles[] = [];
  public isFileLoading = new BehaviorSubject(false);

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
    private _snackBar: MatSnackBar,
    private tokenService: TokenStorageService,
    private filesService: FilesService,
  ) {

    if (this.router.getCurrentNavigation().extras.state) {
      this.routeState = this.router.getCurrentNavigation().extras.state;
      if (this.routeState.action == "Pay supplier") {
        this.supplier = this.routeState.supplierDetails
          ? JSON.parse(this.routeState.supplierDetails)
          : "";
      } else if (this.routeState.action == "Pay purchase order") {
        this.poPaymentDetails = this.routeState.poDetailsForPayment
          ? JSON.parse(this.routeState.poDetailsForPayment)
          : "";
        //this.localStorageService.set("selectedannouncementId", this.poPaymentDetails);
      } else {
        this.routeState = "";
      }
    }
  }

  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser().username;

    this.initprepForm();
    this.getTaxes();
    this.getSuppliers();
    this.getExpenses();


    this.costCenterFormCustom();
    this.createCustomAccountsForm();

    if (this.supplier) {
      this.prepForm.patchValue({
        supplier: this.supplier.id,
        supplierAccount: this.supplier.supplierAccount,
      });
    }
    if (this.poPaymentDetails) {
      this.getSupplierById(parseInt(this.poPaymentDetails.supplierId));
      this.poPaymentDetails.expenseIds.forEach((element) => {
        this.selectedExp.push(parseInt(element));
        this.getExpenseById(parseInt(element));
        this.getGrossAmtFromPO();
      });
      this.getBillById(this.selectedExp.toString());
      this.prepForm.patchValue({
        havePo: 'Yes',
        poNumber: this.poPaymentDetails.poNumber,
        poId: this.poPaymentDetails.poId,
        transactiontype: 'pay_po'

      })

    }

    this.isGoods = true;
  }

  generateInvoiceRefNo() {
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
      this.referenceNo += possible.charAt(
        Math.floor(Math.random() * possible.length)
      );

    this.prepForm.patchValue({
      invoiceRefNo: this.referenceNo,
    });
  }

  getSuppliers() {
    this.supplierService.getSuppliers().subscribe(
      (res) => {
        this.suppliers = res;
        //console.log("supplier", this.suppliers);
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
        });

        if (this.poPaymentDetails) {

          this.getGrossAmtFromPO();

        }
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

      this.updateCalculations();
    } else {
      this.snackbar.showNotification(
        "snackbar-danger",
        "Gross amount must be a number!"
      );
    }
  }
  getGrossAmtFromPO() {
    var stringToConvert = this.poPaymentDetails.originalTotalAfterTax;

    if (!isNaN(Number(stringToConvert))) {
      var numberValue = Number(stringToConvert);

      this.grosssAmount = numberValue;
      this.vatRate = Number(this.prepForm.value.vatRate);
      this.netAmount = Math.round(
        (100 * this.grosssAmount) / (this.vatRate + 100)
      );

      this.prepForm.patchValue({
        grossAmount: this.grosssAmount,
        amountExcTax: this.netAmount,
        invoiceAmount: this.grosssAmount,
      });

      this.updateCalculations();
    } else {
      this.snackbar.showNotification(
        "snackbar-danger",
        "Gross amount must be a number!"
      );
    }
  }
  updateCalculations() {
    if (this.evenCostCenterForm) {
      if (this.selectedEvenly) {
        this.calculate();
        this.finalCalcs();
      }
    }

    if (this.costCenterForm) {
      if (this.selectedCustom) {
        this.refreshCalculations();
      }
    }
  }
  getRates(event: Event) {
    var stringToConvert = (event.target as HTMLInputElement).value;

    if (!isNaN(Number(stringToConvert))) {
      var numberValue = Number(stringToConvert);
      this.vatRate = numberValue;

      this.updateCalculations();
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

    this.updateCalculations();
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
  getHavePO(event: any) {
    //console.log("radio 1 = ", event.value);
    if (event.value == "Yes") {
      this.poAvailable = true;
      this.prepForm.patchValue({
        transactiontype: 'pay_po',
      });
    } else if (event.value == "No") {
      this.poAvailable = false;
      this.prepForm.patchValue({
        transactiontype: 'pay_without_po',
      });
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
  getPayType(event: any) {
    if (event.value == "Local") {
      this.prepForm.patchValue({
        incomeWHRate: this.taxes[2].taxValue,
      });
    } else if (event.value == "Import") {
      this.prepForm.patchValue({
        incomeWHRate: 18,
      });
    }

    this.updateCalculations();
  }
  getIncurTax(event: any) {
    //console.log("radio 2 = ", event.value);
    if (event.value == "Yes") {
      this.incurTax = true;
    } else if (event.value == "No") {
      this.incurTax = false;
    }

    this.updateCalculations();
  }
  getIncurVatWH(event: any) {
    if (event.value == "Yes") {
      this.incurVatWH = true;
    } else if (event.value == "No") {
      this.incurVatWH = false;
    }
    this.updateCalculations();
  }

  getIncurIncomeWH(event: any) {
    if (event.value == "Yes") {
      this.incurIncomeWH = true;
    } else if (event.value == "No") {
      this.incurIncomeWH = false;
    }
    this.updateCalculations();
  }

  getExpenseType(event: any) {
    if (event.value == "Goods") {
      this.prepForm.patchValue({
        incomeWHRate: 18,
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
      this.isService = false;
    } else if (this.prepForm.value.expenseType == "Services") {
      this.isService = true;
      this.isGoods = false;
    }
    this.updateCalculations();
  }
  initprepForm() {
    this.prepForm = this.fb.group({
      supplier: [""],
      supplierId: [""],
      supplierName: [""],
      supplierAccount: ["", Validators.required],
      supplierAmount: [""],

      grossAmount: ["", Validators.required],
      amountExcTax: ["", Validators.required],

      expense: ["", Validators.required],
      partrans: [""],

      invoiceDate: [""],
      invoiceNo: [""],
      invoiceRefNo: [""],


  

      //prodType: new FormControl("Local", Validators.required),
      incurTax: new FormControl("Yes", Validators.required),
      incurVatWH: new FormControl("Yes", Validators.required),
      incurIncomeWH: new FormControl("Yes", Validators.required),
      expenseType: new FormControl("Goods", Validators.required),
      haveInvoice: new FormControl("No", Validators.required),
      havePo: new FormControl("No", Validators.required),
      producttype: new FormControl("Local", Validators.required),

      vatAmount: [""],
      iwtAmount: [""],
      vatAccount: [""],
      iwtAccount: [""],
      vatRate: [0],
      vatWHRate: [0],
      incomeWHRate: [18],
      conversionRate: [1],
      currency: ["UGX"],

      invoiceAmount: [0],

      paymentExpenses: [""],

      paymentMode: [""],
      selectedCostCenters: [[]],
      verifiedTime: [""],
      verifiedBy: [""],
      postedBy: [this.currentUser],
      postedTime: [new Date()],
      description: [""],

      debitAccount: ["Expense Account"],
      customDebitAccount: ["Please select the accounts below"],

      transactiontype: ["pay_without_po"],

      poNumber: [],
      poId: [],
  
      documents: [[]]
    });
  }

  getSupplierById(suppIds) {
    this.selectedSup.push(suppIds);
    this.supplierService.getSupplierById(suppIds).subscribe((response: any) => {
      this.prepForm.patchValue({
        supplierId: response.id,
        supplier: response.supplierName,
        supplierAccount: response.supplierAccount,
        supplierName: response.supplierName,
      });
    });
  }

  getSelectedDebitAccType(event: any) {
    //debitAccounts: any[] = [{ name: 'Expense Account' }, { name: 'Balance Sheet Account' }]
    if (event.value == "Expense Account") {
      this.customDebitAccount = false;
      this.expenseAccount = true;
      this.selectedEvenly = false;
      this.selectedCustom = false;
    } else if (event.value == "Balance Sheet Account") {
      this.customDebitAccount = true;
      this.expenseAccount = false;
      this.selectedEvenly = false;
      this.selectedCustom = false;
    }
  }
  getSelectedExpense(event: any) {
    //this.selectedExpDetails = [];

    event.forEach((element) => {
      this.selectedExp.push(element.id);
      this.getExpenseById(element.id);
    });
    this.getBillById(this.selectedExp.toString());
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

      this.expenseNames.push(this.initialExpense.expenseDescription);

      this.selectedExpDetails.push({
        expenseId: this.initialExpense.id,
        expenseName: this.initialExpense.expenseDescription,
      });

      console.log("this.selectedExpDetails ", this.selectedExpDetails);
      this.prepForm.patchValue({
        paymentExpenses: this.selectedExpDetails,
        expense: this.expenseNames,
      });
    });
  }

  typeSelected() {
    this.selectedEvenly = false;
    this.selectedCustom = true;
    this.customDebitAccount = false;
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
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${row.position + 1
      }`;
  }

  checkboxActive() {
    this.selectedRows = this.selection.selected;
    this.calculate();
  }
  calculate() {
    console.log("this.selection.selected = ", this.selection.selected);
    this.selectedEvenly = true;
    this.selectedCustom = false;
    this.selected = true;
    this.ccSelected = this.selection.selected.length;
    this.grosssAmount = this.prepForm.value.grossAmount;
    this.netAmount = this.prepForm.value.amountExcTax;
    this.vatRate = this.prepForm.value.vatRate;
    this.vatWHRate = this.prepForm.value.vatWHRate;
    this.incomeWHRate = this.prepForm.value.incomeWHRate;

    this.amountForEach = Math.round(
      this.grosssAmount / this.selection.selected.length
    );

    this.pushToArrayEven();
  }
  pushToArrayEven() {
    this.paymentInfo = [];
    this.customAccountsPaymentInfo = [];
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
      narration: ["Amount debited"],
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
      narration: "Amount credited",
      parttranstype: "Credit",
      accountCurrencyCode: "UGX",
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
      narration: "Amount credited",
      parttranstype: "Credit",
      accountCurrencyCode: "UGX",
    });
    if (!this.incurTax) {
      this.evenCostCenterForm.patchValue({
        amount: 0,
      });
    } else if (this.incurTax) {
      if (this.isGoods) {
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
      } else if (this.isService) {
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
    console.log(
      "this.evenCostCenterForm.value: ",
      this.evenCostCenterForm.value
    );
    this.paymentInfoEven.push(this.evenCostCenterForm.value);
    this.refreshEvenDatasource();
  }
  calculateEvenSupplierAmt() {
    this.evenCostCenterForm.patchValue({
      accountName: this.prepForm.value.supplierName,
      accountNo: this.prepForm.value.supplierAccount,
      narration: "Amount credited",
      parttranstype: "Credit",
      accountCurrencyCode: this.prepForm.value.currency,
    });
    if (!this.incurTax) {
      this.evenCostCenterForm.patchValue({
        amount: this.grosssAmount,
      });
    } else if (this.incurTax) {
      if (this.isGoods) {
        this.supplierAmt = this.grosssAmount - this.vatWHAmt - this.incomeWHAmt;
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

  public confirmAdd(): void { }

  onSubmitEven() {
    this.isTransactionLoading = true;
    for (var i = 0; i < this.paymentInfoEven.length; i++) {
      if (this.paymentInfoEven[i].amount <= 0) {
        this.paymentInfoEven.splice(i, 1);
      }
    }
    console.log("this.paymentInfoEven: ", this.paymentInfoEven);

    this.prepForm.patchValue({
      partrans: this.paymentInfoEven,
    });

    this.payBill
      .postTransaction(this.prepForm.value)
      .pipe()
      .subscribe(
        (res) => {
          console.log("Response = ", res.status);

          //let message = "TRANSACTION RESPONSE";
          this._snackBar.open(
            "TRANSACTION RESPONSE" +
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
          this.router.navigateByUrl("/admin/bills/pending-bills");
        },
        (err) => {
          this.isTransactionLoading = false;
          console.log("Error= ", err);
          //this.snackbar.showNotification("snackbar-danger", err);
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
      narration: "Amount debited",
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
      narration: "Amount credited",
      parttranstype: "Credit",
      accountCurrencyCode: "UGX",
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
          this.costCenterForm.patchValue({
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
      narration: "Amount credited",
      parttranstype: "Credit",
      accountCurrencyCode: "UGX",
    });
    if (!this.incurTax) {
      this.costCenterForm.patchValue({
        amount: 0,
      });
    } else if (this.incurTax) {
      if (this.isGoods) {
        if (this.incurIncomeWH) {
          this.incomeWHAmt = Math.round(
            (this.incomeWHRate / 100) * this.netAmount
          );
          this.costCenterForm.patchValue({
            amount: this.incomeWHAmt,
          });
        } else if (!this.incurIncomeWH) {
          this.incomeWHAmt = 0;
          this.costCenterForm.patchValue({
            amount: 0,
          });
        }
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
          this.costCenterForm.patchValue({
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
      narration: "Amount credited",
      parttranstype: "Credit",
      accountCurrencyCode: this.prepForm.value.currency,
    });
    if (!this.incurTax) {
      this.costCenterForm.patchValue({
        amount: this.grosssAmount,
      });
    } else if (this.incurTax) {
      if (this.isGoods) {
        this.supplierAmt = this.grosssAmount - this.vatWHAmt - this.incomeWHAmt;
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
    this.paymentInfoEven = [];
    this.customAccountsPaymentInfo = [];
    this.paymentInfo.push(this.costCenterForm.value);
    this.calcDebitTotals();
    this.refreshDatasource();
    this.costCenterForm.reset();
    this.costCenterForm.patchValue({
      accountCurrencyCode: "UGX",
    });
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
  // http://52.15.152.26:9052/api/v1/officeaccounts/all?SOL_ID=999
  costCenterFormCustom() {
    this.costCenterForm = this.fb.group({
      costCenterDetails: ["", [Validators.required]],
      costCenterAmt: [""],
      accountName: [""],
      accountNo: [""],
      amount: [""],
      narration: [""],
      parttranstype: [""],
      accountCurrencyCode: ["UGX"],
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

  onRemoveItem(i: any) {
    this.paymentInfo.splice(i, 1);
    this.refreshDatasource();

    this.calcDebitTotals();
  }

  onSubmitCustom() {
    this.isTransactionLoading = true;
    for (var i = 0; i < this.paymentInfo.length; i++) {
      if (this.paymentInfo[i].amount <= 0) {
        this.paymentInfo.splice(i, 1);
      }
    }
    if (this.customValueValid) {
      // console.log("Final prep: ", this.paymentInfo);
      this.prepForm.patchValue({
        partrans: this.paymentInfo,
      });
      console.log("Final prep: ", this.prepForm.value);
      this.payBill
        .postTransaction(this.prepForm.value)
        .pipe()
        .subscribe(
          (res) => {
            console.log("Response = ", res.status);

            // let message = "TRANSACTION RESPONSE";
            this._snackBar.open(
              "TRANSACTION RESPONSE" +
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

            this.router.navigateByUrl("/admin/bills/pending-bills");
            this.isTransactionLoading = false;
          },
          (err) => {
            console.log("Error= ", err);
            this.snackbar.showNotification("snackbar-danger", err);
            this.isTransactionLoading = false;
          }
        );
    } else {
      this.snackbar.showNotification(
        "snackbar-danger",
        "Ensure expense amount is fully distributed!"
      );
    }
  }

  //******************************************************************************************************
  // Custom Debit account calculation
  addFileRowM() {
    this.isCustomAccountsLoading = false;
    const row = this.fb.group({
      accountnumber: [
        this.selectedCustomAccount.accountnumber,
        Validators.required,
      ],
      accountname: [
        this.selectedCustomAccount.accountname,
        Validators.required,
      ],
      debitamount: [0, Validators.required],
    });
    this.rowsM.push(row);
    this.dataSourceM.next(this.rowsM.controls);

    console.log("The this.rowsM.controls: ", this.rowsM.value);
  }
  updateViewM() {
    this.dataSourceM.next(this.rowsM.controls);
  }
  onRemoveCustomAccountItem(i) {
    this.rowsM.removeAt(i);
    this.dataSourceM.next(this.rowsM.controls);
    this.recalculate();
  }
  removeCustomDebitAccounts() {
    this.rowsM.clear();
    this.dataSourceM.next(this.rowsM.controls);
    this.recalculate();
  }

  getDebitAmount(event: Event) {
    const amtValue = (event.target as HTMLInputElement).value;
    this.recalculate();
  }

  recalculate() {
    this.array = [];
    this.customDebitAccountsArray = [];
    this.customAccountsPaymentInfo = [];
    this.array = this.rowsM.value;

    console.log("this.rowsM.value: ", this.rowsM.value);

    this.array.forEach((element) => {
      this.currentRow = element;
      if (this.currentRow.debitamount > 0) {
        this.customDebitAccountsArray.push(this.currentRow.debitamount);
        this.calculateCustomAmts();

        this.pushToCustomAccountsArray();
      }
    });
  }

  createCustomAccountsForm() {
    this.customAccountsForm = this.fb.group({
      costCenterDetails: [""],
      costCenterAmt: [""],
      accountName: [""],
      accountNo: [""],
      amount: [""],
      narration: [""],
      parttranstype: [""],
      accountCurrencyCode: ["UGX"],
    });
  }

  calculateCustomAmts() {
    this.vatRate = this.prepForm.value.vatRate;
    this.vatWHRate = this.prepForm.value.vatWHRate;
    this.incomeWHRate = this.prepForm.value.incomeWHRate;
    this.customAccountsForm.patchValue({
      accountName: this.currentRow.accountname,
      accountNo: this.currentRow.accountnumber,
      amount: this.currentRow.debitamount,
      narration: "Amount debited",
      parttranstype: "Debit",
    });
  }

  calculateCustomAccountsVatWHAmt() {
    this.customAccountsForm.patchValue({
      accountName: "Vat WH A/C",
      accountNo: this.taxes[1].taxAccount,
      narration: "Amount credited",
      parttranstype: "Credit",
      accountCurrencyCode: "UGX",
    });
    if (!this.incurTax) {
      this.customAccountsForm.patchValue({
        amount: 0,
      });
    } else if (this.incurTax) {
      if (this.isGoods) {
        if (this.incurVatWH) {
          this.vatWHAmt = Math.round((this.vatWHRate / 100) * this.netAmount);
          this.customAccountsForm.patchValue({
            amount: this.vatWHAmt,
          });
        } else if (!this.incurVatWH) {
          this.vatWHAmt = 0;
          this.customAccountsForm.patchValue({
            amount: 0,
          });
        }
      } else if (this.isService) {
        if (this.incurVatWH) {
          this.vatWHAmt = Math.round((this.vatWHRate / 100) * this.netAmount);
          this.customAccountsForm.patchValue({
            amount: this.vatWHAmt,
          });
        } else if (!this.incurVatWH) {
          this.vatWHAmt = 0;
          this.customAccountsForm.patchValue({
            amount: 0,
          });
        }
      }
    }
    this.prepForm.patchValue({
      vatAmount: this.vatWHAmt,
    });

    this.finalPushArray();
  }
  calculateCustomAccountsIncomeWHAmt() {
    this.customAccountsForm.patchValue({
      accountName: "Income WH A/C",
      accountNo: this.taxes[2].taxAccount,
      narration: "Amount credited",
      parttranstype: "Credit",
      accountCurrencyCode: "UGX",
    });
    if (!this.incurTax) {
      this.customAccountsForm.patchValue({
        amount: 0,
      });
    } else if (this.incurTax) {
      if (this.isGoods) {
        if (this.incurIncomeWH) {
          this.incomeWHAmt = Math.round(
            (this.incomeWHRate / 100) * this.netAmount
          );
          this.customAccountsForm.patchValue({
            amount: this.incomeWHAmt,
          });
        } else if (!this.incurIncomeWH) {
          this.incomeWHAmt = 0;
          this.customAccountsForm.patchValue({
            amount: 0,
          });
        }
      } else if (this.isService) {
        if (this.incurIncomeWH) {
          this.incomeWHAmt = Math.round(
            (this.incomeWHRate / 100) * this.netAmount
          );
          this.customAccountsForm.patchValue({
            amount: this.incomeWHAmt,
          });
        } else if (!this.incurIncomeWH) {
          this.incomeWHAmt = 0;
          this.customAccountsForm.patchValue({
            amount: 0,
          });
        }
      }
    }

    this.prepForm.patchValue({
      iwtAmount: this.incomeWHAmt,
    });

    this.finalPushArray();
  }
  calculateCustomAccountsSupplierAmt() {
    console.log("Supplier: ", this.prepForm.value.supplierName);

    this.customAccountsForm.patchValue({
      accountName: this.prepForm.value.supplierName,
      accountNo: this.prepForm.value.supplierAccount,
      narration: "Amount credited",
      parttranstype: "Credit",
      accountCurrencyCode: this.prepForm.value.currency,
    });
    if (!this.incurTax) {
      this.customAccountsForm.patchValue({
        amount: this.grosssAmount,
      });
    } else if (this.incurTax) {
      if (this.isGoods) {
        this.supplierAmt = this.grosssAmount - this.vatWHAmt - this.incomeWHAmt;
        this.customAccountsForm.patchValue({
          amount: this.supplierAmt,
        });
      } else if (this.isService) {
        this.supplierAmt = this.grosssAmount - this.vatWHAmt - this.incomeWHAmt;
        this.customAccountsForm.patchValue({
          amount: this.supplierAmt,
        });
      }
    }

    this.prepForm.patchValue({
      supplierAmount: this.supplierAmt,
    });

    this.finalPushArray();
  }

  pushToCustomAccountsArray() {
    this.paymentInfo = [];
    this.paymentInfoEven = [];
    this.customAccountsPaymentInfo.push(this.customAccountsForm.value);

    this.calcCustomDebitTotals();
    this.validateCustomAccountsDebitTotal();

    this.refreshCustomAccountsDatasource();
    this.customAccountsForm.reset();
    this.customAccountsForm.patchValue({
      accountCurrencyCode: "UGX",
    });
  }
  finalPushArray() {
    this.customAccountsPaymentInfo.push(this.customAccountsForm.value);
    this.refreshCustomAccountsDatasource();
    this.customAccountsForm.reset();
    this.customAccountsForm.patchValue({
      accountCurrencyCode: "UGX",
    });
  }
  calcCustomDebitTotals() {
    this.toCustomDebitTotal = 0;
    this.customDebitAccountsArray.forEach((element) => {
      this.toCustomDebitTotal += element;
    });
  }

  validateCustomAccountsDebitTotal() {
    if (this.toCustomDebitTotal < this.prepForm.value.grossAmount) {
      this.snackbar.showNotification(
        "snackbar-danger",
        "Total debited amount must be equal to gross amount!"
      );
    } else if (this.toCustomDebitTotal == this.prepForm.value.grossAmount) {
      this.snackbar.showNotification(
        "snackbar-success",
        "Total debited amount equals gross amount."
      );
      this.calculateCustomAccountsVatWHAmt();
      this.calculateCustomAccountsIncomeWHAmt();
      this.calculateCustomAccountsSupplierAmt();
      //this.toDebitTotal = this.toDebitTotal / 2;
      this.customValueValid = true;
    } else if (this.toCustomDebitTotal > this.prepForm.value.grossAmount) {
      this.snackbar.showNotification(
        "snackbar-danger",
        "Total debited amount must not exceed gross amount!"
      );
    }
  }
  refreshCustomAccountsDatasource() {
    if (this.customAccountsPaymentInfo) {
      this.isLoading = false;
    } else {
      this.isLoading = true;
    }
    this.dataSource2 = new MatTableDataSource<any>(
      this.customAccountsPaymentInfo
    );
    this.dataSource2.paginator = this.paginatorLegal;
    this.dataSource2.sort = this.sort2;
    console.log(
      "this.customAccountsPaymentInfo: ",
      this.customAccountsPaymentInfo
    );
    console.log("this.rowsM: ", this.rowsM.value);
  }
  onSubmitCustomAccouts() {
    this.isTransactionLoading = true;
    for (var i = 0; i < this.customAccountsPaymentInfo.length; i++) {
      if (this.customAccountsPaymentInfo[i].amount <= 0) {
        this.customAccountsPaymentInfo.splice(i, 1);
      }
    }
    this.prepForm.patchValue({
      paymentExpenses: [],
    });
    if (this.customValueValid) {
      console.log(
        "Final prep customAccountsPaymentInfo: ",
        this.customAccountsPaymentInfo
      );
      this.prepForm.patchValue({
        partrans: this.customAccountsPaymentInfo,
      });
      console.log("Final prepForm: ", this.prepForm.value);
      this.payBill
        .postTransaction(this.prepForm.value)
        .pipe()
        .subscribe(
          (res) => {
            console.log("Response = ", res.status);

            // let message = "TRANSACTION RESPONSE";
            this._snackBar.open(
              "TRANSACTION RESPONSE" +
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

            this.router.navigateByUrl("/admin/bills/pending-bills");
            this.isTransactionLoading = false;
          },
          (err) => {
            console.log("Error= ", err);
            this.snackbar.showNotification("snackbar-danger", err);
            this.isTransactionLoading = false;
          }
        );
    } else {
      this.snackbar.showNotification(
        "snackbar-danger",
        "Ensure expense amount is fully distributed!"
      );
    }
  }
  //******************************************************************************************************** */

  removeAllTableRows() {
    this.paymentInfo = [];
    this.paymentInfoEven = [];
    this.customAccountsPaymentInfo = [];

    this.refreshDatasource();
  }

  costCentersLookup() {
    console.log("this.checklist: ", this.checklist);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "800px";
    dialogConfig.data = {
      action: "cost centers",
      data: this.checklist,
    };

    const dialogRef = this.dialog.open(CostCenterLookupComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      console.log("result: ", result.data);

      this.selectedCenter = result.data;

      this.costCenterForm.patchValue({
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
  expensesLookup() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "800px";
    dialogConfig.data = {
      action: "view expenses",
      data: this.expenses,
      selected: this.selectedExp,
    };

    const dialogRef = this.dialog.open(ExpensesLookupComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.data.length != 0) {
        console.log("result: ", result.data);
        this.getSelectedExpense(result.data);
      }
    });
  }

  suppliersLookup() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "800px";
    dialogConfig.data = {
      action: "view suppliers",
      data: this.suppliers,
      selected: this.selectedSup,
    };

    const dialogRef = this.dialog.open(SuppliersLookupComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.data.length != 0) {
        console.log("result: ", result.data[0]);
        this.getSupplierById(result.data[0].id);
        //this.getSelectedSupplier(result.data[0]);
      }
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
  currencyCodeLookup() {
    const dialogRef = this.dialog.open(CurrencyCodeLookupComponent, {
      width: "600px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("Curr: ", result.data.name);
      this.prepForm.patchValue({
        currency: result.data.name,
      });
    });
  }
  addDebitAccount() {
    const dialogRef = this.dialog.open(BranchCodeLookupComponent, {
      width: "600px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      //add row to the table
      if (result && result.data.length != 0) {
        this.selectedCustomAccount = result.data;
        this.addFileRowM();
      }
    });
  }

  onEditPaymentBreakdown(data, i) {
    console.log("Before data, i: ", data, i);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "1000px";
    dialogConfig.data = {
      action: "edit payment breakdown",
      data: data,
    };
    const dialogRef = this.dialog.open(
      EditPaymentBreakdownComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((result) => {
      console.log("result.data; ", result.data);
      if (result && result.data.length != 0) {
        if (this.paymentInfo.length != 0) {
          let i = this.paymentInfo.indexOf(data);
          this.paymentInfo[i] = result.data;
          this.refreshDatasource();
        } else if (this.paymentInfoEven.length != 0) {
          let i = this.paymentInfoEven.indexOf(data);
          this.paymentInfoEven[i] = result.data;
          this.refreshEvenDatasource();
        } else if (this.customAccountsPaymentInfo.length != 0) {
          let i = this.customAccountsPaymentInfo.indexOf(data);
          this.customAccountsPaymentInfo[i] = result.data;
          this.refreshCustomAccountsDatasource();
        }
      }
    });
  }

  onSelectFile(files) {
    //console.log("row: ", selectedRow.value, index);
    this.isFileLoading.next(true);
    this.selectedFiles = [];
    this.filesService.toBase64(files, this.selectedFiles).subscribe((res) => {
      if (res) {
        this.isFileLoading.next(false);
        this.selectedFiles = res;


        let documents = []
        this.selectedFiles.forEach(element => {
          documents.push({
            file: element.base64,
            filename: element.name,
            filetype: element.file.type
          })
        });

        
        this.prepForm.patchValue({
          documents: documents,
        });
        console.log("documents: ", documents);
      }
    });
  }
}
