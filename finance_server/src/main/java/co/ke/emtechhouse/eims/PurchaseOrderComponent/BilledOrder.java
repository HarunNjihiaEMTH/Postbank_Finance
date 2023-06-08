package co.ke.emtechhouse.eims.PurchaseOrderComponent;

public interface BilledOrder {
    String getSupplierName();
    String getPoName();
    String getPoNumber();
    String getPoId();
    String getPoStatus();
    String getTotalAfterTax();
    String getTotalBeforeTax();
    String getVatAmount();
    String getIncomeWithholdingAmount();
    String getPostedTime();
    String getInvoiceNo();
}
