package co.ke.emtechhouse.eims.AuthenticationModule.controllers;

import co.ke.emtechhouse.eims.AuthenticationModule.exceptions.ApiRequestException;
import co.ke.emtechhouse.eims.AuthenticationModule.payload.Auditing;
import co.ke.emtechhouse.eims.AuthenticationModule.payload.Departments;
import co.ke.emtechhouse.eims.AuthenticationModule.payload.MessageResponse;
import co.ke.emtechhouse.eims.AuthenticationModule.repositories.AuditingRepository;
import co.ke.emtechhouse.eims.AuthenticationModule.repositories.DepartmentsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Random;

//@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/soa/departments")
public class DepartmentsController {
    @Autowired
    private DepartmentsRepository repository;

    @Autowired
    AuditingRepository auditingRepository;
    @Autowired
    AuditTrailsController auditTrailsController;

    //Auditing Configs
    String username = "";
    String modified_by = "";
    DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
    LocalDateTime now = LocalDateTime.now();
    String modified_on = dtf.format(now);


    //Auditing
    public void addAudit(Authentication authentication, HttpServletRequest request, String action) {
        Auditing auditing = new Auditing();
        auditing.setActivity(action);
        auditing.setStarttime(new Date());
        auditing.setUsername(authentication.getName());
        auditing.setRequestip(request.getRemoteAddr());
        auditingRepository.save(auditing);
    }

    //Add New Department
    @PostMapping("/add")
    public ResponseEntity<?> addDepartments(@RequestBody Departments bc)
    {
        if(!repository.findByName(bc.getName()).isEmpty()){
            throw new ApiRequestException("Another department with the same name exists!");
        }
        //Name length
        int length = bc.getName().length();

        Random rn = new Random();
        int random = rn.nextInt(1000 - 1) + 2;

        //Create Department Code
        String code = (bc.getName().substring(0,2)+bc.getName().substring(length-2,length)+"/"+random).toUpperCase();
        bc.setCode(code);
        repository.save(bc);

        //Add Audit
        auditTrailsController.addAudit("Add new Department "+ bc.getName() );

        return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse("New Department added Successfully!"));
    }

    //Edit Departments
    @PutMapping("/edit")
    public ResponseEntity<?> editDepartments(@RequestBody Departments bc)
    {
        if(!repository.findByName(bc.getName()).isEmpty()){
            throw new ApiRequestException("Another department with the same name exists!");
        }
        //Name length
        int length = bc.getName().length();

        Random rn = new Random();
        int random = rn.nextInt(1000 - 1) + 2;

        //Create Department Code
        String code = (bc.getName().substring(0,2)+bc.getName().substring(length-2,length)+"/"+random).toUpperCase();
        bc.setCode(code);
        repository.save(bc);

        //Add Audit
        auditTrailsController.addAudit("Edit Department "+ bc.getName() );
        return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse("Department edited Successfully!"));
    }

    //List Departments
    @GetMapping("/view")
    public ResponseEntity<List<Departments>> getAllDepartments()
    {
        List<Departments> departments =repository.findAll();
        //Add Audit
        auditTrailsController.addAudit("Admin View All Departments");
        return new ResponseEntity<>(departments, HttpStatus.OK);
    }


    //Delete Departments
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteDepartments(@PathVariable("id") Long id){
        repository.deleteById(id);
        //Add Audit
        auditTrailsController.addAudit("Admin Delete Department :: Id :: " + id);
        return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse("Department Deleted Successfully!"));
    }

    //Fetch by id
    @GetMapping("/find/{id}")
    public ResponseEntity<Departments> getDepartmentById(@PathVariable("id") long id) {
        Optional<Departments> details = repository.findById(id);
        //Add Audit
        auditTrailsController.addAudit("Admin View One Department :: Id :: " + id);
        return new ResponseEntity(details, HttpStatus.OK);
    }
}
