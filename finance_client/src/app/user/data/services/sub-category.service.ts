import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { SubCategory } from '../types/sub-category';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {

  constructor(private http: HttpClient) { }

  addSubCategory(category): Observable<SubCategory>{
    const addSubCategoryUrl = `${environment.baseUrl}/api/v1/subcategory/add`;

    return this.http.post<SubCategory>(addSubCategoryUrl, category);
  }

  getSubCategories(): Observable<SubCategory[]>{
    const subCategoriesUrl = `${environment.baseUrl}/api/v1/subcategory/all`;

    return this.http.get<SubCategory[]>(subCategoriesUrl)
  }

  getSubCategoryById(subCategoryId): Observable<SubCategory>{
    const subCategoryUrl = `${environment.baseUrl}/api/v1/subcategory/find/${subCategoryId}`;

    return this.http.get<SubCategory>(subCategoryUrl)
  }

  updateSubCategory(subcategoryDetails): Observable<any>{
    const updateSubcategoryDetails = `${environment.baseUrl}/api/v1/subcategory/update`;

    return this.http.put<any>(updateSubcategoryDetails,subcategoryDetails);
  }

  deleteSubCategory(subcategoryId): Observable<any>{
    const deleteSubcategoryUrl = `${environment.baseUrl}/api/v1/subcategory/delete/${subcategoryId}`;

    return this.http.delete<any>(deleteSubcategoryUrl);
  }
}
