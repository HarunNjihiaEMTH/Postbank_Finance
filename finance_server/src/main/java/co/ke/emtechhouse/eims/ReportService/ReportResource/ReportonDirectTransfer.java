package co.ke.emtechhouse.eims.ReportService.ReportResource;

import co.ke.emtechhouse.eims.InvoiceComponent.InvoiceRepo;
import co.ke.emtechhouse.eims.OrganisationComponent.OrganisationRepo;
import co.ke.emtechhouse.eims.PurchaseOrderComponent.PurchaseOrderRepo;
import co.ke.emtechhouse.eims.ReportService.ExcelExports.ExcelExporter;
import co.ke.emtechhouse.eims.ReportService.ExcelExports.ExcelHeaders.DirectTransferHeaders;
import co.ke.emtechhouse.eims.ReportService.ExcelExports.ExcelHeaders.GeneralPayments;
import co.ke.emtechhouse.eims.ReportService.ExcelExports.ExcelInterfaces.DirectPayment;
import co.ke.emtechhouse.eims.ReportService.ExcelExports.ExcelInterfaces.SupplierPayment;
import co.ke.emtechhouse.eims.ReportService.ReportQueries.ReportQueriesRepo;
import co.ke.emtechhouse.eims.ResponseMessage.EntityResponse;
import co.ke.emtechhouse.eims.SupplierComponent.SupplierRepo;
import co.ke.emtechhouse.eims.TransactionComponent.Transheader;
import co.ke.emtechhouse.eims.TransactionComponent.TransheaderRepo;
import net.sf.jasperreports.engine.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayInputStream;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

//@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/reports/directtransfer")
public class ReportonDirectTransfer {
    @Value("${reports_absolute_path}")
    private String files_path;
    @Value("${image_banner}")
    private String logo;
    @Value("${spring.datasource.url}")
    private String db;
    @Value("${spring.datasource.username}")
    private String username;
    @Value("${spring.datasource.password}")
    private String password;
    @Autowired
    private PurchaseOrderRepo purchaseOrderRepo;
    @Autowired
    private InvoiceRepo invoiceRepo;
    @Autowired
    private OrganisationRepo organisationRepo;
    @Autowired
    private SupplierRepo supplierRepo;
    @Autowired
    private ReportQueriesRepo reportQueriesRepo;
    @Autowired
    private ExcelExporter excelExporter;
    @Autowired
    private TransheaderRepo transheaderRepo;
    @Autowired
    HttpServletResponse httpresponse;

    ///    TODO xxxxxxxxxxxxxxxxxxxxxxxxxPurchase orders'/Suppliers' reportsxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//    ------- General Reports --------------
//Payments to suppliers
    @GetMapping("/all")
    public ResponseEntity<?> generateallpayments(
            @RequestParam String fromDate,
            @RequestParam String toDate,
            @RequestParam String finacle_status,
            @RequestParam String status
    ) throws FileNotFoundException, JRException, SQLException {
        List<Transheader> paymentsList = transheaderRepo.findAll();
        if(paymentsList.size()>0){
            Connection connection = DriverManager.getConnection(this.db, this.username, this.password);
            JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream(files_path + "/directtransfer.jrxml"));
            Map<String, Object> parameter = new HashMap<String, Object>();
            parameter.put("logo", logo);
            parameter.put("fromDate", fromDate);
            parameter.put("toDate", toDate);
            parameter.put("transactiontype", "direct_transfer");
            parameter.put("finacle_status", finacle_status);
            parameter.put("status", status);
            JasperPrint report = JasperFillManager.fillReport(compileReport, parameter, connection);
            byte[] data = JasperExportManager.exportReportToPdf(report);
            HttpHeaders headers = new HttpHeaders();
            headers.set(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=General_Payments.pdf");
            return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF).body(data);
        }else {
            EntityResponse response =  new EntityResponse();
            response.setStatusCode(400);
            response.setMessage("Data Not Found");
            response.setEntity("");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/all/excel")
    public ResponseEntity<?> generateallpaymentsexcel(
            HttpServletResponse httpresponse,
            @RequestParam String fromDate,
            @RequestParam String toDate,
            @RequestParam String finacle_status,
            @RequestParam String status
    ) throws IOException, JRException, SQLException {
        String transactiontype = "direct_transfer";
//        String finacle_status = "%";
        String supplier_id = "%";
        String producttype = "%";
//        String status = "%";
        String reportTitle = "Direct Transfer";
        List<DirectPayment>  paymentsList = reportQueriesRepo.directTransferReport(fromDate,toDate,transactiontype,finacle_status,status);
        if(paymentsList.size()>0){
            httpresponse.setContentType("application/octet-stream");
            DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
            String currentDateTime = dateFormatter.format(new Date());
            String headerKey = "Content-Disposition";
            String headerValue = "attachment; filename=General_Payments" + currentDateTime + ".xlsx";
            httpresponse.setHeader(headerKey, headerValue);
            ExcelExporter excelExporter = new ExcelExporter();
            ByteArrayInputStream bis = excelExporter.exportDirectTransfer(httpresponse,paymentsList, DirectTransferHeaders.class, fromDate, toDate,reportTitle);
            HttpHeaders headers = new HttpHeaders();
            return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_ATOM_XML).body(new InputStreamResource(bis));
        }else {
            EntityResponse response =  new EntityResponse();
            response.setStatusCode(400);
            response.setMessage("Data Not Found");
            response.setEntity("");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }
}
