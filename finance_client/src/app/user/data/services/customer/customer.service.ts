import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Customer } from '../../types/customer-types/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  addCustomer(customer): Observable<Customer>{
    const addCustomerUrl = `${environment.baseUrl}/api/v1/customer/add`;

    return this.http.post<Customer>(addCustomerUrl, customer);
  }

  getAllCustomers(): Observable<Customer[]>{
    const customersUrl = `${environment.baseUrl}/api/v1/customer/all`;

    return this.http.get<Customer[]>(customersUrl)
  }

  getCustomersById(customerId): Observable<Customer>{
    const customerUrl = `${environment.baseUrl}/api/v1/customer/find/${customerId}`;

    return this.http.get<Customer>(customerUrl)
  }

  updateCustomer(customerDetails): Observable<any>{
    const updateCustomerUrl = `${environment.baseUrl}/api/v1/customer/update`;

    return this.http.put<any>(updateCustomerUrl, customerDetails)
  }

  deleteCustomer(customerId): Observable<any>{
    const deleteCustomerUrl = `${environment.baseUrl}/api/v1/customer/delete/${customerId}`;

    return this.http.delete<any>(deleteCustomerUrl)
  }

  updateCustomerStatus(params: any): Observable<any> {
    const updateParameterUrl = `${environment.baseUrl}/api/v1/customer/update/status`;
    return this.http.put(updateParameterUrl,{}, {
      params:params,
      responseType: "text",
    });
  }

  

  fetchSellerDetails(): Observable<any>{
    const fetchSellerDetailsUrl = `${environment.baseUrl}/api/v1/sellerdetails/all`;

    return this.http.get<any>(fetchSellerDetailsUrl)
  }

  fetchSellerDetailsById(id): Observable<any>{
    const fetchSellerDetailsByIdUrl = `${environment.baseUrl}/api/v1/sellerdetails/fetchbyid/`;

    return this.http.get<any>(fetchSellerDetailsByIdUrl, { params: { id: id }})
  }

  updateSellerDetails(sellerDetails): Observable<any>{
    const  updateSellerDetailsUrl = `${environment.baseUrl}/api/v1/sellerdetails/update`;

    return this.http.put<any>(updateSellerDetailsUrl, sellerDetails)
  }

  addSellerDetails(seller): Observable<any>{
    const  addSellerDetailsUrl = `${environment.baseUrl}/api/v1/sellerdetails/add`;

    return this.http.post<any>(addSellerDetailsUrl, seller)
  }

  deleteSelleDetails(sellerId): Observable<any>{
    const  deleteSelleDetailsUrl = `${environment.baseUrl}/api/v1/sellerdetails/`;

    return this.http.delete<any>(deleteSelleDetailsUrl, { params: { id: sellerId }})
  }


}
