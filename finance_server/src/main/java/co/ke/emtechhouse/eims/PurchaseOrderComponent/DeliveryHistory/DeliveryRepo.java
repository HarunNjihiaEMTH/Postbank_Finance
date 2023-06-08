package co.ke.emtechhouse.eims.PurchaseOrderComponent.DeliveryHistory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeliveryRepo extends JpaRepository<Delivery, Long> {
}
