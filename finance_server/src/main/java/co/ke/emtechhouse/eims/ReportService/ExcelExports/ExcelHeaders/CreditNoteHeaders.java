package co.ke.emtechhouse.eims.ReportService.ExcelExports.ExcelHeaders;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CreditNoteHeaders {
    private String Customer_Tin;
    private String Ori_Invoice_No;
    private String Sellers_Ref_No;
    private String Source;
    private String Application_Time;
    private String Currency;
    private String Reason_Code;
    private String Reason;
    private String Response_Code;
    private String URA_Status;
    private String Posted_db;
    private String Verified_by;
}
