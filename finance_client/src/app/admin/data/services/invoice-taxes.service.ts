import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class InvoiceTaxesService {

  constructor(private http: HttpClient) { }

  addTax(category): Observable<any>{
    const addTaxUrl = `${environment.baseUrl}/api/v1/taxcategories/add`;

    return this.http.post<any>(addTaxUrl, category);
  }

  listAllTaxCategory(): Observable<any[]>{
    const listAllTaxCategoryUrl = `${environment.baseUrl}/api/v1/taxcategories/fetchalltaxes`;

    return this.http.get<any[]>(listAllTaxCategoryUrl)
  }

   deleteTaxCategory(id): Observable<any>{
    const deleteTaxCategoryUrl = `${environment.baseUrl}/api/v1/taxcategories/deletetax/${id}`;

    return this.http.delete<any>(deleteTaxCategoryUrl)
  }

  fetchAllTaxes(): Observable<any[]>{
    const fetchAllTaxesUrl = `${environment.baseUrl}/api/v1/taxcategories/all`;

    return this.http.get<any[]>(fetchAllTaxesUrl)
  }

   fetchTaxById(id): Observable<any>{
    const fetchTaxByIdUrl = `${environment.baseUrl}/api/v1/taxcategories/fetchbyid/${id}`;

    return this.http.get<any>(fetchTaxByIdUrl)
  }

  updateTaxInfo(tax): Observable<any>{
    const updateTaxInfoUrl = `${environment.baseUrl}/api/v1/taxcategories/updatetaxes`;

    return this.http.put<any>(updateTaxInfoUrl, tax)
  }
 
}
