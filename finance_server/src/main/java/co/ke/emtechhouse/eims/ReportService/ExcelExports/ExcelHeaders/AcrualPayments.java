package co.ke.emtechhouse.eims.ReportService.ExcelExports.ExcelHeaders;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class AcrualPayments {
    private String TIN;
    private String Supplier_Name;
    private String Description;
    private String Acrual_Amount;
    private String Acrual_Account;
    private String Collection_Date;
    private String CCY;
    private String Trans_Date;
    private String Trans_ID;
    private String Created_By;
    private String Verified_By;
}
