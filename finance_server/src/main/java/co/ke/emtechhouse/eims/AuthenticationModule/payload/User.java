package co.ke.emtechhouse.eims.AuthenticationModule.payload;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(	name = "users", 
		uniqueConstraints = { 
			@UniqueConstraint(columnNames = "username"),
			@UniqueConstraint(columnNames = "email") 
		})
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@NotBlank
	@Size(max = 100)
	private String firstname;
	@NotBlank
	@Size(max = 100)
	private String lastname;
	@NotBlank
	@Size(max = 100)
	private String username;
	@NotBlank
	@Size(max = 100)
	private String phonenumber;
	@NotBlank
	@Size(max = 100)
	@Email
	private String email;
	@NotBlank
	@Size(max = 100)
	private String department;
	private String status = "Approved";
	@NotBlank
	@Size(max = 120)
	@JsonIgnore
	private String password;
	@Column(name = "createdOn", nullable = false)
	private String createdOn;
	@Column(name = "modifiedBy")
	private String modifiedBy;
	@Column(name = "modifiedOn")
	private String modifiedOn;
	@Column(name = "deleteFlag", length = 1)
	private String deleteFlag = "N";
	@Column(name = "active")
	private boolean isAcctActive = true;

	public User(String firstname, String lastname, String username, String phonenumber, String email, String department, String encode, String format, String s, String format1, String deleteflag, boolean isactiveflag, boolean islockedflag, String status) {
	}

	public boolean isLoggedIn() {
		return isLoggedIn;
	}
	@Column(columnDefinition = "boolean default false",name = "loggedin")
	private boolean isLoggedIn;
	@Column(name = "locked")
	private boolean isAcctLocked = false;
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(	name = "user_roles",
			joinColumns = @JoinColumn(name = "user_id"),
			inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles = new HashSet<>();
	private boolean systemGenPassword = true;
}
