package co.ke.emtechhouse.eims.OrganisationComponent;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

//@CrossOrigin
@RestController
@Slf4j
@RequestMapping("/api/v1/organisation/")
public class OrganisationController {
    @Autowired
    private OrganisationService organisationService;
    @Autowired
    private OrganisationRepo organisationRepo;

    @PostMapping("/add")
    public ResponseEntity<Organisation> addOrganisation(@RequestBody Organisation organisation){
        try {
            Organisation newOrganisation = organisationService.addOrganisation(organisation);
            return  new ResponseEntity<>(newOrganisation, HttpStatus.CREATED);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    @GetMapping("/all")
    public ResponseEntity<List<Organisation>> getAllOrganisations () {
        try {
            List<Organisation> organisation = organisationService.findAllOrganisation();
            return  new ResponseEntity<>(organisation, HttpStatus.OK);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    @GetMapping("/find/{id}")
    public ResponseEntity<Organisation> getById (@PathVariable("id") Long id) {
        Organisation organisation = organisationService.findById(id);
        return new ResponseEntity<>(organisation, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<Organisation> updateOrganisation(@RequestBody Organisation organisation) {
        Optional<Organisation> _existing = organisationRepo.findById(organisation.getId());
        if (_existing.isPresent()){
            Organisation newOrganisation = organisationService.updateOrganisation(organisation);
            return new ResponseEntity<>(newOrganisation, HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteOrganisation(@PathVariable("id") Long id) {
        organisationService.deleteOrganisationById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
