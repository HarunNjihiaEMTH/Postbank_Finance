package co.ke.emtechhouse.eims.InvoiceComponent;


import co.ke.emtechhouse.eims.AuthenticationModule.controllers.AuditTrailsController;
import co.ke.emtechhouse.eims.AuthenticationModule.security.jwt.RequestUsernameContext;
import co.ke.emtechhouse.eims.InvoiceComponent.AgingComponent.Aging;
import co.ke.emtechhouse.eims.InvoiceComponent.AgingComponent.AgingRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.DecimalFormat;
import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

//@CrossOrigin
@RestController
@Slf4j
@RequestMapping("/api/v1/invoice/")
public class InvoiceController {
    private final InvoiceRepo invoiceRepo;
    private final InvoiceService invoiceService;
    private final AuditTrailsController auditTrailsController;

    @Autowired
    private AgingRepo agingRepo;

    public InvoiceController(InvoiceService invoiceService, InvoiceRepo invoiceRepo, InvoiceService invoiceService1, AuditTrailsController auditTrailsController, AgingRepo agingRepo) {
        this.invoiceRepo = invoiceRepo;
        this.invoiceService = invoiceService1;
        this.auditTrailsController = auditTrailsController;
        this.agingRepo = agingRepo;
    }

    @PostMapping("/add")
    public ResponseEntity<Invoice> addInvoice(@RequestBody Invoice invoice){
        try {//
            Double totalAmount = 0.0;
//            Loop through particulars and get each value, add to the total amount;
//            List<InvoiceParticulars> poParticulars = invoice.getInvoiceParticulars();
//            for (int i=0; i<poParticulars.size(); i++){
//                Double sum = totalAmount + poParticulars.get(i).getTotal();
//                totalAmount = sum;
//            }
//            System.out.println("Total Amount is" +totalAmount);
//              invoice. setInvoiceitemTotal (totalAmount);
            Invoice newinvoice = invoiceService.addInvoice(invoice);
            auditTrailsController.addAudit(RequestUsernameContext.getRequestUsername() + " added new invoice with invoice no " +invoice.getInvoiceNo());
            return  new ResponseEntity<>(newinvoice, HttpStatus.CREATED);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    @GetMapping("/all")
    public ResponseEntity<List<Invoice>> getAllInvoice () {
        try {
            List<Invoice> invoice = invoiceService.findAllInvoice();
            auditTrailsController.addAudit(RequestUsernameContext.getRequestUsername() + " view all invoices ");
            return  new ResponseEntity<>(invoice, HttpStatus.OK);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    @GetMapping("/find/{id}")
    public ResponseEntity<Invoice> getById (@PathVariable("id") Long id) {
        Invoice invoice = invoiceService.findById(id);
        auditTrailsController.addAudit(RequestUsernameContext.getRequestUsername() + " find invoice with id " +id);
        return new ResponseEntity<>(invoice, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<Invoice> updatePO(@RequestBody Invoice invoice) {
        Optional<Invoice> _existing = invoiceRepo.findById(invoice.getId());
        if (_existing.isPresent()){
            Invoice newinvoice = invoiceService.updateInvoice(invoice);
            auditTrailsController.addAudit(RequestUsernameContext.getRequestUsername() + " update invoice with invoice no " +invoice.getInvoiceNo());
            return new ResponseEntity<>(newinvoice, HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteInvoice(@PathVariable("id") Long id) {
        invoiceRepo.deleteById(id);
        auditTrailsController.addAudit(RequestUsernameContext.getRequestUsername() + " deleted with id " +id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/update/status")
    public ResponseEntity<Invoice> updateInvoice(@RequestParam Long id, @RequestParam String Status, @RequestParam String verifiedBy, @RequestParam String reason, @RequestParam Date verifiedTime ) {
        Optional<Invoice> _existing = invoiceRepo.findById(id);
        if (_existing.isPresent()) {
            Invoice invoice = _existing.get();
            invoice.setInvoiceStatus(Status);
            invoice.setVerifiedBy(verifiedBy);
            invoice.setVerifiedTime(verifiedTime);
            invoice.setReason(reason);
            invoiceRepo.save(invoice);
            auditTrailsController.addAudit(RequestUsernameContext.getRequestUsername() + " update invoice status "+Status+" with invoice no " +invoice.getInvoiceNo());
            return new ResponseEntity<>(invoice, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PutMapping("/update/payment")
    public ResponseEntity<Invoice> updatePayment(@RequestParam String id,@RequestParam Double amount,@RequestParam String modifiedby) {
        final DecimalFormat df = new DecimalFormat("0.00");
        Optional<Invoice> _existing = invoiceRepo.findById(Long.valueOf(id));
        if (_existing.isPresent()) {
            Double balance =0.00;
            Invoice invoice = _existing.get();
            invoice.setModifiedBy(modifiedby);
            invoice.setModifiedTime(new Date());
            if(invoice.getPayment_amount()<=0.00){
                invoice.setPayment_amount(amount);
                balance = invoice.getTotal_after_tax()-amount;
                invoice.setBalance(balance);
            }else if(invoice.getPayment_amount() >0){
                invoice.setPayment_amount(amount+ invoice.getPayment_amount());
                Double  total_deduction= invoice.getPayment_amount();
                balance = invoice.getTotal_after_tax()-total_deduction;
                invoice.setBalance(balance);
            }
            Double invoice_balance=invoice.getBalance();
            if(invoice_balance<=0 && invoice.getPayment_amount()<=0){
                invoice.setPayment_status("Unpaid");
            }else if (invoice_balance>0  && invoice_balance < invoice.getTotal_after_tax()){
                invoice.setPayment_status("partially");
            }else if (invoice.getPayment_amount()>=invoice.getTotal_after_tax() && invoice_balance <= 0 ){
                invoice.setPayment_status("paid");
            }else {
                invoice.setPayment_status("paid");
            }



            Double invoice_amount = invoice.getTotal_after_tax();
            Double vat_paid = (14/116)* invoice_amount;
            invoice.setVat_received(vat_paid);


            invoiceRepo.save(invoice);

            auditTrailsController.addAudit(RequestUsernameContext.getRequestUsername() + " recorded invoice payment with invoice no " +invoice.getInvoiceNo());
            return new ResponseEntity<>(invoice, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/all/approved")
    public ResponseEntity<List<Invoice>> getAllApprovedInvoices () {
        try {
            List<Invoice> invoice = invoiceRepo.getApproved();
            auditTrailsController.addAudit(RequestUsernameContext.getRequestUsername() + " view all approved invoices ");
            return  new ResponseEntity<>(invoice, HttpStatus.OK);
        }catch (Exception e) {
            log.info("Error {}, "+e);
            return null;
        }
    }

    @GetMapping(path = "aging")
    public ResponseEntity<List<Aging>> getAginginvoices() throws ParseException {
        return ResponseEntity.ok().body(invoiceService.getagingreport());
    }


    @GetMapping(path = "fetch/aging")
    public ResponseEntity<List<Aging>> fetch() {
        return ResponseEntity.ok().body(agingRepo.findAll());
    }


    @GetMapping("find/by/month")
    public ResponseEntity<?> invoiceMonthlySummary(@RequestParam String year){
        List<InvoiceRepo.countPerMonth> countPerMonths = invoiceRepo.invoiceMonthWise(year);
        return new ResponseEntity<>(countPerMonths, HttpStatus.OK);
    }


    @GetMapping("find/invoice/YearWise")
    public ResponseEntity<?> invoiceYearlySummary(){
        List<InvoiceRepo.countPerMonth> countPerMonths = invoiceRepo.invoiceYearWise();
        return new ResponseEntity<>(countPerMonths, HttpStatus.OK);
    }

    @GetMapping("find/invoice/DateWise")
    public ResponseEntity<?> invoiceDateWise(@RequestParam String year, @RequestParam String month){
        List<InvoiceRepo.countPerMonth> countPerMonths = invoiceRepo.invoiceDateWise(year, month);
        return new ResponseEntity<>(countPerMonths,HttpStatus.OK);
    }
}
