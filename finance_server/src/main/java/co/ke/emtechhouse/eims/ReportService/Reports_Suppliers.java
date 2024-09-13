//package co.ke.emtechhouse.eims.ReportService;
//
//import co.ke.emtechhouse.eims.InvoiceComponent.InvoiceRepo;
//import co.ke.emtechhouse.eims.OrganisationComponent.Organisation;
//import co.ke.emtechhouse.eims.OrganisationComponent.OrganisationRepo;
//import co.ke.emtechhouse.eims.PurchaseOrderComponent.PurchaseOrderRepo;
//import co.ke.emtechhouse.eims.ResponseMessage.EntityResponse;
//import co.ke.emtechhouse.eims.SupplierComponent.Supplier;
//import co.ke.emtechhouse.eims.SupplierComponent.SupplierRepo;
////import jdk.jshell.Snippet;
//import net.sf.jasperreports.engine.*;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
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
//@RequestMapping("/api/v1/reports/suppliers")
//public class Reports_Suppliers {
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
//
//    @GetMapping("/per/status/")
//    public ResponseEntity<?> gsupplierPerStatus(
//            @RequestParam String status,
//            @RequestParam String fromDate,
//            @RequestParam String toDate
//    ) throws FileNotFoundException, JRException, SQLException {
////        Check if they are available
//        List<Supplier> check = supplierRepo.findAll();
//        if (check.size() > 0){
//            // Call api to get orgation info
//            Organisation organisation = organisationRepo.getOrganizationDetail();
//            String org_zip_postcode = organisation.getAddress();
//            String org_address = organisation.getAddress();
//            String org_name = organisation.getOrganisationName();
//            String org_companyemail = organisation.getEmail();
//            String org_telephone = organisation.getPhone();
//            String org_website = "www.google.com";
//            String org_companyname = organisation.getOrganisationName();
//            String org_box_address = organisation.getAddress();
//            String org_slogan = "-";
//            Connection connection = DriverManager.getConnection(this.db, this.username, this.password);
//
//            JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream(files_path+"/supplier_perstatus.jrxml"));
//
//                       Map<String, Object> parameter = new HashMap<String, Object>();
//
//            parameter.put("address",org_address);
//            parameter.put("companyname",org_name);
//            parameter.put("companyemail",org_companyemail);
//            parameter.put("telephone",org_telephone);
//
//
//
//            parameter.put("org_website",org_website);
//            parameter.put("logo",logo);
//
//            parameter.put("status",status);
//            parameter.put("fromDate",fromDate);
//            parameter.put("toDate",toDate);
//
//            JasperPrint report = JasperFillManager.fillReport(compileReport, parameter, connection);
//            byte[] data = JasperExportManager.exportReportToPdf(report);
//            HttpHeaders headers = new HttpHeaders();
//            headers.set(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=report.pdf");
//            return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF).body(data);
//        }else{
//            EntityResponse response =  new EntityResponse();
//            response.setStatusCode(400);
//            response.setMessage("Data Not Found");
//            response.setEntity("");
//            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
//        }
//    }
//
//    @GetMapping("/items/")
//    public ResponseEntity<?> generatePOOrder(
//            @RequestParam String status,
//            @RequestParam String fromDate,
//            @RequestParam String toDate
//            ) throws FileNotFoundException, JRException, SQLException {
////        Check if they are available
//        List<Supplier> check = supplierRepo.findAll();
//        if (check.size() > 0){
//            // Call api to get orgation info
//            Organisation organisation = organisationRepo.getOrganizationDetail();
//            String org_zip_postcode = organisation.getAddress();
//            String org_address = organisation.getAddress();
//            String org_name = organisation.getOrganisationName();
//            String org_companyemail = organisation.getEmail();
//            String org_telephone = organisation.getPhone();
//            String org_website = "www.google.com";
//            String org_companyname = organisation.getOrganisationName();
//            String org_box_address = organisation.getAddress();
//            String org_slogan = "-";
//            Connection connection = DriverManager.getConnection(this.db, this.username, this.password);
//            JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream(files_path+"/suppliersperstatus.jrxml"));
//            Map<String, Object> parameter = new HashMap<String, Object>();
//
//            parameter.put("org_zip_postcode",org_zip_postcode);
//            parameter.put("org_address",org_address);
//            parameter.put("org_name",org_name);
//            parameter.put("org_companyemail",org_companyemail);
//            parameter.put("org_telephone",org_telephone);
//            parameter.put("org_website",org_website);
//            parameter.put("org_companyname",org_companyname);
//            parameter.put("org_box_address",org_box_address);
//            parameter.put("org_slogan",org_slogan);
//
//            parameter.put("status", status);
//            parameter.put("fromDate",fromDate);
//            parameter.put("toDate",toDate);
//            JasperPrint report = JasperFillManager.fillReport(compileReport, parameter, connection);
//            byte[] data = JasperExportManager.exportReportToPdf(report);
//            HttpHeaders headers = new HttpHeaders();
//            headers.set(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=report.pdf");
//            return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF).body(data);
//        }else{
//            EntityResponse response =  new EntityResponse();
//            response.setStatusCode(400);
//            response.setMessage("Data Not Found");
//            response.setEntity("");
//            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
//        }
//    }
//    @GetMapping("/payments/supplier")
//    public ResponseEntity<?> generatepersupplier(
//            @RequestParam String supplier_id,
//            @RequestParam String fromDate,
//            @RequestParam String toDate
//    ) throws FileNotFoundException, JRException, SQLException {
//
//        Connection connection = DriverManager.getConnection(this.db, this.username, this.password);
//        Organisation organisation = organisationRepo.getOrganizationDetail();
//
//
//        String org_address = organisation.getAddress();
//        String org_name = organisation.getOrganisationName();
//        String org_companyemail = organisation.getEmail();
//        String org_telephone = organisation.getPhone();
//        String org_website = "www.google.com";
//
//
//
//        JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream(files_path+"/paymentsDonePerSupplier.jrxml"));
//
////        JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream("/home/ibrahim/JaspersoftWorkspace/MyReports/paymentsDonePerSupplier.jrxml"));
//        Map<String, Object> parameter = new HashMap<String, Object>();
//
//        parameter.put("address",org_address);
//        parameter.put("companyname",org_name);
//        parameter.put("companyemail",org_companyemail);
//        parameter.put("telephone",org_telephone);
//        parameter.put("org_website",org_website);
//        parameter.put("logo",logo);
//
//        parameter.put("supplier_id", supplier_id);
//        parameter.put("fromDate", fromDate);
//        parameter.put("toDate",toDate);
//        JasperPrint report = JasperFillManager.fillReport(compileReport, parameter, connection);
//        byte[] data = JasperExportManager.exportReportToPdf(report);
//        HttpHeaders headers = new HttpHeaders();
//        headers.set(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=report.pdf");
//        return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF).body(data);
//
//
//    }
//    @GetMapping("/supplier/statement/")
//    public ResponseEntity<?> generatestmtpersupplier(
//            @RequestParam String supplier_id,
//            @RequestParam String fromDate,
//            @RequestParam String toDate
//    ) throws FileNotFoundException, JRException, SQLException {
//
//
//
//        List<Payment>  paymentsList = paymentRepo.getBySuppplierId(supplier_id);
//        System.out.println("payment list per supplier "+ paymentsList.size());
//        if (paymentsList.size()>0) {
//            Connection connection = DriverManager.getConnection(this.db, this.username, this.password);
//            Organisation organisation = organisationRepo.getOrganizationDetail();
//
//            System.out.println("Here now!!");
////            String org_address = organisation.getAddress();
////            String org_name = organisation.getOrganisationName();
////            String org_companyemail = organisation.getEmail();
////            String org_telephone = organisation.getPhone();
////            String org_website = "www.google.com";
//
//
//            JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream(files_path + "/supplier_statement.jrxml"));
//
////                JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream("/home/ibrahim/JaspersoftWorkspace/MyReports/supplier_statement.jrxml"));
//            Map<String, Object> parameter = new HashMap<String, Object>();
//
////            parameter.put("address", org_address);
////            parameter.put("companyname", org_name);
////            parameter.put("companyemail", org_companyemail);
////            parameter.put("telephone", org_telephone);
////            parameter.put("org_website", org_website);
//            parameter.put("logo", logo);
//
//            parameter.put("supplier_id", supplier_id);
//            parameter.put("fromDate", fromDate);
//            parameter.put("toDate", toDate);
//            JasperPrint report = JasperFillManager.fillReport(compileReport, parameter, connection);
//            byte[] data = JasperExportManager.exportReportToPdf(report);
//            HttpHeaders headers = new HttpHeaders();
//            headers.set(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=report.pdf");
//            return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF).body(data);
//
//        }else {
//            EntityResponse response =  new EntityResponse();
//            response.setStatusCode(400);
//            response.setMessage("Data Not Found");
//            response.setEntity("");
//            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
//        }
//
//    }
//}
