package co.ke.emtechhouse.eims.TransactionComponent.Partrans;

import co.ke.emtechhouse.eims.TransactionComponent.PointingContraDetails.PointingAccountContraDetails;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Partrans {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String costCenter;
    private String isPointing = "N";
    @Column(nullable = false)
    private String accountName;
    @Column(nullable = false)
    private String accountNo;
    @Column(nullable = false)
    private Double amount = 0.00;
    @Column(nullable = false)
    private String narration;
    @Column(nullable = false)
    private String parttranstype;
    @Column(nullable = false)
    private String accountCurrencyCode;
    private Long  supplierId;
    private String typeOfAccount;
    private Long taxId;

    @OneToMany(targetEntity = PointingAccountContraDetails.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "patran_id", referencedColumnName = "id")
    private List<PointingAccountContraDetails> pointingDetails;
    private String isPartition="N";
    private String partitionAccount = "";
    private String treaRefNum = "-";
    private String exchangeRate="1";

    private String solId;
    private String solDesc;
}
