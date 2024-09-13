package co.ke.emtechhouse.eims.SupplierComponent;

import co.ke.emtechhouse.eims.exception.NotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;


@Slf4j
@Service
public class SupplierService {
    private final SupplierRepo supplierRepo;

    public SupplierService(SupplierRepo supplierRepo) {
        this.supplierRepo = supplierRepo;
    }

    //add

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


    public Supplier addSupplier(Supplier supplier){
        try {
            supplier.setSupplierNumber(randomString());
            return supplierRepo.save(supplier);

        }catch (Exception e) {
            log.info("Catched Error {} " + e);
            return null;
        }}

    public List<Supplier> findAllSupplier(){
        try {
            return supplierRepo.findAll();
        }catch (Exception e){
            log.info("Catched Error {} " + e);
            return null;
        }}

    public Supplier findById(long id){
        try{
            return supplierRepo.findById(id).orElseThrow(() ->
                    new NotFoundException("Data " + id + " was not found"));
        }catch (Exception e){
            log.info("Catched Error {} " + e);
            return null;}}


    public Supplier updateSupplier(Supplier supplier){
        try{
            return supplierRepo.save(supplier);
        }catch (Exception e){
            log.info("Catched Error {} " + e);
            return null;
        }

    }
    public void deleteSupplierById(Long id) {
        try {
            supplierRepo.deleteById(id);
        } catch (Exception e) {
            log.info("Error {} " + e);
        }
    }
}
