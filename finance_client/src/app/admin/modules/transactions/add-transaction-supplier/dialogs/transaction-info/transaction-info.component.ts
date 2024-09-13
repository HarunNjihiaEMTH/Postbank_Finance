import { SelectionModel } from "@angular/cdk/collections";
import { HttpEventType, HttpParams, HttpResponse } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormControl,
  FormBuilder,
} from "@angular/forms";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { FilesService, SelectedFiles } from "src/app/admin/data/fileconversion/files.service";
import { ActiveBillsService } from "src/app/admin/data/services/activebills.service";
import { LocalStorageService } from "src/app/admin/data/services/localstorage.service";
import { ParametersService } from "src/app/admin/data/services/parameters.service";
import { UploadInvoiceService } from "src/app/admin/data/services/uploadInvoice.service";
import { EditPaymentBreakdownComponent } from "src/app/admin/modules/bills/pay-bill/dialog/edit-payment-breakdown/edit-payment-breakdown.component";
import { BranchCodeLookupComponent } from "src/app/admin/modules/supplier/pages/expenses-management/branch-code-lookup/branch-code-lookup.component";
import { TokenCookieService } from "src/app/core/service/token-storage-cookies.service";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { CurrencyCodeLookupComponent } from "src/app/user/commons/components/currency-code-lookup/currency-code-lookup.component";

import { ExpensesLookupComponent } from "src/app/user/commons/components/expenses-lookup/expenses-lookup.component";
import { SuppliersLookupComponent } from "src/app/user/commons/components/suppliers-lookup/suppliers-lookup.component";

import Swal from "sweetalert2";

const ELEMENT_DATA = {
  id: 2,
  title: "Angular",
  elements: [
    {
      idElementFormation: 7,
      elementFormation: "routing",
      tempsElement: 30,
      prixElement: 30,
    },
    {
      idElementFormation: 8,
      elementFormation: "service",
      tempsElement: 30,
      prixElement: 20,
    },
    {
      idElementFormation: 9,
      elementFormation: "NxjS",
      tempsElement: 30,
      prixElement: 10,
    },
  ],
};
export class element {
  idElementFormation?: number;
  elementFormation: string;
  tempsElement?: number; // ca doit etre en date
  prixElement: number;
}

@Component({
  selector: "app-transaction-info",
  templateUrl: "./transaction-info.component.html",
  styleUrls: ["./transaction-info.component.scss"],
})
export class TransactionInfoComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = "end";
  verticalPosition: MatSnackBarVerticalPosition = "top";

  subscription!: Subscription;
  prepForm!: FormGroup;
  invoiceAvailable: boolean = false;

  //****************************************************************************************************************

  //Unpaid accruals
  displayedColumns: string[] = [
    "select",
    "transid",
    "month",
    "accrualbal",
    "description",
  ];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  selection = new SelectionModel<any>(false, []);
  //Paid accruals
  displayedColumnsPaid: string[] = [
    "id",
    "transid",
    "month",
    "accrualbal",
    "description",
  ];

  dataSourcePaid!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginatorPaid!: MatPaginator;
  @ViewChild(MatSort) sortPaid!: MatSort;


  expensesDetails: any;
  selectedRows: any[] = [];
  atleastOneSelected: boolean = false;

  dataSourceFilteredList: any[] = [];
  accrualsArray: any[] = [];

  unpaidAccrualArray: any[] = [];
  paidAccrualsArray: any[] = [];

  //*****************************************************************************************************************/

  difference: number;

  referenceNo: string = "";

  incurTax: boolean = true;
  incurVatWH: boolean = true;
  incurIncomeWH: boolean = true;

  grosssAmount: number;
  taxes: any;

  vatWHAccount: any;
  incomeWHAccount: any;
  vatRate: number = 0;
  vatWHRate: number = 0;
  incomeWHRate: number = 0;
  supplierAmt: number = 0;
  vatAmt: number = 0;
  vatWHAmt: number = 0;
  incomeWHAmt: number = 0;

  isGoods: boolean = true;
  isService: boolean = false;

  netAmount: number;
  customValueValid: boolean = false;
  accrualMoreThanInvoice: any;

  // *********************************************************************************************************
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
  isLoading: boolean = true;
  paymentInfo: any[] = [];
  // *********************************************************************************************************
  transactionForm: FormGroup;
  transProceed: boolean = false;

  routeState: any;
  selecTransSupp: any;
  transData: any;

  accrualInfo: any;
  currentUser: any;

  HighlightRow: Number;
  //ClickedRow: any;

  messagelist!: any;

  finalSend: boolean = false;

  isTransactionLoading: boolean = false;
  isPaidAcrualDataLoading: boolean = true;
  isUnpaidAcrualDataLoading: boolean = true;

  enableReverse: boolean = false;

  public selectedFiles: SelectedFiles[] = [];
  public isFileLoading = new BehaviorSubject(false);

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private uploadInvoice: UploadInvoiceService,
    private snackbar: SnackbarService,
    private parameterService: ParametersService,
    private _snackBar: MatSnackBar,
    private payBill: ActiveBillsService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private tokenCookieService: TokenCookieService,
    private filesService: FilesService,
  ) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.routeState = this.router.getCurrentNavigation().extras.state;
      if (this.routeState) {
        this.selecTransSupp = this.routeState.selectedDetails
          ? JSON.parse(this.routeState.selectedDetails)
          : "";

        this.localStorageService.set("supplierTrans", this.selecTransSupp);
      }
    }
  }

  ngOnInit(): void {
    this.currentUser = this.tokenCookieService.getUser().username;
    this.transData = this.localStorageService.get("supplierTrans");
    //this.suppliercontracts = this.transData.suppliercontracts;

    console.log("transData: ", this.transData);

    this.initprepForm();
    this.getTaxes();

    this.prepForm.patchValue({
      supplierId: this.transData.referenceID,
      supplierName: this.transData.supplierName,
      supplierAccount: this.transData.supplierAc,
      accrualAccountName: this.transData.accrualAccountName,
      accrualAccount: this.transData.accrualAccount,
    });
    this.getSupplierDetailsForAccrual();

    this.getSuppliersHistory();

    this.clickedRow(0);
  }

  //****************************************************************************************************************

  getSupplierDetailsForAccrual() {
    const params = new HttpParams().set("supplier_id", parseInt(this.transData.referenceID));
    this.payBill.getSupplierAcrualDetails(params).subscribe(
      (res) => {
        this.accrualInfo = res;
        console.log("this.accrualInfo : ", this.accrualInfo);
        this.unpaidAccrualArray = [];
        this.paidAccrualsArray = [];
        this.accrualInfo.forEach((element) => {
          if (element.accrualbal == 0) {
            this.paidAccrualsArray.push(element);
          }
          if (element.accrualbal != 0) {
            this.unpaidAccrualArray.push(element);
          }
        });

        //console.log("accrualInfo: ", this.accrualInfo);

        if (this.unpaidAccrualArray.length > 0) {
          this.isUnpaidAcrualDataLoading = false;
          this.dataSource = new MatTableDataSource<any>(this.unpaidAccrualArray);
          this.dataSource.sort = this.sort;
        }
        if (this.paidAccrualsArray.length > 0) {
          this.isPaidAcrualDataLoading = false;
          this.dataSourcePaid = new MatTableDataSource<any>(this.paidAccrualsArray);
          this.dataSource.sort = this.sortPaid;
        }


        if (this.accrualsArray.length !== 0) {
          this.filter();
          console.log("filter by: ", this.accrualsArray);
        }

        this.typeOfDeliverable(this.accrualInfo.expenseType);
      },
      (err) => {
        this.snackbar.showNotification(
          "snackbar-danger",
          err + " No accrual data exists for this supplier!"
        );
        console.log(err);
      }
    );
  }

  filter() {
    this.dataSource.data.forEach((element) => {
      this.accrualsArray.forEach((item) => {
        if (item === element.id) {
          this.selection.select(element);
        }
      });
    });

    console.log("dataSourceFilteredList ", this.dataSourceFilteredList);
  }
  applyFilterPaid(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourcePaid.filter = filterValue.trim().toLowerCase();
    if (this.dataSourcePaid.paginator) {
      this.dataSourcePaid.paginator.firstPage();
    }
  }

  applyFilterUnpaid(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
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

  expSelected() {
    this.atleastOneSelected = true;
    this.selectedRows = this.selection.selected;

    console.log("this.selectedRows: ", this.selectedRows);
    this.prepForm.patchValue({
      collectAcrualTransId: this.selectedRows[0].transid,
      totalAccruedAmt: this.selectedRows[0].accrualbal,
    });

  }
  //*****************************************************************************************************************/

  clickedRow(index) {
    this.HighlightRow = index;
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
  getTaxes() {
    this.subscription = this.parameterService
      .getParameters()
      .subscribe((res) => {
        this.taxes = res;

        this.vatWHAccount = this.taxes[1].taxAccount;
        this.incomeWHAccount = this.taxes[2].taxAccount;

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

    this.finalCalcs();
  }

  typeOfDeliverable(type) {
    if (type == "Goods") {
      this.isGoods = true;
    } else if (type == "Services") {
      this.isService = true;
    }
  }

  initprepForm() {
    this.prepForm = this.fb.group({
      supplier: [""],
      supplierId: [""],
      supplierName: [""],
      supplierAccount: ["", Validators.required],

      accrualAccountName: ["", Validators.required],
      accrualAccount: ["", Validators.required],

      expense: ["", Validators.required],
      partrans: [""],

      supplierAmount: [""],

      // paymentExpenses: [""],

      haveInvoice: ["No"],
      invoiceDate: [""],
      invoiceNo: [""],
      invoiceRefNo: [""],
      invoiceAmount: [""],
      description: [""],
      paymentMode: [""],
      // selectedCostCenters: [""],

      totalAccruedAmt: [0],

      incurTax: new FormControl("Yes", Validators.required),
      incurVatWH: new FormControl("Yes", Validators.required),
      incurIncomeWH: new FormControl("Yes", Validators.required),

      expenseType: new FormControl("Goods", Validators.required),
      producttype: new FormControl("Local", Validators.required),
      paymentState: ["Full"],

      grossAmount: ["", Validators.required],
      amountExcTax: ["", Validators.required],
      vatAccount: [""],
      iwtAccount: [""],
      vatRate: [0],
      vatWHRate: [0],
      incomeWHRate: [0],
      conversionRate: [1],
      verifiedTime: [""],
      verifiedBy: [""],
      postedBy: [this.currentUser],
      postedTime: [new Date()],

      currency: ["UGX"],
      collectAcrualTransId: ["", Validators.required],

      transactiontype: ["pay_accrual"],
      documents: [[]]
    });
  }
  prepareTransaction() {
    if (
      this.prepForm.value.totalAccruedAmt != 0 ||
      this.prepForm.value.invoiceAmount != 0
    ) {
      if (
        this.prepForm.value.totalAccruedAmt > this.prepForm.value.invoiceAmount
      ) {
        this.accrualMoreThanInvoice = "Reverse";
        this.difference =
          this.prepForm.value.totalAccruedAmt -
          this.prepForm.value.invoiceAmount;

        Swal.fire({
          title: "Please balance transaction!",
          text:
            "Accrued amount exceeds invoice amount by " + this.difference + "!",
          icon: "warning",
          showDenyButton: true,
          showCancelButton: true,
          cancelButtonColor: "#d33",
          confirmButtonText: `Yes, balance!`,
          confirmButtonColor: "#3085d6",
          denyButtonText: `Just proceed!`,
          denyButtonColor: "#858ae3",
        }).then((result) => {
          if (result.isConfirmed) {
            //Swal.fire('Saved!', '', 'success')
            this.navigateToReverse();
          } else if (result.isDenied) {
            //Swal.fire('Changes are not saved', '', 'info')
            this.transProceed = true;
            if (this.finalSend == true) {
              this.prepForm.patchValue({
                paymentState: "Partial",
              });
              this.onSubmit();
            }
          }
        });
      } else if (
        this.prepForm.value.totalAccruedAmt == this.prepForm.value.invoiceAmount
      ) {
        this.transProceed = true;
        //this.theTransactionForm();
        // if (this.paymentInfo) {
        //   this.onSubmit();
        // }
      } else if (
        this.prepForm.value.totalAccruedAmt < this.prepForm.value.invoiceAmount
      ) {
        this.accrualMoreThanInvoice = "Advance";
        this.difference =
          this.prepForm.value.invoiceAmount -
          this.prepForm.value.totalAccruedAmt;
        Swal.fire({
          title: "Please balance transaction",
          text:
            "Invoice amount exceeds accrued amount by " + this.difference + "!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, balance!",
        }).then((result) => {
          if (result.value) {
            this.navigateToReverse();
            console.log(
              "Before this.accrualMoreThanInvoice: ",
              this.accrualMoreThanInvoice
            );
          }
        });
      }
    } else {
      this.snackbar.showNotification(
        "snackbar-danger",
        "Accrual amount or Invoice amount cannot be zero... Please check!"
      );
    }
  }
  navigateToReverse() {
    this.router.navigate(["/admin/transactions/post-transaction"], {
      state: {
       
        selectedDetails: JSON.stringify(this.accrualInfo),
        minorDetails: JSON.stringify(this.accrualMoreThanInvoice),
        action: "Redo transaction",
        difference: this.difference,
        
      },
    });
  }

  navigateToReverseWholeAccrual() {
    this.router.navigate(["/admin/transactions/post-transaction"], {
      state: {
        action: "Reverse accrual",
        selectedAccrual: JSON.stringify(this.selectedRows),
        supplierDetails:  JSON.stringify(this.transData),
        
      },
    });
  }
  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();
    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
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

      this.theTransactionForm();
    } else {
      this.snackbar.showNotification(
        "snackbar-danger",
        "Net amount must be a number!"
      );
    }
  }
  getIncurTax(event: any) {
    //console.log("radio 2 = ", event.value);
    if (event.value == "Yes") {
      this.incurTax = true;
    } else if (event.value == "No") {
      this.incurTax = false;
    }
  }
  getIncurVatWH(event: any) {
    if (event.value == "Yes") {
      this.incurVatWH = true;
    } else if (event.value == "No") {
      this.incurVatWH = false;
    }

    this.theTransactionForm();
  }

  getIncurIncomeWH(event: any) {
    if (event.value == "Yes") {
      this.incurIncomeWH = true;
    } else if (event.value == "No") {
      this.incurIncomeWH = false;
    }
  }

  branchCodeLookup() {
    const dialogRef = this.dialog.open(BranchCodeLookupComponent, {
      width: "600px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      this.prepForm.patchValue({
        accrualAccount: result.data.accountnumber,
        accrualAccountName: result.data.accountname,
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

  getHaveInvoice(event: any) {
    //console.log("radio 1 = ", event.value);
    if (event.value == "Yes") {
      this.invoiceAvailable = true;
    } else if (event.value == "No") {
      this.invoiceAvailable = false;
    }
  }

  
  //**********************************************************************************************************

  theTransactionForm() {
    this.paymentInfo = [];
    this.transactionForm = this.fb.group({
      accountName: [this.prepForm.value.accrualAccountName],
      accountNo: [this.prepForm.value.accrualAccount],
      amount: [this.prepForm.value.grossAmount],
      narration: ["Amount debited"],
      parttranstype: ["Debit"],
      accountCurrencyCode: ["UGX"],
    });

    this.paymentInfo.push(this.transactionForm.value);
    this.refreshDatasource();
    this.finalCalcs();
  }

  finalCalcs() {
    this.grosssAmount = this.prepForm.value.grossAmount;
    this.netAmount = this.prepForm.value.amountExcTax;
    this.vatRate = this.prepForm.value.vatRate;
    this.vatWHRate = this.prepForm.value.vatWHRate;
    this.incomeWHRate = this.prepForm.value.incomeWHRate;

    console.log("this.grosssAmount : ", this.grosssAmount);
    console.log("this.netAmount : ", this.netAmount);
    console.log("this.vatRate : ", this.vatRate);
    console.log("this.vatWHRate : ", this.vatWHRate);

    this.calculateEvenVatWHAmt();
    this.calculateEvenIncomeWHAmt();
    this.calculateEvenSupplierAmt();
  }
  calculateEvenVatWHAmt() {
    this.transactionForm.patchValue({
      accountName: "Vat WH A/C",
      accountNo: this.taxes[1].taxAccount,
      narration: "Amount credited",
      parttranstype: "Credit",
      accountCurrencyCode: "UGX",
    });
    if (!this.incurTax) {
      this.transactionForm.patchValue({
        amount: 0,
      });
    } else if (this.incurTax) {
      if (this.isGoods) {
        this.vatWHAmt = Math.round((this.vatWHRate / 100) * this.netAmount);
        this.transactionForm.patchValue({
          amount: this.vatWHAmt,
        });
      } else if (this.isService) {
        if (this.incurVatWH) {
          this.vatWHAmt = Math.round((this.vatWHRate / 100) * this.netAmount);
          this.transactionForm.patchValue({
            amount: this.vatWHAmt,
          });
        } else if (!this.incurVatWH) {
          this.vatWHAmt = 0;
          this.transactionForm.patchValue({
            amount: 0,
          });
        }
      }
    }

    this.prepForm.patchValue({
      vatAmount: this.vatWHAmt,
    });

    this.paymentInfo.push(this.transactionForm.value);
    this.refreshDatasource();
  }
  calculateEvenIncomeWHAmt() {
    this.transactionForm.patchValue({
      accountName: "Income WH A/C",
      accountNo: this.taxes[2].taxAccount,
      narration: "Amount credited",
      parttranstype: "Credit",
      accountCurrencyCode: "UGX",
    });
    if (!this.incurTax) {
      this.transactionForm.patchValue({
        amount: 0,
      });
    } else if (this.incurTax) {
      if (this.isGoods) {
        if (this.incurIncomeWH) {
          this.incomeWHAmt = Math.round(
            (this.incomeWHRate / 100) * this.netAmount
          );
          this.transactionForm.patchValue({
            amount: this.incomeWHAmt,
          });
        } else if (!this.incurIncomeWH) {
          this.incomeWHAmt = 0;
          this.transactionForm.patchValue({
            amount: 0,
          });
        }
      } else if (this.isService) {
        if (this.incurIncomeWH) {
          this.incomeWHAmt = Math.round(
            (this.incomeWHRate / 100) * this.netAmount
          );
          this.transactionForm.patchValue({
            amount: this.incomeWHAmt,
          });
        } else if (!this.incurIncomeWH) {
          this.incomeWHAmt = 0;
          this.transactionForm.patchValue({
            amount: 0,
          });
        }
      }
    }

    this.prepForm.patchValue({
      iwtAmount: this.incomeWHAmt,
    });

    this.paymentInfo.push(this.transactionForm.value);
    this.refreshDatasource();
  }
  calculateEvenSupplierAmt() {
    this.transactionForm.patchValue({
      accountName: this.prepForm.value.supplierName,
      accountNo: this.prepForm.value.supplierAccount,
      narration: "Amount credited",
      parttranstype: "Credit",
      accountCurrencyCode: this.prepForm.value.currency,
    });
    if (!this.incurTax) {
      this.transactionForm.patchValue({
        amount: this.grosssAmount,
      });
    } else if (this.incurTax) {
      if (this.isGoods) {
        this.supplierAmt = this.grosssAmount - this.vatWHAmt - this.incomeWHAmt;
        this.transactionForm.patchValue({
          amount: this.supplierAmt,
        });
      } else if (this.isService) {
        this.supplierAmt = this.grosssAmount - this.vatWHAmt - this.incomeWHAmt;
        this.transactionForm.patchValue({
          amount: this.supplierAmt,
        });
      }
    }
    this.prepForm.patchValue({
      supplierAmount: this.supplierAmt,
    });

    this.paymentInfo.push(this.transactionForm.value);
    this.refreshDatasource();
  }
  refreshDatasource() {
    this.isLoading = false;
    this.dataSource2 = new MatTableDataSource<any>(this.paymentInfo);
    this.dataSource2.paginator = this.paginatorLegal;
    this.dataSource2.sort = this.sort2;

    console.log("Refreshed");
  }
  validateForm() {
    this.finalSend = true;
    if (
      this.prepForm.value.totalAccruedAmt != this.prepForm.value.invoiceAmount
    ) {
      this.prepareTransaction();
    } else {

      this.onSubmit();


    }
  }
  onSubmit() {
    if (this.selectedRows.length !== 0) {
      this.isTransactionLoading = true;
      this.customValueValid = true;
      for (var i = 0; i < this.paymentInfo.length; i++) {
        if (this.paymentInfo[i].amount <= 0) {
          this.paymentInfo.splice(i, 1);
        }
      }
      if (this.customValueValid) {
        this.prepForm.patchValue({
          partrans: this.paymentInfo,
        });
        console.log("Form = ", this.prepForm.value);
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
                "/admin/transactions/pending-transactions"
              );
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
        this.isTransactionLoading = false;
      }
    } else {
      this.snackbar.showNotification('snackbar-danger', 'Please select the accrual to debit from !!')
    }


  }
  onNoClick() { }

  getSuppliersHistory() {
    const params = new HttpParams().set("supplier_id", this.transData.referenceID);
    this.payBill.getAccrualHistoryPerSupplier(params).subscribe((response: any) => {
      this.messagelist = response;

      //      this.messagelist = [
      //   {
      //     id: 1,
      //     msg: "Test first notification",
      //   },
      //   {
      //     id: 2,
      //     msg: "Test first notification",
      //   },
      // ];

      console.log("supplierHistory = ", this.messagelist);
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
      if (result && result.data.length != 0) {
        if (this.paymentInfo.length != 0) {
          let i = this.paymentInfo.indexOf(data);
          this.paymentInfo[i] = result.data;
          this.refreshDatasource();
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
