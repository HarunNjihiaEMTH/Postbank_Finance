
package co.ke.emtechhouse.eims.URAComponent.uploadinvoice.request;

import javax.annotation.Generated;
import javax.persistence.*;

import com.google.gson.annotations.Expose;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Generated("net.hexar.json2pojo")
@Entity
@Table(name = "paywaydetailsrequest")
@NoArgsConstructor
@AllArgsConstructor
@SuppressWarnings("unused")
public class PayWayRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLocalInvoiceNo() {
        return localInvoiceNo;
    }

    public void setLocalInvoiceNo(String localInvoiceNo) {
        this.localInvoiceNo = localInvoiceNo;
    }

    @Expose
    private String localInvoiceNo;
    @Expose
    private String orderNumber;
    @Expose
    private String paymentAmount;
    @Expose
    private String paymentMode;

    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }

    public String getPaymentAmount() {
        return paymentAmount;
    }

    public void setPaymentAmount(String paymentAmount) {
        this.paymentAmount = paymentAmount;
    }

    public String getPaymentMode() {
        return paymentMode;
    }

    public void setPaymentMode(String paymentMode) {
        this.paymentMode = paymentMode;
    }

}
