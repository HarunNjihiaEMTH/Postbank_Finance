package co.ke.emtechhouse.eims.InvoiceComponent.ImportServicesSeller;

import co.ke.emtechhouse.eims.URAComponent.uploadinvoice.response.ImportServiceSellerResponse;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImportServicesSellerRepo extends JpaRepository<ImportServiceSellerResponse, Long> {
}
