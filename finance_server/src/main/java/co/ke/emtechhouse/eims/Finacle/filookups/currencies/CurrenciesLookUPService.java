package co.ke.emtechhouse.eims.Finacle.filookups.currencies;

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
public class CurrenciesLookUPService {
    Utils utils = new Utils();
    Configurations cn = new Configurations();
    String url = cn.getProperties().getProperty("fin.url");

    //Fetch Currency
    public String getCurrencyList()
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
                "                <requestId>currency_list_HR.scr</requestId>\n" +
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
            //String responsexml = "<FIXML xsi:schemaLocation=\"http://www.finacle.com/fixml executeFinacleScript.xsd\" xmlns=\"http://www.finacle.com/fixml\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"><Header><ResponseHeader><RequestMessageKey><RequestUUID>b66a678e-46fa-4cac-a4f5-405cd6e5344d</RequestUUID><ServiceRequestId>executeFinacleScript</ServiceRequestId><ServiceRequestVersion>10.2</ServiceRequestVersion><ChannelId>COR</ChannelId></RequestMessageKey><ResponseMessageInfo><BankId>01</BankId><TimeZone>GMT+05:30</TimeZone><MessageDateTime>2023-01-06T16:25:32.288</MessageDateTime></ResponseMessageInfo><UBUSTransaction><Id/><Status/></UBUSTransaction><HostTransaction><Id/><Status>SUCCESS</Status></HostTransaction><HostParentTransaction><Id/><Status/></HostParentTransaction><CustomInfo/></ResponseHeader></Header><RateCodesBody><executeFinacleScriptResponse><ExecuteFinacleScriptOutputVO></ExecuteFinacleScriptOutputVO><executeFinacleScript_CustomData><CURRENCY_CODE_1>USD</CURRENCY_CODE_1><CURRENCY_NAME_1>UNITED STATES DOLLAR</CURRENCY_NAME_1><COUNTRY_CODE1>US</COUNTRY_CODE1><CURRENCY_CODE_2>DEM</CURRENCY_CODE_2><CURRENCY_NAME_2>DEUTSCHE MARK</CURRENCY_NAME_2><COUNTRY_CODE2>DE</COUNTRY_CODE2><CURRENCY_CODE_3>UGX</CURRENCY_CODE_3><CURRENCY_NAME_3>UGANDA SHILLINGS</CURRENCY_NAME_3><COUNTRY_CODE3>UGNDA</COUNTRY_CODE3><CURRENCY_CODE_4>GBP</CURRENCY_CODE_4><CURRENCY_NAME_4>U.K. POUND STERLING</CURRENCY_NAME_4><COUNTRY_CODE4>UK</COUNTRY_CODE4><CURRENCY_CODE_5>EUR</CURRENCY_CODE_5><CURRENCY_NAME_5>EURO</CURRENCY_NAME_5><COUNTRY_CODE5>EU</COUNTRY_CODE5><CURRENCY_CODE_6>KES</CURRENCY_CODE_6><CURRENCY_NAME_6>KENYAN SHILLINGS</CURRENCY_NAME_6><COUNTRY_CODE6>KY</COUNTRY_CODE6><CURRENCY_CODE_7>TZS</CURRENCY_CODE_7><CURRENCY_NAME_7>TANZANIAN SHILLINGS</CURRENCY_NAME_7><COUNTRY_CODE7>TZ</COUNTRY_CODE7><CURRENCY_CODE_8>ZAR</CURRENCY_CODE_8><CURRENCY_NAME_8>SOUTH AFRICAN RANDS</CURRENCY_NAME_8><COUNTRY_CODE8>ZA</COUNTRY_CODE8></executeFinacleScript_CustomData></executeFinacleScriptResponse></RateCodesBody></FIXML>";
            log.info("RESPONSE FOR CURRENCIES \n"+responsexml);

            responsexml = responsexml.replaceAll("CURRENCY_CODE_[0-9]+", "CURRENCY_CODE");
            responsexml = responsexml.replaceAll("CURRENCY_NAME_[0-9]+", "CURRENCY_NAME");
            responsexml = responsexml.replaceAll("COUNTRY_CODE[0-9]+", "COUNTRY_CODE");
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

            JAXBContext jaxbContext = JAXBContext.newInstance(new Class[]{CurrenciesBody.class});
            Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
            StringReader XmlreaderObj = new StringReader(responsexml);
            Source source = new StreamSource(XmlreaderObj);
            JAXBElement<CurrenciesBody> root = unmarshaller.unmarshal(source, CurrenciesBody.class);
            CurrenciesBody fi = root.getValue();
            List<String> ss = new ArrayList<>();
            List<String> ds = new ArrayList<>();
            List<String> cc = new ArrayList<>();

            for (JAXBElement e :fi.getCURRENCYCODEOrCURRENCYNAMEOrCOUNTRYCODE()) {
                if(e.getName().getLocalPart().equalsIgnoreCase("CURRENCY_CODE"))
                {
                    ss.add(e.getValue().toString());
                }

                if(e.getName().getLocalPart().equalsIgnoreCase("CURRENCY_NAME"))
                {
                    ds.add(e.getValue().toString());
                }

                if(e.getName().getLocalPart().equalsIgnoreCase("COUNTRY_CODE"))
                {
                    cc.add(e.getValue().toString());
                }
            }

            JSONArray ja = new JSONArray();
            for(int i = 0;i<ss.size();i++)
            {
                JSONObject jo = new JSONObject();
                for(int j = 0;j<ds.size();j++)
                {
                    for(int k = 0;k<cc.size();k++)
                    {
                        jo.put("currencyCode",ss.get(i));
                        jo.put("currencyName",ds.get(i));
                        jo.put("countryCode",cc.get(i));
                    }
                }
                ja.put(jo);
            }
            return ja.toString();

        }
        catch (Exception e)
        {
            log.info("{ERROR Fetching Currencies} "+e.getLocalizedMessage());
            return "[]";
        }
    }
}
