
package co.ke.emtechhouse.eims.URAComponent.uploadinvoice.response;

import com.google.gson.annotations.Expose;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "urabasicinformation")
@NoArgsConstructor
@AllArgsConstructor
@SuppressWarnings("unused")
public class BasicInfoResponse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    @Expose
    private String antifakeCode;
    @Expose
    private String currency;
    @Expose
    private String currencyRate;
    @Expose
    private String dataSource;
    @Expose
    private String deviceNo;
    @Expose
    private String invoiceId;
    @Expose
    private String invoiceIndustryCode;
    @Expose
    private String invoiceKind;
    @Expose
    private String invoiceNo;
    @Expose
    private String invoiceType;
    @Expose
    private String isBatch;
    @Expose
    private String isInvalid;
    @Expose
    private String isPreview;
    @Expose
    private String isRefund;
    @Expose
    private String issuedDate;
    @Expose
    private String issuedDatePdf;
    @Expose
    private String operator;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCustomerid() {
        return customerid;
    }

    public void setCustomerid(String customerid) {
        this.customerid = customerid;
    }

    @Expose
    private String customerid;

//
//    public String getTin() {
//        return tin;
//    }
//    public void setTin(String tin) {
//        this.tin = tin;
//    }
//    @Expose
//    private String tin;





    public String getAntifakeCode() {
        return antifakeCode;
    }

    public void setAntifakeCode(String antifakeCode) {
        this.antifakeCode = antifakeCode;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getCurrencyRate() {
        return currencyRate;
    }

    public void setCurrencyRate(String currencyRate) {
        this.currencyRate = currencyRate;
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

    public String getInvoiceId() {
        return invoiceId;
    }

    public void setInvoiceId(String invoiceId) {
        this.invoiceId = invoiceId;
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

    public String getInvoiceNo() {
        return invoiceNo;
    }

    public void setInvoiceNo(String invoiceNo) {
        this.invoiceNo = invoiceNo;
    }

    public String getInvoiceType() {
        return invoiceType;
    }

    public void setInvoiceType(String invoiceType) {
        this.invoiceType = invoiceType;
    }

    public String getIsBatch() {
        return isBatch;
    }

    public void setIsBatch(String isBatch) {
        this.isBatch = isBatch;
    }

    public String getIsInvalid() {
        return isInvalid;
    }

    public void setIsInvalid(String isInvalid) {
        this.isInvalid = isInvalid;
    }

    public String getIsPreview() {
        return isPreview;
    }

    public void setIsPreview(String isPreview) {
        this.isPreview = isPreview;
    }

    public String getIsRefund() {
        return isRefund;
    }

    public void setIsRefund(String isRefund) {
        this.isRefund = isRefund;
    }

    public String getIssuedDate() {
        return issuedDate;
    }

    public void setIssuedDate(String issuedDate) {
        this.issuedDate = issuedDate;
    }

    public String getIssuedDatePdf() {
        return issuedDatePdf;
    }

    public void setIssuedDatePdf(String issuedDatePdf) {
        this.issuedDatePdf = issuedDatePdf;
    }

    public String getOperator() {
        return operator;
    }

    public void setOperator(String operator) {
        this.operator = operator;
    }

}
