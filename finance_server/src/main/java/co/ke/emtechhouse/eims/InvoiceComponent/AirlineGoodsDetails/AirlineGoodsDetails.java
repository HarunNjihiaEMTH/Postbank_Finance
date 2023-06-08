package co.ke.emtechhouse.eims.InvoiceComponent.AirlineGoodsDetails;

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
public class AirlineGoodsDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String  item;
    private String  itemCode;
    private String  qty;
    private String  unitOfMeasure;
    private String  unitPrice;
    private String  total;
    private String  taxRate;
    private String  tax;
    private String  discountTotal;
    private String  discountTaxRate;
    private String  orderNumber = "1";
    private String  discountFlag = "1";
    private String  deemedFlag = "1";
    private String  exciseFlag = "2";
    private String  categoryId = "1234";
    private String  categoryName = "Test";
    private String  goodsCategoryId = "5467";
    private String  goodsCategoryName = "Test";
    private String  exciseRate = "0.12";
    private String  exciseRule = "1";
    private String  exciseTax = "20.22";
    private String  pack = "1";
    private String  stick = "20";
    private String  exciseUnit = "101";
    private String  exciseCurrency = "UGX";
    private String  exciseRateName = "123";
    private String invoiceID;
}
