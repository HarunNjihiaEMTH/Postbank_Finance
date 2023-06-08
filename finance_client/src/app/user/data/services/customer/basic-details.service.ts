import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class BasicDetailsService {

  constructor(private http: HttpClient) { }

  deleteBasicDetails(id): Observable<any>{
    const deleteBasicDetailsUrl = `${environment.baseUrl}/api/v1/basicdetails/`;

    return this.http.delete<any>(deleteBasicDetailsUrl, { params: {id: id}})
  }

  addBasicDetails(basicDetails): Observable<any>{
    const addBasicDetailssUrl = `${environment.baseUrl}/api/v1/basicdetails/add`;

    return this.http.post<any>(addBasicDetailssUrl, basicDetails)
  }

  fetchBasicDetails(): Observable<any>{
    const fetchBasicDetailsUrl = `${environment.baseUrl}/api/v1/basicdetails/all`;

    return this.http.get<any>(fetchBasicDetailsUrl)
  }

  fetchBasicDetailsById(id): Observable<any>{
    const fetchBasicDetailsByIdUrl = `${environment.baseUrl}/api/v1/basicdetails/fetchbyid/`;

    return this.http.get<any>(fetchBasicDetailsByIdUrl, { params: {id: id}})
  }

  updateBasicDetails(basicDetails): Observable<any>{
    const updateBasicDetailsUrl = `${environment.baseUrl}/api/v1/basicdetails/update`;

    return this.http.put<any>(updateBasicDetailsUrl, basicDetails)
  }

}
