import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { Invoice } from "../../types/customer-types/invoice";

@Injectable({
  providedIn: "root",
})
export class InvoiceService {
  constructor(private http: HttpClient) {}

  generateInvoice(invoice): Observable<Invoice> {
    const generateInvoiceUrl = `${environment.uraUrl}/api/v1/invoice/add`;

    return this.http.post<Invoice>(generateInvoiceUrl, invoice);
  }

  getAllInvoices(): Observable<Invoice[]> {
    const invoicesUrl = `${environment.uraUrl}/api/v1/invoice/all`;

    return this.http.get<Invoice[]>(invoicesUrl);
  }

  getApprovedInvoices(): Observable<Invoice[]> {
    const invoicesUrl = `${environment.uraUrl}/api/v1/invoice/all/approved`;

    return this.http.get<Invoice[]>(invoicesUrl);
  }

  getInvoiceById(invoiceId): Observable<Invoice> {
    const invoiceUrl = `${environment.uraUrl}/api/v1/invoice/find/${invoiceId}`;

    return this.http.get<Invoice>(invoiceUrl);
  }

  updateInvoice(invoiceDetails): Observable<any> {
    const updateInvoiceUrl = `${environment.uraUrl}/api/v1/invoice/update`;

    return this.http.put<any>(updateInvoiceUrl, invoiceDetails);
  }

  deleteInvoice(deleted_by,invoiceno): Observable<any> {
    const deleteInvoiceUrl = `${environment.uraUrl}/api/v1/uploadinvoice/delete/${deleted_by}/${invoiceno}`;

    return this.http.get<any>(deleteInvoiceUrl);
  }
  // /delete/{deleted_by}/{invoiceno}
  recieveInvoicePayment(params): Observable<any> {
    const recieveInvoicePaymentUrl = `${environment.uraUrl}/api/v1/invoice/update/payment`;

    return this.http.put<any>(
      recieveInvoicePaymentUrl,
      {},
      {
        params: params,
      }
    );
  }

  downloadGenaratedInvoice(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", "application/pdf");

    let requestOptions: any = {
      params: params,
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };

    const downloadGenaratedInvoiceUrl = `${environment.uraUrl}/api/v1/reports/invoice/per/invoice/`;

    return this.http.get(downloadGenaratedInvoiceUrl, requestOptions).pipe(
      map((response) => {
        console.log("hey respond file", response);
        return {
          filename: "Invoice",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );
  }

  updateInvoiceStatus(params: any): Observable<any> {
    const updateParameterUrl = `${environment.uraUrl}/api/v1/invoice/update/status`;
    return this.http.put(
      updateParameterUrl,
      {},
      {
        params: params,
        responseType: "text",
      }
    );
  }

  postToUra(invoice): Observable<any> {
    const postTouraUrl = `${environment.uraUrl}/api/v1/uploadinvoice/now`;

    return this.http.post<any>(postTouraUrl, invoice);
  }

  fetchUploadedInvoices(): Observable<any> {
    const fetchUploadedInvoicesUrl = `${environment.uraUrl}/api/v1/uploadinvoice/posted/all/successful`;

    return this.http.get<any>(fetchUploadedInvoicesUrl);
  }

  fetchUploadedUnsuccessfulInvoices(): Observable<any> {
    const fetchUploadedUnsuccessfulInvoicesUrl = `${environment.uraUrl}/api/v1/uploadinvoice/posted/all/failed`;

    return this.http.get<any>(fetchUploadedUnsuccessfulInvoicesUrl);
  }

  fetchAllApprovedInvoices(): Observable<any> {
    const fetchAllApprovedInvoicesUrl = `${environment.uraUrl}/api/v1/uploadinvoice/all/approved`;

    return this.http.get<any>(fetchAllApprovedInvoicesUrl);
  }

  fetchAllPendingInvoices(): Observable<any> {
    const fetchAllApprovedInvoicesUrl = `${environment.uraUrl}/api/v1/uploadinvoice/all/pending`;

    return this.http.get<any>(fetchAllApprovedInvoicesUrl);
  }

  fetchAllRejectedInvoices(): Observable<any> {
    const fetchAllApprovedInvoicesUrl = `${environment.uraUrl}/api/v1/uploadinvoice/all/rejected`;

    return this.http.get<any>(fetchAllApprovedInvoicesUrl);
  }

  fetchInvoiceBasicInformationById(invoiceno): Observable<any> {
    const fetchUploadedInvoiceBasicInformationByIdUrl = `${environment.uraUrl}/api/v1/uploadinvoice/posted/basicinfo/${invoiceno}`;

    return this.http.get<any>(fetchUploadedInvoiceBasicInformationByIdUrl, {
      params: { invoiceno: invoiceno },
    });

    //return this.http.put<string>(updateSellerDetailsUrl, basicDetails, { responseType: 'text' as 'json' });
  }

  

  fetchBuyerDetailsByInvoiceId(invoiceno): Observable<any> {
    const fetchBuyerDetailsByInvoiceIdUrl = `${environment.uraUrl}/api/v1/uploadinvoice/posted/buyerdetails/${invoiceno}`;

    return this.http.get<any>(fetchBuyerDetailsByInvoiceIdUrl);
  }
  fetchExtendedDetailsByInvoiceId(invoiceno): Observable<any> {
    const fetchExtendedDetailsByInvoiceIdUrl = `${environment.uraUrl}/api/v1/uploadinvoice/posted/extenddetails/${invoiceno}`;

    return this.http.get<any>(fetchExtendedDetailsByInvoiceIdUrl);
  }
  fetchGoodsDetailsByInvoiceId(invoiceno): Observable<any> {
    const fetchGoodsDetailsByInvoiceIdUrl = `${environment.uraUrl}/api/v1/uploadinvoice/posted/goodsdetails/${invoiceno}`;

    return this.http.get<any>(fetchGoodsDetailsByInvoiceIdUrl);
  }
  uploadInvoice(invoiceLocalNumber, buyerTin): Observable<any> {
    const uploadInvoiceUrl = `${environment.uraUrl}/api/v1/uploadinvoice/now/${invoiceLocalNumber}/${buyerTin}`;

    return this.http.post<any>(uploadInvoiceUrl, {});
  }

  fetchPayWayInfoByInvoiceId(invoiceno): Observable<any> {
    const fetchPayWayInfoByInvoiceIdUrl = `${environment.uraUrl}/api/v1/uploadinvoice/posted/paywaydetails/${invoiceno}`;

    return this.http.get<any>(fetchPayWayInfoByInvoiceIdUrl);
  }


  fetchInvoiceBasicInformationByIdBeforePost(invoiceno): Observable<any[]> {
    const fetchUploadedInvoiceBasicInformationByIdUrl = `${environment.uraUrl}/api/v1/uploadinvoice/beforeposting/basicinfo/${invoiceno}`;

    return this.http.get<any[]>(fetchUploadedInvoiceBasicInformationByIdUrl);
  }

  fetchBuyerDetailsByInvoiceIdBeforePosting(invoiceno): Observable<any> {
    const fetchBuyerDetailsByInvoiceIdUrl = `${environment.uraUrl}/api/v1/uploadinvoice/beforeposting/buyerdetails/${invoiceno}`;

    return this.http.get<any>(fetchBuyerDetailsByInvoiceIdUrl);
  }



  fetchExtendedDetailsByInvoiceIdBeforePosting(invoiceno): Observable<any> {
    const fetchExtendedDetailsByInvoiceIdUrl = `${environment.uraUrl}/api/v1/uploadinvoice/beforeposting/extenddetails/${invoiceno}`;

    return this.http.get<any>(fetchExtendedDetailsByInvoiceIdUrl);
  }


  fetchGoodsDetailsByInvoiceIdBeforePosting(invoiceno): Observable<any> {
    const fetchGoodsDetailsByInvoiceIdUrl = `${environment.uraUrl}/api/v1/uploadinvoice/beforeposting/goodsdetails/${invoiceno}`;

    return this.http.get<any>(fetchGoodsDetailsByInvoiceIdUrl,);
  }

  // /uploadinvoice/beforeposting

  fetchPayWayInfoByInvoiceIdBeforePosting(invoiceno): Observable<any> {
    const fetchPayWayInfoByInvoiceIdUrl = `${environment.uraUrl}/api/v1/uploadinvoice/beforeposting/paywaydetails/${invoiceno}`;

    return this.http.get<any>(fetchPayWayInfoByInvoiceIdUrl);
  }
  fetchSellerDetailsByInvoiceIdBeforePosting(invoiceno): Observable<any> {
    const fetchSellerDetailsByInvoiceIdUrl = `${environment.uraUrl}/api/v1/uploadinvoice/beforeposting/sellerdetails/${invoiceno}`;

    return this.http.get<any>(fetchSellerDetailsByInvoiceIdUrl);
  }
  
  fetchSummaryDetailsByInvoiceIdBeforePosting(invoiceno): Observable<any> {
    const fetchSummaryDetailsByInvoiceIdUrl = `${environment.uraUrl}/api/v1/uploadinvoice/beforeposting/summary/${invoiceno}`;

    return this.http.get<any>(fetchSummaryDetailsByInvoiceIdUrl);
  }
  fetchTaxDetailsByInvoiceIdBeforePosting(invoiceno): Observable<any> {
    const fetchTaxDetailsByInvoiceIdUrl = `${environment.uraUrl}/api/v1/uploadinvoice/beforeposting/taxdetails/${invoiceno}`;

    return this.http.get<any>(fetchTaxDetailsByInvoiceIdUrl);
  }
  fetchImportSellerDetailsByInvoiceIdBeforePosting(invoiceno) {
    const fetchImportSellerDetailsUrl = `${environment.baseUrl}/api/v1/uploadinvoice/beforeposting/importsellerdetails/${invoiceno}`;

    return this.http.get<any>(fetchImportSellerDetailsUrl);
  }


  saveInvoiceDetails(invoice): Observable<any> {
    const saveInvoiceDetailsUrl = `${environment.uraUrl}/api/v1/uploadinvoice/save`;

    return this.http.post<any>(saveInvoiceDetailsUrl, invoice);
  }

  updateInvoiceDetails(invoice) {
    const updateInvoiceDetailsUrl = `${environment.uraUrl}/api/v1/uploadinvoice/update`;

    return this.http.post<any>(updateInvoiceDetailsUrl, invoice);
  }

  fetchSellerDetailsByInvoiceId(invoiceno): Observable<any> {
    const fetchSellerDetailsByInvoiceIdUrl = `${environment.uraUrl}/api/v1/uploadinvoice/posted/sellerdetails/${invoiceno}`;

    return this.http.get<any>(fetchSellerDetailsByInvoiceIdUrl);
  }



  fetchSummaryDetailsByInvoiceId(invoiceno): Observable<any> {
    const fetchSummaryDetailsByInvoiceIdUrl = `${environment.uraUrl}/api/v1/uploadinvoice/posted/summarydetails/${invoiceno}`;

    return this.http.get<any>(fetchSummaryDetailsByInvoiceIdUrl);
  }


  fetchTaxDetailsByInvoiceId(invoiceno): Observable<any> {
    const fetchTaxDetailsByInvoiceIdUrl = `${environment.uraUrl}/api/v1/uploadinvoice/posted/taxdetails/${invoiceno}`;

    return this.http.get<any>(fetchTaxDetailsByInvoiceIdUrl);
  }

 

  fetchBuyerDetails(invoiceno) {
    const fetchBuyerDetailsUrl = `${environment.baseUrl}/api/v1/uploadinvoice/posted/buyerdetails/${invoiceno}`;

    return this.http.get<any>(fetchBuyerDetailsUrl);
  }
  fetchImportSellerDetails(invoiceno) {
    const fetchImportSellerDetailsUrl = `${environment.baseUrl}/api/v1/uploadinvoice/posted/importsellerdetails/${invoiceno}`;

    return this.http.get<any>(fetchImportSellerDetailsUrl);
  }

  verifyInvoice(invoice): Observable<any> {
    const verifyInvoiceUrl = `${environment.uraUrl}/api/v1/uploadinvoice/verify`;

    return this.http.post<any>(verifyInvoiceUrl, invoice);
  }

  fetchNetAmount(invoiceno, buyertin): Observable<any> {
    const fetchNetAmountUrl = `${environment.baseUrl}/api/v1/receivepayment/payableamount/${invoiceno}/${buyertin}`;

    return this.http.get<any>(fetchNetAmountUrl);
  }

  recievePayment(paymentDetails): Observable<any> {
    const verifyInvoiceUrl = `${environment.baseUrl}/api/v1/receivepayment/save`;

    return this.http.post<any>(verifyInvoiceUrl, paymentDetails);
  }

  fetchPaidInvoices(): Observable<any> {
    const fetchPaidInvoicesUrl = `${environment.baseUrl}/api/v1/uploadinvoice/posted/all/successful/fullypaid`;

    return this.http.get<any>(fetchPaidInvoicesUrl);
  }

  retryinvoiceuploadToUra(params) {
    const retryinvoiceuploadToUraUrl = `${environment.baseUrl}/api/v1/uploadinvoice/retry`;

    return this.http.get<any>(retryinvoiceuploadToUraUrl, { params });
  }
}
