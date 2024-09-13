package co.ke.emtechhouse.eims.TransactionComponent.FinacleService;

import co.ke.emtechhouse.eims.Finacle.utilities.Configurations;
import co.ke.emtechhouse.eims.Utils.DisableVerificationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

@Service
@Slf4j
public class SaveSuccessfulTransactionInFinacleDB {
    @Autowired
    DisableVerificationService disableVerification;
    Configurations cn = new Configurations();
    public void sendRequestToFinacleToSaveSuccessfulTransaction(String tranId,String tranDate,String userId)
    {
        log.info("Sending Request to Finacle To Save Successful Transaction At "+new Date());
        String date = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS").format(new Date());
        String url = cn.getProperties().getProperty("fin.url");
        try {
            URL obj = new URL(url);
            disableVerification.disableSSlVerification();
            HttpURLConnection con = (HttpURLConnection) obj.openConnection();
            con.setRequestMethod("POST");
            String randomUUID = UUID.randomUUID().toString();
            con.setRequestProperty("Content-Type", "application/soap+xml; charset=utf-8");
            String requestxml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
                    "<FIXML xsi:schemaLocation=\"http://www.finacle.com/fixml executeFinacleScript.xsd\" xmlns=\"http://www.finacle.com/fixml\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"><Header>\n" +
                    "<RequestHeader>\n" +
                    "<MessageKey>\n" +
                    "<RequestUUID>"+randomUUID+"</RequestUUID>\n" +
                    "<ServiceRequestId>executeFinacleScript</ServiceRequestId>\n" +
                    "<ServiceRequestVersion>10.2</ServiceRequestVersion>\n" +
                    "<ChannelId>COR</ChannelId>\n" +
                    "<LanguageId></LanguageId>\n" +
                    "</MessageKey>\n" +
                    "<RequestMessageInfo>\n" +
                    "<BankId></BankId>\n" +
                    "<TimeZone></TimeZone>\n" +
                    "<EntityId></EntityId>\n" +
                    "<EntityType></EntityType>\n" +
                    "<ArmCorrelationId></ArmCorrelationId>\n" +
                    "<MessageDateTime>"+date+"</MessageDateTime>\n" +
                    "</RequestMessageInfo>\n" +
                    "<Security>\n" +
                    "<Token>\n" +
                    "<PasswordToken>\n" +
                    "<UserId></UserId>\n" +
                    "<Password></Password>\n" +
                    "</PasswordToken>\n" +
                    "</Token>\n" +
                    "<FICertToken></FICertToken>\n" +
                    "<RealUserLoginSessionId></RealUserLoginSessionId>\n" +
                    "<RealUser></RealUser>\n" +
                    "<RealUserPwd></RealUserPwd>\n" +
                    "<SSOTransferToken></SSOTransferToken>\n" +
                    "</Security>\n" +
                    "</RequestHeader>\n" +
                    "</Header>\n" +
                    "<Body>\n" +
                    "<executeFinacleScriptRequest>\n" +
                    "<ExecuteFinacleScriptInputVO>\n" +
                    "<requestId>emtechSystemTran.scr</requestId>\n" +
                    "</ExecuteFinacleScriptInputVO>\n" +
                    "<executeFinacleScript_CustomData>\n" +
                    "<tranId>"+tranId+"</tranId>\n" +
                    "<tranDate>"+tranDate+"</tranDate>\n" +
                    "<userId>"+userId+"</userId>\n" +
                    "</executeFinacleScript_CustomData>\n" +
                    "</executeFinacleScriptRequest>\n" +
                    "</Body>\n" +
                    "</FIXML>";
            con.setDoOutput(true);
            try (DataOutputStream wr = new DataOutputStream(con.getOutputStream())) {
                wr.writeBytes(requestxml);
                wr.flush();
            }
            String responseStatus = con.getResponseMessage();
            log.info(responseStatus+"\n"+con.getResponseCode());
            StringBuffer response;
            try (BufferedReader in = new BufferedReader(new InputStreamReader(
                    con.getInputStream()))) {
                String inputLine;
                response = new StringBuffer();
                while ((inputLine = in.readLine()) != null) {
                    response.append(inputLine);
                }
            }
            String responsexml = response.toString();
            log.info("Successful Transaction Saving Response");
            log.info(responsexml);
        }
        catch (Exception e)
        {
            log.info("Error Saving Transaction in Finacle - "+e.getLocalizedMessage());
        }
    }
}
