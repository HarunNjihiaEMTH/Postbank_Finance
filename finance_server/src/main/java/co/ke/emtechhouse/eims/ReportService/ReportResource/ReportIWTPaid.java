package co.ke.emtechhouse.eims.ReportService.ReportResource;

import co.ke.emtechhouse.eims.InvoiceComponent.AgingComponent.AgingRepo;
import co.ke.emtechhouse.eims.InvoiceComponent.InvoiceRepo;
import co.ke.emtechhouse.eims.InvoiceComponent.InvoiceService;
import co.ke.emtechhouse.eims.OrganisationComponent.Organisation;
import co.ke.emtechhouse.eims.OrganisationComponent.OrganisationRepo;
import co.ke.emtechhouse.eims.PurchaseOrderComponent.PurchaseOrderRepo;
import co.ke.emtechhouse.eims.ReportService.ExcelExports.ExcelExporter;
import co.ke.emtechhouse.eims.ReportService.ExcelExports.ExcelHeaders.IWHCollected;
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

@RestController
@RequestMapping("/api/v1/reports/iwt")
public class ReportIWTPaid {
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
    private InvoiceService invoiceService;
    @Autowired
    private ExcelExporter excelExporter;
    @Autowired
    private AgingRepo agingRepo;
    @Autowired
    private TransheaderRepo transheaderRepo;
    @Autowired
    HttpServletResponse httpresponse;

///    TODO xxxxxxxxxxxxxxxxxxxxxxxxxIncome WItholding Report reportsxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//    ------- General Reports -------------
//Payments to suppliers
    @GetMapping("/paid")
    public ResponseEntity<?> generatepaid(
            @RequestParam String fromDate,
            @RequestParam String toDate,
            @RequestParam String transactiontype
    ) throws FileNotFoundException, JRException, SQLException {
        String finacle_status = "%";
        String supplier_id = "%";
        String producttype = "%";
        List<Transheader>  paymentsList =  transheaderRepo.findAll();
        if (paymentsList.size()>0) {
            Connection connection = DriverManager.getConnection(this.db, this.username, this.password);
            Organisation organisation = organisationRepo.getOrganizationDetail();
            JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream(files_path+"/IWTCollected.jrxml"));
            Map<String, Object> parameter = new HashMap<String, Object>();
            parameter.put("logo",logo);
            parameter.put("fromDate", fromDate);
            parameter.put("toDate",toDate);
            parameter.put("transactiontype",transactiontype);
            parameter.put("finacle_status",finacle_status);
            parameter.put("supplier_id",supplier_id);
            parameter.put("producttype",producttype);
            JasperPrint report = JasperFillManager.fillReport(compileReport, parameter, connection);
            byte[] data = JasperExportManager.exportReportToPdf(report);
            HttpHeaders headers = new HttpHeaders();
            headers.set(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=Income_WHT_Report.pdf");
            return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF).body(data);
        }else {
            EntityResponse response =  new EntityResponse();
            response.setStatusCode(400);
            response.setMessage("Data Not Found");
            response.setEntity("");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/paid/excel")
    public ResponseEntity<?> generateVATpaid(
            HttpServletResponse httpresponse,
            @RequestParam String fromDate,
            @RequestParam String toDate,
            @RequestParam String transactiontype
    ) throws IOException, JRException, SQLException {
//        String transactiontype = "%";
        String finacle_status = "%";
        String supplier_id = "%";
        String producttype = "%";
        String status = "%";
        List<SupplierPayment>  paymentsList = reportQueriesRepo.iwhtQueryWithParams(fromDate,toDate,transactiontype,finacle_status,supplier_id,producttype, status);
        if(paymentsList.size()>0){
            httpresponse.setContentType("application/octet-stream");
            DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
            String currentDateTime = dateFormatter.format(new Date());
            String headerKey = "Content-Disposition";
            String headerValue = "attachment; filename=Income_WHT_Report" + currentDateTime + ".xlsx";
            httpresponse.setHeader(headerKey, headerValue);
            ExcelExporter excelExporter = new ExcelExporter();
            ByteArrayInputStream bis = excelExporter.exportIWH(httpresponse,paymentsList, IWHCollected.class, fromDate, toDate);
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
    @GetMapping("/per/supplier")
    public ResponseEntity<?> generatevatpersupplier(
            @RequestParam String supplier_id,
            @RequestParam String fromDate,
            @RequestParam String toDate,
            @RequestParam String transactiontype
    ) throws FileNotFoundException, JRException, SQLException {
        String finacle_status = "%";
        String producttype = "%";
        List<Transheader>  paymentsList =  transheaderRepo.findAll();
        if (paymentsList.size()>0) {
            Connection connection = DriverManager.getConnection(this.db, this.username, this.password);
            Organisation organisation = organisationRepo.getOrganizationDetail();
            JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream(files_path+"/IWTCollected.jrxml"));
            Map<String, Object> parameter = new HashMap<String, Object>();
            parameter.put("logo",logo);
            parameter.put("fromDate", fromDate);
            parameter.put("toDate",toDate);
            parameter.put("transactiontype",transactiontype);
            parameter.put("finacle_status",finacle_status);
            parameter.put("supplier_id",supplier_id);
            parameter.put("producttype",producttype);
            JasperPrint report = JasperFillManager.fillReport(compileReport, parameter, connection);
            byte[] data = JasperExportManager.exportReportToPdf(report);
            HttpHeaders headers = new HttpHeaders();
            headers.set(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=VAT_Per_Supplier.pdf");
            return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF).body(data);
        }else {
            EntityResponse response =  new EntityResponse();
            response.setStatusCode(400);
            response.setMessage("Data Not Found");
            response.setEntity("");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/per/supplier/excel")
    public ResponseEntity<?> generatevatpersupplierExcel(
            @RequestParam String supplier_id,
            @RequestParam String fromDate,
            @RequestParam String toDate,
            @RequestParam String transactiontype
    ) throws IOException, JRException, SQLException {
//        String transactiontype = "%";
        String finacle_status = "%";
//        String supplier_id = "%";
        String producttype = "%";
        String status = "%";
        List<SupplierPayment>  paymentsList = reportQueriesRepo.iwhtQueryWithParams(fromDate,toDate,transactiontype,finacle_status,supplier_id,producttype, status);
        if(paymentsList.size()>0){
            httpresponse.setContentType("application/octet-stream");
            DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
            String currentDateTime = dateFormatter.format(new Date());
            String headerKey = "Content-Disposition";
            String headerValue = "attachment; filename=VAT_Per_Supplier_" + currentDateTime + ".xlsx";
            httpresponse.setHeader(headerKey, headerValue);
            ExcelExporter excelExporter = new ExcelExporter();
            ByteArrayInputStream bis = excelExporter.exportIWH(httpresponse,paymentsList, IWHCollected.class, fromDate, toDate);
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
    @GetMapping("/per/productType/")
    public ResponseEntity<?> generatevatpaidperproductType(
            @RequestParam String product_Type,
            @RequestParam String fromDate,
            @RequestParam String toDate,
            @RequestParam String transactiontype
    ) throws FileNotFoundException, JRException, SQLException {
        String finacle_status = "%";
        String supplier_id = "%";
        String producttype = product_Type;
        List<Transheader>  paymentsList =  transheaderRepo.findAll();
        if (paymentsList.size()>0) {
            Connection connection = DriverManager.getConnection(this.db, this.username, this.password);
            JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream(files_path+"/IWTCollected.jrxml"));
            Map<String, Object> parameter = new HashMap<String, Object>();
            parameter.put("logo",logo);
            parameter.put("fromDate", fromDate);
            parameter.put("toDate",toDate);
            parameter.put("transactiontype",transactiontype);
            parameter.put("finacle_status",finacle_status);
            parameter.put("supplier_id",supplier_id);
            parameter.put("producttype",producttype);
            JasperPrint report = JasperFillManager.fillReport(compileReport, parameter, connection);
            byte[] data = JasperExportManager.exportReportToPdf(report);
            HttpHeaders headers = new HttpHeaders();
            headers.set(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=VAT_Per_Product_Type.pdf");
            return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF).body(data);
        }else {
            EntityResponse response =  new EntityResponse();
            response.setStatusCode(400);
            response.setMessage("Data Not Found");
            response.setEntity("");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/per/productType/excel")
    public ResponseEntity<?> generateexcelvatpaidperproductType(
            HttpServletResponse httpresponse,
            @RequestParam String product_Type,
            @RequestParam String fromDate,
            @RequestParam String toDate,
            @RequestParam String transactiontype
    ) throws IOException, JRException, SQLException {
//        String transactiontype = "%";
        String finacle_status = "%";
        String supplier_id = "%";
        String producttype = product_Type;
        String status = "%";
        List<SupplierPayment>  paymentsList = reportQueriesRepo.iwhtQueryWithParams(fromDate,toDate,transactiontype,finacle_status,supplier_id,producttype, status);
        if(paymentsList.size()>0){
            httpresponse.setContentType("application/octet-stream");
            DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
            String currentDateTime = dateFormatter.format(new Date());
            String headerKey = "Content-Disposition";
            String headerValue = "attachment; filename=VAT_Per_Product_Type_" + currentDateTime + ".xlsx";
            httpresponse.setHeader(headerKey, headerValue);
            ExcelExporter excelExporter = new ExcelExporter();
            ByteArrayInputStream bis = excelExporter.exportIWH(httpresponse,paymentsList, IWHCollected.class, fromDate, toDate);
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

