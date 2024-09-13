import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';



@Injectable({
  providedIn: 'root'
})
export class ParametersService {

  getBillByExpenseId(expIds): Observable<any>{
    const expenseUrl = `${environment.baseUrl}/api/v1/costcenters/per/expense?expenses=${expIds}`;

    return this.http.get<any>(expenseUrl)
  }
  

  constructor(private http: HttpClient) { }
  addOrganisationPrams(organization): Observable<{message: string}>{
    const addOrganizationUrl = `${environment.baseUrl}/api/v1/organisation/add`;

    return this.http.post<{message: string}>(addOrganizationUrl, organization)
  }

  getOrganisationPrams(): Observable<any[]>{
    const organizationUrl = `${environment.baseUrl}/api/v1/organisation/all`;

    return this.http.get<any[]>(organizationUrl)
  }

  updateOrganisationPrams(organization): Observable<{message: string}>{
    const updateOrganizationUrl = `${environment.baseUrl}/api/v1/organisation/update`;

    return this.http.put<{message: string}>(updateOrganizationUrl, organization)
  }

  getOrganisationPramsById(organizationId): Observable<any>{
    const organizationUrl = `${environment.baseUrl}/api/v1/organisation/find/${organizationId}`;

    return this.http.get<any>(organizationUrl)
  }

  deleteOrganisationPrams(organizationId): Observable<{message: string}>{
    const deleteOrganizationUrl = `${environment.baseUrl}/api/v1/organisation/delete/${organizationId}`;

    return this.http.delete<{message: string}>(deleteOrganizationUrl)
  }

  addParameters(parameter): Observable<{message: string}>{
    const addParameterUrl = `${environment.baseUrl}/api/v1/tax/add`;

    return this.http.post<{message: string}>(addParameterUrl, parameter)
  }

  getParameters(): Observable<any[]>{
    const parametersUrl = `${environment.baseUrl}/api/v1/tax/all`;

    return this.http.get<any[]>(parametersUrl)
  }

  updateParameters(suppplierDetails): Observable<{message: string}>{
    const updateParameterUrl = `${environment.baseUrl}/api/v1/tax/update`;

    return this.http.put<{message: string}>(updateParameterUrl, suppplierDetails)
  }

  getParameterById(parameterId): Observable<any>{
    const parameterUrl = `${environment.baseUrl}/api/v1/tax/find/${parameterId}`;

    return this.http.get<any>(parameterUrl)
  }

  deleteParameter(parameterId): Observable<{message: string}>{
    const deleteParameterUrl = `${environment.baseUrl}/api/v1/tax/delete/${parameterId}`;

    return this.http.delete<{message: string}>(deleteParameterUrl)
  }
  //http://52.15.152.26:8080/api/v1/officeaccounts/all
  getAccounts(): Observable<any[]>{
    const accountsUrl = `${environment.baseUrl}/api/v1/officeaccounts/all`;

    return this.http.get<any[]>(accountsUrl, {params: { SOL_ID: 999 }})
  }

  getPointingDetailsByAcc(expAcc): Observable<any>{
    const pointingDetUrl = `${environment.baseUrl}/api/v1/contraDetails/all?accountNo=${expAcc}`;

    return this.http.get<any>(pointingDetUrl)
  }

}
