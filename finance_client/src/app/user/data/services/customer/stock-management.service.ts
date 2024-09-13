import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";

import { Category } from "../../types/customer-types/category";

@Injectable({
  providedIn: "root",
})
export class StockManagementService {
  constructor(private http: HttpClient) {}

  filterBySegmentName(page, limit, query): Observable<Category> {
    const filterBySegmentUrl = `${environment.baseUrl}/api/v1/uracategories/products/segmentname`;

    return this.http.get<Category>(filterBySegmentUrl, {
      params: { page: page, size: limit, query: query },
    });
  }

  filterByFamilyName(page, limit, query): Observable<Category> {
    const filterByFamilyNameUrl = `${environment.baseUrl}/api/v1/uracategories/products/familyname`;

    return this.http.get<Category>(filterByFamilyNameUrl, {
      params: { page: page, size: limit, query: query },
    });
  }

  filterByFamilyCode(page, limit, query) {
    const filterByFamilyNameUrl = `${environment.baseUrl}/api/v1/uracategories/products/familycode`;

    return this.http.get<Category>(filterByFamilyNameUrl, {
      params: { page: page, size: limit, query: query },
    });
  }

  filterByClassCode(page, limit, query): Observable<Category> {
    const filterByClassCodeUrl = `${environment.baseUrl}/api/v1/uracategories/products/classcode`;

    return this.http.get<Category>(filterByClassCodeUrl, {
      params: { page: page, size: limit, query: query },
    });
  }

  filterByClassName(page, limit, query): Observable<Category> {
    const filterByClassNameUrl = `${environment.baseUrl}/api/v1/uracategories/products/classname`;

    return this.http.get<Category>(filterByClassNameUrl, {
      params: { page: page, size: limit, query: query },
    });
  }

  filterByCommodityCode(page, limit, query): Observable<Category> {
    const filterByCommodityCodeUrl = `${environment.baseUrl}/api/v1/uracategories/products/commoditycode`;

    return this.http.get<Category>(filterByCommodityCodeUrl, {
      params: { page: page, size: limit, query: query },
    });
  }

  filterByCommodityName(page, limit, query): Observable<Category> {
    const filterByCommodityNameUrl = `${environment.baseUrl}/api/v1/uracategories/products/commodityname`;

    return this.http.get<Category>(filterByCommodityNameUrl, {
      params: { page: page, size: limit, query: query },
    });
  }

  filterByType(page, limit, query): Observable<Category> {
    const filterByTypeUrl = `${environment.baseUrl}/api/v1/uracategories/products/type`;

    return this.http.get<Category>(filterByTypeUrl, {
      params: { page: page, size: limit, query: query },
    });
  }
}
