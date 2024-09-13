package co.ke.emtechhouse.eims.AuthenticationModule.controllers;

import co.ke.emtechhouse.eims.AuthenticationModule.payload.Auditing;
import co.ke.emtechhouse.eims.AuthenticationModule.payload.ERole;
import co.ke.emtechhouse.eims.AuthenticationModule.payload.MessageResponse;
import co.ke.emtechhouse.eims.AuthenticationModule.payload.Role;
import co.ke.emtechhouse.eims.AuthenticationModule.repositories.AuditingRepository;
import co.ke.emtechhouse.eims.AuthenticationModule.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

//@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/soa/roles")
public class RolesController {
	@Autowired
	private RoleRepository repository;

	//Auditing Configs
	DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
	LocalDateTime now = LocalDateTime.now();
	String modified_on = dtf.format(now);

	@Autowired
	AuditingRepository auditingRepository;
	@Autowired
	AuditTrailsController auditTrailsController;


	//Add Roles
	@PostMapping("/add")
	public ResponseEntity<?> saveSenderInfo(@RequestBody Role details) throws Exception
	{
		//Get Role Enum
		String role = details.getName().toString().toUpperCase();
		if (repository.existsByName(role)) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Role already added!"));
		}
		Role newrole = repository.save(details);
		//Add Audit
		auditTrailsController.addAudit("Add role "+newrole.getName());
		return new ResponseEntity<>(newrole, HttpStatus.CREATED);
	}
	//For listing all Roles
	@GetMapping("/view")
	public ResponseEntity<List<Role>> getAllRoles()
	{
		List<Role> roles =repository.findAll();
		//Add Audit
		auditTrailsController.addAudit("View all roles");
		return new ResponseEntity<>(roles, HttpStatus.OK);
	}
	//Updating ROLE NAME
	@PutMapping("/update")
	public ResponseEntity<Role> updateRole(@RequestBody Role tmp)
	{
		Role updatedetails = repository.save(tmp);
		//Add Audit
		auditTrailsController.addAudit("Update role "+tmp.getName());
		return new ResponseEntity<>(updatedetails,HttpStatus.OK);
	}
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteRole(@PathVariable("id") Long id)
	{
		Optional<Role> role = repository.findById(id);
		if (role.isPresent()){
			repository.deleteById(id);
			auditTrailsController.addAudit("Delete role "+ repository.findById(id).get().getName());
			return ResponseEntity.ok(new MessageResponse("Role Deleted!"));
		}else {
			return ResponseEntity.ok(new MessageResponse("Role Not Found!"));
		}
	}
}
