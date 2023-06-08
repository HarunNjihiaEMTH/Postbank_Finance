
package co.ke.emtechhouse.eims.URAComponent.uralookups.payway;

import com.google.gson.annotations.Expose;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "urapaywaydata")
public class URAPayWay {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;

    @Expose
    private String description;
    @Expose
    private String name;
    @Expose
    private String value;
}
