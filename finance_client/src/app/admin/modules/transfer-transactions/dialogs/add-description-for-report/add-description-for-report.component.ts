import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { takeUntil } from "rxjs";
import { TokenCookieService } from "src/app/core/service/token-storage-cookies.service";

import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { PostDirectTransferComponent } from "../../post-direct-transfer/post-direct-transfer.component";


@Component({
  selector: 'app-add-description-for-report',
  templateUrl: './add-description-for-report.component.html',
  styleUrls: ['./add-description-for-report.component.sass']
})
export class AddDescriptionForReportComponent implements OnInit {

  Data: any;
  user: any;
  username: string;
  Form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<PostDirectTransferComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private tokenCookieService: TokenCookieService,
  ) { }

  ngOnInit(): void {
    this.user = this.tokenCookieService.getUser();

    this.username = this.user.username;

    this.Data = this.data.data;

    console.log(this.data);

    this.Form = this.createForm();
  }


  createForm() {
    return this.fb.group({
      
      description: ["", Validators.required],
      
    });
  }

 addThisDescription() {
    this.dialogRef.close({ event: "close", data: this.Form.value });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
