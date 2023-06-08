package co.ke.emtechhouse.eims.CategoryComponent;

import co.ke.emtechhouse.eims.PurchaseOrderComponent.DeliveryHistory.Delivery;
import co.ke.emtechhouse.eims.PurchaseOrderComponent.PoParticularsComponent.PoParticulars;
import co.ke.emtechhouse.eims.SubCategoryComponent.SubCategory;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    @Column(nullable = false)
    private String categoryName;
    @Column()
    private String categoryDescription;
    private String status = "pending";
    private String reason = "-";
    private String glCode;

    private String postedBy;
    private Character postedFlag;
    private Date postedTime;
    private String modifiedBy;
    private Character modifiedFlag;
    private Date modifiedTime;
    private String verifiedBy;
    private Character verifiedFlag;
    private Date verifiedTime;
    private String deletedBy;
    private Character deletedFlag;
    private Date deletedTime;


    @OneToMany(targetEntity = SubCategory.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    @JsonProperty(access= JsonProperty.Access.READ_ONLY)
    private List<SubCategory> subCategories;
}
