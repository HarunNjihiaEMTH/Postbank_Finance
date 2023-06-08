//package co.ke.emtechhouse.eims.ReportService;
//
//import co.ke.emtechhouse.eims.InvoiceComponent.InvoiceRepo;
//import co.ke.emtechhouse.eims.OrganisationComponent.Organisation;
//import co.ke.emtechhouse.eims.OrganisationComponent.OrganisationRepo;
//import co.ke.emtechhouse.eims.PurchaseOrderComponent.PurchaseOrderRepo;
//import co.ke.emtechhouse.eims.ResponseMessage.EntityResponse;
//import co.ke.emtechhouse.eims.SupplierComponent.SupplierRepo;
//import net.sf.jasperreports.engine.*;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import java.io.FileInputStream;
//import java.io.FileNotFoundException;
//import java.sql.Connection;
//import java.sql.DriverManager;
//import java.sql.SQLException;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
////@CrossOrigin(origins = "*", maxAge = 3600)
//@RestController
//@RequestMapping("/api/v1/reports/accruals")
//public class ReportsAccruals {
//
//    @Value("${reports_absolute_path}")
//    private String files_path;
//    @Value("${image_banner}")
//    private String logo;
//    @Value("${spring.datasource.url}")
//    private String db;
//    @Value("${spring.datasource.username}")
//    private String username;
//    @Value("${spring.datasource.password}")
//    private String password;
//    @Autowired
//    private PurchaseOrderRepo purchaseOrderRepo;
//    @Autowired
//    private InvoiceRepo invoiceRepo;
//    @Autowired
//    private OrganisationRepo organisationRepo;
//    @Autowired
//    private SupplierRepo supplierRepo;
//    @Autowired
//    private CollectaccrualRepo collectaccrualRepo;
//
//
//    @Autowired
//    private PayaccrualRepo payaccrualRepo;
//    @GetMapping("/supplier/payments/all/status")
//    public ResponseEntity<?> generatealSupplierpaymentsPerStatus(
//            @RequestParam String status,
//            @RequestParam String fromDate,
//            @RequestParam String toDate
//    ) throws FileNotFoundException, JRException, SQLException {
//        List<Payaccrual> payaccrualList = payaccrualRepo.findAll();
//        if(payaccrualList.size()>0){
//            Connection connection = DriverManager.getConnection(this.db, this.username, this.password);
////            Organisation organisation = organisationRepo.getOrganizationDetail();
//            JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream(files_path + "/supplierAPaymentPerStatus.jrxml"));
////            JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream("/home/ibrahim/JaspersoftWorkspace/MyReports/supplierAPaymentPerStatus.jrxml"));
//            Map<String, Object> parameter = new HashMap<String, Object>();
//
//            parameter.put("logo", logo);
//            parameter.put("status",status);
//            parameter.put("fromDate", fromDate);
//            parameter.put("toDate", toDate);
//
//            JasperPrint report = JasperFillManager.fillReport(compileReport, parameter, connection);
//            byte[] data = JasperExportManager.exportReportToPdf(report);
//            HttpHeaders headers = new HttpHeaders();
//            headers.set(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=report.pdf");
//            return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF).body(data);
//        }else {
//            EntityResponse response =  new EntityResponse();
//            response.setStatusCode(400);
//            response.setMessage("Data Not Found");
//            response.setEntity("");
//            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
//        }
//    }
//
//
//    @GetMapping("/supplier/payments/all")
//    public ResponseEntity<?> generatealSupplierpayments(
////            @RequestParam String status,
////            @RequestParam(required = false) String finalcle_status,
//            @RequestParam String fromDate,
//            @RequestParam String toDate
//    ) throws FileNotFoundException, JRException, SQLException {
//        List<Payaccrual> payaccrualList = payaccrualRepo.findAll();
//        if(payaccrualList.size()>0){
//            Connection connection = DriverManager.getConnection(this.db, this.username, this.password);
////            Organisation organisation = organisationRepo.getOrganizationDetail();
//                    JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream(files_path + "/generalAccruals.jrxml"));
////            JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream("/home/ibrahim/JaspersoftWorkspace/MyReports/generalAccruals.jrxml"));
//            Map<String, Object> parameter = new HashMap<String, Object>();
//
//            parameter.put("logo", logo);
//            parameter.put("fromDate", fromDate);
//            parameter.put("toDate", toDate);
//
//            JasperPrint report = JasperFillManager.fillReport(compileReport, parameter, connection);
//            byte[] data = JasperExportManager.exportReportToPdf(report);
//            HttpHeaders headers = new HttpHeaders();
//            headers.set(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=report.pdf");
//            return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF).body(data);
//        }else {
//            EntityResponse response =  new EntityResponse();
//            response.setStatusCode(400);
//            response.setMessage("Data Not Found");
//            response.setEntity("");
//            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
//        }
//    }
//
//    @GetMapping("/supplier/accruals/")
//    public ResponseEntity<?> getSupplierAccruals(
//            @RequestParam String supplier_id,
//            @RequestParam String fromDate,
//            @RequestParam String toDate
//    ) throws FileNotFoundException, JRException, SQLException {
//
//        List<Collectaccrual> collectaccrualList = collectaccrualRepo.findBySupplierId(supplier_id);
//        System.out.println("collectaccrualList :" + collectaccrualList.size());
//
//        if(collectaccrualList.size()>0){
//            Connection connection = DriverManager.getConnection(this.db, this.username, this.password);
//            Organisation organisation = organisationRepo.getOrganizationDetail();
//
//
//        JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream(files_path+"/supplierAccruals.jrxml"));
////
////            JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream("/home/ibrahim/JaspersoftWorkspace/MyReports/supplierAccruals.jrxml"));
//            Map<String, Object> parameter = new HashMap<String, Object>();
////
//
//            parameter.put("logo",logo);
//
//            parameter.put("supplier_id", supplier_id);
//            parameter.put("fromDate", fromDate);
//            parameter.put("toDate",toDate);
//            JasperPrint report = JasperFillManager.fillReport(compileReport, parameter, connection);
//            byte[] data = JasperExportManager.exportReportToPdf(report);
//            HttpHeaders headers = new HttpHeaders();
//            headers.set(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=report.pdf");
//            return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF).body(data);
//        }else {
//            EntityResponse response =  new EntityResponse();
//            response.setStatusCode(400);
//            response.setMessage("Data Not Found");
//            response.setEntity("");
//            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
//        }
//
//
//    }
//
//    @GetMapping("/general/accrualpayments/")
//    public ResponseEntity<?> generategeneralAccrualPayents(
//            @RequestParam String status,
//            @RequestParam String fromDate,
//            @RequestParam String toDate
//    ) throws FileNotFoundException, JRException, SQLException {
//        List<Collectaccrual> collectaccrualList = collectaccrualRepo.findAll();
//        if (collectaccrualList.size()>0) {
//
//            Connection connection = DriverManager.getConnection(this.db, this.username, this.password);
//
//            Organisation organisation = organisationRepo.getOrganizationDetail();
//
//
//            JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream(files_path+"/generallAccruals.jrxml"));
////        JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream("/home/ibrahim/JaspersoftWorkspace/MyReports/generallAccruals.jrxml"));
//
//            Map<String, Object> parameter = new HashMap<String, Object>();
//
//
//            parameter.put("logo",logo);
//            parameter.put("status", status);
//            parameter.put("fromDate", fromDate);
//            parameter.put("toDate",toDate);
//            JasperPrint report = JasperFillManager.fillReport(compileReport, parameter, connection);
//            byte[] data = JasperExportManager.exportReportToPdf(report);
//            HttpHeaders headers = new HttpHeaders();
//            headers.set(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=report.pdf");
//            return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF).body(data);
//        }else {
//            EntityResponse response =  new EntityResponse();
//            response.setStatusCode(400);
//            response.setMessage("Data Not Found");
//            response.setEntity("");
//            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
//        }
//
//    }
//    @GetMapping("/payments/supplier/")
//    public ResponseEntity<?> generateSupplierPayments(
//            @RequestParam String supplier_id,
//            @RequestParam String fromDate,
//            @RequestParam String toDate
//    ) throws FileNotFoundException, JRException, SQLException {
//        List<Payaccrual>  payaccrualList = payaccrualRepo.findAll();
//             if (payaccrualList.size()>0) {
//
//            Connection connection = DriverManager.getConnection(this.db, this.username, this.password);
//
//            Organisation organisation = organisationRepo.getOrganizationDetail();
//
//
//            JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream(files_path+"/supplierPayents.jrxml"));
////        JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream("/home/ibrahim/JaspersoftWorkspace/MyReports/supplierPayents.jrxml"));
//
//            Map<String, Object> parameter = new HashMap<String, Object>();
//
//
//            parameter.put("logo",logo);
//            parameter.put("supplier_id",supplier_id);
//            parameter.put("fromDate", fromDate);
//            parameter.put("toDate",toDate);
//            JasperPrint report = JasperFillManager.fillReport(compileReport, parameter, connection);
//            byte[] data = JasperExportManager.exportReportToPdf(report);
//            HttpHeaders headers = new HttpHeaders();
//            headers.set(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=report.pdf");
//            return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF).body(data);
//        }else {
//            EntityResponse response =  new EntityResponse();
//            response.setStatusCode(400);
//            response.setMessage("Data Not Found");
//            response.setEntity("");
//            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
//        }
//
//    }
//    @GetMapping("/vat/accruals/")
//    public ResponseEntity<?> generatevatpaid(
//
//            @RequestParam String fromDate,
//            @RequestParam String toDate
//        ) throws FileNotFoundException, JRException, SQLException {
//        List<Payaccrual> payaccrualList= payaccrualRepo.findAll();
//        if (payaccrualList.size()>0) {
//
//            Connection connection = DriverManager.getConnection(this.db, this.username, this.password);
//            Organisation organisation = organisationRepo.getOrganizationDetail();
//            JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream(files_path+"/VATpaidAccruals.jrxml"));
////        JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream("/home/ibrahim/JaspersoftWorkspace/MyReports/VATpaidAccruals.jrxml"));
//
//            Map<String, Object> parameter = new HashMap<String, Object>();
//
//
//            parameter.put("logo",logo);
//            parameter.put("fromDate", fromDate);
//            parameter.put("toDate",toDate);
//            JasperPrint report = JasperFillManager.fillReport(compileReport, parameter, connection);
//            byte[] data = JasperExportManager.exportReportToPdf(report);
//            HttpHeaders headers = new HttpHeaders();
//            headers.set(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=report.pdf");
//            return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF).body(data);
//        }else {
//            EntityResponse response =  new EntityResponse();
//            response.setStatusCode(400);
//            response.setMessage("Data Not Found");
//            response.setEntity("");
//            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
//        }
//
//    }
//
//    @GetMapping("/vatpaid/productType/")
//    public ResponseEntity<?> generatevatpaidperproductType(
//            @RequestParam String product_Type,
//            @RequestParam String fromDate,
//            @RequestParam String toDate
//    ) throws FileNotFoundException, JRException, SQLException {
//        List<Payaccrual> payaccrualList= payaccrualRepo.getByProdType(product_Type);
//        if (payaccrualList.size()>0) {
//
//            Connection connection = DriverManager.getConnection(this.db, this.username, this.password);
//            Organisation organisation = organisationRepo.getOrganizationDetail();
//            JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream(files_path+"/vatPerProdTypeAccruals.jrxml"));
////        JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream("/home/ibrahim/JaspersoftWorkspace/MyReports/vatPerProdTypeAccruals.jrxml"));
////
//            Map<String, Object> parameter = new HashMap<String, Object>();
//
//            parameter.put("logo",logo);
//            parameter.put("prodType", product_Type);
//            parameter.put("fromDate", fromDate);
//            parameter.put("toDate",toDate);
//
//            JasperPrint report = JasperFillManager.fillReport(compileReport, parameter, connection);
//            byte[] data = JasperExportManager.exportReportToPdf(report);
//            HttpHeaders headers = new HttpHeaders();
//            headers.set(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=report.pdf");
//            return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF).body(data);
//        }else {
//            EntityResponse response =  new EntityResponse();
//            response.setStatusCode(400);
//            response.setMessage("Data Not Found");
//            response.setEntity("");
//            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
//        }
//
//    }
//    @GetMapping("/vatpaid/supplier/")
//    public ResponseEntity<?> generatevatpaidperperSupplier(
//            @RequestParam String supplier_id,
//            @RequestParam String fromDate,
//            @RequestParam String toDate
//    ) throws FileNotFoundException, JRException, SQLException {
//        List<Payaccrual> payaccrualList= payaccrualRepo.getBySupplierId(supplier_id);
//        if (payaccrualList.size()>0) {
//
//            Connection connection = DriverManager.getConnection(this.db, this.username, this.password);
//            Organisation organisation = organisationRepo.getOrganizationDetail();
//            JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream(files_path+"/vatPaidAccrualsPerSupplier.jrxml"));
////        JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream("/home/ibrahim/JaspersoftWorkspace/MyReports/vatPerSupplierAccruals.jrxml"));
////
//            Map<String, Object> parameter = new HashMap<String, Object>();
//
//            parameter.put("logo",logo);
//            parameter.put("supplier_id", supplier_id);
//            parameter.put("fromDate", fromDate);
//            parameter.put("toDate",toDate);
//
//            JasperPrint report = JasperFillManager.fillReport(compileReport, parameter, connection);
//            byte[] data = JasperExportManager.exportReportToPdf(report);
//            HttpHeaders headers = new HttpHeaders();
//            headers.set(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=report.pdf");
//            return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF).body(data);
//        }else {
//            EntityResponse response =  new EntityResponse();
//            response.setStatusCode(400);
//            response.setMessage("Data Not Found");
//            response.setEntity("");
//            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
//        }
//
//    }
//
//
//    @GetMapping("/general/iwtpaid/")
//    public ResponseEntity<?> generateincomeWth(
//            @RequestParam String fromDate,
//            @RequestParam String toDate
//    ) throws FileNotFoundException, JRException, SQLException {
//        List<Payaccrual> payaccrualList = payaccrualRepo.findAll();
//        if (payaccrualList.size()>0) {
//
//            Connection connection = DriverManager.getConnection(this.db, this.username, this.password);
//
//            Organisation organisation = organisationRepo.getOrganizationDetail();
//
//
//            JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream(files_path+"/IWTAccrualsGeneral.jrxml"));
////            JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream("/home/ibrahim/JaspersoftWorkspace/MyReports/IWHTPaicAccruals.jrxml"));
//
//            Map<String, Object> parameter = new HashMap<String, Object>();
//
//
//            parameter.put("logo",logo);
//            parameter.put("fromDate", fromDate);
//            parameter.put("toDate",toDate);
//            JasperPrint report = JasperFillManager.fillReport(compileReport, parameter, connection);
//            byte[] data = JasperExportManager.exportReportToPdf(report);
//            HttpHeaders headers = new HttpHeaders();
//            headers.set(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=report.pdf");
//            return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF).body(data);
//        }else {
//            EntityResponse response =  new EntityResponse();
//            response.setStatusCode(400);
//            response.setMessage("Data Not Found");
//            response.setEntity("");
//            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
//        }
//
//    }
//
//
//
//    @GetMapping("/iwtpaid/productType/")
//    public ResponseEntity<?> generateincome_wthcollectedperproductType(
//            @RequestParam String product_Type,
//            @RequestParam String fromDate,
//            @RequestParam String toDate
//    ) throws FileNotFoundException, JRException, SQLException {
//        List<Payaccrual> payaccrualList = payaccrualRepo.getByProdType(product_Type);
//        if (payaccrualList.size()>0) {
//
//            Connection connection = DriverManager.getConnection(this.db, this.username, this.password);
//
//            Organisation organisation = organisationRepo.getOrganizationDetail();
//
//
//            JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream(files_path+"/WTHPaidAccrualsPerproductType.jrxml"));
////            JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream("/home/ibrahim/JaspersoftWorkspace/MyReports/IWTHpaidAccruals.jrxml"));
//
//            Map<String, Object> parameter = new HashMap<String, Object>();
//
//
//            parameter.put("logo",logo);
//
//            parameter.put("prodType", product_Type);
//            parameter.put("fromDate", fromDate);
//            parameter.put("toDate",toDate);
//            JasperPrint report = JasperFillManager.fillReport(compileReport, parameter, connection);
//            byte[] data = JasperExportManager.exportReportToPdf(report);
//            HttpHeaders headers = new HttpHeaders();
//            headers.set(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=report.pdf");
//            return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF).body(data);
//        }else {
//            EntityResponse response =  new EntityResponse();
//            response.setStatusCode(400);
//            response.setMessage("Data Not Found");
//            response.setEntity("");
//            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
//        }
//
//    }
//
//
//    @GetMapping("/iwtpaid/supplier/")
//    public ResponseEntity<?> generateincome_wthcollectedpersupplier(
//            @RequestParam String supplier_id,
//            @RequestParam String fromDate,
//            @RequestParam String toDate
//    ) throws FileNotFoundException, JRException, SQLException {
//        List<Payaccrual> payaccrualList = payaccrualRepo.getBySupplierId(supplier_id);
//        if (payaccrualList.size()>0) {
//
//            Connection connection = DriverManager.getConnection(this.db, this.username, this.password);
//
//            Organisation organisation = organisationRepo.getOrganizationDetail();
//
//
//            JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream(files_path+"/IWTHAcruasPerSupplier.jrxml"));
////            JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream("/home/ibrahim/JaspersoftWorkspace/MyReports/IWTHpaidAccruals.jrxml"));
//
//            Map<String, Object> parameter = new HashMap<String, Object>();
//
//
//            parameter.put("logo",logo);
//
//            parameter.put("supplier_id", supplier_id);
//            parameter.put("fromDate", fromDate);
//            parameter.put("toDate",toDate);
//            JasperPrint report = JasperFillManager.fillReport(compileReport, parameter, connection);
//            byte[] data = JasperExportManager.exportReportToPdf(report);
//            HttpHeaders headers = new HttpHeaders();
//            headers.set(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=report.pdf");
//            return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF).body(data);
//        }else {
//            EntityResponse response =  new EntityResponse();
//            response.setStatusCode(400);
//            response.setMessage("Data Not Found");
//            response.setEntity("");
//            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
//        }
//
//    }
//
//
//}
//
//
//
