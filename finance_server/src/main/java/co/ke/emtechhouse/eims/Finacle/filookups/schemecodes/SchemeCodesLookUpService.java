package co.ke.emtechhouse.eims.Finacle.filookups.schemecodes;

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
public class SchemeCodesLookUpService {
    Utils utils = new Utils();
    Configurations cn = new Configurations();
    String url = cn.getProperties().getProperty("fin.url");

    //Fetch scheme types
    public String getSchemeCodesList()
    {
        String date = new SimpleDateFormat("YYYY-MM-dd'T'HH:mm:ss.SSS").format(new Date());
        String requestId = UUID.randomUUID().toString();

        String requestXml = "<?xml version=\"1.0\"?>\n" +
                "<FIXML xsi:schemaLocation=\"http://www.finacle.com/fixml executeFinacleScript.xsd\"\n" +
                "    xmlns=\"http://www.finacle.com/fixml\"\n" +
                "    xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">\n" +
                "    <Header>\n" +
                "        <RequestHeader>\n" +
                "            <MessageKey>\n" +
                "                <RequestUUID>"+requestId+"</RequestUUID>\n" +
                "                <ServiceRequestId>executeFinacleScript</ServiceRequestId>\n" +
                "                <ServiceRequestVersion>10.2</ServiceRequestVersion>\n" +
                "                <ChannelId>COR</ChannelId>\n" +
                "                <LanguageId/>\n" +
                "            </MessageKey>\n" +
                "            <RequestMessageInfo>\n" +
                "                <BankId>01</BankId>\n" +
                "                <TimeZone/>\n" +
                "                <EntityId/>\n" +
                "                <EntityType/>\n" +
                "                <ArmCorrelationId/>\n" +
                "                <MessageDateTime>"+date+"</MessageDateTime>\n" +
                "            </RequestMessageInfo>\n" +
                "            <Security>\n" +
                "                <Token>\n" +
                "                    <PasswordToken>\n" +
                "                        <UserId/>\n" +
                "                        <Password/>\n" +
                "                    </PasswordToken>\n" +
                "                </Token>\n" +
                "                <FICertToken/>\n" +
                "                <RealUserLoginSessionId/>\n" +
                "                <RealUser/>\n" +
                "                <RealUserPwd/>\n" +
                "                <SSOTransferToken/>\n" +
                "            </Security>\n" +
                "        </RequestHeader>\n" +
                "    </Header>\n" +
                "    <RateCodesBody>\n" +
                "        <executeFinacleScriptRequest>\n" +
                "            <ExecuteFinacleScriptInputVO>\t\t\t\n" +
                "                <requestId>schm_code_HR.scr</requestId>\n" +
                "            </ExecuteFinacleScriptInputVO>\n" +
                "            <executeFinacleScript_CustomData>\n" +
                "               <BANK_ID>01</BANK_ID>\n" +
                "           </executeFinacleScript_CustomData>\n" +
                "        </executeFinacleScriptRequest>\n" +
                "    </RateCodesBody>\n" +
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
            //responsexml = "<FIXML xsi:schemaLocation=\"http://www.finacle.com/fixml executeFinacleScript.xsd\" xmlns=\"http://www.finacle.com/fixml\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"><Header><ResponseHeader><RequestMessageKey><RequestUUID>fbac71da-0430-4b43-9873-54cf0b172f3b</RequestUUID><ServiceRequestId>executeFinacleScript</ServiceRequestId><ServiceRequestVersion>10.2</ServiceRequestVersion><ChannelId>COR</ChannelId></RequestMessageKey><ResponseMessageInfo><BankId>01</BankId><TimeZone>GMT+05:30</TimeZone><MessageDateTime>2023-01-06T15:51:01.598</MessageDateTime></ResponseMessageInfo><UBUSTransaction><Id/><Status/></UBUSTransaction><HostTransaction><Id/><Status>SUCCESS</Status></HostTransaction><HostParentTransaction><Id/><Status/></HostParentTransaction><CustomInfo/></ResponseHeader></Header><RateCodesBody><executeFinacleScriptResponse><ExecuteFinacleScriptOutputVO></ExecuteFinacleScriptOutputVO><executeFinacleScript_CustomData><SCHME_CODE>BIA</SCHME_CODE><DESCRIPTION>INLAND BILLS</DESCRIPTION><SCHME_CODE>CAA</SCHME_CODE><DESCRIPTION>CURRENT A/C</DESCRIPTION></executeFinacleScript_CustomData></executeFinacleScriptResponse></RateCodesBody></FIXML>";
            log.info("RESPONSE FOR SCHEME CODES \n"+responsexml);

            responsexml = responsexml.replaceAll("DESCRIPTION_[0-9]+", "DESCRIPTION");
            responsexml = responsexml.replaceAll("SCHME_CODE_[0-9]+", "SCHME_CODE");
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
            JAXBContext jaxbContext = JAXBContext.newInstance(new Class[]{SchemeCodesBody.class});
            Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
            StringReader XmlreaderObj = new StringReader(responsexml);
            Source source = new StreamSource(XmlreaderObj);
            JAXBElement<SchemeCodesBody> root = unmarshaller.unmarshal(source, SchemeCodesBody.class);
            SchemeCodesBody fi = root.getValue();
            List<String> ss = new ArrayList<>();
            List<String> ds = new ArrayList<>();

            for (JAXBElement e :fi.getSCHMECODEOrDESCRIPTION()) {
                if(e.getName().getLocalPart().equalsIgnoreCase("SCHME_CODE"))
                {
                    ss.add(e.getValue().toString());
                }

                if(e.getName().getLocalPart().equalsIgnoreCase("DESCRIPTION"))
                {
                    ds.add(e.getValue().toString());
                }
            }

            JSONArray ja = new JSONArray();
            for(int i = 0;i<ss.size();i++)
            {
                JSONObject jo = new JSONObject();
                for(int j = 0;j<ds.size();j++)
                {
                    jo.put("schemeCode",ss.get(i));
                    jo.put("schemeDesc",ds.get(i));
                }
                ja.put(jo);
            }

            return ja.toString();
        }
        catch (Exception e)
        {
            log.info("{ERROR Fetching Scheme Codes} "+e.getLocalizedMessage());
            return "[]";
        }
    }
}
