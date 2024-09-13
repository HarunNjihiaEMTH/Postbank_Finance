package co.ke.emtechhouse.eims.URAComponent.CreditNote;

import co.ke.emtechhouse.eims.URAComponent.CreditNote.BasicInfoCr.BasicInformationRequestCr;
import co.ke.emtechhouse.eims.URAComponent.CreditNote.BuyeDetails.BuyerDetailsRequestCr;
import co.ke.emtechhouse.eims.URAComponent.CreditNote.Extenddetails.ExtendDetailsCr;
import co.ke.emtechhouse.eims.URAComponent.CreditNote.GoodsDetailsCr.GoodsDetailsCr;
import co.ke.emtechhouse.eims.URAComponent.CreditNote.ImportServicesSeller.ImportServicesSeller;
import co.ke.emtechhouse.eims.URAComponent.CreditNote.Payway.PaywayInfo;
import co.ke.emtechhouse.eims.URAComponent.CreditNote.SellerrequestCr.SellerRequestCr;
import co.ke.emtechhouse.eims.URAComponent.CreditNote.SummuryInfoCr.SummaryInfoCr;
import co.ke.emtechhouse.eims.URAComponent.CreditNote.TaxDetail.TaxDetailsCr;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CreditNoteRequest {

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

    //    @OneToOne
    private BasicInformationRequestCr basicInformationRequestCr;
    //    @OneToOne
    private BuyerDetailsRequestCr buyerDetails;
    //    @OneToMany
    private List<GoodsDetailsCr> goodsDetails;
    //    @OneToMany
    private List<PaywayInfo> payWay;
    //    @OneToOne
//    private SellerRequestCr sellerDetails;
    //    @OneToOne
    private SummaryInfoCr summary;
    //    @OneToMany
    private List<TaxDetailsCr> taxDetails;

    private ImportServicesSeller importServicesSeller;
}
