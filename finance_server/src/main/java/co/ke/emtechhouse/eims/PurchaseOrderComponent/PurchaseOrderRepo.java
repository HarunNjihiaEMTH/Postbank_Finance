package co.ke.emtechhouse.eims.PurchaseOrderComponent;

import co.ke.emtechhouse.eims.PurchaseOrderComponent.PO.POExpenseResponce;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PurchaseOrderRepo extends JpaRepository<PurchaseOrder,Long> {
    @Query(value = "SELECT * FROM `purchase_order` WHERE purchase_order.po_status LIKE :Status  AND purchase_order.posted_time BETWEEN :fromDate AND :toDate", nativeQuery = true)
    List<PurchaseOrder> checkPoifExist(String Status, String fromDate, String toDate);
    @Query(value = "SELECT * FROM `purchase_order` WHERE po_number =:po_number LIMIT 1", nativeQuery = true)
    List<PurchaseOrder> checkByPo(String po_number);
    @Query(value = "SELECT * FROM `purchase_order` WHERE po_number =:po_number", nativeQuery = true)
    PurchaseOrder getByPo_number(String po_number);
    @Query(value = "SELECT * FROM `purchase_order` WHERE po_status ='Pending'", nativeQuery = true)
    List<PurchaseOrder> getPending();
    @Query(value = "SELECT * FROM `purchase_order` WHERE po_status ='Rejected'", nativeQuery = true)
    List<PurchaseOrder> getRejectedpos();
    @Query(value = "SELECT * FROM `purchase_order` WHERE cancel_status ='Canceled'", nativeQuery = true)
    List<PurchaseOrder> getCancelled();
    @Query(value = "SELECT * FROM `purchase_order` WHERE is_sent = false ORDER BY id DESC", nativeQuery = true)
    List<PurchaseOrder> getAllPaid();
    @Query(value = "SELECT * FROM `purchase_order` WHERE po_status = 'Paid'ORDER BY id DESC", nativeQuery = true)
    List<PurchaseOrder> unsentpo();
    @Query(value = "SELECT * FROM `purchase_order` WHERE po_status ='Approved' AND is_sent = true AND move_to_bill = false ORDER BY id DESC", nativeQuery = true)
    List<PurchaseOrder> sentpo();
    @Query(value = "SELECT supplier_account ,po_name,expense_description,expense_account ,amount_balance,item_name,item_quantity,item_total_value,item_unit_price,vat_rate,vat_id,tax_account from purchase_order po join supplier s  on po.supplier_id =s.id JOIN expense e on po.expense_id =e.id JOIN po_particulars pp on pp.purchase_order_id =po.id JOIN taxes t on pp.vat_id =t.id where po.id=:po_id",nativeQuery = true)
    List<ExpenseData> getexpenses(@Param("po_id") String po_id);
    @Query(value = "SELECT * from purchase_order WHERE move_to_bill=TRUE",nativeQuery = true)
    List<PurchaseOrder> listPuchaseorders();
    @Query(value = "select po.id as poId, supplier.supplier_name as supplierName,supplier.supplier_account as supplierAccount,po_name as poName, po_number as  poNumber, invoice_no as invoiceNo,po_status as poStatus,original_total_after_tax as total_after_tax,original_vat_amount as vat_amount,original_income_withholdingamount as income_withholding_amount,po.posted_time as postedTime from purchase_order po join supplier on po.supplier_id=supplier.id where is_sent = true AND move_to_bill=true AND is_paid = true",nativeQuery = true)
    List<Paidbills> PaidBills();
    @Query(value = "select expense.expense_major_category as majorCategory, expense.expense_account as expenseAccount, expense.expense_description as expenseName,expense.expense_type as expenseType, expense.expense_sub_category as subCategory, \n" +
            "supplier.supplier_name as supplierName,\n" +
            "purchase_order.invoice_no as invoiceNo,\n" +
            "purchase_order.invoice_date as invoiceDate,\n" +
            "purchase_order.invoice_amount as invoiceAMount,\n" +
            "supplier.id as supplierId,supplier.supplier_account as supplierAccount, purchase_order.po_name as poName,\n" +
            "purchase_order.po_number as po_number, SUM(purchase_order.original_total_before_tax) as totalBeforetax, sum(original_total_after_tax) as totalAftertax, sum(original_vat_amount) as totalVat, sum(original_income_withholdingamount) as totalIncomewithholdingtax, po_particulars.expense_id as expenseId from po_particulars JOIN expense on po_particulars.expense_id = expense.id JOIN purchase_order on po_particulars.purchase_order_id = purchase_order.id JOIN supplier on purchase_order.supplier_id = supplier.id WHERE purchase_order.is_sent =true GROUP BY po_particulars.expense_id",nativeQuery = true)
    List<Unpaidbills> UnpaidBills();
    @Query(value = "select expense.expense_major_category as majorCategory, expense.expense_account as expenseAccount, expense.expense_description as expenseName,expense.expense_type as expenseType, expense.expense_sub_category as subCategory, supplier.supplier_name as supplierName,supplier.id as supplierId,supplier.supplier_account as supplierAccount, purchase_order.po_name as poName,purchase_order.po_number as po_number, SUM(purchase_order.original_total_before_tax) as totalBeforetax, sum(original_total_after_tax) as totalAftertax, sum(original_vat_amount) as totalVat, sum(original_income_withholdingamount) as totalIncomewithholdingtax, po_particulars.expense_id as expenseId from po_particulars JOIN expense on po_particulars.expense_id = expense.id JOIN purchase_order on po_particulars.purchase_order_id = purchase_order.id JOIN supplier on purchase_order.supplier_id = supplier.id WHERE purchase_order.is_sent =true and purchase_order.po_number =:po_number GROUP BY po_particulars.expense_id;",nativeQuery = true)
    List<ExpensePerOrder> getexpensesPerorder(String po_number);


    List<PurchaseOrder> findBySupplierId(Long supplierId);
    List<PurchaseOrder> findByExpenseId(String expenseId);
    public interface Paidbills {
        String getPoId();
        String getSupplierName();
        String getPoName();
        String getPoNumber();
        String getPoStatus();
        String getTotal_after_tax();
        String getIncome_withholding_amount();
        String getVat_amount();
        String getPostedTime();
        String getInvoiceNo();
    }

    @Query(value = "select po.id as poId, supplier.supplier_name as supplierName,supplier.supplier_account as supplierAccount,po_name as poName, po_number as  poNumber, invoice_no as invoiceNo,po_status as poStatus,original_total_after_tax as total_after_tax,original_vat_amount as vat_amount,original_income_withholdingamount as income_withholding_amount,po.posted_time as postedTime from purchase_order po join supplier on po.supplier_id=supplier.id where is_sent = true AND move_to_bill=true AND is_paid = false",nativeQuery = true)
    List<POExpenseResponce> poResponce();

//    GET PO FOR PAYMENTS
    @Query(value = "select expense.expense_major_category as majorCategory, expense.expense_account as expenseAccount, expense.expense_description as expenseName,expense.expense_type as expenseType, expense.expense_sub_category as subCategory, \n" +
            "supplier.supplier_name as supplierName,\n" +
            "purchase_order.invoice_no as invoiceNo,\n" +
            "purchase_order.invoice_date as invoiceDate,\n" +
            "purchase_order.invoice_amount as invoiceAMount,\n" +
            "supplier.id as supplierId,supplier.supplier_account as supplierAccount, purchase_order.po_name as poName,\n" +
            "purchase_order.po_number as po_number, SUM(purchase_order.original_total_before_tax) as totalBeforetax, sum(original_total_after_tax) as totalAftertax, sum(original_vat_amount) as totalVat, sum(original_income_withholdingamount) as totalIncomewithholdingtax, po_particulars.expense_id as expenseId from po_particulars JOIN expense on po_particulars.expense_id = expense.id JOIN purchase_order on po_particulars.purchase_order_id = purchase_order.id JOIN supplier on purchase_order.supplier_id = supplier.id WHERE purchase_order.is_sent =true GROUP BY po_particulars.expense_id;",nativeQuery = true)
    List<Unpaidbills> preparePOPayments();

    @Query(value = "SELECT * from purchase_order WHERE purchase_order.move_to_bill = true",nativeQuery = true)
    List<PurchaseOrder> moveBills();

    @Query(nativeQuery = true, value = "select * from purchase_order order by id desc limit 1")
    Optional<PurchaseOrder> findLastEntry();


    Optional<PurchaseOrder> findByPoNumber(String poNumber);
}