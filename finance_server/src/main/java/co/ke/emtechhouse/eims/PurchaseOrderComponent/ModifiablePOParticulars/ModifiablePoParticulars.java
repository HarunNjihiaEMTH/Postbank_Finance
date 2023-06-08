package co.ke.emtechhouse.eims.PurchaseOrderComponent.ModifiablePOParticulars;

import co.ke.emtechhouse.eims.PurchaseOrderComponent.DeliveryHistory.Delivery;
import co.ke.emtechhouse.eims.PurchaseOrderComponent.PoParticularsComponent.PoParticulars;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class ModifiablePoParticulars {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String itemName;
    private String itemQuantity;
    private Double itemUnitPrice;
    private Double itemTotalValue;
    private String expenseId;
    private String vat_id;
    private Double vatAmount;
    private String income_w_id;
    private Double incomeWithholdingamount;
    private String vat_w_id;
    private Double vatWitholding;
    private String deliveryStatus = "Pending";
    private String orderItemType;
    private Double amountTobepaid = 0.00;
    private Double amountBalance = 0.00;
    private String serviceName;
    private String servicePrice;
    private String remarks;
    private String invoiceNo;
    @Column(nullable = false)
    private String purchaseOrder_id;
    private Boolean isPaid = false;

    private String incomeTaxRate;
    private String vatRate;
    private String vatWitholdingRate;


    @OneToMany(targetEntity = PoParticulars.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "poParticulars_id", referencedColumnName = "id")
    @JsonProperty(access= JsonProperty.Access.READ_ONLY)
    private List<Delivery> deliveries;
}
