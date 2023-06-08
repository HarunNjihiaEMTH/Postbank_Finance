package co.ke.emtechhouse.eims.TaxesComponent;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

//@CrossOrigin
@RestController
@Slf4j
@RequestMapping("/api/v1/tax/")
public class TaxesController {
    @Autowired
    private TaxesService taxesService;
    @Autowired
    private TaxesRepo taxesRepo;

    @PostMapping("/add")
    public ResponseEntity<Taxes> addTaxes(@RequestBody Taxes taxes){
        try {
            Optional<Taxes> tax = taxesRepo.checkByTaxName(taxes.getTaxName());
            if (tax.isPresent()){
                Taxes _tax = tax.get();
                _tax.setTaxAccount(taxes.getTaxAccount());
                _tax.setTaxValue(taxes.getTaxValue());
                _tax.setReason(taxes.getReason());
                _tax.setStatus(taxes.getStatus());
                taxesRepo.save(_tax);
                return  new ResponseEntity<>(_tax, HttpStatus.CREATED);
            }else{
                Taxes newTaxes = taxesService.addTaxes(taxes);
                return  new ResponseEntity<>(newTaxes, HttpStatus.CREATED);
            }
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    @GetMapping("/all")
    public ResponseEntity<List<Taxes>> getAllTaxess () {
        try {
            List<Taxes> taxes = taxesService.findAllTaxes();
            return  new ResponseEntity<>(taxes, HttpStatus.OK);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    @GetMapping("/find/{id}")
    public ResponseEntity<Taxes> getById (@PathVariable("id") Long id) {
        Taxes taxes = taxesService.findById(id);
        return new ResponseEntity<>(taxes, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<Taxes> updateTaxes(@RequestBody Taxes taxes) {
        Optional<Taxes> _existing = taxesRepo.findById(taxes.getId());
        if (_existing.isPresent()){
            Taxes newTaxes = taxesService.updateTaxes(taxes);
            return new ResponseEntity<>(newTaxes, HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteTaxes(@PathVariable("id") Long id) {
        taxesService.deleteTaxesById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
