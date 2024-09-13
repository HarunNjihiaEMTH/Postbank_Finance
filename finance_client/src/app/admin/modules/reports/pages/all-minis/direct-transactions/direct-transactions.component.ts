import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DirectTransParamsComponent } from './dialog/direct-trans-params/direct-trans-params.component';

@Component({
  selector: 'app-direct-transactions',
  templateUrl: './direct-transactions.component.html',
  styleUrls: ['./direct-transactions.component.sass']
})
export class DirectTransactionsComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  transactionsParameters(params: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      test: params,
      // spec: "bulk"
    };
    this.dialog.open(DirectTransParamsComponent, dialogConfig);
  }

}
