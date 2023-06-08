package co.ke.emtechhouse.eims.ReportService.ExcelExports.ExcelHeaders;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class DirectTransferHeaders {
    private String AcType;
    private String SolId;
    private String SolDesc;
    private String AcName;
    private String AcNo;
    private String TranId;
    private String TranDate;
    private String TranAmount;
    private String TranType;
    private String Ccy;
    private String Description;
    private String CreatedBy;
    private String VerifiedBy;

}
