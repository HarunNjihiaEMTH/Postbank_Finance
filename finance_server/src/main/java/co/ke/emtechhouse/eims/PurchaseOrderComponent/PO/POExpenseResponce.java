package co.ke.emtechhouse.eims.PurchaseOrderComponent.PO;

import co.ke.emtechhouse.eims.PurchaseOrderComponent.ExpensePerOrder;
import co.ke.emtechhouse.eims.PurchaseOrderComponent.PoParticularsComponent.PoParticulars;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class POExpenseResponce {
    private String supplierName;
    private String getSupplierAccount;
    private String invoiceNo;
    private String invoiceDate;
    private String invoiceAmount;
    private List<ExpensePerOrder> paymentExpenses;
}
