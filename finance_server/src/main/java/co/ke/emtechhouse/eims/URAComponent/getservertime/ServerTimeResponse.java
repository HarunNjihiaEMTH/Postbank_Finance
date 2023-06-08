
package co.ke.emtechhouse.eims.URAComponent.getservertime;

import javax.annotation.Generated;
import com.google.gson.annotations.SerializedName;

@Generated("net.hexar.json2pojo")
@SuppressWarnings("unused")
public class ServerTimeResponse {

    @SerializedName("currentTime")
    private String mCurrentTime;

    public String getCurrentTime() {
        return mCurrentTime;
    }

    public void setCurrentTime(String currentTime) {
        mCurrentTime = currentTime;
    }

}
