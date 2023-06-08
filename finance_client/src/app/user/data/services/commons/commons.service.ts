import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { BranchCode } from '../../types/branch-code';
import { Bank } from '../../types/commons/bank';
import { SchemeType } from '../../types/commons/scheme-type';

@Injectable({
  providedIn: 'root'
})
export class CommonsService {

  constructor(private http: HttpClient) { }

  // /api/v1/lookup/branches

  fetchBranchCodes(): Observable<any[]>{
    const branchCodesUrl = `${environment.baseUrl}/api/v1/lookup/branches`;

    return this.http.get<any[]>(branchCodesUrl)
  }

  fetchScehemCodes(): Observable<SchemeType[]>{
    const schemeCodesUrl = `${environment.baseUrl}/api/v1/lookup/schemecodes`;

    return this.http.get<SchemeType[]>(schemeCodesUrl)
  }

  fetchBanks(): Observable<Bank[]>{
    const fetchBanksUrl = `${environment.baseUrl}/api/v1/lookup/banks`;

    return this.http.get<Bank[]>(fetchBanksUrl)
  }

  
}
