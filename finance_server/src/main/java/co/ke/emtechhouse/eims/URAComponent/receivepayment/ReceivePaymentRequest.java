package co.ke.emtechhouse.eims.URAComponent.receivepayment;


import com.google.gson.annotations.Expose;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "receivepayment")
public class ReceivePaymentRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;

    @Expose
    private String invoiceno;
    @Expose
    private String buyertin;
    @Expose
    private String receivedby;
    @Expose
    private String invoiceamount;
    @Expose
    private Date receivedtime;
    @Expose
    private Double receivedamount;
    @Expose
    private String receivedstatus;
}
