package co.ke.emtechhouse.eims.ReportService.ReportResource;

import co.ke.emtechhouse.eims.ReportService.ExcelExports.ExcelExporter;
import co.ke.emtechhouse.eims.ReportService.ExcelExports.ExcelHeaders.InvoicesHeaders;
import co.ke.emtechhouse.eims.ReportService.ExcelExports.ExcelInterfaces.InvoiceImportDetailedInfo;
import co.ke.emtechhouse.eims.ReportService.ExcelExports.ExcelInterfaces.InvoiceLocalDetailedInfo;
import co.ke.emtechhouse.eims.ReportService.ExcelExports.ExcelInterfaces.InvoiceDetailsCust;
import co.ke.emtechhouse.eims.ReportService.ReportQueries.ReportQueriesRepo;
import co.ke.emtechhouse.eims.ResponseMessage.EntityResponse;
import co.ke.emtechhouse.eims.TransactionComponent.Transheader;
import co.ke.emtechhouse.eims.TransactionComponent.TransheaderRepo;
import net.sf.jasperreports.engine.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

//@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/reports/invoices")
public class ReportsonInvoices {
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
    private final TransheaderRepo transheaderRepo;
    private final ReportQueriesRepo reportQueriesRepo;

    public ReportsonInvoices(TransheaderRepo transheaderRepo, ReportQueriesRepo reportQueriesRepo) {
        this.transheaderRepo = transheaderRepo;
        this.reportQueriesRepo = reportQueriesRepo;
    }

    @GetMapping("/successfull")
    public ResponseEntity<?> generatePDFReport(
            @RequestParam String fromDate,
            @RequestParam String toDate,
            @RequestParam String invoiceType
    ) throws FileNotFoundException, JRException, SQLException {
        List<Transheader> invoiceDetails = transheaderRepo.findAll();

        if (invoiceDetails.isEmpty()) {
            EntityResponse response = new EntityResponse();
            response.setStatusCode(400);
            response.setMessage("Data Not Found");
            response.setEntity("");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        String reportFileName = "";
        if ("Import".equals(invoiceType)) {
            reportFileName = "uraImportinvoices.jrxml";
        } else if ("Local".equals(invoiceType)) {
            reportFileName = "uraLocalinvoices.jrxml";
        } else {
            // Handle invalid invoiceType
        }

        try (Connection connection = DriverManager.getConnection(this.db, this.username, this.password);
             FileInputStream inputStream = new FileInputStream(files_path + "/" + reportFileName)) {

            JasperReport compileReport = JasperCompileManager.compileReport(inputStream);
            Map<String, Object> parameter = new HashMap<String, Object>();
            parameter.put("logo", logo);
            parameter.put("fromDate", fromDate);
            parameter.put("toDate", toDate);
            JasperPrint report = JasperFillManager.fillReport(compileReport, parameter, connection);
            byte[] data = JasperExportManager.exportReportToPdf(report);

            HttpHeaders headers = new HttpHeaders();
            headers.set(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=report.pdf");
            return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF).body(data);

        } catch (IOException e) {
            // Handle file not found exception
        }

        return null;
    }


//    @GetMapping("/successfull")
//    public ResponseEntity<?> generategeneralAccrualPayents(
//            @RequestParam String fromDate,
//            @RequestParam String toDate,
//            @RequestParam String invoiceType
//    ) throws FileNotFoundException, JRException, SQLException {
//        List<Transheader> invoiceDetails = transheaderRepo.findAll();
//
//
//
//        if (invoiceDetails.size() > 0) {
//
//            if (invoiceType == "Import") {
//                Connection connection = DriverManager.getConnection(this.db, this.username, this.password);
//                JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream(files_path + "/uraImportinvoices.jrxml"));
//                Map<String, Object> parameter = new HashMap<String, Object>();
//                parameter.put("logo", logo);
//                parameter.put("fromDate", fromDate);
//                parameter.put("toDate", toDate);
//                JasperPrint report = JasperFillManager.fillReport(compileReport, parameter, connection);
//                byte[] data = JasperExportManager.exportReportToPdf(report);
//                HttpHeaders headers = new HttpHeaders();
//                headers.set(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=report.pdf");
//                return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF).body(data);
//
//            }
//            else if (invoiceType == "Local") {
//                Connection connection = DriverManager.getConnection(this.db, this.username, this.password);
//                JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream(files_path + "/uraLocalinvoices.jrxml"));
//                Map<String, Object> parameter = new HashMap<String, Object>();
//                parameter.put("logo", logo);
//                parameter.put("fromDate", fromDate);
//                parameter.put("toDate", toDate);
//                JasperPrint report = JasperFillManager.fillReport(compileReport, parameter, connection);
//                byte[] data = JasperExportManager.exportReportToPdf(report);
//                HttpHeaders headers = new HttpHeaders();
//                headers.set(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=report.pdf");
//                return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF).body(data);
//
//            }
//
//
//        } else {
//            EntityResponse response = new EntityResponse();
//            response.setStatusCode(400);
//            response.setMessage("Data Not Found");
//            response.setEntity("");
//            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
//        }
//
//
//    }


    //    @GetMapping("/successfull/excel")
//    public ResponseEntity<?> generateallpaymentsexcel(
//            HttpServletResponse httpresponse,
//            @RequestParam String fromDate,
//            @RequestParam String toDate
//    ) throws IOException, JRException, SQLException {
//        String status = "%";
//        String customerid = "%";
//        String headerTitleLine = "Successfull Uploaded Invoices";
//        List<InvoiceDetailsCust> invoiceDetails = reportQueriesRepo.getSuccessfullUraInvoices(customerid);
//        if(invoiceDetails.size()>0){
//            httpresponse.setContentType("application/octet-stream");
//            DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
//            String currentDateTime = dateFormatter.format(new Date());
//            String headerKey = "Content-Disposition";
//            String headerValue = "attachment; filename=" + currentDateTime + ".xlsx";
//            httpresponse.setHeader(headerKey, headerValue);
//            ExcelExporter excelExporter = new ExcelExporter();
//            ByteArrayInputStream bis = excelExporter.exportInvoice(httpresponse,invoiceDetails, InvoicesHeaders.class, fromDate, toDate, headerTitleLine);
//            HttpHeaders headers = new HttpHeaders();
//            return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_ATOM_XML).body(new InputStreamResource(bis));
//        }else {
//            EntityResponse response =  new EntityResponse();
//            response.setStatusCode(400);
//            response.setMessage("Data Not Found");
//            response.setEntity("");
//            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
//        }
//    }

//    @GetMapping("/successfull/excel")
//    public ResponseEntity<?> generateDetailedInvoicepaymentsexcel(
//            HttpServletResponse httpresponse,
//            @RequestParam String fromDate,
//            @RequestParam String toDate
//    ) throws IOException, JRException, SQLException {
//        String status = "%";
//        String customerid = "%";
//        String headerTitleLine = "Successfull Uploaded Invoices";
//        List<InvoiceDetailedInfo> invoiceDetails = reportQueriesRepo.getDetailedInvoiceInfo(customerid, fromDate, toDate);
//        if (invoiceDetails.size() > 0) {
//            httpresponse.setContentType("application/octet-stream");
//            DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
//            String currentDateTime = dateFormatter.format(new Date());
//            String headerKey = "Content-Disposition";
//            String headerValue = "attachment; filename=" + currentDateTime + ".xlsx";
//            httpresponse.setHeader(headerKey, headerValue);
//            ExcelExporter excelExporter = new ExcelExporter();
//            ByteArrayInputStream bis = excelExporter.exportInvoiceDetailed(httpresponse, invoiceDetails, fromDate, toDate, headerTitleLine);
//            HttpHeaders headers = new HttpHeaders();
//            return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_ATOM_XML).body(new InputStreamResource(bis));
//        } else {
//            EntityResponse response = new EntityResponse();
//            response.setStatusCode(400);
//            response.setMessage("Data Not Found");
//            response.setEntity("");
//            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
//        }
//    }




//    // This endpoint generates an Excel file with detailed invoice information for a given date range
//    @GetMapping("/successfull/excel")
//    public ResponseEntity<?> generateDetailedInvoicepaymentsexcel(
//            HttpServletResponse httpresponse, // The HTTP response object used to send the Excel file as a download
//            @RequestParam String fromDate, // The start date of the date range for which to generate the report
//            @RequestParam String toDate, // The end date of the date range for which to generate the report
//            @RequestParam String invoiceType
//    ) throws IOException, JRException, SQLException {
//        String status = "%";
//        String customerid = "%";
//        String headerTitleLine = "Successfull Uploaded Invoices";
//
//        // Get a list of detailed invoice information for the specified date range
//        List<InvoiceDetailedInfo> invoiceDetails = new ArrayList<>();
//
//        if (invoiceType == "Import") {
//             invoiceDetails = reportQueriesRepo.getLocalDetailedInvoiceInfo(customerid, fromDate, toDate);
//
//            invoiceDetails = invoiceDetails.stream().filter(b -> b.getTinOfPurchaser().equalsIgnoreCase(b.getTinOfPurchaser())).collect(Collectors.toList());
//        } else if (invoiceType == "Local") {
//             invoiceDetails = reportQueriesRepo.getImportedDetailedInvoiceInfo(customerid, fromDate, toDate);
//
//            invoiceDetails = invoiceDetails.stream()
//                    .filter(b -> !b.getTinOfPurchaser().equalsIgnoreCase(b.getTinOfSeller()))
//                    .collect(Collectors.toList());
//        }
//        // If any data exists for the given range, generate an Excel file and return it as a downloadable attachment
//        if (invoiceDetails.size() > 0) {
//            // Set the content type of the HTTP response to indicate that an Excel file is being returned
//            httpresponse.setContentType("application/octet-stream");
//
//            // Generate a unique filename for the Excel file based on the current date and time
//            DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
//            String currentDateTime = dateFormatter.format(new Date());
//            String headerKey = "Content-Disposition";
//            String headerValue = "attachment; filename=" + currentDateTime + ".xlsx";
//
//            // Set the HTTP headers to indicate that a file is being returned and specify the filename
//            httpresponse.setHeader(headerKey, headerValue);
//
//            // Generate the Excel file using an instance of the ExcelExporter class
//            ExcelExporter excelExporter = new ExcelExporter();
//            ByteArrayInputStream bis = excelExporter.exportInvoiceDetailed(httpresponse, invoiceDetails, fromDate, toDate, headerTitleLine);
//
//            // Set the HTTP headers and body of the response to return the Excel file as a downloadable attachment
//            HttpHeaders headers = new HttpHeaders();
//            return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_ATOM_XML).body(new InputStreamResource(bis));
//        }
//        // If no data is found, return a 400 error response with a "Data Not Found" message
//        else {
//            EntityResponse response = new EntityResponse();
//            response.setStatusCode(400);
//            response.setMessage("Data Not Found");
//            response.setEntity("");
//            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
//        }
//    }

//    @GetMapping("/successfull/excel")
//    public ResponseEntity<?> generateDetailedInvoicePaymentsExcel(
//            HttpServletResponse response,
//            @RequestParam String fromDate,
//            @RequestParam String toDate,
//            @RequestParam String invoiceType
//    ) throws IOException, JRException, SQLException {
//        String status = "%";
//        String customerid = "%";
//        String headerTitleLine = "Successfully Uploaded Invoices";
//
//        // Get a list of detailed invoice information for the specified date range
//        List<InvoiceDetailedInfo> invoiceDetails = new ArrayList<>();
//
//        if (invoiceType.equals("Import")) {
//            invoiceDetails = reportQueriesRepo.getLocalDetailedInvoiceInfo(customerid, fromDate, toDate);
//            invoiceDetails = invoiceDetails.stream()
//                    .filter(b -> b.getTinOfPurchaser().equalsIgnoreCase(b.getTinOfPurchaser()))
//                    .collect(Collectors.toList());
//        } else if (invoiceType.equals("Local")) {
//            invoiceDetails = reportQueriesRepo.getImportedDetailedInvoiceInfo(customerid, fromDate, toDate);
//            invoiceDetails = invoiceDetails.stream()
//                    .filter(b -> !b.getTinOfPurchaser().equalsIgnoreCase(b.getTinOfSeller()))
//                    .collect(Collectors.toList());
//        }
//
//        // If any data exists for the given range, generate an Excel file and return it as a downloadable attachment
//        if (!invoiceDetails.isEmpty()) {
//            // Generate the Excel file using an instance of the ExcelExporter class
//            ExcelExporter excelExporter = new ExcelExporter();
//            if (invoiceType.equals("Import")) {
//                ByteArrayInputStream bis = excelExporter.exportImportInvoiceDetailed(response, invoiceDetails, fromDate, toDate, headerTitleLine);
//            } else if (invoiceType.equals("Local")) {
//                ByteArrayInputStream bis = excelExporter.exportLocalInvoiceDetailed(response, invoiceDetails, fromDate, toDate, headerTitleLine);
//            }
//
//
//            // Set the HTTP headers to indicate that a file is being returned and specify the filename
//            DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
//            String currentDateTime = dateFormatter.format(new Date());
//            String headerKey = "Content-Disposition";
//            String headerValue = "attachment; filename=" + currentDateTime + ".xlsx";
//            response.setHeader(headerKey, headerValue);
//            response.setContentType("application/octet-stream");
//
//            // Set the HTTP headers and body of the response to return the Excel file as a downloadable attachment
//            HttpHeaders headers = new HttpHeaders();
//            headers.add(HttpHeaders.CONTENT_DISPOSITION, headerValue);
//            return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_OCTET_STREAM).body(new InputStreamResource(bis));
//        }
//        // If no data is found, return a 404 error response with a "Data Not Found" message
//        else {
//            EntityResponse responseMsg = new EntityResponse();
//            responseMsg.setStatusCode(HttpStatus.NOT_FOUND.value());
//            responseMsg.setMessage("Data Not Found");
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseMsg);
//        }
//    }


    @GetMapping("/successfull/excel")
    public ResponseEntity<?> generateDetailedInvoicePaymentsExcel(
            HttpServletResponse response,
            @RequestParam String fromDate,
            @RequestParam String toDate,
            @RequestParam String invoiceType
    ) throws IOException, JRException, SQLException {
        String status = "%";
        String customerid = "%";
        String headerTitleLine = "Successfully Uploaded Invoices";

        // Get a list of detailed invoice information for the specified date range
        List<InvoiceImportDetailedInfo> invoiceImportDetails = new ArrayList<>();
        List<InvoiceLocalDetailedInfo> invoiceLocalDetails = new ArrayList<>();

//        if (invoiceType.equals("Import")) {
//            invoiceDetails = reportQueriesRepo.getLocalDetailedInvoiceInfo(customerid, fromDate, toDate);
//            invoiceDetails = invoiceDetails.stream()
//                    .filter(b -> b.getTinOfPurchaser().equalsIgnoreCase(b.getTinOfPurchaser()))
//                    .collect(Collectors.toList());
//        } else if (invoiceType.equals("Local")) {
//            invoiceDetails = reportQueriesRepo.getImportedDetailedInvoiceInfo(customerid, fromDate, toDate);
//            invoiceDetails = invoiceDetails.stream()
//                    .filter(b -> !b.getTinOfPurchaser().equalsIgnoreCase(b.getTinOfSeller()))
//                    .collect(Collectors.toList());
//        }
        if (invoiceType.equals("Local")) {
            invoiceLocalDetails = reportQueriesRepo.getLocalDetailedInvoiceInfo(customerid, fromDate, toDate);
            System.out.println("Local invoiceDetails is " + invoiceLocalDetails); // add this line
            invoiceLocalDetails = invoiceLocalDetails.stream()
                    .filter(b -> !b.getTinOfPurchaser().equalsIgnoreCase(b.getTinOfSeller()))
                    .collect(Collectors.toList());
        }
        else if (invoiceType.equals("Import")) {
            invoiceImportDetails = reportQueriesRepo.getImportedDetailedInvoiceInfo(customerid, fromDate, toDate);
            System.out.println("Import invoiceDetails is " + invoiceImportDetails); // add this line
            invoiceImportDetails = invoiceImportDetails.stream()
                    .filter(b -> b.getTinOfPurchaser().equalsIgnoreCase(b.getTinOfSeller()))
                    .collect(Collectors.toList());
        }


        // Declare the ByteArrayOutputStream variable outside the if/else blocks
        ByteArrayOutputStream baos = new ByteArrayOutputStream();

        // If any data exists for the given range, generate an Excel file and return it as a downloadable attachment
        if (!invoiceImportDetails.isEmpty() || !invoiceLocalDetails.isEmpty()) {
            // Generate the Excel file using an instance of the ExcelExporter class
            ExcelExporter excelExporter = new ExcelExporter();
            if (invoiceType.equals("Import")) {
                excelExporter.exportImportInvoiceDetailed(response, invoiceImportDetails, fromDate, toDate, headerTitleLine, baos);
            } else if (invoiceType.equals("Local")) {
                excelExporter.exportLocalInvoiceDetailed(response, invoiceLocalDetails, fromDate, toDate, headerTitleLine, baos);
            }

            // Get the ByteArrayInputStream from the ByteArrayOutputStream
            ByteArrayInputStream bis = new ByteArrayInputStream(baos.toByteArray());

            // Set the HTTP headers to indicate that a file is being returned and specify the filename
            DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
            String currentDateTime = dateFormatter.format(new Date());
            String headerKey = "Content-Disposition";
            String headerValue = "attachment; filename=" + currentDateTime + ".xlsx";
            response.setHeader(headerKey, headerValue);
            response.setContentType("application/octet-stream");

            // Set the HTTP headers and body of the response to return the Excel file as a downloadable attachment
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, headerValue);
            return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_OCTET_STREAM).body(new InputStreamResource(bis));
        }
        // If no data is found, return a 404 error response with a "Data Not Found" message
        else {
            EntityResponse responseMsg = new EntityResponse();
            responseMsg.setStatusCode(HttpStatus.NOT_FOUND.value());
            responseMsg.setMessage("Data Not Found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseMsg);
        }
    }


    @GetMapping("/successfull/per/customer")
    public ResponseEntity<?> AccrualPayentsPerCustomer(
            @RequestParam String fromDate,
            @RequestParam String toDate,
            @RequestParam String customerid
    ) throws FileNotFoundException, JRException, SQLException {
        List<Transheader> collectaccrualList = transheaderRepo.findAll();
        if (collectaccrualList.size() > 0) {
            Connection connection = DriverManager.getConnection(this.db, this.username, this.password);
            JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream(files_path + "/SuccessfullInvoicePerCustomer.jrxml"));
            Map<String, Object> parameter = new HashMap<String, Object>();
            parameter.put("logo", logo);
            parameter.put("fromDate", fromDate);
            parameter.put("toDate", toDate);
            parameter.put("customerid", customerid);
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

    @GetMapping("/successfull/per/customer/excel")
    public ResponseEntity<?> successfullpercustomerexcel(
            HttpServletResponse httpresponse,
            @RequestParam String fromDate,
            @RequestParam String toDate,
            @RequestParam String customerid
    ) throws IOException, JRException, SQLException {
        String paymentstatus = "";
//        String customerid = "%";
        String headerTitleLine = "Successfull Uploaded Invoices Per Customer";
        List<InvoiceDetailsCust> invoiceDetails = reportQueriesRepo.getSuccessfullUraInvoices(customerid);

        System.out.println(invoiceDetails.size());
        System.out.println("asasasasassssssssssssssssssssss");
        if (invoiceDetails.size() > 0) {
            httpresponse.setContentType("application/octet-stream");
            DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
            String currentDateTime = dateFormatter.format(new Date());
            String headerKey = "Content-Disposition";
            String headerValue = "attachment; filename=" + currentDateTime + ".xlsx";
            httpresponse.setHeader(headerKey, headerValue);
            ExcelExporter excelExporter = new ExcelExporter();
            ByteArrayInputStream bis = excelExporter.exportInvoice(httpresponse, invoiceDetails, InvoicesHeaders.class, fromDate, toDate, headerTitleLine);
            HttpHeaders headers = new HttpHeaders();
            return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_ATOM_XML).body(new InputStreamResource(bis));
        } else {
            EntityResponse response = new EntityResponse();
            response.setStatusCode(400);
            response.setMessage("Data Not Found");
            response.setEntity("");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/failed")
    public ResponseEntity<?> failedAccrualPayents(
            @RequestParam String fromDate,
            @RequestParam String toDate
    ) throws FileNotFoundException, JRException, SQLException {
        List<Transheader> collectaccrualList = transheaderRepo.findAll();
        if (collectaccrualList.size() > 0) {
            Connection connection = DriverManager.getConnection(this.db, this.username, this.password);
            JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream(files_path + "/failedinvoices.jrxml"));
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

    @GetMapping("/failed/excel")
    public ResponseEntity<?> failedexcel(
            HttpServletResponse httpresponse,
            @RequestParam String fromDate,
            @RequestParam String toDate
    ) throws IOException, JRException, SQLException {
        String paymentstatus = "";
        String customerid = "%";
        String headerTitleLine = "Failed Invoice Uploads";
        List<InvoiceDetailsCust> invoiceDetails = reportQueriesRepo.getFaledUraInvoices(customerid);
        if (invoiceDetails.size() > 0) {
            httpresponse.setContentType("application/octet-stream");
            DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
            String currentDateTime = dateFormatter.format(new Date());
            String headerKey = "Content-Disposition";
            String headerValue = "attachment; filename=" + currentDateTime + ".xlsx";
            httpresponse.setHeader(headerKey, headerValue);
            ExcelExporter excelExporter = new ExcelExporter();
            ByteArrayInputStream bis = excelExporter.exportInvoice(httpresponse, invoiceDetails, InvoicesHeaders.class, fromDate, toDate, headerTitleLine);
            HttpHeaders headers = new HttpHeaders();
            return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_ATOM_XML).body(new InputStreamResource(bis));
        } else {
            EntityResponse response = new EntityResponse();
            response.setStatusCode(400);
            response.setMessage("Data Not Found");
            response.setEntity("");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/failed/per/customer")
    public ResponseEntity<?> failedAccrualPayentsPerCustomer(
            @RequestParam String fromDate,
            @RequestParam String toDate,
            @RequestParam String customerid
    ) throws FileNotFoundException, JRException, SQLException {
        List<Transheader> collectaccrualList = transheaderRepo.findAll();
        if (collectaccrualList.size() > 0) {
            Connection connection = DriverManager.getConnection(this.db, this.username, this.password);
            JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream(files_path + "/failedInvoicespercustomer.jrxml"));
            Map<String, Object> parameter = new HashMap<String, Object>();
            parameter.put("logo", logo);
            parameter.put("fromDate", fromDate);
            parameter.put("toDate", toDate);
            parameter.put("customerid", customerid);
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

    @GetMapping("/failed/per/customer/excel")
    public ResponseEntity<?> failedAllexcel(
            HttpServletResponse httpresponse,
            @RequestParam String fromDate,
            @RequestParam String toDate,
            @RequestParam String customerid
    ) throws IOException, JRException, SQLException {
        String paymentstatus = "";
//        String customerid = "%";
        String headerTitleLine = "Failed Invoice Upload Per Customer";
        List<InvoiceDetailsCust> invoiceDetails = reportQueriesRepo.getFaledUraInvoices(customerid);
        if (invoiceDetails.size() > 0) {
            httpresponse.setContentType("application/octet-stream");
            DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
            String currentDateTime = dateFormatter.format(new Date());
            String headerKey = "Content-Disposition";
            String headerValue = "attachment; filename=" + currentDateTime + ".xlsx";
            httpresponse.setHeader(headerKey, headerValue);
            ExcelExporter excelExporter = new ExcelExporter();
            ByteArrayInputStream bis = excelExporter.exportInvoice(httpresponse, invoiceDetails, InvoicesHeaders.class, fromDate, toDate, headerTitleLine);
            HttpHeaders headers = new HttpHeaders();
            return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_ATOM_XML).body(new InputStreamResource(bis));
        } else {
            EntityResponse response = new EntityResponse();
            response.setStatusCode(400);
            response.setMessage("Data Not Found");
            response.setEntity("");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }
}
