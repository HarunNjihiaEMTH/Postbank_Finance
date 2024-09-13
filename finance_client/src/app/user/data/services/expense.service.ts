import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

import { CostCenterPerExpense } from '../types/customer-types/cost-center-per-expense';
import { Expense } from '../types/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private http: HttpClient) { }

  addExpense(expense): Observable<Expense>{
    const expenseUrl = `${environment.baseUrl}/api/v1/expense/add`;

    return this.http.post<Expense>(expenseUrl, expense);
  }

  getExpenses(): Observable<Expense[]>{
    const expensesUrl = `${environment.baseUrl}/api/v1/expense/all`;

    return this.http.get<Expense[]>(expensesUrl)
  }

  getExpenseById(expenseId): Observable<Expense>{
    const expensesUrl = `${environment.baseUrl}/api/v1/expense/find/${expenseId}`;

    return this.http.get<Expense>(expensesUrl)
  }

  updateExpense(expense): Observable<any>{
    const updateExpensesUrl = `${environment.baseUrl}/api/v1/expense/update`;

    return this.http.get<any>(updateExpensesUrl,expense)
  }

  getCostCentersPerExpense(expenseId): Observable<CostCenterPerExpense[]>{
    const  getCostCenterPerExpenseUrl = `${environment.baseUrl}/api/v1/costcenters/per/expense`;

    return this.http.get<CostCenterPerExpense[]>(getCostCenterPerExpenseUrl, { params: {expense_id: expenseId }})
  }

  deleteExpense(expenseId): Observable<any>{
    const deleteExpensesUrl = `${environment.baseUrl}/api/v1/expense/delete/${expenseId}`;

    return this.http.delete<any>(deleteExpensesUrl)
  }
}
