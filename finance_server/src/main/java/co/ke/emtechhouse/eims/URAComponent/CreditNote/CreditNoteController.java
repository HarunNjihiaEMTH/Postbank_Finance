package co.ke.emtechhouse.eims.URAComponent.CreditNote;

import co.ke.emtechhouse.eims.PurchaseOrderComponent.PurchaseOrder;
import co.ke.emtechhouse.eims.URAComponent.uploadinvoice.request.InvoiceUploadRequest;
import co.ke.emtechhouse.eims.Utils.Response;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

//@CrossOrigin
@RestController
@Slf4j
@RequestMapping("/api/v1/creditnote/")
public class CreditNoteController {
    @Autowired
    private CreditNoteApplicationService creditNoteApplicationService;

    @Autowired
    private CreditNoteApplciationRepository crepo;


    @PostMapping("/save")
    public ResponseEntity<?> savecreditNoteDetails (@RequestBody CreditNote creditNote) {
        Optional<CreditNote> cr= crepo.findByInvoiNo(creditNote.getOriInvoiceNo());
        if(cr.isPresent()){
            return new ResponseEntity<>(new Response("Credit note with invoice No. "+ creditNote.getOriInvoiceNo() + " already exists!!"), HttpStatus.OK);
        }else {
            try {
                creditNoteApplicationService.applycreditnte(creditNote);
                return new ResponseEntity<>(new Response("Credit note applicationSuccessfull"), HttpStatus.OK);
            }catch (Exception e) {
                log.info("Error {} "+e.getLocalizedMessage());
                e.printStackTrace();
                return new ResponseEntity<>(e.getLocalizedMessage(),HttpStatus.EXPECTATION_FAILED) ;
            }
        }
        }

    @GetMapping("/get")
    public ResponseEntity<?> fetchcreditNotes() {
        try {
          List<CreditNote> creditNoteList = creditNoteApplicationService.getcreditNotes();
            return new ResponseEntity<>(creditNoteList, HttpStatus.OK);
        }catch (Exception e) {
            log.info("Error {} "+e.getLocalizedMessage());
            e.printStackTrace();
            return new ResponseEntity<>(e.getLocalizedMessage(),HttpStatus.EXPECTATION_FAILED) ;
        }
    }
    @GetMapping("/post")
    public ResponseEntity<?> postToUra(@RequestParam String invoiceNo) {
        try {
            return new ResponseEntity<>(creditNoteApplicationService.postCreditNoteApplication(invoiceNo), HttpStatus.OK);
        }catch (Exception e) {
            log.info("Error {} "+e.getLocalizedMessage());
            e.printStackTrace();
            return new ResponseEntity<>(e.getLocalizedMessage(),HttpStatus.EXPECTATION_FAILED) ;
        }
    }


    @PutMapping("/update/status")
    public ResponseEntity<Response> verifyCreditNote(@RequestParam Long id, @RequestParam String Status, @RequestParam String verifiedBy, @RequestParam String reason ) {

        Optional<CreditNote> _existing = crepo.findById(id);
        if (_existing.isPresent()) {
            CreditNote creditNote = _existing.get();
            creditNote.setStatus(Status);
            creditNote.setVerifiedBy(verifiedBy);
            creditNote.setVerifiedTime(new Date());
            creditNote.setRejecionReason(reason);
            creditNoteApplicationService.updateCrditNote(creditNote);
            return new ResponseEntity<>(new Response("Credit Note updated successsfully!"), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateCreditNOte(@RequestBody CreditNote creditNote) {
        Optional<CreditNote> _existing = crepo.findById(creditNote.getId());
        if (_existing.isPresent()) {
           creditNoteApplicationService.updateCrditNote(creditNote);
            return new ResponseEntity<>(new Response("Credit note updated succesfuly!"), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/status")
    public ResponseEntity<?> fetchPerStatus(@RequestBody String  status) {
        List<CreditNote> creditNoteList = crepo.findByStatus(status);
        if (creditNoteList.size()>0) {
            return new ResponseEntity<>(creditNoteList, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new Response("Data Not found!"), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("retry/{invoiceNo}")
    public ResponseEntity<?> retry(@PathVariable String invoiceNo){
        try{

            return new ResponseEntity<>(creditNoteApplicationService.postCreditNoteApplication(invoiceNo), HttpStatus.OK);
        }catch (Exception e){
            log.error("Error occured {}",e.getLocalizedMessage());
            return new ResponseEntity<>(new Response("Error occured "+ e.getLocalizedMessage()), HttpStatus.OK);
        }
    }

    @GetMapping("/failed")
    public ResponseEntity<?> fetchFailedcreditNotes() {
        try {
            List<CreditNote> creditNoteList = crepo.findFailed();
            return new ResponseEntity<>(creditNoteList, HttpStatus.OK);
        }catch (Exception e) {
            log.info("Error {} "+e.getLocalizedMessage());
            e.printStackTrace();
            return new ResponseEntity<>(e.getLocalizedMessage(),HttpStatus.EXPECTATION_FAILED) ;
        }
    }
    @GetMapping("/successful")
    public ResponseEntity<?> fetchSuccessfulcreditNotes() {
        try {
            List<CreditNote> creditNoteList = crepo.findSuccessful();
            return new ResponseEntity<>(creditNoteList, HttpStatus.OK);
        }catch (Exception e) {
            log.info("Error {} "+e.getLocalizedMessage());
            e.printStackTrace();
            return new ResponseEntity<>(e.getLocalizedMessage(),HttpStatus.EXPECTATION_FAILED) ;
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Response> deleteCreditNo(@PathVariable Long id){
        try{
            creditNoteApplicationService.deleteCreditNote(id);
            return new ResponseEntity<>(new Response("Credit note with id "+id +"has been deleted successfully"),HttpStatus.OK);
        }catch (Exception e){
            log.error("Error {},",e.getLocalizedMessage());
            return new ResponseEntity<>(new Response(e.getMessage()),HttpStatus.NOT_FOUND);
        }
    }


}
