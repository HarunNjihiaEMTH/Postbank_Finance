import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Invoice } from '../../data/types/customer-types/invoice';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  fetchCurrencyCodes(): Observable<Invoice[]> {
    const currencyCodesUrl = `${environment.serverAPI}/api/v1/crncycodes/all`;

    return this.http.get<Invoice[]>(currencyCodesUrl);
  }
}
