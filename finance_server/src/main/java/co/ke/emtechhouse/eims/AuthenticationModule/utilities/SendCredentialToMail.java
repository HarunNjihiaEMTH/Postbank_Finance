package co.ke.emtechhouse.eims.AuthenticationModule.utilities;

import co.ke.emtechhouse.eims.Finacle.utilities.Configurations;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.MimeMessage;
import java.io.File;
import java.io.IOException;
import java.util.Calendar;
import java.util.Properties;

@Service
public class SendCredentialToMail {
    //Instance of the configuration class
    static Configurations c = new Configurations();
    static String host = c.getProperties().getProperty("fams.email.host");
    static String port = c.getProperties().getProperty("fams.email.port");
    static String password = c.getProperties().getProperty("fams.email.password");
    static String subject = c.getProperties().getProperty("fams.email.subject");
    static String subject1 = c.getProperties().getProperty("fams.email.subject1");
    static String sender = c.getProperties().getProperty("fams.email.sender");
    static String greetings = c.getProperties().getProperty("fams.email.greetings");
    static String signoff = c.getProperties().getProperty("fams.email.signoff");
    static String body0 = c.getProperties().getProperty("fams.email.body0");
    static String body1 = c.getProperties().getProperty("fams.email.body1");
    static String body2 = c.getProperties().getProperty("fams.email.body2");
    static String body3 = c.getProperties().getProperty("fams.email.body3");
    static String body4 = c.getProperties().getProperty("fams.email.body4");
    static String body5 = c.getProperties().getProperty("fams.email.body5");
    static String body6 = c.getProperties().getProperty("fams.email.body6");
    static String reseturl = c.getProperties().getProperty("fams.token.url");

    //Current Year
    static int year = Calendar.getInstance().get(Calendar.YEAR);

    //Company logo path
    static String company_logo_path = c.getProperties().getProperty("ebm.images.logo");

    //Banner logo path
    static String banner_path = c.getProperties().getProperty("ebm.images.banner");

    public void sendOneMail(String recipient,String uname,String pass) throws MessagingException, IOException {
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", host);
        props.put("mail.smtp.port", port);

        Session session = Session.getInstance(props, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(sender, password);
            }});

        MimeMessage message = new MimeMessage(session);
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(recipient);
        helper.setFrom(sender);
        helper.setSubject(subject);
        helper.setText("<!DOCTYPE html>\n" +
                "<html lang=\"en\" xmlns=\"http://www.w3.org/1999/xhtml\" xmlns:o=\"urn:schemas-microsoft-com:office:office\">\n" +
                "<head>\n" +
                "  <meta charset=\"utf-8\">\n" +
                "  <meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n" +
                "  <meta name=\"x-apple-disable-message-reformatting\">\n" +
                "  <title></title>\n" +
                "  <!--[if mso]>\n" +
                "  <style>\n" +
                "    table {border-collapse:collapse;border-spacing:0;border:none;margin:0;}\n" +
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
                "<body style=\"margin:0;padding:0;word-spacing:normal;background-color: #566fff;\">\n" +
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
                "                 <h2 style=\"margin-top:0;margin-bottom:16px;font-size:26px;line-height:32px;font-weight:bold;letter-spacing:-0.02em;\">"+  subject +"</h2>\n" + greetings+body1+uname+body2+pass+signoff+
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
                "              <p style=\"margin:0;font-size:14px;line-height:20px;\"> &copy;<b>Copyright "+year+".</b><br></p>\n" +
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

        helper.addInline("companyLogo",new File(company_logo_path));
        helper.addInline("rightSideImage", new File(banner_path));
        //helper.addAttachment("Commited_Salary_Report.pdf", commitedsalaryreport);
        Transport.send(message);

        System.out.println("Mail Sent successfully to :\n"+recipient);
    }
    public void sendOTP(String recipient,String otp) throws MessagingException, IOException {
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", host);
        props.put("mail.smtp.port", port);

        Session session = Session.getInstance(props, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(sender, password);
            }});

        subject = "Your OTP Code";
        signoff = "Kindly enter this otp to complete the sign-in process. Subjected to 5 Min expiry!";

        MimeMessage message = new MimeMessage(session);
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(recipient);
        helper.setFrom(sender);
        helper.setSubject(subject);
        helper.setText("<!DOCTYPE html>\n" +
                "<html lang=\"en\" xmlns=\"http://www.w3.org/1999/xhtml\" xmlns:o=\"urn:schemas-microsoft-com:office:office\">\n" +
                "<head>\n" +
                "  <meta charset=\"utf-8\">\n" +
                "  <meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n" +
                "  <meta name=\"x-apple-disable-message-reformatting\">\n" +
                "  <title></title>\n" +
                "  <!--[if mso]>\n" +
                "  <style>\n" +
                "    table {border-collapse:collapse;border-spacing:0;border:none;margin:0;}\n" +
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
                "<body style=\"margin:0;padding:0;word-spacing:normal;background-color: #566fff;\">\n" +
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
                "                 <h2 style=\"margin-top:0;margin-bottom:16px;font-size:26px;line-height:32px;font-weight:bold;letter-spacing:-0.02em;\">"+  subject +"</h2>\n" + greetings+body0+otp+signoff+
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
                "              <p style=\"margin:0;font-size:14px;line-height:20px;\"> &copy;<b>Copyright "+year+".</b><br></p>\n" +
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
        helper.addInline("companyLogo",new File(company_logo_path));
        helper.addInline("rightSideImage", new File(banner_path));
        //helper.addAttachment("Commited_Salary_Report.pdf", commitedsalaryreport);
        Transport.send(message);

        System.out.println("Mail Sent successfully to :\n"+recipient);
    }



    //Send Password reset details
    public void sendPassWordReset(String recipient,int token) throws MessagingException, IOException {
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", host);
        props.put("mail.smtp.port", port);

        Session session = Session.getInstance(props, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(sender, password);
            }});

        MimeMessage message = new MimeMessage(session);
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(recipient);
        helper.setFrom(sender);
        helper.setSubject(subject);
        helper.setText("<!DOCTYPE html>\n" +
                "<html lang=\"en\" xmlns=\"http://www.w3.org/1999/xhtml\" xmlns:o=\"urn:schemas-microsoft-com:office:office\">\n" +
                "<head>\n" +
                "  <meta charset=\"utf-8\">\n" +
                "  <meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n" +
                "  <meta name=\"x-apple-disable-message-reformatting\">\n" +
                "  <title></title>\n" +
                "  <!--[if mso]>\n" +
                "  <style>\n" +
                "    table {border-collapse:collapse;border-spacing:0;border:none;margin:0;}\n" +
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
                "<body style=\"margin:0;padding:0;word-spacing:normal;background-color: #566fff;\">\n" +
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
                "                 <h2 style=\"margin-top:0;margin-bottom:16px;font-size:26px;line-height:32px;font-weight:bold;letter-spacing:-0.02em;\">"+  subject +"</h2>\n" + greetings+body3+token+body4+reseturl+body5+reseturl+body6+signoff+
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
                "              <p style=\"margin:0;font-size:14px;line-height:20px;\"> &copy;<b>Copyright "+year+".</b><br></p>\n" +
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
        helper.addInline("companyLogo",new File(company_logo_path));
        helper.addInline("rightSideImage", new File(banner_path));
        //helper.addAttachment("Commited_Salary_Report.pdf", commitedsalaryreport);
        Transport.send(message);

        System.out.println("Mail Sent successfully to :\n"+recipient);
    }

    public void PasswordReset(String recipient,String reqmessage) throws MessagingException, IOException {
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", host);
        props.put("mail.smtp.port", port);

        Session session = Session.getInstance(props, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(sender, password);
            }});

        MimeMessage message = new MimeMessage(session);
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(recipient);
        helper.setFrom(sender);
        helper.setSubject(subject);
        helper.setText("<!DOCTYPE html>\n" +
                "<html lang=\"en\" xmlns=\"http://www.w3.org/1999/xhtml\" xmlns:o=\"urn:schemas-microsoft-com:office:office\">\n" +
                "<head>\n" +
                "  <meta charset=\"utf-8\">\n" +
                "  <meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n" +
                "  <meta name=\"x-apple-disable-message-reformatting\">\n" +
                "  <title></title>\n" +
                "  <!--[if mso]>\n" +
                "  <style>\n" +
                "    table {border-collapse:collapse;border-spacing:0;border:none;margin:0;}\n" +
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
                "<body style=\"margin:0;padding:0;word-spacing:normal;background-color: #566fff;\">\n" +
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
                "                 <h2 style=\"margin-top:0;margin-bottom:16px;font-size:26px;line-height:32px;font-weight:bold;letter-spacing:-0.02em;\">"+  subject +"</h2>\n" + reqmessage +
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
                "              <p style=\"margin:0;font-size:14px;line-height:20px;\"> &copy;<b>Copyright "+year+".</b><br></p>\n" +
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
        helper.addInline("companyLogo",new File(company_logo_path));
        helper.addInline("rightSideImage", new File(banner_path));
        //helper.addAttachment("Commited_Salary_Report.pdf", commitedsalaryreport);
        Transport.send(message);

        System.out.println("Mail Sent successfully to :\n"+recipient);
    }


}
