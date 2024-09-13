
package co.ke.emtechhouse.eims.URAComponent.uploadinvoice.request;

import javax.annotation.Generated;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.gson.annotations.Expose;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Generated("net.hexar.json2pojo")
@Entity
@Table(name = "buyerdetailsrequest")
@NoArgsConstructor
@AllArgsConstructor
@SuppressWarnings("unused")
public class BuyerDetailsRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLocalInvoiceNo() {
        return localInvoiceNo;
    }

    public void setLocalInvoiceNo(String localInvoiceNo) {
        this.localInvoiceNo = localInvoiceNo;
    }

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

    public String getBuyerCitizenship() {
        return buyerCitizenship;
    }

    public void setBuyerCitizenship(String buyerCitizenship) {
        this.buyerCitizenship = buyerCitizenship;
    }

    public String getBuyerLegalName() {
        return buyerLegalName;
    }

    public void setBuyerLegalName(String buyerLegalName) {
        this.buyerLegalName = buyerLegalName;
    }

    public String getBuyerMobilePhone() {
        return buyerMobilePhone;
    }

    public void setBuyerMobilePhone(String buyerMobilePhone) {
        this.buyerMobilePhone = buyerMobilePhone;
    }

    public String getBuyerPassportNum() {
        return buyerPassportNum;
    }

    public void setBuyerPassportNum(String buyerPassportNum) {
        this.buyerPassportNum = buyerPassportNum;
    }

    public String getBuyerSector() {
        return buyerSector;
    }

    public void setBuyerSector(String buyerSector) {
        this.buyerSector = buyerSector;
    }

    public String getBuyerTin() {
        return buyerTin;
    }

    public void setBuyerTin(String buyerTin) {
        this.buyerTin = buyerTin;
    }

    public String getBuyerType() {
        return buyerType;
    }

    public void setBuyerType(String buyerType) {
        this.buyerType = buyerType;
    }

}
