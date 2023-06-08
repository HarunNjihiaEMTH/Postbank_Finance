
package co.ke.emtechhouse.eims.URAComponent.uploadinvoice.response;

import com.google.gson.annotations.Expose;

import javax.persistence.*;

@Entity
@Table(name = "urataxdetails")
@SuppressWarnings("unused")
public class TaxDetailResponse {
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
    private String grossAmount;
    @Expose
    private String netAmount;
    @Expose
    private String taxAmount;
    @Expose
    private String taxCategory;
    @Expose
    private String taxCategoryCode;
    @Expose
    private String taxRate;
    @Expose
    private String taxRateName;
    @Expose
    private String invoiceId;
    @Expose
    private String customerid;

    public String getGrossAmount() {
        return grossAmount;
    }

    public void setGrossAmount(String grossAmount) {
        this.grossAmount = grossAmount;
    }

    public String getNetAmount() {
        return netAmount;
    }

    public void setNetAmount(String netAmount) {
        this.netAmount = netAmount;
    }

    public String getTaxAmount() {
        return taxAmount;
    }

    public void setTaxAmount(String taxAmount) {
        this.taxAmount = taxAmount;
    }

    public String getTaxCategory() {
        return taxCategory;
    }

    public void setTaxCategory(String taxCategory) {
        this.taxCategory = taxCategory;
    }

    public String getTaxCategoryCode() {
        return taxCategoryCode;
    }

    public void setTaxCategoryCode(String taxCategoryCode) {
        this.taxCategoryCode = taxCategoryCode;
    }

    public String getTaxRate() {
        return taxRate;
    }

    public void setTaxRate(String taxRate) {
        this.taxRate = taxRate;
    }

    public String getTaxRateName() {
        return taxRateName;
    }

    public void setTaxRateName(String taxRateName) {
        this.taxRateName = taxRateName;
    }

}
