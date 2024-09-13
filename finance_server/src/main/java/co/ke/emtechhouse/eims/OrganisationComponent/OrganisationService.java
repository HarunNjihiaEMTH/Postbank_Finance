package co.ke.emtechhouse.eims.OrganisationComponent;

import co.ke.emtechhouse.eims.exception.NotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class OrganisationService {
    @Autowired
    private OrganisationRepo organisationRepo;
    public Organisation addOrganisation(Organisation organisation){
        try {
            return organisationRepo.save(organisation);

        }catch (Exception e) {
            log.info("Catched Error {} " + e);
            return null;
        }}

    public List<Organisation> findAllOrganisation(){
        try {
            return organisationRepo.findAll();
        }catch (Exception e){
            log.info("Catched Error {} " + e);
            return null;
        }}

    public Organisation findById(long id){
        try{
            return organisationRepo.findById(id).orElseThrow(() ->
                    new NotFoundException("Data " + id + " was not found"));
        }catch (Exception e){
            log.info("Catched Error {} " + e);
            return null;}}


    public Organisation updateOrganisation(Organisation organisation){
        try{
            return organisationRepo.save(organisation);
        }catch (Exception e){
            log.info("Catched Error {} " + e);
            return null;
        }

    }
    public void deleteOrganisationById(Long id) {
        try {
            organisationRepo.deleteById(id);
        } catch (Exception e) {
            log.info("Error {} " + e);
        }
    }
}
