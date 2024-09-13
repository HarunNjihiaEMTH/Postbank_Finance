package co.ke.emtechhouse.eims.Finacle.pickingaccounts;

public class ContraDetails {
    private String contratranid;
    private String contratrandate;
    private String parttransrlnum;

    public ContraDetails() {
    }

    private String amtoffset;

    public String getContratranid() {
        return contratranid;
    }

    public void setContratranid(String contratranid) {
        this.contratranid = contratranid;
    }

    public String getContratrandate() {
        return contratrandate;
    }

    public void setContratrandate(String contratrandate) {
        this.contratrandate = contratrandate;
    }

    public String getParttransrlnum() {
        return parttransrlnum;
    }

    public void setParttransrlnum(String parttransrlnum) {
        this.parttransrlnum = parttransrlnum;
    }

    public String getAmtoffset() {
        return amtoffset;
    }

    public void setAmtoffset(String amtoffset) {
        this.amtoffset = amtoffset;
    }

    public String getCrncycode() {
        return crncycode;
    }

    public void setCrncycode(String crncycode) {
        this.crncycode = crncycode;
    }

    public ContraDetails(String contratranid, String contratrandate, String parttransrlnum, String amtoffset, String crncycode) {
        this.contratranid = contratranid;
        this.contratrandate = contratrandate;
        this.parttransrlnum = parttransrlnum;
        this.amtoffset = amtoffset;
        this.crncycode = crncycode;
    }

    private String crncycode;
}
