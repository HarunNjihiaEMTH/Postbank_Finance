import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { ParametersService } from "src/app/admin/data/services/parameters.service";
import { SnackbarService } from "src/app/shared/services/snackbar.service";

@Component({
  selector: "app-general",
  templateUrl: "./general.component.html",
  styleUrls: ["./general.component.sass"],
})
export class GeneralComponent implements OnInit {
  Form!: FormGroup;
  subscription!: Subscription;

  data: any;
  isLoading: boolean = true;
  paramsExist: boolean = false;

  constructor(
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private parameterService: ParametersService
  ) {
    this.getData();
    this.initForm();
  }
  ngOnInit(): void {
    //throw new Error("Method not implemented.");
  }

  getData() {
    this.subscription = this.parameterService
      .getOrganisationPrams()
      .subscribe((res) => {
        this.data = res[0];
        console.log("this.data", this.data);

        if (this.data) {
          this.isLoading = false;
        }
        if (this.data) {
          this.paramsExist = true;
          this.Form.patchValue({
            id: this.data.id,
            organisationName: this.data.organisationName,
            email: this.data.email,
            phone: this.data.phone,
            address: this.data.address,
            city: this.data.city,
            country: this.data.country,
          });
        }
      });
  }

  initForm() {
    this.Form = this.fb.group({
      id: [""],
      organisationName: [
        "",
        [Validators.required],
      ],
      email: [
        "",
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      phone: [
        "",
        [
          Validators.required,
    
        ],
      ],
      address: [""],
      city: ["", [Validators.required]],
      country: ["", [Validators.required]],
    });
  }

  onFileChange(event){

  }


  onFormSubmit() {
    console.log("Form Value", this.Form.value);
    if(this.paramsExist){
      this.parameterService
      .updateOrganisationPrams(this.Form.value)
      .pipe()
      .subscribe(
        (res) => {
          console.log("Response = ", res);
          this.snackbar.showNotification(
            "snackbar-success",
            "General parameters updated successfully!"
          );
        },
        (err) => {
          console.log("Error ", err);
          this.snackbar.showNotification(
            "snackbar-danger",
            "General parameters update failure!"
          );
        }
      );

    }else if(!this.paramsExist){
      this.parameterService
      .addOrganisationPrams(this.Form.value)
      .pipe()
      .subscribe(
        (res) => {
          console.log("Response = ", res);
          this.snackbar.showNotification(
            "snackbar-success",
            "General parameters added successfully!"
          );
        },
        (err) => {
          console.log("Error ", err);
          this.snackbar.showNotification(
            "snackbar-danger",
            "General parameters upload failure!"
          );
        }
      );

    }
    
  }
}
