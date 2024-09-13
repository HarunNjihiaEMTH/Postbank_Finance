
package co.ke.emtechhouse.eims.URAComponent.queryinvoice;

import javax.annotation.Generated;
import com.google.gson.annotations.SerializedName;

@Generated("net.hexar.json2pojo")
@SuppressWarnings("unused")
public class Page {

    @SerializedName("pageCount")
    private Long mPageCount;
    @SerializedName("pageNo")
    private Long mPageNo;
    @SerializedName("pageSize")
    private Long mPageSize;
    @SerializedName("totalSize")
    private Long mTotalSize;

    public Long getPageCount() {
        return mPageCount;
    }

    public void setPageCount(Long pageCount) {
        mPageCount = pageCount;
    }

    public Long getPageNo() {
        return mPageNo;
    }

    public void setPageNo(Long pageNo) {
        mPageNo = pageNo;
    }

    public Long getPageSize() {
        return mPageSize;
    }

    public void setPageSize(Long pageSize) {
        mPageSize = pageSize;
    }

    public Long getTotalSize() {
        return mTotalSize;
    }

    public void setTotalSize(Long totalSize) {
        mTotalSize = totalSize;
    }

}
