import { SelectionModel } from "@angular/cdk/collections";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { ActivePosService } from "src/app/admin/data/services/activepos.service";

import { Category } from "src/app/user/data/types/category";

@Component({
  selector: 'app-unpaid-pos',
  templateUrl: './unpaid-pos.component.html',
  styleUrls: ['./unpaid-pos.component.sass']
})
export class UnpaidPosComponent implements OnInit {

  displayedColumns: string[] = [
    "id",
    "poName",
    "poNumber",
    "poTotalAmount",
    "supplierName",
    "postedBy",
    "postedTime",
    "poStatus",
    "verifiedBy",
    "verifiedTime",
    "actions",
  ];
  dataSource!: MatTableDataSource<Category>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  selection = new SelectionModel<any>(true, []);
  data: any;
  error: any;
  isLoading: boolean = true;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private activePoService: ActivePosService
  ) { }

  ngOnInit(): void {
    this.getUnpaidPurchaseOrders();
  }

  refresh() {
    this.getUnpaidPurchaseOrders();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getUnpaidPurchaseOrders() {
    this.activePoService.getUnpaidPos().subscribe(
      (res) => {
        console.log(res);
        this.data = res;

        if (this.data) {
          this.isLoading = false;

          this.dataSource = new MatTableDataSource<any>(this.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }


  //   {
  //     "id": 16,
  //     "poNumber": "Z!VB65$ZFRUyFEn",

  //     "poName": "Test PO",
  //     "originalTotalBeforeTax": 70000,
  //     "originalVatAmount": 11200,
  //     "originalIncomeWithholdingamount": 0,
  //     "originalVatWitholding": 1400,
  //     "originalTotalAfterTax": 81200,

  //     "poStatus": "Pending",
  //     "supplierContact": "+1 (655) 417-5321",
  //     "supplierId": 5,
  //     "supplierAddress": "5672 Jinja",
  //     "supplierMobile": "09DO35",
  //     "supplierName": "Bo Pollard",
  //     "supplierAccount": null,

  //     "poParticulars": [
  //         {

  //             "expenseId": "5",

  //         },

  //     ],

  // }
  payPO(po) {
    let expenseArray = [];
    po.poParticulars.forEach(element => {
      expenseArray.push(element.expenseId)
    });
    let poPaymentDetails = {
      poId: po.id,
      poNumber: po.poNumber,
      poName: po.poName,
      originalTotalBeforeTax: po.originalTotalBeforeTax,
      originalVatAmount: po.originalVatAmount,
      originalIncomeWithholdingamount: po.originalIncomeWithholdingamount,
      originalVatWitholding: po.originalVatWitholding,
      originalTotalAfterTax: po.originalTotalAfterTax,
      poStatus: po.poStatus,
      supplierContact: po.supplierContact,
      supplierId: po.supplierId,
      expenseIds: expenseArray
    }

    console.log("poPaymentDetails: ", poPaymentDetails)
    this.router.navigate(
      // ["/admin/bills/pay-bill"],
      ["/admin/transfer-transactions/post-direct-transaction"],
     
      {
        state: {
          poDetailsForPayment: JSON.stringify(poPaymentDetails),
          action: 'Pay purchase order'
        },
      }
    );
  }
}
