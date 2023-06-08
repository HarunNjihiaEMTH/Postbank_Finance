package co.ke.emtechhouse.eims.URAComponent.uralookups.countrycodes;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CountryCodesRepository extends JpaRepository<CountryCodes,Long> {
}
