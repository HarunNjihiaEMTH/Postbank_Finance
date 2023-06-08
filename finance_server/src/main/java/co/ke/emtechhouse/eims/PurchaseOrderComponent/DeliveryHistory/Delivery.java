package co.ke.emtechhouse.eims.PurchaseOrderComponent.DeliveryHistory;

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
public class Delivery {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String itemName;
    private String itemQuantity;
    private Double itemUnitPrice;
    private Double itemTotalValue;
    private String expenseId;
    private Double vatAmount;
    private Double incomeWithholdingamount;
    private Double vatWitholding;
    private String deliveryStatus = "Pending";
    private Double amountTobepaid = 0.00;
    private Double amountBalance = 0.00;
    private String serviceName;
    private String servicePrice;
    private String remarks;
    private String invoiceNo;
    private String poParticulars_id;
    private String poNumber;
    private String orderItemType;
}
