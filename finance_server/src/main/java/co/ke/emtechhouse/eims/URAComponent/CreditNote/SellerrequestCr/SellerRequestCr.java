package co.ke.emtechhouse.eims.URAComponent.CreditNote.SellerrequestCr;

import com.google.gson.annotations.Expose;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;


@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
//@Entity
public class SellerRequestCr {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;


    @Expose
    private String localInvoiceNo;
    @Expose
    private String address;
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
