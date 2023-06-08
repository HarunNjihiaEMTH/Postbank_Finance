package co.ke.emtechhouse.eims.URAComponent.uploadinvoice.request;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Repository
public interface InvoiceAuditDetailsRepo extends JpaRepository<InvoiceAuditDetails,Long> {
    @Transactional
    @Modifying
    @Query(nativeQuery = true,value = "UPDATE invoicesauditdetails SET status = :status,reason =:reason,verified_by=:verified_by,verified_flag=:verified_flag,verified_time=:verified_time WHERE local_invoice_no = :local_invoice_no")
    void approveOrReject(
            @Param(value = "status") String status,
            @Param(value = "reason") String reason,
            @Param(value = "verified_by") String verified_by,
            @Param(value = "verified_time") Date verified_time,
            @Param(value = "verified_flag") String verified_flag,
            @Param(value = "local_invoice_no") String invoiceno
    );


    @Transactional
    @Modifying
    @Query(nativeQuery = true,value = "UPDATE invoicesauditdetails SET deleted_by=:deleted_by,deleted_flag=:deleted_flag,deleted_time=:deleted_time WHERE local_invoice_no = :local_invoice_no")
    void deleteInvoice(
            @Param(value = "deleted_by") String deleted_by,
            @Param(value = "deleted_flag") String deleted_flag,
            @Param(value = "deleted_time") Date deleted_time,
            @Param(value = "local_invoice_no") String invoiceno
    );

    @Transactional
    @Query(nativeQuery = true,value = "SELECT deleted_flag,posted_touraflag,verified_flag,status FROM invoicesauditdetails WHERE local_invoice_no = :local_invoice_no")
    String selectCurrentStatus(
            @Param(value = "local_invoice_no") String invoiceno
    );

    List<InvoiceAuditDetails> findByLocalInvoiceNo(String invoiceno);

    @Transactional
    @Modifying
    @Query(nativeQuery = true,value = "UPDATE invoicesauditdetails SET posted_touraby=:posted_touraby,posted_touraflag=:posted_touraflag,posted_touratime=:posted_touratime WHERE local_invoice_no = :local_invoice_no")
    void updatePostedToURAFlagAndPostedBy(
            @Param(value = "posted_touraby") String posted_touraby,
            @Param(value = "posted_touraflag") String posted_touraflag,
            @Param(value = "posted_touratime") Date posted_touratime,
            @Param(value = "local_invoice_no") String invoiceno
    );

}
