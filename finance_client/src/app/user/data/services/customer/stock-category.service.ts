import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

import { StockCategory } from '../../types/customer-types/stock-category';

@Injectable({
  providedIn: 'root'
})
export class StockCategoryService {

  constructor(private http: HttpClient) { }

  addStockCategory(category): Observable<any>{
    const addStockCategoryrUrl = `${environment.baseUrl}/api/v1/stockcategory/add`;

    return this.http.post<any>(addStockCategoryrUrl, category);
  }

  getAllStockCategories(): Observable<StockCategory[]>{
    const stockCategoriesUrl = `${environment.baseUrl}/api/v1/stockcategory/all`;

    return this.http.get<StockCategory[]>(stockCategoriesUrl)
  }

  getStockCategoryById(stockCategoryId): Observable<StockCategory>{
    const stockCategoryUrl = `${environment.baseUrl}/api/v1/stockcategory/find/${stockCategoryId}`;

    return this.http.get<StockCategory>(stockCategoryUrl)
  }

  updateCategory(stockCategoryDetails): Observable<any>{
    const updateStockCaategoryUrl = `${environment.baseUrl}/api/v1/stockcategory/update`;

    return this.http.put<any>(updateStockCaategoryUrl, stockCategoryDetails)
  }

  deleteStockCategory(stockCategoryId): Observable<any>{
    const deleteStockCategoryUrl = `${environment.baseUrl}/api/v1/stockcategory/delete/${stockCategoryId}`;

    return this.http.delete<any>(deleteStockCategoryUrl)
  }
}
