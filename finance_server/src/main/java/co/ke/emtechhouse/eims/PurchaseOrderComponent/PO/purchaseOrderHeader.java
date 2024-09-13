package co.ke.emtechhouse.eims.PurchaseOrderComponent.PO;

public interface purchaseOrderHeader {
    String getSupplierName();
    String getSupplierAccount();
    String getInvoiceNo();
    String getInvoiceDate();
    String getInvoiceAmount();
    String getSupplierid();
    String getPo_number();
    String getPoname();
    String getTotalaftertax();
    String getTotalbeforetax();
}


//{
//        "supplierName": "Kaden Stevens",
//        "getSupplierAccount": "3456712376341",
//        "invoiceNo": "545",
//        "invoiceDate": null,
//        "invoiceAmount": null,
//        "supplierid": "7"
//        "po_number": "ALK&F6dJimM6Xnv",
//        "poname": "test po",
//        "totalaftertax": "2320.0",
//        "totalbeforetax": "2000.0",
//        "paymentExpenses": [
//        {
//        "expenseName": "Pension Expenses",
//        "expenseType": "Service",
//        "expenseAccount": "0188020001BDBDCO
//        "expenseid": "1",
//        }
//        ]
//        },