import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { ItemService } from 'src/app/user/data/services/customer/item.service';
import { Item } from 'src/app/user/data/types/customer-types/item';
import { DeleteItemComponent } from '../delete-item/delete-item.component';
import { ItemDetailsComponent } from '../item-details/item-details.component';
import { UpdateItemComponent } from '../update-item/update-item.component';

@Component({
  selector: 'app-failed-uploads',
  templateUrl: './failed-uploads.component.html',
  styleUrls: ['./failed-uploads.component.sass']
})
export class FailedUploadsComponent extends BaseComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = "end";
  verticalPosition: MatSnackBarVerticalPosition = "top";
  
  items: Item[] = [];
  displayedColumns: string[] = [
    "id",
    "commodityCategoryId",
    "goodsCode",
    "goodsName",
    "description",
    "urastatus",
   "retry"
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

  constructor(public dialog: MatDialog, private itemService: ItemService, private router: Router, private _snackBar: MatSnackBar, private snackbar: SnackbarService) {
    super();
  }

  ngOnInit(): void {
    this.getAllItems();
  }


  refresh() {
    this.getAllItems();
  }

  getAllItems() {
    this.itemService
      .getFailedCommodities()
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

  retryItemUpload(row){
    this.itemService
    .restockNow(row)
    .pipe(takeUntil(this.subject))
    .subscribe((result) => {
      console.log(result);


      const message = "URA RESPONCE";

      if(!result){
        this.snackbar.showNotification('snackbar-danger', "Unable to connect to URA at the moment, please retry later")
      }else {
        this._snackBar.open(
          message +
            "\n STATUS CODE: " +
            result.statusCode +
            "\n STATUS CODE VALUE| " +
            result.statusCodeValue +
            "\n DESCRIPTION| " +
            result.body,
          "X",
          {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 2000000,
            panelClass: ["snackbar-success", "snackbar-success"],
          }
        );
      }

    }, err => {
      console.log(err)
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
