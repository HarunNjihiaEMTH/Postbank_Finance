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
import { AddExpenseComponent } from "src/app/admin/modules/supplier/pages/expenses-management/add-expense/add-expense.component";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { CategoryService } from "src/app/user/data/services/category.service";
import { ExpenseService } from "src/app/user/data/services/expense.service";
import { Category } from "src/app/user/data/types/category";
import { SubCategory } from "src/app/user/data/types/sub-category";


@Component({
  selector: "app-categories-lookup",
  templateUrl: "./categories-lookup.component.html",
  styleUrls: ["./categories-lookup.component.scss"],
})
export class CategoriesLookupComponent extends BaseComponent implements OnInit {
  categories: Category[] = [];
  displayedColumns: string[] = [
    "expenseDescription",
    "expenseAccount",
    "expenseMajorCategory",
  ];

  dataSource: MatTableDataSource<Category>;
  isLoading = true;
  selection = new SelectionModel<Category>(true, []);
  index: number;
  id: number;
  categorySlected: boolean = false;
  subcategories: SubCategory [] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  constructor(
    public dialogRef: MatDialogRef<AddExpenseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private expenseService: ExpenseService,
    private categoryService: CategoryService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService
      .getAllCategories()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (result) => {
          this.categories = result;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  onSelectRow(data: any) {
    this.dialogRef.close({ event: "close", data: data });

    console.log(data);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // context menu
  onContextMenu(event: MouseEvent, item: Category) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}
