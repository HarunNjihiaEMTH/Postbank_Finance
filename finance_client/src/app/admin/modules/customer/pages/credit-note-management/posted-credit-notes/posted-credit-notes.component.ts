import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { CreditNoteService } from 'src/app/user/data/services/credit-note.service';
import { Invoice } from 'src/app/user/data/types/customer-types/invoice';
import { DeleteCreditNoteComponent } from '../delete-credit-note/delete-credit-note.component';
import { CreditNoteDetailsComponent } from '../dialogs/credit-note-details/credit-note-details.component';
import { UpdateCreditNoteComponent } from '../dialogs/update-credit-note/update-credit-note.component';
import { VerifyCreditNoteComponent } from '../dialogs/verify-credit-note/verify-credit-note.component';

@Component({
  selector: 'app-posted-credit-notes',
  templateUrl: './posted-credit-notes.component.html',
  styleUrls: ['./posted-credit-notes.component.sass']
})
export class PostedCreditNotesComponent extends BaseComponent implements OnInit {
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
    this.creditNoteService.fetchCreditNotes()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (result) => {
          this.creditNotes = result;

          if (this.creditNotes.length > 0) {
            this.successfulCreditNotes = [];

            this.creditNotes.forEach(creditNote => {
              
              if(creditNote.status == "Approved" && creditNote.uraStatus == "Successful"){
                this.successfulCreditNotes.push(creditNote)
              }
            })            
          }

          if(this.successfulCreditNotes.length > 0){
         

            this.dataSource = new MatTableDataSource<Invoice>(this.successfulCreditNotes.reverse());
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;

          }
          this.isLoading = false;

        },
        (err) => {
          console.log(err);
          this.isLoading = false;
        }
      );
  }

  creditNoteDetails(row){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "600px";
    dialogConfig.data = {
      data: row,
    };
    const dialogRef = this.dialog.open(CreditNoteDetailsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getInvoices();
    });
  }

  verifyCreditNote(row){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "600px";
    dialogConfig.data = {
      data: row,
    };
    const dialogRef = this.dialog.open(VerifyCreditNoteComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getInvoices();
    });
  }

  updateCreditNote(row){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "600px";
    dialogConfig.data = {
      data: row,
    };
    const dialogRef = this.dialog.open(UpdateCreditNoteComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getInvoices();
    });
  }

  deleteCreditNote(row){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "600px";
    dialogConfig.data = {
      data: row,
    };
    const dialogRef = this.dialog.open(DeleteCreditNoteComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getInvoices();
    });
  }

  postToURA(invoiceno){
    
    this.creditNoteService.postToURA(invoiceno).pipe(takeUntil(this.subject)).subscribe(res => {
      console.log(res);

      let message = "URA RESPONCE: ";
          
      if (res.code == "00") {
        this._snackBar.open(
          message +
            "\n RES CODE: " +
            res.code +
            "\n RES DESC| " +
            res.description,
          "X",
          {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 2000000,
            panelClass: ["snackbar-success", "snackbar-success"],
          }
        );
      }else {
        this._snackBar.open(
          message +
            "\n RES CODE: " +
            res.code +
            "\n RES DESC| " +
            res.description,
          "X",
          {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 2000000,
            panelClass: ["snackbar-success", "snackbar-danger"],
          }
        );
      }
    }, err => {
      console.log(err)
    })
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
