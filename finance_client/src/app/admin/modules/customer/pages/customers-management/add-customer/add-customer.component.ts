import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { takeUntil } from "rxjs";
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { BuyerSectorsLookupComponent } from "src/app/user/commons/components/buyer-sectors-lookup/buyer-sectors-lookup.component";
import { BuyerTypesLookupComponent } from "src/app/user/commons/components/buyer-types-lookup/buyer-types-lookup.component";
import { CustomerService } from "src/app/user/data/services/customer/customer.service";
import { UraService } from "src/app/user/data/services/customer/ura.service";
import { AllCustomersComponent } from "../all-customers/all-customers.component";

@Component({
  selector: "app-add-customer",
  templateUrl: "./add-customer.component.html",
  styleUrls: ["./add-customer.component.sass"],
})
export class AddCustomerComponent extends BaseComponent implements OnInit {
  addCustomerForm: FormGroup;
  currentUser: any;
  username: string;
  buyerectors: any;
  buyerTypes: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private uraService: UraService,
    private tokenStorage: TokenStorageService,
    private snackbar: SnackbarService,
    private customerService: CustomerService
  ) {
    super();
  }

  ngOnInit(): void {
    this.currentUser = this.tokenStorage.getUser();

    this.username = this.currentUser.username;

    this.getBuyerSectors();

    this.addCustomerForm = this.createCustomerForm();
  }

  createCustomerForm(): FormGroup {
    return this.fb.group({
      buyerAddress: ["", [Validators.required]],
      buyerBusinessName: ["", [Validators.required]],
      buyerCitizenship: ["", [Validators.required]],
      buyerEmail: ["", [Validators.required]],
      buyerLegalName: ["", [Validators.required]],
      buyerMobilePhone: [""],
      buyerNinBrn: [""],
      buyerPassportNum: [""],
      buyerPlaceOfBusi: [""],
      buyerSector: [""],
      buyerTin: [""],
      buyerType: [""],
      status: "pending",
      postedTime: new Date(),
      postedBy: this.username,
    });
  }

  getBuyerSectors() {
    this.uraService
      .listAllURASectors()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.buyerectors = res;

          console.log("Buyer sectors", this.buyerectors)
        },
        (err) => {
          console.log(err);
        }
      );
  }


  getBuyerTypes() {
    this.uraService
      .listAllBuyerTypes()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.buyerTypes = res;

          console.log("Buyer types", this.buyerectors)
        },
        (err) => {
          console.log(err);
        }
      );
  }

  buyerSectorlookup() {
    const dialogRef = this.dialog.open(BuyerSectorsLookupComponent, {
      width: "500px",
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.subject))
      .subscribe((result) => {
        this.addCustomerForm.patchValue({
          buyerSector: result.data.code
        })
      }, err => {
        console.log(err)
      });
  }


  buyerTypeLookups() {
    const dialogRef = this.dialog.open(BuyerTypesLookupComponent, {
      width: "500px",
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.subject))
      .subscribe((result) => {
        this.addCustomerForm.patchValue({
          buyerType: result.data.code
        }) 
      }, err => {
        console.log(err)
      });
  }



  addCustomer() {
    console.log("Customer ", this.addCustomerForm.value);
    this.customerService
      .addCustomer(this.addCustomerForm.value)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          console.log(res);

          this.snackbar.showNotification(
            "snackbar-success",
            "Customer added successfully ! "
          );

          this.router.navigate([
            "/admin/customer/customers-management/all-customers",
          ]);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  onCancel() {
    this.router.navigate(["/admin/customer/customers-management/all-customers"]);
  }
}
