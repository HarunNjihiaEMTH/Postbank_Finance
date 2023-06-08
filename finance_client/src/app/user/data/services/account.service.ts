import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

import { Account } from '../types/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  fetchBranchCodes(acctType, SOL_ID, schemecode): Observable<Account[]>{
    const accountsUrl = `${environment.baseUrl}/api/v1/lookup/accounts`;

    return this.http.get<Account[]>(accountsUrl, {params: { acctType: acctType, branchCode: SOL_ID, schmCode: schemecode }})
  }

  fetchAccountsByName(acctName): Observable<Account[]>{
    const accountsUrl = `${environment.baseUrl}/api/v1/lookup/accounts/search`;

    return this.http.get<Account[]>(accountsUrl, {params: { acctName: acctName }})
  }

  fetchExpenseAccounts(expenseId, costCenterId): Observable<Account[]>{
    const accountsUrl = `${environment.baseUrl}/api/v1/costcenters/accounts/per/costcenter/and/expense`;

    return this.http.get<Account[]>(accountsUrl, {params: { expenseId: expenseId, costCenterId: costCenterId }})
  }

  fetchAccountNumberDetails(acctNumber): Observable<Account[]>{
    const accountsUrl = `${environment.baseUrl}/api/v1/lookup/accountNumber/search`;

    return this.http.get<Account[]>(accountsUrl, {params: { acctNumber: acctNumber }})
  }

}
