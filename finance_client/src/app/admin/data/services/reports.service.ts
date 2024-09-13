import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http: HttpClient) { }

  generateGeneralVatRecievedPdfReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", "application/pdf");

    let requestOptions: any = {
      params: params,
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
    let API_URL = `${environment.baseUrl}/api/v1/reports/transactions/vat/recieved`;

    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        console.log("Hey this is general vat recieved", response);
        return {
          filename: "Report",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );
  }

  generateGeneralVatRecievedExcelReport(params: any): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/*****************/`,
      {
        params,
        responseType: "text",
      }
    );
  }


  generateStatusPdfReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", "application/pdf");

    let requestOptions: any = {
      params: params,
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
    let API_URL = `${environment.baseUrl}/api/v1/reports/suppliers/per/status/`;

    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        console.log("Hey this is status file", response);
        return {
          filename: "Report",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );
  }

  generateStatusExcelReport(params: any): Observable<any> {
    return this.http.get(
      `http://192.168.100.56:9001/swagger-ui/#/excel-generator/exportToExcelUsingGET`,
      {
        params,
        responseType: "text",
      }
    );
  }


  generatePOSupplierPdfReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", "application/pdf");

    let requestOptions: any = {
      params: params,
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
    let API_URL = `${environment.baseUrl}/api/v1/reports/po/per/supplier/`;

    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        console.log("Hey this is status file", response);
        return {
          filename: "Report",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );
  }

  generatePOSupplierExcelReport(params: any): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/emtsoa/pbu/reports/generate/department/`,
      {
        params,
        responseType: "text",
      }
    );
  }


  generateVatWithPdfReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", "application/pdf");

    let requestOptions: any = {
      params: params,
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
    let API_URL = `${environment.baseUrl}/api/v1/reports/transactions/vat/paid`;

    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        console.log("Hey this is VAT withholding", response);
        return {
          filename: "Report",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );
  }
  generateVatWithExcelReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/octet-stream');
    let requestOptions: any = { params: params, headers: headers, responseType: 'blob', withCredentials: false };
    let API_URL = `${environment.baseUrl}/api/v1/reports/transactions/vat/paid/excel`;
    return this.http.get(API_URL, requestOptions)
      .pipe(map((response) => {
        return {
          data: new Blob([response], { type: 'octet/stream' })
        };
      }));
  }

  
  generateIncomeWithPdfReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", "application/pdf");

    let requestOptions: any = {
      params: params,
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
    let API_URL = `${environment.baseUrl}/api/v1/reports/po/per/vatwthcolected/`;

    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        console.log("Hey this is Income withholding", response);
        return {
          filename: "Report",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );
  }

  generateIncomeWithExcelReport(params: any): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/emtsoa/pbu/reports/generate/department/`,
      {
        params,
        responseType: "text",
      }
    );
  }

  // ********************************************************************************************
  // Edit these endpoints




  


  

  generateVatRecievedPdfReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", "application/pdf");

    let requestOptions: any = {
      params: params,
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
    let API_URL = `${environment.baseUrl}/api/v1/reports/transactions/vat/recieved`;

    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        console.log("Hey this is VAT recieved", response);
        return {
          filename: "Report",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );
  }

  generateVatRecievedExcelReport(params: any): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/*****************/`,
      {
        params,
        responseType: "text",
      }
    );
  }


  generateIncomeWHRecievedPdfReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", "application/pdf");

    let requestOptions: any = {
      params: params,
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
    let API_URL = `${environment.baseUrl}/*****************/`;

    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        console.log("Hey this is Income withholding recieved", response);
        return {
          filename: "Report",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );
  }

  generateIncomeWHRecievedExcelReport(params: any): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/*****************/`,
      {
        params,
        responseType: "text",
      }
    );
  }





  

  //********************************************************************************************************* */
  //  General Income VAT

  

  generateGeneralIncomeVatRecievedPdfReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", "application/pdf");

    let requestOptions: any = {
      params: params,
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
    let API_URL = `${environment.baseUrl}/*******Recieved Not ready*********/`;

    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        console.log("Hey this is gen income recieved", response);
        return {
          filename: "Report",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );
  }

 

  
 


 

 



  generateGeneralIncomeVatRecievedExcelReport(params: any): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/*****************/`,
      {
        params,
        responseType: "text",
      }
    );
  }

  // *************************************************************************************************
  //  General Payments/Statements




  generateGeneralPaymentsFromPdfReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", "application/pdf");

    let requestOptions: any = {
      params: params,
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
    let API_URL = `${environment.baseUrl}/api/v1/reports/general/customer/payments`;

    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        console.log("Hey this is gen payments from", response);
        return {
          filename: "Report",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );
  }

  generateGeneralPaymentsFromExcelReport(params: any): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/*****************/`,
      {
        params,
        responseType: "text",
      }
    );
  }

  generateGeneralStatementsPdfReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", "application/pdf");

    let requestOptions: any = {
      params: params,
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
    let API_URL = `${environment.baseUrl}/api/v1/reports/transactions/per/supplier/`;

    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        console.log("Hey this is gen statements", response);
        return {
          filename: "Report",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );
  }

  generateGeneralStatementsExcelReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/octet-stream');
    let requestOptions: any = { params: params, headers: headers, responseType: 'blob', withCredentials: false };
    let API_URL = `${environment.baseUrl}/api/v1/reports/transactions/per/supplier/excel/`;
    return this.http.get(API_URL, requestOptions)
      .pipe(map((response) => {
        return {
          data: new Blob([response], { type: 'octet/stream' })
        };
      }));
  }










  generatePosPerSupplierPdfReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", "application/pdf");

    let requestOptions: any = {
      params: params,
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
    let API_URL = `${environment.baseUrl}/api/v1/reports/po/per/supplier/`;

    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        console.log("Hey this is payments recieved", response);
        return {
          filename: "Report",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );
  }

  generatePosPerSupplierExcelReport(params: any): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/*****************/`,
      {
        params,
        responseType: "text",
      }
    );
  }


  


  

  generatePdfAccrualVatPerSupplierReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", "application/pdf");

    let requestOptions: any = {
      params: params,
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
    let API_URL = `${environment.baseUrl}/api/v1/reports/accruals/vatpaid/supplier/`;

    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        console.log("Hey this is gen payments from", response);
        return {
          filename: "Report",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );
  }

  generateExcelAccrualVatPerSupplierReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/octet-stream');
    let requestOptions: any = { params: params, headers: headers, responseType: 'blob', withCredentials: false };
    let API_URL = `${environment.baseUrl}/api/v1/reports/accruals/vatpaid/supplier/excel`;
    return this.http.get(API_URL, requestOptions)
      .pipe(map((response) => {
        return {
          data: new Blob([response], { type: 'octet/stream' })
        };
      }));
  }


















//**************************************************************************************************************************************** */
  //Purchase Order Module Reports
  generateGeneralPaymentsToPdfReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", "application/pdf");
    let requestOptions: any = {
      params: params,
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
    let API_URL = `${environment.baseUrl}/api/v1/reports/general/paymentstosuppliers`;
    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        console.log("Hey this is gen payments", response);
        return {
          filename: "Report",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );
  }
  generateGeneralPaymentsToExcelReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/octet-stream');
    let requestOptions: any = { params: params, headers: headers, responseType: 'blob', withCredentials: false };
    let API_URL = `${environment.baseUrl}/api/v1/reports/general/paymentstosuppliers/excel`;
    return this.http.get(API_URL, requestOptions)
      .pipe(map((response) => {
        return {
          data: new Blob([response], { type: 'octet/stream' })
        };
      }));
  }
  generatePaymentsDonePdfReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", "application/pdf");

    let requestOptions: any = {
      params: params,
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
    let API_URL = `${environment.baseUrl}/api/v1/reports/general/paymentsbystatus`;

    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        console.log("Hey this is payments done by status", response);
        return {
          filename: "Report",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );
  }
  generatePaymentsDoneExcelReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/octet-stream');
    let requestOptions: any = { headers: headers, responseType: 'blob', withCredentials: false };
    let API_URL = `${environment.baseUrl}/api/v1/reports/general/paymentsbystatus/excel`;
    return this.http.get(API_URL, requestOptions)
      .pipe(map((response) => {
        return {
          data: new Blob([response], { type: 'octet/stream' })
        };
      }));
  }
  generateSupplierStatementPdfReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", "application/pdf");

    let requestOptions: any = {
      params: params,
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
    let API_URL = `${environment.baseUrl}/api/v1/reports/general/supplierstatement`;

    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        console.log("Supplier statement report", response);
        return {
          filename: "Report",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );

    
  }
  generateSupplierStatementExcelReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/octet-stream');
    let requestOptions: any = { params: params, headers: headers, responseType: 'blob', withCredentials: false };
    let API_URL = `${environment.baseUrl}/api/v1/reports/general/supplierstatement/excel`;
    return this.http.get(API_URL, requestOptions)
      .pipe(map((response) => {
        return {
          data: new Blob([response], { type: 'octet/stream' })
        };
      }));
  }

   
  generatePoPerSupplierPdfReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", "application/pdf");

    let requestOptions: any = {
      params: params,
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
    let API_URL = `${environment.baseUrl}/api/v1/reports/general/po/per/supplier`;

    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        console.log("Hey this is PO supplier report", response);
        return {
          filename: "Report",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );
  }
  generatePoPerSupplierExcelReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/octet-stream');
    let requestOptions: any = { params: params, headers: headers, responseType: 'blob', withCredentials: false };
    let API_URL = `${environment.baseUrl}/api/v1/reports/general/po/per/supplier/excel`;
    return this.http.get(API_URL, requestOptions)
      .pipe(map((response) => {
        return {
          data: new Blob([response], { type: 'octet/stream' })
        };
      }));
  }
  generateGeneralPaymentStatusPdfReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", "application/pdf");

    let requestOptions: any = {
      params: params,
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
    let API_URL = `${environment.baseUrl}/api/v1/reports/general/paymentsbystatus`;

    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        console.log("Hey this is gen payments from", response);
        return {
          filename: "Report",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );
  }
  generateGeneralPaymentStatusExcelReport(): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/octet-stream');
    let requestOptions: any = { headers: headers, responseType: 'blob', withCredentials: false };
    let API_URL = `${environment.baseUrl}/api/v1/reports/general/paymentsbystatus/excel`;
    return this.http.get(API_URL, requestOptions)
      .pipe(map((response) => {
        return {
          data: new Blob([response], { type: 'octet/stream' })
        };
      }));
  }
  generateGeneralPOsPdfReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", "application/pdf");

    let requestOptions: any = {
      params: params,
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
    let API_URL = `${environment.baseUrl}/api/v1/reports/general/purchaseorders`;

    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        console.log("Hey this is gen payments from", response);
        return {
          filename: "Report",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );
  }
  
  generateGeneralPOsExcelReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/octet-stream');
    let requestOptions: any = { params: params, headers: headers, responseType: 'blob', withCredentials: false };
    let API_URL = `${environment.baseUrl}/api/v1/reports/general/purchaseorders/excel`;
    return this.http.get(API_URL, requestOptions)
      .pipe(map((response) => {
        return {
          data: new Blob([response], { type: 'octet/stream' })
        };
      }));
  }

  //********************************************************************************************************* */
  //  VAT WH Reports
  generateGeneralVatPaidPdfReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", "application/pdf");

    let requestOptions: any = {
      params: params,
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
    let API_URL = `${environment.baseUrl}/api/v1/reports/vat/paid`;

    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        console.log("Hey this is general VAT paid", response);
        return {
          filename: "Report",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );
  }
  generateGeneralVatPaidExcelReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/octet-stream');
    let requestOptions: any = { params: params, headers: headers, responseType: 'blob', withCredentials: false };
    let API_URL = `${environment.baseUrl}/api/v1/reports/vat/paid/excel`;
    return this.http.get(API_URL, requestOptions)
      .pipe(map((response) => {
        return {
          data: new Blob([response], { type: 'octet/stream' })
        };
      }));
  }
  generateGeneralVatLocalPdfReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", "application/pdf");

    let requestOptions: any = {
      params: params,
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
    let API_URL = `${environment.baseUrl}/api/v1/reports/vat/per/productType/`;

    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        console.log("Hey this is gen income recieved", response);
        return {
          filename: "Report",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );
  }
  generateGeneralVatLocalExcelReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/octet-stream');
    let requestOptions: any = { params: params, headers: headers, responseType: 'blob', withCredentials: false };
    let API_URL = `${environment.baseUrl}/api/v1/reports/vat/per/productType/excel`;
    return this.http.get(API_URL, requestOptions)
      .pipe(map((response) => {
        return {
          data: new Blob([response], { type: 'octet/stream' })
        };
      }));
  }
  generateGeneralVatImportsPdfReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", "application/pdf");

    let requestOptions: any = {
      params: params,
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
    let API_URL = `${environment.baseUrl}/api/v1/reports/vat/per/productType/`;

    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        console.log("Hey this is gen income recieved", response);
        return {
          filename: "Report",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );
  }
  generateGeneralVatImportsExcelReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/octet-stream');
    let requestOptions: any = { params: params, headers: headers, responseType: 'blob', withCredentials: false };
    let API_URL = `${environment.baseUrl}/api/v1/reports/vat/per/productType/excel`;
    return this.http.get(API_URL, requestOptions)
      .pipe(map((response) => {
        return {
          data: new Blob([response], { type: 'octet/stream' })
        };
      }));
  }
  generateVatPaidPdfReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", "application/pdf");

    let requestOptions: any = {
      params: params,
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
    let API_URL = `${environment.baseUrl}/api/v1/reports/vat/per/supplier`;

    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        console.log("Hey this is VAT paid per supplier", response);
        return {
          filename: "Report",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );
  }
  generateVatPaidExcelReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/octet-stream');
    let requestOptions: any = { params: params, headers: headers, responseType: 'blob', withCredentials: false };
    let API_URL = `${environment.baseUrl}/api/v1/reports/vat/per/supplier/excel`;
    return this.http.get(API_URL, requestOptions)
      .pipe(map((response) => {
        return {
          data: new Blob([response], { type: 'octet/stream' })
        };
      }));
  }
   //********************************************************************************************************* */
  //  Income WH Reports
  generateGeneralIncomeVatPaidPdfReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", "application/pdf");

    let requestOptions: any = {
      params: params,
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
    let API_URL = `${environment.baseUrl}/api/v1/reports/iwt/paid`;

    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        console.log("Hey this is general income vat paid", response);
        return {
          filename: "Report",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );
  }
  generateGeneralIncomeVatPaidExcelReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/octet-stream');
    let requestOptions: any = { params: params, headers: headers, responseType: 'blob', withCredentials: false };
    let API_URL = `${environment.baseUrl}/api/v1/reports/iwt/paid/excel`;
    return this.http.get(API_URL, requestOptions)
      .pipe(map((response) => {
        return {
          data: new Blob([response], { type: 'octet/stream' })
        };
      }));
  }
  generateGeneralInVatLocalPdfReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", "application/pdf");

    let requestOptions: any = {
      params: params,
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
    let API_URL = `${environment.baseUrl}/api/v1/reports/iwt/per/productType/`;

    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        console.log("Hey this is gen income recieved", response);
        return {
          filename: "Report",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );
  }
  generateGeneralInVatLocalExcelReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/octet-stream');
    let requestOptions: any = { params: params, headers: headers, responseType: 'blob', withCredentials: false };
    let API_URL = `${environment.baseUrl}/api/v1/reports/iwt/per/productType/excel`;
    return this.http.get(API_URL, requestOptions)
      .pipe(map((response) => {
        return {
          data: new Blob([response], { type: 'octet/stream' })
        };
      }));
  }
  generateIncomeWHPaidPdfReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", "application/pdf");

    let requestOptions: any = {
      params: params,
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
    let API_URL = `${environment.baseUrl}/api/v1/reports/iwt/per/supplier`;

    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        console.log("Hey this is Income withholding paid", response);
        return {
          filename: "Report",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );
  }
  generateIncomeWHPaidExcelReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/octet-stream');
    let requestOptions: any = { params: params, headers: headers, responseType: 'blob', withCredentials: false };
    let API_URL = `${environment.baseUrl}/api/v1/reports/iwt/per/supplier/excel`;
    return this.http.get(API_URL, requestOptions)
      .pipe(map((response) => {
        return {
          data: new Blob([response], { type: 'octet/stream' })
        };
      }));
  }
  generateGeneralInVatImportsPdfReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", "application/pdf");

    let requestOptions: any = {
      params: params,
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
    let API_URL = `${environment.baseUrl}/api/v1/reports/iwt/per/productType/`;

    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        console.log("Hey this is gen income recieved", response);
        return {
          filename: "Report",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );
  }
  generateGeneralInVatImportsExcelReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/octet-stream');
    let requestOptions: any = { params: params, headers: headers, responseType: 'blob', withCredentials: false };
    let API_URL = `${environment.baseUrl}/api/v1/reports/iwt/per/productType/excel`;
    return this.http.get(API_URL, requestOptions)
      .pipe(map((response) => {
        return {
          data: new Blob([response], { type: 'octet/stream' })
        };
      }));
  }
//********************************************************************************************************* */
  //  Incoices/Payments Reports
  generateSuccessfulInvoicesPdfReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", "application/pdf");
    let requestOptions: any = {
      params: params,
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
    let API_URL = `${environment.baseUrl}/api/v1/reports/invoices/successfull`;
    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        console.log("Hey this is gen payments", response);
        return {
          filename: "Report",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );
  }
  generateSuccessfulInvoicesExcelReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/octet-stream');
    let requestOptions: any = { params: params, headers: headers, responseType: 'blob', withCredentials: false };
    let API_URL = `${environment.baseUrl}/api/v1/reports/invoices/successfull/excel`;
    return this.http.get(API_URL, requestOptions)
      .pipe(map((response) => {
        return {
          data: new Blob([response], { type: 'octet/stream' })
        };
      }));
  }
  generateFailedInvoicesPdfReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", "application/pdf");
    let requestOptions: any = {
      params: params,
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
    let API_URL = `${environment.baseUrl}/api/v1/reports/invoices/failed`;
    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        console.log("Hey this is gen payments", response);
        return {
          filename: "Report",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );
  }
  generateFailedInvoicesExcelReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/octet-stream');
    let requestOptions: any = { params: params, headers: headers, responseType: 'blob', withCredentials: false };
    let API_URL = `${environment.baseUrl}/api/v1/reports/invoices/failed/excel`;
    return this.http.get(API_URL, requestOptions)
      .pipe(map((response) => {
        return {
          data: new Blob([response], { type: 'octet/stream' })
        };
      }));
  }

  generateSuccessfulCreditNotesPdfReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", "application/pdf");
    let requestOptions: any = {
      params: params,
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
    let API_URL = `${environment.baseUrl}/api/v1/reports/creditnote/successfull`;
    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        console.log("Hey this is gen payments", response);
        return {
          filename: "Report",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );
  }
  generateSuccessfulCreditNotesExcelReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/octet-stream');
    let requestOptions: any = { params: params, headers: headers, responseType: 'blob', withCredentials: false };
    let API_URL = `${environment.baseUrl}/api/v1/reports/creditnote/successfull/excel`;
    return this.http.get(API_URL, requestOptions)
      .pipe(map((response) => {
        return {
          data: new Blob([response], { type: 'octet/stream' })
        };
      }));
  }
  generateFailedCreditNotesPdfReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", "application/pdf");
    let requestOptions: any = {
      params: params,
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
    let API_URL = `${environment.baseUrl}/api/v1/reports/creditnote/failed`;
    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        console.log("Hey this is gen payments", response);
        return {
          filename: "Report",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );
  }
  generateFailedCreditNotesExcelReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/octet-stream');
    let requestOptions: any = { params: params, headers: headers, responseType: 'blob', withCredentials: false };
    let API_URL = `${environment.baseUrl}/api/v1/reports/creditnote/failed/excel`;
    return this.http.get(API_URL, requestOptions)
      .pipe(map((response) => {
        return {
          data: new Blob([response], { type: 'octet/stream' })
        };
      }));
  }
//  Incoices/Payments Per Customer Reports

generateCustomerSuccessfulInvoicesPdfReport(params: any): Observable<any> {
  let headers = new HttpHeaders();
  headers.append("Accept", "application/pdf");
  let requestOptions: any = {
    params: params,
    headers: headers,
    responseType: "blob",
    withCredentials: false,
  };
  let API_URL = `${environment.baseUrl}/api/v1/reports/invoices/successfull/per/customer`;
  return this.http.get(API_URL, requestOptions).pipe(
    map((response) => {
      console.log("Hey this is gen payments", response);
      return {
        filename: "Report",
        data: new Blob([response], { type: "application/pdf" }),
      };
    })
  );
}
generateCustomerSuccessfulInvoicesExcelReport(params: any): Observable<any> {
  let headers = new HttpHeaders();
  headers.append('Accept', 'application/octet-stream');
  let requestOptions: any = { params: params, headers: headers, responseType: 'blob', withCredentials: false };
  let API_URL = `${environment.baseUrl}/api/v1/reports/invoices/successfull/per/customer/excel`;
  return this.http.get(API_URL, requestOptions)
    .pipe(map((response) => {
      return {
        data: new Blob([response], { type: 'octet/stream' })
      };
    }));
}
generateCustomerFailedInvoicesPdfReport(params: any): Observable<any> {
  let headers = new HttpHeaders();
  headers.append("Accept", "application/pdf");
  let requestOptions: any = {
    params: params,
    headers: headers,
    responseType: "blob",
    withCredentials: false,
  };
  let API_URL = `${environment.baseUrl}/api/v1/reports/invoices/failed/per/customer`;
  return this.http.get(API_URL, requestOptions).pipe(
    map((response) => {
      console.log("Hey this is gen payments", response);
      return {
        filename: "Report",
        data: new Blob([response], { type: "application/pdf" }),
      };
    })
  );
}
generateCustomerFailedInvoicesExcelReport(params: any): Observable<any> {
  let headers = new HttpHeaders();
  headers.append('Accept', 'application/octet-stream');
  let requestOptions: any = { params: params, headers: headers, responseType: 'blob', withCredentials: false };
  let API_URL = `${environment.baseUrl}/api/v1/reports/invoices/failed/per/customer/excel`;
  return this.http.get(API_URL, requestOptions)
    .pipe(map((response) => {
      return {
        data: new Blob([response], { type: 'octet/stream' })
      };
    }));
}
generateCustomerSuccessfulCreditNotesPdfReport(params: any): Observable<any> {
  let headers = new HttpHeaders();
  headers.append("Accept", "application/pdf");
  let requestOptions: any = {
    params: params,
    headers: headers,
    responseType: "blob",
    withCredentials: false,
  };
  let API_URL = `${environment.baseUrl}/api/v1/reports/creditnote/successfull/per/customer`;
  return this.http.get(API_URL, requestOptions).pipe(
    map((response) => {
      console.log("Hey this is gen payments", response);
      return {
        filename: "Report",
        data: new Blob([response], { type: "application/pdf" }),
      };
    })
  );
}
generateCustomerSuccessfulCreditNotesExcelReport(params: any): Observable<any> {
  let headers = new HttpHeaders();
  headers.append('Accept', 'application/octet-stream');
  let requestOptions: any = { params: params, headers: headers, responseType: 'blob', withCredentials: false };
  let API_URL = `${environment.baseUrl}/api/v1/reports/creditnote/successfull/per/customer/excel`;
  return this.http.get(API_URL, requestOptions)
    .pipe(map((response) => {
      return {
        data: new Blob([response], { type: 'octet/stream' })
      };
    }));
}
generateCustomerFailedCreditNotesPdfReport(params: any): Observable<any> {
  let headers = new HttpHeaders();
  headers.append("Accept", "application/pdf");
  let requestOptions: any = {
    params: params,
    headers: headers,
    responseType: "blob",
    withCredentials: false,
  };
  let API_URL = `${environment.baseUrl}/api/v1/reports/creditnote/failed/per/customer`;
  return this.http.get(API_URL, requestOptions).pipe(
    map((response) => {
      console.log("Hey this is gen payments", response);
      return {
        filename: "Report",
        data: new Blob([response], { type: "application/pdf" }),
      };
    })
  );
}
generateCustomerFailedCreditNotesExcelReport(params: any): Observable<any> {
  let headers = new HttpHeaders();
  headers.append('Accept', 'application/octet-stream');
  let requestOptions: any = { params: params, headers: headers, responseType: 'blob', withCredentials: false };
  let API_URL = `${environment.baseUrl}/api/v1/reports/creditnote/failed/per/customer/excel`;
  return this.http.get(API_URL, requestOptions)
    .pipe(map((response) => {
      return {
        data: new Blob([response], { type: 'octet/stream' })
      };
    }));
}


// ***********************************************************************************************************************
//Direct Transactions
generateDirectTransactionPdfReport(params: any): Observable<any> {
  let headers = new HttpHeaders();
  headers.append("Accept", "application/pdf");

  let requestOptions: any = {
    params: params,
    headers: headers,
    responseType: "blob",
    withCredentials: false,
  };
  let API_URL = `${environment.baseUrl}/api/v1/reports/directtransfer/all`;

  return this.http.get(API_URL, requestOptions).pipe(
    map((response) => {
      console.log("Hey this is status file", response);
      return {
        filename: "DirectTransactionPdfReport",
        data: new Blob([response], { type: "application/pdf" }),
      };
    })
  );
}

generateDirectTransactionExcelReport(params: any): Observable<any> {
  let headers = new HttpHeaders();
  headers.append('Accept', 'application/octet-stream');
  let requestOptions: any = { params: params, headers: headers, responseType: 'blob', withCredentials: false };
  let API_URL = `${environment.baseUrl}/api/v1/reports/directtransfer/all/excel`;
  return this.http.get(API_URL, requestOptions)
    .pipe(map((response) => {
      return {
        data: new Blob([response], { type: 'octet/stream' }),
        fileName: `DirectTransactionExcelReport.xlsx`
      };
    }));
}

}
