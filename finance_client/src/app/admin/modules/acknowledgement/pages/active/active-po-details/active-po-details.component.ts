import { SelectionModel } from "@angular/cdk/collections";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { ActivePosService } from "src/app/admin/data/services/activepos.service";
import { LocalStorageService } from "src/app/admin/data/services/localstorage.service";
import { Category } from "src/app/user/data/types/category";
import { UpdatePoComponent } from "./dialogs/update-po/update-po.component";
import Swal from "sweetalert2";
import { Location } from "@angular/common";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { UploadInvoiceService } from "src/app/admin/data/services/uploadInvoice.service";
import { HttpEventType, HttpResponse } from "@angular/common/http";
import { SnackbarService } from "src/app/shared/services/snackbar.service";

@Component({
  selector: "app-active-po-details",
  templateUrl: "./active-po-details.component.html",
  styleUrls: ["./active-po-details.component.sass"],
})
export class ActivePoDetailsComponent implements OnInit {
  displayedColumns: string[] = [
    "select",
    "id",
    "itemName",
    "itemQuantity",
    "itemUnitPrice",
    "serviceName",
    "servicePrice",
    "itemTotalValue",
    "vatAmount",
    "incomeWithholdingamount",
    "vatWitholding",
    //"deliveryStatus",
    "amountTobepaid",
    //"amountBalance",
   // "action",
  ];
  dataSource!: MatTableDataSource<Category>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  selection = new SelectionModel<any>(true, []);
  Form!: FormGroup;
  routeState: any;
  purchaseOrder: any;
  poSelected: any;
  data: any;
  loading: boolean = true;
  poItemsArray: any[] = [];
  recordSelected: boolean = false;
  multimodifyloading: boolean = false;

  goodsSum: number;
  serviceSum: number;
  incomeSum: number;

  vatSum: number = 0;
  totalValue: number = 0;
  totalGoodsServices: number = 0;
  totalTax: number = 0;

  serviceArray: number[] = [];
  goodsArray: number[] = [];
  vatArray: number[] = [];
  incomeArray: number[] = [];

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = "";
  fileInfos?: Observable<any>;

  invoiceloading: boolean = false;
  selectedRows: any;

  allItemsSelected: boolean = false;

  constructor(
    private router: Router,
    private poService: ActivePosService,
    private localStorageService: LocalStorageService,
    private dialog: MatDialog,
    private location: Location,
    private fb: FormBuilder,
    private uploadInvoice: UploadInvoiceService,
    private snackbar: SnackbarService
  ) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.routeState = this.router.getCurrentNavigation().extras.state;
      if (this.routeState) {
        this.poSelected = this.routeState.poSelectedDetails
          ? JSON.parse(this.routeState.poSelectedDetails)
          : "";

        this.localStorageService.set("po", this.poSelected);
      }
    }
  }

  ngOnInit(): void {
    this.data = this.localStorageService.get("po");
    console.log("purchaseOrder", this.data.id);

    this.getPoById(this.data.id);
    this.Form = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      invoiceNumber: ["", Validators.required],
      invoiceAmount: ["", Validators.required],
      invoiceDate: ["-"],
    });
  }

  // *******************************************************************************************************************
  //  Upload invoice
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
  upload(): void {
    this.invoiceloading = true;
    this.progress = 0;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        this.uploadInvoice.upload(this.currentFile, this.data.id).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((100 * event.loaded) / event.total);
            } else if (event instanceof HttpResponse) {
              //this.message = event.body.message;
              this.invoiceloading = false;
              this.snackbar.showNotification(
                "snackbar-success",
                "Invoice uploaded sucessfully!"
              );
              //this.fileInfos = this.uploadInvoice.getFiles();
            }
          },
          error: (err: any) => {
            console.log(err);
            this.progress = 0;
            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = "Could not upload the file!";
            }
            this.currentFile = undefined;
          },
        });
      }
      this.selectedFiles = undefined;
    }
  }

  
  back() {
    this.location.back();
  }
  onSubmitInvoice() {
    if (!this.selectedFiles) {
      this.snackbar.showNotification(
        "snackbar-danger",
        "Please select the invoice document (PDF)!"
      );
    } else if (!this.Form.value.invoiceNumber) {
      this.snackbar.showNotification(
        "snackbar-danger",
        "Please enter the invoice number!"
      );
    } else if (this.selectedFiles && this.Form.value.invoiceNumber) {
      this.upload();
    }
  }
  //*********************************************************************************************************************

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? "deselect" : "select"} all`;
    }
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${
      row.position + 1
    }`;
  }
  checkSelection(){
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    if(numSelected === numRows){
      this.allItemsSelected = true;
    } else  if(numSelected !== numRows){
      this.allItemsSelected = false;
    }
  }
  checkboxActive() { 
    this.selectedRows = this.selection.selected;
    this.customSweetAlert();
  }
  getPoById(poId) {
    this.poService.getActivePoById(poId).subscribe(
      (response: any) => {
        //this.detail = response;
        this.purchaseOrder = response;
        this.poItemsArray = this.purchaseOrder.modifiablePoParticulars;
        console.log("this.purchaseOrder = ", this.purchaseOrder);
        if (this.purchaseOrder) {
          this.loading = false;
        }
        this.dataSource = new MatTableDataSource<Category>(this.poItemsArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  modifyPo(poItem) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      array: this.poItemsArray,
      item: poItem,
    };

    const dialogRef = this.dialog.open(UpdatePoComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getPoById(this.data.id);
    });
  }

  customSweetAlert() {
    Swal.fire({
      title: "Are you sure?",
      text: "Please ensure all selected items are fully delivered. This action is irreversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Proceed!",
    }).then((result) => {
      if (result.value) {
        this.multiCalculate();
        this.onSubmit();
        // Swal.fire("Updated!", "Purchase order updated sucessfully", "success");
      }
    });
  }

  multiCalculate() {
    //this.multimodifyloading = true;
    console.log("numSelected: ");
    this.serviceArray = [];
    this.vatArray = [];
    this.incomeArray = [];
    this.goodsArray = [];

    this.selection.selected.forEach((item) => {
      if (item.orderItemType == "Service") {
        this.goodsSum = 0;
        this.serviceArray.push(parseInt(item.servicePrice));
        this.vatArray.push(parseInt(item.vatAmount));
        this.incomeArray.push(parseInt(item.incomeWithholdingamount));

        this.serviceSum = 0;
        this.serviceArray.forEach((element) => {
          this.serviceSum += element;
        });
        this.vatSum = 0;
        this.vatArray.forEach((element) => {
          this.vatSum += element;
        });
        this.incomeSum = 0;
        this.incomeArray.forEach((element) => {
          this.incomeSum += element;
        });
      } else if (item.orderItemType == "Goods") {
        this.serviceSum = 0;
        this.incomeSum = 0;
        this.goodsArray.push(parseInt(item.itemTotalValue));
        this.vatArray.push(parseInt(item.vatAmount));

        this.vatSum = 0;
        this.vatArray.forEach((element) => {
          this.vatSum += element;
        });
        this.goodsSum = 0;
        this.goodsArray.forEach((element) => {
          this.goodsSum += element;
        });
      }
    });

    console.log("serviceSum: ", this.serviceSum);

    console.log("vatSum: ", this.vatSum);

    console.log("incomeSum: ", this.incomeSum);

    console.log("goodsSum: ", this.goodsSum);

    this.totalGoodsServices = this.goodsSum + this.serviceSum;
    // this.totalTax = this.vatSum + this.incomeSum;
    this.totalTax = this.vatSum;

    this.totalValue =
      this.serviceSum + this.goodsSum + this.vatSum + this.incomeSum;

    console.log("totalValue: ", this.totalValue);

    //  this.data.push({selectedItems: this.selection.selected});
    //this.data = JSON.parse('selectedItems: this.selection.selected');

    //console.log("this.data = ", this.data);
  }

  onSubmit() {
    if (!this.Form.value.invoiceNumber) {
      this.snackbar.showNotification(
        "snackbar-danger",
        "Please upload an invoice number for this Purchase Order!"
      );
    } else if (this.Form.value.invoiceNumber) {
      this.poService
        .movePoToBills(this.data.id, this.Form.value.invoiceNumber)
        .subscribe(
          (res) => {
            this.router.navigateByUrl("/admin/acknowledgement/unpaid-pos");

            this.snackbar.showNotification(
              "snackbar-success",
              "Purchase order updated successfully!"
            );
          },
          (err) => {
            console.log(err);
            this.snackbar.showNotification("snackbar-danger", err);
          }
        );
    }
  }
}
