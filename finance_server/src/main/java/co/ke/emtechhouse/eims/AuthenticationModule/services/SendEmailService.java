/*
 * Copyright (c) 2022. Omukubwa Software Solutions (OSS)
 */

package co.ke.emtechhouse.eims.AuthenticationModule.services;

import co.ke.emtechhouse.eims.AuthenticationModule.repositories.ResetPasswordRepository;
import co.ke.emtechhouse.eims.AuthenticationModule.utilities.SendCredentialToMail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.mail.MessagingException;
import java.io.IOException;

@Service
public class SendEmailService {

    @Autowired
    private ResetPasswordRepository passwordRepository;

    //Instance of single email class
    SendCredentialToMail ssm = new SendCredentialToMail();


    //Send Password token and link to user email
    public void sendTokenAndURL(String emailaddress,int token) throws MessagingException, IOException {
        ssm.sendPassWordReset(emailaddress,token);
    }
}
