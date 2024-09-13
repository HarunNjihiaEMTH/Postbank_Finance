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
import { AllCostCentersComponent } from '../all-cost-centers/all-cost-centers.component';

@Component({
  selector: 'app-view-cost-center-details',
  templateUrl: './view-cost-center-details.component.html',
  styleUrls: ['./view-cost-center-details.component.sass']
})
export class ViewCostCenterDetailsComponent extends BaseComponent implements OnInit {
  
  displayedColumns: string[] = [
    "id",
    "expense",
    "expenseAccount",
  ];
  dataSource!: MatTableDataSource<Category>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  selection = new SelectionModel<any>(true, []);
  
  costCenterDetails: any; 

  constructor(public dialogRef: MatDialogRef<AllCostCentersComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private costCenterService: CostCenterService,
    private snackbar: SnackbarService) {
      super();
     }

  ngOnInit(): void {
    this.costCenterDetails = this.data.data;

    console.log("this.costCenterDetails: ", this.costCenterDetails.expenses);

    this.dataSource = new MatTableDataSource<Category>(this.costCenterDetails.expenses);
        this.dataSource.sort = this.sort;
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
