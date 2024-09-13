
package co.ke.emtechhouse.eims.URAComponent.urarequest;

public class URARequest {
    private Data data;
    private GlobalInfo globalInfo;

    public URARequest() {
    }

    public Data getData() {
        return data;
    }

    public void setData(Data data) {
        this.data = data;
    }

    public GlobalInfo getGlobalInfo() {
        return globalInfo;
    }

    public void setGlobalInfo(GlobalInfo globalInfo) {
        this.globalInfo = globalInfo;
    }

    public ReturnStateInfo getReturnStateInfo() {
        return returnStateInfo;
    }

    public void setReturnStateInfo(ReturnStateInfo returnStateInfo) {
        this.returnStateInfo = returnStateInfo;
    }

    public URARequest(Data data, GlobalInfo globalInfo, ReturnStateInfo returnStateInfo) {
        this.data = data;
        this.globalInfo = globalInfo;
        this.returnStateInfo = returnStateInfo;
    }

    private ReturnStateInfo returnStateInfo;
}
