package co.ke.emtechhouse.eims.URAComponent.SellerAndBasicDetails.basic;

import com.google.gson.annotations.Expose;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "PostBankBasicDetails")
public class PostBankBasicDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    @Expose
    private String invoiceindustrycode;
    @Expose
    private String deviceno;
    @Expose
    private String deviceissuedate;
}
