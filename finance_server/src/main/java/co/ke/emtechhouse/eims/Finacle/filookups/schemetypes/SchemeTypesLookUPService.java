package co.ke.emtechhouse.eims.Finacle.filookups.schemetypes;

import co.ke.emtechhouse.eims.Finacle.utilities.Configurations;
import co.ke.emtechhouse.eims.Utils.Utils;
import com.google.gson.Gson;
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
public class SchemeTypesLookUPService {
    Utils utils = new Utils();
    Configurations cn = new Configurations();
    String url = cn.getProperties().getProperty("fin.url");

    //Fetch scheme types
    public String getSchemeTypesList()
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
                "                <requestId>schm_type_HR.scr</requestId>\n" +
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
            //String responsexml = "<FIXML xsi:schemaLocation=\"http://www.finacle.com/fixml executeFinacleScript.xsd\" xmlns=\"http://www.finacle.com/fixml\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"><Header><ResponseHeader><RequestMessageKey><RequestUUID>fbac71da-0430-4b43-9873-54cf0b172f3b</RequestUUID><ServiceRequestId>executeFinacleScript</ServiceRequestId><ServiceRequestVersion>10.2</ServiceRequestVersion><ChannelId>COR</ChannelId></RequestMessageKey><ResponseMessageInfo><BankId>01</BankId><TimeZone>GMT+05:30</TimeZone><MessageDateTime>2023-01-06T15:51:01.598</MessageDateTime></ResponseMessageInfo><UBUSTransaction><Id/><Status/></UBUSTransaction><HostTransaction><Id/><Status>SUCCESS</Status></HostTransaction><HostParentTransaction><Id/><Status/></HostParentTransaction><CustomInfo/></ResponseHeader></Header><RateCodesBody><executeFinacleScriptResponse><ExecuteFinacleScriptOutputVO></ExecuteFinacleScriptOutputVO><executeFinacleScript_CustomData><SCHME_TYPE_1>BIA</SCHME_TYPE_1><DESCRIPTION_1>INLAND BILLS</DESCRIPTION_1><SCHME_TYPE_2>CAA</SCHME_TYPE_2><DESCRIPTION_2>CURRENT A/C</DESCRIPTION_2><SCHME_TYPE_3>CCA</SCHME_TYPE_3><DESCRIPTION_3>CASH CREDIT A/C</DESCRIPTION_3><SCHME_TYPE_4>DDA</SCHME_TYPE_4><DESCRIPTION_4>DEMAND DRAFT</DESCRIPTION_4><SCHME_TYPE_5>FBA</SCHME_TYPE_5><DESCRIPTION_5>FOREIGN BILLS</DESCRIPTION_5><SCHME_TYPE_6>HOC</SCHME_TYPE_6><DESCRIPTION_6>HOC SCHEME TYPE</DESCRIPTION_6><SCHME_TYPE_7>LAA</SCHME_TYPE_7><DESCRIPTION_7>LOANS</DESCRIPTION_7><SCHME_TYPE_8>OAB</SCHME_TYPE_8><DESCRIPTION_8>OFFICE ACC BASIC</DESCRIPTION_8><SCHME_TYPE_9>OAD</SCHME_TYPE_9><DESCRIPTION_9>OFFICE ACC DUMMY</DESCRIPTION_9><SCHME_TYPE_10>OAP</SCHME_TYPE_10><DESCRIPTION_10>OFFICE ACC POINTING</DESCRIPTION_10><SCHME_TYPE_11>ODA</SCHME_TYPE_11><DESCRIPTION_11>OVERDRAFT A/C</DESCRIPTION_11><SCHME_TYPE_12>OSP</SCHME_TYPE_12><DESCRIPTION_12>OFFICE SYSTEM POINTING</DESCRIPTION_12><SCHME_TYPE_13>PCA</SCHME_TYPE_13><DESCRIPTION_13>PACKING CREDITS</DESCRIPTION_13><SCHME_TYPE_14>SBA</SCHME_TYPE_14><DESCRIPTION_14>SAVING BANK A/C</DESCRIPTION_14><SCHME_TYPE_15>TDA</SCHME_TYPE_15><DESCRIPTION_15>TERM DEPOSIT</DESCRIPTION_15><SCHME_TYPE_16>TUA</SCHME_TYPE_16><DESCRIPTION_16>TOP UP DEPOSIT</DESCRIPTION_16></executeFinacleScript_CustomData></executeFinacleScriptResponse></RateCodesBody></FIXML>";
            log.info("RESPONSE FOR SCHEME TYPES \n"+responsexml);

            responsexml = responsexml.replaceAll("DESCRIPTION_[0-9]+", "DESCRIPTION");
            responsexml = responsexml.replaceAll("SCHME_TYPE_[0-9]+", "SCHME_TYPE");
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

            JAXBContext jaxbContext = JAXBContext.newInstance(new Class[]{SchemeTypesBody.class});
            Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
            StringReader XmlreaderObj = new StringReader(responsexml);
            Source source = new StreamSource(XmlreaderObj);
            JAXBElement<SchemeTypesBody> root = unmarshaller.unmarshal(source, SchemeTypesBody.class);
            SchemeTypesBody fi = root.getValue();
            List<String> ss = new ArrayList<>();
            List<String> ds = new ArrayList<>();

            for (JAXBElement e :fi.getSCHMETYPEOrDESCRIPTION()) {
                if(e.getName().getLocalPart().equalsIgnoreCase("SCHME_TYPE"))
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
                    jo.put("schemeType",ss.get(i));
                    jo.put("description",ds.get(i));
                }
                ja.put(jo);
            }

            return ja.toString();
        }
        catch (Exception e)
        {
            log.info("{ERROR Fetching Scheme Types} "+e.getLocalizedMessage());
            return "[]";
        }
    }
}
