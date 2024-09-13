import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";


@Injectable({
  providedIn: "root",
})
export class StaticsService {
  constructor(private http: HttpClient) {}

  getIncomeWithHoldingTaxPerYearStatistics(): Observable<any[]> {
    const getIncomeWithHoldingTaxPerYearStatisticsUrl = `${environment.baseUrl}/api/v1/analysis/iwt/yearwise`;

    return this.http.get<any[]>(getIncomeWithHoldingTaxPerYearStatisticsUrl);
  }

  getIncomeWithHoldingTaxPerDayStatics(year, month): Observable<any[]> {
    const getIncomeWithHoldingTaxPerDayStaticsUrl = `${environment.baseUrl}/api/v1/analysis/iwt/datewise`;

    return this.http.get<any[]>(getIncomeWithHoldingTaxPerDayStaticsUrl, {
      params: {  Month:month, Year: year }
    });
  }

  getIncomeWithHoldingTaxPerMonthStatistics(year): Observable<any[]> {
    const getIncomeWithHoldingTaxPerMonthStatisticsUrl = `${environment.baseUrl}/api/v1/analysis/iwt/monthwise`;

    return this.http.get<any[]>(getIncomeWithHoldingTaxPerMonthStatisticsUrl, {
      params: { Year: year },
    });
  }

  getTotalValueAddedTaxAmountDateWiseStatistics(year, month) {
    const getTotalValueAddedTaxAmountDateWiseStatisticsUrl = `${environment.baseUrl}/api/v1/analysis/vat/datewise`;

    return this.http.get<any[]>(
      getTotalValueAddedTaxAmountDateWiseStatisticsUrl, {
        params: { Month: month, Year: year }
      }
    );
  }

  getTotalValueAddedTaxPerMonthStatistics(year) {
    const getTotalValueAddedTaxPerMonthStatisticsUrl = `${environment.baseUrl}/api/v1/analysis/vat/monthwise`;

    return this.http.get<any[]>(getTotalValueAddedTaxPerMonthStatisticsUrl, { params: {Year: year}});
  }

  getValueAddedTaxPerYearStatics() {
    const getValueAddedTaxPerYearStaticsUrl = `${environment.baseUrl}/api/v1/analysis/vat/yearwise`;

    return this.http.get<any[]>(getValueAddedTaxPerYearStaticsUrl);
  }

  getPurhaseOrdersGeneratedPerYearSummary() {
    const getPurhaseOrdersGeneratedPerYearSummaryUrl = `${environment.baseUrl}/api/v1/analysis/find/per/yearwise`;

    return this.http.get<any[]>(getPurhaseOrdersGeneratedPerYearSummaryUrl);
  }

  getPurchaseOrdersIssuedDatewiseStatics(year, month) {
    const getPurchaseOrdersIssuedDatewiseStaticsUrl = `${environment.baseUrl}/api/v1/analysis/find/po/dateWise`;

    return this.http.get<any[]>(getPurchaseOrdersIssuedDatewiseStaticsUrl, {
      params: { year: year, month: month }});
  }

  getPurchaseOrdersIssuedMonthWiseStatics(year) {
    const getPurchaseOrdersIssuedMonthWiseStaticsUrl = `${environment.baseUrl}/api/v1/analysis/find/po/monthwise`;

    return this.http.get<any[]>(getPurchaseOrdersIssuedMonthWiseStaticsUrl, { params: {year: year}});
  }

  getInvoicesGeneratedPerYearSummary() {
    const getInvoicesGeneratedPerYearSummaryUrl = `${environment.baseUrl}/api/v1/analysis/invoices/yearwise`;

    return this.http.get<any[]>(getInvoicesGeneratedPerYearSummaryUrl);
  }

  getInvoicesIssuedDatewiseStatics(year, month) {
    const getInvoicesIssuedDatewiseStaticsUrl = `${environment.baseUrl}/api/v1/analysis/invoices/datewise`;

    return this.http.get<any[]>(getInvoicesIssuedDatewiseStaticsUrl, {
      params: {  Month: month, Year: year },
    });
  }

  getInvoicesIssuedMonthWiseStatics(params) {
    const etInvoicesIssuedMonthWiseStaticsUrl = `${environment.baseUrl}/api/v1/analysis/invoices/monthwise`;

    return this.http.get<any[]>(etInvoicesIssuedMonthWiseStaticsUrl, {
      params: { Year: params },
    });
  }

  firstTimeResetPassword(passwordData): Observable<any>{

    const submitPasswordUrl = `${environment.baseUrl}/soa/users/updatepassword`;
    //const submitPasswordUrl = `${environment.baseUrl}/soa/users/forgot-password`;

    return this.http.put<any>(submitPasswordUrl, passwordData);
  }
 //https://uraintegration-server-live.postbank.co.ug/soa/users/updatepassword

}
