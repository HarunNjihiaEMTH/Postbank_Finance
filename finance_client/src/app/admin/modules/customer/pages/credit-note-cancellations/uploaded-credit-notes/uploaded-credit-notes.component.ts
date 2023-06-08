import { SelectionModel } from "@angular/cdk/collections";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  MatSnackBar,
} from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { takeUntil } from "rxjs";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { CreditNoteService } from "src/app/user/data/services/credit-note.service";
import { Invoice } from "src/app/user/data/types/customer-types/invoice";
import { CreditNoteDetailsComponent } from "../../credit-note-management/credit-note-details/credit-note-details.component";
import { CreateCreditNoteCancellationsComponent } from "../dialogs/create-credit-note-cancellations/create-credit-note-cancellations.component";

@Component({
  selector: "app-uploaded-credit-notes",
  templateUrl: "./uploaded-credit-notes.component.html",
  styleUrls: ["./uploaded-credit-notes.component.sass"],
})
export class UploadedCreditNotesComponent
  extends BaseComponent
  implements OnInit
{
  horizontalPosition: MatSnackBarHorizontalPosition = "end";
  verticalPosition: MatSnackBarVerticalPosition = "top";

  displayedColumns: string[] = [
    "id",
    "oriInvoiceId",
    "oriInvoiceNo",
    "reasonCode",
    "currency",
    "sellersReferenceNo",
    "status",
    "postedTime",
    "postedBy",
    "uraStatus",
    "viewDetails",
    "cancelCreditNote",
  ];

  creditNotes: any[] = [];
  successfulCreditNotes: any[] = [];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  selection = new SelectionModel<any>(true, []);
  data: any;
  error: any;
  isLoading: boolean = true;
  loading = false;
  retryPosting: boolean = false;
  postToUraFailed: boolean = false;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private snackbar: SnackbarService,
    private _snackBar: MatSnackBar,
    private creditNoteService: CreditNoteService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getInvoices();
  }

  refresh() {
    this.getInvoices();
  }

  getInvoices() {
    this.creditNoteService
      .fetchCreditNotes()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (result) => {
          this.creditNotes = result;

          if (this.creditNotes.length > 0) {
            this.successfulCreditNotes = [];

            this.creditNotes.forEach((creditNote) => {
              if (
                creditNote.status == "Approved" &&
                creditNote.uraStatus == "Successful" &&
                creditNote.cancellationstatus != "Approved" &&
                creditNote.cancellationstatus != "Applied"
              ) {
                this.successfulCreditNotes.push(creditNote);
              }
            });
          }

          if (this.successfulCreditNotes.length > 0) {
            this.isLoading = false;

            this.dataSource = new MatTableDataSource<Invoice>(
              this.successfulCreditNotes
            );
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;

            console.log("Credit Notes ", this.successfulCreditNotes);
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  creditNoteDetails(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "600px";
    dialogConfig.data = {
      data: row,
    };
    const dialogRef = this.dialog.open(
      CreditNoteDetailsComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((result) => {
      this.getInvoices();
    });
  }

  cancelCreditNote(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      data: row,
    };
    const dialogRef = this.dialog.open(
      CreateCreditNoteCancellationsComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((result) => {
      this.getInvoices();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onContextMenu(event: MouseEvent, item: Invoice) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}
