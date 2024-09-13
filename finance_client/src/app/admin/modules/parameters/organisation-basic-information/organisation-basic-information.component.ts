import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { TokenCookieService } from 'src/app/core/service/token-storage-cookies.service';

import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { BasicDetailsService } from 'src/app/user/data/services/customer/basic-details.service';
import { ExpenseService } from 'src/app/user/data/services/expense.service';

@Component({
  selector: 'app-organisation-basic-information',
  templateUrl: './organisation-basic-information.component.html',
  styleUrls: ['./organisation-basic-information.component.sass']
})
export class OrganisationBasicInformationComponent extends BaseComponent implements OnInit {
  addOrganisationDetailsForm: FormGroup;
  user: any;
  username: string;
  isAPointingAccount: boolean = false;
  organisationBasicDetailsExists: boolean = false;
  basicDetails: any;

  constructor(
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private tokenCookieService: TokenCookieService,
    private basicDetailsService: BasicDetailsService
  ) {
    super();
  }

  ngOnInit(): void {
    this.user = this.tokenCookieService.getUser();

    this.addOrganisationDetailsForm = this.createAddOrganisationDetailsForm();

    this.getOrganisationBasicInformation()

   

    this.username = this.user.username;


  }

  createAddOrganisationDetailsForm(): FormGroup {
    return this.fb.group({
      deviceissuedate: ["", [Validators.required]],
      deviceno: ["", [Validators.required]],
      invoiceindustrycode: ["", [Validators.required]],
    });
  }

  addOrganisationDetails() {
    console.log("Expense form value ", this.addOrganisationDetailsForm.value)
      this.basicDetailsService
        .addBasicDetails(this.addOrganisationDetailsForm.value)
        .pipe(takeUntil(this.subject))
        .subscribe(
          (res) => {
            console.log(res);
            this.snackbar.showNotification(
              "snackbar-success",
              "Organisation basic details added successfully !"
            );
          },
          (err) => {
            console.log(err);
          }
        );
    
  }

  updateOrganisationBasicinformation(){
    console.log("Expense form value ", this.addOrganisationDetailsForm.value)
    this.basicDetailsService
      .updateBasicDetails(this.addOrganisationDetailsForm.value)
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

  getOrganisationBasicInformation(){
    this.basicDetailsService.fetchBasicDetails().pipe(takeUntil(this.subject)).subscribe(res => {
      this.basicDetails = res[0];

      if(this.basicDetails){
        this.organisationBasicDetailsExists = true;

        this.addOrganisationDetailsForm.patchValue({
          deviceissuedate: this.basicDetails.deviceissuedate,
          deviceno: this.basicDetails.deviceno,
          invoiceindustrycode:  this.basicDetails.invoiceindustrycode,
        })
      }

      console.log(this.basicDetails)
    }, err => {
      console.log(err)
    })
  }

 
}
