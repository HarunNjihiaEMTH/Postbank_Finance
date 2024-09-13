
package co.ke.emtechhouse.eims.URAComponent.loginrequest;

import javax.annotation.Generated;
import com.google.gson.annotations.SerializedName;

@Generated("net.hexar.json2pojo")
@SuppressWarnings("unused")
public class TaxType {

    @SerializedName("cancellationDate")
    private String mCancellationDate;
    @SerializedName("registrationDate")
    private String mRegistrationDate;
    @SerializedName("taxTypeCode")
    private String mTaxTypeCode;
    @SerializedName("taxTypeName")
    private String mTaxTypeName;

    public String getCancellationDate() {
        return mCancellationDate;
    }

    public void setCancellationDate(String cancellationDate) {
        mCancellationDate = cancellationDate;
    }

    public String getRegistrationDate() {
        return mRegistrationDate;
    }

    public void setRegistrationDate(String registrationDate) {
        mRegistrationDate = registrationDate;
    }

    public String getTaxTypeCode() {
        return mTaxTypeCode;
    }

    public void setTaxTypeCode(String taxTypeCode) {
        mTaxTypeCode = taxTypeCode;
    }

    public String getTaxTypeName() {
        return mTaxTypeName;
    }

    public void setTaxTypeName(String taxTypeName) {
        mTaxTypeName = taxTypeName;
    }

}
