package co.ke.emtechhouse.eims.InvoiceComponent.InvoiceParticulars;

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
public class InvoiceParticulars {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column( nullable = false, updatable = false)
    private Long id;
    private String item ;
    private String itemCode ;
    private String qty = "-";
    private String unitOfMeasure;
    private Double unitPrice;
    private Double total;
    private String taxRate;
    private Double tax ;
    private Double discountTotal;
    private String discountTaxRate;
    private String orderNumber;
    private String discountFlag ;
    private String deemedFlag ;
    private String exciseFlag ;
    private String categoryId ;
    private String categoryName;
    private String goodsCategoryId;
    private String goodsCategoryName;
    private String exciseRate;
    private String exciseRule;
    private String exciseTax;
    private String pack ;
    private String stick ;
    private String exciseUnit ;
    private String exciseCurrency;
    private String exciseRateName;
    private String paymentMode;
}
