package co.ke.emtechhouse.eims.URAComponent.uralookups.taxcodes;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@Entity
@Table( uniqueConstraints = {
        @UniqueConstraint( columnNames = "name"),
        @UniqueConstraint( columnNames = "code")
})
public class Tax {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false, nullable = false)
    private Long id;
    @Column(updatable = false, nullable = false)
    private String name;
    @Column(updatable = false, nullable = false)
    private String code;
    private Double rate;
}
