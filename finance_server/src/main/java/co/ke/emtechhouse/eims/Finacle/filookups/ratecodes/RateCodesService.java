package co.ke.emtechhouse.eims.Finacle.filookups.ratecodes;

import co.ke.emtechhouse.eims.Finacle.utilities.Configurations;
import co.ke.emtechhouse.eims.Utils.Utils;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.Unmarshaller;
import javax.xml.transform.Source;
import javax.xml.transform.stream.StreamSource;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.io.StringReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
public class RateCodesService {
    Utils utils = new Utils();
    Configurations cn = new Configurations();
    String url = cn.getProperties().getProperty("fin.url");

    //Fetch Rate Codes
    public String getRateCodesList()
    {
        String date = new SimpleDateFormat("YYYY-MM-dd'T'HH:mm:ss.SSS").format(new Date());
        String requestId = UUID.randomUUID().toString();

        String requestXml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
                "<FIXML xsi:schemaLocation=\"http://www.finacle.com/fixml executeFinacleScript.xsd\" xmlns=\"http://www.finacle.com/fixml\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"><Header>\n" +
                "<RequestHeader>\n" +
                "<MessageKey>\n" +
                "<RequestUUID>"+requestId+"</RequestUUID>\n" +
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
                "<RateCodesBody>\n" +
                "<executeFinacleScriptRequest>\n" +
                "<ExecuteFinacleScriptInputVO>\n" +
                "<requestId>rateCode_list_HR.scr</requestId>\n" +
                "</ExecuteFinacleScriptInputVO>\n" +
                "<executeFinacleScript_CustomData>\n" +
                "<bank_id>01</bank_id>\n" +
                "</executeFinacleScript_CustomData>\n" +
                "</executeFinacleScriptRequest>\n" +
                "</RateCodesBody>\n" +
                "</FIXML>";

        log.info("URL - "+url);
        log.info(requestXml);
        try {
            URL obj = new URL(url);
            utils.disableSSlVerification();
            HttpURLConnection con = (HttpURLConnection) obj.openConnection();
            con.setRequestMethod("POST");
            con.setRequestProperty("Content-Type", "application/soap+xml; charset=utf-8");

            con.setDoOutput(true);

            try (DataOutputStream wr = new DataOutputStream(con.getOutputStream())) {
                wr.writeBytes(requestXml);
                wr.flush();
            }
            String responseStatus = con.getResponseMessage();
            System.out.println(responseStatus);
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
            log.info("RESPONSE FOR RATE CODES \n"+responsexml);

            responsexml = responsexml.replaceAll("rateCode_[0-9]+", "rateCode");
            responsexml = responsexml.replaceAll("rateDesc_[0-9]+", "rateDesc");

            int index1 = 0;
            int index2 = 0;

            if(responsexml.contains("<executeFinacleScript_CustomData>"))
            {
                index1 = responsexml.indexOf("<executeFinacleScript_CustomData>");
                index1 = index1+33;
            }

            if(responsexml.contains("</executeFinacleScript_CustomData>"))
            {
                index2 = responsexml.indexOf("</executeFinacleScript_CustomData>");
            }

            responsexml = responsexml.substring(index1,index2);
            responsexml = "<body>"+responsexml+"</body>";

            log.info(responsexml);

            JAXBContext jaxbContext = JAXBContext.newInstance(new Class[]{RateCodesBody.class});
            Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
            StringReader XmlreaderObj = new StringReader(responsexml);
            Source source = new StreamSource(XmlreaderObj);
            JAXBElement<RateCodesBody> root = unmarshaller.unmarshal(source, RateCodesBody.class);
            RateCodesBody fi = root.getValue();
            List<String> rc = new ArrayList<>();
            List<String> rd = new ArrayList<>();

            for (JAXBElement e :fi.getRateCodeOrRateDesc()) {
                if(e.getName().getLocalPart().equalsIgnoreCase("rateCode"))
                {
                    rc.add(e.getValue().toString());
                }

                if(e.getName().getLocalPart().equalsIgnoreCase("rateDesc"))
                {
                    rd.add(e.getValue().toString());
                }
            }

            JSONArray ja = new JSONArray();
            for(int i = 0;i<rc.size();i++)
            {
                JSONObject jo = new JSONObject();
                jo.put("rateCode",rc.get(i));
                jo.put("rateDesc",rd.get(i));
                ja.put(jo);
            }
            return ja.toString();

        }
        catch (Exception e)
        {
            log.info("{ERROR Fetching Rate Codes} "+e.getLocalizedMessage());
            return "[]";
        }
    }
}
