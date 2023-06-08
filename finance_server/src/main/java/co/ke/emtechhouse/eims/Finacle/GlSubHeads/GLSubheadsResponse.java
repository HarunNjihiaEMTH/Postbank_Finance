package co.ke.emtechhouse.eims.Finacle.GlSubHeads;

public class GLSubheadsResponse {
    private String subheadcode;
    private String subheaddesc;

    public String getSubheadcode() {
        return subheadcode;
    }

    public void setSubheadcode(String subheadcode) {
        this.subheadcode = subheadcode;
    }

    public String getSubheaddesc() {
        return subheaddesc;
    }

    public void setSubheaddesc(String subheaddesc) {
        this.subheaddesc = subheaddesc;
    }

    public GLSubheadsResponse() {
    }

    public GLSubheadsResponse(String subheadcode, String subheaddesc) {
        this.subheadcode = subheadcode;
        this.subheaddesc = subheaddesc;
    }
}
