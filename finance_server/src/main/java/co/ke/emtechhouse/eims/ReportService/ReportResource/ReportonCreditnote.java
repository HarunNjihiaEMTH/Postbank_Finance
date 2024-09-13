package co.ke.emtechhouse.eims.ReportService.ReportResource;

import co.ke.emtechhouse.eims.ReportService.ExcelExports.ExcelExporter;
import co.ke.emtechhouse.eims.ReportService.ExcelExports.ExcelHeaders.CreditNoteHeaders;
import co.ke.emtechhouse.eims.ReportService.ExcelExports.ExcelHeaders.InvoicesHeaders;
import co.ke.emtechhouse.eims.ReportService.ExcelExports.ExcelInterfaces.Creditnoterepo;
import co.ke.emtechhouse.eims.ReportService.ReportQueries.ReportQueriesRepo;
import co.ke.emtechhouse.eims.ResponseMessage.EntityResponse;
import co.ke.emtechhouse.eims.TransactionComponent.Transheader;
import co.ke.emtechhouse.eims.TransactionComponent.TransheaderRepo;
import co.ke.emtechhouse.eims.URAComponent.uploadinvoice.request.SaveInvoiceDetails;
import net.sf.jasperreports.engine.*;
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
@RequestMapping("/api/v1/reports/creditnote")
public class ReportonCreditnote {
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

    public ReportonCreditnote(TransheaderRepo transheaderRepo, ReportQueriesRepo reportQueriesRepo) {
        this.transheaderRepo = transheaderRepo;
        this.reportQueriesRepo = reportQueriesRepo;
    }
    @GetMapping("/successfull")
    public ResponseEntity<?> generategeneralAccrualPayents(
            @RequestParam String fromDate,
            @RequestParam String toDate
    ) throws FileNotFoundException, JRException, SQLException {
        List<Transheader> collectaccrualList = transheaderRepo.findAll();
        if (collectaccrualList.size()>0) {
            Connection connection = DriverManager.getConnection(this.db, this.username, this.password);
            JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream(files_path+"/creditNotes.jrxml"));
            Map<String, Object> parameter = new HashMap<String, Object>();
            parameter.put("logo",logo);
            parameter.put("urastatus","Successful");
            parameter.put("customerid","%");
            parameter.put("fromDate", fromDate);
            parameter.put("toDate",toDate);
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
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/successfull/excel")
    public ResponseEntity<?> generateallpaymentsexcel(
            HttpServletResponse httpresponse,
            @RequestParam String fromDate,
            @RequestParam String toDate
    ) throws IOException, JRException, SQLException {
        String ura_status = "Successful";
        String customerid = "%";
        String headerTitleLine = "Successfull Uploaded Invoices";
        List<Creditnoterepo> dataDetails =  reportQueriesRepo.creditnote(ura_status,customerid,fromDate,toDate);


        if(dataDetails.size()>0){
            httpresponse.setContentType("application/octet-stream");
            DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
            String currentDateTime = dateFormatter.format(new Date());
            String headerKey = "Content-Disposition";
            String headerValue = "attachment; filename=" + currentDateTime + ".xlsx";
            httpresponse.setHeader(headerKey, headerValue);
            ExcelExporter excelExporter = new ExcelExporter();
            ByteArrayInputStream bis = excelExporter.exportCreditNote(httpresponse,dataDetails, CreditNoteHeaders.class, fromDate, toDate, headerTitleLine);
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

    @GetMapping("/successfull/per/customer")
    public ResponseEntity<?> AccrualPayentsPerCustomer(
            @RequestParam String fromDate,
            @RequestParam String toDate,
            @RequestParam String customerid
    ) throws FileNotFoundException, JRException, SQLException {
        List<Transheader> collectaccrualList = transheaderRepo.findAll();
        if (collectaccrualList.size()>0) {
            Connection connection = DriverManager.getConnection(this.db, this.username, this.password);
            JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream(files_path+"/creditNotes.jrxml"));
            Map<String, Object> parameter = new HashMap<String, Object>();
            parameter.put("logo",logo);
            parameter.put("urastatus","Successful");
            parameter.put("customerid",customerid);
            parameter.put("fromDate", fromDate);
            parameter.put("toDate",toDate);
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
        String ura_status = "Successful";
        String headerTitleLine = "Successfull Uploaded Invoices";
        List<Creditnoterepo> dataDetails =  reportQueriesRepo.creditnote(ura_status,customerid,fromDate,toDate);
        if(dataDetails.size()>0){
            httpresponse.setContentType("application/octet-stream");
            DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
            String currentDateTime = dateFormatter.format(new Date());
            String headerKey = "Content-Disposition";
            String headerValue = "attachment; filename=" + currentDateTime + ".xlsx";
            httpresponse.setHeader(headerKey, headerValue);
            ExcelExporter excelExporter = new ExcelExporter();
            ByteArrayInputStream bis = excelExporter.exportCreditNote(httpresponse,dataDetails, CreditNoteHeaders.class, fromDate, toDate, headerTitleLine);
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
    @GetMapping("/failed")
    public ResponseEntity<?> failedAccrualPayents(
            @RequestParam String fromDate,
            @RequestParam String toDate
    ) throws FileNotFoundException, JRException, SQLException {
        List<Transheader> collectaccrualList = transheaderRepo.findAll();
        if (collectaccrualList.size()>0) {
            Connection connection = DriverManager.getConnection(this.db, this.username, this.password);
            JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream(files_path+"/creditNotes.jrxml"));
            Map<String, Object> parameter = new HashMap<String, Object>();
            parameter.put("logo",logo);
            parameter.put("urastatus","Failed");
            parameter.put("customerid","%");
            parameter.put("fromDate", fromDate);
            parameter.put("toDate",toDate);
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
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/failed/excel")
    public ResponseEntity<?> failedexcel(
            HttpServletResponse httpresponse,
            @RequestParam String fromDate,
            @RequestParam String toDate
    ) throws IOException, JRException, SQLException {
        String headerTitleLine = "Failed Credit Notes";
        String ura_status = "Failed";
        String customerid = "%";
        List<Creditnoterepo> dataDetails =  reportQueriesRepo.creditnote(ura_status,customerid,fromDate,toDate);
        if(dataDetails.size()>0){
            httpresponse.setContentType("application/octet-stream");
            DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
            String currentDateTime = dateFormatter.format(new Date());
            String headerKey = "Content-Disposition";
            String headerValue = "attachment; filename=" + currentDateTime + ".xlsx";
            httpresponse.setHeader(headerKey, headerValue);
            ExcelExporter excelExporter = new ExcelExporter();
            ByteArrayInputStream bis = excelExporter.exportCreditNote(httpresponse,dataDetails, CreditNoteHeaders.class, fromDate, toDate, headerTitleLine);
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
    @GetMapping("/failed/per/customer")
    public ResponseEntity<?> failedAccrualPayentsPerCustomer(
            @RequestParam String fromDate,
            @RequestParam String toDate,
            @RequestParam String customerid
    ) throws FileNotFoundException, JRException, SQLException {
        List<Transheader> collectaccrualList = transheaderRepo.findAll();
        if (collectaccrualList.size()>0) {
            Connection connection = DriverManager.getConnection(this.db, this.username, this.password);
            JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream(files_path+"/creditNotes.jrxml"));
            Map<String, Object> parameter = new HashMap<String, Object>();
            parameter.put("logo",logo);
            parameter.put("urastatus","Failed");
            parameter.put("customerid",customerid);
            parameter.put("fromDate", fromDate);
            parameter.put("toDate",toDate);
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
        String headerTitleLine = "Failed Credit Note Per Customer";
        String ura_status = "Failed";
        List<Creditnoterepo> dataDetails =  reportQueriesRepo.creditnote(ura_status,customerid,fromDate,toDate);
        if(dataDetails.size()>0){
            httpresponse.setContentType("application/octet-stream");
            DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
            String currentDateTime = dateFormatter.format(new Date());
            String headerKey = "Content-Disposition";
            String headerValue = "attachment; filename=" + currentDateTime + ".xlsx";
            httpresponse.setHeader(headerKey, headerValue);
            ExcelExporter excelExporter = new ExcelExporter();
            ByteArrayInputStream bis = excelExporter.exportCreditNote(httpresponse,dataDetails, CreditNoteHeaders.class, fromDate, toDate, headerTitleLine);
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

