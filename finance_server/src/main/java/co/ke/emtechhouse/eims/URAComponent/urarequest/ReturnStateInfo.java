
package co.ke.emtechhouse.eims.URAComponent.urarequest;

public class ReturnStateInfo {
    public ReturnStateInfo(String returnCode, String returnMessage) {
        this.returnCode = returnCode;
        this.returnMessage = returnMessage;
    }

    private String returnCode;

    public ReturnStateInfo() {
    }

    public String getReturnCode() {
        return returnCode;
    }

    public void setReturnCode(String returnCode) {
        this.returnCode = returnCode;
    }

    public String getReturnMessage() {
        return returnMessage;
    }

    public void setReturnMessage(String returnMessage) {
        this.returnMessage = returnMessage;
    }

    private String returnMessage;
}
