import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class SellerDetailsService {

  constructor(private http: HttpClient) { }

  fetchSellerDetails(): Observable<any>{
    const fetchSellerDetailsUrl = `${environment.baseUrl}/api/v1/sellerdetails/all`;

    return this.http.get<any>(fetchSellerDetailsUrl)
  }

  fetchSellerDetailsById(id): Observable<any>{
    const fetchSellerDetailsByIdUrl = `${environment.baseUrl}/api/v1/sellerdetails/fetchbyid/`;

    return this.http.get<any>(fetchSellerDetailsByIdUrl, { params: { id: id }})
  }

  // updateSellerDetails(sellerDetails): Observable<any>{
  //   const  updateSellerDetailsUrl = `${environment.baseUrl}/api/v1/sellerdetails/update`;

  //   return this.http.put<any>(updateSellerDetailsUrl, sellerDetails)
  // }

  updateSellerDetails(sellerDetails): Observable<string> {
    const  updateSellerDetailsUrl = `${environment.baseUrl}/api/v1/sellerdetails/update`;
    return this.http.put<string>(updateSellerDetailsUrl, sellerDetails, { responseType: 'text' as 'json' });
  }
  

  addSellerDetails(seller): Observable<any>{
    const  addSellerDetailsUrl = `${environment.baseUrl}/api/v1/sellerdetails/add`;

    return this.http.post<any>(addSellerDetailsUrl, seller)
  }

  deleteSelleDetails(sellerId): Observable<any>{
    const  deleteSelleDetailsUrl = `${environment.baseUrl}/api/v1/sellerdetails/`;

    return this.http.delete<any>(deleteSelleDetailsUrl, { params: { id: sellerId }})
  }

  fetchBasicDetails(): Observable<any>{
    const ffetchBasicDetailsUrl = `${environment.baseUrl}/api/v1/basicdetails/all`;

    return this.http.get<any>(ffetchBasicDetailsUrl)
  }

  fetchBasicDetailsById(id): Observable<any>{
    const fetchBasicDetailsByIdUrl = `${environment.baseUrl}/api/v1/basicdetails/fetchbyid/`;

    return this.http.get<any>(fetchBasicDetailsByIdUrl, { params: { id: id }})
  }



  // updateBasicDetails(basicDetails): Observable<{ message: string }> {
  //   const updateBillUrl = `${environment.baseUrl}/api/v1/basicdetails/update`;

  //   return this.http.put<{ message: string }>(updateBillUrl, basicDetails)
  // }
  updateBasicDetails(basicDetails): Observable<string> {
    const  updateSellerDetailsUrl = `${environment.baseUrl}/api/v1/basicdetails/update`;
    return this.http.put<string>(updateSellerDetailsUrl, basicDetails, { responseType: 'text' as 'json' });
  }

  addBasicDetails(seller): Observable<any>{
    const  addBasicDetailsUrl = `${environment.baseUrl}/api/v1/basicdetails/add`;

    return this.http.post<any>(addBasicDetailsUrl, seller)
  }

  deleteBasicDetails(sellerId): Observable<any>{
    const deleteBasicDetailsUrl = `${environment.baseUrl}/api/v1/basicdetails/`;

    return this.http.delete<any>(deleteBasicDetailsUrl, { params: { id: sellerId }})
  }


}
