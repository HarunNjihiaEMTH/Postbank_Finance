package co.ke.emtechhouse.eims.InvoiceComponent;

import co.ke.emtechhouse.eims.PurchaseOrderComponent.PurchaseOrder;
import co.ke.emtechhouse.eims.PurchaseOrderComponent.PurchaseOrderRepo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface InvoiceRepo extends JpaRepository <Invoice, Long> {
    Optional<Invoice> findById(Long id);
    @Query(value = "SELECT * FROM `invoice` WHERE invoice.invoice_status LIKE :Status  AND invoice.posted_time BETWEEN :fromDate AND :toDate", nativeQuery = true)
    List<Invoice> checkInvoiceifExist(String Status, String fromDate, String toDate);
    @Query(value = "SELECT * FROM `invoice` WHERE invoice_No =:invoiceNo LIMIT 1", nativeQuery = true)
    List<Invoice> checkByInvoiceNumber(String invoiceNo);
    @Query(value = "SELECT * FROM `invoice` WHERE invoice_status='Approved'", nativeQuery = true)
    List<Invoice> getApproved();
    @Query(value = "SELECT * FROM `invoice` WHERE invoice_status='Approved' and payment_status='Unpaid'", nativeQuery = true)
    List<Invoice> getpendinginvoices();
    @Query(value = "SELECT * FROM `invoice` WHERE invoice_No =:invoiceNo", nativeQuery = true)
    Optional<Invoice> getByInvoiceNumber(String invoiceNo);

    @Query(value ="SELECT MONTHNAME(invoice.issued_date) as Identity, COUNT(*) AS invoiceno_no " +
            "FROM invoice WHERE YEAR(invoice.issued_date) LIKE:year" +
            " GROUP BY MONTHNAME(invoice.issued_date) ORDER BY id ASC",
            nativeQuery = true)
    List<countPerMonth> invoiceMonthWise(String year);


    interface  countPerMonth{
        String getIdentity();
        Integer getInvoiceno_no();
    }

    @Query(value = "SELECT DATE(invoice.issued_date) AS Identity, " +
            "COUNT(*) AS invoiceno_no " +
            "FROM invoice " +
            "WHERE YEAR(invoice.issued_date) LIKE:year AND MONTHNAME(invoice.issued_date) LIKE:month " +
            "GROUP BY DATE(invoice.issued_date) ORDER BY id ASC" , nativeQuery = true)
    List<countPerMonth> invoiceDateWise( String year, String month);

    @Query(value = "SELECT YEAR(invoice.issued_date) AS Identity, " +
            "COUNT(*) AS invoiceno_no " +
            "FROM invoice " +
            "GROUP BY YEAR(invoice.issued_date) " +
            "ORDER BY YEAR(invoice.issued_date) ", nativeQuery = true)
    List<countPerMonth> invoiceYearWise();
}

