import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomBill } from '../types/custom-bill';

@Injectable({
  providedIn: 'root'
})
export class CustomBillsService {

  constructor(private http: HttpClient) { }

  addCustomBill(costCenter): Observable<CustomBill> {
    const addCustomBillUrl = `${environment.baseUrl}/api/v1/custom/bill/create`;

    return this.http.post<CustomBill>(addCustomBillUrl, costCenter);
  }

  getCustomBills(): Observable<CustomBill[]> {
    const  getCustomBillsUrl = `${environment.baseUrl}/api/v1/custom/bill/custom/bills`;

    return this.http.get<CustomBill[]>(getCustomBillsUrl);
  }

  

  updateCustomBill(customBillDetails) {
    const updateCustomBillUrl = `${environment.baseUrl}/api/v1/custom/bill/update`;

    return this.http.put<any>(updateCustomBillUrl, customBillDetails);
  }
}
