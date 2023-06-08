package co.ke.emtechhouse.eims.CustomerComponent;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;


@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String buyerTin = "201905081705";
    private String buyerNinBrn = "201905081705";
    private String buyerPassportNum = "201905081705";
    private String buyerLegalName = "zhangsan";
    private String buyerBusinessName = "lisi";
    private String buyerAddress = "beijin";
    private String buyerEmail = "123456@163.com";
    private String buyerMobilePhone = "15501234567";
    private String buyerLinePhone = "010-6689666";
    private String buyerPlaceOfBusi = "beijin";
    private String buyerType = "1";
    private String buyerCitizenship = "1";
    private String buyerSector = "1";
    private String buyerReferenceNo = "00000000001";
    private String propertyType = "abc";
    private String district = "haidian";
    private String municipalityCounty = "haidian";
    private String divisionSubcounty = "haidian1";
    private String town = "haidian1";
    private String cellVillage = "haidian1";
    private String effectiveRegistrationDate = "2020-10-19";
    private String meterStatus = "101";
    private String status = "pending";
    private String reason = "-";
    private String customerAccount;
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
