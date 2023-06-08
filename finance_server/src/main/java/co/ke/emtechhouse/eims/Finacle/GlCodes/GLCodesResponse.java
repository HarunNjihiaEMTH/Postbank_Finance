package co.ke.emtechhouse.eims.Finacle.GlCodes;

public class GLCodesResponse {
    public GLCodesResponse() {
    }

    private String glcode;

    public String getGlcode() {
        return glcode;
    }

    public void setGlcode(String glcode) {
        this.glcode = glcode;
    }

    public String getGlcodedesc() {
        return glcodedesc;
    }

    public void setGlcodedesc(String glcodedesc) {
        this.glcodedesc = glcodedesc;
    }

    public GLCodesResponse(String glcode, String glcodedesc) {
        this.glcode = glcode;
        this.glcodedesc = glcodedesc;
    }

    private String glcodedesc;
}
