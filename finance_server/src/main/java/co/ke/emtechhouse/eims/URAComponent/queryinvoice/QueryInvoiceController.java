package co.ke.emtechhouse.eims.URAComponent.queryinvoice;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//@CrossOrigin
@RestController
@Slf4j
@RequestMapping("/api/v1/queryinvoice/")
public class QueryInvoiceController {
    @Autowired
    private QueryInvoiceService service;

    @PostMapping("/now")
    public ResponseEntity<?> uploadInvoice (@RequestBody QueryInvoiceRequest uraRequest) {
        try {
            return new ResponseEntity<>(service.queryInvoice(uraRequest), HttpStatus.OK);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }


    @PostMapping("/all")
    public ResponseEntity<?> QueryInvoiceDets(@RequestBody InvoiceInqReq uraRequest) {
        System.out.println(uraRequest.getInvoiceNo());
        try {
            return new ResponseEntity<>(service.queryInvoiceDetails(uraRequest), HttpStatus.OK);
        }catch (Exception e) {
            e.printStackTrace();
            log.info("Error {} "+e);
            return null;
        }
    }


}
