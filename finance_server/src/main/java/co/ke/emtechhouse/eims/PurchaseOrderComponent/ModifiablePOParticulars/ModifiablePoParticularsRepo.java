package co.ke.emtechhouse.eims.PurchaseOrderComponent.ModifiablePOParticulars;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ModifiablePoParticularsRepo extends JpaRepository<ModifiablePoParticulars, Long> {
}
