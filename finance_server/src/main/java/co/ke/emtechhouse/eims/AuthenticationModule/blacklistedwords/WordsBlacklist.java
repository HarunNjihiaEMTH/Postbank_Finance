package co.ke.emtechhouse.eims.AuthenticationModule.blacklistedwords;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class WordsBlacklist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String createdBy = "-";
    private Date createdOn = new Date();
    private String deletedFlag="N";
    private String deletedBy="-";
    private Date deletedOn = null;
    private String word;
}
