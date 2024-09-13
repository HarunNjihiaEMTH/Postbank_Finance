package co.ke.emtechhouse.eims.CostCentersComponent;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CostcentersRepo extends JpaRepository<Costcenters, Long> {
    @Query(value = "SELECT expenses.id as expenseId, costcenters.cost_center_name as costCentername, costcenters.id as costCenterid, costcenters.vat_account as costCentervataccount, costcenters.income_withholding_account as costCenteriwaccount,\n" +
            "expenses.expense_account as expenseAccount, expenses.expense as expenseName, \n" +
            "costcenters.verified_flag as verifiedFlag FROM costcenters JOIN expenses ON costcenters.id = expenses.costcenter_id WHERE expenses.expense_id =:expense_id AND costcenters.deleted_flag = 'N'",nativeQuery = true)
    List<CostCentersPerExpense> getCostCentersPerExpense(String expense_id);
    Optional<Costcenters> findByCostCenterName(String costCenterName);
    interface CostCentersPerExpense {
        String getCostCentername();
        String getCostCenterid();
        String getCostCentervataccount();
        String getCostCenteriwaccount();
        String getVerifiedflag();
        String getExpenseId();
        String getExpenseAccount();
        String getExpenseName();
    }
    @Query(value = "SELECT expense.id as ExpenseId, expense_description as ExpenseName,costcenters.id as CostCenterId, costcenters.cost_center_name as CostCenterName, expenses.expense_account as ExpenseAccount FROM expense join expenses on expenses.expense_id = expense.id join costcenters on expenses.costcenter_id = costcenters.id WHERE costcenters.id=:costCenterId AND expense.id =:expenseId AND costcenters.deleted_flag  = 'N' AND expense.deleted_flag = 'N' limit 1",nativeQuery = true)
    Optional<ExpenseAccount> getCostCentersPerExpense(Long costCenterId, Long expenseId);
    interface ExpenseAccount {
        Long getCostCenterId();
        String getCostCenterName();
        Long getExpenseId();
        String getExpenseName();
        String getExpenseAccount();
    }

}
