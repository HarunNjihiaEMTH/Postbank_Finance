package co.ke.emtechhouse.eims.PurchaseOrderComponent.PoParticularsComponent;

import co.ke.emtechhouse.eims.exception.NotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class PoParticularsService {
    private final PoParticularsRepo poParticularsRepo;

    public PoParticularsService(PoParticularsRepo poParticularsRepo) {
        this.poParticularsRepo = poParticularsRepo;
    }


    public PoParticulars addPoParticulars(PoParticulars poParticulars){
        try {

            return poParticularsRepo.save(poParticulars);

        }catch (Exception e) {
            log.info("Catched Error {} " + e);
            return null;
        }}
    //
    public List<PoParticulars> getAllPoParticulars(){
        try {
            return poParticularsRepo.findAll();
        }catch (Exception e){
            log.info("Catched Error {} " + e);
            return null;
        }}
    //
    public PoParticulars getById(Long id){
        try{
            return poParticularsRepo.findById(id).orElseThrow(() ->
                    new NotFoundException("Data " + id + " was not found"));
        }catch (Exception e){
            log.info("Catched Error {} " + e);
            return null;}}


    public PoParticulars updatePoParticulars(PoParticulars purchaseorder){
        try{
            return poParticularsRepo.save(purchaseorder);
        }catch (Exception e){
            log.info("Catched Error {} " + e);
            return null;
        }
    }
}