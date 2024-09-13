package co.ke.emtechhouse.eims.URAComponent.uralookups.currencies;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//@CrossOrigin
@RestController
@Slf4j
@RequestMapping("/api/v1/uracurrencies/")
public class CurrenciesController {
    @Autowired
    private CurrenciesService service;

    //Add
    @PostMapping("/add")
    public ResponseEntity<?> addCurrencies(@RequestBody Currencies crncy)
    {
        return new ResponseEntity<>(service.addCurrencies(crncy), HttpStatus.CREATED);
    }

    //Update
    @PutMapping("/update")
    public ResponseEntity<?> updateCurrencies(@RequestBody Currencies crncy)
    {
        return new ResponseEntity<>(service.updateCurrency(crncy), HttpStatus.OK);
    }

    //Delete
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCurrency(@PathVariable Long id)
    {
        return new ResponseEntity<>(service.deleteCurrencies(id), HttpStatus.OK);
    }

    //List All
    @GetMapping("/all")
    public ResponseEntity<?> listAllCurrencies()
    {
        return new ResponseEntity<>(service.listCurrencies(), HttpStatus.OK);
    }

    //Find By Id
    @GetMapping("/find/{id}")
    public ResponseEntity<?> findCurency(@PathVariable Long id)
    {
        return new ResponseEntity<>(service.listCurrenciesByID(id), HttpStatus.OK);
    }

    //Bulk Import Currency codes
    @PostMapping("/bulkimport")
    public ResponseEntity<?> parseJSONArray(@RequestBody String json)
    {
        return new ResponseEntity<>(service.parseJSON(json), HttpStatus.OK);
    }
}
