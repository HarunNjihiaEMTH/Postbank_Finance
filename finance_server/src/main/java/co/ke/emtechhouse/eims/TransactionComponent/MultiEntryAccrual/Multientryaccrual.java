package co.ke.emtechhouse.eims.TransactionComponent.MultiEntryAccrual;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Multientryaccrual {
    private Date collectionDate;
    private Double amount;
    private Long supplierId;
    private String supplierName;
    private String accrualAccount;
    private String accountName;
    private String currency = "UGX";
    private Long costCenterId;
    private String costCenterName;
    private Long expenseId;
    private String expenseName;
    private String expenseType;
    private String description;
    private String customDebitAccount;
    private String debitFrom; //ExpenseAc / BalancesheetAc
    private String postedBy;
}
