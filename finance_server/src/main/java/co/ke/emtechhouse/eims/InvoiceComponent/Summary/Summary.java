package co.ke.emtechhouse.eims.InvoiceComponent.Summary;


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
public class Summary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String netAmount = "8379";
    private String taxAmount = "868";
    private String grossAmount = "9247";
    private String itemCount = "5";
    private String modeCode = "0";
    private String remarks = "This is another remark test.";
    private String qrCode = "asdfghjkl";
    private String invoiceID;
}
