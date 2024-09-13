package co.ke.emtechhouse.eims.ReportService;

import co.ke.emtechhouse.eims.InvoiceComponent.Invoice;
import co.ke.emtechhouse.eims.InvoiceComponent.InvoiceRepo;
import co.ke.emtechhouse.eims.OrganisationComponent.Organisation;
import co.ke.emtechhouse.eims.OrganisationComponent.OrganisationRepo;
import co.ke.emtechhouse.eims.PurchaseOrderComponent.PurchaseOrder;
import co.ke.emtechhouse.eims.PurchaseOrderComponent.PurchaseOrderRepo;
import co.ke.emtechhouse.eims.ResponseMessage.EntityResponse;
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
@RequestMapping("/api/v1/reports")
public class ReportService {
    @Value("${reports_absolute_path}")
    private String files_path;
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

    @GetMapping("/generate/purchase_order/")
public ResponseEntity<?> generatePOOrder( @RequestParam String  partner_address,
                                        @RequestParam String partner_name,
                                        @RequestParam String partner_company_name,
                                        @RequestParam String partner_email,
                                        @RequestParam String partner_zip_postalCode,
                                        @RequestParam String poNumber

    ) throws FileNotFoundException, JRException, SQLException {
//        Check if they are available
        List<PurchaseOrder> check = purchaseOrderRepo.checkByPo(poNumber);
        if (check.size() > 0){
            // Call api to get orgation info
            Organisation organisation = organisationRepo.getOrganizationDetail();
            String org_zip_postcode = organisation.getAddress();
            String org_address = organisation.getAddress();
            String org_name = organisation.getOrganisationName();
            String org_companyemail = organisation.getEmail();
            String org_telephone = organisation.getPhone();
            String org_website = "www.google.com";
            String org_companyname = organisation.getOrganisationName();
            String org_box_address = organisation.getAddress();
            String org_slogan = "-";
            Connection connection = DriverManager.getConnection(this.db, this.username, this.password);
            JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream(files_path+"/accounts.jrxml"));
            Map<String, Object> parameter = new HashMap<String, Object>();
            parameter.put("org_zip_postcode",org_zip_postcode);
            parameter.put("org_address",org_address);
            parameter.put("org_name",org_name);
            parameter.put("org_companyemail",org_companyemail);
            parameter.put("org_telephone",org_telephone);
            parameter.put("org_website",org_website);
            parameter.put("org_companyname",org_companyname);
            parameter.put("org_box_address",org_box_address);
            parameter.put("org_slogan",org_slogan);

            parameter.put("poNumber", poNumber);
            parameter.put("partner_address",partner_address);
            parameter.put("partner_name",partner_name);
            parameter.put("partner_company_name",partner_company_name);
            parameter.put("partner_email",partner_email);
            parameter.put("partner_zip_postalCode",partner_zip_postalCode);

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
    @GetMapping("/cif/generate/invoice")
    public ResponseEntity<?> generateInvoice(            @RequestParam String  partner_address,
                                                         @RequestParam String partner_name,
                                                         @RequestParam String partner_company_name,
                                                         @RequestParam String partner_email,
                                                         @RequestParam String partner_zip_postalCode,
                                                         @RequestParam String invoiceNo

    ) throws FileNotFoundException, JRException, SQLException {
//        Check if they are available
        List<Invoice> check = invoiceRepo.checkByInvoiceNumber(invoiceNo);
        if (check.size() > 0){
            // Call api to get orgation info
            Organisation organisation = organisationRepo.getOrganizationDetail();
            String org_zip_postcode = organisation.getAddress();
            String org_address = organisation.getAddress();
            String org_name = organisation.getOrganisationName();
            String org_companyemail = organisation.getEmail();
            String org_telephone = organisation.getPhone();
            String org_website = "www.google.com";
            String org_companyname = organisation.getOrganisationName();
            String org_box_address = organisation.getAddress();
            String org_slogan = "-";

            Connection connection = DriverManager.getConnection(this.db, this.username, this.password);
            JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream(files_path+"/accounts.jrxml"));
            Map<String, Object> parameter = new HashMap<String, Object>();

            parameter.put("org_zip_postcode",org_zip_postcode);
            parameter.put("org_address",org_address);
            parameter.put("org_name",org_name);
            parameter.put("org_companyemail",org_companyemail);
            parameter.put("org_telephone",org_telephone);
            parameter.put("org_website",org_website);
            parameter.put("org_companyname",org_companyname);
            parameter.put("org_box_address",org_box_address);
            parameter.put("org_slogan",org_slogan);

            parameter.put("invoiceNo", invoiceNo);
            parameter.put("partner_address",partner_address);
            parameter.put("partner_name",partner_name);
            parameter.put("partner_company_name",partner_company_name);
            parameter.put("partner_email",partner_email);
            parameter.put("partner_zip_postalCode",partner_zip_postalCode);
            JasperPrint report = JasperFillManager.fillReport(compileReport, parameter, connection);
            byte[] data = JasperExportManager.exportReportToPdf(report);
            HttpHeaders headers = new HttpHeaders();
            headers.set(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=reportz.pdf");
            return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF).body(data);
        }else{
            EntityResponse response =  new EntityResponse();
            response.setStatusCode(400);
            response.setMessage("Data Not Found");
            response.setEntity("");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

}
