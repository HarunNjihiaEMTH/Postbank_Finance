import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { CostCenterService } from 'src/app/user/data/services/cost-center.service';
import { Category } from 'src/app/user/data/types/category';
import { CostCenter } from 'src/app/user/data/types/cost-center';
import { ExpenseCostcenterAccLookupComponent } from '../expense-costcenter-acc-lookup/expense-costcenter-acc-lookup.component';

@Component({
  selector: 'app-general-costcenters-lookup',
  templateUrl: './general-costcenters-lookup.component.html',
  styleUrls: ['./general-costcenters-lookup.component.sass']
})
export class GeneralCostcentersLookupComponent implements OnInit {

  displayedColumns: string[] = [
    "select",
    "id",
    "costCenterName",
    "status",

  ];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;

  selection = new SelectionModel<any>(false, []);

  costCenterDetails: any;
  selectedRows: any[] = [];
  atleastOneSelected: boolean = false;

  dataSourceFilteredList: any[] = [];
  costCenterArray: any[] = [];

  isLoading: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<ExpenseCostcenterAccLookupComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private costCenterService: CostCenterService,
    private snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
    // if (this.data.action == 'cost centers for multi-accrual') {
    //   this.selection = new SelectionModel<any>(false, []);
    // }

    this.costCenterDetails = this.data.data;
    this.costCenterArray = this.data.selected;
    if (this.costCenterDetails.length > 0) {
      this.isLoading = false;
    }
    console.log("this.costcenters: ", this.costCenterDetails);

    this.dataSource = new MatTableDataSource<any>(this.costCenterDetails);
    this.dataSource.sort = this.sort;

    if (this.costCenterArray.length !== 0) {
      this.filter();
      console.log("filter by: ", this.costCenterArray);
    }
  }
  ngAfterViewInit() {

    console.log("Finally: ", this.dataSourceFilteredList);

    this.dataSource.paginator = this.paginator;
  }

  filter() {
    //let storeId = [1, 2, 3];
    this.dataSource.data.forEach((element) => {
      this.costCenterArray.forEach((item) => {
        if (item === element.id) {
          // this.dataSourceFilteredList.push(this.dataSource.data.indexOf(element));
          this.selection.select(element);
        }
      });
    });

    console.log("dataSourceFilteredList ", this.dataSourceFilteredList);
  }

  // filter() {
  //   let storeId = [1, 2, 3];
  //   storeId.forEach((element) => {
  //    // row.id === element;
  //     // this.dataSourceFilteredList.push(this.dataSource.data.filter
  //     //   (row => row.id === 1));

  //     if( this.dataSource.data.filter(row => row.id === element)){
  //       this.dataSourceFilteredList.push(this.dataSource.data.indexOf(element));
  //     }

  //     });

  //   console.log("dataSourceFilteredList ", this.dataSourceFilteredList);

  //   this.selection = new SelectionModel<any>(true, this.dataSourceFilteredList);
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  //******************************************************************************************************
  //Select expense

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
  }
  proceed() {
    this.dialogRef.close({ event: "close", data: this.selectedRows });

    //   console.log(data);
  }

  onNoClick(): void {
    this.dialogRef.close({ event: "close", data: this.selectedRows });
  }
  public confirmAdd(): void { }

}
