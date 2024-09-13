
package co.ke.emtechhouse.eims.URAComponent.uploadinvoice.request;

import javax.annotation.Generated;
import javax.persistence.*;

import com.google.gson.annotations.Expose;

@Generated("net.hexar.json2pojo")
@Entity
@Table(name = "sellerdetailsrequest")
public class SellerDetailsRequest {
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
    private String address;
    @Expose
    private String businessName;
    @Expose
    private String emailAddress;
    @Expose
    private String legalName;
    @Expose
    private String linePhone;
    @Expose
    private String mobilePhone;
    @Expose
    private String referenceNo;
    @Expose
    private String tin;

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getBusinessName() {
        return businessName;
    }

    public void setBusinessName(String businessName) {
        this.businessName = businessName;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getLegalName() {
        return legalName;
    }

    public void setLegalName(String legalName) {
        this.legalName = legalName;
    }

    public String getLinePhone() {
        return linePhone;
    }

    public void setLinePhone(String linePhone) {
        this.linePhone = linePhone;
    }

    public String getMobilePhone() {
        return mobilePhone;
    }

    public void setMobilePhone(String mobilePhone) {
        this.mobilePhone = mobilePhone;
    }

    public String getReferenceNo() {
        return referenceNo;
    }

    public void setReferenceNo(String referenceNo) {
        this.referenceNo = referenceNo;
    }

    public String getTin() {
        return tin;
    }

    public void setTin(String tin) {
        this.tin = tin;
    }

}
