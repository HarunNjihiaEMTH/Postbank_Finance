package co.ke.emtechhouse.eims.CostCentersComponent.ExpensesComponent;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.Column;
import java.util.Optional;

@Repository
public interface ExpensesRepo extends JpaRepository<Expenses, Long> {
    Optional<Expenses> findByExpenseIdAndCostcenterId(Long expenseId, Long costcenterId);
}
