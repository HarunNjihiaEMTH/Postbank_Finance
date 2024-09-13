import { Injectable } from '@angular/core';

const BASIC_INFORMATION = "basic-information";
const BUYER_DETAILS = "buyer-details";
const GOODS_DETAILS = "goods-details";
const PAY_WAY_DETAILS = "pay-way-details";
const SELLER_DETAILS = "seller-details";
const SUMMARY = "summary";
const TAX_DETAILS = "tax-details";

@Injectable({
  providedIn: 'root'
})

export class InvoiceSessionService {

  constructor() { }

  saveInvoiceBasicInformation(purchaseOrderDetails) {
    sessionStorage.removeItem(BASIC_INFORMATION);
    sessionStorage.setItem(
      BASIC_INFORMATION,
      JSON.stringify(purchaseOrderDetails)
    );
  }

  getInvoiceBasicInformation() {
    return sessionStorage.getItem(BASIC_INFORMATION);
  }

  removeInvoiceBasicInformation() {
    sessionStorage.removeItem(BASIC_INFORMATION);
  }

  saveInvoiceBuyerDetails(purchaseOrderDetails) {
    sessionStorage.removeItem(BUYER_DETAILS);
    sessionStorage.setItem(
      BUYER_DETAILS,
      JSON.stringify(purchaseOrderDetails)
    );
  }

  getInvoiceBuyerDetails() {
    return sessionStorage.getItem(BUYER_DETAILS);
  }

  removeInvoiceBuyerDetails() {
    sessionStorage.removeItem(BUYER_DETAILS);
  }

  saveInvoicePayWayDetails(purchaseOrderDetails) {
    sessionStorage.removeItem(PAY_WAY_DETAILS);
    sessionStorage.setItem(
      PAY_WAY_DETAILS,
      JSON.stringify(purchaseOrderDetails)
    );
  }

  getInvoiPayWayDetails() {
    return sessionStorage.getItem(PAY_WAY_DETAILS);
  }

  removePayWayDetails() {
    sessionStorage.removeItem(PAY_WAY_DETAILS);
  }

  saveInvoiceGoodsDetails(purchaseOrderDetails) {
    sessionStorage.removeItem(GOODS_DETAILS);
    sessionStorage.setItem(
      GOODS_DETAILS,
      JSON.stringify(purchaseOrderDetails)
    );
  }

  getInvoiceGoodsDetails() {
    return sessionStorage.getItem(GOODS_DETAILS);
  }

  removeInvoiceGoodsDetails() {
    sessionStorage.removeItem(GOODS_DETAILS);
  }

  saveSellerDetails(purchaseOrderDetails) {
    sessionStorage.removeItem(SELLER_DETAILS);
    sessionStorage.setItem(
      SELLER_DETAILS,
      JSON.stringify(purchaseOrderDetails)
    );
  }

  getSellerDetails() {
    return sessionStorage.getItem(SELLER_DETAILS);
  }

  removeSellerDetails() {
    sessionStorage.removeItem(SELLER_DETAILS);
  }

  saveInvoiceSummary(purchaseOrderDetails) {
    sessionStorage.removeItem(SUMMARY);
    sessionStorage.setItem(
      SUMMARY,
      JSON.stringify(purchaseOrderDetails)
    );
  }

  getInvoiceSummary() {
    return sessionStorage.getItem(SUMMARY);
  }

  removeInvoiceSummary() {
    sessionStorage.removeItem(SUMMARY);
  }

  saveTaxDetails(purchaseOrderDetails) {
    sessionStorage.removeItem(TAX_DETAILS);
    sessionStorage.setItem(
      TAX_DETAILS,
      JSON.stringify(purchaseOrderDetails)
    );
  }

  getTaxDetails() {
    return sessionStorage.getItem(TAX_DETAILS);
  }

  removeTaxDetails() {
    sessionStorage.removeItem(TAX_DETAILS);
  }
}
