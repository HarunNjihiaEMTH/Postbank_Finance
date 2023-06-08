import { Injectable } from "@angular/core";

const PURCHASE_ORDER_DETAILS = "bank-and-customer-details";
const INVOICE_DETAILS = "invoice-details";
const ORGANISATION_DETAILS = "organisation-details";
const CUSTOMER_DETAILS = "customer-details";
const EXPENSE_DETAILS = "expense-details";
const ITEM_DETAILS = "item-details"

const COST_CENTER_DETAILS = "cost-center-details";

@Injectable({
  providedIn: "root",
})
export class PurchaseOrderSessionService {
  constructor() {}

  savePurchaseOrderDetails(purchaseOrderDetails) {
    sessionStorage.removeItem(PURCHASE_ORDER_DETAILS);
    sessionStorage.setItem(
      PURCHASE_ORDER_DETAILS,
      JSON.stringify(purchaseOrderDetails)
    );
  }

  getPurcahseOrderDetails() {
    return sessionStorage.getItem(PURCHASE_ORDER_DETAILS);
  }

  removePurchaseOrderDetails() {
    sessionStorage.removeItem(PURCHASE_ORDER_DETAILS);
  }

  saveInvoiceDetails(invoice) {
    sessionStorage.removeItem(INVOICE_DETAILS);
    sessionStorage.setItem(INVOICE_DETAILS, JSON.stringify(invoice));
  }

  getInvoiceDetails() {
    return sessionStorage.getItem(INVOICE_DETAILS);
  }

  removeInvoiceDetails() {
    sessionStorage.removeItem(INVOICE_DETAILS);
  }

  saveOrganisationDetails(organisation) {
    sessionStorage.removeItem(ORGANISATION_DETAILS);
    sessionStorage.setItem(ORGANISATION_DETAILS, JSON.stringify(organisation));
  }

  getOrganisationDetails() {
    return sessionStorage.getItem(ORGANISATION_DETAILS);
  }

  removeOrganisationDetails() {
    sessionStorage.removeItem(ORGANISATION_DETAILS);
  }

  saveCustomerDetails(customer) {
    sessionStorage.removeItem(CUSTOMER_DETAILS);
    sessionStorage.setItem(CUSTOMER_DETAILS, JSON.stringify(customer));
  }

  getCustomerDetails() {
    return sessionStorage.getItem(CUSTOMER_DETAILS);
  }

  removeCustomerDetails() {
    sessionStorage.removeItem(CUSTOMER_DETAILS);
  }

  saveExpenseDetails(expense) {
    sessionStorage.removeItem(EXPENSE_DETAILS);
    sessionStorage.setItem(EXPENSE_DETAILS, JSON.stringify(expense));
  }
  saveCostCenterDetails(costCenter){
    sessionStorage.removeItem(COST_CENTER_DETAILS);
    sessionStorage.setItem(COST_CENTER_DETAILS, JSON.stringify(costCenter));
  }

  getExpenseDetails() {
    return sessionStorage.getItem(EXPENSE_DETAILS);
  }

  removeExpenseDetails() {
    sessionStorage.removeItem(EXPENSE_DETAILS);
  }

  saveItemDetails(item) {
    sessionStorage.removeItem(ITEM_DETAILS);
    sessionStorage.setItem(ITEM_DETAILS, JSON.stringify(item));
  }

  getItemDetails() {
    return sessionStorage.getItem(ITEM_DETAILS);
  }

  removeItemDetails() {
    sessionStorage.removeItem(ITEM_DETAILS);
  }
}
