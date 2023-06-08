package co.ke.emtechhouse.eims.TransactionComponent.PointingContraDetails;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PointingAccountContraDetailsRepo extends JpaRepository<PointingAccountContraDetails,Long> {
}
