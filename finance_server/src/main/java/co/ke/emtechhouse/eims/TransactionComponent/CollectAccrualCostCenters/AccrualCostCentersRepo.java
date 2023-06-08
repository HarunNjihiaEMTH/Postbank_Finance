package co.ke.emtechhouse.eims.TransactionComponent.CollectAccrualCostCenters;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccrualCostCentersRepo extends JpaRepository<AccrualCostCenters, Long> {
}
