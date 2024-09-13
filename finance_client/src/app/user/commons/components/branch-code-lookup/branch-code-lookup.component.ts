import { SelectionModel } from "@angular/cdk/collections";
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { takeUntil } from "rxjs";
import { AddExpenseComponent } from "src/app/admin/modules/supplier/pages/expenses-management/add-expense/add-expense.component";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { BankBranchCodesLookupComponent } from "src/app/user/commons/components/bank-branch-codes-lookup/bank-branch-codes-lookup.component";
import { SchemeCodesLookupComponent } from "src/app/user/commons/components/scheme-codes-lookup/scheme-codes-lookup.component";
import { AccountService } from "src/app/user/data/services/account.service";
import { CommonsService } from "src/app/user/data/services/commons/commons.service";
import { Account } from "src/app/user/data/types/account";
import { BranchCode } from "src/app/user/data/types/branch-code";
import { SchemeType } from "src/app/user/data/types/commons/scheme-type";



@Component({
  selector: 'app-branch-code-lookup',
  templateUrl: './branch-code-lookup.component.html',
  styleUrls: ['./branch-code-lookup.component.scss']
})
export class BranchCodeLookupComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = ["accountNo", "accountName", "accountCurrency", "partionedFlag"];

  branchCodes: Account[] = [];
  dataSource: MatTableDataSource<Account>;
  isLoading: boolean;
  selection = new SelectionModel<Account>(true, []);
  index: number;
  id: number;
  schemeCodes: SchemeType[] = [];
  banksBranchCodes: BranchCode[] = [];
  fetchAccountsParametersForm: FormGroup;
  fetchAccountsByNameForm: FormGroup;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  onFirstLoad: boolean = true;
  noData: boolean = false;

  acctTypeArray: any[] = [
    { name: "Office", value: "O" },
    { name: "Customer", value: "C" },
    { name: "Employee", value: "E" },
  ];

  constructor(
    public dialogRef: MatDialogRef<AddExpenseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private accountService: AccountService,
    private commonService: CommonsService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    super();
  }

  ngOnInit(): void {
    this.fetchAccountsParametersForm = this.createFetchAccountsParametersForm();
    this.fetchAccountsByNameForm = this.createFetchAccountsNamesForm();
  }

  createFetchAccountsParametersForm() {
    return this.fb.group({
      acctType: ["O", [Validators.required]],
      SOL_ID: ["", [Validators.required]],
      schemecode: ["", [Validators.required]],
    });
  }
  createFetchAccountsNamesForm() {
    return this.fb.group({
      acctName: ["", [Validators.required]],
    });
  }
  getSelectedAccountType(event: any) {}
  getAccounts() {
    console.log(
      "this.fetchAccountsParametersForm: ",
      this.fetchAccountsParametersForm
    );
    this.dataSource = new MatTableDataSource<Account>([]);
    this.onFirstLoad = false;
    this.isLoading = true;
    this.accountService
      .fetchBranchCodes(
        this.fetchAccountsParametersForm.value.acctType,
        this.fetchAccountsParametersForm.value.SOL_ID,
        this.fetchAccountsParametersForm.value.schemecode
      )
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.branchCodes = res;

          console.log("Accounts = ", res);

          if (this.branchCodes.length > 0) {
            this.isLoading = false;
            this.noData = false;
          }
          if (this.branchCodes.length === 0) {
            this.isLoading = false;
            this.noData = true;
          }
          this.dataSource = new MatTableDataSource<Account>(this.branchCodes);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (err) => {
          console.log(err);
          this.isLoading = false;
          this.noData = true;
        }
      );
  }

  showFilter = false;

  getAccountsByName() {
    this.dataSource = new MatTableDataSource<Account>([]);
    this.onFirstLoad = false;
    this.isLoading = true;

    let searchStr = this.fetchAccountsByNameForm.value.acctName.toUpperCase();
    console.log("this.fetchAccountsByNameForm: ", searchStr);
    this.accountService
      .fetchAccountsByName(searchStr)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.branchCodes = res;

          console.log("Accounts = ", res);

          if (this.branchCodes.length > 0) {
            this.isLoading = false;
            this.noData = false;

            this.showFilter = true;
          }
          if (this.branchCodes.length === 0) {
            this.isLoading = false;
            this.noData = true;
            this.showFilter = false;
          }
          this.dataSource = new MatTableDataSource<Account>(this.branchCodes);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (err) => {
          console.log(err);
          this.isLoading = false;
          this.noData = true;
          this.showFilter = false;
        }
      );
  }

  onSelectRow(data: any) {
    this.dialogRef.close({ event: "close", data: data });

    console.log(data);
  }

  schemeTypesLookup() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      test: "",
    };

    const dialogRef = this.dialog.open(
      SchemeCodesLookupComponent,
      dialogConfig
    );
    //   {
    //     "schemeCode": "MFI2",
    //     "schemeDesc": "SACCO/FIN INSTITUTIONS"
    // }
    dialogRef.afterClosed().subscribe(
      (result) => {
        console.log("Result ", result);
        this.fetchAccountsParametersForm.patchValue({
          schemecode: result.data.schemeCode,
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  branchCodesLookup() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      test: "",
    };

    const dialogRef = this.dialog.open(
      BankBranchCodesLookupComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe(
      (result) => {
        console.log("Result ", result);

        this.fetchAccountsParametersForm.patchValue({
          SOL_ID: result.data.branchCode,
        });
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
}
