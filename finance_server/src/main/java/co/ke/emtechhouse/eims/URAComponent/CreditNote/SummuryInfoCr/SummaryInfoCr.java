package co.ke.emtechhouse.eims.URAComponent.CreditNote.SummuryInfoCr;

import com.google.gson.annotations.Expose;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class SummaryInfoCr {

    public String getLocalInvoiceNo() {
        return localInvoiceNo;
    }

    public void setLocalInvoiceNo(String localInvoiceNo) {
        this.localInvoiceNo = localInvoiceNo;
    }

    @Expose
    private String localInvoiceNo;
    @Expose
    private String grossAmount;
    @Expose
    private String itemCount;
    @Expose
    private String modeCode;
    @Expose
    private String netAmount;
    @Expose
    private String remarks;
    @Expose
    private String taxAmount;
    @Expose
    private String qrCode;

}
