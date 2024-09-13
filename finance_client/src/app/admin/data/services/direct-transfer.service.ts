import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class DirectTransferService {

  constructor(private http: HttpClient) { }
  
  postTransferTransaction(params: any): Observable<any> {
    const updateCostCenterUrl = `${environment.baseUrl}/api/v1/costcenters/update/status`;
    return this.http.put(updateCostCenterUrl,{}, {
      params:params,
      responseType: "text",
    });
  }

  getTransactionId
  createTransaction
  currentMessage
 
}
