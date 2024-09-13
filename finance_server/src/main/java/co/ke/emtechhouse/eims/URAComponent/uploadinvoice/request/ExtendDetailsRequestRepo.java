package co.ke.emtechhouse.eims.URAComponent.uploadinvoice.request;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExtendDetailsRequestRepo extends JpaRepository<ExtendDetailsRequest,Long> {
    List<ExtendDetailsRequest> findByLocalInvoiceNo(String invoiceno);
}
