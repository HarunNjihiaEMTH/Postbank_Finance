import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { takeUntil } from "rxjs";
import { TokenCookieService } from "src/app/core/service/token-storage-cookies.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { SupplierService } from "src/app/user/data/services/supplier.service";
import { AllSuppliersComponent } from "../all-suppliers/all-suppliers.component";

@Component({
  selector: "app-update-supplier",
  templateUrl: "./update-supplier.component.html",
  styleUrls: ["./update-supplier.component.sass"],
})
export class UpdateSupplierComponent extends BaseComponent implements OnInit {
  updateSupplierForm: FormGroup;
  user: any;
  username: string;
  supplyTypes: string [] = ["Services", "Goods", "Goods/Services"];

  constructor(
    public dialogRef: MatDialogRef<AllSuppliersComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private supplierService: SupplierService,
    private snackbar: SnackbarService,
    private tokenCookieService: TokenCookieService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.user = this.tokenCookieService.getUser();

    this.username = this.user.username;
    
    this.updateSupplierForm = this.createUpdateSupplierForm();

    console.log(this.data);
  }

  createUpdateSupplierForm() {
    return this.fb.group({
      id: [this.data.data.id],
      supplierName: [this.data.data.supplierName, [Validators.required]],
      supplierNumber: [this.data.data.supplierNumber, [Validators.required]],
      supplierAddress: [this.data.data.supplierAddress, [Validators.required]],
      supplierContact: [this.data.data.supplierContact, [Validators.required]],
      supplierEmail: [this.data.data.supplierEmail, [Validators.required]],
      supplierServices: [
        this.data.data.supplierServices,
        [Validators.required],
      ],
      supplierBank: [this.data.data.supplierBank, [Validators.required]],
      supplierAccount: [this.data.data.supplierAccount, [Validators.required]],
      supplierTin: [this.data.data.supplierTin, [Validators.required]],
      supplierCountry: [this.data.data.supplierCountry, [Validators.required]],
      supplierCurrency: [this.data.data.supplierCurrency, [Validators.required]],
      status: "Pending",
      postedBy: this.data.data.postedBy,
      postedTime: this.data.data.postedTime,
      modifiedBy: this.username,
      modifiedFlag: "Y",
      modifiedTime: new Date(),
    });
  }

  updateSupplierDetails() {
    console.log(this.updateSupplierForm.value);

    this.supplierService
      .updateSupplier(this.updateSupplierForm.value)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          //console.log(res);
          this.snackbar.showNotification("snackbar-success", "Supplier updated successfully !");

          this.dialogRef.close({ event: "close", data: "" });
          
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
