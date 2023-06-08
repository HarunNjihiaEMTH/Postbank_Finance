import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";


@Injectable({
  providedIn: "root",
})
export class PurchaseOrdersService {
  constructor(private http: HttpClient) {}

  updatePoStatus(params: any): Observable<any> {
    const updateParameterUrl = `${environment.baseUrl}/api/v1/po/update/status`;
    return this.http.put(updateParameterUrl,{}, {
      params:params,
      responseType: "text",
    });
  }
  cancelPo(params: any): Observable<any> {
    const updateParameterUrl = `${environment.baseUrl}/api/v1/po/cancel`;
    return this.http.put(updateParameterUrl,{}, {
      params:params,
      responseType: "text",
    });
  }
}
