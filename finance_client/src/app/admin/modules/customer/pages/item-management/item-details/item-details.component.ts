import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AllItemsComponent } from "src/app/admin/modules/customer/pages/item-management/all-items/all-items.component";
import { Item } from "src/app/user/data/types/customer-types/item";

@Component({
  selector: "app-item-details",
  templateUrl: "./item-details.component.html",
  styleUrls: ["./item-details.component.sass"],
})
export class ItemDetailsComponent implements OnInit {
  item: Item;

  constructor(
    public dialogRef: MatDialogRef<AllItemsComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {
    this.item = this.data.data;

    console.log("Item ", this.item)
  }
}
