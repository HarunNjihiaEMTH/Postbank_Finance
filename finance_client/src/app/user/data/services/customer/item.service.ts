import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Item } from '../../types/customer-types/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  addItem(item): Observable<Item>{
    const addItemUrl = `${environment.baseUrl}/api/v1/products/add`;

    return this.http.post<Item>(addItemUrl, item);
  }

  getAllItems(): Observable<Item[]>{
    const itemsUrl = `${environment.baseUrl}/api/v1/products/all`;

    return this.http.get<Item[]>(itemsUrl)
  }

  getItemById(categoryId): Observable<Item>{
    const itemUrl = `${environment.baseUrl}/api/v1/products/find/${categoryId}`;

    return this.http.get<Item>(itemUrl)
  }

  updateItem(itemDetails): Observable<any>{
    const updateItemUrl = `${environment.baseUrl}/api/v1/products/update`;

    return this.http.put<any>(updateItemUrl, itemDetails)
  }

  deleteItem(itemId): Observable<any>{
    const deleteItemUrl = `${environment.baseUrl}/api/v1/products/delete/${itemId}`;

    return this.http.delete<any>(deleteItemUrl)
  }

  postCommodityToUra(commodity): Observable<any>{
    const postCommodityUraUrl = `${environment.baseUrl}/api/v1/restock/now`;


    return this.http.post<any>(postCommodityUraUrl, commodity)
  }

  restockNow(commodity): Observable<any>{
    const restockNowUrl = `${environment.uraUrl}/api/v1/restock/now`;

    return this.http.post<any>(restockNowUrl, commodity)
  }
  updateRestockNow(commodity): Observable<any>{
    const restockNowUrl = `${environment.uraUrl}/api/v1/restock/update`;

    return this.http.post<any>(restockNowUrl, commodity)
  }

  getFailedCommodities(): Observable<any>{
    const getFailedCommoditiesUrl = `${environment.uraUrl}/api/v1/restock/allfailed`;

    return this.http.get<any>(getFailedCommoditiesUrl)
  }

  addCommodity(commodity): Observable<any>{
    const addCommodityUrl = `${environment.uraUrl}/api/v1/restock/all`;

    return this.http.post<any>(addCommodityUrl, commodity)
  }

  fetchAllCommodities(): Observable<any[]>{
    const  fetchAllCommoditiesUrl = `${environment.uraUrl}/api/v1/restock/all`;

    return this.http.get<any[]>(fetchAllCommoditiesUrl)
  }

  fetchServicesOnly(){
    const  fetchServicesOnlyUrl = `${environment.uraUrl}/api/v1/restock/all/services`;

    return this.http.get<any[]>(fetchServicesOnlyUrl)
  }

  fetchGoodsOnly(){
    const   fetchGoodsOnlyUrl = `${environment.uraUrl}/api/v1/restock/all/goods`;

    return this.http.get<any[]>(fetchGoodsOnlyUrl)
  }

  getUnitsOfMeasure(): Observable<any[]>{
    const  getUnitsOfMeasureUrl = `${environment.baseUrl}/api/v1/unitsofmeasure/all`;

    return this.http.get<any[]>(getUnitsOfMeasureUrl)
  }

  getCurrencies(): Observable<any[]>{
    const  getCurrenciesUrl = `${environment.baseUrl}/api/v1/unitsofmeasure/all`;

    return this.http.get<any[]>(getCurrenciesUrl)
  }
}
