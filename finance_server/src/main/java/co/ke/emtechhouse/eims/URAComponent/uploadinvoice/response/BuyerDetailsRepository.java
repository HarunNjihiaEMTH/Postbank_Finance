package co.ke.emtechhouse.eims.URAComponent.uploadinvoice.response;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BuyerDetailsRepository extends JpaRepository<BuyerDetsResponse,Long> {
    List<BuyerDetsResponse> findByinvoiceId(String invoiceno);
}
