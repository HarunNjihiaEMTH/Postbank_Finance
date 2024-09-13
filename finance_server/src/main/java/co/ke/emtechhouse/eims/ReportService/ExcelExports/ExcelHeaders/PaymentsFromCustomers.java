package co.ke.emtechhouse.eims.ReportService.ExcelExports.ExcelHeaders;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PaymentsFromCustomers {
    private String Customer_Name;
    private String Customer_Tin;
    private String Invoice_No;
    private String Payment;
    private String Invoice_Date;
    private String Currency;
    private String Gross_Amount;
    private String Amount_Received;
    private String Balance;
    private String Payment_Date;
    private String Created_At;
    private String Verified_By;
}
