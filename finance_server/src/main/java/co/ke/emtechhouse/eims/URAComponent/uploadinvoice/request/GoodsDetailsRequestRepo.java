package co.ke.emtechhouse.eims.URAComponent.uploadinvoice.request;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GoodsDetailsRequestRepo extends JpaRepository<GoodsDetailRequest,Long> {
    List<GoodsDetailRequest> findByLocalInvoiceNo(String invoiceno);
}
