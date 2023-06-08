package co.ke.emtechhouse.eims.AuthenticationModule.repositories;

import co.ke.emtechhouse.eims.AuthenticationModule.payload.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByUsername(String username);
	Optional<User> findByEmail(String email);

	Boolean existsByUsername(String username);

	Boolean existsByEmail(String email);

	//Select all users where delete flag = N, lock status = false and account status = active
	@Transactional
	@Query(nativeQuery = true,value = "SELECT * FROM users WHERE delete_flag = 'N' AND locked = 0 AND  active = 1")
	List<User> allUsers();
	@Transactional
	@Query(nativeQuery = true,value = "SELECT * FROM users WHERE status=:status and delete_flag = 'N' ")
	List<User> usersPerStatus(String status);

	//All Pending Accounts
	@Transactional
	@Query(nativeQuery = true,value = "SELECT * FROM users WHERE delete_flag = 'N' AND locked = 0 AND  active = 1 AND status = 'Approved'")
	List<User> allVerifiedAccounts();

	//All Pending Accounts
	@Transactional
	@Query(nativeQuery = true,value = "SELECT * FROM users WHERE delete_flag = 'N' AND locked = 0 AND  active = 1 AND status = 'Pending'")
	List<User> allPendingAccounts();

	//All Rejected Accounts
	@Transactional
	@Query(nativeQuery = true,value = "SELECT * FROM users WHERE delete_flag = 'N' AND locked = 0 AND  active = 1 AND status = 'Rejected'")
	List<User> allRejectedAccounts();

	//List Locked Accounts
	@Transactional
	@Query(nativeQuery = true,value = "SELECT * FROM users WHERE locked = true")
	List<User> allLockedUsers();

	//List InActive Accounts
	@Transactional
	@Query(nativeQuery = true,value = "SELECT * FROM users WHERE active = false")
	List<User> allInactiveUsers();

	@Transactional
	@Query(nativeQuery = true,value = "SELECT * FROM users WHERE delete_flag = 'Y'")
	List<User> allDeletedUsers();

	//Count Number of users
	@Transactional
	@Query(nativeQuery = true,value = "SELECT count(*) FROM users")
	int countUsers();

	//Select Email
	@Transactional
	@Query(nativeQuery = true,value = "SELECT email FROM users WHERE id = :id")
	String getEmailAddress(
			@Param(value = "id") Long id
	);

	//Select username using email address
	@Transactional
	@Query(nativeQuery = true,value = "SELECT username FROM users WHERE email = :email")
	String getUsernameUsingEmail(
			@Param(value = "email") String email
	);

	//Select Username
	@Transactional
	@Query(nativeQuery = true,value = "SELECT username FROM users WHERE id = :id")
	String getUsername(
			@Param(value = "id") Long id
	);

	//Check Delete Status
	@Transactional
	@Query(nativeQuery = true,value = "SELECT delete_flag FROM users WHERE username = :username")
	String getDeleteFlag(
			@Param(value = "username") String username
	);

	//Get Account locked status
	@Transactional
	@Query(nativeQuery = true,value = "SELECT locked FROM users WHERE username = :username")
	boolean getAccountLockedStatus(
			@Param(value = "username") String username
	);

	//Get Account inactive status
	@Transactional
	@Query(nativeQuery = true,value = "SELECT active FROM users WHERE username = :username")
	boolean getAccountInactiveStatus(
			@Param(value = "username") String username
	);

	//Partial Update (User Details)
	@Transactional
	@Modifying
	@Query(nativeQuery = true,value = "update users set firstname = :firstname,lastname = :lastname,phonenumber = :phonenumber,modified_by = :modified_by,modified_on = :modified_on,email = :email where id = :id")
	void updateDetails(
			@Param(value = "id") long id,
			@Param(value = "firstname") String firstname,
			@Param(value = "lastname") String lastname,
			@Param(value = "phonenumber") String phonenumber,
			@Param(value = "modified_by") String modified_by,
			@Param(value = "modified_on") String modified_on,
			@Param(value = "email") String email
	);

	//Update User Role
	@Transactional
	@Modifying
	@Query(nativeQuery = true,value = "update user_roles set role_id = :role_id where user_id = :user_id")
	void updateUserRole(
			@Param(value = "role_id") long role_id,
			@Param(value = "user_id") long user_id
	);


	//Update User Password
	@Transactional
	@Modifying
	@Query(nativeQuery = true,value = "update users set password = :password,modified_on= :modified_on,modified_by = :modified_by where username = :username")
	void updateUserPassword(
			@Param(value = "password") String password,
			@Param(value = "modified_on") String modifiedon,
			@Param(value = "modified_by") String modifiedby,
			@Param(value = "username") String username
	);

	//User change Password (Forget Password Option)
	@Transactional
	@Modifying
	@Query(nativeQuery = true,value = "update users set password = :password,modified_on= :modified_on,modified_by = :modified_by where email = :email")
	void userChangePassword(
			@Param(value = "password") String password,
			@Param(value = "modified_on") String modifiedon,
			@Param(value = "modified_by") String modifiedby,
			@Param(value = "email") String email
	);

	//Lock User Account
	@Transactional
	@Modifying
	@Query(nativeQuery = true,value = "update users set locked = :locked,modified_on= :modified_on,modified_by = :modified_by where username = :username")
	void lockUserAccount(
			@Param(value = "locked") boolean status,
			@Param(value = "modified_on") String modifiedon,
			@Param(value = "modified_by") String modifiedby,
			@Param(value = "username") String username
	);


	//Activate User Account
	@Transactional
	@Modifying
	@Query(nativeQuery = true,value = "update users set active = :active,modified_on= :modified_on,modified_by = :modified_by where username = :username")
	void activateUserAccount(
			@Param(value = "active") boolean status,
			@Param(value = "modified_on") String modifiedon,
			@Param(value = "modified_by") String modifiedby,
			@Param(value = "username") String username
	);

	//Delete User Account
	@Transactional
	@Modifying
	@Query(nativeQuery = true,value = "update users set active = :active,locked = :locked,delete_flag = :delete_flag,modified_on= :modified_on,modified_by = :modified_by where username = :username")
	void deleteUserAccount(
			@Param(value = "active") boolean inactive,
			@Param(value = "locked") boolean locked,
			@Param(value = "delete_flag") String deleteflag,
			@Param(value = "modified_on") String modifiedon,
			@Param(value = "modified_by") String modifiedby,
			@Param(value = "username") String username
	);

	//Restore User Account
	@Transactional
	@Modifying
	@Query(nativeQuery = true,value = "update users set active = :active,locked = :locked,delete_flag = :delete_flag,modified_on= :modified_on,modified_by = :modified_by where username = :username")
	void restoreUserAccount(
			@Param(value = "active") boolean inactive,
			@Param(value = "locked") boolean locked,
			@Param(value = "delete_flag") String deleteflag,
			@Param(value = "modified_on") String modifiedon,
			@Param(value = "modified_by") String modifiedby,
			@Param(value = "username") String username
	);


	//Update Log In status to true on login
	@Transactional
	@Modifying
	@Query(nativeQuery = true,value = "update users set loggedin = :loggedin,modified_on= :modified_on,modified_by = :modified_by where username = :username")
	void updateLogInToTrue(
			@Param(value = "loggedin") boolean loggedin,
			@Param(value = "modified_on") String modifiedon,
			@Param(value = "modified_by") String modifiedby,
			@Param(value = "username") String username
	);

	//Update log in status to false on log out
	@Transactional
	@Modifying
	@Query(nativeQuery = true,value = "update users set loggedin = :loggedin,modified_on= :modified_on,modified_by = :modified_by where username = :username")
	void updateLogInToFalse(
			@Param(value = "loggedin") boolean loggedin,
			@Param(value = "modified_on") String modifiedon,
			@Param(value = "modified_by") String modifiedby,
			@Param(value = "username") String username
	);

	//Check log in flag (status) before log in
	@Transactional
	@Query(nativeQuery = true,value = "SELECT loggedin FROM users WHERE username = :username")
	boolean getLogInStatus(
			@Param(value = "username") String username
	);


	//Update User's Department
	@Transactional
	@Modifying
	@Query(nativeQuery = true,value = "update users set department = :department,modified_on= :modified_on,modified_by = :modified_by WHERE username = :username")
	void updateUserDepartment(
			@Param(value = "department") String  department,
			@Param(value = "modified_on") String modifiedon,
			@Param(value = "modified_by") String modifiedby,
			@Param(value = "username") String username
	);

	@Transactional
	@Modifying
	@Query(nativeQuery = true,value = "update users set status = :status,modified_on= :modified_on,modified_by = :modified_by WHERE username = :username")
	void verifyUserAccount(
			@Param(value = "status") String  status,
			@Param(value = "modified_on") String modifiedon,
			@Param(value = "modified_by") String modifiedby,
			@Param(value = "username") String username
	);
}
