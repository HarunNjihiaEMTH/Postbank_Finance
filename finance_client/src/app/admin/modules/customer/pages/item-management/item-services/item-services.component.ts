import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { ItemService } from 'src/app/user/data/services/customer/item.service';
import { Item } from 'src/app/user/data/types/customer-types/item';
import { DeleteItemComponent } from '../delete-item/delete-item.component';
import { ItemDetailsComponent } from '../item-details/item-details.component';
import { UpdateItemComponent } from '../update-item/update-item.component';

@Component({
  selector: 'app-item-services',
  templateUrl: './item-services.component.html',
  styleUrls: ['./item-services.component.sass']
})
export class ItemServicesComponent extends BaseComponent implements OnInit {
  items: Item[] = [];
  displayedColumns: string[] = [
    "id",
    "commodityCategoryId",
    "goodsCode",
    "goodsName",
    "description",
    "urastatus",
   //"retry"
    // "postedTime",
    // "actions",
  ];
  dataSource!: MatTableDataSource<Item>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  selection = new SelectionModel<Item>(true, []);
  data: any;
  error: any;
  isLoading: boolean = true;

  constructor(public dialog: MatDialog, private itemsService: ItemService, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.getAllItems();
  }

  refresh() {
    this.getAllItems();
  }

  getAllItems() {
    this.itemsService
      .fetchServicesOnly()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          console.log(res);
          this.items = res;

          if (this.items) {
            this.isLoading = false;

            this.dataSource = new MatTableDataSource<Item>(this.items);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

 

  navigateToAddProduct(){
    console.log(123);

    this.router.navigate(['/admin/customer/items-management/add-item'])
  }

  viewItemDetailsCall(item){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      action: "add category",
      data: item
    };
    this.dialog.open(ItemDetailsComponent, dialogConfig);
  }

  updateItemDetailsCall(item){
    const dialogRef = this.dialog.open(UpdateItemComponent, {
      width: "500px",
      data:item
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getAllItems();
    });
  }

  navigateToItemUpdate(item){
    this.router.navigate(['/admin/customer/items-management/update-item'], {
      state: {
        itemDetails: JSON.stringify(item),
      },
    })
  }

  updateCommodity(expense){
    this.router.navigate(
      ["/admin/supplier/expenses-management/update-expense"],
      {
        state: {
          expenseDetails: JSON.stringify(expense),
        },
      }
    );
  }

  deleteItemCall(item){
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      width: "500px",
      data: {
        data: item,
        action: "Add",
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getAllItems();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onContextMenu(event: MouseEvent, item: Item) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }


}
