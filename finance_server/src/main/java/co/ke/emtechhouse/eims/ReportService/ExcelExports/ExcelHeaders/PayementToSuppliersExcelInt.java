package co.ke.emtechhouse.eims.ReportService.ExcelExports.ExcelHeaders;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;


@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PayementToSuppliersExcelInt {
    private String TIN;
    private String Supplier_Name;
    private String Description;
    private String Gross_Amount;
    private String Currency;
    private String Trans_Date;
    private String Trans_ID;
    private String Invoice_No;
    private String Invoice_Date;
    private String Created_At;
    private String Verified_By;
}
