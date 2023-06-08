import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { PendingCreditNotesComponent } from '../../pending-credit-notes/pending-credit-notes.component';

@Component({
  selector: 'app-credit-note-details',
  templateUrl: './credit-note-details.component.html',
  styleUrls: ['./credit-note-details.component.sass']
})
export class CreditNoteDetailsComponent extends BaseComponent implements OnInit {
  creditNote: any;

  constructor(public dialogRef: MatDialogRef<PendingCreditNotesComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.creditNote = this.data.data;

    console.log(this.creditNote)
  }

}
