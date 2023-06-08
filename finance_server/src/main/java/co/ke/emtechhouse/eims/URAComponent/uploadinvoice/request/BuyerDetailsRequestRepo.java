package co.ke.emtechhouse.eims.URAComponent.uploadinvoice.request;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface BuyerDetailsRequestRepo extends JpaRepository<BuyerDetailsRequest,Long> {
    //Fetch All Approved Invoices
    @Transactional
    @Query(nativeQuery = true,value = "select * from buyerdetailsrequest a join invoicesauditdetails b ON  a.local_invoice_no = b.local_invoice_no AND b.status ='Approved' AND b.deleted_flag ='N' AND b.verified_flag='Y' AND b.posted_touraflag != 'Y'")
    List<BuyerDetailsRequest> allApproved();

    //Fetch All Rejected Invoices
    @Transactional
    @Query(nativeQuery = true,value = "select * from buyerdetailsrequest a join invoicesauditdetails b ON  a.local_invoice_no = b.local_invoice_no AND b.status ='Rejected' AND b.deleted_flag ='N' AND b.verified_flag='Y'")
    List<BuyerDetailsRequest> allRejected();

    //Fetch All Pending Invoices
    @Transactional
    @Query(nativeQuery = true,value = "select * from buyerdetailsrequest a join invoicesauditdetails b ON  a.local_invoice_no = b.local_invoice_no AND b.status ='Pending' AND b.deleted_flag ='N' AND b.verified_flag='N'")
    List<BuyerDetailsRequest> allPending();

    List<BuyerDetailsRequest> findByLocalInvoiceNo(String invoiceno);
}
