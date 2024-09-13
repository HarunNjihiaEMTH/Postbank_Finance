
import { HttpParams } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { PurchaseOrdersService } from "src/app/admin/data/services/purchaseorder.service";
import { TokenCookieService } from "src/app/core/service/token-storage-cookies.service";

import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { AllPurchaseOrdersComponent } from "../../all-purchase-orders.component";

@Component({
  selector: "app-purchase-order-status",
  templateUrl: "./purchase-order-status.component.html",
  styleUrls: ["./purchase-order-status.component.sass"],
})
export class PurchaseOrderStatusComponent implements OnInit {
  Data: any;

  statusForm: FormGroup;
  statusTypes: string[] = ["Approved", "Rejected"];
  rejected: boolean = false;
  currentUser: any;
  postedBy: any;
  canVerify: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<AllPurchaseOrdersComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private poService: PurchaseOrdersService,
    private snackbar: SnackbarService,
    private tokenCookieService: TokenCookieService,
  ) {}
  ngOnInit(): void {
    this.currentUser = this.tokenCookieService.getUser().username;
    this.Data = this.data.data;

    this.postedBy = this.Data.postedBy;

    // if(this.postedBy === this.currentUser){
    //   this.snackbar.showNotification("snackbar-danger", "You cannot verify a PO you created !")
    //   this.canVerify = false;      
    // }else {
    //   this.canVerify = true;
    // }


    console.log("Data: ", this.Data);
    this.statusForm = this.createStatusForm();
  }

  createStatusForm(): FormGroup {
    return this.fb.group({
      id: [this.Data.id, [Validators.required]],
      poStatus: ["", [Validators.required]],
      reason: ["", [Validators.required]],
      verifiedBy: [this.currentUser, [Validators.required]],
      verifiedTime: [new Date(), [Validators.required]],
      isSent: [""],
    });
  }

  statusSelected(selectedStatus: any) {
    if (selectedStatus.value == "Rejected") {
      this.statusForm.patchValue({ reason: null, isSent: false  });
      this.rejected = true;
    }
    // if (selectedStatus.value == "Pending") {
    //   this.statusForm.patchValue({ reason: "-" });
    // }
    if (selectedStatus.value == "Approved") {
      this.statusForm.patchValue({ reason: "-", isSent: true });
    }
  }

  changeStatus() {
    console.log("Form = ", this.statusForm.value);
    const params = new HttpParams()
      .set("id", this.statusForm.value.id)
      .set("Status", this.statusForm.value.poStatus)
      .set("isSent", this.statusForm.value.isSent)
      .set("verifiedBy", this.statusForm.value.verifiedBy)
      .set("reason", this.statusForm.value.reason)
      .set("verifiedTime", new Date().toDateString());

    this.poService.updatePoStatus(params).subscribe(
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

  onCancel(){
    this.dialogRef.close()
  }
}
