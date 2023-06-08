package co.ke.emtechhouse.eims.ReportService.ReportResource;

import co.ke.emtechhouse.eims.InvoiceComponent.AgingComponent.AgingRepo;
import co.ke.emtechhouse.eims.InvoiceComponent.InvoiceRepo;
import co.ke.emtechhouse.eims.InvoiceComponent.InvoiceService;
import co.ke.emtechhouse.eims.OrganisationComponent.Organisation;
import co.ke.emtechhouse.eims.OrganisationComponent.OrganisationRepo;
import co.ke.emtechhouse.eims.PurchaseOrderComponent.PurchaseOrder;
import co.ke.emtechhouse.eims.PurchaseOrderComponent.PurchaseOrderRepo;
import co.ke.emtechhouse.eims.ReportService.ExcelExports.ExcelExporter;
import co.ke.emtechhouse.eims.ReportService.ExcelExports.ExcelHeaders.GeneralPayments;
import co.ke.emtechhouse.eims.ReportService.ExcelExports.ExcelHeaders.PurchaseOrderHeaders;
import co.ke.emtechhouse.eims.ReportService.ExcelExports.ExcelInterfaces.POInterface;
import co.ke.emtechhouse.eims.ReportService.ExcelExports.ExcelInterfaces.SupplierPayment;
import co.ke.emtechhouse.eims.ReportService.ReportQueries.ReportQueriesRepo;
import co.ke.emtechhouse.eims.ResponseMessage.EntityResponse;
import co.ke.emtechhouse.eims.SupplierComponent.Supplier;
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
@RequestMapping("/api/v1/reports/general")
public class ReportPurchaseOrderSupplier {
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

///    TODO xxxxxxxxxxxxxxxxxxxxxxxxxPurchase orders'/Suppliers' reportsxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//    ------- General Reports --------------
//Payments to suppliers
@GetMapping("/paymentstosuppliers")
public ResponseEntity<?> generateallpayments(
        @RequestParam String fromDate,
        @RequestParam String toDate,
        @RequestParam String transactiontype,
        @RequestParam String finacle_status
) throws FileNotFoundException, JRException, SQLException {
    List<Transheader> paymentsList = transheaderRepo.findAll();
    if(paymentsList.size()>0){
        Connection connection = DriverManager.getConnection(this.db, this.username, this.password);
        JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream(files_path + "/general_Payments.jrxml"));
        Map<String, Object> parameter = new HashMap<String, Object>();
        parameter.put("logo", logo);
        parameter.put("fromDate", fromDate);
        parameter.put("toDate", toDate);
        parameter.put("transactiontype", transactiontype);
        parameter.put("finacle_status", finacle_status);
        parameter.put("supplier_id", "%");
        JasperPrint report = JasperFillManager.fillReport(compileReport, parameter, connection);
        byte[] data = JasperExportManager.exportReportToPdf(report);
        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=report.pdf");
        return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF).body(data);
    }else {
        EntityResponse response =  new EntityResponse();
        response.setStatusCode(400);
        response.setMessage("Data Not Found");
        response.setEntity("");
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }
}
    @GetMapping("/paymentstosuppliers/excel")
    public ResponseEntity<?> generateallpaymentsexcel(
            HttpServletResponse httpresponse,
            @RequestParam String fromDate,
            @RequestParam String toDate,
            @RequestParam String transactiontype,
            @RequestParam String finacle_status
    ) throws IOException, JRException, SQLException {
//                String fromDate =
//                String toDate,
//                String transactiontype,
//                String finacle_status,
                String supplier_id = "%";
                String producttype = "%";
                String status = "%";
        List<SupplierPayment>  paymentsList = reportQueriesRepo.universalQueryWithParams(fromDate,toDate,transactiontype,finacle_status,supplier_id,producttype, status);
        if(paymentsList.size()>0){
            httpresponse.setContentType("application/octet-stream");
            DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
            String currentDateTime = dateFormatter.format(new Date());
            String headerKey = "Content-Disposition";
            String headerValue = "attachment; filename=users_" + currentDateTime + ".xlsx";
            httpresponse.setHeader(headerKey, headerValue);
            ExcelExporter excelExporter = new ExcelExporter();
            ByteArrayInputStream bis = excelExporter.exportPaymentToSupplier(httpresponse,paymentsList, GeneralPayments.class, fromDate, toDate);
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
//Supplier Statement
@GetMapping("/supplierstatement")
public ResponseEntity<?> generatestmtpersupplier(
        @RequestParam String supplier_id,
        @RequestParam String fromDate,
        @RequestParam String toDate
) throws FileNotFoundException, JRException, SQLException {
    List<Transheader> paymentsList = transheaderRepo.findAll();
    if(paymentsList.size()>0){
        Connection connection = DriverManager.getConnection(this.db, this.username, this.password);
        JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream(files_path + "/general_Payments.jrxml"));
        Map<String, Object> parameter = new HashMap<String, Object>();
        parameter.put("logo", logo);
        parameter.put("fromDate", fromDate);
        parameter.put("toDate", toDate);
        parameter.put("transactiontype", "%");
        parameter.put("finacle_status", "Success");
        parameter.put("supplier_id", supplier_id);
        JasperPrint report = JasperFillManager.fillReport(compileReport, parameter, connection);
        byte[] data = JasperExportManager.exportReportToPdf(report);
        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=report.pdf");
        return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF).body(data);
    }else {
        EntityResponse response =  new EntityResponse();
        response.setStatusCode(400);
        response.setMessage("Data Not Found");
        response.setEntity("");
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }
}
    @GetMapping("/supplierstatement/excel")
    public ResponseEntity<?> generatestmtpersupplierexcel(
            HttpServletResponse httpresponse,
            @RequestParam String supplier_id,
            @RequestParam String fromDate,
            @RequestParam String toDate
    ) throws IOException, JRException, SQLException {
//                String fromDate =
//                String toDate,
                String transactiontype = "%";
                String finacle_status = "Success";
        String producttype = "%";
        String status = "%";
        List<SupplierPayment>  paymentsList = reportQueriesRepo.universalQueryWithParams(fromDate,toDate,transactiontype,finacle_status,supplier_id,producttype, status);
        if(paymentsList.size()>0){
            httpresponse.setContentType("application/octet-stream");
            DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
            String currentDateTime = dateFormatter.format(new Date());
            String headerKey = "Content-Disposition";
            String headerValue = "attachment; filename=users_" + currentDateTime + ".xlsx";
            httpresponse.setHeader(headerKey, headerValue);
            ExcelExporter excelExporter = new ExcelExporter();
            ByteArrayInputStream bis = excelExporter.exportPaymentToSupplier(httpresponse,paymentsList, GeneralPayments.class, fromDate, toDate);
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
//Purchase orders
@GetMapping("/purchaseorders")
public ResponseEntity<?> generategeneralpos(
        @RequestParam String status,
        @RequestParam String fromDate,
        @RequestParam String toDate
) throws FileNotFoundException, JRException, SQLException {
//        Check if they are available
    List<PurchaseOrder> po = purchaseOrderRepo.findAll();
    if(po.size()>0) {
        Organisation organisation = organisationRepo.getOrganizationDetail();
        Connection connection = DriverManager.getConnection(this.db, this.username, this.password);
        JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream(files_path + "/purchaseOrders.jrxml"));
        Map<String, Object> parameter = new HashMap<String, Object>();
        parameter.put("logo", logo);
        parameter.put("status", status);
        parameter.put("supplier_id", '%');
        parameter.put("fromDate", fromDate);
        parameter.put("toDate", toDate);
        JasperPrint report = JasperFillManager.fillReport(compileReport, parameter, connection);
        byte[] data = JasperExportManager.exportReportToPdf(report);
        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=report.pdf");
        return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF).body(data);
    }else{
        EntityResponse response =  new EntityResponse();
        response.setStatusCode(400);
        response.setMessage("Data Not Found");
        response.setEntity("");
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}
    @GetMapping("/purchaseorders/excel")
    public ResponseEntity<?> excelpo(
            HttpServletResponse httpresponse,
            @RequestParam String status,
            @RequestParam String fromDate,
            @RequestParam String toDate
    ) throws IOException, JRException, SQLException {
        String supplier_id = "%";
        String reportTitle = "Purchase Orders";
        List<POInterface> dataFetch = reportQueriesRepo.getPOAll(status,supplier_id,fromDate,toDate);
        if(dataFetch.size()>0){
            httpresponse.setContentType("application/octet-stream");
            DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
            String currentDateTime = dateFormatter.format(new Date());
            String headerKey = "Content-Disposition";
            String headerValue = "attachment; filename=users_" + currentDateTime + ".xlsx";
            httpresponse.setHeader(headerKey, headerValue);
            ExcelExporter excelExporter = new ExcelExporter();
            ByteArrayInputStream bis = excelExporter.exportPO(httpresponse,dataFetch, PurchaseOrderHeaders.class, fromDate, toDate, reportTitle);
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



//PO-Per supplier
@GetMapping("/po/per/supplier")
public ResponseEntity<?> generatePOOrder(
        @RequestParam String supplier_id,
        @RequestParam String fromDate,
        @RequestParam String toDate
) throws FileNotFoundException, JRException, SQLException {
//        Check if they are available
    List<PurchaseOrder>  pos = purchaseOrderRepo.findBySupplierId(Long.parseLong(supplier_id));
    if (pos.size() > 0){
        Connection connection = DriverManager.getConnection(this.db, this.username, this.password);
        JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream(files_path+"/purchaseOrders.jrxml"));
        Map<String, Object> parameter = new HashMap<String, Object>();
        Supplier supplier= supplierRepo.getById(Long.parseLong(supplier_id));
        System.out.println("supplier" + supplier);
        String supplier_name = supplier.getSupplierName();
        String supplier_tin= supplier.getSupplierTin();
        parameter.put("logo",logo);
        parameter.put("supplier_id", supplier_id);
        parameter.put("status", "%");
        parameter.put("fromDate", fromDate);
        parameter.put("toDate",toDate);
        JasperPrint report = JasperFillManager.fillReport(compileReport, parameter, connection);
        byte[] data = JasperExportManager.exportReportToPdf(report);
        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=report.pdf");
        return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF).body(data);
    }else{
        EntityResponse response =  new EntityResponse();
        response.setStatusCode(400);
        response.setMessage("Data Not Found");
        response.setEntity("");
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}
    @GetMapping("/po/per/supplier/excel")
    public ResponseEntity<?> excelgetpo(
            HttpServletResponse httpresponse,
            @RequestParam String supplier_id,
            @RequestParam String fromDate,
            @RequestParam String toDate
    ) throws IOException, JRException, SQLException {
        String reportTitle = "Purchase Orders Per Supplier";
        List<POInterface> dataFetch = reportQueriesRepo.getPOAll("%",supplier_id,fromDate,toDate);
        if(dataFetch.size()>0){
            httpresponse.setContentType("application/octet-stream");
            DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
            String currentDateTime = dateFormatter.format(new Date());
            String headerKey = "Content-Disposition";
            String headerValue = "attachment; filename=users_" + currentDateTime + ".xlsx";
            httpresponse.setHeader(headerKey, headerValue);
            ExcelExporter excelExporter = new ExcelExporter();
            ByteArrayInputStream bis = excelExporter.exportPO(httpresponse,dataFetch, PurchaseOrderHeaders.class, fromDate, toDate, reportTitle);
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
