import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

import { Tax } from '../types/tax';

@Injectable({
  providedIn: 'root'
})
export class TaxesService {

  constructor(private http: HttpClient) { }

  fetchTaxParameters(): Observable<Tax[]>{
    const accountsUrl = `${environment.baseUrl}/api/v1/tax/all`;

    return this.http.get<Tax[]>(accountsUrl)
  }
}
