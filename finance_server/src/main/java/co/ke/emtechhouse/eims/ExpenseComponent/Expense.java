package co.ke.emtechhouse.eims.ExpenseComponent;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    @Column(nullable = false)
    private String expenseCode;
    @Column(nullable = false)
    private String expenseDescription;
    @Column(nullable = false)
    private String expenseMajorCategory;
    @Column(nullable = false)
    private String expenseSubCategory;
//    @Column(nullable = false)
//    private String expenseAccount;
    private String glCode;
//    private String accountCurrencyCode;
    private String expense_type;
//    private Boolean isPointing;
    private String status = "pending";
    private String reason = "-";
    @Column()
    private String postedBy;
    @Column()
    private Character postedFlag = 'Y';
    @Column()
    private Date postedTime;
    @Column()
    private String modifiedBy;
    @Column()
    private Character modifiedFlag = 'N';
    private Date modifiedTime;
    @Column()
    private String verifiedBy;
    @Column()
    private Character verifiedFlag = 'N';
    private Date verifiedTime;
    @Column()
    private String deletedBy;
    @Column()
    private Character deletedFlag = 'N';
    private Date deletedTime;

}
