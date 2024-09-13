package co.ke.emtechhouse.eims.URAComponent.uralookups.unitsofmeasure;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UnitsOfMeasureRepository extends JpaRepository<UnitsOfMeasure,Long> {
}
