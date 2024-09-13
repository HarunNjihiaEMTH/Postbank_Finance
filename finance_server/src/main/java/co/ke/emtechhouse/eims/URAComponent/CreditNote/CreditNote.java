package co.ke.emtechhouse.eims.URAComponent.CreditNote;


import co.ke.emtechhouse.eims.URAComponent.CreditNote.BasicInfoCr.BasicInformationRequestCr;
import co.ke.emtechhouse.eims.URAComponent.CreditNote.BuyeDetails.BuyerDetailsRequestCr;
import co.ke.emtechhouse.eims.URAComponent.CreditNote.Extenddetails.ExtendDetailsCr;
import co.ke.emtechhouse.eims.URAComponent.CreditNote.GoodsDetailsCr.GoodsDetailsCr;
import co.ke.emtechhouse.eims.URAComponent.CreditNote.Payway.PaywayInfo;
import co.ke.emtechhouse.eims.URAComponent.CreditNote.SellerrequestCr.SellerRequestCr;
import co.ke.emtechhouse.eims.URAComponent.CreditNote.SummuryInfoCr.SummaryInfoCr;
import co.ke.emtechhouse.eims.URAComponent.CreditNote.TaxDetail.TaxDetailsCr;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.annotation.Generated;
import javax.persistence.*;
import java.util.Date;
import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
//@Generated("net.hexar.json2pojo")
@Entity
public class CreditNote {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String oriInvoiceId;
    private String oriInvoiceNo;
    private String reasonCode;
    private String reason;
    private String applicationTime;
    private String invoiceApplyCategoryCode;
    private String currency;
    private String contactName;
    private String contactMobileNum;
    private String contactEmail;
    private String source;
    private String remarks;
    private String sellersReferenceNo;


    //custom Fields
    private String status ="Pending";
    private Date postedTime=new Date();
    private String verifiedBy;
    private String postedBy;
    private String rejecionReason;
    private Date verifiedTime;
    private String uraStatus="Pending";
    private String postedStatus="N";
    private String responseCode;
    private String referenceNo;
    private String cancellationstatus = "Pending";






}
