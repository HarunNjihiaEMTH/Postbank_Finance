package co.ke.emtechhouse.eims.ReportService.ReportResource;

import co.ke.emtechhouse.eims.InvoiceComponent.InvoiceRepo;
import co.ke.emtechhouse.eims.OrganisationComponent.Organisation;
import co.ke.emtechhouse.eims.OrganisationComponent.OrganisationRepo;
import co.ke.emtechhouse.eims.PurchaseOrderComponent.PurchaseOrder;
import co.ke.emtechhouse.eims.PurchaseOrderComponent.PurchaseOrderRepo;
import co.ke.emtechhouse.eims.ResponseMessage.EntityResponse;
import co.ke.emtechhouse.eims.SupplierComponent.Supplier;
import co.ke.emtechhouse.eims.SupplierComponent.SupplierRepo;
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
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/reports/po")
public class Reports_PO {
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



    //emailOrganizationName= PostBank Uganda-Head Office
    @Value("${emailOrganizationName}")
    private String emailOrganizationName;
    //emailOrganizationPhone= +256-414-258551
    @Value("${emailOrganizationPhone}")
    private String emailOrganizationPhone;
    //emailOrganizationMail= info@postbank.co.ug
    @Value("${emailOrganizationMail}")
    private String emailOrganizationMail;
    //emailOrganizationAddress= P.O.Box 7189, Kampala.
    @Value("${emailOrganizationAddress}")
    private String emailOrganizationAddress;
    //emailOrganizationLocation= Plot 4/6 Nkurumah Road, Nkrumah Rd, Kampala.
    @Value("${emailOrganizationLocation}")
    private String emailOrganizationLocation;
    //emailOrganizationWebsite= https://postbank.co.ug
    @Value("${emailOrganizationWebsite}")
    private String emailOrganizationWebsite;





    @GetMapping("/per/purchase_order/")
    public ResponseEntity<?> generatePO(
            @RequestParam String po_number
    )  throws IOException, JRException, SQLException {
        String org_address = emailOrganizationAddress;
        String org_name = emailOrganizationName;
        String org_companyemail = emailOrganizationMail;
        String org_telephone = emailOrganizationPhone;




        Optional<PurchaseOrder> purchaseOrder = purchaseOrderRepo.findByPoNumber(po_number);
        if (purchaseOrder.isPresent()){
//                Get supplier details
            Supplier supplier = supplierRepo.getById(purchaseOrder.get().getSupplierId());
            Connection connection = DriverManager.getConnection(this.db, this.username, this.password);
            JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream(files_path+"/PO.jrxml"));
            Map<String, Object> parameter = new HashMap<String, Object>();
            parameter.put("logo",logo);
            parameter.put("supplier_name",supplier.getSupplierName());
            parameter.put("supplier_address",supplier.getSupplierAddress());
            parameter.put("po_number", po_number);
            parameter.put("supplier_email", supplier.getSupplierEmail());
            parameter.put("supplier_country", supplier.getSupplierCountry());
            parameter.put("supplier_tin", supplier.getSupplierTin());
            parameter.put("Supplier_phone", supplier.getSupplierContact());
            parameter.put("PO_NO", po_number);

            parameter.put("bankName", org_name);
            parameter.put("bankAddress", org_address);
            parameter.put("bankEmail",org_companyemail);
            parameter.put("bankPhone", org_telephone);
            parameter.put("posted_time", purchaseOrder.get().getPostedTime().toString());
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


}