package co.ke.emtechhouse.eims.ReportService.ReportQueries;

import co.ke.emtechhouse.eims.ReportService.ExcelExports.ExcelInterfaces.*;
import co.ke.emtechhouse.eims.TransactionComponent.Transheader;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportQueriesRepo extends JpaRepository<Transheader, Long> {
//    @Query(value="SELECT supplier.supplier_tin as Tin,supplier.supplier_name as SupplierName, supplier.supplier_country as Country, transheader.description as Description,\n" +
//            "transheader.gross_amount as GrossAmount, \n" +
//            "transheader.tran_amount as Tranamount,\n" +
//            "transheader.net_amount as Netamount, transheader.supplier_amount as Supplieramount, transheader.vat_amount as Vatamount, transheader.iwt_amount as IWTamount,\n" +
//            "transheader.currency as Currency, transheader.tran_date as TranDate, transheader.tran_id as TranId, transheader.invoice_no as InvoiceNo, transheader.invoice_date as InvoiceDate, transheader.rate as Rate, transheader.amount_exc_tax as AmountExcTax, transheader.tax_rate as TaxRate, transheader.incomewhrate as IncomeWHRate, transheader.iwt_account as IwtAccount, transheader.variance as Variance, transheader.posted_by as Postedby, transheader.verified_by as Verifiedby, transheader.vat_amount as VatAmount, transheader.iwt_amount as IwtAmount, transheader.supplier_account as SupplierAccount,transheader.accrual_account as Acrualaccount, transheader.total_debit_amt as Acrualamount,\n" +
//            "transheader.collection_date as Collectiondate FROM `transheader` JOIN supplier on supplier.id = transheader.supplier_id        \n" +
//            "WHERE\n" +
//            "transheader.tran_date BETWEEN :fromDate AND :toDate\n" +
//            "AND COALESCE(transheader.transactiontype,'') LIKE :transactiontype\n" +
//            "AND COALESCE(transheader.finacle_status,'') LIKE :finacle_status\n" +
//            "AND COALESCE(transheader.supplier_id,'') LIKE :supplier_id\n" +
//            "AND COALESCE(transheader.producttype,'') LIKE :producttype\n" +
//            "AND COALESCE(transheader.status,'')  LIKE :status",nativeQuery = true)
//    List<SupplierPayment> universalQueryWithParams(
//            String fromDate,
//            String toDate,
//            String transactiontype,
//            String finacle_status,
//            String supplier_id,
//            String producttype,
//            String status
//    );

    @Query(value="SELECT \n" +
            "    supplier.supplier_tin AS Tin,\n" +
            "    supplier.supplier_name AS SupplierName, \n" +
            "    supplier.supplier_country AS Country, \n" +
            "    transheader.description AS Description,\n" +
            "    transheader.gross_amount AS GrossAmount, \n" +
            "    transheader.amount_exc_tax AS AmountExcTax,  \n" +
            "    transheader.supplier_amount AS Supplieramount, \n" +
            "    transheader.vat_amount AS Vatamount, \n" +
            "    transheader.vwht_amount AS VWHAmount,\n" +
            "    transheader.iwt_amount AS IWTamount,\n" +
            "    transheader.currency AS Currency, \n" +
            "    transheader.tran_date AS TranDate, \n" +
            "    transheader.tran_id AS TranId, \n" +
            "    transheader.invoice_no AS InvoiceNo, \n" +
            "    DATE_FORMAT(transheader.invoice_date, '%Y-%m-%d') AS InvoiceDate, \n" +
            "    transheader.vat_rate AS TaxRate, \n" +
            "    transheader.vatwhrate AS VatWHRate, \n" +
            "    transheader.incomewhrate AS IncomeWHRate, \n" +
            "    transheader.supplier_account AS SupplierAccount,\n" +
            "    transheader.vat_account AS VwtAccount,\n" +
            "    transheader.iwt_account AS IwtAccount, \n" +
            "    transheader.posted_by AS Postedby, \n" +
            "    transheader.verified_by AS Verifiedby, \n" +
            "    transheader.accrual_account AS Acrualaccount, \n" +
            "    transheader.total_debit_amt AS Acrualamount,\n" +
            "    transheader.collection_date AS Collectiondate, \n" +
            "    transheader.posted_time \n" +
            "FROM \n" +
            "    `transheader` \n" +
            "    JOIN supplier ON supplier.id = transheader.supplier_id \n" +
            "WHERE\n" +
            "    transheader.posted_time BETWEEN :fromDate AND :toDate \n" +
            "    AND COALESCE(transheader.transactiontype,'') LIKE :transactiontype \n" +
            "    AND COALESCE(transheader.finacle_status,'') LIKE :finacle_status \n" +
            "    AND COALESCE(transheader.supplier_id,'') LIKE :supplier_id \n" +
            "    AND COALESCE(transheader.producttype,'') LIKE :producttype \n" +
            "    AND COALESCE(transheader.status,'')  LIKE :status",nativeQuery = true)
    List<SupplierPayment> universalQueryWithParams(
            String fromDate,
            String toDate,
            String transactiontype,
            String finacle_status,
            String supplier_id,
            String producttype,
            String status
    );


    @Query(value="SELECT \n" +
            "    supplier.supplier_tin AS Tin,\n" +
            "    supplier.supplier_name AS SupplierName, \n" +
            "    supplier.supplier_country AS Country, \n" +
            "    transheader.description AS Description,\n" +
            "    transheader.gross_amount AS GrossAmount, \n" +
            "    transheader.amount_exc_tax AS AmountExcTax,  \n" +
            "    transheader.supplier_amount AS Supplieramount, \n" +
            "    transheader.vat_amount AS Vatamount, \n" +
            "    transheader.vwht_amount AS VWHAmount,\n" +
            "    transheader.iwt_amount AS IWTamount,\n" +
            "    transheader.currency AS Currency, \n" +
            "    transheader.tran_date AS TranDate, \n" +
            "    transheader.tran_id AS TranId, \n" +
            "    transheader.invoice_no AS InvoiceNo, \n" +
            "    DATE_FORMAT(transheader.invoice_date, '%Y-%m-%d') AS InvoiceDate, \n" +
            "    transheader.vat_rate AS TaxRate, \n" +
            "    transheader.vatwhrate AS VatWHRate, \n" +
            "    transheader.incomewhrate AS IncomeWHRate, \n" +
            "    transheader.supplier_account AS SupplierAccount,\n" +
            "    transheader.vat_account AS VwtAccount,\n" +
            "    transheader.iwt_account AS IwtAccount, \n" +
            "    transheader.posted_by AS Postedby, \n" +
            "    transheader.verified_by AS Verifiedby, \n" +
            "    transheader.accrual_account AS Acrualaccount, \n" +
            "    transheader.total_debit_amt AS Acrualamount,\n" +
            "    transheader.collection_date AS Collectiondate, \n" +
            "    transheader.posted_time \n" +
            "FROM \n" +
            "    `transheader` \n" +
            "    JOIN supplier ON supplier.id = transheader.supplier_id \n" +
            "WHERE\n" +
            "    transheader.posted_time BETWEEN :fromDate AND :toDate \n" +
            "    AND COALESCE(transheader.transactiontype,'') LIKE :transactiontype \n" +
            "    AND COALESCE(transheader.finacle_status,'') LIKE :finacle_status \n" +
            "    AND COALESCE(transheader.supplier_id,'') LIKE :supplier_id \n" +
            "    AND COALESCE(transheader.producttype,'') LIKE :producttype \n" +
            "    AND COALESCE(transheader.status,'')  LIKE :status \n"+
            "    AND transheader.vwht_amount > 0",nativeQuery = true)
    List<SupplierPayment> vhtQueryWithParams(
            String fromDate,
            String toDate,
            String transactiontype,
            String finacle_status,
            String supplier_id,
            String producttype,
            String status
    );
    @Query(value="SELECT \n" +
            "    supplier.supplier_tin AS Tin,\n" +
            "    supplier.supplier_name AS SupplierName, \n" +
            "    supplier.supplier_country AS Country, \n" +
            "    transheader.description AS Description,\n" +
            "    transheader.gross_amount AS GrossAmount, \n" +
            "    transheader.amount_exc_tax AS AmountExcTax,  \n" +
            "    transheader.supplier_amount AS Supplieramount, \n" +
            "    transheader.vat_amount AS Vatamount, \n" +
            "    transheader.vwht_amount AS VWHAmount,\n" +
            "    transheader.iwt_amount AS IWTamount,\n" +
            "    transheader.currency AS Currency, \n" +
            "    transheader.tran_date AS TranDate, \n" +
            "    transheader.tran_id AS TranId, \n" +
            "    transheader.invoice_no AS InvoiceNo, \n" +
            "    DATE_FORMAT(transheader.invoice_date, '%Y-%m-%d') AS InvoiceDate, \n" +
            "    transheader.vat_rate AS TaxRate, \n" +
            "    transheader.vatwhrate AS VatWHRate, \n" +
            "    transheader.incomewhrate AS IncomeWHRate, \n" +
            "    transheader.supplier_account AS SupplierAccount,\n" +
            "    transheader.vat_account AS VwtAccount,\n" +
            "    transheader.iwt_account AS IwtAccount, \n" +
            "    transheader.posted_by AS Postedby, \n" +
            "    transheader.verified_by AS Verifiedby, \n" +
            "    transheader.accrual_account AS Acrualaccount, \n" +
            "    transheader.total_debit_amt AS Acrualamount,\n" +
            "    transheader.collection_date AS Collectiondate, \n" +
            "    transheader.posted_time \n" +
            "FROM \n" +
            "    `transheader` \n" +
            "    JOIN supplier ON supplier.id = transheader.supplier_id \n" +
            "WHERE\n" +
            "    transheader.posted_time BETWEEN :fromDate AND :toDate \n" +
            "    AND COALESCE(transheader.transactiontype,'') LIKE :transactiontype \n" +
            "    AND COALESCE(transheader.finacle_status,'') LIKE :finacle_status \n" +
            "    AND COALESCE(transheader.supplier_id,'') LIKE :supplier_id \n" +
            "    AND COALESCE(transheader.producttype,'') LIKE :producttype \n" +
            "    AND COALESCE(transheader.status,'')  LIKE :status \n"+
            "    AND transheader.iwt_amount > 0",nativeQuery = true)
    List<SupplierPayment> iwhtQueryWithParams(
            String fromDate,
            String toDate,
            String transactiontype,
            String finacle_status,
            String supplier_id,
            String producttype,
            String status
    );



    @Query(value="SELECT th.id, th.tran_id AS TranId, th.tran_date AS TranDate, th.posted_by AS CreatedBy, th.verified_by AS VerifiedBy, th.finacle_status, th.status, th.description AS Description,th.posted_time,\n" +
            "       pt.type_of_account AS AcType, pt.account_currency_code AS Ccy, pt.account_name AS AcName, pt.account_no AS AcNo,pt.sol_id AS SolId, pt.sol_desc AS SolDesc,\n" +
            "       pt.amount AS TranAmount, pt.narration, pt.parttranstype AS TranType\n" +
            "FROM transheader th\n" +
            "JOIN partrans pt ON th.id = pt.transheader_id\n" +
            "WHERE th.posted_time \n" +
            "BETWEEN :fromDate AND :toDate \n" +
            "AND th.transactiontype LIKE :transactiontype \n" +
            "AND th.finacle_status LIKE :finacle_status \n" +
            "AND th.status LIKE :status",nativeQuery = true)
    List<DirectPayment> directTransferReport(
            String fromDate,
            String toDate,
            String transactiontype,
            String finacle_status,
            String status
    );

    @Query(value="select urainvoices.customerid as Customertin, ori_invoice_id as Oriinvoiceid, ori_invoice_no as Oriinvoiceno, sellers_reference_no as Sellersreferenceno, source as Source, application_time as Applicationtime, currency as Currency, reason_code as Reasoncode, reason as Reason, response_code as Responsecode, ura_status as Urastatus, posted_by as Createdby, verified_by as Verifiedby from credit_note JOIN urainvoices on urainvoices.invoiceno = credit_note.ori_invoice_no\n" +
            "WHERE COALESCE(credit_note.ura_status,'')  LIKE :ura_status \n" +
            "AND  COALESCE(urainvoices.customerid,'') LIKE :customerid\n" +
            "AND credit_note.posted_time  BETWEEN :fromDate AND :toDate",nativeQuery = true)
    List<Creditnoterepo> creditnote(String ura_status,String customerid, String fromDate, String toDate);

    @Query(value="SELECT * from urainvoices where  urainvoices.uradescription='SUCCESS' AND COALESCE(urainvoices.customerid,'') LIKE :customerid",nativeQuery = true)
    List<InvoiceDetailsCust> getSuccessfullUraInvoices(String customerid);

    @Query(value="SELECT * from urainvoices where uradescription !='SUCCESS' AND COALESCE(urainvoices.customerid,'') LIKE :customerid",nativeQuery = true)
    List<InvoiceDetailsCust> getFaledUraInvoices(String customerid);

    @Query(value="select purchase_order.po_status as Status, purchase_order.po_name as Poname,purchase_order.po_number as Ponumber, purchase_order.posted_time as Postedtime, \n" +
            "purchase_order.original_total_before_tax as Totalamount, \n" +
            "purchase_order.original_vat_amount as Vat, \n" +
            "purchase_order.original_vat_witholding as Vatwht, \n" +
            "purchase_order.original_income_withholdingamount as IWT,\n" +
            "supplier.supplier_name as Suppliername, supplier.supplier_tin as Suppliertin, supplier.supplier_currency as Currency, supplier.supplier_country as Country, purchase_order.invoice_no as Invoiceno, purchase_order.posted_by as Postedby, purchase_order.verified_by as Verifedby \n" +
            "from purchase_order join supplier on purchase_order.supplier_id=supplier.id where COALESCE(purchase_order.po_status,'') LIKE :status and COALESCE(purchase_order.supplier_id LIKE :supplier_id and purchase_order.posted_time BETWEEN :fromDate AND :toDate",nativeQuery = true)
    List<POInterface> getPOAll(String status, String supplier_id, String fromDate, String toDate);

    @Query(value="SELECT invoice.invoice_no as Invoice_No,invoice.transheader_status as Payment, invoice.issued_date as Invoice_Date, invoice.currency as Currency, invoice.total_before_tax as Gross_Mount, invoice.transheader_amount as Amount_Received, invoice.balance as Balance, customer.buyer_legal_name as Customer_Name, customer.buyer_tin as Customer_Tin, invoice.modified_time as Payment_Date FROM invoice JOIN customer on invoice.customer_id=customer.id where invoice.issued_date BETWEEN :fromDate AND :toDate AND tran_id IS NOT NULL",nativeQuery = true)
    List<InvoiceInterface> getPaymentdoneperstatus(String fromDate, String toDate);
    interface  InvoiceInterface{
        String getInvoice_No();
        String getPayment();
        String getInvoice_Date();
        String getCurrency();
        String getGross_Mount();
        String getAmount_Received();
        String getBalance();
        String getCustomer_Name();
        String getCustomer_Tin();
        String getPayment_Date();

    }

//    @Query(value="select \n" +
//            "urabuyerdetails.buyer_business_name as NameOfPurchaser, urabuyerdetails.buyer_tin as TinOfPurchaser,\n" +
//            "DATE(urainvoices.datetime) as InvoiceDate,\n" +
//            "urabasicinformation.invoice_id as Fdn, \n" +
//            "uragoodsdetails.item as DescriptionofGoods,\n" +
//            "urasummarydetails.net_amount as AmountExclusiveVat,\n" +
//            "urasummarydetails.net_amount as Totals,\n" +
//            " urasummarydetails.tax_amount as VatCharged, \n" +
//            "urabasicinformation.currency as Currency, urabasicinformation.currency_rate as ExchangeRate,\n" +
//            "urasellerdetails.reference_no as ReferenceNo,\n" +
//            "urasellerdetails.tin as TinOfSeller\n"+
//            " from urabuyerdetails \n" +
//            " join urainvoices on urabuyerdetails.invoice_id = urainvoices.invoiceno\n" +
//            " join urasellerdetails on urasellerdetails.invoice_id = urainvoices.invoiceno\n" +
//            " join urabasicinformation on urabasicinformation.invoice_no = urainvoices.invoiceno\n" +
//            " join urasummarydetails on urasummarydetails.invoice_id = urainvoices.invoiceno\n" +
//            " join uragoodsdetails on uragoodsdetails.invoice_id = urainvoices.invoiceno\n" +
//            " WHERE urainvoices.customerid LIKE :customerid and urainvoices.datetime BETWEEN :fromDate and :toDate",nativeQuery = true)
//    List<InvoiceDetailedInfo> getLocalDetailedInvoiceInfo(String customerid, String fromDate, String toDate);

    @Query(value="SELECT\n" +
            "    urabuyerdetails.buyer_business_name AS NameOfPurchaser,\n" +
            "    urabuyerdetails.buyer_tin AS TinOfPurchaser,\n" +
            "    DATE_FORMAT(urainvoices.datetime, '%Y-%m-%d') AS InvoiceDate,\n" +
            "    urabasicinformation.invoice_no AS Fdn,\n" +
            "    uragoodsdetails.item AS DescriptionofGoods,\n" +
            "    urasummarydetails.net_amount AS AmountExclusiveVat,\n" +
            "    urasummarydetails.net_amount AS Totals,\n" +
            "    urasummarydetails.tax_amount AS VatCharged,\n" +
            "    urabasicinformation.currency AS Currency,\n" +
            "    urabasicinformation.currency_rate AS ExchangeRate,\n" +
            "    urasellerdetails.reference_no AS ReferenceNo,\n" +
            "    urasellerdetails.tin AS TinOfSeller\n" +
            "FROM\n" +
            "    urabuyerdetails\n" +
            "    JOIN urainvoices ON urabuyerdetails.invoice_id = urainvoices.invoiceno\n" +
            "    JOIN urasellerdetails ON urasellerdetails.invoice_id = urainvoices.invoiceno\n" +
            "    JOIN urabasicinformation ON urabasicinformation.invoice_no = urainvoices.invoiceno\n" +
            "    JOIN urasummarydetails ON urasummarydetails.invoice_id = urainvoices.invoiceno\n" +
            "    JOIN uragoodsdetails ON uragoodsdetails.invoice_id = urainvoices.invoiceno\n" +
            "WHERE\n" +
            "    urainvoices.customerid LIKE :customerid\n" +
            "    AND urabuyerdetails.buyer_tin <> urasellerdetails.tin\n" +
            "    And urainvoices.datetime BETWEEN :fromDate and :toDate",nativeQuery = true)
    List<InvoiceLocalDetailedInfo> getLocalDetailedInvoiceInfo(String customerid, String fromDate, String toDate);


//    @Query(value="select \n" +
//            "ura_import_services_seller.import_business_name AS NameOfSeller,\n" +
//            "DATE(urainvoices.datetime) as InvoiceDate,\n" +
//            "urabasicinformation.invoice_id as Fdn, \n" +
//            "uragoodsdetails.item as DescriptionofGoods,\n" +
//            "urasummarydetails.net_amount as AmountExclusiveVat,\n" +
//            "urasummarydetails.net_amount as Totals,\n" +
//            " urasummarydetails.tax_amount as VatCharged, \n" +
//            "urabasicinformation.currency as Currency, urabasicinformation.currency_rate as ExchangeRate,\n" +
//            "urasellerdetails.reference_no as ReferenceNo,\n" +
//            " from urabuyerdetails \n" +
//            " join urainvoices on urabuyerdetails.invoice_id = urainvoices.invoiceno\n" +
//            " join urasellerdetails on urasellerdetails.invoice_id = urainvoices.invoiceno\n" +
//            " join urabasicinformation on urabasicinformation.invoice_no = urainvoices.invoiceno\n" +
//            " join urasummarydetails on urasummarydetails.invoice_id = urainvoices.invoiceno\n" +
//            " join uragoodsdetails on uragoodsdetails.invoice_id = urainvoices.invoiceno\n" +
//            " WHERE urainvoices.customerid LIKE :customerid and urainvoices.datetime BETWEEN :fromDate and :toDate",nativeQuery = true)
//    List<InvoiceDetailedInfo> getImportedDetailedInvoiceInfo(String customerid, String fromDate, String toDate);

    @Query(value="SELECT\n" +
            "    ura_import_services_seller.import_business_name AS NameOfSeller,\n" +
            "    urabuyerdetails.buyer_tin AS TinOfPurchaser,\n" +
            "    DATE_FORMAT(urainvoices.datetime, '%Y-%m-%d') AS InvoiceDate,\n" +
            "    urabasicinformation.invoice_no AS Fdn,\n" +
            "    uragoodsdetails.item AS DescriptionofGoods,\n" +
            "    urasummarydetails.net_amount AS AmountExclusiveVat,\n" +
            "    urasummarydetails.net_amount AS Totals,\n" +
            "    urasummarydetails.tax_amount AS VatCharged,\n" +
            "    urabasicinformation.currency AS Currency,\n" +
            "    urabasicinformation.currency_rate AS ExchangeRate,\n" +
            "    urasellerdetails.reference_no AS ReferenceNo,\n" +
            "    urasellerdetails.tin AS TinOfSeller\n" +
            "FROM\n" +
            "    urabuyerdetails\n" +
            "    JOIN urainvoices ON urabuyerdetails.invoice_id = urainvoices.invoiceno\n" +
            "    JOIN urasellerdetails ON urasellerdetails.invoice_id = urainvoices.invoiceno\n" +
            "    JOIN urabasicinformation ON urabasicinformation.invoice_no = urainvoices.invoiceno\n" +
            "    JOIN urasummarydetails ON urasummarydetails.invoice_id = urainvoices.invoiceno\n" +
            "    JOIN uragoodsdetails ON uragoodsdetails.invoice_id = urainvoices.invoiceno\n" +
            "    JOIN ura_import_services_seller ON ura_import_services_seller.invoice_id = urainvoices.invoiceno\n" +
            "WHERE\n" +
            "    urainvoices.customerid LIKE :customerid\n" +
            "    AND urabuyerdetails.buyer_tin = urasellerdetails.tin\n" +
            "    AND urainvoices.datetime BETWEEN :fromDate AND :toDate\n",nativeQuery = true)
    List<InvoiceImportDetailedInfo> getImportedDetailedInvoiceInfo(String customerid, String fromDate, String toDate);
}

