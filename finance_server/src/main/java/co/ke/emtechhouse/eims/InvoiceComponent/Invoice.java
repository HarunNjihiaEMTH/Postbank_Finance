package co.ke.emtechhouse.eims.InvoiceComponent;

import co.ke.emtechhouse.eims.InvoiceComponent.InvoiceParticulars.InvoiceParticulars;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class
Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String invoiceNo = "00000000001";
    private String customerId;
    private String antifakeCode = "201905081711";
    private String deviceNo = "201905081234";
    private Date issuedDate ;

    public Long getId() {
        return id;
    }

    public String getInvoiceNo() {
        return invoiceNo;
    }

    public String getCustomerId() {
        return customerId;
    }

    public String getAntifakeCode() {
        return antifakeCode;
    }

    public String getDeviceNo() {
        return deviceNo;
    }

    public Date getIssuedDate() {
        return issuedDate;
    }

    public String getOperator() {
        return operator;
    }

    public String getCurrency() {
        return currency;
    }

    public String getOriInvoiceId() {
        return oriInvoiceId;
    }

    public String getInvoiceType() {
        return invoiceType;
    }

    public String getInvoiceKind() {
        return invoiceKind;
    }

    public String getDataSource() {
        return dataSource;
    }

    public String getInvoiceIndustryCode() {
        return invoiceIndustryCode;
    }

    public String getIsBatch() {
        return isBatch;
    }

    public String getInvoiceStatus() {
        return invoiceStatus;
    }

    public String getReason() {
        return reason;
    }

    public String getPostedBy() {
        return postedBy;
    }

    public Character getPostedFlag() {
        return postedFlag;
    }

    public Date getPostedTime() {
        return postedTime;
    }

    public String getModifiedBy() {
        return modifiedBy;
    }

    public Character getModifiedFlag() {
        return modifiedFlag;
    }

    public Date getModifiedTime() {
        return modifiedTime;
    }

    public String getVerifiedBy() {
        return verifiedBy;
    }

    public Character getVerifiedFlag() {
        return verifiedFlag;
    }

    public Date getVerifiedTime() {
        return verifiedTime;
    }

    public String getDeletedBy() {
        return deletedBy;
    }

    public Character getDeletedFlag() {
        return deletedFlag;
    }

    public Date getDeletedTime() {
        return deletedTime;
    }

    public Double getVat_received() {
        return vat_received;
    }

    public Double getIncome_wth_received() {
        return income_wth_received;
    }

    public Double getTotal_before_tax() {
        return total_before_tax;
    }

    public Double getTotal_after_tax() {
        return total_after_tax;
    }

    public Double getBalance() {
        return balance;
    }

    public Double getTax_amount() {
        return tax_amount;
    }

    public Double getPayment_amount() {
        return payment_amount;
    }

    public String getPayment_status() {
        return payment_status;
    }

    public String getDeemedFlag() {
        return deemedFlag;
    }

    public String getDiscountFlag() {
        return discountFlag;
    }

    public Double getDiscountTaxRate() {
        return discountTaxRate;
    }

    public Double getDiscountTotal() {
        return discountTotal;
    }

    public String getExciseCurrency() {
        return exciseCurrency;
    }

    public String getExciseFlag() {
        return exciseFlag;
    }

    public String getExciseRate() {
        return exciseRate;
    }

    public String getExciseRateName() {
        return exciseRateName;
    }

    public String getExciseRule() {
        return exciseRule;
    }

    public String getExciseTax() {
        return exciseTax;
    }

    public String getExciseUnit() {
        return exciseUnit;
    }

    public List<InvoiceParticulars> getInvoiceParticulars() {
        return invoiceParticulars;
    }

    private String operator = "aisino";
    private String currency = "UGX";
    private String oriInvoiceId = "1";
    private String invoiceType = "1";
    private String invoiceKind = "1";
    private String dataSource = "101";
    private String invoiceIndustryCode = "102";
    private String isBatch = "0";
    private String invoiceStatus;
    private String reason = "-";
    private String postedBy;
    private Character postedFlag;
    private Date postedTime;
    private String modifiedBy;
    private Character modifiedFlag;
    private Date modifiedTime;
    private String verifiedBy;
    private Character verifiedFlag;
    private Date verifiedTime;
    private String deletedBy;
    private Character deletedFlag;
    private Date deletedTime;
    private Double vat_received;
    private Double income_wth_received;
    private Double total_before_tax;
    private Double total_after_tax;
    private Double balance=0.00;
    private Double tax_amount=0.00;
    private Double payment_amount=0.00;
    private String payment_status="Unpaid";
    private String deemedFlag;
    private  String discountFlag;
    private Double discountTaxRate;
    private Double discountTotal;
    private  String exciseCurrency;
    private String exciseFlag;
    private String exciseRate;
    private String exciseRateName;
    private String exciseRule;
    private String exciseTax;
    private String exciseUnit;





    @OneToMany(targetEntity = InvoiceParticulars.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "invoice_id", referencedColumnName = "id")
    private List<InvoiceParticulars> invoiceParticulars;


//    @OneToMany(targetEntity = InvoiceParticulars.class, cascade = CascadeType.ALL)
//    @JoinColumn(name = "invoice_id", referencedColumnName = "id")
//    private List<InvoiceParticulars> invoiceParticulars;

}
