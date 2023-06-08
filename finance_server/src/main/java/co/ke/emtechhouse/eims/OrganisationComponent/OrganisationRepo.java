package co.ke.emtechhouse.eims.OrganisationComponent;

import co.ke.emtechhouse.eims.InvoiceComponent.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrganisationRepo extends JpaRepository<Organisation, Long> {
    @Query(value = "SELECT * FROM `organisation` ORDER BY id DESC LIMIT 1", nativeQuery = true)
    Organisation getOrganizationDetail();
}
