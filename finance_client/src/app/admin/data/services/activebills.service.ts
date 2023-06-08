import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";


@Injectable({
  providedIn: "root",
})
export class ActiveBillsService {
  
  constructor(private http: HttpClient) { }

  getActiveBills(): Observable<any[]> {
    const activeBillsUrl = `${environment.baseUrl}/api/v1/po/bills/not_paid`;

    return this.http.get<any[]>(activeBillsUrl);
  }

  getActiveBillsById(params: any): Observable<any> {
    return this.http.get(`${environment.baseUrl}/api/v1/po/billed/order`, {
      params,
    });
  }

  settleBills(data: any): Observable<{ message: string }> {
    const payBillUrl = `${environment.baseUrl}/api/v1/transaction/add`;

    return this.http.post<{ message: string }>(payBillUrl, data);
  }

  payBills(data: any): Observable<any> {
    const payBillUrl = `${environment.baseUrl}/api/v1/payments/add`;

    return this.http.post<any>(payBillUrl, data);
  }

  updateBill(billDetails): Observable<{ message: string }> {
    const updateBillUrl = `${environment.baseUrl}/api/v1/payments/update`;

    return this.http.put<{ message: string }>(updateBillUrl, billDetails)
  }

  retryPayBill(id: any): Observable<any> {
    const retryPayBillUrl = `${environment.baseUrl}/api/v1/payments/retry/${id}`;

    return this.http.get<any>(retryPayBillUrl, id);
  }

  retryTransaction(id: any): Observable<any> {
    const retryTransactionUrl = `${environment.baseUrl}/api/v1/accrual/collect/retry/${id}`;

    return this.http.get<any>(retryTransactionUrl, id);
  }
  retryTransactionSupplier(id: any): Observable<any> {
    const retryTransactionSupplierUrl = `${environment.baseUrl}/api/v1/accrual/pay/retry/{id}/${id}`;

    return this.http.get<any>(retryTransactionSupplierUrl, id);
  }

  getPaidBills(): Observable<any[]> {
    const paidBillsUrl = `${environment.baseUrl}/api/v1/payments/payments/approved`;

    return this.http.get<any[]>(paidBillsUrl);
  }

  getPendingBills(): Observable<any[]> {
    const pendingBillsUrl = `${environment.baseUrl}/api/v1/payments/payments`;

    return this.http.get<any[]>(pendingBillsUrl);
  }

  updateBillStatus(params: any): Observable<any> {
    const updateBillUrl = `${environment.baseUrl}/api/v1/payments/update/status`;
    return this.http.put(
      updateBillUrl,
      {},
      {
        params: params,
        responseType: "text",
      }
    );
  }




  getRejectedBills(): Observable<any[]> {
    const pendingBillsUrl = `${environment.baseUrl}/api/v1/payments/payments/rejected`;

    return this.http.get<any[]>(pendingBillsUrl);
  }

  getInvoiceByRefId(id): Observable<any> {
    const invoicesUrl = `${environment.baseUrl}/api/v1/transaction/find/documents/${id}`;

    return this.http.get<any>(invoicesUrl);
  }

  generateInvoicePdf(id: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/pdf');
    let requestOptions: any = { headers: headers, responseType: 'blob', withCredentials: false };
    const httpOptions = {
      'responseType': 'blob' as 'json'
    };
    let API_URL = `${environment.baseUrl}/api/v1/documents/download/pdf/${id}/`;
    return this.http.get(API_URL, httpOptions);
  }




  addAccrualSupplier(data: any): Observable<any> {
    const addAccrualSupplierUrl = `${environment.baseUrl}/api/v1/accrual/supplier/add`;

    return this.http.post<any>(addAccrualSupplierUrl, data);
  }

  getAccrualSupplier(): Observable<any> {
    const getAccrualSupplierUrl = `${environment.baseUrl}/api/v1/accrual/supplier/all`;

    return this.http.get<any>(getAccrualSupplierUrl);
  }

  updateAccrualSupplier(supplierDetails): Observable<{ message: string }> {
    const updateSupplierUrl = `${environment.baseUrl}/api/v1/accrual/supplier/update`;

    return this.http.put<{ message: string }>(updateSupplierUrl, supplierDetails)
  }


  postAccruals(data: any): Observable<any> {
    const payAccrualUrl = `${environment.baseUrl}/api/v1/accrual/collect/add`;

    return this.http.post<any>(payAccrualUrl, data);
  }

  postMultiAccruals(data: any): Observable<any> {
    const payAccrualUrl = `${environment.baseUrl}/api/v1/transaction/multiple/add`;

    return this.http.post<any>(payAccrualUrl, data);
  }



  getAllPostedTrans(): Observable<any[]> {
    const pendingBillsUrl = `${environment.baseUrl}/api/v1/accrual/collect/all`;

    return this.http.get<any[]>(pendingBillsUrl);
  }

  getAllPendingPostedTrans(): Observable<any[]> {
    const pendingTransUrl = `${environment.baseUrl}/api/v1/accrual/collect/find/pending`;

    return this.http.get<any[]>(pendingTransUrl);
  }
  getAllPendingSupplierTrans(): Observable<any[]> {
    const pendingTransUrl = `${environment.baseUrl}/api/v1/accrual/pay/find/pending`;

    return this.http.get<any[]>(pendingTransUrl);
  }
  getAllApprovedPostedTrans(): Observable<any[]> {
    const pendingTransUrl = `${environment.baseUrl}/api/v1/accrual/collect/find/approved`;

    return this.http.get<any[]>(pendingTransUrl);
  }

  getRejectedPostedTrans(): Observable<any[]> {
    const rejectedTransUrl = `${environment.baseUrl}/api/v1/accrual/collect/find/all/rejected`;

    return this.http.get<any[]>(rejectedTransUrl);
  }
  getRejectedSupplierPostedTrans(): Observable<any[]> {
    const rejectedTransUrl = `${environment.baseUrl}/api/v1/accrual/pay/find/rejected`;

    return this.http.get<any[]>(rejectedTransUrl);
  }


  postExcelData(data: any): Observable<any> {
    const addExcelDataUrl = `${environment.baseUrl}/api/v1/accrual/collect/exceldata`;

    return this.http.post<any>(addExcelDataUrl, data);
  }

  getAccrualSuppliers(): Observable<any[]> {
    const suppliersUrl = `${environment.baseUrl}/api/v1/accrual/supplier/all`;

    return this.http.get<any[]>(suppliersUrl)
  }

  getExpensesByType(params: any): Observable<any> {
    return this.http.get(`${environment.baseUrl}/api/v1/expense/find/by/expensetype/`, {
      params,
    });
  }

  

  updateTransactionStatus(params: any): Observable<any> {
    const updateTransUrl = `${environment.baseUrl}/api/v1/accrual/collect/update/status`;
    return this.http.put(
      updateTransUrl,
      {},
      {
        params: params,
        responseType: "text",
      }
    );
  }

  // /api/v1/accrual/collect/accrual/supplier/{supplier_id}

  getSuppliersTransDetails(supplier_id): Observable<any> {
    const supplierTransDetUrl = `${environment.baseUrl}/api/v1/accrual/supplier/find/${supplier_id}`;

    return this.http.get<any>(supplierTransDetUrl);
  }

  getSupplierAcrualDetails(params: any): Observable<any> {
    return this.http.get(`${environment.baseUrl}/api/v1/transaction/accrual/balance/per/supplier/`, {
      params,
    });
  }

  payAccrualSupplier(data: any): Observable<any> {
    const paySupplierUrl = `${environment.baseUrl}/api/v1/accrual/pay/add`;

    return this.http.post<any>(paySupplierUrl, data);
  }


  updateSupplierTransactionStatus(params: any): Observable<any> {
    const updateTransUrl = `${environment.baseUrl}/api/v1/accrual/pay/update/status`;
    return this.http.put(
      updateTransUrl,
      {},
      {
        params: params,
        responseType: "text",
      }
    );
  }

  getAllApprovedPostedSupplierTrans(): Observable<any[]> {
    const pendingTransUrl = `${environment.baseUrl}/api/v1/accrual/pay/find/approved`;

    return this.http.get<any[]>(pendingTransUrl);
  }







  postDirectTransaction(data: any): Observable<any> {
    const directUrl = `${environment.baseUrl}/api/v1/directtransfer/add`;

    return this.http.post<any>(directUrl, data);
  }
  retryDirectTransaction(id: any): Observable<any> {
    const retryPayBillUrl = `${environment.baseUrl}/api/v1/directtransfer/retry/${id}`;

    return this.http.get<any>(retryPayBillUrl, id);
  }
  getPendingDirectTransactions(): Observable<any[]> {
    const pendingBillsUrl = `${environment.baseUrl}/api/v1/directtransfer/fetch/pending`;

    return this.http.get<any[]>(pendingBillsUrl);
  }
  updateDirectTransactionStatus(params: any): Observable<any> {
    const updateTransUrl = `${environment.baseUrl}/api/v1/directtransfer/verify`;
    return this.http.get(
      updateTransUrl,
      {
        params: params,
        responseType: "text",
      }
    );
  }
  getApprovedDirectTransactions(): Observable<any[]> {
    const approvedUrl = `${environment.baseUrl}/api/v1/directtransfer/fetch/verified`;

    return this.http.get<any[]>(approvedUrl);
  }
  getRejectedDirectTransactions(): Observable<any[]> {
    const rejectedUrl = `${environment.baseUrl}/api/v1/directtransfer/fetch/rejected`;

    return this.http.get<any[]>(rejectedUrl);
  }

  // /delete/temporary/{id}

  deleteTransaction(id: any): Observable<any> {
    const deleteTransactionUrl = `${environment.baseUrl}/api/v1/transaction/delete/temporary/${id}`;
    return this.http.put<any>(deleteTransactionUrl, id);
  }


  // ********************************************************************************************************************
  postTransaction(data: any): Observable<any> {
    const payAccrualUrl = `${environment.baseUrl}/api/v1/transaction/add`;

    return this.http.post<any>(payAccrualUrl, data);
  }

  updateTransaction(transactionDetails): Observable<any> {
    const updateTransUrl = `${environment.baseUrl}/api/v1/transaction/update`;

    return this.http.put<any>(updateTransUrl, transactionDetails)
  }

  getTransactionsByStatus(params: any): Observable<any> {
    const pensdingTransUrl = `${environment.baseUrl}/api/v1/transaction/find/by/creation/status`;
    return this.http.get(
      pensdingTransUrl,
      {
        params: params,
      }
    );
  }

  //http://localhost:9051/api/v1/transaction/find/deleted/transactions?fromDate=2020-03-13T11%3A58%3A4&toDate=2024-03-13T11%3A58%3A4

  // /find/deleted/transactions

  getDeletedTransactionsByStatus(params: any): Observable<any> {
    const pensdingTransUrl = `${environment.baseUrl}/api/v1/transaction/find/deleted/transactions`;
    return this.http.get(
      pensdingTransUrl,
      {
        params: params,
      }
    );
  }

  approvePendingTransaction(params: any): Observable<any> {
    const updateTransUrl = `${environment.baseUrl}/api/v1/transaction/approve`;
    return this.http.put(
      updateTransUrl,
      {},
      {
        params: params,
        //responseType: "text",
      }
    );
  }
  getAccrualHistoryPerSupplier(params: any): Observable<any> {
    return this.http.get(`${environment.baseUrl}/api/v1/transaction/find/acrual/payment/supplier`, {
      params,
    });
  }
  retryTransactionById(id: any): Observable<any> {
    const retryPayBillUrl = `${environment.baseUrl}/api/v1/transaction/retry/${id}`;

    return this.http.get<any>(retryPayBillUrl, id);
  }


}
