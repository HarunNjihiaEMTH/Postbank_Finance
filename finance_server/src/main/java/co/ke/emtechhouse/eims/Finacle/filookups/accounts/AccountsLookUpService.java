package co.ke.emtechhouse.eims.Finacle.filookups.accounts;

import co.ke.emtechhouse.eims.Finacle.utilities.Configurations;
import co.ke.emtechhouse.eims.Utils.Utils;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
public class AccountsLookUpService {
    Configurations cn = new Configurations();
    String url = cn.getProperties().getProperty("fin.url");
    Utils utils = new Utils();

    public String fetchAcounts(String accountType,String branchId,String schemeCode )
    {
        String date = new SimpleDateFormat("YYYY-MM-dd'T'HH:mm:ss.SSS").format(new Date());
        String requestId = UUID.randomUUID().toString();

        String responsexml = "";
        String xml = "<?xml version=\"1.0\"?>\n" +
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
                "                <requestId>acct_list_HR.scr</requestId>\n" +
                "            </ExecuteFinacleScriptInputVO>\n" +
                "            <executeFinacleScript_CustomData>                   \n" +
                "                   <ACCT_OWNERSHIP>"+accountType+"</ACCT_OWNERSHIP>\n" +
                "\t\t  <SCHM_TYPE>-</SCHM_TYPE>\n" +
                "\t\t   <SCHM_CODE>"+schemeCode+"</SCHM_CODE>\n" +
                "                  <SOL_ID>"+branchId+"</SOL_ID>\n" +
                "            </executeFinacleScript_CustomData>\n" +
                "        </executeFinacleScriptRequest>\n" +
                "    </RateCodesBody>\n" +
                "</FIXML>";


        log.info("URL - "+url);
        log.info("Request\n"+xml);
        try {
            URL obj = new URL(url);
            utils.disableSSlVerification();
            HttpURLConnection con = (HttpURLConnection) obj.openConnection();
            con.setRequestMethod("POST");
            con.setRequestProperty("Content-Type", "application/soap+xml; charset=utf-8");
            con.setDoOutput(true);

            try (DataOutputStream wr = new DataOutputStream(con.getOutputStream())) {
                wr.writeBytes(xml);
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
            responsexml = response.toString();
            System.out.println("RESPONSE FOR ACCOUNTS \n"+responsexml);
            responsexml = responsexml.replaceAll("FORACID_[0-9]+", "accountNo");
            responsexml = responsexml.replaceAll("ACCT_NAME_[0-9]+", "accountName");
            responsexml = responsexml.replaceAll("ACCT_CURRENCY_[0-9]+", "accountCurrency");
            responsexml = responsexml.replaceAll("CLR_BAL_AMT_[0-9]+", "accountBalance");
            responsexml = responsexml.replaceAll("PARTITIONED_FLG_[0-9]+", "partionedFlag");
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

            XmlMapper xmlMapper = new XmlMapper();
            JsonNode jsonNode = xmlMapper.readTree(responsexml);
            ObjectMapper objectMapper = new ObjectMapper();
            String json = objectMapper.writeValueAsString(jsonNode);
            JsonNode root = objectMapper.readTree(json);
            JsonNode accountNoNode = root.get("accountNo");
            JsonNode accountNameNode = root.get("accountName");
            JsonNode accountCurrencyNode = root.get("accountCurrency");
            JsonNode partitionFlagNode = root.get("partionedFlag");

            List<JsonNode> accountNodes = new ArrayList<>();
            for (int i = 0; i < accountNoNode.size(); i++) {
                ObjectNode accountNode = objectMapper.createObjectNode();
                accountNode.put("accountNo", accountNoNode.get(i).asText());
                accountNode.put("accountName", accountNameNode.get(i).asText());
                accountNode.put("accountCurrency", accountCurrencyNode.get(i).asText());
                accountNode.put("partionedFlag", partitionFlagNode.get(i).asText());
                accountNodes.add(accountNode);
            }

            ArrayNode arrayNode = objectMapper.valueToTree(accountNodes);
            String jsonArray = objectMapper.writeValueAsString(arrayNode);
            System.out.println(jsonArray);
            return jsonArray;
        }
        catch (Exception e)
        {
            log.info("{ERROR Fetching Accounts List} "+e.getLocalizedMessage());
            return "[]";
        }
    }
}
