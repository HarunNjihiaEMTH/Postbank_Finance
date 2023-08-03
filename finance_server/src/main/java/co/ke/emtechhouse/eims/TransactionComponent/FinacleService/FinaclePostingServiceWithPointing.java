package co.ke.emtechhouse.eims.TransactionComponent.FinacleService;

import co.ke.emtechhouse.eims.Finacle.utilities.Configurations;
import co.ke.emtechhouse.eims.PurchaseOrderComponent.PurchaseOrder;
import co.ke.emtechhouse.eims.PurchaseOrderComponent.PurchaseOrderRepo;
import co.ke.emtechhouse.eims.TransactionComponent.FinacleService.FIXMLS.SuccessReponse;
import co.ke.emtechhouse.eims.TransactionComponent.Partrans.Partrans;
import co.ke.emtechhouse.eims.TransactionComponent.Transheader;
import co.ke.emtechhouse.eims.TransactionComponent.TransheaderRepo;
import co.ke.emtechhouse.eims.Utils.DisableVerificationService;
import lombok.extern.slf4j.Slf4j;
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
@Slf4j
public class FinaclePostingServiceWithPointing {
    @Autowired
    DisableVerificationService disableVerification;

    @Autowired
    private SaveSuccessfulTransactionInFinacleDB saveSuccessfulTransactionInFinacleDB;
    @Autowired
    TransheaderRepo transheaderRepo;
    @Value("${partrandate}")
    private String partransdate;
    @Autowired
    private PurchaseOrderRepo purchaseOrderRepo;

    Configurations cn = new Configurations();

    //TODO: POSTING TO FINACLE
    public ResponseEntity<SuccessReponse> postToFinacle(Transheader transheader) {
        String transdate = new SimpleDateFormat("dd-MM-yyyy").format(new Date());
        String tranid = "";
        String Status = "";
        String status;
        String errorCode;
        String desc;
        String type;
        SuccessReponse successReponse = new SuccessReponse();
//            Get payment Particulars
        List<Partrans> paymentTrans = transheader.getPartrans();

        //new
        System.out.println("Patrans size ::" + paymentTrans.size());
        //An array of payment Particulars
        ArrayList<Partrans> debits = new ArrayList<>();
        ArrayList<Partrans> credit = new ArrayList<>();

        String partrans = "";
        String date = new SimpleDateFormat("YYYY-MM-dd'T'HH:mm:ss.SSS").format(new Date());
        String ptype = "";
        String pointingDetails = "";
        StringBuilder sb = new StringBuilder();
        int[] lst = {1};
        int partransCount=0;
        for (int i = 0; i < paymentTrans.size(); i++) {
            Partrans patrans = paymentTrans.get(i);
            String patran_type = patrans.getParttranstype();
            if (patran_type.equalsIgnoreCase("Debit")) {
                ptype = "D";
                debits.add(patrans);
            } else if (patran_type.equalsIgnoreCase("Credit")) {
                ptype = "C";
                credit.add(patrans);
            }
            if (patrans.getAccountCurrencyCode() == null || patrans.getAccountCurrencyCode().equalsIgnoreCase("")) {
                patrans.setAccountCurrencyCode("UGX");
            }
            int cnt = lst[0];
            //TO DO: POST TO FINACLE

            //Check if account is pointing
            if (patrans.getIsPointing().equalsIgnoreCase("N")) {
                log.info("Account - " + patrans.getAccountNo() + " is Not Pointing Account");
                if (patrans.getIsPartition().equalsIgnoreCase("Y") && patrans.getPartitionAccount() != null && !patrans.getPartitionAccount().equalsIgnoreCase("")) {
                    log.info("Account - " + patrans.getAccountNo() + " Has Partition Account - " + patrans.getPartitionAccount());
                    partrans = "\t\t\t\t<foracid_" + cnt + ">" + patrans.getAccountNo() + "</foracid_" + cnt + ">\n" +
                            "\t\t\t\t<currencyCode_" + cnt + ">" + patrans.getAccountCurrencyCode() + "</currencyCode_" + cnt + ">\n" +
                            "\t\t\t\t<TrnParticulars_" + cnt + ">" + patrans.getNarration() + "</TrnParticulars_" + cnt + ">\n" +
                            "\t\t\t\t<amountValue_" + cnt + ">" + String.format("%.2f", patrans.getAmount()) + "</amountValue_" + cnt + ">\n" +
                            "\t\t\t\t<partTranType_" + cnt + ">" + ptype + "</partTranType_" + cnt + ">\n" +
                            "\t\t\t\t<partAcct_" + cnt + ">" + patrans.getPartitionAccount() + "</partAcct_" + cnt + ">\n" +
                            "\t\t\t\t<treaRefNum_" + cnt + ">" + patrans.getTreaRefNum() + "</treaRefNum_" + cnt + ">\n" +
                            "\t\t\t\t<rate_" + cnt + ">" + patrans.getExchangeRate() + "</rate_" + cnt + ">\n";
                    lst[0] = lst[0] + 1;
                    sb.append(partrans);
                    sb.append("\n");
                } else {
                    partrans = "\t\t\t\t<foracid_" + cnt + ">" + patrans.getAccountNo() + "</foracid_" + cnt + ">\n" +
                            "\t\t\t\t<currencyCode_" + cnt + ">" + patrans.getAccountCurrencyCode() + "</currencyCode_" + cnt + ">\n" +
                            "\t\t\t\t<TrnParticulars_" + cnt + ">" + patrans.getNarration() + "</TrnParticulars_" + cnt + ">\n" +
                            "\t\t\t\t<amountValue_" + cnt + ">" + String.format("%.2f", patrans.getAmount()) + "</amountValue_" + cnt + ">\n" +
                            "\t\t\t\t<partTranType_" + cnt + ">" + ptype + "</partTranType_" + cnt + ">\n" +
                            "\t\t\t\t<treaRefNum_" + cnt + ">" + patrans.getTreaRefNum() + "</treaRefNum_" + cnt + ">\n" +
                            "\t\t\t\t<rate_" + cnt + ">" + patrans.getExchangeRate() + "</rate_" + cnt + ">\n";
                    lst[0] = lst[0] + 1;
                    sb.append(partrans);
                    sb.append("\n");
                    partransCount++;
                }
            }
            else {
                log.info("Account - " + patrans.getAccountNo() + " is Pointing Account");
                if (patrans.getPointingDetails() != null && patrans.getPointingDetails().size() > 0) {
                    for (int a = 0; a < patrans.getPointingDetails().size(); a++) {
                        cnt = lst[0];
                        if (patrans.getIsPartition().equalsIgnoreCase("Y") && patrans.getPartitionAccount() != null && !patrans.getPartitionAccount().equalsIgnoreCase("")) {
                            log.info("Account - " + patrans.getAccountNo() + " is Pointing and Has Partition Account - " + patrans.getPartitionAccount());
                            partrans = "\t\t\t\t<tranId_" + cnt + ">" + patrans.getPointingDetails().get(a).getTranId() + "</tranId_" + cnt + ">\n" +
                                    "\t\t\t\t<otranDate_" + cnt + ">" + patrans.getPointingDetails().get(a).getTranDate() + "</otranDate_" + cnt + ">\n" +
                                    "\t\t\t\t<partTranSrlNum_" + cnt + ">" + patrans.getPointingDetails().get(a).getPartTranSrlNum() + "</partTranSrlNum_" + cnt + ">\n" +
                                    "\t\t\t\t<foracid_" + cnt + ">" + patrans.getAccountNo() + "</foracid_" + cnt + ">\n" +
                                    "\t\t\t\t<currencyCode_" + cnt + ">" + patrans.getAccountCurrencyCode() + "</currencyCode_" + cnt + ">\n" +
                                    "\t\t\t\t<TrnParticulars_" + cnt + ">" + patrans.getNarration() + "</TrnParticulars_" + cnt + ">\n" +
                                    "\t\t\t\t<amountValue_" + cnt + ">" + String.format("%.2f", patrans.getPointingDetails().get(a).getAmt()) + "</amountValue_" + cnt + ">\n" +
                                    "\t\t\t\t<partTranType_" + cnt + ">" + ptype + "</partTranType_" + cnt + ">\n" +
                                    "\t\t\t\t<partAcct_" + cnt + ">" + patrans.getPartitionAccount() + "</partAcct_" + cnt + ">\n" +
                                    "\t\t\t\t<treaRefNum_" + cnt + ">" + patrans.getTreaRefNum() + "</treaRefNum_" + cnt + ">\n" +
                                    "\t\t\t\t<rate_" + cnt + ">" + patrans.getExchangeRate() + "</rate_" + cnt + ">\n";
                            log.info("Appending details of pointing for Account - " + patrans.getAccountNo() + " - Record : " + cnt);
                            lst[0] = lst[0] + 1;
                            sb.append(partrans);
                            sb.append("\n");
                        } else {
                            log.info("Account - " + patrans.getAccountNo() + " is Pointing and Has No Partition Accounts");
                            partrans = "\t\t\t\t<tranId_" + cnt + ">" + patrans.getPointingDetails().get(a).getTranId() + "</tranId_" + cnt + ">\n" +
                                    "\t\t\t\t<otranDate_" + cnt + ">" + patrans.getPointingDetails().get(a).getTranDate() + "</otranDate_" + cnt + ">\n" +
                                    "\t\t\t\t<partTranSrlNum_" + cnt + ">" + patrans.getPointingDetails().get(a).getPartTranSrlNum() + "</partTranSrlNum_" + cnt + ">\n" +
                                    "\t\t\t\t<foracid_" + cnt + ">" + patrans.getAccountNo() + "</foracid_" + cnt + ">\n" +
                                    "\t\t\t\t<currencyCode_" + cnt + ">" + patrans.getAccountCurrencyCode() + "</currencyCode_" + cnt + ">\n" +
                                    "\t\t\t\t<TrnParticulars_" + cnt + ">" + patrans.getNarration() + "</TrnParticulars_" + cnt + ">\n" +
                                    "\t\t\t\t<amountValue_" + cnt + ">" + String.format("%.2f", patrans.getPointingDetails().get(a).getAmt()) + "</amountValue_" + cnt + ">\n" +
                                    "\t\t\t\t<partTranType_" + cnt + ">" + ptype + "</partTranType_" + cnt + ">\n" +
                                    "\t\t\t\t<treaRefNum_" + cnt + ">" + patrans.getTreaRefNum() + "</treaRefNum_" + cnt + ">\n" +
                                    "\t\t\t\t<rate_" + cnt + ">" + patrans.getExchangeRate() + "</rate_" + cnt + ">\n";
                            log.info("Appending details of pointing for Account - " + patrans.getAccountNo() + " - Record : " + cnt);
                            lst[0] = lst[0] + 1;
                            sb.append(partrans);
                            sb.append("\n");
                        }
                    }
                } else {
                    log.info("Account - " + patrans.getAccountNo() + " is Pointing Account But 0 records were Picked");
                    if (patrans.getIsPartition().equalsIgnoreCase("Y") && patrans.getPartitionAccount() != null && !patrans.getPartitionAccount().equalsIgnoreCase("")) {
                        log.info("Account - " + patrans.getAccountNo() + " Has Partition Account - " + patrans.getPartitionAccount());
                        partrans = "\t\t\t\t<foracid_" + cnt + ">" + patrans.getAccountNo() + "</foracid_" + cnt + ">\n" +
                                "\t\t\t\t<currencyCode_" + cnt + ">" + patrans.getAccountCurrencyCode() + "</currencyCode_" + cnt + ">\n" +
                                "\t\t\t\t<TrnParticulars_" + cnt + ">" + patrans.getNarration() + "</TrnParticulars_" + cnt + ">\n" +
                                "\t\t\t\t<amountValue_" + cnt + ">" + String.format("%.2f", patrans.getAmount()) + "</amountValue_" + cnt + ">\n" +
                                "\t\t\t\t<partTranType_" + cnt + ">" + ptype + "</partTranType_" + cnt + ">\n" +
                                "\t\t\t\t<partAcct_" + cnt + ">" + patrans.getPartitionAccount() + "</partAcct_" + cnt + ">\n" +
                                "\t\t\t\t<treaRefNum_" + cnt + ">" + patrans.getTreaRefNum() + "</treaRefNum_" + cnt + ">\n" +
                                "\t\t\t\t<rate_" + cnt + ">" + patrans.getExchangeRate() + "</rate_" + cnt + ">\n";
                        lst[0] = lst[0] + 1;
                        sb.append(partrans);
                        sb.append("\n");
                    } else {
                        partrans = "\t\t\t\t<foracid_" + cnt + ">" + patrans.getAccountNo() + "</foracid_" + cnt + ">\n" +
                                "\t\t\t\t<currencyCode_" + cnt + ">" + patrans.getAccountCurrencyCode() + "</currencyCode_" + cnt + ">\n" +
                                "\t\t\t\t<TrnParticulars_" + cnt + ">" + patrans.getNarration() + "</TrnParticulars_" + cnt + ">\n" +
                                "\t\t\t\t<amountValue_" + cnt + ">" + String.format("%.2f", patrans.getAmount()) + "</amountValue_" + cnt + ">\n" +
                                "\t\t\t\t<partTranType_" + cnt + ">" + ptype + "</partTranType_" + cnt + ">\n" +
                                "\t\t\t\t<treaRefNum_" + cnt + ">" + patrans.getTreaRefNum() + "</treaRefNum_" + cnt + ">\n" +
                                "\t\t\t\t<rate_" + cnt + ">" + patrans.getExchangeRate() + "</rate_" + cnt + ">\n";
                        lst[0] = lst[0] + 1;
                        sb.append(partrans);
                        sb.append("\n");
                        partransCount++;
                    }
                }
            }
        }
        partrans = sb.toString();
        String url = cn.getProperties().getProperty("fin.url");
        int code = 0;
        try {
            URL obj = new URL(url);
            disableVerification.disableSSlVerification();
            HttpURLConnection con = (HttpURLConnection) obj.openConnection();
            con.setRequestMethod("POST");
            String randomUUID = UUID.randomUUID().toString();
            con.setRequestProperty("Content-Type", "application/soap+xml; charset=utf-8");
            String requestxml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
                    "<FIXML xsi:schemaLocation=\"http://www.finacle.com/fixml executeFinacleScript.xsd\" xmlns=\"http://www.finacle.com/fixml\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">\n" +
                    "    <Header>\n" +
                    "        <RequestHeader>\n" +
                    "            <MessageKey>\n" +
                    "                <RequestUUID>" + randomUUID + "</RequestUUID>\n" +
                    "                <ServiceRequestId>executeFinacleScript</ServiceRequestId>\n" +
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
                    "        <executeFinacleScriptRequest>\n" +
                    "            <ExecuteFinacleScriptInputVO>\n" +
                    "                <requestId>xferTranAdd.scr</requestId>\n" +
                    "            </ExecuteFinacleScriptInputVO>\n" +
                    "            <executeFinacleScript_CustomData>\n" +
                    "                <rateCode>" + transheader.getRateCode() + "</rateCode>\n" +
                    "                <TrnType>" + transheader.getTrnType() + "</TrnType>\n" +
                    "                <TrnSubType>" + transheader.getTranSubType() + "</TrnSubType>\n" +
                    "                <record>" + partransCount + "</record>\n" +
                    "\t\t\t\t" + partrans + "\n" +
                    "            </executeFinacleScript_CustomData>\n" +
                    "        </executeFinacleScriptRequest>\n" +
                    "    </RateCodesBody>\n" +
                    "</FIXML>";
            con.setDoOutput(true);
            log.info("Request XML \n" + requestxml);
            try (DataOutputStream wr = new DataOutputStream(con.getOutputStream())) {
                wr.writeBytes(requestxml);
                wr.flush();
            }
            String responseStatus = con.getResponseMessage();
            log.info(responseStatus);
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
            log.info(responsexml);
            String trandate = "";
            //if (responseStatus.equalsIgnoreCase("OK")) {
            //Parse Response XML
            //Parsing Response XML for Success
            int index1 = 0;
            int index2 = 0;
            if (responsexml.contains("<executeFinacleScript_CustomData>")) {
                index1 = responsexml.indexOf("<executeFinacleScript_CustomData>");
                index1 = index1 + 33;
            }

            if (responsexml.contains("</executeFinacleScript_CustomData>")) {
                index2 = responsexml.indexOf("</executeFinacleScript_CustomData>");
            }

            if (responsexml.contains("<ErrorDetail>")) {
                index1 = responsexml.indexOf("<ErrorDetail>");
                index1 = index1 + 13;
            }

            if (responsexml.contains("</ErrorDetail>")) {
                index1 = responsexml.indexOf("</ErrorDetail>");
            }

            responsexml = responsexml.substring(index1, index2);
            responsexml = "<body>" + responsexml + "</body>";
            log.info(responsexml);
            JAXBContext jbc = JAXBContext.newInstance(new Class[]{co.ke.emtechhouse.eims.TransactionComponent.FinacleService.success.Body.class});
            Unmarshaller unm = jbc.createUnmarshaller();
            StringReader reader = new StringReader(responsexml);
            Source src = new StreamSource(reader);
            JAXBElement<co.ke.emtechhouse.eims.TransactionComponent.FinacleService.success.Body> rt = unm.unmarshal(src, co.ke.emtechhouse.eims.TransactionComponent.FinacleService.success.Body.class);
            co.ke.emtechhouse.eims.TransactionComponent.FinacleService.success.Body f = rt.getValue();
            System.out.println(f.getStatus());
            System.out.println(f.getTransactionDate());
            System.out.println(f.getTransactionID());
            System.out.println(f.getERROR());
            if (f.getStatus() != null && f.getTransactionID() != null && f.getERROR() == null) {
                if (!f.getTransactionID().equalsIgnoreCase("")) {
                    //Transaction is successful
                    Status = "SUCCESS";
                    //SUCCESS
                    System.out.println("##STATUS ::" + Status);
                    tranid = f.getTransactionID();
                    trandate = f.getTransactionDate();
                    successReponse.setStatus("Success");
                    successReponse.setTran_date(trandate);
                    successReponse.setTran_id(tranid);
                    transheader.setTranDate(trandate);
                    transheader.setFinacleStatus("Success");
                    transheader.setTranId(tranid);

                    //Send To Finacle for Record Keeping
                    saveSuccessfulTransactionInFinacleDB.sendRequestToFinacleToSaveSuccessfulTransaction(tranid, trandate, transheader.getVerifiedBy());

//                    TODO: UPDATE ACCRUALS
//                    updateCollectedAccrual(transheader.getSupplierId(), transheader.getContractId());
                    log.info("TRAN ID ::-" + tranid);
                    log.info("TRAN DATE ::-" + trandate);
//                    TODO UPDATE PO
                    if (transheader.getHavePo().equalsIgnoreCase("Yes")) {
                        Optional<PurchaseOrder> purchaseOrder = purchaseOrderRepo.findById(transheader.getPoId());
                        if (purchaseOrder.isPresent()) {
                            PurchaseOrder updatepurchaseOrder = purchaseOrder.get();
                            updatepurchaseOrder.setPoStatus("Paid");
                            purchaseOrderRepo.save(updatepurchaseOrder);
                        }
                    }
                } else {
                    JAXBContext jbc1 = JAXBContext.newInstance(new Class[]{co.ke.emtechhouse.eims.TransactionComponent.FinacleService.failures.newerror.NewErrorBody.class});
                    Unmarshaller unm1 = jbc1.createUnmarshaller();
                    StringReader reader1 = new StringReader(responsexml);
                    Source src1 = new StreamSource(reader1);
                    JAXBElement<co.ke.emtechhouse.eims.TransactionComponent.FinacleService.failures.newerror.NewErrorBody> rt1 = unm1.unmarshal(src1, co.ke.emtechhouse.eims.TransactionComponent.FinacleService.failures.newerror.NewErrorBody.class);
                    co.ke.emtechhouse.eims.TransactionComponent.FinacleService.failures.newerror.NewErrorBody f1 = rt1.getValue();

                    Status = "FAILURE";
                    log.info("##STATUS ::" + Status);
                    desc = f1.getReasonForFailure();
                    errorCode = "-";
                    type = "-";
                    successReponse.setErrorCode(errorCode);
                    successReponse.setDescription(desc);
                    successReponse.setErrorCode(errorCode);
                    successReponse.setStatus(Status);
                    successReponse.setTran_date(transdate);
                    successReponse.setType(type);
                    transheader.setTranDate(transdate);
                    transheader.setFinacleStatus("Failure");
                    transheader.setTranId("-");
                }
            } else {
                JAXBContext jbc1 = JAXBContext.newInstance(new Class[]{co.ke.emtechhouse.eims.TransactionComponent.FinacleService.failures.newerror.NewErrorBody.class});
                Unmarshaller unm1 = jbc1.createUnmarshaller();
                StringReader reader1 = new StringReader(responsexml);
                Source src1 = new StreamSource(reader1);
                JAXBElement<co.ke.emtechhouse.eims.TransactionComponent.FinacleService.failures.newerror.NewErrorBody> rt1 = unm1.unmarshal(src1, co.ke.emtechhouse.eims.TransactionComponent.FinacleService.failures.newerror.NewErrorBody.class);
                co.ke.emtechhouse.eims.TransactionComponent.FinacleService.failures.newerror.NewErrorBody f1 = rt1.getValue();

                Status = "FAILURE";
                System.out.println("##STATUS ::" + Status);
                desc = f1.getReasonForFailure();
                errorCode = "-";
                type = "-";
                successReponse.setErrorCode(errorCode);
                successReponse.setDescription(desc);
                successReponse.setErrorCode(errorCode);
                successReponse.setStatus(Status);
                successReponse.setTran_date(transdate);
                successReponse.setType(type);
                transheader.setTranDate(transdate);
                transheader.setFinacleStatus("Failure");
                transheader.setTranId("-");
            }
        } catch (Exception e) {
            Status = "FAILURE";
            System.out.println("##STATUS ::" + Status);
            desc = e.getLocalizedMessage();
            errorCode = "-";
            type = "-";
            successReponse.setErrorCode(errorCode);
            successReponse.setDescription(desc);
            successReponse.setErrorCode(errorCode);
            successReponse.setStatus(Status);
            successReponse.setTran_date(transdate);
            successReponse.setType(type);
            transheader.setTranDate(transdate);
            transheader.setFinacleStatus("Failure");
            transheader.setTranId("-");
        }
        transheaderRepo.save(transheader);
        return new ResponseEntity<>(successReponse, HttpStatus.OK);
    }



}

