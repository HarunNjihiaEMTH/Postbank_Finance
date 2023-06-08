package co.ke.emtechhouse.eims.URAComponent.getservertime;

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
@RequestMapping("/api/v1/uraservertime/")
public class URAServerTimeController {
    @Autowired
    private ServerTimeService service;

    @GetMapping("/now")
    public ResponseEntity<?> getURAServerTimeNow () {
        try {
            return new ResponseEntity<>(service.getURAServerTime(), HttpStatus.OK);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
}
