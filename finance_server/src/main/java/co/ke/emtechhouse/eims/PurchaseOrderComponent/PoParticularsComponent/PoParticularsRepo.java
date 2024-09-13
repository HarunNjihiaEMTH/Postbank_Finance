package co.ke.emtechhouse.eims.PurchaseOrderComponent.PoParticularsComponent;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PoParticularsRepo extends JpaRepository <PoParticulars, Long>{
}
