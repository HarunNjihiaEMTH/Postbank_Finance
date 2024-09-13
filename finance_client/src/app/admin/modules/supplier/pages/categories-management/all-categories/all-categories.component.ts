import { SelectionModel } from "@angular/cdk/collections";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { takeUntil } from "rxjs";
import { AccessControlService } from "src/app/admin/data/services/_AccessControlService.service";
import { TokenCookieService } from "src/app/core/service/token-storage-cookies.service";

import { BaseComponent } from "src/app/shared/components/base/base.component";
import { CategoryService } from "src/app/user/data/services/category.service";
import { Category } from "src/app/user/data/types/category";
import { CreateCategoryComponent } from "../create-category/create-category.component";
import { DeleteCategoryComponent } from "../delete-category/delete-category.component";
import { UpdateCategoryComponent } from "../update-category/update-category.component";
import { ViewCategoryDetailsComponent } from "../view-category-details/view-category-details.component";
import { CategoriesStatusComponent } from "./dialogs/categories-status/categories-status.component";

@Component({
  selector: "app-all-categories",
  templateUrl: "./all-categories.component.html",
  styleUrls: ["./all-categories.component.sass"],
})
export class AllCategoriesComponent extends BaseComponent implements OnInit {
  categories: Category[] = [];
  displayedColumns: string[] = [
    "id",
    //"categoryCode",
    "categoryName",
    "categoryDescription",
    //"glCode",
    "status",
    "postedBy",
    "postedTime",
    //"createdAt",
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
  currentUser: any;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private categoriesService: CategoryService,
    private tokenCookieService: TokenCookieService,
    private accessControlService: AccessControlService
  ) {
    super();
  }

  ngOnInit(): void {
    this.currentUser = this.tokenCookieService.getUser().username;

    this.getCategories();
  }

  refresh() {
    this.getCategories();
  }

  hasAccess: boolean;

  addCategoryCall() {
    this.hasAccess = this.accessControlService.hasPrivilege(["Add Expense Categories"]);
    if (this.hasAccess) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "500px";
      dialogConfig.data = {
        action: "add category",
      };

      const dialogRef = this.dialog.open(CreateCategoryComponent, dialogConfig);

      dialogRef.afterClosed().subscribe((result) => {
        this.getCategories();
      });
    }
  }

  updateCategoryCall(category) {
    this.hasAccess = this.accessControlService.hasPrivilege(["Update Expense Categories"]);
    if (this.hasAccess) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      data: category,
    };

    const dialogRef = this.dialog.open(UpdateCategoryComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getCategories();
    });
  }}

  viewCategoryDetailsCall(category) {
    this.hasAccess = this.accessControlService.hasPrivilege(["View Expense Categories"]);
    if (this.hasAccess) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      data: category,
    };

    const dialogRef = this.dialog.open(
      ViewCategoryDetailsComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((result) => {
      this.getCategories();
    });
  }}

  deleteCategoryCall(category) {
    this.hasAccess = this.accessControlService.hasPrivilege(["Delete Expense Categories"]);
    if (this.hasAccess) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      data: category,
    };

    const dialogRef = this.dialog.open(DeleteCategoryComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getCategories();
    });
  }
  }
  getCategories() {
    this.categoriesService
      .getAllCategories()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          console.log(res);
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onContextMenu(event: MouseEvent, item: Category) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }

  updateStatus(row) {
    this.hasAccess = this.accessControlService.hasPrivilege(["Validate Categories"]);
    if (this.hasAccess) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      data: row,
    };
    const dialogRef = this.dialog.open(CategoriesStatusComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getCategories();
    });
  }}
}
