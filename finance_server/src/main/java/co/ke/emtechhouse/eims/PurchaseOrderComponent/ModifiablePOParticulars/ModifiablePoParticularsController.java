package co.ke.emtechhouse.eims.PurchaseOrderComponent.ModifiablePOParticulars;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

//@CrossOrigin
@RestController
@Slf4j
@RequestMapping("/api/v1/po/particulars/modifiable")
public class ModifiablePoParticularsController {
    private final ModifiablePoParticularsRepo modifiablePoParticularsRepo;
    private final ModifiablePoParticularsService modifiablePoParticularsService;

    public ModifiablePoParticularsController(ModifiablePoParticularsRepo modifiablePoParticularsRepo, ModifiablePoParticularsService modifiablePoParticularsService) {
        this.modifiablePoParticularsRepo = modifiablePoParticularsRepo;
        this.modifiablePoParticularsService = modifiablePoParticularsService;
    }

    @PostMapping("/add")
    public ResponseEntity<ModifiablePoParticulars> addModifiablePoParticulars(@RequestBody ModifiablePoParticulars modifiablePoParticulars){
        try {//
            Double totalAmount = 0.0;
//            Loop through particulars and get each value, add to the total amount;
//            List<ModifiablePoParticularsParticulars> poParticulars = modifiablePoParticulars.getModifiablePoParticularsParticulars();
//            for (int i=0; i<poParticulars.size(); i++){
//                Double sum = totalAmount + poParticulars.get(i).getTotal();
//                totalAmount = sum;
//            }
//            System.out.println("Total Amount is" +totalAmount);
//              modifiablePoParticulars. setModifiablePoParticularsitemTotal (totalAmount);
            ModifiablePoParticulars newmodifiablePoParticulars = modifiablePoParticularsService.addModifiablePoParticulars(modifiablePoParticulars);
            return  new ResponseEntity<>(newmodifiablePoParticulars, HttpStatus.CREATED);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    @GetMapping("/all")
    public ResponseEntity<List<ModifiablePoParticulars>> getAllModifiablePoParticulars () {
        try {
            List<ModifiablePoParticulars> modifiablePoParticulars = modifiablePoParticularsService.findAllModifiablePoParticularss();
            return  new ResponseEntity<>(modifiablePoParticulars, HttpStatus.OK);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    @GetMapping("/find/{id}")
    public ResponseEntity<ModifiablePoParticulars> getById (@PathVariable("id") Long id) {
        ModifiablePoParticulars modifiablePoParticulars = modifiablePoParticularsService.findModifiablePoParticularsById(id);
        return new ResponseEntity<>(modifiablePoParticulars, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<ModifiablePoParticulars> updatePO(@RequestBody ModifiablePoParticulars modifiablePoParticulars) {
        Optional<ModifiablePoParticulars> _existing = modifiablePoParticularsRepo.findById(modifiablePoParticulars.getId());
        if (_existing.isPresent()){
            ModifiablePoParticulars newmodifiablePoParticulars = modifiablePoParticularsService.updateModifiablePoParticulars(modifiablePoParticulars);
            return new ResponseEntity<>(newmodifiablePoParticulars, HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
//    @DeleteMapping("/delete/{id}")
//    public ResponseEntity<?> deleteModifiablePoParticulars(@PathVariable("id") Long id) {
//        modifiablePoParticularsService.deleteModifiablePoParticularsById(id);
//        return new ResponseEntity<>(HttpStatus.OK);
//    }
}