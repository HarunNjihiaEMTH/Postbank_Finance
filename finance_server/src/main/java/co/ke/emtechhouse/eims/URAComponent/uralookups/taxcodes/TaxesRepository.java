package co.ke.emtechhouse.eims.URAComponent.uralookups.taxcodes;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaxesRepository extends JpaRepository<Tax, Long> {

}
