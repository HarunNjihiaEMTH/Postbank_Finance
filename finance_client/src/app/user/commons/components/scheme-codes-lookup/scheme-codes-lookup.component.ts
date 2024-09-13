import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
  selector: 'app-scheme-codes-lookup',
  templateUrl: './scheme-codes-lookup.component.html',
  styleUrls: ['./scheme-codes-lookup.component.sass']
})
export class SchemeCodesLookupComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = [
    "no",
    "schemeCode",
    "schemeDesc",
  ];

  branchCodes: Account[] = [];
  dataSource: MatTableDataSource<Account>;
  //isLoading: boolean;
  selection = new SelectionModel<Account>(true, []);
  index: number;
  id: number;
  schemeCodes: any[] = [];
  banksBranchCodes: any[] = [];

  isLoading = true;
  noData: boolean;

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
        this.getSchemeTypes();

  }

  getSchemeTypes() {
    this.commonService
      .fetchScehemCodes()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (result) => {
          this.schemeCodes = result;

          console.log("schemeCodes: ", this.schemeCodes)

          if(this.schemeCodes.length == 0){
            this.isLoading = false;
            this.noData = true;
          }
        if (this.schemeCodes.length > 0) {
          this.isLoading = false;
          this.noData = false;
        }
     

        this.dataSource = new MatTableDataSource<Account>(this.schemeCodes);
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


  onSelectRow(data: any) {
    this.dialogRef.close({ event: "close", data: data });

    console.log(data);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  onContextMenu(event: MouseEvent, item: BranchCode) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }

}
