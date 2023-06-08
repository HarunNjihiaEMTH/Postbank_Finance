import { HttpParams } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { PurchaseOrdersService } from "src/app/admin/data/services/purchaseorder.service";
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { ActivePosComponent } from "../../active/active-pos/active-pos.component";



@Component({
  selector: 'app-cancel-purchase-order',
  templateUrl: './cancel-purchase-order.component.html',
  styleUrls: ['./cancel-purchase-order.component.sass']
})
export class CancelPurchaseOrderComponent implements OnInit {

  Data: any;

  statusForm: FormGroup;
  statusTypes: string[] = ["Cancel"];
  rejected: boolean = false;
  currentUser: any;
  postedBy: any;
  canVerify: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ActivePosComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private poService: PurchaseOrdersService,
    private snackbar: SnackbarService,
    private tokenService: TokenStorageService
  ) {}
  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser().username;
    this.Data = this.data.data;

    this.postedBy = this.Data.postedBy;

    if(this.postedBy === this.currentUser){
      this.snackbar.showNotification("snackbar-danger", "You can't cancel/verify a PO you created !")
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
      poStatus: ["Cancel", [Validators.required]],
      reason: ["", [Validators.required]],
      canceledBy: [this.currentUser, [Validators.required]],
      canceledTime: [new Date(), [Validators.required]],
    });
  }

  // statusSelected(selectedStatus: any) {
  //   if (selectedStatus.value == "Rejected") {
  //     this.statusForm.patchValue({ reason: null });
  //     this.rejected = true;
  //   }
  //   if (selectedStatus.value == "Pending") {
  //     this.statusForm.patchValue({ reason: "-" });
  //   }
  //   if (selectedStatus.value == "Approved") {
  //     this.statusForm.patchValue({ reason: "-", isSent: true });
  //   }
  // }

  changeStatus() {
    console.log("Form = ", this.statusForm.value);
    const params = new HttpParams()
      .set("purchaseorder_id", this.statusForm.value.id)
      .set("canceledBy", this.statusForm.value.canceledBy)
      .set("reason", this.statusForm.value.reason)
      .set("canceledTime", new Date().toDateString());

    this.poService.cancelPo(params).subscribe(
      (res) => {
        this.dialogRef.close();
        this.snackbar.showNotification(
          "snackbar-success",
          "Purchase order canceled successfully!"
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
