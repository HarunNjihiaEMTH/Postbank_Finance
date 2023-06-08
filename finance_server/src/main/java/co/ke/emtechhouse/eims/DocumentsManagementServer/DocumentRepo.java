package co.ke.emtechhouse.eims.DocumentsManagementServer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
public interface DocumentRepo extends JpaRepository<Document, Long> {
    Optional<Document> findDocumentById(Long id);
    @Query(value = "SELECT * FROM document WHERE document.filenameref LIKE :filenameref", nativeQuery = true)
    Optional<Document> findByFilenameref(String filenameref);


//    @Query(value = "SELECT * FROM document WHERE document.filenameref LIKE :filenameref", nativeQuery = true)
//    Optional<Document> findByFilenameref(String frontfilenameref);

    @Query(value = "SELECT * FROM document WHERE document.reference_id =:reference_id", nativeQuery = true)
    List<Document> findByUserId(String reference_id);
    @Query(value = "SELECT * FROM document WHERE document.reference_id =:reference_id", nativeQuery = true)
    List<Document> findByRefId(String reference_id);
    void deleteDocumentById(Long id);
}
