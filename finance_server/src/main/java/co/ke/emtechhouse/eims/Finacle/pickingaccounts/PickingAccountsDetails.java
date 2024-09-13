package co.ke.emtechhouse.eims.Finacle.pickingaccounts;

import java.util.List;

public class PickingAccountsDetails {
    private String tranid;
    private String trandate;
    private String tranparticular;
    private String currency;
    private String tranamount;

    public PickingAccountsDetails() {
    }

    public String getTranid() {
        return tranid;
    }

    public void setTranid(String tranid) {
        this.tranid = tranid;
    }

    public String getTrandate() {
        return trandate;
    }

    public void setTrandate(String trandate) {
        this.trandate = trandate;
    }

    public String getTranparticular() {
        return tranparticular;
    }

    public void setTranparticular(String tranparticular) {
        this.tranparticular = tranparticular;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getTranamount() {
        return tranamount;
    }

    public void setTranamount(String tranamount) {
        this.tranamount = tranamount;
    }

    public String getReversedamount() {
        return reversedamount;
    }

    public void setReversedamount(String reversedamount) {
        this.reversedamount = reversedamount;
    }

    public String getReversingamount() {
        return reversingamount;
    }

    public void setReversingamount(String reversingamount) {
        this.reversingamount = reversingamount;
    }

    public List<ContraDetails> getContraDetails() {
        return contraDetails;
    }

    public void setContraDetails(List<ContraDetails> contraDetails) {
        this.contraDetails = contraDetails;
    }

    private String reversedamount;

    public PickingAccountsDetails(String tranid, String trandate, String tranparticular, String currency, String tranamount, String reversedamount, String reversingamount, List<ContraDetails> contraDetails) {
        this.tranid = tranid;
        this.trandate = trandate;
        this.tranparticular = tranparticular;
        this.currency = currency;
        this.tranamount = tranamount;
        this.reversedamount = reversedamount;
        this.reversingamount = reversingamount;
        this.contraDetails = contraDetails;
    }

    private String reversingamount;
    private List<ContraDetails> contraDetails;
}
