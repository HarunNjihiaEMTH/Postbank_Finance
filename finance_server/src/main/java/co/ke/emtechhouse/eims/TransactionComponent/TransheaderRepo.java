package co.ke.emtechhouse.eims.TransactionComponent;

import co.ke.emtechhouse.eims.TransactionComponent.Partrans.Partrans;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface TransheaderRepo extends JpaRepository<Transheader, Long> {
    @Query(value="SELECT * FROM `transheader` t  WHERE t.tran_date BETWEEN :fromDate AND :toDate",nativeQuery = true)
    List<Transheader> checkByDateANdTrans(String fromDate, String toDate);
//    SELECT t.transaction_code as transactionCode ,t.id as id,t.accrual_account as accrualAccount,t.posted_by as postedBy,t.expense_type as expenseType,t.invoice_no as invoiceNo,t.gross_amount as grossAmount,t.net_amount as netAmount ,t.tran_amount as tranAmount ,t.accrual_account_name as accrualAccountName,t.status as status ,s.supplier_name as supplierName,s.supplier_account as supplierAccount,s.supplier_bank as supplierBank ,p.account_currency_code ,p.amount ,p.account_name ,p.narration ,p.parttranstype ,p.cost_center ,p.account_no FROM `transheader` t join supplier s  on t.supplier_id =s.id join partrans p on p.transheader_id =t.id  WHERE t.transactiontype=:transactionType and t.status=:status"
    @Query(value="\n" +
            "SELECT * FROM `transheader` t  WHERE t.transactiontype=:transactionType and t.status=:status and t.posted_time between :fromDate and :toDate",nativeQuery = true)
    List<Transheader> getTransactionPerStatus(String transactionType, String status, String fromDate, String toDate);

    //TODO: getting account Balance
//    TODO ************************Get difference between acrual and reversal group by acrual code
    //TODO: getting account Balance
    @Query(value = "SELECT transheader.description as Description, transheader.collection_date as CollectionDate, MONTHNAME(transheader.collection_date) AS Month,transheader.tran_id as Transid,sum(IF(partrans.parttranstype='Credit' and transheader.tran_type='Advance', partrans.amount,0)) AS `Accrualbal` FROM transheader JOIN partrans on transheader.id=partrans.transheader_id WHERE transheader.supplier_id=:supplier_id AND transheader.finacle_status='Success' AND transactiontype = 'collect_accrual' AND tran_type='Advance' GROUP BY tran_id",nativeQuery = true)
    List<CollectAcrualBalInterface> getAccrualAdvance(Long supplier_id);

    @Query(value = "SELECT COALESCE(SUM(partrans.amount),0) as totalAmountReversed FROM transheader join partrans ON transheader.id=partrans.transheader_id WHERE transheader.supplier_id=:supplier_id AND transheader.collect_acrual_trans_id=:collect_acrual_trans_id AND partrans.parttranstype='Debit' AND transheader.tran_type='Reverse' AND transheader.finacle_status='Success' AND transactiontype = 'collect_accrual' AND transheader.collect_acrual_trans_id IS NOT NULL;",nativeQuery = true)
    Double getAccrualReverse(Long supplier_id, String collect_acrual_trans_id);


    //minus next
    @Query(value = "SELECT COALESCE(SUM(partrans.amount),0) as totalAmount FROM transheader join partrans ON transheader.id=partrans.transheader_id WHERE transheader.supplier_id=:supplier_id AND transheader.collect_acrual_trans_id=:collect_acrual_trans_id AND partrans.parttranstype='Debit' AND transheader.finacle_status='Success' AND transactiontype = 'pay_accrual' AND transheader.collect_acrual_trans_id IS NOT NULL",nativeQuery = true)
    Double getSupplierCredits(Long supplier_id,String collect_acrual_trans_id);

    interface CollectAcrualBalInterface{
        String getDescription();
        String getMonth();
        String getTransid();
        Date getCollectionDate();
        Double getAccrualbal();
    }

    @Query(value="SELECT * FROM `transheader` t  WHERE t.transactiontype=:transactionType and t.finacleStatus=:finacleStatus",nativeQuery = true)
    List<Transheader> getFinacleStatus(String transactionType, String finacleStatus);

    List<Transheader> findByDeletedFlag(char deletedFlag);

    @Query(value="\n" +
            "SELECT * FROM `transheader` t  WHERE t.transactiontype=:transactionType and t.posted_time between :fromDate and :toDate AND t.deleted_flag =:deletedFlag",nativeQuery = true)
    List<Transheader> findDeletedTrans(String transactionType, String fromDate, String toDate, Character deletedFlag);

    @Query(value="SELECT * FROM `transheader` t  WHERE t.transactiontype=:transactiontype and t.finacle_status=:finacle_status and t.supplier_id=:supplier_id",nativeQuery = true)
    List<Transheader> getSupplierPaymentHistory(String transactiontype, String finacle_status, Long supplier_id);

    public interface  TransactionInterface{
//        Transheader
            public Long getId();
            public Long getSupplierId();
        public Long getTranAmount();
            public String getExpenseType();
            public String getProducttype();
            public String getTransactiontype();
            public String getHavePo();
            public String getIncurTax();
            public String getInvoiceNo();
            public String getInvoiceDate();
            public String getTranId();
            public String getTranDate();
            public String getFinacleStatus();
            public String getStatus();
            public String getReason();
            public String getTransactionCode();
            public Integer getRetrycount();
            public String getDebitfrom();
            public String getPonumber();
            public String getVatAccount();
            public String getIwtAccount();
            public Double getGrossAmount();
            public Double getAmountExcTax();
            public String getInvoiceRefNo();
            public Double getSupplierAmount();
            public Double getVatAmount();
            public Double getIwtAmount();
            public String getIncurVatWH();
            public String getIncurIncomeWH();
            public String getHaveInvoice();
            public String getVatRate();
            public String getVatWHRate();
            public String getIncomeWHRate();
            public String getConversionRate();
            public String getAccrualAccount();
            public String getAccrualAccountName();


            public String getCurrency();
            public Double  getNetAmount();
            public Double getInvoiceAmount();
            public String getPaymentExpenses();
            public String getPaymentMode();
            public String getVerifiedTime();
            public String getVerifiedBy();
            public String getPostedBy();
            public String getPostedTime();
            public String getDescription();
            public String getDebitAccount();
            public String getCustomDebitAccount();
            public List<Partrans> getPartrans();

//        Supplier Details
            String getSupplierAccount();
            String getSupplierAddress();
            String getSupplierTin();
            String getSupplierBank();
            String getSupplierCurrency();
            String getSupplierCountry();
            String getSupplierContact();
            String getSupplierEmail();
            String getSupplierName();
//        Cost Center Details

    }
}
