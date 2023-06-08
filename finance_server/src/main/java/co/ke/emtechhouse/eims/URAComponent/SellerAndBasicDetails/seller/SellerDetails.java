package co.ke.emtechhouse.eims.URAComponent.SellerAndBasicDetails.seller;

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
@Table(name = "PostBankSellerDetails")
public class SellerDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    @Expose
    private String address;
    @Expose
    private String branchCode;
    @Expose
    private String branchId;
    @Expose
    private String branchName;
    @Expose
    private String businessName;
    @Expose
    private String emailAddress;
    @Expose
    private String legalName;
    @Expose
    private String linePhone;
    @Expose
    private String mobilePhone;
    @Expose
    private String referenceNo;
    @Expose
    private String tin;
}
