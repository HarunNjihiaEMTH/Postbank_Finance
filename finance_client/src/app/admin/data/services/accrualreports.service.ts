import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class AccrualReportsService {

  constructor(private http: HttpClient) { }

  generateGeneralAccrualStatusPdfReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", "application/pdf");

    let requestOptions: any = {
      params: params,
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
    let API_URL = `${environment.baseUrl}/api/v1/reports/acrualpayments/all`;

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
  generateGeneralAccrualStatusExcelReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/octet-stream');
    let requestOptions: any = { params: params, headers: headers, responseType: 'blob', withCredentials: false };
    let API_URL = `${environment.baseUrl}/api/v1/reports/acrualpayments/all/excel`;
    return this.http.get(API_URL, requestOptions)
      .pipe(map((response) => {
        return {
          data: new Blob([response], { type: 'octet/stream' })
        };
      }));
  }



  generateSupplierAccrualRecordPdfReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", "application/pdf");

    let requestOptions: any = {
      params: params,
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
    let API_URL = `${environment.baseUrl}/api/v1/reports/acrualpayments/supplier`;

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


  generateSupplierAccrualRecordExcelReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/octet-stream');
    let requestOptions: any = { params: params, headers: headers, responseType: 'blob', withCredentials: false };
    let API_URL = `${environment.baseUrl}/api/v1/reports/acrualpayments/supplier/excel`;
    return this.http.get(API_URL, requestOptions)
      .pipe(map((response) => {
        return {
          data: new Blob([response], { type: 'octet/stream' })
        };
      }));
  }
  

 


}