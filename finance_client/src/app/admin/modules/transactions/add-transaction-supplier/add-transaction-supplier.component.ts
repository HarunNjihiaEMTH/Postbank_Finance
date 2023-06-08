import { SelectionModel } from "@angular/cdk/collections";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ActiveBillsService } from "src/app/admin/data/services/activebills.service";
import { LocalStorageService } from "src/app/admin/data/services/localstorage.service";
import { ParametersService } from "src/app/admin/data/services/parameters.service";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { SupplierService } from "src/app/user/data/services/supplier.service";
import { SuppliersLookupComponent } from "../../bills/pay-bill/dialog/suppliers-lookup/suppliers-lookup.component";
import { BranchCodeLookupComponent } from "../../supplier/pages/expenses-management/branch-code-lookup/branch-code-lookup.component";


@Component({
  selector: "app-add-transaction-supplier",
  templateUrl: "./add-transaction-supplier.component.html",
  styleUrls: ["./add-transaction-supplier.component.sass"],
})
export class AddTransactionSupplierComponent implements OnInit {
  Form!: FormGroup;
  dyForm!: FormGroup;
  subscription!: Subscription;

  data: any;
  isLoading: boolean = true;
  paramsExist: boolean = false;

  suppliers: any;
  accrualSuppliers: any;
  selectedSup: any[] = [];

  selectedDet: any;
  
  displayedColumns: string[] = [
    "id",
    "supplierName",
    "supplierAc",
    "acrualAmount",
    "accrualAccountName",
    "accrualAccount",
    "acrualPeriod",
    "acrualDescription",
    "actions",
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };
  selection = new SelectionModel<any>(true, []);
  //data: any;
  error: any;

  formData: any;

  //isLoading = true;
  addSupplier: boolean = true;
  updateSupplier: boolean = false;

  formTitle: string = "Add supplier";

  selectedData: any[] = [];

  routeState: any;
  selecTrans: any[] = [];
  transData: any;
  minorDet: boolean;
  constructor(
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private payBill: ActiveBillsService,
    private dialog: MatDialog,
    private supplierService: SupplierService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {

    this.initForm();
  }
  ngOnInit(): void {

    this.getAccrualSupplier();
    this.getSuppliers();
  }

  refresh() {
    this.getAccrualSupplier();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAccrualSupplier() {
    this.payBill.getAccrualSupplier().subscribe(
      (res) => {
        this.accrualSuppliers = res;
        console.log("this.accrualSuppliers: ", this.accrualSuppliers)
        if (this.accrualSuppliers) {
          this.isLoading = false;

          this.dataSource = new MatTableDataSource<any>(this.accrualSuppliers);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getSuppliers() {
    this.supplierService.getSuppliers().subscribe(
      (res) => {
        this.suppliers = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getSupplierById(suppIds) {
    this.selectedSup.push(suppIds);
    this.supplierService.getSupplierById(suppIds).subscribe((response: any) => {
      this.Form.patchValue({
        referenceID: response.id,
        supplierAc: response.supplierAccount,
        supplierName: response.supplierName,
      });
    });
  }

  suppliersLookup() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "800px";
    dialogConfig.data = {
      action: "view suppliers",
      data: this.suppliers,
      selected: this.selectedSup,
    };

    const dialogRef = this.dialog.open(SuppliersLookupComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (result.data.length != 0) {
        console.log("result: ", result.data[0]);
        this.getSupplierById(result.data[0].id);
        //this.getSelectedSupplier(result.data[0]);
      }
    });
  }
  branchCodeLookup() {
    const dialogRef = this.dialog.open(BranchCodeLookupComponent, {
      width: "600px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      this.Form.patchValue({
        supplierAc: result.data.accountnumber,
      });
    });
  }

  initForm() {
    this.Form = this.fb.group({
      id: [""],
      acrualAmount: ["", [Validators.required]],
      acrualDescription: ["", [Validators.required]],
      acrualPeriod: ["", [Validators.required]],
      accrualAccountName: ["", Validators.required],
      accrualAccount: ["", Validators.required],
      referenceID: ["", [Validators.required]],
      supplierAc: ["", [Validators.required]],
      supplierName: ["", [Validators.required]],

    });
  }


  onSubmit() {
    if (this.addSupplier == true) {
      console.log("this.addSupplier: ", this.addSupplier);
      this.addNewAccrualSupplier();
    } else if (this.updateSupplier == true) {
      console.log("this.updateSupplier: ", this.updateSupplier);
      this.updateTheAccrualSupplier();
    }
  }

  addNewAccrualSupplier() {
    console.log("Add Form Value", this.Form.value);
    this.payBill
      .addAccrualSupplier(this.Form.value)
      .pipe()
      .subscribe(
        (res) => {
          this.getAccrualSupplier();
          console.log("Response = ", res);
          this.snackbar.showNotification(
            "snackbar-success",
            "Supplier details added!"
          );
        },
        (err) => {
          console.log("Error ", err);
          this.snackbar.showNotification(
            "snackbar-danger",
            "Error uploading data!"
          );
        }
      );
  }

  addAccrualSupplier() {
    this.formTitle = "Add supplier";
    this.initForm();
    this.addSupplier = true;
  }

  updateAccrualSupplier(data: any) {
    this.updateSupplier = true;
    this.addSupplier = false;
    this.selectedData = data;
    this.formTitle = "Edit supplier";
    console.log("Form data", data);

    this.Form.patchValue({
      id: data.id,
      referenceID: data.referenceID,
      acrualAmount: data.acrualAmount,
      acrualDescription: data.acrualDescription,
      acrualPeriod: data.acrualPeriod,
      accrualAccountName: data.accrualAccountName,
      accrualAccount: data.accrualAccount,
      supplierAc: data.supplierAc,
      supplierName: data.supplierName,
    });

    console.log("Form Value", this.Form.value);
  }

  updateTheAccrualSupplier() {
    console.log("Add Form Value", this.Form.value);
    this.payBill
      .addAccrualSupplier(this.Form.value)
      .pipe()
      .subscribe(
        (res) => {
          this.getAccrualSupplier();
          console.log("Response = ", res);
          this.snackbar.showNotification(
            "snackbar-success",
            "Supplier details updated!"
          );
        },
        (err) => {
          console.log("Error ", err);
          this.snackbar.showNotification(
            "snackbar-danger",
            "Error uploading data!"
          );
        }
      );
  }

  viewSupplierTransactions(data: any) {
    // this.router.navigateByUrl("/admin/transactions/transaction-info");

    this.payBill.getSuppliersTransDetails(data.id).subscribe(
      (res) => {
        this.selectedDet = res;
        this.router.navigate(["/admin/transactions/transaction-info"], {
          state: {
            selectedDetails: JSON.stringify(this.selectedDet),
          },
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

 accrualBranchCodeLookup() {
    const dialogRef = this.dialog.open(BranchCodeLookupComponent, {
      width: "600px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      this.Form.patchValue({
        accrualAccount: result.data.accountnumber,
        accrualAccountName: result.data.accountname,
      });
    });
  }
}
