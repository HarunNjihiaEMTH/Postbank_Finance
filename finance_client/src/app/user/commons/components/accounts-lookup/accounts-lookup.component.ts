import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil } from 'rxjs';
import { AddExpenseComponent } from 'src/app/admin/modules/supplier/pages/expenses-management/add-expense/add-expense.component';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { AccountService } from 'src/app/user/data/services/account.service';
import { CommonsService } from 'src/app/user/data/services/commons/commons.service';
import { Account } from 'src/app/user/data/types/account';
import { BranchCode } from 'src/app/user/data/types/branch-code';
import { SchemeType } from 'src/app/user/data/types/commons/scheme-type';


@Component({
  selector: 'app-accounts-lookup',
  templateUrl: './accounts-lookup.component.html',
  styleUrls: ['./accounts-lookup.component.sass']
})
export class AccountsLookupComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = [
    "accountnumber",
    "accountname",
    "currency",
    "branchid",
  ];

  branchCodes: Account[] = [];
  dataSource: MatTableDataSource<Account>;
  isLoading: boolean;
  selection = new SelectionModel<Account>(true, []);
  index: number;
  id: number;
  schemeCodes: SchemeType[] = [];
  banksBranchCodes: BranchCode[] = [];
  fetchAccountsParametersForm: FormGroup;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  constructor( public dialogRef: MatDialogRef<AddExpenseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private accountService: AccountService,
    private commonService: CommonsService,
    private fb: FormBuilder) {
      super();
     }

  ngOnInit(): void {
    this.getBankBranchCodes();

    this.getSchemeTypes();

    //this.getAccounts()

    this.fetchAccountsParametersForm = this.createFetchAccountsParametersForm();
  }

  createFetchAccountsParametersForm() {
    return this.fb.group({
      SOL_ID: ["", [Validators.required]],
      schemecode: ["", [Validators.required]],
    });
  }

  getAccounts() {
    // this.isLoading = true;
    // this.accountService
    //   .fetchBranchCodes(this.fetchAccountsParametersForm.value.SOL_ID, this.fetchAccountsParametersForm.value.schemecode)
    //   .pipe(takeUntil(this.subject))
    //   .subscribe((res) => {
    //     this.branchCodes = res;

    //     console.log(res);

    //     if (this.branchCodes.length > 0) {
    //       this.isLoading = false;
    //     }

    //     this.dataSource = new MatTableDataSource<Account>(this.branchCodes);
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    //   }, err => {
    //     console.log(err)
    //   });
    console.log("This Look-up was replaced")
  }

  onSelectRow(data: any) {
    this.dialogRef.close({ event: "close", data: data });

    console.log(data);
  }

  getSchemeTypes() {
    this.commonService
      .fetchScehemCodes()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (result) => {
          this.schemeCodes = result;

          console.log(this.schemeCodes);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getBankBranchCodes() {
    this.commonService
      .fetchBranchCodes()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (result) => {
          this.banksBranchCodes = result;
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

  // context menu
  onContextMenu(event: MouseEvent, item: BranchCode) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }

}
