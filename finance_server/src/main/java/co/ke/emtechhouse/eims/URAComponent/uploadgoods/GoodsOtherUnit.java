
package co.ke.emtechhouse.eims.URAComponent.uploadgoods;

import javax.annotation.Generated;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.gson.annotations.Expose;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Generated("net.hexar.json2pojo")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@SuppressWarnings("unused")
public class GoodsOtherUnit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    @Expose
    private String otherPrice;
    @Expose
    private String otherScaled;
    @Expose
    private String otherUnit;
    @Expose
    private String packageScaled;

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Good goods;
}
