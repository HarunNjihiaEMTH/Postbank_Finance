
package co.ke.emtechhouse.eims.URAComponent.uploadinvoice.request;

import javax.annotation.Generated;
import javax.persistence.*;

import com.google.gson.annotations.Expose;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Generated("net.hexar.json2pojo")
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "goodsdetailsrequest")
@SuppressWarnings("unused")
public class GoodsDetailRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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
    private String taxId;

    @Expose
    private String taxCode;

    @Expose
    private String total;
    @Expose
    private String unitOfMeasure;
    @Expose
    private String unitPrice;

    public String getTaxCode() {
        return taxCode;
    }

    public void setTaxCode(String taxCode) {
        this.taxCode = taxCode;
    }

    public String getTaxId() {
        return taxId;
    }

    public void setTaxId(String taxId) {
        this.taxId = taxId;
    }

    public String getDeemedFlag() {
        return deemedFlag;
    }

    public void setDeemedFlag(String deemedFlag) {
        this.deemedFlag = deemedFlag;
    }

    public String getDiscountFlag() {
        return discountFlag;
    }

    public void setDiscountFlag(String discountFlag) {
        this.discountFlag = discountFlag;
    }

    public String getDiscountTaxRate() {
        return discountTaxRate;
    }

    public void setDiscountTaxRate(String discountTaxRate) {
        this.discountTaxRate = discountTaxRate;
    }

    public String getDiscountTotal() {
        return discountTotal;
    }

    public void setDiscountTotal(String discountTotal) {
        this.discountTotal = discountTotal;
    }

    public String getExciseFlag() {
        return exciseFlag;
    }

    public void setExciseFlag(String exciseFlag) {
        this.exciseFlag = exciseFlag;
    }

    public String getGoodsCategoryId() {
        return goodsCategoryId;
    }

    public void setGoodsCategoryId(String goodsCategoryId) {
        this.goodsCategoryId = goodsCategoryId;
    }

    public String getItem() {
        return item;
    }

    public void setItem(String item) {
        this.item = item;
    }

    public String getItemCode() {
        return itemCode;
    }

    public void setItemCode(String itemCode) {
        this.itemCode = itemCode;
    }

    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }

    public String getQty() {
        return qty;
    }

    public void setQty(String qty) {
        this.qty = qty;
    }

    public String getTax() {
        return tax;
    }

    public void setTax(String tax) {
        this.tax = tax;
    }

    public String getTaxRate() {
        return taxRate;
    }

    public void setTaxRate(String taxRate) {
        this.taxRate = taxRate;
    }

    public String getTotal() {
        return total;
    }

    public void setTotal(String total) {
        this.total = total;
    }

    public String getUnitOfMeasure() {
        return unitOfMeasure;
    }

    public void setUnitOfMeasure(String unitOfMeasure) {
        this.unitOfMeasure = unitOfMeasure;
    }

    public String getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(String unitPrice) {
        this.unitPrice = unitPrice;
    }

}
