package co.ke.emtechhouse.eims.SupplierComponent;


import co.ke.emtechhouse.eims.DTO.SupplierDetail;
import co.ke.emtechhouse.eims.SubCategoryComponent.SubCategory;
import co.ke.emtechhouse.eims.Utils.Response;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Column;
import java.util.*;

//@CrossOrigin
@RestController
@Slf4j
@RequestMapping("/api/v1/supplier/")
public class SupplierController {

    private final SupplierRepo supplierRepo;
    private  final  SupplierService supplierService;

    public SupplierController(SupplierRepo supplierRepo, SupplierService supplierService) {
        this.supplierRepo = supplierRepo;
        this.supplierService = supplierService;
    }
    @PostMapping("/add")
    public  ResponseEntity<Supplier> addSupplier(@RequestBody Supplier supplier){
        try {
            Supplier newSupplier = supplierService.addSupplier(supplier);
            return  new ResponseEntity<>(newSupplier, HttpStatus.CREATED);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    public  String randomString(){
        String SALTCHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        StringBuilder salt = new StringBuilder();
        Random rnd = new Random();
        while (salt.length() < 6) {
            // length of the random string.
            int index = (int) (rnd.nextFloat() * SALTCHARS.length());
            salt.append(SALTCHARS.charAt(index));
        }
        String codeString = salt.toString();
        return codeString;
    }
    @PostMapping("/add/supplier/array")
    public  ResponseEntity<?> addArrayofSupplier(@RequestBody List<SupplierDetail> supplierDetails){
        try {
            List<Supplier> suppliers = new ArrayList<>();
            for (int i = 0; i<supplierDetails.size(); i++){
                SupplierDetail supplierDetail = supplierDetails.get(i);
                Supplier newSupplier = new Supplier();
                newSupplier.setSupplierNumber(randomString());
                newSupplier.setSupplierAccount(supplierDetail.getSupplierAccount());
                newSupplier.setSupplierAddress(supplierDetail.getSupplierAddress());
                newSupplier.setSupplierTin(supplierDetail.getSupplierTin());
                newSupplier.setSupplierBank(supplierDetail.getSupplierBank());
                newSupplier.setSupplierCurrency(supplierDetail.getSupplierCurrency());
                newSupplier.setSupplierCountry(supplierDetail.getSupplierCountry());
                newSupplier.setSupplierContact(supplierDetail.getSupplierContact());
                newSupplier.setSupplierEmail(supplierDetail.getSupplierEmail());
                newSupplier.setSupplierName(supplierDetail.getSupplierName());
                newSupplier.setPostedBy(supplierDetail.getPostedBy());
                newSupplier.setSupplierServices(supplierDetail.getSupplierServices());
                newSupplier.setSupplierServiceDescription(supplierDetail.getSupplierServiceDescription());
                newSupplier.setPostedTime(new Date());
                newSupplier.setPostedFlag('Y');
                suppliers.add(newSupplier);
            }
            supplierRepo.saveAll(suppliers);
            return  new ResponseEntity<>(new Response("Saved Successfully") , HttpStatus.CREATED);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }



    @GetMapping("/all")
    public ResponseEntity<List<Supplier>> getAllSuppliers () {
        try {
            List<Supplier> supplier = supplierService.findAllSupplier();
            return  new ResponseEntity<>(supplier, HttpStatus.OK);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    @GetMapping("/find/{id}")
    public ResponseEntity<Supplier> getById (@PathVariable("id") Long id) {
        Supplier supplier = supplierService.findById(id);
        return new ResponseEntity<>(supplier, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<Supplier> updateSupplier(@RequestBody Supplier supplier) {
        Optional<Supplier> _existing = supplierRepo.findById(supplier.getId());
        if (_existing.isPresent()){
            Supplier newSupplier = supplierService.updateSupplier(supplier);
            return new ResponseEntity<>(newSupplier, HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteSupplier(@PathVariable("id") Long id) {
        supplierService.deleteSupplierById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/update/status")
    public ResponseEntity<Supplier> updateSupplierStatus(@RequestParam Long id, @RequestParam String status, @RequestParam String verifiedBy, @RequestParam String reason, @RequestParam Date verifiedTime ) {
        Optional<Supplier> _existing = supplierRepo.findById(id);
        if (_existing.isPresent()){
            Supplier supplier = _existing.get();
            supplier.setStatus(status);
            supplier.setVerifiedBy(verifiedBy);
            supplier.setVerifiedTime(verifiedTime);
            supplier.setReason(reason);
            supplierRepo.save(supplier);
            return new ResponseEntity<>(supplier, HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
