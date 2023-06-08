package co.ke.emtechhouse.eims.URAComponent.dictionaryupdate;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//@CrossOrigin
@RestController
@Slf4j
@RequestMapping("/api/v1/dictionary/")
public class DictionaryUpdateController {
    @Autowired
    private DictionaryUpdateService service;

    @PostMapping("/now")
    public ResponseEntity<?> latestDictionary () {
        try {
            return new ResponseEntity<>(service.updateURADictionary(), HttpStatus.OK);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
}
