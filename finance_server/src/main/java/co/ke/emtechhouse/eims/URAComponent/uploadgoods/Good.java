
package co.ke.emtechhouse.eims.URAComponent.uploadgoods;

import java.util.List;
import javax.annotation.Generated;
import javax.persistence.*;

import com.google.gson.annotations.Expose;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Generated("net.hexar.json2pojo")
@Entity
@Table(name = "portalgoods")
@AllArgsConstructor
@NoArgsConstructor
@Data
@SuppressWarnings("unused")
public class Good {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    @Expose
    private String commodityCategoryId;
    @Expose
    private String currency;
    @Expose
    private String description;
    @Expose
    private String exciseDutyCode;
    @Expose
    private String goodsCode;
    @Expose
    private String goodsName;
    @Expose
    private String haveExciseTax;
    @Expose
    private String haveOtherUnit;
    @Expose
    private String havePieceUnit;
    @Expose
    private String measureUnit;
    @Expose
    private String operationType;
    @Expose
    private String packageScaledValue;
    @Expose
    private String pieceMeasureUnit;
    @Expose
    private String pieceScaledValue;
    @Expose
    private String pieceUnitPrice;
    @Expose
    private String stockPrewarning;
    @Expose
    private String unitPrice;
    private String urastatus;
    private String goodorservice = "Good";

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "good_id")
    @Expose
    private List<GoodsOtherUnit> goodsOtherUnits;
}
