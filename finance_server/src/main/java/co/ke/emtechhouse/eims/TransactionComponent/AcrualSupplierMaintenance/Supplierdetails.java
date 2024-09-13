package co.ke.emtechhouse.eims.TransactionComponent.AcrualSupplierMaintenance;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Supplierdetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    @Column(nullable = false)
    private String referenceID;
    private String supplierName;
    private String supplierAc;
    private String acrualDescription;
    private String acrualAmount;
    private String acrualPeriod;
    @Column(nullable = false)
    private String accrualAccount;
    @Column(nullable = false)
    private String accrualAccountName;
}
