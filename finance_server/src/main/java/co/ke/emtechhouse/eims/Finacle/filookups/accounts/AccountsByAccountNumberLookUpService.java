package co.ke.emtechhouse.eims.Finacle.filookups.accounts;

import co.ke.emtechhouse.eims.Finacle.utilities.Configurations;
import co.ke.emtechhouse.eims.Utils.Utils;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
@Slf4j
public class AccountsByAccountNumberLookUpService {
    Configurations cn = new Configurations();
    String url = cn.getProperties().getProperty("fin.url");
    Utils utils = new Utils();

    public String fetchAcountsByAccountNumber(String accountNumber )
    {
        String date = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS").format(new Date());
        String requestId = UUID.randomUUID().toString();

        String responseXml = "";
        String responseJson = "";

        String xml = "<?xml version=\"1.0\"?>\n" +
                "<FIXML xsi:schemaLocation=\"http://www.finacle.com/fixml executeFinacleScript.xsd\"\n" +
                "       xmlns=\"http://www.finacle.com/fixml\"\n" +
                "       xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">\n" +
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
                "            <ExecuteFinacleScriptInputVO>\n" +
                "                <requestId>FetchAccountNoInfo.scr</requestId>\n" +
                "            </ExecuteFinacleScriptInputVO>\n" +
                "            <executeFinacleScript_CustomData>\n" +
                "                <ACCOUNT_NUMBER>"+accountNumber+"</ACCOUNT_NUMBER>\n" +
                "            </executeFinacleScript_CustomData>\n" +
                "        </executeFinacleScriptRequest>\n" +
                "    </RateCodesBody>\n" +
                "</FIXML>\n";


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
            int responseCode = con.getResponseCode();
            String responseStatus = con.getResponseMessage();
            System.out.println(responseStatus);
            if (responseCode == 200) {
                StringBuffer response;
                try (BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()))) {
                    String inputLine;
                    response = new StringBuffer();
                    while ((inputLine = in.readLine()) != null) {
                        response.append(inputLine);
                    }
                }
                String responsexml = response.toString();
                System.out.println("RESPONSE FOR ACCOUNT NUMBER \n" + responsexml);
                DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
                DocumentBuilder builder = factory.newDocumentBuilder();
                InputStream is = new ByteArrayInputStream(responsexml.getBytes());
                Document doc = builder.parse(is);
                NodeList nodeList = doc.getElementsByTagName("executeFinacleScript_CustomData");
                if (nodeList.getLength() > 0) {
                    Node node = nodeList.item(0);
                    if (node.getNodeType() == Node.ELEMENT_NODE) {
                        Element element = (Element) node;
                        Map<String, String> map = new HashMap<>();
                        NodeList childNodes = element.getChildNodes();
                        for (int i = 0; i < childNodes.getLength(); i++) {
                            Node childNode = childNodes.item(i);
                            if (childNode.getNodeType() == Node.ELEMENT_NODE) {
                                Element childElement = (Element) childNode;
                                map.put(childElement.getNodeName(), childElement.getTextContent());
                            }
                        }
                        ObjectMapper mapper = new ObjectMapper();
                        String jsonResponse = mapper.writeValueAsString(map);
                        System.out.println("JSON RESPONSE FOR ACCOUNT NUMBER \n" + jsonResponse);
                        return jsonResponse;
                    }
                }
                else {
                    return "{\"error\":\"Account does not exist\"}";
                }
            } else {
                return "{\"error\":\"Failed to retrieve account information\"}";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "{\"error\":\"" + e.getMessage() + "\"}";
        }
        return "{}";
    }
}




