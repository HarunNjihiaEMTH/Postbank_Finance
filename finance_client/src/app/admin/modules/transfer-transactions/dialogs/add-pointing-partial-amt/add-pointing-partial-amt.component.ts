import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { takeUntil } from "rxjs";
import { TokenCookieService } from "src/app/core/service/token-storage-cookies.service";

import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { PostDirectTransferComponent } from "../../post-direct-transfer/post-direct-transfer.component";

@Component({
  selector: "app-add-pointing-partial-amt",
  templateUrl: "./add-pointing-partial-amt.component.html",
  styleUrls: ["./add-pointing-partial-amt.component.sass"],
})
export class AddPointingPartialAmtComponent implements OnInit {
  Data: any;
  user: any;
  username: string;
  Form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<PostDirectTransferComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private tokenCookieService: TokenCookieService
  ) {}

  ngOnInit(): void {
    this.user = this.tokenCookieService.getUser();

    this.username = this.user.username;

    this.Data = this.data.data;

    console.log(this.data);

    this.Form = this.createForm();
  }

  createForm() {
    return this.fb.group({
      amt: ["", Validators.required],
    });
  }

  addThisDescription() {
    this.dialogRef.close({ event: "close", data: this.Form.value });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
