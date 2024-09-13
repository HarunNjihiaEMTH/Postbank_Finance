import { SelectionModel } from "@angular/cdk/collections";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { ActivePosService } from "src/app/admin/data/services/activepos.service";

import { Category } from "src/app/user/data/types/category";

@Component({
  selector: 'app-paid-pos',
  templateUrl: './paid-pos.component.html',
  styleUrls: ['./paid-pos.component.sass']
})
export class PaidPosComponent implements OnInit {

  displayedColumns: string[] = [
    "id",
    "poName",
    "poNumber",
    "poTotalAmount",
    "supplierName",
    "postedBy",
    "postedTime",
    "poStatus",
    "verifiedBy",
    "verifiedTime",
    "actions",
  ];
  dataSource!: MatTableDataSource<Category>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  selection = new SelectionModel<any>(true, []);
  data: any;
  error: any;
  isLoading: boolean = true;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private activePoService: ActivePosService
  ) { }

  ngOnInit(): void {
    this.getPaidPurchaseOrders();
  }

  refresh() {
    this.getPaidPurchaseOrders();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getPaidPurchaseOrders() {
    this.activePoService.getPaidPos().subscribe(
      (res) => {
        console.log(res);
        this.data = res;

        if (this.data) {
          this.isLoading = false;

          this.dataSource = new MatTableDataSource<any>(this.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }


 
 
}
