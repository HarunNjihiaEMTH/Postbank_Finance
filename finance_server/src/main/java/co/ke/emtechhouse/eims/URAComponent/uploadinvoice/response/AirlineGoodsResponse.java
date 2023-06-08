package co.ke.emtechhouse.eims.URAComponent.uploadinvoice.response;

import com.google.gson.annotations.SerializedName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "uraAirlineGoods")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AirlineGoodsResponse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    @SerializedName("categoryId")
    private String mCategoryId;
    @SerializedName("categoryName")
    private String mCategoryName;
    @SerializedName("deemedFlag")
    private String mDeemedFlag;
    @SerializedName("discountFlag")
    private String mDiscountFlag;
    @SerializedName("discountTaxRate")
    private String mDiscountTaxRate;
    @SerializedName("discountTotal")
    private String mDiscountTotal;
    @SerializedName("exciseCurrency")
    private String mExciseCurrency;
    @SerializedName("exciseFlag")
    private String mExciseFlag;
    @SerializedName("exciseRate")
    private String mExciseRate;
    @SerializedName("exciseRateName")
    private String mExciseRateName;
    @SerializedName("exciseRule")
    private String mExciseRule;
    @SerializedName("exciseTax")
    private String mExciseTax;
    @SerializedName("exciseUnit")
    private String mExciseUnit;
    @SerializedName("goodsCategoryId")
    private String mGoodsCategoryId;
    @SerializedName("goodsCategoryName")
    private String mGoodsCategoryName;
    @SerializedName("item")
    private String mItem;
    @SerializedName("itemCode")
    private String mItemCode;
    @SerializedName("orderNumber")
    private String mOrderNumber;
    @SerializedName("pack")
    private String mPack;
    @SerializedName("qty")
    private String mQty;
    @SerializedName("stick")
    private String mStick;
    @SerializedName("taxRate")
    private String mTaxRate;
    @SerializedName("tax")
    private String mTax;
    @SerializedName("total")
    private String mTotal;
    @SerializedName("unitOfMeasure")
    private String mUnitOfMeasure;
    @SerializedName("unitPrice")
    private String mUnitPrice;
    private String invoiceId;
    private String customerid;
}
