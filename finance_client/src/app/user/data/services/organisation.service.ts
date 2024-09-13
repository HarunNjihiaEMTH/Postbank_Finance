import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Organisation } from '../types/organisation';

@Injectable({
  providedIn: 'root'
})
export class OrganisationService {

  constructor(private http: HttpClient) { }

  getOrganisationDetails(): Observable<Organisation[]>{
    const organisationDetailsUrl = `${environment.baseUrl}/api/v1/organisation/all`;

    return this.http.get<Organisation[]>(organisationDetailsUrl);
  }
}
