import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { takeUntil } from "rxjs";
import { AccessControlService } from "src/app/admin/data/services/_AccessControlService.service";
import { TokenCookieService } from "src/app/core/service/token-storage-cookies.service";

import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SubCategoryService } from "src/app/user/data/services/sub-category.service";
import { SubCategory } from "src/app/user/data/types/sub-category";
import { AddSubCategoryComponent } from "../add-sub-category/add-sub-category.component";
import { DeleteSubCategoryComponent } from "../delete-sub-category/delete-sub-category.component";
import { UpdateSubCategoryComponent } from "../update-sub-category/update-sub-category.component";
import { ViewSubCategoryDetailsComponent } from "../view-sub-category-details/view-sub-category-details.component";
import { SubCategoryStatusComponent } from "./dialogs/sub-category-status/sub-category-status.component";

@Component({
  selector: "app-all-sub-categories",
  templateUrl: "./all-sub-categories.component.html",
  styleUrls: ["./all-sub-categories.component.sass"],
})
export class AllSubCategoriesComponent extends BaseComponent implements OnInit {
  subcategories: SubCategory[] = [];
  currentUser: any;

  displayedColumns: string[] = [
    "id",
    "subcategoryName",
    "subcategoryDescription",
    //"glSubHead",
    "status",
    "postedBy",
    "postedTime",
    "actions",
  ];
  dataSource!: MatTableDataSource<SubCategory>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };
  isLoading: boolean = true;

  constructor(
    private subCategoriesService: SubCategoryService,
    private dialog: MatDialog,
    private tokenCookieService: TokenCookieService,
    private accessControlService: AccessControlService
  ) {
    super();
  }

  ngOnInit(): void {
    this.currentUser = this.tokenCookieService.getUser().username;

    this.getSubcategories();
  }

  refresh() {
    this.getSubcategories();
  }

  getSubcategories() {
    this.subCategoriesService
      .getSubCategories()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          console.log(res);
          this.subcategories = res;

          console.log(this.subcategories);

          if (this.subcategories) {
            this.isLoading = false;

            this.dataSource = new MatTableDataSource<SubCategory>(
              this.subcategories
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

  hasAccess: boolean;
  addSubcategoryCall() {
    this.hasAccess = this.accessControlService.hasPrivilege(["Add Expense SubCategories"]);
    if (this.hasAccess) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "500px";
      dialogConfig.data = {
        action: "add category",
      };

      const dialogRef = this.dialog.open(AddSubCategoryComponent, dialogConfig);

      dialogRef.afterClosed().subscribe((result) => {
        this.getSubcategories();
      });
    }
  }
  viewSubcategoryDetailsCall(subcategory) {
    this.hasAccess = this.accessControlService.hasPrivilege(["View Expense SubCategories"]);
    if (this.hasAccess) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "500px";
      dialogConfig.data = {
        data: subcategory,
      };

      const dialogRef = this.dialog.open(
        ViewSubCategoryDetailsComponent,
        dialogConfig
      );

      dialogRef.afterClosed().subscribe((result) => {
        this.getSubcategories();
      });
    }
  }
  updateSubcategoryCall(subcategory) {
    this.hasAccess = this.accessControlService.hasPrivilege(["Update Expense SubCategories"]);
    if (this.hasAccess) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      data: subcategory,
    };

    const dialogRef = this.dialog.open(
      UpdateSubCategoryComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((result) => {
      this.getSubcategories();
    });
  }}

  deleteSubcategoryDetailsCall(subcategory) {
    this.hasAccess = this.accessControlService.hasPrivilege(["Delete Expense SubCategories"]);
    if (this.hasAccess) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      data: subcategory,
    };

    const dialogRef = this.dialog.open(
      DeleteSubCategoryComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((result) => {
      this.getSubcategories();
    });
  }}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onContextMenu(event: MouseEvent, item: SubCategory) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }

  updateStatus(row) {
    this.hasAccess = this.accessControlService.hasPrivilege(["Validate SubCategories"]);
    if (this.hasAccess) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      data: row,
    };
    const dialogRef = this.dialog.open(
      SubCategoryStatusComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((result) => {
      this.getSubcategories();
    });
  }}
}
