package co.ke.emtechhouse.eims.URAComponent.CreditNote.GoodsDetailsCr;

import com.google.gson.annotations.Expose;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString

public class GoodsDetailsCr {



    public String getLocalInvoiceNo() {
        return localInvoiceNo;
    }

    public void setLocalInvoiceNo(String localInvoiceNo) {
        this.localInvoiceNo = localInvoiceNo;
    }

    @Expose
    private String localInvoiceNo;
    @Expose
    private String deemedFlag;
    @Expose
    private String discountFlag;
    @Expose
    private String discountTaxRate;
    @Expose
    private String discountTotal;
    @Expose
    private String exciseFlag;
    @Expose
    private String goodsCategoryId;
    @Expose
    private String item;
    @Expose
    private String itemCode;
    @Expose
    private String orderNumber;
    @Expose
    private String qty;
    @Expose
    private String tax;
    @Expose
    private String taxRate;
    @Expose
    private String total;
    @Expose
    private String unitOfMeasure;
    @Expose
    private String unitPrice;
}
