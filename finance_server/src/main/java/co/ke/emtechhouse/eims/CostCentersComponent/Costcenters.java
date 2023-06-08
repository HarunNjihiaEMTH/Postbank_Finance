package co.ke.emtechhouse.eims.CostCentersComponent;

import co.ke.emtechhouse.eims.CostCentersComponent.ExpensesComponent.Expenses;
import co.ke.emtechhouse.eims.ExpenseComponent.Expense;
import co.ke.emtechhouse.eims.PurchaseOrderComponent.PoParticularsComponent.PoParticulars;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class Costcenters {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    @Column(nullable = false, unique = true)
    private String costCenterCode;
    private String costCenterName;
    private String costCenterDescription;
    private String vatAccount;
    private String incomeWithholdingAccount;
    private String status = "Pending";
    private String reason = "N/A";
    private String postedBy = "System";
    private Character postedFlag = 'Y';
    private Date postedTime;
    private String modifiedBy;
    private Character modifiedFlag = 'N';
    private Date modifiedTime;
    private String verifiedBy;
    private Character verifiedFlag  = 'N';
    private Date verifiedTime;
    private String deletedBy;
    private Character deletedFlag  = 'N';
    private Date deletedTime;
    @OneToMany(targetEntity = Expenses.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "costcenterId", referencedColumnName = "id")
    private List<Expenses> expenses;
}
