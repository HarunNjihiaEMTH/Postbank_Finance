package co.ke.emtechhouse.eims.URAComponent.uploadinvoice.request;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface SaveInvoiceDetailsRepository extends JpaRepository<SaveInvoiceDetails,Long> {
    @Transactional
    @Modifying
    @Query(nativeQuery = true,value = "UPDATE urainvoices SET uracode=:uracode, uradescription= :uradescription,invoiceno=:invoiceno WHERE uradescription= 'Pending' AND customerid=:customerid")
    void updateURAstatus(
            @Param(value = "uracode") String code,
            @Param(value = "uradescription") String description,
            @Param(value = "invoiceno") String invoiceno,
            @Param(value = "customerid") String customerid
    );

    @Transactional
    @Query(nativeQuery = true,value = "SELECT * FROM urainvoices WHERE uradescription = 'SUCCESS' AND paymentstatus != 'Fully Paid'")
    List<SaveInvoiceDetails> allSuccessfullyUploaded();

    @Transactional
    @Query(nativeQuery = true,value = "SELECT * FROM urainvoices WHERE uradescription = 'SUCCESS' AND paymentstatus != 'Fully Paid' and  invoiceno=:invoiceno")
    Optional<SaveInvoiceDetails> allSuccessfulPerInvoiceNo(String invoiceno);

    @Transactional
    @Query(nativeQuery = true,value = "SELECT * FROM urainvoices WHERE uradescription = 'SUCCESS' AND paymentstatus = 'Fully Paid'")
    List<SaveInvoiceDetails> allSuccessfullyUploadedAndFullyPaid();

    @Transactional
    @Query(nativeQuery = true,value = "SELECT * FROM urainvoices WHERE uradescription != 'SUCCESS'")
    List<SaveInvoiceDetails> allUploadedButFailed();


    @Transactional
    @Query(nativeQuery = true,value = "SELECT * FROM urainvoices WHERE invoiceno = :invoiceno")
    Optional<SaveInvoiceDetails> getInvoiceDetails(String invoiceno);

}
