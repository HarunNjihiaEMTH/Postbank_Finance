
package co.ke.emtechhouse.eims.URAComponent.uploadinvoice.request;

import javax.annotation.Generated;
import javax.persistence.*;

import com.google.gson.annotations.Expose;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Generated("net.hexar.json2pojo")
@Entity
@Table(name = "basicdetailsrequest")
@NoArgsConstructor
@AllArgsConstructor
@SuppressWarnings("unused")
public class BasicInformationRequest {
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
    private String currency;
    @Expose
    private String dataSource;
    @Expose
    private String deviceNo;
    @Expose
    private String invoiceIndustryCode;
    @Expose
    private String invoiceKind;
    @Expose
    private String invoiceType;
    @Expose
    private String issuedDate;
    @Expose
    private String operator;
    @Expose
    private String oriInvoiceId;

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getDataSource() {
        return dataSource;
    }

    public void setDataSource(String dataSource) {
        this.dataSource = dataSource;
    }

    public String getDeviceNo() {
        return deviceNo;
    }

    public void setDeviceNo(String deviceNo) {
        this.deviceNo = deviceNo;
    }

    public String getInvoiceIndustryCode() {
        return invoiceIndustryCode;
    }

    public void setInvoiceIndustryCode(String invoiceIndustryCode) {
        this.invoiceIndustryCode = invoiceIndustryCode;
    }

    public String getInvoiceKind() {
        return invoiceKind;
    }

    public void setInvoiceKind(String invoiceKind) {
        this.invoiceKind = invoiceKind;
    }

    public String getInvoiceType() {
        return invoiceType;
    }

    public void setInvoiceType(String invoiceType) {
        this.invoiceType = invoiceType;
    }

    public String getIssuedDate() {
        return issuedDate;
    }

    public void setIssuedDate(String issuedDate) {
        this.issuedDate = issuedDate;
    }

    public String getOperator() {
        return operator;
    }

    public void setOperator(String operator) {
        this.operator = operator;
    }

    public String getOriInvoiceId() {
        return oriInvoiceId;
    }

    public void setOriInvoiceId(String oriInvoiceId) {
        this.oriInvoiceId = oriInvoiceId;
    }

}
