
package co.ke.emtechhouse.eims.URAComponent.uploadinvoice.response;

import com.google.gson.annotations.Expose;

import javax.persistence.*;

@Entity
@Table(name = "urabuyerdetails")
@SuppressWarnings("unused")
public class BuyerDetsResponse {
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getInvoiceId() {
        return invoiceId;
    }

    public void setInvoiceId(String invoiceId) {
        this.invoiceId = invoiceId;
    }

    public String getCustomerid() {
        return customerid;
    }

    public void setCustomerid(String customerid) {
        this.customerid = customerid;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    @Expose
    private String buyerBusinessName;
    @Expose
    private String buyerCitizenship;
    @Expose
    private String buyerLegalName;
    @Expose
    private String buyerSector;
    @Expose
    private String buyerTin;
    @Expose
    private String buyerType;
    @Expose
    private String dateFormat;
    @Expose
    private String nowTime;
    @Expose
    private Long pageIndex;
    @Expose
    private Long pageNo;
    @Expose
    private Long pageSize;
    @Expose
    private String timeFormat;

    @Expose
    private String invoiceId;
    @Expose
    private String customerid;
    @Expose
    private String creditNoteStatus="Pending";

    public String getCreditNoteStatus() {
        return creditNoteStatus;
    }

    public void setCreditNoteStatus(String creditNoteStatus) {
        this.creditNoteStatus = creditNoteStatus;
    }

    public String getBuyerBusinessName() {
        return buyerBusinessName;
    }

    public void setBuyerBusinessName(String buyerBusinessName) {
        this.buyerBusinessName = buyerBusinessName;
    }

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

    public String getDateFormat() {
        return dateFormat;
    }

    public void setDateFormat(String dateFormat) {
        this.dateFormat = dateFormat;
    }

    public String getNowTime() {
        return nowTime;
    }

    public void setNowTime(String nowTime) {
        this.nowTime = nowTime;
    }

    public Long getPageIndex() {
        return pageIndex;
    }

    public void setPageIndex(Long pageIndex) {
        this.pageIndex = pageIndex;
    }

    public Long getPageNo() {
        return pageNo;
    }

    public void setPageNo(Long pageNo) {
        this.pageNo = pageNo;
    }

    public Long getPageSize() {
        return pageSize;
    }

    public void setPageSize(Long pageSize) {
        this.pageSize = pageSize;
    }

    public String getTimeFormat() {
        return timeFormat;
    }

    public void setTimeFormat(String timeFormat) {
        this.timeFormat = timeFormat;
    }

}
