package co.ke.emtechhouse.eims.URAComponent.CreditNote.CreditNoteCancellation;


import co.ke.emtechhouse.eims.URAComponent.CreditNote.CreditNote;
import co.ke.emtechhouse.eims.URAComponent.CreditNote.CreditNoteApplciationRepository;
import co.ke.emtechhouse.eims.Utils.Response;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/creditnotecancel/")
//@CrossOrigin
@Slf4j
public class CreditNoteCancellationController {

    @Autowired
    private CreditNoteCancellationService creditNoteCancellationService;

    @Autowired
    private CancelCreditNoteRepo cancelCreditNoteRepo;
    @Autowired
    private CreditNoteApplciationRepository crepo;

    @PostMapping("/create")
    public ResponseEntity<?> createCreditNoteCancellation(@RequestBody CancelCreditNote cancelCreditNote){
        try {

            Optional<CancelCreditNote> creditnotecancellation = cancelCreditNoteRepo.findByInvoiceNo(cancelCreditNote.getInvoiceNo());
            if(creditnotecancellation.isPresent()){
//                Optional<CreditNote> creditNote = crepo.findByInvoiNo(cancelCreditNote.getInvoiceNo());
//                creditNote.get().setCancellationstatus("Applied");
//                crepo.save(creditNote.get());
                return new ResponseEntity<>(new Response("Credit note cancellation for invoice " + cancelCreditNote.getInvoiceNo() + " has already been submitted"), HttpStatus.ALREADY_REPORTED);

            }else {
              Optional<CreditNote> creditNote = crepo.findByInvoiNo(cancelCreditNote.getInvoiceNo());
                creditNote.get().setCancellationstatus("Applied");
                crepo.save(creditNote.get());
                cancelCreditNoteRepo.save(cancelCreditNote);
                return new ResponseEntity<>(new Response("Credit note cancellation submitted successfully"), HttpStatus.OK);
            }
        }catch (Exception exception){
            return new ResponseEntity<>(new Response(exception.getLocalizedMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/pendingcreditnote")
    public ResponseEntity<?> fetchpendingcreditnotes(){
        try {
            List<CancelCreditNote> cancelCreditNotes = cancelCreditNoteRepo.findallpendingcreditnotes();
            return new ResponseEntity<>(cancelCreditNotes, HttpStatus.OK);
        }catch (Exception exception){
            return new ResponseEntity<>(new Response(exception.getLocalizedMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/cancelledcreditnote")
    public ResponseEntity<?> fetchcancelledcreditnotes(){
        try {
            List<CancelCreditNote> cancelCreditNotes = cancelCreditNoteRepo.findallcancelledcreditnotes();
            return new ResponseEntity<>(cancelCreditNotes, HttpStatus.OK);
        }catch (Exception exception){
            return new ResponseEntity<>(new Response(exception.getLocalizedMessage()), HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping("/approvedcreditnote")
    public ResponseEntity<?> fetchapprovedcreditnotes(){
        try {
            List<CancelCreditNote> cancelCreditNotes = cancelCreditNoteRepo.findallapprovedcreditnotes();
            return new ResponseEntity<>(cancelCreditNotes, HttpStatus.OK);
        }catch (Exception exception){
            return new ResponseEntity<>(new Response(exception.getLocalizedMessage()), HttpStatus.BAD_REQUEST);
        }
    }


    @PutMapping("/updatecreditnote")
    public ResponseEntity<?> updatecreditnote(@RequestBody CancelCreditNote cancelCreditNote){
        try {
            Optional<CancelCreditNote> creditNotecheck = cancelCreditNoteRepo.findById(cancelCreditNote.getId());
            if (creditNotecheck.isPresent()){
                cancelCreditNoteRepo.save(cancelCreditNote);
                return new ResponseEntity<>(new Response("Credit note updated successfully"), HttpStatus.OK);
            }else {
                return new ResponseEntity<>(new Response("Credit note Not found"), HttpStatus.NOT_FOUND);
            }
        }catch (Exception exception){
            return new ResponseEntity<>(new Response(exception.getLocalizedMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/update/status")
    public ResponseEntity<?> verifycreditnotecancellation(@RequestParam Long id, @RequestParam String status, @RequestParam String verifiedBy, @RequestParam String reason ){
        try {
            Optional<CancelCreditNote> creditNoteCancel = cancelCreditNoteRepo.findById(id);
            if (creditNoteCancel.isPresent()){
                CancelCreditNote creditNote = creditNoteCancel.get();
                creditNote.setStatus(status);
//                creditNote.setCancellationstatus("Approved");
                creditNote.setVerifiedBy(verifiedBy);
                creditNote.setVerifiedTime(new Date());
                creditNote.setReason(reason);

                cancelCreditNoteRepo.save(creditNote);
                return new ResponseEntity<>(new Response("Credit Note Verified Successfully"), HttpStatus.OK);
            }else {
                return new ResponseEntity<>(new Response("Data Not Found"), HttpStatus.NOT_FOUND);
            }
        }catch (Exception exception){
            return new ResponseEntity<>(new Response(exception.getLocalizedMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/getbystatus")
    public ResponseEntity<?> fetchByCancellationStatus(@RequestParam String status){
        try {
            List<CancelCreditNote> cancelCreditNotes = cancelCreditNoteRepo.fetchByStatus(status);
            if (cancelCreditNotes.size() > 0){
                return new ResponseEntity<>(cancelCreditNotes, HttpStatus.OK);
            }else {
                return new ResponseEntity<>(new Response("No Data Found"), HttpStatus.NOT_FOUND);
            }
        }catch (Exception exception){
            return new ResponseEntity<>(new Response(exception.getLocalizedMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/failedcancellations")
    public ResponseEntity<?> fetchfailedcancellations(){
        try {
            List<CancelCreditNote> creditNotes = cancelCreditNoteRepo.findallfailedcreditnotes();
            return new ResponseEntity<>(creditNotes, HttpStatus.OK);
        }catch (Exception exception){
            return new ResponseEntity<>(new Response(exception.getLocalizedMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/successfulcancellations")
    public ResponseEntity<?> fetchsuccessfulcancellations(){
        try {
            List<CancelCreditNote> creditNotes = cancelCreditNoteRepo.findallsuccessfulcreditnotes();
            return new ResponseEntity<>(creditNotes, HttpStatus.OK);
        }catch (Exception exception){
            return new ResponseEntity<>(new Response(exception.getLocalizedMessage()), HttpStatus.BAD_REQUEST);
        }
    }



    @PostMapping("/postcancellation")
    public ResponseEntity<?> cancelcreditnote(@RequestBody CreditNotCancellationRequest request){
        try {
            Optional<CancelCreditNote> cancelCreditNote = cancelCreditNoteRepo.findByInvoiceNo(request.getInvoiceNo());
            if (cancelCreditNote.isPresent() && Objects.equals(cancelCreditNote.get().getPostedStatus(), "Y")){
                return new ResponseEntity<>(new Response("Credit note has already been submitted to URA"), HttpStatus.ALREADY_REPORTED);
            }else if (cancelCreditNote.isPresent() && Objects.equals(cancelCreditNote.get().getStatus(), "Approved")){
                return new ResponseEntity<>(creditNoteCancellationService.cancelcreditnote(request), HttpStatus.OK);
            }else {
                return new ResponseEntity<>(new Response("Request could not be processed, Please verify your credit note cancellation to proceed"), HttpStatus.BAD_REQUEST);
            }
        }catch (Exception exception){
            log.info("Error: " + exception.getLocalizedMessage());
            return new ResponseEntity<>(new Response(exception.getLocalizedMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/retryposting/{invoiceno}")
    public ResponseEntity<?> retrypostingcancellation(@PathVariable String invoiceno){

        try {
            Optional<CancelCreditNote> creditNoteCancel = cancelCreditNoteRepo.findByInvoiceNo(invoiceno);
            CreditNotCancellationRequest creditNotCancellationRequest = new CreditNotCancellationRequest();
            if(creditNoteCancel.isPresent()){

                creditNotCancellationRequest.setReason(creditNoteCancel.get().getReason());
                creditNotCancellationRequest.setReasonCode(creditNoteCancel.get().getReasonCode());
                creditNotCancellationRequest.setOriInvoiceId(creditNoteCancel.get().getOriInvoiceId());
                creditNotCancellationRequest.setInvoiceNo(creditNoteCancel.get().getInvoiceNo());
                creditNoteCancellationService.cancelcreditnote(creditNotCancellationRequest);
            }
            return new ResponseEntity<>(new Response("Credit cancellation posted successfully"), HttpStatus.OK);
        }catch (Exception exception){
            return new ResponseEntity<>(exception.getLocalizedMessage(), HttpStatus.BAD_REQUEST);
        }
    }



}
