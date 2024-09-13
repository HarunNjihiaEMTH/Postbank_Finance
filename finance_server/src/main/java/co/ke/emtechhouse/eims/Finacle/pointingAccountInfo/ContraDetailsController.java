package co.ke.emtechhouse.eims.Finacle.pointingAccountInfo;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/api/v1/contraDetails/")
public class ContraDetailsController {
    @Autowired
    private ContraDetailsService contraDetailsService;

    @GetMapping("/all")
    public ResponseEntity<?> getContraDetailsForPointingAccount(@RequestParam("accountNo") String accountNo)
    {
        return new ResponseEntity<>(contraDetailsService.getContraDetailsForPointingAccount(accountNo), HttpStatus.OK);
    }
}
