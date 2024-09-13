package co.ke.emtechhouse.eims.AuthenticationModule.repositories;

import co.ke.emtechhouse.eims.AuthenticationModule.payload.ERole;
import co.ke.emtechhouse.eims.AuthenticationModule.payload.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
	Optional<Role> findByName(String name);

	//Count Admin Roles
	@Transactional
	@Query(nativeQuery = true,value = "SELECT count(*) FROM roles where name ='ROLE_ADMIN'")
	int countRoles();
	Boolean existsByName(String erole);

	//Select From user roles table
	@Transactional
	@Query(nativeQuery = true,value = "SELECT user_id From user_roles where role_id = :role_id")
	String selectFlag(@Param("role_id") Long role_id);
}
