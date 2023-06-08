import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

import { Category } from '../types/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  addCategory(category): Observable<Category>{
    const addCategoryUrl = `${environment.baseUrl}/api/v1/category/add`;

    return this.http.post<Category>(addCategoryUrl, category);
  }

  getAllCategories(): Observable<Category[]>{
    const categoriesUrl = `${environment.baseUrl}/api/v1/category/all`;

    return this.http.get<Category[]>(categoriesUrl)
  }

  getCategoryById(categoryId): Observable<Category>{
    const categoryUrl = `${environment.baseUrl}/api/v1/category/find/${categoryId}`;

    return this.http.get<Category>(categoryUrl)
  }

  updateCategory(categoryDetails): Observable<any>{
    const updateCategoryUrl = `${environment.baseUrl}/api/v1/category/update`;

    return this.http.put<any>(updateCategoryUrl, categoryDetails)
  }

  deleteCategory(categoryId): Observable<any>{
    const deleteCategoryUrl = `${environment.baseUrl}/api/v1/category/delete/${categoryId}`;

    return this.http.delete<any>(deleteCategoryUrl)
  }
}
