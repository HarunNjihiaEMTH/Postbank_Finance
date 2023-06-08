package co.ke.emtechhouse.eims.AuthenticationModule.payload;

import javax.persistence.*;

@Entity
@Table(name = "departments")
public class Departments {
    public Departments() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public Departments(Long id, String code, String name) {
        this.id = id;
        this.code = code;
        this.name = name;
    }

    private String code;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    private String name;
}
