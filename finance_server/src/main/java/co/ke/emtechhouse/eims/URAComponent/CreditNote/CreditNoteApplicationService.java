package co.ke.emtechhouse.eims.URAComponent.CreditNote;

import co.ke.emtechhouse.eims.Finacle.utilities.Configurations;
import co.ke.emtechhouse.eims.URAComponent.CreditNote.BasicInfoCr.BasicInformationRequestCr;
import co.ke.emtechhouse.eims.URAComponent.CreditNote.BuyeDetails.BuyerDetailsRequestCr;
import co.ke.emtechhouse.eims.URAComponent.CreditNote.CreditNoteCancellation.CreditNotCancellationRequest;
import co.ke.emtechhouse.eims.URAComponent.CreditNote.CreditNoteresponse.CreditNoteResponse;
import co.ke.emtechhouse.eims.URAComponent.CreditNote.Extenddetails.ExtendDetailsCr;
import co.ke.emtechhouse.eims.URAComponent.CreditNote.GoodsDetailsCr.GoodsDetailsCr;
import co.ke.emtechhouse.eims.URAComponent.CreditNote.ImportServicesSeller.ImportServicesSeller;
import co.ke.emtechhouse.eims.URAComponent.CreditNote.Payway.PaywayInfo;
import co.ke.emtechhouse.eims.URAComponent.CreditNote.SellerrequestCr.SellerRequestCr;
import co.ke.emtechhouse.eims.URAComponent.CreditNote.SummuryInfoCr.SummaryInfoCr;
import co.ke.emtechhouse.eims.URAComponent.CreditNote.TaxDetail.TaxDetailsCr;
import co.ke.emtechhouse.eims.URAComponent.getservertime.ServerTimeService;
import co.ke.emtechhouse.eims.URAComponent.uploadinvoice.request.*;
import co.ke.emtechhouse.eims.URAComponent.uploadinvoice.response.*;
import co.ke.emtechhouse.eims.URAComponent.urarequest.URARequest;
import co.ke.emtechhouse.eims.URAComponent.utils.Base64Decode;
import co.ke.emtechhouse.eims.Utils.Response;
import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import org.apache.sshd.common.util.Base64;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.json.JSONObject;
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
import java.util.*;
import java.util.concurrent.TimeUnit;

@Service
@Slf4j
public class CreditNoteApplicationService {


    @Autowired
    private CreditNoteApplciationRepository crrepo;

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
    private SaveInvoiceDetailsRepository repository;

    //Response Repos
    @Autowired
    private BasicInfoRepository basicInfoRepository;
    @Autowired
    private BuyerDetailsRepository buyerDetailsRepository;
    @Autowired
    private ExtendRepository extendRepository;
    @Autowired
    private GoodsDetailsRepository goodsDetailsRepository;
    @Autowired
    private PayWayRepository payWayRepository;
    @Autowired
    private SellersDetailsRepository sellersDetailsRepository;
    @Autowired
    private SummaryRepository summaryRepository;
    @Autowired
    private TaxDetailRepository taxDetailRepository;

    @Autowired
    private SaveInvoiceDetailsRepository saveInvoiceDetailsRepository;


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




    public void applycreditnte(CreditNote creditNote) {
        try {

                crrepo.save(creditNote);
            Optional<SaveInvoiceDetails> saveInvoiceDetails =saveInvoiceDetailsRepository.getInvoiceDetails(creditNote.getOriInvoiceNo());
            if(saveInvoiceDetails.isPresent()){
                saveInvoiceDetails.get().setCreditNoteStatus("Applied");
                saveInvoiceDetailsRepository.save(saveInvoiceDetails.get());
            }
        } catch (Exception e) {
            log.info("Error {} " + e.getLocalizedMessage());
            e.printStackTrace();
        }


    }

    public CreditNoteResponse postCreditNoteApplication(String invoiceNo) throws UnrecoverableKeyException, CertificateException, NoSuchAlgorithmException, SignatureException, IOException, KeyStoreException, InvalidKeyException {
        Optional<CreditNote> creditNote = crrepo.findByInvoiNo(invoiceNo);
        Optional<SaveInvoiceDetails> saveInvoiceDetails =saveInvoiceDetailsRepository.getInvoiceDetails(invoiceNo);

        CreditNoteResponse cresponse = new CreditNoteResponse();

        CreditNoteRequest creditNoteRequest = new CreditNoteRequest();
        Gson gson = new Gson();
        if (creditNote.isPresent()){
            System.out.println("credit note exists");

            BuyerDetsResponse buyerDetsResponse = null;
            List<GoodsDetsResponse> goodsDetsResponses = null;
            List<PayWayResponse> payWayResponses = null;
            BasicInfoResponse basicInfoResponse = null;
            List<TaxDetailResponse> taxDetailResponses = null;
            SummaryResponse summaryResponse = null;


//                //Summary Details
            if (summaryRepository.findByinvoiceId(invoiceNo).size() > 0) {
                summaryResponse = summaryRepository.findByinvoiceId(invoiceNo).get(0);

            }
            SummaryInfoCr summaryInfoCr = new SummaryInfoCr();
            summaryInfoCr.setRemarks(summaryResponse.getRemarks());
            summaryInfoCr.setGrossAmount("-"+summaryResponse.getGrossAmount());
            summaryInfoCr.setItemCount(summaryResponse.getItemCount());
            summaryInfoCr.setModeCode(summaryResponse.getModeCode());
            summaryInfoCr.setNetAmount("-"+summaryResponse.getNetAmount());
            summaryInfoCr.setTaxAmount("-"+summaryResponse.getTaxAmount());
//            summaryInfoCr.setQrCode("asdfghjkl");
            summaryInfoCr.setQrCode(summaryResponse.getQrCode());


            creditNoteRequest.setSummary(summaryInfoCr);
            System.out.println("Summery :"+ summaryInfoCr);



            //Basic Information
            if (basicInfoRepository.findByinvoiceNo(invoiceNo).size() > 0) {
                basicInfoResponse = basicInfoRepository.findByinvoiceNo(invoiceNo).get(0);
            }
            BasicInformationRequestCr basicInformationRequestCr = new BasicInformationRequestCr();

            basicInformationRequestCr.setBranchId("207300908813650312");
            basicInformationRequestCr.setInvoiceKind(basicInfoResponse.getInvoiceKind());
            basicInformationRequestCr.setOperator(basicInfoResponse.getOperator());
            basicInformationRequestCr.setInvoiceIndustryCode(basicInfoResponse.getInvoiceIndustryCode());
            creditNoteRequest.setBasicInformationRequestCr(basicInformationRequestCr);
            creditNoteRequest.setSource(basicInfoResponse.getDataSource());


            //Buyer details
            if (buyerDetailsRepository.findByinvoiceId(invoiceNo).size() > 0) {
                buyerDetsResponse = buyerDetailsRepository.findByinvoiceId(invoiceNo).get(0);
            }


            BuyerDetailsRequestCr buyerDetailsRequestCr= new BuyerDetailsRequestCr();
            buyerDetailsRequestCr.setBuyerCitizenship(buyerDetsResponse.getBuyerCitizenship());
            buyerDetailsRequestCr.setBuyerSector(buyerDetsResponse.getBuyerSector());
            buyerDetailsRequestCr.setBuyerTin(buyerDetsResponse.getBuyerTin());
            buyerDetailsRequestCr.setBuyerType(buyerDetsResponse.getBuyerType());
            buyerDetailsRequestCr.setBuyerLegalName(buyerDetsResponse.getBuyerLegalName());


            buyerDetsResponse.setCreditNoteStatus("Applied");
            buyerDetailsRepository.save(buyerDetsResponse);



//            buyerDetailsRequestCr.set

            ImportServicesSeller importServicesSeller = new ImportServicesSeller();
            importServicesSeller.setImportInvoiceDate(basicInfoResponse.getIssuedDate());
            creditNoteRequest.setBuyerDetails(buyerDetailsRequestCr);
            creditNoteRequest.setImportServicesSeller(importServicesSeller);


            //Goods Details
            if (goodsDetailsRepository.findByinvoiceId(invoiceNo).size() > 0) {
                goodsDetsResponses = goodsDetailsRepository.findByinvoiceId(invoiceNo);
            }
            List<GoodsDetailsCr> goodsDetailsCrList =new ArrayList<>();
            for (GoodsDetsResponse g: goodsDetsResponses) {
                GoodsDetailsCr goodsDetailsCr =new GoodsDetailsCr();
                goodsDetailsCr.setDeemedFlag(g.getDeemedFlag());
                goodsDetailsCr.setGoodsCategoryId(g.getGoodsCategoryId());
                goodsDetailsCr.setItem(g.getItem());
                goodsDetailsCr.setDiscountFlag(g.getDiscountFlag());
                goodsDetailsCr.setQty("-"+g.getQty());//9
                goodsDetailsCr.setTax("-"+g.getTax());
                goodsDetailsCr.setExciseFlag(g.getExciseFlag());
                goodsDetailsCr.setTotal("-"+g.getTotal());
                goodsDetailsCr.setItemCode(g.getItemCode());
                goodsDetailsCr.setOrderNumber(g.getOrderNumber());
                goodsDetailsCr.setUnitOfMeasure(g.getUnitOfMeasure());
                goodsDetailsCr.setUnitPrice(g.getUnitPrice());
                goodsDetailsCr.setItemCode(g.getItemCode());
                goodsDetailsCr.setTaxRate(g.getTaxRate());
                goodsDetailsCrList.add(goodsDetailsCr);

            }


            creditNoteRequest.setGoodsDetails(goodsDetailsCrList);

            //Pay Way Details
            if (payWayRepository.findByinvoiceId(invoiceNo).size() > 0) {
                payWayResponses = payWayRepository.findByinvoiceId(invoiceNo);
            }
           List<PaywayInfo> paywayInfoList = new ArrayList<>();
            for (PayWayResponse pr:payWayResponses) {
                PaywayInfo paywayInfo = new PaywayInfo();
                paywayInfo.setPaymentMode(pr.getPaymentMode());
                paywayInfo.setOrderNumber(pr.getOrderNumber());
                paywayInfo.setPaymentAmount(pr.getPaymentAmount());
                paywayInfoList.add(paywayInfo);
            }

            creditNoteRequest.setPayWay(paywayInfoList);

            //Tax Details
            if (taxDetailRepository.findByinvoiceId(invoiceNo).size() > 0) {
                taxDetailResponses = taxDetailRepository.findByinvoiceId(invoiceNo);
            }

            List<TaxDetailsCr> taxDetailsCrList = new ArrayList<>();
            for (TaxDetailResponse tr:taxDetailResponses) {
                TaxDetailsCr taxDetailsCr = new TaxDetailsCr();

                taxDetailsCr.setTaxRate(tr.getTaxRate());
                taxDetailsCr.setTaxAmount("-"+tr.getTaxAmount());
                taxDetailsCr.setGrossAmount("-"+tr.getGrossAmount());
                taxDetailsCr.setNetAmount("-"+tr.getNetAmount());
                taxDetailsCr.setTaxCategoryCode(tr.getTaxCategoryCode());
                taxDetailsCr.setExciseUnit("101");
                taxDetailsCrList.add(taxDetailsCr);
            }
            creditNoteRequest.setTaxDetails(taxDetailsCrList);

            //                creditNote.set(basicInformationRequest);
            String apptime=new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(new Date());
            creditNoteRequest.setApplicationTime(apptime);
            creditNoteRequest.setCurrency(basicInfoResponse.getCurrency());
            creditNoteRequest.setOriInvoiceId(basicInfoResponse.getInvoiceId());
            creditNoteRequest.setOriInvoiceNo(basicInfoResponse.getInvoiceNo());
            creditNoteRequest.setContactEmail(creditNote.get().getContactEmail());
            creditNoteRequest.setContactMobileNum(creditNote.get().getContactMobileNum());
            creditNoteRequest.setReason(creditNote.get().getReason());
            creditNoteRequest.setContactName(creditNote.get().getContactName());
            creditNoteRequest.setReasonCode(creditNote.get().getReasonCode());
            creditNoteRequest.setInvoiceApplyCategoryCode("101");
            creditNoteRequest.setRemarks(creditNote.get().getRemarks());
            creditNoteRequest.setSellersReferenceNo(creditNote.get().getSellersReferenceNo());
            creditNoteRequest.setSource(creditNote.get().getSource());


            System.out.println("creditNoteRequest ::: "+ creditNoteRequest);

//            String encrypted = gson.toJson(creditNoteRequest);

            saveInvoiceDetails.get().setCreditNoteStatus("Applied");
            saveInvoiceDetailsRepository.save(saveInvoiceDetails.get());

//            Gson gson = new Gson();
            String myjson = gson.toJson(creditNoteRequest);
            String encrypted = b64.encodeRequest(myjson.toString());

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
                    "        \"interfaceCode\": \"T110\",\n" +
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
            Request request = new Request.Builder()
                    .url(url)
                    .post(body)
                    .addHeader("content-type", "application/json")
                    .build();


            URARequest ur = null;
//            UploadInvoiceResponse res = new UploadInvoiceResponse();
            CreditNoteApplicationResponse cr = null;
            //TODO: Capture response from  ura


//            try {
                okhttp3.Response response = client.newCall(request).execute();
                String responsebody = response.body().string();
                Gson gs = new Gson();
                System.out.println("Response ::" + responsebody);
                if (response.isSuccessful()) {

                    System.out.println("Success !!! ::" + responsebody);
                    ur = gs.fromJson(responsebody, URARequest.class);
//
//                    //Update Posted to URA Flag and user who posted to URA
//                    updatePostedToURAflagAndTime(basicInformationRequest.getOperator(), "Y", new Date(), buyerDetailsRequest.getLocalInvoiceNo());
//
                    creditNote.get().setPostedStatus("Y");
//                    creditNote.get().setReferenceNo("");

                    crrepo.save(creditNote.get());
                }

                cresponse.setCode(ur.getReturnStateInfo().getReturnCode());
                cresponse.setDescription(ur.getReturnStateInfo().getReturnMessage());

                //URA Response
                cr = gs.fromJson(b64.decodeResponse(ur.getData().getContent()), CreditNoteApplicationResponse.class);

                String refNo =cr.getReferenceNo();





//                cresponse.setBody(uir);

                if (cresponse.getCode().equalsIgnoreCase("00")) {
                    //Update URA status
//                    repository.updateURAstatus(ur.getReturnStateInfo().getReturnCode(), ur.getReturnStateInfo().getReturnMessage(), uir.getBasicInformation().getInvoiceNo(), req.getCustomerid());
                    creditNote.get().setResponseCode("00");
                    buyerDetsResponse.setCreditNoteStatus("Approved");
                    creditNote.get().setUraStatus("Successful");
                    cresponse.setStatus("Successful");
                    creditNote.get().setReferenceNo(refNo);
                    saveInvoiceDetails.get().setCreditNoteStatus("Approved");
                    buyerDetailsRepository.save(buyerDetsResponse);
                }else {
                    creditNote.get().setResponseCode(cresponse.getCode());
                    creditNote.get().setUraStatus("Failed");
                    cresponse.setStatus("Failed");
                    saveInvoiceDetails.get().setCreditNoteStatus("Not Approved");


                }

                crrepo.save(creditNote.get());
            saveInvoiceDetailsRepository.save(saveInvoiceDetails.get());

//                } catch (Exception e) {
//                log.error(e.getLocalizedMessage());
//                e.printStackTrace();
//            }
        }
        return cresponse;


    }
    public List<CreditNote> getcreditNotes(){
        try{
            List<CreditNote> creditNoteList = crrepo.findAll();
            return creditNoteList;
        } catch (Exception e) {
            log.error(e.getLocalizedMessage());
            e.printStackTrace();
            return  null;
        }
    }
    public  void updateCrditNote(CreditNote creditNote){
        try{
            crrepo.save(creditNote);

        }catch (Exception e){
            log.error(e.getLocalizedMessage());

        }
    }

    public List<CreditNote> getcreditNoteperStatus(String status){
        try{
            List<CreditNote> creditNoteList = crrepo.findByStatus(status);
            return creditNoteList;
        } catch (Exception e) {
            log.error(e.getLocalizedMessage());
            e.printStackTrace();
            return  null;
        }
    }
    public void deleteCreditNote(Long creditNoteId){
        try{
            crrepo.deleteById(creditNoteId);

        } catch (Exception e) {
            log.error(e.getLocalizedMessage());
            e.printStackTrace();
        }
    }
}
