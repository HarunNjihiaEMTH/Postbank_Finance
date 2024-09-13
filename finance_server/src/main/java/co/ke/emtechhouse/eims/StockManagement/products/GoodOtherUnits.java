package co.ke.emtechhouse.eims.StockManagement.products;


import lombok.Data;
import lombok.ToString;

import javax.persistence.*;

@Data
@ToString
@Entity
public class GoodOtherUnits {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String otherPrice;
    private String otherScaled;
    private String otherUnit;
    private String packageScaled;



}
