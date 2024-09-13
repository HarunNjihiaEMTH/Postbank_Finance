import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { AllPurchaseOrdersComponent } from '../../all-purchase-orders.component';

@Component({
  selector: 'app-send-purchase-order',
  templateUrl: './send-purchase-order.component.html',
  styleUrls: ['./send-purchase-order.component.sass']
})
export class SendPurchaseOrderComponent extends BaseComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AllPurchaseOrdersComponent>,
    @Inject(MAT_DIALOG_DATA) public data,) {
      super();
     }

  ngOnInit(): void {
  }

}
