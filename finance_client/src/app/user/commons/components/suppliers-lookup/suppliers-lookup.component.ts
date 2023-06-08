import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil } from 'rxjs';
import { CreatePurchaseOrderComponent } from 'src/app/admin/modules/supplier/pages/purchase-orders-management/create-purchase-order/create-purchase-order.component';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { SupplierService } from 'src/app/user/data/services/supplier.service';
import { Supplier } from 'src/app/user/data/types/supplier';

@Component({
  selector: 'app-suppliers-lookup',
  templateUrl: './suppliers-lookup.component.html',
  styleUrls: ['./suppliers-lookup.component.scss']
})
export class SuppliersLookupComponent extends BaseComponent implements OnInit {
  suppliers: Supplier[] = [];
  displayedColumns: string[] = ['supplierName', 'supplierNumber', 'supplierAddress'];

  branchCodes: Supplier[] = [];
  dataSource: MatTableDataSource<Supplier>;
  isLoading = true;
  selection = new SelectionModel<Supplier>(true, []);
  index: number;
  id: number;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };


  constructor(public dialogRef: MatDialogRef<CreatePurchaseOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private supplierService: SupplierService) {
      super()
     }

  ngOnInit(): void {
    this.suppliersLookup();
  }

  suppliersLookup(){
    this.supplierService.getSuppliers().pipe(takeUntil(this.subject)).subscribe(res => {
      this.suppliers = res;

      console.log(res)

      if (this.suppliers) {
        this.isLoading = false;
      }

      this.dataSource = new MatTableDataSource<Supplier>(
        this.suppliers
      );
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
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
  onContextMenu(event: MouseEvent, item: Supplier) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}
