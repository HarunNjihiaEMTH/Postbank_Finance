package co.ke.emtechhouse.eims.StockManagement.products;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "products")
public class Products {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
        @Column(nullable = false)
        private String categoryName;
        private String name;
        private String status = "pending";
        private String reason = "-";
        private String description;
        private String unitOfMeasure;
        private  String includePieceOfMeasurementInformation;
        private String commodityCode;
        private String isService;
        private Integer stock;
        private String segmentName;
        private String familyName;
        private String className;
        private String currency;
        private String pieceMeasurementUnit;
        private String packageMeasurementUnit;
        private Double packageUntiPrice;
        private Double vatTaxRate;
        private String category_id;
        private Integer pieceQuantity;
        private  Integer unitsPerPieceQuantity;
        private Double pricePerPieceQuantity;
        private String includeVatInformation;
        private Date vatEffectiveStartDate;
        private String includeExeciseTaxInformation;
        private Double execiseTaxRate;
        private Date execiseTaxEffectiveStartDate;
        private Character postedFlag;
        private Date postedTime=new Date();
        private String postedBy;
        private String modifiedBy;
        private Character modifiedFlag;
        private Date modifiedTime;
        private String verifiedBy;
        private Character verifiedFlag;
        private Date verifiedTime;
        private String deletedBy;
        private Character deletedFlag;
        private Date deletedTime;

}






