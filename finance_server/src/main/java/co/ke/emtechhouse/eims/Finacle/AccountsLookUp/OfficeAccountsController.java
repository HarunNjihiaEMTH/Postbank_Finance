/*
 * Copyright (c) 2022. Omukubwa Software Solutions, OSS.
 * All Rights Reserved.
 */

package co.ke.emtechhouse.eims.Finacle.AccountsLookUp;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
//@CrossOrigin(origins = "*")
@RequestMapping(value = "/api/v1/officeaccounts/")
public class OfficeAccountsController {
    @Autowired
    private OfficeAccountsService service;

    @GetMapping("/all")
    public ResponseEntity<?> getAllBranchCodes (@RequestParam String SOL_ID,@RequestParam String schemecode) {
        return new ResponseEntity<>(service.getOfficeAccountsCodes(SOL_ID,schemecode), HttpStatus.OK);
    }

    @GetMapping("/branchcods")
    public ResponseEntity<?> getBcodes () {
        return new ResponseEntity<>(service.getBranchCodes(), HttpStatus.OK);
    }
    @GetMapping("/schemecodes")
    public ResponseEntity<?> getShemecode () {
        return new ResponseEntity<>(service.getSchemeCodes(), HttpStatus.OK);
    }
    @GetMapping("/banks")
    public ResponseEntity<?> getBanks () {
        return new ResponseEntity<>(service.getBanks(), HttpStatus.OK);
    }
}
