package co.ke.emtechhouse.eims.TransactionComponent;

import co.ke.emtechhouse.eims.AuthenticationModule.controllers.AuditTrailsController;
import co.ke.emtechhouse.eims.AuthenticationModule.security.jwt.RequestUsernameContext;
import co.ke.emtechhouse.eims.CostCentersComponent.Costcenters;
import co.ke.emtechhouse.eims.CostCentersComponent.CostcentersRepo;
import co.ke.emtechhouse.eims.ExpenseComponent.Expense;
import co.ke.emtechhouse.eims.ExpenseComponent.ExpenseRepo;
import co.ke.emtechhouse.eims.PurchaseOrderComponent.PurchaseOrder;
import co.ke.emtechhouse.eims.PurchaseOrderComponent.PurchaseOrderRepo;
import co.ke.emtechhouse.eims.ResponseMessage.ResponseMessage;
import co.ke.emtechhouse.eims.SupplierComponent.SupplierRepo;
import co.ke.emtechhouse.eims.TransactionComponent.AcrualBalResp.AcrualBalResp;
import co.ke.emtechhouse.eims.TransactionComponent.FinacleService.FinaclePostingServiceWithPointing;
import co.ke.emtechhouse.eims.TransactionComponent.InvoiceDocuments.Invoicedocument;
import co.ke.emtechhouse.eims.TransactionComponent.InvoiceDocuments.InvoicedocumentRepo;
import co.ke.emtechhouse.eims.TransactionComponent.MultiEntryAccrual.Multientryaccrual;
import co.ke.emtechhouse.eims.TransactionComponent.FinacleService.FinaclePostingService;
import co.ke.emtechhouse.eims.TransactionComponent.FinacleService.FIXMLS.ResponseInterface;
import co.ke.emtechhouse.eims.TransactionComponent.FinacleService.FIXMLS.SuccessReponse;
import co.ke.emtechhouse.eims.TransactionComponent.Partrans.Partrans;
import co.ke.emtechhouse.eims.Utils.Response;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

//@CrossOrigin /api/v1/transaction/update
@RestController
@Slf4j
@RequestMapping("/api/v1/transaction/")
public class TransheaderController {
    private final TransheaderRepo transheaderRepo;
    private final TransheaderService transheaderService;
    private final FinaclePostingService finaclePostingService;
    private final CostcentersRepo costcentersRepo;
    private final ExpenseRepo expenseRepo;
    private final PurchaseOrderRepo purchaseOrderRepo;
    private final InvoicedocumentRepo invoicedocumentRepo;
    private final AuditTrailsController auditTrailsController;
    private final SupplierRepo supplierRepo;
    private final FinaclePostingServiceWithPointing finaclePostingServiceWithPointing;

    public TransheaderController(TransheaderRepo transheaderRepo, TransheaderService transheaderService, FinaclePostingService finaclePostingService, CostcentersRepo costcentersRepo, ExpenseRepo expenseRepo, PurchaseOrderRepo purchaseOrderRepo, InvoicedocumentRepo invoicedocumentRepo, AuditTrailsController auditTrailsController, SupplierRepo supplierRepo, FinaclePostingServiceWithPointing finaclePostingServiceWithPointing) {
        this.transheaderRepo = transheaderRepo;
        this.transheaderService = transheaderService;
        this.finaclePostingService = finaclePostingService;
        this.costcentersRepo = costcentersRepo;
        this.expenseRepo = expenseRepo;
        this.purchaseOrderRepo = purchaseOrderRepo;
        this.invoicedocumentRepo = invoicedocumentRepo;
        this.auditTrailsController = auditTrailsController;
        this.supplierRepo = supplierRepo;
        this.finaclePostingServiceWithPointing = finaclePostingServiceWithPointing;
    }
    public static String generateRandomCode(int len) {
        String chars = "01234567890POSTBANK";
        Random rnd = new Random();
        StringBuilder sb = new StringBuilder(len);
        for (int i = 0; i < 10; i++)
            sb.append(chars.charAt(rnd.nextInt(chars.length())));
        return sb.toString();
    }

    @PostMapping("/add")
    public ResponseEntity<?> addTransheader(@RequestBody Transheader transheader){
        try {
            if (transheader.getHavePo() != null){
                if (transheader.getHavePo().equalsIgnoreCase("Yes")){
                    transheader.setTransactionCode(generateRandomCode(5));
                    transheader.setPostedTime(new Date());
                    Transheader newtransheader = transheaderService.addTransheader(transheader);
                    Optional<PurchaseOrder> purchaseOrder = purchaseOrderRepo.findById(transheader.getPoId());
                    if (purchaseOrder.isPresent()){
                        PurchaseOrder updatepurchaseOrder = purchaseOrder.get();
                        updatepurchaseOrder.setPoStatus("InProgress");
                        purchaseOrderRepo.save(updatepurchaseOrder);
                    }
                    ResponseMessage responseMessage = new ResponseMessage();
                    responseMessage.setTransactionDate(newtransheader.getPostedTime());
                    responseMessage.setStatus("Pending");
                    responseMessage.setTransactionCode(newtransheader.getTransactionCode());
                    return  new ResponseEntity<>(responseMessage, HttpStatus.CREATED);
                }else{
                    transheader.setTransactionCode(generateRandomCode(5));
                    transheader.setPostedTime(new Date());
                    Transheader newtransheader = transheaderService.addTransheader(transheader);
                    ResponseMessage responseMessage = new ResponseMessage();
                    responseMessage.setTransactionDate(newtransheader.getPostedTime());
                    responseMessage.setStatus("Pending");
                    responseMessage.setTransactionCode(newtransheader.getTransactionCode());
                    return  new ResponseEntity<>(responseMessage, HttpStatus.CREATED);
                }
            }else{
                transheader.setTransactionCode(generateRandomCode(5));
                transheader.setPostedTime(new Date());
                Transheader newtransheader = transheaderService.addTransheader(transheader);
                ResponseMessage responseMessage = new ResponseMessage();
                responseMessage.setTransactionDate(newtransheader.getPostedTime());
                responseMessage.setStatus("Pending");
                responseMessage.setTransactionCode(newtransheader.getTransactionCode());
                auditTrailsController.addAudit(RequestUsernameContext.getRequestUsername() + " entered transaction with transaction code :: " +transheader.getTransactionCode());
                return  new ResponseEntity<>(responseMessage, HttpStatus.CREATED);
            }
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    @PostMapping("/multiple/add")
    public ResponseEntity<?> addMultipleTransheader(@RequestBody List<Multientryaccrual> multientryaccruals){
        try {
            for (int i = 0; i<multientryaccruals.size(); i++){
                Multientryaccrual m = multientryaccruals.get(i);
                Transheader transheader = new Transheader();
//                Set transaction headers
                transheader.setSupplierId(m.getSupplierId());
                transheader.setSupplierName(m.getSupplierName());
                transheader.setAccrualAccount(m.getAccrualAccount());
                transheader.setSupplierAmount(m.getAmount());
                transheader.setPostedBy(m.getPostedBy());
                transheader.setTotalDebitAmt(m.getAmount());
                transheader.setCollectionDate(m.getCollectionDate());
                transheader.setPostedTime(new Date());
                transheader.setTransactionCode(generateRandomCode(5));
                transheader.setExpenseType(m.getExpenseType());
                transheader.setTranType("Advance");
                transheader.setDescription(m.getDescription());
                transheader.setDebitFrom(m.getDebitFrom());
                transheader.setTransactiontype("collect_accrual");
                Costcenters costcenters = costcentersRepo.getById(m.getCostCenterId());
                Expense expense = expenseRepo.getById(m.getExpenseId());
                Optional<CostcentersRepo.ExpenseAccount> expensedata = costcentersRepo.getCostCentersPerExpense(m.getCostCenterId(), m.getExpenseId());

//              TODO:  Set partrans
                String debitFrom =m.getDebitFrom();
                List<Partrans> partransList = new ArrayList<>();
                if(debitFrom.equalsIgnoreCase("ExpenseAc")){
                    Partrans partrans = new Partrans();
                    partrans.setAmount(m.getAmount());
                    partrans.setParttranstype("Debit");
                    partrans.setCostCenter(costcenters.getCostCenterName());
                    partrans.setAccountNo(expensedata.get().getExpenseAccount());
                    partrans.setNarration("Debit amount " +m.getAmount());
                    partrans.setAccountCurrencyCode(m.getCurrency());
                    partrans.setAccountName("Account name");
                    Partrans partrans2 = new Partrans();
                    partrans2.setAmount(m.getAmount());
                    partrans2.setParttranstype("Credit");
                    partrans2.setCostCenter(costcenters.getCostCenterName());
                    partrans2.setAccountNo(m.getAccrualAccount());
                    partrans2.setNarration("Credit amount " +m.getAmount());
                    partrans2.setAccountCurrencyCode(m.getCurrency());
                    partrans2.setAccountName("Account name");
                    partransList.add(partrans);
                    partransList.add(partrans2);
                }else if(debitFrom.equalsIgnoreCase("BalancesheetAc")){
//                  Patrans 1
                    Partrans partrans = new Partrans();
                    partrans.setAmount(m.getAmount());
                    partrans.setParttranstype("Credit");
                    partrans.setAccountNo(m.getAccrualAccount());
                    partrans.setNarration("Credit amount " +m.getAmount());
                    partrans.setAccountName(debitFrom);
                    partrans.setAccountCurrencyCode(m.getCurrency());
                    partrans.setAccountName(m.getAccountName());
//                  Patrans 2
                    Partrans partrans2 = new Partrans();
                    partrans2.setAmount(m.getAmount());
                    partrans2.setParttranstype("Debit");
                    partrans2.setAccountNo(m.getCustomDebitAccount());
                    partrans2.setNarration("Debit amount " +m.getAmount());
                    partrans2.setAccountName(debitFrom);
                    partrans2.setAccountCurrencyCode(m.getCurrency());
                    partrans2.setAccountName(m.getAccountName());
//                  Save Patrans
                    partransList.add(partrans);
                    partransList.add(partrans2);
                }
                System.out.println("Patrans list :::"+ partransList);
                transheader.setPartrans(partransList);
                transheaderRepo.save(transheader);
                auditTrailsController.addAudit(RequestUsernameContext.getRequestUsername() + " entered multiple transaction upload with transaction code :: " +transheader.getTransactionCode());


            }
            ResponseInterface responseInterface = new ResponseInterface();
            responseInterface.setStatus("Pending");
            responseInterface.setTransactionCode("");
            responseInterface.setTransactionDate(LocalDateTime.now().toString());

            return  new ResponseEntity<>(responseInterface, HttpStatus.CREATED);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    @GetMapping(path = "accrual/balance/per/supplier/")
    public ResponseEntity<?> getFinalAcrualDetails(@RequestParam Long supplier_id){
        try{
            List<AcrualBalResp>  accrualBalance = transheaderService.getAcualBalance(supplier_id);
            auditTrailsController.addAudit(RequestUsernameContext.getRequestUsername() + " Get accrual balance for supplier tin :: " +supplierRepo.findById(supplier_id).get().getSupplierName());
            return new ResponseEntity<>(accrualBalance,HttpStatus.OK );
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new Response("Error:-" + e.getLocalizedMessage()),HttpStatus.BAD_REQUEST );
        }
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Transheader> getById (@PathVariable("id") Long id) {
        Transheader transheader = transheaderService.findById(id);
        return new ResponseEntity<>(transheader, HttpStatus.OK);
    }
    @GetMapping("/find/documents/{transheader_id}")
    public ResponseEntity<?> getDocuments (@PathVariable("transheader_id") String transheader_id) {
        List<Invoicedocument> documents = invoicedocumentRepo.getDocument(transheader_id);
        if (documents.size()>0){
            return new ResponseEntity<>(documents, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(new Response("No Invoices Associated"), HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/find/by/creation/status")
    public ResponseEntity<?> getTransactionPerStatus(@RequestParam String transactionType, @RequestParam String status, @RequestParam String fromDate, @RequestParam String toDate ) {
        List<Transheader> transheader = transheaderRepo.getTransactionPerStatus(transactionType,status, fromDate, toDate);
        auditTrailsController.addAudit(RequestUsernameContext.getRequestUsername() + " Get "+transactionType+" transaction with creation status " +status);
        return new ResponseEntity<>(transheader, HttpStatus.OK);
    }




    @GetMapping("/find/by/finacle/status")
    public ResponseEntity<?> getFinacleStatus(@RequestParam String transactionType, @RequestParam String finacleStatus) {
        List<Transheader> transheader = transheaderRepo.getFinacleStatus(transactionType,finacleStatus);
        auditTrailsController.addAudit(RequestUsernameContext.getRequestUsername() + " Get "+transactionType+" transaction with finacle status " +finacleStatus);
        return new ResponseEntity<>(transheader, HttpStatus.OK);
    }
    @GetMapping("/find/acrual/payment/supplier")
    public ResponseEntity<?> getFinacleStatus(@RequestParam Long supplier_id) {
        String transactiontype = "pay_accrual";
        String finacle_status = "Success";
        List<Transheader> transheader = transheaderRepo.getSupplierPaymentHistory(transactiontype,finacle_status, supplier_id);
        auditTrailsController.addAudit(RequestUsernameContext.getRequestUsername() + " Get "+transactiontype+" transaction for supplier " +supplierRepo.findById(supplier_id).get().getSupplierName());
        return new ResponseEntity<>(transheader, HttpStatus.OK);
    }
    @PutMapping("/update")
    public ResponseEntity<?> updateTransaction(@RequestBody Transheader transheader) {
        Optional<Transheader> _existing = transheaderRepo.findById(transheader.getId());
        if (_existing.isPresent()){
            if (_existing.get().getFinacleStatus().equalsIgnoreCase("Success")){
                return new ResponseEntity<>(new Response("You can not update a transaction which has been posted to finance.Hint: do a correction transaction."), HttpStatus.NOT_ACCEPTABLE);
            }else {
                transheader.setStatus("Pending");
                transheader.setFinacleStatus("Pending");
                transheader.setTranId(null);
                transheader.setTranDate(null);
                Transheader newtransheader = transheaderService.updateTransheader(transheader);
                auditTrailsController.addAudit(RequestUsernameContext.getRequestUsername() + " Update "+transheader.getTransactiontype()+" transaction having transaction code " +transheader.getTransactionCode());
                return new ResponseEntity<>(newtransheader, HttpStatus.OK);
            }

        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PutMapping("/approve")
    public ResponseEntity<?> updateTransheader(@RequestParam Long id, @RequestParam String status, @RequestParam String verifiedBy, @RequestParam String reason) {
        Optional<Transheader> _existing = transheaderRepo.findById(id);
        if (_existing.isPresent()) {
            Transheader transheader = _existing.get();
            transheader.setVerifiedTime(new Date());
            transheader.setVerifiedBy(verifiedBy);
            transheader.setVerifiedTime(new Date());
            transheader.setReason(reason);
            transheader.setStatus(status);
//            SuccessReponse successReponse= new SuccessReponse();
            if (transheader.getStatus().equalsIgnoreCase("Approved")){
                ResponseEntity<SuccessReponse> finacleResponce = finaclePostingServiceWithPointing.postToFinacle(transheader);
                SuccessReponse successReponse = new SuccessReponse();
                successReponse.setStatus(finacleResponce.getBody().getStatus());
                successReponse.setTran_date(finacleResponce.getBody().getTran_date());
                successReponse.setTran_id(finacleResponce.getBody().getTran_id());
                successReponse.setDescription(finacleResponce.getBody().getDescription());
                successReponse.setErrorCode(finacleResponce.getBody().getErrorCode());
                auditTrailsController.addAudit(RequestUsernameContext.getRequestUsername() + " Approve "+transheader.getTransactiontype()+" transaction having transaction code " +transheader.getTransactionCode());
                return new ResponseEntity<>(successReponse,HttpStatus.OK);
            }else if (transheader.getStatus().equalsIgnoreCase("Rejected")){
                transheader.setReason(reason);
                transheaderRepo.save(transheader);
                auditTrailsController.addAudit(RequestUsernameContext.getRequestUsername() + " Rejected "+transheader.getTransactiontype()+" transaction having transaction code " +transheader.getTransactionCode());
                return ResponseEntity.ok().body(new Response("Transaction rejected successfully"));
            }
            return ResponseEntity.ok().body(transheader);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/find/deleted/transactions")
    public ResponseEntity<?> getDeletedTransaction(@RequestParam String transactionType, @RequestParam  String fromDate, @RequestParam String toDate) {
        List<Transheader> transheader = transheaderRepo.findDeletedTrans(transactionType, fromDate,toDate, 'Y');;
        auditTrailsController.addAudit(RequestUsernameContext.getRequestUsername() + " Get deleted transaction");
        return new ResponseEntity<>(transheader, HttpStatus.OK);
    }

//    @PutMapping("/delete/temporary/{id}")
//    public ResponseEntity<?> deleteTempTransheader(@PathVariable("id") Long id) {
//        Optional<Transheader> transheader = transheaderRepo.findById(id);
//        if (transheader.isPresent()){
//            transheader.get().setDeletedBy(RequestUsernameContext.getRequestUsername());
//            //transheader.get().setStatus('Deleted');
//            transheader.setStatus("Deleted");
//            transheader.get().setDeletedFlag('Y');
//            transheader.get().setDeletedTime(new Date());
//            transheaderRepo.save(transheader.get());
//            auditTrailsController.addAudit(RequestUsernameContext.getRequestUsername() + " Deleted transaction having transaction code " +transheaderRepo.findById(id).get().getTransactionCode());
//            transheaderService.deleteTransheaderById(id);
//        }else {
//            return new ResponseEntity<>(new Response("Not found!"), HttpStatus.NOT_FOUND);
//        }
//        //transheaderService.deleteTransheaderById(id);
//        //auditTrailsController.addAudit(RequestUsernameContext.getRequestUsername() + " Deleted transaction having transaction code " +transheaderRepo.findById(id).get().getTransactionCode());
//        return new ResponseEntity<>(HttpStatus.OK);
//    }
@PutMapping("/delete/temporary/{id}")
public ResponseEntity<?> deleteTempTransHeader(@PathVariable("id") Long id) {
    Optional<Transheader> optionalTransheader = transheaderRepo.findById(id);
    if (optionalTransheader.isPresent()) {
        Transheader transheader = optionalTransheader.get();
        transheader.setDeletedBy(RequestUsernameContext.getRequestUsername());
        transheader.setStatus("Deleted");
        transheader.setDeletedFlag('Y');
        transheader.setDeletedTime(new Date());
        transheaderRepo.save(transheader);
        auditTrailsController.addAudit(RequestUsernameContext.getRequestUsername() + " Deleted transaction having transaction code " + transheader.getTransactionCode());
        //transheaderService.deleteTransheaderById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    } else {
        return new ResponseEntity<>(new Response("Not found!"), HttpStatus.NOT_FOUND);
    }
}
    @DeleteMapping("/delete/permanent/{id}")
    public ResponseEntity<?> deletePermTransheader(@PathVariable("id") Long id) {
        Optional<Transheader> transheader = transheaderRepo.findById(id);
        if (transheader.isPresent()){
            if (transheader.get().getDeletedBy().equalsIgnoreCase(RequestUsernameContext.getRequestUsername())){
                return new ResponseEntity<>(new Response("You can not complete the delete process that you initiated!"), HttpStatus.NOT_ACCEPTABLE);
            }else {
                if (transheader.get().getDeletedFlag() == 'Y'){
                    transheaderRepo.deleteById(id);
                    auditTrailsController.addAudit(RequestUsernameContext.getRequestUsername() + " Deleted transaction permanently having transaction code " +transheaderRepo.findById(id).get().getTransactionCode());
                    return new ResponseEntity<>(HttpStatus.OK);
                }else {
                    return new ResponseEntity<>(new Response("You must delete the transaction temporarily fast!"), HttpStatus.NOT_ACCEPTABLE);
                }
            }

        }else {
            return new ResponseEntity<>(new Response("Not found!"), HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping(path = "retry/{id}")
    public ResponseEntity<?> retryPayment(@PathVariable Long id){
        Transheader payacrual = transheaderRepo.getById(id);
        try {
            Integer count= payacrual.getRetrycount();
//            if (count>=5){
//                SuccessReponse responce = new SuccessReponse();
//                responce.setStatus("You have Exceeded Retry limit(5) !!");
//                responce.setTran_id("N/A");
//                responce.setTran_date("-");
//                responce.setType("Retry Failure");
//                responce.setDescription("");
//                responce.setErrorCode("401");
//                auditTrailsController.addAudit(RequestUsernameContext.getRequestUsername() + " Retried Posting Transaction to finacle for the "+count+ " time having transaction code " +transheaderRepo.findById(id).get().getTransactionCode());
//                return new ResponseEntity<>(responce, HttpStatus.OK);
//            }else {
                payacrual.setRetrycount(count+1);
                transheaderRepo.save(payacrual);
                ResponseEntity<SuccessReponse> finacleResponce = finaclePostingServiceWithPointing.postToFinacle(payacrual);
                SuccessReponse responce = new SuccessReponse();
                responce.setStatus(finacleResponce.getBody().getStatus());
                responce.setTran_id(finacleResponce.getBody().getTran_id());
                responce.setTran_date(finacleResponce.getBody().getTran_date());
                responce.setType(finacleResponce.getBody().getType());
                responce.setDescription(finacleResponce.getBody().getDescription());
                responce.setErrorCode(finacleResponce.getBody().getErrorCode());
                auditTrailsController.addAudit(RequestUsernameContext.getRequestUsername() + " Retried Posting Transaction to finacle for the "+count+ " time having transaction code " +transheaderRepo.findById(id).get().getTransactionCode());
                return new ResponseEntity<>(responce, HttpStatus.OK);
            //}
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}