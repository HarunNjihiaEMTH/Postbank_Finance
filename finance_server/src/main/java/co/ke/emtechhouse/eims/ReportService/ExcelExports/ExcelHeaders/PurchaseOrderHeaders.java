package co.ke.emtechhouse.eims.ReportService.ExcelExports.ExcelHeaders;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PurchaseOrderHeaders {
    private String PO_Name;
    private String PO_Number;
    private String Posted_Time;
    private String Supplier_Name;
    private String Supplier_Tin;
    private String Currency;
    private String Total_AMount;
    private String VAT;
    private String VATiwt;
    private String IWT;
    private String Country;
    private String Invoice;
    private String Status;
    private String Created_By;
    private String Verified_By;
}
