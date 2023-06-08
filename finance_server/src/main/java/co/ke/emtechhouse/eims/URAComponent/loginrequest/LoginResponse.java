
package co.ke.emtechhouse.eims.URAComponent.loginrequest;

import java.util.List;
import javax.annotation.Generated;
import com.google.gson.annotations.SerializedName;

@Generated("net.hexar.json2pojo")
@SuppressWarnings("unused")
public class LoginResponse {

    @SerializedName("commGoodsLatestModifyVersion")
    private String mCommGoodsLatestModifyVersion;
    @SerializedName("commodityCategoryVersion")
    private String mCommodityCategoryVersion;
    @SerializedName("creditMemoPeriodDate")
    private String mCreditMemoPeriodDate;
    @SerializedName("device")
    private Device mDevice;
    @SerializedName("dictionaryVersion")
    private String mDictionaryVersion;
    @SerializedName("exciseDutyVersion")
    private String mExciseDutyVersion;
    @SerializedName("exportCommodityTaxRate")
    private String mExportCommodityTaxRate;
    @SerializedName("exportInvoiceExciseDuty")
    private String mExportInvoiceExciseDuty;
    @SerializedName("goodsStockLimit")
    private String mGoodsStockLimit;
    @SerializedName("isAllowBackDate")
    private String mIsAllowBackDate;
    @SerializedName("isAllowIssueCreditWithoutFDN")
    private String mIsAllowIssueCreditWithoutFDN;
    @SerializedName("isAllowIssueInvoice")
    private String mIsAllowIssueInvoice;
    @SerializedName("isAllowIssueRebate")
    private String mIsAllowIssueRebate;
    @SerializedName("isAllowOutOfScopeVAT")
    private String mIsAllowOutOfScopeVAT;
    @SerializedName("isDutyFreeTaxpayer")
    private String mIsDutyFreeTaxpayer;
    @SerializedName("isReferenceNumberMandatory")
    private String mIsReferenceNumberMandatory;
    @SerializedName("isTaxCategoryCodeMandatory")
    private String mIsTaxCategoryCodeMandatory;
    @SerializedName("issueTaxTypeRestrictions")
    private String mIssueTaxTypeRestrictions;
    @SerializedName("maxGrossAmount")
    private String mMaxGrossAmount;
    @SerializedName("periodDate")
    private String mPeriodDate;
    @SerializedName("sellersLogo")
    private String mSellersLogo;
    @SerializedName("taxType")
    private List<TaxType> mTaxType;
    @SerializedName("taxpayer")
    private Taxpayer mTaxpayer;
    @SerializedName("taxpayerBranch")
    private TaxpayerBranch mTaxpayerBranch;
    @SerializedName("taxpayerBranchVersion")
    private String mTaxpayerBranchVersion;
    @SerializedName("whetherEnableServerStock")
    private String mWhetherEnableServerStock;

    public String getCommGoodsLatestModifyVersion() {
        return mCommGoodsLatestModifyVersion;
    }

    public void setCommGoodsLatestModifyVersion(String commGoodsLatestModifyVersion) {
        mCommGoodsLatestModifyVersion = commGoodsLatestModifyVersion;
    }

    public String getCommodityCategoryVersion() {
        return mCommodityCategoryVersion;
    }

    public void setCommodityCategoryVersion(String commodityCategoryVersion) {
        mCommodityCategoryVersion = commodityCategoryVersion;
    }

    public String getCreditMemoPeriodDate() {
        return mCreditMemoPeriodDate;
    }

    public void setCreditMemoPeriodDate(String creditMemoPeriodDate) {
        mCreditMemoPeriodDate = creditMemoPeriodDate;
    }

    public Device getDevice() {
        return mDevice;
    }

    public void setDevice(Device device) {
        mDevice = device;
    }

    public String getDictionaryVersion() {
        return mDictionaryVersion;
    }

    public void setDictionaryVersion(String dictionaryVersion) {
        mDictionaryVersion = dictionaryVersion;
    }

    public String getExciseDutyVersion() {
        return mExciseDutyVersion;
    }

    public void setExciseDutyVersion(String exciseDutyVersion) {
        mExciseDutyVersion = exciseDutyVersion;
    }

    public String getExportCommodityTaxRate() {
        return mExportCommodityTaxRate;
    }

    public void setExportCommodityTaxRate(String exportCommodityTaxRate) {
        mExportCommodityTaxRate = exportCommodityTaxRate;
    }

    public String getExportInvoiceExciseDuty() {
        return mExportInvoiceExciseDuty;
    }

    public void setExportInvoiceExciseDuty(String exportInvoiceExciseDuty) {
        mExportInvoiceExciseDuty = exportInvoiceExciseDuty;
    }

    public String getGoodsStockLimit() {
        return mGoodsStockLimit;
    }

    public void setGoodsStockLimit(String goodsStockLimit) {
        mGoodsStockLimit = goodsStockLimit;
    }

    public String getIsAllowBackDate() {
        return mIsAllowBackDate;
    }

    public void setIsAllowBackDate(String isAllowBackDate) {
        mIsAllowBackDate = isAllowBackDate;
    }

    public String getIsAllowIssueCreditWithoutFDN() {
        return mIsAllowIssueCreditWithoutFDN;
    }

    public void setIsAllowIssueCreditWithoutFDN(String isAllowIssueCreditWithoutFDN) {
        mIsAllowIssueCreditWithoutFDN = isAllowIssueCreditWithoutFDN;
    }

    public String getIsAllowIssueInvoice() {
        return mIsAllowIssueInvoice;
    }

    public void setIsAllowIssueInvoice(String isAllowIssueInvoice) {
        mIsAllowIssueInvoice = isAllowIssueInvoice;
    }

    public String getIsAllowIssueRebate() {
        return mIsAllowIssueRebate;
    }

    public void setIsAllowIssueRebate(String isAllowIssueRebate) {
        mIsAllowIssueRebate = isAllowIssueRebate;
    }

    public String getIsAllowOutOfScopeVAT() {
        return mIsAllowOutOfScopeVAT;
    }

    public void setIsAllowOutOfScopeVAT(String isAllowOutOfScopeVAT) {
        mIsAllowOutOfScopeVAT = isAllowOutOfScopeVAT;
    }

    public String getIsDutyFreeTaxpayer() {
        return mIsDutyFreeTaxpayer;
    }

    public void setIsDutyFreeTaxpayer(String isDutyFreeTaxpayer) {
        mIsDutyFreeTaxpayer = isDutyFreeTaxpayer;
    }

    public String getIsReferenceNumberMandatory() {
        return mIsReferenceNumberMandatory;
    }

    public void setIsReferenceNumberMandatory(String isReferenceNumberMandatory) {
        mIsReferenceNumberMandatory = isReferenceNumberMandatory;
    }

    public String getIsTaxCategoryCodeMandatory() {
        return mIsTaxCategoryCodeMandatory;
    }

    public void setIsTaxCategoryCodeMandatory(String isTaxCategoryCodeMandatory) {
        mIsTaxCategoryCodeMandatory = isTaxCategoryCodeMandatory;
    }

    public String getIssueTaxTypeRestrictions() {
        return mIssueTaxTypeRestrictions;
    }

    public void setIssueTaxTypeRestrictions(String issueTaxTypeRestrictions) {
        mIssueTaxTypeRestrictions = issueTaxTypeRestrictions;
    }

    public String getMaxGrossAmount() {
        return mMaxGrossAmount;
    }

    public void setMaxGrossAmount(String maxGrossAmount) {
        mMaxGrossAmount = maxGrossAmount;
    }

    public String getPeriodDate() {
        return mPeriodDate;
    }

    public void setPeriodDate(String periodDate) {
        mPeriodDate = periodDate;
    }

    public String getSellersLogo() {
        return mSellersLogo;
    }

    public void setSellersLogo(String sellersLogo) {
        mSellersLogo = sellersLogo;
    }

    public List<TaxType> getTaxType() {
        return mTaxType;
    }

    public void setTaxType(List<TaxType> taxType) {
        mTaxType = taxType;
    }

    public Taxpayer getTaxpayer() {
        return mTaxpayer;
    }

    public void setTaxpayer(Taxpayer taxpayer) {
        mTaxpayer = taxpayer;
    }

    public TaxpayerBranch getTaxpayerBranch() {
        return mTaxpayerBranch;
    }

    public void setTaxpayerBranch(TaxpayerBranch taxpayerBranch) {
        mTaxpayerBranch = taxpayerBranch;
    }

    public String getTaxpayerBranchVersion() {
        return mTaxpayerBranchVersion;
    }

    public void setTaxpayerBranchVersion(String taxpayerBranchVersion) {
        mTaxpayerBranchVersion = taxpayerBranchVersion;
    }

    public String getWhetherEnableServerStock() {
        return mWhetherEnableServerStock;
    }

    public void setWhetherEnableServerStock(String whetherEnableServerStock) {
        mWhetherEnableServerStock = whetherEnableServerStock;
    }

}
