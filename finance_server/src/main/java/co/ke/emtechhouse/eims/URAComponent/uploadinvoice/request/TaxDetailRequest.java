
package co.ke.emtechhouse.eims.URAComponent.uploadinvoice.request;

import javax.annotation.Generated;
import javax.persistence.*;

import com.google.gson.annotations.Expose;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Generated("net.hexar.json2pojo")
@Entity
@Table(name = "taxdetailsrequest")
@NoArgsConstructor
@AllArgsConstructor
@SuppressWarnings("unused")
public class TaxDetailRequest {

    @Expose
    private String grossAmount;
    @Expose
    private String netAmount;
    @Expose
    private String taxAmount;
    @Expose
    private String taxCategoryCode;
    @Expose
    private String taxRate;
    @Expose
    private String taxRateName;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;

    @Expose
    private String localInvoiceNo;

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
