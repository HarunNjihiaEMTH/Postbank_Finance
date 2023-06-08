package co.ke.emtechhouse.eims.URAComponent.queryinvoice;

public class InvoiceInqReq {
    private String invoiceNo;

    public String getInvoiceNo() {
        return invoiceNo;
    }

    public void setInvoiceNo(String invoiceNo) {
        this.invoiceNo = invoiceNo;
    }

    public InvoiceInqReq(String invoiceNo) {
        this.invoiceNo = invoiceNo;
    }

    public InvoiceInqReq() {
    }
}
