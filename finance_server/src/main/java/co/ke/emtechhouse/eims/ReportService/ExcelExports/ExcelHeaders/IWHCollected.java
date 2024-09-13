package co.ke.emtechhouse.eims.ReportService.ExcelExports.ExcelHeaders;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class IWHCollected {
    private String TIN;
    private String SupplierName;
    private String Country;
    private String Description;
    private String Gross_amount;
    private String AmountExcTax;
    private String SupplierAmount;
    private String VatAmount;
    private String IWTAmount;
    private String CCY;
    private String TranDate;
    private String TranId;
    private String Invoice_No;
    private String InvoiceDate;
    private String TaxRate;
    private String IncomeWHRate;
    private String SupplierAccount;
    private String IwtAccount;
    private String Created_By;
    private String Verfied_by;
}
