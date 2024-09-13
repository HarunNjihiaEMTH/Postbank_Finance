package co.ke.emtechhouse.eims.ReportService.ReportResource;


import co.ke.emtechhouse.eims.AuthenticationModule.payload.User;
import co.ke.emtechhouse.eims.AuthenticationModule.repositories.UserRepository;
import co.ke.emtechhouse.eims.InvoiceComponent.InvoiceRepo;
import co.ke.emtechhouse.eims.OrganisationComponent.OrganisationRepo;
import co.ke.emtechhouse.eims.PurchaseOrderComponent.PurchaseOrderRepo;
import co.ke.emtechhouse.eims.ResponseMessage.EntityResponse;
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
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

//@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/reports/users")
public class ReportsUsers {
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
    private UserRepository userRepository;
    @GetMapping("/user/status")
    public ResponseEntity<?> generatePerStatus(
            @RequestParam String status
    ) throws FileNotFoundException, JRException, SQLException {
        List<User> userList = userRepository.usersPerStatus(status);
        if(userList.size()>0){
            Connection connection = DriverManager.getConnection(this.db, this.username, this.password);
//            Organisation organisation = organisationRepo.getOrganizationDetail();
            JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream(files_path + "/reportUsers.jrxml"));
//            JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream("/home/ibrahim/JaspersoftWorkspace/MyReports/reportUsers.jrxml"));
            Map<String, Object> parameter = new HashMap<String, Object>();

            parameter.put("logo", logo);
            parameter.put("status",status);

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
