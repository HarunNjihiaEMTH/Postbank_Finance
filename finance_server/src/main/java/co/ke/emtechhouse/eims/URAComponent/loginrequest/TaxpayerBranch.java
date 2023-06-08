
package co.ke.emtechhouse.eims.URAComponent.loginrequest;

import javax.annotation.Generated;
import com.google.gson.annotations.SerializedName;

@Generated("net.hexar.json2pojo")
@SuppressWarnings("unused")
public class TaxpayerBranch {

    @SerializedName("branchCode")
    private String mBranchCode;
    @SerializedName("branchName")
    private String mBranchName;
    @SerializedName("branchType")
    private String mBranchType;
    @SerializedName("contactEmail")
    private String mContactEmail;
    @SerializedName("contactMobile")
    private String mContactMobile;
    @SerializedName("contactName")
    private String mContactName;
    @SerializedName("contactNumber")
    private String mContactNumber;
    @SerializedName("placeOfBusiness")
    private String mPlaceOfBusiness;

    public String getBranchCode() {
        return mBranchCode;
    }

    public void setBranchCode(String branchCode) {
        mBranchCode = branchCode;
    }

    public String getBranchName() {
        return mBranchName;
    }

    public void setBranchName(String branchName) {
        mBranchName = branchName;
    }

    public String getBranchType() {
        return mBranchType;
    }

    public void setBranchType(String branchType) {
        mBranchType = branchType;
    }

    public String getContactEmail() {
        return mContactEmail;
    }

    public void setContactEmail(String contactEmail) {
        mContactEmail = contactEmail;
    }

    public String getContactMobile() {
        return mContactMobile;
    }

    public void setContactMobile(String contactMobile) {
        mContactMobile = contactMobile;
    }

    public String getContactName() {
        return mContactName;
    }

    public void setContactName(String contactName) {
        mContactName = contactName;
    }

    public String getContactNumber() {
        return mContactNumber;
    }

    public void setContactNumber(String contactNumber) {
        mContactNumber = contactNumber;
    }

    public String getPlaceOfBusiness() {
        return mPlaceOfBusiness;
    }

    public void setPlaceOfBusiness(String placeOfBusiness) {
        mPlaceOfBusiness = placeOfBusiness;
    }

}
