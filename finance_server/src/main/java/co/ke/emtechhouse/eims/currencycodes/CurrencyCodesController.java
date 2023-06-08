/*
 * Copyright (c) 2022. Omukubwa Software Solutions, OSS.
 * All Rights Reserved.
 */

package co.ke.emtechhouse.eims.currencycodes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
//@CrossOrigin(origins = "*")
@RequestMapping(value = "/api/v1/crncycodes/")
public class CurrencyCodesController {
    @Autowired
    private CurrencyCodesService service;

    @GetMapping("/all")
    public ResponseEntity<?> getAllCurrencyCodes () {
        return new ResponseEntity<>(service.getCurrencyCodes(), HttpStatus.OK);
    }
}
