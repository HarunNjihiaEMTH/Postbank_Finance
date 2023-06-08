
package co.ke.emtechhouse.eims.URAComponent.urarequest;

public class DataDescription {
    private String codeType;
    private String encryptCode;

    public DataDescription(String codeType, String encryptCode, String zipCode) {
        this.codeType = codeType;
        this.encryptCode = encryptCode;
        this.zipCode = zipCode;
    }

    public DataDescription() {
    }

    public String getCodeType() {
        return codeType;
    }

    public void setCodeType(String codeType) {
        this.codeType = codeType;
    }

    public String getEncryptCode() {
        return encryptCode;
    }

    public void setEncryptCode(String encryptCode) {
        this.encryptCode = encryptCode;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    private String zipCode;
}
