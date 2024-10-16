package co.ke.emtechhouse.eims;
import co.ke.emtechhouse.eims.AuthenticationModule.payload.ERole;
import co.ke.emtechhouse.eims.AuthenticationModule.payload.Role;
import co.ke.emtechhouse.eims.AuthenticationModule.payload.User;
import co.ke.emtechhouse.eims.AuthenticationModule.repositories.RoleRepository;
import co.ke.emtechhouse.eims.AuthenticationModule.repositories.UserRepository;
import co.ke.emtechhouse.eims.Utils.InitAuth;
import com.ulisesbocchio.jasyptspringboot.annotation.EnableEncryptableProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import static co.ke.emtechhouse.eims.AuthenticationModule.payload.ERole.ROLE_ADMIN;
@SpringBootApplication
@EnableScheduling

@EnableEncryptableProperties
public class ExpenseInvoiceManagementSolutionApplication extends SpringBootServletInitializer {
	public static void main(String[] args) {
		SpringApplication.run(ExpenseInvoiceManagementSolutionApplication.class, args);
	}
	@Component
	public class AdminData implements CommandLineRunner {
		@Autowired
		private UserRepository repository;
		@Autowired
		private RoleRepository roleRepository;
		@Autowired
		private InitAuth initAuth;
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
		LocalDateTime now = LocalDateTime.now();
		String modified_on = dtf.format(now);
		void addAdminRole() {
			Optional<Role> roleadmin = roleRepository.findByName(ROLE_ADMIN.toString());
			if(roleadmin.isPresent()){

			}else{
				Role role = new Role();
				roleRepository.save(initAuth.getRole());
			}
		}
		void addUsersRole()
		{
			Optional<Role> roleadmin = roleRepository.findByName(ERole.ROLE_USER.toString());
			if(roleadmin.isPresent()){

			}else{
				Role role = new Role();
				role.setName(ERole.ROLE_USER.toString());
				roleRepository.save(role);
			}
		}
//		InitAuth
		void addAdmin() {
			User user = new User();
			Set<Role> roles = new HashSet<>();
			Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN.toString()).orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(adminRole);
			user.setRoles(roles);
			user.setFirstname("admin");
			user.setLastname("admin");
			user.setUsername("soaadmin");
			user.setEmail("wahomejipheens@gmail.com");
			user.setPhonenumber("071665104");
			user.setModifiedBy("defaultuser");
			user.setCreatedOn(modified_on);
			user.setModifiedOn(modified_on);
			user.setAcctActive(true);
			user.setAcctLocked(false);
			user.setSystemGenPassword(true);
			user.setDepartment("IT");
			user.setDeleteFlag("N");
			user.setStatus("Approved");
			user.setPassword("$2a$10$CQaGCl7cT0DCKwy8i2XaN.8X1jM09kr6aQgh2DfDV/VQT1SYP3nL6");
			repository.save(user);
		}
		void userAdmzin() {
			User user = new User();
			Set<Role> roles = new HashSet<>();
			Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN.toString()).orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(adminRole);
			user.setRoles(roles);
			user.setFirstname("Morris");
			user.setLastname("Muwanda");
			user.setUsername("Morris");
			user.setEmail("muwanda@postbank.co.ug");
			user.setPhonenumber("+256417157203");
			user.setModifiedBy("defaultuser");
			user.setCreatedOn(modified_on);
			user.setModifiedOn(modified_on);
			user.setAcctActive(true);
			user.setAcctLocked(false);
			user.setSystemGenPassword(true);
			user.setDepartment("IT");
			user.setDeleteFlag("N");
			user.setStatus("Approved");
			user.setPassword("$2a$10$CQaGCl7cT0DCKwy8i2XaN.8X1jM09kr6aQgh2DfDV/VQT1SYP3nL6");
			repository.save(user);
		}
		@Override
		public void run(String... args) throws Exception {
			int countusers = repository.countUsers();
			Optional<User> user = repository.findByUsername("Morris");
			int countroles = roleRepository.countRoles();
			if (countroles < 1) {
				addAdminRole();
			}
			if (countusers < 1) {
				addAdmin();
			}

		}
	}
}

