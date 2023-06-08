package co.ke.emtechhouse.eims.URAComponent.getservertime;


import co.ke.emtechhouse.eims.Finacle.utilities.Configurations;
import co.ke.emtechhouse.eims.URAComponent.urarequest.URARequest;
import co.ke.emtechhouse.eims.URAComponent.utils.Base64Decode;
import com.google.gson.Gson;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.apache.commons.lang3.time.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
public class ServerTimeService {
    Configurations cn  = new Configurations();
    Base64Decode bdc = new Base64Decode();
    String url = cn.getProperties().getProperty("ura.endpoint");
    String appid = cn.getProperties().getProperty("ura.appid");
    String version = cn.getProperties().getProperty("ura.version");
    String requestcode = cn.getProperties().getProperty("ura.requestcode");
    String responsecode = cn.getProperties().getProperty("ura.responsecode");
    String username = cn.getProperties().getProperty("ura.username");
    String  devicemac = cn.getProperties().getProperty("ura.devicemac");
    String  deviceno = cn.getProperties().getProperty("ura.deviceno");
    String  tin = cn.getProperties().getProperty("ura.tin");
    String  taxpayerid = cn.getProperties().getProperty("ura.taxpayerid");
    static String date = new SimpleDateFormat("YYYY-MM-dd HH:mm:ss").format(Calendar.getInstance().getTime());

    public String getURAServerTime() {
        String encrypted = "";
        String signature = "";
        String dataExchangeId = UUID.randomUUID().toString().replace("-","").toUpperCase();
        String referenceno = UUID.randomUUID().toString().replace("-","").toUpperCase().substring(0,9);
        String longitude = "116.397128";
        String latitude = "39.916527";
        String codetype = "0";
        String encryptcode = "1";
        String zipcode = "0";

        String json = "{\n" +
                "    \"data\": {\n" +
                "        \"content\": \""+encrypted+"\",\n" +
                "        \"signature\": \""+signature+"\",\n" +
                "        \"dataDescription\": {\n" +
                "            \"codeType\": \""+codetype+"\",\n" +
                "            \"encryptCode\": \""+encryptcode+"\",\n" +
                "            \"zipCode\": \""+zipcode+"\"\n" +
                "        }\n" +
                "    },\n" +
                "    \"globalInfo\": {\n" +
                "        \"appId\": \""+appid+"\",\n" +
                "        \"version\": \""+version+"\",\n" +
                "        \"dataExchangeId\": \""+dataExchangeId+"\",\n" +
                "        \"interfaceCode\": \"T101\",\n" +
                "        \"requestCode\": \""+requestcode+"\",\n" +
                "        \"requestTime\": \""+date+"\",\n" +
                "        \"responseCode\": \""+responsecode+"\",\n" +
                "        \"userName\": \""+username+"\",\n" +
                "        \"deviceMAC\": \""+devicemac+"\",\n" +
                "        \"deviceNo\": \""+deviceno+"\",\n" +
                "        \"tin\": \""+tin+"\",\n" +
                "        \"brn\": \"\",\n" +
                "        \"taxpayerID\": \""+taxpayerid+"\",\n" +
                "        \"longitude\": \""+longitude+"\",\n" +
                "        \"latitude\": \""+latitude+"\",\n" +
                "        \"extendField\": {\n" +
                "            \"responseDateFormat\": \"dd/MM/yyyy\",\n" +
                "            \"responseTimeFormat\": \"dd-MM-yyyy HH:mm:ss\",\n" +
                "            \"referenceNo\": \""+referenceno+"\"\n" +
                "        }\n" +
                "    },\n" +
                "    \"returnStateInfo\": {\n" +
                "        \"returnCode\": \"\",\n" +
                "        \"returnMessage\": \"\"\n" +
                "    }\n" +
                "}";

        OkHttpClient client = new OkHttpClient.Builder()
                .connectTimeout(50, TimeUnit.SECONDS)
                .writeTimeout(50, TimeUnit.SECONDS)
                .readTimeout(50, TimeUnit.SECONDS)
                .build();
        MediaType mediaType = MediaType.parse("application/json");
        okhttp3.RequestBody body = okhttp3.RequestBody.create(json, mediaType);
        Request request = new Request.Builder()
                .url(url)
                .post(body)
                .addHeader("content-type", "application/json")
                .build();

        URARequest ur = null;
        ServerTimeResponse str = null;
        String formattedDate = "";
        try {
            Response response = client.newCall(request).execute();
            String responsebody = response.body().string();

            Gson gs = new Gson();
            String res = "";
            if(response.isSuccessful())
            {
                ur = gs.fromJson(responsebody,URARequest.class);
                String content = ur.getData().getContent();
                res = bdc.decodeResponse(content);
                str = gs.fromJson(res,ServerTimeResponse.class);
                String date = str.getCurrentTime();
                Date date0 = DateUtils.parseDate(date, new String[] { "yyyy-MM-dd HH:mm:ss", "dd/MM/yyyy HH:mm:ss" });
                SimpleDateFormat parser = new SimpleDateFormat("EEE MMM d HH:mm:ss zzz yyyy");
                Date date1 = parser.parse(date0.toString());
                SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                formattedDate = formatter.format(date1);
            }
        } catch (IOException e) {
            return "ERROR - "+e.getLocalizedMessage();
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
        return formattedDate;
    }
}

