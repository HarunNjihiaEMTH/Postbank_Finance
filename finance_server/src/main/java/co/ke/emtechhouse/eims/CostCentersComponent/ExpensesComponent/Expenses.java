package co.ke.emtechhouse.eims.CostCentersComponent.ExpensesComponent;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class Expenses {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    @Column(nullable = false)
    private String expense;
    @Column(nullable = false)
    private Long expenseId;
    @Column(nullable = false)
    private String expenseAccount;
    private String expenseAccountName;
    private Boolean isPointing = false;
    private Long costcenterId;
}
