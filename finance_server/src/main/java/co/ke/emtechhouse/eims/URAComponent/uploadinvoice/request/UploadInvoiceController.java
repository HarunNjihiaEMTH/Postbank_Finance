package co.ke.emtechhouse.eims.URAComponent.uploadinvoice.request;

import co.ke.emtechhouse.eims.AuthenticationModule.controllers.AuditTrailsController;
import co.ke.emtechhouse.eims.AuthenticationModule.security.jwt.RequestUsernameContext;
import co.ke.emtechhouse.eims.URAComponent.uploadinvoice.response.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Optional;

//@CrossOrigin
@RestController
@Slf4j
@RequestMapping("/api/v1/uploadinvoice/")
public class UploadInvoiceController {
    @Autowired
    private UploadInvoiceService service;
    @Autowired
    private SaveInvoiceDetailsRepository repository;
    @Autowired
    private BasicInfoRepository basicInfoRepository;
    @Autowired
    private BuyerDetailsRepository buyerDetailsRepository;
    @Autowired
    private ImportServiceSellerRepo importServiceSellerRepo;
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
    private ImportsServicesSellerRequestRepo importServicesSellerRepo;
    @Autowired
    private AuditTrailsController auditTrailsController;


    //save Invoice details in the database
    @PostMapping("/save")
    public ResponseEntity<?> saveInvoiceDetails (@RequestBody InvoiceUploadRequest uraRequest) {
            try {
                auditTrailsController.addAudit(RequestUsernameContext.getRequestUsername() + " save invoice with invoice no " +uraRequest.getInvoiceno());
                return new ResponseEntity<>(service.saveInvoiceDetailsInDB(uraRequest), HttpStatus.OK);
            }catch (Exception e) {
                log.info("Error {} "+e.getLocalizedMessage());
                e.printStackTrace();
                return new ResponseEntity<>(e.getLocalizedMessage(),HttpStatus.EXPECTATION_FAILED) ;
            }
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateInvoiceDetails (@RequestBody InvoiceUploadRequest uraRequest) {
        try {
            auditTrailsController.addAudit(RequestUsernameContext.getRequestUsername() + " update invoice with invoice no " +uraRequest.getInvoiceno());
            return new ResponseEntity<>(service.updateInvoiceDetailsInDB(uraRequest), HttpStatus.OK);
        }catch (Exception e) {
            log.info("Error {} "+e.getLocalizedMessage());
            e.printStackTrace();
            return new ResponseEntity<>(e.getLocalizedMessage(),HttpStatus.EXPECTATION_FAILED) ;
        }
    }

    //Upload Invoice to URA
    @PostMapping("/now/{invoiceno}/{buyertin}")
    public ResponseEntity<?> uploadInvoice (@PathVariable("invoiceno") String invoiceno,@PathVariable("buyertin") String buyertin) {
        try {
            auditTrailsController.addAudit(RequestUsernameContext.getRequestUsername() + " upload invoice to ura with invoice no " +invoiceno);
            return new ResponseEntity<>(service.uploadInvoiceToURA(invoiceno,buyertin), HttpStatus.OK);
        }catch (Exception e) {
            e.printStackTrace();
            log.info("Error {} "+e.getLocalizedMessage());
            return new ResponseEntity<>(e.getLocalizedMessage(),HttpStatus.EXPECTATION_FAILED) ;
        }
    }

    //Approve Invoice or Reject
    @PostMapping("/verify")
    public ResponseEntity<?> verifyInvoice (@RequestBody ApproveRequest request) {
        try {
            auditTrailsController.addAudit(RequestUsernameContext.getRequestUsername() + " verify invoice to ura with invoice no " +request.getInvoiceno());
            return new ResponseEntity<>(service.approveOrReject(request), HttpStatus.OK);
        }catch (Exception e) {
            log.info("Error {} "+e.getLocalizedMessage());
            return new ResponseEntity<>(e.getLocalizedMessage(),HttpStatus.EXPECTATION_FAILED) ;
        }
    }

    //Fetch All Approved Invoices
    @GetMapping("/all/approved")
    public ResponseEntity<?> allApprovedInvoices () {
        try {
            auditTrailsController.addAudit(RequestUsernameContext.getRequestUsername() + " view all approved invoices ");
            return new ResponseEntity<>(service.allApprovedInvoices(), HttpStatus.OK);
        }catch (Exception e) {
            log.info("Error {} "+e.getLocalizedMessage());
            return new ResponseEntity<>(e.getLocalizedMessage(),HttpStatus.EXPECTATION_FAILED) ;
        }
    }

    //All Rejected Invoices
    @GetMapping("/all/rejected")
    public ResponseEntity<?> allRejectedInvoices () {
        try {
            auditTrailsController.addAudit(RequestUsernameContext.getRequestUsername() + " view all rejected invoices ");
            return new ResponseEntity<>(service.allRejectedInvoices(), HttpStatus.OK);
        }catch (Exception e) {
            log.info("Error {} "+e.getLocalizedMessage());
            return new ResponseEntity<>(e.getLocalizedMessage(),HttpStatus.EXPECTATION_FAILED) ;
        }
    }

    //Fetch All Pending Invoices
    @GetMapping("/all/pending")
    public ResponseEntity<?> fetchAllPendingInvoices () {
        try {
            auditTrailsController.addAudit(RequestUsernameContext.getRequestUsername() + " view all pending invoices ");
            return new ResponseEntity<>(service.allPendingInvoices(), HttpStatus.OK);
        }catch (Exception e) {
            log.info("Error {} "+e.getLocalizedMessage());
            return new ResponseEntity<>(e.getLocalizedMessage().toUpperCase(),HttpStatus.EXPECTATION_FAILED) ;
        }
    }

    //Modify invoice details

    //Delete invoice details
    @GetMapping("/delete/{deleted_by}/{invoiceno}")
    public ResponseEntity<?> deleteInvoice (@PathVariable String deleted_by,@PathVariable String invoiceno) {
        try {
            auditTrailsController.addAudit(RequestUsernameContext.getRequestUsername() + " delete invoices with invoice no "+invoiceno);
            return new ResponseEntity<>(service.deleteAnInvoice(deleted_by,"Y",new Date(),invoiceno), HttpStatus.OK);
        }catch (Exception e) {
            log.info("Error {} "+e.getLocalizedMessage());
            return new ResponseEntity<>(e.getLocalizedMessage(),HttpStatus.EXPECTATION_FAILED) ;
        }
    }

    //View Uploaded Invoices
    //1.Fetch First details
    @GetMapping("/posted/all/failed")
    public ResponseEntity<?> fetchUploadedInvoicesFailed()
    {
        auditTrailsController.addAudit(RequestUsernameContext.getRequestUsername() + " view all failed invoices ");
        return new ResponseEntity<>(repository.allUploadedButFailed(),HttpStatus.OK);
    }

    @GetMapping("/posted/all/successful")
    public ResponseEntity<?> fetchUploadedSuccessfulInvoices()
    {
        auditTrailsController.addAudit(RequestUsernameContext.getRequestUsername() + " view all successful invoices ");
        return new ResponseEntity<>(repository.allSuccessfullyUploaded(),HttpStatus.OK);
    }

    @GetMapping("/posted/all/successful/fullypaid")
    public ResponseEntity<?> fetchUploadedSuccessfulInvoicesFullyPaid()
    {
        auditTrailsController.addAudit(RequestUsernameContext.getRequestUsername() + " view all successful pain invoices ");
        return new ResponseEntity<>(repository.allSuccessfullyUploadedAndFullyPaid(),HttpStatus.OK);
    }

    //2.Fetch Basic Information By invoice id after posting to URA and receiving success response
    @GetMapping("/posted/basicinfo/{invoiceno}")
    public ResponseEntity<?> fetchBasicInformationByInvoiceId(@PathVariable String invoiceno)
    {
        if(basicInfoRepository.findByinvoiceNo(invoiceno).isEmpty() || basicInfoRepository.findByinvoiceNo(invoiceno).size()==0)
        {
            return new ResponseEntity<>("No Basic information found for invoice no - "+invoiceno,HttpStatus.OK);
        }
        else
        {
            auditTrailsController.addAudit(RequestUsernameContext.getRequestUsername() + " fetch posted invoice "+invoiceno);
            return new ResponseEntity<>(basicInfoRepository.findByinvoiceNo(invoiceno),HttpStatus.OK);
        }
    }

    //3.Fetch Buyer Details by invoice number after posting to URA and receiving success response
    @GetMapping("/posted/buyerdetails/{invoiceno}")
    public ResponseEntity<?> fetchBuyerDetailsByInvoiceId(@PathVariable String invoiceno)
    {
        auditTrailsController.addAudit(RequestUsernameContext.getRequestUsername() + " fetch Buyer Details by invoice number "+invoiceno);
        if(buyerDetailsRepository.findByinvoiceId(invoiceno).isEmpty() || buyerDetailsRepository.findByinvoiceId(invoiceno).size()==0)
        {
            return new ResponseEntity<>("No Buyer Details found for invoice no - "+invoiceno,HttpStatus.OK);
        }
        else
        {
            return new ResponseEntity<>(buyerDetailsRepository.findByinvoiceId(invoiceno),HttpStatus.OK);
        }
    }

    //4.Fetch ExtendDetails By Invoice No after posting to URA and receiving success response
    @GetMapping("/posted/extenddetails/{invoiceno}")
    public ResponseEntity<?> fetchExtendDetailsByInvoiceId(@PathVariable String invoiceno)
    {
        auditTrailsController.addAudit(RequestUsernameContext.getRequestUsername() + " fetch ExtendDetails By Invoice No "+invoiceno);
        if(extendRepository.findByinvoiceId(invoiceno).isEmpty() || extendRepository.findByinvoiceId(invoiceno).size()==0)
        {
            return new ResponseEntity<>("No Extend Details found for invoice no - "+invoiceno,HttpStatus.OK);
        }
        else
        {
            return new ResponseEntity<>(extendRepository.findByinvoiceId(invoiceno),HttpStatus.OK);
        }
    }

    //5.Fetch Goods Details by invoice no after posting to URA and receiving success response
    @GetMapping("/posted/goodsdetails/{invoiceno}")
    public ResponseEntity<?> fetchGoodsDetailsByInvoiceId(@PathVariable String invoiceno)
    {
        auditTrailsController.addAudit(RequestUsernameContext.getRequestUsername() + " fetch goods details by invoice no "+invoiceno);
        if(goodsDetailsRepository.findByinvoiceId(invoiceno).isEmpty() || goodsDetailsRepository.findByinvoiceId(invoiceno).size()==0)
        {
            return new ResponseEntity<>("No Goods Details found for invoice no - "+invoiceno,HttpStatus.OK);
        }
        else
        {
            return new ResponseEntity<>(goodsDetailsRepository.findByinvoiceId(invoiceno),HttpStatus.OK);
        }
    }

//    @GetMapping("/posted/goodsdetails/{invoiceno}")
//    public ResponseEntity<Object> fetchGoodsDetailsByInvoiceId(@PathVariable String invoiceno) {
//        auditTrailsController.addAudit(RequestUsernameContext.getRequestUsername() + " fetch goods details by invoice no "+invoiceno);
//
//        List<GoodsDetails> goodsDetailsList = goodsDetailsRepository.findByinvoiceId(invoiceno);
//        if(goodsDetailsList.isEmpty()) {
//            Map<String, String> response = new HashMap<>();
//            response.put("message", "No Goods Details found for invoice no - " + invoiceno);
//            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
//        } else {
//            return new ResponseEntity<>(goodsDetailsList, HttpStatus.OK);
//        }
//    }


    //6.Fetch Pay Way Details By Invoice No after posting to URA and receiving success response
    @GetMapping("/posted/paywaydetails/{invoiceno}")
    public ResponseEntity<?> fetchPaywayInfoByInvoiceId(@PathVariable String invoiceno)
    {
        auditTrailsController.addAudit(RequestUsernameContext.getRequestUsername() + " Pay Way Details By Invoice No  "+invoiceno);
        if(payWayRepository.findByinvoiceId(invoiceno).isEmpty() || payWayRepository.findByinvoiceId(invoiceno).size()==0)
        {
            return new ResponseEntity<>("No Pay Way Info found for invoice no - "+invoiceno,HttpStatus.OK);
        }
        else
        {
            return new ResponseEntity<>(payWayRepository.findByinvoiceId(invoiceno),HttpStatus.OK);
        }
    }

    //7.Fetch Seller details by invoice no after posting to URA and receiving success response
    @GetMapping("/posted/sellerdetails/{invoiceno}")
    public ResponseEntity<?> fetchSellerDetailsByInvoiceId(@PathVariable String invoiceno)
    {
        auditTrailsController.addAudit(RequestUsernameContext.getRequestUsername() + " Seller details by invoice no  "+invoiceno);
        if(sellersDetailsRepository.findByinvoiceId(invoiceno).isEmpty() || sellersDetailsRepository.findByinvoiceId(invoiceno).size()==0)
        {
            return new ResponseEntity<>("No Seller Details Info found for invoice no - "+invoiceno,HttpStatus.OK);
        }
        else
        {
            return new ResponseEntity<>(sellersDetailsRepository.findByinvoiceId(invoiceno),HttpStatus.OK);
        }
    }

    //8.Fetch Summary Details by invoice no after posting to URA and receiving success response
    @GetMapping("/posted/summarydetails/{invoiceno}")
    public ResponseEntity<?> fetchSummaryDetailsByInvoiceId(@PathVariable String invoiceno)
    {
        auditTrailsController.addAudit(RequestUsernameContext.getRequestUsername() + " Summary Details by invoice no  "+invoiceno);
        if(summaryRepository.findByinvoiceId(invoiceno).isEmpty() || summaryRepository.findByinvoiceId(invoiceno).size()==0)
        {
            return new ResponseEntity<>("No Summary Info found for invoice no - "+invoiceno,HttpStatus.OK);
        }
        else
        {
            return new ResponseEntity<>(summaryRepository.findByinvoiceId(invoiceno),HttpStatus.OK);
        }
    }

    //9.Fetch Tax Details By Invoice No after posting to URA and receiving success response
    @GetMapping("/posted/taxdetails/{invoiceno}")
    public ResponseEntity<?> fetchTaxDetailsByInvoiceId(@PathVariable String invoiceno)
    {
        auditTrailsController.addAudit(RequestUsernameContext.getRequestUsername() + " Fetch Tax Details By Invoice No  "+invoiceno);
        if(taxDetailRepository.findByinvoiceId(invoiceno).isEmpty() || taxDetailRepository.findByinvoiceId(invoiceno).size()==0)
        {
            return new ResponseEntity<>("No Tax Details found for invoice no - "+invoiceno,HttpStatus.OK);
        }
        else
        {
            return new ResponseEntity<>(taxDetailRepository.findByinvoiceId(invoiceno),HttpStatus.OK);
        }
    }

    //10.Fetch Import Seller Details by invoice number after posting to URA and receiving success response
    @GetMapping("/posted/importsellerdetails/{invoiceno}")
    public ResponseEntity<?> fetchImportBuyerDetailsByInvoiceId(@PathVariable String invoiceno)
    {
        auditTrailsController.addAudit(RequestUsernameContext.getRequestUsername() + " fetch Import Seller Details by invoice number "+invoiceno);
        if(importServiceSellerRepo.findByinvoiceId(invoiceno).isEmpty() || importServiceSellerRepo.findByinvoiceId(invoiceno).size()==0)
        {
            return new ResponseEntity<>(new String[]{"No Import Seller Details found for invoice no - " + invoiceno}, HttpStatus.OK);

        }
        else
        {
            return new ResponseEntity<>(importServiceSellerRepo.findByinvoiceId(invoiceno),HttpStatus.OK);
        }
    }





    //Fetch Additional Invoice details before posting to URA \\
    //1.Basic Information before sending to URA
    @GetMapping("/beforeposting/basicinfo/{invoiceno}")
    public ResponseEntity<?> fetchBasicInformationByInvoiceIdBeforePostingToURA(@PathVariable String invoiceno)
    {
        auditTrailsController.addAudit(RequestUsernameContext.getRequestUsername() + " Fetch Additional Invoice details before posting to URA  "+invoiceno);
        if(basicInfoRequestRepo.findByLocalInvoiceNo(invoiceno).isEmpty() || basicInfoRequestRepo.findByLocalInvoiceNo(invoiceno).size()==0)
        {
            return new ResponseEntity<>("No Basic information found for invoice no - "+invoiceno,HttpStatus.OK);
        }
        else
        {
            return new ResponseEntity<>(basicInfoRequestRepo.findByLocalInvoiceNo(invoiceno),HttpStatus.OK);
        }
    }

    //2.Extend Details before sending to URA
    @GetMapping("/beforeposting/extenddetails/{invoiceno}")
    public ResponseEntity<?> fetchExtendDetailsByInvoiceIdBeforePostingToURA(@PathVariable String invoiceno)
    {
        auditTrailsController.addAudit(RequestUsernameContext.getRequestUsername() + " Extend Details before sending to URA  "+invoiceno);
        if(extendDetailsRequestRepo.findByLocalInvoiceNo(invoiceno).isEmpty() || extendDetailsRequestRepo.findByLocalInvoiceNo(invoiceno).size()==0)
        {
            return new ResponseEntity<>("No Extend Details found for invoice no - "+invoiceno,HttpStatus.OK);
        }
        else
        {
            return new ResponseEntity<>(extendDetailsRequestRepo.findByLocalInvoiceNo(invoiceno),HttpStatus.OK);
        }
    }

    //3.Fetch Buyer Details by invoice number after posting to URA and receiving success response
    @GetMapping("/beforeposting/buyerdetails/{invoiceno}")
    public ResponseEntity<?> fetchBuyerDetailsByInvoiceIdBeforePostingToURA(@PathVariable String invoiceno)
    {
        auditTrailsController.addAudit(RequestUsernameContext.getRequestUsername() + " fetch Buyer Details by invoice number before posting to URA "+invoiceno);
        if(buyerDetailsRequestRepo.findByLocalInvoiceNo(invoiceno).isEmpty() || buyerDetailsRequestRepo.findByLocalInvoiceNo(invoiceno).size()==0)
        {
            return new ResponseEntity<>("No Buyer Details found for invoice no - "+invoiceno,HttpStatus.OK);
        }
        else
        {
            return new ResponseEntity<>(buyerDetailsRequestRepo.findByLocalInvoiceNo(invoiceno),HttpStatus.OK);
        }
    }

    //3.Fetch Goods Details before sending to URA
    @GetMapping("/beforeposting/goodsdetails/{invoiceno}")
    public ResponseEntity<?> fetchGoodsDetailsByInvoiceIdBeforePostingToURA(@PathVariable String invoiceno)
    {
        auditTrailsController.addAudit(RequestUsernameContext.getRequestUsername() + " Fetch Goods Details before sending to URA  "+invoiceno);
        if(goodsDetailsRequestRepo.findByLocalInvoiceNo(invoiceno).isEmpty() || goodsDetailsRequestRepo.findByLocalInvoiceNo(invoiceno).size()==0)
        {
            return new ResponseEntity<>("No Goods Details found for invoice no - "+invoiceno,HttpStatus.OK);
        }
        else
        {
            return new ResponseEntity<>(goodsDetailsRequestRepo.findByLocalInvoiceNo(invoiceno),HttpStatus.OK);
        }
    }

    //4.Pay Way Details before sending to URA
    @GetMapping("/beforeposting/paywaydetails/{invoiceno}")
    public ResponseEntity<?> fetchPaywayInfoByInvoiceIdBeforePostingToURA(@PathVariable String invoiceno)
    {
        auditTrailsController.addAudit(RequestUsernameContext.getRequestUsername() + " fetch Pay Way Details   "+invoiceno);
        if(payWayRequestRepo.findByLocalInvoiceNo(invoiceno).isEmpty() || payWayRequestRepo.findByLocalInvoiceNo(invoiceno).size()==0)
        {
            return new ResponseEntity<>("No Pay Way Info found for invoice no - "+invoiceno,HttpStatus.OK);
        }
        else
        {
            return new ResponseEntity<>(payWayRequestRepo.findByLocalInvoiceNo(invoiceno),HttpStatus.OK);
        }
    }

    //5.Seller Details before sending to URA
    @GetMapping("/beforeposting/sellerdetails/{invoiceno}")
    public ResponseEntity<?> fetchSellerDetailsByInvoiceIdBeforePostingToURA(@PathVariable String invoiceno)
    {
        auditTrailsController.addAudit(RequestUsernameContext.getRequestUsername() + " Fetch Seller Details  "+invoiceno);
        if(sellerDetailsRequestRepo.findByLocalInvoiceNo(invoiceno).isEmpty() || sellerDetailsRequestRepo.findByLocalInvoiceNo(invoiceno).size()==0)
        {
            return new ResponseEntity<>("No Seller Details Info found for invoice no - "+invoiceno,HttpStatus.OK);
        }
        else
        {
            return new ResponseEntity<>(sellerDetailsRequestRepo.findByLocalInvoiceNo(invoiceno),HttpStatus.OK);
        }
    }

    //6.Tax Details before sending to URA
    @GetMapping("/beforeposting/taxdetails/{invoiceno}")
    public ResponseEntity<?> fetchTaxDetailsByInvoiceIdBeforePostingToURA(@PathVariable String invoiceno)
    {
        auditTrailsController.addAudit(RequestUsernameContext.getRequestUsername() + " Fetch tax details by invoice  "+invoiceno);
        if(taxDetailsRequestRepo.findByLocalInvoiceNo(invoiceno).isEmpty() || taxDetailsRequestRepo.findByLocalInvoiceNo(invoiceno).size()==0)
        {
            return new ResponseEntity<>("No Tax Details found for invoice no - "+invoiceno,HttpStatus.OK);
        }
        else
        {
            return new ResponseEntity<>(taxDetailsRequestRepo.findByLocalInvoiceNo(invoiceno),HttpStatus.OK);
        }
    }

    //7.Summary Details before sending to URA
    @GetMapping("/beforeposting/summary/{invoiceno}")
    public ResponseEntity<?> fetchSummaryByInvoiceIdBeforePostingToURA(@PathVariable String invoiceno)
    {
        auditTrailsController.addAudit(RequestUsernameContext.getRequestUsername() + " Fetch summary details by invoice  "+invoiceno);
        if(summaryInfoRequestRepo.findByLocalInvoiceNo(invoiceno).isEmpty() || summaryInfoRequestRepo.findByLocalInvoiceNo(invoiceno).size()==0)
        {
            return new ResponseEntity<>("No Summary Details found for invoice no - "+invoiceno,HttpStatus.OK);
        }
        else
        {
            return new ResponseEntity<>(summaryInfoRequestRepo.findByLocalInvoiceNo(invoiceno),HttpStatus.OK);
        }
    }

    //10.Fetch Import Seller Details by invoice number before posting to URA and receiving success response
    @GetMapping("/beforeposting/importsellerdetails/{invoiceno}")
    public ResponseEntity<?> fetchImportBuyerDetailsByInvoiceIdBeforePostingToURA(@PathVariable String invoiceno)
    {
        auditTrailsController.addAudit(RequestUsernameContext.getRequestUsername() + " fetch Import Seller Details by invoice number before posting to URA"+invoiceno);
        if(importServicesSellerRepo.findByLocalInvoiceNo(invoiceno).isEmpty() || importServicesSellerRepo.findByLocalInvoiceNo(invoiceno).size()==0)
        {
            return new ResponseEntity<>(new String[]{"No Import Seller Details found for invoice no - " + invoiceno}, HttpStatus.OK);

        }
        else
        {
            return new ResponseEntity<>(importServicesSellerRepo.findByLocalInvoiceNo(invoiceno),HttpStatus.OK);
        }
    }

    @GetMapping(path = "retry")
    public ResponseEntity<?> retryPayment(@RequestParam String invoiceNo,@RequestParam String buyertin){
        auditTrailsController.addAudit(RequestUsernameContext.getRequestUsername() + " retry posting invoice  "+invoiceNo);
        int retrycount=0;
        Optional<SaveInvoiceDetails> saveInvoiceDetails = repository.getInvoiceDetails(invoiceNo);
        try {
            Integer count= saveInvoiceDetails.get().getRetryCount();
            System.out.println("Retry cont :: "+ count);
            if (count>=50){

                return new ResponseEntity<>(new co.ke.emtechhouse.eims.Utils.Response("You have Exceeded Retry limit(50) !!"), HttpStatus.OK);
            }else {
                saveInvoiceDetails.get().setRetryCount(count+1);
                repository.save(saveInvoiceDetails.get());
                return new ResponseEntity<>(service.uploadInvoiceToURA(invoiceNo,buyertin), HttpStatus.OK);
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
