
package co.ke.emtechhouse.eims.URAComponent.clientinit;

import javax.annotation.Generated;
import com.google.gson.annotations.SerializedName;

@Generated("net.hexar.json2pojo")
@SuppressWarnings("unused")
public class ClientInitResponse {

    @SerializedName("clientPriKey")
    private String mClientPriKey;
    @SerializedName("keyTable")
    private String mKeyTable;
    @SerializedName("serverPubKey")
    private String mServerPubKey;

    public String getClientPriKey() {
        return mClientPriKey;
    }

    public void setClientPriKey(String clientPriKey) {
        mClientPriKey = clientPriKey;
    }

    public String getKeyTable() {
        return mKeyTable;
    }

    public void setKeyTable(String keyTable) {
        mKeyTable = keyTable;
    }

    public String getServerPubKey() {
        return mServerPubKey;
    }

    public void setServerPubKey(String serverPubKey) {
        mServerPubKey = serverPubKey;
    }

}
