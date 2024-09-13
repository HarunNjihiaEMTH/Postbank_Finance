import { SelectionModel } from "@angular/cdk/collections";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { takeUntil } from "rxjs";
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { StockCategoryService } from "src/app/user/data/services/customer/stock-category.service";
import { StockCategory } from "src/app/user/data/types/customer-types/stock-category";
import { AddItemCategoryComponent } from "../add-item-category/add-item-category.component";
import { DeleteItemCategoryComponent } from "../delete-item-category/delete-item-category.component";
import { ItemCategoryDetailsComponent } from "../item-category-details/item-category-details.component";
import { UpdateItemCategoryComponent } from "../update-item-category/update-item-category.component";

@Component({
  selector: "app-all-item-categories",
  templateUrl: "./all-item-categories.component.html",
  styleUrls: ["./all-item-categories.component.sass"],
})
export class AllItemCategoriesComponent
  extends BaseComponent
  implements OnInit
{
  categories: StockCategory[] = [];
  displayedColumns: string[] = [
    "id",
    "categoryName",
    "categoryDescription",
    "status",
    "postedTime",
    "actions",
  ];
  dataSource!: MatTableDataSource<StockCategory>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  selection = new SelectionModel<StockCategory>(true, []);
  data: any;
  error: any;
  isLoading: boolean = true;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private stockCategoryService: StockCategoryService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getCategories();
  }
  refresh() {
    this.getCategories();
  }

  getCategories() {
    this.stockCategoryService
      .getAllStockCategories()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          console.log(res);
          this.categories = res;

          if (this.categories) {
            this.isLoading = false;

            this.dataSource = new MatTableDataSource<StockCategory>(
              this.categories
            );
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  addCategoryCall() {
    const dialogRef = this.dialog.open(AddItemCategoryComponent, {
      width: "500px",
      data: {
        data: "",
        action: "Add",
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getCategories();
    });
  }

  updateCategoryCall(category) {
    const dialogRef = this.dialog.open(UpdateItemCategoryComponent, {
      width: "500px",
      data: category,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getCategories();
    });
  }

  viewCategoryDetailsCall(category) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      data: category,
    };
    this.dialog.open(ItemCategoryDetailsComponent, dialogConfig);
  }

  deleteCategoryCall(category) {
    const dialogRef = this.dialog.open(DeleteItemCategoryComponent, {
      width: "500px",
      data: category,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getCategories();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onContextMenu(event: MouseEvent, item: StockCategory) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}
