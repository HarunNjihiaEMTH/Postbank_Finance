import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { StockCategoryService } from "src/app/user/data/services/customer/stock-category.service";
import { StockCategory } from "src/app/user/data/types/customer-types/stock-category";
import { AllItemCategoriesComponent } from "../all-item-categories/all-item-categories.component";

@Component({
  selector: "app-item-category-details",
  templateUrl: "./item-category-details.component.html",
  styleUrls: ["./item-category-details.component.sass"],
})
export class ItemCategoryDetailsComponent implements OnInit {
  category: StockCategory;

  constructor(
    public dialogRef: MatDialogRef<AllItemCategoriesComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private stockCategoryService: StockCategoryService
  ) {}

  ngOnInit(): void {
    this.category = this.data.data;

    console.log(this.category);
  }
}
