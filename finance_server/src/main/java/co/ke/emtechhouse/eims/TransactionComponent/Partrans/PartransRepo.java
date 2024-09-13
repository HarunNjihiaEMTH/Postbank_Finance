package co.ke.emtechhouse.eims.TransactionComponent.Partrans;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PartransRepo extends JpaRepository<Partrans,Long> {
}
