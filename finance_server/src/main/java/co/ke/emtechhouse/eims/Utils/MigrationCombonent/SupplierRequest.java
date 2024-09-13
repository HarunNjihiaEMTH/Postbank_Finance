package co.ke.emtechhouse.eims.Utils.MigrationCombonent;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SupplierRequest {
    private String referenceID;
    private String supplierName;
    private String supplierAc;
    private String acrualDescription;
    private String acrualAmount;
    private String acrualPeriod;
    private String acrualAccount;
    private String acrualAccountName;

    private String supplierAccount;
    private String supplierAddress;
    private String supplierTin;
    private String supplierBank;
    private String supplierCurrency;
    private String supplierCountry;
    private String supplierContact;
    private String supplierEmail;
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
