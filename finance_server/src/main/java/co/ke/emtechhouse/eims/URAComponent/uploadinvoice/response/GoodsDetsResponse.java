
package co.ke.emtechhouse.eims.URAComponent.uploadinvoice.response;

import com.google.gson.annotations.Expose;

import javax.persistence.*;

@Entity
@Table(name = "uragoodsdetails")
@SuppressWarnings("unused")
public class GoodsDetsResponse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    @Expose
    private String deemedFlag;
    @Expose
    private String discountFlag;
    @Expose
    private String exciseFlag;
    @Expose
    private String exciseTax;
    @Expose
    private String goodsCategoryId;
    @Expose
    private String goodsCategoryName;
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
    @Expose
    private String vatApplicableFlag;
    @Expose
    private String invoiceId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getInvoiceId() {
        return invoiceId;
    }

    public void setInvoiceId(String invoiceId) {
        this.invoiceId = invoiceId;
    }

    public String getCustomerid() {
        return customerid;
    }

    public void setCustomerid(String customerid) {
        this.customerid = customerid;
    }

    @Expose
    private String customerid;

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

    public String getExciseFlag() {
        return exciseFlag;
    }

    public void setExciseFlag(String exciseFlag) {
        this.exciseFlag = exciseFlag;
    }

    public String getExciseTax() {
        return exciseTax;
    }

    public void setExciseTax(String exciseTax) {
        this.exciseTax = exciseTax;
    }

    public String getGoodsCategoryId() {
        return goodsCategoryId;
    }

    public void setGoodsCategoryId(String goodsCategoryId) {
        this.goodsCategoryId = goodsCategoryId;
    }

    public String getGoodsCategoryName() {
        return goodsCategoryName;
    }

    public void setGoodsCategoryName(String goodsCategoryName) {
        this.goodsCategoryName = goodsCategoryName;
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

    public String getVatApplicableFlag() {
        return vatApplicableFlag;
    }

    public void setVatApplicableFlag(String vatApplicableFlag) {
        this.vatApplicableFlag = vatApplicableFlag;
    }

}
