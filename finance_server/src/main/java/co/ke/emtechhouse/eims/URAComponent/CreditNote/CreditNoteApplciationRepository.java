package co.ke.emtechhouse.eims.URAComponent.CreditNote;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CreditNoteApplciationRepository extends JpaRepository<CreditNote,Long> {

    @Query(value = "select * from credit_note where ori_invoice_no =:invoicNO",nativeQuery = true)
    Optional<CreditNote> findByInvoiNo(String invoicNO);

    @Query(value = "select * from credit_note where status =:crstatus",nativeQuery = true)
    List<CreditNote> findByStatus(@Param("crstatus") String status);
    @Query(value = "select * from credit_note where ura_status ='Successful'",nativeQuery = true)
    List<CreditNote> findSuccessful();
    @Query(value = "select * from credit_note where ura_status ='Failed'",nativeQuery = true)
    List<CreditNote> findFailed();
}
