import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { PurchaseOrder } from '../types/purchase-order';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {

  constructor(private http: HttpClient) { }

  createPurchaseOrder(purchaseOrder): Observable<PurchaseOrder>{
    const purchaeOrderUrl = `${environment.baseUrl}/api/v1/po/add`;

    return this.http.post(purchaeOrderUrl, purchaseOrder)
  }

  getPurchaseOrders(): Observable<PurchaseOrder[]>{
    const purchaeOrdersUrl = `${environment.baseUrl}/api/v1/po/all/not/sent`;

    return this.http.get<PurchaseOrder[]>(purchaeOrdersUrl)
  }

  getAllPurchaseOrders(): Observable<PurchaseOrder[]>{
    const allPurchaseOrdersUrl = `${environment.baseUrl}/api/v1/po/all`;

    return this.http.get<PurchaseOrder[]>(allPurchaseOrdersUrl)
  }

  getAllSentPurcahseOrders(): Observable<PurchaseOrder[]>{
    const allSentPurchaseOrdersUrl = `${environment.baseUrl}/api/v1/po/all/sent`;

    return this.http.get<PurchaseOrder[]>(allSentPurchaseOrdersUrl)
  }

  getPurcahseOrderById(purchaseOrderId): Observable<PurchaseOrder>{
    const purchaeOrderUrl = `${environment.baseUrl}/api/v1/po/find/${purchaseOrderId}`;

    return this.http.get<PurchaseOrder>(purchaeOrderUrl)
  }
  getRejectedPurchaseOrders(): Observable<PurchaseOrder[]>{
    const rejectedPurchaeOrdersUrl = `${environment.baseUrl}/api/v1/po/rejected`;

    return this.http.get<PurchaseOrder[]>(rejectedPurchaeOrdersUrl)
  }

  getCanceledPurchaseOrders(): Observable<PurchaseOrder[]>{
    const canceledPurchaeOrdersUrl = `${environment.baseUrl}/api/v1/po/cancelled`;

    return this.http.get<PurchaseOrder[]>(canceledPurchaeOrdersUrl)
  }

  updatePurchaseOrder(purchaseOrderDetails): Observable<any>{
    const updatePurchaeOrderUrl = `${environment.baseUrl}/api/v1/po/update`;

    return this.http.put<any>(updatePurchaeOrderUrl, purchaseOrderDetails)
  }

  deletePurchaseOrder(purchaseOrderId): Observable<any>{
    const deletePurchaseOrderUrl = `${environment.baseUrl}/api/v1/po/delete/${purchaseOrderId}`;

    return this.http.delete<any>(deletePurchaseOrderUrl)
  }

  sendPurchaseOrder(purchaseOrder): Observable<any>{
    const sendPurchaseOrderUrl = `${environment.baseUrl}/api/v1/po/send`;

    return this.http.post<any>(sendPurchaseOrderUrl, purchaseOrder)
  }

  emailPurchaseOrder(purchaseOrder): Observable<any>{
    const emailPurchaseOrderUrl = `${environment.baseUrl}/api/v1/po/generate/email`;

    return this.http.post<any>(emailPurchaseOrderUrl, purchaseOrder)
  }

  downloadPurchaseOrder(purchaseOrder){
    const sendPurchaseOrderUrl = `${environment.baseUrl}/api/v1/po/generate/download`;

    return this.http.post<any>(sendPurchaseOrderUrl, purchaseOrder)
  }

  downloadGenaratedPurchaseOrder(params: any): Observable<any>{
    let headers = new HttpHeaders();
    headers.append("Accept", "application/pdf");

    let requestOptions: any = {
      params: params,
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
    
    const downloadGenaratedPurchaseOrderUrl = `${environment.baseUrl}/api/v1/reports/po/per/purchase_order/`;

    return this.http.get(downloadGenaratedPurchaseOrderUrl, requestOptions).pipe(
      map((response) => {
        console.log("hey respond file", response);
        return {
          filename: "Purchase Order",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );

  }
}
