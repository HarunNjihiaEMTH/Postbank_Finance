import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Subscription } from "rxjs";
import { ParametersService } from "src/app/admin/data/services/parameters.service";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { PayBillComponent } from "../../pay-bill.component";


@Component({
  selector: "app-picking-item",
  templateUrl: "./picking-item.component.html",
  styleUrls: ["./picking-item.component.sass"],
})
export class PickingItemComponent implements OnInit {
  displayedColumnss: string[] = [
    "contratranid",
    "contratrandate",
    "parttransrlnum",
    "amtoffset",
    "crncycode",
  ];
  dataSource2!: MatTableDataSource<any>;
  @ViewChild("paginatorLegal") paginatorLegal: MatPaginator;
  @ViewChild(MatSort) sort2!: MatSort;

  action: string;
  dialogTitle: string;

  Data?: any;
  DataContra?: any;

  message?: any;
  Form!: FormGroup;

  selectFeedback: " ";

  subscription!: Subscription;
  accounts: any;

  isLoading: boolean = false;

  constructor(
    private parameterService: ParametersService,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    public dialogRef: MatDialogRef<PayBillComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.Data = data.data;
    this.DataContra = data.data.contraDetails;
  }
  formControl = new FormControl("", [Validators.required]);

  ngOnInit(): void {
    this.getTaxAccountNos();
    this.Form = this.createForm();
    this.dialogTitle = "Edit picking item";

    this.dataSource2 = new MatTableDataSource<any>(this.DataContra);
    this.dataSource2.sort = this.sort2;
    this.isLoading = false;
  }
  ngAfterViewInit() {
    this.dataSource2.paginator = this.paginatorLegal;
  }
  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();
    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }
  getTaxAccountNos() {
    this.subscription = this.parameterService.getAccounts().subscribe((res) => {
      this.accounts = res;
      console.log("Accounts =", this.accounts);
    });
  }
  createForm(): FormGroup {
    return this.fb.group({
      tranid: [this.Data.tranid, Validators.required],
      trandate: [this.Data.trandate, Validators.required],
      tranparticular: [this.Data.tranparticular, Validators.required],
      currency: [this.Data.currency, Validators.required],
      tranamount: [this.Data.tranamount, Validators.required],
      reversedamount: [this.Data.reversedamount, Validators.required],
      reversingamount: [this.Data.reversingamount, Validators.required],
    });
  }

  onSubmit() {
    console.log("Picking Item", this.Form.value);
    this.snackbar.showNotification(
      "snackbar-success",
      "Amount updated successfully!"
    );
    this.dialogRef.close({ event: "close", data: this.Form.value });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
