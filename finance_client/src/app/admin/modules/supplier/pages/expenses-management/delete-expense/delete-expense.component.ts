import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { ExpenseService } from 'src/app/user/data/services/expense.service';
import { Category } from 'src/app/user/data/types/category';
import { Expense } from 'src/app/user/data/types/expense';
import { AllExpensesComponent } from '../all-expenses/all-expenses.component';

@Component({
  selector: 'app-delete-expense',
  templateUrl: './delete-expense.component.html',
  styleUrls: ['./delete-expense.component.sass']
})
export class DeleteExpenseComponent extends BaseComponent implements OnInit {
  expense: Expense;
  expenseId: number;

  constructor(public dialogRef: MatDialogRef<AllExpensesComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder, private expenseService: ExpenseService, private snackbar: SnackbarService) {
      super()
     }

  ngOnInit(): void {
    this.expense = this.data.data;

    this.expenseId = this.expense.id;

    console.log(this.expense);
  }

  confirmDelete() {
    this.expenseService
      .deleteExpense(this.expenseId)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.snackbar.showNotification(
            "snackbar-success",
            "Expense deleted successfully !"
          );

          console.log(res)

          this.dialogRef.close();
        },
        (err) => {
          console.log(err);
        }
      );
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
