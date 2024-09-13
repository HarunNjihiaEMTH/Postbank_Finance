
package co.ke.emtechhouse.eims.URAComponent.queryinvoice;

import java.util.List;
import javax.annotation.Generated;
import com.google.gson.annotations.SerializedName;

@Generated("net.hexar.json2pojo")
@SuppressWarnings("unused")
public class QueryInvDetRes {

    @SerializedName("dateFormat")
    private String mDateFormat;
    @SerializedName("nowTime")
    private String mNowTime;
    @SerializedName("page")
    private Page mPage;
    @SerializedName("records")
    private List<Record> mRecords;
    @SerializedName("timeFormat")
    private String mTimeFormat;

    public String getDateFormat() {
        return mDateFormat;
    }

    public void setDateFormat(String dateFormat) {
        mDateFormat = dateFormat;
    }

    public String getNowTime() {
        return mNowTime;
    }

    public void setNowTime(String nowTime) {
        mNowTime = nowTime;
    }

    public Page getPage() {
        return mPage;
    }

    public void setPage(Page page) {
        mPage = page;
    }

    public List<Record> getRecords() {
        return mRecords;
    }

    public void setRecords(List<Record> records) {
        mRecords = records;
    }

    public String getTimeFormat() {
        return mTimeFormat;
    }

    public void setTimeFormat(String timeFormat) {
        mTimeFormat = timeFormat;
    }

}
