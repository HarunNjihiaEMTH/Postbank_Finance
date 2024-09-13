import { SelectionModel } from "@angular/cdk/collections";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { takeUntil } from "rxjs";
import { ActiveBillsService } from "src/app/admin/data/services/activebills.service";
import { ActivePosService } from "src/app/admin/data/services/activepos.service";
import { LocalStorageService } from "src/app/admin/data/services/localstorage.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { Category } from "src/app/user/data/types/category";

@Component({
  selector: "app-active-bills",
  templateUrl: "./active-bills.component.html",
  styleUrls: ["./active-bills.component.sass"],
})
export class ActiveBillsComponent implements OnInit {
  categories: Category[] = [];
  
  displayedColumns: string[] = [
    "poId",
    "supplierName",
    "invoiceNo",
    "poName",
    "postedTime",
    // "majorCategory",
    // "subCategory",
    "actions",
  ];
  dataSource!: MatTableDataSource<Category>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  selection = new SelectionModel<Category>(true, []);
  data: any;
  error: any;
  isLoading: boolean = true;

  routeState: any;
  dataSelected: any;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private activeBillsService: ActiveBillsService,
    private localStorageService: LocalStorageService,
  ) {
    // if (this.router.getCurrentNavigation().extras.state) {
    //   this.routeState = this.router.getCurrentNavigation().extras.state;
    //   if (this.routeState) {
    //     this.dataSelected = this.routeState.dataSelectedDetails
    //       ? JSON.parse(this.routeState.dataSelectedDetails)
    //       : "";

    //     this.localStorageService.set("data", this.dataSelected);
    //   }
    // }
  }

  ngOnInit(): void {
    this.getBills();
  }

  refresh() {
    this.getBills();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getBills() {
    this.activeBillsService.getActiveBills().subscribe(
      (res) => {
        console.log("Bills: ", res);

        this.categories = res;

        if (this.categories) {
          this.isLoading = false;

          this.dataSource = new MatTableDataSource<Category>(this.categories);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  viewBillDetails() {}

  pay(data) {

    // console.log("pay clicked: ", data);
    this.router.navigate(
      ["/admin/bills/payment-with-po"],
      {
        state: {
          poSelectedDetails: JSON.stringify(data),
        },
      }
    );
  }
  
}
