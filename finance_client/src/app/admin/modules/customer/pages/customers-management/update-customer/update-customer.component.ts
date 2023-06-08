import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { takeUntil } from "rxjs";
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { BuyerSectorsLookupComponent } from "src/app/user/commons/components/buyer-sectors-lookup/buyer-sectors-lookup.component";
import { BuyerTypesLookupComponent } from "src/app/user/commons/components/buyer-types-lookup/buyer-types-lookup.component";
import { CustomerService } from "src/app/user/data/services/customer/customer.service";
import { Customer } from "src/app/user/data/types/customer-types/customer";

@Component({
  selector: "app-update-customer",
  templateUrl: "./update-customer.component.html",
  styleUrls: ["./update-customer.component.sass"],
})
export class UpdateCustomerComponent extends BaseComponent implements OnInit {
  updateCustomerForm: FormGroup;
  customer: Customer;
  routeState: any;
  currentUser: any;
  username: string;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private tokenStorage: TokenStorageService,
    private customerService: CustomerService,
    private snackbar: SnackbarService
  ) {
    super();

    if (this.router.getCurrentNavigation().extras.state) {
      this.routeState = this.router.getCurrentNavigation().extras.state;
      if (this.routeState) {
        console.log("Router State", this.routeState);
        console.log("Parsed", JSON.parse(this.routeState.customerDetails));
        this.customer = this.routeState.customerDetails
          ? JSON.parse(this.routeState.customerDetails)
          : "";
      }
    }
    console.log("Customer", this.customer);
  }

  ngOnInit(): void {
    this.currentUser = this.tokenStorage.getUser();

    this.username = this.currentUser.username;

    this.updateCustomerForm = this.createUpdateCustomerForm();

    this.updateCustomerForm.patchValue({
      id: this.customer.id,
      buyerAddress: this.customer.buyerAddress,
      buyerBusinessName: this.customer.buyerBusinessName,
      buyerCitizenship: this.customer.buyerCitizenship,
      buyerEmail: this.customer.buyerEmail,
      buyerLegalName: this.customer.buyerLegalName,
      buyerLinePhone: this.customer.buyerLinePhone,
      buyerMobilePhone: this.customer.buyerMobilePhone,
      buyerPassportNum: this.customer.buyerPassportNum,
      buyerPlaceOfBusi: this.customer.buyerPlaceOfBusi,
      buyerReferenceNo: this.customer.buyerReferenceNo,
      buyerSector: this.customer.buyerSector,
      buyerType: this.customer.buyerType,
      status:  this.customer.status,
      postedTime: this.customer.postedTime,
      postedBy: this.customer.postedBy,
      
      buyerTin: this.customer.buyerTin,
      buyerNinBrn: this.customer.buyerNinBrn,
    });
  }

  buyerSectorlookup() {
    const dialogRef = this.dialog.open(BuyerSectorsLookupComponent, {
      width: "500px",
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.subject))
      .subscribe((result) => {
        this.updateCustomerForm.patchValue({
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
        this.updateCustomerForm.patchValue({
          buyerType: result.data.code
        }) 
      }, err => {
        console.log(err)
      });
  }

  createUpdateCustomerForm(): FormGroup {
    return this.fb.group({
      id: [""],
      buyerAddress: ["", [Validators.required]],
      buyerBusinessName: ["", [Validators.required]],
      buyerCitizenship: ["", [Validators.required]],
      buyerEmail: ["", [Validators.required]],
      buyerLegalName: ["", [Validators.required]],
      buyerLinePhone: ["", [Validators.required]],
      buyerMobilePhone: ["", [Validators.required]],
      buyerNinBrn: ["", [Validators.required]],
      buyerPassportNum: [""],
      buyerPlaceOfBusi: ["", [Validators.required]],
      buyerReferenceNo: ["", [Validators.required]],
      buyerSector: ["", [Validators.required]],
      buyerTin: ["", [Validators.required]],
      buyerType: ["", [Validators.required]],
      status:  [""],
      postedTime: [""],
      postedBy: [""],
      modifiedTime: new Date(),
      modifiedBy: this.username,
      modifiedFlag: "Y",
    });
  }

  updateUser() {
    this.customerService
      .updateCustomer(this.updateCustomerForm.value)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.snackbar.showNotification(
            "snackbar-success",
            "Customer updated successfully !"
          );

          this.router.navigate(["/admin/customer/customers-management/all-customers"]);
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
