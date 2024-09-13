package co.ke.emtechhouse.eims.InvoiceComponent.Payway;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class Payway {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String paymentMode = "101";
    private String paymentAmount = "686.45";
    private String orderNumber = "a";
    private String invoiceID;
}
