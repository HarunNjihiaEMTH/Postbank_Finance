package co.ke.emtechhouse.eims.URAComponent.uploadinvoice.response;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BasicInfoRepository extends JpaRepository<BasicInfoResponse,Long> {
    List<BasicInfoResponse> findByinvoiceNo(String invoiceno);
}
