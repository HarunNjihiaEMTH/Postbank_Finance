package co.ke.emtechhouse.eims.ReportService;

import co.ke.emtechhouse.eims.InvoiceComponent.Invoice;
import co.ke.emtechhouse.eims.InvoiceComponent.InvoiceRepo;
import co.ke.emtechhouse.eims.OrganisationComponent.Organisation;
import co.ke.emtechhouse.eims.OrganisationComponent.OrganisationRepo;
import co.ke.emtechhouse.eims.PurchaseOrderComponent.PurchaseOrder;
import co.ke.emtechhouse.eims.PurchaseOrderComponent.PurchaseOrderRepo;
import co.ke.emtechhouse.eims.ResponseMessage.EntityResponse;
import com.sun.istack.ByteArrayDataSource;
import lombok.extern.slf4j.Slf4j;
import net.sf.jasperreports.engine.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;

import javax.activation.DataSource;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
//@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/reports/email")
public class ReportMailService {
    @Value("${spring.datasource.url}")
    private String db;
    @Value("${spring.datasource.username}")
    private String username;
    @Value("${spring.datasource.password}")
    private String password;
    @Value("${reports_absolute_path}")
    private String files_path;
    @Value("${company_logo_path}")
    private String company_logo_path;
    @Value("${image_banner}")
    private String logo;
    @Value("${from_mail}")
    private String from_mail;

    @Value("${emailSalutation}")
    private String emailSalutation;
    @Value("${emailMessage}")
    private String emailMessage;
    @Value("${emailRemarks}")
    private String emailRemarks;
    @Value("${emailRegards}")
    private String emailRegards;
    @Value("${emailOrganizationName}")
    private String emailOrganizationName;
    @Value("${emailOrganizationPhone}")
    private String emailOrganizationPhone;
    @Value("${emailOrganizationMail}")
    private String emailOrganizationMail;
    @Value("${emailOrganizationAddress}")
    private String emailOrganizationAddress;
    @Value("${emailOrganizationLocation}")
    private String emailOrganizationLocation;
    @Value("${emailOrganizationWebsite}")
    private String emailOrganizationWebsite;
    private final JavaMailSender mailSender;
    @Autowired
    private PurchaseOrderRepo purchaseOrderRepo;
    @Autowired
    private InvoiceRepo invoiceRepo;
    @Autowired
    private OrganisationRepo organisationRepo;
    LocalDate currentDate= LocalDate.now();
    public ReportMailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @GetMapping("/purchase_order/")
    public ResponseEntity<?> sendPO(

            @RequestParam String supplier_email,
            @RequestParam String poNumber
    ) throws FileNotFoundException, JRException, SQLException, MessagingException {
        try {

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
            String toEmail = supplier_email;

            PurchaseOrder check = purchaseOrderRepo.getByPo_number(poNumber);
            if (check!=null){
                System.out.println("Po is there");
                    Connection connection = DriverManager.getConnection(this.db, this.username, this.password);
                JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream(files_path+"/po.jrxml"));
                    Map<String, Object> parameter = new HashMap<String, Object>();

                parameter.put("address",org_address);
                parameter.put("companyname",org_name);
                parameter.put("companyemail",org_companyemail);
                parameter.put("telephone",org_telephone);
                parameter.put("org_website",org_website);
                parameter.put("logo",logo);

                    parameter.put("po_number", poNumber);


                    JasperPrint report = JasperFillManager.fillReport(compileReport, parameter, connection);
                    ByteArrayOutputStream baos = new ByteArrayOutputStream();
                    JasperExportManager.exportReportToPdfStream(report, baos);
                    DataSource po = new ByteArrayDataSource(baos.toByteArray(), "application/pdf");

                    MimeMessage mimeMessage = mailSender.createMimeMessage();
                    MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
                    helper.setTo(toEmail);
                    helper.setFrom(from_mail);
                    helper.setSentDate(new Date());
                    helper.setSubject("ACCOUNT STATEMENT REPORT");
                    helper.setText(
                            "<!DOCTYPE html>\n" +
                                    "<html lang=\"en\" xmlns=\"http://www.w3.org/1999/xhtml\" xmlns:o=\"urn:schemas-microsoft-com:office:office\">\n" +
                                    "<head>\n" +
                                    "  <meta charset=\"utf-8\">\n" +
                                    "  <meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n" +
                                    "  <meta name=\"x-apple-disable-message-reformatting\">\n" +
                                    "  <title></title>\n" +
                                    "  <!--[if mso]>\n" +
                                    "  <style>\n" +
                                    "    table {border-collapse:collapse;border-spacing:0;border:none;margin:0; margin-top:10px;margin-bottom:10px;}\n" +
                                    "    div, td {padding:0;}\n" +
                                    "    div {margin:0 !important;}\n" +
                                    "  </style>\n" +
                                    "  <noscript>\n" +
                                    "    <xml>\n" +
                                    "      <o:OfficeDocumentSettings>\n" +
                                    "        <o:PixelsPerInch>96</o:PixelsPerInch>\n" +
                                    "      </o:OfficeDocumentSettings>\n" +
                                    "    </xml>\n" +
                                    "  </noscript>\n" +
                                    "  <![endif]-->\n" +
                                    "  <style>\n" +
                                    "    table, td, div, h1, p {\n" +
                                    "      font-family: Arial, sans-serif;\\n\"\n" +
                                    "    }\n" +
                                    "    @media screen and (max-width: 530px) {\n" +
                                    "      .unsub {\n" +
                                    "        display: block;\n" +
                                    "        padding: 8px;\n" +
                                    "        margin-top: 14px;\n" +
                                    "        border-radius: 6px;\n" +
                                    "        background-color: #555555;\n" +
                                    "        text-decoration: none !important;\n" +
                                    "        font-weight: bold;\n" +
                                    "      }\n" +
                                    "      .col-lge {\n" +
                                    "        max-width: 100% !important;\n" +
                                    "      }\n" +
                                    "    }\n" +
                                    "    @media screen and (min-width: 531px) {\n" +
                                    "      .col-sml {\n" +
                                    "        max-width: 27% !important;\n" +
                                    "      }\n" +
                                    "      .col-lge {\n" +
                                    "        max-width: 73% !important;\n" +
                                    "      }\n" +
                                    "    }\n" +
                                    "  </style>\n" +
                                    "</head>\n" +
                                    "<body style=\" margin-top:10px; margin-bottom:10px; margin:0;padding:0;word-spacing:normal;background-color: #566fff;\">\n" +
//                            "  <div role=\"article\" aria-roledescription=\"email\" lang=\"en\" style=\"text-size-adjust:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;background-color:#939297;\">\n" +
                                    "  <div role=\"article\" aria-roledescription=\"email\" lang=\"en\" style=\"text-size-adjust:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;background-color:#566fff;\">\n" +
                                    "    <table role=\"presentation\" style=\"width:100%; padding-top: 10px; padding-bottom: 10px; border:none;border-spacing:0;\">\n" +
                                    "      <tr>\n" +
                                    "        <td align=\"center\" style=\"padding:0;\">\n" +
                                    "          <!--[if mso]>\n" +
                                    "          <table role=\"presentation\" align=\"center\" style=\"width:600px; margin-top: 10px; margin-bottom: 10px;\">\n" +
                                    "          <tr>\n" +
                                    "          <td>\n" +
                                    "          <![endif]-->\n" +
                                    "          <table role=\"presentation\" style=\"width:94%;max-width:600px;border:none;border-spacing:0;text-align:left;font-family:Arial,sans-serif;font-size:16px;line-height:22px;color:#363636;\">\n" +
                                    "              <td style=\"padding:5px;text-align:center;font-size:12px;background-color:#ffffff;\">\n" +
                                    "                <a href=\"http://www.example.com/\" style=\"text-decoration:none;\"><img src='cid:companyLogo' alt=\"Logo\" style=\"width:20%; text-align:center; margin:auto; height:auto;border:none;text-decoration:none;color:#ffffff;\"></a>\n" +
                                    "                <hr>\n" +
                                    "              </td>\n" +
                                    "            <tr>\n" +
                                    "              <td style=\"padding:30px;background-color:#ffffff;\">\n" +
                                    "                 <h1 style=\"margin-top:0;margin-bottom:16px;font-size:26px;line-height:32px;font-weight:bold;letter-spacing:-0.02em;\">"+  emailSalutation +"</h1>\n" +
                                    "                    </p>\n" +
                                    "                   <p style=\"margin:0;\">\n" + "Find the attached Purchase Order"+"\n" +
                                    "                   <p style=\"margin:0;\">\n" + emailRemarks +"\n" +
                                    "                    </p>\n" +
                                    "                    </p>\n" +
                                    "                   <br>\n" +
                                    "                   <br>\n" +
                                    "                   <br>\n" +
                                    "                   <p style=\"margin:0;\">\n" + emailRegards + "\n" +
                                    "                    </p>\n" +
                                    "                   <p style=\"margin:0;\">\n" + emailOrganizationName + "\n" +
                                    "                    </p>\n" +
                                    "                   <p style=\"margin:0;\">\n"+  "<b>Tel/Phone: </b> "+ emailOrganizationPhone +"\n" +
                                    "                    </p>\n" +
                                    "                   <p style=\"margin:0;\">\n" + "<b>Email: </b> " + emailOrganizationMail + "\n" +
                                    "                    </p>\n" +
                                    "                   <p style=\"margin:0;\">\n" + "<b>Address: </b> " + emailOrganizationAddress + "\n" +
                                    "                    </p>\n" +
                                    "                   <p style=\"margin:0;\">\n" + "<b>Location: </b> " + emailOrganizationLocation + "\n" +
                                    "                    </p>\n" +
                                    "                   <p style=\"margin:0;\">\n" + "<b>Website: </b> " + emailOrganizationWebsite + "\n" +
                                    "                    </p>\n" +
                                    "              </td>\n" +
                                    "            </tr>\n" +
                                    "              <td style=\"padding:0px; margin-bottom: 0px;text-align:center;font-size:12px;background-color:#ffffff;\">\n" +
                                    "                       <img src='cid:rightSideImage' style='width:100%;'/>"  +
                                    "              </td>\n" +
                                    "              <td style=\"padding:0px; margin-bottom: 0px;text-align:center;font-size:12px;background-color:#ffffff;\">\n" +
                                    "              </td>\n" +
                                    "            <tr>\n" +
                                    "            </tr>\n" +
                                    "           \n" +
                                    "            <tr>\n" +
                                    "              <td style=\"padding:30px;text-align:center;font-size:12px;background-color:#001c27;color:#cccccc;\">\n" +
                                    "              <p style=\"margin:0;font-size:14px;line-height:20px;\">&reg; copyright 2021<br></p>\n" +
                                    "              </td>\n" +
                                    "            </tr>\n" +
                                    "          </table>\n" +
                                    "          <!--[if mso]>\n" +
                                    "          </td>\n" +
                                    "          </tr>\n" +
                                    "          </table>\n" +
                                    "          <![endif]-->\n" +
                                    "        </td>\n" +
                                    "      </tr>\n" +
                                    "    </table>\n" +
                                         "  </div>\n" +
                                    "</body>\n" +
                                    "</html>", true);
                    helper.addInline("companyLogo",
                            new File(logo));
//                    helper.addInline("rightSideImage",
//                            new File(banner_path));
                    helper.addAttachment("purchase_order.pdf", po);
                    mailSender.send(mimeMessage);
                    log.info("Sent successfully to: {}", toEmail);
            }else{
                EntityResponse response =  new EntityResponse();
                response.setStatusCode(400);
                response.setMessage("Data Not Found");
                response.setEntity("");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }

        } catch (Exception e) {
            log.info("Generate Employee Salary Report Error {}"+e);
        }
        return null;
    }

    @GetMapping("/invoice/")
    public ResponseEntity<?> cifoExecutives(String toEmail, String Status, String fromDate, String toDate) throws FileNotFoundException, JRException, SQLException, MessagingException {
        try {
            List<Invoice> check = invoiceRepo.checkInvoiceifExist(Status, fromDate, toDate);
            if (check.size() > 0){
                Connection connection = DriverManager.getConnection(this.db, this.username, this.password);
                JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream(files_path+"/cifReport.jrxml"));
                Map<String, Object> parameter = new HashMap<String, Object>();
                parameter.put("Status", Status);
                parameter.put("fromDate", fromDate);
                parameter.put("toDate", toDate);
                JasperPrint report = JasperFillManager.fillReport(compileReport, parameter, connection);
                ByteArrayOutputStream baos = new ByteArrayOutputStream();
                JasperExportManager.exportReportToPdfStream(report, baos);
                DataSource accountreport = new ByteArrayDataSource(baos.toByteArray(), "application/pdf");

                MimeMessage mimeMessage = mailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
                helper.setTo(toEmail);
                helper.setFrom(from_mail);
                helper.setSubject("ACCOUNT STATEMENT REPORT");
                helper.setText(
                        "<!DOCTYPE html>\n" +
                                "<html lang=\"en\" xmlns=\"http://www.w3.org/1999/xhtml\" xmlns:o=\"urn:schemas-microsoft-com:office:office\">\n" +
                                "<head>\n" +
                                "  <meta charset=\"utf-8\">\n" +
                                "  <meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n" +
                                "  <meta name=\"x-apple-disable-message-reformatting\">\n" +
                                "  <title></title>\n" +
                                "  <!--[if mso]>\n" +
                                "  <style>\n" +
                                "    table {border-collapse:collapse;border-spacing:0;border:none;margin:0; margin-top:10px;margin-bottom:10px;}\n" +
                                "    div, td {padding:0;}\n" +
                                "    div {margin:0 !important;}\n" +
                                "  </style>\n" +
                                "  <noscript>\n" +
                                "    <xml>\n" +
                                "      <o:OfficeDocumentSettings>\n" +
                                "        <o:PixelsPerInch>96</o:PixelsPerInch>\n" +
                                "      </o:OfficeDocumentSettings>\n" +
                                "    </xml>\n" +
                                "  </noscript>\n" +
                                "  <![endif]-->\n" +
                                "  <style>\n" +
                                "    table, td, div, h1, p {\n" +
                                "      font-family: Arial, sans-serif;\\n\"\n" +
                                "    }\n" +
                                "    @media screen and (max-width: 530px) {\n" +
                                "      .unsub {\n" +
                                "        display: block;\n" +
                                "        padding: 8px;\n" +
                                "        margin-top: 14px;\n" +
                                "        border-radius: 6px;\n" +
                                "        background-color: #555555;\n" +
                                "        text-decoration: none !important;\n" +
                                "        font-weight: bold;\n" +
                                "      }\n" +
                                "      .col-lge {\n" +
                                "        max-width: 100% !important;\n" +
                                "      }\n" +
                                "    }\n" +
                                "    @media screen and (min-width: 531px) {\n" +
                                "      .col-sml {\n" +
                                "        max-width: 27% !important;\n" +
                                "      }\n" +
                                "      .col-lge {\n" +
                                "        max-width: 73% !important;\n" +
                                "      }\n" +
                                "    }\n" +
                                "  </style>\n" +
                                "</head>\n" +
                                "<body style=\" margin-top:10px; margin-bottom:10px; margin:0;padding:0;word-spacing:normal;background-color: #566fff;\">\n" +
//                            "  <div role=\"article\" aria-roledescription=\"email\" lang=\"en\" style=\"text-size-adjust:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;background-color:#939297;\">\n" +
                                "  <div role=\"article\" aria-roledescription=\"email\" lang=\"en\" style=\"text-size-adjust:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;background-color:#566fff;\">\n" +
                                "    <table role=\"presentation\" style=\"width:100%; padding-top: 10px; padding-bottom: 10px; border:none;border-spacing:0;\">\n" +
                                "      <tr>\n" +
                                "        <td align=\"center\" style=\"padding:0;\">\n" +
                                "          <!--[if mso]>\n" +
                                "          <table role=\"presentation\" align=\"center\" style=\"width:600px; margin-top: 10px; margin-bottom: 10px;\">\n" +
                                "          <tr>\n" +
                                "          <td>\n" +
                                "          <![endif]-->\n" +
                                "          <table role=\"presentation\" style=\"width:94%;max-width:600px;border:none;border-spacing:0;text-align:left;font-family:Arial,sans-serif;font-size:16px;line-height:22px;color:#363636;\">\n" +
                                "              <td style=\"padding:5px;text-align:center;font-size:12px;background-color:#ffffff;\">\n" +
                                "                <a href=\"http://www.example.com/\" style=\"text-decoration:none;\"><img src='cid:companyLogo' alt=\"Logo\" style=\"width:20%; text-align:center; margin:auto; height:auto;border:none;text-decoration:none;color:#ffffff;\"></a>\n" +
                                "                <hr>\n" +
                                "              </td>\n" +
                                "            <tr>\n" +
                                "              <td style=\"padding:30px;background-color:#ffffff;\">\n" +
                                "                 <h1 style=\"margin-top:0;margin-bottom:16px;font-size:26px;line-height:32px;font-weight:bold;letter-spacing:-0.02em;\">"+  emailSalutation +"</h1>\n" +
                                "                    </p>\n" +
                                "                   <p style=\"margin:0;\">\n" + "Find the attached consolidate statement for the" +Status +"accounts"+"\n" +
                                "                   <p style=\"margin:0;\">\n" + emailRemarks +"\n" +
                                "                    </p>\n" +
                                "                    </p>\n" +
                                "                   <br>\n" +
                                "                   <br>\n" +
                                "                   <br>\n" +
                                "                   <p style=\"margin:0;\">\n" + emailRegards + "\n" +
                                "                    </p>\n" +
                                "                   <p style=\"margin:0;\">\n" + emailOrganizationName + "\n" +
                                "                    </p>\n" +
                                "                   <p style=\"margin:0;\">\n"+  "<b>Tel/Phone: </b> "+ emailOrganizationPhone +"\n" +
                                "                    </p>\n" +
                                "                   <p style=\"margin:0;\">\n" + "<b>Email: </b> " + emailOrganizationMail + "\n" +
                                "                    </p>\n" +
                                "                   <p style=\"margin:0;\">\n" + "<b>Address: </b> " + emailOrganizationAddress + "\n" +
                                "                    </p>\n" +
                                "                   <p style=\"margin:0;\">\n" + "<b>Location: </b> " + emailOrganizationLocation + "\n" +
                                "                    </p>\n" +
                                "                   <p style=\"margin:0;\">\n" + "<b>Website: </b> " + emailOrganizationWebsite + "\n" +
                                "                    </p>\n" +
                                "              </td>\n" +
                                "            </tr>\n" +
                                "              <td style=\"padding:0px; margin-bottom: 0px;text-align:center;font-size:12px;background-color:#ffffff;\">\n" +
                                "                       <img src='cid:rightSideImage' style='width:100%;'/>"  +
                                "              </td>\n" +
                                "              <td style=\"padding:0px; margin-bottom: 0px;text-align:center;font-size:12px;background-color:#ffffff;\">\n" +
                                "              </td>\n" +
                                "            <tr>\n" +
                                "            </tr>\n" +
                                "           \n" +
                                "            <tr>\n" +
                                "              <td style=\"padding:30px;text-align:center;font-size:12px;background-color:#001c27;color:#cccccc;\">\n" +
                                "              <p style=\"margin:0;font-size:14px;line-height:20px;\">&reg; copyright 2021<br></p>\n" +
                                "              </td>\n" +
                                "            </tr>\n" +
                                "          </table>\n" +
                                "          <!--[if mso]>\n" +
                                "          </td>\n" +
                                "          </tr>\n" +
                                "          </table>\n" +
                                "          <![endif]-->\n" +
                                "        </td>\n" +
                                "      </tr>\n" +
                                "    </table>\n" +
                                "  </div>\n" +
                                "</body>\n" +
                                "</html>", true);
                helper.addInline("companyLogo",
                        new File(logo));
//                helper.addInline("rightSideImage",
//                        new File(banner_path));
                helper.addAttachment("Account_statement.pdf", accountreport);
                mailSender.send(mimeMessage);
                log.info("Sent successfully,sent to: {}", toEmail);
            }else{
                EntityResponse response =  new EntityResponse();
                response.setStatusCode(400);
                response.setMessage("Data Not Found");
                response.setEntity("");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }

        } catch (Exception e) {
            log.info("Generate Employee Salary Report Error {}"+e);
        }
        return null;
    }


}
