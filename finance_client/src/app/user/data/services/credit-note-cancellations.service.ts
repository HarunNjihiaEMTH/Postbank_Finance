import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class CreditNoteCancellationsService {

  constructor(private http: HttpClient) { }

  fetchCreditNoteCancellations(): Observable<any[]>{
    const fetchCreditNoteCancellationsUrl = `${environment.baseUrl}/api/v1/creditnotecancel/cancellations`;

    return this.http.get<any[]>(fetchCreditNoteCancellationsUrl);
  }

  createCreditNoteCancellation(creditNotecancellation): Observable<any>{
    const createCreditNoteCancellationUrl = `${environment.baseUrl}/api/v1/creditnotecancel/create`;

    return this.http.post<any>(createCreditNoteCancellationUrl, creditNotecancellation);
  }

  fetchByCancellationStatus(params): Observable<any>{
    const fetchByCancellationStatusUrl = `${environment.baseUrl}/api/v1/creditnotecancel/getbystatus`;

    return this.http.get<any>(fetchByCancellationStatusUrl, { params});
  }

  fetchCancelledCreditNotes(){
    const fetchCancelledCreditNotesUrl = `${environment.baseUrl}/api/v1/creditnotecancel/cancelledcreditnote`;

    return this.http.get<any>(fetchCancelledCreditNotesUrl);
  }

  fetchFailedCreditNotesCancellation(): Observable<any>{
    const fetchFailedCreditNotesUrl = `${environment.baseUrl}/api/v1/creditnotecancel/failedcancellations`;

    return this.http.get<any>(fetchFailedCreditNotesUrl);
  }

  cancelCreditNote(creditNoteCancellation): Observable<any>{
    const cancelCreditNoteUrl = `${environment.baseUrl}/api/v1/creditnotecancel/postcancellation`;

    return this.http.post<any>(cancelCreditNoteUrl, creditNoteCancellation);
  }

  retryPostingCancellation(creditNoteCancellation, invoiceno){
    const retryPostingCancellationUrl = `${environment.baseUrl}/api/v1/creditnotecancel/retryposting/${invoiceno}`;

    return this.http.post<any>(retryPostingCancellationUrl, creditNoteCancellation);
  }

  verifyCreditNoteCancellation(params): Observable<any>{
    const verifyCreditNoteCancellationUrl = `${environment.baseUrl}/api/v1/creditnotecancel/update/status`;

    return this.http.put<any>(verifyCreditNoteCancellationUrl, {}, { params });
  }

  updateCreditNoteCancellation(creditNoteCancellation): Observable<any>{
    const updateCreditNoteCancellationUrl = `${environment.baseUrl}/api/v1/creditnotecancel/updatecreditnote`;

    return this.http.put<any>(updateCreditNoteCancellationUrl, creditNoteCancellation);
  }
}
