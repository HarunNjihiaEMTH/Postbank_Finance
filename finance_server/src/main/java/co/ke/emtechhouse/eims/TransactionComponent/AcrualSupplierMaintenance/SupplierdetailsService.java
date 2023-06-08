package co.ke.emtechhouse.eims.TransactionComponent.AcrualSupplierMaintenance;

import co.ke.emtechhouse.eims.exception.NotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class SupplierdetailsService {
    private final SupplierdetailsRepo supplierdetailsRepo;

    public SupplierdetailsService(SupplierdetailsRepo supplierdetailsRepo) {
        this.supplierdetailsRepo = supplierdetailsRepo;
    }

    public Supplierdetails addSupplierdetails(Supplierdetails supplierdetails){
        try {
            return supplierdetailsRepo.save(supplierdetails);

        }catch (Exception e) {
            log.info("Catched Error {} " + e);
            return null;
        }
    }

    public List<Supplierdetails> findAllSupplierdetails(){
        try {
            return supplierdetailsRepo.findAll();
        }catch (Exception e){
            log.info("Catched Error {} " + e);
            return null;
        }}

    public Supplierdetails findById(Long id){
        try{
            return supplierdetailsRepo.findById(id).orElseThrow(() ->
                    new NotFoundException("Data " + id + " was not found"));
        }catch (Exception e){
            log.info("Catched Error {} " + e);
            return null;}}

    public Supplierdetails updateSupplierdetails(Supplierdetails supplierdetails){
        try{
            return supplierdetailsRepo.save(supplierdetails);
        }catch (Exception e){
            log.info("Error {}"+e);
            return null;
        }
    }
    public void deleteSupplierdetailsById(Long id) {
        try {
            supplierdetailsRepo.deleteById(id);
        } catch (Exception e) {
            log.info("Error {} " + e);
        }
    }
}
