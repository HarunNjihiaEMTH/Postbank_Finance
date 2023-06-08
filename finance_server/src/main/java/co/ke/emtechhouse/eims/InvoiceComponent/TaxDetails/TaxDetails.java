package co.ke.emtechhouse.eims.InvoiceComponent.TaxDetails;

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
public class TaxDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String taxCategoryCode = "01";
    private String netAmount = "3813.55";
    private String taxRate = "0.18";
    private String taxAmount = "686.45";
    private String grossAmount = "4500.00";
    private String exciseUnit = "101";
    private String exciseCurrency = "UGX";
    private String taxRateName = "123";
    private String invoiceID;
}
