package co.ke.emtechhouse.eims.SupplierComponent;

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
public class Supplier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    @Column(nullable = false)
    private String supplierAccount;
    @Column(nullable = false)
    private String supplierAddress;
    @Column(nullable = false)
    private String supplierTin;
    @Column(nullable = false)
    private String supplierBank;
    @Column(nullable = false)
    private String supplierCurrency;
    @Column(nullable = false)
    private String supplierCountry;
    @Column(nullable = false)
    private String supplierContact;
    @Column(nullable = false)
    private String supplierEmail;
    @Column(nullable = false)
    private String supplierName;
    private String supplierNumber;
    private String supplierServices;
    private String supplierServiceDescription;
    private String partner_zip_postalCode;
    private String status = "pending";
    private String reason = "-";
//    AUDIT
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
}
