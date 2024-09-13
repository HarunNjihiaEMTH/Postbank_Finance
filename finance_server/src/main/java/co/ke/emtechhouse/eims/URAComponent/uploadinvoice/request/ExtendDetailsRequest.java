
package co.ke.emtechhouse.eims.URAComponent.uploadinvoice.request;

import com.google.gson.annotations.Expose;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.annotation.Generated;
import javax.persistence.*;

@Generated("net.hexar.json2pojo")
@Entity
@Table(name = "extenddetailsrequest")
@AllArgsConstructor
@SuppressWarnings("unused")
public class ExtendDetailsRequest {
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
private String reason;

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getReasonCode() {
        return reasonCode;
    }

    public void setReasonCode(String reasonCode) {
        this.reasonCode = reasonCode;
    }

    public ExtendDetailsRequest() {
    }

    public ExtendDetailsRequest(String reason, String reasonCode) {
        this.reason = reason;
        this.reasonCode = reasonCode;
    }

    private String reasonCode;
}
