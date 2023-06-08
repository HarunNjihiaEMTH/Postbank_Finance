import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";

import { CostCenter } from "../types/cost-center";

@Injectable({
  providedIn: "root",
})
export class CostCenterService {
  constructor(private http: HttpClient) {}

  addCostCenter(costCenter): Observable<CostCenter> {
    const addCostCenterUrl = `${environment.baseUrl}/api/v1/costcenters/add`;

    return this.http.post<CostCenter>(addCostCenterUrl, costCenter);
  }

  getCostCenters(): Observable<CostCenter[]> {
    const costCenetersUrl = `${environment.baseUrl}/api/v1/costcenters/all`;

    return this.http.get<CostCenter[]>(costCenetersUrl);
  }

  getCostCenterById(costCenterId): Observable<CostCenter> {
    const costCenterUrl = `${environment.baseUrl}/api/v1/costcenters/find/${costCenterId}`;

    return this.http.get<CostCenter>(costCenterUrl);
  }

  updateCostCenter(costCenterDetails) {
    const updateCostCenterUrl = `${environment.baseUrl}/api/v1/costcenters/update`;

    return this.http.put<any>(updateCostCenterUrl, costCenterDetails);
  }

  deleteCostCenter(costCenterId) {
    const deleteCostCenterUrl = `${environment.baseUrl}/api/v1/costcenters/delete/${costCenterId}`;

    return this.http.delete<any>(deleteCostCenterUrl);
  }
}
