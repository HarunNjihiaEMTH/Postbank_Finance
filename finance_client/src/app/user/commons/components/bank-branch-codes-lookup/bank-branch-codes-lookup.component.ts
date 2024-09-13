import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil } from 'rxjs';
import { AddSupplierComponent } from 'src/app/admin/modules/supplier/pages/suppliers-management/add-supplier/add-supplier.component';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { CommonsService } from 'src/app/user/data/services/commons/commons.service';
import { Bank } from 'src/app/user/data/types/commons/bank';

@Component({
  selector: 'app-bank-branch-codes-lookup',
  templateUrl: './bank-branch-codes-lookup.component.html',
  styleUrls: ['./bank-branch-codes-lookup.component.sass']
})
export class BankBranchCodesLookupComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = ["no", "branchCode", "branchName"];
  banks: any[] = [];

  dataSource: MatTableDataSource<any>;
  isLoading = true;
  selection = new SelectionModel<any>(true, []);
  index: number;
  id: number;
  noData: boolean;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  constructor(
    public dialogRef: MatDialogRef<AddSupplierComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private commonsService: CommonsService
  ) {
    super();
  }

  ngOnInit(): void {
    this.fetchBranchCodes();
  }

  fetchBranchCodes() {
    this.commonsService
      .fetchBranchCodes()
      // .pipe(takeUntil(this.subject))
      .subscribe(
        (result) => {
          this.banks = result;

          console.log("Banks", this.banks)

          if (this.banks.length>0) {
            this.isLoading = false;
            this.noData = false;

            this.dataSource = new MatTableDataSource<any>(this.banks);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
          if(this.banks.length == 0){
            this.isLoading = false;
            this.noData = true;
          }
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
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onContextMenu(event: MouseEvent, item: any) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}
