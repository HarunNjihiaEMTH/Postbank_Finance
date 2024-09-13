package co.ke.emtechhouse.eims.CostCentersComponent;

import co.ke.emtechhouse.eims.exception.NotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class CostcentersService {
    private final CostcentersRepo costcentersRepo;

    public CostcentersService(CostcentersRepo costcentersRepo) {
        this.costcentersRepo = costcentersRepo;
    }

    //add
    public Costcenters addCostcenters(Costcenters costcenters){
        try {
            return costcentersRepo.save(costcenters);

        }catch (Exception e) {
            log.info("Catched Error {} " + e);
            return null;
        }
    }

    public List<Costcenters> findAllCostcenters(){
        try {
            return costcentersRepo.findAll();
        }catch (Exception e){
            log.info("Catched Error {} " + e);
            return null;
        }}

    public Costcenters findById(Long id){
        try{
            return costcentersRepo.findById(id).orElseThrow(() ->
                    new NotFoundException("Data " + id + " was not found"));
        }catch (Exception e){
            log.info("Catched Error {} " + e);
            return null;}}

    public Costcenters updateCostcenters(Costcenters costcenters){
        try{
            return costcentersRepo.save(costcenters);
        }catch (Exception e){
            log.info("Error {}"+e);
            return null;
        }
    }
    public void deleteCostcentersById(Long id) {
        try {
            costcentersRepo.deleteById(id);
        } catch (Exception e) {
            log.info("Error {} " + e);
        }
    }
}
