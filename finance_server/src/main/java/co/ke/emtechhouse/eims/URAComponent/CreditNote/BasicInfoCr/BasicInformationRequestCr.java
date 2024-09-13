package co.ke.emtechhouse.eims.URAComponent.CreditNote.BasicInfoCr;

import com.google.gson.annotations.Expose;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
//@Entity
public class BasicInformationRequestCr {



    @Expose
    private String currency;
//    @Expose
//    private String dataSource;
//    @Expose
//    private String deviceNo;
    @Expose
    private String invoiceIndustryCode;
    @Expose
    private String invoiceKind;
//    @Expose
//    private String invoiceType;
//    @Expose
//    private String issuedDate;
    @Expose
    private String operator;
//    @Expose
//    private String oriInvoiceId;
    @Expose
    private String branchId;

}
