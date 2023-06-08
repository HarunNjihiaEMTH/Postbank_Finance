package co.ke.emtechhouse.eims.Finacle.filookups.branches;

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
public class BranchListService {
        Utils utils = new Utils();
        Configurations cn = new Configurations();
        String url = cn.getProperties().getProperty("fin.url");

        //Fetch Branches
        public String getBranchList()
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
                    "                <requestId>branch_list_HR.scr</requestId>\n" +
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
                //String responsexml = "<FIXML xsi:schemaLocation=\"http://www.finacle.com/fixml executeFinacleScript.xsd\" xmlns=\"http://www.finacle.com/fixml\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"><Header><ResponseHeader><RequestMessageKey><RequestUUID>92014e61-ab98-4348-a54f-58d56857e837</RequestUUID><ServiceRequestId>executeFinacleScript</ServiceRequestId><ServiceRequestVersion>10.2</ServiceRequestVersion><ChannelId>COR</ChannelId></RequestMessageKey><ResponseMessageInfo><BankId>01</BankId><TimeZone>GMT+05:30</TimeZone><MessageDateTime>2023-01-06T16:28:58.091</MessageDateTime></ResponseMessageInfo><UBUSTransaction><Id/><Status/></UBUSTransaction><HostTransaction><Id/><Status>SUCCESS</Status></HostTransaction><HostParentTransaction><Id/><Status/></HostParentTransaction><CustomInfo/></ResponseHeader></Header><RateCodesBody><executeFinacleScriptResponse><ExecuteFinacleScriptOutputVO></ExecuteFinacleScriptOutputVO><executeFinacleScript_CustomData><SOL_ID_1>0043</SOL_ID_1><DESCRIPTION_1>ANKA</DESCRIPTION_1><SOL_ID_2>0065</SOL_ID_2><DESCRIPTION_2>RUSHERE BRANCH</DESCRIPTION_2><SOL_ID_3>0066</SOL_ID_3><DESCRIPTION_3>BUTOGOTA BRANCH</DESCRIPTION_3><SOL_ID_4>00CR</SOL_ID_4><DESCRIPTION_4>CREDIT COST CENTRE</DESCRIPTION_4><SOL_ID_5>00CL</SOL_ID_5><DESCRIPTION_5>COMPANY SECRETARY COST CENTRE</DESCRIPTION_5><SOL_ID_6>00CX</SOL_ID_6><DESCRIPTION_6>CUSTOMER EXP COST CENTRE</DESCRIPTION_6><SOL_ID_7>00IS</SOL_ID_7><DESCRIPTION_7>IT SECURITY COST CENTRE</DESCRIPTION_7><SOL_ID_8>00AU</SOL_ID_8><DESCRIPTION_8>AUDIT COST CENTRE</DESCRIPTION_8><SOL_ID_9>00BT</SOL_ID_9><DESCRIPTION_9>INNOVATION &amp; DIGITALIZATION COST CENTRE</DESCRIPTION_9><SOL_ID_10>0062</SOL_ID_10><DESCRIPTION_10>MBARARA MOBILE</DESCRIPTION_10><SOL_ID_11>0063</SOL_ID_11><DESCRIPTION_11>GULU MOBILE</DESCRIPTION_11><SOL_ID_12>00IT</SOL_ID_12><DESCRIPTION_12>BUSINESS TECHNOLOGY COST CENTRE</DESCRIPTION_12><SOL_ID_13>00FN</SOL_ID_13><DESCRIPTION_13>FINANCE COST CENTRE</DESCRIPTION_13><SOL_ID_14>00MD</SOL_ID_14><DESCRIPTION_14>MD OFFICE COST CENTRE</DESCRIPTION_14><SOL_ID_15>00ED</SOL_ID_15><DESCRIPTION_15>ED OFFICE COST CENTRE</DESCRIPTION_15><SOL_ID_16>0069</SOL_ID_16><DESCRIPTION_16>KYAZANGA BRANCH</DESCRIPTION_16><SOL_ID_17>0071</SOL_ID_17><DESCRIPTION_17>EBB AIRPORT BRANCH</DESCRIPTION_17><SOL_ID_18>0045</SOL_ID_18><DESCRIPTION_18>BWEYALE</DESCRIPTION_18><SOL_ID_19>00MC</SOL_ID_19><DESCRIPTION_19>MKTG &amp; COMM COST CENTRE</DESCRIPTION_19><SOL_ID_20>00AD</SOL_ID_20><DESCRIPTION_20>ADMINISTRATION COST CENTRE</DESCRIPTION_20><SOL_ID_21>00RI</SOL_ID_21><DESCRIPTION_21>RISK COST CENTRE</DESCRIPTION_21><SOL_ID_22>0064</SOL_ID_22><DESCRIPTION_22>MUKONO BRANCH</DESCRIPTION_22><SOL_ID_23>00OP</SOL_ID_23><DESCRIPTION_23>OPERATIONS &amp; SERVICE COST CENTRE</DESCRIPTION_23><SOL_ID_24>0042</SOL_ID_24><DESCRIPTION_24>KAPCHORWA</DESCRIPTION_24><SOL_ID_25>00SP</SOL_ID_25><DESCRIPTION_25>STRATEGY COST CENTRE</DESCRIPTION_25><SOL_ID_26>0068</SOL_ID_26><DESCRIPTION_26>FOREST MALL BRANCH</DESCRIPTION_26><SOL_ID_27>0000</SOL_ID_27><DESCRIPTION_27>DATA CENTRE</DESCRIPTION_27><SOL_ID_28>0001</SOL_ID_28><DESCRIPTION_28>NDEEBA</DESCRIPTION_28><SOL_ID_29>0002</SOL_ID_29><DESCRIPTION_29>WANDEGEYA</DESCRIPTION_29><SOL_ID_30>0003</SOL_ID_30><DESCRIPTION_30>WILLIAM STREET</DESCRIPTION_30><SOL_ID_31>0005</SOL_ID_31><DESCRIPTION_31>BUGOLOBI</DESCRIPTION_31><SOL_ID_32>0006</SOL_ID_32><DESCRIPTION_32>ENTEBBE</DESCRIPTION_32><SOL_ID_33>0007</SOL_ID_33><DESCRIPTION_33>HOIMA</DESCRIPTION_33><SOL_ID_34>0008</SOL_ID_34><DESCRIPTION_34>GULU</DESCRIPTION_34><SOL_ID_35>0009</SOL_ID_35><DESCRIPTION_35>ARUA</DESCRIPTION_35><SOL_ID_36>0011</SOL_ID_36><DESCRIPTION_36>SOROTI</DESCRIPTION_36><SOL_ID_37>0012</SOL_ID_37><DESCRIPTION_37>LIRA</DESCRIPTION_37><SOL_ID_38>0013</SOL_ID_38><DESCRIPTION_38>JINJA</DESCRIPTION_38><SOL_ID_39>0014</SOL_ID_39><DESCRIPTION_39>FORT PORTAL</DESCRIPTION_39><SOL_ID_40>0015</SOL_ID_40><DESCRIPTION_40>MASAKA</DESCRIPTION_40><SOL_ID_41>0016</SOL_ID_41><DESCRIPTION_41>KABALE</DESCRIPTION_41><SOL_ID_42>0051</SOL_ID_42><DESCRIPTION_42>KAYUNGA</DESCRIPTION_42><SOL_ID_43>0052</SOL_ID_43><DESCRIPTION_43>BOMBO</DESCRIPTION_43><SOL_ID_44>0053</SOL_ID_44><DESCRIPTION_44>MUBENDE</DESCRIPTION_44><SOL_ID_45>2101</SOL_ID_45><DESCRIPTION_45>MBARARA</DESCRIPTION_45><SOL_ID_46>2201</SOL_ID_46><DESCRIPTION_46>MBALE</DESCRIPTION_46><SOL_ID_47>MAIN</SOL_ID_47><DESCRIPTION_47>CITY BRANCH</DESCRIPTION_47><SOL_ID_48>0017</SOL_ID_48><DESCRIPTION_48>MASINDI</DESCRIPTION_48><SOL_ID_49>HOD</SOL_ID_49><DESCRIPTION_49>HEAD OFFICE</DESCRIPTION_49><SOL_ID_50>0029</SOL_ID_50><DESCRIPTION_50>KITGUM</DESCRIPTION_50><SOL_ID_51>0031</SOL_ID_51><DESCRIPTION_51>KASESE</DESCRIPTION_51><SOL_ID_52>0036</SOL_ID_52><DESCRIPTION_52>MOBILE NORTH 1 - ARUA</DESCRIPTION_52><SOL_ID_53>0023</SOL_ID_53><DESCRIPTION_53>MOBILE UNIT 1 - WESTERN REGION</DESCRIPTION_53><SOL_ID_54>0027</SOL_ID_54><DESCRIPTION_54>IGANGA</DESCRIPTION_54><SOL_ID_55>0024</SOL_ID_55><DESCRIPTION_55>MOBILE UNIT 1 - EASTERN REGION</DESCRIPTION_55><SOL_ID_56>0025</SOL_ID_56><DESCRIPTION_56>KAMPALA ROAD</DESCRIPTION_56><SOL_ID_57>0034</SOL_ID_57><DESCRIPTION_57>KANUNGU</DESCRIPTION_57><SOL_ID_58>0028</SOL_ID_58><DESCRIPTION_58>NAKASONGOLA</DESCRIPTION_58><SOL_ID_59>0033</SOL_ID_59><DESCRIPTION_59>NTUNGAMO</DESCRIPTION_59><SOL_ID_60>0037</SOL_ID_60><DESCRIPTION_60>SUMMIT</DESCRIPTION_60><SOL_ID_61>0019</SOL_ID_61><DESCRIPTION_61>LACOR</DESCRIPTION_61><SOL_ID_62>0032</SOL_ID_62><DESCRIPTION_62>KAMWENGE BRANCH</DESCRIPTION_62><SOL_ID_63>0022</SOL_ID_63><DESCRIPTION_63>MOBILE UNIT 2 - EASTERN REGION</DESCRIPTION_63><SOL_ID_64>SACCO</SOL_ID_64><DESCRIPTION_64>MFS - HEAD QUARTERS</DESCRIPTION_64><SOL_ID_65>0026</SOL_ID_65><DESCRIPTION_65>KAKIRI</DESCRIPTION_65><SOL_ID_66>0035</SOL_ID_66><DESCRIPTION_66>MOBILE EAST 3 - SOROTI</DESCRIPTION_66><SOL_ID_67>0038</SOL_ID_67><DESCRIPTION_67>AMOLATAR</DESCRIPTION_67><SOL_ID_68>0041</SOL_ID_68><DESCRIPTION_68>LAMWO</DESCRIPTION_68><SOL_ID_69>0044</SOL_ID_69><DESCRIPTION_69>MOBILE UNIT-HOIMA</DESCRIPTION_69><SOL_ID_70>0047</SOL_ID_70><DESCRIPTION_70>MAKERERE UNIVERSITY</DESCRIPTION_70><SOL_ID_71>0048</SOL_ID_71><DESCRIPTION_71>BISHOP STUART UNIVERSITY</DESCRIPTION_71><SOL_ID_72>0049</SOL_ID_72><DESCRIPTION_72>PACKWACH</DESCRIPTION_72><SOL_ID_73>0054</SOL_ID_73><DESCRIPTION_73>MOROTO BRANCH</DESCRIPTION_73><SOL_ID_74>0055</SOL_ID_74><DESCRIPTION_74>BUKEDEA BRANCH</DESCRIPTION_74><SOL_ID_75>0056</SOL_ID_75><DESCRIPTION_75>MOBILE MUBENDE</DESCRIPTION_75><SOL_ID_76>0039</SOL_ID_76><DESCRIPTION_76>USAFI</DESCRIPTION_76><SOL_ID_77>0046</SOL_ID_77><DESCRIPTION_77>MOBILE-LIRA</DESCRIPTION_77><SOL_ID_78>0057</SOL_ID_78><DESCRIPTION_78>MOBILE MOROTO</DESCRIPTION_78><SOL_ID_79>0058</SOL_ID_79><DESCRIPTION_79>KOTIDO BRANCH</DESCRIPTION_79><SOL_ID_80>0059</SOL_ID_80><DESCRIPTION_80>KAGADI BRANCH</DESCRIPTION_80><SOL_ID_81>0061</SOL_ID_81><DESCRIPTION_81>YUMBE BRANCH</DESCRIPTION_81><SOL_ID_82>0067</SOL_ID_82><DESCRIPTION_82>KAMDINI BRANCH</DESCRIPTION_82><SOL_ID_83>00CB</SOL_ID_83><DESCRIPTION_83>CBO COST CENTRE</DESCRIPTION_83><SOL_ID_84>00HR</SOL_ID_84><DESCRIPTION_84>HR COST CENTRE</DESCRIPTION_84><SOL_ID_85>0074</SOL_ID_85><DESCRIPTION_85>ISHAKA BRANCH</DESCRIPTION_85><SOL_ID_86>0077</SOL_ID_86><DESCRIPTION_86>KIREKA BRANCH</DESCRIPTION_86><SOL_ID_87>0075</SOL_ID_87><DESCRIPTION_87>NSANGI BRANCH</DESCRIPTION_87><SOL_ID_88>00AC</SOL_ID_88><DESCRIPTION_88>ALTERNATE CHANNELS COST CENTRE</DESCRIPTION_88><SOL_ID_89>00PB</SOL_ID_89><DESCRIPTION_89>PERSONAL BANKING &amp; PRODUCTS COST CENTRE</DESCRIPTION_89><SOL_ID_90>00BI</SOL_ID_90><DESCRIPTION_90>BUSINESS &amp;INSTITUTIONAL BANKING COST CENTRE</DESCRIPTION_90><SOL_ID_91>00RN</SOL_ID_91><DESCRIPTION_91>REGIONAL HEAD - NORTHERN COST CENTRE</DESCRIPTION_91><SOL_ID_92>00RW</SOL_ID_92><DESCRIPTION_92>REGIONAL HEAD - WESTERN COST CENTRE</DESCRIPTION_92><SOL_ID_93>00RE</SOL_ID_93><DESCRIPTION_93>REGIONAL HEAD - EASTERN COST CENTRE</DESCRIPTION_93><SOL_ID_94>00RC</SOL_ID_94><DESCRIPTION_94>REGIONAL HEAD - CENTRAL COST CENTRE</DESCRIPTION_94><SOL_ID_95>00RK</SOL_ID_95><DESCRIPTION_95>REGIONAL HEAD - GREATER KAMPALA COST CENTRE</DESCRIPTION_95><SOL_ID_96>00CO</SOL_ID_96><DESCRIPTION_96>COMPLIANCE COST CENTRE</DESCRIPTION_96><SOL_ID_97>00AB</SOL_ID_97><DESCRIPTION_97>AGENCY BANKING COST CENTRE</DESCRIPTION_97><SOL_ID_98>00DA</SOL_ID_98><DESCRIPTION_98>DATA ANALYSIS COST CENTRE</DESCRIPTION_98><SOL_ID_99>0076</SOL_ID_99><DESCRIPTION_99>IBANDA BRANCH</DESCRIPTION_99><SOL_ID_100>00BA</SOL_ID_100><DESCRIPTION_100>BANCASSURANCE COST CENTRE</DESCRIPTION_100><SOL_ID_101>00LE</SOL_ID_101><DESCRIPTION_101>LEGAL COST CENTRE</DESCRIPTION_101><SOL_ID_102>00MB</SOL_ID_102><DESCRIPTION_102>MOBILE BANKING COST CENTRE</DESCRIPTION_102><SOL_ID_103>00PC</SOL_ID_103><DESCRIPTION_103>PROJECT CHANGE &amp; MANAGEMENT COST CENTRE</DESCRIPTION_103><SOL_ID_104>00OO</SOL_ID_104><DESCRIPTION_104>CHIEF OPERATING OFFICER</DESCRIPTION_104></executeFinacleScript_CustomData></executeFinacleScriptResponse></RateCodesBody></FIXML>";
                log.info("RESPONSE FOR BRANCHES \n"+responsexml);

                responsexml = responsexml.replaceAll("DESCRIPTION_[0-9]+", "DESCRIPTION");
                responsexml = responsexml.replaceAll("SOL_ID_[0-9]+", "SOL_ID");
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

                JAXBContext jaxbContext = JAXBContext.newInstance(new Class[]{BranchesBody.class});
                Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
                StringReader XmlreaderObj = new StringReader(responsexml);
                Source source = new StreamSource(XmlreaderObj);
                JAXBElement<BranchesBody> root = unmarshaller.unmarshal(source, BranchesBody.class);
                BranchesBody fi = root.getValue();
                List<String> ss = new ArrayList<>();
                List<String> ds = new ArrayList<>();

                for (JAXBElement e :fi.getSOLIDOrDESCRIPTION()) {
                    if(e.getName().getLocalPart().equalsIgnoreCase("SOL_ID"))
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
                        jo.put("branchCode",ss.get(i));
                        jo.put("branchName",ds.get(i));
                    }
                    ja.put(jo);
                }

                return ja.toString();
            }
            catch (Exception e)
            {
                log.info("{ERROR Fetching Branches} "+e.getLocalizedMessage());
                return "[]";
            }
        }
    }
