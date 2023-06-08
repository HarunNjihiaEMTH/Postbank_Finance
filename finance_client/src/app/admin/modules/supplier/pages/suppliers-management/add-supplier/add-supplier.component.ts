import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { takeUntil } from "rxjs";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";

import { MatDialog } from "@angular/material/dialog";

import { BanksLookupComponent } from "src/app/user/commons/components/banks-lookup/banks-lookup.component";
import { CountriesLookupComponent } from "src/app/user/commons/components/countries-lookup/countries-lookup.component";
import { CurrencyCodeLookupComponent } from "src/app/user/commons/components/currency-code-lookup/currency-code-lookup.component";
import { SupplierService } from "src/app/user/data/services/supplier.service";
import { BranchCodeLookupComponent } from "src/app/user/commons/components/branch-code-lookup/branch-code-lookup.component";
import { TokenCookieService } from "src/app/core/service/token-storage-cookies.service";

import * as XLSX from "xlsx";
import { NotificationService } from "src/app/admin/data/services/notification.service";

@Component({
  selector: "app-add-supplier",
  templateUrl: "./add-supplier.component.html",
  styleUrls: ["./add-supplier.component.scss"],
})
export class AddSupplierComponent extends BaseComponent implements OnInit {
  addSupplierForm: FormGroup;
  supplyTypes: string[] = ["Services", "Goods", "Goods/Services"];
  currentUser: any;
  username: string;
  postedTime: Date = new Date();

  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private snackbar: SnackbarService,
    private tokenCookieService: TokenCookieService,
    private supplierService: SupplierService,
    private notificationAPI: NotificationService
  ) {
    super();
  }

  ngOnInit(): void {
    this.currentUser = this.tokenCookieService.getUser();

    console.log("this.currentUser: ", this.currentUser);

    this.username = this.currentUser.username;

    this.addSupplierForm = this.fb.group({
      supplierName: ["", [Validators.required]],
      supplierAddress: ["", [Validators.required]],
      supplierContact: ["", [Validators.required]],
      supplierEmail: ["", [Validators.required]],
      supplierServices: ["", [Validators.required]],
      supplierBank: ["", [Validators.required]],
      supplierAccount: ["", [Validators.required]],
      supplierTin: ["", [Validators.required]],
      supplierCountry: ["", [Validators.required]],
      supplierCurrency: ["", [Validators.required]],
      postedBy: [this.username],
      postedTime: [this.postedTime],
    });
  }

  // supplierName;
  // supplierAddress;
  // supplierContact;
  // supplierEmail;
  // supplierServices;
  // supplierBank;
  // supplierAccount;
  // supplierTin;
  // supplierCountry;
  // supplierCurrency;
  // postedBy;

  countriesLookup() {
    const dialogRef = this.dialog.open(CountriesLookupComponent, {
      width: "600px",
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.subject))
      .subscribe((result) => {
        if (result) {
          this.addSupplierForm.patchValue({
            supplierCountry: result.data.name,
          });
          console.log(result);
        }
      });
  }

  currencyCodeLookup() {
    const dialogRef = this.dialog.open(CurrencyCodeLookupComponent, {
      width: "600px",
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.subject))
      .subscribe((result) => {
        this.addSupplierForm.patchValue({
          supplierCurrency: result.data.name,
        });
      });
  }

 

  

  createSupplier() {
    console.log(this.addSupplierForm.value);

    this.supplierService
      .addSupplier(this.addSupplierForm.value)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.snackbar.showNotification(
            "snackbar-success",
            "Supplier added successfully ! "
          );

          this.router.navigate([`/admin/supplier/suppliers-management/all`]);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  onCancel() {
    this.router.navigate([`/admin/supplier/suppliers-management/all`]);
  }


  banksLookup() {
    const dialogRef = this.dialog.open(BanksLookupComponent, {
      width: "600px",
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.subject))
      .subscribe((result) => {
        console.log("supplierBank :", result.data)
        this.addSupplierForm.patchValue({
          supplierBank: result.data.bankName,
        });
      });
  }
  branchCodeLookup() {
    const dialogRef = this.dialog.open(BranchCodeLookupComponent, {
      width: "800px",
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.subject))
      .subscribe((result) => {
        console.log(result);
        this.addSupplierForm.patchValue({
          supplierAccount: result.data.accountNo,
          supplierCurrency: result.data.accountCurrency,
        });
      });
  }

  // ***********************************************************************************************************************************************************************************

  addUser() { }

  keys: string[];
  otherRows: any[];
  // dataSheet = new Subject();
  headerRows: any;
  fileAcess: any;
  fileName: any;
  //firstElement: any;
  excelSelected: any;
  exceldata: [][] | undefined;
  values: any;
  finalValues: any;
  valuesArray: any;
  

  myFiles: string[] = [];

  
  onFileChange(evt: any) {
    const file: File = evt.target.files[0];
    this.fileAcess = file;

    const target: DataTransfer = <DataTransfer>evt.target;

    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: "binary" });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      //this.exceldata = XLSX.utils.sheet_to_json(ws, { header: 1 });
      this.exceldata = XLSX.utils.sheet_to_json(ws, { header: 1, raw: true });

      this.headerRows = this.exceldata[0];
      this.otherRows = this.exceldata.slice(1);

      //this.firstElement = this.headerRows[0];

      this.headerRows = this.headerRows.filter((e) => e.trim().length > 0);
      this.otherRows = this.otherRows.filter((e) =>
        e.some((f) => f.trim().length > 0)
      );
      //console.log("otherRows = ", this.otherRows[1].length);

      if (this.exceldata) {
        this.excelSelected = true;
      }

      this.values = this.otherRows.map((e) =>
        this.headerRows.reduce(
          (o, f, j) => Object.assign(o, { [f]: String(e[j]) }),
          {}
        )
      );

     
      console.log("Colcount = ", this.headerRows);

      this.finalValues = this.values.filter((value: {}) => {
        const keys = Object.keys(value);
        for (let key of keys) {
          if (value[key] == null || value[key] == undefined) {
            this.notificationAPI.alertWarning(`Invalid value for ${key} field`);
            return false;
          }
        }
        return keys.length !== 0;
      });

      const postedBy = this.finalValues[0].postedBy;

      for (let row of this.finalValues) {
        if (row.postedBy !== postedBy) {
          this.notificationAPI.alertWarning(
            "postedBy field value should be same for all rows"
          );
          return false;
        }
      }

      const requiredFields = [
        "supplierName",
        "supplierAddress",
        "supplierContact",
        "supplierEmail",
        "supplierServices",
        "supplierBank",
        "supplierAccount",
        "supplierTin",
        "supplierCountry",
        "supplierCurrency",
        "postedBy",
      ];

      const firstRow = this.finalValues[0];
      const missingFields = [];

      for (let field of requiredFields) {
        if (!firstRow.hasOwnProperty(field)) {
          missingFields.push(field);
        }
      }

      if (missingFields.length > 0) {
        this.notificationAPI.alertWarning(
          `Missing required fields: ${missingFields.join(", ")}`
        );
      } else {
        this.allowUpload = true;
      }
    };

    reader.readAsBinaryString(target.files[0]);
  }

  allowUpload = false;
  missingFields: string[] = [];
  uploadSuppliers() {
    this.loading = true;

    // Assuming this.finalValues is an array of objects
    const firstPostedByValue = this.finalValues[0]?.postedBy;
    console.log(firstPostedByValue); // Do something with the value

    console.log("Uploading this.finalValues: ", this.finalValues);
    if (this.allowUpload) {
      this.supplierService
        .addBulkSuppliers(this.finalValues)
        .pipe(takeUntil(this.subject))
        .subscribe(
          (res) => {
            this.loading = false;
            this.snackbar.showNotification(
              "snackbar-success",
              "Suppliers uploaded successfully!"
            );
            this.router.navigate([`/admin/supplier/suppliers-management/all`]);
          },
          (err) => {
            this.loading = false;
            console.log(err);
          }
        );
    } else {
      this.loading = false;
      this.notificationAPI.alertWarning(
        "This Excel file has issues. Please fix and try again!"
      );
    }
  }
}
