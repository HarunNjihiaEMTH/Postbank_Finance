
package co.ke.emtechhouse.eims.URAComponent.KeyAndSignature;

import javax.annotation.Generated;
import com.google.gson.annotations.SerializedName;

@Generated("net.hexar.json2pojo")
@SuppressWarnings("unused")
public class SymmetricKeyResponse {

    @SerializedName("passowrdDes")
    private String mPassowrdDes;
    @SerializedName("sign")
    private String mSign;

    public String getPassowrdDes() {
        return mPassowrdDes;
    }

    public void setPassowrdDes(String passowrdDes) {
        mPassowrdDes = passowrdDes;
    }

    public String getSign() {
        return mSign;
    }

    public void setSign(String sign) {
        mSign = sign;
    }

}
