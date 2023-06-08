package co.ke.emtechhouse.eims.URAComponent.CreditNote.CreditNoteCancellation;


import co.ke.emtechhouse.eims.Finacle.utilities.Configurations;
import co.ke.emtechhouse.eims.URAComponent.CreditNote.*;
import co.ke.emtechhouse.eims.URAComponent.CreditNote.CreditNoteresponse.CreditNoteResponse;
import co.ke.emtechhouse.eims.URAComponent.uploadinvoice.request.SaveInvoiceDetails;
import co.ke.emtechhouse.eims.URAComponent.uploadinvoice.request.SaveInvoiceDetailsRepository;
import co.ke.emtechhouse.eims.URAComponent.urarequest.URARequest;
import co.ke.emtechhouse.eims.URAComponent.utils.Base64Decode;
import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import org.apache.sshd.common.util.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.*;
import java.security.cert.CertificateException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
@Slf4j
public class CreditNoteCancellationService {

    Base64Decode b64 = new Base64Decode();
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

    @Autowired
    private CancelCreditNoteRepo cancelCreditNoteRepo;
    @Autowired
    private CreditNoteApplicationService creditNoteApplicationService;

    @Autowired
    private CreditNoteApplciationRepository crepo;
    @Autowired
    private SaveInvoiceDetailsRepository saveInvoiceDetailsRepository;
//    @Autowired
//    private CancelCreditNoteResponseRepository cancreditnoteresponserepository;


    public void applycreditnoteCanceling(CancelCreditNote cancelCreditNote) {
        try {

            cancelCreditNoteRepo.save(cancelCreditNote);
        } catch (Exception e) {
            log.info("Error {} " + e.getLocalizedMessage());
            e.printStackTrace();
        }


    }
    public List<CancelCreditNote> fetchApplied() {
        try {

           List<CancelCreditNote> cancelCreditNoteList= cancelCreditNoteRepo.findAll();
            return cancelCreditNoteList;
        } catch (Exception e) {
            log.info("Error {} " + e.getLocalizedMessage());
            e.printStackTrace();
            return null;
        }


    }
    //TODO: initiate credit note cancellation to URA
    public CancelCreditNoteResponse cancelcreditnote(CreditNotCancellationRequest request) throws UnrecoverableKeyException, CertificateException, NoSuchAlgorithmException, SignatureException, IOException, KeyStoreException, InvalidKeyException {
        Optional<CancelCreditNote> creditNoteCheck = cancelCreditNoteRepo.findByInvoiceNo(request.getInvoiceNo());
        Optional<SaveInvoiceDetails> saveInvoiceDetails =saveInvoiceDetailsRepository.getInvoiceDetails(request.getInvoiceNo());
        Optional<CreditNote> creditNote = crepo.findByInvoiNo(request.getInvoiceNo());

        CancelCreditNoteResponse cresponse = new CancelCreditNoteResponse();


        Gson gson = new Gson();

        if (creditNoteCheck.isPresent()){

            String myjson = gson.toJson(request);
            String encrypted = b64.encodeRequest(myjson.toString());

            String signature = Base64.encodeToString(creditNoteApplicationService.signData(encrypted,keystore,alias));
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
                    "        \"interfaceCode\": \"T114\",\n" +
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
            System.out.println("Json Request ::"+ json);

            OkHttpClient client = new OkHttpClient.Builder()
                    .connectTimeout(50, TimeUnit.SECONDS)
                    .writeTimeout(50, TimeUnit.SECONDS)
                    .readTimeout(50, TimeUnit.SECONDS)
                    .build();
            MediaType mediaType = MediaType.parse("application/json");
            okhttp3.RequestBody body = okhttp3.RequestBody.create(json, mediaType);
            Request req = new Request.Builder()
                    .url(url)
                    .post(body)
                    .addHeader("content-type", "application/json")
                    .build();

            URARequest ur = null;
//            UploadInvoiceResponse res = new UploadInvoiceResponse();
            CancelCreditNoteApplicationResponse cr = null;


            okhttp3.Response response = client.newCall(req).execute();
            String responsebody = response.body().string();
            Gson gs = new Gson();
            System.out.println("Response ::" + responsebody);

            if (response.isSuccessful()) {

                System.out.println("Success !!! ::" + responsebody);
                ur = gs.fromJson(responsebody, URARequest.class);

                creditNoteCheck.get().setPostedStatus("Y");
                creditNoteCheck.get().setReferenceNo("");
                cancelCreditNoteRepo.save(creditNoteCheck.get());
            }else {
                creditNoteCheck.get().setPostedStatus("F");
                creditNoteCheck.get().setReferenceNo("");
                cancelCreditNoteRepo.save(creditNoteCheck.get());
            }


            cresponse.setCode(ur.getReturnStateInfo().getReturnCode());
            cresponse.setDescription(ur.getReturnStateInfo().getReturnMessage());

            cr = gs.fromJson(b64.decodeResponse(ur.getData().getContent()), CancelCreditNoteApplicationResponse.class);



            String refNo =cr.getReferenceNo();

            if (cresponse.getCode().equalsIgnoreCase("00")) {
                //Update URA status
//                    repository.updateURAstatus(ur.getReturnStateInfo().getReturnCode(), ur.getReturnStateInfo().getReturnMessage(), uir.getBasicInformation().getInvoiceNo(), req.getCustomerid());
              if (cr == null){
                  creditNoteCheck.get().setResponseCode("00");
                  creditNoteCheck.get().setUraStatus("Successful");
                  creditNoteCheck.get().setStatus("Successful");
                  cresponse.setStatus("Successful");
                  creditNote.get().setCancellationstatus("Approved");
                  saveInvoiceDetails.get().setCreditNoteStatus("Cancelled");
                  creditNoteCheck.get().setReferenceNo(refNo);
                  saveInvoiceDetailsRepository.save(saveInvoiceDetails.get());
              }
            }else {
                creditNoteCheck.get().setResponseCode(cresponse.getCode());
                creditNoteCheck.get().setPostedStatus("F");
                creditNoteCheck.get().setUraStatus("Failed");
                cresponse.setStatus("Failed");
            }

            cancelCreditNoteRepo.save(creditNoteCheck.get());


        }
        return cresponse;
    }

}
