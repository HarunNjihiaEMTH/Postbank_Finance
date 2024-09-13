import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";

import * as XLSX from "xlsx";

import { Observable, Subject, Subscription } from "rxjs";
import { HttpEventType, HttpResponse } from "@angular/common/http";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { Router } from "@angular/router";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UploadInvoiceService } from "src/app/admin/data/services/uploadInvoice.service";
import { ActiveBillsService } from "src/app/admin/data/services/activebills.service";
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from "@angular/material/snack-bar";
import { TokenCookieService } from "src/app/core/service/token-storage-cookies.service";

@Component({
  selector: "app-upload-excel",
  templateUrl: "./upload-excel.component.html",
  styleUrls: ["./upload-excel.component.sass"],
})
export class UploadExcelComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = "end";
  verticalPosition: MatSnackBarVerticalPosition = "top";

  
  exceldata: [][] | undefined;

  subscription!: Subscription;

  keys: string[];
  otherRows: any[];
  dataSheet = new Subject();
  headerRows: any;
  fileAcess: any;
  fileName: any;
  firstElement: any;
  excelSelected: any;
  // selectedFiles: any;
  // Stuff za File Upload//
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = "";
  messageSuccess = "";
  fileInfos?: Observable<any>;
  jsonHeader: any;
  jsonRows: any;
  values: any;
  finalValues: any;
  valuesArray: any;
  typeIsSelected: boolean = false;
  emailTemps: any;
  smsTemps: any;

  currentUser: any;

  loading = false;

  //pipe = "Apple|Orange|Mango|Cherry";

  //types = [{ name: "SMS contacts" }, { name: "Email contacts" }];

  public Form: FormGroup;

  constructor(
    private router: Router,
    private location: Location,
    private uploadService: UploadInvoiceService,
    private snackbar: SnackbarService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private activeBillsService: ActiveBillsService,
    private tokenCookieService: TokenCookieService,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.currentUser = this.tokenCookieService.getUser().username;
    this.creatGroup();

    //const formatted = this.pipe.split("|");
    //console.log("formatted",formatted);
  }

  creatGroup() {
    this.Form = this.fb.group({
      // type: ["", Validators.required],
      // emailtitle: ["", Validators.required],
      // smstitle: ["", Validators.required],
    });
  }

  typeSelected(type: any) {
    console.log("Type = ", type.value);
    this.typeIsSelected = true;
  }

  onFileChange(evt: any) {
    const file: File = evt.target.files[0];
    this.fileAcess = file;

    const target: DataTransfer = <DataTransfer>evt.target;
    if (target.files.length !== 1)
      throw new Error("Multiple Files Not Supported!");

    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: "binary" });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      //this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      this.exceldata = XLSX.utils.sheet_to_json(ws, { header: 1 });
      if (this.exceldata) {
        this.excelSelected = true;
      }

      //console.log("Excel data = ", this.exceldata);
      this.headerRows = this.exceldata[0];
      this.otherRows = this.exceldata.slice(1);
      this.firstElement = this.headerRows[0];

      this.headerRows = this.headerRows.filter((e) => e.length);

      this.otherRows = this.otherRows.filter((e) => e.length);
      console.log("otherRows = ", this.otherRows[1].length);

      this.values = this.otherRows.map((e) =>
        this.headerRows.reduce((o, f, j) => Object.assign(o, { [f]: e[j] }), {})
      );

      console.log("Colcount = ", this.headerRows);

      this.finalValues = this.values.filter(
        (value: {}) => Object.keys(value).length !== 0
      );

      // this.finalValues = this.values.filter(
      //   (obj) =>
      //     !(obj && Object.keys(obj).length === 0 && obj.constructor === Object)
      // );

      // console.log("finalValues = ", this.finalValues);

      this.valuesArray = {
        key: this.finalValues,
        postedBy: this.currentUser,
        postedTime: new Date(),
      };

      //console.log("ValuesArray = ", this.valuesArray);
    };

    reader.readAsBinaryString(target.files[0]);
  }

  // Codes relating to upload File start
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
  upload(): void {
    this.progress = 0;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        this.uploadService.upload(this.currentFile, 1).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((100 * event.loaded) / event.total);
            } else if (event instanceof HttpResponse) {
              this.messageSuccess = event.body.message;
              //this.fileInfos = this.uploadService.getFiles();
            }
          },
          error: (err: any) => {
            console.log(err);
            this.progress = 0;
            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.snackbar.showNotification(
                "snackbar-danger",
                "File does not conform to format. Please check and retry!"
              );
              this.message =
                "File does not conform to format. Please check and retry!";
            }
            this.currentFile = undefined;
          },
        });
      }
      this.selectedFiles = undefined;
    }
  }

  // onSubmit(): void {
  //   // this.upload();

  // }

  submit() {
    console.log("Submit btn clicked", this.valuesArray);
    if (this.headerRows.length != this.otherRows[0].length) {
      this.snackbar.showNotification(
        "snackbar-danger",
        "Number of headers " +
          this.headerRows.length +
          " and data provided do not match!"
      );
    } else if (this.headerRows.length > 10) {
      this.snackbar.showNotification(
        "snackbar-danger",
        "Please ensure the column count does not exceed 10!"
      );
    } else {
      if (this.headerRows[0] == "Date") {
        this.loading = true;
        this.activeBillsService
          .postExcelData(
            this.valuesArray
          )
          .pipe()
          .subscribe(
            (res) => {
              console.log("Response = ", res);

              this._snackBar.open(
                "TRANSACTION RESPONSE" + " Transactions imported successfully " + "\n STATUS: " + res.message,
                "X",
                {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  duration: 2000000,
                  panelClass: ["snackbar-success", "snackbar-success"],
                }
              );

              this.loading = false;
              // this.snackbar.showNotification(
              //   "snackbar-success",
              //   "Data uploaded successfully!"
              // );
              this.router.navigateByUrl("/admin/transactions/pending-transactions");
            },
            (err) => {
              console.log("Error ", err);
              this.loading = false;
              this.snackbar.showNotification(
                "snackbar-danger",
                "Error uploading data!"
              );
              // this.snackbar.showNotification('snackbar-danger', 'Contacts upload failure!')
            }
          );
      } else {
        this.snackbar.showNotification(
          "snackbar-danger",
          "Please ensure that the first column is Date!"
        );
      }
    }
  }

  back() {
    this.location.back();
  }
}
