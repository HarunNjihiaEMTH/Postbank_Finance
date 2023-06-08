
package co.ke.emtechhouse.eims.URAComponent.uploadinvoice.response;

import java.util.List;
import javax.annotation.Generated;
import com.google.gson.annotations.Expose;

@Generated("net.hexar.json2pojo")
@SuppressWarnings("unused")
public class URAInvoiceResponse {

    @Expose
    private List<AirlineGoodsResponse> airlineGoodsDetails;

    public ImportServiceSellerResponse getImportServiceSeller() {
        return importServiceSeller;
    }

    public void setImportServiceSeller(ImportServiceSellerResponse importServiceSeller) {
        this.importServiceSeller = importServiceSeller;
    }

    @Expose
    private ImportServiceSellerResponse importServiceSeller;
    @Expose
    private BasicInfoResponse basicInformation;
    @Expose
    private BuyerDetsResponse buyerDetails;
    @Expose
    private ExtendDetsResponse extend;
    @Expose
    private List<GoodsDetsResponse> goodsDetails;
    @Expose
    private List<PayWayResponse> payWay;
    @Expose
    private SellerDetsResponse sellerDetails;
    @Expose
    private SummaryResponse summary;
    @Expose
    private List<TaxDetailResponse> taxDetails;

    public List<AirlineGoodsResponse> getAirlineGoodsDetails() {
        return airlineGoodsDetails;
    }

    public void setAirlineGoodsDetails(List<AirlineGoodsResponse> airlineGoodsDetails) {
        this.airlineGoodsDetails = airlineGoodsDetails;
    }

    public BasicInfoResponse getBasicInformation() {
        return basicInformation;
    }

    public void setBasicInformation(BasicInfoResponse basicInformation) {
        this.basicInformation = basicInformation;
    }

    public BuyerDetsResponse getBuyerDetails() {
        return buyerDetails;
    }

    public void setBuyerDetails(BuyerDetsResponse buyerDetails) {
        this.buyerDetails = buyerDetails;
    }

    public ExtendDetsResponse getExtend() {
        return extend;
    }

    public void setExtend(ExtendDetsResponse extend) {
        this.extend = extend;
    }

    public List<GoodsDetsResponse> getGoodsDetails() {
        return goodsDetails;
    }

    public void setGoodsDetails(List<GoodsDetsResponse> goodsDetails) {
        this.goodsDetails = goodsDetails;
    }

    public List<PayWayResponse> getPayWay() {
        return payWay;
    }

    public void setPayWay(List<PayWayResponse> payWay) {
        this.payWay = payWay;
    }

    public SellerDetsResponse getSellerDetails() {
        return sellerDetails;
    }

    public void setSellerDetails(SellerDetsResponse sellerDetails) {
        this.sellerDetails = sellerDetails;
    }

    public SummaryResponse getSummary() {
        return summary;
    }

    public void setSummary(SummaryResponse summary) {
        this.summary = summary;
    }

    public List<TaxDetailResponse> getTaxDetails() {
        return taxDetails;
    }

    public void setTaxDetails(List<TaxDetailResponse> taxDetails) {
        this.taxDetails = taxDetails;
    }

}
