package co.ke.emtechhouse.eims.InvoiceComponent.AgingComponent;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface AgingRepo extends JpaRepository<Aging,Long> {
}
