package co.ke.emtechhouse.eims.DocumentsManagementServer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class Document {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String filename;
    private String filenameref;
    private String reference_id;
    private String fileExtension = "png";

    private Boolean is_approved = false;
    private Boolean is_deleted = false;
//    //*****************Timestamps *********************
//    @Column(name = "created_at", columnDefinition = "TIMESTAMP")
//    private LocalDateTime created_at;
//    @Column(name = "updated_at", columnDefinition = "TIMESTAMP")
//    private LocalDateTime updated_at;
//    @Column(name = "deleted_at", columnDefinition = "TIMESTAMP")
//    private LocalDateTime deleted_at;

}
