package co.ke.emtechhouse.eims.TransactionComponent.FinacleService;

import co.ke.emtechhouse.eims.Finacle.utilities.Configurations;
import co.ke.emtechhouse.eims.PurchaseOrderComponent.PurchaseOrder;
import co.ke.emtechhouse.eims.PurchaseOrderComponent.PurchaseOrderRepo;
import co.ke.emtechhouse.eims.TransactionComponent.FinacleService.FIXMLS.SuccessReponse;
import co.ke.emtechhouse.eims.TransactionComponent.Partrans.Partrans;
import co.ke.emtechhouse.eims.TransactionComponent.Transheader;
import co.ke.emtechhouse.eims.TransactionComponent.TransheaderRepo;
import co.ke.emtechhouse.eims.Utils.DisableVerificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import javax.xml.transform.Source;
import javax.xml.transform.stream.StreamSource;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.*;

@Component
public class FinaclePostingService {
    @Autowired
    DisableVerificationService disableVerification;
    @Autowired
    TransheaderRepo transheaderRepo;
    @Value("${partrandate}")
    private String partransdate;
    @Autowired
    private PurchaseOrderRepo purchaseOrderRepo;


    Configurations cn = new Configurations();
    //TODO: POSTING TO FINALCE
    public ResponseEntity<SuccessReponse> postToFinacle(Transheader transheader){
//        Transheader transheader = transheader;
        SuccessReponse successReponse= new SuccessReponse();
        try {
//            Get payment Particulars

//            List<Transheaderpart> paymentTrans = transheader.getPaymentTrans();
            List<Partrans> paymentTrans = transheader.getPartrans();

            //new
//            List<Partrans> paymentTrans = transheader.getPartans();

            System.out.println("Patrans size ::" + paymentTrans.size());
//An array of payment Particulars
            ArrayList<Partrans> debits = new ArrayList<>();
            ArrayList<Partrans> credit = new ArrayList<>();

//            ArrayList<Partrans> debits = new ArrayList<>();
//            ArrayList<Partrans> credit = new ArrayList<>();

            String partrans = "";
            String date = new SimpleDateFormat("YYYY-MM-dd'T'HH:mm:ss.SSS").format(new Date());
//            System.out.println("Date ::"+ date);
            String ptype = "";
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < paymentTrans.size(); i++) {
//                Transheaderpart patrans = paymentTrans.get(i);
                Partrans patrans = paymentTrans.get(i);
//                Partrans patrans = paymentTrans.get(i);

                String patran_type = patrans.getParttranstype();
                if (patran_type.equalsIgnoreCase("Debit")) {
                    ptype = "D";
                    debits.add(patrans);
                } else if (patran_type.equalsIgnoreCase("Credit")) {
                    ptype = "C";
                    credit.add(patrans);
                }
                if(patrans.getAccountCurrencyCode()==null || patrans.getAccountCurrencyCode().equalsIgnoreCase("")){
                    patrans.setAccountCurrencyCode("UGX");
                }
                //TO DO: POST TO FINALCE
                partrans = " <PartTrnRec>\n" +
                        "                        <AcctId>\n" +
                        "                            <AcctId>"+patrans.getAccountNo()+"</AcctId>\n" +
                        "                        </AcctId>\n" +
                        "                        <CreditDebitFlg>"+ptype+"</CreditDebitFlg>\n" +
                        "                        <TrnAmt>\n" +
//                        "                            <amountValue>"+patrans.getAmount()+"</amountValue>\n" +
                        "                            <amountValue>"+String.format("%.2f", patrans.getAmount())+"</amountValue>\n" +

                        "                            <currencyCode>"+patrans.getAccountCurrencyCode()+"</currencyCode>\n" +
                        "                        </TrnAmt>\n" +
                        "                        <ValueDt>"+partransdate+"</ValueDt>\n" +
                        "                          <TrnParticulars>"+patrans.getNarration()+"</TrnParticulars>\n"+
                        "                    </PartTrnRec>\n";
                sb.append(partrans);
                sb.append("\n");
            }
            partrans = sb.toString();
            String url = cn.getProperties().getProperty("fin.url");
//            SupplierResponse rp = new SupplierResponse();
            int code = 0;
            try {
                URL obj = new URL(url);
                disableVerification.disableSSlVerification();
                HttpURLConnection con = (HttpURLConnection) obj.openConnection();
                con.setRequestMethod("POST");
                String randomUUID = UUID.randomUUID().toString();
                con.setRequestProperty("Content-Type", "application/soap+xml; charset=utf-8");
                String requestxml = "" +
                        "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
                        "<FIXML xsi:schemaLocation=\"http://www.finacle.com/fixml XferTrnAdd.xsd\" xmlns=\"http://www.finacle.com/fixml\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">\n" +
                        "    <Header>\n" +
                        "        <RequestHeader>\n" +
                        "            <MessageKey>\n" +
                        "                <RequestUUID>" + randomUUID + "</RequestUUID>\n" +
                        "                <ServiceRequestId>XferTrnAdd</ServiceRequestId>\n" +
                        "                <ServiceRequestVersion>10.2</ServiceRequestVersion>\n" +
                        "                <ChannelId>COR</ChannelId>\n" +
                        "                <LanguageId></LanguageId>\n" +
                        "            </MessageKey>\n" +
                        "            <RequestMessageInfo>\n" +
                        "                <BankId></BankId>\n" +
                        "                <TimeZone></TimeZone>\n" +
                        "                <EntityId></EntityId>\n" +
                        "                <EntityType></EntityType>\n" +
                        "                <ArmCorrelationId></ArmCorrelationId>\n" +
                        "                <MessageDateTime>" + date + "</MessageDateTime>\n" +
                        "            </RequestMessageInfo>\n" +
                        "            <Security>\n" +
                        "                <Token>\n" +
                        "                    <PasswordToken>\n" +
                        "                        <UserId></UserId>\n" +
                        "                        <Password></Password>\n" +
                        "                    </PasswordToken>\n" +
                        "                </Token>\n" +
                        "                <FICertToken></FICertToken>\n" +
                        "                <RealUserLoginSessionId></RealUserLoginSessionId>\n" +
                        "                <RealUser></RealUser>\n" +
                        "                <RealUserPwd></RealUserPwd>\n" +
                        "                <SSOTransferToken></SSOTransferToken>\n" +
                        "            </Security>\n" +
                        "        </RequestHeader>\n" +
                        "    </Header>\n" +
                        "    <RateCodesBody>\n" +
                        "        <XferTrnAddRequest>\n" +
                        "            <XferTrnAddRq>\n" +
                        "                <XferTrnHdr>\n" +
                        "                    <TrnType>T</TrnType>\n" +
                        "                    <TrnSubType>BI</TrnSubType>\n" +
                        "                </XferTrnHdr>\n" +
                        "                <XferTrnDetail>\n" + partrans +
                        "                </XferTrnDetail>\n" +
                        "            </XferTrnAddRq>\n" +
                        "        </XferTrnAddRequest>\n" +
                        "    </RateCodesBody>\n" +
                        "</FIXML>\n";
                con.setDoOutput(true);
                System.out.println("XML :::" + requestxml);
                try (DataOutputStream wr = new DataOutputStream(con.getOutputStream())) {
                    wr.writeBytes(requestxml);
                    wr.flush();
                }
                String responseStatus = con.getResponseMessage();
                System.out.println(responseStatus);
                code = con.getResponseCode();
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
                System.out.println(responsexml);
                String trandate = "";
                String tranid = "";
                String Status = "";
                String status;
                String errorCode;
                String desc;
                String type;
                System.out.println("Executing...!!!");
                //if (responseStatus.equalsIgnoreCase("OK")) {
                //Parse Response XML
                //Parsing Response XML for Success
                JAXBContext jaxbContext = JAXBContext.newInstance(new Class[]{co.ke.emtechhouse.eims.TransactionComponent.FinacleService.FIXMLS.FIXML.class});
                Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
                StringReader XmlreaderObj = new StringReader(responsexml);
                Source source = new StreamSource(XmlreaderObj);
                JAXBElement<co.ke.emtechhouse.eims.TransactionComponent.FinacleService.FIXMLS.FIXML> root = unmarshaller.unmarshal(source, co.ke.emtechhouse.eims.TransactionComponent.FinacleService.FIXMLS.FIXML.class);
                co.ke.emtechhouse.eims.TransactionComponent.FinacleService.FIXMLS.FIXML fi = root.getValue();
                Status = fi.getHeader().getResponseHeader().getHostTransaction().getStatus();
                System.out.println("STATUS ::::: " + Status);
                //SUCCESS
                      if (Status.equalsIgnoreCase("SUCCESS")) {
                    System.out.println("##STATUS ::"+ Status);
                    tranid = fi.getBody().getXferTrnAddResponse().getXferTrnAddRs().getTrnIdentifier().getTrnId();
                    trandate = fi.getBody().getXferTrnAddResponse().getXferTrnAddRs().getTrnIdentifier().getTrnDt().toString();
                    successReponse.setStatus("Success");
                    successReponse.setTran_date(trandate);
                    successReponse.setTran_id(tranid);
//                    String transdate = new SimpleDateFormat("YYYY-MM-dd'T'HH:mm:ss.SSS").format(trandate);
//                          DateFormat formatter = new SimpleDateFormat("E MMM dd HH:mm:ss Z yyyy");
//                          Date tdate = formatter.parse(trandate);
//                          System.out.println(date);
//                          Calendar cal = Calendar.getInstance();
//                          cal.setTime(tdate);
//                          String formated = cal.get(Calendar.YEAR) + "-" + (cal.get(Calendar.MONTH) + 1) + "-" + cal.get(Calendar.DATE) + " "+cal.get(Calendar.HOUR)+":"+cal.get(Calendar.MINUTE)+":"+cal.get(Calendar.SECOND)+"."+cal.get(Calendar.MILLISECOND);
                    transheader.setTranDate(trandate);
                    transheader.setFinacleStatus("Success");
                    transheader.setTranId(tranid);
//                    TODO: UPDATE ACCRUALS 
//                    updateCollectedAccrual(transheader.getSupplierId(), transheader.getContractId());
                    System.out.println("TRAN ID ::-" + tranid);
                    System.out.println("TRAN DATE ::-" + trandate);
//                    TODO UPDATE PO
                          if (transheader.getHavePo().equalsIgnoreCase("Yes")){
                              Optional<PurchaseOrder> purchaseOrder = purchaseOrderRepo.findById(transheader.getPoId());
                              if (purchaseOrder.isPresent()){
                                  PurchaseOrder updatepurchaseOrder = purchaseOrder.get();
                                  updatepurchaseOrder.setPoStatus("Paid");
                                  purchaseOrderRepo.save(updatepurchaseOrder);
                              }
                          }
                    // update collcect accrual table
                } else if (Status.equalsIgnoreCase("FAILURE")) {
                    System.out.println("##STATUS ::"+ Status);
                    //Parsing Response XML for Failed Response
//  ############PostBank Finalce XML
//                    JAXBContext jbct = JAXBContext.newInstance(new Class[]{co.ke.emtechhouse.eims.TransactionComponent.FinacleService.FailureResponse.FIXML.class});
//                    Unmarshaller jbctunmarshaller = jbct.createUnmarshaller();
//                    StringReader xmlreader = new StringReader(responsexml);
//                    Source src = new StreamSource(xmlreader);
//                    JAXBElement<co.ke.emtechhouse.eims.TransactionComponent.FinacleService.FailureResponse.FIXML> rt = jbctunmarshaller.unmarshal(src,co.ke.emtechhouse.eims.TransactionComponent.FinacleService.FailureResponse.FIXML.class );
//                    co.ke.emtechhouse.eims.TransactionComponent.FinacleService.FailureResponse.FIXML f = rt.getValue();
//
//                    status = f.getHeader().getResponseHeader().getHostTransaction().getStatus();
//                    desc =f.getBody().getError().getFIBusinessException().getErrorDetail().get(0).getErrorDesc();
//                    errorCode =f.getBody().getError().getFIBusinessException().getErrorDetail().get(0).getErrorCode();
//                    type = f.getBody().getError().getFIBusinessException().getErrorDetail().get(0).getErrorType();


//     #################Emtech finacle XML
                    JAXBContext jbc = JAXBContext.newInstance(new Class[]{co.ke.emtechhouse.eims.TransactionComponent.FinacleService.EmtFailureResponse.FIXML.class});
                    Unmarshaller unm = jbc.createUnmarshaller();
                    StringReader reader = new StringReader(responsexml);

                    Source src = new StreamSource(reader);
                    JAXBElement<co.ke.emtechhouse.eims.TransactionComponent.FinacleService.EmtFailureResponse.FIXML> rt = unm.unmarshal(src, co.ke.emtechhouse.eims.TransactionComponent.FinacleService.EmtFailureResponse.FIXML.class);
                    co.ke.emtechhouse.eims.TransactionComponent.FinacleService.EmtFailureResponse.FIXML f = rt.getValue();

                    status = f.getHeader().getResponseHeader().getHostTransaction().getStatus();
                    desc =f.getBody().getError().getFISystemException().getErrorDetail().getErrorDesc();
                    errorCode = String.valueOf(f.getBody().getError().getFISystemException().getErrorDetail().getErrorCode());
                    type = f.getBody().getError().getFISystemException().getErrorDetail().getErrorType();

                    System.out.println("STATUS -- "+ status  );
                    System.out.println("error code -- "+ errorCode  );
                    System.out.println("DESC -- "+ desc  );
                    System.out.println("TYPE -- "+ type  );

                    String transdate = new SimpleDateFormat("YYYY-MM-dd'T'HH:mm:ss.SSS").format(new Date());
                    successReponse.setErrorCode(errorCode.toString());
                    successReponse.setDescription(desc);
                    successReponse.setErrorCode(errorCode.toString());
                    successReponse.setStatus(status);
                    successReponse.setTran_date(transdate);
                    successReponse.setType(type);
                    System.out.println("RESPONSE:: "+ successReponse);
//                    transheader.setTrandate(transdate);
                    transheader.setFinacleStatus("Failure");
//                    transheader.setTranid("");
                    System.out.println("successReponse" + successReponse);
                    transheaderRepo.save(transheader);
                    System.out.println("successReponse" + successReponse);
                    return new ResponseEntity<>(successReponse, HttpStatus.OK);
//                    responsemessage = "Error Encountered => Status : " + Status + "  Error Code : " + ErrorCode + "  Error Desc :  " + ErrorDesc + "  Error Type : " + ErrorType;
                } else {
                          String transdate = new SimpleDateFormat("YYYY-MM-dd'T'HH:mm:ss.SSS").format(new Date());
                    successReponse.setStatus("Failure");
                    successReponse.setDescription("-");
                    successReponse.setTran_date(transdate);
                    successReponse.setTran_id(tranid);
                    transheader.setTranId(tranid);
                    transheader .setFinacleStatus("Failure");
                          transheader.setTranDate(transdate);
                    transheaderRepo.save(transheader);
                    System.out.println("successReponse" + successReponse);
                    return new ResponseEntity<>(successReponse, HttpStatus.OK);
                }
            } catch (IOException e) {
                e.printStackTrace();
                String transdate = new SimpleDateFormat("YYYY-MM-dd'T'HH:mm:ss.SSS").format(new Date());
                successReponse.setStatus("Failure");
                successReponse.setDescription(e.getLocalizedMessage());
                successReponse.setTran_date(transdate);
                successReponse.setTran_id("");

                transheader.setFinacleStatus("Failure");
//                transheader.setTrandate(transdate);
//                transheader.setTransID("");

                transheaderRepo.save(transheader);
                System.out.println("successReponse" + successReponse);
                return new ResponseEntity<>(successReponse, HttpStatus.OK);
            } catch (JAXBException e) {
                e.printStackTrace();
                String transdate = new SimpleDateFormat("YYYY-MM-dd'T'HH:mm:ss.SSS").format(new Date());
                successReponse.setStatus("FAILED");
                successReponse.setDescription(e.getLocalizedMessage());
                successReponse.setTran_date(transdate);
                successReponse.setTran_id("");

                transheader.setFinacleStatus("Failure");
//                transheader.setTrandate(transdate);
//                transheader.setTransID("NA");
            }
            transheaderRepo.save(transheader);
            System.out.println("successReponse" + successReponse);
            return new ResponseEntity<>(successReponse, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            String transdate = new SimpleDateFormat("YYYY-MM-dd'T'HH:mm:ss.SSS").format(new Date());
            successReponse.setStatus("FAILED");
            successReponse.setDescription(e.getLocalizedMessage());
            successReponse.setTran_date(transdate);
            successReponse.setTran_id("");
            transheader.setFinacleStatus("Failure");
            transheader.setTranDate(transdate);
            transheaderRepo.save(transheader);
            System.out.println("successReponse" + successReponse);
            return new ResponseEntity<>(successReponse,HttpStatus.NOT_FOUND);
        }
    }
}
