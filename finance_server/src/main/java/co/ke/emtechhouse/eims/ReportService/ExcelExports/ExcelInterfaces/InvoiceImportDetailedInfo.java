package co.ke.emtechhouse.eims.ReportService.ExcelExports.ExcelInterfaces;

public interface InvoiceImportDetailedInfo {
    String getNameOfSeller();
    String getTinOfPurchaser();
    String getTinOfSeller();
    String getInvoiceDate();
    String getFdn();
    String getDescriptionofGoods();
    String getAmountExclusiveVat();
    String getTotals();
    String getVatCharged();
    String getCurrency();
    String getExchangeRate();
    String getReferenceNo();
}
