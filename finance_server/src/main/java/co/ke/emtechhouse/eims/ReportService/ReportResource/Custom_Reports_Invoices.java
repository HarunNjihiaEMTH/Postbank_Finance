package co.ke.emtechhouse.eims.ReportService.ReportResource;

import co.ke.emtechhouse.eims.CustomerComponent.CustomerRepo;
import co.ke.emtechhouse.eims.InvoiceComponent.Invoice;
import co.ke.emtechhouse.eims.InvoiceComponent.InvoiceRepo;
import co.ke.emtechhouse.eims.OrganisationComponent.Organisation;
import co.ke.emtechhouse.eims.OrganisationComponent.OrganisationRepo;
import co.ke.emtechhouse.eims.PurchaseOrderComponent.PurchaseOrderRepo;
import co.ke.emtechhouse.eims.ResponseMessage.EntityResponse;
import co.ke.emtechhouse.eims.SupplierComponent.SupplierRepo;
import co.ke.emtechhouse.eims.URAComponent.uploadinvoice.request.SaveInvoiceDetails;
import co.ke.emtechhouse.eims.URAComponent.uploadinvoice.request.SaveInvoiceDetailsRepository;
import co.ke.emtechhouse.eims.URAComponent.uploadinvoice.response.BasicInfoRepository;
import co.ke.emtechhouse.eims.URAComponent.uploadinvoice.response.BasicInfoResponse;
import net.sf.jasperreports.engine.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

//@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/reports/invoice")
public class Custom_Reports_Invoices {
    @Value("${reports_absolute_path}")
    private String files_path;
    @Value("${ura_image_banner}")
    private String uralogo;
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
    private CustomerRepo customerRepo;
    @Autowired
    private BasicInfoRepository basicInfoRepository;

    @Autowired
    private SaveInvoiceDetailsRepository savedetailrepo;

    @GetMapping("/successfull/")
    public ResponseEntity<?> getsuccessful(@RequestParam String fromDate, @RequestParam String toDate) throws FileNotFoundException, JRException, SQLException {
//        Check if they are available
        List<SaveInvoiceDetails> check = savedetailrepo.allSuccessfullyUploaded();
        if (check.size() > 0) {

            Connection connection = DriverManager.getConnection(this.db, this.username, this.password);
            JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream(files_path + "/urainvoices.jrxml"));
//            JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream("/home/ibrahim/JaspersoftWorkspace/MyReports/urainvoices.jrxml"));

            Map<String, Object> parameter = new HashMap<String, Object>();

            parameter.put("logo", logo);

            parameter.put("fromDate", fromDate);
            parameter.put("toDate", toDate);

            JasperPrint report = JasperFillManager.fillReport(compileReport, parameter, connection);
            byte[] data = JasperExportManager.exportReportToPdf(report);
            HttpHeaders headers = new HttpHeaders();
            headers.set(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=report.pdf");
            return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF).body(data);
        } else {
            EntityResponse response = new EntityResponse();
            response.setStatusCode(400);
            response.setMessage("Data Not Found");
            response.setEntity("");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/failed/")
    public ResponseEntity<?> getfailedInvoices(@RequestParam String fromDate, @RequestParam String toDate) throws FileNotFoundException, JRException, SQLException {
//        Check if they are available
        List<Invoice> check = invoiceRepo.findAll();
        if (check.size() > 0) {
            // Call api to get orgation info

            Connection connection = DriverManager.getConnection(this.db, this.username, this.password);
            JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream(files_path + "/failedinvoices.jrxml"));
//            JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream("/home/ibrahim/JaspersoftWorkspace/MyReports/failedinvoices.jrxml"));

            Map<String, Object> parameter = new HashMap<String, Object>();

            parameter.put("logo", logo);

            parameter.put("fromDate", fromDate);
            parameter.put("toDate", toDate);

            JasperPrint report = JasperFillManager.fillReport(compileReport, parameter, connection);
            byte[] data = JasperExportManager.exportReportToPdf(report);
            HttpHeaders headers = new HttpHeaders();
            headers.set(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=report.pdf");
            return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF).body(data);
        } else {
            EntityResponse response = new EntityResponse();
            response.setStatusCode(400);
            response.setMessage("Data Not Found");
            response.setEntity("");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

//    @GetMapping("/per/invoice/")
//    public ResponseEntity<?> generateInvoice(@RequestParam String invoice_no) throws FileNotFoundException, JRException, SQLException {
//        // Retrieve the basic information responses corresponding to the given invoice number from the database
//        List<BasicInfoResponse> basicInfoResponses = basicInfoRepository.findByinvoiceNo(invoice_no);
//
//        // Retrieve the corresponding seller details for the given invoice number from the database
//        UraSellerDetails uraSellerDetails = uraSellerDetailsRepository.findByinvoiceNo(invoice_no);
//
//        // If any basic information response was found and the seller details were found
//        if (!basicInfoResponses.isEmpty() && uraSellerDetails != null) {
//            // Establish a connection to the database using the specified database connection details
//            Connection connection = DriverManager.getConnection(this.db, this.username, this.password);
//
//            // Check if the customerid is equal to the tin or not
//            boolean isSameCustomer = uraSellerDetails.getCustomerid().equals(uraSellerDetails.getTin());
//
//            // Compile the Jasper report template based on the customerid comparison
//            JasperReport compileReport = null;
//            if (isSameCustomer) {
//                compileReport = JasperCompileManager.compileReport(new FileInputStream(files_path + "/ImportedInvoice.jrxml"));
//            } else {
//                compileReport = JasperCompileManager.compileReport(new FileInputStream(files_path + "/URAinvoice.jrxml"));
//            }
//
//            // Create a map of parameters to be passed to the Jasper report
//            Map<String, Object> parameter = new HashMap<String, Object>();
//            parameter.put("logo", logo); // Set the logo image for the report
//            parameter.put("uralogo", uralogo); // Set the URALOGO image for the report
//            parameter.put("invoiceNo", invoice_no); // Set the invoice number to be displayed on the report
//
//            // Generate a Jasper print object by filling the compiled report with the specified parameters and database connection
//            JasperPrint report = JasperFillManager.fillReport(compileReport, parameter, connection);
//
//            // Export the Jasper print object to PDF format and convert the resulting bytes into a byte array
//            byte[] data = JasperExportManager.exportReportToPdf(report);
//
//            // Set the response headers to indicate that the response body contains a PDF file with inline display mode
//            HttpHeaders headers = new HttpHeaders();
//            headers.set(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=report.pdf");
//            headers.setContentType(MediaType.APPLICATION_PDF);
//
//            // Return a ResponseEntity containing the byte array of the PDF file and the response headers
//            return ResponseEntity.ok().headers(headers).body(data);
//        } else {
//            // Create an EntityResponse object to represent an error response
//            EntityResponse response = new EntityResponse();
//            response.setStatusCode(400); // Set the status code to 400 (Bad Request)
//            response.setMessage("Data Not Found"); // Set the error message
//            response.setEntity(""); // Set the entity to an empty string
//
//            // Return a ResponseEntity containing the EntityResponse object and a status code of 400 (Bad Request)
//            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
//        }
//    }


//    @GetMapping("/per/invoice/")
//    public ResponseEntity<?> generateInvoice(
//            @RequestParam String invoice_no
//    ) throws FileNotFoundException, JRException, SQLException {
//        // Retrieve the basic information responses corresponding to the given invoice number from the database
//        List<BasicInfoResponse> basicInfoResponses = basicInfoRepository.findByinvoiceNo(invoice_no);
//
//        // If any basic information response was found
//        if (basicInfoResponses.size() > 0) {
//            // Retrieve the seller details from the database using the customer ID
//            String customerId = basicInfoResponses.get(0).getCustomerid();
//            SellerDetails sellerDetails = sellerDetailsRepository.findBycustomerId(customerId);
//
//            // Determine which Jasper report template to use based on the customer ID and TIN
//            String jrxmlFileName;
//            if (sellerDetails.getCustomerid().equals(sellerDetails.getTin())) {
//                jrxmlFileName = "ImportedInvoice.jrxml";
//            } else {
//                jrxmlFileName = "URAinvoice.jrxml";
//            }
//
//            // Establish a connection to the database using the specified database connection details
//            Connection connection = DriverManager.getConnection(this.db, this.username, this.password);
//
//            // Compile the Jasper report template by reading the JRXML file from the specified file path
//            JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream(files_path + "/" + jrxmlFileName));
//
//            // Create a map of parameters to be passed to the Jasper report
//            Map<String, Object> parameter = new HashMap<String, Object>();
//            parameter.put("logo", logo); // Set the logo image for the report
//            parameter.put("uralogo", uralogo); // Set the URALOGO image for the report
//            parameter.put("invoiceNo", invoice_no); // Set the invoice number to be displayed on the report
//
//            // Generate a Jasper print object by filling the compiled report with the specified parameters and database connection
//            JasperPrint report = JasperFillManager.fillReport(compileReport, parameter, connection);
//
//            // Export the Jasper print object to PDF format and convert the resulting bytes into a byte array
//            byte[] data = JasperExportManager.exportReportToPdf(report);
//
//            // Set the response headers to indicate that the response body contains a PDF file with inline display mode
//            HttpHeaders headers = new HttpHeaders();
//            headers.set(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=report.pdf");
//            headers.setContentType(MediaType.APPLICATION_PDF);
//
//            // Return a ResponseEntity containing the byte array of the PDF file and the response headers
//            return ResponseEntity.ok().headers(headers).body(data);
//        } else {
//            // Create an EntityResponse object to represent an error response
//            EntityResponse response = new EntityResponse();
//            response.setStatusCode(400); // Set the status code to 400 (Bad Request)
//            response.setMessage("Data Not Found"); // Set the error message
//            response.setEntity(""); // Set the entity to an empty string
//
//            // Return a ResponseEntity containing the EntityResponse object and a status code of 400 (Bad Request)
//            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
//        }
//    }

    @GetMapping("/per/invoice/")
    public ResponseEntity<?> generateInvoice(@RequestParam String invoice_no) throws FileNotFoundException, JRException, SQLException {
        // Retrieve the basic information responses corresponding to the given invoice number from the database

        List<BasicInfoResponse> basicInfoResponses = basicInfoRepository.findByinvoiceNo(invoice_no);
        System.out.println("Basic Info Responses: " + basicInfoResponses.get(0));
        //basicInfoResponses.forEach(response -> System.out.println(response.toString()));


        System.out.println("invoice_no: " + invoice_no);

        // If any basic information response was found
        if (basicInfoResponses.size() > 0) {
            // Get the first BasicInfoResponse object from the list
//            BasicInfoResponse basicInfoResponse = basicInfoResponses.get(0);
//
//            // Set the Jasper report file path based on the customerid value
//            String jrxmlFilePath;
//            System.out.println("customerId: " + basicInfoResponse.getCustomerid());
//            //System.out.println("tin: " + basicInfoResponse.getTin());
//
//            if (basicInfoResponse.getCustomerid().equals(1000029719)) {
//                jrxmlFilePath = files_path + "/ImportedInvoice.jrxml";
//            } else {
//                jrxmlFilePath = files_path + "/LocalInvoice.jrxml";
//            }
            BasicInfoResponse basicInfoResponse = basicInfoResponses.get(0);

            // Set the Jasper report file path based on the customerid value
            String jrxmlFilePath;
            System.out.println("customerId: " + basicInfoResponse.getCustomerid());
            //System.out.println("tin: " + basicInfoResponse.getTin());

            if (String.valueOf(basicInfoResponse.getCustomerid()).equals("1000029719")) {
                jrxmlFilePath = files_path + "/ImportedInvoice.jrxml";
            } else {
                jrxmlFilePath = files_path + "/LocalInvoice.jrxml";
            }


            // Establish a connection to the database using the specified database connection details
            Connection connection = DriverManager.getConnection(this.db, this.username, this.password);

            // Compile the Jasper report template by reading the JRXML file from the specified file path
            JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream(jrxmlFilePath));

            // Create a map of parameters to be passed to the Jasper report
            Map<String, Object> parameter = new HashMap<String, Object>();
            parameter.put("logo", logo); // Set the logo image for the report
            parameter.put("uralogo", uralogo); // Set the URALOGO image for the report
            parameter.put("invoiceNo", invoice_no); // Set the invoice number to be displayed on the report

            System.out.println("compileReport: " + compileReport);
            System.out.println("parameter: " + parameter);
            System.out.println("connection: " + connection);
            // Generate a Jasper print object by filling the compiled report with the specified parameters and database connection
            JasperPrint report = JasperFillManager.fillReport(compileReport, parameter, connection);

            // Export the Jasper print object to PDF format and convert the resulting bytes into a byte array
            byte[] data = JasperExportManager.exportReportToPdf(report);

            // Set the response headers to indicate that the response body contains a PDF file with inline display mode
            HttpHeaders headers = new HttpHeaders();
            headers.set(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=report.pdf");
            headers.setContentType(MediaType.APPLICATION_PDF);

            // Return a ResponseEntity containing the byte array of the PDF file and the response headers
            return ResponseEntity.ok().headers(headers).body(data);
        } else {
            // Create an EntityResponse object to represent an error response
            EntityResponse response = new EntityResponse();
            response.setStatusCode(400); // Set the status code to 400 (Bad Request)
            response.setMessage("Data Not Found"); // Set the error message
            response.setEntity(""); // Set the entity to an empty string

            // Return a ResponseEntity containing the EntityResponse object and a status code of 400 (Bad Request)
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }


//    @GetMapping("/per/invoice/")
//    public ResponseEntity<?> generateInvoice(
//            @RequestParam String invoice_no
//    ) throws FileNotFoundException, JRException, SQLException {
//        // Retrieve the basic information responses corresponding to the given invoice number from the database
//        List<BasicInfoResponse> basicInfoResponses = basicInfoRepository.findByinvoiceNo(invoice_no);
//
//        // If any basic information response was found
//        if (basicInfoResponses.size() > 0) {
//            // Establish a connection to the database using the specified database connection details
//            Connection connection = DriverManager.getConnection(this.db, this.username, this.password);
//
//            // Compile the Jasper report template by reading the JRXML file from the specified file path
//            JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream(files_path + "/URAinvoice.jrxml"));
//
//            // Create a map of parameters to be passed to the Jasper report
//            Map<String, Object> parameter = new HashMap<String, Object>();
//            parameter.put("logo", logo); // Set the logo image for the report
//            parameter.put("uralogo", uralogo); // Set the URALOGO image for the report
//            parameter.put("invoiceNo", invoice_no); // Set the invoice number to be displayed on the report
//
//            // Generate a Jasper print object by filling the compiled report with the specified parameters and database connection
//            JasperPrint report = JasperFillManager.fillReport(compileReport, parameter, connection);
//
//            // Export the Jasper print object to PDF format and convert the resulting bytes into a byte array
//            byte[] data = JasperExportManager.exportReportToPdf(report);
//
//            // Set the response headers to indicate that the response body contains a PDF file with inline display mode
//            HttpHeaders headers = new HttpHeaders();
//            headers.set(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=report.pdf");
//            headers.setContentType(MediaType.APPLICATION_PDF);
//
//            // Return a ResponseEntity containing the byte array of the PDF file and the response headers
//            return ResponseEntity.ok().headers(headers).body(data);
//        } else {
//            // Create an EntityResponse object to represent an error response
//            EntityResponse response = new EntityResponse();
//            response.setStatusCode(400); // Set the status code to 400 (Bad Request)
//            response.setMessage("Data Not Found"); // Set the error message
//            response.setEntity(""); // Set the entity to an empty string
//
//            // Return a ResponseEntity containing the EntityResponse object and a status code of 400 (Bad Request)
//            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
//        }
//
//    }


//    @GetMapping("/per/invoice/")
//    public ResponseEntity<?> generateInvoice(
//            @RequestParam String  invoice_no
//    ) throws FileNotFoundException, JRException, SQLException {
////       Optional<Invoice> invoice = invoiceRepo.getByInvoiceNumber(invoice_no);
//        List<BasicInfoResponse> basicInfoResponses = basicInfoRepository.findByinvoiceNo(invoice_no);
//        if(basicInfoResponses.size()>0){
//
//            Connection connection = DriverManager.getConnection(this.db, this.username, this.password);
//            JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream(files_path+"/URAinvoice.jrxml"));
////            JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream("/home/ibrahim/JaspersoftWorkspace/MyReports/URAinvoice.jrxml"));
//            Map<String, Object> parameter = new HashMap<String, Object>();
//
//            parameter.put("logo",logo);
//            parameter.put("uralogo",uralogo);
//            parameter.put("invoiceNo",invoice_no);
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
}
