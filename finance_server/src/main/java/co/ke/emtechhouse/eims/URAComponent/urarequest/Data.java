
package co.ke.emtechhouse.eims.URAComponent.urarequest;

public class Data {
    private String content;
    private DataDescription dataDescription;

    public Data(String content, DataDescription dataDescription, String signature) {
        this.content = content;
        this.dataDescription = dataDescription;
        this.signature = signature;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public DataDescription getDataDescription() {
        return dataDescription;
    }

    public void setDataDescription(DataDescription dataDescription) {
        this.dataDescription = dataDescription;
    }

    public String getSignature() {
        return signature;
    }

    public void setSignature(String signature) {
        this.signature = signature;
    }

    private String signature;


}
