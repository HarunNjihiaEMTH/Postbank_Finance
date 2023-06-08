import { SelectionModel } from "@angular/cdk/collections";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { ActivePosService } from "src/app/admin/data/services/activepos.service";
import { LocalStorageService } from "src/app/admin/data/services/localstorage.service";
import { Category } from "src/app/user/data/types/category";

@Component({
  selector: 'app-active-po-details-non',
  templateUrl: './active-po-details-non.component.html',
  styleUrls: ['./active-po-details-non.component.sass']
})
export class ActivePoDetailsNonComponent implements OnInit {

  displayedColumns: string[] = [
    "id",
    "itemName",
    "itemQuantity",
    "itemUnitPrice",
    "itemTotalValue",
    "vatAmount",
    "incomeWithholdingamount",
    "vatWitholding",
    "deliveryStatus",
    "amountTobepaid",
    "amountBalance",
    "serviceName",
    "servicePrice",
    "remarks",
  ];
  dataSource!: MatTableDataSource<Category>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };
  selection = new SelectionModel<Category>(true, []);

  routeState: any;
  purchaseOrder: any;
  poSelected: any;
  data: any;
  loading: boolean = true;
  poItemsArray: any[] = [];
  constructor(
    private router: Router,
    private poService: ActivePosService,
    private localStorageService: LocalStorageService
  ) {
   
  }

  ngOnInit(): void {
    this.data = this.localStorageService.get("po");
    console.log("purchaseOrder", this.data);
    const poID = this.data.id;
    this.getPoById(poID);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getPoById(poId) {
    this.poService.getActivePoById(poId).subscribe(
      (response: any) => {
        //this.detail = response;
        this.purchaseOrder = response;
        this.poItemsArray = this.purchaseOrder.poParticulars;

        if (this.purchaseOrder) {
          this.loading = false;
        }

        this.dataSource = new MatTableDataSource<Category>(this.poItemsArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  
}
