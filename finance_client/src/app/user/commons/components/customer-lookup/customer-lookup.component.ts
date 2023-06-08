import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map, takeUntil } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { CustomerService } from 'src/app/user/data/services/customer/customer.service';
import { Customer } from 'src/app/user/data/types/customer-types/customer';
import { AddInvoiceComponent } from 'src/app/admin/modules/customer/pages/invoice-management/add-invoice/add-invoice.component';


@Component({
  selector: 'app-customer-lookup',
  templateUrl: './customer-lookup.component.html',
  styleUrls: ['./customer-lookup.component.scss']
})
export class CustomerLookupComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = ['id', 'buyerBusinessName', 'buyerLegalName'];

  customers: Customer[];
  dataSource: MatTableDataSource<Customer>;
  isLoading = true;
  selection = new SelectionModel<Customer>(true, []);
  index: number;
  id: number;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };


  constructor(
    public dialogRef: MatDialogRef<AddInvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private customerService: CustomerService
  ) {
    super()
   }  

  ngOnInit(): void {
    this.getCustomers()
  }

  getCustomers() {
    console.log(123);
    this.customerService
      .getAllCustomers()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.customers = res;

          console.log(this.customers)

          if (this.customers) {
            this.isLoading = false;
          }

          this.dataSource = new MatTableDataSource<Customer>(
            this.customers
          );
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

          console.log(this.customers)
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

  // context menu
  onContextMenu(event: MouseEvent, item: Customer) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }

}
