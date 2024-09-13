import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil } from 'rxjs';
import { AddInvoiceComponent } from 'src/app/admin/modules/customer/pages/invoice-management/add-invoice/add-invoice.component';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { UraService } from 'src/app/user/data/services/customer/ura.service';
import { Item } from 'src/app/user/data/types/customer-types/item';

@Component({
  selector: 'app-invoice-kind',
  templateUrl: './invoice-kind.component.html',
  styleUrls: ['./invoice-kind.component.sass']
})
export class InvoiceKindComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = [
   // "id",
    "code",
    "name"
  ];
  invoicekinds: any[] = [];

  dataSource!: MatTableDataSource<Item>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  selection = new SelectionModel<Item>(true, []);
  error: any;
  isLoading: boolean = true;

  constructor(public dialogRef: MatDialogRef<AddInvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private uraService: UraService) {
    super();
   }

  ngOnInit(): void {
    this.getAllinvoicekinds()
  }

  getAllinvoicekinds() {
    this.uraService
      .listAllInvoicekinds()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          console.log(res);
          this.invoicekinds = res;

          if (this.invoicekinds) {
            this.isLoading = false;

            this.dataSource = new MatTableDataSource<Item>(this.invoicekinds);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  onSelectRow(data:any){
    this.dialogRef.close({ event: 'close', data:data });

    console.log(data)
  } 

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onContextMenu(event: MouseEvent, item: any) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}
