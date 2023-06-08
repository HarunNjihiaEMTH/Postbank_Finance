package co.ke.emtechhouse.eims.TransactionComponent.AcrualSupplierMaintenance;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

//@CrossOrigin
@RestController
@Slf4j
@RequestMapping("/api/v1/accrual/supplier/")
public class SupplierdetailsController {
    private final SupplierdetailsRepo supplierdetailsRepo;
    private final SupplierdetailsService supplierdetailsService;

    public SupplierdetailsController(SupplierdetailsRepo supplierdetailsRepo, SupplierdetailsService supplierdetailsService) {
        this.supplierdetailsRepo = supplierdetailsRepo;
        this.supplierdetailsService = supplierdetailsService;
    }

    @PostMapping("/add")
    public ResponseEntity<Supplierdetails> addSupplierdetails(@RequestBody Supplierdetails supplierdetails){
        try {//
            Supplierdetails newsupplierdetails = supplierdetailsService.addSupplierdetails(supplierdetails);
            return  new ResponseEntity<>(newsupplierdetails, HttpStatus.CREATED);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    @GetMapping("/all")
    public ResponseEntity<List<Supplierdetails>> getAllSupplierdetails () {
        try {
            List<Supplierdetails> supplierdetails = supplierdetailsService.findAllSupplierdetails();
            return  new ResponseEntity<>(supplierdetails, HttpStatus.OK);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    @GetMapping("/find/{id}")
    public ResponseEntity<Supplierdetails> getById (@PathVariable("id") Long id) {
        Supplierdetails supplierdetails = supplierdetailsService.findById(id);
        return new ResponseEntity<>(supplierdetails, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<Supplierdetails> updatePO(@RequestBody Supplierdetails supplierdetails) {
        Optional<Supplierdetails> _existing = supplierdetailsRepo.findById(supplierdetails.getId());
        if (_existing.isPresent()){
            Supplierdetails newsupplierdetails = supplierdetailsService.updateSupplierdetails(supplierdetails);
            return new ResponseEntity<>(newsupplierdetails, HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteSupplierdetails(@PathVariable("id") Long id) {
        supplierdetailsService.deleteSupplierdetailsById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
//
//    @GetMapping(path = "contracts/supplier/{supplier_id}")
//    public ResponseEntity<?> getaccrualDetails(@PathVariable String supplier_id){
//
//        try{
//            List<Suppliercontract> suppliercontract = suppliercontractRepo.getContratcsBySupplierId(supplier_id);
//
//            return new ResponseEntity<>(suppliercontract,HttpStatus.OK );
//        } catch (Exception e) {
//
//            e.printStackTrace();
//            return new ResponseEntity<>(new Response("Error:-" + e.getLocalizedMessage()),HttpStatus.BAD_REQUEST );
//        }
//    }
}