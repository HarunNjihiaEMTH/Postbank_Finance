package co.ke.emtechhouse.eims.TransactionComponent.InvoiceDocuments;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface InvoicedocumentRepo extends JpaRepository<Invoicedocument, Long> {
    @Query(value="SELECT * from invoicedocument WHERE invoicedocument.transheader_id LIKE :transheader_id",nativeQuery = true)
    List<Invoicedocument> getDocument(String transheader_id);
}
