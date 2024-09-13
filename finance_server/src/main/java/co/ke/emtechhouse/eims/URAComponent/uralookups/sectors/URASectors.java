
package co.ke.emtechhouse.eims.URAComponent.uralookups.sectors;

import com.google.gson.annotations.Expose;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "urasectors")
public class URASectors {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    @Expose
    private String code;
    @Expose
    private String name;
    @Expose
    private String parentClass;
    @Expose
    private String requiredFill;
}
