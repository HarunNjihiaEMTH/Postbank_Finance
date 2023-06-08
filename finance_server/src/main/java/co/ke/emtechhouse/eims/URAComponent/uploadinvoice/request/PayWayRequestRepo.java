package co.ke.emtechhouse.eims.URAComponent.uploadinvoice.request;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PayWayRequestRepo extends JpaRepository<PayWayRequest,Long> {
    List<PayWayRequest> findByLocalInvoiceNo(String invoiceno);
}
