package co.ke.emtechhouse.eims.TransactionComponent.CollectAccrualExpenses;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CollectaccrualExpensesRepo extends JpaRepository<CollectaccrualExpenses,Long> {
}
