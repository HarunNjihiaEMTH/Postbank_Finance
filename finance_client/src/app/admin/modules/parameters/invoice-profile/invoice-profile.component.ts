import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { takeUntil } from "rxjs";
import { TokenCookieService } from "src/app/core/service/token-storage-cookies.service";

import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { BasicDetailsService } from "src/app/user/data/services/customer/basic-details.service";
import { SellerDetailsService } from "src/app/user/data/services/customer/seller-details.service";

@Component({
  selector: "app-invoice-profile",
  templateUrl: "./invoice-profile.component.html",
  styleUrls: ["./invoice-profile.component.sass"],
})
export class InvoiceProfileComponent extends BaseComponent implements OnInit {
  sellerDetailsForm: FormGroup;
  basicDetailsForm: FormGroup;
  user: any;
  username: string;
  isAPointingAccount: boolean = false;
  sellerDetailsExists: boolean = false;
  basicDetailsExists: boolean = false;
  sellerDetails: any;
  basicDetails: any;
  sellerId: number;
  basicDetailsId: number;

  constructor(
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private sellerDetailsService: SellerDetailsService,
    private tokenCookieService: TokenCookieService,
    private basicDetailsService: BasicDetailsService
  ) {
    super();
  }

  ngOnInit(): void {
    this.user = this.tokenCookieService.getUser();

    this.sellerDetailsForm = this.createSellerDetailsForm();

    this.basicDetailsForm = this.createBasicDetailsForm();

    this.getSellerDetails();

    this.getBasicDetails();

    this.username = this.user.username;
  }

  createSellerDetailsForm(): FormGroup {
    return this.fb.group({
      id: [""],
      address: ["", [Validators.required]],
      branchCode: ["", [Validators.required]],
      branchId: ["", [Validators.required]],
      branchName: ["", [Validators.required]],
      businessName: ["", [Validators.required]],
      emailAddress: ["", [Validators.required]],
      legalName: ["", [Validators.required]],
      linePhone: ["", [Validators.required]],
      mobilePhone: ["", [Validators.required]],
      referenceNo: ["", [Validators.required]],
      tin: ["", [Validators.required]],
    });
  }

  createBasicDetailsForm(): FormGroup {
    return this.fb.group({
      id: [""],
      deviceissuedate: ["", [Validators.required]],
      deviceno: ["", [Validators.required]],
      invoiceindustrycode: ["", [Validators.required]],
    });
  }

  addSellerProfile() {
    this.sellerDetailsService
      .addSellerDetails(this.sellerDetailsForm.value)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          console.log(res);
          this.snackbar.showNotification(
            "snackbar-success",
            "Organisation basic details added successfully !"
          );
          this.getSellerDetails();

         
        },
        (err) => {
          console.log(err);
        }
      );
  }

  addBasicDetails() {
    this.sellerDetailsService
      .addBasicDetails(this.basicDetailsForm.value)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          console.log(res);
          this.snackbar.showNotification(
            "snackbar-success",
            "Organisation basic details added successfully !"
          );
          this.getBasicDetails();
        },
        (err) => {
          console.log(err);
        }
      );
  }


  updateSellerProfile() {
    this.sellerDetailsService
      .updateSellerDetails(this.sellerDetailsForm.value)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          console.log(res);
          this.snackbar.showNotification(
            "snackbar-success",
            "Organisation basic details amended successfully !"
          );
        },
        (err) => {
          console.log(err);
        }
      );
  }

  updateBasicDetails() {
    console.log("this.basicDetailsForm.value: ",this.basicDetailsForm.value)
    this.sellerDetailsService.updateBasicDetails
      (this.basicDetailsForm.value)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          console.log(res);
          this.snackbar.showNotification(
            "snackbar-success",
            "Organisation basic details amended successfully !"
          );
        },
        (err) => {
          console.log("Error: ",err);
        }
      );
  }


  getSellerDetails() {
    this.sellerDetailsService
      .fetchSellerDetails()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.sellerDetails = res[0];

          if (this.sellerDetails) {
            this.sellerDetailsExists = true;

            this.sellerDetailsForm.patchValue({
              id: this.sellerDetails.id,
              address: this.sellerDetails.address,
              branchCode: this.sellerDetails.branchCode,
              branchId: this.sellerDetails.branchId,
              branchName: this.sellerDetails.branchName,
              businessName: this.sellerDetails.businessName,
              emailAddress: this.sellerDetails.emailAddress,
              legalName: this.sellerDetails.legalName,
              linePhone: this.sellerDetails.linePhone,
              mobilePhone: this.sellerDetails.mobilePhone,
              referenceNo: this.sellerDetails.referenceNo,
              tin: this.sellerDetails.tin,
            });
          }

          console.log("sellerDetails: ",this.sellerDetails);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getBasicDetails() {
    this.sellerDetailsService
      .fetchBasicDetails()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.basicDetails = res[0];

          if (this.basicDetails) {
            this.basicDetailsExists = true;

            this.basicDetailsForm.patchValue({
              id: this.basicDetails.id,
              deviceissuedate: this.basicDetails.deviceissuedate,
              deviceno:this.basicDetails.deviceno,
              invoiceindustrycode: this.basicDetails.invoiceindustrycode,
            });
          }

          console.log("Basic Details ", this.basicDetails);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  deleteSellerDetails() {
    this.sellerDetailsService
      .deleteSelleDetails(this.sellerId)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.sellerDetails = res[0];

          console.log(this.sellerDetails);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  deleteBasicDetails() {
    this.sellerDetailsService
      .deleteBasicDetails(this.basicDetailsId)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.sellerDetails = res[0];

          console.log(this.sellerDetails);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
