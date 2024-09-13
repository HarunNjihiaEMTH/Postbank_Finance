package co.ke.emtechhouse.eims.AuthenticationModule.payload.BasicActions;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Data
public class Basicactions implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(nullable = false)
    private String name;
    private boolean selected;
    private String code;
}
