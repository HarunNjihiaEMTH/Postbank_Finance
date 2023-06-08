import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { takeUntil } from "rxjs";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { SupplierService } from "src/app/user/data/services/supplier.service";
import { Supplier } from "src/app/user/data/types/supplier";
import { AllSuppliersComponent } from "../all-suppliers/all-suppliers.component";

@Component({
  selector: "app-delete-supplier",
  templateUrl: "./delete-supplier.component.html",
  styleUrls: ["./delete-supplier.component.sass"],
})
export class DeleteSupplierComponent extends BaseComponent implements OnInit {
  supplier: Supplier;

  constructor(
    public dialogRef: MatDialogRef<AllSuppliersComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private supplierService: SupplierService,
    private snackbar: SnackbarService
  ) {
    super();
  }

  ngOnInit(): void {
    this.supplier = this.data.data;

    console.log(this.supplier);
  }

  confirmDelete() {
    this.supplierService
      .deleteSupplier(this.supplier.id)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.snackbar.showNotification(
            "snackbar-success",
            "Supplier deleted successfully !"
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
