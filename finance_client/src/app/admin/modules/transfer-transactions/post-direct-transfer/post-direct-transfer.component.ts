import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";

import {
  BehaviorSubject,
  Observable,
  Subject,
  Subscription,
  takeUntil,
} from "rxjs";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DatePipe } from "@angular/common";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { DirectTransferService } from "src/app/admin/data/services/direct-transfer.service";
import { SupplierService } from "src/app/user/data/services/supplier.service";
import { AddDescriptionForReportComponent } from "../dialogs/add-description-for-report/add-description-for-report.component";
import { ActiveBillsService } from "src/app/admin/data/services/activebills.service";
import { ParametersService } from "src/app/admin/data/services/parameters.service";
import { TaxesLookupComponent } from "../../bills/pay-bill/dialog/taxes-lookup/taxes-lookup.component";
import { SuppliersLookupComponent } from "../../bills/pay-bill/dialog/suppliers-lookup/suppliers-lookup.component";
import {
  FilesService,
  SelectedFiles,
} from "src/app/admin/data/fileconversion/files.service";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { ExpenseCostcenterAccLookupComponent } from "../dialogs/expense-costcenter-acc-lookup/expense-costcenter-acc-lookup.component";
import { ExpenseService } from "src/app/user/data/services/expense.service";
import { BranchCodeLookupComponent } from "src/app/user/commons/components/branch-code-lookup/branch-code-lookup.component";
import { TokenCookieService } from "src/app/core/service/token-storage-cookies.service";
import { SelectionModel } from "@angular/cdk/collections";
import { AddPointingPartialAmtComponent } from "../dialogs/add-pointing-partial-amt/add-pointing-partial-amt.component";
import { NotificationService } from "src/app/admin/data/services/notification.service";
import { CurrencyFinacleLookupComponent } from "src/app/user/commons/components/currency-finacle-lookup/currency-finacle-lookup.component";
import { RateCodesFinacleComponent } from "src/app/user/commons/components/rate-codes-finacle/rate-codes-finacle.component";
import { AccessControlService } from "src/app/admin/data/services/_AccessControlService.service";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { Invoice } from "src/app/user/data/types/customer-types/invoice";
import { AccountService } from "src/app/user/data/services/account.service";

@Component({
  selector: "app-post-direct-transfer",
  templateUrl: "./post-direct-transfer.component.html",
  styleUrls: ["./post-direct-transfer.component.scss"],
})
export class PostDirectTransferComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = "end";
  verticalPosition: MatSnackBarVerticalPosition = "top";

  subscription!: Subscription;
  // Data Table

  displayedColumnsPointing: string[] = [
    "select",
    "acctCrncyCode",
    // "acctName",
    // "foracid",
    //"numOffsetPtran",
    //"partTranSrlNum",
    "partTranType",
    "solId",
    "tranDate",
    "tranId",
    "tranParticular",
    "orgTranAmt",
    "totalOffsetAmt",
    "amt",
    "action",
  ];
  dataSourcePointing!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginatorPointing: MatPaginator;
  @ViewChild(MatSort) sortPointing: MatSort;
  // @ViewChild("paginatorPointingDetails") paginatorPointing: MatPaginator;
  // @ViewChild(MatSort) sortPointing!: MatSort;

  selectionPointing = new SelectionModel<any>(true, []);

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

  debit_value = 0.0;
  credit_value = 0.0;
  total_value = 0.0;
  dialogData: any;
  ccy_name: any;
  selectedCurrency: any;

  formData!: FormGroup;
  transactionForm!: FormGroup;

  isLoading: boolean = true;

  spinnerVisible: boolean = true;
  errorVisible: boolean = false;
  transactionTabIndex: number = 1;
  selection: number = 1;
  transactionType: string = "NC";
  transactionNumber!: string;
  customerCode!: string;
  Valid = false;
  // transaction!: Transac

  //unverified Transactions
  existingData: boolean;
  loading = false;
  transaction_code: number;
  submitted = false;
  currency: any;
  exchangeRate: any;
  error_message: string;
  partTrans: any;
  partTranType: any;
  transactionAmount: any;
  accountlookupData: any;
  error: any;
  accountReference: any;
  description: any;
  partTransForm: any;
  messageData: any;
  function_type: any;
  transactionId: any;
  resData: any;
  isDisable = false;

  partTransactionTypeArray: any = ["Debit", "Credit"];
  partTrnSubTypeArray: any[] = [
    { name: "BI", desc: "Bank" },
    { name: "CI", desc: "Customer" },
  ];

  user: any;
  index: number;

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

  selectedTax: any[] = [];

  selectedSup: any[] = [];
  suppliers: any;
  isTransactionLoading: boolean = false;

  taxes: any;
  poAvailable: boolean = true;

  filteredTaxes: any[] = [];

  filteredExpenseAccounts: any[] = [];
  selectedExpenseAccounts: any[] = [];

  paymentTransaction: boolean = false;
  invoiceAvailable: boolean = false;

  public selectedFiles: SelectedFiles[] = [];
  public isFileLoading = new BehaviorSubject(false);

  currRequirementid: any;
  currRequirementname: any;
  currSupplierid: any;
  currFile: string;
  currFilename: any;
  currFiletype: any;
  routeState: any;
  supplier: any;
  poPaymentDetails: any;
  selectedExp: any[] = [];

  grosssAmount: number;
  netAmount: number;

  vatRate: number = 0;
  vatWHRate: number = 0;
  incomeWHRate: number = 0;

  checklist: any[] = [];
  centersList: any;

  hidePointingInfo: boolean = false;
  initialExpense: any;

  expenseNames: any[] = [];
  selectedExpDetails: any[] = [];

  transactionDetails: any;

  pageAction: string = "Add";

  currentDate: Date = new Date();

  constructor(
    private tokenCookieService: TokenCookieService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private datepipe: DatePipe,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private supplierService: SupplierService,
    private payBill: ActiveBillsService,
    private parameterService: ParametersService,
    private filesService: FilesService,
    private snackbar: SnackbarService,
    private notificationAPI: NotificationService,
    private accessControlService: AccessControlService,
    private accountService: AccountService
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
      } else if (this.routeState.action == "Update Transaction") {
        this.pageAction = "Update";
        this.transactionDetails = this.routeState.transactionDetails
          ? JSON.parse(this.routeState.transactionDetails)
          : "";
      } else {
        this.routeState = "";
      }
    }
  }

  // transactionDetails: JSON.stringify(transactionDetails),
  // action: "Edit Transaction",
  ngOnInit(): void {
    this.user = this.tokenCookieService.getUser().username;

    this.initTransactionForm();
    this.initTransactionArray();
    this.getTransactions();
    this.getSuppliers();
    this.getTaxes();

    this.getPage();

    // this.getPointingDetailsId("expAccNo");

    if (this.supplier) {
      this.formData.patchValue({
        supplierId: this.supplier.id,
        supplierAccount: this.supplier.supplierAccount,
      });
    }
    if (this.poPaymentDetails) {
      this.getPODetails();
      this.getSupplierById(parseFloat(this.poPaymentDetails.supplierId));
      let event = { value: "Supplier account" };
      this.getSelectedAccType(event);

      this.computeTransaction();
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getPODetails() {
    this.formData.patchValue({
      havePo: "Yes",
      poNumber: this.poPaymentDetails.poNumber,
      poId: this.poPaymentDetails.poId,
      transactiontype: "pay_po",

      invoiceAmount: this.poPaymentDetails.originalTotalAfterTax,
      supplierAmount: this.poPaymentDetails.originalTotalAfterTax,

      grossAmount: this.poPaymentDetails.originalTotalAfterTax,
      amountExcTax: this.poPaymentDetails.originalTotalBeforeTax,

      vatAmount: this.poPaymentDetails.originalVatWitholding,
      iwtAmount: this.poPaymentDetails.originalIncomeWithholdingamount,
    });
  }

  createForm() {
    this.formData = this.fb.group({
      id: [""],
      deleteFlag: ["N"],
      postedBy: [this.user],
      postedFlag: ["Y"],
      postedTime: [new Date()],
      verifiedBy: [""],
      verifiedFlag: ["N"],
      verifiedTime: [""],
      partrans: [""],

      description: ["", Validators.required],
      transactiontype: ["direct_transfer"],

      vatRate: [18],
      vatWHRate: [6],
      incomeWHRate: [6],

      expenseType: new FormControl("Goods"),
      haveInvoice: new FormControl("No"),

      producttype: new FormControl("Local"),

      havePo: new FormControl("No", Validators.required),

      invoiceDate: [""],
      invoiceNo: [""],
      invoiceRefNo: [""],

      invoiceAmount: [""],
      tranAmount: [""],
      grossAmount: [""],
      amountExcTax: [""],

      supplierId: [""],
      supplierAmount: [""],
      supplierAccount: [""],
      supplierName: [""],

      vatAmount: [""],
      iwtAmount: [""],
      vwhtAmount: [""],

      vatAccount: [""],
      iwtAccount: [""],

      documents: [[]],

      trnType: ["T"],
      rateCode: [""],
      tranSubType: ["BI"],

      transTypeInfo: [""],
      modifiedBy: [""],
      modifiedTime: [""],

      currencyCode: ["UGX"],
    });

    this.transactionForm.patchValue({
      accountCurrencyCode: this.formData.value.currencyCode,
    });

    //   this.formData.get('invoiceDate').valueChanges.subscribe(value => {
    //     if (value) {
    //       const date = new Date(value);
    //       const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    //       this.myForm.get('invoiceDate').setValue(formattedDate, { emitEvent: false });
    //     }
    //   });
    // }
  }

  createEditForm() {
    this.formData = this.fb.group({
      id: [this.transactionDetails.id],
      transactionCode: [this.transactionDetails.transactionCode],
      deleteFlag: [this.transactionDetails.deleteFlag],
      postedBy: [this.transactionDetails.postedBy],
      postedFlag: [this.transactionDetails.postedFlag],
      postedTime: [this.transactionDetails.postedTime],
      verifiedBy: [this.transactionDetails.verifiedBy],
      verifiedFlag: [this.transactionDetails.verifiedFlag],
      verifiedTime: [this.transactionDetails.verifiedTime],
      partrans: [this.transactionDetails.partrans],
      tranAmount: [this.transactionDetails.tranAmount],

      supplierId: [this.transactionDetails.supplierId],
      supplierAccount: [this.transactionDetails.supplierAccount],
      supplierName: [this.transactionDetails.supplierName],

      description: [this.transactionDetails.description, Validators.required],
      transactiontype: [this.transactionDetails.transactiontype],

      taxAmount: [this.transactionDetails.taxAmount],
      vatRate: [this.transactionDetails.vatRate],
      vatWHRate: [this.transactionDetails.vatWHRate],
      incomeWHRate: [this.transactionDetails.incomeWHRate],

      expenseType: this.transactionDetails.expenseType,
      haveInvoice: this.transactionDetails.haveInvoice,

      producttype: this.transactionDetails.producttype,

      havePo: new FormControl(
        this.transactionDetails.havePo,
        Validators.required
      ),

      invoiceDate: [this.transactionDetails.invoiceDate],
      invoiceNo: [this.transactionDetails.invoiceNo],
      invoiceRefNo: [this.transactionDetails.invoiceRefNo],
      invoiceAmount: [this.transactionDetails.invoiceAmount],

      grossAmount: [this.transactionDetails.grossAmount],
      amountExcTax: [this.transactionDetails.amountExcTax],
      vatAmount: [this.transactionDetails.vatAmount],
      iwtAmount: [this.transactionDetails.iwtAmount],
      vwhtAmount: [this.transactionDetails.vwhtAmount],
      supplierAmount: [this.transactionDetails.supplierAmount],

      vatAccount: [this.transactionDetails.vatAccount],
      iwtAccount: [this.transactionDetails.iwtAccount],

      documents: [this.transactionDetails.documents],

      trnType: [this.transactionDetails.trnType],
      rateCode: [this.transactionDetails.rateCode],
      tranSubType: [this.transactionDetails.tranSubType],

      transTypeInfo: [this.transactionDetails.transTypeInfo],

      modifiedBy: [this.user],
      modifiedTime: [this.currentDate],

      currencyCode: [this.transactionDetails.currencyCode],
    });
    this.transactionForm.patchValue({
      accountCurrencyCode: this.formData.value.currencyCode,
    });

    if (this.formData.value.transTypeInfo === "isPayment") {
      this.paymentTransaction = true;
      this.supplierIsSelected = true;
      // let event = { value: "Supplier account" };
      // this.getSelectedAccType(event);
    }
    this.getDebitsAndCredits();
  }

  // onDateChange(event: MatDatepickerInputEvent<Date>) {
  //   const selectedDate = event.value;
  //   // Do something with the selected date
  //   if (selectedDate) {
  //     const date = new Date(selectedDate);
  //     const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  //     //this.formData.get('invoiceDate').setValue(formattedDate, { emitEvent: false });

  //     this.formData.patchValue({
  //       invoiceDate: formattedDate
  //     })

  //     console.log("formattedDate: ", formattedDate)
  //     console.log("selectedDate: ", selectedDate)
  //   }
  // }

  getPage() {
    if (this.pageAction === "Add") {
      this.createForm();
    }
    if (this.pageAction === "Update") {
      this.createEditForm();
      this.Valid = true;
      this.transactionArray = this.transactionDetails.partrans;
      this.getTransactions();
      this.getDebitsAndCredits();
    }
  }

  showPartitionInfo: boolean = false;
  private accountNoSubscription: Subscription;
  private isPointingSubscription: Subscription;
  initTransactionForm() {
    this.transactionForm = this.fb.group({
      id: [""],
      typeOfAccount: ["Office account", Validators.required],
      accountCurrencyCode: ["", Validators.required],
      amount: [
        "",
        [
          Validators.required,
          Validators.max(1000000000),
          Validators.pattern(/^\d+(\.\d{1,2})?$/),
        ],
      ],
      accountNo: [
        "",
        [Validators.required, Validators.pattern(/^[0-9a-zA-Z-]{10,}$/)],
      ],

      // accountNo: [
      //   "",
      //   [Validators.required, Validators.pattern(/^[0-9]{10,}$/)],
      // ],
      //9900OP2100007
      accountName: ["", Validators.required],
      narration: ["", Validators.required],
      parttranstype: ["Debit", Validators.required],
      costCenter: [""],
      exchangeRate: [""],
      supplierId: [""],
      supplier: [""],
      // taxName: [""],
      taxId: [""],
      isPointing: [{ value: "No", disabled: true }],
      pointingDetails: [[]],

      isPartition: ["N"],
      partitionAccount: [""],
      // treaRefNum: [""],

      solId: ["001"],
      solDesc: ["TestCenter"],
    });

    this.accountNoSubscription = this.transactionForm
      .get("accountNo")
      .valueChanges.subscribe((value) => {
        console.log("Value changed:", value);

        if (value !== "") {
          this.transactionForm.get("isPointing").enable();

          if (value.length >= 10) {
            this.getAccountInformation(value);
          } else {
            this.isAccountInfoLoading = true;
          }
        } else {
          this.isAccountInfoLoading = true;
          if (!this.transactionForm.get("isPointing").disabled) {
            this.transactionForm.get("isPointing").disable();
          }
        }

        let event = { value: "No" };
        this.getIsItPointing(event);
      });

    this.isPointingSubscription = this.transactionForm
      .get("isPointing")
      .valueChanges.subscribe((value) => {
        console.log("Value isPointing:", value);
        if (value === "Yes") {
        } else {
          let event = { value: "No" };
          this.getIsItPointing(event);
        }
      });
  }

  get f() {
    return this.formData.controls;
  }
  get p() {
    return this.f.partrans as FormArray;
  }

  currencyLookup(): void {
    const dialogRef = this.dialog.open(CurrencyFinacleLookupComponent, {
      width: "600px",
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.dialogData = result.data;
      //this.ccy_name = this.dialogData.ccy_name;
      this.formData.controls.currencyCode.setValue(result.data.currencyCode);
      this.transactionForm.patchValue({
        accountCurrencyCode: result.data.currencyCode,
      });

      // this.dataSource.data.forEach((transaction) => {
      //   transaction.accountCurrencyCode = "UGX";
      // });

      if (this.transactionArray && this.transactionArray.length > 0) {
        this.transactionArray.forEach((transaction) => {
          transaction.accountCurrencyCode = result.data.currencyCode;
        });
        this.dataSource.data = [...this.dataSource.data];
      }
    });
  }

  transactionArray = new Array();
  initTransactionArray() {
    this.transactionArray = new Array();
  }

  getTransactions() {
    this.isAccountInfoLoading = true;

    if (this.transactionArray.length == 0) {
      this.isLoading = true;
    } else {
      this.isLoading = false;
    }
    this.dataSource = new MatTableDataSource(this.transactionArray);
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  clearForm() {
    this.accountNoSubscription.unsubscribe();
    this.isPointingSubscription.unsubscribe();

    this.resetAccountsDetails();
    this.initTransactionForm();
    this.transactionForm.patchValue({
      accountCurrencyCode: this.formData.value.currencyCode,
    });
  }

  addToArray() {
    if (this.selectionPointing.selected.length === 0) {
    } else {
      this.missingPointingDebit = false;
      this.missingPointingCredit = false;
    }

    if (this.missingPointingDebit) {
      this.notificationAPI.alertWarning(
        "Please fill missing pointing debit details."
      );
      return; // stop execution
    } else if (this.missingPointingCredit) {
      this.notificationAPI.alertWarning(
        "Please fill missing pointing credit details."
      );
      return; // stop execution
    }

    // check if the form is valid
    if (this.transactionForm.invalid) {
      this.notificationAPI.alertWarning("Please fill in all required fields.");
      return; // stop execution if the form is invalid
    }

    if (this.transactionForm.value.isPointing === "Yes") {
      const totalAmt = this.selectionPointing.selected.reduce(
        (total, element) => {
          return total + parseFloat(element.amt);
        },
        0
      );

      console.log("totalAmt: ", totalAmt);

      if (totalAmt !== parseFloat(this.transactionForm.value.amount)) {
        this.notificationAPI.alertWarning(
          "Total Pointing details amount must match overall Transaction amount!"
        );
        return; // stop execution if there's an error
      }
    }

    // Check if all values of a certain field are the same
    const fieldName = "accountCurrencyCode"; // replace with your field name
    let areAllValuesSame = true;
    if (this.transactionArray.length > 0) {
      const firstValue = this.transactionArray[0][fieldName];
      this.transactionArray.forEach((transaction) => {
        if (transaction[fieldName] !== firstValue) {
          areAllValuesSame = false;
          return; // exit the loop early if there's a mismatch
        }
      });
    }

    if (areAllValuesSame) {
      // all values of the field are the same
      this.transactionArray.push(this.transactionForm.value);
    } else {
      // values of the field are not the same
      this.notificationAPI.alertWarning(
        "Transaction should be posted with common currency for all partrans"
      );
    }

    if (this.transactionArray.length === 0) {
      // create a new array with the first transaction
      this.transactionArray = [this.transactionForm.value];
    }

    // add the transaction to the array
    this.formData.patchValue({
      partrans: this.transactionArray,
    });

    console.log("this.formData.value.partrans", this.formData.value.partrans);

    this.validateData();
  }

  // getDebitsAnCredits() {
  //   this.debit_value = 0;
  //   this.credit_value = 0;
  //   this.total_value = 0;

  //   this.transactionArray.forEach((element) => {
  //     if (element.parttranstype == "Debit") {
  //       this.debit_value = this.debit_value + element.amount;
  //     } else if (element.parttranstype == "Credit") {
  //       this.credit_value = this.credit_value + element.amount;
  //     }
  //   });

  //   this.total_value = this.debit_value - this.credit_value;
  // }

  getDebitsAndCredits(): void {
    this.debit_value = 0;
    this.credit_value = 0;

    for (const element of this.transactionArray) {
      if (element.parttranstype === "Debit") {
        this.debit_value += Number(element.amount.toFixed(2));
      } else if (element.parttranstype === "Credit") {
        this.credit_value += Number(element.amount.toFixed(2));
      }
    }

    this.total_value = Number(
      (this.debit_value - this.credit_value).toFixed(2)
    );
  }

  validateData() {
    this.partTranType = this.transactionForm.controls.parttranstype.value;
    this.transactionAmount = this.transactionForm.controls.amount.value;
    // this.debit_value = 0;
    // this.credit_value = 0;
    // this.total_value = 0;

    this.getDebitsAndCredits();

    if (
      this.transactionForm.value.isPointing == "Yes" &&
      this.selectionPointing &&
      this.selectionPointing.selected.length > 0
    ) {
      this.transactionForm.value.pointingDetails =
        this.selectionPointing.selected;

      this.hidePointingInfo = false;
      this.selectionPointing = new SelectionModel<any>(true, []);
    }

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
    this.expAccSelected = false;
    this.showPartitionInfo = false;
    this.getTransactions();
    this.clearForm();
  }
  onEditTransactionDetails(data) {
    this.checkAccountType(data.typeOfAccount);
    this.index = this.transactionArray.indexOf(data);
    this.editButton = true;
    this.addButton = false;
    console.log("data: ", data);

    this.transactionForm.patchValue({
      id: data.id,
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
      // taxName: data.taxName,
      taxId: data.taxId,
      isPointing: data.isPointing,
      pointingDetails: data.pointingDetails,

      isPartition: data.isPartition,
      partitionAccount: data.partitionAccount,

      // treaRefNum: data.treaRefNum,
    });

    if (data.isPointing === "Yes") {
      this.hidePointingInfo = true;
      this.getPointingDetails(data.accountNo);
    }
  }

  checkAccountType(accountType: any) {
    let event = { value: accountType };
    this.getSelectedAccType(event);
  }
  updateTransactionDetails() {
    if (this.selectionPointing.selected.length === 0) {
    } else {
      this.missingPointingDebit = false;
      this.missingPointingCredit = false;
    }

    if (this.missingPointingDebit) {
      this.notificationAPI.alertWarning(
        "Please fill missing pointing debit details."
      );
      return; // stop execution
    } else if (this.missingPointingCredit) {
      this.notificationAPI.alertWarning(
        "Please fill missing pointing credit details."
      );
      return; // stop execution
    }


    if (this.transactionForm.value.isPointing === "Yes") {
      const totalAmt = this.selectionPointing.selected.reduce(
        (total, element) => {
          return total + parseFloat(element.amt);
        },
        0
      );

      console.log("totalAmt: ", totalAmt);

      if (totalAmt !== parseFloat(this.transactionForm.value.amount)) {
        this.notificationAPI.alertWarning(
          "Total Pointing details amount must match overall Transaction amount!"
        );
        return; // stop execution here if there's an error
      }
    }
    this.editButton = false;
    this.addButton = true;

    this.transactionArray[this.index] = this.transactionForm.value;
    this.formData.patchValue({
      partrans: this.transactionArray,
    });

    this.validateData();
  }
  onTransactionDetail(i: any) {
    this.transactionArray.splice(i, 1);
    this.validateData();
  }

  checkIfPayment() {
    if (
      this.formData.value.supplierId &&
      this.formData.value.supplierAmount &&
      this.formData.value.supplierAccount &&
      this.formData.value.supplierName
    ) {
      this.formData.patchValue({
        transTypeInfo: "isPayment",
      });
    } else {
      this.formData.patchValue({
        transTypeInfo: "isNotPayment",
      });
    }
  }
  hasAccess: boolean = false;
  onSubmit() {
    console.log("this.formData: ", this.formData);
    this.hasAccess = this.accessControlService.hasThisPrivilege([
      "Validate Transaction",
    ]);

    console.log("this.hasAccess: ", this.hasAccess);

    if (this.hasAccess) {
      this._snackBar.open(
        "You are not authorized to enter a transaction!",
        "Try again!",
        {
          horizontalPosition: "end",
          verticalPosition: "top",
          duration: 80000,
          panelClass: ["snackbar-danger", "snackbar-success"],
        }
      );
    }

    if (!this.hasAccess) {
      this.checkIfPayment();
      console.log("this.formData: ", this.formData);
      if (this.formData.valid) {
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
          if (!this.formData.value.description) {
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
          } else if (this.formData.value.description) {
            this.getDebitsAndCredits();
            this.formData.patchValue({
              tranAmount: this.debit_value,
            });

            console.log("Form Data", this.formData.value);
            console.log("this.debit_value", this.debit_value);

            if (this.pageAction === "Add") {
              this.payBill
                .postTransaction(this.formData.value)
                .pipe()
                .subscribe(
                  (res) => {
                    console.log("Response = ", res);

                    let message =
                      "TRANSACTION RESPONSE\n" +
                      "STATUS: " +
                      res.status +
                      "\n" +
                      "TRANSACTION CODE: " +
                      res.transactionCode +
                      "\n" +
                      "TRANSACTION DATE: " +
                      res.transactionDate;
                    this._snackBar.open(message, "X", {
                      horizontalPosition: this.horizontalPosition,
                      verticalPosition: this.verticalPosition,
                      duration: 2000000,
                      panelClass: ["snackbar-success", "snackbar-success"],
                    });

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
            } else if (this.pageAction === "Update") {
              console.log("Request for Update = ", this.formData.value);

              this.payBill
                .updateTransaction(this.formData.value)
                .pipe()
                .subscribe(
                  (res) => {
                    console.log("Response for Update = ", res);

                    let message =
                      "TRANSACTION RESPONSE\n" +
                      "STATUS: " +
                      res.status +
                      "\n" +
                      "TRANSACTION CODE: " +
                      res.transactionCode +
                      "\n" +
                      "TRANSACTION DATE: " +
                      res.transactionDate;
                    this._snackBar.open(message, "X", {
                      horizontalPosition: this.horizontalPosition,
                      verticalPosition: this.verticalPosition,
                      duration: 2000000,
                      panelClass: ["snackbar-success", "snackbar-success"],
                    });

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
  }

  getSelectedTranType(event: any) {
    if( this.selectedAcountNoInfo.length > 0){
      this.setPointingFlags();
    }
    
  }

  setFormValidators: boolean = false;
  // getSelectedAccType(event: any) {
  //   console.log("event :", event);
  //   if (event.value == "Office account") {
  //     this.supAccSelected = false;
  //     this.normalAccSelected = true;
  //     this.taxAccSelected = false;
  //     this.expAccSelected = false;
  //     this.transactionForm.patchValue({
  //       parttranstype: "Debit",
  //     });
  //   } else if (event.value == "Supplier account") {
  //     this.paymentTransaction = true;
  //     this.supAccSelected = true;
  //     this.normalAccSelected = false;
  //     this.taxAccSelected = false;
  //     this.expAccSelected = false;

  //     this.setFormValidators = true;
  //     this.setSupplierValidators();
  //     this.transactionForm.patchValue({
  //       parttranstype: "Credit",
  //     });
  //   } else if (event.value == "Tax account") {
  //     this.supAccSelected = false;
  //     this.normalAccSelected = false;
  //     this.taxAccSelected = true;
  //     this.expAccSelected = false;
  //     this.transactionForm.patchValue({
  //       parttranstype: "Credit",
  //     });
  //   } else if (event.value == "Expense account") {
  //     this.supAccSelected = false;
  //     this.normalAccSelected = false;
  //     this.taxAccSelected = false;
  //     this.expAccSelected = true;
  //     this.transactionForm.patchValue({
  //       parttranstype: "Debit",
  //     });
  //   }
  // }
  // getSelectedAccType(event: any) {
  // }

  resetAccountsInfo() {
    this.transactionForm.patchValue({
      accountNo: "",
      accountName: "",
    });
  }

  showTaxLookUp = false;
  getSelectedAccType(event: any) {
    this.resetAccountsDetails();
    this.resetAccountsInfo();

    console.log("event :", event);

    switch (event.value) {
      case "Office account":
        this.supAccSelected = false;
        this.normalAccSelected = true;
        this.taxAccSelected = false;
        this.expAccSelected = false;
        this.showTaxLookUp = false;
        this.transactionForm.patchValue({
          parttranstype: "Debit",
        });
        break;
      case "Supplier account":
        this.paymentTransaction = true;
        this.supAccSelected = true;
        this.normalAccSelected = false;
        this.taxAccSelected = false;
        this.expAccSelected = false;
        this.setFormValidators = true;
        this.showTaxLookUp = false;
        this.setSupplierValidators();
        this.transactionForm.patchValue({
          parttranstype: "Credit",
        });
        break;
      case "Tax account":
        this.supAccSelected = false;
        this.normalAccSelected = false;
        this.taxAccSelected = true;
        this.expAccSelected = false;
        this.showTaxLookUp = true;
        this.transactionForm.patchValue({
          parttranstype: "Credit",
        });
        break;
      case "Expense account":
        this.supAccSelected = false;
        this.normalAccSelected = false;
        this.taxAccSelected = false;
        this.expAccSelected = true;
        this.showTaxLookUp = false;
        this.transactionForm.patchValue({
          parttranstype: "Debit",
        });
        break;
      default:
        console.log("Invalid account type");
        break;
    }
  }

  setSupplierValidators() {
    //const tranAmount = this.formData.get("tranAmount");
    const supplierAmount = this.formData.get("supplierAmount");
    const iwtAmount = this.formData.get("iwtAmount");
    const invoiceAmount = this.formData.get("invoiceAmount");
    const grossAmount = this.formData.get("grossAmount");
    const amountExcTax = this.formData.get("amountExcTax");

    if (this.setFormValidators) {
      // tranAmount.setValidators([
      //   Validators.required,
      //   Validators.pattern(/^\d+(\.\d{1,2})?$/),
      // ]);
      supplierAmount.setValidators([
        Validators.required,
        Validators.pattern(/^\d+(\.\d{1,2})?$/),
      ]);
      iwtAmount.setValidators([
        Validators.required,
        Validators.pattern(/^\d+(\.\d{1,2})?$/),
      ]);
      invoiceAmount.setValidators([
        Validators.required,
        Validators.pattern(/^\d+(\.\d{1,2})?$/),
      ]);
      grossAmount.setValidators([
        Validators.required,
        Validators.pattern(/^\d+(\.\d{1,2})?$/),
      ]);
      amountExcTax.setValidators([
        Validators.required,
        Validators.pattern(/^\d+(\.\d{1,2})?$/),
      ]);
    } else {
      // tranAmount.clearValidators();
      supplierAmount.clearValidators();
      iwtAmount.clearValidators();
      invoiceAmount.clearValidators();
      grossAmount.clearValidators();
      amountExcTax.clearValidators();
    }

    // tranAmount.updateValueAndValidity();
    supplierAmount.updateValueAndValidity();
    iwtAmount.updateValueAndValidity();
    invoiceAmount.updateValueAndValidity();
    grossAmount.updateValueAndValidity();
    amountExcTax.updateValueAndValidity();
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

  supplierIsSelected = false;
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
        this.transactionForm.patchValue({
          accountName: result.data[0].supplierName,
          accountNo: result.data[0].supplierAccount,
          // supplier: result.data[0].supplierName,
          supplierId: result.data[0].id,
        });
        this.formData.patchValue({
          supplierId: result.data[0].id,
          supplierAccount: result.data[0].supplierAccount,
          supplierName: result.data[0].supplierName,
        });
        //this.getSupplierById(result.data[0].id);
        this.supplierIsSelected = true;
        this.isSupplierBankPostBank(result.data[0].supplierBank);
        this.isSupplierApproved(result.data[0].status);
      }
    });
  }

  isSupplierBankPostBank(supplierBank: string) {
    if (supplierBank.toLowerCase().includes("postbank")) {
      this.notificationAPI.alertSuccess("This is a PostBank account!");
    } else {
      this.notificationAPI.alertWarning("This is not a PostBank account!");
    }
  }
  isSupplierApproved(supplierStatus: string) {
    if (supplierStatus === "Pending") {
      this.supplierIsSelected = false;
      this.notificationAPI.alertWarning("This Supplier is NOT Verified!");
      this.transactionForm.patchValue({
        accountName: "",
        accountNo: "",
        supplierId: "",
      });
      this.formData.patchValue({
        supplierId: "",
        supplierAccount: "",
        supplierName: "",
      });
    }
  }

  branchCodeLookup() {
    if (!this.taxAccSelected) {
      const dialogRef = this.dialog.open(BranchCodeLookupComponent, {
        width: "700px",
      });
      dialogRef.afterClosed().subscribe((result) => {
        console.log(result);
        const { accountNo, accountName, accountCurrency, partionedFlag } =
          result.data;
        this.transactionForm.patchValue({
          accountNo,
          accountName,
          //accountCurrencyCode: accountCurrency,
          partionedFlag,
        });

        console.log("Value isPartition:", partionedFlag);

        if (partionedFlag === "Y") {
          this.showPartitionInfo = true;
          this.transactionForm.get("isPartition").setValue("Y");
          this.transactionForm
            .get("partitionAccount")
            .setValidators([Validators.required]);
        } else {
          this.showPartitionInfo = false;
          this.transactionForm.get("partitionAccount").clearValidators();
          this.transactionForm.get("partitionAccount").setValue("");
          this.transactionForm.get("isPartition").setValue("N");
        }
        this.transactionForm.get("partitionAccount").updateValueAndValidity();
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
  partitionAccountLookup() {
    const dialogRef = this.dialog.open(BranchCodeLookupComponent, {
      width: "600px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      this.transactionForm.patchValue({
        partitionAccount: result.data.accountNo,
      });
    });
  }
  rateCodeLookup() {
    const dialogRef = this.dialog.open(RateCodesFinacleComponent, {
      width: "600px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      this.formData.patchValue({
        rateCode: result.data.rateCode,
      });
    });
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

    const dialogRef = this.dialog.open(
      ExpenseCostcenterAccLookupComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.data.length != 0) {
        console.log("result: ", result.data);
        this.transactionForm.patchValue({
          accountNo: result.data.expenseAccount,
          accountName:
            result.data.expenseName + " " + result.data.costCenterName,
          costCenter:
            result.data.expenseName + " " + result.data.costCenterName,
        });
      }
    });
  }

  getTaxes() {
    this.subscription = this.parameterService
      .getParameters()
      .subscribe((res) => {
        this.taxes = res;
        this.filteredTaxes.push(this.taxes[1], this.taxes[2]);
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
          //taxName: result.data[0].taxName,
          taxId: result.data[0].id,
        });

        if (result.data[0].taxName == "VAT withholding") {
          this.formData.patchValue({
            vatAccount: result.data[0].taxAccount,
          });
        }
        if (result.data[0].taxName == "Income withholding") {
          this.formData.patchValue({
            iwtAccount: result.data[0].taxAccount,
          });
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
        this.formData.patchValue({
          description: result.data.description,
        });
        this.onSubmit();
      }
    });
  }

  getHavePO(event: any) {
    if (event.value == "Yes") {
      this.poAvailable = true;
    } else if (event.value == "No") {
      this.poAvailable = false;
    }
  }
  getPayType(event: any) {
    if (event.value == "Local") {
    } else if (event.value == "Import") {
    }
  }
  getExpenseType(event: any) {}

  getHaveInvoice(event: any) {
    if (event.value == "Yes") {
      this.invoiceAvailable = true;
    } else if (event.value == "No") {
      this.invoiceAvailable = false;
    }
  }

  vatRateChange(event: Event) {
    this.computeTransaction();
  }
  getGrossAmt(event: Event) {
    this.computeTransaction();
  }

  // grossAmount
  // amountExcTax

  // vatAmount
  // iwtAmount

  // supplierAmount
  // invoiceAmount

  // vatRate
  // incomeWHRate
  // vatWHRate

  // computeTransaction() {
  //   const { grossAmount, vatRate, incomeWHRate, vatWHRate } =
  //     this.formData.value;

  //   const gross = Number(grossAmount);

  //   let net;
  //   if (vatRate === 0) {
  //     net = +gross.toFixed(2);
  //   } else {
  //     net = +((100 / (100 + vatRate)) * gross).toFixed(2);
  //   }

  //   const tax = +((vatRate / 100) * gross).toFixed(2);
  //   const iwht = +((incomeWHRate / 100) * net).toFixed(2);
  //   const vwht = +((vatWHRate / 100) * net).toFixed(2);
  //   const supplierAmt = +(gross - iwht - vwht).toFixed(2);
  //   const total = +(net + tax + iwht + vwht).toFixed(2);

  //   this.formData.patchValue({
  //     grossAmount,
  //     amountExcTax: net,
  //     vatAmount: tax,
  //     iwtAmount: iwht,
  //     vwhtAmount: vwht,
  //     invoiceAmount: supplierAmt,
  //     supplierAmount: supplierAmt,
  //   });
  // }

  computeTransaction() {
    if (this.formData.value.producttype == "Local") {
      let { grossAmount, vatRate, incomeWHRate, vatWHRate } =
        this.formData.value;

      let net: number = 0,
        tax: number = 0,
        gross: number = 0,
        iwht: number = 0,
        vwht: number = 0,
        supplierAmt: number = 0;

      gross = Number(grossAmount);

      if (Number(vatRate) === 0) {
        //console.log("0 vatRate: ", vatRate);
        net = +gross.toFixed(2);
        tax = 0;
      } else {
        //console.log("not 0 vatRate: ", vatRate);
        net = +((100 / (100 + vatRate)) * gross).toFixed(2);
        tax = +((vatRate / 100) * gross).toFixed(2);
      }

      iwht = +((incomeWHRate / 100) * net).toFixed(2);
      vwht = +((vatWHRate / 100) * net).toFixed(2);
      supplierAmt = +(gross - iwht - vwht).toFixed(2);
      // const total = +(net + tax + iwht + vwht).toFixed(2);

      this.formData.patchValue({
        grossAmount,
        amountExcTax: net,
        vatAmount: tax,
        iwtAmount: iwht,
        vwhtAmount: vwht,
        invoiceAmount: supplierAmt,
        supplierAmount: supplierAmt,
      });
    }
  }

  getNetAmt(event: Event) {
    if (this.formData.value.producttype == "Local") {
      this.formData.patchValue({
        supplierAmount: this.formData.value.amountExcTax,
      });
    }
  }

  onSelectFile(files) {
    //console.log("row: ", selectedRow.value, index);
    this.isFileLoading.next(true);
    this.selectedFiles = [];
    this.filesService.toBase64(files, this.selectedFiles).subscribe((res) => {
      if (res) {
        this.isFileLoading.next(false);
        this.selectedFiles = res;

        let documents = [];
        this.selectedFiles.forEach((element) => {
          documents.push({
            file: element.base64,
            filename: element.name,
            filetype: element.file.type,
          });
        });

        this.formData.patchValue({
          documents: documents,
        });
        console.log("documents: ", documents);
      }
    });
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
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getSupplierById(suppIds) {
    this.selectedSup.push(suppIds);
    this.supplierService.getSupplierById(suppIds).subscribe((response: any) => {
      this.formData.patchValue({
        supplierId: response.id,
        supplier: response.supplierName,
        supplierAccount: response.supplierAccount,
        supplierName: response.supplierName,
      });
    });
  }

  // selectedAcountNoInfo = {
  //   "ACCT_NAME": "SSENDI RAMATHAN",
  //   "ACCT_FREEZE_FLAG": "",
  //   "ACCT_OWNERSHIP_FLAG": "C",
  //   "ACCT_BALANCE": "0.000000",
  //   "ACCT_CLOSURE_FLAG": "N",
  //   "ACCT_STATUS": "A",
  //   "ACCT_CURRENCY_CODE": "UGX"
  // }

  isAccountInfoLoading = true;
  activateLoader = false;
  //finacleConnectionIssue = false;
  isAccountValid: any;
  selectedAcountNoInfo: any;
  accountIsValid = false;
  allowChangeTranType = true;

  resetAccountsDetails() {
    this.partTransactionTypeArray = ["Debit", "Credit"];
    this.isAccountInfoLoading = true;
    this.activateLoader = false;
    //this.finacleConnectionIssue = false;
    this.isAccountValid = false;
    this.selectedAcountNoInfo = null;
    this.accountIsValid = false;
    this.allowChangeTranType = true;

    this.editButton = false;
    this.addButton = true;
  }

  missingPointingDebit: boolean = false;
  missingPointingCredit: boolean = false;

  //   if the flag is C then credit details must be entered

  //   if the flag is D then debit details must be entered

  getAccountInformation(accountNumber: any) {
    this.isAccountInfoLoading = true;
    this.activateLoader = true;
    this.accountService.fetchAccountNumberDetails(accountNumber).subscribe(
      (res) => {
        this.selectedAcountNoInfo = res;

        console.log("selectedAcountNoInfo: ", this.selectedAcountNoInfo);
        if (
          this.selectedAcountNoInfo.hasOwnProperty("ERROR_MESSAGE") ||
          this.selectedAcountNoInfo.hasOwnProperty("error")
        ) {
          // Account details not found, show error message
          this.isAccountValid = false;

          this.notificationAPI.alertWarning(
            "The details for the account you entered do not exist. Please use a different account!!"
          );
        } else {
          // Account details found, do something else
          this.isAccountValid = true;
          if (this.selectedAcountNoInfo.ACCT_FREEZE_FLAG == "N") {
            if (
              this.selectedAcountNoInfo.ACCT_CLOSURE_FLAG == "N" &&
              this.selectedAcountNoInfo.ACCT_STATUS == "A"
            ) {
              this.accountIsValid = true;
              this.transactionForm.patchValue({
                accountName: this.selectedAcountNoInfo.ACCT_NAME,
                solId: this.selectedAcountNoInfo.ACCT_SOLID,
                solDesc: this.selectedAcountNoInfo.ACCT_SOLDESC,
              });
              if (this.selectedAcountNoInfo.ACCT_OWNERSHIP_FLAG != "O") {
                this.partTransactionTypeArray = ["Credit"];
                this.transactionForm.patchValue({
                  parttranstype: "Credit",
                });
              }
            } else {
              this.accountIsValid = false;
              this.notificationAPI.alertWarning(
                "Please use a different account, this account is either Closed, Frocen or Dormant!"
              );
            }
          } else {
            this.accountIsValid = false;
            this.notificationAPI.alertWarning(
              "Please use a different account, this account is either Closed, Frocen or Dormant!"
            );
          }

          this.setPointingFlags();
        }

        this.isAccountInfoLoading = false;
        this.activateLoader = false;
      },
      (err) => {
        console.log("Error: ", err);
        this.isAccountInfoLoading = false;
        this.isAccountValid = false;
        //this.finacleConnectionIssue = true;
        this.activateLoader = false;
      }
    );
  }

  setPointingFlags(){
    if (
      this.selectedAcountNoInfo.CONTRA_PART_TRAN_TYPE === "C" &&
      this.transactionForm.value.parttranstype === "Credit"
    ) {
      this.missingPointingDebit = false;
      this.missingPointingCredit = true;

      console.log("missingPointingDebit: ", this.missingPointingDebit);
      console.log("missingPointingCredit: ", this.missingPointingCredit);
    } else if (
      this.selectedAcountNoInfo.CONTRA_PART_TRAN_TYPE === "D" &&
      this.transactionForm.value.parttranstype === "Debit"
    ) {
      this.missingPointingDebit = true;
      this.missingPointingCredit = false;

      console.log("missingPointingDebit: ", this.missingPointingDebit);
      console.log("missingPointingCredit: ", this.missingPointingCredit);
    } else {
      this.missingPointingDebit = false;
      this.missingPointingCredit = false;

      console.log("missingPointingDebit: ", this.missingPointingDebit);
      console.log("missingPointingCredit: ", this.missingPointingCredit);
    }
  }

  // **********************************************************************************************************************************************************************************************************************

  disablePointing: boolean = true;
  noData: boolean = false;
  // pointingBody: any[] = [];
  pointingBody: any[] = [];

  applyPointingFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourcePointing.filter = filterValue.trim().toLowerCase();
    if (this.dataSourcePointing.paginator) {
      this.dataSourcePointing.paginator.firstPage();
    }
  }

  getIsItPointing(event: any) {
    if (event.value == "Yes") {
      this.getPointingDetails(this.transactionForm.value.accountNo);
    } else if (event.value == "No") {
      //this.transactionForm.get("isPointing").setValue("No");
      this.hidePointingInfo = false;
      this.isPontingLoading = false;
      this.pointingBody = [];
    }
  }
  // pageIndex = 0;
  // pageSize = 1;
  // onPageChange(event: PageEvent) {
  //   this.pageIndex = event.pageIndex;
  //   this.pageSize = event.pageSize;
  // }

  isPontingLoading: boolean = false;

  getPointingDetails(accNo) {
    this.isPontingLoading = true;
    this.parameterService.getPointingDetailsByAcc(accNo).subscribe(
      (response: any) => {
        this.hidePointingInfo = true;
        this.noData = false;
        console.log("Response = ", response);
        if (response.length == 0) {
          this.notificationAPI.alertWarning(
            "No pointing details associated to this account!"
          );
          this.transactionForm.get("isPointing").setValue("No");
        } else {
          if (response) {
            this.pointingBody = [];
            this.pointingBody = response;
            if (
              Array.isArray(this.pointingBody) &&
              this.pointingBody.length === 0
            ) {
              this.noData = true;
            }
            this.dataSourcePointing = new MatTableDataSource<any>([]);

            this.dataSourcePointing = new MatTableDataSource<any>(
              this.pointingBody
            );
            this.dataSourcePointing.paginator = this.paginatorPointing;
            this.dataSourcePointing.sort = this.sortPointing;
            // this.dataSourcePointing.paginator = this.paginatorPointing;
            // this.dataSourcePointing.sort = this.sortPointing;

            if (this.transactionForm.value.pointingDetails.length !== 0) {
              this.filter();
            }
            this.isPontingLoading = false;
          }
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  filter() {
    //let storeId = [1, 2, 3];
    this.dataSourcePointing.data.forEach((element) => {
      this.transactionForm.value.pointingDetails.forEach((item) => {
        if (item.tranId === element.tranId) {
          this.selectionPointing.select(element);

          const index = this.dataSourcePointing.data.indexOf(element);
          this.dataSourcePointing.data[index].amt = item.amt;
          this.dataSourcePointing.data[index].id = item.id;
          // Update the MatTableDataSource
          this.dataSourcePointing.data = [...this.dataSourcePointing.data];
        }
      });
    });

    console.log("this.dataSourcePointing: ", this.dataSourcePointing);

    //console.log("dataSourceFilteredList ", this.dataSourceFilteredList);
  }

  //Picking Info
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelectedPicking() {
    const numSelected = this.selectionPointing.selected.length;
    const numRows = this.dataSourcePointing.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterTogglePicking() {
    if (this.isAllSelectedPicking()) {
      this.selectionPointing.clear();
      return;
    }

    this.selectionPointing.select(...this.dataSourcePointing.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabelPicking(row?: any): string {
    if (!row) {
      return `${this.isAllSelectedPicking() ? "deselect" : "select"} all`;
    }
    return `${
      this.selectionPointing.isSelected(row) ? "deselect" : "select"
    } row ${row.position + 1}`;
  }

  getSelectedPickingInfo() {
    console.log("this.selection.selected; ", this.selectionPointing.selected);
  }

  updatePickingItemCall(row: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      action: "edit pointing info",
      data: "data",
    };
    const dialogRef = this.dialog.open(
      AddPointingPartialAmtComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((result) => {
      console.log("result.data; ", result.data);
      if (result && result.data.length != 0) {
        // this.formData.patchValue({
        //   description: result.data.description,
        // });

        // Get the index of the row
        const index = this.dataSourcePointing.data.indexOf(row);

        // Implement the update logic here using the index
        // ...

        // Example: update the amt field to 100
        this.dataSourcePointing.data[index].amt = result.data.amt;

        // Update the MatTableDataSource
        this.dataSourcePointing.data = [...this.dataSourcePointing.data];
      }
    });
  }
}
