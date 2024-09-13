
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  addRole(Role): Observable<{message: string}>{
    const addRoleUrl = `${environment.baseUrl}/soa/roles/add`;

    return this.http.post<{message: string}>(addRoleUrl, Role)
  }

  getRoles(): Observable<any[]>{
    const RolesUrl = `${environment.baseUrl}/soa/roles/view`;

    return this.http.get<any[]>(RolesUrl)
  }

  updateRole(suppplierDetails): Observable<{message: string}>{
    const updateRoleUrl = `${environment.baseUrl}/soa/roles/update`;

    return this.http.put<{message: string}>(updateRoleUrl, suppplierDetails)
  }

  getRoleById(RoleId): Observable<any>{
    const RoleUrl = `${environment.baseUrl}/soa/roles//find/${RoleId}`;

    return this.http.get<any>(RoleUrl)
  }

  deleteRole(RoleId): Observable<{message: string}>{
    const deleteRoleUrl = `${environment.baseUrl}/soa/roles/delete/${RoleId}`;

    return this.http.delete<{message: string}>(deleteRoleUrl)
  }

  

updateRoleStatus(params: any): Observable<any> {
  const updateRoleUrl = `${environment.baseUrl}/api/v1/Role/update/status`;
  return this.http.put(updateRoleUrl,{}, {
    params:params,
    responseType: "text",
  });
}


}
