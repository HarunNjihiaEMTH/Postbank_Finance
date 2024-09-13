package co.ke.emtechhouse.eims.Finacle.pointingAccountInfo;

import com.google.gson.annotations.SerializedName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@XmlAccessorType(XmlAccessType.FIELD)
public class body {
    @SerializedName("acctCrncyCode")
    public List<String> acctCrncyCode;
    @SerializedName("acctName")
    public List<String> acctName;
    @SerializedName("foracid")
    public List<String> foracid;
    @SerializedName("numOffsetPtran")
    public List<String> numOffsetPtran;
    @SerializedName("orgTranAmt")
    public List<String> orgTranAmt;
    @SerializedName("partTranSrlNum")
    public List<Integer> partTranSrlNum;
    @SerializedName("partTranType")
    public List<String> partTranType;
    @SerializedName("solId")
    public List<String> solId;
    @SerializedName("totalOffsetAmt")
    public List<String> totalOffsetAmt;
    @SerializedName("tranDate")
    public List<String> tranDate;
    @SerializedName("tranId")
    public List<String> tranId;
    @SerializedName("tranParticular")
    public List<String> tranParticular;
}

