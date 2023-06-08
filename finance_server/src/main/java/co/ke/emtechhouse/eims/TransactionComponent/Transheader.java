package co.ke.emtechhouse.eims.TransactionComponent;

import co.ke.emtechhouse.eims.TransactionComponent.CollectAccrualCostCenters.AccrualCostCenters;
import co.ke.emtechhouse.eims.TransactionComponent.InvoiceDocuments.Invoicedocument;
import co.ke.emtechhouse.eims.TransactionComponent.PaymentExpenses.PaymentExpenses;
import co.ke.emtechhouse.eims.TransactionComponent.Partrans.Partrans;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class Transheader {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    private Long supplierId;
    private String trnType = "T";
    private String tranSubType="BI";
    private String rateCode = "TTB";
    private String treaRefNum = "-";
    private String supplierName= "-";
    private String expenseType= "-"; //goods or service
    private String producttype = "-"; //local or imports
    private String transactiontype; //collect_accrual // pay_accrual / direct_transfer / pay_po / pay_without_po
    private String havePo = "-";
    private String incurTax = "-";
    private String invoiceNo = "-";
    private String invoiceDate;
    private String tranId;
    private String tranDate;
    private String finacleStatus="Pending";
    private String status="Pending";
    private String reason;
    private String transactionCode;
    private Integer retrycount=0;
    private String poNumber;
    private Long poId;
    private String supplierAccount;
    private String vatAccount;
    private String iwtAccount = "-";
    private Double grossAmount = 0.00;
    private Double netAmount = 0.00;
    private Double amountExcTax = 0.00;
    private String invoiceRefNo = "-";
    private Double supplierAmount = 0.00;
    private Double vatAmount = 0.00;
    private Double iwtAmount = 0.00;
    private String incurVatWH = "-";
    private String incurIncomeWH = "-";
    private String haveInvoice = "-";
    private String vatRate = "-";
    private String vatWHRate = "-";
    private String incomeWHRate = "18";
    private String conversionRate = "1";
    private String currency = "UGX";
    private Double invoiceAmount = 0.00;
    private String paymentMode = "-";
    private Double tranAmount = 0.00;
//    selectedCostCenters: [""], will come as array
    private Date verifiedTime;
    private String verifiedBy;
    private String postedBy;
    private Date postedTime = new Date();

    private String transTypeInfo;
    private String modifiedBy;
    private Date modifiedTime;
    private String deletedBy;
    private Date deletedTime;
    private Character deletedFlag = 'N';
    private String description;
    private String debitAccount;
    private String customDebitAccount;
    private String accrualAccountName;
    private String accrualAccount;
    private Double totalDebitAmt = 0.00;
    private String tranType = "-";
    private String collectAcrualTransId;
    private Date collectionDate;
    private String debitFrom = "-";//ExpenseAc/BalanceSheet
    private String rate = "-";
    private String taxRate = "-";
    private String currencyCode="UGX";
    private String variance = "-";

    private Double vwhtAmount = 0.00;
    private Double taxAmount = 0.00;
    @OneToMany(targetEntity = Partrans.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "Transheader_id", referencedColumnName = "id")
    private List<Partrans> partrans;
    @OneToMany(targetEntity = AccrualCostCenters.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "Transheader_id", referencedColumnName = "id")
    private List<AccrualCostCenters> selectedCostCenters;
    @OneToMany(targetEntity = PaymentExpenses.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "Transheader_id", referencedColumnName = "id")
    private List<PaymentExpenses> paymentExpenses;
    @OneToMany(fetch = FetchType.LAZY, targetEntity = Invoicedocument.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "Transheader_id", referencedColumnName = "id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private  List<Invoicedocument> documents;
}
