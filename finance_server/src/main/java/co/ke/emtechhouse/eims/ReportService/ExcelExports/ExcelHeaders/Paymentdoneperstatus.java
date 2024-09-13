package co.ke.emtechhouse.eims.ReportService.ExcelExports.ExcelHeaders;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Paymentdoneperstatus {
    private String Transaction_Date;
    private String Invoice_No;
    private String Supplier_Name;
    private String Gross_Amount;
    private String Transaction_Status;
    private String Currency;
    private String IWT_Amount;
    private String VAT_Amount;
    private String Created_At;
    private String Verified_By;
}
