package co.ke.emtechhouse.eims.ReportService.ExcelExports.ExcelHeaders;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class InvoicesHeaders {
    private String InvoiceNo;
    private String CustomerID;
    private String Date;
    private String Operator;
    private String Code;
    private String Description;
}
