package co.ke.emtechhouse.eims.PurchaseOrderComponent.ModifiablePOParticulars;

import co.ke.emtechhouse.eims.exception.NotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class ModifiablePoParticularsService {
    private final ModifiablePoParticularsRepo modifiablePoParticularsRepo;

    public ModifiablePoParticularsService(ModifiablePoParticularsRepo modifiablePoParticularsRepo) {
        this.modifiablePoParticularsRepo = modifiablePoParticularsRepo;
    }

    public ModifiablePoParticulars addModifiablePoParticulars(ModifiablePoParticulars modifiablePoParticulars){
        try {
            return modifiablePoParticularsRepo.save(modifiablePoParticulars);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    public List<ModifiablePoParticulars> findAllModifiablePoParticularss(){
        try {
            return modifiablePoParticularsRepo.findAll();
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    public ModifiablePoParticulars findModifiablePoParticularsById(Long id){
        try {
            return modifiablePoParticularsRepo.findById(id).orElseThrow(()-> new NotFoundException("ModifiablePoParticulars " + id +"was not found"));
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    public ModifiablePoParticulars updateModifiablePoParticulars(ModifiablePoParticulars modifiablePoParticulars){
        try {
            return modifiablePoParticularsRepo.save(modifiablePoParticulars);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    public void deleteModifiablePoParticulars(Long id){
        try {
            modifiablePoParticularsRepo.deleteById(id);
        }catch (Exception e) {
            log.info("Error {} "+e);
        }
    }
}