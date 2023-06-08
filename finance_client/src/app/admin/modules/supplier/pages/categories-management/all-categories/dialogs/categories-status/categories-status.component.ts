import { HttpParams } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CategoryService } from "src/app/admin/data/services/category.service";
import { TokenCookieService } from "src/app/core/service/token-storage-cookies.service";

import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { AllCategoriesComponent } from "../../all-categories.component";

@Component({
  selector: 'app-categories-status',
  templateUrl: './categories-status.component.html',
  styleUrls: ['./categories-status.component.sass']
})
export class CategoriesStatusComponent implements OnInit {

  Data: any;

  statusForm: FormGroup;
  statusTypes: string[] = ["Approved", "Pending", "Rejected"];
  rejected: boolean = false;
  currentUser: any;
  postedBy: any;
  canVerify: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AllCategoriesComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private snackbar: SnackbarService,
    private tokenCookieService: TokenCookieService,
  ) {}
  ngOnInit(): void {
    this.currentUser = this.tokenCookieService.getUser().username;
    this.Data = this.data.data;

    this.postedBy = this.Data.postedBy;

    if(this.postedBy === this.currentUser){
      this.snackbar.showNotification("snackbar-danger", "You cannot verify a category you created !")
      this.canVerify = false;      
    }else {
      this.canVerify = true;
    }

    console.log("Data: ", this.Data);
    this.statusForm = this.createStatusForm();
  }

  createStatusForm(): FormGroup {
    return this.fb.group({
      id: [this.Data.id, [Validators.required]],
      status: ["", [Validators.required]],
      reason: ["", [Validators.required]],
      verifiedBy: [this.currentUser, [Validators.required]],
      verifiedTime: [new Date(), [Validators.required]],
    });
  }

  statusSelected(selectedStatus: any) {
    if (selectedStatus.value == "Rejected") {
      this.statusForm.patchValue({ reason: null });
      this.rejected = true;
    }
    if (selectedStatus.value == "Pending") {
      this.statusForm.patchValue({ reason: "-" });
    }
    if (selectedStatus.value == "Approved") {
      this.statusForm.patchValue({ reason: "-" });
    }
  }

  changeStatus() {
    console.log("Form = ", this.statusForm.value);
    const params = new HttpParams()
      .set("id", this.statusForm.value.id)
      .set("status", this.statusForm.value.status)
      .set("verifiedBy", this.statusForm.value.verifiedBy)
      .set("reason", this.statusForm.value.reason)
      .set("verifiedTime", new Date().toDateString());

    this.categoryService.updateCategoryStatus(params).subscribe(
      (res) => {
        this.dialogRef.close();
        this.snackbar.showNotification(
          "snackbar-success",
          "Status updated succesfully!"
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
