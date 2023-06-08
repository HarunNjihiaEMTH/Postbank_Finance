package co.ke.emtechhouse.eims.URAComponent.KeyAndSignature;

import co.ke.emtechhouse.eims.AuthenticationModule.payload.MessageResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//@CrossOrigin
@RestController
@Slf4j
@RequestMapping("/api/v1/keyandsignature/")
public class KeyAndSignatureController {
    @Autowired
    private KeyAndSignatureService service;

    @GetMapping("/now")
    public ResponseEntity<?> fetchSymmetricKeyAndSignature () {
        try {
            service.getSymmetricKeyAndSignature();
            return new ResponseEntity<>(new MessageResponse("OK"), HttpStatus.OK);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
}
