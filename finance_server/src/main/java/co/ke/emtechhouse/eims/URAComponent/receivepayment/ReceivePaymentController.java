package co.ke.emtechhouse.eims.URAComponent.receivepayment;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

//@CrossOrigin
@RestController
@Slf4j
@RequestMapping("/api/v1/receivepayment/")
public class ReceivePaymentController {
    @Autowired
    private ReceivePaymentRepository receivePaymentRepository;

    //Return payable amount
    @GetMapping("/payableamount/{invoiceno}/{buyertin}")
    public ResponseEntity<?> fetchNetAmount(@PathVariable("invoiceno") String invoiceno,@PathVariable("buyertin") String buyertin) {
        return new ResponseEntity<>(receivePaymentRepository.getPaymentDetails(invoiceno,buyertin), HttpStatus.OK);
    }

    //Receive Payment
    @PostMapping("/save")
    public ResponseEntity<?> receivePayment(@RequestBody ReceivePaymentRequest request) {
        receivePaymentRepository.receivePayment(request.getReceivedby(),new Date(), request.getReceivedamount(), request.getReceivedstatus(), request.getInvoiceno(), request.getBuyertin());
        receivePaymentRepository.updatePaymentStatus(request.getReceivedstatus(),request.getInvoiceno(),request.getBuyertin());
        return new ResponseEntity<>("Payment for Invoice No. "+request.getInvoiceno()+" Received.Status : "+request.getReceivedstatus(),HttpStatus.OK);
    }
}
