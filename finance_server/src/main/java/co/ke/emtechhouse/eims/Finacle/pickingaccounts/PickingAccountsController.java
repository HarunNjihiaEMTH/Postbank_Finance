package co.ke.emtechhouse.eims.Finacle.pickingaccounts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
//@CrossOrigin(origins = "*")
@RequestMapping(value = "/api/v1/pickingdetails/")
public class PickingAccountsController {
    @Autowired
    private PickingDetailsService service;

    @GetMapping("/all")
    public ResponseEntity<?> getAllPickingAccountsDetails (@RequestParam("accountno") String accountno) {
        return new ResponseEntity<>(service.getPickingAccountsDetails(accountno), HttpStatus.OK);
    }
}
