package co.ke.emtechhouse.eims.URAComponent.CreditNote.CreditNoteCancellation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CancelCreditNoteRepo extends JpaRepository<CancelCreditNote,Long> {


    @Query(nativeQuery = true, value = "SELECT * FROM cancel_credit_note WHERE invoice_no = :invoice_no")
    Optional<CancelCreditNote> findByInvoiceNo(@Param("invoice_no") String invoice_no);

    @Query(value = "select * from cancel_credit_note where status = :status",nativeQuery = true)
    List<CancelCreditNote> fetchByStatus(@Param("status") String status);

    @Query(nativeQuery = true, value = "SELECT * FROM cancel_credit_note WHERE status = 'Pending'")
    List<CancelCreditNote> findallpendingcreditnotes();

    @Query(nativeQuery = true, value = "SELECT * FROM cancel_credit_note WHERE status = 'Cancelled'")
    List<CancelCreditNote> findallcancelledcreditnotes();

    @Query(nativeQuery = true, value = "SELECT * FROM cancel_credit_note WHERE status = 'Approved'")
    List<CancelCreditNote> findallapprovedcreditnotes();

    @Query(nativeQuery = true, value = "SELECT * FROM cancel_credit_note WHERE posted_status = 'F'")
    List<CancelCreditNote> findallfailedcreditnotes();

    @Query(nativeQuery = true, value = "SELECT * FROM cancel_credit_note WHERE posted_status = 'Y'")
    List<CancelCreditNote> findallsuccessfulcreditnotes();
}
