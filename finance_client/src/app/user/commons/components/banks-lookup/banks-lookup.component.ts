import { SelectionModel } from "@angular/cdk/collections";
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { takeUntil } from "rxjs";
import { AddSupplierComponent } from "src/app/admin/modules/supplier/pages/suppliers-management/add-supplier/add-supplier.component";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { CommonsService } from "src/app/user/data/services/commons/commons.service";
import { Bank } from "src/app/user/data/types/commons/bank";
import { Country } from "../countries-lookup/countries-lookup.component";

// export interface Bank {
//   name?: string;
// }

// const BANKS: Bank[] = [
//   { name: "African Banking Corp. Ltd" },
//   { name: " ABC Capital Bank" },
//   { name: "Bank of Africa Kenya Ltd." },
//   { name: "Bank of India" },
//   { name: "Bank of Baroda (K) Ltd" },
//   { name: "Barclays Bank of Kenya Ltd" },
//   { name: "CfC Stanbic Bank Ltd" },
//   { name: "Chase Bank (K) Ltd" },
//   { name: "Citibank N.A" },
//   { name: "Commercial Bank of Africa Ltd" },
//   { name: "Consolidated Bank of Kenya Ltd" },
//   { name: "Co-operative Bank of Kenya Ltd." },
//   { name: "Credit Bank Ltd." },
//   { name: "Cairo International Bank" },
//   { name: "Centenary Bank" },
//   { name: "Citibank Uganda Limited" },
//   { name: "Development Bank (K) Ltd." },
//   { name: "Diamond Trust Bank (K) Ltd" },
//   { name: "Dubai Bank Ltd" },
//   { name: "DFCU Bank" },
//   { name: "Diamond Trust Bank" },
//   { name: "Ecobank Limited" },
//   { name: "Equatorial Commercial Bank Ltd" },
//   { name: "Equity Bank Ltd" },
//   { name: "Ecobank Uganda" },
//   { name: "Family Bank Ltd" },
//   { name: "Faulu Bank" },
//   { name: "Fidelity Commercial Bank Ltd" },
//   { name: "Fina Bank Ltd" },
//   { name: "First Community Bank Ltd" },
//   { name: "Giro Commercial Bank Ltd" },
//   { name: "Guardian Bank Ltd" },
//   { name: "Gulf African Bank Ltd" },
//   { name: "Housing Finance Bank" },
//   { name: "Habib Bank A.G. Zurich" },
//   { name: "Habib Bank Ltd" },
//   { name: "Housing Finance Company of Kenya Ltd" },
//   { name: "Imperial Bank Ltd" },
//   { name: "I & M Bank Ltd" },
//   { name: "Imperial Bank Uganda" },
//   { name: "Jamii Bora Bank Ltd" },
//   { name: "K-Rep Bank Ltd." },
//   { name: "Kenya Commercial Bank Ltd" },
//   { name: "Kenya Women Microfinance Bank" },
//   { name: "KCB Bank" },
//   { name: "National Bank of Kenya Ltd" },
//   { name: "NIC Bank Ltd" },
//   { name: "NC Bank Uganda" },
//   { name: "Oriental Bank Ltd" },
//   { name: "Paramount Universal Bank Ltd" },
//   { name: "Prime Bank Ltd" },
//   { name: "Postbank" },
//   { name: "Standard Chartered Bank (K) Ltd" },
//   { name: "Stanbic Bank" },
//   { name: "Transnational Bank Ltd" },
//   { name: "UBA Kenya Bank Ltd" },
//   { name: "Victoria Commercial Bank Ltd." },
// ];

@Component({
  selector: "app-banks-lookup",
  templateUrl: "./banks-lookup.component.html",
  styleUrls: ["./banks-lookup.component.scss"],
})
export class BanksLookupComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = ["id", "bankName", "bankShortName"];
  banks: Bank[] = [];

  dataSource: MatTableDataSource<Bank>;
  isLoading = true;
  selection = new SelectionModel<Bank>(true, []);
  index: number;
  id: number;

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
    this.fetchBanks();
  }

  fetchBanks() {
    this.commonsService
      .fetchBanks()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (result) => {
          this.banks = result;

          console.log("this.banks: ", this.banks)

          if (this.banks) {
            this.isLoading = false;

            this.dataSource = new MatTableDataSource<Bank>(this.banks);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        },
        (err) => {
          console.log(err);
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

  onContextMenu(event: MouseEvent, item: Bank) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}
