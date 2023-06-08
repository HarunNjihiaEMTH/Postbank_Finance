package co.ke.emtechhouse.eims.URAComponent.receivepayment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Repository
public interface ReceivePaymentRepository extends JpaRepository<ReceivePaymentRequest,Long> {
    @Transactional
    @Query(nativeQuery = true,value = "SELECT * FROM receivepayment WHERE invoiceno =:invoiceno AND buyertin=:buyertin AND receivedstatus != 'Fully Paid'")
    List<ReceivePaymentRequest> getPaymentDetails(
            @Param(value = "invoiceno") String invoiceno,
            @Param(value = "buyertin") String buyertin
    );

    @Transactional
    @Modifying
    @Query(nativeQuery = true,value = "UPDATE receivepayment SET receivedby=:receivedby,receivedtime=:receivedtime,receivedamount=:receivedamount,receivedstatus=:receivedstatus WHERE invoiceno =:invoiceno AND buyertin=:buyertin")
    void receivePayment(
            @Param(value = "receivedby") String receivedby,
            @Param(value = "receivedtime") Date receivedtime,
            @Param(value = "receivedamount") Double receivedamount,
            @Param(value = "receivedstatus") String receivedstatus,
            @Param(value = "invoiceno") String invoiceno,
            @Param(value = "buyertin") String buyertin
    );



    @Transactional
    @Modifying
    @Query(nativeQuery = true,value = "UPDATE urainvoices SET paymentstatus=:paymentstatus WHERE invoiceno =:invoiceno AND buyertin=:buyertin")
    void updatePaymentStatus(
            @Param(value = "paymentstatus") String paymentstatus,
            @Param(value = "invoiceno") String invoiceno,
            @Param(value = "buyertin") String buyertin
    );

}
