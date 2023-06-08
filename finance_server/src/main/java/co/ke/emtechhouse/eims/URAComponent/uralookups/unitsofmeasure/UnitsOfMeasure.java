
package co.ke.emtechhouse.eims.URAComponent.uralookups.unitsofmeasure;

import com.google.gson.annotations.Expose;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "unitsofmeasure")
public class UnitsOfMeasure {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    @Expose
    private String name;
    @Expose
    private String value;
    @Expose
    private String description;
}
