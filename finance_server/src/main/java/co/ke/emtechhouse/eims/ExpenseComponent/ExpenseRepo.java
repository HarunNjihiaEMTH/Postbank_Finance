package co.ke.emtechhouse.eims.ExpenseComponent;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ExpenseRepo  extends JpaRepository<Expense, Long> {

    @Query(value = "SELECT expense_type FROM `expense` WHERE expense_description=:expense_name", nativeQuery = true)
    String getExpenseType(String  expense_name);

    @Query(value = "SELECT * FROM `expense` WHERE expense_type=:expense_type", nativeQuery = true)
    List<Expense> getExpensesByType(String  expense_type);

    Optional<Expense> findByExpenseDescription(String expenseDescription);
}
