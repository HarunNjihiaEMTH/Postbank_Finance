package co.ke.emtechhouse.eims.ReportService.ExcelExports.ExcelHeaders;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class VATCollected {
    private String TIN;
    private String SupplierName;
    private String Country;
    private String Description;
    private String Gross_amount;
    private String AmountExcTax;
    private String SupplierAmount;
    private String VatAmount;
    private String VWHAmount;

    private String CCY;
    private String TranDate;
    private String TranId;
    private String Invoice_No;
    private String InvoiceDate;
    private String TaxRate;
    private String VatWHRate;

    private String SupplierAccount;
    private String VwtAccount;

    private String Created_By;
    private String Verfied_by;
}
