package co.ke.emtechhouse.eims.URAComponent.uploadinvoice.request;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BasicInfoRequestRepo extends JpaRepository<BasicInformationRequest,Long> {
    List<BasicInformationRequest> findByLocalInvoiceNo(String invoiceno);
}
