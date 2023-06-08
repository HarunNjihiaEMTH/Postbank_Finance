package co.ke.emtechhouse.eims.TransactionComponent.PaymentExpenses;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentExpensesRepo extends JpaRepository<PaymentExpenses, Long> {
}
