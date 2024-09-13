package co.ke.emtechhouse.eims.URAComponent.uploadgoods;

import co.ke.emtechhouse.eims.Finacle.utilities.Configurations;
import co.ke.emtechhouse.eims.URAComponent.getservertime.ServerTimeService;
import co.ke.emtechhouse.eims.URAComponent.urarequest.URARequest;
import co.ke.emtechhouse.eims.URAComponent.utils.Base64Decode;
import com.google.gson.Gson;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.apache.sshd.common.util.Base64;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.*;
import java.security.cert.CertificateException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
public class UploadGoodsService {
    Configurations cn  = new Configurations();
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
    String keystore =  cn.getProperties().getProperty("ura.keystore");
    String alias = cn.getProperties().getProperty("ura.alias");

    Base64Decode b64 = new Base64Decode();
    @Autowired
    private ServerTimeService stimeservice;
    @Autowired
    UploadGoodsRepository repository;


    public static byte[] signData(String data, String keystore_path, String keypair_alias) throws NoSuchAlgorithmException, InvalidKeyException, UnsupportedEncodingException, SignatureException, IOException, CertificateException, KeyStoreException, UnrecoverableKeyException {
        //Specify the security provider
        Security.addProvider(new BouncyCastleProvider());
        byte[] signature = null;
        FileInputStream is = null;
        //We are using JKS keystore. You can also use other keystore types e.g. PKCS12
        KeyStore keystore = KeyStore.getInstance("JKS");
        //Read the keystore from file
        is = new FileInputStream(keystore_path);
        keystore.load(is, "changeit".toCharArray());
        //Get private key and check if it's of type PrivateKey
        Key key = keystore.getKey(keypair_alias, "changeit".toCharArray());
        if ((key instanceof PrivateKey)) {
            PrivateKey pk = (PrivateKey) key;

            //Sign
            Signature signer = Signature.getInstance("SHA256withRSA", new BouncyCastleProvider());
            signer.initSign(pk);
            signer.update(data.getBytes("UTF-8"));
            signature = signer.sign();
        }

        //close resources
        is.close();

        return signature;
    }
    public ResponseEntity<?> addStockToURA(Good ug) throws UnrecoverableKeyException, CertificateException, NoSuchAlgorithmException, SignatureException, IOException, KeyStoreException, InvalidKeyException {

        Gson gson = new Gson();
        int b = (int)(Math.random()*(100000-2000+1)+2000);

        ug.setGoodsCode(String.valueOf(b));
        ug.setUrastatus("Pending");
        repository.save(ug);

        String req = "";
        if(ug.getHavePieceUnit().equalsIgnoreCase("102"))
        {
            req = "[\n" +
                    "{\n" +
                    "\"operationType\": \""+ug.getOperationType()+"\",\n" +
                    "\"goodsName\": \""+ug.getGoodsName()+"\",\n" +
                    "\"goodsCode\": \""+b+"\",\n" +
                    "\"measureUnit\": \""+ug.getMeasureUnit()+"\",\n" +
                    "\"unitPrice\": \""+ug.getUnitPrice()+"\",\n" +
                    "\"currency\": \""+ug.getCurrency()+"\",\n" +
                    "\"commodityCategoryId\": \""+ug.getCommodityCategoryId()+"\",\n" +
                    "\"haveExciseTax\": \""+ug.getHaveExciseTax()+"\",\n" +
                    "\"description\": \""+ug.getDescription()+"\",\n" +
                    "\"stockPrewarning\": \""+ug.getStockPrewarning()+"\",\n" +
                    "\"pieceMeasureUnit\": \"\",\n" +
                    "\"havePieceUnit\": \""+ug.getHavePieceUnit()+"\",\n" +
                    "\"pieceUnitPrice\": \"\",\n" +
                    "\"packageScaledValue\": \"\",\n" +
                    "\"pieceScaledValue\": \"\",\n" +
                    "\"exciseDutyCode\": \"\",\n" +
                    "\"haveOtherUnit\": \""+ug.getHaveOtherUnit()+"\",\n" +
                    "\"goodsOtherUnits\": []\n" +
                    "},\n" +
                    "]";
        }
        else {
            req = "[\n" +
                    "{\n" +
                    "\"operationType\": \"" + ug.getOperationType() + "\",\n" +
                    "\"goodsName\": \"" + ug.getGoodsName() + "\",\n" +
                    "\"goodsCode\": \"" + b + "\",\n" +
                    "\"measureUnit\": \"" + ug.getMeasureUnit() + "\",\n" +
                    "\"unitPrice\": \"" + ug.getUnitPrice() + "\",\n" +
                    "\"currency\": \"" + ug.getCurrency() + "\",\n" +
                    "\"commodityCategoryId\": \"" + ug.getCommodityCategoryId() + "\",\n" +
                    "\"haveExciseTax\": \"" + ug.getHaveExciseTax() + "\",\n" +
                    "\"description\": \"" + ug.getDescription() + "\",\n" +
                    "\"stockPrewarning\": \"" + ug.getStockPrewarning() + "\",\n" +
                    "\"pieceMeasureUnit\": \"" + ug.getPieceMeasureUnit() + "\",\n" +
                    "\"havePieceUnit\": \"" + ug.getHavePieceUnit() + "\",\n" +
                    "\"pieceUnitPrice\": \"" + ug.getPieceUnitPrice() + "\",\n" +
                    "\"packageScaledValue\": \"" + ug.getPackageScaledValue() + "\",\n" +
                    "\"pieceScaledValue\": \"" + ug.getPieceScaledValue() + "\",\n" +
                    "\"exciseDutyCode\": \"\",\n" +
                    "\"haveOtherUnit\": \"" + ug.getHaveOtherUnit() + "\",\n" +
                    "\"goodsOtherUnits\": []\n" +
                    "},\n" +
                    "]";
        }

        JSONArray jsonArr = new JSONArray(req);

        String encrypted = b64.encodeRequest(jsonArr.toString());
        Base64Decode base64Decode = new Base64Decode();
        String resp = "";

        //String signature = Base64.encodeToString(signData(encrypted,keystore,alias));
        String signature = "";
        String dataExchangeId = UUID.randomUUID().toString().replace("-","").toUpperCase();
        String referenceno = UUID.randomUUID().toString().replace("-","").toUpperCase().substring(0,9);
        String longitude = "116.397128";
        String latitude = "39.916527";
        String codetype = "1";
        String encryptcode = "1";
        String zipcode = "0";
        //String date  = stimeservice.getURAServerTime();
        String pattern = "YYYY-MM-dd HH:mm:ss";
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
        String date = simpleDateFormat.format(new Date());

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
                "        \"interfaceCode\": \"T130\",\n" +
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
                "            \"responseTimeFormat\": \"dd/MM/yyyy HH:mm:ss\",\n" +
                "            \"referenceNo\": \""+referenceno+"\"\n" +
                "        }\n" +
                "    },\n" +
                "    \"returnStateInfo\": {\n" +
                "        \"returnCode\": \"\",\n" +
                "        \"returnMessage\": \"\"\n" +
                "    }\n" +
                "}";

        System.out.println(json);
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
        UploadGoodsResponse rp = new UploadGoodsResponse();

        try {
            Response response = client.newCall(request).execute();
            String responsebody = response.body().string();
            Gson gs = new Gson();

            if(response.isSuccessful())
            {
                ur = gs.fromJson(responsebody, URARequest.class);
            }
            resp = ur.getData().getContent();
            resp = base64Decode.decodeResponse(resp);

            rp.setCode(ur.getReturnStateInfo().getReturnCode());
            rp.setDescription(ur.getReturnStateInfo().getReturnMessage());
            if(ur.getReturnStateInfo().getReturnCode().equalsIgnoreCase("00"))
            {
                //Update Status
                repository.updateURAstatus(ur.getReturnStateInfo().getReturnMessage(),ug.getGoodsCode());
            }
            else
            {
                //Update Status
                repository.updateURAstatus(ur.getReturnStateInfo().getReturnMessage(),ug.getGoodsCode());
            }

        } catch (IOException e) {
            return new ResponseEntity<>("ERROR - "+e.getLocalizedMessage(), HttpStatus.EXPECTATION_FAILED);
        }
        return new ResponseEntity<>(rp, HttpStatus.OK);
    }


    public ResponseEntity<?> modifyProduct(Good ug)  {
        Gson gson = new Gson();
        String req = "";
        String operationType = "102";
        if(ug.getHavePieceUnit().equalsIgnoreCase("102"))
        {
            req = "[\n" +
                    "{\n" +
                    "\"operationType\": \""+operationType+"\",\n" +
                    "\"goodsName\": \""+ug.getGoodsName()+"\",\n" +
                    "\"goodsCode\": \""+ug.getGoodsCode()+"\",\n" +
                    "\"measureUnit\": \""+ug.getMeasureUnit()+"\",\n" +
                    "\"unitPrice\": \""+ug.getUnitPrice()+"\",\n" +
                    "\"currency\": \""+ug.getCurrency()+"\",\n" +
                    "\"commodityCategoryId\": \""+ug.getCommodityCategoryId()+"\",\n" +
                    "\"haveExciseTax\": \""+ug.getHaveExciseTax()+"\",\n" +
                    "\"description\": \""+ug.getDescription()+"\",\n" +
                    "\"stockPrewarning\": \""+ug.getStockPrewarning()+"\",\n" +
                    "\"pieceMeasureUnit\": \"\",\n" +
                    "\"havePieceUnit\": \""+ug.getHavePieceUnit()+"\",\n" +
                    "\"pieceUnitPrice\": \"\",\n" +
                    "\"packageScaledValue\": \"\",\n" +
                    "\"pieceScaledValue\": \"\",\n" +
                    "\"exciseDutyCode\": \"\",\n" +
                    "\"haveOtherUnit\": \""+ug.getHaveOtherUnit()+"\",\n" +
                    "\"goodsOtherUnits\": []\n" +
                    "},\n" +
                    "]";
        }
        else {
            req = "[\n" +
                    "{\n" +
                    "\"operationType\": \"" + operationType + "\",\n" +
                    "\"goodsName\": \"" + ug.getGoodsName() + "\",\n" +
                    "\"goodsCode\": \"" + ug.getGoodsCode() + "\",\n" +
                    "\"measureUnit\": \"" + ug.getMeasureUnit() + "\",\n" +
                    "\"unitPrice\": \"" + ug.getUnitPrice() + "\",\n" +
                    "\"currency\": \"" + ug.getCurrency() + "\",\n" +
                    "\"commodityCategoryId\": \"" + ug.getCommodityCategoryId() + "\",\n" +
                    "\"haveExciseTax\": \"" + ug.getHaveExciseTax() + "\",\n" +
                    "\"description\": \"" + ug.getDescription() + "\",\n" +
                    "\"stockPrewarning\": \"" + ug.getStockPrewarning() + "\",\n" +
                    "\"pieceMeasureUnit\": \"" + ug.getPieceMeasureUnit() + "\",\n" +
                    "\"havePieceUnit\": \"" + ug.getHavePieceUnit() + "\",\n" +
                    "\"pieceUnitPrice\": \"" + ug.getPieceUnitPrice() + "\",\n" +
                    "\"packageScaledValue\": \"" + ug.getPackageScaledValue() + "\",\n" +
                    "\"pieceScaledValue\": \"" + ug.getPieceScaledValue() + "\",\n" +
                    "\"exciseDutyCode\": \"\",\n" +
                    "\"haveOtherUnit\": \"" + ug.getHaveOtherUnit() + "\",\n" +
                    "\"goodsOtherUnits\": []\n" +
                    "},\n" +
                    "]";
        }
        JSONArray jsonArr = new JSONArray(req);
        String encrypted = b64.encodeRequest(jsonArr.toString());
        Base64Decode base64Decode = new Base64Decode();
        String resp = "";
        String signature = "";
        String dataExchangeId = UUID.randomUUID().toString().replace("-","").toUpperCase();
        String referenceno = UUID.randomUUID().toString().replace("-","").toUpperCase().substring(0,9);
        String longitude = "116.397128";
        String latitude = "39.916527";
        String codetype = "1";
        String encryptcode = "1";
        String zipcode = "0";
        String pattern = "YYYY-MM-dd HH:mm:ss";
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
        String date = simpleDateFormat.format(new Date());

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
                "        \"interfaceCode\": \"T130\",\n" +
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
                "            \"responseTimeFormat\": \"dd/MM/yyyy HH:mm:ss\",\n" +
                "            \"referenceNo\": \""+referenceno+"\"\n" +
                "        }\n" +
                "    },\n" +
                "    \"returnStateInfo\": {\n" +
                "        \"returnCode\": \"\",\n" +
                "        \"returnMessage\": \"\"\n" +
                "    }\n" +
                "}";

        System.out.println(json);
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
        UploadGoodsResponse rp = new UploadGoodsResponse();

        try {
            Response response = client.newCall(request).execute();
            String responsebody = response.body().string();
            Gson gs = new Gson();

            if(response.isSuccessful())
            {
                ur = gs.fromJson(responsebody, URARequest.class);
            }
            resp = ur.getData().getContent();
            resp = base64Decode.decodeResponse(resp);

            rp.setCode(ur.getReturnStateInfo().getReturnCode());
            rp.setDescription(ur.getReturnStateInfo().getReturnMessage());
            if(ur.getReturnStateInfo().getReturnCode().equalsIgnoreCase("00"))
            {
                //Update Product in Local DB
                repository.save(ug);
                //Update Status
                repository.updateURAstatus(ur.getReturnStateInfo().getReturnMessage(),ug.getGoodsCode());
            }
        } catch (IOException e) {
            return new ResponseEntity<>("ERROR - "+e.getLocalizedMessage(), HttpStatus.EXPECTATION_FAILED);
        }
        return new ResponseEntity<>(rp, HttpStatus.OK);
    }
}
