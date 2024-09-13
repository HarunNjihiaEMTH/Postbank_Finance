package co.ke.emtechhouse.eims.PurchaseOrderComponent;

import co.ke.emtechhouse.eims.PurchaseOrderComponent.ModifiablePOParticulars.ModifiablePoParticulars;
import co.ke.emtechhouse.eims.PurchaseOrderComponent.PoParticularsComponent.PoParticulars;
import com.fasterxml.jackson.annotation.JsonProperty;
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
public class PurchaseOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    @Column(unique = true,updatable = false, nullable = false)
    private String poNumber;
    private String invoice_no;
    private String invoice_date;
    private Double invoice_amount;
    private Long expenseId;
    private String poName;
    private String cancelStatus;
    private String cancelReason;
    private String canceledBy;
    private Date canceledTime;
    private Double originalTotalBeforeTax;
    private Double originalVatAmount;
    private Double originalIncomeWithholdingamount;
    private Double originalVatWitholding;
    private Double originalTotalAfterTax;

    private Double currentPoTotalAmount;//make it to be pending by default
    private Double currentTotalBeforeTax;
    private Double curentVatAmount;
    private Double currentVatAmount;
    private Double currentIncomeWithholdingamount;
    private Double curentVatWitholding;
    private Double currentTotalAfterTax;

    private String poStatus ="Pending";
    private String supplierContact;
    private Long supplierId;
    private String supplierAddress;
    private String supplierMobile;
    private String supplierName;
    private String supplierAccount;
    private Long correspondedInvoiceNumber;
    private Boolean paymentStatus;
    private String reason = "-";
    private Boolean isSent = false;
    private Boolean inProgress = false;

    private String postedBy;
    private Character postedFlag = 'Y';
    private Date postedTime;
    private String modifiedBy;
    private Character modifiedFlag = 'N';
    private Date modifiedTime;
    private String verifiedBy;
    private Character verifiedFlag = 'N';
    private Date verifiedTime;
    private String deletedBy;
    private Character deletedFlag = 'N';
    private Date deletedTime;
    private Boolean moveToBill=false;
    private Boolean isPaid = false;
    String month;
    String year;


    @OneToMany(targetEntity = PoParticulars.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "purchaseOrder_id", referencedColumnName = "id")
    private List<PoParticulars> poParticulars;

    @OneToMany(targetEntity = ModifiablePoParticulars.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "purchaseOrder_id", referencedColumnName = "id")
    private List<ModifiablePoParticulars>  modifiablePoParticulars;


}

