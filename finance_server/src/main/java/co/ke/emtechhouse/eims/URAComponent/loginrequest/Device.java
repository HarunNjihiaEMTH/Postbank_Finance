
package co.ke.emtechhouse.eims.URAComponent.loginrequest;

import javax.annotation.Generated;
import com.google.gson.annotations.SerializedName;

@Generated("net.hexar.json2pojo")
@SuppressWarnings("unused")
public class Device {

    @SerializedName("deviceModel")
    private String mDeviceModel;
    @SerializedName("deviceNo")
    private String mDeviceNo;
    @SerializedName("deviceStatus")
    private String mDeviceStatus;
    @SerializedName("deviceType")
    private String mDeviceType;
    @SerializedName("offlineAmount")
    private String mOfflineAmount;
    @SerializedName("offlineDays")
    private String mOfflineDays;
    @SerializedName("offlineValue")
    private String mOfflineValue;
    @SerializedName("validPeriod")
    private String mValidPeriod;

    public String getDeviceModel() {
        return mDeviceModel;
    }

    public void setDeviceModel(String deviceModel) {
        mDeviceModel = deviceModel;
    }

    public String getDeviceNo() {
        return mDeviceNo;
    }

    public void setDeviceNo(String deviceNo) {
        mDeviceNo = deviceNo;
    }

    public String getDeviceStatus() {
        return mDeviceStatus;
    }

    public void setDeviceStatus(String deviceStatus) {
        mDeviceStatus = deviceStatus;
    }

    public String getDeviceType() {
        return mDeviceType;
    }

    public void setDeviceType(String deviceType) {
        mDeviceType = deviceType;
    }

    public String getOfflineAmount() {
        return mOfflineAmount;
    }

    public void setOfflineAmount(String offlineAmount) {
        mOfflineAmount = offlineAmount;
    }

    public String getOfflineDays() {
        return mOfflineDays;
    }

    public void setOfflineDays(String offlineDays) {
        mOfflineDays = offlineDays;
    }

    public String getOfflineValue() {
        return mOfflineValue;
    }

    public void setOfflineValue(String offlineValue) {
        mOfflineValue = offlineValue;
    }

    public String getValidPeriod() {
        return mValidPeriod;
    }

    public void setValidPeriod(String validPeriod) {
        mValidPeriod = validPeriod;
    }

}
