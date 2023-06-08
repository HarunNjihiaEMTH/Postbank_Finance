import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class UraService {

  constructor(private http: HttpClient) { }

  listAllURASectors(): Observable<any> {
    const listAllURASectorsUrl = `${environment.baseUrl}/api/v1/urasectors/all`;

    return this.http.get<any>(listAllURASectorsUrl)
  }

  findURASectorById(uraSectorId): Observable<any> {
    const findURASectorByIdUrl = `${environment.baseUrl}/api/v1/urasectors/find/${uraSectorId}`;

    return this.http.get<any>(findURASectorByIdUrl)
  }

  listAllURAPayWays(): Observable<any> {
    const listAllURAPayWaysUrl = `${environment.baseUrl}/api/v1/urapayway/all`;

    return this.http.get<any>(listAllURAPayWaysUrl)
  }

  findURAPayWayById(payWayId): Observable<any> {
    const findURAPayWayByIdUrl = `${environment.baseUrl}/api/v1/urapayway/find/${payWayId}`;

    return this.http.get<any>(findURAPayWayByIdUrl)
  }

  listAllUnitsOfMeasure(): Observable<any> {
    const listAllUnitsOfMeasureUrl = `${environment.baseUrl}/api/v1/unitsofmeasure/all`;

    return this.http.get<any>(listAllUnitsOfMeasureUrl)
  }

  findUnitOfMeasureById(unitOfMeasureId): Observable<any> {
    const findUnitOfMeasureByIdUrl = `${environment.baseUrl}/api/v1/unitsofmeasure/find/${unitOfMeasureId}`;

    return this.http.get<any>(findUnitOfMeasureByIdUrl)
  }

  getAllTaxess(): Observable<any> {
    const getAllTaxessUrl = `${environment.baseUrl}/api/v1/tax/all`;

    return this.http.get<any>(getAllTaxessUrl)
  }

  getTaxById(taxId): Observable<any> {
    const getTaxByIdUrl = `${environment.baseUrl}/api/v1/tax/find/${taxId}`;

    return this.http.get<any>(getTaxByIdUrl)
  }

  listAllTaxCategories(): Observable<any> {
    const getTaxByIdUrl = `${environment.baseUrl}/api/v1/taxcategories/all`;

    return this.http.get<any>(getTaxByIdUrl)
  }

  addBasicDetails(basicDetails): Observable<any> {
    const addBasicDetailsUrl = `${environment.baseUrl}/api/v1/basicdetails/add`;

    return this.http.post<any>(addBasicDetailsUrl, basicDetails)
  }

  fetchBasicDetails() {
    const fetchBasicDetailsUrl = `${environment.baseUrl}/api/v1/basicdetails/all`;

    return this.http.get<any>(fetchBasicDetailsUrl)
  }

  deleteBasicDetails(basicDetailsId): Observable<any> {
    const deleteBasicDetailsUrl = `${environment.baseUrl}/api/v1/basicdetails/`;

    return this.http.delete<any>(deleteBasicDetailsUrl, { params: { id: basicDetailsId } })
  }

  fetchBasicDetailsById(basicDetailsId): Observable<any> {
    const fetchBasicDetailsByIdUrl = `${environment.baseUrl}/api/v1/basicdetails/fetchbyid/`;

    return this.http.get<any>(fetchBasicDetailsByIdUrl, { params: { id: basicDetailsId } })
  }

  updateBasicDetails(basicdetails): Observable<any> {
    const updateBasicDetailsUrl = `${environment.baseUrl}/api/v1/basicdetails/update`;

    return this.http.put<any>(updateBasicDetailsUrl, basicdetails)
  }

  listAllInvoicesTypes(): Observable<any> {
    const listAllInvoicesTypesUrl = `${environment.baseUrl}/api/v1/urainvoicetypes/all`;

    return this.http.get<any>(listAllInvoicesTypesUrl)
  }

  listAllInvoicekinds(): Observable<any> {
    const listAllInvoicekindsUrl = `${environment.baseUrl}/api/v1/urainvoicekinds/all`;

    return this.http.get<any>(listAllInvoicekindsUrl)
  }

  listAllCurrencies(): Observable<any> {
    const listAllCurrenciesUrl = `${environment.baseUrl}/api/v1/uracurrencies/all`;

    return this.http.get<any>(listAllCurrenciesUrl)
  }

  listAllFinacleCurrencies(): Observable<any> {
    const listAllCurrenciesUrl = `${environment.baseUrl}/api/v1/lookup/currencies`;

    return this.http.get<any>(listAllCurrenciesUrl)
  }

  
  listAllFinacleRateCodes(): Observable<any> {
    const listAllRatesUrl = `${environment.baseUrl}/api/v1/lookup/rateCodes`;

    return this.http.get<any>(listAllRatesUrl)
  }

  listAllCountryCodes(): Observable<any> {
    const listAllCountryCodesUrl = `${environment.baseUrl}/api/v1/uracountrycodes/all`;

    return this.http.get<any>(listAllCountryCodesUrl)
  }

  findCurrency(currencyId): Observable<any> {
    const findCurrencyUrl = `${environment.baseUrl}/api/v1/uracurrencies/find/${currencyId}`;

    return this.http.get<any>(findCurrencyUrl)
  }

  listAllBuyerTypes(): Observable<any> {
    const listAllBuyerTypesUrl = `${environment.baseUrl}/api/v1/buyertypes/all`;

    return this.http.get<any>(listAllBuyerTypesUrl)
  }
}
