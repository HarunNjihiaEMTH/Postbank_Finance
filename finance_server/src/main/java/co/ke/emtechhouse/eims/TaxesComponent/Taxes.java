package co.ke.emtechhouse.eims.TaxesComponent;

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
public class Taxes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false,  updatable = false)
    private Long id;

    @Column(nullable = false)
    private String taxName;
    @Column(nullable = false)
    private Double taxValue;
    @Column(nullable = false)
    private String taxAccount;
    private String status = "pending";
    private String reason = "-";
    private String taxType;

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
}
