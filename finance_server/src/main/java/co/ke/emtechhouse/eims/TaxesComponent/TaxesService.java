package co.ke.emtechhouse.eims.TaxesComponent;

import co.ke.emtechhouse.eims.exception.NotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class TaxesService {
    @Autowired
    private TaxesRepo taxesRepo;
    //add
    public Taxes addTaxes(Taxes taxes){
        try {
            return taxesRepo.save(taxes);

        }catch (Exception e) {
            log.info("Catched Error {} " + e);
            return null;
        }}

    public List<Taxes> findAllTaxes(){
        try {
            return taxesRepo.findAll();
        }catch (Exception e){
            log.info("Catched Error {} " + e);
            return null;
        }}

    public Taxes findById(long id){
        try{
            return taxesRepo.findById(id).orElseThrow(() ->
                    new NotFoundException("Data " + id + " was not found"));
        }catch (Exception e){
            log.info("Catched Error {} " + e);
            return null;}}


    public Taxes updateTaxes(Taxes taxes){
        try{
            return taxesRepo.save(taxes);
        }catch (Exception e){
            log.info("Catched Error {} " + e);
            return null;
        }

    }
    public void deleteTaxesById(Long id) {
        try {
            taxesRepo.deleteById(id);
        } catch (Exception e) {
            log.info("Error {} " + e);
        }
    }
}
