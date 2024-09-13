package co.ke.emtechhouse.eims.Finacle.pointingAccountInfo;

import co.ke.emtechhouse.eims.Finacle.utilities.Configurations;
import co.ke.emtechhouse.eims.Utils.Utils;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.Unmarshaller;
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
public class ContraDetailsService {
    Utils utils = new Utils();
    Configurations cn = new Configurations();
    String url = cn.getProperties().getProperty("fin.url");

    //Fetch scheme types
    public String getContraDetailsForPointingAccount(String accountNo) {
        String date = new SimpleDateFormat("YYYY-MM-dd'T'HH:mm:ss.SSS").format(new Date());
        String requestId = UUID.randomUUID().toString();


        String requestXml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
                "<FIXML xsi:schemaLocation=\"http://www.finacle.com/fixml executeFinacleScript.xsd\" xmlns=\"http://www.finacle.com/fixml\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">\n" +
                "    <Header>\n" +
                "        <RequestHeader>\n" +
                "            <MessageKey>\n" +
                "                <RequestUUID>"+requestId+"</RequestUUID>\n" +
                "                <ServiceRequestId>executeFinacleScript</ServiceRequestId>\n" +
                "                <ServiceRequestVersion>10.2</ServiceRequestVersion>\n" +
                "                <ChannelId>COR</ChannelId>\n" +
                "                <LanguageId></LanguageId>\n" +
                "            </MessageKey>\n" +
                "            <RequestMessageInfo>\n" +
                "                <BankId></BankId>\n" +
                "                <TimeZone></TimeZone>\n" +
                "                <EntityId></EntityId>\n" +
                "                <EntityType></EntityType>\n" +
                "                <ArmCorrelationId></ArmCorrelationId>\n" +
                "                <MessageDateTime>"+date+"</MessageDateTime>\n" +
                "            </RequestMessageInfo>\n" +
                "            <Security>\n" +
                "                <Token>\n" +
                "                    <PasswordToken>\n" +
                "                        <UserId></UserId>\n" +
                "                        <Password></Password>\n" +
                "                    </PasswordToken>\n" +
                "                </Token>\n" +
                "                <FICertToken></FICertToken>\n" +
                "                <RealUserLoginSessionId></RealUserLoginSessionId>\n" +
                "                <RealUser></RealUser>\n" +
                "                <RealUserPwd></RealUserPwd>\n" +
                "                <SSOTransferToken></SSOTransferToken>\n" +
                "            </Security>\n" +
                "        </RequestHeader>\n" +
                "    </Header>\n" +
                "    <RateCodesBody>\n" +
                "        <executeFinacleScriptRequest>\n" +
                "            <ExecuteFinacleScriptInputVO>\n" +
                "                <requestId>tranAddOAPFetch.scr</requestId>\n" +
                "            </ExecuteFinacleScriptInputVO>\n" +
                "            <executeFinacleScript_CustomData>\n" +
                "                <foracid>"+accountNo+"</foracid>\n" +
                "            </executeFinacleScript_CustomData>\n" +
                "        </executeFinacleScriptRequest>\n" +
                "    </RateCodesBody>\n" +
                "</FIXML>";

        log.info("Request \n"+requestXml);
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


            responsexml = responsexml.replaceAll("foracid_[0-9]+", "foracid");
            responsexml = responsexml.replaceAll("tranDate_[0-9]+", "tranDate");
            responsexml = responsexml.replaceAll("acctName_[0-9]+", "acctName");
            responsexml = responsexml.replaceAll("acctCrncyCode_[0-9]+", "acctCrncyCode");
            responsexml = responsexml.replaceAll("solId_[0-9]+", "solId");
            responsexml = responsexml.replaceAll("tranId_[0-9]+", "tranId");
            responsexml = responsexml.replaceAll("partTranSrlNum_[0-9]+", "partTranSrlNum");
            responsexml = responsexml.replaceAll("partTranType_[0-9]+", "partTranType");
            responsexml = responsexml.replaceAll("orgTranAmt_[0-9]+", "orgTranAmt");
            responsexml = responsexml.replaceAll("totalOffsetAmt_[0-9]+", "totalOffsetAmt");
            responsexml = responsexml.replaceAll("numOffsetPtran_[0-9]+", "numOffsetPtran");
            responsexml = responsexml.replaceAll("tranParticular_[0-9]+", "tranParticular");

            int index1 = 0;
            int index2 = 0;

            if (responsexml.contains("<executeFinacleScript_CustomData>")) {
                index1 = responsexml.indexOf("<executeFinacleScript_CustomData>");
                index1 = index1 + 33;
            }

            if (responsexml.contains("</executeFinacleScript_CustomData>")) {
                index2 = responsexml.indexOf("</executeFinacleScript_CustomData>");
            }

            responsexml = responsexml.substring(index1, index2);
            responsexml = "<body><foracids>" + responsexml + "</foracids></body>";
            log.info("RESPONSE FOR POINTING A/C DETAILS \n" + responsexml);
            JAXBContext jaxbContext = JAXBContext.newInstance(ContraDetails.class);
            Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
            StringReader reader = new StringReader(responsexml);
            ContraDetails body = (ContraDetails) unmarshaller.unmarshal(reader);
            ObjectMapper objectMapper = new ObjectMapper();
            String json = objectMapper.writeValueAsString(body.getForacids());
            JSONArray ja = new JSONArray(json);
            JSONObject jo = ja.getJSONObject(0);
            List<Object> result = new ArrayList<>();

            JSONArray a1 = jo.getJSONArray("foracid");
            JSONArray a2 = jo.getJSONArray("acctName");
            JSONArray a3 = jo.getJSONArray("acctCrncyCode");
            JSONArray a4 = jo.getJSONArray("tranParticular");
            JSONArray a5 = jo.getJSONArray("tranId");
            JSONArray a6 = jo.getJSONArray("tranDate");
            JSONArray a7 = jo.getJSONArray("totalOffsetAmt");
            JSONArray a8 = jo.getJSONArray("solId");
            JSONArray a9 = jo.getJSONArray("numOffsetPtran");
            JSONArray a10 = jo.getJSONArray("orgTranAmt");
            JSONArray a11 = jo.getJSONArray("partTranSrlNum");
            JSONArray a12 = jo.getJSONArray("partTranType");

            for (int i = 0; i < a1.length(); i++) {
                JSONObject map = new JSONObject();
                map.put("foracid", a1.get(i).toString());
                map.put("acctName", a2.get(i).toString());
                map.put("acctCrncyCode", a3.get(i).toString());
                map.put("tranParticular", a4.get(i).toString());
                map.put("tranId", a5.get(i).toString());
                map.put("tranDate", a6.get(i).toString());
                map.put("totalOffsetAmt", a7.get(i).toString());
                map.put("solId", a8.get(i).toString());
                map.put("numOffsetPtran", a9.get(i).toString());
                map.put("orgTranAmt", a10.get(i).toString());
                map.put("partTranSrlNum", a11.get(i).toString());
                map.put("partTranType", a12.get(i).toString());
                map.put("amt",0.00);
                result.add(map);
            }
            System.out.println(result);
            return result.toString();
        } catch (Exception e) {
            log.info("{ERROR Fetching Picking Account Details} " + e.getLocalizedMessage());
            return "[]";
        }
    }
}
