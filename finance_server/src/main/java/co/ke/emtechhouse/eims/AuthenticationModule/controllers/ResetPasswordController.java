/*
 * Copyright (c) 2022. Omukubwa Software Solutions (OSS)
 */

package co.ke.emtechhouse.eims.AuthenticationModule.controllers;

import co.ke.emtechhouse.eims.AuthenticationModule.payload.ChangePassword;
import co.ke.emtechhouse.eims.AuthenticationModule.payload.MessageResponse;
import co.ke.emtechhouse.eims.AuthenticationModule.payload.ResetPassword;
import co.ke.emtechhouse.eims.AuthenticationModule.repositories.AuditingRepository;
import co.ke.emtechhouse.eims.AuthenticationModule.repositories.ResetPasswordRepository;
import co.ke.emtechhouse.eims.AuthenticationModule.repositories.UserRepository;
import co.ke.emtechhouse.eims.AuthenticationModule.services.SendEmailService;
import co.ke.emtechhouse.eims.AuthenticationModule.utilities.ToolKit;
import co.ke.emtechhouse.eims.Finacle.utilities.Configurations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.validation.Valid;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Date;

//@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/soa/reset")
public class ResetPasswordController {

    @Autowired
    AuditingRepository auditingRepository;

    @Autowired
    AuditTrailsController auditTrailsController;

    @Autowired
    SendEmailService mailService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ResetPasswordRepository resetPasswordRepository;

    @Autowired
    PasswordEncoder encoder;

    //Instance of ToolKit Class
    ToolKit tk = new ToolKit();

    Configurations cn = new Configurations();

    @Autowired
    AuthenticationManager authenticationManager;

    DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
    LocalDateTime now = LocalDateTime.now();
    String modified_on = dtf.format(now);

    //Send Password Reset Link and Token
    @PostMapping("/send-token/{emailaddress}")
    public ResponseEntity<?> sendPasswordResetToken(@Valid @PathVariable("emailaddress") String emailaddress) throws MessagingException, IOException {
        Calendar cal = Calendar.getInstance();
        int currhr = cal.get(Calendar.HOUR_OF_DAY);
        ResetPassword rp = new ResetPassword();
        Date date = new Date();
        java.sql.Date sqlDate = new java.sql.Date(date.getTime());
        int token = tk.generatePassRessetToken();

        //Validity of the token
        int validity = Integer.parseInt(cn.getProperties().getProperty("fams.token.validity"));

        //Check if the user is registered
        if(!userRepository.existsByEmail(emailaddress))
        {
            return ResponseEntity.badRequest().body(new MessageResponse("Account Not Found! Kindly Request for an Account from the Admin!"));
        }

        //Check if there is a record in reset password table
        int count = resetPasswordRepository.countRecords(emailaddress);

        if(count > 0) {
            //Request Hour
            int reqhr = resetPasswordRepository.getRequestHr(emailaddress);


            //Get time difference
            int time_difference = currhr - reqhr;

            if(time_difference >= validity || time_difference <= -validity)
            {
                resetPasswordRepository.UpdateResetCode(emailaddress,currhr,token,sqlDate);
                mailService.sendTokenAndURL(emailaddress,token);
                return ResponseEntity.ok(new MessageResponse("Password Reset Code Sent Successfully!"));
            }
            else
            {
                return ResponseEntity.ok(new MessageResponse("Check Your email.Password Reset Code was sent and it is still valid!"));
            }
        }
        else
        {
            rp.setCode(token);
            rp.setEmailaddress(emailaddress);
            rp.setStatus("N");
            rp.setRequesthr(currhr);
            rp.setDate(sqlDate);

            //Save to DB
            resetPasswordRepository.save(rp);

            //Send Password reset link and token to user email
            mailService.sendTokenAndURL(rp.getEmailaddress(),rp.getCode());
        }

        auditTrailsController.addAudit("Reset Password");
        return ResponseEntity.ok(new MessageResponse("Sent Successfully!"));
    }

    //Reset Password
    @PostMapping("/change-password")
    private ResponseEntity<?> changePassword(@Valid @RequestBody ChangePassword changePassword)
    {
        //Check Code Status
        if(resetPasswordRepository.getCodeStatus(changePassword.getEmailaddress()) >=1) {
            //Select username
            String username = userRepository.getUsernameUsingEmail(changePassword.getEmailaddress());

            //Select Token from token table
            int token = resetPasswordRepository.getToken(changePassword.getEmailaddress());

            //Check token validity
            if (token == changePassword.getToken()) {

                //Validity of the token
                int validity = Integer.parseInt(cn.getProperties().getProperty("fams.token.validity"));

                Calendar cal = Calendar.getInstance();
                int currhr = cal.get(Calendar.HOUR_OF_DAY);

                Date date = new Date();
                java.sql.Date sqlDate = new java.sql.Date(date.getTime());

                //Request Hour
                int reqhr = resetPasswordRepository.getRequestHr(changePassword.getEmailaddress());

                //Get time difference
                int time_difference = currhr - reqhr;

                if (time_difference < validity || time_difference > -validity) {
                    //Update Password
                    userRepository.userChangePassword(encoder.encode(changePassword.getPassword()), modified_on, username, changePassword.getEmailaddress());

                    //Update status in reset password table
                    String id = resetPasswordRepository.getEmailId(changePassword.getToken(), changePassword.getEmailaddress());
                    resetPasswordRepository.updateEmailStatus("Y", id);

                } else {
                    return ResponseEntity.ok(new MessageResponse("Token Expired! Request Another token!"));
                }
            } else {
                return ResponseEntity.ok(new MessageResponse("Invalid Token!"));
            }
        }

        else
        {
            return ResponseEntity.ok(new MessageResponse("No Valid Token Found.Kindly request another token!"));
        }

        auditTrailsController.addAudit("Update Password");
        return ResponseEntity.ok(new MessageResponse("Password Updated Successfully!"));
    }
}
