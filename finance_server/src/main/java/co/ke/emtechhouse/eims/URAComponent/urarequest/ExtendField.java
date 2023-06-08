
package co.ke.emtechhouse.eims.URAComponent.urarequest;

public class ExtendField {

    private String referenceNo;

    public ExtendField(String referenceNo, String responseDateFormat, String responseTimeFormat) {
        this.referenceNo = referenceNo;
        this.responseDateFormat = responseDateFormat;
        this.responseTimeFormat = responseTimeFormat;
    }

    private String responseDateFormat;

    public ExtendField() {
    }

    public String getReferenceNo() {
        return referenceNo;
    }

    public void setReferenceNo(String referenceNo) {
        this.referenceNo = referenceNo;
    }

    public String getResponseDateFormat() {
        return responseDateFormat;
    }

    public void setResponseDateFormat(String responseDateFormat) {
        this.responseDateFormat = responseDateFormat;
    }

    public String getResponseTimeFormat() {
        return responseTimeFormat;
    }

    public void setResponseTimeFormat(String responseTimeFormat) {
        this.responseTimeFormat = responseTimeFormat;
    }

    private String responseTimeFormat;

}
