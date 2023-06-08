package co.ke.emtechhouse.eims.Analysis;

import co.ke.emtechhouse.eims.TransactionComponent.Transheader;
import org.apache.poi.ss.formula.functions.T;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnalysisRepo extends JpaRepository<Transheader, Long> {
    //    TODO: CHARTS - iwt
    @Query(value="SELECT COALESCE(SUM(transheader.iwt_amount),0) as Amount, MONTHNAME(transheader.tran_date) AS Month, YEAR(transheader.tran_date) As Year FROM transheader WHERE transheader.tran_date IS NOT NULL GROUP BY Year",nativeQuery = true)
    List<ChartInterface> getIWTYearwise();
    @Query(value="SELECT COALESCE(SUM(transheader.iwt_amount),0) as Amount, MONTHNAME(transheader.tran_date) AS Month, YEAR(transheader.tran_date) As Year FROM transheader WHERE YEAR(transheader.tran_date)=:Year AND transheader.tran_date IS NOT NULL GROUP BY Month",nativeQuery = true)
    List<ChartInterface> getIWTMonthwise(String Year);
    @Query(value="SELECT COALESCE(SUM(transheader.iwt_amount),0) as Amount,DATE(transheader.tran_date) AS Date, MONTHNAME(transheader.tran_date) AS Month, YEAR(transheader.tran_date) As Year FROM transheader WHERE MONTHNAME(transheader.tran_date)=:Month and YEAR(transheader.tran_date)=:Year AND transheader.tran_date IS NOT NULL GROUP BY Date",nativeQuery = true)
    List<ChartInterface> getIWTDatewise(String Month, String Year);

    //    TODO: CHARTS -VAT
    @Query(value="SELECT COALESCE(SUM(transheader.vat_amount),0) as Amount, MONTHNAME(transheader.tran_date) AS Month, YEAR(transheader.tran_date) As Year FROM transheader WHERE transheader.tran_date IS NOT NULL GROUP BY Year",nativeQuery = true)
    List<ChartInterface> getVATYearwise();
    @Query(value="SELECT COALESCE(SUM(transheader.vat_amount),0) as Amount, MONTHNAME(transheader.tran_date) AS Month, YEAR(transheader.tran_date) As Year FROM transheader WHERE YEAR(transheader.tran_date)=:Year AND transheader.tran_date IS NOT NULL GROUP BY Month",nativeQuery = true)
    List<ChartInterface> getVATMonthwise(String Year);
    @Query(value="SELECT COALESCE(SUM(transheader.vat_amount),0) as Amount,DATE(transheader.tran_date) AS Date, MONTHNAME(transheader.tran_date) AS Month, YEAR(transheader.tran_date) As Year FROM transheader WHERE MONTHNAME(transheader.tran_date)=:Month and YEAR(transheader.tran_date)=:Year AND transheader.tran_date IS NOT NULL GROUP BY Date",nativeQuery = true)
    List<ChartInterface> getVATDatewise(String Month, String Year);

    public interface  ChartInterface{
        public Double getAmount();
        public String getYear();
        public String getMonth();
        public String getDate();
    }

    @Query(value = "SELECT MONTHNAME(purchase_order.posted_time) AS Identity, " +
            "COUNT(*) as po_no " +
            "FROM purchase_order" +
            " WHERE YEAR(purchase_order.posted_time) LIKE:year" +
            " GROUP BY MONTHNAME(purchase_order.posted_time)" +
            " ORDER BY id ASC;", nativeQuery = true)
    List<countPerMonth> poMonthwise(String year);

    @Query(value="SELECT DATE(purchase_order.posted_time) as Identity, " +
            "COUNT(*) as po_no FROM purchase_order " +
            "WHERE YEAR(purchase_order.posted_time) LIKE:year " +
            "AND MONTHNAME(purchase_order.posted_time) LIKE:month " +
            "GROUP BY DATE(purchase_order.posted_time) ORDER BY id ASC", nativeQuery = true)
    List<countPerMonth> poDateWise(String year, String month);

    @Query(value = "SELECT YEAR(purchase_order.posted_time)" +
            " FROM `purchase_order` GROUP BY YEAR(purchase_order.posted_time)", nativeQuery = true)
    List<getYears> getYears();

    @Query(value = "SELECT YEAR(purchase_order.posted_time) as Identity, " +
            "COUNT(*) as po_no " +
            "FROM purchase_order " +
            "GROUP BY YEAR(purchase_order.posted_time) " +
            "ORDER BY YEAR(purchase_order.posted_time) ", nativeQuery = true)
    List<countPerMonth> poYearWise();

    public interface getYears{
        String getYear();
    }

    interface countPerMonth{
        String getIdentity();
        Integer getPo_no();
    }

//    TODO: CHARTS - URA INVOICES
    @Query(value="SELECT COALESCE(COUNT(*),0) as Invoices,DATE(urainvoices.datetime) AS Date, MONTHNAME(urainvoices.datetime) AS Month, YEAR(urainvoices.datetime) As Year FROM urainvoices WHERE urainvoices.datetime IS NOT NULL GROUP BY Year",nativeQuery = true)
    List<ChartInvoicesInterface> getInvoicesYearwise();
    @Query(value="SELECT COALESCE(COUNT(*),0) as Invoices,DATE(urainvoices.datetime) AS Date, MONTHNAME(urainvoices.datetime) AS Month, YEAR(urainvoices.datetime) As Year FROM urainvoices WHERE YEAR(urainvoices.datetime)=:Year AND urainvoices.datetime IS NOT NULL GROUP BY Month",nativeQuery = true)
    List<ChartInvoicesInterface> getInvoicesMonthwise(String Year);
    @Query(value="SELECT COALESCE(COUNT(*),0) as Invoices,DATE(urainvoices.datetime) AS Date, MONTHNAME(urainvoices.datetime) AS Month, YEAR(urainvoices.datetime) As Year FROM urainvoices WHERE MONTHNAME(urainvoices.datetime)=:Month AND YEAR(urainvoices.datetime)=:Year AND urainvoices.datetime IS NOT NULL GROUP BY Date",nativeQuery = true)
    List<ChartInvoicesInterface> getInvoicesDatewise(String Month, String Year);
    public interface  ChartInvoicesInterface{
        public Double getInvoices();
        public String getYear();
        public String getMonth();
        public String getDate();
    }

}
