
package co.ke.emtechhouse.eims.URAComponent.urarequest;

public class GlobalInfo {
    private String appId;
    private String brn;
    private String dataExchangeId;
    private String deviceMAC;
    private String deviceNo;
    private ExtendField extendField;
    private String interfaceCode;
    private String latitude;
    private String longitude;
    private String requestCode;
    private String requestTime;
    private String responseCode;
    private String taxpayerID;
    private String tin;
    private String userName;

    public String getAppId() {
        return appId;
    }

    public void setAppId(String appId) {
        this.appId = appId;
    }

    public String getBrn() {
        return brn;
    }

    public void setBrn(String brn) {
        this.brn = brn;
    }

    public String getDataExchangeId() {
        return dataExchangeId;
    }

    public void setDataExchangeId(String dataExchangeId) {
        this.dataExchangeId = dataExchangeId;
    }

    public String getDeviceMAC() {
        return deviceMAC;
    }

    public void setDeviceMAC(String deviceMAC) {
        this.deviceMAC = deviceMAC;
    }

    public String getDeviceNo() {
        return deviceNo;
    }

    public void setDeviceNo(String deviceNo) {
        this.deviceNo = deviceNo;
    }

    public ExtendField getExtendField() {
        return extendField;
    }

    public void setExtendField(ExtendField extendField) {
        this.extendField = extendField;
    }

    public String getInterfaceCode() {
        return interfaceCode;
    }

    public void setInterfaceCode(String interfaceCode) {
        this.interfaceCode = interfaceCode;
    }

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public String getRequestCode() {
        return requestCode;
    }

    public void setRequestCode(String requestCode) {
        this.requestCode = requestCode;
    }

    public String getRequestTime() {
        return requestTime;
    }

    public void setRequestTime(String requestTime) {
        this.requestTime = requestTime;
    }

    public String getResponseCode() {
        return responseCode;
    }

    public void setResponseCode(String responseCode) {
        this.responseCode = responseCode;
    }

    public String getTaxpayerID() {
        return taxpayerID;
    }

    public void setTaxpayerID(String taxpayerID) {
        this.taxpayerID = taxpayerID;
    }

    public String getTin() {
        return tin;
    }

    public void setTin(String tin) {
        this.tin = tin;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public GlobalInfo() {
    }

    public GlobalInfo(String appId, String brn, String dataExchangeId, String deviceMAC, String deviceNo, ExtendField extendField, String interfaceCode, String latitude, String longitude, String requestCode, String requestTime, String responseCode, String taxpayerID, String tin, String userName, String version) {
        this.appId = appId;
        this.brn = brn;
        this.dataExchangeId = dataExchangeId;
        this.deviceMAC = deviceMAC;
        this.deviceNo = deviceNo;
        this.extendField = extendField;
        this.interfaceCode = interfaceCode;
        this.latitude = latitude;
        this.longitude = longitude;
        this.requestCode = requestCode;
        this.requestTime = requestTime;
        this.responseCode = responseCode;
        this.taxpayerID = taxpayerID;
        this.tin = tin;
        this.userName = userName;
        this.version = version;
    }

    private String version;

}
