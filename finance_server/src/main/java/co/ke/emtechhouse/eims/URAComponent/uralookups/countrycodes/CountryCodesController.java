package co.ke.emtechhouse.eims.URAComponent.uralookups.countrycodes;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//@CrossOrigin
@RestController
@Slf4j
@RequestMapping("/api/v1/uracountrycodes/")
public class CountryCodesController {
    @Autowired
    private CountryCodesService service;

    //Add
    @PostMapping("/add")
    public ResponseEntity<?> addCountryCodes(@RequestBody CountryCodes crncy)
    {
        return new ResponseEntity<>(service.addCountryCodes(crncy), HttpStatus.CREATED);
    }

    //Update
    @PutMapping("/update")
    public ResponseEntity<?> updateCountryCodes(@RequestBody CountryCodes crncy)
    {
        return new ResponseEntity<>(service.updateCountryCodes(crncy), HttpStatus.OK);
    }

    //Delete
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCountryCodes(@PathVariable Long id)
    {
        return new ResponseEntity<>(service.deleteCountryCodes(id), HttpStatus.OK);
    }

    //List All
    @GetMapping("/all")
    public ResponseEntity<?> listAllCountryCodes()
    {
        return new ResponseEntity<>(service.listCountryCodes(), HttpStatus.OK);
    }

    //Find By Id
    @GetMapping("/find/{id}")
    public ResponseEntity<?> findCurency(@PathVariable Long id)
    {
        return new ResponseEntity<>(service.listCountryCodesByID(id), HttpStatus.OK);
    }

    //Bulk Import CountryCodes codes
    @PostMapping("/bulkimport")
    public ResponseEntity<?> parseJSONArray(@RequestBody String json)
    {
        return new ResponseEntity<>(service.parseJSON(json), HttpStatus.OK);
    }
}
