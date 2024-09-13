package co.ke.emtechhouse.eims.URAComponent.uploadinvoice.request;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AirlineGoodsRequestRepo extends JpaRepository<AirlineGoodsRequest,Long> {
    List<AirlineGoodsRequest> findByLocalInvoiceNo(String invoiceno);
}
