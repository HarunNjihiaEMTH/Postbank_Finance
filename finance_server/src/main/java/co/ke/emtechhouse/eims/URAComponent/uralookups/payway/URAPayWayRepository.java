package co.ke.emtechhouse.eims.URAComponent.uralookups.payway;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface URAPayWayRepository extends JpaRepository<URAPayWay,Long> {
}
