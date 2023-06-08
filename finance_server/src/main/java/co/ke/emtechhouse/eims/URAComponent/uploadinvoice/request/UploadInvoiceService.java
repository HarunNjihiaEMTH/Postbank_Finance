package co.ke.emtechhouse.eims.URAComponent.uploadinvoice.request;


import co.ke.emtechhouse.eims.Finacle.utilities.Configurations;
import co.ke.emtechhouse.eims.InvoiceComponent.ImportServicesSeller.ImportServicesSellerRepo;
import co.ke.emtechhouse.eims.URAComponent.getservertime.ServerTimeService;
import co.ke.emtechhouse.eims.URAComponent.uploadinvoice.response.*;
import co.ke.emtechhouse.eims.URAComponent.urarequest.URARequest;
import co.ke.emtechhouse.eims.URAComponent.utils.Base64Decode;
import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
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
public class UploadInvoiceService {

    Configurations cn = new Configurations();
    String url = cn.getProperties().getProperty("ura.endpoint");
    String appid = cn.getProperties().getProperty("ura.appid");
    String version = cn.getProperties().getProperty("ura.version");
    String requestcode = cn.getProperties().getProperty("ura.requestcode");
    String responsecode = cn.getProperties().getProperty("ura.responsecode");
    String username = cn.getProperties().getProperty("ura.username");
    String devicemac = cn.getProperties().getProperty("ura.devicemac");
    String deviceno = cn.getProperties().getProperty("ura.deviceno");
    String tin = cn.getProperties().getProperty("ura.tin");
    String taxpayerid = cn.getProperties().getProperty("ura.taxpayerid");

    String keystore = cn.getProperties().getProperty("ura.keystore");

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
    private ImportServicesSellerRepo importServicesSellerRepo;
    @Autowired
    private AirlineGoodsRepo airlineGoodsRepo;

    //Request
    @Autowired
    private BasicInfoRequestRepo basicInfoRequestRepo;

    @Autowired
    private BuyerDetailsRequestRepo buyerDetailsRequestRepo;

    @Autowired
    private ExtendDetailsRequestRepo extendDetailsRequestRepo;

    @Autowired
    private GoodsDetailsRequestRepo goodsDetailsRequestRepo;

    @Autowired
    private InvoiceAuditDetailsRepo invoiceAuditDetailsRepo;

    @Autowired
    private PayWayRequestRepo payWayRequestRepo;

    @Autowired
    private SellerDetailsRequestRepo sellerDetailsRequestRepo;

    @Autowired
    private SummaryInfoRequestRepo summaryInfoRequestRepo;

    @Autowired
    private TaxDetailsRequestRepo taxDetailsRequestRepo;

    @Autowired
    private AirlineGoodsRequestRepo airlineGoodsRequestRepo;

    @Autowired
    private ImportsServicesSellerRequestRepo importsServicesSellerRequestRepo;


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


    //Save invoice Details to database
    public ResponseEntity<?> saveInvoiceDetailsInDB(InvoiceUploadRequest req) {

        String invoiceno = "INV-" + UUID.randomUUID().toString().substring(0, 10).toUpperCase().replace("-", "");

        //Save Basic details
        BasicInformationRequest bir = req.getBasicInformation();
        bir.setLocalInvoiceNo(invoiceno);
        basicInfoRequestRepo.save(bir);

        //Save Buyer Details
        BuyerDetailsRequest bdr = req.getBuyerDetails();
        bdr.setLocalInvoiceNo(bir.getLocalInvoiceNo());
        buyerDetailsRequestRepo.save(bdr);

        //Save Extend details
        ExtendDetailsRequest edr = req.getExtend();
        edr.setLocalInvoiceNo(bir.getLocalInvoiceNo());
        extendDetailsRequestRepo.save(edr);

        //Save Goods Details
        for (GoodsDetailRequest gdr : req.getGoodsDetails()) {
            gdr.setLocalInvoiceNo(bir.getLocalInvoiceNo());
            goodsDetailsRequestRepo.save(gdr);
        }

        //Save URAPayWay details
        for (PayWayRequest pwr : req.getPayWay()) {
            pwr.setLocalInvoiceNo(bir.getLocalInvoiceNo());
            payWayRequestRepo.save(pwr);
        }

        //Save Seller Details
        SellerDetailsRequest sdr = req.getSellerDetails();
        sdr.setLocalInvoiceNo(bir.getLocalInvoiceNo());
        sellerDetailsRequestRepo.save(sdr);

        //Save Summary Details
        SummaryInfoRequest sr = req.getSummary();
        sr.setLocalInvoiceNo(bir.getLocalInvoiceNo());
        summaryInfoRequestRepo.save(sr);

        //Save Tax Details
        for (TaxDetailRequest tdr : req.getTaxDetails()) {
            tdr.setLocalInvoiceNo(bir.getLocalInvoiceNo());
            taxDetailsRequestRepo.save(tdr);
        }

        //Save Airline Goods
        for (AirlineGoodsRequest agr : req.getAirlineGoods()) {
            agr.setLocalInvoiceNo(bir.getLocalInvoiceNo());
            airlineGoodsRequestRepo.save(agr);
        }

        //Save ImportSellerDetails
        ImportServicesSellerRequest isr = req.getImportServicesSeller();
        isr.setLocalInvoiceNo(bir.getLocalInvoiceNo());
        importsServicesSellerRequestRepo.save(isr);

        //Save Audit Details
        InvoiceAuditDetails iad = new InvoiceAuditDetails();
        iad.setDeletedBy("-");
        iad.setLocalInvoiceNo(invoiceno);
        iad.setDeletedFlag("N");
        iad.setDeletedTime(new Date());
        iad.setModifiedBy("-");
        iad.setModifiedTime(new Date());
        iad.setModifiedBy("-");
        iad.setPostedToURABy("-");
        iad.setPostedToURAFlag("N");
        iad.setPostedToURATime(new Date());
        iad.setReason("-");
        iad.setVerifiedBy("-");
        iad.setVerifiedTime(new Date());
        iad.setVerifiedFlag("N");
        iad.setStatus("Pending");
        //iad.setImportOrLocal(req.getImportOrLocal());
        invoiceAuditDetailsRepo.save(iad);
        log.info("{ OK }Invoice Saved Successfully!");
        return new ResponseEntity<>("Invoice Saved Successfully! Generated Invoice NO is - " + invoiceno, HttpStatus.CREATED);
    }

    //Approve or Reject Invoice
    public ResponseEntity<?> approveOrReject(ApproveRequest req) {
        if (invoiceAuditDetailsRepo.findByLocalInvoiceNo(req.getInvoiceno()).size() > 0) {
            //Check Current invoice status
            String[] flags = invoiceAuditDetailsRepo.selectCurrentStatus(req.getInvoiceno()).split(",");
            if (flags.length > 0) {
                //Check Deleted flag
                if (flags[0].equalsIgnoreCase("Y")) {
                    return new ResponseEntity<>("Invoice No. " + req.getInvoiceno() + " Was Deleted!", HttpStatus.OK);
                }

                //Check posted to URA flag
                else if (flags[1].equalsIgnoreCase("Y")) {
                    return new ResponseEntity<>("Invoice No. " + req.getInvoiceno() + " Was already Posted to URA!", HttpStatus.OK);
                }

                //Check Verified Flag and Status
                else if (flags[2].equalsIgnoreCase("Y") || flags[3].equalsIgnoreCase("Approved")) {
                    return new ResponseEntity<>("Invoice No. " + req.getInvoiceno() + " Was already Approved!", HttpStatus.OK);
                } else {
                    if (req.getAction().equalsIgnoreCase("Approve")) {
                        //Update status in audit table
                        invoiceAuditDetailsRepo.approveOrReject("Approved", req.getMessage(), req.getMessage(), new Date(), "Y", req.getInvoiceno());

                        return new ResponseEntity<>("Invoice No. " + req.getInvoiceno() + " Approved Successfully By - " + req.getUsername(), HttpStatus.OK);
                    } else if (req.getAction().equalsIgnoreCase("Reject")) {
                        //Update status in audit table
                        invoiceAuditDetailsRepo.approveOrReject("Rejected", req.getMessage(), req.getMessage(), new Date(), "Y", req.getInvoiceno());
                        return new ResponseEntity<>("Invoice No. " + req.getInvoiceno() + " Rejected Successfully By - " + req.getUsername() + " because - " + req.getMessage(), HttpStatus.OK);
                    } else {
                        return new ResponseEntity<>("Invalid Action Command Received! Valid Commands are APPROVE and REJECT", HttpStatus.OK);
                    }
                }
            } else {
                return new ResponseEntity<>("Invoice No - " + req.getInvoiceno() + " Does not exist in the database!", HttpStatus.OK);
            }
        } else {
            return new ResponseEntity<>("Invoice No - " + req.getInvoiceno() + " Does not exist in the database!", HttpStatus.OK);
        }
    }

    //Update Invoice
//    public ResponseEntity<?> updateInvoiceDetailsInDB(InvoiceUploadRequest req) {
//        //Save Basic details
//        BasicInformationRequest bir = req.getBasicInformation();
//        basicInfoRequestRepo.save(bir);
//
//        //Save Buyer Details
//        BuyerDetailsRequest bdr = req.getBuyerDetails();
//        buyerDetailsRequestRepo.save(bdr);
//
//        //Save Extend details
//        ExtendDetailsRequest edr = req.getExtend();
//        extendDetailsRequestRepo.save(edr);
//
//        //Save Goods Details
//        for (GoodsDetailRequest gdr : req.getGoodsDetails()) {
//            goodsDetailsRequestRepo.save(gdr);
//        }
//
//        //Save URAPayWay details
//        for (PayWayRequest pwr : req.getPayWay()) {
//            payWayRequestRepo.save(pwr);
//        }
//
//        //Save Seller Details
//        SellerDetailsRequest sdr = req.getSellerDetails();
//        sellerDetailsRequestRepo.save(sdr);
//
//        //Save Summary Details
//        SummaryInfoRequest sr = req.getSummary();
//        summaryInfoRequestRepo.save(sr);
//
//        //Save Tax Details
//        for (TaxDetailRequest tdr : req.getTaxDetails()) {
//            taxDetailsRequestRepo.save(tdr);
//        }
//        //Save ImportSellerDetails
//        ImportServicesSellerRequest isr = req.getImportServicesSeller();
//        importsServicesSellerRequestRepo.save(isr);
//
//        //Save Audit Details
//        InvoiceAuditDetails iad = new InvoiceAuditDetails();
//        iad.setDeletedBy("-");
//        iad.setLocalInvoiceNo(req.getInvoiceno());
//        iad.setDeletedFlag("N");
//        iad.setDeletedTime(new Date());
//        iad.setModifiedBy("-");
//        iad.setModifiedTime(new Date());
//        iad.setModifiedBy("-");
//        iad.setPostedToURABy("-");
//        iad.setPostedToURAFlag("N");
//        iad.setPostedToURATime(new Date());
//        iad.setReason("-");
//        iad.setVerifiedBy("-");
//        iad.setVerifiedTime(new Date());
//        iad.setVerifiedFlag("N");
//        iad.setStatus("Pending");
//
//        invoiceAuditDetailsRepo.save(iad);
//
//        return new ResponseEntity<>("Invoice Details Updated Successfully! Invoice NO is - " + req.getInvoiceno(), HttpStatus.CREATED);
//    }


    public ResponseEntity<?> updateInvoiceDetailsInDB(InvoiceUploadRequest req) {
        try {
            //Save Basic details
            BasicInformationRequest bir = req.getBasicInformation();
            basicInfoRequestRepo.save(bir);

            //Save Buyer Details
            BuyerDetailsRequest bdr = req.getBuyerDetails();
            buyerDetailsRequestRepo.save(bdr);

            //Save Extend details
            ExtendDetailsRequest edr = req.getExtend();
            extendDetailsRequestRepo.save(edr);

            //Save Goods Details
            for (GoodsDetailRequest gdr : req.getGoodsDetails()) {
                goodsDetailsRequestRepo.save(gdr);
            }

            //Save URAPayWay details
            for (PayWayRequest pwr : req.getPayWay()) {
                payWayRequestRepo.save(pwr);
            }

            //Save Seller Details
            SellerDetailsRequest sdr = req.getSellerDetails();
            sellerDetailsRequestRepo.save(sdr);

            //Save Summary Details
            SummaryInfoRequest sr = req.getSummary();
            summaryInfoRequestRepo.save(sr);

            //Save Tax Details
            for (TaxDetailRequest tdr : req.getTaxDetails()) {
                taxDetailsRequestRepo.save(tdr);
            }
            //Save ImportSellerDetails
            ImportServicesSellerRequest isr = req.getImportServicesSeller();
            importsServicesSellerRequestRepo.save(isr);


            //Save Audit Details
            InvoiceAuditDetails iad = new InvoiceAuditDetails();
            iad.setDeletedBy("-");
            iad.setLocalInvoiceNo(req.getInvoiceno());
            iad.setDeletedFlag("N");
            iad.setDeletedTime(new Date());
            iad.setModifiedBy("-");
            iad.setModifiedTime(new Date());
            iad.setModifiedBy("-");
            iad.setPostedToURABy("-");
            iad.setPostedToURAFlag("N");
            iad.setPostedToURATime(new Date());
            iad.setReason("-");
            iad.setVerifiedBy("-");
            iad.setVerifiedTime(new Date());
            iad.setVerifiedFlag("N");
            iad.setStatus("Pending");

            invoiceAuditDetailsRepo.save(iad);

            return new ResponseEntity<>("Invoice Details Updated Successfully! Invoice NO is - " + req.getInvoiceno(), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to update invoice details: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    //Fetch All Rejected Invoices
    public ResponseEntity<?> allRejectedInvoices() {
        return new ResponseEntity<>(buyerDetailsRequestRepo.allRejected(), HttpStatus.OK);
    }

    //Fetch All Approved Invoices
    public ResponseEntity<?> allApprovedInvoices() {
        return new ResponseEntity<>(buyerDetailsRequestRepo.allApproved(), HttpStatus.OK);
    }

    //Fetch All Pending Invoices
    public ResponseEntity<?> allPendingInvoices() {
        return new ResponseEntity<>(buyerDetailsRequestRepo.allPending(), HttpStatus.OK);
    }

    //Update Posted To URA time, posted to URA flag and posted to URA time
    public void updatePostedToURAflagAndTime(String posted_by, String posted_flag, Date posted_time, String invoiceno) {
        invoiceAuditDetailsRepo.updatePostedToURAFlagAndPostedBy(posted_by, posted_flag, posted_time, invoiceno);
    }

    //Delete An Invoice (Update Flag)
    public ResponseEntity<?> deleteAnInvoice(String deleted_by, String deleted_flag, Date deleted_time, String invoiceno) {
        if (invoiceAuditDetailsRepo.findByLocalInvoiceNo(invoiceno).size() > 0) {
            invoiceAuditDetailsRepo.deleteInvoice(deleted_by, deleted_flag, deleted_time, invoiceno);
        }
        return new ResponseEntity<>("Invoice - " + invoiceno + " Deleted Successfully!", HttpStatus.OK);
    }




    //Upload Invoice to URA
    public ResponseEntity<?> uploadInvoiceToURA(String invoice, String buyertin) throws UnrecoverableKeyException, CertificateException, NoSuchAlgorithmException, SignatureException, IOException, KeyStoreException, InvalidKeyException {
        log.info("Initiating Invoice Upload To URA");
        InvoiceUploadRequest req = new InvoiceUploadRequest();
        req.setCustomerid(buyertin);
        Gson gson = new Gson();
        String refno = UUID.randomUUID().toString().substring(0, 10).toUpperCase();
        BuyerDetailsRequest buyerDetailsRequest = null;
        ExtendDetailsRequest extendDetailsRequest = null;
        List<GoodsDetailRequest> goodsDetailRequest = null;
        List<PayWayRequest> payWayRequest = null;
        SellerDetailsRequest sellerDetailsRequest = null;
        BasicInformationRequest basicInformationRequest = null;
        List<TaxDetailRequest> taxDetailRequests = null;
        SummaryInfoRequest summaryInfoRequest = null;
        List<AirlineGoodsRequest> airlineGoodsRequest = null;
        ImportServicesSellerRequest importServicesSeller = null;

        //Summary Details
        if (sellerDetailsRequestRepo.findByLocalInvoiceNo(invoice).size() > 0) {
            log.info("{ Created Summary Details }");
            summaryInfoRequest = summaryInfoRequestRepo.findByLocalInvoiceNo(invoice).get(0);
        }

        req.setSummary(summaryInfoRequest);

        //Seller Details
        if (sellerDetailsRequestRepo.findByLocalInvoiceNo(invoice).size() > 0) {
            log.info("{ Created Seller Details }");
            sellerDetailsRequest = sellerDetailsRequestRepo.findByLocalInvoiceNo(invoice).get(0);
            sellerDetailsRequest.setReferenceNo(refno);
        }

        req.setSellerDetails(sellerDetailsRequest);


        //Basic Information
        if (basicInfoRequestRepo.findByLocalInvoiceNo(invoice).size() > 0) {
            log.info("{ Created Basic Information }");
            basicInformationRequest = basicInfoRequestRepo.findByLocalInvoiceNo(invoice).get(0);
        }

        req.setBasicInformation(basicInformationRequest);

        //Buyer details
        if (buyerDetailsRequestRepo.findByLocalInvoiceNo(invoice).size() > 0) {
            log.info(" { Created Buyer Details } ");
            buyerDetailsRequest = buyerDetailsRequestRepo.findByLocalInvoiceNo(invoice).get(0);
        }

        req.setBuyerDetails(buyerDetailsRequest);

        //Extend Details
        if (extendDetailsRequestRepo.findByLocalInvoiceNo(invoice).size() > 0) {
            log.info("{ Created Extend Details }");
            extendDetailsRequest = extendDetailsRequestRepo.findByLocalInvoiceNo(invoice).get(0);
        }

        req.setExtend(extendDetailsRequest);

        //Goods Details
        if (goodsDetailsRequestRepo.findByLocalInvoiceNo(invoice).size() > 0) {
            log.info("{ Created Good Details }");
            goodsDetailRequest = goodsDetailsRequestRepo.findByLocalInvoiceNo(invoice);
        }

        req.setGoodsDetails(goodsDetailRequest);

        //Pay Way Details
        if (payWayRequestRepo.findByLocalInvoiceNo(invoice).size() > 0) {
            log.info("{ Created Pay Way Details }");
            payWayRequest = payWayRequestRepo.findByLocalInvoiceNo(invoice);
        }

        req.setPayWay(payWayRequest);

        //Tax Details
        if (taxDetailsRequestRepo.findByLocalInvoiceNo(invoice).size() > 0) {
            log.info("{ Created Tax Details }");
            taxDetailRequests = taxDetailsRequestRepo.findByLocalInvoiceNo(invoice);
        }
        req.setTaxDetails(taxDetailRequests);

        //Import Service Details
        if (importsServicesSellerRequestRepo.findByLocalInvoiceNo(invoice).size() > 0) {
            log.info("{ Created Import Service Details }");
            importServicesSeller = importsServicesSellerRequestRepo.findByLocalInvoiceNo(invoice).get(0);
        }
        log.info("Import Seller Details { " + importServicesSeller + " }");


        req.setImportServicesSeller(importServicesSeller);

        //Save Invoice Basic Details to Database
        String datetime = new SimpleDateFormat("YYYY-MM-dd HH:mm:ss").format(Calendar.getInstance().getTime());
        Optional<SaveInvoiceDetails> saveInvoiceDetails = repository.getInvoiceDetails(req.getInvoiceno());
        if (saveInvoiceDetails.isPresent()) {
            Integer recount = saveInvoiceDetails.get().getRetryCount();
            if (recount < 5) {
                saveInvoiceDetails.get().setRetryCount(recount + 1);

                repository.save(saveInvoiceDetails.get());
            }


        } else {
            SaveInvoiceDetails sid = new SaveInvoiceDetails();
            sid.setCustomerid(req.getCustomerid());
            sid.setInvoiceno(req.getInvoiceno());
            sid.setDatetime(datetime);
            sid.setUracode("NA");
            sid.setDeviceoperator(req.getBasicInformation().getOperator());
            sid.setUradescription("Pending");

            repository.save(sid);
        }

        String encrypted = gson.toJson(req);
        log.info("Encrypted Request Data { " + encrypted + " }");

        //Remove id and localInvoiceNo
        JSONObject obj = new JSONObject(encrypted);
        obj.getJSONObject("basicInformation").remove("localInvoiceNo");
        obj.getJSONObject("basicInformation").remove("id");

        obj.getJSONObject("buyerDetails").remove("id");
        obj.getJSONObject("buyerDetails").remove("localInvoiceNo");

        obj.getJSONObject("importServicesSeller").remove("id");
        obj.getJSONObject("importServicesSeller").remove("localInvoiceNo");

        for (Object jo : obj.getJSONArray("goodsDetails")) {
            JSONObject o = new JSONObject(jo);
            o.remove("id");
            o.remove("localInvoiceNo");
        }

        for (Object jo : obj.getJSONArray("payWay")) {
            JSONObject o = new JSONObject(jo);
            o.remove("id");
            o.remove("localInvoiceNo");
        }

        obj.getJSONObject("extend").remove("id");
        obj.getJSONObject("extend").remove("localInvoiceNo");

        obj.getJSONObject("summary").remove("id");
        obj.getJSONObject("summary").remove("localInvoiceNo");

        for (Object jo : obj.getJSONArray("taxDetails")) {
            JSONObject o = new JSONObject(jo);
            o.remove("id");
            o.remove("localInvoiceNo");
        }


//        if (req.getImportOrLocal().equalsIgnoreCase("NO")) {
//            obj.remove("airlineGoods");
//            obj.remove("importServicesSeller");
//        }

//        // Create the custom object
//        JSONObject customObject = new JSONObject();
//        customObject.put("destinationCountry", "China");
//        customObject.put("originCountry", "Kenya");
//        customObject.put("importExportFlag", "1");
//        customObject.put("confirmStatus", "0");
//        customObject.put("valuationMethod", "asdfghjkl");
//        customObject.put("prn", "1");

// Append the custom object to the existing obj
       // obj.put("custom", customObject);


        log.info("Request Body To be sent to URA \n" + obj);

        encrypted = b64.encodeRequest(obj.toString());
        String signature = "";
        //String signature = Base64.encodeToString(signData(encrypted,keystore,alias));
        String dataExchangeId = UUID.randomUUID().toString().replace("-", "").toUpperCase();
        String referenceno = UUID.randomUUID().toString().replace("-", "").toUpperCase().substring(0, 9);
        String longitude = "116.397128";
        String latitude = "39.916527";
        String codetype = "1";
        String encryptcode = "1";
        String zipcode = "0";
        //String date  = stimeservice.getURAServerTime();
        String date = new SimpleDateFormat("YYYY-MM-dd HH:mm:ss").format(Calendar.getInstance().getTime());

        String json = "{\n" +
                "    \"data\": {\n" +
                "        \"content\": \"" + encrypted + "\",\n" +
                "        \"signature\": \"" + signature + "\",\n" +
                "        \"dataDescription\": {\n" +
                "            \"codeType\": \"" + codetype + "\",\n" +
                "            \"encryptCode\": \"" + encryptcode + "\",\n" +
                "            \"zipCode\": \"" + zipcode + "\"\n" +
                "        }\n" +
                "    },\n" +
                "    \"globalInfo\": {\n" +
                "        \"appId\": \"" + appid + "\",\n" +
                "        \"version\": \"" + version + "\",\n" +
                "        \"dataExchangeId\": \"" + dataExchangeId + "\",\n" +
                "        \"interfaceCode\": \"T109\",\n" +
                "        \"requestCode\": \"" + requestcode + "\",\n" +
                "        \"requestTime\": \"" + date + "\",\n" +
                "        \"responseCode\": \"" + responsecode + "\",\n" +
                "        \"userName\": \"" + username + "\",\n" +
                "        \"deviceMAC\": \"" + devicemac + "\",\n" +
                "        \"deviceNo\": \"" + deviceno + "\",\n" +
                "        \"tin\": \"" + tin + "\",\n" +
                "        \"brn\": \"\",\n" +
                "        \"taxpayerID\": \"" + taxpayerid + "\",\n" +
                "        \"longitude\": \"" + longitude + "\",\n" +
                "        \"latitude\": \"" + latitude + "\",\n" +
                "        \"extendField\": {\n" +
                "            \"responseDateFormat\": \"dd/MM/yyyy\",\n" +
                "            \"responseTimeFormat\": \"dd/MM/yyyy HH:mm:ss\",\n" +
                "            \"referenceNo\": \"" + referenceno + "\"\n" +
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
        UploadInvoiceResponse res = new UploadInvoiceResponse();
        URAInvoiceResponse uir = null;

        try {
            log.info("Sending Request At " + new Date());
            Response response = client.newCall(request).execute();
            String responsebody = response.body().string();
            log.info("Response From URA is  " + responsebody);
            Gson gs = new Gson();

            if (response.isSuccessful()) {
                ur = gs.fromJson(responsebody, URARequest.class);
                log.info("Successful Response Received");
                //Update Posted to URA Flag and user who posted to URA
                updatePostedToURAflagAndTime(basicInformationRequest.getOperator(), "Y", new Date(), buyerDetailsRequest.getLocalInvoiceNo());
            }

            res.setCode(ur.getReturnStateInfo().getReturnCode());
            res.setDescription(ur.getReturnStateInfo().getReturnMessage());

            //URA Response
            uir = gs.fromJson(b64.decodeResponse(ur.getData().getContent()), URAInvoiceResponse.class);

            res.setBody(uir);

            if (res.getCode().equalsIgnoreCase("00")) {
                //Update URA status
                repository.updateURAstatus(ur.getReturnStateInfo().getReturnCode(), ur.getReturnStateInfo().getReturnMessage(), uir.getBasicInformation().getInvoiceNo(), req.getCustomerid());

                //Save Invoice Upload Response From URA
                //Save Basic details
                String invoiceno = uir.getBasicInformation().getInvoiceNo();
                String customerid = req.getCustomerid();

                BasicInfoResponse bir = uir.getBasicInformation();
                bir.setCustomerid(customerid);
                basicInfoRepository.save(bir);

                //Save Buyer Details
                BuyerDetsResponse bdr = uir.getBuyerDetails();
                bdr.setInvoiceId(invoiceno);
                bdr.setCustomerid(customerid);
                buyerDetailsRepository.save(bdr);

                //Save Extend details
                ExtendDetsResponse edr = uir.getExtend();
                edr.setInvoiceId(invoiceno);
                edr.setCustomerid(customerid);
                extendRepository.save(edr);

                //Save Goods Details
                for (GoodsDetsResponse gdr : uir.getGoodsDetails()) {
                    gdr.setInvoiceId(invoiceno);
                    gdr.setCustomerid(customerid);
                    goodsDetailsRepository.save(gdr);
                }

                //Save URAPayWay details
                for (PayWayResponse pwr : uir.getPayWay()) {
                    pwr.setInvoiceId(invoiceno);
                    pwr.setCustomerid(customerid);
                    payWayRepository.save(pwr);
                }

                //Save Seller Details
                SellerDetsResponse sdr = uir.getSellerDetails();
                sdr.setInvoiceId(invoiceno);
                sdr.setCustomerid(customerid);
                sellersDetailsRepository.save(sdr);

                //Save Summary Details
                SummaryResponse sr = uir.getSummary();
                sr.setCustomerid(customerid);
                sr.setInvoiceId(invoiceno);
                summaryRepository.save(sr);

                //Save Tax Details
                for (TaxDetailResponse tdr : uir.getTaxDetails()) {
                    tdr.setCustomerid(customerid);
                    tdr.setInvoiceId(invoiceno);
                    taxDetailRepository.save(tdr);
                }

                //Import Seller Details
                ImportServiceSellerResponse isdr = uir.getImportServiceSeller();
                if (isdr != null) {
                    isdr.setInvoiceId(invoiceno);
                    isdr.setCustomerid(customerid);
                    importServicesSellerRepo.save(isdr);
                } else {
                    log.info("Random test");


                    ImportServiceSellerResponse isdres = new ImportServiceSellerResponse();
                    isdres.setInvoiceId(invoiceno);
                    isdres.setCustomerid(customerid);

                    if (req.getImportServicesSeller().getImportInvoiceDate() == null) {
                        isdres.setImportInvoiceDate("NA");
                    } else {
                        isdres.setImportInvoiceDate(req.getImportServicesSeller().getImportInvoiceDate());
                    }
                    if (req.getImportServicesSeller().getImportBusinessName() == null) {
                        isdres.setImportBusinessName("NA");
                    } else {
                        isdres.setImportBusinessName(req.getImportServicesSeller().getImportBusinessName());
                    }
                    if (req.getImportServicesSeller().getImportAddress() == null) {
                        isdres.setImportAddress("NA");
                    } else {
                        isdres.setImportAddress(req.getImportServicesSeller().getImportAddress());
                    }

                    if (req.getImportServicesSeller().getImportEmailAddress() == null) {
                        isdres.setImportEmailAddress("NA");
                    } else {
                        isdres.setImportEmailAddress(req.getImportServicesSeller().getImportEmailAddress());
                    }

                    if (req.getImportServicesSeller().getImportContactNumber() == null) {
                        isdres.setImportContactNumber("NA");
                    } else {
                        isdres.setImportContactNumber(req.getImportServicesSeller().getImportContactNumber());
                    }

                    importServicesSellerRepo.save(isdres);
                }


                //Airline Goods
                List<AirlineGoodsResponse> agd = uir.getAirlineGoodsDetails();
                if (agd != null) {
                    for (AirlineGoodsResponse agr : agd) {
                        agr.setInvoiceId(invoiceno);
                        agr.setCustomerid(customerid);
                        airlineGoodsRepo.save(agr);
                    }
                }

            } else {
                log.info("Failed Response { Updating Status in DB }");
                //Update URA status (For failed)
                repository.updateURAstatus(ur.getReturnStateInfo().getReturnCode(), ur.getReturnStateInfo().getReturnMessage(), req.getBasicInformation().getLocalInvoiceNo(), req.getCustomerid());
            }

        } catch (IOException e) {
            res.setCode("416");
            res.setDescription("Error Uploading to URA - " + e.getMessage());
            res.setBody(null);
            log.info("Error Uploading to URA - " + e.getMessage());
            return new ResponseEntity<>("ERROR - " + e.getLocalizedMessage(), HttpStatus.EXPECTATION_FAILED);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }


}