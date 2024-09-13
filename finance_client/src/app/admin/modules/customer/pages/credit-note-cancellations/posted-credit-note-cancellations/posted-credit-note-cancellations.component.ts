import { SelectionModel } from '@angular/cdk/collections';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { CreditNoteCancellationsService } from 'src/app/user/data/services/credit-note-cancellations.service';
import { Invoice } from 'src/app/user/data/types/customer-types/invoice';
import { CreditNoteCancellationDetailsComponent } from '../dialogs/credit-note-cancellation-details/credit-note-cancellation-details.component';

@Component({
  selector: 'app-posted-credit-note-cancellations',
  templateUrl: './posted-credit-note-cancellations.component.html',
  styleUrls: ['./posted-credit-note-cancellations.component.sass']
})
export class PostedCreditNoteCancellationsComponent extends BaseComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = "end";
  verticalPosition: MatSnackBarVerticalPosition = "top";

  displayedColumns: string[] = [
    "id",
    "oriInvoiceId",
    "invoiceNo",
    "reasonCode",
    "postedAt",
    "postedBy",
    "status",
    "uraStatus",
    "viewDetails",
    //"postToUra",
  ];

  pendingCancellations: any[] = [];
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
    private dialog: MatDialog,
    private snackbar: SnackbarService,
    private creditNoteCancellationService: CreditNoteCancellationsService
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
   
    this.creditNoteCancellationService
      .fetchCancelledCreditNotes()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (result) => {
          this.pendingCancellations = result;

          if (this.pendingCancellations.length > 0) {
            this.isLoading = false;

            this.dataSource = new MatTableDataSource<Invoice>(
              this.pendingCancellations
            );
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;

            console.log("Credit Notes ", this.pendingCancellations);
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  creditNoteCancellationDetails(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "600px";
    dialogConfig.data = {
      data: row,
    };
    const dialogRef = this.dialog.open(
      CreditNoteCancellationDetailsComponent,
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
