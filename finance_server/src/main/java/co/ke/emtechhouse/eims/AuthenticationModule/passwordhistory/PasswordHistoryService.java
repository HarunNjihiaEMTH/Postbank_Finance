package co.ke.emtechhouse.eims.AuthenticationModule.passwordhistory;
import co.ke.emtechhouse.eims.AuthenticationModule.repositories.UserRepository;
import co.ke.emtechhouse.eims.Finacle.utilities.Configurations;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.List;

@Service
@Slf4j
public class PasswordHistoryService {
    @Autowired
    private PasswordHistoryRepository passwordHistoryRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private Encryption encryption;

    Configurations cn = new Configurations();
    String key = cn.getProperties().getProperty("enc.key");
    String vector = cn.getProperties().getProperty("enc.initVector");

    //Add New Password History Record
    public String passwordHistoryValidation(String username,String password)
    {
        String status = "";
        //Encrypt
        String encryptedPassword = encryption.encrypt(key,vector,password);

        //Check if password exists in password history table
        List<PasswordHistory> checkPass = passwordHistoryRepository.findByEncryptedPasswordAndUsername(encryptedPassword,username);
        if(checkPass.size() > 0)
        {
            //Loop through list
            for(int i = 0; i<checkPass.size(); i++)
            {
                //Check if new password matches any password in the list from database
                if(encryptedPassword.equalsIgnoreCase(checkPass.get(i).getEncryptedPassword()))
                {
                    //Check difference between date password was captured and today's date
                    Date d1 = new Date();
                    Date d2 = checkPass.get(i).getCapturedOn();

                    // Calculate time difference
                    // in milliseconds
                    long difference_In_Time  = d1.getTime() - d2.getTime();

                    //in years
                    long difference_In_Years = (difference_In_Time / (1000L * 60 * 60 * 24 * 365));
                    log.info("Difference between "+d1 +" and "+d2 + " is { "+difference_In_Time+" ms }  { "+difference_In_Years+" Years }");

                    if(difference_In_Years >=1)
                    {
                        log.info("Password can be re-used { Last used "+difference_In_Years+" years ago }");
                        //Update encrypted password  & capturedOn date in password history table & update user password
                        PasswordHistory ph = checkPass.get(i);
                        ph.setCapturedOn(new Date());
                        ph.setEncryptedPassword(encryptedPassword);
                        passwordHistoryRepository.save(ph);
                        status = "000";
                    }
                    else
                    {
                        log.info("Password Cannot be re-used { Last used "+difference_In_Years + " years ago }");
                        status = "100";
                    }
                    break;
                }
            }
        }
        else
        {
            //Create new Password History Record
            PasswordHistory ph = new PasswordHistory();
            ph.setUsername(username);
            ph.setCapturedOn(new Date());
            ph.setEncryptedPassword(encryptedPassword);
            passwordHistoryRepository.save(ph);
            status = "000";
        }

        log.info("Status for password history check { "+status+" }");
        return status;
    }
}