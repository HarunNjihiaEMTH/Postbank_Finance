import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { takeUntil } from "rxjs";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { ItemService } from "src/app/user/data/services/customer/item.service";
import { StockCategoryService } from "src/app/user/data/services/customer/stock-category.service";
import { Item } from "src/app/user/data/types/customer-types/item";
import { AllItemsComponent } from "../all-items/all-items.component";

@Component({
  selector: "app-delete-item",
  templateUrl: "./delete-item.component.html",
  styleUrls: ["./delete-item.component.sass"],
})
export class DeleteItemComponent extends BaseComponent implements OnInit {
  item: Item;
  itemId: number;

  constructor(
    public dialogRef: MatDialogRef<AllItemsComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private itemService: ItemService
  ) {
    super();
  }

  ngOnInit(): void {
    this.item = this.data.data;

    this.itemId = this.item.id;

    console.log(this.item);
  }

  confirmDelete() {
    this.itemService
      .deleteItem(this.itemId)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (result) => {
          this.snackbar.showNotification(
            "snackbar-success",
            "Item deleted successfully !"
          );

          this.dialogRef.close();
        },
        (err) => {
          console.log(err);
        }
      );
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
