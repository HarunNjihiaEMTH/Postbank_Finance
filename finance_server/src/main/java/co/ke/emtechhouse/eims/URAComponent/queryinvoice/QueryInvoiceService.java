package co.ke.emtechhouse.eims.URAComponent.queryinvoice;


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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.*;
import java.security.cert.CertificateException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
public class QueryInvoiceService {

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
    //static String date = new SimpleDateFormat("YYYY-MM-dd HH:mm:ss").format(Calendar.getInstance().getTime());
    Base64Decode b64 = new Base64Decode();
    @Autowired
    private ServerTimeService stimeservice;


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


    public static String encrypt(PrivateKey publicKey, String plainText) {
        if (plainText == null || plainText.isEmpty()) {
            System.out.println("No data to encrypt!");
            return plainText;
        }
        Cipher cipher = null;
        String encryptedString = "";
        try {
            // Creating a Cipher object
            cipher = Cipher.getInstance("RSA");

            // Initializing a Cipher object with public key
            cipher.init(Cipher.ENCRYPT_MODE, publicKey);

            // Encrypting the plain text string
            byte[] encryptedText = cipher.doFinal(plainText.getBytes());

            // Encoding the encrypted text to Base64
            encryptedString = java.util.Base64.getEncoder().encodeToString(encryptedText);
            System.out.println("Encrypted : \n"+encryptedString);

        } catch (NoSuchAlgorithmException | NoSuchPaddingException | InvalidKeyException
                 | IllegalBlockSizeException | BadPaddingException ex) {
            System.out.println("Exception caught while encrypting : " + ex);
        }

        return encryptedString;
    }


    public static PrivateKey loadPrivateKey(String path) throws KeyStoreException, CertificateException, IOException, NoSuchAlgorithmException, UnrecoverableKeyException {
        // Private Keystore
        FileInputStream privateKeyFile = new FileInputStream(path+"/uratest.jks");
        // Read the private keystore and get Private Key
        KeyStore privateKeyStore = KeyStore.getInstance(KeyStore.getDefaultType());
        System.out.println("Type of private key: " + privateKeyStore.getDefaultType());
        privateKeyStore.load(privateKeyFile, "changeit".toCharArray());
        PrivateKey privateKey = (PrivateKey)privateKeyStore.getKey("ura", "changeit".toCharArray());
        return privateKey;
    }



    public ResponseEntity<?> queryInvoiceDetails(InvoiceInqReq req) throws UnrecoverableKeyException, CertificateException, NoSuchAlgorithmException, SignatureException, IOException, KeyStoreException, InvalidKeyException {
        Gson gson = new Gson();
        String encrypted = gson.toJson(req);
        encrypted = b64.encodeRequest(encrypted);
        Base64Decode base64Decode = new Base64Decode();
        String resp = "";
        QueryInvDetRes qir = null;

        String signature = Base64.encodeToString(signData(encrypted,"/home/emukule/Downloads/emtech-ura/keys/new/uratest.jks","ura"));
        String dataExchangeId = UUID.randomUUID().toString().replace("-","").toUpperCase();
        String referenceno = UUID.randomUUID().toString().replace("-","").toUpperCase().substring(0,9);
        String longitude = "116.397128";
        String latitude = "39.916527";
        String codetype = "1";
        String encryptcode = "1";
        String zipcode = "0";
        //String date  = stimeservice.getURAServerTime();
        String date = new SimpleDateFormat("YYYY-MM-dd HH:mm:ss").format(Calendar.getInstance().getTime());

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
                "        \"interfaceCode\": \"T107\",\n" +
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

        OkHttpClient client = new OkHttpClient();
        MediaType mediaType = MediaType.parse("application/json");
        okhttp3.RequestBody body = okhttp3.RequestBody.create(json, mediaType);
        Request request = new Request.Builder()
                .url(url)
                .post(body)
                .addHeader("content-type", "application/json")
                .build();

        URARequest ur = null;

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
            qir = gs.fromJson(resp, QueryInvDetRes.class);
        } catch (IOException e) {
            return new ResponseEntity<>("ERROR - "+e.getLocalizedMessage(), HttpStatus.EXPECTATION_FAILED);
        }
        return new ResponseEntity<>(qir, HttpStatus.OK);
    }


    public ResponseEntity<?> queryInvoice(QueryInvoiceRequest req) throws UnrecoverableKeyException, CertificateException, NoSuchAlgorithmException, SignatureException, IOException, KeyStoreException, InvalidKeyException {
        Gson gson = new Gson();
        String encrypted = gson.toJson(req);
        encrypted = b64.encodeRequest(encrypted);
        Base64Decode base64Decode = new Base64Decode();
        String resp = "";
        QueryInvoiceResponse qr = null;

        String signature = Base64.encodeToString(signData(encrypted,"/home/emukule/Downloads/emtech-ura/keys/new/uratest.jks","ura"));
        String dataExchangeId = UUID.randomUUID().toString().replace("-","").toUpperCase();
        String referenceno = UUID.randomUUID().toString().replace("-","").toUpperCase().substring(0,9);
        String longitude = "116.397128";
        String latitude = "39.916527";
        String codetype = "1";
        String encryptcode = "1";
        String zipcode = "0";
        String date  = stimeservice.getURAServerTime();

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
                "        \"interfaceCode\": \"T107\",\n" +
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
            qr = gs.fromJson(resp, QueryInvoiceResponse.class);
        } catch (IOException e) {
            return new ResponseEntity<>("ERROR - "+e.getLocalizedMessage(), HttpStatus.EXPECTATION_FAILED);
        }
        return new ResponseEntity<>(qr, HttpStatus.OK);
    }
}
