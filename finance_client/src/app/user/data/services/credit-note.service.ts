import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class CreditNoteService {

  constructor(private http: HttpClient) { }

  saveCreditNoteDetails(creditNote): Observable<any> {
    const saveCreditNoteDetailsUrl = `${environment.baseUrl}/api/v1/creditnote/save`;

    return this.http.post<any>(saveCreditNoteDetailsUrl, creditNote);
  }

  fetchCreditNotes(): Observable<any[]> {
    const fetchCreditNotesUrl = `${environment.baseUrl}/api/v1/creditnote/get`;

    return this.http.get<any[]>(fetchCreditNotesUrl);
  }

  fetchFailedCreditNotes(){
    const fetchFailedCreditNotesUrl = `${environment.baseUrl}/api/v1/creditnote/failed`;

    return this.http.get<any[]>(fetchFailedCreditNotesUrl);
  }

  fetchSuccessfulCreditNotes(){
    const fetchSuccessfulCreditNotesUrl = `${environment.baseUrl}/api/v1/creditnote/successful`;

    return this.http.get<any[]>(fetchSuccessfulCreditNotesUrl);
  }

  fetchCreditNotesByStatus(status): Observable<any[]>{
    const fetchCreditNotesByStatusUrl = `${environment.baseUrl}/api/v1/creditnote/successful`;

    return this.http.put<any[]>(fetchCreditNotesByStatusUrl, status);
  }

  postToURA(invoiceno): Observable<any> {
    const postToURAUrl = `${environment.baseUrl}/api/v1/creditnote/post`;

    return this.http.get<any>(postToURAUrl, { params: { invoiceNo: invoiceno } });
  }

  retryPostToURA(invoiceno): Observable<any> {
    const retryPostToURAUrl = `${environment.baseUrl}/api/v1/creditnote/retry/${invoiceno}`;

    return this.http.get<any>(retryPostToURAUrl);
  }

  updateCreditNote(creditNote): Observable<any> {
    const updateCreditNoteUrl = `${environment.baseUrl}/api/v1/creditnote/update`;

    return this.http.put<any>(updateCreditNoteUrl, creditNote);
  }

  verifyCreditNote(params): Observable<any>{
    const verifyCreditNoteUrl = `${environment.baseUrl}/api/v1/creditnote/update/status`;

    return this.http.put<any>(verifyCreditNoteUrl, {}, { params });
  }

}
