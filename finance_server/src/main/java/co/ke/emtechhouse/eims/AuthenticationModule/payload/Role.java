package co.ke.emtechhouse.eims.AuthenticationModule.payload;

import co.ke.emtechhouse.eims.AuthenticationModule.payload.BasicActions.Basicactions;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "roles")
public class Role {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	@OneToMany(targetEntity = Basicactions.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "role_fk", referencedColumnName = "id")
	private List<Basicactions> basicactions;

	private String postedBy;
	private Date postedTime = new Date();
	private String modifiedBy;
	private String modifiedFlag;
	private String modifiedTime;
}