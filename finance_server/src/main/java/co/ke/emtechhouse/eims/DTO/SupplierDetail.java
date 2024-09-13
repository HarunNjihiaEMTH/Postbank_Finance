package co.ke.emtechhouse.eims.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SupplierDetail {

    private String supplierName;
    private String supplierAddress;
    private String supplierContact;
    private String supplierEmail;
    private String supplierServices;
    private String supplierBank;
    private String supplierAccount;
    private String supplierTin;
    private String supplierCountry;
    private String supplierCurrency;
    private String postedBy;
    private String supplierServiceDescription;
}
