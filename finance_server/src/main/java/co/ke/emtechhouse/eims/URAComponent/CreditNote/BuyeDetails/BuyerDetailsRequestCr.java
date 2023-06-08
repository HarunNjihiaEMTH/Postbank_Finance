package co.ke.emtechhouse.eims.URAComponent.CreditNote.BuyeDetails;

import com.google.gson.annotations.Expose;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

//@Entity
@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor

public class BuyerDetailsRequestCr {

    @Expose
    private String localInvoiceNo;
    @Expose
    private String buyerCitizenship;
    @Expose
    private String buyerLegalName;
    @Expose
    private String buyerMobilePhone;
    @Expose
    private String buyerPassportNum;
    @Expose
    private String buyerSector;
    @Expose
    private String buyerTin;
    @Expose
    private String buyerType;
    @Expose
    private String buyerNinBrn;
    @Expose
    private String buyerBusinessName;
    @Expose
    private String buyerAddress;
    @Expose
    private String buyerEmail;
    @Expose
    private String buyerLinePhone;
    @Expose
    private String buyerPlaceOfBusi;
    @Expose
    private String buyerReferenceNo;

}
