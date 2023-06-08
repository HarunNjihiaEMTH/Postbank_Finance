import { SelectionModel } from "@angular/cdk/collections";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Subscription } from "rxjs";
import { InvoiceTaxesService } from "src/app/admin/data/services/invoice-taxes.service";
import { ParametersService } from "src/app/admin/data/services/parameters.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import Swal from "sweetalert2";
import { AddInvoiceTaxComponent } from "./dialogs/add-invoice-tax/add-invoice-tax.component";
import { DeleteInvoiceTaxComponent } from "./dialogs/delete-invoice-tax/delete-invoice-tax.component";
import { InvoiceTaxDetailsComponent } from "./dialogs/invoice-tax-details/invoice-tax-details.component";
import { UpdateInvoiceTaxComponent } from "./dialogs/update-invoice-tax/update-invoice-tax.component";

@Component({
  selector: "app-invoice-taxes",
  templateUrl: "./invoice-taxes.component.html",
  styleUrls: ["./invoice-taxes.component.sass"],
})
export class InvoiceTaxesComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = ["id", "code", "name", "rate", "actions"];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };
  subscription!: Subscription;
  selection = new SelectionModel<any>(true, []);
  data: any;
  error: any;

  formData: any;

  isLoading = true;

  constructor(
    private dialog: MatDialog,
    private parameterService: ParametersService,
    private invoiceTaxesService: InvoiceTaxesService,
    private snackbar: SnackbarService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getData();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getData() {
    this.subscription = this.invoiceTaxesService
      .listAllTaxCategory()
      .subscribe((res) => {
        this.data = res;

        let taxes: any[] = [];

        taxes = res;
        if (taxes.length > 0) {
          this.isLoading = false;
          this.dataSource = new MatTableDataSource(taxes);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
  }

  refresh() {
    this.getData();
  }

  addParameter() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      test: "data",
    };

    const dialogRef = this.dialog.open(AddInvoiceTaxComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getData();
    });
  }

  updateInvoiceTax(data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      test: data,
    };

    const dialogRef = this.dialog.open(UpdateInvoiceTaxComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getData();
    });
  }

  invoiceTaxDetails(data){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      test: data,
    };

    const dialogRef = this.dialog.open(InvoiceTaxDetailsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getData();
    });
  }

  deleteInvoiceTax(data){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      test: data,
    };

    const dialogRef = this.dialog.open(DeleteInvoiceTaxComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getData();
    });
  }

  customWithFunction(sender) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        this.parameterService.deleteParameter(sender.id).subscribe(
          (res) => {
            this.getData();
            this.snackbar.showNotification(
              "snackbar-success",
              "Tax parameter deleted successfully!"
            );
          },
          (err) => {
            console.log(err);
            this.snackbar.showNotification("snackbar-success", err);
          }
        );
      }
    });
  }
}
