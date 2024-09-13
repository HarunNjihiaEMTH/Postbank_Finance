
package co.ke.emtechhouse.eims.URAComponent.uploadinvoice.request;

import java.util.List;
import javax.annotation.Generated;

import com.google.gson.annotations.Expose;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Generated("net.hexar.json2pojo")
@NoArgsConstructor
@AllArgsConstructor
@SuppressWarnings("unused")
public class InvoiceUploadRequest {

    @Expose
    private BasicInformationRequest basicInformation;
    @Expose
    private BuyerDetailsRequest buyerDetails;
    @Expose
    private ExtendDetailsRequest extend;
    @Expose
    private List<GoodsDetailRequest> goodsDetails;
    @Expose
    private List<PayWayRequest> payWay;
    @Expose
    private SellerDetailsRequest sellerDetails;
    @Expose
    private SummaryInfoRequest summary;
    @Expose
    private List<TaxDetailRequest> taxDetails;
    @Expose
    private List<AirlineGoodsRequest> airlineGoods;
    @Expose
    private ImportServicesSellerRequest importServicesSeller;

    @Expose
    private String customerid;

    public List<AirlineGoodsRequest> getAirlineGoods() {
        return airlineGoods;
    }

    public void setAirlineGoods(List<AirlineGoodsRequest> airlineGoods) {
        this.airlineGoods = airlineGoods;
    }

    public ImportServicesSellerRequest getImportServicesSeller() {
        return importServicesSeller;
    }

    public void setImportServicesSeller(ImportServicesSellerRequest importServicesSeller) {
        this.importServicesSeller = importServicesSeller;
    }

//    public String getImportOrLocal() {
//        return importOrLocal;
//    }
//
//    public void setImportOrLocal(String importOrLocal) {
//        this.importOrLocal = importOrLocal;
//    }
//
//    @Expose
//    private String importOrLocal = "NO";


    public String getCustomerid() {
        return customerid;
    }

    public void setCustomerid(String customerid) {
        this.customerid = customerid;
    }

    public String getInvoiceno() {
        return invoiceno;
    }

    public void setInvoiceno(String invoiceno) {
        this.invoiceno = invoiceno;
    }

    @Expose
    private String invoiceno;

    public BasicInformationRequest getBasicInformation() {
        return basicInformation;
    }

    public void setBasicInformation(BasicInformationRequest basicInformation) {
        this.basicInformation = basicInformation;
    }

    public BuyerDetailsRequest getBuyerDetails() {
        return buyerDetails;
    }

    public void setBuyerDetails(BuyerDetailsRequest buyerDetails) {
        this.buyerDetails = buyerDetails;
    }

    public ExtendDetailsRequest getExtend() {
        return extend;
    }

    public void setExtend(ExtendDetailsRequest extend) {
        this.extend = extend;
    }

    public List<GoodsDetailRequest> getGoodsDetails() {
        return goodsDetails;
    }

    public void setGoodsDetails(List<GoodsDetailRequest> goodsDetails) {
        this.goodsDetails = goodsDetails;
    }

    public List<PayWayRequest> getPayWay() {
        return payWay;
    }

    public void setPayWay(List<PayWayRequest> payWay) {
        this.payWay = payWay;
    }

    public SellerDetailsRequest getSellerDetails() {
        return sellerDetails;
    }

    public void setSellerDetails(SellerDetailsRequest sellerDetails) {
        this.sellerDetails = sellerDetails;
    }

    public SummaryInfoRequest getSummary() {
        return summary;
    }

    public void setSummary(SummaryInfoRequest summary) {
        this.summary = summary;
    }

    public List<TaxDetailRequest> getTaxDetails() {
        return taxDetails;
    }

    public void setTaxDetails(List<TaxDetailRequest> taxDetails) {
        this.taxDetails = taxDetails;
    }

}
